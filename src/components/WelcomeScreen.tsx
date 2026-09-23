import { motion } from "framer-motion";
import { Code2, User, Globe } from "lucide-react";
import { useEffect, useState } from "react";

const PC_INTRO_VIDEO = "/assets/intro.mp4";
const MOBILE_INTRO_VIDEO = "/assets/intro-mobile.mp4";

interface WelcomeScreenProps {
  onComplete?: () => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const icons = [Code2, User, Globe];
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        transition: {
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      className="fixed inset-0 z-[99999] flex flex-col justify-between items-center bg-black overflow-hidden px-6 py-8 md:py-12 select-none"
    >
      {/* Cinematic Ambient Glow Behind Video */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[700px] h-[350px] bg-white/[0.04] blur-[140px] rounded-full" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-white/[0.03] blur-[120px] rounded-full" />
      </div>

      {/* TOP HEADER SECTION: Icons + Title (Positioned cleanly above center stage) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 flex flex-col items-center gap-3 text-center w-full max-w-md"
      >
        {/* Animated Feature Icons */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="flex gap-3 items-center justify-center mb-1"
        >
          {icons.map((Icon, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: {
                  opacity: 0,
                  scale: 0.5,
                  y: -10,
                },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.04] backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.03)]"
            >
              <Icon size={16} className="text-white/80" />
            </motion.div>
          ))}
        </motion.div>

        {/* Header Typography */}
        <div className="flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[11px] md:text-xs tracking-[0.35em] uppercase text-white/50 font-medium font-mono"
          >
            Welcome to my
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.85 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mt-1"
          >
            Portfolio Website
          </motion.h1>
        </div>
      </motion.div>

      {/* CENTER STAGE: Blended Animated Intro Video (Clean, Bold & Unobstructed) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0 px-2 sm:px-4">
        <div
          className="relative flex items-center justify-center w-full max-w-[1400px] h-[70vh] sm:h-[75vh] md:h-[82vh]"
          style={{
            maskImage: "radial-gradient(ellipse at center, black 72%, transparent 98%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 72%, transparent 98%)",
          }}
        >
          <video
            src={isMobile ? MOBILE_INTRO_VIDEO : PC_INTRO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-contain scale-115 sm:scale-125 md:scale-135 filter invert contrast-125 brightness-110 mix-blend-screen opacity-95 transition-all duration-700"
          />
        </div>
      </div>

      {/* BOTTOM SECTION: Subtitle & Loading Progress Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 flex flex-col items-center gap-3 w-full max-w-sm"
      >
        <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/50 font-mono font-medium">
          AI/ML Engineer In The Making
        </p>

        {/* Minimalist Glowing Progress Line */}
        <div className="w-56 md:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div
            initial={{ width: "5%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 4.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full bg-gradient-to-r from-white/40 via-white to-white shadow-[0_0_10px_rgba(255,255,255,0.7)]"
          />
        </div>
      </motion.div>

      {/* Sleek Top-Right Skip Button */}
      <button
        onClick={() => onComplete?.()}
        className="absolute top-6 right-6 md:top-8 md:right-10 z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 hover:border-white/30 backdrop-blur-md text-[10px] tracking-[0.25em] uppercase text-white/60 hover:text-white transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
      >
        <span>SKIP</span>
        <span className="text-xs">➔</span>
      </button>
    </motion.div>
  );
}