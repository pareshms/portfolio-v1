import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Mail, Lock, Eye, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-16 py-12 md:py-20 select-none overflow-x-hidden">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[150px]" />
        <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Top Back Navigation */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-white/60 hover:text-white px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-xl transition-all duration-300 mb-12 cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </motion.button>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-400/20 bg-blue-500/10 text-blue-400 text-xs font-mono tracking-[0.2em] uppercase">
            <ShieldCheck size={14} />
            <span>Legal & Privacy</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
            Privacy Policy
          </h1>

          <p className="text-sm md:text-base text-white/50 font-mono tracking-wide">
            Last Updated: March 2026 · Bengaluru, Karnataka, India
          </p>
        </motion.div>

        {/* Main Content Sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-8"
        >
          {/* Card 1: Overview */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-7 md:p-9 space-y-4">
            <div className="flex items-center gap-3 text-emerald-400">
              <Eye size={20} />
              <h2 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white">
                1. Overview & Commitment
              </h2>
            </div>
            <p className="text-sm md:text-base text-white/70 leading-relaxed font-sans">
              This portfolio website is operated by <strong>Paresh M S</strong>. I hold your privacy with the utmost importance. 
              This document outlines how personal information is collected, used, and safeguarded when you visit this website or initiate contact.
            </p>
          </div>

          {/* Card 2: Information Collected */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-7 md:p-9 space-y-4">
            <div className="flex items-center gap-3 text-blue-400">
              <Lock size={20} />
              <h2 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white">
                2. Information Collected
              </h2>
            </div>
            <div className="space-y-3 text-sm md:text-base text-white/70 leading-relaxed">
              <p>
                <strong>Direct Inquiries:</strong> When you contact me via email, WhatsApp, or through the direct message form, you may provide details such as your name, email address, phone number, and message contents. This information is used strictly to respond to your inquiry or project discussion.
              </p>
              <p>
                <strong>Technical Information:</strong> Standard, non-identifying telemetry (such as browser type, operating system, and viewport dimensions) may be processed transiently by hosting infrastructure (e.g. Vercel) for performance optimization and threat prevention.
              </p>
            </div>
          </div>

          {/* Card 3: No Tracking or Selling */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-7 md:p-9 space-y-4">
            <div className="flex items-center gap-3 text-amber-400">
              <ShieldCheck size={20} />
              <h2 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white">
                3. Zero Tracking & No Data Selling
              </h2>
            </div>
            <p className="text-sm md:text-base text-white/70 leading-relaxed">
              I do not sell, rent, monetize, or disclose your personal information to any third parties or advertisers. 
              This website does not employ third-party advertising cookies, cross-site trackers, or invasive analytics pixels.
            </p>
          </div>

          {/* Card 4: Third-Party Integrations */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-7 md:p-9 space-y-4">
            <div className="flex items-center gap-3 text-purple-400">
              <Globe size={20} />
              <h2 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white">
                4. External Links & Services
              </h2>
            </div>
            <p className="text-sm md:text-base text-white/70 leading-relaxed">
              This portfolio contains links to external platforms, including LinkedIn, GitHub, Instagram, and WhatsApp. 
              Interacting with external services is subject to their respective terms of service and privacy policies.
            </p>
          </div>

          {/* Card 5: Contact */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-7 md:p-9 space-y-4">
            <div className="flex items-center gap-3 text-emerald-400">
              <Mail size={20} />
              <h2 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white">
                5. Contact & Data Inquiries
              </h2>
            </div>
            <p className="text-sm md:text-base text-white/70 leading-relaxed">
              If you have any questions regarding this Privacy Policy or wish to have any correspondence removed, please reach out directly:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2 font-mono text-xs text-white/80">
              <a
                href="mailto:pareshms2535@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Mail size={14} className="text-blue-400" />
                <span>pareshms2535@gmail.com</span>
              </a>
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-white/60">
                <span>📍 Bengaluru, Karnataka, India</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Home Return Button */}
        <div className="mt-14 pt-8 border-t border-white/10 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black font-mono text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 cursor-pointer"
          >
            ← Return to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
