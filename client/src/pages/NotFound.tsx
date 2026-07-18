import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import Button from "../components/ui/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F3] px-4 font-sans text-center">
      <div className="space-y-6 max-w-sm">
        <FaExclamationTriangle className="mx-auto text-[#F59E0B] h-12 w-12" />
        <div className="space-y-2">
          <h1 className="font-serif text-4xl font-extrabold text-[#0F172A]">
            Page Not Found
          </h1>
          <p className="text-slate-500 text-sm font-semibold">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <Button onClick={() => navigate("/")} className="w-full">
          Back to Safety
        </Button>
      </div>
    </div>
  );
}