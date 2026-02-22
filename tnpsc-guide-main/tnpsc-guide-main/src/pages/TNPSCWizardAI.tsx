import { useState, useRef, useEffect } from 'react';
import { authService } from '@/services/api/authService';
import { MONGODB_API_URL } from '@/services/api/config';
import { Send, Paperclip, Image, ArrowLeft, Home, Bot, User, Mic, MicOff, Plus, History, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Link } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  attachments?: { name: string; type: string }[];
}

interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

const TNPSCWizardAI = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'வணக்கம்! நான் TNPSC Wizard AI. உங்கள் TNPSC தேர்வு தயாரிப்புக்கு நான் உதவ தயாராக இருக்கிறேன். எந்த கேள்வியும் கேளுங்கள்!',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Fetch chat history from MongoDB on mount or user change
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const userId = authService.getUserId();
        if (!userId) return;

        const response = await fetch(`${MONGODB_API_URL}/api/user-content/chats`, {
          headers: { 'user-id': userId }
        });
        const data = await response.json();
        if (data.success) {
          setChatHistories(data.data.map((h: any) => ({
            id: h._id,
            title: h.title,
            messages: h.messages.map((m: any) => ({
              ...m,
              id: m._id,
              type: m.role === 'user' ? 'user' : 'bot',
              timestamp: new Date(m.timestamp)
            })),
            createdAt: new Date(h.createdAt)
          })));
        }
      } catch (error) {
        console.error('Failed to fetch chat history:', error);
      }
    };
    fetchChats();
  }, []);

  // Save/Update chat in MongoDB
  const handleSaveChat = async (hist: ChatHistory) => {
    try {
      const userId = authService.getUserId();
      if (!userId) return;

      const response = await fetch(`${MONGODB_API_URL}/api/user-content/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': userId
        },
        body: JSON.stringify({
          id: hist.id.length > 20 ? hist.id : undefined, // Check if it's a mongo ID or temporary
          title: hist.title,
          messages: hist.messages.map(m => ({
            role: m.type === 'bot' ? 'assistant' : 'user',
            content: m.content,
            timestamp: m.timestamp
          }))
        })
      });
      const data = await response.json();
      if (data.success) {
        // Update local state with the saved chat (to get the real ID)
        const savedChat = {
          id: data.data._id,
          title: data.data.title,
          messages: data.data.messages.map((m: any) => ({
            ...m,
            id: m._id,
            type: m.role === 'user' ? 'user' : 'bot',
            timestamp: new Date(m.timestamp)
          })),
          createdAt: new Date(data.data.createdAt)
        };

        setChatHistories(prev => {
          const filtered = prev.filter(h => h.id !== hist.id && h.id !== savedChat.id);
          return [savedChat, ...filtered];
        });
        setCurrentChatId(savedChat.id);
      }
    } catch (error) {
      console.error('Failed to save chat:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleNewChat = () => {
    // If current chat has messages, save it before resetting
    if (messages.length > 1) {
      const chatToSave: ChatHistory = {
        id: currentChatId || Date.now().toString(),
        title: messages[1]?.content.slice(0, 30) + '...' || 'New Chat',
        messages: messages,
        createdAt: new Date(),
      };
      handleSaveChat(chatToSave);
    }

    // Reset to new chat
    setMessages([
      {
        id: '1',
        type: 'bot',
        content: 'வணக்கம்! நான் TNPSC Wizard AI. உங்கள் TNPSC தேர்வு தயாரிப்புக்கு நான் உதவ தயாராக இருக்கிறேன். எந்த கேள்வியும் கேளுங்கள்!',
        timestamp: new Date(),
      },
    ]);
    setCurrentChatId(null);
    setShowSidebar(false);
  };

  const loadChat = (history: ChatHistory) => {
    setMessages(history.messages);
    setCurrentChatId(history.id);
    setShowSidebar(false);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getBotResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('syllabus') || lowerQuery.includes('பாடத்திட்டம்')) {
      return 'TNPSC தேர்வுகளுக்கான பாடத்திட்டங்களை நீங்கள் Syllabus பகுதியில் காணலாம். G-1, G-2/IIA, மற்றும் G-IV தேர்வுகளுக்கான முழுமையான பாடத்திட்டங்கள் உள்ளன.';
    }
    if (lowerQuery.includes('book') || lowerQuery.includes('புத்தகம்')) {
      return '6வது முதல் 12வது வகுப்பு வரையிலான அனைத்து பாடப்புத்தகங்களும் Books பகுதியில் கிடைக்கும். Tamil, Maths, Science, Social Science போன்ற பாடங்கள் உள்ளன.';
    }
    if (lowerQuery.includes('question') || lowerQuery.includes('கேள்வி') || lowerQuery.includes('paper')) {
      return 'கடந்த ஆண்டு வினாத்தாள்களை Past Year Questions பகுதியில் ஆண்டு வாரியாக பார்க்கலாம். 2015 முதல் 2025 வரையிலான வினாத்தாள்கள் கிடைக்கும்.';
    }
    if (lowerQuery.includes('tirukural') || lowerQuery.includes('திருக்குறள்')) {
      return 'திருக்குறள் பகுதியில் திருவள்ளுவரின் வரலாறு மற்றும் 20 அதிகாரங்கள் உள்ளன. TNPSC தேர்வுக்கு மிக முக்கியமான பகுதி இது.';
    }

    return 'உங்கள் கேள்விக்கு நன்றி! TNPSC தேர்வு தயாரிப்புக்கு Syllabus, Books, Past Year Questions, மற்றும் Tirukural பகுதிகளை பயன்படுத்துங்கள். மேலும் உதவி தேவைப்பட்டால் கேளுங்கள்!';
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'file' | 'image') => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: `📎 ${file.name}`,
      timestamp: new Date(),
      attachments: [{ name: file.name, type: file.type }],
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `நான் உங்கள் ${type === 'image' ? 'படத்தை' : 'கோப்பை'} பெற்றுக்கொண்டேன். இது தொடர்பான கேள்விகளை கேளுங்கள்!`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);

    event.target.value = '';
  };

  const handleVoiceRecording = async () => {
    if (isRecording) {
      // Stop recording
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          // For now, just show a message that voice was recorded
          const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: '🎤 Voice message recorded',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, userMessage]);

          setIsTyping(true);
          setTimeout(() => {
            const botMessage: Message = {
              id: (Date.now() + 1).toString(),
              type: 'bot',
              content: 'நான் உங்கள் குரல் செய்தியை பெற்றுக்கொண்டேன். குரல் அறிதல் அம்சம் விரைவில் வரும்!',
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);
          }, 1000);

          // Stop all tracks
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
        toast({
          title: "Recording started",
          description: "Tap the mic button again to stop",
        });
      } catch (error) {
        toast({
          title: "Microphone access denied",
          description: "Please allow microphone access to use voice input",
          variant: "destructive",
        });
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-4 flex flex-col max-w-4xl relative">
        {/* Sidebar for Chat History */}
        <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border transform transition-transform duration-300 ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Chat History</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowSidebar(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4">
              <Button onClick={handleNewChat} className="w-full" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            </div>

            <ScrollArea className="flex-1 px-4">
              {chatHistories.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No chat history yet</p>
              ) : (
                <div className="space-y-2">
                  {chatHistories.map((history) => (
                    <button
                      key={history.id}
                      onClick={() => loadChat(history)}
                      className={`w-full text-left p-3 rounded-lg hover:bg-accent/50 transition-colors ${currentChatId === history.id ? 'bg-accent/30' : ''}`}
                    >
                      <p className="text-sm font-medium truncate">{history.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {history.createdAt.toLocaleDateString()}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>

        {/* Overlay when sidebar is open */}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Back Navigation */}
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" size="icon" onClick={() => setShowSidebar(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/">
            <Button variant="outline" size="sm">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Chat Header */}
        <div className="bg-primary text-primary-foreground rounded-t-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg">TNPSC Wizard AI</h1>
              <p className="text-sm opacity-80">உங்கள் தேர்வு உதவியாளர்</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              className="flex flex-col items-center text-primary-foreground hover:opacity-80 transition-opacity"
              onClick={() => setShowSidebar(true)}
            >
              <History className="h-5 w-5" />
              <span className="text-xs mt-1">History</span>
            </button>
            <button
              className="flex flex-col items-center text-primary-foreground hover:opacity-80 transition-opacity"
              onClick={handleNewChat}
            >
              <Plus className="h-5 w-5" />
              <span className="text-xs mt-1">New Chat</span>
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 bg-card border-x border-border">
          <ScrollArea className="h-[calc(100vh-380px)] min-h-[300px]">
            <div className="p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${message.type === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted text-foreground rounded-bl-md'
                      }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.type === 'bot' && (
                        <Bot className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      )}
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      {message.type === 'user' && (
                        <User className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      )}
                    </div>
                    <span className="text-xs opacity-60 mt-1 block text-right">
                      {message.timestamp.toLocaleTimeString('ta-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground p-3 rounded-2xl rounded-bl-md">
                    <div className="flex items-center gap-2">
                      <Bot className="h-5 w-5" />
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Input Area - WhatsApp Style */}
        <div className="bg-card border border-t-0 border-border rounded-b-xl p-3">
          <div className="flex items-center gap-2">
            {/* File Upload */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFileUpload(e, 'file')}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
            />
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="h-5 w-5" />
            </Button>

            {/* Image Upload */}
            <input
              type="file"
              ref={imageInputRef}
              onChange={(e) => handleFileUpload(e, 'image')}
              className="hidden"
              accept="image/*"
            />
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => imageInputRef.current?.click()}
            >
              <Image className="h-5 w-5" />
            </Button>

            {/* Voice Recording */}
            <Button
              variant="ghost"
              size="icon"
              className={`${isRecording ? 'text-destructive animate-pulse' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={handleVoiceRecording}
            >
              {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>

            {/* Text Input */}
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 rounded-full bg-muted border-0"
            />

            {/* Send Button */}
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              size="icon"
              className="rounded-full bg-primary hover:bg-primary/90"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TNPSCWizardAI;
