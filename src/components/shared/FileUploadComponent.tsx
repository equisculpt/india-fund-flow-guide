
import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import FileUploadZone from './FileUploadZone';
import FileUploadProgress from './FileUploadProgress';
import UploadedFileDisplay from './UploadedFileDisplay';

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

      // Check if we're in admin context
      const adminSessionToken = localStorage.getItem('admin_session_token');
      const isAdminContext = !!adminSessionToken;

      console.log('Upload context:', { isAdminContext, uploadPurpose });

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      if (isAdminContext) {
        console.log('Using admin upload flow');
        
        // For admin users, use the admin upload edge function that bypasses RLS
        const formData = new FormData();
        formData.append('file', file);
        formData.append('original_filename', file.name);
        formData.append('file_type', file.type || 'application/octet-stream');
        formData.append('file_size', file.size.toString());
        formData.append('upload_purpose', uploadPurpose);
        formData.append('admin_session_token', adminSessionToken);

        const { data, error } = await supabase.functions.invoke('admin-file-upload', {
          body: formData
        });

        clearInterval(progressInterval);
        setUploadProgress(100);

        if (error) {
          console.error('Admin upload error:', error);
          throw new Error(`Admin upload failed: ${error.message}`);
        }

        console.log('Admin upload successful:', data);

        // Simulate content extraction
        const extractedContent = await simulateContentExtraction(file);
        
        const fileData = {
          ...data,
          extracted_content: extractedContent
        };

        setUploadedFile(fileData);
        onFileProcessed(fileData, extractedContent);

      } else {
        console.log('Using regular user upload flow');
        
        // Regular user flow - get authenticated user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error('User not authenticated');
        }

        const fileName = `${user.id}/${Date.now()}_${file.name}`;
        
        // Upload to Supabase Storage
        const { data: storageData, error: storageError } = await supabase.storage
          .from('chat-uploads')
          .upload(fileName, file);

        if (storageError) {
          console.error('Storage upload error:', storageError);
          throw storageError;
        }

        // Insert file record in database
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

        clearInterval(progressInterval);
        setUploadProgress(100);

        if (dbError) {
          console.error('Database insert error:', dbError);
          throw dbError;
        }

        // Simulate content extraction
        const extractedContent = await simulateContentExtraction(file);
        
        // Update with extracted content
        const { error: updateError } = await supabase
          .from('uploaded_files')
          .update({ 
            extracted_content: extractedContent,
            is_processed: true 
          })
          .eq('id', dbData.id);

        if (updateError) {
          console.error('Update error:', updateError);
          throw updateError;
        }

        const fileData = { ...dbData, extracted_content: extractedContent };
        setUploadedFile(fileData);
        onFileProcessed(fileData, extractedContent);
      }

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
          
          <FileUploadZone
            acceptedTypes={acceptedTypes}
            maxFileSize={maxFileSize}
            disabled={disabled}
            isUploading={isUploading}
            onClick={() => fileInputRef.current?.click()}
          />
        </div>
      )}

      {isUploading && <FileUploadProgress progress={uploadProgress} />}

      {uploadedFile && (
        <UploadedFileDisplay
          fileName={uploadedFile.original_filename}
          onRemove={removeFile}
        />
      )}
    </div>
  );
};

export default FileUploadComponent;
