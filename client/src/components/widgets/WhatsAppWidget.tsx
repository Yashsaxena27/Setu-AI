import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaTimes, FaPaperPlane, FaShieldAlt, FaCopy, FaExternalLinkAlt, FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import Modal from "../ui/Modal";
import toast from "react-hot-toast";

export default function WhatsAppWidget() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedNum, setCopiedNum] = useState(false);

  const userName = user?.name ? user.name.split(" ")[0] : "Citizen";
  const whatsappNumber = "+14155238886";
  const displayPhone = "+1 415 523 8886";
  const joinMessage = "join solve-motor";

  const handleOpenSetup = () => {
    setShowSetupModal(true);
  };

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(joinMessage);
      setCopiedCmd(true);
      toast.success("Command copied to clipboard!");
      setTimeout(() => setCopiedCmd(false), 2000);
    } catch {
      toast.error("Failed to copy command");
    }
  };

  const handleCopyNumber = async () => {
    try {
      await navigator.clipboard.writeText(whatsappNumber);
      setCopiedNum(true);
      toast.success("Number copied to clipboard!");
      setTimeout(() => setCopiedNum(false), 2000);
    } catch {
      toast.error("Failed to copy number");
    }
  };

  const handleLaunchWhatsApp = () => {
    const text = encodeURIComponent(joinMessage);
    window.open(`https://wa.me/14155238886?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleDirectChat = () => {
    const text = encodeURIComponent(
      `Hi Setu AI! I am ${userName}. I want to check my government scheme eligibility.`
    );
    window.open(`https://wa.me/14155238886?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
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

                {/* Sandbox Setup Banner */}
                <div className="bg-[#FDF0DA] border border-[#F59E0B]/20 p-3 rounded-xl flex items-start gap-2 text-xs text-[#B45309]">
                  <FaInfoCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">First-time Setup Required:</span>
                    <p className="text-[11px] font-medium leading-tight mt-0.5">
                      This demo uses Twilio WhatsApp Sandbox. Join the sandbox once to start chatting.
                    </p>
                  </div>
                </div>

                {/* Security Note */}
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 px-1">
                  <FaShieldAlt className="text-[#14B8A6]" />
                  <span>Encrypted & Verified Government Service</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <button
                  onClick={handleOpenSetup}
                  data-hover-target="true"
                  className="w-full flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#16a34a] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition shadow-soft cursor-pointer"
                >
                  <FaWhatsapp className="h-4 w-4" /> Connect WhatsApp Assistant <FaPaperPlane className="h-3 w-3 ml-1" />
                </button>
                <button
                  onClick={handleDirectChat}
                  className="w-full text-center text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-[#0F172A] py-1 transition"
                >
                  Already Connected? Open Chat ➔
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

      {/* Setup Guide Modal */}
      <Modal
        isOpen={showSetupModal}
        onClose={() => setShowSetupModal(false)}
        title="Connect WhatsApp Assistant"
      >
        <div className="space-y-5 font-sans">
          <p className="text-xs font-medium text-slate-600 leading-relaxed">
            This demo currently uses the <span className="font-bold text-[#0F172A]">Twilio WhatsApp Sandbox</span>. Before chatting with the AI assistant, complete this one-time setup.
          </p>

          <div className="space-y-4 bg-[#FAF8F3] border border-[#0F172A]/10 p-4 rounded-2xl">
            {/* Step 1 */}
            <div className="flex items-start gap-3">
              <span className="h-6 w-6 rounded-full bg-[#14B8A6] text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <h5 className="text-xs font-bold text-[#0F172A]">Open WhatsApp</h5>
                <p className="text-[11px] text-slate-500 font-medium">Launch WhatsApp on your mobile phone or web browser.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3 border-t border-slate-200/60 pt-3">
              <span className="h-6 w-6 rounded-full bg-[#14B8A6] text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                2
              </span>
              <div className="space-y-3 w-full">
                <div>
                  <h5 className="text-xs font-bold text-[#0F172A]">Send Sandbox Command</h5>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Send exact message <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[#0F172A] font-mono font-bold">{joinMessage}</code> to <span className="font-bold text-[#0F172A]">{displayPhone}</span>.
                  </p>
                </div>

                {/* Buttons Grid */}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleCopyCommand}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#0F172A]/10 text-xs font-bold text-[#0F172A] hover:bg-slate-50 transition cursor-pointer"
                  >
                    {copiedCmd ? <FaCheckCircle className="text-[#22C55E]" /> : <FaCopy className="text-slate-400" />}
                    <span>{copiedCmd ? "Copied!" : "Copy Command"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyNumber}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#0F172A]/10 text-xs font-bold text-[#0F172A] hover:bg-slate-50 transition cursor-pointer"
                  >
                    {copiedNum ? <FaCheckCircle className="text-[#22C55E]" /> : <FaCopy className="text-slate-400" />}
                    <span>{copiedNum ? "Copied!" : "Copy Number"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLaunchWhatsApp}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#22C55E] text-white text-xs font-bold hover:bg-[#16a34a] transition cursor-pointer"
                  >
                    <FaExternalLinkAlt className="h-3 w-3" />
                    <span>Open WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3 border-t border-slate-200/60 pt-3">
              <span className="h-6 w-6 rounded-full bg-[#14B8A6] text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <h5 className="text-xs font-bold text-[#0F172A]">Wait for Confirmation</h5>
                <p className="text-[11px] text-slate-500 font-medium">You will receive an automated reply: "You are all set!"</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-3 border-t border-slate-200/60 pt-3">
              <span className="h-6 w-6 rounded-full bg-[#14B8A6] text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                4
              </span>
              <div>
                <h5 className="text-xs font-bold text-[#0F172A]">Return to Setu AI</h5>
                <p className="text-[11px] text-slate-500 font-medium">Ask for scheme eligibility, updates, or application letters anytime.</p>
              </div>
            </div>
          </div>

          <div className="pt-2 text-center border-t border-slate-100">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Note: Production deployments will not require this setup.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}
