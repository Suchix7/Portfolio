import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { name: "Instagram", url: "https://www.instagram.com/sujal_chitrakar" },
  { name: "LinkedIn", url: "https://linkedin.com/in/sujal-chitrakar" },
  { name: "Github", url: "https://github.com/Suchix7" },
];
const Contact = () => {
  const sectionRef = useRef(null);
  const magneticButton = useRef(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };
    const timer = setInterval(updateClock, 1000);
    updateClock();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });

      tl.from(".reveal-item", {
        yPercent: 110,
        rotateX: -15,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out",
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      clearInterval(timer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center bg-[#0a0a0a] overflow-hidden border-t border-white/5"
    >
      {/* Background HUD Grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="z-10 w-full px-6 text-center flex flex-col items-center gap-2 sm:gap-4go md:gap-10">
        <div className="w-full max-w-fit mx-auto space-y-0">
          <div className="overflow-hidden py-1 px-4">
            <h2 className="reveal-item text-[clamp(2rem,8vw,8rem)] md:text-[7vw] font-black leading-[1] uppercase italic text-white/75 tracking-[-0.02em] whitespace-nowrap px-[0.1em]">
              READY TO
            </h2>
          </div>

          <div className="overflow-hidden py-1 px-4">
            <h2 className="reveal-item text-[clamp(1.5rem,7vw,8.5rem)] md:text-[5vw] font-black leading-[1] uppercase text-[#cbf902] tracking-[-0.02em] whitespace-nowrap px-[0.1em]">
              COLLABORATE?
            </h2>
          </div>
        </div>

        {/* CTA Section - Adjusted spacing for smaller font */}
        <div className=" flex flex-col items-center gap-14 mt-10">
          <div className="relative group ">
           <a
            ref={magneticButton}
            href="mailto:chitrakarsujal7@gmail.com"
            className="inline-block px-10 py-5 md:px-12 md:py-6 border border-white/20 font-bold uppercase tracking-[0.3em] 
                      text-[3vw] sm:text-[1.8vw] md:text-[1.8vw] lg:text-[1.6vw] 
                      transition-all hover:bg-[#cbf902] hover:text-black hover:border-[#cbf902]"
          >
            Start_Protocol
          </a>
            {/* Technical Brackets */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#cbf902] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#cbf902] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="flex gap-10 opacity-100 ">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono uppercase tracking-widest text-[3vw] sm:text-[1.8vw] md:text-[1.8vw] lg:text-[1.6vw]  hover:text-[#cbf902] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* HUD Footer */}
      <footer className="absolute bottom-8 left-0 w-full flex justify-between px-6 md:px-10 items-end pointer-events-none font-mono uppercase text-[8px] tracking-[0.4em]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#cbf902] rounded-full animate-pulse" />
            <span className="text-white/10 text-[7px] hidden sm:block">
              Status // Available
            </span>
          </div>
          <span className="text-white/30">{time} KTM_NP</span>
        </div>
        <div className="text-white/10">Sujal_C // 2.0</div>
      </footer>
    </section>
  );
};

export default Contact;
