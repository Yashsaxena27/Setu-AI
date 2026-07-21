import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt, FaArrowLeft, FaCheck } from "react-icons/fa";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

export default function Consent() {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!agreed) return;
    localStorage.setItem("userConsent", "true");
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F3] px-4 font-sans">
      <div className="w-full max-w-md space-y-8">
        
        {/* Back navigation */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#0F172A] transition duration-150 cursor-pointer"
        >
          <FaArrowLeft /> Back to Home
        </button>

        <Card className="border border-[#0F172A]/5 p-8 shadow-premium space-y-6">
          
          {/* Header */}
          <div className="space-y-2">
            <Badge variant="accent">Security Verification</Badge>
            <h1 className="font-serif text-3xl font-extrabold tracking-tight text-[#0F172A]">
              Your Privacy Matters
            </h1>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              We securely parse your profile credentials solely to match you with eligible government welfare benefits.
            </p>
          </div>

          {/* Consent Guidelines */}
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-xs font-semibold text-slate-500 leading-normal">
              <span className="h-5 w-5 rounded-full bg-[#14B8A6]/10 text-[#14B8A6] flex items-center justify-center shrink-0">
                <FaCheck className="h-2.5 w-2.5" />
              </span>
              <p>We only request parameters mandated by central or state qualification criteria.</p>
            </div>
            <div className="flex items-start gap-3 text-xs font-semibold text-slate-500 leading-normal">
              <span className="h-5 w-5 rounded-full bg-[#14B8A6]/10 text-[#14B8A6] flex items-center justify-center shrink-0">
                <FaCheck className="h-2.5 w-2.5" />
              </span>
              <p>Your details are never sold, rented, or distributed to third-party providers.</p>
            </div>
          </div>

          {/* Security alert box */}
          <div className="rounded-xl bg-[#14B8A6]/5 border border-[#14B8A6]/10 p-4 flex gap-3">
            <FaShieldAlt className="text-[#14B8A6] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D9488]">
                Citizen Consent Guarantee
              </h4>
              <p className="text-[10px] text-slate-500 font-semibold leading-normal">
                You maintain complete control. Profile settings permit permanent account or match history deletion at any point.
              </p>
            </div>
          </div>

          {/* Checkbox input container */}
          <div className="flex items-start gap-3 pt-2">
            <input
              id="consent"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              aria-label="Consent Checkbox"
              className="mt-0.5 h-4 w-4 rounded-sm border-[#0F172A]/10 text-[#14B8A6] focus:ring-[#14B8A6]/20 cursor-pointer"
            />
            <label
              htmlFor="consent"
              className="text-xs font-bold text-slate-600 leading-normal cursor-pointer select-none"
            >
              I authorize Setu AI to evaluate my profile information against government eligibility rules.
            </label>
          </div>

          {/* Continue button */}
          <Button
            onClick={handleContinue}
            disabled={!agreed}
            className="w-full mt-2"
          >
            Continue to Profile Wizard
          </Button>

        </Card>
      </div>
    </div>
  );
}