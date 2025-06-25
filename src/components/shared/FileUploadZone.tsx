
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Upload } from 'lucide-react';

interface FileUploadZoneProps {
  acceptedTypes: string[];
  maxFileSize: number;
  disabled: boolean;
  isUploading: boolean;
  onClick: () => void;
}

const FileUploadZone = ({ 
  acceptedTypes, 
  maxFileSize, 
  disabled, 
  isUploading, 
  onClick 
}: FileUploadZoneProps) => {
  return (
    <Card 
      className={`border-2 border-dashed cursor-pointer transition-colors hover:border-blue-400 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={() => !disabled && !isUploading && onClick()}
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
  );
};

export default FileUploadZone;
