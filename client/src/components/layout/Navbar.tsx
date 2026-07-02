export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">
          Setu AI
        </h1>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <a href="#">Home</a>
          <a href="#">Schemes</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>

        {/* CTA */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
          Get Started
        </button>

      </div>
    </header>
  );
}