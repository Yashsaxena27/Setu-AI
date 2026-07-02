import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Consent() {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!agreed) return;
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg p-6">

        <button
          onClick={() => navigate("/")}
          className="mb-4 flex items-center gap-2 text-slate-600 hover:text-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>

        <h1 className="text-3xl font-bold text-slate-900">
          Your Privacy Matters
        </h1>

        <p className="mt-4 text-slate-600 leading-7 text-base">
          We only use your information to match you with government welfare
          schemes you may be eligible for.
        </p>

        <p className="mt-2 text-slate-600 leading-7 text-base">
          Your data will never be shared without your permission and you can
          delete it anytime.
        </p>

        <div className="mt-8 flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            aria-label="Consent Checkbox"
            className="mt-1 h-5 w-5"
          />
          <label
            htmlFor="consent"
            className="text-slate-700 leading-6 cursor-pointer"
          >
            I agree to let Setu AI securely use my information only for
            government scheme matching.
          </label>
        </div>

        <div className="mt-6 rounded-xl bg-blue-50 border border-blue-100 p-4">
          <h3 className="font-semibold text-blue-700">
            Your Data is Safe
          </h3>

          <p className="text-sm text-slate-600 mt-2">
            We only collect information required for government scheme matching.
            You can request deletion of your data at any time.
          </p>
        </div>

        <button
          onClick={handleContinue}
          disabled={!agreed}
          aria-label="Continue"
          className={`mt-8 w-full rounded-xl py-3 font-semibold transition
          ${
            agreed
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue to Profile →
        </button>

      </div>
    </div>
  );
}