import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#0F172A]/10 bg-white/80 backdrop-blur-md pt-12 pb-8 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Footer Layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
          
          {/* Brand & Tagline */}
          <div className="space-y-2 text-center md:text-left">
            <Link to="/" className="inline-flex items-center gap-2.5 text-xl font-serif font-black tracking-tight text-[#0F172A]">
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
            <p className="text-xs font-medium text-slate-500 max-w-md">
              National Digital Welfare Discovery Platform • Bridging citizens to government schemes with Hybrid RAG & explainable AI.
            </p>
          </div>

          {/* Quick Navigation Routes */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-bold uppercase tracking-wider text-[#0F172A]/70">
            <Link to="/" className="hover:text-[#14B8A6] transition">Home</Link>
            <Link to="/profile" className="hover:text-[#14B8A6] transition">Profile Wizard</Link>
            <Link to="/simulator" className="hover:text-[#14B8A6] transition">Simulator</Link>
            <Link to="/consent" className="hover:text-[#14B8A6] transition">Data Privacy</Link>
          </div>

          {/* Social & Github Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Yashsaxena27/setu-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[#0F172A]/5 text-[#0F172A] hover:bg-[#14B8A6] hover:text-white transition duration-200"
              title="GitHub Repository"
            >
              <FaGithub className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[#0F172A]/5 text-[#0F172A] hover:bg-[#14B8A6] hover:text-white transition duration-200"
              title="LinkedIn Profile"
            >
              <FaLinkedin className="h-4 w-4" />
            </a>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
          <p>© 2026 Setu AI. All rights reserved.</p>
          
          <p className="flex items-center gap-1 text-[#0F172A]/70 font-bold">
            Made with <FaHeart className="text-[#EF4444] h-3.5 w-3.5 mx-0.5 animate-pulse" /> by{" "}
            <span className="text-[#14B8A6]">Yash Saxena</span> & <span className="text-[#14B8A6]">Sparsh</span>
          </p>
        </div>

      </div>
    </footer>
  );
}