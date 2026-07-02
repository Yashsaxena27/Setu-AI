export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-gray-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-gray-600 md:flex-row">
        <p>© 2026 Setu AI. All rights reserved.</p>

        <div className="flex gap-6">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">GitHub</a>
        </div>
      </div>
    </footer>
  );
}