import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getReminders,
  createReminder,
  updateReminder,
  deleteReminder,
} from "../services/reminder";

export default function Reminders() {
  const [reminders, setReminders] = useState<any[]>([]);
  const [schemeName, setSchemeName] = useState("");
  const [date, setDate] = useState("");

  async function loadReminders() {
    try {
      const data = await getReminders();
      setReminders(data as any[]);
    } catch {
      toast.error("Unable to load reminders");
    }
  }

  useEffect(() => {
    loadReminders();
  }, []);

  async function handleAdd() {
    if (!schemeName || !date) {
      toast.error("Fill all fields");
      return;
    }

    try {
      await createReminder({
        schemeName,
        reminder_date: date,
        status: "Upcoming",
      });

      toast.success("Reminder Added");

      setSchemeName("");
      setDate("");

      loadReminders();
    } catch {
      toast.error("Unable to add reminder");
    }
  }

  async function markComplete(id: string) {
    await updateReminder(id, {
      status: "Completed",
    });

    loadReminders();
  }

  async function remove(id: string) {
    await deleteReminder(id);

    toast.success("Reminder Deleted");

    loadReminders();
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        Reminders
      </h1>

      <div className="rounded-xl border p-4 space-y-3">
        <input
          className="w-full border rounded p-2"
          placeholder="Scheme Name"
          value={schemeName}
          onChange={(e) => setSchemeName(e.target.value)}
        />

        <input
          type="date"
          className="w-full border rounded p-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          onClick={handleAdd}
          className="w-full rounded-lg bg-blue-600 p-2 text-white"
        >
          Add Reminder
        </button>
      </div>

      <div className="space-y-4">
        {reminders.length === 0 && (
          <p>No reminders yet.</p>
        )}

        {reminders.map((r) => (
          <div
            key={r._id}
            className="rounded-xl border p-4"
          >
            <h2 className="font-semibold">
              {r.schemeName || "Scheme"}
            </h2>

            <p>
              Deadline:{" "}
              {new Date(r.reminder_date).toLocaleDateString()}
            </p>

            <p>Status: {r.status}</p>

            <div className="mt-3 flex gap-2">
              {r.status !== "Completed" && (
                <button
                  onClick={() => markComplete(r._id)}
                  className="rounded bg-green-600 px-3 py-1 text-white"
                >
                  Complete
                </button>
              )}

              <button
                onClick={() => remove(r._id)}
                className="rounded bg-red-600 px-3 py-1 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}