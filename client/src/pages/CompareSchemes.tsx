import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaArrowLeft, FaCheck, FaLock } from "react-icons/fa";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BottomBar from "../components/layout/BottomBar";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Reveal from "../components/effects/Reveal";

export default function CompareSchemes() {
  const navigate = useNavigate();
  const location = useLocation();

  const [scheme1] = useState<any>(() => {
    if (location.state?.scheme1) return location.state.scheme1;
    const stored = JSON.parse(localStorage.getItem("comparedSchemes") || "[]");
    return stored[0] || null;
  });

  const [scheme2] = useState<any>(() => {
    if (location.state?.scheme2) return location.state.scheme2;
    const stored = JSON.parse(localStorage.getItem("comparedSchemes") || "[]");
    return stored[1] || null;
  });

  useEffect(() => {
    if (!scheme1 || !scheme2) {
      toast.error("Compare selection lost. Please re-select schemes to compare.");
      navigate("/results", { replace: true });
    }
  }, [scheme1, scheme2, navigate]);

  if (!scheme1 || !scheme2) {
    return (
      <PageContainer>
        <div className="max-w-2xl mx-auto py-12 text-center space-y-4">
          <FaLock className="mx-auto text-slate-300 h-10 w-10 mb-2" />
          <h2 className="font-serif text-2xl font-bold text-[#0F172A]">Compare Schemes</h2>
          <p className="text-slate-500 text-sm font-semibold">Select two schemes from the results screen to review comparisons.</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Go Back
          </Button>
        </div>
      </PageContainer>
    );
  }

  function renderList(items: string[], variant: "teal" | "blue") {
    if (!items?.length) return <p className="text-xs text-slate-400 font-medium">—</p>;
    const iconColor = variant === "teal" ? "text-[#14B8A6]" : "text-blue-500";

    return (
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-600 leading-normal">
            <FaCheck className={`${iconColor} shrink-0 mt-0.5`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F3] font-sans pb-16 md:pb-0">
      <Header />

      <PageContainer>
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Back button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="mr-2 h-3.5 w-3.5" /> Back
          </Button>

          <div className="space-y-2">
            <h1 className="font-serif text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Compare Schemes
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Side-by-side analysis of qualification requirements, benefits, and required paperwork.
            </p>
          </div>

          {/* Side-by-side grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Scheme 1 Card */}
            <Reveal index={0} direction="up" className="h-full">
              <Card className="h-full border border-[#0F172A]/5 p-6 flex flex-col justify-between space-y-8 bg-white hover:border-[#14B8A6]/20 transition-all duration-200">
                <div className="space-y-6">
                  
                  {/* Header sticky-ready title */}
                  <div className="space-y-2">
                    <Badge variant="accent">{scheme1.category}</Badge>
                    <h2 className="font-serif text-2xl font-bold text-[#0F172A] tracking-tight line-clamp-2 min-h-[56px]">
                      {scheme1.scheme_name}
                    </h2>
                    <p className="text-xs text-[#22C55E] font-bold">
                      {scheme1.score}% Eligibility Match
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Scheme Benefits
                    </span>
                    {renderList(scheme1.benefits, "teal")}
                  </div>

                  {/* Required Documents */}
                  <div className="space-y-3">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Required Documents
                    </span>
                    {renderList(scheme1.required_documents, "teal")}
                  </div>

                  {/* Specific eligibility parameters */}
                  <div className="space-y-3 border-t border-slate-100 pt-6">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Eligibility Parameters
                    </span>
                    <div className="space-y-2">
                      {Object.entries(scheme1.eligibility_rules || {}).map(([key, value]) => {
                        const label = key
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (c) => c.toUpperCase());
                        return (
                          <div key={key} className="flex justify-between items-center text-xs">
                            <span className="text-slate-400 font-semibold">{label}</span>
                            <span className="font-bold text-[#0F172A] text-right ml-2 max-w-[60%] truncate">
                              {Array.isArray(value) ? value.join(", ") : String(value)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {scheme1.official_link && (
                  <a
                    href={scheme1.official_link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full pt-4"
                  >
                    <Button className="w-full" size="sm">
                      Apply Official Portal
                    </Button>
                  </a>
                )}
              </Card>
            </Reveal>

            {/* Scheme 2 Card */}
            <Reveal index={1} direction="up" className="h-full">
              <Card className="h-full border border-[#0F172A]/5 p-6 flex flex-col justify-between space-y-8 bg-white hover:border-[#14B8A6]/20 transition-all duration-200">
                <div className="space-y-6">
                  
                  {/* Header sticky-ready title */}
                  <div className="space-y-2">
                    <Badge variant="info">{scheme2.category}</Badge>
                    <h2 className="font-serif text-2xl font-bold text-[#0F172A] tracking-tight line-clamp-2 min-h-[56px]">
                      {scheme2.scheme_name}
                    </h2>
                    <p className="text-xs text-[#22C55E] font-bold">
                      {scheme2.score}% Eligibility Match
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Scheme Benefits
                    </span>
                    {renderList(scheme2.benefits, "blue")}
                  </div>

                  {/* Required Documents */}
                  <div className="space-y-3">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Required Documents
                    </span>
                    {renderList(scheme2.required_documents, "blue")}
                  </div>

                  {/* Specific eligibility parameters */}
                  <div className="space-y-3 border-t border-slate-100 pt-6">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Eligibility Parameters
                    </span>
                    <div className="space-y-2">
                      {Object.entries(scheme2.eligibility_rules || {}).map(([key, value]) => {
                        const label = key
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (c) => c.toUpperCase());
                        return (
                          <div key={key} className="flex justify-between items-center text-xs">
                            <span className="text-slate-400 font-semibold">{label}</span>
                            <span className="font-bold text-[#0F172A] text-right ml-2 max-w-[60%] truncate">
                              {Array.isArray(value) ? value.join(", ") : String(value)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {scheme2.official_link && (
                  <a
                    href={scheme2.official_link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full pt-4"
                  >
                    <Button className="w-full" size="sm">
                      Apply Official Portal
                    </Button>
                  </a>
                )}
              </Card>
            </Reveal>

          </div>

        </div>
      </PageContainer>

      <Footer />
      <BottomBar />
    </main>
  );
}