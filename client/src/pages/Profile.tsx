import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  },

  women: {
    name: "Sunita Devi",
    age: "29",
    gender: "Female",
    state: "Uttar Pradesh",
    district: "Lucknow",
    occupation: "Homemaker",
    income: "120000",
    education: "High School",
    disability: "No",
    language: "Hindi",
    phone: "9876543212",
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
        });
      } catch {
        // Ignore if no saved profile exists
      }
    }

    loadProfile();
  }, []);

  const loadDemoProfile = (
    type: keyof typeof demoProfiles
  ) => {
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

  const handleSubmit = async () => {
    if (!validateStep(step, formData)) {
      alert("Please complete all required fields.");
      return;
    }

    setLoading(true);

    try {
    await saveProfile(formData);

const result = await getMatches(formData);

navigate("/results", {
  state: {
    matches: result.matches,
  },
});

      navigate("/results", {
        state: {
          matches: result.matches,
        },
      });
    } catch (error) {
      console.error(error);
      alert(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <StepIndicator current={step} total={totalSteps} />

      <div className="mt-6 mb-4">
        <p className="text-sm font-semibold mb-2">
          🚀 Quick Demo Profiles
        </p>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => loadDemoProfile("farmer")}
            className="px-3 py-2 rounded-lg bg-green-600 text-white"
          >
            👨‍🌾 Farmer
          </button>

          <button
            onClick={() => loadDemoProfile("student")}
            className="px-3 py-2 rounded-lg bg-blue-600 text-white"
          >
            👩 Student
          </button>

          <button
            onClick={() => loadDemoProfile("women")}
            className="px-3 py-2 rounded-lg bg-orange-600 text-white"
          >
            👩‍🦰 Women
          </button>

          <p className="mt-2 text-xs text-gray-500 italic">
            Use these pre-filled profiles to quickly explore scheme recommendations.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <ProgressBar current={step} total={totalSteps} />
      </div>

      <div className="mt-8">
        {step === 1 && (
          <BasicInfo
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {step === 2 && (
          <LocationInfo
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {step === 3 && (
          <OccupationInfo
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {step === 4 && (
          <EducationInfo
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {step === 5 && (
          <ContactInfo
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {step === 6 && (
          <Review formData={formData} />
        )}
      </div>

      <button
        onClick={
          step === totalSteps
            ? handleSubmit
            : nextStep
        }
        disabled={
          loading ||
          !validateStep(step, formData)
        }
        className={`mt-8 px-5 py-3 rounded-xl text-white transition ${
          loading ||
          !validateStep(step, formData)
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading
          ? "Finding Schemes..."
          : step === totalSteps
          ? "Submit"
          : "Next"}
      </button>
    </div>
  );
}