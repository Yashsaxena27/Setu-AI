import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowRight, FaExchangeAlt, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BottomBar from "../components/layout/BottomBar";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";
import ReasoningOverlay from "../components/ui/ReasoningOverlay";
import { parseBenefitImpact } from "../utils/benefitParser";

interface Scheme {
  _id: string;
  scheme_name: string;
  category: string;
  score: number;
  summary: string;
  benefits?: string[];
  required_documents?: string[];
  eligibility_rules?: Record<string, any>;
  official_link?: string;
  level?: string;
  state_applicability?: string[];
}

function CircularProgress({ score, variant }: { score: number; variant: string }) {
  const radius = 18;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const timer = setTimeout(() => {
      const progressOffset = circumference - (score / 100) * circumference;
      setOffset(progressOffset);
    }, 200);
    return () => clearTimeout(timer);
  }, [score, circumference]);

  const getColorClass = () => {
    if (variant === "success") return "stroke-[#22C55E]";
    if (variant === "warning") return "stroke-[#F59E0B]";
    return "stroke-[#EF4444]";
  };

  return (
    <div className="relative h-12 w-12 flex items-center justify-center bg-white rounded-full shadow-soft border border-[#0F172A]/5">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="24"
          cy="24"
          r={radius}
          className="stroke-slate-100 fill-transparent"
          strokeWidth={strokeWidth}
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          className={`${getColorClass()} fill-transparent transition-all duration-1000 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[10px] font-extrabold text-[#0F172A]">{score}%</span>
    </div>
  );
}

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();

  const [matches] = useState<Scheme[]>(() => {
    if (location.state?.matches) {
      localStorage.setItem("latestMatches", JSON.stringify(location.state.matches));
      return location.state.matches;
    }
    const cached = localStorage.getItem("latestMatches");
    return cached ? JSON.parse(cached) : [];
  });
  
  const [selectedSchemes, setSelectedSchemes] = useState<Scheme[]>([]);
  const [showOverlay, setShowOverlay] = useState(() => {
    return localStorage.getItem("reasoningShown") !== "true";
  });
  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    const hasProfile = localStorage.getItem("profile");
    const hasMatches = localStorage.getItem("latestMatches");
    if (!hasProfile && !hasMatches && matches.length === 0) {
      toast.error("Please complete the Profile Wizard to view matches.");
      navigate("/profile", { replace: true });
    }
  }, [matches.length, navigate]);

  useEffect(() => {
    if (showOverlay) return;
    let start = 0;
    const end = matches.length;
    if (end === 0) return;
    const duration = 800; // 0.8s
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setAnimatedCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, Math.max(stepTime, 30));
    return () => clearInterval(timer);
  }, [matches.length, showOverlay]);

  const benefitSummary = parseBenefitImpact(matches);

  const getScoreVariant = (score: number) => {
    if (score >= 90) return "success";
    if (score >= 75) return "warning";
    return "error";
  };

  const handleCompareChange = (checked: boolean, scheme: Scheme) => {
    if (checked) {
      if (selectedSchemes.length < 2) {
        setSelectedSchemes([...selectedSchemes, scheme]);
      }
    } else {
      setSelectedSchemes(selectedSchemes.filter((s) => s._id !== scheme._id));
    }
  };

  if (showOverlay) {
    return (
      <ReasoningOverlay
        matchCount={matches.length}
        onFinished={() => {
          setShowOverlay(false);
          localStorage.setItem("reasoningShown", "true");
        }}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F3] font-sans pb-24 md:pb-0">
      <Header />

      <PageContainer>
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header Actions */}
          <div className="flex items-center justify-between">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate("/profile")}
            >
              <FaArrowLeft className="mr-2 h-3.5 w-3.5" /> Back to Profile
            </Button>
            <Badge variant="accent">AI Match Complete</Badge>
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Matched Schemes for You
            </h1>
            <p className="text-slate-500 text-sm font-bold flex items-center gap-1.5">
              <span className="text-[#14B8A6] font-extrabold text-lg">{animatedCount}</span>
              schemes identified based on your verified parameters.
            </p>
          </div>

          {/* Potential Welfare Benefits Summary */}
          {matches.length > 0 && (
            <Card className="border border-[#14B8A6]/10 p-6 bg-[#14B8A6]/5 shadow-soft flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D9488]">Potential Welfare Benefits</span>
                <div className="flex flex-wrap gap-1.5">
                  {benefitSummary.categories.map((cat, idx) => (
                    <Badge key={idx} variant="accent" size="sm">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
              {benefitSummary.maxMonetary > 0 && (
                <div className="text-left sm:text-right space-y-0.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Estimated Maximum Available Benefits</p>
                  <p className="text-2xl font-serif font-black text-[#0F172A]">
                    ₹{benefitSummary.maxMonetary.toLocaleString()}
                  </p>
                </div>
              )}
            </Card>
          )}

          {/* Matches List */}
          <div>
            {matches.length === 0 ? (
              <EmptyState
                title="No Eligible Schemes Found"
                description="Your current demographic parameters (age, income ceiling, state, or occupation) do not match any active scheme rules in our database. Try testing hypothetical profile changes in the Simulator or refining your profile details."
                action={
                  <div className="flex flex-wrap justify-center gap-3 mt-2">
                    <Button onClick={() => navigate("/profile")}>
                      Edit Profile Wizard
                    </Button>
                    <Button variant="secondary" onClick={() => navigate("/simulator")}>
                      Try Eligibility Simulator
                    </Button>
                  </div>
                }
              />
            ) : (
              <motion.div
                className="space-y-6"
                variants={{
                  animate: {
                    transition: {
                      staggerChildren: 0.08
                    }
                  }
                }}
                initial="initial"
                animate="animate"
              >
                {matches.map((scheme) => {
                  const isSelected = selectedSchemes.some((s) => s._id === scheme._id);
                  const isLimitReached = selectedSchemes.length >= 2;
                  const canSelect = isSelected || !isLimitReached;

                  return (
                    <motion.div
                      key={scheme._id}
                      variants={{
                        initial: { opacity: 0, y: 16 },
                        animate: { opacity: 1, y: 0 }
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <Card className="border border-[#0F172A]/5 p-6 hover:shadow-premium transition duration-200 flex flex-col justify-between space-y-6">
                        
                        {/* Top Row: Info & Match Circular Badge */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              {scheme.category}
                            </span>
                            <h2 className="font-serif text-xl font-bold text-[#0F172A] tracking-tight">
                              {scheme.scheme_name}
                            </h2>
                          </div>
                          <CircularProgress score={scheme.score} variant={getScoreVariant(scheme.score)} />
                        </div>

                        {/* AI explanation of Why You Match */}
                        <div className="bg-[#14B8A6]/5 rounded-xl border border-[#14B8A6]/10 p-4">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D9488] mb-1.5 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 bg-[#14B8A6] rounded-full inline-block" />
                            AI Analysis: Why you match
                          </h4>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            {scheme.summary || "You meet the basic qualification criteria for this scheme."}
                          </p>
                        </div>

                        {/* Verified Parameters Checklist */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-bold text-slate-400 border-t border-slate-100/50 pt-2">
                          <span className="flex items-center gap-1"><span className="text-[#22C55E]">✓</span> Age Qualified</span>
                          <span className="flex items-center gap-1"><span className="text-[#22C55E]">✓</span> State Applicability</span>
                          {scheme.eligibility_rules?.income_limit && <span className="flex items-center gap-1"><span className="text-[#22C55E]">✓</span> Income Criteria Met</span>}
                          {scheme.eligibility_rules?.occupation && scheme.eligibility_rules.occupation !== "Any" && (
                            <span className="flex items-center gap-1"><span className="text-[#22C55E]">✓</span> Occupation Eligible</span>
                          )}
                        </div>

                        {/* Compare Option Row */}
                        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                          <label className={`flex items-center gap-2 text-xs font-semibold text-slate-500 cursor-pointer ${
                            !canSelect ? "opacity-30 cursor-not-allowed" : ""
                          }`}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              disabled={!canSelect}
                              onChange={(e) => handleCompareChange(e.target.checked, scheme)}
                              className="h-4 w-4 rounded-sm border-[#0F172A]/10 text-[#14B8A6] focus:ring-[#14B8A6]/20 cursor-pointer"
                            />
                            Compare Scheme
                          </label>

                          {/* Action buttons */}
                          <div className="flex items-center gap-3">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() =>
                                navigate(`/scheme/${scheme._id}`, {
                                  state: scheme,
                                })
                              }
                            >
                              Details
                            </Button>
                            <Button
                              size="sm"
                              onClick={() =>
                                navigate(`/draft/${scheme._id}`, {
                                  state: scheme,
                                })
                              }
                            >
                              Prep Draft <FaArrowRight className="ml-1.5 h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* Compare Sticky Action Bar */}
          {selectedSchemes.length === 2 && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#0F172A] text-white px-6 py-4 rounded-2xl flex items-center gap-6 shadow-premium border border-white/10 animate-fade-in-up">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <FaExchangeAlt className="text-[#14B8A6] h-4 w-4" />
                Comparison Ready
              </span>
              <Button
                onClick={() => {
                  localStorage.setItem("comparedSchemes", JSON.stringify(selectedSchemes));
                  navigate("/compare", {
                    state: {
                      scheme1: selectedSchemes[0],
                      scheme2: selectedSchemes[1],
                    },
                  });
                }}
                size="sm"
                variant="accent"
              >
                Compare Selected
              </Button>
            </div>
          )}

        </div>
      </PageContainer>

      <Footer />
      <BottomBar />
    </main>
  );
}