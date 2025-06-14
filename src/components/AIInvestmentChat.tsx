
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, TrendingUp, Shield, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

const AIInvestmentChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI investment advisor. I can help you choose the best mutual funds based on your goals, risk appetite, and investment horizon. What would you like to know?",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        "Best funds for tax saving",
        "SIP recommendations for beginners", 
        "High growth potential funds",
        "Low risk stable returns"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      // Simulate AI response with better error handling
      await new Promise(resolve => setTimeout(resolve, 1000));
      const aiResponse = generateAIResponse(content);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('AI response error:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    let response = "";
    let suggestions: string[] = [];

    if (lowerMessage.includes("tax") || lowerMessage.includes("80c") || lowerMessage.includes("elss")) {
      response = "For tax saving under Section 80C, I recommend ELSS funds with a 3-year lock-in period:\n\n• **Axis Long Term Equity Fund** - 15.3% annual returns\n• **Mirae Asset Tax Saver Fund** - 14.8% annual returns\n• **DSP Tax Saver Fund** - 16.2% annual returns\n\nThese offer tax deduction up to ₹1.5 lakh and have shown consistent performance.";
      suggestions = ["ELSS fund comparison", "Tax calculation", "SIP vs lumpsum for ELSS"];
    } else if (lowerMessage.includes("beginner") || lowerMessage.includes("start") || lowerMessage.includes("new")) {
      response = "Perfect! For beginners, I recommend starting with:\n\n• **Large Cap funds** for stability (HDFC Top 100, ICICI Prudential Bluechip)\n• **Balanced Advantage funds** for moderate risk\n• **Monthly SIP** of ₹1,000-5,000 to start\n\nThese provide good diversification with lower volatility, ideal for building investment discipline.";
      suggestions = ["Calculate ideal SIP amount", "Risk assessment quiz", "Goal-based planning"];
    } else if (lowerMessage.includes("high growth") || lowerMessage.includes("aggressive") || lowerMessage.includes("small cap")) {
      response = "For high growth potential with higher risk:\n\n• **Small Cap funds** - 22%+ returns (SBI Small Cap Fund)\n• **Mid Cap funds** - 18%+ returns (Kotak Emerging Equity)\n• **Sectoral funds** - Technology, Healthcare themes\n\n⚠️ **Warning**: These come with high volatility. Invest only if you have 5+ year horizon.";
      suggestions = ["Risk vs return analysis", "Volatility explanation", "Portfolio allocation"];
    } else if (lowerMessage.includes("sip") || lowerMessage.includes("systematic")) {
      response = "SIP (Systematic Investment Plan) benefits:\n\n✅ **Rupee Cost Averaging** - Buy more units when prices are low\n✅ **Disciplined investing** - Automated monthly investments\n✅ **Power of compounding** - Long-term wealth creation\n\nRecommended SIP amount: 20-30% of your monthly income across 3-4 different fund categories.";
      suggestions = ["SIP calculator", "Best SIP funds", "SIP vs lumpsum"];
    } else if (lowerMessage.includes("portfolio") || lowerMessage.includes("review")) {
      response = "For portfolio review, I need to understand:\n\n📊 **Current holdings** - Which funds do you own?\n💰 **Investment amount** - Monthly SIP or total invested?\n🎯 **Goals** - Retirement, house, education?\n⏰ **Time horizon** - When do you need the money?\n\nShare these details for personalized advice!";
      suggestions = ["Upload portfolio screenshot", "Goal-based review", "Rebalancing advice"];
    } else {
      response = "I'm here to help with all your investment queries! I can assist with:\n\n🎯 **Fund recommendations** based on your goals\n📈 **Portfolio analysis** and optimization\n💡 **SIP planning** and calculations\n💰 **Tax saving** strategies\n📊 **Risk assessment** and allocation\n\nWhat specific area interests you most?";
      suggestions = ["Tax saving options", "SIP planning", "Portfolio review", "Risk assessment"];
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
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-600" />
          AI Investment Advisor
          <span className="text-sm font-normal text-green-600 ml-auto flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Online
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`p-2 rounded-full ${message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-100'}`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div className={`rounded-lg p-3 ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                    <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
                    <span className={`text-xs mt-2 block ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
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
                <div className="p-2 rounded-full bg-gray-100">
                  <Bot className="h-4 w-4 text-gray-600" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
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
        
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about mutual funds, SIP planning, or investment strategies..."
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
          <p className="text-xs text-gray-500 mt-2">Press Enter to send, Shift+Enter for new line</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInvestmentChat;
