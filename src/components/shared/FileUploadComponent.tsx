
import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import FileUploadZone from './FileUploadZone';
import FileUploadProgress from './FileUploadProgress';
import UploadedFileDisplay from './UploadedFileDisplay';

interface FileUploadComponentProps {
  onFileProcessed: (file: any, extractedContent?: string) => void;
  acceptedTypes?: string[];
  maxFileSize?: number;
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

    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      toast({
        title: "Invalid file type",
        description: `Please upload files with these extensions: ${acceptedTypes.join(', ')}`,
        variant: "destructive",
      });
      return;
    }

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
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress for prototype
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    await new Promise(resolve => setTimeout(resolve, 2000));
    clearInterval(progressInterval);
    setUploadProgress(100);

    const extractedContent = `Extracted content from ${file.name}:\n\nThis is simulated content extraction for the prototype.`;
    
    const fileData = {
      id: `file-${Date.now()}`,
      original_filename: file.name,
      file_type: file.type,
      file_size: file.size,
      extracted_content: extractedContent
    };

    setUploadedFile(fileData);
    onFileProcessed(fileData, extractedContent);

    toast({
      title: "File uploaded successfully",
      description: `${file.name} has been processed and is ready for use.`,
    });

    setIsUploading(false);
    setUploadProgress(0);
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
        <UploadedFileDisplay fileName={uploadedFile.original_filename} onRemove={removeFile} />
      )}
    </div>
  );
};

export default FileUploadComponent;
