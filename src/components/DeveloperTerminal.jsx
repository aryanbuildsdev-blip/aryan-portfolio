import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';

export default function DeveloperTerminal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { text: "=== ARYAN INTERACTIVE SYSTEM v1.0.2 ===", type: "system" },
    { text: "Type 'help' to view available commands.", type: "system" },
    { text: "", type: "system" }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return;
    
    const rawCmd = inputVal.trim();
    setInputVal("");
    
    if (!rawCmd) return;

    const newHistory = [...history, { text: `Guest@aryan-system:~$ ${rawCmd}`, type: "user" }];
    const cmd = rawCmd.toLowerCase().split(' ')[0];

    let reply = [];

    switch(cmd) {
      case 'help':
        reply = [
          { text: "Available commands:", type: "info" },
          { text: "  about     - Learn more about Aryan's profile", type: "info" },
          { text: "  skills    - View visual coding skills competency", type: "info" },
          { text: "  projects  - List latest engineering projects", type: "info" },
          { text: "  contact   - Get contact email & social channels", type: "info" },
          { text: "  matrix    - Activate matrix screen animation", type: "info" },
          { text: "  clear     - Clear terminal terminal logs", type: "info" },
          { text: "  exit      - Close the developer console", type: "info" }
        ];
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        onClose();
        return;
      case 'about':
        reply = [
          { text: "Biography Info:", type: "success" },
          { text: "Name: Aryan Dev | Role: CS Undergrad & ML Developer", type: "info" },
          { text: "Institution: ITER, SOA University, Bhubaneswar, India", type: "info" },
          { text: "Passionate about bridging machine learning intelligence with high-fidelity web applications.", type: "info" }
        ];
        break;
      case 'skills':
        reply = [
          { text: "Core Technical Competency Index:", type: "success" },
          { text: "Python      [████████████████░░░] 88% - Classifiers & Data Pipelines", type: "info" },
          { text: "Java        [██████████████░░░░░] 78% - Algorithmic Engineering", type: "info" },
          { text: "C++         [████████████░░░░░░░] 70% - Data Structures & Core", type: "info" },
          { text: "JavaScript  [████████████████░░░] 84% - React Ecosystem & Animations", type: "info" },
          { text: "AI/ML       [███████████████░░░░] 80% - Scikit-learn, Pandas, Classifiers", type: "info" }
        ];
        break;
      case 'projects':
        reply = [
          { text: "Key Project Directory:", type: "success" },
          { text: "1. AI Disaster Risk System - Real-time ML meteorological risk mapping", type: "info" },
          { text: "2. Portfoliio 2.0 (This Web App) - Fully custom-built Canvas 3D & CLI console", type: "info" },
          { text: "Type 'about <number>' on your browser to review case studies in Projects panel.", type: "info" }
        ];
        break;
      case 'contact':
        reply = [
          { text: "Contact Coordinates:", type: "success" },
          { text: "Email:    aryanpre4906@gmail.com", type: "info" },
          { text: "LinkedIn: linkedin.com/in/aryan-aryan-1b8704351", type: "info" },
          { text: "GitHub:   github.com/aryanbuildsdev-blip", type: "info" }
        ];
        break;
      case 'matrix':
        reply = [
          { text: "Initializing cyber lattice protocols...", type: "system" },
          { text: "01000001 01010010 01011001 01000001 01001110", type: "success" },
          { text: "SYSTEM ONLINE - Interactive nodes initialized.", type: "success" }
        ];
        break;
      default:
        reply = [{ text: `Command not found: '${cmd}'. Type 'help' to see options.`, type: "error" }];
    }

    setHistory([...newHistory, ...reply, { text: "", type: "system" }]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 pointer-events-none">
          {/* Backdrop Blur overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#040408]/80 backdrop-blur-md pointer-events-auto"
          />

          {/* Terminal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`w-full max-w-4xl bg-[#05050a]/95 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col pointer-events-auto ${
              isFullscreen ? 'h-full max-w-none' : 'h-[500px] md:h-[600px]'
            }`}
          >
            {/* Header bar */}
            <div className="bg-white/5 px-6 py-4 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-600 transition-colors cursor-pointer" onClick={onClose} />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 cursor-pointer" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 cursor-pointer" onClick={() => setIsFullscreen(!isFullscreen)} />
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs font-mono font-bold select-none ml-4">
                  <TerminalIcon size={12} className="text-violet-400" />
                  <span>terminal@aryan-console:~$</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                >
                  {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button 
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div 
              data-lenis-prevent
              onClick={() => inputRef.current?.focus()}
              className="flex-1 p-6 font-mono text-xs md:text-sm overflow-y-auto select-text bg-[#030307] relative cursor-text space-y-2 scrollbar-thin text-green-400"
              style={{ textShadow: "0 0 4px rgba(74, 222, 128, 0.2)" }}
            >
              {/* Scanline CRT overlay effect */}
              <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-[0.03]" />

              <div className="space-y-1">
                {history.map((line, idx) => (
                  <div 
                    key={idx} 
                    className={
                      line.type === 'user' ? 'text-white' : 
                      line.type === 'success' ? 'text-cyan-400' :
                      line.type === 'error' ? 'text-red-400' :
                      line.type === 'system' ? 'text-violet-400' : 'text-green-400'
                    }
                  >
                    {line.text}
                  </div>
                ))}
              </div>

              {/* Input row */}
              <div className="flex items-center gap-2 text-white mt-4">
                <span className="text-green-400 select-none">Guest@aryan-system:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleCommand}
                  className="flex-1 bg-transparent outline-none border-none text-white caret-green-400 font-mono text-xs md:text-sm"
                  autoComplete="off"
                  autoFocus
                />
              </div>
              <div ref={terminalEndRef} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
