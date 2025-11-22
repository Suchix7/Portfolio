import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Aperture,
  Code,
  Briefcase,
  Mail,
  Cpu,
  Globe,
  Zap,
  ArrowRight,
  User,
} from "lucide-react";

// --- Data for the Portfolio ---
const portfolioData = {
  name: "Sujal Chitrakar",
  role: "Frontend Web Developer",
  tagline:
    "Building beautiful, functional, and lightning-fast digital experiences.",
  about:
    "I am a dedicated frontend developer specializing in creating visually stunning and highly responsive web applications. With a passion for clean code and user-centric design, I transform ideas into seamless digital products. My core focus is on delivering pixel-perfect interfaces that delight users, leveraging modern frameworks like React and mastering the intricacies of browser performance.",
  skills: [
    { name: "React", icon: Code, level: "Expert" },
    { name: "TypeScript", icon: Cpu, level: "Advanced" },
    { name: "Tailwind CSS", icon: Globe, level: "Expert" },
    { name: "Next.js", icon: Zap, level: "Intermediate" },
    {
      name: "State Management (Context/Zustand)",
      icon: Aperture,
      level: "Advanced",
    },
    { name: "Performance Optimization", icon: Briefcase, level: "Focused" },
  ],
  projects: [
    {
      id: 1,
      title: "Quantum Dashboard",
      description:
        "A high-fidelity data visualization platform built with React and D3, featuring real-time updates and custom charting libraries.",
      tags: ["React", "D3.js", "Tailwind CSS"],
    },
    {
      id: 2,
      title: "Aura UI Library",
      description:
        "A set of customizable, accessible, and themeable UI components designed for rapid development across multiple projects.",
      tags: ["TypeScript", "NPM", "Storybook"],
    },
    {
      id: 3,
      title: "Pixel Perfect Landing Page",
      description:
        "An ultra-optimized marketing page focusing on SEO and blazing fast load times using Next.js static generation.",
      tags: ["Next.js", "SEO", "Responsive Design"],
    },
  ],
  contact: {
    email: "chitrakarsujal7@gmail.com",
    github: "https://github.com/Suchix7",
    linkedin: "https://www.linkedin.com/in/sujal-chitrakar/",
  },
};

// Custom Hook for Smooth Scrolling to Sections
const useScrollToSection = () => {
  const scrollTo = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset adjusted slightly for a fixed dock
      window.scrollTo({
        top: element.offsetTop - 60,
        behavior: "smooth",
      });
    }
  }, []);
  return scrollTo;
};

// --- Custom Hook for Scroll Reveal Animation ---
const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once visible
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      // Cleanup observer
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold]);

  return [ref, isVisible];
};

// --- Generic Animated Wrapper Component ---
const AnimatedSectionWrapper = ({ children, className = "" }) => {
  const [ref, isVisible] = useScrollReveal(0.2); // Reveal when 20% in view
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- Monochromatic Glassmorphism Card Component ---
const GlassCard = ({ children, className = "" }) => (
  // Opaque black background, soft white border, strong blur for glass effect
  <div
    className={`p-6 md:p-8 bg-neutral-900/60 backdrop-blur-xl border border-neutral-700/50 rounded-3xl shadow-2xl transition duration-300 ${className}`}
  >
    {children}
  </div>
);

// --- Section Components ---

const HeroSection = ({ scrollTo }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger initial fade-in animation
    setIsLoaded(true);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="text-center max-w-4xl space-y-6 md:space-y-8">
        {/* Name - Slides down on load */}
        <h1
          className={`text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-white leading-none transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          {portfolioData.name}
        </h1>
        {/* Role - Fades in shortly after */}
        <p
          className={`text-xl md:text-3xl font-light text-neutral-300 tracking-wider transition-all duration-1000 ease-out delay-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } animate-pulse`}
        >
          {portfolioData.role}
        </p>
        {/* Tagline & Button fade in later */}
        <div
          className={`transition-all duration-1000 ease-out delay-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto pt-4">
            {portfolioData.tagline}
          </p>
          <button
            onClick={() => scrollTo("projects")}
            className="mt-12 px-8 py-3 bg-white text-neutral-900 hover:bg-neutral-200 transition duration-300 rounded-full font-semibold text-lg shadow-xl shadow-white/20 flex items-center justify-center mx-auto space-x-2 transform hover:scale-[1.05] active:scale-[0.98] border border-neutral-700"
          >
            <span>View Featured Work</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section id="about" className="py-20 md:py-32 p-4 max-w-6xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
      About Me
    </h2>
    <AnimatedSectionWrapper className="max-w-4xl mx-auto">
      <GlassCard className="hover:bg-neutral-800/60">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-x-8 md:space-y-0">
          {/* Monochromatic icon background */}
          <div className="w-24 h-24 md:w-32 md:h-32 bg-neutral-800 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 border border-neutral-700">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="text-neutral-300 text-lg leading-relaxed text-center md:text-left">
            {portfolioData.about}
          </div>
        </div>
      </GlassCard>
    </AnimatedSectionWrapper>
  </section>
);

const SkillsSection = () => (
  <section id="skills" className="py-20 md:py-32 p-4 max-w-6xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
      Core Competencies
    </h2>
    <AnimatedSectionWrapper>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioData.skills.map((skill, index) => (
          <GlassCard
            key={index}
            className="flex items-center space-x-4 transform hover:translate-y-[-4px] hover:bg-neutral-800/60"
          >
            <skill.icon className="w-8 h-8 text-neutral-300 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
              <p className="text-sm text-neutral-500">{skill.level}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </AnimatedSectionWrapper>
  </section>
);

// --- New 3D Interactive Project Card Component ---
const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  // Calculates rotation based on mouse position relative to the card center
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = e.clientX - centerX;
    const y = e.clientY - centerY;

    // Map mouse distance to a small rotation angle (max 5 deg)
    const rotateX = (-y / rect.height) * 10;
    const rotateY = (x / rect.width) * 10;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
      boxShadow: `0 30px 60px rgba(255, 255, 255, 0.1), ${rotateY * 2}px ${
        -rotateX * 2
      }px 20px rgba(255, 255, 255, 0.1)`,
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
    });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // On mobile/touch, remove 3D effect and use a simple hover scale
      className="w-full relative transition-transform duration-100 ease-out md:hover:scale-[1.01]"
      style={tiltStyle}
    >
      <GlassCard className="transition-all duration-300 hover:bg-neutral-800/60">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-10 relative cursor-pointer">
          <div className="lg:w-2/3 space-y-4">
            <h3 className="text-3xl font-bold text-neutral-300">
              {project.title}
            </h3>
            <p className="text-neutral-400 text-lg">{project.description}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm font-medium bg-white/10 text-neutral-200 rounded-full border border-neutral-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:w-1/3 flex justify-start lg:justify-end">
            <button
              className={`flex items-center text-white font-medium transition-all duration-500 ${
                isHovered ? "translate-x-2" : "translate-x-0"
              }`}
            >
              Explore Case Study
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 md:py-32 p-4 max-w-6xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
        Featured Projects
      </h2>
      <AnimatedSectionWrapper>
        <div
          className="grid grid-cols-1 gap-10"
          style={{ perspective: "1000px" }}
        >
          {portfolioData.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </AnimatedSectionWrapper>
    </section>
  );
};

const ContactSection = () => (
  <section id="contact" className="py-20 md:py-32 p-4 max-w-6xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
      Get In Touch
    </h2>
    <AnimatedSectionWrapper>
      <GlassCard className="max-w-lg mx-auto text-center space-y-6 hover:bg-neutral-800/60">
        <p className="text-neutral-400 text-lg">
          I'm currently open to new frontend opportunities and collaborations.
          Let's build something amazing together.
        </p>
        <a
          href={`mailto:${portfolioData.contact.email}`}
          className="text-2xl font-semibold text-white hover:text-neutral-300 transition duration-300 block"
        >
          {portfolioData.contact.email}
        </a>
        <div className="flex justify-center space-x-6 pt-4">
          <a
            href={`https://${portfolioData.contact.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-white transition duration-300"
            aria-label="GitHub Profile"
          >
            {/* Mock GitHub SVG Icon */}
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.418 2.867 8.163 6.843 9.507.5.092.682-.217.682-.483 0-.237-.008-.887-.015-1.747-2.78.618-3.367-1.34-3.367-1.34-.454-1.15-.992-1.458-.992-1.458-.905-.619.068-.605.068-.605 1.002.07 1.53.992 1.53.992.89 1.529 2.34 1.088 2.91.832.092-.647.354-1.088.646-1.338-2.227-.253-4.56-1.121-4.56-4.99 0-1.1.388-1.996 1.026-2.693-.103-.253-.446-1.27.098-2.658 0 0 .837-.27 2.748 1.026A9.564 9.564 0 0112 6.844c.85.004 1.701.118 2.502.332 1.91-1.296 2.747-1.026 2.747-1.026.545 1.388.202 2.405.099 2.658.638.697 1.025 1.594 1.025 2.693 0 3.878-2.335 4.736-4.569 4.986.36.311.678.92.678 1.855 0 1.338-.012 2.42-.012 2.753 0 .267.18.577.688.484C20.873 20.187 24 16.443 24 12.017 24 6.484 19.522 2 14 2h-2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href={`https://${portfolioData.contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-white transition duration-300"
            aria-label="LinkedIn Profile"
          >
            {/* Mock LinkedIn SVG Icon */}
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.367-4-3.535-4 0v5.604h-3v-11h3v1.765c1.395-2.396 4-2.488 4-2.488 2.924 0 4 1.802 4 5.25v6.473z" />
            </svg>
          </a>
        </div>
      </GlassCard>
    </AnimatedSectionWrapper>
  </section>
);

// --- macOS Style Dock Navigation Component ---
const Dock = ({ scrollTo }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const dockRef = useRef(null);

  const navItems = [
    { id: "home", icon: Aperture, label: "Home" },
    { id: "about", icon: User, label: "About" },
    { id: "skills", icon: Cpu, label: "Skills" },
    { id: "projects", icon: Briefcase, label: "Projects" },
    { id: "contact", icon: Mail, label: "Contact" },
  ];

  return (
    <div
      ref={dockRef}
      // Darker glass dock for B&W theme
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 p-3 bg-neutral-900/70 backdrop-blur-3xl border border-neutral-700/50 rounded-3xl shadow-[0_20px_40px_-5px_rgba(0,0,0,0.8)] flex space-x-3 transition-all duration-300"
    >
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollTo(item.id)}
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
          className={`relative p-3 rounded-xl transition-all duration-300 ${
            // Scale and subtle highlight on hover
            hoveredItem === item.id
              ? "transform scale-150 bg-white/10"
              : "transform scale-100"
          }`}
          aria-label={item.label}
        >
          <item.icon className="w-6 h-6 text-white" />
          {hoveredItem === item.id && (
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs font-medium text-white bg-neutral-700 rounded-lg shadow-xl whitespace-nowrap opacity-100 transition duration-300 pointer-events-none">
              {item.label}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

// --- Main Application Component ---
const App = () => {
  const scrollTo = useScrollToSection();

  // Custom Cursor effect for added "cool factor"
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 font-sans relative overflow-x-hidden">
      {/* Background Gradient Effect - Removed colored blobs for B&W aesthetic */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-lighten filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neutral-700/10 rounded-full mix-blend-lighten filter blur-3xl animation-delay-2000 animate-blob"></div>
      </div>

      {/* Custom Cursor (The 'Apple-like' touch of polish) */}
      <div
        style={{ left: cursorPos.x, top: cursorPos.y }}
        // White dot with mix-blend-difference is perfect for B&W
        className="fixed w-4 h-4 bg-white rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-75 ease-out shadow-lg opacity-80"
      />

      <main className="relative z-10">
        <HeroSection scrollTo={scrollTo} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Dock scrollTo={scrollTo} />

      <footer className="py-8 text-center text-sm text-neutral-600 border-t border-white/5 mt-20">
        &copy; {new Date().getFullYear()} {portfolioData.name}. Crafted with
        React and a focus on detail.
      </footer>

      {/* CSS for custom font and blob animation */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          background-color: #0a0a0a; /* Deep neutral background */
        }
        html {
          scroll-behavior: smooth;
        }

        /* Subtle background animation */
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default App;
