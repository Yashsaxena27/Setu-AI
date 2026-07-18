import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowRight, FaExchangeAlt, FaArrowLeft } from "react-icons/fa";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BottomBar from "../components/layout/BottomBar";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";

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

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();

  const matches: Scheme[] = location.state?.matches || [];
  const [selectedSchemes, setSelectedSchemes] = useState<Scheme[]>([]);

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
            <p className="text-slate-500 text-sm font-medium">
              Based on your verified parameters, these are your matching benefits.
            </p>
          </div>

          {/* Matches List */}
          <div className="space-y-6">
            {matches.length === 0 ? (
              <EmptyState
                title="No Scheme Matches Found"
                description="We couldn't find matches. Try adjusting your parameters in the Profile Wizard."
                action={
                  <Button onClick={() => navigate("/profile")}>
                    Edit Profile
                  </Button>
                }
              />
            ) : (
              matches.map((scheme) => {
                const isSelected = selectedSchemes.some((s) => s._id === scheme._id);
                const isLimitReached = selectedSchemes.length >= 2;
                const canSelect = isSelected || !isLimitReached;

                return (
                  <Card
                    key={scheme._id}
                    className="border border-[#0F172A]/5 p-6 hover:shadow-premium transition-shadow flex flex-col justify-between space-y-6"
                  >
                    
                    {/* Top Row: Info & Match Badge */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {scheme.category}
                        </span>
                        <h2 className="font-serif text-xl font-bold text-[#0F172A] tracking-tight">
                          {scheme.scheme_name}
                        </h2>
                      </div>
                      <Badge variant={getScoreVariant(scheme.score)}>
                        {scheme.score}% Match
                      </Badge>
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
                );
              })
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
                onClick={() =>
                  navigate("/compare", {
                    state: {
                      scheme1: selectedSchemes[0],
                      scheme2: selectedSchemes[1],
                    },
                  })
                }
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