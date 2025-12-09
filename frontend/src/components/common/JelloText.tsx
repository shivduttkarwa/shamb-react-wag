import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./JelloText.css";

gsap.registerPlugin(ScrollTrigger);

interface JelloTextProps {
  text: string;
  className?: string;
}

export const JelloText: React.FC<JelloTextProps> = ({ text, className = "" }) => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement || isInitialized.current) return;

    // Split text into individual character spans
    const textContent = textElement.textContent || "";
    textElement.textContent = "";
    
    const chars: HTMLSpanElement[] = [];
    textContent.split("").forEach((char) => {
      const span = document.createElement("span");
      span.classList.add("jello-char");
      span.textContent = char === " " ? "\u00a0" : char;
      textElement.appendChild(span);
      chars.push(span);
    });

    // Animation variables (exact from HTML)
    const weightInit = 600;
    const weightTarget = 350;
    const weightDiff = weightInit - weightTarget;
    const stretchInit = 130;
    const stretchTarget = 70;
    const stretchDiff = stretchInit - stretchTarget;
    const maxYOffset = 60;
    const maxXOffset = 40;
    const elasticDropOff = 0.8;

    let isMouseDown = false;
    let mouseInitialY = 0;
    let mouseFinalY = 0;
    let distY = 0;
    let charIndexSelected = 0;
    let charH = 0;
    let dragFactor = 0;

    const resize = () => {
      if (textElement) {
        charH = textElement.offsetHeight || 60;
      }
    };

    const init = () => {
      resize();
      
      gsap.set(textElement, { autoAlpha: 1 });
      gsap.set(chars, {
        transformOrigin: "center bottom",
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
      });

      animInTxt();
    };

    const animInTxt = () => {
      const isMobile = window.innerWidth <= 768;

      // Set text element to visible first
      gsap.set(textElement, { visibility: "visible" });

      // Set initial state like TiltTextGsap
      if (isMobile) {
        gsap.set(textElement, { overflow: "hidden" });
        gsap.set(chars, {
          yPercent: 100,
          transformOrigin: "50% 100%",
        });
      } else {
        gsap.set(chars, {
          opacity: 0,
          scaleY: 0.2,
          skewY: 12,
          transformOrigin: "50% 100%",
          filter: "blur(4px)",
        });
      }

      // Create the tilt animation
      const tl = gsap.timeline({ paused: true });

      // Make sure text is visible when animation starts
      tl.set(textElement, { visibility: "visible" });

      if (isMobile) {
        tl.to(chars, {
          yPercent: 0,
          duration: 0.6,
          stagger: 0.02,
          ease: "back.out(1.7)",
        });
      } else {
        tl.to(chars, {
          opacity: 1,
          scaleY: 1,
          skewY: 0,
          filter: "blur(0px)",
          duration: 1.9,
          ease: "power4.out",
          stagger: {
            each: 0.018,
            from: "random",
          },
        });
      }

      // ScrollTrigger with TiltTextGsap behavior
      ScrollTrigger.create({
        trigger: textElement,
        start: isMobile ? "top 85%" : "top 70%",
        end: "bottom 100%",
        onEnter: () => {
          tl.restart();
          if (!isInitialized.current) {
            setTimeout(initEvents, 100);
          }
        },
        onEnterBack: () => {
          tl.restart();
        },
        onLeave: () => {
          if (isMobile) {
            gsap.set(chars, { yPercent: 100 });
          } else {
            gsap.set(chars, {
              opacity: 0,
              scaleY: 0.2,
              skewY: 12,
              filter: "blur(4px)",
            });
          }
        },
        onLeaveBack: () => {
          if (isMobile) {
            gsap.set(chars, { yPercent: 100 });
          } else {
            gsap.set(chars, {
              opacity: 0,
              scaleY: 0.2,
              skewY: 12,
              filter: "blur(4px)",
            });
          }
        },
      });
    };

    const calcDist = () => {
      const maxDrag = charH || 60;
      distY = mouseInitialY - mouseFinalY;
      dragFactor = distY / maxDrag;

      if (dragFactor > 1) dragFactor = 1;
      if (dragFactor < -1) dragFactor = -1;
    };

    const calcProximity = (index: number) => {
      const dist = Math.abs(index - charIndexSelected);
      const maxDist = chars.length * elasticDropOff;
      const val = 1 - dist / maxDist;
      return Math.max(val, 0);
    };

    const calcFracDispersion = (index: number) => {
      const dispersion = calcProximity(index);
      return dispersion * dragFactor;
    };

    const setFontDragDimensions = () => {
      gsap.to(chars, {
        y: (index) => {
          const fracDispersion = calcFracDispersion(index);
          return fracDispersion * -maxYOffset;
        },
        x: (index) => {
          // push letters sideways away from the grabbed one
          const distance = index - charIndexSelected;
          const direction = Math.sign(distance) || 0;
          const proximity = calcProximity(index);
          const amt = Math.abs(dragFactor) * proximity;
          return direction * amt * maxXOffset;
        },
        fontWeight: (index) => {
          const fracDispersion = calcFracDispersion(index);
          return weightInit - fracDispersion * weightDiff;
        },
        fontStretch: (index) => {
          const fracDispersion = calcFracDispersion(index);
          return stretchInit - fracDispersion * stretchDiff;
        },
        scaleY: (index) => {
          const fracDispersion = calcFracDispersion(index);
          const amt = Math.abs(fracDispersion);
          return 1 + amt * 0.7; // stretch vertically
        },
        scaleX: (index) => {
          const fracDispersion = calcFracDispersion(index);
          const amt = Math.abs(fracDispersion);
          return 1 - amt * 0.4; // squash horizontally
        },
        ease: "power3.out",
        duration: 0.4,
      });
    };

    const snapBackText = () => {
      gsap.to(chars, {
        x: 0,
        y: 0,
        fontWeight: weightInit,
        fontStretch: stretchInit,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        ease: "elastic(0.4, 0.15)",
        duration: 1,
        stagger: {
          each: 0.02,
          from: charIndexSelected,
        },
      });
    };

    const initEvents = () => {
      if (isInitialized.current) return;
      
      document.body.onmouseup = function (e) {
        if (isMouseDown) {
          mouseFinalY = e.clientY;
          isMouseDown = false;
          snapBackText();
          document.body.classList.remove("grab");
        }
      };

      document.body.onmousemove = function (e) {
        if (isMouseDown) {
          mouseFinalY = e.clientY;
          calcDist();
          setFontDragDimensions();
        }
      };

      document.body.addEventListener("mouseleave", () => {
        if (isMouseDown) {
          snapBackText();
          isMouseDown = false;
          document.body.classList.remove("grab");
        }
      });

      chars.forEach((char, index) => {
        char.addEventListener("mousedown", function (e) {
          mouseInitialY = e.clientY;
          charIndexSelected = index;
          isMouseDown = true;
          document.body.classList.add("grab");
        });
      });
      
      isInitialized.current = true;
    };

    // Initialize
    init();

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === textElement) {
          trigger.kill();
        }
      });
      document.body.onmouseup = null;
      document.body.onmousemove = null;
      document.body.classList.remove("grab");
      window.removeEventListener("resize", resize);
    };
  }, [text]);

  return (
    <h2
      ref={textRef}
      className={`jello-text ${className}`}
    >
      {text}
    </h2>
  );
};
