
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileSpreadsheet, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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

const AdminPortfolioUploader = () => {
  const [amcList, setAmcList] = useState<AMC[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAMCList();
  }, []);

  const fetchAMCList = async () => {
    try {
      const { data, error } = await supabase
        .from('amc_list')
        .select('*')
        .eq('is_active', true)
        .order('amc_name');

      if (error) throw error;
      setAmcList(data || []);
    } catch (error) {
      console.error('Error fetching AMC list:', error);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        amc_name: '',
        portfolio_date: new Date().toISOString().split('T')[0],
        status: 'pending'
      };

      setUploadedFiles(prev => [...prev, newFile]);
    });

    event.target.value = '';
  };

  const updateFileDetails = (fileId: string, field: keyof UploadedFile, value: string) => {
    setUploadedFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, [field]: value } : file
    ));
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const processFiles = async () => {
    const validFiles = uploadedFiles.filter(file => 
      file.amc_name && file.portfolio_date && file.status === 'pending'
    );

    if (validFiles.length === 0) {
      toast({
        title: "Error",
        description: "Please add files and fill in all required details",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      for (const file of validFiles) {
        setUploadedFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'uploading' } : f
        ));

        try {
          const fileReader = new FileReader();
          const fileData = await new Promise<string>((resolve, reject) => {
            fileReader.onload = () => resolve(fileReader.result as string);
            fileReader.onerror = reject;
            fileReader.readAsDataURL(file.file);
          });

          const { error } = await supabase
            .from('amc_portfolio_files')
            .insert({
              amc_name: file.amc_name,
              portfolio_date: file.portfolio_date,
              file_name: file.file.name,
              file_type: file.file.name.toLowerCase().endsWith('.pdf') ? 'PDF' : 'XLSX',
              file_size: file.file.size,
              file_data: fileData,
              upload_status: 'uploaded'
            });

          if (error) throw error;

          setUploadedFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, status: 'success' } : f
          ));

          toast({
            title: "Success",
            description: `${file.amc_name} portfolio uploaded successfully`,
            duration: 2000,
          });

        } catch (error) {
          console.error('Error uploading file:', error);
          setUploadedFiles(prev => prev.map(f => 
            f.id === file.id ? { 
              ...f, 
              status: 'error',
              error_message: error instanceof Error ? error.message : 'Upload failed'
            } : f
          ));
        }
      }

      const successCount = uploadedFiles.filter(f => f.status === 'success').length;
      toast({
        title: "Processing Complete",
        description: `Uploaded ${successCount} files successfully`,
        duration: 3000,
      });

    } catch (error) {
      console.error('Error processing files:', error);
      toast({
        title: "Error",
        description: "Failed to process files",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

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
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              accept=".xlsx,.xls,.pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="portfolio-file-upload"
            />
            <label htmlFor="portfolio-file-upload" className="cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-900">
                Upload Portfolio Files
              </p>
              <p className="text-sm text-gray-500">
                Excel and PDF files supported
              </p>
            </label>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-5 w-5 text-green-600" />
                      <span className="font-medium">{file.file.name}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        file.status === 'success' ? 'bg-green-100 text-green-800' :
                        file.status === 'error' ? 'bg-red-100 text-red-800' :
                        file.status === 'uploading' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {file.status}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
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
                        onValueChange={(value) => updateFileDetails(file.id, 'amc_name', value)}
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
                        onChange={(e) => updateFileDetails(file.id, 'portfolio_date', e.target.value)}
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
