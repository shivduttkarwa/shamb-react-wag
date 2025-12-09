import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./ChangingText.css";

interface ChangingTextProps {
  texts?: string[];
  className?: string;
  startDelay?: number; // delay before first cycle in seconds
}

const defaultTexts = [
  "Social media, reimagined.",
  "Empower your journey.",
  "Unlock your true potential.",
  "Dream big. Act bigger.",
  "Innovation starts here.",
  "Step into the future.",
  "Create without limits.",
  "Change the game.",
  "Lead the way forward.",
  "Your vision. Our mission.",
  "Inspire. Impact. Ignite.",
  "Make it happen.",
  "Redefine what’s possible.",
  "The future is now.",
  "Start something great.",
  "Think bold. Move fast.",
  "Fuel your ambition.",
  "Where ideas take flight.",
  "Be the change.",
  "Shape your destiny.",
  "Tomorrow begins today.",
];

const ChangingText: React.FC<ChangingTextProps> = ({
  texts = defaultTexts,
  className = "",
  startDelay = 0,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const currentIdx = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mounted = true;

    function showLine(index: number) {
      if (!mounted) return;
      // Clear previous
      container.innerHTML = "";

      const text = texts[index];
      const chars = text.split("");

      const spans: HTMLElement[] = [];
      chars.forEach((ch) => {
        const span = document.createElement("span");
        span.textContent = ch;
        container.appendChild(span);
        spans.push(span);
      });

      // Animate in
      gsap.fromTo(
        spans,
        { opacity: 0, y: 20, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 1.2,
          ease: "power2.out",
          onComplete: () => {
            // Animate out after a pause
            gsap.to(spans, {
              opacity: 0,
              y: -20,
              filter: "blur(10px)",
              stagger: 0.1,
              delay: 2,
              duration: 1.0,
              ease: "power2.in",
              onComplete: () => {
                currentIdx.current = (index + 1) % texts.length;
                // Call next cycle
                timeoutRef.current = window.setTimeout(
                  () => showLine(currentIdx.current),
                  0
                );
              },
            });
          },
        }
      );
    }

    // Start after optional delay
    timeoutRef.current = window.setTimeout(() => {
      showLine(currentIdx.current);
    }, startDelay * 1000);

    return () => {
      mounted = false;
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      gsap.killTweensOf("*");
    };
  }, [texts, startDelay]);

  return (
    <div
      className={`changing-text ${className}`}
      ref={containerRef}
      aria-hidden="true"
    ></div>
  );
};

export default ChangingText;
