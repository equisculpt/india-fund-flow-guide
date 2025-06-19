
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileSpreadsheet, Trash2 } from 'lucide-react';

interface AMC {
  id: string;
  amc_name: string;
  amc_code: string;
}

interface UploadedFile {
  id: string;
  file: File;
  amc_name: string;
  portfolio_date: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error_message?: string;
}

interface FileDetailsFormProps {
  file: UploadedFile;
  amcList: AMC[];
  onUpdateFileDetails: (fileId: string, field: keyof UploadedFile, value: string) => void;
  onRemoveFile: (fileId: string) => void;
}

const FileDetailsForm = ({ file, amcList, onUpdateFileDetails, onRemoveFile }: FileDetailsFormProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="default">Success</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'uploading':
        return <Badge variant="secondary">Uploading</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5 text-green-600" />
          <span className="font-medium">{file.file.name}</span>
          {getStatusBadge(file.status)}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemoveFile(file.id)}
          disabled={file.status === 'uploading'}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <Label>AMC Name</Label>
          <Select
            value={file.amc_name}
            onValueChange={(value) => onUpdateFileDetails(file.id, 'amc_name', value)}
            disabled={file.status === 'uploading'}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select AMC" />
            </SelectTrigger>
            <SelectContent>
              {amcList.map((amc) => (
                <SelectItem key={amc.id} value={amc.amc_name}>
                  {amc.amc_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Portfolio Date</Label>
          <Input
            type="date"
            value={file.portfolio_date}
            onChange={(e) => onUpdateFileDetails(file.id, 'portfolio_date', e.target.value)}
            disabled={file.status === 'uploading'}
          />
        </div>
      </div>

      {file.error_message && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
          Error: {file.error_message}
        </div>
      )}
    </div>
  );
};

export default FileDetailsForm;
