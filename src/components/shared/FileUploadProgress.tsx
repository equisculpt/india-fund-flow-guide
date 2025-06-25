
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { File } from 'lucide-react';

interface FileUploadProgressProps {
  progress: number;
}

const FileUploadProgress = ({ progress }: FileUploadProgressProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <File className="h-4 w-4" />
        <span className="text-sm">Uploading and processing...</span>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
};

export default FileUploadProgress;
