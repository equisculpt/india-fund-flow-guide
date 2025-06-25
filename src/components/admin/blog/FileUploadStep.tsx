
import { useState } from 'react';
import { FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FileUploadComponent from '@/components/shared/FileUploadComponent';

interface UploadedFile {
  id: string;
  original_filename: string;
  extracted_content?: string;
}

interface FileUploadStepProps {
  uploadedFiles: UploadedFile[];
  onFileProcessed: (file: any, extractedContent?: string) => void;
  onContinue: () => void;
}

const FileUploadStep = ({ uploadedFiles, onFileProcessed, onContinue }: FileUploadStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Upload PDF Files</h3>
      <FileUploadComponent
        onFileProcessed={onFileProcessed}
        acceptedTypes={['.pdf']}
        maxFileSize={25}
        uploadPurpose="blog"
      />
      
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Uploaded Files:</h4>
          {uploadedFiles.map((file) => (
            <div key={file.id} className="flex items-center gap-2 p-2 bg-green-50 rounded">
              <FileText className="w-4 h-4 text-green-600" />
              <span className="text-sm">{file.original_filename}</span>
              <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
            </div>
          ))}
          <Button onClick={onContinue} className="w-full mt-4">
            Continue to Requirements
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploadStep;
