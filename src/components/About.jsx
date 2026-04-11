import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
        }
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
      <div className="absolute top-10 left-[-2%] text-[35vw] md:text-[35vw] font-black text-white/[0.01] leading-none pointer-events-none select-none italic hidden sm:block">
        01
      </div>

      <div className="container relative z-10 px-6 md:px-20 lg:px-32 mx-auto">
        {/* Changed to flex-col for a Top-Down layout */}
        <div className="flex flex-col space-y-24 md:space-y-32">

          {/* TOP: Massive Header Anchor */}
          <div className="w-full space-y-10">
            <div className="spec-line w-24 h-[1px] bg-[#cbf902]" />
            <div className="font-mono text-[10px] tracking-[0.6em] text-[#cbf902] uppercase opacity-60">
              Identity_Core // System_Log
            </div>
            {/* Title expanded to full width for impact */}
            <h2 className="reveal-item text-[9vw] md:text-[10vw] font-black uppercase italic leading-[0.8] tracking-[-0.04em]">
              The <span className="text-[#cbf902]">Architect</span>
            </h2>
          </div>

          {/* BOTTOM: Content Body & Metrics */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Descriptive Paragraph (Spans 7 columns) */}
            <div className="lg:col-span-7">
              <p className="reveal-item text-2xl md:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight text-white/90">
                I specialize in developing <span className="italic font-black border-b-2 border-[#cbf902]/30 text-white">High-Performance</span> digital systems. By merging mathematical precision with organic motion, I define the next era of interface design.
              </p>
            </div>

            {/* Metrics HUD (Spans 5 columns) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
              <div className="reveal-item border-l border-white/10 pl-6 space-y-3 md:space-y-4 group hover:border-[#cbf902] transition-colors">
                <span className="font-mono text-[8px] text-white/20 tracking-[0.4em] uppercase">Log_01</span>
                <div className="flex items-baseline gap-2">
                  <h4 className="text-5xl md:text-6xl font-black italic tracking-tighter leading-none">03+</h4>
                  <span className="text-[10px] font-mono text-white/20 uppercase">Years</span>
                </div>
                <p className="text-[10px] md:text-[11px] text-white/40 leading-relaxed font-mono uppercase">
                  Focused on MERN & Motion Engineering.
                </p>
              </div>

              <div className="reveal-item border-l border-white/10 pl-6 space-y-3 md:space-y-4 group hover:border-[#cbf902] transition-colors">
                <span className="font-mono text-[8px] text-white/20 tracking-[0.4em] uppercase">Log_02</span>
                <div className="flex items-baseline gap-2">
                  <h4 className="text-5xl md:text-6xl font-black italic tracking-tighter text-[#cbf902] leading-none">20+</h4>
                  <span className="text-[10px] font-mono text-white/20 uppercase">Units</span>
                </div>
                <p className="text-[10px] md:text-[11px] text-white/40 leading-relaxed font-mono uppercase">
                  Global System Deployments.
                </p>
              </div>
            </div>
          </div>

          {/* FOOTER: System Data Line */}
          <div className="reveal-item w-full pt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-white/5">
            <div className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase">
              Location: Kathmandu, NP // 27.7172° N, 85.3240° E
            </div>
            <div className="flex gap-4">
              {['React', 'GSAP', 'Next', 'Node'].map((tech) => (
                <span key={tech} className="text-[10px] sm:text-[18px] font-mono text-white/30 px-3 py-1 border border-white/10 uppercase hover:text-[#cbf902] hover:border-[#cbf902] transition-all">
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