import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import heroEye from "@/assets/hero-eye.png";

import WelcomeScreen from "@/components/WelcomeScreen";
import FrontendDeveloperSection from "@/components/FrontendDeveloperSection";
import Showcase from "./components/Showcase";
import ContactSection from "@/components/ContactSection";
import { Routes, Route, useNavigate } from "react-router-dom";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";


const logos = ["PARESH M S", "AI & ML", "INTELLIGENT SYSTEMS", "FULL STACK", "ENGINEERING"];

export default function App() {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [time, setTime] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const text = "PARESH M S";
  const [displayed, setDisplayed] = useState("");
  const [colorMode, setColorMode] = useState(0);

  const colors = [
    "bg-gradient-to-b from-white via-gray-200 via-gray-500 to-black text-transparent bg-clip-text",
    "text-white",
    "bg-gradient-to-b from-black via-gray-500 via-gray-200 to-white text-transparent bg-clip-text",
  ];

  useEffect(() => {
    if (showWelcome || mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showWelcome, mobileMenu]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    function type() {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i < text.length) setTimeout(type, 200);
    }
    type();
  }, []);

  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
          <AnimatePresence>
            {showWelcome && (
              <WelcomeScreen onComplete={() => setShowWelcome(false)} />
            )}
          </AnimatePresence>

          <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 backdrop-blur-xl bg-black/20 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.jpg"
                alt="Paresh M S Logo"
                className="w-8 h-8 rounded-full object-cover border border-white/20 shadow-[0_0_12px_rgba(255,255,255,0.15)]"
              />

              <span className="text-[10px] md:text-xs tracking-[0.3em] text-white/70 uppercase font-medium">
                PARESH M S
              </span>
            </div>
            <ul className="hidden md:flex items-center gap-10 text-xs tracking-widest text-white/70 uppercase">
              <li
                onClick={() =>
                  document.getElementById("Home")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="relative hover:text-white transition-colors cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Home
              </li>

              <li
                onClick={() =>
                  document.getElementById("about")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="relative hover:text-white transition-colors cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                About
              </li>

              <li
                onClick={() =>
                  document.getElementById("showcase")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="relative hover:text-white transition-colors cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Showcase
              </li>

              <li
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="relative hover:text-white transition-colors cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Contact
              </li>
            </ul>

            <div className="hidden md:flex items-center gap-4 text-[10px] tracking-[0.25em] text-white/70 uppercase">
              <span className="flex items-center gap-1.5 text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Bengaluru, Karnataka
              </span>
              <span className="text-white/20">|</span>
              <span>{time}</span>
            </div>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden text-white z-50"
            >
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>


          {mobileMenu && (
            <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 text-white uppercase tracking-[0.3em] text-sm md:hidden">

              <div className="absolute top-24 text-center flex flex-col items-center gap-1">
                <span className="text-[10px] text-emerald-400/90 tracking-[0.25em] font-mono uppercase flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Bengaluru, Karnataka
                </span>
                <p className="text-[10px] text-white/40 tracking-[0.3em] mb-1">
                  TIME
                </p>

                <h2 className="text-2xl tracking-widest font-semibold">
                  {time}
                </h2>
              </div>

              <button
                onClick={() => {
                  document.getElementById("Home")?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setMobileMenu(false);
                }}
                className="relative after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
              >
                Home
              </button>

              <button
                onClick={() => {
                  document.getElementById("about")?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setMobileMenu(false);
                }}
                className="relative after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
              >
                About
              </button>

              <button
                onClick={() => {
                  document.getElementById("showcase")?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setMobileMenu(false);
                }}
                className="relative after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
              >
                Showcase
              </button>

              <button
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setMobileMenu(false);
                }}
                className="relative after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
              >
                Contact
              </button>

              <button
                onClick={() => {
                  navigate("/privacy");
                  setMobileMenu(false);
                }}
                className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-[0.25em] pt-4"
              >
                Privacy Policy
              </button>
            </div>
          )}

          <section
            id="Home"
            className="relative w-full h-screen min-h-[640px] overflow-hidden bg-black"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none translate-y-8 sm:translate-y-12 md:translate-y-16">
              <img
                src={heroEye}
                alt="Hero"
                className="h-[88%] w-[88%] sm:h-[90%] sm:w-[90%] md:h-[94%] md:w-[94%] object-contain object-center transition-all duration-300"
              />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 md:px-12 pt-24 pb-10">
              <h1
                onClick={() => setColorMode((prev) => (prev + 1) % colors.length)}
                className={`font-display uppercase leading-[0.85] tracking-[-0.03em] text-[16vw] sm:text-[13vw] md:text-[9.5vw] lg:text-[8.5rem] cursor-pointer transition-all duration-300 ${colors[colorMode]}`}
              >
                {displayed || "\u00A0"}
              </h1>

              <p className="md:absolute md:top-28 md:right-12
mt-4 md:mt-0
text-right
text-2xl sm:text-3xl md:text-3xl lg:text-4xl
leading-[1.1]
max-w-xs md:max-w-sm
font-[Poppins] font-extrabold uppercase
tracking-tight
text-transparent bg-clip-text
bg-[length:200%_auto]
bg-gradient-to-r
from-white via-white/70 to-white
animate-[shine_4s_linear_infinite]">
                AI &amp; ML
                <br />
                BUILDER
                <br />
                TURNING IDEAS
                <br />
                INTO SYSTEMS.
              </p>

              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-auto">
                <div className="flex flex-col gap-3 max-w-md">
                  <p className="text-sm sm:text-base lg:text-lg leading-relaxed font-[Poppins] font-medium tracking-wide text-transparent bg-clip-text bg-[length:200%_auto] bg-gradient-to-r from-white via-white/75 to-white animate-[shine_4s_linear_infinite]">
                    CSE (AI &amp; ML) student building AI-powered products
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase">
                    <div className="inline-flex items-center gap-2 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      <span>AVAILABLE FOR COLLABORATIONS</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-white/50">
                      <span className="text-white/20 hidden sm:inline">•</span>
                      <span>📍 Bengaluru, Karnataka</span>
                    </div>
                  </div>
                </div>

                <a
                  href="#showcase"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <button className="inline-flex items-center gap-3 border border-white/20 text-white px-6 py-3.5 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-white hover:text-black hover:border-white transition-all duration-300 rounded-full cursor-pointer shadow-lg active:scale-95">
                    EXPLORE PROJECTS
                    <ArrowUpRight size={16} />
                  </button>
                </a>
              </div>
            </div>
          </section>

          <div className="bg-black border-t border-white/10 py-5 overflow-hidden">
            <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
              {[...logos, ...logos, ...logos].map((logo, i) => (
                <span
                  key={i}
                  className="text-white/40 text-xs tracking-[0.3em] uppercase font-medium"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>


          <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}</style>

          <section id="about">
            <FrontendDeveloperSection />
          </section>
          <section id="showcase">
            <Showcase />
          </section>
          <section id="contact">
            <ContactSection />
          </section>
        </div>
      } 
    />

      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
    </Routes>

  );
}