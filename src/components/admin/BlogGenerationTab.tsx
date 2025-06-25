
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, FileText, Bot, Send, CheckCircle, Eye } from 'lucide-react';
import FileUploadComponent from '@/components/shared/FileUploadComponent';

interface UploadedFile {
  id: string;
  original_filename: string;
  extracted_content?: string;
}

interface GeneratedBlog {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  slug: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const BlogGenerationTab = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [requirements, setRequirements] = useState('');
  const [generatedBlog, setGeneratedBlog] = useState<GeneratedBlog | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [currentStep, setCurrentStep] = useState<'upload' | 'generate' | 'edit' | 'preview'>('upload');
  const { toast } = useToast();

  const handleFileProcessed = (file: any, extractedContent?: string) => {
    setUploadedFiles(prev => [...prev, {
      id: file.id,
      original_filename: file.original_filename,
      extracted_content: extractedContent
    }]);
    
    toast({
      title: "File processed",
      description: `${file.original_filename} has been uploaded and processed.`,
    });
  };

  const generateBlog = async () => {
    if (uploadedFiles.length === 0 || !requirements.trim()) {
      toast({
        title: "Missing information",
        description: "Please upload at least one PDF file and provide requirements.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      console.log('Generating blog from files:', uploadedFiles);
      
      const combinedContent = uploadedFiles
        .map(file => `File: ${file.original_filename}\n${file.extracted_content || ''}`)
        .join('\n\n---\n\n');

      const { data, error } = await supabase.functions.invoke('generate-blog-from-files', {
        body: {
          extractedContent: combinedContent,
          requirements: requirements,
          fileNames: uploadedFiles.map(f => f.original_filename)
        }
      });

      if (error) throw error;

      setGeneratedBlog(data.blog);
      setCurrentStep('edit');
      
      toast({
        title: "Blog generated successfully",
        description: "Your blog has been generated. You can now review and edit it.",
      });

    } catch (error) {
      console.error('Error generating blog:', error);
      toast({
        title: "Generation failed",
        description: "Failed to generate blog. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim() || !generatedBlog) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');

    try {
      const { data, error } = await supabase.functions.invoke('edit-blog-with-ai', {
        body: {
          currentBlog: generatedBlog,
          userRequest: chatInput,
          chatHistory: chatMessages
        }
      });

      if (error) throw error;

      setGeneratedBlog(data.updatedBlog);
      
      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: data.response || 'Blog updated successfully.',
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error editing blog:', error);
      toast({
        title: "Edit failed",
        description: "Failed to process your edit request.",
        variant: "destructive",
      });
    }
  };

  const publishBlog = async () => {
    if (!generatedBlog) return;

    setIsPublishing(true);
    try {
      const { data, error } = await supabase.functions.invoke('publish-blog', {
        body: {
          blog: generatedBlog,
          sourceFiles: uploadedFiles.map(f => f.original_filename)
        }
      });

      if (error) throw error;

      toast({
        title: "Blog published successfully",
        description: `Your blog "${generatedBlog.title}" has been published.`,
      });

      // Reset form
      setUploadedFiles([]);
      setRequirements('');
      setGeneratedBlog(null);
      setChatMessages([]);
      setCurrentStep('upload');

    } catch (error) {
      console.error('Error publishing blog:', error);
      toast({
        title: "Publishing failed",
        description: "Failed to publish blog. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            AI Blog Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Button 
              variant={currentStep === 'upload' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentStep('upload')}
            >
              1. Upload Files
            </Button>
            <Button 
              variant={currentStep === 'generate' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentStep('generate')}
              disabled={uploadedFiles.length === 0}
            >
              2. Generate
            </Button>
            <Button 
              variant={currentStep === 'edit' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentStep('edit')}
              disabled={!generatedBlog}
            >
              3. Edit & Chat
            </Button>
            <Button 
              variant={currentStep === 'preview' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentStep('preview')}
              disabled={!generatedBlog}
            >
              4. Preview & Publish
            </Button>
          </div>

          {/* Step 1: File Upload */}
          {currentStep === 'upload' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Upload PDF Files</h3>
              <FileUploadComponent
                onFileProcessed={handleFileProcessed}
                acceptedTypes={['.pdf']}
                maxFileSize={10}
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
                  <Button 
                    onClick={() => setCurrentStep('generate')}
                    className="w-full mt-4"
                  >
                    Continue to Requirements
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Generate Blog */}
          {currentStep === 'generate' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Blog Requirements</h3>
              <Textarea
                placeholder="Describe what kind of blog you want to generate. Include tone, target audience, key points to cover, style preferences, etc."
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                rows={6}
              />
              <Button 
                onClick={generateBlog}
                disabled={isGenerating || !requirements.trim()}
                className="w-full"
              >
                {isGenerating ? 'Generating Blog...' : 'Generate Blog with AI'}
              </Button>
            </div>
          )}

          {/* Step 3: Edit & Chat */}
          {currentStep === 'edit' && generatedBlog && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Generated Blog</h3>
                <div className="border rounded-lg p-4 max-h-96 overflow-y-auto">
                  <h4 className="font-bold text-xl mb-2">{generatedBlog.title}</h4>
                  <p className="text-gray-600 mb-4 italic">{generatedBlog.excerpt}</p>
                  <div className="prose prose-sm max-w-none">
                    {generatedBlog.content.split('\n').map((paragraph, idx) => (
                      <p key={idx} className="mb-2">{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-500">
                      Tags: {generatedBlog.tags.join(', ')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Chat with AI to Edit</h3>
                <div className="border rounded-lg p-4 h-64 overflow-y-auto bg-gray-50">
                  {chatMessages.length === 0 ? (
                    <p className="text-gray-500 text-center">
                      Ask AI to make changes to your blog. For example:
                      <br />• "Make the introduction more engaging"
                      <br />• "Add more technical details"
                      <br />• "Change the tone to be more casual"
                    </p>
                  ) : (
                    chatMessages.map((message, idx) => (
                      <div key={idx} className={`mb-3 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block p-2 rounded max-w-xs ${
                          message.role === 'user' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-white border'
                        }`}>
                          {message.content}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask AI to make changes..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  />
                  <Button onClick={sendChatMessage} size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <Button 
                  onClick={() => setCurrentStep('preview')}
                  className="w-full"
                >
                  Preview & Publish
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Preview & Publish */}
          {currentStep === 'preview' && generatedBlog && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Final Preview</h3>
              <div className="border rounded-lg p-6 bg-white">
                <h1 className="text-3xl font-bold mb-4">{generatedBlog.title}</h1>
                <p className="text-lg text-gray-600 mb-6 italic">{generatedBlog.excerpt}</p>
                <div className="prose prose-lg max-w-none">
                  {generatedBlog.content.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4">{paragraph}</p>
                  ))}
                </div>
                <div className="mt-8 pt-4 border-t">
                  <p className="text-sm text-gray-500">
                    Tags: {generatedBlog.tags.join(', ')}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Slug: {generatedBlog.slug}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Button 
                  onClick={() => setCurrentStep('edit')}
                  variant="outline"
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Back to Edit
                </Button>
                <Button 
                  onClick={publishBlog}
                  disabled={isPublishing}
                  className="flex-1"
                >
                  {isPublishing ? 'Publishing...' : 'Publish Blog'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogGenerationTab;
