import { useEffect, useRef, useState, lazy, Suspense, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";

const BandCard = lazy(() => import("./BandCard"));

export default function FrontendDeveloperSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  const [showCard, setShowCard] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [goAbout, setGoAbout] = useState(false);

  const navigate = useNavigate();

  useEffect(() => setMounted(true), []);

  // Preload BandCard in background so "Show Card" opens with zero lag
  useEffect(() => {
    const timer = setTimeout(() => {
      import("./BandCard");
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const closeCard = useCallback(() => {
    setShowCard(false);
    if (typeof window !== "undefined" && window.history.state?.cardModal) {
      window.history.back();
    }
  }, []);

  // Support phone back gesture / button on mobile to close card
  useEffect(() => {
    if (!showCard) return;

    window.history.pushState({ cardModal: true }, "");

    const onPop = () => {
      setShowCard(false);
    };

    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
    };
  }, [showCard]);

  // page exit → navigate after animation
  useEffect(() => {
    if (goAbout) {
      const t = setTimeout(() => {
        navigate("/about");
      }, 350);

      return () => clearTimeout(t);
    }
  }, [goAbout, navigate]);

  // Prevent background scroll on mobile when card is open
  useEffect(() => {
    if (showCard && typeof window !== "undefined" && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else if (!goAbout) {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showCard, goAbout]);

  return (

    <motion.section
      ref={ref}
      id="frontend"
      initial={{
        x: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
      }}
      animate={
        goAbout
          ? {
            x: "-30vw",
            scale: 0.94,
            opacity: 0,
            filter: "blur(6px)",
          }
          : {
            x: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
          }
      }
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative w-full min-h-screen bg-black text-white overflow-hidden flex items-start px-6 md:px-20 pt-16 md:pt-28 select-none"
    >
      {/* TEXT */}
      <div className="relative z-10 max-w-2xl">
        <motion.div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 font-mono text-[11px] tracking-[0.25em] uppercase">
          <div className="flex items-center">
            <motion.span
              animate={{
                width: ["0ch", "32ch", "32ch", "0ch"],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.3, 0.8, 1],
              }}
              className="inline-block overflow-hidden whitespace-nowrap text-white/60"
            >
              ✦ Available for work
            </motion.span>

            <motion.span
              animate={{
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
              }}
              className="text-white/60 ml-[2px]"
            >
              |
            </motion.span>
          </div>


        </motion.div>

        <div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-extrabold leading-[1.05] tracking-tight text-white text-[clamp(56px,9vw,120px)]"
          >
            AI & ML
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, x: -40, rotate: -2 }}
            animate={inView ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: -40, rotate: -2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-extrabold leading-[1.05] tracking-tight text-white/70 text-[clamp(56px,9vw,120px)] mb-6"
          >
            Builder
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative text-sm sm:text-base lg:text-xl
    leading-relaxed max-w-md
    font-[Poppins] font-medium
    tracking-wide
    text-transparent bg-clip-text
    bg-[length:200%_auto]
    bg-gradient-to-r
    from-white via-white/60 to-white
    animate-[shine_4s_linear_infinite]"
        >
          CSE (AI & ML) student building AI-powered products, intelligent systems
          and practical engineering solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 flex flex-wrap gap-4"
        >
          {["AI & ML", "Python", "C / C++", "Java", "Full-Stack", "React"].map((tech) => (
            <div
              key={tech}
              className="
        relative group px-5 py-2.5 rounded-2xl
        text-sm font-medium text-white/90
        bg-white/5 backdrop-blur-xl
        border border-white/10
        overflow-hidden
        transition-all duration-300
      "
            >
              {/* animated border fill */}
              <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 bg-gradient-to-r from-white/20 via-white/10 to-transparent"></span>

              {/* glowing border line */}
              <span className="absolute inset-0 rounded-2xl border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

              {/* text */}
              <span className="relative z-10">{tech}</span>
            </div>
          ))}
        </motion.div>

        <div className="mt-8 flex flex-col [@media(min-width:540px)]:flex-row items-start md:items-center gap-4">
          {/* Show Card Button */}
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setShowCard((s) => !s)}
            className="inline-flex items-center gap-2 border border-accent text-accent px-6 py-3 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-accent hover:text-black transition-all duration-200 rounded-full relative z-20"
          >
            {showCard ? "Hide Card" : "Show Card"}
          </motion.button>

          {/* About Button */}
          <motion.button
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setGoAbout(true)}
            className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 text-xs uppercase font-bold hover:bg-white hover:text-black rounded-full transition"
          >
            About Me
          </motion.button>
        </div>
      </div>

      {/* 3D ID CARD */}
      <AnimatePresence>
        {showCard && mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 md:p-0 md:bg-transparent md:backdrop-blur-none md:absolute md:inset-0 md:z-[5] md:pointer-events-none"
          >
            {/* Mobile Top Controls Bar */}
            <div className="flex md:hidden items-center justify-between px-2 pt-3 pb-2 z-30 pointer-events-auto">
              {/* Back Button */}
              <button
                onClick={closeCard}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 text-white text-xs font-mono uppercase tracking-wider backdrop-blur-xl transition-all cursor-pointer shadow-lg"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>

              {/* Status Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-[0.2em] text-white/75 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>3D ID Card</span>
              </div>

              {/* Exit Button */}
              <button
                onClick={closeCard}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-500/20 hover:bg-red-500/30 active:scale-95 border border-red-400/35 text-white text-xs font-mono uppercase tracking-wider backdrop-blur-xl transition-all cursor-pointer shadow-lg"
              >
                <span>Exit</span>
                <X size={16} />
              </button>
            </div>

            {/* 3D Canvas Container */}
            <div className="relative w-full flex-1 md:absolute md:inset-0 pointer-events-auto">
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/50 uppercase tracking-widest">
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                      <span>Loading 3D Card...</span>
                    </div>
                  </div>
                }
              >
                <BandCard />
              </Suspense>
            </div>

            {/* Mobile Bottom Thumb Exit Bar */}
            <div className="flex md:hidden flex-col items-center justify-center gap-3 pb-8 pt-2 z-30 pointer-events-auto">
              <button
                onClick={closeCard}
                className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-black hover:bg-white/90 active:scale-95 font-mono text-xs uppercase tracking-[0.25em] font-bold shadow-[0_4px_30px_rgba(255,255,255,0.3)] transition-all cursor-pointer"
              >
                <X size={16} className="text-black" />
                <span>Exit Card</span>
              </button>

              <div className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-[0.2em] text-white/45 uppercase pointer-events-none">
                ✦ Drag card to interact & swing
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}