import React, { useRef, useEffect } from "react";
import "./EssenceSection.css";
import AestheticButton from "../UI/AestheticButton";
import FallingTextVideoComponent from "../UI/FallingTextVideoComponent";
import TiltTextGsap from "../UI/TiltTextGsap";
import { initGsapSwitchAnimations } from "../../lib/gsapSwitchAnimations";

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
  videoUrl?: string;
}

const publicUrl = import.meta.env.BASE_URL;

const EssenceSection: React.FC<EssenceSectionProps> = ({
  logo,
  tagline: _tagline = "WHY shambala?",
  heading = "WE SHAPE THE ESSENCE OF LIVING",
  description = "We envision spaces that are not just lived in, but felt — where every element has been curated to inspire connection, serenity, and belonging. Our approach transcends traditional architecture, creating environments that nurture the soul and elevate everyday moments into extraordinary experiences of comfort and beauty. From the way light moves through a room to the textures you brush past each morning, we obsess over the details so that each space tells a story, reflects its inhabitants, and quietly refreshes the spirit day after day.",
  ctaText = "VIEW OUR DESIGNS",
  ctaHref = "/projects",
  image = {
    src: `${publicUrl}images/fwi1.jpg`,
    alt: "Modern architectural design",
  },
  videoUrl = `${publicUrl}images/hero1.mp4`,
}) => {
  const shortDescription =
    "We envision spaces that are not just lived in, but felt — where every element has been curated to inspire connection, serenity, and belonging. Our approach transcends traditional architecture, creating environments that nurture the soul and elevate everyday moments into extraordinary experiences of comfort and beauty.";
  
  const extraLargeDescription = 
    "We envision spaces that are not just lived in, but felt — where every element has been curated to inspire connection, serenity, and belonging. Our approach transcends traditional architecture, creating environments that nurture the soul and elevate everyday moments into extraordinary experiences of comfort.";

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return initGsapSwitchAnimations(sectionRef.current || undefined);
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

            <div className="essence-heading" data-gsap="fade-up">
              <TiltTextGsap startTrigger="top 70%" endTrigger="bottom -10%">
                {heading}
              </TiltTextGsap>
            </div>

            <div className="essence-description" data-gsap="fade-up" data-gsap-delay="0.1">
              {typeof window !== "undefined" && window.innerWidth >= 1600
                ? extraLargeDescription
                : typeof window !== "undefined" && window.innerWidth < 1600
                ? shortDescription
                : description}
            </div>

            <div className="essence-cta-desktop" data-gsap-delay="0.2">
              <AestheticButton href={ctaHref}>{ctaText}</AestheticButton>
            </div>
          </div>

          {/* Right side: beige bg + image sliding in over it */}
          <div className="essence-image" data-gsap="clip-reveal-center">
            <img
              src={image.src}
              srcSet={
                image.mobile && image.tablet && image.desktop
                  ? `${image.mobile} 700w, ${image.tablet} 1000w, ${image.desktop} 1200w`
                  : undefined
              }
              sizes={
                image.mobile && image.tablet && image.desktop
                  ? "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                  : undefined
              }
              alt={image.alt}
              className="essence-img"
            />
          </div>

          {/* Mobile CTA - only visible on mobile after image */}
          <div className="essence-cta-mobile">
            <AestheticButton href={ctaHref}>{ctaText}</AestheticButton>
          </div>
        </div>
      </div>

      {/* Video Text Animation Section */}
      {videoUrl && (
        <FallingTextVideoComponent
          leftText="SERVICES"
          rightText="PROJETS"
          videoSrc={videoUrl}
          bottomLeftText="Design"
          bottomRightText="purpose"
        />
      )}
    </section>
  );
};

export default EssenceSection;
