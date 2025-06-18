
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, MessageCircle, Activity } from 'lucide-react';

interface VoiceCommand {
  command: string;
  response: string;
  timestamp: string;
  type: 'query' | 'action' | 'navigation';
}

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [voiceCommands, setVoiceCommands] = useState<VoiceCommand[]>([]);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);

        if (event.results[current].isFinal) {
          processVoiceCommand(transcriptText);
        }
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    let response = '';
    let type: 'query' | 'action' | 'navigation' = 'query';

    if (lowerCommand.includes('portfolio value') || lowerCommand.includes('portfolio worth')) {
      response = 'Your current portfolio value is ₹5,42,000 with a gain of ₹42,000 or 8.4%';
      type = 'query';
    } else if (lowerCommand.includes('top performing fund')) {
      response = 'Your top performing fund is Axis Midcap Fund with returns of 18.5% this year';
      type = 'query';
    } else if (lowerCommand.includes('start sip') || lowerCommand.includes('create sip')) {
      response = 'I can help you start a new SIP. Which fund would you like to invest in?';
      type = 'action';
    } else if (lowerCommand.includes('market alert') || lowerCommand.includes('market news')) {
      response = 'Current market is showing bullish trend. Small cap funds are performing well today';
      type = 'query';
    } else if (lowerCommand.includes('tax saving') || lowerCommand.includes('elss')) {
      response = 'You have invested ₹78,000 in ELSS. You can invest ₹72,000 more to save additional tax';
      type = 'query';
    } else if (lowerCommand.includes('navigate to') || lowerCommand.includes('go to')) {
      response = 'I can help you navigate. Where would you like to go?';
      type = 'navigation';
    } else {
      response = 'I understand you said: "' + command + '". How can I help you with your investments?';
      type = 'query';
    }

    const newCommand: VoiceCommand = {
      command,
      response,
      timestamp: new Date().toISOString(),
      type
    };

    setVoiceCommands(prev => [newCommand, ...prev.slice(0, 4)]);
    speakResponse(response);
    setTranscript('');
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const getCommandTypeColor = (type: string) => {
    switch (type) {
      case 'query': return 'bg-blue-100 text-blue-800';
      case 'action': return 'bg-green-100 text-green-800';
      case 'navigation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isSupported) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <MicOff className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-700 mb-2">Voice Assistant Not Supported</h3>
          <p className="text-gray-600">Your browser doesn't support speech recognition.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-purple-600" />
            <CardTitle>AI Voice Assistant</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className={`relative inline-flex items-center justify-center w-24 h-24 rounded-full ${
              isListening ? 'bg-red-100 animate-pulse' : 'bg-gray-100'
            } mb-4`}>
              {isListening ? (
                <Mic className="h-8 w-8 text-red-600" />
              ) : (
                <MicOff className="h-8 w-8 text-gray-600" />
              )}
              {isListening && (
                <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
              )}
            </div>
            
            <div className="mb-4">
              <Button
                onClick={toggleListening}
                className={`${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'}`}
                size="lg"
              >
                {isListening ? 'Stop Listening' : 'Start Voice Assistant'}
              </Button>
            </div>

            {isListening && (
              <div className="mb-4">
                <Badge variant="outline" className="mb-2">
                  <Activity className="h-3 w-3 mr-1" />
                  Listening...
                </Badge>
                {transcript && (
                  <p className="text-sm text-gray-600 italic">"{transcript}"</p>
                )}
              </div>
            )}
          </div>

          <div className="mb-6 p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-3">Try saying:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="text-purple-700">"What's my portfolio value?"</div>
              <div className="text-purple-700">"Show me top performing funds"</div>
              <div className="text-purple-700">"Start a new SIP"</div>
              <div className="text-purple-700">"What are today's market alerts?"</div>
              <div className="text-purple-700">"How much tax can I save?"</div>
              <div className="text-purple-700">"Navigate to dashboard"</div>
            </div>
          </div>

          {voiceCommands.length > 0 && (
            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Recent Voice Interactions
              </h4>
              <div className="space-y-3">
                {voiceCommands.map((cmd, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={getCommandTypeColor(cmd.type)}>
                        {cmd.type}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(cmd.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-800 mb-1"><strong>You:</strong> "{cmd.command}"</p>
                      <p className="text-blue-700"><strong>Assistant:</strong> {cmd.response}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAssistant;
