import React, { useRef, Component } from "react";
import "./NewHeroSection.css";
import { useNewHero } from "../../hooks/useHome";
import GlassRainButton from "../UI/GlassRainButton";

const publicUrl = import.meta.env.BASE_URL;
const posterImage = `${publicUrl}images/Petralithe_Automne.webp`;
const heroVideo = `${publicUrl}images/services-hero.mp4`;

// Error Boundary Component
class HeroErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return (
        <section className="hero-section">
          <div>Error loading hero content</div>
        </section>
      );
    }

    return this.props.children;
  }
}

const NewHeroSectionContent: React.FC = () => {
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const { heroData } = useNewHero();

  return (
    <>
      <section
        ref={heroSectionRef}
        className="hero-section new-hero-section"
        id="new-hero-section"
      >
        {/* Poster image - static image that shows while video loads */}
        <div
          className="image-background video-poster"
          style={{
            backgroundImage: `url(${posterImage})`,
          }}
        />

        {/* Video - loads over the poster image */}
        <video
          className="video-background"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          preload="auto"
          onCanPlay={() => {
            // Keep poster visible for 2-3 seconds before showing video
            setTimeout(() => {
              const poster = document.querySelector(
                "#new-hero-section .video-poster"
              );
              if (poster) {
                (poster as HTMLElement).style.opacity = "0";
              }
            }, 2500); // 2.5 seconds delay
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="hero-text">
            <h1>WE BUILD</h1>
            <div className="hero-second-line">
              EXCELLENCE
            </div>
          </div>

          <div className="hero-cta">
            <GlassRainButton href={heroData?.cta.link || "#about"}>
              {heroData?.cta.text || "Discover Our Story"}
            </GlassRainButton>
          </div>
        </div>
      </section>
    </>
  );
};

const NewHeroSection: React.FC = () => {
  return (
    <HeroErrorBoundary>
      <NewHeroSectionContent />
    </HeroErrorBoundary>
  );
};

export default NewHeroSection;
