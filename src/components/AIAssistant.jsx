import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Brain, Cpu, Terminal, ArrowUpRight } from 'lucide-react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi! I am Aryan's AI assistant. 🤖 Ask me anything about his B.Tech studies, projects, technical skills, or how to contact him!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const quickQuestions = [
    { label: "🛠️ Tech Stack", query: "What is your tech stack?" },
    { label: "📂 Disaster Project", query: "Tell me about the Disaster Risk system." },
    { label: "🎓 Education", query: "Where do you study?" },
    { label: "🚀 LinkedIn Post", query: "Show me the LinkedIn share template" }
  ];

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getAIResponse = (query) => {
    const q = query.toLowerCase();
    
    if (q.includes('post') || q.includes('share') || q.includes('announcement') || q.includes('template')) {
      return "Here is the LinkedIn announcement post Aryan created to share his portfolio:\n\n" +
        "🚀 **Excited to share that I'll be showcasing my portfolio here on LinkedIn over the coming days!**\n\n" +
        "It's a collection of projects I've worked on, the problems I've tackled, and the lessons I've learned along the way. Each post will highlight a different project, covering the challenge, my approach, the technologies I used, and the impact it created.\n\n" +
        "Whether you're a recruiter, fellow developer, designer, or simply someone interested in tech, I hope these posts provide value and spark interesting conversations.\n\n" +
        "Stay tuned—I'd love to hear your thoughts and feedback as I share my journey. 😊\n\n" +
        "#Portfolio #SoftwareDevelopment #WebDevelopment #AI #MachineLearning #Projects #Tech #OpenToWork #LinkedIn";
    }
    if (q.includes('ibm') || q.includes('certificate') || q.includes('credential') || q.includes('verify')) {
      return "Aryan holds an **IBM SkillsBuild Certification** for **'Getting Started with Artificial Intelligence'** issued in March 2026. You can review and verify the details in the Credentials section!";
    }
    if (q.includes('stack') || q.includes('skill') || q.includes('tech') || q.includes('languages') || q.includes('framework')) {
      return "Aryan is highly skilled in **Python, Java, C++, and JavaScript**. For AI/ML, he works with **Scikit-learn, Pandas, and NumPy**. In full-stack web development, he builds with **Flask, React.js, and Django**.";
    }
    if (q.includes('disaster') || q.includes('risk') || q.includes('project') || q.includes('hazard') || q.includes('work')) {
      return "Aryan designed and built the **AI-Based Disaster Risk System**. It compiles real-time meteorological data (rain, temp, wind) from the Open-Meteo API and uses trained Scikit-learn models to project regional risks for Floods, Wildfires, and Heatwaves in Indian cities. You can view the live project and case study in the Projects section!";
    }
    if (q.includes('study') || q.includes('education') || q.includes('college') || q.includes('university') || q.includes('iter') || q.includes('soa')) {
      return "Aryan is currently a **second-year Computer Science Engineering student** at ITER, SOA University, located in Bhubaneswar, Odisha, India.";
    }
    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('message') || q.includes('social') || q.includes('linkedin')) {
      return "You can contact Aryan directly via email at **aryanpre4906@gmail.com** or send a message using the contact form at the bottom of the page. You can also connect via [LinkedIn](https://www.linkedin.com/in/aryan-aryan-1b8704351) or check out his latest work on [GitHub](https://github.com/aryanbuildsdev-blip).";
    }
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('assist')) {
      return "Hey there! I am Aryan's portfolio assistant. Ask me details about his B.Tech coursework, his AI projects, or how to get in touch with him!";
    }
    return "Aryan is a CS student at ITER with a strong background in Machine Learning classifiers and Full-Stack web architecture. Feel free to ask about his **Disaster Risk project**, his **skills**, or **how to contact him**!";
  };

  const handleSendMessage = (textToSend) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Trigger bot typing indicator
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botResponse = getAIResponse(textToSend);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000); // 1s realistic delay
  };

  // Helper to render markdown bold elements and links
  const renderMessageText = (text) => {
    // Regex for bold text **text**
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('[') && part.includes('](')) {
        const linkText = part.match(/\[(.*?)\]/)?.[1] || '';
        const linkUrl = part.match(/\((.*?)\)/)?.[1] || '#';
        return (
          <a 
            key={i} 
            href={linkUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-cyan-400 underline inline-flex items-center gap-0.5 hover:text-cyan-300 transition-colors"
          >
            {linkText}
            <ArrowUpRight size={10} />
          </a>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          data-cursor="hover"
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-violet-500/20 border border-white/10 hover:scale-105 transition-transform duration-300 relative focus:outline-none cursor-pointer"
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="relative">
                <MessageSquare size={22} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#06060c] rounded-full animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-24 right-6 w-[360px] md:w-[380px] h-[500px] rounded-3xl border border-white/10 bg-[#07070e]/95 backdrop-blur-xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/20 flex items-center justify-center text-violet-400">
                  <Brain size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white font-display">Aryan AI</h4>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online Agent
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages Body */}
            <div 
              data-lenis-prevent
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin select-text"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div 
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed font-sans ${
                      msg.sender === 'user' 
                        ? 'bg-violet-600 text-white rounded-br-none shadow-md shadow-violet-600/10' 
                        : 'bg-white/5 border border-white/5 text-gray-300 rounded-bl-none'
                    }`}
                  >
                    {renderMessageText(msg.text)}
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono mt-1 px-1">{msg.time}</span>
                </div>
              ))}

              {/* Bot Typing Indicator */}
              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="bg-white/5 border border-white/5 text-gray-300 rounded-2xl rounded-bl-none p-3.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Questions Chips */}
            <div className="p-3 border-t border-white/5 bg-black/10 flex flex-wrap gap-2">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q.query)}
                  className="text-[10px] px-2.5 py-1.5 rounded-full bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/5 transition-all font-sans cursor-pointer focus:outline-none"
                >
                  {q.label}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-3 border-t border-white/5 bg-white/3 flex gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask something about Aryan..."
                className="flex-1 bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500 transition-colors font-sans"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center text-white hover:opacity-90 transition-opacity cursor-pointer focus:outline-none"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
