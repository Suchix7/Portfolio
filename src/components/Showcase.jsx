import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// The actual operating process behind the case studies above —
// Voice-of-Customer research down to messaging pillars, pillars down to
// angles, angles down to hooks, then a structured, one-variable-at-a-time
// test pyramid tracked against Hook Rate / Hold Rate before anything scales.
const stages = [
  {
    id: "01",
    tag: "Discovery",
    title: "Voice-of-Customer Research",
    description:
      "Before a single hook is written, I mine reviews, comments, competitor angles and support tickets for the exact language buyers already use. That raw phrasing gets distilled into 3–5 messaging pillars — the foundation everything downstream has to trace back to.",
    stats: [
      { label: "VoC phrases pulled", value: "150+" },
      { label: "Messaging pillars", value: "3–5" },
    ],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "02",
    tag: "Ideation",
    title: "Angle & Hook Architecture",
    description:
      "Each pillar branches into multiple angles — the specific lens a viewer sees the offer through (pain, curiosity, social proof, mechanism). Every angle then spawns several hooks: the first 3 seconds designed purely to stop the scroll before the argument even starts.",
    stats: [
      { label: "Angles per pillar", value: "2–4" },
      { label: "Hooks per angle", value: "3–6" },
    ],
    image:
      "https://images.unsplash.com/photo-1552664688-cf412ec27db2?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "03",
    tag: "Production",
    title: "Script, Storyboard & Shoot",
    description:
      "Winning hooks get scripted into full VSL or UGC storyboards — structured around a Hook → Retain → Reward spine so retention has somewhere to go after the open. Production stays lightweight and fast so a concept can go from brief to a testable cut in days.",
    stats: [
      { label: "Format", value: "VSL / UGC" },
      { label: "Brief-to-cut", value: "< 5 days" },
    ],
    image:
      "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "04",
    tag: "Validation",
    title: "Structured Split-Testing",
    description:
      "One variable at a time — hooks first, then value proposition, then CTA — so a result is never ambiguous about what actually moved it. Every test is scored on Hook Rate (3-sec view rate) and Hold Rate (15-sec+ retention) before spend is ever touched.",
    stats: [
      { label: "Hook Rate target", value: "30%+" },
      { label: "Hold Rate target", value: "10%+" },
    ],
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "05",
    tag: "Diagnosis",
    title: "Performance Data & Iteration",
    description:
      "A weak Hook Rate with a strong Hold Rate means the open needs work, not the story — a weak Hold Rate means the opposite. That diagnosis gets logged in a running creative audit so every new brief starts from what the data already proved, not a blank page.",
    stats: [
      { label: "Audit cadence", value: "Weekly" },
      { label: "Fix cost", value: "Re-edit, not re-shoot" },
    ],
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "06",
    tag: "Growth",
    title: "Scale & Creative Refresh",
    description:
      "Confirmed winners get pushed into broader budget while the next round of variations is already in production — creative fatigue is tracked as a leading indicator, not discovered after CPA spikes, so spend scales without the account ever going quiet.",
    stats: [
      { label: "Refresh cadence", value: "Bi-weekly" },
      { label: "Fatigue signal", value: "Hook Rate decay" },
    ],
    image:
      "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=1400&auto=format&fit=crop",
  },
];

const Showcase = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal each stage row as it enters
      gsap.utils.toArray(".stage-row").forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
          },
        });
      });

      // Vertical rail fills with scroll progress through the whole section
      gsap.to(".stage-rail-fill", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 60%",
          scrub: 0.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#070707] text-white overflow-hidden py-28 md:py-40 px-6 sm:px-12 md:px-24 lg:px-32 border-t border-white/5"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] [background:radial-gradient(circle_at_12%_18%,#cbf902_0%,transparent_26%),radial-gradient(circle_at_82%_78%,#cbf902_0%,transparent_30%)]" />

      {/* Shared centered container — keeps header + timeline aligned and
          stops the whole section from hugging the left edge on wide screens */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20 md:mb-28 max-w-3xl">
          <div className="w-20 h-px bg-[#cbf902] mb-6" />
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.42em] uppercase text-[#cbf902] mb-4">
            Strategy_Framework // 02
          </p>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase italic tracking-[-0.04em] leading-[0.9]">
            The <span className="text-[#cbf902]">Process</span>
          </h2>
          <p className="mt-6 text-sm sm:text-base text-white/50 leading-relaxed max-w-xl">
            Every campaign runs through the same six-stage system — research
            down to a scaled winner — so results are repeatable, not lucky.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical rail — centered on the node circles (w-10 = 40px, so
              the rail sits at their midpoint, 20px in from the row edge) */}
          <div className="absolute left-5 top-2 bottom-2 w-px bg-white/10 hidden sm:block">
            <div className="stage-rail-fill absolute inset-0 bg-[#cbf902] origin-top scale-y-0" />
          </div>

          <div className="flex flex-col gap-16 md:gap-24">
            {stages.map((stage, i) => (
              <div
                key={stage.id}
                className={`stage-row relative sm:pl-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center`}
              >
                {/* Node on rail */}
                <div className="hidden sm:flex absolute left-0 top-1 w-10 h-10 rounded-full border border-white/15 bg-[#0a0a0a] items-center justify-center font-mono text-[10px] text-[#cbf902] z-10">
                  {stage.id}
                </div>

              {/* Text */}
              <div
                className={`lg:col-span-7 ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <span className="inline-block font-mono text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-[#cbf902]/70 border border-[#cbf902]/20 bg-[#cbf902]/5 px-2 py-1 mb-4">
                  {stage.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase italic tracking-tight leading-[1.05] mb-4">
                  {stage.title}
                </h3>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-xl mb-6">
                  {stage.description}
                </p>
                <div className="flex flex-wrap gap-6">
                  {stage.stats.map((s) => (
                    <div key={s.label}>
                      <div className="text-lg sm:text-xl font-black italic text-white">
                        {s.value}
                      </div>
                      <div className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-white/30">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div
                className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-black/40 group">
                  <img
                    src={stage.image}
                    alt={stage.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 font-mono text-[8px] uppercase tracking-[0.3em] text-white/60">
                    Stage_{stage.id}
                  </div>
                </div>
              </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
