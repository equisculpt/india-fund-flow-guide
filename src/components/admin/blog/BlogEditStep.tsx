
import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

interface BlogEditStepProps {
  generatedBlog: GeneratedBlog;
  chatMessages: ChatMessage[];
  chatInput: string;
  setChatInput: (value: string) => void;
  onSendMessage: () => void;
  onContinue: () => void;
}

const BlogEditStep = ({ 
  generatedBlog, 
  chatMessages, 
  chatInput, 
  setChatInput, 
  onSendMessage, 
  onContinue 
}: BlogEditStepProps) => {
  return (
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
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
          />
          <Button onClick={onSendMessage} size="sm">
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <Button onClick={onContinue} className="w-full">
          Preview & Publish
        </Button>
      </div>
    </div>
  );
};

export default BlogEditStep;
