import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";

interface ReasoningOverlayProps {
  matchCount: number;
  onFinished: () => void;
}

export default function ReasoningOverlay({
  matchCount,
  onFinished,
}: ReasoningOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);

  // Load profile values dynamically from localStorage
  const profile = JSON.parse(localStorage.getItem("profile") || "{}");
  const name = profile.name || "Citizen";
  const age = profile.age || "—";
  const state = profile.state || "—";
  const occupation = profile.occupation || "—";
  const income = profile.income
    ? `₹${Number(profile.income).toLocaleString()}`
    : "—";

  const pipelineSteps = [
    {
      title: "Profile Validation",
      detail: `Receiving profile details for ${name} (Age: ${age}, State: ${state}, Occupation: ${occupation}, Income: ${income})`,
    },
    {
      title: "Hard Filter Engine",
      detail: "Applying strict exclusion criteria (checking legal age thresholds, income brackets, and state applicator guidelines)",
    },
    {
      title: "Hybrid Vector Search",
      detail: "Generating semantic embeddings & querying 80 verified welfare schemes from database",
    },
    {
      title: "Gemini Explainability",
      detail: "Retrieving verified eligibility rationale and required checklists",
    },
    {
      title: "Application Draft Generator",
      detail: "Preparing cover letter template layouts matching scheme rules",
    },
    {
      title: "Results Ready",
      detail: `Completed! Found ${matchCount} eligible matches.`,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= pipelineSteps.length - 1) {
          clearInterval(interval);
          // Wait a short moment on the final step before auto-transitioning
          setTimeout(onFinished, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF8F3] overflow-y-auto p-6 flex flex-col justify-between font-sans">
      
      {/* Top Bar with Skip */}
      <div className="flex justify-between items-center max-w-4xl mx-auto w-full py-4">
        <span className="font-serif text-lg font-black text-[#0F172A]">🏛️ Setu AI</span>
        <button
          onClick={onFinished}
          className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#0F172A] border border-[#0F172A]/10 px-3 py-1.5 rounded-xl hover:bg-[#0F172A]/5 transition cursor-pointer"
        >
          Skip Animation
        </button>
      </div>

      {/* Center content */}
      <div className="max-w-xl mx-auto w-full flex-1 flex flex-col justify-center space-y-12">
        
        {/* Visual Pipeline Nodes */}
        <div className="w-full flex justify-between items-center relative px-2">
          {/* Connecting line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-200 -z-10" />
          <div
            className="absolute top-4 left-0 h-0.5 bg-[#14B8A6] -z-10 transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / (pipelineSteps.length - 1)) * 100}%` }}
          />

          {pipelineSteps.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isActive = idx === currentStep;
            return (
              <div key={idx} className="flex flex-col items-center gap-1.5 relative">
                <motion.div
                  animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs shadow-soft transition-all duration-300 ${
                    isCompleted
                      ? "bg-[#14B8A6] text-white border border-transparent"
                      : isActive
                      ? "bg-white text-[#14B8A6] border-2 border-[#14B8A6] ring-4 ring-[#14B8A6]/10"
                      : "bg-slate-100 text-slate-400 border border-slate-200"
                  }`}
                >
                  {isCompleted ? "✓" : idx + 1}
                </motion.div>
                <span className="hidden sm:inline absolute top-10 whitespace-nowrap text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  {step.title.split(" ")[0]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Text Steps Feed */}
        <Card className="border border-[#0F172A]/5 p-6 shadow-premium bg-white space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <FaSpinner className="animate-spin text-[#14B8A6] h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Pipeline Node: {pipelineSteps[currentStep].title}
            </span>
          </div>

          <div className="space-y-3 max-h-[220px] overflow-y-auto no-scrollbar">
            <AnimatePresence>
              {pipelineSteps.slice(0, currentStep + 1).map((step, idx) => {
                const isCurrent = idx === currentStep;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-2.5 text-xs font-semibold"
                  >
                    <FaCheckCircle className={isCurrent ? "text-[#14B8A6] mt-0.5" : "text-[#22C55E] mt-0.5"} />
                    <div className="space-y-0.5">
                      <p className="text-[#0F172A]">{step.title}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{step.detail}</p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </Card>
      </div>

      {/* Bottom status info */}
      <div className="max-w-4xl mx-auto w-full text-center py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        Setu AI • Secure RAG Architecture Validation
      </div>

    </div>
  );
}

// Simple placeholder Card just in case we import before it resolves
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-white border border-[#0F172A]/5 p-6 shadow-soft ${className}`}>
      {children}
    </div>
  );
}
