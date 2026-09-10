import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  // Devices with a coarse pointer (touch) never fire mousemove, so the rig
  // would otherwise sit glued to the top-left corner forever. Bail out early.
  const [enabled] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches,
  );

  useEffect(() => {
    if (!enabled) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    let hasMoved = false;

    const ctx = gsap.context(() => {
      const moveCursor = (e) => {
        if (!hasMoved) {
          hasMoved = true;
          gsap.to([outer, inner], { opacity: 1, duration: 0.3 });
        }
        gsap.to(outer, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power3.out"
        });
        gsap.to(inner, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "none"
        });
      };

      const handleHover = (isHovered) => {
        gsap.to(outer, {
          scale: isHovered ? 2.5 : 1,
          borderColor: isHovered ? '#cbf902' : 'rgba(255, 255, 255, 0.5)',
          backgroundColor: isHovered ? 'rgba(203, 249, 2, 0.1)' : 'transparent',
          duration: 0.4,
          ease: "power3.out"
        });
        gsap.to(inner, {
          opacity: isHovered ? 0 : 1,
          duration: 0.2
        });
      };

      // Apply listeners to current targets
      const applyListeners = (elements) => {
        elements.forEach(el => {
          if (el.dataset.cursorBound) return;
          el.addEventListener('mouseenter', () => handleHover(true));
          el.addEventListener('mouseleave', () => handleHover(false));
          el.dataset.cursorBound = "true";
        });
      };

      const initialTargets = document.querySelectorAll('button, a, .magnetic');
      applyListeners(initialTargets);
      window.addEventListener('mousemove', moveCursor);

      // MutationObserver to handle dynamically added elements
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(() => {
          const newTargets = document.querySelectorAll('button, a, .magnetic');
          applyListeners(newTargets);
        });
      });

      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        window.removeEventListener('mousemove', moveCursor);
        observer.disconnect();
        initialTargets.forEach(el => {
          el.removeEventListener('mouseenter', () => handleHover(true));
          el.removeEventListener('mouseleave', () => handleHover(false));
        });
      };
    }, outerRef);

    return () => ctx.revert();
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={outerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white/50 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference opacity-0"
      />
      <div
        ref={innerRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#cbf902] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-0"
      />
    </>
  );
};

export default CustomCursor;
