import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface ForecastDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  rainChance: number;
  windSpeed: number;
}

interface WeatherData {
  city: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  rainChance: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  forecast: ForecastDay[];
}

interface ChatBotProps {
  weatherData: WeatherData;
}

const ChatBot: React.FC<ChatBotProps> = ({ weatherData }) => {
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add an initial message from the AI when the component mounts or weatherData changes
    setMessages([
      {
        sender: "ai",
        content: `Hello! I'm WeatherSplash, your weather assistant. The current weather in ${weatherData.city} is ${weatherData.condition} with a temperature of ${weatherData.temperature}°C.  How can I help you with weather-related questions?`,
      },
    ]);
  }, [weatherData]);

  useEffect(() => {
    // Scroll to the bottom of the messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Reset input field
    setInput("");

    // Fetch response from API
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input, weatherData }),
      });

      const data = await response.json();
      const aiMessage = { sender: "ai", content: data.result };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = { sender: "ai", content: "Sorry, something went wrong. Please try again." };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="p-0 border-none bg-transparent">
          <div className="flex flex-col items-center">
            <div 
              className="w-[100px] h-[100px] transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <Image
                src="/assets/ws-ai-bot.svg"
                alt="AI Bot"
                width={100}
                height={100}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">Ask me a question</p>
          </div>
        </Button>
      </SheetTrigger>


      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>WeatherSplash AI</SheetTitle>
          <SheetDescription>
            Ask me about the current weather, forecast, or any weather-related questions for {weatherData.city}.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-200px)] justify-between">
          <div className="flex-grow overflow-y-auto py-4 pr-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-2`}>
                <div className={`p-2 rounded-md max-w-[80%] ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-teal-200 text-black"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center gap-4 py-4">
            <Input
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about the weather..."
              className="flex-1"
            />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatBot;