
import { useState, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileSpreadsheet, FileText, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const amcNames = [
    'HDFC Mutual Fund',
    'SBI Mutual Fund',
    'ICICI Prudential Mutual Fund',
    'Axis Mutual Fund',
    'Nippon India Mutual Fund',
    'Aditya Birla Sun Life Mutual Fund',
    'Kotak Mutual Fund',
    'UTI Mutual Fund',
    'DSP Mutual Fund',
    'Franklin Templeton Mutual Fund',
    'Invesco Mutual Fund',
    'L&T Mutual Fund',
    'Mirae Asset Mutual Fund',
    'Motilal Oswal Mutual Fund',
    'PGIM India Mutual Fund',
    'Quantum Mutual Fund',
    'Tata Mutual Fund',
    'Sundaram Mutual Fund',
    'WhiteOak Capital Mutual Fund',
    'Edelweiss Mutual Fund'
  ];

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

    // Reset input
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
      toast({
        title: "Error",
        description: "Please add files and fill in all required details",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        
        // Update status to uploading
        setUploadedFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, upload_status: 'uploading' } : f
        ));

        try {
          // Convert file to base64 for storage
          const fileReader = new FileReader();
          const fileData = await new Promise<string>((resolve, reject) => {
            fileReader.onload = () => resolve(fileReader.result as string);
            fileReader.onerror = reject;
            fileReader.readAsDataURL(file.file);
          });

          // Store file metadata and content in database using raw SQL
          const { error } = await supabase.rpc('execute_sql', {
            sql: `
              INSERT INTO amc_portfolio_files (
                amc_name, portfolio_date, file_name, file_type, file_size, file_data, upload_status
              ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            `,
            params: [
              file.amc_name,
              file.portfolio_date,
              file.file.name,
              file.file_type,
              file.file.size,
              fileData,
              'uploaded'
            ]
          });

          if (error) {
            console.error('Database error:', error);
            throw new Error('Failed to save file to database');
          }

          // Update status to success
          setUploadedFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, upload_status: 'success' } : f
          ));

          toast({
            title: "Success",
            description: `${file.amc_name} portfolio uploaded successfully`,
            duration: 2000,
          });

        } catch (error) {
          console.error('Error uploading file:', error);
          
          // Update status to error
          setUploadedFiles(prev => prev.map(f => 
            f.id === file.id ? { 
              ...f, 
              upload_status: 'error',
              error_message: error instanceof Error ? error.message : 'Upload failed'
            } : f
          ));
        }

        // Update progress
        setProgress(((i + 1) / validFiles.length) * 100);
      }

      toast({
        title: "Processing Complete",
        description: `Uploaded ${validFiles.filter(f => f.upload_status === 'success').length} files successfully`,
        duration: 3000,
      });

    } catch (error) {
      console.error('Error processing files:', error);
      toast({
        title: "Error",
        description: "Failed to process files",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsProcessing(false);
      setProgress(100);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-blue-600" />
            Upload AMC Portfolio Files
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept=".xlsx,.xls,.pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-900">
                  Upload Portfolio Files
                </p>
                <p className="text-sm text-gray-500">
                  Drag and drop or click to select XLS/XLSX/PDF files
                </p>
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {file.file_type === 'PDF' ? (
                          <FileText className="h-5 w-5 text-red-600" />
                        ) : (
                          <FileSpreadsheet className="h-5 w-5 text-green-600" />
                        )}
                        <span className="font-medium">{file.file.name}</span>
                        <Badge variant={
                          file.upload_status === 'success' ? 'default' :
                          file.upload_status === 'error' ? 'destructive' :
                          file.upload_status === 'uploading' ? 'secondary' : 'outline'
                        }>
                          {file.upload_status}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        disabled={file.upload_status === 'uploading'}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">AMC Name</label>
                        <Select
                          value={file.amc_name}
                          onValueChange={(value) => updateFileDetails(file.id, 'amc_name', value)}
                          disabled={file.upload_status === 'uploading'}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select AMC" />
                          </SelectTrigger>
                          <SelectContent>
                            {amcNames.map((amc) => (
                              <SelectItem key={amc} value={amc}>
                                {amc}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Portfolio Date</label>
                        <Input
                          type="date"
                          value={file.portfolio_date}
                          onChange={(e) => updateFileDetails(file.id, 'portfolio_date', e.target.value)}
                          disabled={file.upload_status === 'uploading'}
                        />
                      </div>
                    </div>

                    {file.error_message && (
                      <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                        Error: {file.error_message}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {isProcessing && (
              <div className="space-y-2">
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-center text-gray-600">
                  Processing files... {progress.toFixed(0)}%
                </p>
              </div>
            )}

            <Button
              onClick={processAllFiles}
              disabled={isProcessing || uploadedFiles.length === 0}
              className="w-full"
            >
              {isProcessing ? "Processing..." : `Upload ${uploadedFiles.length} Files`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
