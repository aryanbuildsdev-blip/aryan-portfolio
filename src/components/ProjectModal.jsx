import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

const Github = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
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
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend } from 'recharts';

// Mock Recharts Data for Disaster Risk
const disasterData = [
  { month: 'Jan', Heatwave: 10, Flood: 20, Wildfire: 15 },
  { month: 'Feb', Heatwave: 15, Flood: 18, Wildfire: 25 },
  { month: 'Mar', Heatwave: 40, Flood: 15, Wildfire: 45 },
  { month: 'Apr', Heatwave: 75, Flood: 10, Wildfire: 60 },
  { month: 'May', Heatwave: 90, Flood: 22, Wildfire: 75 },
  { month: 'Jun', Heatwave: 65, Flood: 85, Wildfire: 40 },
  { month: 'Jul', Heatwave: 45, Flood: 95, Wildfire: 20 },
];

// Mock Recharts Data for Ethanol Policy
const ethanolData = [
  { year: '2018', Actual: 4.2, Target: 5.0 },
  { year: '2020', Actual: 5.0, Target: 7.5 },
  { year: '2022', Actual: 10.0, Target: 10.0 },
  { year: '2024', Actual: 12.5, Target: 15.0 },
  { year: '2026', Actual: null, Target: 20.0 },
  { year: '2028', Actual: null, Target: 25.0 },
  { year: '2030', Actual: null, Target: 30.0 },
];

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const isDisasterProj = project.id === 1;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-99990 flex items-center justify-end overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-[#020205]/80 backdrop-blur-md"
          onClick={onClose}
        />

        <motion.div
          data-lenis-prevent
          className="relative w-full max-w-4xl h-full bg-[#0a0a0f] border-l border-white/5 p-6 md:p-12 overflow-y-auto flex flex-col justify-between"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 220 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-violet-500 hover:text-violet-400 transition-colors bg-white/5 cursor-pointer z-10"
          >
            <X size={20} />
          </button>

          <div>
            {/* Header info */}
            <div className="mb-8">
              <span className="text-xs font-bold tracking-widest text-violet-400 uppercase font-display">
                Featured Case Study
              </span>
              <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white mt-2 leading-none">
                {project.title}
              </h2>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/5 text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold tracking-wider text-cyan-400 uppercase font-display mb-2">
                    Project Overview
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base font-sans">
                    {project.longDescription || project.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold tracking-wider text-cyan-400 uppercase font-display mb-3">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-300 font-sans">
                        <CheckCircle2 size={16} className="text-violet-400 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar with Tech Details */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="glass p-6 rounded-2xl border border-white/5">
                  <h3 className="text-sm font-semibold tracking-wider text-white uppercase font-display mb-4">
                    Technical Specifications
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-sans">
                        Backend & Logic
                      </span>
                      <span className="text-sm text-gray-200 mt-0.5 block font-mono">
                        {isDisasterProj ? "Python, Flask, SQLite" : "Python, Flask"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-sans">
                        AI & Machine Learning
                      </span>
                      <span className="text-sm text-gray-200 mt-0.5 block font-mono">
                        Scikit-learn, Pandas, NumPy, RandomForest
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-sans">
                        Frontend & Deployment
                      </span>
                      <span className="text-sm text-gray-200 mt-0.5 block font-mono">
                        {isDisasterProj ? "HTML, CSS, JavaScript, Vercel" : "React, Tailwind, Vercel"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.links?.demo || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 font-semibold text-sm hover:opacity-90 transition-all font-display shadow-lg shadow-violet-500/10 cursor-pointer"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a
                    href={project.links?.github || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 font-semibold text-sm transition-all font-display cursor-pointer"
                  >
                    <Github size={16} />
                    GitHub Repo
                  </a>
                </div>
              </div>
            </div>

            {/* Recharts Visualization Dashboard Section */}
            <div className="glass p-6 md:p-8 rounded-2xl border border-white/5 mb-10 overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
                    {isDisasterProj ? (
                      <>
                        <AlertTriangle size={18} className="text-red-400" />
                        Disaster Risk Assessment Simulation
                      </>
                    ) : (
                      <>
                        <TrendingUp size={18} className="text-cyan-400" />
                        Ethanol Transition Projection (E10 to E30)
                      </>
                    )}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {isDisasterProj 
                      ? "Interactive mock data dashboard predicting local risk probabilities over time"
                      : "India's ethanol blending target trajectory compared to actual blending progress"}
                  </p>
                </div>
              </div>

              {/* Chart Grid */}
              <div className="w-full h-[240px] mt-4 font-mono text-[10px]">
                <ResponsiveContainer width="100%" height="100%">
                  {isDisasterProj ? (
                    <AreaChart data={disasterData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorHeatwave" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorFlood" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorWildfire" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" stroke="#4b5563" />
                      <YAxis stroke="#4b5563" />
                      <Tooltip contentStyle={{ backgroundColor: '#0a0a0f', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }} />
                      <Legend wrapperStyle={{ paddingTop: 10 }} />
                      <Area type="monotone" dataKey="Heatwave" stroke="#ef4444" fillOpacity={1} fill="url(#colorHeatwave)" />
                      <Area type="monotone" dataKey="Flood" stroke="#3b82f6" fillOpacity={1} fill="url(#colorFlood)" />
                      <Area type="monotone" dataKey="Wildfire" stroke="#f97316" fillOpacity={1} fill="url(#colorWildfire)" />
                    </AreaChart>
                  ) : (
                    <BarChart data={ethanolData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="year" stroke="#4b5563" />
                      <YAxis stroke="#4b5563" suffix="%" />
                      <Tooltip contentStyle={{ backgroundColor: '#0a0a0f', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }} />
                      <Legend wrapperStyle={{ paddingTop: 10 }} />
                      <Bar dataKey="Target" name="Target Blending %" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Actual" name="Actual Blending %" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Footer of modal */}
          <div className="flex justify-between items-center border-t border-white/5 pt-6 mt-6">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
              © {new Date().getFullYear()} Aryan
            </span>
            <button
              onClick={onClose}
              className="text-xs text-gray-400 hover:text-white underline transition-colors cursor-pointer font-sans"
            >
              Back to Portfolio
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
