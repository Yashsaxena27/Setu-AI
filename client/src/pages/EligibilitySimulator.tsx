import { useEffect, useState } from "react";
import { simulateEligibility } from "../services/simulatorApi";
import { getProfile, type Profile } from "../services/profileApi";
import { FaPlay, FaUndo, FaBriefcase, FaGraduationCap, FaArrowDown, FaArrowUp, FaArrowLeft, FaTimesCircle, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BottomBar from "../components/layout/BottomBar";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import SectionHeader from "../components/ui/SectionHeader";
import EmptyState from "../components/ui/EmptyState";

export default function EligibilitySimulator() {
  const navigate = useNavigate();

  const [originalProfile, setOriginalProfile] = useState<Profile>({
    name: "",
    age: "",
    gender: "",
    state: "",
    district: "",
    occupation: "",
    income: "",
    education: "",
    disability: "",
    language: "",
    phone: "",
  });

  const [simulatedProfile, setSimulatedProfile] = useState<Profile>({
    name: "",
    age: "",
    gender: "",
    state: "",
    district: "",
    occupation: "",
    income: "",
    education: "",
    disability: "",
    language: "",
    phone: "",
  });

  const [results, setResults] = useState<any>({
    gained: [],
    lost: [],
    unchanged: [],
  });

  const [loading, setLoading] = useState(false);
  const [hasSimulated, setHasSimulated] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfile();
        setOriginalProfile(data);
        setSimulatedProfile(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadProfile();
  }, []);

  async function runSimulation() {
    try {
      setLoading(true);
      const data = await simulateEligibility(originalProfile, simulatedProfile);
      setResults(data);
      setHasSimulated(true);

      const count = Number(localStorage.getItem("simulationCount") ?? "0");
      localStorage.setItem("simulationCount", String(count + 1));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const resetSimulation = () => {
    setSimulatedProfile(originalProfile);
    setResults({
      gained: [],
      lost: [],
      unchanged: [],
    });
    setHasSimulated(false);
  };

  const handleLifeEvent = (updates: Partial<Profile>) => {
    setSimulatedProfile((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  return (
    <main className="min-h-screen bg-[#FAF8F3] font-sans pb-16 md:pb-0">
      <Header />

      <PageContainer>
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header Action */}
          <div className="flex justify-between items-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft className="mr-2 h-3.5 w-3.5" /> Back
            </Button>
            <Badge variant="accent">Welfare Sandbox Environment</Badge>
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Eligibility Simulator
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Tweak income, age, or occupation details to test how life events change your matched welfare options.
            </p>
          </div>

          {/* Split Container */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            
            {/* Left: Input Sandbox Controls */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="border border-[#0F172A]/5 p-6 shadow-premium space-y-6">
                <SectionHeader title="Simulation Controls" />

                <div className="space-y-4">
                  <Input
                    label="Hypothetical Income (₹)"
                    type="number"
                    value={simulatedProfile.income}
                    onChange={(e) =>
                      setSimulatedProfile({
                        ...simulatedProfile,
                        income: e.target.value,
                      })
                    }
                  />

                  <Input
                    label="Hypothetical Age"
                    type="number"
                    value={simulatedProfile.age}
                    onChange={(e) =>
                      setSimulatedProfile({
                        ...simulatedProfile,
                        age: e.target.value,
                      })
                    }
                  />

                  <Select
                    label="Hypothetical Occupation"
                    value={simulatedProfile.occupation}
                    onChange={(e) =>
                      setSimulatedProfile({
                        ...simulatedProfile,
                        occupation: e.target.value,
                      })
                    }
                  >
                    <option value="Student">Student</option>
                    <option value="Farmer">Farmer</option>
                    <option value="Self Employed">Self Employed</option>
                    <option value="Private Employee">Private Employee</option>
                    <option value="Government Employee">Government Employee</option>
                    <option value="Unemployed">Unemployed</option>
                  </Select>
                </div>

                {/* Life Events Quick Triggers */}
                <div className="space-y-3">
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    ⚡ Quick Life-Event Triggers
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleLifeEvent({ occupation: "Private Employee" })}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-[#0F172A]/5 bg-white text-xs font-semibold text-[#0F172A] hover:bg-[#0F172A]/5 hover:border-[#0F172A]/10 transition duration-150 cursor-pointer"
                    >
                      <FaBriefcase className="text-[#14B8A6]" /> Got Job
                    </button>

                    <button
                      onClick={() => handleLifeEvent({ occupation: "Graduate" })}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-[#0F172A]/5 bg-white text-xs font-semibold text-[#0F172A] hover:bg-[#0F172A]/5 hover:border-[#0F172A]/10 transition duration-150 cursor-pointer"
                    >
                      <FaGraduationCap className="text-[#14B8A6]" /> Graduate
                    </button>

                    <button
                      onClick={() => handleLifeEvent({ income: "50000" })}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-[#0F172A]/5 bg-white text-xs font-semibold text-[#0F172A] hover:bg-[#0F172A]/5 hover:border-[#0F172A]/10 transition duration-150 cursor-pointer"
                    >
                      <FaArrowDown className="text-[#EF4444]" /> Lower Income
                    </button>

                    <button
                      onClick={() => handleLifeEvent({ income: "500000" })}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-[#0F172A]/5 bg-white text-xs font-semibold text-[#0F172A] hover:bg-[#0F172A]/5 hover:border-[#0F172A]/10 transition duration-150 cursor-pointer"
                    >
                      <FaArrowUp className="text-[#22C55E]" /> Higher Income
                    </button>
                  </div>
                </div>

                {/* Submit / Reset Actions */}
                <div className="flex gap-3 border-t border-slate-100 pt-6">
                  <Button onClick={resetSimulation} variant="secondary" className="flex-1">
                    <FaUndo className="mr-1.5" /> Reset
                  </Button>
                  <Button onClick={runSimulation} loading={loading} className="flex-1">
                    <FaPlay className="mr-1.5" /> Simulate
                  </Button>
                </div>

              </Card>
            </div>

            {/* Right: Simulation Outputs comparison */}
            <div className="lg:col-span-7 space-y-6">
              
              {!hasSimulated ? (
                <EmptyState
                  title="Awaiting Simulation Inputs"
                  description="Adjust parameters on the left controls and click 'Simulate' to review results."
                  icon={<FaInfoCircle className="h-8 w-8" />}
                />
              ) : (
                <div className="space-y-6">
                  
                  {/* NEWLY ELIGIBLE */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-lg font-bold text-[#0F172A] flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#22C55E]" /> Newly Eligible
                      </span>
                      <Badge variant="success">+{results.gained?.length || 0} Schemes</Badge>
                    </div>

                    {results.gained?.length === 0 ? (
                      <p className="text-xs text-slate-400 font-semibold pl-4">No additional schemes qualified.</p>
                    ) : (
                      <div className="space-y-3 pl-4 border-l border-[#22C55E]/20">
                        {results.gained.map((scheme: any) => (
                          <Card key={scheme._id} className="border border-[#22C55E]/10 bg-[#22C55E]/5 p-4 rounded-xl">
                            <h4 className="font-serif text-sm font-bold text-[#0F172A]">{scheme.scheme_name}</h4>
                            <p className="text-xs text-slate-500 mt-1">{scheme.summary_text || "You qualify under new criteria parameters."}</p>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* LOST ELIGIBILITY */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-lg font-bold text-[#0F172A] flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#EF4444]" /> Lost Eligibility
                      </span>
                      <Badge variant="error">-{results.lost?.length || 0} Schemes</Badge>
                    </div>

                    {results.lost?.length === 0 ? (
                      <p className="text-xs text-slate-400 font-semibold pl-4">No qualified schemes lost.</p>
                    ) : (
                      <div className="space-y-3 pl-4 border-l border-[#EF4444]/20">
                        {results.lost.map((scheme: any) => (
                          <Card key={scheme._id} className="border border-[#EF4444]/10 bg-[#EF4444]/5 p-4 rounded-xl">
                            <h4 className="font-serif text-sm font-bold text-[#0F172A] flex items-center gap-2">
                              <FaTimesCircle className="text-[#EF4444]" /> {scheme.scheme_name}
                            </h4>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* STILL ELIGIBLE */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-lg font-bold text-[#0F172A] flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#14B8A6]" /> Unchanged Eligibility
                      </span>
                      <Badge variant="accent">={results.unchanged?.length || 0} Schemes</Badge>
                    </div>

                    {results.unchanged?.length === 0 ? (
                      <p className="text-xs text-slate-400 font-semibold pl-4">No matching schemes unchanged.</p>
                    ) : (
                      <div className="space-y-3 pl-4 border-l border-[#14B8A6]/20">
                        {results.unchanged.map((scheme: any) => (
                          <Card key={scheme._id} className="border border-[#0F172A]/5 bg-white p-4 rounded-xl">
                            <h4 className="font-serif text-sm font-bold text-[#0F172A]">{scheme.scheme_name}</h4>
                            <p className="text-xs text-slate-500 mt-1">{scheme.summary_text}</p>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      </PageContainer>

      <Footer />
      <BottomBar />
    </main>
  );
}