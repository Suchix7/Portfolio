import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const Hero = () => {
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // 1. Entrance Animation
      tl.set(".hero-char", { yPercent: 120 })
        .to(".hero-char", {
          yPercent: 0,
          stagger: 0.02,
          duration: 1.5,
          delay: 0.3,
        })
        .from(
          ".hero-content-block",
          {
            opacity: 0,
            y: 60,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=1",
        );

      // 2. Interactive Parallax (Moves background elements opposite to mouse)
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = clientX / window.innerWidth - 0.5;
        const yPos = clientY / window.innerHeight - 0.5;

        // Move the name characters
        gsap.to(".hero-char", {
          x: (i) => xPos * (i * 2.5),
          y: (i) => yPos * (i * 1.5),
          rotateY: xPos * 10,
          duration: 2,
          ease: "power2.out",
        });

        // Move the background marquee slightly for depth
        gsap.to(".marquee-inner", {
          x: xPos * 50,
          y: yPos * 30,
          duration: 3,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleEnterStudio = () => {
    gsap.to(window, {
      duration: 1.8,
      scrollTo: "#work",
      ease: "expo.inOut",
    });
  };

  const wrapChars = (text) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="hero-char inline-block whitespace-pre will-change-transform"
      >
        {char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex  flex-col bg-[#0a0a0a] text-white px-6 sm:px-12 md:px-20 lg:px-32 overflow-hidden pt-32 md:pt-48"
    >
      {/* BACKGROUND LAYER 1: Subtle Technical Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* BACKGROUND LAYER 2: Moving Kinetic Marquee */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.03]">
        <div className="marquee-inner w-full rotate-[-5deg] scale-110">
          <div className="flex whitespace-nowrap animate-marquee font-black text-[20vw] leading-none uppercase tracking-tighter italic">
            <span>PRECISION SPEED PRECISION SPEED PRECISION SPEED&nbsp;</span>
            <span>PRECISION SPEED PRECISION SPEED PRECISION SPEED&nbsp;</span>
          </div>
        </div>
      </div>

      {/* 1. Header HUD */}
      <nav className="relative z-20 w-full py-6 flex  justify-between items-center font-mono text-[8px] tracking-[0.5em] text-white/30 uppercase mt-12">
        <span className="hidden sm:block">Portfolio_v2.0</span>
        <div className="hidden lg:block h-[1px] w-24 bg-white/10" />
        <span className="text-[#cbf902]/60 font-bold">
          SUJAL_CHITRAKAR // 2026
        </span>
      </nav>

      <div className="flex-1 gap-8  flex flex-col justify-center relative z-10 max-w-full">
        {/* 2. Main Typography Block */}
        <div className="relative mb-32 lg:mb-48 w-full">
          <h1 className="flex flex-col gap-2 font-[1000] tracking-[-0.06em] uppercase whitespace-nowrap leading-[0.8]">
            <div className="overflow-hidden text-[clamp(2rem,8vw,12rem)] md:text-[clamp(4rem,12vw,12rem)]">
              {wrapChars("SUJAL")}
            </div>
            <div className="text-[#cbf902] italic text-[clamp(1.9rem,8vw,19rem)] md:text-[clamp(3.2rem,9vw,10.5rem)] leading-[0.7] mt-[-0.05em] md:mt-[-0.1em]">
              {wrapChars("CHITRAKAR")}
            </div>
            <span className="sr-only">
              Web Designer & Digital Architect in Kathmandu, Nepal
            </span>
          </h1>

          {/* Coordinate HUD */}
          <div className="absolute -top-4 right-0 hidden xl:block text-right opacity-20 select-none">
            <p className="font-mono text-[9px] tracking-widest leading-loose border-t border-white/20 pt-2 uppercase">
              Lat: 27.7172° N<br />
              Long: 85.3240° E<br />
              Node: Kathmandu
            </p>
          </div>
        </div>

        {/* 3. Narrative Block */}
        <div className="hero-content-block w-full max-w-7xl mt-32 md:mt-48 lg:mt-64">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 ">
            <div className="flex-1 border-l-4 sm:border-l-10 border-[#cbf902] pl-6 md:pl-12 py-1">
              <p className="text-sm md:text-xl lg:text-[1.8rem] font-bold leading-[1.2] tracking-tight text-white/95 uppercase max-w-xl ">
                Developing digital products <br className="hidden md:block" />
                that define{" "}
                <span className="text-[#cbf902] italic border-b-2 border-[#cbf902]/30">
                  Performance
                </span>
                .
              </p>
              <div className="flex items-center gap-4 mt-6">
                <div className="w-10 h-[1px] bg-white/20" />
                <p className="text-white/40 font-mono text-[8px] md:text-[10px] tracking-[0.4em] uppercase">
                  Frontend Engineering // Design Systems
                </p>
              </div>
            </div>

            <button
              onClick={handleEnterStudio}
              className="group relative flex items-center gap-6 border border-white/10 px-6 py-4 md:px-12 md:py-7 transition-all duration-500 hover:border-[#cbf902] overflow-hidden bg-transparent"
            >
              <span className="relative z-10 text-[9px] md:text-xs font-black tracking-[0.5em] uppercase group-hover:text-black transition-colors duration-300">
                Enter Studio
              </span>
              <div className="absolute inset-0 bg-[#cbf902] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Footer HUD Line */}
      <div className="w-full h-[1px] bg-white/5 absolute bottom-24 left-0" />

      <footer className="w-full py-8 flex justify-between items-end opacity-20 pointer-events-none">
        <div className="space-y-1">
          <p className="text-[8px] font-mono tracking-widest uppercase">
            Kernel_Status: Active
          </p>
          <p className="text-[8px] font-mono tracking-widest uppercase">
            Render_Engine: 120fps
          </p>
        </div>
        <p className="text-[9px] font-mono tracking-[0.3em] uppercase hidden md:block">
          Precision meets motion © 2026
        </p>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
