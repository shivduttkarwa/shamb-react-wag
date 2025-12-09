import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./VelocityText.css";

gsap.registerPlugin(ScrollTrigger);

interface VelocityTextProps {
  text: string;
  className?: string;
}

const VelocityText: React.FC<VelocityTextProps> = ({ text, className = "" }) => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const chars = splitChars(heading);
    const section = heading.closest(".vt-section");
    if (!section) return;

    const config = chars.map(() => ({
      x: gsap.utils.random(-220, 220),
      y: gsap.utils.random(-140, 140),
      r: gsap.utils.random(-40, 40),
      s: gsap.utils.random(0.6, 0.9),
    }));

    const tl = gsap.timeline({ paused: true });

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
        "--vt-scale": 1,
        duration: 0.9,
        ease: "power2.out",
      },
      "-=0.7"
    );

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => tl.restart(),
      onEnterBack: () => tl.restart(),
    });

    return () => {
      trigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className={`vt-section ${className}`.trim()}>
      <h1 className="vt-heading" ref={headingRef}>
        {text}
      </h1>
    </section>
  );
};

function splitChars(el: HTMLElement): HTMLElement[] {
  const text = el.textContent || "";
  el.textContent = "";
  const chars: HTMLElement[] = [];
  
  // Split by newlines first, then process each line
  const lines = text.split('\n');
  
  lines.forEach((line, lineIndex) => {
    // Create a div for each line to ensure proper line breaks
    if (lineIndex > 0) {
      const lineBreak = document.createElement("div");
      lineBreak.classList.add("vt-break");
      lineBreak.style.width = "100%";
      lineBreak.style.height = "0.2em";
      el.appendChild(lineBreak);
    }
    
    // Create a container for the line
    const lineContainer = document.createElement("div");
    lineContainer.classList.add("vt-line");
    lineContainer.style.display = "block";
    lineContainer.style.textAlign = "center";
    
    [...line].forEach((ch) => {
      const span = document.createElement("span");
      span.classList.add("vt-char");

      if (ch === " ") {
        span.classList.add("vt-space");
        span.innerHTML = "&nbsp;";
      } else {
        span.textContent = ch;
      }

      lineContainer.appendChild(span);
      chars.push(span);
    });
    
    el.appendChild(lineContainer);
  });

  return chars.filter((c) => !c.classList.contains("vt-space"));
}

export default VelocityText;
