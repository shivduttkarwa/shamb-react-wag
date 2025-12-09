import React, { useEffect, useRef, useState } from "react";
import ASCIIGlitchText from "../shared/ASCIIGlitchText";

interface GlitchChangingTextProps {
  texts: string[];
  interval?: number; // ms between changes
  className?: string;
}

const GlitchChangingText: React.FC<GlitchChangingTextProps> = ({
  texts,
  interval = 2500,
  className = "",
}) => {
  const [index, setIndex] = useState(0);
  const elRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, interval);

    return () => clearInterval(id);
  }, [texts.length, interval]);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // Dispatch a synthetic mouseenter and mousemove to trigger the ascii-wave
    const rect = el.getBoundingClientRect();
    const clientX = rect.left + rect.width / 2;
    const clientY = rect.top + rect.height / 2;

    const mouseEnter = new MouseEvent("mouseenter", {
      bubbles: true,
      cancelable: true,
      clientX,
      clientY,
    });
    const mouseMove = new MouseEvent("mousemove", {
      bubbles: true,
      cancelable: true,
      clientX,
      clientY,
    });

    el.dispatchEvent(mouseEnter);
    el.dispatchEvent(mouseMove);

    // dispatch a small mousemove sequence to get repeated waves
    const t1 = window.setTimeout(() => {
      el.dispatchEvent(mouseMove);
    }, 60);
    const t2 = window.setTimeout(() => {
      el.dispatchEvent(mouseMove);
    }, 120);
    // and then a leave
    const t3 = window.setTimeout(() => {
      const mouseLeave = new MouseEvent("mouseleave", { bubbles: true, cancelable: true });
      el.dispatchEvent(mouseLeave);
    }, 400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [index]);

  // Uppercase text
  const text = texts[index].toUpperCase();

  // We add a wrapper that has a ref to the underlying element so we can dispatch events
  return (
    <span
      className={`glitch-changing-text ${className}`}
      ref={(n) => {
        // Keep reference to DOM node for events
        elRef.current = n as HTMLElement | null;
      }}
    >
      <ASCIIGlitchText text={text} />
    </span>
  );
};

export default GlitchChangingText;
