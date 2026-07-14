import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  ChevronDown, 
  MapPin, 
  Award, 
  Sparkles, 
  Cpu, 
  ArrowUpRight, 
  ExternalLink,
  Code,
  CheckCircle,
  Send,
  Zap,
  Terminal,
  Database,
  Globe,
  Monitor,
  Layers,
  Play,
  HelpCircle,
  Brain,
  GitBranch,
  Copy
} from 'lucide-react';

const Github = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import HeroScene from './components/HeroScene';
import ProjectModal from './components/ProjectModal';
import AIAssistant from './components/AIAssistant';

// Interactive 3D Tilting Card wrapper for categories
function InteractiveSkillsCard({ title, accentColor, children }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Relative coordinate percentages
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const percentageX = (x / rect.width) * 100;
    const percentageY = (y / rect.height) * 100;
    setGlarePosition({ x: percentageX, y: percentageY });

    // Tilting degree limits (e.g. max -8 to 8 degrees)
    const tiltX = -((y - rect.height / 2) / (rect.height / 2)) * 8;
    const tiltY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
    setRotateX(tiltX);
    setRotateY(tiltY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.04 
      } 
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      style={{ transformStyle: "preserve-3d" }}
      className="glass p-8 rounded-3xl border border-white/5 relative overflow-hidden transition-all duration-300 select-none cursor-default group"
    >
      {/* Glare spotlight effect overlay */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 120px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)`
          }}
        />
      )}

      {/* category colored background glow */}
      <div 
        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      <div style={{ transform: "translateZ(25px)" }} className="relative z-10">
        <h3 
          className="text-sm font-bold tracking-wider uppercase font-display mb-6 pb-2 border-b border-white/5 flex items-center justify-between transition-colors duration-300"
          style={{ color: isHovered ? '#fff' : accentColor }}
        >
          {title}
          <span 
            className="w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-125" 
            style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}` }}
          />
        </h3>
        
        <div className="flex flex-wrap gap-2.5">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

// Helper brand color and icon mapping for skills
const getSkillIcon = (skillName) => {
  const name = skillName.toLowerCase();
  
  if (name.includes('python')) return { icon: <Terminal size={14} className="text-[#3776AB]" />, color: 'rgba(55, 118, 171, 0.15)' };
  if (name.includes('java') && !name.includes('javascript')) return { icon: <Code size={14} className="text-[#007396]" />, color: 'rgba(0, 115, 150, 0.15)' };
  if (name.includes('c++')) return { icon: <Code size={14} className="text-[#00599C]" />, color: 'rgba(0, 89, 156, 0.15)' };
  if (name.includes('javascript')) return { icon: <Code size={14} className="text-[#F7DF1E]" />, color: 'rgba(247, 223, 30, 0.15)' };
  if (name.includes('html5')) return { icon: <Globe size={14} className="text-[#E34F26]" />, color: 'rgba(227, 79, 38, 0.15)' };
  if (name.includes('css')) return { icon: <Monitor size={14} className="text-[#1572B6]" />, color: 'rgba(21, 114, 182, 0.15)' };
  if (name.includes('sql') && !name.includes('sqlite')) return { icon: <Database size={14} className="text-[#4479A1]" />, color: 'rgba(68, 121, 161, 0.15)' };
  if (name.includes('sqlite')) return { icon: <Database size={14} className="text-[#003B57]" />, color: 'rgba(0, 59, 87, 0.15)' };
  
  if (name.includes('scikit')) return { icon: <Cpu size={14} className="text-[#F7931E]" />, color: 'rgba(247, 147, 30, 0.15)' };
  if (name.includes('pandas')) return { icon: <Layers size={14} className="text-[#150458]" />, color: 'rgba(21, 4, 88, 0.15)' };
  if (name.includes('numpy')) return { icon: <Cpu size={14} className="text-[#013243]" />, color: 'rgba(1, 50, 67, 0.15)' };
  if (name.includes('machine learning')) return { icon: <Brain size={14} className="text-[#a855f7]" />, color: 'rgba(168, 85, 247, 0.15)' };
  if (name.includes('artificial intelligence')) return { icon: <Cpu size={14} className="text-[#22c55e]" />, color: 'rgba(34, 197, 94, 0.15)' };
  if (name.includes('prompt')) return { icon: <Sparkles size={14} className="text-[#3b82f6]" />, color: 'rgba(59, 130, 246, 0.15)' };
  
  if (name.includes('flask')) return { icon: <Terminal size={14} className="text-white" />, color: 'rgba(255, 255, 255, 0.15)' };
  if (name.includes('react')) return { icon: <Cpu size={14} className="text-[#61DAFB]" />, color: 'rgba(97, 218, 251, 0.15)' };
  if (name.includes('django')) return { icon: <Play size={14} className="text-[#092E20]" />, color: 'rgba(9, 46, 32, 0.15)' };
  
  if (name.includes('git') && !name.includes('github')) return { icon: <GitBranch size={14} className="text-[#F05032]" />, color: 'rgba(240, 80, 50, 0.15)' };
  if (name.includes('github')) return { icon: <Github size={14} className="text-white" />, color: 'rgba(255, 255, 255, 0.15)' };
  if (name.includes('vercel')) return { icon: <Globe size={14} className="text-white" />, color: 'rgba(255, 255, 255, 0.1)' };
  if (name.includes('linux')) return { icon: <Terminal size={14} className="text-[#FCC624]" />, color: 'rgba(252, 198, 36, 0.15)' };
  
  if (name.includes('full-stack') || name.includes('front-end')) return { icon: <Layers size={14} className="text-[#e11d48]" />, color: 'rgba(225, 29, 72, 0.15)' };
  if (name.includes('problem solving')) return { icon: <HelpCircle size={14} className="text-[#10b981]" />, color: 'rgba(16, 185, 129, 0.15)' };

  return { icon: <Code size={14} className="text-gray-400" />, color: 'rgba(255, 255, 255, 0.05)' };
};

// Staggered interactive skill tag with brand icon matching
function SkillTag({ skill, accentColor }) {
  const { icon, color } = getSkillIcon(skill);
  
  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 15 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 14 }
    }
  };

  return (
    <motion.span
      variants={tagVariants}
      whileHover={{ 
        scale: 1.08,
        y: -4,
        borderColor: accentColor,
        boxShadow: `0 0 20px ${accentColor}33`,
        backgroundColor: color || `${accentColor}11`,
        color: '#ffffff'
      }}
      className="text-xs px-3.5 py-2.5 rounded-xl bg-white/3 border border-white/5 text-gray-300 transition-all duration-300 flex items-center gap-2 cursor-default select-none shadow-sm"
    >
      {icon}
      <span>{skill}</span>
    </motion.span>
  );
}

// Featured Projects Data
const projects = [
  {
    id: 1,
    title: "AI-Based Disaster Risk System",
    description: "An end-to-end AI-powered web application designed to analyze live meteorological parameters and predict regional risks for natural disasters (floods, wildfires, and heatwaves) across Indian cities in real time.",
    longDescription: "An end-to-end AI-powered Web GIS and analytical platform that analyzes real-time meteorological indicators to forecast disaster occurrences across urban regions. The application uses a Python/Flask microservice combined with client-side interactive mapping to assess regional safety indices. Equipped with trained Scikit-learn predictive classifiers, it automatically consumes GPS signals and query endpoints of the Open-Meteo API to dynamically fetch ambient heat, wind profiles, and precipitation, delivering early warnings via a highly interactive dashboard.",
    features: [
      "Flood Risk Probability: Employs historic precipitation thresholds and rainfall volume modeling.",
      "Wildfire Risk Assessment: Cross-checks relative humidity, maximum heat levels, and dry wind velocity variables.",
      "Heatwave Alerting System: Identifies high-risk temperature anomalies using real-time thresholds.",
      "Embedded ML Predictors: Integrates trained Scikit-learn classification models directly inside a Python/Flask backend.",
      "Open-Meteo API Sync: Automates background requests using local GPS coordinates for live weather telemetry.",
      "Interactive Analytics: Implements a data-driven dashboard comparing risk indices across key Indian cities."
    ],
    tags: ["Python", "Flask", "Scikit-learn", "Pandas", "NumPy", "Open-Meteo API", "SQLite", "Vercel"],
    links: { demo: "https://advanced-disaster-risk-management.vercel.app/", github: "https://github.com/aryanbuildsdev-blip/advanced-disaster-risk-management" }
  }
];

// Skills organized by category
const skillsData = {
  languages: ["Python", "Java", "C++", "JavaScript", "HTML5", "CSS", "SQL"],
  frameworks: ["Flask", "React.js", "React Native", "Django REST Framework"],
  mlai: ["Scikit-learn", "Pandas", "NumPy", "Machine Learning", "Artificial Intelligence", "Prompt Engineering"],
  tools: ["Git", "GitHub", "SQLite", "Vercel", "Linux"],
  other: ["Full-Stack Development", "Problem Solving", "Front-End Development"]
};

// Interactive Projects Card Component with Spotlight and Live Telemetry
function ProjectCard({ proj, onClick }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      data-cursor="view"
      data-cursor-text="CASE"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className="group glass p-8 md:p-12 rounded-3xl border border-white/5 cursor-pointer relative overflow-hidden transition-all duration-300 flex flex-col md:flex-row gap-8 items-stretch glass-border-hover"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Dynamic Radial Spotlight hover effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(500px circle at ${coords.x}px ${coords.y}px, rgba(139, 92, 246, 0.08), transparent 80%)`
        }}
      />
      
      {/* Left Info Column */}
      <div className="flex-1 flex flex-col justify-between relative z-10">
        <div>
          <div className="flex justify-between items-start mb-6">
            <span className="text-[10px] text-gray-500 tracking-widest font-mono uppercase">
              Featured Project • 01
            </span>
            <ArrowUpRight size={20} className="text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </div>

          <h3 className="text-3xl md:text-4xl font-black font-display text-white group-hover:text-violet-300 transition-colors uppercase mb-4 leading-tight">
            {proj.title}
          </h3>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 font-sans">
            {proj.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {proj.tags.map((tag, idx) => (
            <span key={idx} className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/5 text-gray-300 font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right Column: Live ML Telemetry Simulation visualizer */}
      <div className="flex-1 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8 flex flex-col justify-center min-h-[260px] relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-cyan-400 uppercase font-display">
            <Zap size={14} className="animate-pulse" />
            Live ML Classification Telemetry
          </div>
          <span className="text-[9px] font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/5 animate-pulse">
            Active Sync
          </span>
        </div>
        
        <div className="space-y-4">
          {/* Flood Risk */}
          <div className="p-4 bg-white/2 rounded-2xl border border-white/5 relative overflow-hidden group/item hover:border-cyan-500/20 transition-all duration-300">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-display">Flood Risk Probability</span>
              <span className="text-xs font-mono font-bold text-cyan-400">84.2%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-violet-600 to-cyan-400"
                initial={{ width: 0 }}
                whileInView={{ width: "84.2%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span className="text-[9px] text-gray-500 mt-1.5 block font-sans">Telemetry: Precipitation & Runoff thresholds</span>
          </div>

          {/* Heatwave Risk */}
          <div className="p-4 bg-white/2 rounded-2xl border border-white/5 relative overflow-hidden group/item hover:border-fuchsia-500/20 transition-all duration-300">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-display">Heatwave Alert Status</span>
              <span className="text-xs font-mono font-bold text-fuchsia-400">91.8%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
                initial={{ width: 0 }}
                whileInView={{ width: "91.8%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span className="text-[9px] text-gray-500 mt-1.5 block font-sans">Telemetry: Real-time thermal anomaly thresholds</span>
          </div>

          {/* Wildfire Risk */}
          <div className="p-4 bg-white/2 rounded-2xl border border-white/5 relative overflow-hidden group/item hover:border-violet-500/20 transition-all duration-300">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-display">Wildfire Risk Index</span>
              <span className="text-xs font-mono font-bold text-violet-400">18.5%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-violet-600 to-indigo-400"
                initial={{ width: 0 }}
                whileInView={{ width: "18.5%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span className="text-[9px] text-gray-500 mt-1.5 block font-sans">Telemetry: Relative humidity & wind velocity</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const WEB3FORMS_ACCESS_KEY = "ab60fa03-2087-456c-9bc0-42ef70434534";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("aryanpre4906@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      setGlobalCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  const lenisRef = useRef(null);

  // Handle smooth scroll Lenis initialization
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    const scrollHandler = () => {
      // Calculate scroll progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    window.addEventListener('scroll', scrollHandler);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      lenis.destroy();
    };
  }, [loading]);

  // Pause Lenis and lock scroll when case study modal is open
  useEffect(() => {
    if (activeProject) {
      document.body.classList.remove('custom-cursor-active');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (lenisRef.current) lenisRef.current.stop();
    } else {
      document.body.classList.add('custom-cursor-active');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (lenisRef.current) lenisRef.current.start();
    }

    return () => {
      document.body.classList.add('custom-cursor-active');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [activeProject]);

  const [formSending, setFormSending] = useState(false);
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    // Detect redirect success query parameter from FormSubmit.co
    if (window.location.search.includes('success=true') || window.location.hash.includes('success=true')) {
      setFormSubmitted(true);
      // Clean up the URL query param immediately so it doesn't reappear on manual reload
      const cleanUrl = window.location.pathname + window.location.hash.replace('?success=true', '');
      window.history.replaceState({}, document.title, cleanUrl);
      
      // Hide success message after 6 seconds
      const timeout = setTimeout(() => {
        setFormSubmitted(false);
      }, 6000);
      return () => clearTimeout(timeout);
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormSending(true);
    setFormError(false);

    const triggerMailtoFallback = () => {
      const mailtoSubject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const mailtoBody = encodeURIComponent(
        `Hello Aryan,\n\n` +
        `Sender Name: ${formData.name}\n` +
        `Sender Email: ${formData.email}\n\n` +
        `Message:\n${formData.message}`
      );
      window.location.href = `mailto:aryanpre4906@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
      
      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 6000);
    };

    try {
      // Determine if a Web3Forms Key is configured (reliable edge routing)
      const useWeb3Forms = WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== "YOUR_WEB3FORMS_KEY_HERE";
      
      const endpoint = useWeb3Forms 
        ? "https://api.web3forms.com/submit" 
        : "https://formsubmit.co/ajax/aryanpre4906@gmail.com";
        
      const payload = useWeb3Forms 
        ? {
            access_key: WEB3FORMS_ACCESS_KEY,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `New Portfolio Query from ${formData.name}`
          }
        : {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: `New Portfolio Query from ${formData.name}`
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormSubmitted(false), 6000);
      } else {
        console.warn("Mail api returned non-ok status, falling back to mailto");
        triggerMailtoFallback();
      }
    } catch (error) {
      console.error("Mail submit network error, falling back to mailto:", error);
      triggerMailtoFallback();
    } finally {
      setFormSending(false);
    }
  };

  return (
    <div className="bg-[#06060c] min-h-screen text-slate-200 overflow-hidden bg-grain selection:bg-violet-500/30 selection:text-cyan-300">
      
      {/* Immersive Preloader */}
      <AnimatePresence>
        {loading && (
          <Preloader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          {/* Custom Cursor System */}
          <CustomCursor />

          {/* Top Progress Bar */}
          <div className="fixed top-0 left-0 w-full h-[3px] bg-white/5 z-50">
            <motion.div 
              className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
              style={{ scaleX: scrollProgress, transformOrigin: "0%" }}
            />
          </div>

          {/* Cinematic Background Glow Elements */}
          <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full glow-blur-violet z-0 pointer-events-none" />
          <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full glow-blur-cyan z-0 pointer-events-none" />
          <div className="fixed top-[25%] left-[20%] w-[45vw] h-[45vw] rounded-full glow-blur-fuchsia z-0 pointer-events-none" />

          {/* Premium Graph Paper Grid Overlay */}
          <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-45 z-0" />

          {/* Global Interactive Mouse Grid Spotlight */}
          <div 
            className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 opacity-60 md:opacity-100"
            style={{
              background: `radial-gradient(600px circle at ${globalCoords.x}px ${globalCoords.y}px, rgba(139, 92, 246, 0.05) 0%, rgba(6, 182, 212, 0.03) 50%, transparent 100%)`
            }}
          />

          {/* Floating Glassmorphic Pill Navbar */}
          <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-6 pointer-events-none">
            <motion.header 
              className="w-full max-w-5xl backdrop-blur-xl bg-[#06060c]/70 border border-white/5 py-3 px-6 rounded-full flex justify-between items-center shadow-2xl shadow-[#000000]/50 pointer-events-auto"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 15 }}
            >
              {/* Logo */}
              <a href="#hero" className="font-display font-extrabold text-sm md:text-base tracking-wider text-white flex items-center gap-2.5 group/logo">
                <img 
                  src="https://github.com/aryanbuildsdev-blip.png" 
                  alt="Aryan" 
                  className="w-6 h-6 md:w-7 md:h-7 rounded-full border border-white/10 group-hover/logo:border-cyan-400 transition-colors duration-300"
                />
                <span className="hidden sm:inline">ARYAN.DEV</span>
              </a>

              {/* Nav items */}
              <nav className="flex items-center gap-4 md:gap-8 text-[10px] md:text-xs font-semibold uppercase tracking-widest text-slate-400">
                <a href="#about" className="hover:text-white transition-colors py-1 relative">About</a>
                <a href="#projects" className="hover:text-white transition-colors py-1 relative">Projects</a>
                <a href="#certifications" className="hover:text-white transition-colors py-1 relative">Credentials</a>
                <a href="#skills" className="hover:text-white transition-colors py-1 relative">Skills</a>
                <a href="#contact" className="hover:text-white transition-colors py-1 relative">Contact</a>
              </nav>

              {/* CTA Button */}
              <a 
                href="#contact" 
                className="text-[9px] md:text-xs uppercase tracking-widest bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-95 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full transition-all font-semibold font-display shadow-lg shadow-violet-500/10 hover:shadow-cyan-500/10 cursor-pointer"
              >
                Get in Touch
              </a>
            </motion.header>
          </div>

          {/* SECTION 1: HERO */}
          <section id="hero" className="relative h-screen w-full flex items-center justify-center px-6 md:px-12 pt-20">
            {/* Interactive 144FPS 3D Particle Sphere Background */}
            <HeroScene />

            <div className="container mx-auto z-10 flex flex-col items-center justify-center text-center">
              
              {/* Pulsing Status Tag */}
              <motion.div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 text-[11px] font-semibold tracking-wider text-cyan-300 uppercase"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Open to Work — On-Site / Hybrid (Bhubaneswar)
              </motion.div>

              {/* Huge Name Headline with Chrome Reflection Split Font styling */}
              <motion.h1 
                className="text-5xl sm:text-7xl md:text-9xl font-black font-display tracking-tighter select-none leading-none mb-6 uppercase bg-gradient-to-b from-white via-white to-white/35 bg-clip-text text-transparent filter drop-shadow-[0_0_30px_rgba(255,255,255,0.18)]"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                Aryan
              </motion.h1>

              {/* Tagline */}
              <motion.p 
                className="text-sm sm:text-base md:text-xl text-gradient-purple-cyan font-bold tracking-widest uppercase max-w-3xl mb-10 font-display"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                AI & Machine Learning Enthusiast • Software Developer • Python · Java · Flask
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row items-center gap-4"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <a 
                  href="#projects"
                  data-cursor="hover" 
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 font-semibold text-xs uppercase tracking-widest text-white hover:opacity-90 transition-opacity font-display shadow-lg shadow-violet-500/10 cursor-pointer"
                >
                  View Case Studies
                </a>
                <a 
                  href="#contact"
                  data-cursor="hover" 
                  className="px-8 py-3.5 rounded-full border border-white/10 hover:border-white/20 bg-white/5 font-semibold text-xs uppercase tracking-widest hover:text-white transition-colors font-display cursor-pointer"
                >
                  Let's Collaborate
                </a>
              </motion.div>
            </div>

            {/* Floating bottom indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 opacity-60">
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans">Scroll Down</span>
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </div>
          </section>

          {/* SECTION 2: ABOUT */}
          <section id="about" className="py-32 w-full px-6 md:px-12 relative z-10 overflow-hidden">
            
            {/* Cinematic Background Text Marquees */}
            <div className="absolute inset-0 z-0 pointer-events-none flex flex-col justify-between py-12 select-none opacity-40">
              <div className="w-[200%] flex whitespace-nowrap text-transparent text-stroke-thin font-display font-black text-6xl md:text-[10rem] uppercase tracking-tighter leading-none animate-marquee-ltr">
                ABOUT ME • SOFTWARE ENGINEER • CREATOR • AI/ML ENTHUSIAST •&nbsp;
                ABOUT ME • SOFTWARE ENGINEER • CREATOR • AI/ML ENTHUSIAST •&nbsp;
              </div>
              <div className="w-[200%] flex whitespace-nowrap text-transparent text-stroke-thin font-display font-black text-6xl md:text-[10rem] uppercase tracking-tighter leading-none animate-marquee-rtl">
                BHUBANESWAR • B.TECH STUDENT @ ITER • SOA UNIVERSITY •&nbsp;
                BHUBANESWAR • B.TECH STUDENT @ ITER • SOA UNIVERSITY •&nbsp;
              </div>
            </div>

            {/* Morphing fluid gradient blob behind profile card */}
            <div className="absolute top-[20%] left-[-5%] w-[450px] h-[450px] bg-gradient-to-tr from-violet-600/10 via-indigo-500/5 to-cyan-400/10 fluid-blob blur-3xl pointer-events-none z-0" />

            <div className="container mx-auto max-w-6xl relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left side card */}
                <motion.div 
                  className="lg:col-span-4"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="glass p-8 rounded-3xl border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl" />
                    
                    <div className="flex items-center gap-4 mb-6">
                      <img 
                        src="https://github.com/aryanbuildsdev-blip.png" 
                        alt="Aryan" 
                        className="w-14 h-14 rounded-2xl border border-white/10 shadow-lg shadow-violet-500/10"
                      />
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-violet-400 font-mono block">
                          B.Tech / Computer Science
                        </span>
                        <h3 className="text-2xl font-bold font-display text-white mt-1 uppercase">
                          Aryan
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-6 font-sans">
                      Second-year CS Engineering student at ITER, SOA University, Bhubaneswar.
                    </p>

                    <div className="space-y-4 border-t border-white/5 pt-6">
                      <div className="flex items-center gap-3">
                        <MapPin size={16} className="text-cyan-400" />
                        <span className="text-xs text-gray-300 font-mono">Bhubaneswar, Odisha, IN</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Cpu size={16} className="text-violet-400" />
                        <span className="text-xs text-gray-300 font-mono">AI, ML & Full-Stack</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award size={16} className="text-yellow-400" />
                        <span className="text-xs text-gray-300 font-mono">IBM SkillsBuild Certified</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right side narrative bio */}
                <motion.div 
                  className="lg:col-span-8 flex flex-col justify-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={16} className="text-cyan-400 animate-pulse" />
                    <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase font-display">
                      Immersive Profile
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-black font-display text-white tracking-tight leading-tight mb-8 uppercase">
                    Pioneering Smarter Solutions Through Engineering.
                  </h2>

                  <p className="text-gray-300 text-base md:text-lg leading-relaxed font-sans mb-6">
                    I am a second-year B.Tech student passionate about building end-to-end, data-driven applications that solve real-world problems. By blending software engineering concepts with intelligent systems, I actively explore the intersections of <span className="text-white font-semibold">AI, Machine Learning, Backend Development</span>, and <span className="text-white font-semibold">Cloud Computing</span>.
                  </p>

                  <p className="text-gray-400 text-sm md:text-base leading-relaxed font-sans mb-8">
                    My approach is entirely hands-on. Whether training classification models to predict natural disaster probabilities across Indian cities or synchronizing real-time API weather telemetry, I build functional dashboards that transform complex predictive data into visually intuitive human interfaces.
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="p-4 border-l border-violet-500 bg-white/2">
                      <span className="text-2xl font-bold font-display text-white block leading-none">02+</span>
                      <span className="text-[10px] uppercase text-gray-500 tracking-wider mt-1 block">Years B.Tech Exp</span>
                    </div>
                    <div className="p-4 border-l border-cyan-400 bg-white/2">
                      <span className="text-2xl font-bold font-display text-white block leading-none">03+</span>
                      <span className="text-[10px] uppercase text-gray-500 tracking-wider mt-1 block">ML Classifiers</span>
                    </div>
                    <div className="p-4 border-l border-fuchsia-400 bg-white/2">
                      <span className="text-2xl font-bold font-display text-white block leading-none">05+</span>
                      <span className="text-[10px] uppercase text-gray-500 tracking-wider mt-1 block">Tech Frameworks</span>
                    </div>
                  </div>

                </motion.div>
              </div>
            </div>
          </section>

          {/* SECTION 3: PROJECTS */}
          <section id="projects" className="py-32 w-full px-6 md:px-12 relative z-10 border-t border-white/5 bg-[#08080f]/40">
            <div className="container mx-auto max-w-6xl">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
                <div>
                  <span className="text-xs font-bold tracking-widest text-violet-400 uppercase font-display block mb-2">
                    Selected Lab Work
                  </span>
                  <h2 className="text-3xl md:text-6xl font-black font-display text-white tracking-tight leading-none uppercase">
                    Featured Work
                  </h2>
                </div>
                <p className="text-gray-400 text-xs md:text-sm max-w-sm mt-4 md:mt-0 font-sans">
                  Click any project card to open its case study containing custom data simulations and charts.
                </p>
              </div>

              {/* Single Feature project banner */}
              <div className="max-w-4xl mx-auto">
                {projects.map((proj) => (
                  <ProjectCard 
                    key={proj.id} 
                    proj={proj} 
                    onClick={() => setActiveProject(proj)} 
                  />
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 4: CERTIFICATIONS */}
          <section id="certifications" className="py-32 w-full px-6 md:px-12 relative z-10 border-b border-white/5">
            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <motion.div 
                  className="lg:col-span-5"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="text-xs font-bold tracking-widest text-violet-400 uppercase font-display block mb-2">
                    Industry Credentials
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black font-display text-white tracking-tight leading-tight uppercase mb-6">
                    Verifiable Credentials
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed font-sans mb-8">
                    Certifications earned through leading cloud and technology learning pathways, confirming training and capability in artificial intelligence and automation.
                  </p>
                </motion.div>

                {/* Badge card display */}
                <motion.div 
                  className="lg:col-span-7 flex justify-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="glass p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden max-w-lg w-full">
                    {/* Glowing effect behind badge */}
                    <div className="absolute -top-10 -left-10 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                      {/* Virtual IBM badge structure */}
                      <div className="w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-900 flex items-center justify-center text-white font-display border border-blue-400/20 relative shadow-xl shadow-blue-500/10">
                        <Code size={36} className="text-blue-200" />
                        <div className="absolute inset-0.5 rounded-[14px] border border-white/10" />
                        <span className="absolute bottom-1 right-1 text-[8px] tracking-wider text-blue-200 font-mono font-bold">IBM</span>
                      </div>

                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-400 font-semibold tracking-wider uppercase mb-3">
                          IBM SkillsBuild
                        </div>
                        <h3 className="text-xl font-bold font-display text-white uppercase leading-tight mb-2">
                          Getting Started with Artificial Intelligence
                        </h3>
                        <p className="text-xs text-gray-500 font-sans mb-4">
                          Issued March 2026 • Verifiable Credential
                        </p>
                        
                        <a 
                          href="https://www.credly.com/badges/002bf9a4-a8ce-49c2-a02b-a449f94fdfce"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-bold hover:text-cyan-300 transition-colors uppercase font-display cursor-pointer"
                        >
                          Verify Credential
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </section>

          {/* SECTION 5: SKILLS */}
          <section id="skills" className="py-32 w-full px-6 md:px-12 relative z-10 bg-[#08080f]/40">
            <div className="container mx-auto max-w-6xl">
              
              <div className="text-center mb-16">
                <span className="text-xs font-bold tracking-widest text-violet-400 uppercase font-display block mb-2">
                  Technical Arsenal
                </span>
                <h2 className="text-3xl md:text-6xl font-black font-display text-white tracking-tight leading-none uppercase">
                  Skills & Tools
                </h2>
              </div>

              {/* Skills categorization layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
                
                {/* Column 1: Languages & Core */}
                <InteractiveSkillsCard title="Languages & Core" accentColor="#06b6d4">
                  {skillsData.languages.map((skill, idx) => (
                    <SkillTag key={idx} skill={skill} accentColor="#06b6d4" />
                  ))}
                </InteractiveSkillsCard>

                {/* Column 2: Frameworks & AI/ML */}
                <InteractiveSkillsCard title="AI/ML & Frameworks" accentColor="#8b5cf6">
                  {[...skillsData.mlai, ...skillsData.frameworks].map((skill, idx) => (
                    <SkillTag key={idx} skill={skill} accentColor="#8b5cf6" />
                  ))}
                </InteractiveSkillsCard>

                {/* Column 3: Tools & Methodologies */}
                <InteractiveSkillsCard title="Tools & Methods" accentColor="#d946ef">
                  {[...skillsData.tools, ...skillsData.other].map((skill, idx) => (
                    <SkillTag key={idx} skill={skill} accentColor="#d946ef" />
                  ))}
                </InteractiveSkillsCard>

              </div>
            </div>
          </section>

          {/* SECTION 6: CONTACT */}
          <section id="contact" className="py-32 w-full px-6 md:px-12 relative z-10 border-t border-white/5">
            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Contact info side */}
                <motion.div 
                  className="lg:col-span-5 flex flex-col justify-between"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div>
                    <span className="text-xs font-bold tracking-widest text-violet-400 uppercase font-display block mb-2">
                      Initiate Contact
                    </span>
                    <h2 className="text-3xl md:text-6xl font-black font-display text-white tracking-tight leading-tight uppercase mb-6">
                      Let's Build Something.
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed font-sans mb-8">
                      I am always open to discuss engineering roles, project collaboration, or research opportunities. Send a message, or reach out through my social channels.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-cyan-400">
                        <Mail size={18} />
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-sans">Primary Email</span>
                        <a href="mailto:aryanpre4906@gmail.com" className="text-sm font-semibold text-white hover:text-violet-400 font-mono">
                          aryanpre4906@gmail.com
                        </a>
                      </div>
                    </div>

                    {/* Social coordinates */}
                    <div className="flex gap-4 pt-4">
                      <a 
                        href="https://github.com/aryanbuildsdev-blip" 
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="hover"
                        className="w-12 h-12 rounded-2xl border border-white/5 hover:border-violet-500 hover:text-violet-400 flex items-center justify-center bg-white/5 text-gray-400 transition-all cursor-pointer"
                      >
                        <Github size={20} />
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/aryan-aryan-1b8704351?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="hover"
                        className="w-12 h-12 rounded-2xl border border-white/5 hover:border-cyan-400 hover:text-cyan-300 flex items-center justify-center bg-white/5 text-gray-400 transition-all cursor-pointer"
                      >
                        <Linkedin size={20} />
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Animated Form side */}
                <motion.div 
                  className="lg:col-span-7"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="glass p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      {formSubmitted ? (
                        <motion.div 
                          className="flex flex-col items-center justify-center py-12 text-center"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center mb-6">
                            <CheckCircle size={32} />
                          </div>
                          <h3 className="text-xl font-bold font-display text-white uppercase mb-2">
                            Transmission Received!
                          </h3>
                          <p className="text-sm text-gray-400 font-sans max-w-sm">
                            Thank you for your message, Aryan. We will review your details and connect with you shortly.
                          </p>
                        </motion.div>
                      ) : (
                        <form 
                          onSubmit={handleFormSubmit}
                          className="space-y-6"
                        >
                          <input type="hidden" name="_next" value={window.location.origin + window.location.pathname + "?success=true#contact"} />
                          <input type="hidden" name="_subject" value={`New Portfolio Query from ${formData.name || 'Visitor'}`} />
                          <input type="hidden" name="_captcha" value="false" />
                          
                          <div>
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest block font-sans mb-2">
                              Your Name
                            </label>
                            <input 
                              type="text" 
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              className="w-full bg-white/5 border border-white/10 focus:border-violet-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors font-sans"
                              placeholder="John Doe"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest block font-sans mb-2">
                              Email Address
                            </label>
                            <input 
                              type="email" 
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full bg-white/5 border border-white/10 focus:border-violet-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors font-sans"
                              placeholder="john@example.com"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest block font-sans mb-2">
                              Your Message
                            </label>
                            <textarea 
                              rows={5}
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              required
                              className="w-full bg-white/5 border border-white/10 focus:border-violet-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors font-sans resize-none"
                              placeholder="Write your project details or inquiry here..."
                            />
                          </div>

                          <div className="flex gap-4">
                            <button 
                              type="submit"
                              disabled={formSending}
                              data-cursor="hover"
                              className="flex-1 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 font-bold text-xs uppercase tracking-widest text-white hover:opacity-95 disabled:opacity-50 transition-opacity font-display flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-violet-500/10 disabled:cursor-not-allowed"
                            >
                              <Send size={14} className={formSending ? "animate-bounce" : ""} />
                              {formSending ? "Transmitting..." : "Send Message"}
                            </button>
                            
                            <button
                              type="button"
                              onClick={handleCopyEmail}
                              data-cursor="hover"
                              className="px-6 py-4 rounded-xl border border-white/10 hover:border-violet-500 hover:text-white bg-white/5 font-bold text-xs uppercase tracking-widest text-gray-300 transition-all font-display flex items-center justify-center gap-2 cursor-pointer shrink-0"
                            >
                              {copied ? <CheckCircle size={14} className="text-emerald-400" /> : <Copy size={14} />}
                              {copied ? "Copied!" : "Copy Email"}
                            </button>
                          </div>
                        </form>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="py-12 border-t border-white/5 relative z-10 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#030308]">
            <div className="text-center md:text-left">
              <span className="text-xs text-gray-400 font-sans block">
                © {new Date().getFullYear()} Aryan. Built with React + Vite + Tailwind v4.
              </span>
              <span className="text-[10px] text-gray-600 mt-1 block font-mono">
                Location Coordinates: Bhubaneswar, Odisha, India
              </span>
            </div>
            
            <div className="flex gap-4">
              <a href="#about" className="text-[10px] uppercase tracking-wider text-gray-500 hover:text-white transition-colors">About</a>
              <a href="#projects" className="text-[10px] uppercase tracking-wider text-gray-500 hover:text-white transition-colors">Projects</a>
              <a href="#skills" className="text-[10px] uppercase tracking-wider text-gray-500 hover:text-white transition-colors">Skills</a>
              <a href="#contact" className="text-[10px] uppercase tracking-wider text-gray-500 hover:text-white transition-colors">Contact</a>
            </div>
          </footer>

          {/* Project Detailed Case Study Modal Overlay */}
          <ProjectModal 
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />

          {/* Floating AI Portfolio Assistant */}
          <AIAssistant />
        </>
      )}
    </div>
  );
}
