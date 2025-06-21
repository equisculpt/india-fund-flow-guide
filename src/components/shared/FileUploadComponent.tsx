
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface FileUploadComponentProps {
  onFileProcessed: (file: any, extractedContent?: string) => void;
  acceptedTypes?: string[];
  maxFileSize?: number; // in MB
  uploadPurpose?: 'chat' | 'blog' | 'analysis';
  disabled?: boolean;
}

const FileUploadComponent = ({ 
  onFileProcessed, 
  acceptedTypes = ['.pdf', '.xls', '.xlsx', '.doc', '.docx'],
  maxFileSize = 10,
  uploadPurpose = 'chat',
  disabled = false
}: FileUploadComponentProps) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      toast({
        title: "Invalid file type",
        description: `Please upload files with these extensions: ${acceptedTypes.join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    // Validate file size
    if (file.size > maxFileSize * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `Please upload files smaller than ${maxFileSize}MB`,
        variant: "destructive",
      });
      return;
    }

    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    try {
      setIsUploading(true);
      setUploadProgress(0);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const fileName = `${user.id}/${Date.now()}_${file.name}`;
      
      // Upload to Supabase Storage
      const { data: storageData, error: storageError } = await supabase.storage
        .from('chat-uploads')
        .upload(fileName, file, {
          onUploadProgress: (progress) => {
            setUploadProgress((progress.loaded / progress.total) * 100);
          }
        });

      if (storageError) throw storageError;

      // Save file metadata to database
      const { data: dbData, error: dbError } = await supabase
        .from('uploaded_files')
        .insert({
          user_id: user.id,
          filename: fileName,
          original_filename: file.name,
          file_type: file.type || 'application/octet-stream',
          file_size: file.size,
          file_path: storageData.path,
          upload_purpose: uploadPurpose,
          is_processed: false
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Simulate content extraction (in real implementation, this would call an edge function)
      const extractedContent = await simulateContentExtraction(file);
      
      // Update with extracted content
      if (extractedContent) {
        const { error: updateError } = await supabase
          .from('uploaded_files')
          .update({ 
            extracted_content: extractedContent,
            is_processed: true 
          })
          .eq('id', dbData.id);

        if (updateError) throw updateError;
      }

      setUploadedFile({ ...dbData, extracted_content: extractedContent });
      onFileProcessed(dbData, extractedContent);

      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been processed and is ready for use.`,
      });

    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const simulateContentExtraction = async (file: File): Promise<string> => {
    // This simulates content extraction - in real implementation, 
    // you'd use a proper PDF/Excel parsing library or service
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockContent = `Extracted content from ${file.name}:\n\nThis is simulated content extraction. In a real implementation, this would contain the actual text extracted from your ${file.type.includes('pdf') ? 'PDF' : 'Excel'} file.\n\nKey topics found:\n- Investment strategies\n- Market analysis\n- Financial planning\n- Risk management\n\nThis content can now be used to generate blog posts or for chat analysis.`;
        resolve(mockContent);
      }, 2000);
    });
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {!uploadedFile && (
        <div>
          <Input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes.join(',')}
            onChange={handleFileSelect}
            disabled={disabled || isUploading}
            className="hidden"
          />
          
          <Card 
            className={`border-2 border-dashed cursor-pointer transition-colors hover:border-blue-400 ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Upload className="h-10 w-10 text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 text-center">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Supported: {acceptedTypes.join(', ')} (max {maxFileSize}MB)
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <File className="h-4 w-4" />
            <span className="text-sm">Uploading and processing...</span>
          </div>
          <Progress value={uploadProgress} className="w-full" />
        </div>
      )}

      {uploadedFile && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">{uploadedFile.original_filename}</p>
                <p className="text-sm text-green-600">File processed successfully</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={removeFile}>
              <X className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FileUploadComponent;
