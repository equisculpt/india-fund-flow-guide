
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import FileUploadZone from './portfolio/FileUploadZone';
import FileDetailsForm from './portfolio/FileDetailsForm';
import { useFileUpload } from './portfolio/hooks/useFileUpload';
import { useAMCData } from './portfolio/hooks/useAMCData';

const AdminPortfolioUploader = () => {
  const { amcList, loading: amcLoading } = useAMCData();
  const {
    uploadedFiles,
    isProcessing,
    handleFileUpload,
    updateFileDetails,
    removeFile,
    processFiles
  } = useFileUpload();

  if (amcLoading) {
    return <div className="flex items-center justify-center h-64">Loading AMC data...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-blue-600" />
          Portfolio File Upload
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <FileUploadZone onFileUpload={handleFileUpload} />

          {uploadedFiles.length > 0 && (
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <FileDetailsForm
                  key={file.id}
                  file={file}
                  amcList={amcList}
                  onUpdateFileDetails={updateFileDetails}
                  onRemoveFile={removeFile}
                />
              ))}
            </div>
          )}

          <Button
            onClick={processFiles}
            disabled={isProcessing || uploadedFiles.length === 0}
            className="w-full"
          >
            {isProcessing ? "Processing..." : `Upload ${uploadedFiles.length} Files`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPortfolioUploader;
