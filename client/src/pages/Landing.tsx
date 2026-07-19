import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  FaChevronDown,
  FaCheckCircle,
  FaBolt,
  FaUserCheck,
  FaMobileAlt,
  FaSearch,
  FaShieldAlt,
  FaArrowDown,
} from "react-icons/fa";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BottomBar from "../components/layout/BottomBar";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import SectionHeader from "../components/ui/SectionHeader";

import Reveal from "../components/effects/Reveal";
import TiltCard from "../components/effects/TiltCard";
import AnimatedCounter from "../components/effects/AnimatedCounter";
import MagneticButton from "../components/effects/MagneticButton";

const HERO_WORDS = ["welfare", "schemes", "subsidies", "benefits", "support"];

export default function Landing() {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [wordIndex, setWordIndex] = useState(0);

  // How-it-works section scroll progress for line fill
  const stepsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: stepsProgress } = useScroll({
    target: stepsRef,
    offset: ["start end", "center center"],
  });
  const lineScaleX = useSpring(stepsProgress, { stiffness: 100, damping: 20 });

  // Synonym cycle interval
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % HERO_WORDS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { value: "86+", label: "Verified Schemes", desc: "Monitored directly from government repositories" },
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
        <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal direction="down" delayOffset={0}>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#14B8A6]/10 px-3.5 py-1 border border-[#14B8A6]/20">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D9488]">
                    🇮🇳 National Citizen Welfare Infrastructure
                  </span>
                </div>
              </Reveal>

              <Reveal direction="up" delayOffset={0.1}>
                <h1 className="font-serif text-5xl font-extrabold tracking-tight text-[#0F172A] sm:text-6xl lg:text-7xl leading-[1.1]">
                  Bridging Citizens <br />
                  to the{" "}
                  <span className="inline-block min-w-[200px] text-[#14B8A6]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={HERO_WORDS[wordIndex]}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="highlight-underline"
                      >
                        {HERO_WORDS[wordIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </span>{" "}
                  <br />
                  They Deserve
                </h1>
              </Reveal>

              <Reveal direction="up" delayOffset={0.2}>
                <p className="max-w-xl text-base text-slate-500 font-medium leading-relaxed sm:text-lg">
                  Setu AI cuts through bureaucratic complexity. Instantly discover, verify, and draft applications for government schemes tailored to your exact profile.
                </p>
              </Reveal>

              <Reveal direction="up" delayOffset={0.3}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <MagneticButton>
                    <Button onClick={() => navigate("/consent")} size="lg">
                      Check Your Eligibility
                    </Button>
                  </MagneticButton>

                  <a href="#features">
                    <Button variant="secondary" size="lg">
                      Explore Features
                    </Button>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Animated Cards Illustration */}
            <div className="lg:col-span-5 relative flex justify-center h-[380px] sm:h-[420px]">
              {/* Radial backdrop glow */}
              <div className="absolute inset-0 bg-radial from-[#14B8A6]/15 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

              {/* Main Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute z-10 top-12 w-72 rounded-2xl bg-white p-6 shadow-premium border border-[#0F172A]/5"
              >
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="accent">AI Match Status</Badge>
                  <span className="font-serif font-black text-xl text-[#0F172A]">98%</span>
                </div>
                <div className="h-4 w-4/5 bg-slate-100 rounded-md mb-2 animate-pulse" />
                <div className="h-3 w-1/2 bg-slate-100 rounded-md mb-4 animate-pulse" />
                <hr className="border-slate-100 mb-4" />
                <div className="flex gap-2 justify-end">
                  <div className="h-8 w-20 bg-slate-100 rounded-lg" />
                  <div className="h-8 w-16 bg-[#14B8A6] rounded-lg" />
                </div>
              </motion.div>

              {/* Floating Card 1 - Ramesh Kumar */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-2 sm:left-4 top-40 w-44 rounded-xl bg-white/90 glass p-3.5 shadow-soft border border-[#0F172A]/5 z-20"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A]">
                  <FaCheckCircle className="text-[#22C55E]" />
                  <span>Ramesh Kumar</span>
                </div>
                <p className="text-[10px] text-slate-400 font-bold mt-1">Farmer • Lucknow, UP</p>
              </motion.div>

              {/* Floating Card 2 - Active Drafts */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute right-2 sm:right-4 top-6 w-48 rounded-xl bg-white/90 glass p-3.5 shadow-soft border border-[#0F172A]/5 z-0"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <FaBolt className="text-[#F59E0B]" />
                  <span>2 Active Drafts</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#14B8A6] h-full" style={{ width: "85%" }} />
                </div>
              </motion.div>

              {/* Trust Verification Micro-Badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-4 right-8 z-20 flex items-center gap-2 bg-white/90 glass px-3 py-1.5 rounded-full shadow-soft border border-[#14B8A6]/20 text-[10px] font-bold text-[#0D9488]"
              >
                <FaShieldAlt className="text-[#14B8A6]" />
                <span>Verified Government Rules</span>
              </motion.div>
            </div>
          </div>

          {/* Scroll Cue Indicator */}
          <div className="flex justify-center pt-8">
            <a
              href="#features"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#14B8A6] transition group"
            >
              <span>Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaArrowDown className="text-[#14B8A6]" />
              </motion.div>
            </a>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-12 border-y border-[#0F172A]/5 bg-white/40 rounded-3xl px-6 my-12 shadow-soft">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 text-center">
            {stats.map((stat, i) => (
              <Reveal key={i} index={i} direction="up">
                <div className="space-y-1">
                  <p className="font-serif text-4xl font-extrabold text-[#0F172A] sm:text-5xl">
                    <AnimatedCounter value={stat.value} />
                  </p>
                  <p className="text-sm font-bold text-[#0F172A]">{stat.label}</p>
                  <p className="text-xs text-slate-400 max-w-[180px] mx-auto font-medium">
                    {stat.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Problem & Solution Bento Grid */}
        <section id="features" className="py-16 space-y-12">
          <Reveal direction="down">
            <SectionHeader
              title="Designed for Clarity. Built for Trust."
              description="Our advanced features address critical challenges in national welfare accessibility."
            />
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Grid Item 1 - Large Spanning with Tilt */}
            <div className="md:col-span-2">
              <Reveal index={0} direction="up">
                <TiltCard>
                  <Card className="h-full flex flex-col justify-between space-y-6">
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
                </TiltCard>
              </Reveal>
            </div>

            {/* Grid Item 2 */}
            <Reveal index={1} direction="up">
              <Card className="h-full flex flex-col justify-between space-y-6">
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
            </Reveal>

            {/* Grid Item 3 */}
            <Reveal index={2} direction="up">
              <Card className="h-full flex flex-col justify-between space-y-6">
                <div className="space-y-2">
                  <Badge variant="warning">Accessibility</Badge>
                  <h3 className="font-serif text-xl font-bold text-[#0F172A]">
                    Eligibility Simulator
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    Simulate major life events—like changes in jobs, income, or graduation status—to see scheme adjustments.
                  </p>
                </div>
                <Button onClick={() => navigate("/simulator")} variant="ghost" size="sm" className="w-full justify-start p-0">
                  Run Simulation →
                </Button>
              </Card>
            </Reveal>

            {/* Grid Item 4 - Spanning with Tilt */}
            <div className="md:col-span-2">
              <Reveal index={3} direction="up">
                <TiltCard>
                  <Card className="h-full flex flex-col justify-between space-y-6">
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
                </TiltCard>
              </Reveal>
            </div>
          </div>
        </section>

        {/* How Setu Works */}
        <section ref={stepsRef} className="py-16 space-y-12">
          <Reveal direction="down">
            <div className="text-center space-y-4">
              <h2 className="font-serif text-4xl font-extrabold text-[#0F172A]">
                Simple Three Step Discovery
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto font-medium text-sm">
                We guide you from profiling to draft preparation with absolute clarity.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 relative">
            {/* Background line driven by scroll transform */}
            <div className="hidden md:block absolute top-1/2 left-12 right-12 h-0.5 bg-slate-200/60 -z-10 overflow-hidden">
              <motion.div
                className="h-full bg-[#14B8A6] origin-left"
                style={{ scaleX: lineScaleX }}
              />
            </div>

            {/* Step 1 */}
            <Reveal index={0} direction="up">
              <Card className="text-center p-8 space-y-4 flex flex-col items-center h-full">
                <div className="h-12 w-12 rounded-full bg-[#14B8A6]/10 text-[#0D9488] font-bold text-xl flex items-center justify-center border border-[#14B8A6]/20">
                  1
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0F172A]">Complete Your Profile</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  Answer structured steps: income, location, occupation, and health status. We protect your privacy at every stage.
                </p>
              </Card>
            </Reveal>

            {/* Step 2 */}
            <Reveal index={1} direction="up">
              <Card className="text-center p-8 space-y-4 flex flex-col items-center h-full">
                <div className="h-12 w-12 rounded-full bg-[#14B8A6]/10 text-[#0D9488] font-bold text-xl flex items-center justify-center border border-[#14B8A6]/20">
                  2
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0F172A]">AI Match & Review</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  Our hybrid RAG model matches you against federal guidelines, yielding a checklist of qualified schemes.
                </p>
              </Card>
            </Reveal>

            {/* Step 3 */}
            <Reveal index={2} direction="up">
              <Card className="text-center p-8 space-y-4 flex flex-col items-center h-full">
                <div className="h-12 w-12 rounded-full bg-[#14B8A6]/10 text-[#0D9488] font-bold text-xl flex items-center justify-center border border-[#14B8A6]/20">
                  3
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0F172A]">Prepare Application</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  Download a clean, pre-filled application draft PDF and proceed directly to official web links to submit.
                </p>
              </Card>
            </Reveal>
          </div>
        </section>

        {/* Dynamic Search Box Previews with Ambient Blob */}
        <section className="py-16">
          <Reveal direction="up">
            <div className="rounded-3xl bg-[#0F172A] p-8 sm:p-12 text-white relative overflow-hidden shadow-premium">
              {/* Ambient Blob */}
              <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-radial from-[#14B8A6]/30 via-[#F59E0B]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="absolute right-0 bottom-0 top-0 opacity-10 pointer-events-none">
                <span className="text-[200px] leading-none select-none">🏛️</span>
              </div>
              
              <div className="relative z-10 max-w-2xl space-y-6">
                <Badge variant="accent">Instant AI Search</Badge>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  Instantly check your eligibility
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                  Describe your current situation in simple words (e.g. "I am a student from rural UP looking for laptop subsidies") and we will analyze matches instantly.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <input
                    type="text"
                    placeholder="Example: Female college student from Delhi..."
                    data-hover-target="true"
                    className="flex-1 px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#14B8A6] focus:bg-white/10 font-medium text-sm"
                  />
                  <MagneticButton>
                    <Button onClick={() => navigate("/consent")} variant="accent">
                      <FaSearch className="mr-2" /> Match Schemes
                    </Button>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* FAQ Section */}
        <section className="py-16 max-w-4xl mx-auto space-y-8">
          <Reveal direction="down">
            <div className="text-center space-y-2">
              <h2 className="font-serif text-4xl font-extrabold text-[#0F172A]">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-500 font-medium text-sm">
                Answers regarding match parameters, security, and document verification.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delayOffset={0.1}>
            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className="border-b border-[#0F172A]/5">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      data-hover-target="true"
                      className="w-full py-5 flex items-center justify-between text-left font-serif text-lg font-bold text-[#0F172A] hover:text-[#14B8A6] transition duration-150 cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <FaChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#14B8A6]" : "text-slate-400"
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
          </Reveal>
        </section>
      </PageContainer>

      <Footer />
      <BottomBar />
    </main>
  );
}