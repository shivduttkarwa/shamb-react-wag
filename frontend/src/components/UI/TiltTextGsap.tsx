import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TiltTextGsap.css";

gsap.registerPlugin(ScrollTrigger);

interface TiltTextGsapProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  trigger?: string | Element;
  startTrigger?: string;
  endTrigger?: string;
  duration?: number;
  staggerTime?: number;
  skewAmount?: number;
  blurAmount?: number;
  scaleY?: number;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const TiltTextGsap: React.FC<TiltTextGsapProps> = ({
  children,
  className = "",
  style = {},
  trigger,
  startTrigger = "top 10%",
  endTrigger = "top 30%",
  duration = 1.9,
  staggerTime = 0.018,
  skewAmount = 12,
  blurAmount = 4,
  scaleY = 0.2,
  tag = "h2",
}) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const heading = headingRef.current;
    const isMobile = window.innerWidth <= 768;

    // Split heading into characters
    const splitHeading = (headingEl: HTMLElement) => {
      const raw = headingEl.textContent?.trim() || "";
      headingEl.textContent = "";

      const words = raw.split(" ");

      words.forEach((word, wIndex) => {
        const wordSpan = document.createElement("span");
        wordSpan.classList.add("tilt-text-word");

        word.split("").forEach((char) => {
          const charSpan = document.createElement("span");
          charSpan.classList.add("tilt-text-char");
          charSpan.textContent = char;
          wordSpan.appendChild(charSpan);
        });

        headingEl.appendChild(wordSpan);

        if (wIndex !== words.length - 1) {
          const spacer = document.createTextNode(" ");
          headingEl.appendChild(spacer);
        }
      });

      const charEls = headingEl.querySelectorAll(".tilt-text-char");
      return { charEls };
    };

    const { charEls } = splitHeading(heading);

    // Set initial state - different for mobile and desktop
    if (isMobile) {
      // Mobile: Use hero-style line animation - treat whole heading as one line
      gsap.set(heading, {
        overflow: "hidden",
      });
      gsap.set(charEls, {
        yPercent: 100,
        transformOrigin: "50% 100%",
      });
    } else {
      // Desktop: Use tilt animation
      gsap.set(charEls, {
        opacity: 0,
        scaleY: scaleY,
        skewY: skewAmount,
        transformOrigin: "50% 100%",
        filter: `blur(${blurAmount}px)`,
      });
    }

    // Hide the entire heading initially until animation triggers
    gsap.set(heading, {
      visibility: "hidden",
    });

    // Create timeline with scrub
    const tl = gsap.timeline();
    timelineRef.current = tl;

    tl.set(heading, { visibility: "visible" });

    if (isMobile) {
      // Mobile: Hero-style line animation
      tl.to(charEls, {
        yPercent: 0,
        duration: 1,
        stagger: 0.02,
        ease: "none",
      });
    } else {
      // Desktop: Tilt animation
      tl.to(charEls, {
        opacity: 1,
        scaleY: 1,
        skewY: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "none",
        stagger: {
          each: staggerTime / duration,
          from: "random",
        },
      });
    }

    // Create ScrollTrigger with scrub
    const triggerElement = trigger || heading;

    ScrollTrigger.create({
      trigger: triggerElement,
      start: isMobile ? "top 90%" : "top 80%",
      end: isMobile ? "top 60%" : "top 40%",
      scrub: 3,
      animation: tl,
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === triggerElement) {
          st.kill();
        }
      });
    };
  }, [
    children,
    trigger,
    startTrigger,
    endTrigger,
    duration,
    staggerTime,
    skewAmount,
    blurAmount,
    scaleY,
    tag,
  ]);

  const HeadingTag = tag;

  return (
    <HeadingTag
      ref={headingRef}
      className={`tilt-text-heading ${className}`}
      style={style}
    >
      {children}
    </HeadingTag>
  );
};

export default TiltTextGsap;
