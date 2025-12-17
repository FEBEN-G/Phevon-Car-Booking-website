import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { chatService, type ChatMessage } from '../../services/chatService';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '../ui/Button';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(Math.random().toString(36).substring(7));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message to UI immediately
    const tempMessage: ChatMessage = {
      message: userMessage,
      response: '...',
    };
    setMessages(prev => [...prev, tempMessage]);
    setLoading(true);

    try {
      const response = await chatService.sendMessage(userMessage, sessionId.current);
      
      // Replace temp message with actual response
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = response;
        return updated;
      });
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].response = 'Sorry, I encountered an error. Please try again.';
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedPrompts = [
    "Show me luxury cars",
    "What SUVs are available?",
    "Cars under 2000 ETB per day",
  ];

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary hover:bg-primary-hover text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-50"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-primary text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              <h3 className="font-bold">Phevon Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <p className="mb-4">👋 Hi! I'm your car booking assistant.</p>
                <p className="text-sm mb-4">Try asking:</p>
                <div className="space-y-2">
                  {suggestedPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(prompt)}
                      className="block w-full text-left text-sm bg-gray-50 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div key={idx} className="space-y-2">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-primary text-white px-4 py-2 rounded-2xl rounded-tr-sm max-w-[80%]">
                    {msg.message}
                  </div>
                </div>
                {/* Bot Response */}
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-2xl rounded-tl-sm max-w-[85%] prose prose-sm prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-li:my-0">
                    <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                            table: ({node, ...props}: any) => (
                                <div className="overflow-x-auto my-2 border border-gray-200 rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200 text-sm" {...props} />
                                </div>
                            ),
                            thead: ({node, ...props}: any) => <thead className="bg-gray-50" {...props} />,
                            th: ({node, ...props}: any) => <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />,
                            td: ({node, ...props}: any) => <td className="px-3 py-2 whitespace-nowrap text-gray-700 border-t border-gray-100" {...props} />,
                            p: ({node, ...props}: any) => <p className="leading-snug text-sm" {...props} />
                        }}
                    >
                        {msg.response}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
              <Button onClick={handleSend} disabled={loading || !input.trim()} className="px-4">
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
