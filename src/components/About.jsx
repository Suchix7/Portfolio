import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RetentionChart from "./RetentionChart";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance reveal for all stacked items
      gsap.from(".reveal-item", {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen bg-[#050505] text-white py-32 border-t border-white/5 overflow-hidden"
    >
      {/* Background Index Anchor */}
      <div className="absolute top-10 left-[-2%] text-[35vw] md:text-[35vw] font-black text-white/1 leading-none pointer-events-none select-none italic hidden sm:block">
        01
      </div>

      <div className="container relative z-10 px-6 sm:px-12 md:px-24 lg:px-40 mx-auto">
        {/* Changed to flex-col for a Top-Down layout */}
        <div className="flex flex-col space-y-24 md:space-y-32">
          {/* TOP: Massive Header Anchor */}
          <div className="w-full space-y-10">
            <div className="spec-line w-24 h-px bg-[#cbf902]" />
            <div className="font-mono text-[10px] tracking-[0.6em] text-[#cbf902] uppercase opacity-60">
              VoC_Research // Hook_Matrix // Structured_Testing
            </div>
            {/* Title expanded to full width for impact */}
            <h2 className="reveal-item text-2xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase italic leading-[0.9] tracking-[-0.03em]">
              The <span className="text-[#cbf902]">Creative Strategist</span>
            </h2>
          </div>

          {/* BOTTOM: Content Body & Metrics */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Descriptive Paragraph (Spans 7 columns) */}
            <div className="lg:col-span-7">
              <p className="reveal-item text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.25] tracking-tight text-white/90">
                I turn Voice-of-Customer research into{" "}
                <span className="italic font-black border-b-2 border-[#cbf902]/30 text-white">
                  high-converting
                </span>{" "}
                hooks, angles and VSL structures — then prove which one wins with structured, one-variable-at-a-time testing before a single extra dollar of Meta spend gets scaled behind it.
              </p>
            </div>

            {/* Metrics HUD & Retention Chart (Spans 5 columns) */}
            <div className="lg:col-span-5 flex flex-col gap-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
                <div className="reveal-item border-l border-white/10 pl-6 space-y-3 md:space-y-4 group hover:border-[#cbf902] transition-colors">
                  <span className="font-mono text-[8px] text-white/20 tracking-[0.4em] uppercase">
                    Metric_01
                  </span>
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-5xl md:text-6xl font-black italic tracking-tighter leading-none">
                      2X+
                    </h4>
                    <span className="text-[10px] font-mono text-white/20 uppercase">
                      Scale
                    </span>
                  </div>
                  <p className="text-[10px] md:text-[11px] text-white/40 leading-relaxed font-mono uppercase">
                    Scaling cold Meta ad spend budgets while maintaining acquisition efficiency.
                  </p>
                </div>

                <div className="reveal-item border-l border-white/10 pl-6 space-y-3 md:space-y-4 group hover:border-[#cbf902] transition-colors">
                  <span className="font-mono text-[8px] text-white/20 tracking-[0.4em] uppercase">
                    Metric_02
                  </span>
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-5xl md:text-6xl font-black italic tracking-tighter text-[#cbf902] leading-none">
                      4.5x
                    </h4>
                    <span className="text-[10px] font-mono text-white/20 uppercase">
                      Peak ROAS
                    </span>
                  </div>
                  <p className="text-[10px] md:text-[11px] text-white/40 leading-relaxed font-mono uppercase">
                    Achieved across VSL funnel architectures and direct-response campaigns.
                  </p>
                </div>
              </div>
              
              <div className="reveal-item">
                <RetentionChart />
              </div>
            </div>
          </div>

          {/* FOOTER: System Data Line */}
          <div className="reveal-item w-full pt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-white/5">
            <div className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase">
              Location: Kathmandu, NP // 27.7172° N, 85.3240° E
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {["Direct Response", "VSL Scripting", "VoC Research", "Hook Testing", "Meta Ads"].map((tech) => (
                <span
                  key={tech}
                  className={`font-mono uppercase transition-all border px-2 py-1 sm:px-3 ${
                    tech === "VSL Scripting" || tech === "Meta Ads" || tech === "Hook Testing"
                      ? "text-[#cbf902] border-[#cbf902]/40 bg-[#cbf902]/5 shadow-[0_0_24px_rgba(203,249,2,0.08)] text-[9px] sm:text-[16px] tracking-[0.15em] sm:tracking-[0.26em]"
                      : "text-white/30 border-white/10 text-[8px] sm:text-[15px] tracking-[0.1em] sm:tracking-[0.2em] hover:text-[#cbf902] hover:border-[#cbf902]/40"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
