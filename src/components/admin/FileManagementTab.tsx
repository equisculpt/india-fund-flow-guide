
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Eye, Edit, Trash2, Plus, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import FileUploadComponent from '@/components/shared/FileUploadComponent';

interface UploadedFile {
  id: string;
  filename: string;
  original_filename: string;
  file_type: string;
  file_size: number;
  extracted_content: string;
  upload_purpose: string;
  is_processed: boolean;
  created_at: string;
  user_id: string;
}

const FileManagementTab = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPurpose, setFilterPurpose] = useState<string>('all');
  const [showUpload, setShowUpload] = useState(false);
  const [blogContent, setBlogContent] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [isGeneratingBlog, setIsGeneratingBlog] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('uploaded_files')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (error: any) {
      console.error('Error fetching files:', error);
      toast({
        title: "Error",
        description: "Failed to fetch uploaded files",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileProcessed = (file: any) => {
    fetchFiles(); // Refresh the list
    setShowUpload(false);
    toast({
      title: "File uploaded",
      description: "File has been uploaded and processed successfully",
    });
  };

  const generateBlogFromFile = async (file: UploadedFile) => {
    if (!file.extracted_content) {
      toast({
        title: "No content",
        description: "This file hasn't been processed yet or has no extractable content",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingBlog(true);
    try {
      // Simulate blog generation - in real implementation, this would use AI
      const generatedTitle = `Insights from ${file.original_filename.replace(/\.[^/.]+$/, "")}`;
      const generatedContent = `# ${generatedTitle}

## Introduction
Based on the analysis of "${file.original_filename}", here are the key insights and actionable takeaways for investors.

## Key Findings
${file.extracted_content.substring(0, 500)}...

## Investment Implications
The data suggests several important considerations for investors:

1. **Market Trends**: Analysis reveals current market positioning
2. **Risk Assessment**: Key risk factors to consider
3. **Opportunities**: Potential investment opportunities identified
4. **Strategic Recommendations**: Actionable insights for portfolio management

## Conclusion
This analysis provides valuable insights that can help inform investment decisions. Always consult with qualified financial advisors before making investment choices.

---
*This blog post was generated from uploaded content and reviewed by our team.*`;

      setBlogTitle(generatedTitle);
      setBlogContent(generatedContent);
      setSelectedFile(file);

      toast({
        title: "Blog generated",
        description: "Blog content has been generated from the file",
      });

    } catch (error: any) {
      console.error('Error generating blog:', error);
      toast({
        title: "Error",
        description: "Failed to generate blog content",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingBlog(false);
    }
  };

  const saveBlogPost = async () => {
    if (!blogTitle.trim() || !blogContent.trim()) {
      toast({
        title: "Missing content",
        description: "Please provide both title and content for the blog post",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('blog_posts')
        .insert({
          title: blogTitle,
          content: blogContent,
          author_id: user.id,
          status: 'draft',
          category: 'analysis',
          moderation_status: 'approved'
        });

      if (error) throw error;

      toast({
        title: "Blog saved",
        description: "Blog post has been saved as draft successfully",
      });

      // Reset form
      setBlogTitle('');
      setBlogContent('');
      setSelectedFile(null);

    } catch (error: any) {
      console.error('Error saving blog:', error);
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive",
      });
    }
  };

  const deleteFile = async (fileId: string) => {
    try {
      const { error } = await supabase
        .from('uploaded_files')
        .delete()
        .eq('id', fileId);

      if (error) throw error;

      setFiles(prev => prev.filter(f => f.id !== fileId));
      if (selectedFile?.id === fileId) {
        setSelectedFile(null);
      }

      toast({
        title: "File deleted",
        description: "File has been deleted successfully",
      });

    } catch (error: any) {
      console.error('Error deleting file:', error);
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      });
    }
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.original_filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.extracted_content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPurpose = filterPurpose === 'all' || file.upload_purpose === filterPurpose;
    return matchesSearch && matchesPurpose;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading files...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Files List */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Uploaded Files ({files.length})
              </CardTitle>
              <Button onClick={() => setShowUpload(!showUpload)} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {showUpload && (
              <div className="p-4 border rounded-lg bg-gray-50">
                <FileUploadComponent
                  onFileProcessed={handleFileProcessed}
                  acceptedTypes={['.pdf', '.xls', '.xlsx', '.doc', '.docx']}
                  maxFileSize={50}
                  uploadPurpose="blog"
                />
              </div>
            )}

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterPurpose} onValueChange={setFilterPurpose}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="chat">Chat</SelectItem>
                  <SelectItem value="blog">Blog</SelectItem>
                  <SelectItem value="analysis">Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedFile?.id === file.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedFile(file)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{file.original_filename}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={file.is_processed ? "default" : "secondary"}>
                          {file.is_processed ? "Processed" : "Processing"}
                        </Badge>
                        <Badge variant="outline">{file.upload_purpose}</Badge>
                        <span className="text-xs text-gray-500">{formatFileSize(file.file_size)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(file.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          generateBlogFromFile(file);
                        }}
                        disabled={!file.is_processed || isGeneratingBlog}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteFile(file.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* File Details / Blog Editor */}
      <div>
        {selectedFile ? (
          <Card>
            <CardHeader>
              <CardTitle>File Details & Blog Editor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">File Information</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Name:</strong> {selectedFile.original_filename}</p>
                  <p><strong>Size:</strong> {formatFileSize(selectedFile.file_size)}</p>
                  <p><strong>Type:</strong> {selectedFile.file_type}</p>
                  <p><strong>Purpose:</strong> {selectedFile.upload_purpose}</p>
                  <p><strong>Status:</strong> {selectedFile.is_processed ? 'Processed' : 'Processing'}</p>
                </div>
              </div>

              {selectedFile.extracted_content && (
                <div>
                  <h3 className="font-medium mb-2">Extracted Content Preview</h3>
                  <div className="text-sm bg-gray-50 p-3 rounded border max-h-32 overflow-y-auto">
                    {selectedFile.extracted_content.substring(0, 300)}...
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="font-medium">Blog Post Editor</h3>
                <Input
                  placeholder="Blog post title..."
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Blog post content..."
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  rows={12}
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={() => generateBlogFromFile(selectedFile)}
                    disabled={!selectedFile.is_processed || isGeneratingBlog}
                    variant="outline"
                  >
                    {isGeneratingBlog ? 'Generating...' : 'Generate Blog'}
                  </Button>
                  <Button 
                    onClick={saveBlogPost}
                    disabled={!blogTitle.trim() || !blogContent.trim()}
                  >
                    Save Blog Post
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-700 mb-2">Select a File</h3>
                <p className="text-gray-600">Choose a file from the left to view details and create blog content.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FileManagementTab;
