import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getExplanation } from "../services/explain";
import { FaArrowLeft, FaCheckCircle, FaInfoCircle, FaFileContract } from "react-icons/fa";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BottomBar from "../components/layout/BottomBar";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Tabs from "../components/ui/Tabs";
import SectionHeader from "../components/ui/SectionHeader";
import Skeleton from "../components/ui/Skeleton";

export default function SchemeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [scheme] = useState<any>(() => {
    if (location.state) return location.state;
    const latest = JSON.parse(localStorage.getItem("latestMatches") || "[]");
    return latest.find((m: any) => m._id === id) || null;
  });

  useEffect(() => {
    if (!scheme) {
      toast.error("Scheme details not found. Returning to matches.");
      navigate("/results", { replace: true });
    }
  }, [scheme, navigate]);

  const [activeTab, setActiveTab] = useState("overview");
  const [reasons, setReasons] = useState<string[]>([]);
  const [loadingReason, setLoadingReason] = useState(true);

  useEffect(() => {
    if (!scheme) return;

    const profile = JSON.parse(
      localStorage.getItem("profile") || "{}"
    );

    async function loadExplanation() {
      try {
        const result = await getExplanation(
          scheme._id,
          profile
        );

        const explanation = result.explanation ?? "";

        const parsedReasons = explanation
          .split("\n")
          .filter((line: string) => {
            const trimmed = line.trim();
            return trimmed.startsWith("-") || trimmed.startsWith("•");
          })
          .map((line: string) =>
            line.replace(/^[-•]\s*/, "").trim()
          );

        setReasons(parsedReasons);
        setLoadingReason(false);
      } catch (err) {
        console.error(err);
        setLoadingReason(false);
        setReasons([
          "AI explanation is temporarily unavailable.",
        ]);
      }
    }

    loadExplanation();
  }, [scheme]);

  if (!scheme) {
    return (
      <PageContainer>
        <div className="max-w-2xl mx-auto py-12 text-center">
          <FaInfoCircle className="mx-auto text-slate-400 h-10 w-10 mb-4" />
          <h2 className="font-serif text-2xl font-bold text-[#0F172A]">Scheme Not Found</h2>
          <Button className="mt-6" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </PageContainer>
    );
  }

  const detailTabs = [
    { id: "overview", label: "Overview" },
    { id: "eligibility", label: "Eligibility Criteria" },
    { id: "benefits", label: "Scheme Benefits" },
    { id: "documents", label: "Required Documents" },
    { id: "explanation", label: "Verified AI Match" },
  ];

  return (
    <main className="min-h-screen bg-[#FAF8F3] font-sans pb-16 md:pb-0">
      <Header />

      <PageContainer>
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Back Action */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="mr-2 h-3.5 w-3.5" /> Go Back
          </Button>

          {/* Scheme Main Info Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="accent">{scheme.category || "Welfare"}</Badge>
              {scheme.level && <Badge variant="info">{scheme.level}</Badge>}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
              {scheme.scheme_name}
            </h1>
            <div className="flex items-center gap-4 bg-white px-5 py-3.5 rounded-2xl border border-[#0F172A]/5 shadow-soft w-fit">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                AI Match Score
              </span>
              <span className="text-2xl font-serif font-black text-[#22C55E]">
                {scheme.score}%
              </span>
            </div>
          </div>

          {/* Tabs Selector */}
          <Tabs
            tabs={detailTabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {/* Tab Content Cards */}
          <Card className="border border-[#0F172A]/5 p-8 shadow-premium min-h-[250px]">
            
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <SectionHeader title="Scheme Summary" />
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {scheme.summary || "This scheme represents a national social welfare program."}
                </p>
                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      State applicability
                    </span>
                    <p className="text-sm font-semibold text-[#0F172A] mt-0.5">
                      {scheme.state_applicability?.join(", ") || "All States"}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Welfare Category
                    </span>
                    <p className="text-sm font-semibold text-[#0F172A] mt-0.5">
                      {scheme.category || "Social Development"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ELIGIBILITY TAB */}
            {activeTab === "eligibility" && (
              <div className="space-y-6">
                <SectionHeader title="Eligibility parameters" />
                <ul className="space-y-3">
                  {scheme.eligibility_rules &&
                    Object.entries(scheme.eligibility_rules).map(([key, value]) => {
                      if (value === null || value === undefined) return null;
                      const label = key
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase());

                      return (
                        <li
                          key={key}
                          className="flex justify-between items-center border-b border-slate-100 pb-2 last:border-b-0 last:pb-0"
                        >
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            {label}
                          </span>
                          <span className="text-sm font-semibold text-[#0F172A]">
                            {Array.isArray(value) ? value.join(", ") : String(value)}
                          </span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}

            {/* BENEFITS TAB */}
            {activeTab === "benefits" && (
              <div className="space-y-6">
                <SectionHeader title="Direct Benefits" />
                {scheme.benefits && scheme.benefits.length > 0 ? (
                  <ul className="space-y-3">
                    {scheme.benefits.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                        <FaCheckCircle className="text-[#22C55E] shrink-0 mt-0.5 h-4 w-4" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-400 font-medium">No benefit records listed.</p>
                )}
              </div>
            )}

            {/* DOCUMENTS TAB */}
            {activeTab === "documents" && (
              <div className="space-y-6">
                <SectionHeader title="Required Documentation Checklist" />
                {scheme.required_documents && scheme.required_documents.length > 0 ? (
                  <ul className="space-y-3">
                    {scheme.required_documents.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                        <FaFileContract className="text-[#14B8A6] shrink-0 mt-0.5 h-4 w-4" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-400 font-medium">No documents required.</p>
                )}
              </div>
            )}

            {/* AI EXPLANATION TAB */}
            {activeTab === "explanation" && (
              <div className="space-y-6">
                <SectionHeader title="RAG Verification Rationale" />
                {loadingReason ? (
                  <div className="space-y-3">
                    <Skeleton variant="text" className="w-4/5" />
                    <Skeleton variant="text" className="w-full" />
                    <Skeleton variant="text" className="w-5/6" />
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {reasons.map((reason, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                        <span className="text-[#22C55E] shrink-0">✔</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

          </Card>

          {/* Visit Portal Action */}
          {scheme.official_link && (
            <div className="flex justify-center">
              <a
                href={scheme.official_link}
                target="_blank"
                rel="noreferrer"
                className="w-full"
              >
                <Button className="w-full">
                  Visit Official Government Application Portal
                </Button>
              </a>
            </div>
          )}

        </div>
      </PageContainer>

      <Footer />
      <BottomBar />
    </main>
  );
}