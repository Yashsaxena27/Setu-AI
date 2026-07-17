import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  async function handleDelete() {
    const ok = window.confirm(
      "Are you sure you want to permanently delete your account?"
    );

    if (!ok) return;

    try {
      const response = await fetch("/api/account", { method: "DELETE" });

      if (!response.ok) throw new Error("Unable to delete account");

      logout();

      toast.success("Account Deleted");

      navigate("/");
    } catch {
      toast.error("Unable to delete account");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">

      <h1 className="text-3xl font-bold">
        Settings
      </h1>

      <div className="rounded-xl border p-4">

        <p>
          <strong>Name:</strong> {user?.name}
        </p>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>

      </div>

      <button
        onClick={logout}
        className="w-full rounded-xl bg-blue-600 p-3 text-white"
      >
        Logout
      </button>

      <button
        onClick={handleDelete}
        className="w-full rounded-xl bg-red-600 p-3 text-white"
      >
        Delete Account
      </button>

    </div>
  );
}