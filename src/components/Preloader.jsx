import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [stage, setStage] = useState(1); // 1: Initial A, 2: Name & Tagline Reveal
  const [canSkip, setCanSkip] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  const timeouts = useRef([]);

  const clearTimeouts = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };

  useEffect(() => {
    // 1. Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    // 2. Normal visit sequence (runs on every reload now for consistent cinematic experience)
    // Enable skipping after 0.5s
    const skipTimeout = setTimeout(() => {
      setCanSkip(true);
    }, 500);

    // Transition to Stage 2 at 1.0s (reveal full name)
    const stage2Timeout = setTimeout(() => {
      setStage(2);
    }, 1000);

    // Call onComplete at 2.4s (exit phase starts)
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 2400);

    timeouts.current.push(skipTimeout, stage2Timeout, completeTimeout);

    return () => clearTimeouts();
  }, [onComplete]);

  // Handle tap/click to skip anywhere on screen after 0.5s
  const handleSkip = () => {
    if (!canSkip) return;
    clearTimeouts();
    onComplete();
  };

  const containerVariants = {
    initial: { opacity: 1, scale: 1 },
    exit: { 
      opacity: 0, 
      scale: reducedMotion ? 1 : 0.98,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } 
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 15 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    },
    exit: { 
      opacity: 0,
      y: reducedMotion ? 0 : -15,
      transition: { duration: 0.4, ease: "easeInOut" }
    }
  };

  const nameText = "Aryan Portfolio";

  return (
    <motion.div
      onClick={handleSkip}
      className="fixed inset-0 z-99999 bg-[#0a0a0f] flex flex-col items-center justify-center select-none overflow-hidden"
      variants={containerVariants}
      initial="initial"
      animate="initial"
      exit="exit"
      style={{ cursor: canSkip ? 'pointer' : 'default' }}
    >
      {/* Subtle Accent Transition Sweep Line */}
      <motion.div 
        className="absolute top-0 bottom-0 left-0 w-[4px] bg-gradient-to-b from-violet-500 to-cyan-400 pointer-events-none z-10 hidden md:block"
        initial={{ x: "-100vw" }}
        exit={reducedMotion ? { opacity: 0 } : { x: "100vw" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      />

      <div className="relative text-center flex flex-col items-center max-w-lg px-6 overflow-hidden">
        <AnimatePresence mode="wait">
          {stage === 1 && (
            <motion.div
              key="stage1"
              className="flex flex-col items-center"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Large initial typography */}
              <h2 className="text-6xl md:text-8xl font-black font-display text-white tracking-tight leading-none uppercase select-none">
                A
              </h2>
              
              {/* Confident, quiet progress line */}
              <div className="w-16 h-[2px] bg-white/10 mt-6 relative overflow-hidden rounded-full">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                  style={{ transformOrigin: "0%", width: "100%" }}
                />
              </div>
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              key="stage2"
              className="flex flex-col items-center"
              exit="exit"
            >
              {/* Letter-by-letter Roll-Up Title */}
              <h1 className="text-4xl md:text-6xl font-black font-display text-white tracking-tight leading-none uppercase select-none mb-4 overflow-hidden flex flex-wrap justify-center">
                {nameText.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ 
                      duration: 0.7, 
                      delay: index * 0.025, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    className="inline-block"
                    style={{ marginRight: char === " " ? "0.3em" : "0" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>
              
              {/* Tagline */}
              <motion.p
                className="text-xs md:text-sm tracking-[0.2em] text-gray-500 font-sans uppercase font-medium"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
                }}
              >
                AI/ML Enthusiast • Software Developer
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Minimal Skip Indicator */}
      {canSkip && (
        <motion.div
          className="absolute bottom-10 right-10 text-[9px] font-mono tracking-widest text-gray-600 uppercase hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          [ Click anywhere to skip ]
        </motion.div>
      )}
    </motion.div>
  );
}
