import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Using responsive absolute positioning (e.g., w-[45vw] on mobile, lg:w-[22vw] on desktop)
const campaignMedia = [
  {
    id: "01",
    brand: "Nexa",
    campaign: "Launch Reel",
    image:
      "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=1422",
    aspect: "aspect-[9/16]",
    position: "top-[5%] right-[5%] lg:right-[10%] w-[40vw] lg:w-[22vw]",
    entry: { x: "80vw", y: "-20vh", rotation: 15 },
    finalRotation: -4,
  },
  {
    id: "02",
    brand: "Atlas",
    campaign: "Brand Film",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1920",
    aspect: "aspect-video",
    position: "top-[35%] right-[10%] lg:right-[25%] w-[60vw] lg:w-[35vw]",
    entry: { x: "100vw", y: "0vh", rotation: -10 },
    finalRotation: 2,
  },
  {
    id: "03",
    brand: "Orbit",
    campaign: "Social Burst",
    image:
      "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=1422",
    aspect: "aspect-[9/16]",
    position: "bottom-[5%] lg:bottom-[5%] right-[5%] w-[35vw] lg:w-[18vw]",
    entry: { x: "60vw", y: "50vh", rotation: 20 },
    finalRotation: -6,
  },
  {
    id: "04",
    brand: "Vanta",
    campaign: "Growth Ad",
    image:
      "https://images.unsplash.com/photo-1775135999512-145e9c85b114?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    aspect: "aspect-video",
    position: "bottom-[10%] left-[5%] lg:left-[20%] w-[50vw] lg:w-[28vw]",
    entry: { x: "0vw", y: "80vh", rotation: -15 },
    finalRotation: 5,
  },
  {
    id: "05",
    brand: "Pulse",
    campaign: "Cutdown",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000",
    aspect: "aspect-square",
    position: "top-[15%] left-[5%] lg:left-[35%] w-[30vw] lg:w-[15vw]",
    entry: { x: "0vw", y: "-80vh", rotation: 10 },
    finalRotation: -3,
  },
];

const Showcase = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".showcase-card");

      gsap.set(cards, { transformPerspective: 1000 });

      // Universal timeline for all screen sizes
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, index) => {
        const entry = campaignMedia[index].entry;
        const finalRot = campaignMedia[index].finalRotation;

        tl.fromTo(
          card,
          {
            x: entry.x,
            y: entry.y,
            rotation: entry.rotation,
            opacity: 0,
            scale: 1.2,
            filter: "blur(20px)",
          },
          {
            x: "0vw",
            y: "0vh",
            rotation: finalRot,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            ease: "power3.out",
          },
          0,
        );
      });

      // Background text subtle fade/parallax
      tl.to(
        ".showcase-bg-text",
        {
          scale: 0.95,
          opacity: 0.4,
          filter: "blur(4px)",
          ease: "none",
        },
        0,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#070707] text-white overflow-hidden min-h-screen"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] [background:radial-gradient(circle_at_12%_18%,#cbf902_0%,transparent_26%),radial-gradient(circle_at_82%_78%,#cbf902_0%,transparent_30%),radial-gradient(circle_at_50%_50%,#ffffff_0%,transparent_44%)]" />

      {/* --- UNIVERSAL VIEW (Pinned, Overlapping Collage for all devices) --- */}
      <div className="relative w-full h-screen">
        {/* The Background Text */}
        <div className="showcase-bg-text absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24 z-0 pointer-events-none">
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.42em] uppercase text-[#cbf902] mb-4 lg:mb-6">
            Campaign_Image_Wall // 02
          </p>
          <h2 className="text-[10vw] md:text-[11vw] lg:text-[9vw] font-black uppercase italic tracking-[-0.05em] leading-[0.85]">
            Cinematic
            <br />
            <span className="text-[#cbf902]">Stories</span>
            <br />
            In Motion
          </h2>
          <p className="max-w-xs md:max-w-sm lg:max-w-md text-xs sm:text-sm lg:text-base text-white/65 mt-6 lg:mt-8 leading-relaxed">
            Premium campaign visuals assembled into a scroll-driven canvas.
            Scroll to assemble the editorial composition.
          </p>
        </div>

        {/* The Floating Images */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {campaignMedia.map((item) => (
            <article
              key={item.id}
              className={`showcase-card absolute ${item.position} ${item.aspect} rounded-xl sm:rounded-2xl bg-black/40 border border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.5)] lg:shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden pointer-events-auto group`}
            >
              <img
                src={item.image}
                alt={item.campaign}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-80" />

              {/* Text inside cards scaled for mobile vs desktop */}
              <div className="absolute left-3 lg:left-4 right-3 lg:right-4 bottom-3 lg:bottom-4 z-20">
                <p className="font-mono text-[7px] lg:text-[9px] tracking-[0.3em] uppercase text-white/70 mb-1">
                  {item.id}
                </p>
                <h3 className="text-sm sm:text-base lg:text-xl font-black uppercase italic leading-none tracking-tight">
                  {item.brand}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
