import React, { FC, useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltTextGsap from "../UI/TiltTextGsap";
import "./ProcessSection.css";

gsap.registerPlugin(ScrollTrigger);

type ProcessStep = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  outcome: string;
  image: string;
  reverse?: boolean;
};

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Vision & site discovery",
    subtitle: "LISTENING TO YOUR HOME GOALS AND THE LAND",
    description:
      "As a new studio, we take the time to learn how you want to live, how your family moves through space, and what the site can offer. We review budget, timelines, and any renovation constraints to create a brief we can build on with confidence.",
    outcome:
      "A shared project brief that anchors every design and construction decision.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=1000&fit=crop",
  },
  {
    number: "02",
    title: "Concept architecture",
    subtitle: "SHAPING THE DESIGN LANGUAGE",
    description:
      "We explore massing, layout, and light to propose a design direction that works for both new builds and renovations. You will see spatial options, material intent, and early 3D views to help you feel the home before it exists.",
    outcome:
      "A concept package that balances function, beauty, and buildability.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=1000&fit=crop",
    reverse: true,
  },
  {
    number: "03",
    title: "Planning & documentation",
    subtitle: "APPROVALS AND BUILD-READY DETAILS",
    description:
      "We refine the architecture, coordinate engineering, and prepare the drawings needed for permits and pricing. Every detail is specified to reduce surprises and keep the build moving smoothly.",
    outcome:
      "Permit-ready documentation and a clear scope for your builder.",
    image:
      "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&h=1000&fit=crop",
  },
  {
    number: "04",
    title: "Construction & delivery",
    subtitle: "CRAFTED NEW BUILDS AND RENOVATIONS",
    description:
      "We stay involved through construction, collaborating with your builder and trades to protect the design intent. From site checks to finish coordination, we help ensure quality at every stage.",
    outcome:
      "A well-built home that reflects the architecture we set out to deliver.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=1000&fit=crop",
    reverse: true,
  },
  {
    number: "05",
    title: "Interiors & aftercare",
    subtitle: "LIVING-READY FINISHES AND ONGOING SUPPORT",
    description:
      "From joinery, lighting, and fixtures to final styling, we bring the interior story together so it feels cohesive and calm. We also offer post-handover support for tweaks, future phases, or renovations.",
    outcome:
      "A move-in ready home with a team you can return to as needs evolve.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=1000&fit=crop",
  },
];

export const ProcessSection: FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    // Small delay to ensure proper mounting after route navigation
    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        const q = gsap.utils.selector(rootRef);

        const stepEls = q(".shambala-process-step");

        const splitTitleChars = (el: HTMLElement | null) => {
          if (!el) return [];
          // Avoid re-splitting if already done
          if (el.querySelector(".shambala-title-char")) {
            return Array.from(
              el.querySelectorAll<HTMLElement>(".shambala-title-char")
            );
          }

          const text = el.textContent || "";
          el.textContent = "";

          const chars: HTMLElement[] = [];
          [...text].forEach((char) => {
            const span = document.createElement("span");
            const isSpace = char === " ";
            span.className = `shambala-title-char${
              isSpace ? " shambala-title-space" : ""
            }`;
            span.textContent = isSpace ? "\u00a0" : char;
            el.appendChild(span);
            chars.push(span);
          });
          return chars;
        };

        stepEls.forEach((stepEl) => {
          const step = stepEl as HTMLElement;

          const imgContainer = step.querySelector(
            ".shambala-process-step-image-container"
          ) as HTMLElement | null;
          const num = step.querySelector(
            ".shambala-process-step-number"
          ) as HTMLElement | null;
          const title = step.querySelector(
            ".shambala-process-step-title"
          ) as HTMLElement | null;
          const subtitle = step.querySelector(
            ".shambala-process-step-subtitle"
          ) as HTMLElement | null;
          const desc = step.querySelector(
            ".shambala-process-step-desc"
          ) as HTMLElement | null;
          const outcome = step.querySelector(
            ".shambala-process-outcome-box"
          ) as HTMLElement | null;

          // Image slide down reveal using clip-path
          if (imgContainer) {
            // Set initial state immediately to prevent black boxes
            gsap.set(imgContainer, {
              clipPath: "inset(100% 0 0 0)",
            });

            gsap.to(imgContainer, {
              clipPath: "inset(0% 0 0 0)",
              ease: "power3.out",
              duration: 1.2,
              scrollTrigger: {
                trigger: step,
                start: "top 70%",
                toggleActions: "play none none reverse",
                onRefresh: () => {
                  // Ensure proper state on route navigation
                  gsap.set(imgContainer, {
                    clipPath: "inset(100% 0 0 0)",
                  });
                },
              },
            });
          }

          // Content animations
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: step,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          });

          if (num) {
            tl.fromTo(
              num,
              { opacity: 0, y: 90 },
              { opacity: 1, y: 0, duration: 0.6, ease: "back.out(2.7)" }
            );
          }

          if (title) {
            const charEls = splitTitleChars(title);
            if (charEls.length) {
              gsap.set(title, { perspective: 600 });
              gsap.set(charEls, {
                opacity: 0,
                rotateX: 80,
                yPercent: 40,
                transformOrigin: "50% 100%",
              });

              tl.to(
                charEls,
                {
                  opacity: 1,
                  rotateX: 0,
                  yPercent: 0,
                  duration: 0.9,
                  ease: "expo.out",
                  stagger: {
                    each: 0.02,
                    from: "edges",
                  },
                },
                "-=0.4"
              );
            }
          }

          if (subtitle) {
            tl.fromTo(
              subtitle,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" },
              "-=0.8"
            );
          }

          if (desc) {
            tl.fromTo(
              desc,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" },
              "-=0.25"
            );
          }

          if (outcome) {
            tl.fromTo(
              outcome,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" },
              "-=0.2"
            );
          }
        });
      }, rootRef);

      return () => {
        ctx.revert();
      };
    }, 100); // 100ms delay for route navigation

    return () => clearTimeout(timeoutId);
  }, []);

  // Fix: ensure proper initialization when navigating from another route
  useEffect(() => {
    const initializeAfterRouteNavigation = () => {
      if (!rootRef.current) return;

      // Reset all image containers to initial state
      const imageContainers = rootRef.current.querySelectorAll(
        ".shambala-process-step-image-container"
      );
      imageContainers.forEach((container) => {
        gsap.set(container, {
          clipPath: "inset(100% 0 0 0)",
        });
      });

      // Reset all content elements to initial state
      const nums = rootRef.current.querySelectorAll(
        ".shambala-process-step-number"
      );
      const titles = rootRef.current.querySelectorAll(
        ".shambala-process-step-title"
      );
      const subtitles = rootRef.current.querySelectorAll(
        ".shambala-process-step-subtitle"
      );
      const descs = rootRef.current.querySelectorAll(
        ".shambala-process-step-desc"
      );
      const outcomes = rootRef.current.querySelectorAll(
        ".shambala-process-outcome-box"
      );

      gsap.set(nums, { opacity: 0, y: 90 });
      gsap.set([subtitles, descs, outcomes], { opacity: 0, y: 20 });

      // Force ScrollTrigger to recalculate and re-evaluate all triggers
      ScrollTrigger.refresh();

      // Additional refresh after a short delay to handle any layout shifts
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    // Use multiple timing strategies to ensure initialization works
    const timeoutId1 = setTimeout(initializeAfterRouteNavigation, 50);
    const timeoutId2 = setTimeout(initializeAfterRouteNavigation, 200);

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
    };
  }, []);

  return (
    <section className="shambala-process-section" ref={rootRef}>
      <TiltTextGsap tag="h2" className="shambala-process-title">
        OUR PROCESS
      </TiltTextGsap>

      {processSteps.map((step) => (
        <div
          key={step.number}
          className={`shambala-process-step ${
            step.reverse ? "shambala-process-reverse" : ""
          }`}
          data-step={step.number}
        >
          <div className="shambala-process-step-image-wrap">
            <div className="shambala-process-step-image-container">
              <img
                className="shambala-process-step-image"
                src={step.image}
                alt={step.title}
              />
            </div>
          </div>

          <div className="shambala-process-step-content">
            <div className="shambala-process-step-number shambala-process-serif">
              {step.number}
            </div>
            <h3 className="shambala-process-step-title shambala-process-serif">
              {step.title}
            </h3>
            <div className="shambala-process-step-subtitle">{step.subtitle}</div>
            <p className="shambala-process-step-desc">{step.description}</p>
            <div className="shambala-process-outcome-box">
              <div className="shambala-process-outcome-label">OUTCOME</div>
              <p className="shambala-process-outcome-text">{step.outcome}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
