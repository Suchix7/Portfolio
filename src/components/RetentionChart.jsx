import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RetentionChart = () => {
  const chartRef = useRef(null);
  const path1Ref = useRef(null);
  const path2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Get exact lengths of the SVG paths
      const len1 = path1Ref.current.getTotalLength();
      const len2 = path2Ref.current.getTotalLength();

      // Set initial dasharray and offset to hide paths
      gsap.set(path1Ref.current, {
        strokeDasharray: len1,
        strokeDashoffset: len1,
      });
      gsap.set(path2Ref.current, {
        strokeDasharray: len2,
        strokeDashoffset: len2,
      });

      // Animate the strokeDashoffset on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: chartRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(
        path1Ref.current,
        {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: "power2.out",
        },
        0
      ).to(
        path2Ref.current,
        {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: "power3.out",
        },
        0.3
      );
    }, chartRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={chartRef}
      className="w-full bg-[#111111]/80 border border-white/5 p-6 rounded-2xl relative overflow-hidden backdrop-blur-md"
    >
      {/* Background visual grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-white/10" />

      {/* Header HUD info */}
      <div className="flex justify-between items-start mb-6 font-mono text-[9px] uppercase tracking-widest text-white/40">
        <div>
          <span className="text-[#cbf902] font-bold">// VSL_Retention_Model</span>
          <p className="text-[7px] text-white/20 mt-1">Data: Average of 100k+ runs</p>
        </div>
        <div className="text-right">
          <span>Target: 65%+ Retention</span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative aspect-[2/1] w-full">
        <svg
          viewBox="0 0 500 250"
          className="w-full h-full overflow-visible"
          aria-label="VSL Retention Curve Graph"
        >
          {/* Y Axis Grid Lines */}
          <line x1="50" y1="50" x2="480" y2="50" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
          <line x1="50" y1="92.5" x2="480" y2="92.5" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
          <line x1="50" y1="135" x2="480" y2="135" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
          <line x1="50" y1="177.5" x2="480" y2="177.5" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
          <line x1="50" y1="220" x2="480" y2="220" stroke="rgba(255,255,255,0.1)" />

          {/* Grid Labels */}
          {/* Y-Axis Labels */}
          <text x="15" y="54" className="fill-white/30 font-mono text-[9px]">100%</text>
          <text x="15" y="139" className="fill-white/30 font-mono text-[9px]">50%</text>
          <text x="15" y="224" className="fill-white/30 font-mono text-[9px]">0%</text>

          {/* X-Axis Labels */}
          <text x="50" y="242" className="fill-white/30 font-mono text-[8px] text-center">0s</text>
          <text x="136" y="242" className="fill-white/30 font-mono text-[8px]">10s</text>
          <text x="222" y="242" className="fill-white/30 font-mono text-[8px]">1m</text>
          <text x="351" y="242" className="fill-white/30 font-mono text-[8px]">3m</text>
          <text x="465" y="242" className="fill-white/30 font-mono text-[8px]">5m</text>

          {/* Curve 1: Standard Script (Steep drop-off) */}
          <path
            ref={path1Ref}
            d="M 50,50 C 75,190 150,205 480,215"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
          />

          {/* Curve 2: Optimized Strategy (High retention) */}
          <path
            ref={path2Ref}
            d="M 50,50 C 95,85 180,105 480,110"
            fill="none"
            stroke="#cbf902"
            strokeWidth="3.5"
            className="drop-shadow-[0_0_8px_rgba(203,249,2,0.4)]"
          />
        </svg>
      </div>

      {/* Legend Block */}
      <div className="flex gap-6 mt-4 border-t border-white/5 pt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-[#cbf902]" />
          <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-white/90">
            Optimized Strategy (65% watch)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-white/20" />
          <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-white/40">
            Standard VSL (20% watch)
          </span>
        </div>
      </div>
    </div>
  );
};

export default RetentionChart;
