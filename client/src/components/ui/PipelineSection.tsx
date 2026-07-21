import { FaListUl, FaProjectDiagram, FaMagic } from "react-icons/fa";
import Reveal from "../effects/Reveal";
import TiltCard from "../effects/TiltCard";

export default function PipelineSection() {
  const steps = [
    {
      num: "01",
      title: "Hard filters",
      desc: "Deterministic checks against indexed fields — age, state, income bracket. Fast, cheap, no AI required.",
      tag: "MongoDB indexed query",
      icon: <FaListUl className="h-6 w-6" />,
      iconBg: "bg-[#E6F8F6] text-[#0D9488]",
    },
    {
      num: "02",
      title: "Semantic retrieval",
      desc: "Free text like \"I am a student and my family income is low\" becomes a vector, matched via $vectorSearch against eligible schemes.",
      tag: "Atlas Vector Search · cosine similarity",
      icon: <FaProjectDiagram className="h-5 w-5" />,
      iconBg: "bg-[#FEF3C7] text-[#D97706]",
    },
    {
      num: "03",
      title: "Grounded explanation",
      desc: "The LLM writes \"why you match\" using only retrieved scheme data — user text is sandboxed, never treated as instruction.",
      tag: "Prompt-injection safe",
      icon: <FaMagic className="h-5 w-5" />,
      iconBg: "bg-[#0F172A] text-white",
    },
  ];

  return (
    <section id="pipeline" className="pt-20 pb-16 relative font-sans scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Content */}
        <Reveal direction="down">
          <div className="flex flex-col items-center text-center space-y-4 mb-16 relative">
            <span className="text-xs font-bold uppercase tracking-widest text-[#14B8A6]">HOW SETU AI DECIDES</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#0F172A] leading-[1.15]">
              Three deterministic steps.<br />
              <span className="text-[#0D9488] italic font-medium highlight-underline">Zero invented eligibility.</span>
            </h2>
            
            

            <p className="max-w-3xl text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
              Retrieval-Augmented Generation means we look up real scheme data first — only then does AI explain it in plain language. The model explains. It never invents.
            </p>
          </div>
        </Reveal>

        {/* Cards Grid */}
        <div className="relative">
          {/* Background horizontal line */}
          <div className="absolute top-24 left-0 w-full h-px bg-[#0F172A]/10 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, i) => (
              <div key={i} style={{ perspective: 1200 }} className="h-full">
                <Reveal index={i} direction="up">
                  <TiltCard>
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-xl border border-slate-100 h-full flex flex-col justify-between transition-shadow duration-300">
                      <div style={{ transform: "translateZ(30px)" }}>
                        <div className="flex items-start justify-between mb-8">
                          <span className="text-slate-400 font-mono text-sm font-semibold">{step.num}</span>
                          <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${step.iconBg}`}>
                            {step.icon}
                          </div>
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-[#0F172A] mb-3">
                          {step.title}
                        </h3>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                      <div className="mt-8" style={{ transform: "translateZ(40px)" }}>
                        <span className="inline-block bg-[#F8FAFC] text-slate-500 font-mono text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-md border border-slate-200">
                          {step.tag}
                        </span>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
