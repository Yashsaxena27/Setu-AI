import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-blue-600"
        >
          🏛️ <span>Setu AI</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <a href="#features" className="hover:text-blue-600">
            Features
          </a>

          <a href="#about" className="hover:text-blue-600">
            About
          </a>

          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
}