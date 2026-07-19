import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaTimes, FaPaperPlane, FaShieldAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function WhatsAppWidget() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const userName = user?.name ? user.name.split(" ")[0] : "Citizen";
  const whatsappNumber = "14155238886"; // Twilio Sandbox / Official WhatsApp channel

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi Setu AI! I am ${userName}. I want to check my government scheme eligibility.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-80 sm:w-96 rounded-2xl bg-white border border-[#0F172A]/10 p-4 shadow-premium glass overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E]">
                  <FaWhatsapp className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
                    Setu AI WhatsApp Bot
                    <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
                  </h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Instant Citizen Assistant
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-[#0F172A] p-1 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                <FaTimes className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Content */}
            <div className="py-4 space-y-3">
              {/* Bot Message */}
              <div className="bg-[#FAF8F3] p-3.5 rounded-2xl rounded-tl-none border border-[#0F172A]/5 text-xs text-slate-600 font-medium leading-relaxed space-y-1">
                <p className="font-bold text-[#0F172A]">
                  Namaste {userName}! 🙏
                </p>
                <p>
                  Want scheme updates, match notifications, or application drafts sent directly to your WhatsApp?
                </p>
              </div>

              {/* Security note */}
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 px-1">
                <FaShieldAlt className="text-[#14B8A6]" />
                <span>Encrypted & Verified Government Service</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <button
                onClick={handleOpenWhatsApp}
                data-hover-target="true"
                className="w-full flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#16a34a] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition shadow-soft cursor-pointer"
              >
                <FaWhatsapp className="h-4 w-4" /> Connect via WhatsApp <FaPaperPlane className="h-3 w-3 ml-1" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        data-hover-target="true"
        className="flex items-center gap-2 bg-[#22C55E] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-premium hover:bg-[#16a34a] transition duration-200 cursor-pointer"
        aria-label="Open WhatsApp Assistant"
      >
        <FaWhatsapp className="h-6 w-6" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          WhatsApp Assistant
        </span>
      </motion.button>
    </div>
  );
}
