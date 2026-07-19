import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[#0F172A]/5 bg-white pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 pb-12">
          
          {/* Column 1: Brand & Bridge Motif */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 text-xl font-serif font-black tracking-tight text-[#0F172A]">
              <svg className="h-6 w-6" viewBox="0 0 32 32" fill="none">
                <circle cx="6" cy="22" r="3" fill="#14B8A6" />
                <circle cx="26" cy="22" r="3" fill="#F59E0B" />
                <path
                  d="M 6 22 C 11 10, 21 10, 26 22"
                  stroke="#14B8A6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <span>Setu AI</span>
            </Link>
            <p className="text-xs font-medium text-slate-500 leading-relaxed max-w-xs">
              National Digital Welfare Scheme Discovery Assistant. Bridging citizens directly to government benefits with explainable AI and vector search.
            </p>
          </div>

          {/* Column 2: Explore Routes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">Explore Portal</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-500">
              <li>
                <Link to="/" className="hover:text-[#14B8A6] transition">Home</Link>
              </li>
              <li>
                <Link to="/simulator" className="hover:text-[#14B8A6] transition">Eligibility Simulator</Link>
              </li>
              <li>
                <Link to="/consent" className="hover:text-[#14B8A6] transition">Profile Wizard</Link>
              </li>
              <li>
                <a href="#features" className="hover:text-[#14B8A6] transition">Feature Overview</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">Trust & Safety</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-500">
              <li>
                <Link to="/consent" className="hover:text-[#14B8A6] transition">Data Privacy & Consent</Link>
              </li>
              <li>
                <a href="#" className="hover:text-[#14B8A6] transition">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#14B8A6] transition">Official Repositories</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#14B8A6] transition">Security Architecture</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Verification */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">Government Sources</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Scheme parameters are checked directly against federal and state databases across India.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#14B8A6]/10 px-2.5 py-1 text-[10px] font-bold text-[#0D9488] border border-[#14B8A6]/20">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" /> 86 Schemes Verified
              </span>
            </div>
          </div>

        </div>

        <hr className="border-[#0F172A]/5" />

        {/* Bottom Disclaimer */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs font-semibold text-slate-400 md:flex-row">
          <p>© 2026 Setu AI. Developed for National Digital Welfare Discovery.</p>
          <p className="text-center md:text-right max-w-xl">
            Disclaimer: Setu AI uses verification protocols to fetch authentic government criteria but citizens are advised to cross-reference with official portals.
          </p>
        </div>

      </div>
    </footer>
  );
}