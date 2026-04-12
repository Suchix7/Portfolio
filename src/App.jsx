import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import Hero from "./components/Hero";
import Work from "./components/Work";
import About from "./components/About";
import Contact from "./components/Contact";
import Preloader from "./components/Preloader";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Refresh ScrollTrigger when loading finishes
    // This ensures all horizontal and vertical scroll positions are recalculated
    if (!isLoading) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [isLoading]);

  return (
    <ErrorBoundary>
      <div className="bg-[#0d0d0d] font-sans selection:bg-[#cbf902] selection:text-black">
        {/* The subtle grain that ties the 'Architect' look together */}
        <div className="grain-overlay" />

        {/* Preloader hand-off */}
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

        {!isLoading && (
          <SmoothScroll>
            <div className="relative">
              <CustomCursor />

              <main className="relative z-10" role="main">
                {/* HUD Guideline: A single, thin vertical line 
                   that runs through the site for technical symmetry 
                */}
                <div className="fixed left-6 md:left-12 lg:left-20 top-0 w-[1px] h-full bg-white/5 pointer-events-none z-0" />

                <div aria-label="Hero Section">
                  <Hero />
                </div>

                {/* Spacial Buffer: In high-end design, we use 
                   intentional "dead air" between sections 
                */}

                <div aria-label="Work Portfolio Section">
                  <Work />
                </div>

                <div aria-label="About Section">
                  <About />
                </div>

                <div aria-label="Contact Section">
                  <Contact />
                </div>

                {/* Global Performance Signature */}
                <footer
                  className="py-10 text-center opacity-10 pointer-events-none"
                  aria-hidden="true"
                >
                  <span className="text-[10px] font-mono tracking-[1em] uppercase">
                    System_Output // Digital_Architect_2026
                  </span>
                </footer>
              </main>
            </div>
          </SmoothScroll>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
