import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;

    const moveCursor = (e) => {
      // Outer ring with slight lag for "weighted" feel
      gsap.to(outer, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out"
      });
      // Inner dot (precise)
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
        duration: 0.4,
        ease: "power3.out"
      });
      gsap.to(inner, {
        opacity: isHovered ? 0 : 1,
        duration: 0.2
      });
    };

    window.addEventListener('mousemove', moveCursor);

    // Magnetic interaction for buttons and links
    const targets = document.querySelectorAll('button, a, .magnetic');
    targets.forEach(el => {
      el.addEventListener('mouseenter', () => handleHover(true));
      el.addEventListener('mouseleave', () => handleHover(false));
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      targets.forEach(el => {
        el.removeEventListener('mouseenter', () => handleHover(true));
        el.removeEventListener('mouseleave', () => handleHover(false));
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={outerRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-white/50 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <div 
        ref={innerRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#cbf902] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
};

export default CustomCursor;
