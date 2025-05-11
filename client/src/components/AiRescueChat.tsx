import { useState, useRef, useEffect } from 'react';
import { Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoogleGenAI } from "@google/genai";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { MessagesSquare, AlertCircle } from 'lucide-react';

type Message = {
    text: string;
    sender: 'user' | 'ai';
};

const SYSTEM_PROMPT = `You are "RescueAI", a friendly virtual assistant with specialized knowledge in disaster response. Your primary role is to help with emergencies, but you can also chat about general topics.

When discussing emergencies (floods, earthquakes, heatwaves, landslides):
- Provide clear, step-by-step instructions
- Recommend official resources (NDMA Pakistan, WHO)
- Use simple language with bullet points when helpful
- For life-threatening situations, start with "🚨 EMERGENCY:"
- Show empathy and concern

For general conversations:
- Be warm, friendly and helpful
- Keep responses concise but informative
- Adapt to the user's tone

Always:
- Maintain a professional yet approachable tone
- Ask clarifying questions when needed
- Admit if you don't know something`;

export default function AIRescueChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            text: "Hi there! 👋 I'm RescueAI, your friendly assistant. I specialize in emergency help but can chat about anything. How can I assist you today?",
            sender: 'ai',
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setMessages((prev) => [...prev, { text: userMessage, sender: 'user' }]);
        setInput('');
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
            const result = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: [{
                    parts: [{ text: `${SYSTEM_PROMPT}\n\nQuery: ${userMessage}` }]
                }]
            });

            const aiResponse = result.candidates?.[0]?.content?.parts?.[0]?.text ||
                "Sorry, I couldn't process that request. Could you please try again?";

            setMessages((prev) => [...prev, { text: aiResponse, sender: 'ai' }]);
        } catch (error) {
            console.error('Gemini API error:', error);
            setMessages((prev) => [
                ...prev,
                {
                    text: "⚠️ Sorry, I'm having trouble responding. For emergencies, please call 1122 (Pakistan Emergency Services).",
                    sender: 'ai',
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div className="flex flex-col items-center justify-center p-6">
                    <Button
                        className="relative group flex items-center gap-3 text-lg px-8 py-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300" />
                        <MessagesSquare className="w-6 h-6" />
                        <span>Start Chatting Now</span>
                        <AlertCircle className="w-5 h-5 text-red-200 animate-pulse" />
                    </Button>
                    <div className="mt-4 flex items-center gap-2 text-gray-500">
                        <span className="w-12 h-px bg-gray-300" />
                        <span className="text-sm">24/7 Emergency Guidance</span>
                        <span className="w-12 h-px bg-gray-300" />
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-full md:max-w-2xl h-[90vh] md:h-[80vh] p-0 flex flex-col">
                <DialogHeader className="relative p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
                    <DialogTitle className="flex items-center gap-2">
                        <div className="bg-white rounded-full p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-6 h-6">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM15.375 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span>AI Emergency Assistant</span>
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-hidden flex flex-col bg-gray-50">
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[90%] md:max-w-[80%] rounded-xl p-3 ${msg.sender === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-white border rounded-bl-none shadow-sm'}`}>
                                    <div className="whitespace-pre-wrap">{msg.text}</div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 border-t bg-white">
                        <div className="flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your message here..."
                                disabled={isLoading}
                                className="flex-1"
                            />
                            <Button
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : 'Send'}
                            </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            For immediate danger, call <strong className="text-red-600">1122</strong> (Pakistan Emergency)
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}