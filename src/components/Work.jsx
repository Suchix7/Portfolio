import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const allProjects = [
  { id: 1, title: "YUG TECH", category: "Ecommerce", image: "https://plus.unsplash.com/premium_photo-1680985551009-05107cd2752c?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", url: "https://yugindustries.com.np/" },
  { id: 2, title: "STORIES", category: "Bar & Lounge", image: "https://images.unsplash.com/photo-1690021416421-3ef951a6494d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFyJTIwYW5kJTIwbG91bmdlfGVufDB8fDB8fHww", url: "https://www.storiesloungenyc.com/" },
  { id: 3, title: "HACKAVERSE", category: "Hackathon", image: "https://images.unsplash.com/photo-1638029202288-451a89e0d55f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFja2F0aG9ufGVufDB8fDB8fHww", url: "https://hackaversev2.primeitclub.com/" },
  { id: 4, title: "4Donkeys", category: "Bar NYC", image: "https://images.unsplash.com/photo-1597290282695-edc43d0e7129?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFyfGVufDB8fDB8fHww", url: "https://www.4donkey.com.au/" },
  { id: 5, title: "PRIME IT CLUB", category: "CLUB WEBSITE", image: "https://images.unsplash.com/photo-1536148935331-408321065b18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fElUfGVufDB8fDB8fHww", url: "https://www.primeitclub.com/" },
];

const projects = allProjects.slice(0, 5);

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
          end: () => `+=${window.innerHeight * 4}`,
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
      <div className="absolute top-8 left-6 md:top-12 md:left-12 lg:left-20 z-50 pointer-events-none">
        <h2 className="text-white text-4xl md:text-6xl font-[1000] uppercase tracking-tighter leading-none">
          Works<span className="text-[#cbf902]">.</span>
        </h2>
        <div className="flex items-center gap-4 mt-3">
          <div className="w-8 h-[1px] bg-[#cbf902]/50" />
          <p className="text-white/40 font-mono text-[8px] md:text-[10px] tracking-[0.4em] uppercase">
            Selected Projects
          </p>
        </div>
      </div>
      {/* ---------------------------- */}

      <div
        ref={bgTextRef}
        className="absolute top-1/2 left-40 -translate-y-1/2 text-[35vw] font-black text-white/[0.015] uppercase pointer-events-none select-none z-0 whitespace-nowrap"
      >
        WORK WORK WORK WORK WORK
      </div>

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
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full max-w-5xl aspect-[9/16] md:aspect-[16/9] overflow-hidden group border border-white/5 block mt-12 md:mt-0"
            >
              <img
                src={project.image}
                alt={project.title}
                className={`work-img-${i} absolute inset-0 w-full h-full object-cover transition-all duration-1000 grayscale-0 md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-105`}
              />

              <div className="absolute inset-0 bg-black/20 md:bg-black/50 md:group-hover:bg-transparent transition-colors duration-700" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
                <div className="overflow-hidden mb-4">
                  <span className="block text-[#cbf902] font-mono uppercase tracking-[0.6em] text-[10px] translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500">
                    {project.category}
                  </span>
                </div>

                <div className="overflow-hidden">
                  <h3 className="text-white text-2xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-700 md:delay-100">
                    {project.title}
                  </h3>
                </div>

                <div className="mt-8 flex items-center gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 md:delay-300">
                  <div className="w-8 md:w-12 h-[1px] bg-white/50 md:bg-white/30" />
                  <span className="text-white font-mono text-[9px] uppercase tracking-widest drop-shadow-md md:drop-shadow-none">Visit Site</span>
                  <div className="w-8 md:w-12 h-[1px] bg-white/50 md:bg-white/30" />
                </div>
              </div>
            </a>

            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-8 font-mono text-[10px] text-white/20 uppercase tracking-[0.5em]">
              <span className="text-[#cbf902] font-bold">0{project.id}</span>
              <div className="w-24 h-[1px] bg-white/5" />
              <span>0{projects.length}</span>
            </div>

            {i === 0 && (
              <div className="absolute flex flex-col items-center bottom-8 left-1/2 -translate-x-1/2 md:static md:mt-8 md:translate-x-0 text-[#cbf902] font-mono text-[12px] md:text-[14px] uppercase tracking-widest text-center animate-pulse">
                Scroll Down
                <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[8px] md:border-l-[6px] md:border-r-[6px] md:border-t-[12px] border-transparent border-t-[#cbf902] mx-auto mt-2 animate-bounce"></div>
              </div>
            )}
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