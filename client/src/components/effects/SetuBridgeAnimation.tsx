import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaMagic } from "react-icons/fa";

export default function SetuBridgeAnimation() {
  return (
    <div className="relative w-full max-w-xl mx-auto h-[380px] sm:h-[420px] bg-gradient-to-b from-[#FAF8F3] to-[#F4EFE6] rounded-3xl p-6 border border-[#0F172A]/5 shadow-premium overflow-hidden flex flex-col justify-end font-sans">
      {/* Background Soft Glows */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#14B8A6]/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-12 right-12 w-16 h-16 bg-[#F59E0B]/15 rounded-2xl rotate-12 blur-xs pointer-events-none" />

      {/* Floating Micro-Card: Why You Match */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-6 left-6 z-30 max-w-[260px] bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-premium border border-[#0F172A]/10 space-y-1.5"
      >
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#D97706]">
          <FaMagic className="h-3.5 w-3.5 text-[#F59E0B]" />
          <span>Why you match</span>
        </div>
        <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
          Age, state and income details satisfy <span className="font-bold text-[#0D9488]">scheme</span> eligibility.
        </p>

        {/* Pin connector dot to pillar */}
        <div className="absolute -bottom-3 left-12 w-6 h-6 rounded-full bg-white border border-[#0F172A]/10 flex items-center justify-center shadow-soft">
          <div className="w-2 h-2 rounded-full bg-[#0F172A]" />
        </div>
      </motion.div>

      {/* SVG Bridge Layer & Pulse Particles */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 600 400"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Left Bridge Arc: Citizen -> RAG Match */}
        <path
          d="M 160 270 C 200 160, 260 160, 300 240"
          stroke="#0D9488"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          className="opacity-80"
        />
        <path
          d="M 160 270 C 200 160, 260 160, 300 240"
          stroke="#14B8A6"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          fill="none"
          className="opacity-40"
        />

        {/* Right Bridge Arc: RAG Match -> Scheme */}
        <path
          d="M 300 240 C 340 160, 400 160, 440 270"
          stroke="#0D9488"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          className="opacity-80"
        />
        <path
          d="M 300 240 C 340 160, 400 160, 440 270"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          fill="none"
          className="opacity-40"
        />

        {/* Continuous Moving Pulse Dot 1 (Citizen to RAG) */}
        <motion.circle
          r="6"
          fill="#14B8A6"
          filter="drop-shadow(0px 0px 6px #14B8A6)"
          animate={{
            cx: [160, 200, 250, 300],
            cy: [270, 190, 180, 240],
            opacity: [0, 1, 1, 0.2],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Continuous Moving Pulse Dot 2 (RAG to Scheme) */}
        <motion.circle
          r="6"
          fill="#F59E0B"
          filter="drop-shadow(0px 0px 6px #F59E0B)"
          animate={{
            cx: [300, 350, 400, 440],
            cy: [240, 180, 190, 270],
            opacity: [0.2, 1, 1, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.1,
          }}
        />
      </svg>

      {/* Main Bridge Nodes & Pillars Container */}
      <div className="relative z-20 w-full flex items-end justify-between px-6 sm:px-12 pb-6">
        
        {/* Left Node: Citizen */}
        <div className="flex flex-col items-center gap-2 relative">
          {/* Vertical Dark Pier/Pillar */}
          <div className="w-4 h-44 bg-[#1E293B] rounded-t-full shadow-md relative flex items-center justify-center">
            {/* White connection dot on pillar */}
            <div className="absolute top-14 w-3 h-3 rounded-full bg-white shadow-soft border border-slate-300" />
          </div>

          {/* Citizen Avatar Base Node */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="w-16 h-16 rounded-full bg-white border-2 border-[#0D9488] shadow-premium flex items-center justify-center text-[#0D9488] cursor-pointer"
          >
            <FaUser className="h-7 w-7" />
          </motion.div>
          
          <span className="text-xs font-bold tracking-tight text-[#0F172A]">Citizen</span>

          {/* Base Platform */}
          <div className="w-28 h-2.5 bg-[#0D9488]/70 rounded-full shadow-inner mt-0.5" />
        </div>

        {/* Center Node: RAG Match */}
        <div className="flex flex-col items-center gap-2 mb-10 relative">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 rounded-full bg-white border-2 border-[#0F172A]/20 shadow-premium flex items-center justify-center relative cursor-pointer"
          >
            {/* Interconnecting 4-Dot Cross Network Icon */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute top-1 left-1 w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <div className="absolute bottom-1 left-1 w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
              <div className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
              {/* Cross Lines */}
              <div className="absolute inset-0 border-t border-b border-[#0F172A]/30 rotate-45 pointer-events-none" />
            </div>
          </motion.div>

          <span className="text-xs font-serif font-extrabold tracking-tight text-[#0F172A]">RAG Match</span>
          
          {/* Vertical Support Guides */}
          <div className="flex gap-8 opacity-30">
            <div className="w-0.5 h-16 bg-[#0D9488]" />
            <div className="w-0.5 h-16 bg-[#0D9488]" />
          </div>
        </div>

        {/* Right Node: Scheme */}
        <div className="flex flex-col items-center gap-2 relative">
          {/* Vertical Dark Pier/Pillar */}
          <div className="w-4 h-44 bg-[#1E293B] rounded-t-full shadow-md relative flex items-center justify-center">
            {/* White connection dot on pillar */}
            <div className="absolute top-14 w-3 h-3 rounded-full bg-white shadow-soft border border-slate-300" />
          </div>

          {/* Scheme Avatar Base Node */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="w-16 h-16 rounded-full bg-white border-2 border-[#F59E0B] shadow-premium flex items-center justify-center text-[#D97706] cursor-pointer"
          >
            <FaEnvelope className="h-7 w-7" />
          </motion.div>

          <span className="text-xs font-bold tracking-tight text-[#0F172A]">Scheme</span>

          {/* Base Platform */}
          <div className="w-28 h-2.5 bg-[#F59E0B]/70 rounded-full shadow-inner mt-0.5" />
        </div>

      </div>
    </div>
  );
}
