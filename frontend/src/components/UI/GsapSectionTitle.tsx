// GsapSectionTitle.tsx
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./GsapSectionTitle.css";

gsap.registerPlugin(ScrollTrigger);

type GsapSectionTitleProps = {
  /** Main title text, e.g. "ABOUT ME" */
  title: string;
  /** Optional description below the title */
  description?: React.ReactNode;
  /** h1–h6 heading level, default = 2 (h2) */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Extra class for the outer section */
  className?: string;
  /** Custom font size (default: clamp(3rem, 12vw, 5.5rem)) */
  fontSize?: string;
  /** Custom font weight (default: 500) */
  fontWeight?: number | string;
  /** Custom letter spacing (default: 0) */
  letterSpacing?: string;
  /** ScrollTrigger start position (default: "top 90%") */
  triggerStart?: string;
  /** ScrollTrigger end position (default: "bottom 40%") */
  triggerEnd?: string;
  /** ScrollTrigger scrub (default: 1) */
  scrub?: number | boolean;
  /**
   * Optional index (0-based) of the "center" letter
   * counted over NON-SPACE characters.
   * If not provided, the middle letter is used.
   */
  centerIndex?: number;
};

export const GsapSectionTitle: React.FC<GsapSectionTitleProps> = ({
  title,
  description,
  headingLevel = 2,
  className = "",
  fontSize = "clamp(3rem, 12vw, 5.5rem)",
  fontWeight = 500,
  letterSpacing = "0",
  triggerStart = "top 90%",
  triggerEnd = "bottom 40%",
  scrub = 1,
  centerIndex,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  // Build letter + space structure from the title string
  const chars = Array.from(title); // keeps spaces
  const nonSpaceChars = chars.filter((c) => c !== " ");
  const effectiveCenterIndex =
    typeof centerIndex === "number"
      ? Math.max(0, Math.min(nonSpaceChars.length - 1, centerIndex))
      : Math.floor(nonSpaceChars.length / 2);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const titleEl = titleRef.current;

    if (!section || !titleEl) return;

    const allLetters = Array.from(
      titleEl.querySelectorAll<HTMLElement>(".gst-letter-inner")
    );
    if (allLetters.length === 0) return;

    // Try to find an explicitly marked center letter
    let centerLetter =
      titleEl.querySelector<HTMLElement>(".gst-letter-inner--center") || null;

    // Fallback: use the middle one if class not found
    if (!centerLetter) {
      centerLetter = allLetters[Math.floor(allLetters.length / 2)];
      if (centerLetter) {
        centerLetter.classList.add("gst-letter-inner--center");
      }
    }

    if (!centerLetter) return;

    // Start all letters ABOVE so they slide down into place
    gsap.set(allLetters, { yPercent: -120, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: triggerStart,
        end: triggerEnd,
        scrub,
      },
    });

    // Center letter first
    tl.to(
      centerLetter,
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
      },
      0
    );

    // Other letters staggered from center
    const otherLetters = allLetters.filter((el) => el !== centerLetter);

    tl.to(
      otherLetters,
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.7,
        ease: "power3.out",
        stagger: {
          each: 0.15,
          from: "center",
        },
      },
      0.2
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [triggerStart, triggerEnd, scrub]);

  // ⬇️ this was causing the TS error before
  // Use React.ElementType instead of JSX.IntrinsicElements
  const HeadingTag = (`h${headingLevel}` as unknown) as React.ElementType;

  let nonSpaceCount = 0;

  return (
    <section className={`gst-section ${className}`} ref={sectionRef}>
      <div className="gst-inner">
        <HeadingTag 
          className="gst-title" 
          ref={titleRef}
          style={{
            fontSize,
            fontWeight,
            letterSpacing,
          }}
        >
          {chars.map((char, i) => {
            if (char === " ") {
              // render a controlled space so gaps don't disappear
              return (
                <span key={i} className="gst-space">
                  &nbsp;
                </span>
              );
            }

            const isCenter = nonSpaceCount === effectiveCenterIndex;
            const letterIndex = nonSpaceCount;
            nonSpaceCount++;

            return (
              <span key={i} className="gst-letter">
                <span
                  className={
                    "gst-letter-inner" +
                    (isCenter ? " gst-letter-inner--center" : "")
                  }
                  data-letter-index={letterIndex}
                >
                  {char}
                </span>
              </span>
            );
          })}
        </HeadingTag>

        {description && <div className="gst-description">{description}</div>}
      </div>
    </section>
  );
};

export default GsapSectionTitle;
