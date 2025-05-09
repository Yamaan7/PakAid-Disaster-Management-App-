import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    isAdmin: boolean;
  };
  content: string;
  timestamp: Date;
}

interface TeamChatProps {
  teamId: string;
  initialMessages?: Message[];
}

const TeamChat = ({ teamId, initialMessages = [] }: TeamChatProps) => {
  const { isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !isAuthenticated) return;
    
    const message: Message = {
      id: Date.now().toString(),
      sender: {
        id: "current-user",
        name: "You",
        isAdmin: false,
      },
      content: newMessage,
      timestamp: new Date(),
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="flex flex-col h-[500px] bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-neutral-light px-4 py-3 border-b border-gray-200">
        <h3 className="font-medium text-lg">Team Communication</h3>
        <p className="text-sm text-gray-600">
          Chat with your team members and administrators
        </p>
      </div>
      
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4" ref={scrollAreaRef}>
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender.id === "current-user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex max-w-[80%] ${message.sender.id === "current-user" ? "flex-row-reverse" : "flex-row"}`}>
                <Avatar className={`h-8 w-8 ${message.sender.id === "current-user" ? "ml-2" : "mr-2"}`}>
                  {message.sender.avatar ? (
                    <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                  ) : (
                    <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                  )}
                </Avatar>
                
                <div>
                  <div className={`px-3 py-2 rounded-lg 
                    ${message.sender.id === "current-user" 
                      ? "bg-secondary text-white rounded-tr-none" 
                      : message.sender.isAdmin 
                        ? "bg-destructive text-white rounded-tl-none" 
                        : "bg-neutral-light text-gray-800 rounded-tl-none"
                    }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  
                  <div className={`text-xs text-gray-500 mt-1 ${message.sender.id === "current-user" ? "text-right" : "text-left"}`}>
                    <span className="font-medium">{message.sender.name}</span> • {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {messages.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No messages yet. Start the conversation!</p>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="flex items-center space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={!isAuthenticated}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!newMessage.trim() || !isAuthenticated}
            size="icon"
            variant="secondary"
          >
            <Send size={16} />
          </Button>
        </div>
        
        {!isAuthenticated && (
          <p className="text-xs text-gray-500 mt-2">
            You need to be logged in to send messages.
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamChat;
