import React, { FC, useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JelloText } from "../common/JelloText";
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
    title: "Understand your needs",
    subtitle: "BUILDING STRATEGY AROUND YOUR PERSONAL GOALS",
    description:
      "Before we make any recommendations, we take the time to understand your current financial position and where you'd like to be in the years ahead. Together, we map out your goals, priorities, and comfort levels so every step forward is grounded in your reality.",
    outcome:
      "A clear foundation that ensures every decision is aligned with your goals and long-term vision.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=1000&fit=crop",
  },
  {
    number: "02",
    title: "We plan a strategy.",
    subtitle: "TURNING YOUR AMBITIONS INTO A ROADMAP",
    description:
      "With your goals in mind, we create a tailored investment strategy designed to fit your circumstances. Every recommendation is based on clarity and long-term thinking, so we make choices that directly benefit your unique situation.",
    outcome:
      "A structured, personalised plan that aligns property opportunities with your financial objectives.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=1000&fit=crop",
    reverse: true,
  },
  {
    number: "03",
    title: "We present a solution.",
    subtitle: "TAILORING AN APPROACH TO MATCH YOUR NEEDS",
    description:
      "With your strategy in place, we present the property and finance opportunities that bring it to life. Every recommendation is chosen to align with your circumstances and aspirations, ensuring the path forward feels clear and achievable.",
    outcome:
      "A customised solution designed for long-term success, not one-size-fits-all advice.",
    image:
      "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&h=1000&fit=crop",
  },
  {
    number: "04",
    title: "We source properties.",
    subtitle: "FINDING THE RIGHT INVESTMENTS FOR YOU",
    description:
      "Our team searches the market to identify properties that align with your identified plan. We focus on quality builds, strong locations, and long-term growth potential—ensuring every option supports your financial future.",
    outcome:
      "Carefully selected properties that match your strategy and give you confidence in every purchase.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=1000&fit=crop",
    reverse: true,
  },
  {
    number: "05",
    title: "We manage and review.",
    subtitle: "SUPPORT THAT CONTINUES BEYOND THE PURCHASE",
    description:
      "Securing a property is just the beginning. We stay by your side with ongoing support—from tenant management to regular six-month strategy reviews—so your investments stay aligned with your goals and adapt as life and markets change.",
    outcome:
      "Long-term guidance that keeps your portfolio performing and your goals on track.",
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

        const stepEls = q(".forma-process-step");

        const splitTitleChars = (el: HTMLElement | null) => {
          if (!el) return [];
          // Avoid re-splitting if already done
          if (el.querySelector(".forma-title-char")) {
            return Array.from(
              el.querySelectorAll<HTMLElement>(".forma-title-char")
            );
          }

          const text = el.textContent || "";
          el.textContent = "";

          const chars: HTMLElement[] = [];
          [...text].forEach((char) => {
            const span = document.createElement("span");
            const isSpace = char === " ";
            span.className = `forma-title-char${
              isSpace ? " forma-title-space" : ""
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
            ".forma-process-step-image-container"
          ) as HTMLElement | null;
          const num = step.querySelector(
            ".forma-process-step-number"
          ) as HTMLElement | null;
          const title = step.querySelector(
            ".forma-process-step-title"
          ) as HTMLElement | null;
          const subtitle = step.querySelector(
            ".forma-process-step-subtitle"
          ) as HTMLElement | null;
          const desc = step.querySelector(
            ".forma-process-step-desc"
          ) as HTMLElement | null;
          const outcome = step.querySelector(
            ".forma-process-outcome-box"
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
        ".forma-process-step-image-container"
      );
      imageContainers.forEach((container) => {
        gsap.set(container, {
          clipPath: "inset(100% 0 0 0)",
        });
      });

      // Reset all content elements to initial state
      const nums = rootRef.current.querySelectorAll(
        ".forma-process-step-number"
      );
      const titles = rootRef.current.querySelectorAll(
        ".forma-process-step-title"
      );
      const subtitles = rootRef.current.querySelectorAll(
        ".forma-process-step-subtitle"
      );
      const descs = rootRef.current.querySelectorAll(
        ".forma-process-step-desc"
      );
      const outcomes = rootRef.current.querySelectorAll(
        ".forma-process-outcome-box"
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
    <section className="forma-process-section" ref={rootRef}>
      <JelloText text="OUR PROCESS" className="forma-process-title" />

      {processSteps.map((step) => (
        <div
          key={step.number}
          className={`forma-process-step ${
            step.reverse ? "forma-process-reverse" : ""
          }`}
          data-step={step.number}
        >
          <div className="forma-process-step-image-wrap">
            <div className="forma-process-step-image-container">
              <img
                className="forma-process-step-image"
                src={step.image}
                alt={step.title}
              />
            </div>
          </div>

          <div className="forma-process-step-content">
            <div className="forma-process-step-number forma-process-serif">
              {step.number}
            </div>
            <h3 className="forma-process-step-title forma-process-serif">
              {step.title}
            </h3>
            <div className="forma-process-step-subtitle">{step.subtitle}</div>
            <p className="forma-process-step-desc">{step.description}</p>
            <div className="forma-process-outcome-box">
              <div className="forma-process-outcome-label">OUTCOME</div>
              <p className="forma-process-outcome-text">{step.outcome}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
