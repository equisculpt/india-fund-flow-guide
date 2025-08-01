import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, MessageCircle, AlertTriangle, CheckCircle, Paperclip } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import FileUploadComponent from '@/components/shared/FileUploadComponent';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai' | 'human';
  timestamp: Date;
  type?: 'escalation' | 'resolved' | 'normal';
  suggestions?: string[];
}

interface EscalationReason {
  code: string;
  reason: string;
  priority: 'low' | 'medium' | 'high';
}

const IntelligentChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your financial information assistant. I can help you understand mutual funds, market concepts, and analyze fund data. Please note that I provide educational information only, not investment advice. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        "Explain mutual fund basics",
        "Compare fund categories", 
        "Understanding expense ratios",
        "SIP vs lumpsum differences"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [escalationStatus, setEscalationStatus] = useState<'none' | 'pending' | 'escalated'>('none');
  const [humanAgentConnected, setHumanAgentConnected] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const detectEscalationNeeds = (userMessage: string): EscalationReason | null => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Investment advice requests
    if (lowerMessage.includes("should i invest") || 
        lowerMessage.includes("what to buy") ||
        lowerMessage.includes("which fund to choose") ||
        lowerMessage.includes("investment advice") ||
        lowerMessage.includes("portfolio allocation")) {
      return {
        code: 'investment_advice',
        reason: 'User requesting specific investment advice',
        priority: 'high'
      };
    }

    // Technical trading questions
    if (lowerMessage.includes("when to sell") ||
        lowerMessage.includes("market timing") ||
        lowerMessage.includes("exit strategy")) {
      return {
        code: 'trading_advice',
        reason: 'User asking for trading/timing advice',
        priority: 'high'
      };
    }

    // Personal financial planning
    if (lowerMessage.includes("financial planning") ||
        lowerMessage.includes("retirement planning") ||
        lowerMessage.includes("goal planning")) {
      return {
        code: 'financial_planning',
        reason: 'Complex financial planning query',
        priority: 'medium'
      };
    }

    // Complex tax queries
    if (lowerMessage.includes("tax implications") ||
        lowerMessage.includes("tax planning") ||
        lowerMessage.includes("tax benefits")) {
      return {
        code: 'tax_advice',
        reason: 'Tax-related advice needed',
        priority: 'medium'
      };
    }

    // Complaints or issues
    if (lowerMessage.includes("complaint") ||
        lowerMessage.includes("problem") ||
        lowerMessage.includes("issue") ||
        lowerMessage.includes("not working")) {
      return {
        code: 'support_issue',
        reason: 'Technical or service issue',
        priority: 'high'
      };
    }

    return null;
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Check if escalation is needed
      const escalationReason = detectEscalationNeeds(content);
      
      if (escalationReason && escalationStatus === 'none') {
        await handleEscalation(escalationReason);
        return;
      }

      // If human agent is connected, route to human
      if (humanAgentConnected) {
        await handleHumanResponse(content);
        return;
      }

      // Generate AI response
      await new Promise(resolve => setTimeout(resolve, 1000));
      const aiResponse = generateEducationalResponse(content);
      setMessages(prev => [...prev, aiResponse]);
      
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to process message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleEscalation = async (reason: EscalationReason) => {
    setEscalationStatus('pending');
    
    const escalationMessage: Message = {
      id: `escalation-${Date.now()}`,
      content: `I understand you're looking for specific ${reason.code.replace('_', ' ')}. For personalized guidance and compliance with regulations, I'm connecting you with one of our qualified human advisors who can better assist you with this request.`,
      sender: 'ai',
      timestamp: new Date(),
      type: 'escalation'
    };

    setMessages(prev => [...prev, escalationMessage]);

    // Simulate human connection (in real app, this would trigger actual human agent notification)
    setTimeout(() => {
      setEscalationStatus('escalated');
      setHumanAgentConnected(true);
      
      const humanJoinMessage: Message = {
        id: `human-join-${Date.now()}`,
        content: "Hello! I'm a qualified financial advisor. I've reviewed your question and I'm here to help you with personalized guidance. Please note that any advice I provide will be based on your specific situation and regulatory guidelines. How can I assist you?",
        sender: 'human',
        timestamp: new Date(),
        type: 'resolved'
      };
      
      setMessages(prev => [...prev, humanJoinMessage]);
      
      toast({
        title: "Human Advisor Connected",
        description: "A qualified advisor is now assisting you.",
      });
    }, 2000);

    setIsTyping(false);
  };

  const handleHumanResponse = async (userMessage: string) => {
    // Simulate human advisor response
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const humanResponse: Message = {
      id: `human-${Date.now()}`,
      content: "Thank you for your question. Based on your query, I'd need to understand your specific financial situation, risk tolerance, and investment goals to provide appropriate guidance. Would you like to schedule a detailed consultation where we can discuss your needs comprehensively? This ensures I can provide you with compliant and suitable guidance.",
      sender: 'human',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, humanResponse]);
    setIsTyping(false);
  };

  const handleFileProcessed = (file: any, extractedContent?: string) => {
    setUploadedFiles(prev => [...prev, file]);
    
    if (extractedContent) {
      // Add a system message about the uploaded file
      const fileMessage: Message = {
        id: `file-${Date.now()}`,
        content: `📎 File uploaded: ${file.original_filename}\n\nI've extracted the content from your file and can now help you create blogs, analyze the content, or answer questions based on this information. What would you like me to do with this content?`,
        sender: 'ai',
        timestamp: new Date(),
        suggestions: [
          "Create a blog post from this content",
          "Summarize the key points",
          "Extract main topics for discussion",
          "Generate SEO-friendly content"
        ]
      };
      
      setMessages(prev => [...prev, fileMessage]);
    }
    
    setShowFileUpload(false);
  };

  const generateEducationalResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    let response = "";
    let suggestions: string[] = [];

    // Check if user is asking about uploaded files
    if (uploadedFiles.length > 0 && (lowerMessage.includes("blog") || lowerMessage.includes("create") || lowerMessage.includes("write"))) {
      const latestFile = uploadedFiles[uploadedFiles.length - 1];
      response = `I'll help you create a blog post based on your uploaded file "${latestFile.original_filename}". Here's a structured approach:\n\n**Blog Creation Process:**\n\n1. **Content Analysis**: I've analyzed your uploaded content\n2. **Topic Identification**: Key themes and subjects identified\n3. **Structure Planning**: Organized into engaging sections\n4. **SEO Optimization**: Keywords and meta descriptions included\n\n**Suggested Blog Structure:**\n• Introduction with hook\n• Main content sections\n• Key insights and takeaways\n• Call-to-action conclusion\n\nWould you like me to proceed with creating the full blog post, or would you prefer to focus on specific sections first?`;
      suggestions = ["Create full blog post", "Generate blog outline", "Extract key quotes", "Add SEO keywords"];
    } else if (lowerMessage.includes("mutual fund") && lowerMessage.includes("basic")) {
      response = "Mutual funds are investment vehicles that pool money from multiple investors to purchase a diversified portfolio of stocks, bonds, or other securities. Here are the key concepts:\n\n• **Professional Management**: Fund managers make investment decisions\n• **Diversification**: Reduces risk by spreading investments\n• **Liquidity**: Can be bought/sold on any business day\n• **Transparency**: Regular reporting of holdings and performance\n\nThere are different types like Equity, Debt, and Hybrid funds, each serving different investment objectives.";
      suggestions = ["Types of mutual funds", "How NAV works", "SIP benefits", "Expense ratio impact"];
    } else if (lowerMessage.includes("sip") || lowerMessage.includes("systematic investment")) {
      response = "SIP (Systematic Investment Plan) is a method of investing fixed amounts regularly in mutual funds. Key educational points:\n\n• **Rupee Cost Averaging**: Helps reduce impact of market volatility\n• **Discipline**: Creates regular investment habit\n• **Flexibility**: Can start with small amounts\n• **Compounding**: Long-term wealth creation through reinvestment\n\nSIPs work well for long-term goals due to the power of compounding and averaging out market fluctuations.";
      suggestions = ["SIP vs Lumpsum comparison", "Power of compounding", "SIP frequency options", "How to track SIP performance"];
    } else if (lowerMessage.includes("expense ratio")) {
      response = "Expense ratio is the annual fee charged by mutual funds, expressed as a percentage of assets. Important facts:\n\n• **Direct vs Regular**: Direct plans have lower expense ratios\n• **Impact on Returns**: Higher expenses reduce your net returns\n• **Category Differences**: Equity funds typically have higher ratios than debt funds\n• **Regulation**: SEBI has set limits for different fund categories\n\nFor example, if a fund has 1% expense ratio, you pay ₹100 annually for every ₹10,000 invested.";
      suggestions = ["Direct vs Regular plans", "SEBI expense ratio limits", "Total Expense Ratio calculation", "Impact on long-term returns"];
    } else if (lowerMessage.includes("nav") || lowerMessage.includes("net asset value")) {
      response = "NAV (Net Asset Value) represents the per-unit market value of a mutual fund. Key points:\n\n• **Calculation**: (Total Assets - Total Liabilities) ÷ Total Units\n• **Declaration**: Updated daily after market close\n• **Pricing**: You buy/sell at the applicable NAV\n• **Myth**: Higher NAV doesn't mean expensive fund\n\nNAV is simply the price per unit and doesn't indicate fund quality or future performance.";
      suggestions = ["How NAV is calculated", "NAV vs Fund performance", "Cut-off timing for NAV", "Historical NAV analysis"];
    } else if (lowerMessage.includes("risk") || lowerMessage.includes("volatility")) {
      response = "Investment risk in mutual funds comes from market fluctuations. Educational aspects:\n\n• **Market Risk**: Price movements due to market conditions\n• **Credit Risk**: In debt funds, risk of issuer default\n• **Liquidity Risk**: Difficulty in selling securities\n• **Concentration Risk**: Over-exposure to specific sectors/stocks\n\nRisk and return are related - potentially higher returns usually come with higher risk levels.";
      suggestions = ["Risk measurement tools", "Standard deviation explained", "Beta coefficient", "Risk profiling importance"];
    } else {
      response = "I'm here to provide educational information about mutual funds, markets, and investment concepts. I can help explain:\n\n📚 **Fund Basics**: Types, NAV, expense ratios\n📈 **Market Concepts**: Risk, returns, volatility\n🔍 **Analysis Tools**: Ratios, performance metrics\n💡 **Investment Methods**: SIP, lumpsum, switching\n\nWhat specific topic would you like to understand better?";
      suggestions = ["Mutual fund categories", "Risk and return concepts", "Performance analysis", "Market terminology"];
    }

    return {
      id: `ai-${Date.now()}`,
      content: response,
      sender: 'ai',
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  };

  return (
    <div className="h-[600px] flex flex-col">
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-4 flex-shrink-0">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            Investment Information Assistant
            <div className="ml-auto flex items-center gap-2">
              {escalationStatus === 'escalated' && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Human Advisor
                </Badge>
              )}
              {escalationStatus === 'pending' && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Connecting...
                </Badge>
              )}
              <span className="text-sm font-normal text-green-600 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Online
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0 min-h-0">
          {/* File Upload Section */}
          {showFileUpload && (
            <div className="border-b p-4 bg-gray-50 flex-shrink-0">
              <FileUploadComponent
                onFileProcessed={handleFileProcessed}
                acceptedTypes={['.pdf', '.xls', '.xlsx', '.doc', '.docx']}
                maxFileSize={10}
                uploadPurpose="chat"
              />
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`flex items-start gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`p-2 rounded-full flex-shrink-0 ${
                      message.sender === 'user' ? 'bg-blue-600' : 
                      message.sender === 'human' ? 'bg-green-600' : 'bg-gray-100'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : message.sender === 'human' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-gray-600" />
                      )}
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.sender === 'user' ? 'bg-blue-600 text-white' : 
                      message.sender === 'human' ? 'bg-green-100 text-green-900' :
                      message.type === 'escalation' ? 'bg-yellow-100 text-yellow-900' :
                      'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs ${
                          message.sender === 'user' ? 'text-blue-100' : 
                          message.sender === 'human' ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {message.sender === 'human' && (
                          <Badge variant="outline" className="text-xs bg-green-50 border-green-200">
                            Qualified Advisor
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs hover:bg-blue-50 hover:text-blue-700 border-blue-200"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-full flex-shrink-0 ${humanAgentConnected ? 'bg-green-600' : 'bg-gray-100'}`}>
                    {humanAgentConnected ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div className={`rounded-lg p-3 ${humanAgentConnected ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t p-4 flex-shrink-0">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFileUpload(!showFileUpload)}
                className="shrink-0"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={humanAgentConnected ? "Ask your qualified advisor..." : "Ask about mutual funds, market concepts..."}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
              />
              <Button 
                onClick={() => sendMessage(inputMessage)} 
                disabled={!inputMessage.trim() || isTyping}
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-500">Educational information only • Not investment advice</p>
              {escalationStatus === 'none' && (
                <p className="text-xs text-blue-600">AI will connect human advisor if needed</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntelligentChatBot;
