import { Link } from "react-router-dom";

export default function BottomBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white md:hidden">
      <div className="flex justify-around py-3 text-sm">
        <Link to="/">🏠 Home</Link>

        <Link to="/results">🔍 Search</Link>

        <Link to="/results">📋 Schemes</Link>

        <Link to="/settings">⚙️ Settings</Link>
      </div>
    </nav>
  );
}