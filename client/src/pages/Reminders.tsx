import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCalendarPlus, FaCheck, FaTrash, FaClock, FaCalendarAlt, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import {
  getReminders,
  createReminder,
  updateReminder,
  deleteReminder,
} from "../services/reminder";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BottomBar from "../components/layout/BottomBar";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Input from "../components/ui/Input";
import SectionHeader from "../components/ui/SectionHeader";
import EmptyState from "../components/ui/EmptyState";
import Reveal from "../components/effects/Reveal";

export default function Reminders() {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState<any[]>([]);
  const [schemeName, setSchemeName] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }

  async function markComplete(id: string) {
    try {
      await updateReminder(id, {
        status: "Completed",
      });
      toast.success("Marked as Completed");
      loadReminders();
    } catch {
      toast.error("Unable to update reminder");
    }
  }

  async function remove(id: string) {
    try {
      await deleteReminder(id);
      toast.success("Reminder Deleted");
      loadReminders();
    } catch {
      toast.error("Unable to delete reminder");
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF8F3] font-sans pb-16 md:pb-0">
      <Header />

      <PageContainer>
        <div className="max-w-2xl mx-auto space-y-8">
          
          {/* Back button */}
          <div className="flex justify-between items-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft className="mr-2 h-3.5 w-3.5" /> Back
            </Button>
            <Badge variant="accent">Welfare Milestones</Badge>
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Application Reminders
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Keep track of official scheme submission deadlines to ensure you don't miss out on eligible benefits.
            </p>
          </div>

          {/* Add Reminder Card */}
          <Reveal direction="up">
            <Card className="border border-[#0F172A]/5 p-6 shadow-premium space-y-4">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                ➕ Add Submission Deadline
              </span>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  placeholder="Scheme Name (e.g. PM-KISAN)"
                  value={schemeName}
                  onChange={(e) => setSchemeName(e.target.value)}
                />
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <Button
                onClick={handleAdd}
                loading={loading}
                className="w-full"
              >
                <FaCalendarPlus className="mr-2" /> Add Reminder
              </Button>
            </Card>
          </Reveal>

          {/* Reminders List */}
          <div className="space-y-4">
            <SectionHeader title="Your Deadlines" />
            
            {reminders.length === 0 ? (
              <EmptyState
                title="No Reminders Set"
                description="Deadlines will appear here after you input scheme submission dates above."
                icon={<FaCalendarAlt className="h-8 w-8" />}
              />
            ) : (
              <div className="space-y-3">
                {reminders.map((r) => {
                  const isCompleted = r.status === "Completed";
                  return (
                    <Card
                      key={r._id}
                      className="border border-[#0F172A]/5 py-4 px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white"
                    >
                      <div className="flex items-start gap-3">
                        <FaClock className={`mt-1 shrink-0 ${isCompleted ? "text-[#22C55E]" : "text-[#F59E0B]"}`} />
                        <div>
                          <h4 className="font-serif text-lg font-bold text-[#0F172A]">
                            {r.schemeName || "Scheme Application"}
                          </h4>
                          <p className="text-xs text-slate-400 font-semibold mt-0.5">
                            Deadline: {new Date(r.reminder_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 justify-end border-t border-slate-50 pt-3 sm:border-t-0 sm:pt-0">
                        <Badge variant={isCompleted ? "success" : "warning"}>
                          {r.status}
                        </Badge>
                        
                        {!isCompleted && (
                          <button
                            onClick={() => markComplete(r._id)}
                            className="p-2 rounded-lg bg-[#22C55E]/10 text-[#22C55E] hover:bg-[#22C55E]/20 transition duration-150 cursor-pointer"
                            title="Mark as Complete"
                          >
                            <FaCheck className="h-3.5 w-3.5" />
                          </button>
                        )}

                        <button
                          onClick={() => remove(r._id)}
                          className="p-2 rounded-lg bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444]/20 transition duration-150 cursor-pointer"
                          title="Delete Reminder"
                        >
                          <FaTrash className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </PageContainer>

      <Footer />
      <BottomBar />
    </main>
  );
}