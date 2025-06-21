
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Send, MessageCircle, User, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ChatSession {
  id: string;
  user_email: string;
  status: 'pending' | 'active' | 'resolved';
  escalation_reason: string;
  created_at: string;
  last_message: string;
  priority: 'low' | 'medium' | 'high';
}

interface ChatMessage {
  id: string;
  session_id: string;
  sender: 'user' | 'admin' | 'ai';
  message: string;
  created_at: string;
}

const ChatSupportTab = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchChatSessions();
    const interval = setInterval(fetchChatSessions, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchChatSessions = async () => {
    try {
      // In a real implementation, this would fetch from a chat_sessions table
      // For now, we'll simulate the data structure
      const mockSessions: ChatSession[] = [
        {
          id: '1',
          user_email: 'user@example.com',
          status: 'pending',
          escalation_reason: 'Investment advice request',
          created_at: new Date().toISOString(),
          last_message: 'I need help choosing between these mutual funds...',
          priority: 'high'
        },
        {
          id: '2',
          user_email: 'investor@gmail.com',
          status: 'active',
          escalation_reason: 'Tax planning query',
          created_at: new Date(Date.now() - 3600000).toISOString(),
          last_message: 'What are the tax implications of ELSS funds?',
          priority: 'medium'
        }
      ];
      
      setSessions(mockSessions);
    } catch (error) {
      console.error('Error fetching chat sessions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch chat sessions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (sessionId: string) => {
    try {
      // Mock messages for the selected session
      const mockMessages: ChatMessage[] = [
        {
          id: '1',
          session_id: sessionId,
          sender: 'user',
          message: 'I need help choosing between different mutual funds for my retirement planning.',
          created_at: new Date(Date.now() - 1800000).toISOString()
        },
        {
          id: '2',
          session_id: sessionId,
          sender: 'ai',
          message: 'I understand you need investment advice. Let me connect you with a qualified advisor.',
          created_at: new Date(Date.now() - 1700000).toISOString()
        },
        {
          id: '3',
          session_id: sessionId,
          sender: 'user',
          message: 'I have ₹50,000 to invest monthly and I\'m 35 years old. What would you recommend?',
          created_at: new Date(Date.now() - 1600000).toISOString()
        }
      ];
      
      setMessages(mockMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSessionSelect = (session: ChatSession) => {
    setSelectedSession(session);
    fetchMessages(session.id);
  };

  const sendAdminResponse = async () => {
    if (!newMessage.trim() || !selectedSession) return;

    try {
      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        session_id: selectedSession.id,
        sender: 'admin',
        message: newMessage,
        created_at: new Date().toISOString()
      };

      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');

      // Update session status to active if it was pending
      if (selectedSession.status === 'pending') {
        const updatedSession = { ...selectedSession, status: 'active' as const };
        setSelectedSession(updatedSession);
        setSessions(prev => prev.map(s => s.id === selectedSession.id ? updatedSession : s));
      }

      toast({
        title: "Message Sent",
        description: "Your response has been sent to the user",
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  const resolveSession = async (sessionId: string) => {
    try {
      setSessions(prev => prev.map(s => 
        s.id === sessionId ? { ...s, status: 'resolved' } : s
      ));
      
      if (selectedSession?.id === sessionId) {
        setSelectedSession(prev => prev ? { ...prev, status: 'resolved' } : null);
      }

      toast({
        title: "Session Resolved",
        description: "Chat session has been marked as resolved",
      });
    } catch (error) {
      console.error('Error resolving session:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading chat sessions...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[800px]">
      {/* Sessions List */}
      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Chat Sessions ({sessions.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2 max-h-[700px] overflow-y-auto p-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => handleSessionSelect(session)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedSession?.id === session.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="font-medium text-sm">{session.user_email}</span>
                    </div>
                    <div className="flex gap-1">
                      <Badge className={getPriorityColor(session.priority)}>
                        {session.priority}
                      </Badge>
                      <Badge className={getStatusColor(session.status)}>
                        {session.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{session.escalation_reason}</p>
                  <p className="text-xs text-gray-500 truncate">{session.last_message}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      {new Date(session.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <div className="lg:col-span-2">
        {selectedSession ? (
          <Card className="h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Chat with {selectedSession.user_email}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{selectedSession.escalation_reason}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(selectedSession.status)}>
                    {selectedSession.status}
                  </Badge>
                  {selectedSession.status !== 'resolved' && (
                    <Button
                      onClick={() => resolveSession(selectedSession.id)}
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Resolve
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'admin' 
                        ? 'bg-blue-600 text-white' 
                        : message.sender === 'ai'
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-gray-200 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs ${
                          message.sender === 'admin' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {new Date(message.created_at).toLocaleTimeString()}
                        </span>
                        <Badge variant="outline" className={`text-xs ${
                          message.sender === 'admin' ? 'border-blue-200 text-blue-100' : ''
                        }`}>
                          {message.sender === 'admin' ? 'Admin' : message.sender === 'ai' ? 'AI' : 'User'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              {selectedSession.status !== 'resolved' && (
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your response to the user..."
                      className="flex-1 min-h-[60px] max-h-[120px]"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendAdminResponse();
                        }
                      }}
                    />
                    <Button
                      onClick={sendAdminResponse}
                      disabled={!newMessage.trim()}
                      className="shrink-0 px-6"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Press Enter to send, Shift+Enter for new line
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-700 mb-2">Select a Chat Session</h3>
              <p className="text-gray-600">Choose a session from the left to start responding to users.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ChatSupportTab;
