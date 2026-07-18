import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChevronDown, FaCheckCircle, FaBolt, FaUserCheck, FaMobileAlt, FaSearch } from "react-icons/fa";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BottomBar from "../components/layout/BottomBar";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import SectionHeader from "../components/ui/SectionHeader";

export default function Landing() {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const stats = [
    { value: "80+", label: "Verified Schemes", desc: "Monitored directly from government repositories" },
    { value: "Hybrid", label: "AI Matcher", desc: "Combines strict filtering with NLP models" },
    { value: "< 1s", label: "Match Time", desc: "Vector search checks your eligibility instantly" },
    { value: "Active", label: "WhatsApp Ready", desc: "Receive notifications and drafts directly" },
  ];

  const faqs = [
    {
      q: "How does Setu AI verify my eligibility?",
      a: "Setu AI parses official eligibility parameters (such as age, location, and income limits) and uses vector embedding searches to compare your profile details against official scheme guidelines, ensuring a highly accurate match.",
    },
    {
      q: "Is my personal data secure?",
      a: "Yes. Your privacy is our highest priority. We store data securely, never sell it, and encrypt all sensitive profile details. You can review our Consent Screen or delete your profile entirely at any time.",
    },
    {
      q: "Can I apply directly through Setu AI?",
      a: "Setu AI generates a customized application draft with a checklist of required documents. We provide direct official links to complete the formal application on official government portals.",
    },
    {
      q: "What types of government schemes are supported?",
      a: "We index central and state government schemes across education scholarships, agricultural subsidies, health benefits, entrepreneurial loans, and financial aid categories.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAF8F3] font-sans pb-16 md:pb-0">
      <Header />

      <PageContainer>
        {/* Hero Section */}
        <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#14B8A6]/10 px-3 py-1 border border-[#14B8A6]/20">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D9488]">
                  🇮🇳 Citizen Welfare Infrastructure
                </span>
              </div>

              <h1 className="font-serif text-5xl font-extrabold tracking-tight text-[#0F172A] sm:text-6xl lg:text-7xl leading-[1.1]">
                Bridging Citizens <br />
                <span className="text-[#14B8A6]">to the Welfare</span> <br />
                They Deserve
              </h1>

              <p className="max-w-xl text-base text-slate-500 font-medium leading-relaxed sm:text-lg">
                Setu AI cuts through bureaucratic complexity. Instantly discover, verify, and draft applications for government schemes tailored to your exact profile.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button onClick={() => navigate("/consent")} size="lg">
                  Check Your Eligibility
                </Button>
                <a href="#features">
                  <Button variant="secondary" size="lg">
                    Explore Features
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Column: Animated Cards Illustration */}
            <div className="lg:col-span-5 relative flex justify-center h-[350px] sm:h-[400px]">
              <div className="absolute inset-0 bg-radial from-[#14B8A6]/10 to-transparent rounded-full blur-2xl" />

              {/* Main Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute z-10 top-12 w-72 rounded-2xl bg-white p-6 shadow-premium border border-[#0F172A]/5"
              >
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="accent">AI Match Status</Badge>
                  <span className="font-serif font-black text-xl text-[#0F172A]">98%</span>
                </div>
                <div className="h-4 w-4/5 bg-slate-100 rounded-md mb-2" />
                <div className="h-3 w-1/2 bg-slate-100 rounded-md mb-4" />
                <hr className="border-slate-100 mb-4" />
                <div className="flex gap-2 justify-end">
                  <div className="h-8 w-20 bg-slate-100 rounded-lg" />
                  <div className="h-8 w-16 bg-[#14B8A6] rounded-lg" />
                </div>
              </motion.div>

              {/* Small Floating Card 1 */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-4 top-40 w-44 rounded-xl bg-white p-4 shadow-soft border border-[#0F172A]/5 z-20"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A]">
                  <FaCheckCircle className="text-[#22C55E]" />
                  <span>Ramesh Kumar</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Farmer • UP</p>
              </motion.div>

              {/* Small Floating Card 2 */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute right-4 top-6 w-48 rounded-xl bg-white p-4 shadow-soft border border-[#0F172A]/5 z-0"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <FaBolt className="text-[#F59E0B]" />
                  <span>2 Active Drafts</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#14B8A6] h-full" style={{ width: "65%" }} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-12 border-y border-[#0F172A]/5 bg-white/40 rounded-3xl px-6 my-12 shadow-soft">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2">
                <p className="font-serif text-4xl font-extrabold text-[#0F172A] sm:text-5xl">
                  {stat.value}
                </p>
                <p className="text-sm font-bold text-[#0F172A]">{stat.label}</p>
                <p className="text-xs text-slate-400 max-w-[180px] mx-auto font-medium">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Problem & Solution Bento Grid */}
        <section id="features" className="py-16 space-y-12">
          <SectionHeader
            title="Designed for Clarity. Built for Trust."
            description="Our advanced features address critical challenges in national welfare accessibility."
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Grid Item 1 - Large spanning */}
            <Card className="md:col-span-2 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <Badge variant="accent">Core Technology</Badge>
                <h3 className="font-serif text-2xl font-bold text-[#0F172A]">
                  RAG-powered Hybrid Eligibility Engine
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xl font-medium">
                  Setu AI compares profile metrics against complex legal documents. Combining vector searches with strict constraint filters avoids incorrect suggestions.
                </p>
              </div>
              <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#0F172A]/5 flex items-center justify-between gap-4 text-xs font-semibold">
                <span className="flex items-center gap-2 text-[#0D9488]">
                  <FaUserCheck className="h-4 w-4" />
                  No False Matches
                </span>
                <span className="text-slate-400">Verifying 12 key factors dynamically</span>
              </div>
            </Card>

            {/* Grid Item 2 */}
            <Card className="flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <Badge variant="success">Productivity</Badge>
                <h3 className="font-serif text-xl font-bold text-[#0F172A]">
                  Official Document Checks
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  Matches automatically calculate what paperwork you need to prepare, bypassing local inquiry visits.
                </p>
              </div>
              <div className="text-xs text-[#0F172A]/60 font-bold">
                • Aadhaar • Income Cert. • Land Records
              </div>
            </Card>

            {/* Grid Item 3 */}
            <Card className="flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <Badge variant="warning">Accessibility</Badge>
                <h3 className="font-serif text-xl font-bold text-[#0F172A]">
                  Eligibility Simulator
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  Simulate major life events—like changes in jobs, income, or graduation status—to see scheme adjustments.
                </p>
              </div>
              <Button onClick={() => navigate("/consent")} variant="ghost" size="sm" className="w-full justify-start p-0">
                Run Simulation →
              </Button>
            </Card>

            {/* Grid Item 4 - Spanning */}
            <Card className="md:col-span-2 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <Badge variant="info">Communication</Badge>
                <h3 className="font-serif text-2xl font-bold text-[#0F172A]">
                  AI Application Drafts & WhatsApp Delivery
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xl font-medium">
                  Get high-quality application drafts in a Google Docs style editor. Export immediately to PDF or sync matches over WhatsApp.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="bg-[#FAF8F3] px-3 py-1.5 rounded-lg border border-[#0F172A]/5 text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                  <FaMobileAlt /> Native Delivery
                </span>
                <span className="bg-[#FAF8F3] px-3 py-1.5 rounded-lg border border-[#0F172A]/5 text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                  <FaCheckCircle className="text-[#22C55E]" /> PDF Ready
                </span>
              </div>
            </Card>
          </div>
        </section>

        {/* How Setu Works */}
        <section className="py-16 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-serif text-4xl font-extrabold text-[#0F172A]">
              Simple Three Step Discovery
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto font-medium text-sm">
              We guide you from profiling to draft preparation with absolute clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 relative">
            {/* Background line for layout */}
            <div className="hidden md:block absolute top-1/2 left-12 right-12 h-0.5 bg-slate-200/50 -z-10" />

            {/* Step 1 */}
            <Card className="text-center p-8 space-y-4 flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-[#14B8A6]/10 text-[#0D9488] font-bold text-xl flex items-center justify-center">
                1
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0F172A]">Complete Your Profile</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Answer structured steps: income, location, occupation, and health status. We protect your privacy at every stage.
              </p>
            </Card>

            {/* Step 2 */}
            <Card className="text-center p-8 space-y-4 flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-[#14B8A6]/10 text-[#0D9488] font-bold text-xl flex items-center justify-center">
                2
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0F172A]">AI Match & Review</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Our hybrid RAG model matches you against federal guidelines, yielding a checklist of qualified schemes.
              </p>
            </Card>

            {/* Step 3 */}
            <Card className="text-center p-8 space-y-4 flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-[#14B8A6]/10 text-[#0D9488] font-bold text-xl flex items-center justify-center">
                3
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0F172A]">Prepare Application</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Download a clean, pre-filled application draft PDF and proceed directly to official web links to submit.
              </p>
            </Card>
          </div>
        </section>

        {/* Dynamic Search Box Previews */}
        <section className="py-16">
          <div className="rounded-3xl bg-[#0F172A] p-8 sm:p-12 text-white relative overflow-hidden shadow-premium">
            <div className="absolute right-0 bottom-0 top-0 opacity-10 pointer-events-none">
              <span className="text-[200px] leading-none select-none">🏛️</span>
            </div>
            <div className="relative z-10 max-w-2xl space-y-6">
              <Badge variant="accent">Instant AI Search</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Instantly check your eligibility
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Describe your current situation in simple words (e.g. "I am a student from rural UP looking for laptop subsidies") and we will analyze matches instantly.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="text"
                  placeholder="Example: Female college student from Delhi..."
                  className="flex-1 px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#14B8A6] focus:bg-white/10"
                />
                <Button onClick={() => navigate("/consent")} variant="accent">
                  <FaSearch className="mr-2" /> Match Schemes
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-4xl font-extrabold text-[#0F172A]">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 font-medium text-sm">
              Answers regarding match parameters, security, and document verification.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="border-b border-[#0F172A]/5">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full py-5 flex items-center justify-between text-left font-serif text-lg font-bold text-[#0F172A] hover:text-[#14B8A6] transition duration-150 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <FaChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="pb-5 text-sm text-slate-500 font-medium leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </PageContainer>

      <Footer />
      <BottomBar />
    </main>
  );
}