import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function AnimatedBridge() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 100, damping: 25 });
  const springY = useSpring(y, { stiffness: 100, damping: 25 });

  const rotateX = useTransform(springY, [-1, 1], [5, -5]);
  const rotateY = useTransform(springX, [-1, 1], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / (rect.width / 2));
    y.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/3] max-w-[600px] mx-auto lg:ml-auto lg:mr-0"
      style={{ perspective: 1000 }}
    >
      <div className="absolute inset-0 bg-radial from-[#14B8A6]/20 via-[#14B8A6]/5 to-transparent rounded-full blur-3xl pointer-events-none transform -translate-y-4" />
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="w-full h-full drop-shadow-2xl">
      {/* SVG Bridge */}
      <svg viewBox="0 0 640 400" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="cableGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <radialGradient id="nodeGlowTeal" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(13,148,136,0.3)" />
            <stop offset="100%" stopColor="rgba(13,148,136,0)" />
          </radialGradient>
          <radialGradient id="nodeGlowAmber" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(245,158,11,0.3)" />
            <stop offset="100%" stopColor="rgba(245,158,11,0)" />
          </radialGradient>
        </defs>

        {/* Bases */}
        <motion.g initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8 }} style={{ transformOrigin: "115px 330px" }}>
          <rect x="40" y="330" width="150" height="14" rx="7" fill="#0F172A" opacity="0.08" />
          <rect x="40" y="322" width="150" height="10" rx="5" fill="#0D9488" />
        </motion.g>
        <motion.g initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3 }} style={{ transformOrigin: "525px 330px" }}>
          <rect x="450" y="330" width="150" height="14" rx="7" fill="#0F172A" opacity="0.08" />
          <rect x="450" y="322" width="150" height="10" rx="5" fill="#F59E0B" />
        </motion.g>

        {/* Pillars */}
        <motion.rect x="108" y="120" width="14" height="210" rx="7" fill="#0F172A" opacity="0.85" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }} style={{ transformOrigin: "115px 330px" }} />
        <motion.rect x="518" y="120" width="14" height="210" rx="7" fill="#0F172A" opacity="0.85" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16,1,0.3,1] }} style={{ transformOrigin: "525px 330px" }} />

        {/* Main Cable */}
        <motion.path d="M40 300 C 115 130, 205 130, 320 210 C 435 130, 525 130, 600 300" fill="none" stroke="url(#cableGrad)" strokeWidth="3.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, delay: 0.3, ease: [0.65,0,0.35,1] }} />
        {/* Shadow Cable */}
        <motion.path d="M40 312 C 115 155, 205 155, 320 232 C 435 155, 525 155, 600 312" fill="none" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, delay: 0.5, ease: [0.65,0,0.35,1] }} />

        {/* Vertical suspension lines */}
        {[80,150,260,380,490,560].map((y, v) => (
          <motion.line key={y} x1={y} x2={y} y1={y<320 ? 300-(y-40)*0.4 : 300-(600-y)*0.4} y2="326" stroke="#0D9488" strokeWidth="1.6" opacity="0" animate={{ opacity: 0.5 }} transition={{ duration: 0.4, delay: 1.1 + v*0.08 }} />
        ))}

        {/* Middle Node: RAG Match */}
        <motion.g initial={{ opacity: 0, scale: 0.4, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.6, ease: [0.34,1.56,0.64,1] }}>
          <motion.g animate={{ y: [0,-8,0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}>
            <circle cx="320" cy="210" r="58" fill="url(#nodeGlowTeal)" opacity="0.7" />
            <circle cx="320" cy="210" r="34" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
            <motion.g animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "320px 210px" }}>
              <circle cx="320" cy="210" r="4" fill="#0D9488" />
              <circle cx="303" cy="197" r="3.4" fill="#F59E0B" />
              <circle cx="337" cy="197" r="3.4" fill="#F59E0B" />
              <circle cx="303" cy="223" r="3.4" fill="#0D9488" />
              <circle cx="337" cy="223" r="3.4" fill="#0D9488" />
              <path d="M320 210L303 197M320 210L337 197M320 210L303 223M320 210L337 223" stroke="#0F172A" strokeWidth="1" opacity="0.35" />
            </motion.g>
          </motion.g>
        </motion.g>

        {/* Left Node: Citizen */}
        <motion.g initial={{ opacity: 0, scale: 0.4, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.3, ease: [0.34,1.56,0.64,1] }}>
          <motion.g animate={{ y: [0,-8,0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
            <circle cx="115" cy="270" r="46" fill="url(#nodeGlowTeal)" />
            <circle cx="115" cy="270" r="30" fill="#FFFFFF" stroke="#0D9488" strokeWidth="1.5" />
            <path d="M115 258a9 9 0 100-18 9 9 0 000 18zm0 4c-8.4 0-18 4.5-18 10.5v3h36v-3c0-6-9.6-10.5-18-10.5z" fill="#0D9488" />
          </motion.g>
        </motion.g>

        {/* Right Node: Scheme */}
        <motion.g initial={{ opacity: 0, scale: 0.4, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.9, ease: [0.34,1.56,0.64,1] }}>
          <motion.g animate={{ y: [0,-8,0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.4 }}>
            <circle cx="525" cy="270" r="46" fill="url(#nodeGlowAmber)" />
            <circle cx="525" cy="270" r="30" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="1.5" />
            <path d="M513 262h24v20h-24z" fill="none" stroke="#F59E0B" strokeWidth="2" />
            <path d="M513 262l12 9 12-9" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinejoin="round" />
          </motion.g>
        </motion.g>

        {/* Labels */}
        <motion.text x="115" y="350" textAnchor="middle" className="fill-[#0F172A] text-[11px] font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>Citizen</motion.text>
        <motion.text x="320" y="275" textAnchor="middle" className="fill-[#0F172A] text-xs font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}>RAG Match</motion.text>
        <motion.text x="525" y="350" textAnchor="middle" className="fill-[#0F172A] text-[11px] font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }}>Scheme</motion.text>
      </svg>

      {/* Floating Card: Why you match */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.7 }}
        className="absolute top-[10%] -left-[10%] bg-white rounded-2xl shadow-xl px-4 py-3 border border-slate-100/50 z-10 w-48 text-left"
        style={{ animation: 'floatY 6s ease-in-out 2.5s infinite' }}
      >
        <div className="flex items-center gap-1.5 mb-1 text-xs font-bold text-[#0F172A]">
          <span className="text-[#F59E0B] text-[10px]">✨</span> Why you match
        </div>
        <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
          Age, state and income details satisfy <span className="text-[#0D9488] font-bold">scheme</span> eligibility.
        </p>
      </motion.div>

      {/* Floating Card: Matched via WhatsApp */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 2.8, duration: 0.7 }}
        className="absolute bottom-[2%] -right-[5%] lg:-right-[10%] bg-white rounded-2xl shadow-xl px-4 py-3 border border-slate-100/50 z-10 w-48 text-left"
        style={{ animation: 'floatY 6s ease-in-out 2.8s infinite' }}
      >
        <div className="flex items-center gap-1.5 mb-1 text-xs font-bold text-[#0F172A]">
          Matched via WhatsApp
        </div>
        <div className="flex items-start gap-1.5 mt-1.5">
          <svg className="w-3.5 h-3.5 text-[#25D366] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12.01 2.01c-5.52 0-10 4.48-10 10 0 1.95.56 3.77 1.52 5.3l-1.51 5.53 5.65-1.48c1.47.88 3.19 1.39 5.01 1.39 5.52 0 10-4.48 10-10s-4.48-10-10-10zm5.17 14.3c-.24.68-1.4 1.32-1.95 1.37-.52.05-1.18.23-3.41-.69-2.69-1.11-4.42-3.86-4.56-4.04-.13-.19-1.09-1.45-1.09-2.77 0-1.32.69-1.98.94-2.25.24-.26.54-.33.72-.33.18 0 .37 0 .52.01.16.01.38-.06.6.48.23.53.74 1.83.81 1.97.07.14.12.3.02.5-.1.19-.15.31-.3.48-.15.17-.32.37-.45.5-.15.15-.31.32-.13.62.17.3 1.15 1.9 2.58 3.18 1.84 1.64 3.42 2.15 3.73 2.29.3.13.48.11.66-.08.18-.21.78-.9 1-1.21.21-.3.43-.25.7-.15.28.1 1.76.83 2.06 1 .3.17.5.25.57.39.08.14.08.83-.16 1.5z" /></svg>
          <span className="text-[10px] text-slate-400 font-medium leading-relaxed">"Mujhe scholarship aur<br />health support chahiye"</span>
        </div>
      </motion.div>

      {/* Floating Card: Verified */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 3.1, duration: 0.7 }}
        className="absolute bottom-[-5%] left-[25%] bg-white rounded-full shadow-md px-3 py-1.5 border border-slate-100/50 z-10 flex items-center gap-1.5"
        style={{ animation: 'floatY 6s ease-in-out 3.1s infinite' }}
      >
        <svg className="w-3 h-3 text-[#0D9488]" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
        </svg>
        <span className="text-[10px] font-bold text-[#0F172A]">Verified 3 days ago</span>
      </motion.div>
      </motion.div>

      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
