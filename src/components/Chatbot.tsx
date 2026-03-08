import { useState } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = { role: "bot" | "user"; text: string };

const faq = [
  { q: "What is your highest qualification?", a: "I hold a Bachelor's degree in Computer Science (B.Tech/BCA). I'm constantly learning and upskilling through online courses and hands-on projects." },
  { q: "What is your current location?", a: "I'm currently based in Lucknow, India." },
  { q: "Can you relocate?", a: "Yes, I'm open to relocation — anywhere in India works for me!" },
  { q: "What tech stack do you work with?", a: "I primarily work with React, TypeScript, Tailwind CSS, Node.js, and modern frontend tools. I'm always eager to learn new technologies." },
  { q: "Are you open to freelance work?", a: "Absolutely! I'm open to freelance projects, collaborations, and full-time opportunities. Feel free to reach out!" },
];

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hey there! 👋 I'm Hasnain's assistant bot. Ask me anything or pick a question below!" },
  ]);
  const [input, setInput] = useState("");

  const handleQuestion = (q: string, a: string) => {
    setMessages((prev) => [...prev, { role: "user", text: q }, { role: "bot", text: a }]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim().toLowerCase();
    setMessages((prev) => [...prev, { role: "user", text: input.trim() }]);
    setInput("");

    const match = faq.find(
      (f) =>
        userMsg.includes("qualification") || userMsg.includes("education")
          ? f.q.toLowerCase().includes("qualification")
          : userMsg.includes("location") || userMsg.includes("where")
          ? f.q.toLowerCase().includes("location")
          : userMsg.includes("relocat")
          ? f.q.toLowerCase().includes("relocate")
          : userMsg.includes("stack") || userMsg.includes("tech")
          ? f.q.toLowerCase().includes("tech stack")
          : userMsg.includes("freelance") || userMsg.includes("work") || userMsg.includes("hire")
          ? f.q.toLowerCase().includes("freelance")
          : false
    );

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: match
            ? match.a
            : "Great question! For more details, feel free to reach out via email at hhk2170@gmail.com or connect on LinkedIn. 😊",
        },
      ]);
    }, 600);
  };

  const unanswered = faq.filter(
    (f) => !messages.some((m) => m.role === "user" && m.text === f.q)
  );

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 left-0 w-[340px] sm:w-[380px] glass rounded-2xl border border-border/50 overflow-hidden flex flex-col"
            style={{ maxHeight: "70vh" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 bg-secondary/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Ask Me</p>
                  <p className="text-xs text-muted-foreground">Quick answers about Hasnain</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: "340px" }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "bot" && (
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-3 h-3 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-secondary text-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 mt-1">
                      <User className="w-3 h-3 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}

              {/* Quick questions */}
              {unanswered.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {unanswered.map((f) => (
                    <button
                      key={f.q}
                      onClick={() => handleQuestion(f.q, f.a)}
                      className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors text-left"
                    >
                      {f.q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/50">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  placeholder="Type a question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="p-3.5 rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity glow-box"
        aria-label="Open chatbot"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default Chatbot;
