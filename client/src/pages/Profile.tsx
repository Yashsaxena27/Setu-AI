import { useState } from "react";

import ProgressBar from "../components/Profile/ProgressBar";
import StepIndicator from "../components/Profile/StepIndicator";
import BasicInfo from "../components/Profile/steps/BasicInfo";
import LocationInfo from "../components/Profile/steps/LocationInfo";
import OccupationInfo from "../components/Profile/steps/OccupationInfo";
import EducationInfo from "../components/Profile/steps/EducationInfo";
import ContactInfo from "../components/Profile/steps/ContactInfo.tsx";
import Review from "../components/Profile/steps/Review.tsx";
import { validateStep } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import { getMatches } from "../services/match";

export default function Profile() {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);

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

  try {
    localStorage.setItem("profile", JSON.stringify(formData));

    const result = await getMatches(formData);

    navigate("/results", {
      state: {
        matches: result.matches,
      },
    });
  } catch (error) {
    console.error(error);
    alert("Failed to fetch matching schemes.");
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
  onClick={step === totalSteps ? handleSubmit : nextStep}
  disabled={!validateStep(step, formData)}
  className={`px-5 py-3 rounded-xl text-white ${
    validateStep(step, formData)
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-gray-400 cursor-not-allowed"
  }`}
>
  {step === totalSteps ? "Submit" : "Next"}
</button>

    </div>
  );
}