import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AuthorizationContext } from "@/lib/userContext";
import { AppDispatch, RootState, useAppSelector } from "@/redux/store";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setMessages } from "@/redux/features/messagesSlice";
import { writeToDoc } from "@/lib/firebase/firestore";
import { v4 } from "uuid";
import toast from "react-hot-toast";

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
  const messages = useAppSelector((state) => state.MessagesReducer.value);
  const [_messages, _] = useState<
    { sender: string; content: string; email: string; timestamp: number }[]
  >([]);
  const dispatch = useDispatch<AppDispatch>();
  const {user} = useContext(AuthorizationContext);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [writing, setWriting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  

  useEffect(() => {
    if (!user?.email) {
      return;
    }
    // listen for snapshot data
    const q = query(
      collection(db, "messages"),
      where("email", "==", user?.email)
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        let data: {
          sender: string;
          content: string;
          email: string;
          timestamp: number;
        }[] = [{
            email: user?.email,
            sender: "ai",
            timestamp: 0,
            content: `Hello! I'm WeatherSplash, your weather assistant. The current weather in ${weatherData.city} is ${weatherData.condition} with a temperature of ${weatherData.temperature}°C.  How can I help you with weather-related questions?`,
          }];
        if (writing){
          return
        }
        setWriting(true)
        
        snapshot.docs.forEach((doc) => {
          data.push({
            ...(doc.data() as {
              sender: string;
              content: string;
              email: string;
              timestamp: number;
            }),
          });
        });
        data = data.sort((a, b) => a.timestamp - b.timestamp);
        console.log('sorted data', data)
        
        // last message

        const lastMessage = data?.at(-1)
        if (data?.length && lastMessage?.sender === "user") {
          // reply to user

          console.log(
            'fetching ai response',
            lastMessage,
            weatherData
          )
          fetch("/api/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: lastMessage?.content, weatherData }),
          }).then(async (response) => {
            const dataRes = await response.json();
            const aiMessage = {
              sender: "ai",
              content: dataRes.result,
              email: user?.email,
              timestamp: dayjs().valueOf(),
            };
            console.log('ai content...', aiMessage)
            if (aiMessage.content){
              writeToDoc("messages", v4(), aiMessage).then(()=>{
                setWriting(false)
              }).catch(()=>{
                setWriting(false)
              });
            }
            
          }).catch((e)=>{
            console.log(e)
            setWriting(false)
            toast.error("Something went wrong. Could not generate response")
          })
        } else {
          setWriting(false)
        }
        dispatch(setMessages(data));
      },
      (error) => {
        console.log('error')
        setWriting(false)
      }
    );
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    // Add an initial message from the AI when the component mounts or weatherData changes
    if (writing) {
      return;
    }
    if (!user?.email){
      return
    }
    if (
      !messages ||
      messages?.[0]?.sender !== "ai" ||
      (!messages?.[0]?.content.includes(weatherData.city))
    ) {
      // setWriting(true);
      // writeToDoc("messages", v4(), {
      //   email: user?.email,
      //   sender: "ai",
      //   timestamp: dayjs().valueOf(),
      //   content: `Hello! I'm WeatherSplash, your weather assistant. The current weather in ${weatherData.city} is ${weatherData.condition} with a temperature of ${weatherData.temperature}°C.  How can I help you with weather-related questions?`,
      // })
      //   .then(() => {
      //     // setWriting(false);
      //   })
      //   .catch(() => {
      //     setWriting(false);
      //   });
    }
  }, [weatherData, user]);

  useEffect(() => {
    // Scroll to the bottom of the messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = {
      sender: "user",
      content: input,
      email: user?.email,
      timestamp: dayjs().valueOf(),
    };

    // Reset input field
    // Fetch response from API
    try {
      await writeToDoc("messages", v4(), userMessage);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
      setInput("");
      // const errorMessage = {
      //   sender: "ai",
      //   content: "Sorry, something went wrong. Please try again.",
      //   email: user?.email,
      //   timestamp: dayjs().valueOf(),
      // };
      // setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const searchMessages = (
    messages: RootState['MessagesReducer']['value'] | undefined,
    query: string
  ) => {
    if (!messages) return [];
    return messages.filter((msg) =>
      msg.content.toLowerCase().includes(query.toLowerCase())
    );
  };



  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="p-0 border-none bg-transparent">
          <div className="flex flex-col items-center">
            <div className="w-[100px] h-[100px] transition-transform duration-300 ease-in-out hover:scale-110">
              <Image
                src="/assets/ws-ai-bot.svg"
                alt="AI Bot"
                width={100}
                height={100}
              />
            </div>
            <p className="mt-2 text-sm">Ask me a question</p>
          </div>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="mb-4">
          <Image
                  height={32}
                  width={32}
                  src="https://firebasestorage.googleapis.com/v0/b/weather-splash.appspot.com/o/logo%2FWeatherSplashLogo.svg?alt=media&token=d140e155-96f1-42ac-b149-cd33fcce04c5"
                  alt="Logo"
                  unoptimized
                  className="h-6 w-auto cursor-pointer "
                />
          </SheetTitle>
          <SheetDescription>
            Ask me about the current weather, forecast, or any weather-related
            questions for {weatherData.city}.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4">
        <Input
          type="text"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />
        </div>
       

        <div className="flex flex-col h-[calc(100vh-200px)] justify-between">
          <div className="flex-grow overflow-y-auto py-4 pr-4">
          {searchMessages(messages, searchQuery).map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <div
                  className={`p-2 rounded-md max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-800 text-white"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center gap-4 py-4">
          
            {user?.email?<Input
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about the weather..."
              className="flex-1"
            />:<span className="w-full text-sm text-center">Sign in to use chat!</span>}
            <Button disabled={!user?.email} onClick={sendMessage}>Send</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatBot;
