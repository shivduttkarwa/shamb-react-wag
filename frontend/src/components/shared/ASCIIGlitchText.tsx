import React, { useRef, useEffect } from "react";
import "./ASCIIGlitchText.css";

interface ASCIIGlitchTextProps {
  text: string;
  className?: string;
  duration?: number;
  spread?: number;
  chars?: string;
  preserveSpaces?: boolean;
  tag?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "a";
  href?: string;
  ariaLabel?: string;
}

// Constants for wave animation behavior
const WAVE_THRESH = 3;
const CHAR_MULT = 3;
const ANIM_STEP = 40;
const WAVE_BUF = 5;

const ASCIIGlitchText: React.FC<ASCIIGlitchTextProps> = ({
  text,
  className = "",
  duration = 600,
  spread = 0.3,
  chars = '.,·-─~+:;=*π""┐┌┘┴┬╗╔╝╚╬╠╣╩╦║░▒▓█▄▀▌▐■!?&#$@0123456789*',
  preserveSpaces = true,
  tag = "span",
  href,
  ariaLabel,
}) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // State variables
    let origTxt = text;
    let origChars = origTxt.split("");
    let isAnim = false;
    let cursorPos = 0;
    let waves: Array<{
      startPos: number;
      startTime: number;
      id: number;
    }> = [];
    let animId: number | null = null;
    let isHover = false;
    let origW: number | null = null;

    const cfg = {
      dur: duration,
      chars,
      preserveSpaces,
      spread,
    };

    /**
     * Updates cursor position based on mouse move
     */
    const updateCursorPos = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const len = origTxt.length;
      const pos = Math.round((x / rect.width) * len);
      cursorPos = Math.max(0, Math.min(pos, len - 1));
    };

    /**
     * Starts a new wave animation from current cursor pos
     */
    const startWave = () => {
      waves.push({
        startPos: cursorPos,
        startTime: Date.now(),
        id: Math.random(),
      });

      if (!isAnim) start();
    };

    /**
     * Clean up expired waves that have exceeded their duration
     */
    const cleanupWaves = (t: number) => {
      waves = waves.filter((w) => t - w.startTime < cfg.dur);
    };

    /**
     * Calculates wave fx for a character at given index
     * Returns whether to animate and which character to show
     */
    const calcWaveEffect = (charIdx: number, t: number) => {
      let shouldAnim = false;
      let resultChar = origChars[charIdx];

      for (const w of waves) {
        const age = t - w.startTime;
        const prog = Math.min(age / cfg.dur, 1);
        const dist = Math.abs(charIdx - w.startPos);
        const maxDist = Math.max(w.startPos, origChars.length - w.startPos - 1);
        const rad = (prog * (maxDist + WAVE_BUF)) / cfg.spread;

        if (dist <= rad) {
          shouldAnim = true;
          const intens = Math.max(0, rad - dist);

          // Chars in the wave zone shift through character sequence
          if (intens <= WAVE_THRESH && intens > 0) {
            const charIdx =
              (dist * CHAR_MULT + Math.floor(age / ANIM_STEP)) % cfg.chars.length;
            resultChar = cfg.chars[charIdx];
          }
        }
      }

      return { shouldAnim, char: resultChar };
    };

    /**
     * Generates scrambled text based on current waves
     */
    const genScrambledTxt = (t: number) =>
      origChars
        .map((char, i) => {
          if (cfg.preserveSpaces && char === " ") return " ";
          const res = calcWaveEffect(i, t);
          return res.shouldAnim ? res.char : char;
        })
        .join("");

    /**
     * Stops the animation and resets to original text
     */
    const stop = () => {
      el.textContent = origTxt;
      el.classList.remove("ascii-glitch-active");

      // Reset width to allow natural text flow
      if (origW !== null) {
        el.style.width = "";
        origW = null;
      }
      isAnim = false;
    };

    /**
     * Start the animation loop
     */
    const start = () => {
      if (isAnim) return;

      // Preserve original width to prevent layout shifts
      if (origW === null) {
        origW = el.getBoundingClientRect().width;
        el.style.width = `${origW}px`;
      }

      isAnim = true;
      el.classList.add("ascii-glitch-active");

      const animate = () => {
        const t = Date.now();

        // Clean up expired waves first
        cleanupWaves(t);

        if (waves.length === 0) {
          stop();
          return;
        }

        // Generate scrambled text
        el.textContent = genScrambledTxt(t);
        animId = requestAnimationFrame(animate);
      };

      animId = requestAnimationFrame(animate);
    };

    /**
     * Event handlers
     */
    const handleEnter = (e: Event) => {
      isHover = true;
      updateCursorPos(e as MouseEvent);
      startWave();
    };

    const handleMove = (e: Event) => {
      if (!isHover) return;
      const old = cursorPos;
      updateCursorPos(e as MouseEvent);
      if (cursorPos !== old) startWave();
    };

    const handleLeave = () => {
      isHover = false;
    };

    // Add event listeners
    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    // Cleanup function
    return () => {
      if (animId) {
        cancelAnimationFrame(animId);
      }
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [text, duration, spread, chars, preserveSpaces]);

  // Render the appropriate HTML element
  const Tag = tag as keyof JSX.IntrinsicElements;
  const commonProps = {
    ref: elementRef,
    className: `ascii-glitch-text ${className}`,
    "aria-label": ariaLabel || text,
  };

  if (tag === "a" && href) {
    return (
      <a {...commonProps} href={href}>
        {text}
      </a>
    );
  }

  return <Tag {...commonProps}>{text}</Tag>;
};

export default ASCIIGlitchText;