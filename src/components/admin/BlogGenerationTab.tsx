
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Bot } from 'lucide-react';
import BlogStepNavigation from './blog/BlogStepNavigation';
import FileUploadStep from './blog/FileUploadStep';
import BlogGenerationStep from './blog/BlogGenerationStep';
import BlogEditStep from './blog/BlogEditStep';
import BlogPreviewStep from './blog/BlogPreviewStep';

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

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'upload':
        return (
          <FileUploadStep
            uploadedFiles={uploadedFiles}
            onFileProcessed={handleFileProcessed}
            onContinue={() => setCurrentStep('generate')}
          />
        );
      case 'generate':
        return (
          <BlogGenerationStep
            requirements={requirements}
            setRequirements={setRequirements}
            onGenerate={generateBlog}
            isGenerating={isGenerating}
          />
        );
      case 'edit':
        return generatedBlog ? (
          <BlogEditStep
            generatedBlog={generatedBlog}
            chatMessages={chatMessages}
            chatInput={chatInput}
            setChatInput={setChatInput}
            onSendMessage={sendChatMessage}
            onContinue={() => setCurrentStep('preview')}
          />
        ) : null;
      case 'preview':
        return generatedBlog ? (
          <BlogPreviewStep
            generatedBlog={generatedBlog}
            onBackToEdit={() => setCurrentStep('edit')}
            onPublish={publishBlog}
            isPublishing={isPublishing}
          />
        ) : null;
      default:
        return null;
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
          <BlogStepNavigation
            currentStep={currentStep}
            uploadedFiles={uploadedFiles}
            generatedBlog={generatedBlog}
            onStepChange={setCurrentStep}
          />
          {renderCurrentStep()}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogGenerationTab;
