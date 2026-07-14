import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hoverType, setHoverType] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const isActive = document.body.classList.contains('custom-cursor-active');
      if (isActive) {
        if (!isVisible) setIsVisible(true);
      } else {
        if (isVisible) setIsVisible(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Apply cursor-active class to body to hide default cursor on desktop
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [cursorX, cursorY, isVisible]);

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const type = target.getAttribute('data-cursor');
        setHoverType(type || 'hover');
        
        const text = target.getAttribute('data-cursor-text');
        if (text) setCursorText(text);
      } else if (e.target.closest('a, button, [role="button"], input, textarea, select')) {
        setHoverType('hover');
      } else {
        setHoverType('default');
        setCursorText('');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  const variants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'transparent',
      border: '1px solid rgba(139, 92, 246, 0.5)',
    },
    hover: {
      width: 56,
      height: 56,
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      border: '1px solid rgba(6, 182, 212, 0.8)',
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(6, 182, 212, 0.2)',
      border: '1.5px dashed rgba(6, 182, 212, 0.9)',
    },
    drag: {
      width: 72,
      height: 72,
      backgroundColor: 'rgba(139, 92, 246, 0.15)',
      border: '1.5px solid rgba(139, 92, 246, 0.8)',
    }
  };

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[999999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 overflow-hidden mix-blend-screen hidden md:flex"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={hoverType}
        variants={variants}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        {cursorText && (
          <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase select-none font-display">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Pinpoint Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[999999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
    </>
  );
}
