import React, { useState, useRef, useEffect } from "react";
import { useAccessibility } from "../context/AccessibilityContext";
import { MessageSquareCode, MessageCircle, X, Send, Eye, BrainCircuit, Loader2, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function FloatingChatbot() {
  const { highContrast, textSize } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! welcome to ClearVision Support. I am your specialized AI vision health assistant. Feel free to ask about our doctors, treatments, eye symptoms, or clinic hours!"
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Auto scroll messages to bottom on shift
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSuggestionClick = (text: string) => {
    setUserInput(text);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg: Message = { role: "user", content: userInput };
    const currentInput = userInput;
    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg]
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
      } else {
        setMessages((prev) => [
          ...prev, 
          { 
            role: "assistant", 
            content: "I am experiencing lightweight network strain. If you have an urgent inquiry, you can schedule an appointment or dial our main hotline directly!" 
          }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev, 
        { 
          role: "assistant", 
          content: "Connection was interrupted. Please look over your network status." 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    "What are early Cataract symptoms?",
    "How do I prepare for LASIK checks?",
    "What services does Dr. Carter provide?",
    "Is pediatric testing covered?",
  ];

  const getChatDescClass = () => {
    if (textSize === "extra-large") return "text-base";
    return "text-xs sm:text-sm";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      
      {/* Small floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`p-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center relative cursor-pointer group ${
            highContrast 
              ? "bg-white text-black border-2 border-white focus:ring-4 focus:ring-slate-300" 
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20 shadow-xl"
          }`}
          title="Open AI Eye Care support"
          aria-label="Open clinical AI chatbot chat drawer"
        >
          {/* Ripple signal glow ring */}
          <span className="absolute -inset-1 rounded-full bg-blue-400/20 blur-md animate-ping group-hover:block" />
          <BrainCircuit className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-[8px] font-mono px-1 font-bold">
            AI
          </span>
        </button>
      )}

      {/* Expanded chat drawer panel */}
      {isOpen && (
        <div className={`w-[320px] sm:w-[380px] h-[480px] sm:h-[520px] rounded-3xl border flex flex-col justify-between overflow-hidden shadow-2xl transition-colors duration-200 ${
          highContrast 
            ? "bg-black border-white text-white" 
            : "bg-white border-slate-150 shadow-slate-900/10 text-slate-800"
        }`}>
          
          {/* Header area */}
          <div className={`py-4 px-5 flex items-center justify-between border-b ${
            highContrast ? "bg-slate-900 border-white" : "bg-slate-900 text-white"
          }`}>
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl h-fit ${
                highContrast ? "bg-white text-black" : "bg-white/10"
              }`}>
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-[13px] tracking-wide uppercase font-mono">
                  ClearVision AI
                </h3>
                <span className="block text-[10px] text-blue-400 font-mono leading-none font-semibold">
                  ● Clinical Care Assistant
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors focus:outline-none cursor-pointer"
              title="Close chat support"
              aria-label="Close clinical AI chatbot panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages block scrolling list */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3 scrollbar-thin">
            {messages.map((msg, idx) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div 
                  key={idx}
                  className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}
                >
                  <div className={`p-3 max-w-[85%] rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isAssistant
                      ? highContrast
                        ? "bg-slate-900 border border-white text-white rounded-tl-none"
                        : "bg-slate-100 text-slate-800 rounded-tl-none"
                      : highContrast
                        ? "bg-white text-black font-semibold rounded-tr-none"
                        : "bg-blue-600 text-white rounded-tr-none"
                  }`}>
                    <p className={getChatDescClass()}>{msg.content}</p>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex justify-start">
                <div className={`p-3 rounded-2xl flex items-center gap-2 rounded-tl-none ${
                  highContrast ? "bg-slate-900 border" : "bg-slate-100"
                }`}>
                  <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                  <span className="text-[11px] text-slate-400 font-mono">Analyzing symptoms...</span>
                </div>
              </div>
            )}
            
            <div ref={endOfMessagesRef} />
          </div>

          {/* Pre-configured clinical prompts shortcuts */}
          {messages.length === 1 && (
            <div className="px-4 py-2 border-t border-slate-100/40">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Suggested Symptoms Checks:
              </p>
              <div className="flex flex-col gap-1.5 pb-1">
                {samplePrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => handleSuggestionClick(p)}
                    className={`py-1.5 px-3 rounded-lg text-left text-[11px] font-semibold tracking-wide transition-all truncate focus:outline-none ${
                      highContrast
                        ? "bg-slate-950 border border-white hover:bg-slate-900 text-white"
                        : "bg-blue-50/50 hover:bg-blue-50 text-blue-800 border border-blue-100/30"
                    }`}
                  >
                    💡 {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input control box */}
          <form 
            onSubmit={handleSendMessage} 
            className={`p-3 border-t flex gap-2 items-center ${
              highContrast ? "border-white bg-slate-950" : "border-slate-150 bg-slate-50"
            }`}
          >
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about laser, checks, hours..."
              className={`flex-grow py-2.5 px-3.5 rounded-xl text-xs border focus:outline-none transition-all ${
                highContrast
                  ? "bg-black border-white text-white focus:ring-1 focus:ring-white"
                  : "bg-white border-slate-200 text-slate-900 focus:border-blue-500"
              }`}
              required
            />
            <button
              type="submit"
              disabled={loading || !userInput.trim()}
              className={`p-2.5 rounded-xl flex items-center justify-center transition-colors focus:outline-none cursor-pointer ${
                highContrast
                  ? "bg-white text-black hover:bg-slate-200"
                  : "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40"
              }`}
              title="Send prompt message to clinical assistant"
              aria-label="Send clinical AI chat message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
