import { useState, useCallback, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileSpreadsheet, FileText, Trash2 } from 'lucide-react';
import { mockDb, mockAMCList, AMC } from '@/services/mockDatabase';

interface UploadedFile {
  id: string;
  file: File;
  amc_name: string;
  portfolio_date: string;
  file_type: string;
  upload_status: 'pending' | 'uploading' | 'success' | 'error';
  error_message?: string;
}

export const AMCPortfolioUploader = () => {
  const { toast } = useToast();
  const [amcList, setAmcList] = useState<AMC[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setAmcList(mockAMCList);
  }, []);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const fileType = file.name.toLowerCase().endsWith('.pdf') ? 'PDF' : 'XLSX';
      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        amc_name: '',
        portfolio_date: new Date().toISOString().split('T')[0],
        file_type: fileType,
        upload_status: 'pending'
      };
      setUploadedFiles(prev => [...prev, newFile]);
    });
    event.target.value = '';
  }, []);

  const updateFileDetails = (fileId: string, field: keyof UploadedFile, value: string) => {
    setUploadedFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, [field]: value } : file
    ));
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const processAllFiles = async () => {
    const validFiles = uploadedFiles.filter(file => 
      file.amc_name && file.portfolio_date && file.upload_status === 'pending'
    );

    if (validFiles.length === 0) {
      toast({ title: "Error", description: "Please add files and fill in all required details", variant: "destructive" });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      setUploadedFiles(prev => prev.map(f => f.id === file.id ? { ...f, upload_status: 'uploading' } : f));

      try {
        await mockDb.insert('amc_portfolio_files', {
          amc_name: file.amc_name,
          portfolio_date: file.portfolio_date,
          file_name: file.file.name,
          file_type: file.file_type,
          file_size: file.file.size
        });

        setUploadedFiles(prev => prev.map(f => f.id === file.id ? { ...f, upload_status: 'success' } : f));
        toast({ title: "Success", description: `${file.amc_name} portfolio uploaded successfully` });
      } catch (error) {
        setUploadedFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, upload_status: 'error', error_message: 'Upload failed' } : f
        ));
      }
      setProgress(((i + 1) / validFiles.length) * 100);
    }

    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload AMC Portfolio Files
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input type="file" multiple accept=".xlsx,.xls,.pdf" onChange={handleFileUpload} className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Upload Portfolio Files</p>
                <p className="text-sm text-muted-foreground">Drag and drop or click to select XLS/XLSX/PDF files</p>
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {file.file_type === 'PDF' ? <FileText className="h-5 w-5 text-destructive" /> : <FileSpreadsheet className="h-5 w-5 text-primary" />}
                        <span className="font-medium">{file.file.name}</span>
                        <Badge variant={file.upload_status === 'success' ? 'default' : file.upload_status === 'error' ? 'destructive' : 'secondary'}>
                          {file.upload_status}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)} disabled={file.upload_status === 'uploading'}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">AMC Name</label>
                        <Select value={file.amc_name} onValueChange={(value) => updateFileDetails(file.id, 'amc_name', value)}>
                          <SelectTrigger><SelectValue placeholder="Select AMC" /></SelectTrigger>
                          <SelectContent>
                            {amcList.map((amc) => <SelectItem key={amc.id} value={amc.amc_name}>{amc.amc_name}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Portfolio Date</label>
                        <Input type="date" value={file.portfolio_date} onChange={(e) => updateFileDetails(file.id, 'portfolio_date', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isProcessing && <Progress value={progress} className="w-full" />}
            <Button onClick={processAllFiles} disabled={isProcessing || uploadedFiles.length === 0} className="w-full">
              {isProcessing ? "Processing..." : `Upload ${uploadedFiles.length} Files`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
