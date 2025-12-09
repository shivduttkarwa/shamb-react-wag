import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ServiceHeroText.css";

gsap.registerPlugin(ScrollTrigger);

interface ServiceHeroTextProps {
  text: string;
  className?: string;
  customPhrases?: string[];
}

const ServiceHeroText: React.FC<ServiceHeroTextProps> = ({ text, className = "", customPhrases = [] }) => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const secondLineRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const phrases = customPhrases.length > 0 ? customPhrases : [
    "Dreams",
    "Visions", 
    "Spaces",
    "Futures"
  ];

  useEffect(() => {
    const secondLine = secondLineRef.current;
    if (!secondLine) return;

    let currentIndex = 0;
    let timeoutId: number | null = null;

    function showText(index: number, isInitial: boolean = false) {
      if (!secondLine) return;
      
      const phrase = phrases[index];
      const chars = phrase.split('');
      
      secondLine.textContent = '';
      
      const charSpans: HTMLElement[] = [];
      chars.forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        
        span.style.opacity = '0';
        span.style.transform = `translate(${gsap.utils.random(-220, 220)}px, ${gsap.utils.random(-140, 140)}px) rotate(${gsap.utils.random(-40, 40)}deg) scale(${gsap.utils.random(0.6, 0.9)})`;
        span.style.filter = 'blur(14px)';
        
        secondLine.appendChild(span);
        charSpans.push(span);
      });

      if (isInitial) {
        return charSpans;
      } else {
        gsap.fromTo(
          charSpans,
          {
            x: () => gsap.utils.random(-220, 220),
            y: () => gsap.utils.random(-140, 140),
            rotation: () => gsap.utils.random(-40, 40),
            scale: () => gsap.utils.random(0.6, 0.9),
            opacity: 0,
            filter: "blur(14px)",
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "expo.out",
            stagger: { each: 0.035, from: "center" },
            onComplete: () => {
              // Hold for 2 seconds, then animate out with scatter effect
              timeoutId = window.setTimeout(() => {
                gsap.to(charSpans, {
                  x: () => gsap.utils.random(-220, 220),
                  y: () => gsap.utils.random(-140, 140),
                  rotation: () => gsap.utils.random(-40, 40),
                  scale: () => gsap.utils.random(0.6, 0.9),
                  opacity: 0,
                  filter: "blur(14px)",
                  duration: 1.2,
                  ease: "expo.in",
                  stagger: { each: 0.03, from: "center" },
                  onComplete: () => {
                    currentIndex = (currentIndex + 1) % phrases.length;
                    showText(currentIndex, false);
                  }
                });
              }, 2000);
            }
          }
        );
      }
    }

    const initialCharSpans = showText(0, true);

    secondLine.dataset.initialChars = JSON.stringify(initialCharSpans?.map(span => ({
      text: span.textContent,
      transform: span.style.transform,
      opacity: span.style.opacity,
      filter: span.style.filter
    })) || []);

    const startCycling = () => {
      timeoutId = window.setTimeout(() => {
        currentIndex = (currentIndex + 1) % phrases.length;
        showText(currentIndex, false);
      }, 2000); 
    };

    (secondLine as any).startCycling = startCycling;

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      gsap.killTweensOf(secondLine);
    };
  }, []);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const chars = splitChars(heading);
    const section = heading.closest(".mm-section");
    if (!section) return;

    const config = chars.map(() => ({
      x: gsap.utils.random(-220, 220),
      y: gsap.utils.random(-140, 140),
      r: gsap.utils.random(-40, 40),
      s: gsap.utils.random(0.6, 0.9),
    }));

    const tl = gsap.timeline({ paused: true });

    // Add 2-second delay before starting animations
    tl.to({}, { duration: 2.0 }); // 2-second delay

    tl.fromTo(
      chars,
      {
        x: (i) => config[i].x,
        y: (i) => config[i].y,
        rotation: (i) => config[i].r,
        scale: (i) => config[i].s,
        opacity: 0,
        filter: "blur(14px)",
      },
      {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "expo.out",
        stagger: { each: 0.035, from: "center" },
      }
    );

    tl.to(
      heading,
      {
        "--u-scale": 1,
        duration: 0.9,
        ease: "power2.out",
      },
      "-=0.7"
    );

    // Add second line animation to main timeline
    const secondLine = secondLineRef.current;
    if (secondLine && (secondLine as any).startCycling) {
      // Get the initial character spans that were prepared
      const secondLineChars = secondLine.querySelectorAll('span');
      
      // Animate second line with same scatter effect
      tl.fromTo(
        secondLineChars,
        {
          x: () => {
            // Extract the x value from the transform
            const transform = secondLineChars[0]?.style.transform || '';
            const match = transform.match(/translate\(([^,]+)px/);
            return match ? parseFloat(match[1]) : gsap.utils.random(-220, 220);
          },
          y: () => {
            const transform = secondLineChars[0]?.style.transform || '';
            const match = transform.match(/translate\([^,]+,\s*([^)]+)px/);
            return match ? parseFloat(match[1]) : gsap.utils.random(-140, 140);
          },
          rotation: () => {
            const transform = secondLineChars[0]?.style.transform || '';
            const match = transform.match(/rotate\(([^)]+)deg/);
            return match ? parseFloat(match[1]) : gsap.utils.random(-40, 40);
          },
          scale: () => {
            const transform = secondLineChars[0]?.style.transform || '';
            const match = transform.match(/scale\(([^)]+)\)/);
            return match ? parseFloat(match[1]) : gsap.utils.random(0.6, 0.9);
          },
          opacity: 0,
          filter: "blur(14px)",
        },
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "expo.out",
          stagger: { each: 0.035, from: "center" },
          onComplete: () => {
            // Start cycling after initial animation completes
            (secondLine as any).startCycling();
          }
        },
        "-=1.2" // Start slightly before first line completes for overlap
      );
    }

    // Create a unique trigger with specific ID to avoid conflicts
    const triggerId = `service-hero-text-${Date.now()}`;
    triggerRef.current = ScrollTrigger.create({
      id: triggerId,
      trigger: section,
      start: "top 80%",
      onEnter: () => tl.restart(),
      onEnterBack: () => tl.restart(),
    });

    // Store animation reference
    animationRef.current = tl;

    return () => {
      // More specific cleanup to avoid affecting other animations
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
      // Only kill tweens of this specific element
      gsap.killTweensOf(heading);
      gsap.killTweensOf(chars);
    };
  }, []);

  function splitChars(el: HTMLElement): HTMLElement[] {
    el.textContent = "";
    const chars: HTMLElement[] = [];

    // Create container for first text
    const firstLineContainer = document.createElement("div");
    firstLineContainer.classList.add("line-container");
    
    // Split first text into characters
    [...text].forEach((ch) => {
      const charSpan = document.createElement("span");
      charSpan.classList.add("char");
      charSpan.textContent = ch;
      firstLineContainer.appendChild(charSpan);
      chars.push(charSpan);
    });
    
    el.appendChild(firstLineContainer);

    return chars;
  }

  return (
    <section className={`mm-section ${className}`.trim()}>
      <h1 className="mm-heading" ref={headingRef}>
        {/* First line will be populated by splitChars function */}
      </h1>
      {/* Render second line with isolated animation */}
      <div className="mm-second-line" ref={secondLineRef}>
        {/* Text will be populated by animation */}
      </div>
    </section>
  );
};

export default ServiceHeroText;