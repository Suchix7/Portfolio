import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "META SCALER",
    category: "2x Spend Scale",
    niche: "SaaS / Analytics Dashboard",
    challenge: "CPA rose 40% past $3k/day spend",
    angle: "Mechanism-led hook + social proof pillar",
    result: "ROAS 4.1x",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    url: "#",
  },
  {
    id: 2,
    title: "VSL ARCHITECT",
    category: "High-Ticket Funnel",
    niche: "Coaching / High-Ticket Offer",
    challenge: "Cold traffic dropping off before the offer",
    angle: "Hook → Retain → Reward VSL spine",
    result: "Hold Rate 34%",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1600&auto=format&fit=crop",
    url: "#",
  },
  {
    id: 3,
    title: "HOOK SYSTEM",
    category: "Dynamic Matrix",
    niche: "DTC Supplements",
    challenge: "Creative fatigue every 9-11 days",
    angle: "6-angle hook matrix, isolated variable tests",
    result: "Hook Rate 38%",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    url: "#",
  },
  {
    id: 4,
    title: "RETENTION LAB",
    category: "VSL Editing Style",
    niche: "DTC Footwear / Apparel",
    challenge: "Standard edits held under 20% watch time",
    angle: "Pattern-interrupt cutdowns, caption pacing",
    result: "65% Retention",
    image: "https://images.unsplash.com/photo-1626379616459-b2ce1d9decbc?q=80&w=1600&auto=format&fit=crop",
    url: "#",
  },
];

// The strategy behind the mockup — shown as a compact brief so each
// case study reads as a real diagnosis, not just a styled screenshot.
const StrategyBreakdown = ({ project }) => (
  <div className="border-t border-white/5 bg-[#0d0d0d] px-4 py-4 sm:px-6 sm:py-5">
    <div className="flex items-center justify-between mb-3">
      <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-[0.3em] text-white/25">
        Client_Niche
      </span>
      <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-white/60">
        {project.niche}
      </span>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      <div className="border-l border-white/10 pl-3">
        <span className="block font-mono text-[7px] uppercase tracking-[0.25em] text-white/25 mb-1">
          Challenge
        </span>
        <span className="block text-[11px] sm:text-xs text-white/70 leading-snug">
          {project.challenge}
        </span>
      </div>
      <div className="border-l border-white/10 pl-3">
        <span className="block font-mono text-[7px] uppercase tracking-[0.25em] text-white/25 mb-1">
          Strategic Angle
        </span>
        <span className="block text-[11px] sm:text-xs text-white/70 leading-snug">
          {project.angle}
        </span>
      </div>
      <div className="border-l border-[#cbf902]/40 pl-3">
        <span className="block font-mono text-[7px] uppercase tracking-[0.25em] text-[#cbf902]/60 mb-1">
          Result
        </span>
        <span className="block text-[11px] sm:text-xs text-[#cbf902] font-bold leading-snug">
          {project.result}
        </span>
      </div>
    </div>
  </div>
);

const Work = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const bgTextRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Horizontal Pinning
      const pin = gsap.to(containerRef.current, {
        x: () => -(containerRef.current.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${window.innerHeight * 3}`,
          invalidateOnRefresh: true,
        }
      });

      // 2. Background Parallax
      gsap.to(bgTextRef.current, {
        x: -400,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          containerAnimation: pin,
          scrub: true,
        }
      });

      // 3. Progress Bar
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          containerAnimation: pin,
          scrub: true,
        }
      });

      // 4. Image Parallax Reveal
      projects.forEach((_, i) => {
        gsap.fromTo(`.work-img-${i}`,
          { scale: 1.4 },
          {
            scale: 1,
            scrollTrigger: {
              trigger: `.work-card-${i}`,
              containerAnimation: pin,
              scrub: true,
              start: "left right",
              end: "center center"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative bg-[#0a0a0a] overflow-hidden">

      {/* --- NEW TITLE ADDED HERE --- */}
      <div className="absolute top-6 left-4 sm:top-8 sm:left-6 md:top-12 md:left-12 lg:left-20 z-50 pointer-events-none">
        <h2 className="text-white text-2xl sm:text-5xl md:text-6xl font-[1000] uppercase tracking-tighter leading-none">
          Campaigns<span className="text-[#cbf902]">.</span>
        </h2>
        <div className="flex items-center gap-4 mt-3">
          <div className="w-8 h-[1px] bg-[#cbf902]/50" />
          <p className="text-white/40 font-mono text-[8px] md:text-[10px] tracking-[0.4em] uppercase">
            Creative Case Studies
          </p>
        </div>
      </div>
      {/* ---------------------------- */}

      <div
        ref={bgTextRef}
        className="absolute top-1/2 left-40 -translate-y-1/2 text-[35vw] font-black text-white/[0.015] uppercase pointer-events-none select-none z-0 whitespace-nowrap"
      >
        SCALE ROAS HOOK VSL SCALE
      </div>

      <div
        className="flex h-screen items-center relative z-10"
        ref={containerRef}
        style={{ width: `${projects.length * 100}vw` }}
      >
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={`work-card-${i} w-screen shrink-0 px-6 md:px-32 flex flex-col items-center justify-center relative`}
          >
            {project.id % 2 === 1 ? (
              /* META AD POST MOCKUP */
              <div className="relative w-full max-w-4xl border border-white/5 bg-[#111] rounded-2xl overflow-hidden flex flex-col group mt-12 md:mt-0 shadow-2xl">
                {/* Mockup Header */}
                <div className="flex justify-between items-center p-4 border-b border-white/5 bg-[#141414] font-mono text-[9px] uppercase tracking-wider text-white/50">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#cbf902] text-black font-black flex items-center justify-center text-[10px] italic">
                      S
                    </div>
                    <div>
                      <span className="block font-bold text-white tracking-wide">Sujal_Chitrakar // Strategist</span>
                      <span className="block text-[7px] text-white/30 lowercase mt-0.5">Sponsored • Meta_Feed</span>
                    </div>
                  </div>
                  <div className="text-[14px] text-white/40 leading-none">•••</div>
                </div>
                
                {/* Main image container */}
                <div className="relative w-full aspect-[16/9] max-h-[46vh] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`work-img-${i} absolute inset-0 w-full h-full object-cover transition-all duration-1000 grayscale-0 md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 bg-black/20 md:bg-black/50 md:group-hover:bg-transparent transition-colors duration-700" />
                  
                  {/* Dynamic Title overlay on top of image */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <div className="overflow-hidden mb-2">
                      <span className="block text-[#cbf902] font-mono uppercase tracking-[0.6em] text-[8px] sm:text-[10px]">
                        {project.category}
                      </span>
                    </div>
                    <div className="overflow-hidden w-full px-2">
                      <h3 className="text-white text-[clamp(1.5rem,4.5vw,4rem)] md:text-[clamp(2.5rem,6vw,6rem)] font-black uppercase tracking-tighter break-words">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Mockup Footer */}
                <div className="flex justify-between items-center p-4 bg-[#141414] border-t border-white/5 font-mono text-[9px]">
                  <div className="space-y-0.5">
                    <span className="block text-white/20 uppercase tracking-widest text-[7px]">Meta_Campaign</span>
                    <span className="block text-white/80 font-bold text-[10px]">{project.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/40 hidden sm:block tracking-widest text-[8px]">{project.result}</span>
                    <div className="border border-[#cbf902]/30 px-4 py-2 bg-[#cbf902]/5 hover:bg-[#cbf902] hover:text-black transition-all duration-300 font-bold text-white text-[9px] uppercase tracking-widest rounded-sm">
                      Learn_More
                    </div>
                  </div>
                </div>

                <StrategyBreakdown project={project} />
              </div>
            ) : (
              /* VSL VIDEO PLAYER MOCKUP */
              <div className="relative w-full max-w-4xl border border-white/5 bg-[#111] rounded-2xl overflow-hidden flex flex-col group mt-12 md:mt-0 shadow-2xl">
                {/* Mockup Header */}
                <div className="flex justify-between items-center p-3 border-b border-white/5 bg-[#141414] font-mono text-[8px] uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                    <span className="text-white/60 font-bold">LIVE // VSL_Script_Stream</span>
                  </div>
                  <div className="text-white/20">Speed: 1.0X</div>
                </div>
                
                {/* Main image container */}
                <div className="relative w-full aspect-[16/9] max-h-[46vh] overflow-hidden bg-black">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`work-img-${i} absolute inset-0 w-full h-full object-cover transition-all duration-1000 grayscale-0 md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 bg-black/30 md:bg-black/60 md:group-hover:bg-transparent transition-colors duration-700" />
                  
                  {/* Centered Play Button overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[#cbf902] bg-[#cbf902]/10 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(203,249,2,0.3)]">
                      <svg className="w-6 h-6 md:w-8 md:h-8 fill-[#cbf902] translate-x-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>

                    <div className="overflow-hidden mb-2">
                      <span className="block text-[#cbf902] font-mono uppercase tracking-[0.6em] text-[8px] sm:text-[10px]">
                        {project.category}
                      </span>
                    </div>
                    <div className="overflow-hidden w-full px-2">
                      <h3 className="text-white text-[clamp(1.5rem,4.5vw,4rem)] md:text-[clamp(2.5rem,6vw,6rem)] font-black uppercase tracking-tighter break-words">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Video controls bottom bar */}
                  <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-2 z-20">
                    {/* Progress scrubber bar */}
                    <div className="h-[2px] w-full bg-white/10 relative cursor-pointer">
                      <div className="absolute left-0 top-0 h-full w-[45%] bg-[#cbf902]" />
                      <div className="absolute left-[45%] -top-1 w-2.5 h-2.5 rounded-full bg-[#cbf902] shadow-[0_0_8px_#cbf902] scale-0 group-hover:scale-100 transition-transform duration-200" />
                    </div>
                    <div className="flex justify-between items-center font-mono text-[8px] text-white/60">
                      <div className="flex items-center gap-4">
                        <span className="hover:text-white transition-colors cursor-pointer">▶</span>
                        <span className="hover:text-white transition-colors cursor-pointer">🔊</span>
                        <span>02:14 / 05:00</span>
                      </div>
                      <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                        <span>[HD] View Script Blueprint</span>
                      </div>
                    </div>
                  </div>
                </div>

                <StrategyBreakdown project={project} />
              </div>
            )}

            <div className="mt-8 flex items-center gap-8 font-mono text-[10px] text-white/20 uppercase tracking-[0.5em]">
              <span className="text-[#cbf902] font-bold">0{project.id}</span>
              <div className="w-24 h-[1px] bg-white/5" />
              <span>0{projects.length}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 z-20">
        <div
          ref={progressRef}
          className="h-full bg-[#cbf902] origin-left scale-x-0"
        />
      </div>
    </section>
  );
};

export default Work;