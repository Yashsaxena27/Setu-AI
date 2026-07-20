import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { saveProfile, getProfile } from "../services/profileApi";
import { getMatches } from "../services/match";

import ProgressBar from "../components/Profile/ProgressBar";
import StepIndicator from "../components/Profile/StepIndicator";
import BasicInfo from "../components/Profile/steps/BasicInfo";
import LocationInfo from "../components/Profile/steps/LocationInfo";
import OccupationInfo from "../components/Profile/steps/OccupationInfo";
import EducationInfo from "../components/Profile/steps/EducationInfo";
import ContactInfo from "../components/Profile/steps/ContactInfo";
import Review from "../components/Profile/steps/Review";

import { validateStep } from "../utils/validation";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BottomBar from "../components/layout/BottomBar";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

const demoProfiles = {
  farmer: {
    name: "Ramesh Kumar",
    age: "42",
    gender: "Male",
    state: "Uttar Pradesh",
    district: "Lucknow",
    occupation: "Farmer",
    income: "180000",
    education: "High School",
    disability: "No",
    language: "Hindi",
    phone: "9876543210",
    rawText: "I am a small farmer seeking agricultural subsidies, crop insurance, farming equipment support, and fertilizer benefits.",
  },
  student: {
    name: "Priya Sharma",
    age: "20",
    gender: "Female",
    state: "Delhi",
    district: "New Delhi",
    occupation: "Student",
    income: "250000",
    education: "Undergraduate",
    disability: "No",
    language: "English",
    phone: "9876543211",
    rawText: "I am a student looking for higher education scholarships, tuition assistance, and learning fellowships.",
  },
  women: {
    name: "Sunita Devi",
    age: "29",
    gender: "Female",
    state: "Uttar Pradesh",
    district: "Lucknow",
    occupation: "Woman",
    income: "120000",
    education: "High School",
    disability: "No",
    language: "Hindi",
    phone: "9876543212",
    rawText: "I am a woman seeking social welfare benefits, self-help group loans, and family safety schemes.",
  },
};

export default function Profile() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const totalSteps = 6;

  const [formData, setFormData] = useState({
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
    rawText: "",
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await getProfile();
        if (!profile) return;
        setFormData({
          name: profile.name || "",
          age: profile.age || "",
          gender: profile.gender || "",
          state: profile.state || "",
          district: profile.district || "",
          occupation: profile.occupation || "",
          income: profile.income || "",
          education: profile.education || "",
          disability: profile.disability || "",
          language: profile.language || "",
          phone: profile.phone || "",
          rawText: profile.rawText || "",
        });
      } catch {
        // Ignore if no saved profile exists
      }
    }
    loadProfile();
  }, []);

  const loadDemoProfile = (type: keyof typeof demoProfiles) => {
    setFormData(demoProfiles[type]);
    setStep(6);
  };

  const nextStep = () => {
    if (!validateStep(step, formData)) {
      alert("Please complete all required fields.");
      return;
    }
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(step, formData)) {
      alert("Please complete all required fields.");
      return;
    }

    setLoading(true);
    try {
      await saveProfile(formData);
      localStorage.setItem("profile", JSON.stringify(formData));
      const result = await getMatches(formData);
      localStorage.setItem("latestMatches", JSON.stringify(result.matches || []));
      localStorage.removeItem("reasoningShown");
      navigate("/results", {
        state: {
          matches: result.matches,
        },
      });
    } catch (error) {
      console.error(error);
      alert("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F3] font-sans pb-16 md:pb-0">
      <Header />

      <PageContainer>
        <div className="max-w-xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="space-y-2 text-center">
            <Badge variant="accent">Welfare Eligibility Setup</Badge>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
              Citizen Profile Wizard
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Provide your details to match with schemes you qualify for.
            </p>
          </div>

          {/* Quick Demo Selector */}
          <Card className="border border-[#0F172A]/5 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              🚀 Try a Demo Profile template
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => loadDemoProfile("farmer")}
                className="px-3 py-2.5 rounded-xl border border-[#22C55E]/10 bg-[#22C55E]/5 text-xs font-semibold text-[#22C55E] hover:bg-[#22C55E]/10 transition duration-150 cursor-pointer"
              >
                👨‍🌾 Farmer
              </button>
              <button
                onClick={() => loadDemoProfile("student")}
                className="px-3 py-2.5 rounded-xl border border-[#14B8A6]/10 bg-[#14B8A6]/5 text-xs font-semibold text-[#14B8A6] hover:bg-[#14B8A6]/10 transition duration-150 cursor-pointer"
              >
                👩 Student
              </button>
              <button
                onClick={() => loadDemoProfile("women")}
                className="px-3 py-2.5 rounded-xl border border-[#F59E0B]/10 bg-[#F59E0B]/5 text-xs font-semibold text-[#D97706] hover:bg-[#F59E0B]/10 transition duration-150 cursor-pointer"
              >
                👩‍🦰 Women
              </button>
            </div>
            <p className="mt-2.5 text-[10px] text-slate-400 font-semibold leading-normal">
              Clicking a template automatically fills all credentials and jumps directly to the Review screen.
            </p>
          </Card>

          {/* Form Wizard Wrapper */}
          <Card className="border border-[#0F172A]/5 p-8 shadow-premium space-y-6">
            <div>
              <StepIndicator current={step} total={totalSteps} />
              <div className="mt-4">
                <ProgressBar current={step} total={totalSteps} />
              </div>
            </div>

            <div className="py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {step === 1 && (
                    <BasicInfo formData={formData} setFormData={setFormData} />
                  )}
                  {step === 2 && (
                    <LocationInfo formData={formData} setFormData={setFormData} />
                  )}
                  {step === 3 && (
                    <OccupationInfo formData={formData} setFormData={setFormData} />
                  )}
                  {step === 4 && (
                    <EducationInfo formData={formData} setFormData={setFormData} />
                  )}
                  {step === 5 && (
                    <ContactInfo formData={formData} setFormData={setFormData} />
                  )}
                  {step === 6 && (
                    <Review formData={formData} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-between gap-4 border-t border-slate-100 pt-6">
              {step > 1 ? (
                <Button
                  onClick={prevStep}
                  variant="secondary"
                  className="flex-1"
                >
                  Back
                </Button>
              ) : (
                <div className="flex-1" />
              )}

              <Button
                onClick={step === totalSteps ? handleSubmit : nextStep}
                disabled={loading || !validateStep(step, formData)}
                className="flex-1"
                loading={loading && step === totalSteps}
              >
                {step === totalSteps ? "Find Schemes" : "Continue"}
              </Button>
            </div>
          </Card>

        </div>
      </PageContainer>

      <Footer />
      <BottomBar />
    </main>
  );
}