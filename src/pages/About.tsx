import { motion } from "framer-motion";
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function About() {
  const navigate = useNavigate();
  const text = "About Myself";

  const [displayedText, setDisplayedText] = useState("");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [downloading, setDownloading] = useState(false);

  // TYPING EFFECT
  useEffect(() => {
    let index = 0;
    let interval: ReturnType<typeof setInterval>;

    const startTyping = () => {
      setDisplayedText("");
      interval = setInterval(() => {
        index++;
        setDisplayedText(text.slice(0, index));

        if (index === text.length) {
          clearInterval(interval);
          setTimeout(() => {
            index = 0;
            startTyping();
          }, 6000);
        }
      }, 40);
    };

    startTyping();
    return () => clearInterval(interval);
  }, []);

  // DOWNLOAD FUNCTION
  const handleDownload = () => {
    if (downloading) return;

    setDownloading(true);
    setCountdown(3);

    let time = 3;

    const timer = setInterval(() => {
      time--;
      setCountdown(time);

      if (time <= 0) {
        clearInterval(timer);

        // Create a complete HTML document for Resume
        const resumeHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paresh M S - Resume</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
        }

        body {
            font-family: 'Segoe UI', 'Helvetica Neue', Tahoma, Geneva, Verdana, sans-serif;
            background: #000000;
            padding: 24px;
            min-height: 100vh;
            color: #ffffff;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
        }

        .resume-wrapper {
            background: #0d0d0d;
            border: 1px solid #222222;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
        }

        .header {
            background: #000000;
            border-bottom: 2px solid #333333;
            padding: 40px;
            display: flex;
            gap: 32px;
            align-items: center;
        }

        .profile-photo {
            width: 130px;
            height: 130px;
            border-radius: 16px;
            border: 2px solid #444444;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
            flex-shrink: 0;
            object-fit: cover;
        }

        .header-content {
            flex: 1;
        }

        .header-content h1 {
            font-size: 38px;
            margin-bottom: 6px;
            font-weight: 800;
            letter-spacing: -0.5px;
            color: #ffffff;
        }

        .header-content .title {
            font-size: 15px;
            color: #b0b0b0;
            margin-bottom: 16px;
            font-weight: 500;
            letter-spacing: 0.5px;
        }

        .contact-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            font-size: 13px;
        }

        .contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            background: #1a1a1a;
            border-radius: 6px;
            border: 1px solid #333333;
        }

        .contact-icon {
            font-size: 14px;
            color: #94a3b8;
        }

        .contact-item a {
            color: #38bdf8;
            text-decoration: none;
            word-break: break-all;
        }

        .content {
            padding: 40px;
            background: #0d0d0d;
        }

        .section {
            margin-bottom: 32px;
        }

        .section:last-child {
            margin-bottom: 0;
        }

        .section-title {
            font-size: 16px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 2px solid #333333;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .summary-text {
            color: #d0d0d0;
            line-height: 1.8;
            font-size: 14px;
            background: #1a1a1a;
            padding: 20px;
            border-left: 3px solid #38bdf8;
            border-radius: 6px;
            border: 1px solid #2a2a2a;
        }

        .skills-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }

        .skill-category {
            background: #1a1a1a;
            padding: 18px;
            border-radius: 8px;
            border: 1px solid #2a2a2a;
        }

        .skill-category h3 {
            color: #ffffff;
            font-size: 13px;
            margin-bottom: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #94a3b8;
        }

        .skill-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .skill-tag {
            background: #262626;
            color: #e2e8f0;
            padding: 6px 12px;
            border-radius: 14px;
            font-size: 12px;
            font-weight: 500;
            border: 1px solid #3a3a3a;
        }

        .project {
            background: #1a1a1a;
            padding: 18px;
            border-radius: 8px;
            border: 1px solid #2a2a2a;
            border-left: 3px solid #38bdf8;
            margin-bottom: 14px;
        }

        .project:last-child {
            margin-bottom: 0;
        }

        .project h3 {
            color: #ffffff;
            font-size: 15px;
            margin-bottom: 8px;
            font-weight: 600;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .project p {
            color: #b0b0b0;
            font-size: 13px;
            line-height: 1.6;
        }

        .project .project-link {
            color: #38bdf8;
            font-size: 12px;
            text-decoration: none;
        }

        .education-item {
            background: #1a1a1a;
            padding: 18px;
            border-radius: 8px;
            border: 1px solid #2a2a2a;
            border-left: 3px solid #818cf8;
        }

        .education-item h3 {
            color: #ffffff;
            font-size: 15px;
            margin-bottom: 6px;
            font-weight: 600;
        }

        .education-item p {
            color: #94a3b8;
            font-size: 13px;
            line-height: 1.6;
        }

        @media (max-width: 768px) {
            .header {
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            .contact-info, .skills-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="resume-wrapper">
            <!-- Header -->
            <div class="header">
                <img src="/assets/paresh.jpeg" alt="Paresh M S" class="profile-photo">
                <div class="header-content">
                    <h1>Paresh M S</h1>
                    <p class="title">Computer Science Engineering (AI & ML) Student · Builder</p>
                    <div class="contact-info">
                        <div class="contact-item">
                            <span class="contact-icon">📍</span>
                            <span>Bengaluru, Karnataka, India</span>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">🔗</span>
                            <a href="https://www.linkedin.com/in/paresh-ms-30663a397" target="_blank">linkedin.com/in/paresh-ms-30663a397</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="content">
                <!-- Summary -->
                <section class="section">
                    <h2 class="section-title">Profile</h2>
                    <div class="summary-text">
                        Computer Science Engineering (AI & ML) undergraduate at Sapthagiri NPS University, Bengaluru (Expected Graduation: 2029). Pragmatic builder enthusiastic about transforming engineering ideas into functional products, intelligent systems, and AI-powered applications. Actively exploring software engineering, cloud architectures, cybersecurity fundamentals, and system design.
                    </div>
                </section>

                <!-- Technical Skills -->
                <section class="section">
                    <h2 class="section-title">Technical Skills & Expertise</h2>
                    <div class="skills-grid">
                        <div class="skill-category">
                            <h3>Programming & Development</h3>
                            <div class="skill-tags">
                                <span class="skill-tag">C</span>
                                <span class="skill-tag">C++</span>
                                <span class="skill-tag">Java</span>
                                <span class="skill-tag">Python</span>
                                <span class="skill-tag">JavaScript</span>
                                <span class="skill-tag">TypeScript</span>
                                <span class="skill-tag">React</span>
                                <span class="skill-tag">Tailwind CSS</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h3>AI / ML & Databases</h3>
                            <div class="skill-tags">
                                <span class="skill-tag">Generative AI</span>
                                <span class="skill-tag">LLM APIs</span>
                                <span class="skill-tag">Machine Learning</span>
                                <span class="skill-tag">MongoDB</span>
                                <span class="skill-tag">Supabase</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h3>Tools & Environment</h3>
                            <div class="skill-tags">
                                <span class="skill-tag">Git</span>
                                <span class="skill-tag">GitHub</span>
                                <span class="skill-tag">VS Code</span>
                                <span class="skill-tag">Android Studio</span>
                                <span class="skill-tag">Vite</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h3>Active Exploration</h3>
                            <div class="skill-tags">
                                <span class="skill-tag">Cloud & Systems</span>
                                <span class="skill-tag">Cybersecurity Concepts</span>
                                <span class="skill-tag">System Design</span>
                                <span class="skill-tag">R&D</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Projects -->
                <section class="section">
                    <h2 class="section-title">Key Projects</h2>
                    <div class="section-content">
                        <div class="project">
                            <h3>
                                <span>TenderLens AI</span>
                                <a href="https://tenderlens-henna.vercel.app/" target="_blank" class="project-link">tenderlens-henna.vercel.app ↗</a>
                            </h3>
                            <p>AI-powered tender analysis and evaluation platform designed to help users understand government procurement documents, eligibility conditions, technical requirements, and tender specifications.</p>
                        </div>
                        <div class="project">
                            <h3>
                                <span>TruthLens AI</span>
                                <a href="https://truthlens-ai-504546163848.asia-southeast1.run.app/" target="_blank" class="project-link">truthlens-ai.run.app ↗</a>
                            </h3>
                            <p>AI-powered deepfake detection platform focused on identifying manipulated or synthetic media through advanced deep learning and neural network analysis.</p>
                        </div>
                        <div class="project">
                            <h3>Farmora AI</h3>
                            <p>AI-powered smart farming assistant designed to assist farmers with crop health, disease identification, fertilizer recommendations, weather forecasts, and market insights.</p>
                        </div>
                    </div>
                </section>

                <!-- Hackathons & Competitions -->
                <section class="section">
                    <h2 class="section-title">Hackathons &amp; Competitions</h2>
                    <div class="section-content">
                        <div class="project">
                            <h3>
                                <span>Prompt Wars 2026 — AI Prompt Engineering</span>
                                <span style="font-size: 11px; color: #f59e0b; font-weight: 500;">3RD PLACE WINNER</span>
                            </h3>
                            <p><strong>Organizer:</strong> Dept. of CSE (AI & ML) · Sapthagiri NPS University · <strong>Date:</strong> 13 June 2026</p>
                            <p style="margin-top: 4px;">Awarded 3rd Place in Prompt Wars 2026, an AI Prompt Engineering Competition under the theme "Where Ideas Meet Intelligence", in collaboration with Error Zero.</p>
                        </div>
                        <div class="project">
                            <h3>
                                <span>Build Bengaluru Hackathon 2026</span>
                                <span style="font-size: 11px; color: #34d399; font-weight: 500;">PARTICIPANT</span>
                            </h3>
                            <p><strong>Organizer:</strong> HackBriven · <strong>Venue:</strong> Microsoft Office, Bengaluru (19 Sept 2026)</p>
                            <p style="margin-top: 4px;">Participated in an intensive 8-hour hackathon focused on rapid problem-solving, innovation, collaboration and building practical technology solutions under time constraints.</p>
                            <p style="font-size: 11px; color: #94a3b8; margin-top: 4px;">Partners: Qwen, Enter Pro, Dodo Payments</p>
                        </div>
                        <div class="project">
                            <h3>
                                <span>Adobe University Hackathon</span>
                                <span style="font-size: 11px; color: #f43f5e; font-weight: 500;">PARTICIPANT</span>
                            </h3>
                            <p><strong>Organizer:</strong> Adobe · Unstop · <strong>Date:</strong> 9 August 2026</p>
                            <p style="margin-top: 4px;">Participated in the nationwide Adobe University Hackathon representing Sapthagiri College of Engineering, developing creative technical prototypes and digital solutions.</p>
                        </div>
                        <div class="project">
                            <h3>
                                <span>Solution Challenge 2026: Build with AI</span>
                                <span style="font-size: 11px; color: #38bdf8; font-weight: 500;">PROTOTYPE SUBMISSION</span>
                            </h3>
                            <p><strong>Organizer:</strong> Hack2Skill (H2S) · <strong>Date:</strong> 22 July 2026</p>
                            <p style="margin-top: 4px;">Recognized for successful prototype submission in Solution Challenge 2026: Build with AI, showcasing innovation, practical AI engineering, and technical problem-solving.</p>
                            <p style="font-size: 11px; color: #94a3b8; margin-top: 4px;">Credential ID: 2026H2S07SCBWAI-PS08968</p>
                        </div>
                    </div>
                </section>

                <!-- Professional Certifications -->
                <section class="section">
                    <h2 class="section-title">Certifications</h2>
                    <div class="section-content">
                        <div class="project" style="border-left-color: #a855f7;">
                            <h3>
                                <span>HTML5 — The Language</span>
                                <span style="font-size: 11px; color: #c084fc; font-weight: 500;">INFOSYS SPRINGBOARD</span>
                            </h3>
                            <p><strong>Issuer:</strong> Infosys Limited · <strong>Issued:</strong> 25 May 2026</p>
                            <p style="margin-top: 4px;">Comprehensive course completion certification covering semantic HTML5 architecture, modern web standards, and accessible structure.</p>
                        </div>
                        <div class="project" style="border-left-color: #a855f7;">
                            <h3>
                                <span>CSS3</span>
                                <span style="font-size: 11px; color: #c084fc; font-weight: 500;">INFOSYS SPRINGBOARD</span>
                            </h3>
                            <p><strong>Issuer:</strong> Infosys Limited · <strong>Issued:</strong> 25 May 2026</p>
                            <p style="margin-top: 4px;">Course completion certification covering responsive web layouts, CSS3 animations, visual styling systems, and modern presentation standards.</p>
                        </div>
                    </div>
                </section>

                <!-- Honors & Community -->
                <section class="section">
                    <h2 class="section-title">Honors &amp; Community</h2>
                    <div class="section-content">
                        <div class="project" style="border-left-color: #f59e0b;">
                            <h3>
                                <span>CampusCrew 100K Milestone Honor</span>
                                <span style="font-size: 11px; color: #fbbf24; font-weight: 500;">VALUED MEMBER</span>
                            </h3>
                            <p><strong>Issuer:</strong> CampusCrew Community · <strong>Issued:</strong> 26 June 2026</p>
                            <p style="margin-top: 4px;">Honored for active contributions to the CampusCrew global builder community connecting 100,000+ student developers across 15+ countries.</p>
                        </div>
                        <div class="project" style="border-left-color: #38bdf8;">
                            <h3>
                                <span>Build with Bangalore — First Commit IRL</span>
                                <span style="font-size: 11px; color: #38bdf8; font-weight: 500;">ATTENDED</span>
                            </h3>
                            <p><strong>Organizer / Community:</strong> First Commit IRL · Bengaluru</p>
                            <p style="margin-top: 4px;">Attended Build with Bangalore by First Commit IRL — an in-person developer/community event focused on connecting builders, learning, networking and technology.</p>
                        </div>
                    </div>
                </section>

                <!-- Education -->
                <section class="section">
                    <h2 class="section-title">Education</h2>
                    <div class="education-item">
                        <h3>B.Tech - Computer Science Engineering (AI & ML)</h3>
                        <p>Sapthagiri NPS University, Bengaluru, Karnataka</p>
                        <p>Expected Graduation: 2029</p>
                    </div>
                </section>
            </div>
        </div>
    </div>
</body>
</html>
        `;

        const blob = new Blob([resumeHTML], {
          type: "text/html"
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "Paresh_MS_Resume.html";

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.open(url, "_blank");
        setTimeout(() => URL.revokeObjectURL(url), 10000);

        setDownloading(false);
        setCountdown(null);
      }
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden text-white px-4 sm:px-6 py-10">
      {/* ANIMATED BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl opacity-20" />
      </div>

      {/* BACK BUTTON */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate(-1)}
        className="
          fixed
          top-5
          left-5
          z-50
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-full
          border
          border-white/15
          bg-white/8
          backdrop-blur-xl
          hover:bg-white/15
          hover:border-white/30
          transition-all
          duration-300
          shadow-lg
          cursor-pointer
        "
      >
        <ArrowLeft size={18} />
        <span className="hidden sm:inline">Back</span>
      </motion.button>

      {/* MAIN CONTENT */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen gap-8">

        {/* IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col items-center"
        >
          <img
            src="/assets/paresh.jpeg"
            alt="Paresh M S"
            className="
              w-[200px]
              sm:w-[280px]
              md:w-[320px]
              rounded-2xl
              border
              border-white/15
              object-cover
              shadow-[0_20px_60px_rgba(0,0,0,0.6)]
              hover:border-white/25
              transition-all
              duration-300
            "
          />

          {/* DIVIDER LINE */}
          <div
            className="
              mt-6
              h-[1px]
              bg-gradient-to-r
              from-transparent
              via-white/20
              to-transparent
              w-[90vw]
              sm:w-[400px]
              md:w-[500px]
            "
          />
        </motion.div>

        {/* GLASS BOX CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            relative
            w-full
            max-w-4xl
            h-[500px]
            sm:h-[550px]
            md:h-[600px]
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-3xl
            overflow-hidden
            shadow-[0_20px_70px_rgba(0,0,0,0.5)]
            group
          "
        >
          {/* GLASS LIGHT EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* HEADER SECTION */}
          <div
            className="
              relative
              z-20
              flex
              items-center
              justify-center
              px-6
              py-6
              sm:py-8
              border-b
              border-white/10
              bg-black/30
              backdrop-blur-2xl
            "
          >
            <h1
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                font-extrabold
                tracking-tight
              "
            >
              {displayedText}
              <span className="animate-pulse ml-2">|</span>
            </h1>
          </div>

          {/* SCROLLABLE CONTENT */}
          <div
            className="
              relative
              z-10
              h-[calc(100%-80px)]
              overflow-y-auto
              px-6
              sm:px-10
              md:px-12
              py-8
              scrollbar-thin
              scrollbar-track-transparent
              scrollbar-thumb-white/10
              hover:scrollbar-thumb-white/20
            "
          >
            <div
              className="
                text-white/80
                text-sm
                sm:text-base
                leading-relaxed
                tracking-wide
                space-y-5
              "
            >
              <p>
                I am a Computer Science Engineering (AI & ML) student at Sapthagiri NPS University,
                Bengaluru, Karnataka, with an expected graduation in 2029. At my core, I am a builder who enjoys
                transforming conceptual ideas into functional, reliable, and user-centric products.
              </p>

              <p>
                My primary focus revolves around Artificial Intelligence, Machine Learning, and Full-Stack
                Software Development. Whether it's architecting intelligent platforms like TenderLens AI
                for automated procurement analysis, developing synthetic media detection mechanisms with
                TruthLens AI, or engineering smart agricultural assistants with Farmora AI, I prioritize
                practical utility, robust performance, and clean execution.
              </p>

              <p>
                I thrive in high-paced environments, actively participating in developer hackathons, technical
                workshops, and builder communities where rapid prototyping and collaborative problem-solving
                bring ambitious ideas to life under tight timelines.
              </p>

              <p>
                I am also enthusiastic about hands-on R&D, systems engineering, and cybersecurity
                principles, continually studying secure system design, scalable architecture, and emerging engineering
                paradigms.
              </p>

              <p>
                Driven by endless curiosity and an iterative engineering mindset, I believe great software is
                not just about writing code—it's about understanding real human problems, architecting intuitive
                interfaces, and delivering measurable impact.
              </p>

              <p>
                I treat engineering as a continuous loop of learning, building, testing, and refining.
                I am constantly experimenting with cutting-edge developer tools, modern frameworks, and
                intelligent systems to solve real-world problems.
              </p>
            </div>
          </div>
        </motion.div>

        {/* DOWNLOAD BUTTON */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.15,
          }}
          onClick={handleDownload}
          disabled={downloading}
          className="
            group
            relative
            overflow-hidden
            flex
            items-center
            justify-center
            gap-3
            px-8
            sm:px-10
            py-3
            sm:py-4
            rounded-2xl
            border
            border-white/15
            bg-white/8
            backdrop-blur-xl
            hover:bg-white/15
            hover:border-white/30
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition-all
            duration-300
            shadow-[0_10px_40px_rgba(0,0,0,0.4)]
            hover:shadow-[0_15px_50px_rgba(255,255,255,0.08)]
            cursor-pointer
          "
        >
          {/* BUTTON GLOW EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-all duration-500" />

          {/* BUTTON CONTENT */}
          <div className="relative z-10 flex items-center gap-3">
            <Download
              size={20}
              className="
                group-hover:scale-110
                group-hover:-translate-y-1
                transition-all
                duration-300
              "
            />
            <span className="font-semibold tracking-wide">
              {downloading ? `Downloading in ${countdown}s` : "Download Resume"}
            </span>
          </div>
        </motion.button>
      </div>
    </div>
  );
}