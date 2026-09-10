import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Info } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SplitTest = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [voted, setVoted] = useState(null);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const ctx = gsap.context(() => {
      // Reveal container elements when they intersect the viewport
      gsap.from(".split-anim-header", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".split-card", {
        opacity: 0,
        scale: 0.95,
        y: 30,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]);

  const handleVote = (option) => {
    if (voted) return; // Prevent voting twice
    setVoted(option);
  };

  return (
    <section
      id="split-test"
      ref={sectionRef}
      className="relative min-h-screen bg-[#090909] text-white py-32 px-6 sm:px-12 md:px-24 border-t border-white/5 overflow-hidden"
    >
      {/* Background HUD grids */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header HUD */}
        <div className="split-anim-header space-y-6 mb-16 md:mb-24">
          <div className="w-20 h-px bg-[#cbf902]" />
          <div className="font-mono text-[9px] tracking-[0.5em] text-[#cbf902] uppercase opacity-75">
            Simulation_Engine // Direct_Response
          </div>
          <h2 className="text-4xl sm:text-6xl font-[1000] uppercase italic tracking-tight">
            Creative <span className="text-[#cbf902]">Split Test</span>
          </h2>
          <p className="max-w-2xl text-white/50 text-xs sm:text-sm leading-relaxed">
            One variable, isolated: same offer, same budget, two opening hooks. Cast your vote, then see how each scored on Hook Rate (3-sec view rate) and Hold Rate (15-sec+ retention) once the test ran.
          </p>
        </div>

        {/* The Cards Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 w-full"
        >
          {/* Option A */}
          <div
            onClick={() => handleVote("A")}
            className={`split-card relative rounded-2xl border transition-all duration-500 overflow-hidden cursor-pointer group flex flex-col bg-[#111] ${
              voted
                ? "border-white/5 pointer-events-none"
                : "border-white/10 hover:border-white/30 hover:shadow-[0_10px_30px_rgba(255,255,255,0.02)]"
            }`}
          >
            {/* Content Top */}
            <div className="relative z-10 p-6 sm:p-8 pb-0 flex justify-between items-start">
              <span className="font-mono text-[9px] text-white/30 border border-white/10 px-2 py-0.5 uppercase tracking-widest">
                Option_A
              </span>
              <span className="font-mono text-[9px] text-white/40 tracking-wider">
                Production: High
              </span>
            </div>

            {/* Thumbnail — a proper, contained photo instead of a full-bleed background */}
            <div className="relative z-10 px-6 sm:px-8 pt-5">
              <div className="relative w-full max-w-[220px] sm:max-w-[260px] mx-auto aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-black/40">
                <img
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800"
                  alt="Cinematic Brand Ad Thumbnail"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </div>

            {/* Content Bottom */}
            <div className="relative z-10 p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-2">
                Cinematic Product Showreel
              </h3>
              <p className="text-white/40 text-xs tracking-tight">
                Slow-motion lighting, pristine styling, generic transition layouts.
              </p>
            </div>

            {/* Results Overlay */}
            <div className={`absolute inset-0 z-20 bg-[#0c0c0c] flex flex-col justify-between p-6 sm:p-8 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              voted
                ? "translate-y-0 opacity-100 pointer-events-auto"
                : "translate-y-full opacity-0 pointer-events-none"
            }`}>
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30">
                  Creative_A // Metrics
                </span>
                <span className="font-mono text-[9px] text-red-500 border border-red-500/20 bg-red-500/5 px-2 py-0.5 uppercase font-bold tracking-widest">
                  Failed Protocol
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 my-auto">
                <div className="space-y-1">
                  <span className="block font-mono text-[7px] text-white/20 uppercase tracking-widest">Hook Rate</span>
                  <span className="text-xl sm:text-3xl font-black italic tracking-tighter text-white/60">14%</span>
                </div>
                <div className="space-y-1 border-l border-white/5 pl-4">
                  <span className="block font-mono text-[7px] text-white/20 uppercase tracking-widest">Hold Rate</span>
                  <span className="text-xl sm:text-3xl font-black italic tracking-tighter text-white/60">6%</span>
                </div>
                <div className="space-y-1 border-l border-white/5 pl-4">
                  <span className="block font-mono text-[7px] text-white/20 uppercase tracking-widest">CPA</span>
                  <span className="text-xl sm:text-3xl font-black italic tracking-tighter text-white/60">$48.5</span>
                </div>
              </div>

              <p className="text-white/40 text-[10px] sm:text-xs leading-relaxed flex gap-2 items-start pt-4 border-t border-white/5">
                <Info className="w-3.5 h-3.5 text-red-500/70 shrink-0 mt-0.5" />
                A 14% Hook Rate means most of the feed scrolls straight past — polished visuals don't disrupt the pattern. Cost per acquisition stays unsustainable.
              </p>
            </div>
          </div>

          {/* Option B */}
          <div
            onClick={() => handleVote("B")}
            className={`split-card relative rounded-2xl border transition-all duration-500 overflow-hidden cursor-pointer group flex flex-col bg-[#111] ${
              voted
                ? "border-white/5 pointer-events-none"
                : "border-white/10 hover:border-white/30 hover:shadow-[0_10px_30px_rgba(203,249,2,0.02)]"
            }`}
          >
            {/* Content Top */}
            <div className="relative z-10 p-6 sm:p-8 pb-0 flex justify-between items-start">
              <span className="font-mono text-[9px] text-[#cbf902] border border-[#cbf902]/20 bg-[#cbf902]/5 px-2 py-0.5 uppercase tracking-widest">
                Option_B
              </span>
              <span className="font-mono text-[9px] text-white/40 tracking-wider">
                Production: Raw UGC
              </span>
            </div>

            {/* Thumbnail — a proper, contained photo instead of a full-bleed background */}
            <div className="relative z-10 px-6 sm:px-8 pt-5">
              <div className="relative w-full max-w-[220px] sm:max-w-[260px] mx-auto aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-black/40">
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800"
                  alt="Direct Response UGC Thumbnail"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </div>

            {/* Content Bottom */}
            <div className="relative z-10 p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-2">
                3-Sec UGC Pain Hook
              </h3>
              <p className="text-white/40 text-xs tracking-tight">
                Authentic script hooks, iPhone recording, pattern interrupts, and visual overlays.
              </p>
            </div>

            {/* Results Overlay */}
            <div className={`absolute inset-0 z-20 bg-[#0c0c0c] flex flex-col justify-between p-6 sm:p-8 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              voted
                ? "translate-y-0 opacity-100 pointer-events-auto"
                : "translate-y-full opacity-0 pointer-events-none"
            }`}>
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-[#cbf902]/40">
                  Creative_B // Metrics
                </span>
                <span className="font-mono text-[9px] text-[#cbf902] border border-[#cbf902]/20 bg-[#cbf902]/5 px-2 py-0.5 uppercase font-bold tracking-widest">
                  Winning Protocol
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 my-auto">
                <div className="space-y-1">
                  <span className="block font-mono text-[7px] text-white/20 uppercase tracking-widest">Hook Rate</span>
                  <span className="text-xl sm:text-3xl font-black italic tracking-tighter text-[#cbf902] drop-shadow-[0_0_8px_rgba(203,249,2,0.3)]">38%</span>
                </div>
                <div className="space-y-1 border-l border-white/5 pl-4">
                  <span className="block font-mono text-[7px] text-white/20 uppercase tracking-widest">Hold Rate</span>
                  <span className="text-xl sm:text-3xl font-black italic tracking-tighter text-white">31%</span>
                </div>
                <div className="space-y-1 border-l border-white/5 pl-4">
                  <span className="block font-mono text-[7px] text-white/20 uppercase tracking-widest">CPA</span>
                  <span className="text-xl sm:text-3xl font-black italic tracking-tighter text-white">$19.2</span>
                </div>
              </div>

              <p className="text-[#cbf902]/85 text-[10px] sm:text-xs leading-relaxed flex gap-2 items-start pt-4 border-t border-white/5">
                <Check className="w-4 h-4 text-[#cbf902] shrink-0 mt-0.5" />
                A 38% Hook Rate stops the scroll cold, and a 31% Hold Rate proves the story earns the next 15 seconds — the pair Meta's algorithm rewards with cheaper delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Feedback Area */}
        {voted && (
          <div className="mt-12 p-5 bg-[#111111] border border-white/5 rounded-xl font-mono text-[10px] sm:text-xs tracking-wider uppercase text-white/60 flex justify-center text-center animate-pulse">
            {voted === "B"
              ? "⚡ Accurate! Creative Strategy scales spend through consumer psychology, not vanity aesthetics."
              : "⚠️ incorrect. Aesthetically pleasing reels suffer CPM bloat. Pain-point angles drive ROAS."}
          </div>
        )}
      </div>
    </section>
  );
};

export default SplitTest;
