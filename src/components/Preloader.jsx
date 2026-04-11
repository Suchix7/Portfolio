import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);
  const loaderRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    // 1. Counter Logic
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    // 2. GSAP Entrance and Exit
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => onComplete(), // Notify App.jsx when done
      });

      tl.to(progressRef.current, {
        scaleX: 1,
        duration: 3,
        ease: "power2.inOut",
      })
        .to(".loader-text", {
          y: -20,
          opacity: 0,
          delay: 0.2
        })
        .to(loaderRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "expo.inOut",
        });
    });

    return () => {
      clearInterval(timer);
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background HUD Accents */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="relative w-full max-w-sm px-10">
        <div className="loader-text mb-4 flex justify-between items-end font-mono">
          <div className="flex flex-col gap-1">
            <span className="text-[8px] text-white/20 uppercase tracking-[0.4em]">Initialize_Core</span>
            <span className="text-[10px] text-[#cbf902] uppercase tracking-[0.2em] font-bold italic">System_Boot</span>
          </div>
          <span className="text-4xl font-black italic text-white leading-none tracking-tighter">
            {counter}%
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="h-[2px] w-full bg-white/5 relative">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 h-full w-full bg-[#cbf902] origin-left scale-x-0"
          />
        </div>

        <div className="loader-text mt-4 flex justify-between opacity-20 font-mono text-[8px] tracking-widest uppercase">
          <span>Sujal_C // Node_NP</span>
          <span>© 2026</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;