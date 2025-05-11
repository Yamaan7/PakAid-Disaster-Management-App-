import { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoogleGenAI } from "@google/genai";

type Message = {
    text: string;
    sender: 'user' | 'ai';
};

const SYSTEM_PROMPT = `You are "RescueAI", a certified disaster response assistant specializing in:
- Floods
- Earthquakes
- Heatwaves
- Landslides

Guidelines:
1. Provide step-by-step emergency instructions
2. Recommend official resources (NDMA Pakistan, WHO)
3. Use simple language with bullet points
4. For life-threatening situations, start with "🚨 EMERGENCY:"
5. Ask clarifying questions when needed`;

export default function AIRescueChat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            text: "🆘 Hello! I'm your virtual rescue assistant. Describe your emergency.",
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

            // Updated: Access the response text correctly through candidates
            const aiResponse = result.candidates?.[0]?.content?.parts?.[0]?.text ||
                "Sorry, I couldn't process that request.";

            setMessages((prev) => [...prev, { text: aiResponse, sender: 'ai' }]);
        } catch (error) {
            console.error('Gemini API error:', error);
            setMessages((prev) => [
                ...prev,
                {
                    text: "⚠️ System error. For emergencies, call 1122 (Pakistan Emergency Services).",
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
        <div className="flex flex-col h-[500px] border rounded-lg bg-white shadow-lg">
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`p-3 rounded-lg max-w-[80%] ${msg.sender === 'user'
                            ? 'ml-auto bg-blue-500 text-white'
                            : 'mr-auto bg-gray-100 border'
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t bg-gray-50">
                <div className="flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Describe your emergency..."
                        disabled={isLoading}
                    />
                    <Button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="min-w-[80px]"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : 'Send'}
                    </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                    For immediate danger, call <strong>1122</strong> (Pakistan Emergency)
                </p>
            </div>
        </div>
    );
}
