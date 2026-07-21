import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function HeroDashboard3D() {
  const navigate = useNavigate();
  
  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Data
  const [profile, setProfile] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      try { setProfile(JSON.parse(savedProfile)); } catch {}
    }
    const savedMatches = localStorage.getItem("latestMatches");
    if (savedMatches) {
      try { setMatches(JSON.parse(savedMatches)); } catch {}
    }
  }, []);

  const isDemo = !profile;
  
  // Try to safely access the first name
  let firstName = "Citizen";
  if (profile && profile.name) {
    firstName = profile.name.split(" ")[0];
  }

  const displayProfile = profile || { name: "Guest User", occupation: "Unspecified" };
  const displayMatches = matches.length > 0 ? matches : [
    { scheme_name: "National Scholarship Portal", score: 95 },
    { scheme_name: "PM-Kisan Samman Nidhi", score: 88 }
  ];

  return (
    <div 
      className="relative z-10 w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full rounded-[2rem] glass border border-[#0F172A]/10 shadow-2xl p-6 lg:p-8 bg-white/70 backdrop-blur-2xl relative overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#14B8A6]/20 rounded-full blur-3xl pointer-events-none" />

        <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
          <div className="flex justify-between items-start mb-6 border-b border-[#0F172A]/5 pb-4">
            <div>
              <h3 className="font-serif text-2xl lg:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                {isDemo ? "Eligibility Preview" : `Welcome, ${firstName}`}
              </h3>
              <p className="text-sm font-medium text-slate-500 mt-1">
                {isDemo ? "Build a profile to see actual results." : "Your verified welfare summary."}
              </p>
            </div>
            {isDemo ? (
               <Badge variant="warning">Demo Mode</Badge>
            ) : (
               <Badge variant="success">Verified</Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#14B8A6]/5 border border-[#14B8A6]/15 rounded-2xl p-4 flex flex-col justify-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D9488]">Matched Schemes</span>
              <p className="font-serif text-3xl sm:text-4xl font-black text-[#0F172A] mt-1">{displayMatches.length}</p>
            </div>
            <div className="bg-white/50 border border-[#0F172A]/5 rounded-2xl p-4 flex flex-col justify-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Occupation</span>
              <p className="font-sans text-sm sm:text-base font-bold text-[#0F172A] mt-1 line-clamp-1">
                {displayProfile.occupation || "N/A"}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Top Matches</span>
            {displayMatches.slice(0, 2).map((match, i) => (
              <div key={i} className="flex justify-between items-center bg-white p-3.5 rounded-xl border border-[#0F172A]/5 shadow-sm transition hover:shadow-md cursor-default">
                <span className="text-sm font-bold text-[#0F172A] line-clamp-1 max-w-[70%]">
                  {match.scheme_name}
                </span>
                <span className="text-xs font-black tracking-wide text-[#22C55E] bg-[#22C55E]/10 px-2 py-1 rounded-md">
                  {Math.round(match.score || 0)}%
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex gap-3">
            <Button size="sm" className="w-full justify-center" onClick={() => navigate(isDemo ? "/profile" : "/dashboard")}>
              {isDemo ? "Build My Profile" : "Access Dashboard"}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
