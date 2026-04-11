import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: "MCLAREN-STRAT", category: "Performance UI", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2000&auto=format&fit=crop" },
  { id: 2, title: "APEX-VISION", category: "Motion System", image: "https://images.unsplash.com/photo-1618224395976-141440643794?q=80&w=2000&auto=format&fit=crop" },
  { id: 3, title: "CORE-ENGINE", category: "Digital Architecture", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop" },
  { id: 4, title: "VELOCITY-OS", category: "React Framework", image: "https://images.unsplash.com/photo-1614162692292-7ac56d7fd761?q=80&w=2000&auto=format&fit=crop" },
  { id: 5, title: "AERO-DYNAMICS", category: "Motion System", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop" },
  { id: 6, title: "QUANTUM-UI", category: "Performance UI", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000&auto=format&fit=crop" },
  { id: 7, title: "SYNTH-GRID", category: "E-Commerce", image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2000&auto=format&fit=crop" }
];

const Work = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const bgTextRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Calculate the total distance to scroll horizontally
      // (Total items - 1) * 100vw
      const totalWidth = (projects.length - 1) * window.innerWidth;

      // 1. Horizontal Pinning
      const pin = gsap.to(containerRef.current, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          // The end is the exact width of the scroll, ensuring no extra dead space
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        }
      });

      // 2. Background "SELECTED WORK" Parallax
      gsap.to(bgTextRef.current, {
        x: -400,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          containerAnimation: pin,
          scrub: true,
        }
      });

      // 3. Horizontal Progress Bar
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          containerAnimation: pin,
          scrub: true,
        }
      });

      // 4. Parallax Image Reveals
      projects.forEach((_, i) => {
        gsap.fromTo(`.work-img-${i}`,
          { scale: 1.5, filter: 'grayscale(100%)' },
          {
            scale: 1,
            filter: 'grayscale(100%)',
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
    <section ref={sectionRef} className="relative bg-[#0a0a0a] overflow-hidden">
      {/* Background Parallax Title */}
      <div
        ref={bgTextRef}
        className="absolute top-1/2 left-40 -translate-y-1/2 text-[35vw] font-black text-white/[0.015] uppercase pointer-events-none select-none z-0 whitespace-nowrap"
      >
        WORK WORK WORK WORK WORK
      </div>

      {/* Container width is calculated dynamically based on project length */}
      <div
        className="flex h-screen items-center relative z-10"
        ref={containerRef}
        style={{ width: `${projects.length * 100}vw` }}
      >
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={`work-card-${i} w-screen px-6 md:px-32 flex flex-col items-center justify-center relative`}
          >
            {/* The Image Container */}
            <div className="relative w-full max-w-5xl aspect-[16/9] overflow-hidden group border border-white/5">
              <img
                src={project.image}
                alt={project.title}
                className={`work-img-${i} absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:filter-none group-hover:scale-105`}
              />

              <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-700" />

              {/* Centered Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
                <div className="overflow-hidden mb-4">
                  <span className="block text-[#cbf902] font-mono uppercase tracking-[0.6em] text-[10px] translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    {project.category}
                  </span>
                </div>

                <div className="overflow-hidden">
                  <h3 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter translate-y-full group-hover:translate-y-0 transition-transform duration-700 delay-100">
                    {project.title}
                  </h3>
                </div>

                <div className="mt-8 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                  <div className="w-12 h-[1px] bg-white/30" />
                  <span className="text-white font-mono text-[9px] uppercase tracking-widest">View Concept</span>
                  <div className="w-12 h-[1px] bg-white/30" />
                </div>
              </div>
            </div>

            {/* Bottom HUD - Index */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-8 font-mono text-[10px] text-white/20 uppercase tracking-[0.5em]">
              <span className="text-[#cbf902] font-bold">0{project.id}</span>
              <div className="w-24 h-[1px] bg-white/5" />
              <span>0{projects.length}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Progress HUD Bar */}
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