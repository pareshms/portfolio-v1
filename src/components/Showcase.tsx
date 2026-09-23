import { useState, useRef, useCallback, useEffect } from "react";

const techStack = [
  { name: "C", icon: "https://cdn.simpleicons.org/c/A8B9CC", color: "#A8B9CC" },
  { name: "C++", icon: "https://cdn.simpleicons.org/cplusplus/00599C", color: "#00599C" },
  { name: "Java", icon: "https://cdn.simpleicons.org/openjdk/ED8B00", color: "#ED8B00" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB", color: "#3776AB" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E", color: "#F7DF1E" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6", color: "#3178C6" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB", color: "#61DAFB" },
  { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", color: "#06B6D4" },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248", color: "#47A248" },
  { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase/3ECF8E", color: "#3ECF8E" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032", color: "#F05032" },
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github/FFFFFF", color: "#FFFFFF" },
  { name: "Vite", icon: "https://cdn.simpleicons.org/vite/646CFF", color: "#646CFF" },
  { name: "VS Code", icon: "https://cdn.simpleicons.org/visualstudiocode/007ACC", color: "#007ACC" },
  { name: "Android Studio", icon: "https://cdn.simpleicons.org/androidstudio/3DDC84", color: "#3DDC84" },
];

export interface ProjectItem {
  title: string;
  description: string;
  tech: string;
  thumbnail: string;
  link?: string;
  github?: string;
}

const projects: ProjectItem[] = [
  {
    title: "TenderLens AI",
    description: "AI-powered tender analysis and evaluation platform designed to help users understand government procurement/tender documents, eligibility requirements, technical requirements and important tender information.",
    tech: "AI/LLM · React · Full-Stack",
    thumbnail: "/assets/project-tenderlens.svg",
    link: "https://tenderlens-henna.vercel.app/",
  },
  {
    title: "TruthLens AI",
    description: "AI-powered deepfake detection platform focused on identifying manipulated or synthetic media using advanced deep learning and neural network analysis.",
    tech: "Deep Learning · Python · AI/ML",
    thumbnail: "/assets/project-truthlens.jpg",
    link: "https://truthlens-ai-504546163848.asia-southeast1.run.app/",
  },
  {
    title: "Farmora AI",
    description: "AI-powered smart farming assistant designed to help farmers with crop-related information, disease identification, fertilizer recommendations, weather insights and multilingual assistance.",
    tech: "Generative AI · AgriTech · Full-Stack",
    thumbnail: "/assets/project-farmora.jpg",
  },
];

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  thumbnail: string;
  tag: string;
  description?: string;
}

const certificates: CertificateItem[] = [
  {
    id: "cert-html5",
    title: "HTML5 — The Language Course Completion Certificate",
    issuer: "Infosys Springboard · Infosys Limited",
    date: "25 May 2026",
    thumbnail: "/assets/cert-html5.jpg",
    tag: "Infosys Springboard",
    description: "Professional course completion certification covering semantic HTML5 architecture, modern web standards, and accessible structure.",
  },
  {
    id: "cert-css3",
    title: "CSS3 Course Completion Certificate",
    issuer: "Infosys Springboard · Infosys Limited",
    date: "25 May 2026",
    thumbnail: "/assets/cert-css3.jpg",
    tag: "Infosys Springboard",
    description: "Course completion certification covering responsive web layouts, CSS3 animations, visual styling systems, and modern presentation standards.",
  },
  {
    id: "cert-campuscrew",
    title: "CampusCrew 100K Milestone Honor",
    issuer: "CampusCrew Global Community",
    date: "26 June 2026",
    thumbnail: "/assets/cert-campuscrew.jpg",
    tag: "Community Honor",
    description: "Recognized as an integral contributor and valued member of the CampusCrew global builder community connecting 100,000+ student developers across 15+ countries.",
  },
  {
    id: "cert-cursor",
    title: "Building with Cursor Workshop Certificate",
    issuer: "OSCode · Cursor · WeSolve",
    date: "2026",
    thumbnail: "/assets/candidate_2_Paresh_M_S.png",
    tag: "Developer Workshop",
    description: "Certificate of completion for the hands-on Building with Cursor workshop, covering modern AI-assisted software engineering workflows.",
  },
];

export interface EventItem {
  id: string;
  title: string;
  organizer: string;
  date: string;
  location: string;
  badge: "PARTICIPANT" | "ATTENDED" | "3RD PLACE" | "WINNER";
  badgeColor: string;
  description: string;
  hasCertificate: boolean;
  certImage?: string;
  sponsors?: string[];
  type: string;
}

const events: EventItem[] = [
  {
    id: "prompt-wars-2026",
    title: "Prompt Wars 2026 — 3rd Place Winner",
    organizer: "Dept. of CSE (AI & ML) · Sapthagiri NPS University",
    date: "13 June 2026",
    location: "Sapthagiri NPS University, Bengaluru",
    badge: "3RD PLACE",
    badgeColor: "border-amber-500/40 text-amber-400 bg-amber-500/10",
    description:
      "Secured 3rd Place in Prompt Wars 2026, an intensive AI Prompt Engineering competition organized by the Department of CSE (AI & ML), Sapthagiri NPS University ('Where Ideas Meet Intelligence').",
    hasCertificate: true,
    certImage: "/assets/cert-prompt-wars.png",
    sponsors: ["Sapthagiri NPS University", "Error Zero"],
    type: "AI Competition",
  },
  {
    id: "build-bengaluru-2026",
    title: "Build Bengaluru Hackathon 2026",
    organizer: "HackBriven",
    date: "19 September 2026",
    location: "Microsoft Office, Bengaluru",
    badge: "PARTICIPANT",
    badgeColor: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
    description:
      "Participated in Build Bengaluru Hackathon 2026 at Microsoft Office, Bangalore. Powered by HackBriven, recognized for outstanding performance, innovation, and technical dedication.",
    hasCertificate: true,
    certImage: "/assets/cert-build-bengaluru.png",
    sponsors: ["Microsoft (Venue)", "Qwen", "Enter Pro", "Dodo Payments"],
    type: "Hackathon",
  },
  {
    id: "adobe-hackathon-2026",
    title: "Adobe University Hackathon",
    organizer: "Adobe · Unstop",
    date: "9 August 2026",
    location: "Sapthagiri College of Engineering / Virtual",
    badge: "PARTICIPANT",
    badgeColor: "border-rose-500/40 text-rose-400 bg-rose-500/10",
    description:
      "Participated in the Adobe University Hackathon organised by Adobe on Unstop. Represented Sapthagiri College of Engineering, building creative digital solutions and rapid prototypes.",
    hasCertificate: true,
    certImage: "/assets/cert-adobe-hackathon.png",
    sponsors: ["Adobe", "Unstop"],
    type: "University Hackathon",
  },
  {
    id: "solution-challenge-2026",
    title: "Solution Challenge 2026: Build with AI",
    organizer: "Hack2Skill (H2S)",
    date: "22 July 2026",
    location: "Online / National",
    badge: "PARTICIPANT",
    badgeColor: "border-sky-500/40 text-sky-400 bg-sky-500/10",
    description:
      "Successful prototype submission for Solution Challenge 2026: Build with AI, showcasing innovation, practical AI engineering and problem-solving.",
    hasCertificate: true,
    certImage: "/assets/cert-solution-challenge.jpg",
    sponsors: ["Hack2Skill", "Build with AI"],
    type: "Innovation Challenge",
  },
  {
    id: "build-with-bangalore-first-commit",
    title: "Build with Bangalore",
    organizer: "First Commit IRL",
    date: "2026",
    location: "Bengaluru",
    badge: "ATTENDED",
    badgeColor: "border-sky-500/40 text-sky-400 bg-sky-500/10",
    description:
      "Attended Build with Bangalore by First Commit IRL — an in-person developer/community event focused on connecting builders, learning, networking and technology.",
    hasCertificate: false,
    sponsors: ["First Commit Community", "Bengaluru Tech Hub"],
    type: "Developer Community",
  },
];

export interface ModalCertData {
  title: string;
  issuer: string;
  date: string;
  image: string;
  description?: string;
  tag?: string;
}

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

// ─── 3D Rotating Carousel: Projects ──────────────────────────────────────────
function ProjectCarousel({ items }: { items: ProjectItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const total = items.length;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isPaused || isDragging) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, isDragging, total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragStartY(e.touches[0].clientY);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (!isDragging) return;
    const diffX = e.touches[0].clientX - dragStartX;
    const diffY = e.touches[0].clientY - dragStartY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
      setDragOffset(diffX);
    }
  };

  const handleTouchEnd = (e?: React.TouchEvent) => {
    if (e) e.stopPropagation();
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = isMobile ? 35 : 50;
    if (dragOffset > threshold) handlePrev();
    else if (dragOffset < -threshold) handleNext();
    setDragOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 50;
    if (dragOffset > threshold) handlePrev();
    else if (dragOffset < -threshold) handleNext();
    setDragOffset(0);
  };

  return (
    <div
      className="relative w-full select-none py-2 sm:py-8 touch-pan-y"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        if (isDragging) handleMouseUp();
      }}
    >
      <div
        className="relative w-full h-[450px] sm:h-[500px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ perspective: isMobile ? "800px" : "1200px" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute w-72 h-72 sm:w-[420px] sm:h-[420px] rounded-full bg-white/[0.03] blur-3xl pointer-events-none -z-10" />

        {items.map((item, idx) => {
          let offset = idx - activeIndex;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const isActive = offset === 0;
          const isFar = Math.abs(offset) >= 2;

          const dragShift = isDragging ? dragOffset * (isMobile ? 0.4 : 0.25) : 0;
          const stepX = isMobile ? 180 : 280;
          const stepZ = isMobile ? 100 : 150;
          const angleY = isMobile ? 22 : 28;

          let translateX = offset * stepX + dragShift;
          let translateZ = -Math.abs(offset) * stepZ;
          let rotateY = -offset * angleY;
          let scale = isActive ? 1 : Math.max(isMobile ? 0.78 : 0.75, 1 - Math.abs(offset) * 0.16);
          let opacity = isActive ? 1 : Math.max(0.2, (isMobile ? 0.55 : 0.7) - Math.abs(offset) * 0.22);
          let zIndex = 30 - Math.abs(offset) * 5;

          if (isFar) {
            opacity = isMobile ? 0.08 : 0.18;
            translateZ = isMobile ? -190 : -280;
            translateX = offset * (isMobile ? 220 : 320) + dragShift;
          }

          return (
            <div
              key={idx}
              onClick={() => {
                if (!isActive) setActiveIndex(idx);
              }}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity: opacity,
                zIndex: Math.round(zIndex),
                transition: isDragging ? "none" : "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              className={`absolute w-[280px] sm:w-[350px] rounded-2xl border transition-shadow duration-500 overflow-hidden backdrop-blur-xl ${
                isActive
                  ? "border-white/30 bg-[#0e0e11]/90 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(255,255,255,0.06)] cursor-default"
                  : "border-white/12 bg-[#0c0c0e]/75 shadow-lg hover:border-white/25 cursor-pointer"
              }`}
            >
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

              <div className="relative h-40 sm:h-48 overflow-hidden bg-white/5">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    isActive ? "scale-100" : "scale-105 brightness-75"
                  }`}
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e11] via-black/40 to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="text-[9px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80">
                    {item.tech.split("·")[0]?.trim() || "Project"}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-white font-bold text-base sm:text-lg tracking-tight leading-snug drop-shadow-md">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex flex-col justify-between gap-3 sm:gap-4">
                <p className="text-xs text-white/65 leading-relaxed font-[Poppins] line-clamp-3">
                  {item.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/40 font-mono truncate max-w-[130px] sm:max-w-[160px]">
                    {item.tech}
                  </span>

                  <div className="flex items-center gap-1.5 sm:gap-2" onClick={(e) => e.stopPropagation()}>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Visit Live Application"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                        bg-white/10 border border-white/20 text-white text-[11px] font-medium
                        hover:bg-white hover:text-black hover:border-white 
                        transition-all duration-200 active:scale-95 shadow-sm"
                      >
                        <span>Live</span>
                        <ExternalLinkIcon />
                      </a>
                    )}
                    {item.github && (
                      <a
                        href={item.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View GitHub Repository"
                        className="flex items-center justify-center w-8 h-8 rounded-full 
                        bg-white/5 border border-white/15 text-white/60 
                        hover:bg-white/10 hover:text-white hover:border-white/30 
                        transition-all duration-200 active:scale-95"
                      >
                        <GithubIcon />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 sm:gap-6 mt-3">
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/15 text-white/70 hover:bg-white/15 hover:text-white hover:border-white/30 transition-all duration-200 active:scale-90 cursor-pointer shadow-lg backdrop-blur-md"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeIndex === i
                  ? "w-5 sm:w-6 h-1.5 sm:h-2 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/15 text-white/70 hover:bg-white/15 hover:text-white hover:border-white/30 transition-all duration-200 active:scale-90 cursor-pointer shadow-lg backdrop-blur-md"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="text-center mt-2.5">
        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/30">
          Swipe / Click side card to rotate
        </span>
      </div>
    </div>
  );
}

// ─── 3D Rotating Carousel: Certificates ──────────────────────────────────────
function CertificateCarousel({
  items,
  onOpenCert,
}: {
  items: CertificateItem[];
  onOpenCert: (cert: ModalCertData) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const total = items.length;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isPaused || isDragging) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, isDragging, total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragStartY(e.touches[0].clientY);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (!isDragging) return;
    const diffX = e.touches[0].clientX - dragStartX;
    const diffY = e.touches[0].clientY - dragStartY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
      setDragOffset(diffX);
    }
  };

  const handleTouchEnd = (e?: React.TouchEvent) => {
    if (e) e.stopPropagation();
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = isMobile ? 35 : 50;
    if (dragOffset > threshold) handlePrev();
    else if (dragOffset < -threshold) handleNext();
    setDragOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 50;
    if (dragOffset > threshold) handlePrev();
    else if (dragOffset < -threshold) handleNext();
    setDragOffset(0);
  };

  return (
    <div
      className="relative w-full select-none py-2 sm:py-8 touch-pan-y"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        if (isDragging) handleMouseUp();
      }}
    >
      <div
        className="relative w-full h-[450px] sm:h-[500px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ perspective: isMobile ? "800px" : "1200px" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute w-72 h-72 sm:w-[420px] sm:h-[420px] rounded-full bg-purple-500/[0.04] blur-3xl pointer-events-none -z-10" />

        {items.map((item, idx) => {
          let offset = idx - activeIndex;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const isActive = offset === 0;
          const isFar = Math.abs(offset) >= 2;

          const dragShift = isDragging ? dragOffset * (isMobile ? 0.4 : 0.25) : 0;
          const stepX = isMobile ? 180 : 280;
          const stepZ = isMobile ? 100 : 150;
          const angleY = isMobile ? 22 : 28;

          let translateX = offset * stepX + dragShift;
          let translateZ = -Math.abs(offset) * stepZ;
          let rotateY = -offset * angleY;
          let scale = isActive ? 1 : Math.max(isMobile ? 0.78 : 0.75, 1 - Math.abs(offset) * 0.16);
          let opacity = isActive ? 1 : Math.max(0.2, (isMobile ? 0.55 : 0.7) - Math.abs(offset) * 0.22);
          let zIndex = 30 - Math.abs(offset) * 5;

          if (isFar) {
            opacity = isMobile ? 0.08 : 0.18;
            translateZ = isMobile ? -190 : -280;
            translateX = offset * (isMobile ? 220 : 320) + dragShift;
          }

          const openThisCert = () => {
            onOpenCert({
              title: item.title,
              issuer: item.issuer,
              date: item.date,
              image: item.thumbnail,
              description: item.description,
              tag: item.tag,
            });
          };

          return (
            <div
              key={idx}
              onClick={() => {
                if (!isActive) {
                  setActiveIndex(idx);
                } else {
                  openThisCert();
                }
              }}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity: opacity,
                zIndex: Math.round(zIndex),
                transition: isDragging ? "none" : "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              className={`absolute w-[280px] sm:w-[350px] rounded-2xl border transition-shadow duration-500 overflow-hidden backdrop-blur-xl ${
                isActive
                  ? "border-white/30 bg-[#0e0e11]/90 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(168,85,247,0.12)] cursor-pointer"
                  : "border-white/12 bg-[#0c0c0e]/75 shadow-lg hover:border-white/25 cursor-pointer"
              }`}
            >
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent pointer-events-none" />

              <div className="relative h-44 sm:h-52 overflow-hidden bg-black/40 flex items-center justify-center p-2 group">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className={`w-full h-full object-contain rounded-lg transition-transform duration-700 ${
                    isActive ? "scale-100 group-hover:scale-105" : "scale-95 brightness-75"
                  }`}
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e11] via-black/20 to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3">
                  <span className="text-[9px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-purple-400/30 text-purple-200">
                    {item.tag}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex flex-col justify-between gap-3">
                <div>
                  <h3 className="text-white font-bold text-sm sm:text-base tracking-tight leading-snug drop-shadow-md line-clamp-2 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-[11px] uppercase tracking-wider font-mono text-white/50">
                    {item.issuer}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-white/40 font-mono">
                    📅 {item.date}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openThisCert();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                    bg-white/10 border border-white/20 text-white text-[11px] font-medium
                    hover:bg-white hover:text-black hover:border-white 
                    transition-all duration-200 active:scale-95 cursor-pointer shadow-sm"
                  >
                    <EyeIcon />
                    <span>View</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 sm:gap-6 mt-3">
        <button
          onClick={handlePrev}
          aria-label="Previous Certificate"
          className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/15 text-white/70 hover:bg-white/15 hover:text-white hover:border-white/30 transition-all duration-200 active:scale-90 cursor-pointer shadow-lg backdrop-blur-md"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeIndex === i
                  ? "w-5 sm:w-6 h-1.5 sm:h-2 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next Certificate"
          className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/15 text-white/70 hover:bg-white/15 hover:text-white hover:border-white/30 transition-all duration-200 active:scale-90 cursor-pointer shadow-lg backdrop-blur-md"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="text-center mt-2.5">
        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/30">
          Swipe / Click card to view certificate
        </span>
      </div>
    </div>
  );
}

// ─── 3D Rotating Carousel: Events & Hackathons ───────────────────────────────
function EventCarousel({
  items,
  onOpenCert,
}: {
  items: EventItem[];
  onOpenCert: (cert: ModalCertData) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const total = items.length;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isPaused || isDragging) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, isDragging, total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragStartY(e.touches[0].clientY);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (!isDragging) return;
    const diffX = e.touches[0].clientX - dragStartX;
    const diffY = e.touches[0].clientY - dragStartY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
      setDragOffset(diffX);
    }
  };

  const handleTouchEnd = (e?: React.TouchEvent) => {
    if (e) e.stopPropagation();
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = isMobile ? 35 : 50;
    if (dragOffset > threshold) handlePrev();
    else if (dragOffset < -threshold) handleNext();
    setDragOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 50;
    if (dragOffset > threshold) handlePrev();
    else if (dragOffset < -threshold) handleNext();
    setDragOffset(0);
  };

  return (
    <div
      className="relative w-full select-none py-2 sm:py-8 touch-pan-y"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        if (isDragging) handleMouseUp();
      }}
    >
      <div
        className="relative w-full h-[470px] sm:h-[510px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ perspective: isMobile ? "800px" : "1200px" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute w-72 h-72 sm:w-[420px] sm:h-[420px] rounded-full bg-sky-500/[0.04] blur-3xl pointer-events-none -z-10" />

        {items.map((item, idx) => {
          let offset = idx - activeIndex;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const isActive = offset === 0;
          const isFar = Math.abs(offset) >= 2;

          const dragShift = isDragging ? dragOffset * (isMobile ? 0.4 : 0.25) : 0;
          const stepX = isMobile ? 180 : 280;
          const stepZ = isMobile ? 100 : 150;
          const angleY = isMobile ? 22 : 28;

          let translateX = offset * stepX + dragShift;
          let translateZ = -Math.abs(offset) * stepZ;
          let rotateY = -offset * angleY;
          let scale = isActive ? 1 : Math.max(isMobile ? 0.78 : 0.75, 1 - Math.abs(offset) * 0.16);
          let opacity = isActive ? 1 : Math.max(0.2, (isMobile ? 0.55 : 0.7) - Math.abs(offset) * 0.22);
          let zIndex = 30 - Math.abs(offset) * 5;

          if (isFar) {
            opacity = isMobile ? 0.08 : 0.18;
            translateZ = isMobile ? -190 : -280;
            translateX = offset * (isMobile ? 220 : 320) + dragShift;
          }

          const openEventCert = () => {
            if (item.hasCertificate && item.certImage) {
              onOpenCert({
                title: item.title,
                issuer: item.organizer,
                date: item.date,
                image: item.certImage,
                description: item.description,
                tag: item.type,
              });
            }
          };

          return (
            <div
              key={idx}
              onClick={() => {
                if (!isActive) {
                  setActiveIndex(idx);
                } else if (item.hasCertificate) {
                  openEventCert();
                }
              }}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity: opacity,
                zIndex: Math.round(zIndex),
                transition: isDragging ? "none" : "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              className={`absolute w-[290px] sm:w-[360px] h-[400px] sm:h-[430px] rounded-2xl border transition-shadow duration-500 overflow-hidden backdrop-blur-xl flex flex-col justify-between p-5 sm:p-6 ${
                isActive
                  ? "border-white/30 bg-[#0e0e11]/90 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(56,189,248,0.1)] cursor-pointer"
                  : "border-white/12 bg-[#0c0c0e]/75 shadow-lg hover:border-white/25 cursor-pointer"
              }`}
            >
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400/40 to-transparent pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 truncate">
                    {item.type}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[9px] font-mono font-semibold tracking-[0.2em] uppercase shrink-0 ${item.badgeColor}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-white font-bold text-base sm:text-lg tracking-tight leading-snug mb-1.5 line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-[11px] uppercase tracking-wider font-mono text-white/50 mb-3 truncate">
                  By <span className="text-white/80 font-medium">{item.organizer}</span>
                </p>

                <div className="flex flex-wrap items-center gap-2 mb-3 text-[10px] text-white/60 font-mono">
                  <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded truncate max-w-[130px]">
                    📅 {item.date}
                  </span>
                  <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded truncate max-w-[170px]">
                    📍 {item.location}
                  </span>
                </div>

                <p className="text-xs text-white/65 leading-relaxed font-[Poppins] line-clamp-3 mb-3">
                  {item.description}
                </p>

                {item.sponsors && (
                  <div className="pt-2.5 border-t border-white/10">
                    <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-white/40 block mb-1.5">
                      Partners &amp; Sponsors
                    </span>
                    <div className="flex flex-wrap gap-1.5 max-h-12 overflow-hidden">
                      {item.sponsors.map((sp) => (
                        <span
                          key={sp}
                          className="text-[9px] font-mono bg-white/[0.04] border border-white/10 px-2 py-0.5 rounded text-white/70"
                        >
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-auto">
                {item.hasCertificate ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openEventCert();
                    }}
                    className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.15em] uppercase text-white hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 px-3.5 py-1.5 rounded-lg transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
                  >
                    <span className="text-amber-400">★</span>
                    <span>View Certificate</span>
                    <EyeIcon />
                  </button>
                ) : (
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/40">
                    In-Person Event
                  </span>
                )}
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
                  Verified
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 sm:gap-6 mt-3">
        <button
          onClick={handlePrev}
          aria-label="Previous Event"
          className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/15 text-white/70 hover:bg-white/15 hover:text-white hover:border-white/30 transition-all duration-200 active:scale-90 cursor-pointer shadow-lg backdrop-blur-md"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeIndex === i
                  ? "w-5 sm:w-6 h-1.5 sm:h-2 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next Event"
          className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/15 text-white/70 hover:bg-white/15 hover:text-white hover:border-white/30 transition-all duration-200 active:scale-90 cursor-pointer shadow-lg backdrop-blur-md"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="text-center mt-2.5">
        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/30">
          Swipe / Click card to rotate
        </span>
      </div>
    </div>
  );
}

// ─── 3D Dome Sphere Tech Stack ────────────────────────────────────────────────
function TechGrid() {
  const rotX = useRef(0.3);
  const rotY = useRef(0);
  const velX = useRef(0);
  const velY = useRef(0.004);
  const isDragging = useRef(false);
  const lastMX = useRef(0);
  const lastMY = useRef(0);
  const dragVX = useRef(0);
  const dragVY = useRef(0);
  const rafId = useRef<number | undefined>(undefined);
  const itemEls = useRef<HTMLDivElement[]>([]);

  const RADIUS = 160;
  const n = techStack.length;

  const positions = useRef<{ x: number; y: number; z: number }[]>([]);
  useEffect(() => {
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    positions.current = Array.from({ length: n }, (_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });
  }, [n]);

  function project(pos: { x: number; y: number; z: number }, rx: number, ry: number) {
    const cosY = Math.cos(ry), sinY = Math.sin(ry);
    const x1 = pos.x * cosY - pos.z * sinY;
    const z1 = pos.x * sinY + pos.z * cosY;
    const cosX = Math.cos(rx), sinX = Math.sin(rx);
    const y2 = pos.y * cosX - z1 * sinX;
    const z2 = pos.y * sinX + z1 * cosX;
    return { x: x1, y: y2, z: z2 };
  }

  useEffect(() => {
    const els = itemEls.current;

    function render() {
      if (!isDragging.current) {
        rotY.current += velY.current;
        rotX.current += velX.current;
        velX.current *= 0.97;
        velY.current = velY.current * 0.99 + 0.004 * 0.01;
        if (rotX.current > 0.6) velX.current -= 0.0005;
        if (rotX.current < -0.1) velX.current += 0.0005;
      }

      const projected = positions.current.map((pos, i) => ({
        el: els[i],
        p: project(pos, rotX.current, rotY.current),
      }));

      projected
        .slice()
        .sort((a, b) => a.p.z - b.p.z)
        .forEach(({ el, p }, idx) => {
          if (!el) return;
          const x = p.x * RADIUS + 210 - 36;
          const y = p.y * RADIUS + 210 - 36;
          const depth = (p.z + 1) / 2;
          const opacity = 0.25 + depth * 0.75;
          const scale = 0.55 + depth * 0.55;
          el.style.cssText = `position:absolute;left:${x}px;top:${y}px;opacity:${opacity};transform:scale(${scale});z-index:${idx};width:72px;height:72px;`;
        });

      rafId.current = requestAnimationFrame(render);
    }

    rafId.current = requestAnimationFrame(render);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMX.current = e.clientX;
    lastMY.current = e.clientY;
    dragVX.current = 0;
    dragVY.current = 0;
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastMX.current;
      const dy = e.clientY - lastMY.current;
      dragVX.current = dy * 0.005;
      dragVY.current = dx * 0.005;
      rotX.current += dragVX.current;
      rotY.current += dragVY.current;
      lastMX.current = e.clientX;
      lastMY.current = e.clientY;
    };
    const onMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      velX.current = dragVX.current;
      velY.current = dragVY.current;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    lastMX.current = e.touches[0].clientX;
    lastMY.current = e.touches[0].clientY;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - lastMX.current;
    const dy = e.touches[0].clientY - lastMY.current;
    rotX.current += dy * 0.005;
    rotY.current += dx * 0.005;
    lastMX.current = e.touches[0].clientX;
    lastMY.current = e.touches[0].clientY;
  };

  const onTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 select-none">
      <p className="text-[11px] font-mono text-white/40 uppercase tracking-[0.25em] mb-4">
        Interactive 3D Sphere · Drag to Rotate
      </p>

      <div
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          width: 420,
          height: 420,
          position: "relative",
          cursor: "grab",
          touchAction: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 30,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 60%, transparent 100%)",
            boxShadow:
              "0 0 60px 10px rgba(255,255,255,0.03), inset 0 0 40px rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "absolute", inset: 0 }}>
          {techStack.map((tech, i) => (
            <div
              key={tech.name}
              ref={(el) => {
                if (el) itemEls.current[i] = el;
              }}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 72,
                height: 72,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "auto",
                willChange: "transform, opacity",
              }}
            >
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 16,
                  background: "rgba(18, 18, 22, 0.85)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = tech.color || "#ffffff";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 16px ${tech.color}55`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.12)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.6)";
                }}
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  loading="lazy"
                  style={{ width: 28, height: 28, objectFit: "contain" }}
                />
                <span
                  style={{
                    fontSize: 8.5,
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    textAlign: "center",
                    lineHeight: 1.1,
                  }}
                >
                  {tech.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div
          className="absolute inset-0 pointer-events-none rounded-full"
          style={{ boxShadow: "inset 0 0 80px 40px rgba(0,0,0,0.7)" }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
type TabId = "projects" | "events" | "certificates" | "tech";

const tabs: { id: TabId; label: string }[] = [
  { id: "projects", label: "Projects" },
  { id: "events", label: "Hackathons & Events" },
  { id: "certificates", label: "Certificates" },
  { id: "tech", label: "Tech Stack" },
];

export default function ShowcaseSection() {
  const [active, setActive] = useState<TabId>("projects");
  const [selectedCert, setSelectedCert] = useState<ModalCertData | null>(null);
  const [animKey, setAnimKey] = useState(0);

  const switchTab = useCallback(
    (id: TabId) => {
      if (id === active) return;
      setActive(id);
      setAnimKey((k) => k + 1);
    },
    [active]
  );

  const activePillLeft =
    active === "projects"
      ? "4px"
      : active === "events"
      ? "calc(25% + 1px)"
      : active === "certificates"
      ? "calc(50% - 1px)"
      : "calc(75% - 3px)";

  return (
    <section className="relative w-full min-h-[85vh] md:min-h-screen bg-black overflow-hidden text-white px-4 sm:px-8 md:px-16 lg:px-24 py-0 md:py-12 -mt-16 sm:mt-0 md:mt-12">
      <div className="relative z-10 flex flex-col items-center max-w-6xl mx-auto">
        {/* Label */}
        <div className="relative flex items-center justify-center gap-4 mb-5 opacity-0 animate-[fadeSlideDown_0.8s_ease_forwards]">
          <div className="relative overflow-hidden">
            <div className="w-10 h-px bg-white/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[lineMove_2s_linear_infinite]" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.45em] text-white/35 font-mono">
            Showcase
          </span>
          <div className="relative overflow-hidden">
            <div className="w-10 h-px bg-white/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[lineMove_2s_linear_infinite]" />
          </div>
        </div>

        {/* Heading */}
        <div className="relative overflow-hidden mb-12">
          <h1
            className="text-center font-black tracking-tight leading-none drop-shadow-[0_0_25px_rgba(255,255,255,0.15)] text-white opacity-0 whitespace-nowrap animate-[headingReveal_1s_cubic-bezier(0.22,1,0.36,1)_0.15s_forwards]"
            style={{ fontSize: "clamp(32px,6vw,80px)" }}
          >
            <span className="inline-block bg-gradient-to-b from-white via-white to-white/45 bg-clip-text text-transparent">
              Portfolio Showcase
            </span>
          </h1>
        </div>

        {/* Tab Switcher */}
        <div
          className="relative flex items-center p-1.5 rounded-full border border-white/20 bg-white/[0.08] mb-14 w-full max-w-2xl opacity-0 animate-[fadeSlideUp_0.6s_ease_0.3s_forwards] shadow-2xl shadow-black/40 overflow-x-auto scrollbar-none"
          style={{ backdropFilter: "blur(30px)" }}
        >
          <div
            className="absolute top-1.5 bottom-1.5 rounded-full bg-white/20 border border-white/40 transition-[left] duration-300 ease-out shadow-xl shadow-white/10 pointer-events-none"
            style={{
              width: "calc(25% - 2px)",
              left: activePillLeft,
              backdropFilter: "blur(15px)",
            }}
          />
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className="relative z-10 flex-1 h-12 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-colors duration-200 cursor-pointer px-2"
            >
              <span
                className={
                  active === tab.id
                    ? "text-white font-semibold"
                    : "text-white/40 hover:text-white/70"
                }
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Content area */}
        <div
          key={animKey}
          className="w-full opacity-0 animate-[contentIn_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards]"
        >
          {active === "projects" && (
            <ProjectCarousel items={projects} />
          )}

          {active === "events" && (
            <EventCarousel
              items={events}
              onOpenCert={(cert) => setSelectedCert(cert)}
            />
          )}

          {active === "certificates" && (
            <CertificateCarousel
              items={certificates}
              onOpenCert={(cert) => setSelectedCert(cert)}
            />
          )}

          {active === "tech" && (
            <div
              className="opacity-0"
              style={{ animation: "fadeSlideUp 0.5s ease forwards" }}
            >
              <TechGrid />
            </div>
          )}
        </div>

        {/* Certificate Modal Lightbox (VIEW ONLY - NO DOWNLOAD) */}
        {selectedCert && (
          <div
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-[#0c0c10] border border-white/20 rounded-3xl p-5 sm:p-7 shadow-[0_25px_80px_rgba(0,0,0,0.95)] text-white overflow-hidden animate-[contentIn_0.3s_ease_forwards] max-h-[92vh] flex flex-col"
            >
              {/* Top ambient highlight */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />

              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300 font-bold shrink-0">
                    ★
                  </div>
                  <div>
                    {selectedCert.tag && (
                      <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-purple-300/80 block">
                        {selectedCert.tag}
                      </span>
                    )}
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                      {selectedCert.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/15 transition-colors cursor-pointer shrink-0"
                  aria-label="Close Modal"
                >
                  ✕
                </button>
              </div>

              {/* Certificate Image Frame */}
              <div className="relative rounded-2xl border border-white/15 bg-black/80 overflow-hidden flex items-center justify-center p-2 sm:p-4 mb-4 flex-1 min-h-[220px] max-h-[62vh]">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-auto max-h-[58vh] object-contain rounded-lg shadow-2xl"
                />
              </div>

              {/* Meta & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs font-mono">
                <div className="flex items-center gap-4 text-white/60 text-[11px]">
                  <span>By: <strong className="text-white/90">{selectedCert.issuer}</strong></span>
                  <span>📅 {selectedCert.date}</span>
                </div>

                <div className="flex items-center gap-3 justify-end">
                  <a
                    href={selectedCert.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono tracking-wider transition-colors cursor-pointer shadow-sm"
                  >
                    <span>Open Full Size</span>
                    <ExternalLinkIcon />
                  </a>

                  <button
                    onClick={() => setSelectedCert(null)}
                    className="px-5 py-2 rounded-xl bg-white hover:bg-white/90 text-black text-xs font-mono tracking-wider font-semibold transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes contentIn {
          from { opacity: 0; transform: translateY(32px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes headingReveal {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineMove {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
