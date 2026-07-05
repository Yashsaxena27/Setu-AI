import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { generateDraft } from "../services/draft";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BottomBar from "../components/layout/BottomBar";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/common/Button";

import {
  FaFileAlt,
  FaCheckCircle,
  FaCopy,
  FaShareAlt,
  FaExternalLinkAlt,
  FaDownload,
  FaMagic,
  FaShieldAlt,
  FaClipboardCheck,
  FaFolderOpen,
} from "react-icons/fa";

import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const GENERATING_TEXT = "Generating application draft...";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function ApplicationDraft() {
  const navigate = useNavigate();
  const location = useLocation();

  const scheme = location.state;

  const pdfRef = useRef<HTMLDivElement>(null);

  const [draft, setDraft] = useState(GENERATING_TEXT);
  const [isGenerating, setIsGenerating] = useState(true);

  const [requiredDocuments, setRequiredDocuments] =
    useState<string[]>([]);

  useEffect(() => {
    if (!scheme) return;

    const profile = JSON.parse(
      localStorage.getItem("profile") || "{}"
    );

    async function loadDraft() {
      try {
        setIsGenerating(true);

        const result = await generateDraft(
          profile,
          scheme
        );

        setDraft(result.draft);
        setRequiredDocuments(
          result.requiredDocuments || []
        );
      } catch (err) {
        console.error(err);

        setDraft(
          "We couldn't generate your application draft right now. Please try again."
        );
      } finally {
        setIsGenerating(false);
      }
    }

    loadDraft();
  }, [scheme]);

  if (!scheme) {
    return (
      <PageContainer>
        Draft not found.
      </PageContainer>
    );
  }

  const buildFullText = () => `
Scheme: ${scheme?.scheme_name ?? "N/A"}

${draft}

Official Website:
${scheme?.official_link || "Not available"}
`.trim();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(buildFullText());
    toast.success("Draft copied successfully!");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: scheme?.scheme_name || "Government Application Draft",
          text: draft,
          ...(scheme?.official_link
            ? { url: scheme.official_link }
            : {}),
        });
      } catch (err: any) {
        // user cancelled share (AbortError) is normal and shouldn't be logged
        if (err?.name !== "AbortError") {
          console.error(err);
        }
      }
    } else {
      toast("Sharing isn't supported on this device.");
    }
  };

  const handleDownloadPDF = async () => {
    if (!pdfRef.current) return;

    try {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth - 20;
      const imgHeight =
        (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(
        imgData,
        "PNG",
        10,
        position,
        imgWidth,
        imgHeight
      );

      heightLeft -= pageHeight - 20;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight + 10;

        pdf.addPage();

        pdf.addImage(
          imgData,
          "PNG",
          10,
          position,
          imgWidth,
          imgHeight
        );

        heightLeft -= pageHeight - 20;
      }

      const fileName = (scheme?.scheme_name || "Application_Draft")
        .replace(/[<>:"/\\|?*]+/g, "_")
        .replace(/\s+/g, "_");

      pdf.save(`${fileName}.pdf`);
      toast.success("PDF downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Unable to generate PDF.");
    }
  };

  const officialLinkEnabled = Boolean(scheme?.official_link);

  const ActionButtons = () => (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleCopy}
        disabled={isGenerating}
        className="flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-600"
      >
        <FaCopy />
        Copy Draft
      </motion.button>

      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleDownloadPDF}
        disabled={isGenerating}
        className="flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-emerald-600"
      >
        <FaDownload />
        Download PDF
      </motion.button>

      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleShare}
        disabled={isGenerating}
        className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
      >
        <FaShareAlt />
        Share
      </motion.button>

      {officialLinkEnabled ? (
        <motion.a
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          href={scheme.official_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
        >
          <FaExternalLinkAlt />
          Official Website
        </motion.a>
      ) : (
        <button
          disabled
          aria-disabled="true"
          title="No official link available for this scheme"
          className="flex h-12 cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-400 opacity-50"
        >
          <FaExternalLinkAlt />
          Official Website
        </button>
      )}
    </div>
  );

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <PageContainer>
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            ← Back
          </Button>

          {/* HERO */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-6 rounded-2xl border border-slate-100 bg-white/70 p-6 shadow-sm backdrop-blur sm:p-8"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
              <FaFileAlt />
              <span>Application Draft</span>
            </div>

            <h1 className="mt-2 break-words text-2xl font-bold text-slate-900 sm:text-3xl">
              {scheme?.scheme_name || "Untitled Scheme"}
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
              AI-generated application ready for review, download and submission.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <FaMagic /> AI Generated
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <FaShieldAlt /> Verified Scheme
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                <FaClipboardCheck /> Copy Ready
              </span>
            </div>
          </motion.div>

          {/* SCHEME INFORMATION CARD */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-md"
          >
            <h2 className="text-lg font-bold text-slate-900">
              Scheme Information
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Scheme Name
                </p>
                <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                  {scheme?.scheme_name || "--"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Category
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {scheme?.category || "--"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Level
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {scheme?.level || "--"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Match %
                </p>
                <p className="mt-1">
                  {scheme?.match_percentage != null ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-semibold text-green-700">
                      {scheme.match_percentage}% Match
                    </span>
                  ) : (
                    <span className="text-sm font-semibold text-slate-800">--</span>
                  )}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  State
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {scheme?.state || "--"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* DRAFT CARD */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="mt-6 rounded-2xl border border-slate-100 bg-white shadow-md"
            ref={pdfRef}
          >
            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-bold text-slate-900">
                Application Draft
              </h2>

              <div className="mt-4">
                {!isGenerating ? (
                  <div className="prose prose-slate max-w-2xl prose-headings:font-semibold prose-p:leading-relaxed">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {draft}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="animate-pulse space-y-3" aria-live="polite">
                    <div className="h-4 w-3/4 rounded bg-slate-200" />
                    <div className="h-4 w-full rounded bg-slate-200" />
                    <div className="h-4 w-5/6 rounded bg-slate-200" />
                    <div className="h-4 w-2/3 rounded bg-slate-200" />
                    <div className="h-4 w-full rounded bg-slate-200" />
                    <div className="h-4 w-1/2 rounded bg-slate-200" />
                    <p className="pt-2 text-sm text-slate-400">
                      {GENERATING_TEXT}
                    </p>
                  </div>
                )}
              </div>

              {!isGenerating && (
                <>
                  <hr className="my-8 border-slate-200" />
                  <p className="text-center text-xs text-slate-400">
                    Generated by SETU AI • AI-Powered Government Scheme Discovery Assistant
                  </p>
                </>
              )}
            </div>
          </motion.div>

          {/* REQUIRED DOCUMENTS CARD */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-md sm:p-8"
          >
            <h2 className="text-lg font-bold text-slate-900">
              Required Documents
            </h2>

            <div className="mt-4">
              {isGenerating ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-16 animate-pulse rounded-xl border border-slate-100 bg-slate-100"
                    />
                  ))}
                </div>
              ) : requiredDocuments.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-12 text-center">
                  <FaFolderOpen className="text-4xl text-slate-300" />
                  <p className="mt-3 text-base font-semibold text-slate-700">
                    Document information unavailable
                  </p>
                  <p className="mt-1 max-w-sm text-sm text-slate-400">
                    This scheme doesn't currently provide an official document checklist.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {requiredDocuments.map((doc, index) => (
                    <motion.div
                      key={index}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.4 }}
                      variants={fadeUp}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                        delay: index * 0.06,
                      }}
                      className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <FaFileAlt className="shrink-0 text-xl text-blue-600" />
                        <div className="min-w-0">
                          <p className="truncate font-medium text-slate-800">
                            {doc}
                          </p>
                          <p className="text-xs text-slate-400">
                            Government Document
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        <FaCheckCircle />
                        Required
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* ACTIONS CARD (desktop / tablet) */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="mt-6 mb-24 hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-md sm:mb-6 sm:block sm:p-8"
          >
            <h2 className="text-lg font-bold text-slate-900">Actions</h2>
            <div className="mt-4">
              <ActionButtons />
            </div>
          </motion.div>
        </PageContainer>

        {/* STICKY ACTION BAR (mobile only) */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] backdrop-blur sm:hidden">
          <ActionButtons />
        </div>
      </div>

      <BottomBar />
      <Footer />
    </>
  );
}