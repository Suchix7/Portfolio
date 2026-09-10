import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { name: "Instagram", url: "https://www.instagram.com/sujal_chitrakar" },
  { name: "LinkedIn", url: "https://linkedin.com/in/sujal-chitrakar" },
  { name: "Github", url: "https://github.com/Suchix7" },
];
const Contact = () => {
  const sectionRef = useRef(null);
  const magneticButton = useRef(null);
  const magneticWrap = useRef(null);
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

    // Magnetic CTA — the button pulls toward the cursor within its wrapper,
    // then springs back on exit. Skipped on touch devices, which have no
    // hover state to make this legible.
    const isFinePointer =
      typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
    const wrap = magneticWrap.current;
    const btn = magneticButton.current;
    let handleMove, handleLeave;

    if (isFinePointer && wrap && btn) {
      handleMove = (e) => {
        const rect = wrap.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        gsap.to(btn, {
          x: relX * 0.35,
          y: relY * 0.5,
          duration: 0.6,
          ease: "power3.out",
        });
      };

      handleLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.35)",
        });
      };

      wrap.addEventListener("mousemove", handleMove);
      wrap.addEventListener("mouseleave", handleLeave);
    }

    return () => {
      ctx.revert();
      clearInterval(timer);
      if (wrap && handleMove) {
        wrap.removeEventListener("mousemove", handleMove);
        wrap.removeEventListener("mouseleave", handleLeave);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex items-center justify-center bg-[#0a0a0a] overflow-hidden border-t border-white/5 py-28 sm:py-36 md:py-44 pb-24 sm:pb-28"
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

      <div className="z-10 w-full px-6 text-center flex flex-col items-center">
        <div className="w-full max-w-fit mx-auto space-y-0">
          <div className="overflow-hidden py-1 px-4">
            <h2 className="reveal-item text-[clamp(1.8rem,7vw,6.5rem)] md:text-[clamp(2rem,7vw,8rem)] font-black leading-[1] uppercase italic text-white/75 tracking-[-0.02em] whitespace-nowrap px-[0.1em]">
              SCALE YOUR
            </h2>
          </div>

          <div className="overflow-hidden py-1 px-4">
            <h2 className="reveal-item text-[clamp(1.8rem,7vw,6.5rem)] md:text-[clamp(2rem,7vw,8rem)] font-black leading-[1] uppercase text-[#cbf902] tracking-[-0.02em] whitespace-nowrap px-[0.1em]">
              META SPEND?
            </h2>
          </div>
        </div>

        {/* CTA Section - Adjusted spacing for smaller font */}
        <div className="mt-16 md:mt-20 flex flex-col items-center gap-6">
          <div ref={magneticWrap} className="relative group p-6 -m-6">
            <a
              ref={magneticButton}
              href="mailto:chitrakarsujal7@gmail.com?subject=Request%20for%20Creative%20Strategy%20%26%20VSL%20Audit&body=Hello%20Sujal%2C%0A%0AI%20would%20love%20to%20get%20a%20free%205-minute%20direct-response%20audit%20on%20our%20VSL%20and%20Meta%20ad%20creatives.%0A%0AHere%20are%20our%20current%20links%20or%20details%3A%0A-%20Website%2FAd%20Account%3A%20%0A-%20Current%20monthly%20Meta%20spend%3A%20%0A%0ABest%20regards%2C"
              className="relative z-10 inline-flex items-center gap-3 sm:gap-5 px-8 py-5 sm:px-16 sm:py-8 bg-[#cbf902] text-black font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[11px] sm:text-sm shadow-[0_0_50px_rgba(203,249,2,0.15)] transition-transform duration-300 group-hover:scale-[1.03]"
            >
              Request_Creative_Audit
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            {/* Technical Brackets */}
            <div className="absolute top-6 left-6 w-2.5 h-2.5 border-t border-l border-[#cbf902] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-6 right-6 w-2.5 h-2.5 border-b border-r border-[#cbf902] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <p className="font-mono text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-white/25">
            Free 5-min VSL &amp; Meta creative audit // Reply within 24h
          </p>

          <div className="flex gap-10 opacity-30 ">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono uppercase tracking-widest text-[10px] sm:text-[16px] hover:text-[#cbf902] transition-colors"
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
