
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
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    let response = "";
    let suggestions: string[] = [];

    if (lowerMessage.includes("tax") || lowerMessage.includes("80c")) {
      response = "For tax saving, I recommend ELSS funds with a 3-year lock-in period. Top performers include:\n\n• Axis Long Term Equity Fund - 15.3% returns\n• Mirae Asset Tax Saver Fund - 14.8% returns\n• DSP Tax Saver Fund - 16.2% returns\n\nThese offer tax deduction up to ₹1.5 lakh under Section 80C.";
      suggestions = ["Show ELSS fund details", "Compare tax saving options", "Calculate tax savings"];
    } else if (lowerMessage.includes("beginner") || lowerMessage.includes("start")) {
      response = "For beginners, I suggest starting with:\n\n• Large Cap funds for stability (HDFC Top 100, ICICI Prudential Bluechip)\n• Balanced Advantage funds for moderate risk\n• Start with ₹1,000-5,000 monthly SIP\n\nThese provide good diversification with lower volatility.";
      suggestions = ["Best SIP amount to start", "Risk assessment", "Goal-based planning"];
    } else if (lowerMessage.includes("high growth") || lowerMessage.includes("aggressive")) {
      response = "For high growth potential, consider:\n\n• Small Cap funds - Higher risk, higher returns\n• Mid Cap funds - Balanced growth potential\n• Sectoral funds - Technology, Healthcare themes\n\nExample: SBI Small Cap Fund (22.5% returns) but with high volatility.";
      suggestions = ["Risk vs return analysis", "Small cap fund comparison", "Sectoral fund options"];
    } else {
      response = "I can help you with various investment queries:\n\n• Fund recommendations based on your goals\n• Risk assessment and portfolio allocation\n• SIP planning and calculations\n• Tax saving strategies\n\nWhat specific area would you like to explore?";
      suggestions = ["Goal-based investing", "Portfolio review", "Market outlook", "Fund comparison"];
    }

    return {
      id: Date.now().toString(),
      content: response,
      sender: 'ai',
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-600" />
          AI Investment Advisor
          <span className="text-sm font-normal text-green-600 ml-auto">Online</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`p-2 rounded-full ${message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-100'}`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div className={`rounded-lg p-3 ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                    <p className="whitespace-pre-line">{message.content}</p>
                    <span className={`text-xs mt-1 block ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
                
                {message.suggestions && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs"
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
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
            />
            <Button onClick={() => sendMessage(inputMessage)} disabled={!inputMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInvestmentChat;
