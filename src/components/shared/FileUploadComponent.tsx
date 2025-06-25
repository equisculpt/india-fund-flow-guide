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

  const getAuthenticatedUserId = async () => {
    // Check if we're in admin context first
    const adminSessionToken = localStorage.getItem('admin_session_token');
    if (adminSessionToken) {
      // Verify admin session and get admin user
      const { data: sessionData, error } = await supabase
        .from('admin_sessions')
        .select(`
          admin_user_id,
          expires_at,
          admin_users!admin_sessions_admin_user_id_fkey (
            id,
            email
          )
        `)
        .eq('session_token', adminSessionToken)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (!error && sessionData) {
        return sessionData.admin_user_id;
      }
    }

    // Fall back to regular user authentication
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id || null;
  };

  const uploadFile = async (file: File) => {
    try {
      setIsUploading(true);
      setUploadProgress(0);

      const userId = await getAuthenticatedUserId();
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const fileName = `${userId}/${Date.now()}_${file.name}`;
      
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

      // Upload to Supabase Storage
      const { data: storageData, error: storageError } = await supabase.storage
        .from('chat-uploads')
        .upload(fileName, file);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (storageError) throw storageError;

      // For admin users, we need to use a different approach to insert files
      // We'll use the service role to bypass RLS for admin uploads
      const adminSessionToken = localStorage.getItem('admin_session_token');
      
      let dbData;
      if (adminSessionToken) {
        // Use edge function for admin uploads to bypass RLS
        const { data: functionData, error: functionError } = await supabase.functions.invoke('admin-file-upload', {
          body: {
            user_id: userId,
            filename: fileName,
            original_filename: file.name,
            file_type: file.type || 'application/octet-stream',
            file_size: file.size,
            file_path: storageData.path,
            upload_purpose: uploadPurpose,
            is_processed: false,
            admin_session_token: adminSessionToken
          }
        });

        if (functionError) throw functionError;
        dbData = functionData;
      } else {
        // Regular user upload
        const { data: insertData, error: dbError } = await supabase
          .from('uploaded_files')
          .insert({
            user_id: userId,
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
        dbData = insertData;
      }

      // Simulate content extraction
      const extractedContent = await simulateContentExtraction(file);
      
      // Update with extracted content
      if (extractedContent) {
        if (adminSessionToken) {
          // Use edge function for admin updates
          await supabase.functions.invoke('admin-file-update', {
            body: {
              file_id: dbData.id,
              extracted_content: extractedContent,
              admin_session_token: adminSessionToken
            }
          });
        } else {
          const { error: updateError } = await supabase
            .from('uploaded_files')
            .update({ 
              extracted_content: extractedContent,
              is_processed: true 
            })
            .eq('id', dbData.id);

          if (updateError) throw updateError;
        }
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
