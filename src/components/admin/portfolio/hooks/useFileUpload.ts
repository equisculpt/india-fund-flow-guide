
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface UploadedFile {
  id: string;
  file: File;
  amc_name: string;
  portfolio_date: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error_message?: string;
}

export const useFileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        amc_name: '',
        portfolio_date: new Date().toISOString().split('T')[0],
        status: 'pending'
      };

      setUploadedFiles(prev => [...prev, newFile]);
    });

    event.target.value = '';
  }, []);

  const updateFileDetails = (fileId: string, field: keyof UploadedFile, value: string) => {
    setUploadedFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, [field]: value } : file
    ));
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const processFiles = async () => {
    const validFiles = uploadedFiles.filter(file => 
      file.amc_name && file.portfolio_date && file.status === 'pending'
    );

    if (validFiles.length === 0) {
      toast({
        title: "Error",
        description: "Please add files and fill in all required details",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      for (const file of validFiles) {
        setUploadedFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'uploading' } : f
        ));

        try {
          const fileReader = new FileReader();
          const fileData = await new Promise<string>((resolve, reject) => {
            fileReader.onload = () => resolve(fileReader.result as string);
            fileReader.onerror = reject;
            fileReader.readAsDataURL(file.file);
          });

          const { error } = await supabase
            .from('amc_portfolio_files')
            .insert({
              amc_name: file.amc_name,
              portfolio_date: file.portfolio_date,
              file_name: file.file.name,
              file_type: file.file.name.toLowerCase().endsWith('.pdf') ? 'PDF' : 'XLSX',
              file_size: file.file.size,
              file_data: fileData,
              upload_status: 'uploaded'
            });

          if (error) throw error;

          setUploadedFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, status: 'success' } : f
          ));

          toast({
            title: "Success",
            description: `${file.amc_name} portfolio uploaded successfully`,
            duration: 2000,
          });

        } catch (error) {
          console.error('Error uploading file:', error);
          setUploadedFiles(prev => prev.map(f => 
            f.id === file.id ? { 
              ...f, 
              status: 'error',
              error_message: error instanceof Error ? error.message : 'Upload failed'
            } : f
          ));
        }
      }

      const successCount = uploadedFiles.filter(f => f.status === 'success').length;
      toast({
        title: "Processing Complete",
        description: `Uploaded ${successCount} files successfully`,
        duration: 3000,
      });

    } catch (error) {
      console.error('Error processing files:', error);
      toast({
        title: "Error",
        description: "Failed to process files",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    uploadedFiles,
    isProcessing,
    handleFileUpload,
    updateFileDetails,
    removeFile,
    processFiles
  };
};
