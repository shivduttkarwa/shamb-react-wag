// HeroTextAnimation.tsx - Adapted from TextRevealIntro for ServiceDetails
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./HeroTextAnimation.css";

interface HeroTextAnimationProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const HeroTextAnimation: React.FC<HeroTextAnimationProps> = ({ 
  title, 
  subtitle,
  className = "" 
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const BASE_DURATION = 1;
    const logoEntranceDuration = BASE_DURATION * 0.8;

    // GSAP selector scoped to this component only
    const q = gsap.utils.selector(rootRef);

    const chevrons = q("svg") as Element[];
    const heroTitle = q(".hero-anim-title")[0] as HTMLElement;
    const heroSubtitle = q(".hero-anim-subtitle")[0] as HTMLElement;

    if (!heroTitle) return;

    const timeline = gsap.timeline({ delay: 0.3 });

    // PHASE 1: SVGs and Title appear together at EXACTLY the same time
    if (chevrons.length > 0) {
      // Start SVGs closer together for title-only layout
      gsap.set(chevrons[0], { x: 20 }); // Move right chevron closer
      gsap.set(chevrons[1], { x: -20 }); // Move left chevron closer
      
      // SVGs appear with EXACT same animation as title - from scale 0 to 1
      timeline.fromTo(chevrons, 
        { scale: 0, opacity: 0 }, // Start from scale 0 like title
        {
          duration: logoEntranceDuration,
          scale: 1,
          opacity: 1,
          ease: "back.out(1.4)", // Same easing as title
          stagger: 0, // NO stagger - appear simultaneously
        }
      );
    }

    // Title appears with SVGs - EXACT same timing and animation
    timeline.fromTo(
      heroTitle,
      { scale: 0, opacity: 0 },
      {
        duration: logoEntranceDuration, // Same duration as SVGs
        scale: 1,
        opacity: 1,
        ease: "back.out(1.4)", // Same easing as SVGs
      },
      `-=${logoEntranceDuration}` // Start at exact same time as SVGs
    );

    // PHASE 2: Very short pause before description
    timeline.to({}, { duration: 0.15 });

    // PHASE 3: SVGs move apart to create space for description
    if (heroSubtitle && chevrons.length > 0) {
      // Move SVGs apart to their final positions (creating space for description)
      timeline.to(chevrons[0], {
        duration: 0.7,
        x: -60, // Move left more to create space
        ease: "power2.inOut",
      }, "expand");
      
      timeline.to(chevrons[1], {
        duration: 0.7,
        x: 60, // Move right more to create space  
        ease: "power2.inOut",
      }, "expand");

      // Description appears as SVGs move apart - faster timing
      timeline.fromTo(
        heroSubtitle,
        { scale: 0.9, opacity: 0, y: 30 },
        {
          duration: 0.8,
          scale: 1,
          opacity: 1,
          y: 0,
          ease: "power2.out",
        },
        "expand+=0.05"
      );
    } else if (heroSubtitle) {
      // Fallback if no SVGs
      timeline.fromTo(
        heroSubtitle,
        { scale: 0.9, opacity: 0, y: 30 },
        {
          duration: 0.8,
          scale: 1,
          opacity: 1,
          y: 0,
          ease: "power2.out",
        }
      );
    }

    return () => {
      timeline.kill();
    };
  }, [title, subtitle]);

  return (
    <div className={`hero-anim-root ${className}`} ref={rootRef}>
      <div className="hero-anim-container">
        <div className="hero-anim-logo-container">
          <div className="hero-anim-chevron-container">
            {/* LEFT CHEVRON */}
            <svg
              className="hero-anim-chevron hero-anim-chevron-left"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 67.3 114.3"
            >
              <g>
                <path
                  fill="#523a28"
                  d="M36.2,58.3c0.1,2.1,1.5,3.7,2.5,5.4c8.8,14.5,17.7,28.9,26.5,43.4c3.1,5.2,2.4,7-3.5,7.2
	c-8,0.3-16,0-23.9-0.4c-3.9-0.2-6.3-2.9-8.1-6C20.4,93,11.3,78.1,2.1,63.3c-1.8-2.9-3-6.1-1.4-9C6,45.1,11,35.7,17.8,27.5
	c3.3,3.2,4.4,7.7,7.1,11.3c0.9,1.6,2,3.1,3,4.6c1.1,1.7,2.2,3.4,3.2,5.2C32.5,52,35.9,54.3,36.2,58.3z"
                />
                <path
                  fill="#f8c175"
                  d="M36.2,58.3c-2.3-3-4.7-5.9-6.1-9.5c0.9-1.5,2.6-2,3.8-3.1c3.7-3.5,3.7-7.1-0.1-10.8c-1.5-1-2.8-2.4-4.2-3.5
	c-3.2-2.9-7.2-5-9.6-8.8c3.2-5.3,6.3-10.5,9.5-15.8c2.5-4.2,6.1-6.5,11-6.6c7.5-0.1,15-0.2,22.5-0.1c4.7,0.1,5.6,1.8,3.1,6
	c-7.7,12.8-15.5,25.6-23.3,38.3C39.9,48.8,37.5,53.3,36.2,58.3z"
                />
                <path
                  fill="#eab366"
                  d="M19.9,22.6c4,2,6.9,5.4,10.3,8.2c0,4.3-1.6,7.5-6,8.9c-2.7-3.7-5.5-7.4-6.5-12.1
		C17,25.2,18.5,23.9,19.9,22.6z"
                />
                <path
                  fill="#73952e"
                  d="M34.2,33.7c2.5,1.6,4.6,3.4,3.9,6.8c-0.9,4.4-3.3,7.5-8,8.3c-1.3-1.4-2.4-2.9-3-4.8
		C29,40.2,31.8,37.1,34.2,33.7z"
                />
                <path
                  fill="#ccb99f"
                  d="M34.2,33.7c-0.9,4.5-3.4,7.8-7.1,10.2c-1.3-1.2-2.2-2.6-2.8-4.3c2.8-2.4,4.5-5.6,6-8.9
		C31.6,31.7,32.9,32.7,34.2,33.7z"
                />
              </g>
            </svg>

            {/* TEXT */}
            <div className="hero-anim-text-container">
              <div className="hero-anim-text">
                <h1 className="hero-anim-title">{title}</h1>
                {subtitle && <p className="hero-anim-subtitle">{subtitle}</p>}
              </div>
            </div>

            {/* RIGHT CHEVRON */}
            <svg
              className="hero-anim-chevron hero-anim-chevron-right"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 67.1 114"
            >
              <g>
                <path
                  fill="#73952e"
                  d="M31.2,55.4c-4-9-10-16.8-15-25.2c-4.7-8-9.8-15.8-14.7-23.7c-2.8-4.6-2-6.3,3.5-6.4c7.3-0.1,14.6,0,22,0.1
	c4.9,0,8.5,2.4,11,6.5c9,14.7,18,29.5,27.1,44.1c2.8,4.5,2.6,8.7-0.2,13.1c-4.9,7.7-9.7,15.5-14.5,23.2c-3.1-0.3-2.6-3.3-3.9-4.9
	c-0.6-1.4-1.2-2.7-2.1-4c-0.7-1.1-1.4-2.2-2-3.3c-0.9-1.7-2-3.3-3.1-4.8c-1.1-1.6-1.9-3.4-3.1-5.1C34.6,61.7,32,59,31.2,55.4z"
                />
                <path
                  fill="#f8c175"
                  d="M31.2,55.4c2.6,2.7,4.3,6,6,9.3c-1.3,1.6-3.4,1.9-5,3.2c-4.3,3.6-4.3,5.3,0,8.9c1.2,0.9,2.3,2,3.6,2.9
	c1.4,0.9,2.6,2.2,4,3.3c1.4,1,2.8,1.9,4,3.1c1.4,1.6,3.8,2.1,4.4,4.6c-3.3,5.7-6.6,11.5-10.1,17.1c-2.5,4.1-6.1,6.3-11.2,6.1
	c-7.1-0.2-14.3-0.1-21.4-0.1c-5.5-0.1-6.3-1.5-3.5-6.2C10.5,93.4,19,79.2,27.8,65.1C29.8,62,30.1,58.6,31.2,55.4z"
                />
                <path
                  fill="#b8a78b"
                  d="M48.1,90.7c-1.6-1.4-3.9-1.9-4.9-4c-1.2-3.8,1.3-4.6,4.1-5.2c2,1.3,1.2,4.3,3.2,5.5
		C49.7,88.3,48.9,89.5,48.1,90.7z"
                />
                <path
                  fill="#eab366"
                  d="M32.1,77.7c-6.1-2.8-6.5-5.3-1.5-10c1.9-1.8,3.8-3.1,6.5-3c1,1.7,2,3.3,3.1,5
		C38.3,73.1,34.7,74.9,32.1,77.7z"
                />
                <path
                  fill="#5f7b26"
                  d="M32.1,77.7c1-4.4,5-5.7,8.1-8c1.3,1.5,2.5,3,3.1,5c-2.8,1.9-5,4.6-8.1,6C33.8,80,32.8,79,32.1,77.7z"
                />
                <path
                  fill="#523a28"
                  d="M35.1,80.7c2.3-2.6,3.9-6,8.1-6c0.6,1,1.3,2,1.9,3c-1.2,2.8-4,4-6,6C37.8,82.7,36.5,81.7,35.1,80.7z"
                />
                <path
                  fill="#ccb99f"
                  d="M39.1,83.7c0.4-3.6,3.9-4.1,6-6c1.2,1,1.8,2.3,2.1,3.9c-1.3,1.8-4.1,2.3-4.1,5.2
		C41.8,85.7,40.5,84.7,39.1,83.7z"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroTextAnimation;