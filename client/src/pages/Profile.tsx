import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { saveProfile } from "../services/profileApi";
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
      //await saveProfile(formData);

      localStorage.setItem(
        "profile",
        JSON.stringify(formData)
      );

      const result = await getMatches(formData);

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
      <StepIndicator
        current={step}
        total={totalSteps}
      />

      <div className="mt-4">
        <ProgressBar
          current={step}
          total={totalSteps}
        />
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