
import React from 'react';
import IntelligentChatBot from '@/components/chat/IntelligentChatBot';

const ChatPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Investment Information Assistant
            </h1>
            <p className="text-gray-600">
              Get educational information about mutual funds and investment concepts. 
              Our AI provides informational content, and connects you with qualified human advisors when needed.
            </p>
          </div>
          
          <IntelligentChatBot />
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">How This Works:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• AI provides educational information about mutual funds and markets</li>
              <li>• No investment advice or specific fund recommendations</li>
              <li>• Automatically connects human advisor for personalized guidance</li>
              <li>• All advice from human advisors follows regulatory compliance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
