
import { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadZoneProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadZone = ({ onFileUpload }: FileUploadZoneProps) => {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <input
        type="file"
        multiple
        accept=".xlsx,.xls,.pdf"
        onChange={onFileUpload}
        className="hidden"
        id="portfolio-file-upload-admin"
      />
      <label htmlFor="portfolio-file-upload-admin" className="cursor-pointer">
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-900">
          Upload Portfolio Files
        </p>
        <p className="text-sm text-gray-500">
          Excel and PDF files supported
        </p>
      </label>
    </div>
  );
};

export default FileUploadZone;
