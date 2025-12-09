import React, { useLayoutEffect, useRef } from "react";
import "./OurVisionSection.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface OurVisionSectionProps {
  leftText?: string;
  rightText?: string;
  centerImage?: {
    src: string;
    alt: string;
    overlayText?: string;
  };
}

const publicUrl = import.meta.env.BASE_URL;

const OurVisionSection: React.FC<OurVisionSectionProps> = ({
  leftText = "OUR",
  rightText = "VISION",
  centerImage = {
    src: `${publicUrl}images/vision-hero.jpg`,
    alt: "Modern architecture and design",
  },
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftTextRef = useRef<HTMLDivElement | null>(null);
  const rightTextRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth <= 968;

      // Initial state - text offscreen
      gsap.set(leftTextRef.current, { x: -800, opacity: 0 });
      gsap.set(rightTextRef.current, { x: 800, opacity: 0 });

      // Slide-in animation when section enters viewport
      gsap.to(leftTextRef.current, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      gsap.to(rightTextRef.current, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      if (!isMobile) {
        const screenWidth = window.innerWidth;
        const isLargeScreen = screenWidth >= 1560;
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: isLargeScreen ? "+=120%" : "+=100%",
            scrub: true,
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
          },
        });

        tl.to(
          ".vision-image-container",
          {
            scale: isLargeScreen ? 1.7 : 1.6,
            ease: "none",
          },
          0
        ).to(
          ".vision-text-right .vision-large-text",
          {
            y: isLargeScreen ? "-70vh" : "-65vh",
            ease: "none",
          },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="our-vision-section" ref={sectionRef}>
      <div className="vision-container">
        <div className="vision-layout">
          {/* Left Text */}
          <div className="vision-text-left" ref={leftTextRef}>
            <h2 className="vision-large-text">{leftText}</h2>
          </div>

          {/* Center Image */}
          <div className="vision-image-container">
            <img
              src={centerImage.src}
              alt={centerImage.alt}
              className="vision-image"
              loading="lazy"
            />
            {centerImage.overlayText && (
              <div className="vision-overlay">
                <span className="overlay-text">{centerImage.overlayText}</span>
              </div>
            )}
          </div>

          {/* Right Text */}
          <div className="vision-text-right" ref={rightTextRef}>
            <h2 className="vision-large-text">{rightText}</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurVisionSection;
