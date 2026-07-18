export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#0F172A]/5 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold tracking-tight text-[#0F172A]">
              🏛️ Setu AI
            </span>
            <span className="text-xs text-slate-400 font-medium">
              • Secure Citizen Welfare Assistant
            </span>
          </div>

          <div className="flex gap-8 text-sm font-semibold text-slate-400">
            <a href="#" className="hover:text-[#0F172A] transition duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#0F172A] transition duration-200">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#0F172A] transition duration-200">
              Official Data Sources
            </a>
          </div>
        </div>

        <hr className="my-8 border-[#0F172A]/5" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs font-semibold text-slate-400 md:flex-row">
          <p>© 2026 Setu AI. Developed for National Digital Welfare Scheme Discovery.</p>
          <p className="text-center md:text-right">
            Disclaimer: Setu AI uses verification protocols to fetch authentic government criteria but citizens are advised to cross-reference with official portals.
          </p>
        </div>
      </div>
    </footer>
  );
}