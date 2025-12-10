import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./EssenceSection.css";
import GlassButton from "../UI/GlassButton";
import TiltTextGsap from "../UI/TiltTextGsap";

gsap.registerPlugin(ScrollTrigger);

interface EssenceSectionProps {
  logo?: string;
  tagline?: string;
  heading?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  image?: {
    src: string;
    desktop?: string;
    tablet?: string;
    mobile?: string;
    alt: string;
  };
}

const publicUrl = import.meta.env.BASE_URL;

const EssenceSection: React.FC<EssenceSectionProps> = ({
  logo,
  tagline: _tagline = "WHY FORMA?",
  heading = "WE SHAPE THE ESSENCE OF LIVING",
  description = "We envision spaces that are not just lived in, but felt — where every element has been curated to inspire connection, serenity, and belonging. Our approach transcends traditional architecture, creating environments that nurture the soul and elevate everyday moments into extraordinary experiences of comfort and beauty. From the way light moves through a room to the textures you brush past each morning, we obsess over the details so that each space tells a story, reflects its inhabitants, and quietly refreshes the spirit day after day.",
  ctaText = "VIEW OUR DESIGNS",
  ctaHref = "/projects",
  image,
}) => {
  
  // Debug logging
  console.log('EssenceSection props:', { heading, description, ctaText, ctaHref, image });
  
  // Fallback image if none provided
  const defaultImage = {
    src: `${publicUrl}images/fwi1.jpg`,
    alt: "Modern architectural design",
  };
  
  const displayImage = image || defaultImage;
  // Use the passed description or truncate it for different screen sizes
  const getDescriptionForScreen = () => {
    if (!description) return "";
    
    // For very large screens, limit to ~400 chars
    if (typeof window !== "undefined" && window.innerWidth >= 1600) {
      return description.length > 400 ? description.substring(0, 400) + "..." : description;
    }
    
    // For smaller screens, limit to ~300 chars
    if (typeof window !== "undefined" && window.innerWidth < 1600) {
      return description.length > 300 ? description.substring(0, 300) + "..." : description;
    }
    
    return description;
  };

  const sectionRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null); // animate this

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const taglineChars = taglineRef.current?.querySelectorAll(".char");

      // Initial states
      if (taglineChars && taglineChars.length > 0) {
        gsap.set(taglineChars, {
          opacity: 0,
          y: 20,
        });
      }
      if (headingRef.current) {
        gsap.set(headingRef.current, {
          opacity: 1,
        });
      }
      if (ctaRef.current) {
        gsap.set(ctaRef.current, {
          opacity: 0,
          y: 30,
        });
      }

      // Text timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 40%",
          toggleActions: "play reverse play reverse",
        },
      });

      if (taglineChars && taglineChars.length > 0) {
        tl.to(
          taglineChars,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.03,
            ease: "power2.out",
          },
          0
        );
      }

      if (ctaRef.current) {
        tl.to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          0.6
        );
      }

      // IMAGE REVEAL – clip-path on the IMAGE, right → left
      if (imageRef.current) {
        const img = imageRef.current;

        // Start hidden from LEFT side (100% inset on left)
        gsap.set(img, {
          clipPath: "inset(0% 0% 0% 100%)",
        });

        gsap.to(img, {
          clipPath: "inset(0% 0% 0% 0%)", // fully revealed
          ease: "power3.out",
          duration: 1.2,
          scrollTrigger: {
            trigger: img,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="essence-section" ref={sectionRef}>
      {/* Main Content Section */}
      <div className="essence-container">
        <div className="essence-layout">
          {/* Left side: Content with beige background */}
          <div className="essence-content">
            {logo && (
              <div className="essence-logo">
                <img src={logo} alt="Logo" />
              </div>
            )}

            <div className="essence-heading" ref={headingRef}>
              <TiltTextGsap startTrigger="top 70%" endTrigger="bottom -10%">
                {heading}
              </TiltTextGsap>
            </div>

            <div className="essence-description">
              {getDescriptionForScreen()}
            </div>

            <div ref={ctaRef} className="essence-cta-desktop">
              <GlassButton href={ctaHref}>{ctaText}</GlassButton>
            </div>
          </div>

          {/* Right side: beige bg + image sliding in over it */}
          <div className="essence-image">
            <img
              ref={imageRef}
              src={displayImage.src}
              srcSet={
                displayImage.mobile && displayImage.tablet && displayImage.desktop
                  ? `${displayImage.mobile} 700w, ${displayImage.tablet} 1000w, ${displayImage.desktop} 1200w`
                  : undefined
              }
              sizes={
                displayImage.mobile && displayImage.tablet && displayImage.desktop
                  ? "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                  : undefined
              }
              alt={displayImage.alt}
              className="essence-img"
            />
          </div>

          {/* Mobile CTA - only visible on mobile after image */}
          <div className="essence-cta-mobile">
            <GlassButton href={ctaHref}>{ctaText}</GlassButton>
          </div>
        </div>
      </div>

    </section>
  );
};

export default EssenceSection;
