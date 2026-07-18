import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#0F172A]/5 bg-[#FAF8F3]/85 backdrop-blur-md shadow-soft">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-serif font-black tracking-tight text-[#0F172A]"
        >
          <span>🏛️ Setu AI</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm font-semibold text-[#0F172A]/70 hover:text-[#0F172A] transition duration-200">
            Home
          </Link>

          <a href="#features" className="text-sm font-semibold text-[#0F172A]/70 hover:text-[#0F172A] transition duration-200">
            Features
          </a>

          {user && (
            <>
              <Link to="/dashboard" className="text-sm font-semibold text-[#0F172A]/70 hover:text-[#0F172A] transition duration-200">
                Dashboard
              </Link>

              <Link to="/profile" className="text-sm font-semibold text-[#0F172A]/70 hover:text-[#0F172A] transition duration-200">
                Profile
              </Link>

              <Link to="/reminders" className="text-sm font-semibold text-[#0F172A]/70 hover:text-[#0F172A] transition duration-200">
                Reminders
              </Link>

              <Link to="/settings" className="text-sm font-semibold text-[#0F172A]/70 hover:text-[#0F172A] transition duration-200">
                Settings
              </Link>
            </>
          )}

          {!user ? (
            <Button
              onClick={() => navigate("/login")}
              size="sm"
            >
              Login
            </Button>
          ) : (
            <Button
              onClick={handleLogout}
              variant="danger"
              size="sm"
            >
              Logout
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}