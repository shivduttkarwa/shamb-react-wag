import React, { useRef, Component, useEffect, useState } from "react";
import "./NewHeroSection.css";
import { useNewHero } from "../../hooks/useHome";
import AestheticButton from "../UI/AestheticButton";

const publicUrl = import.meta.env.BASE_URL;
const posterImage = `${publicUrl}images/Petralithe_Automne.webp`;
const heroVideo = `${publicUrl}images/services-hero.mp4`;

// Core values and principles
const coreValues = [
  { icon: "✦", title: "Craftsmanship", description: "Meticulous attention to every detail" },
  { icon: "◆", title: "Innovation", description: "Modern design meets timeless quality" },
  { icon: "✧", title: "Integrity", description: "Built on trust and transparency" },
  { icon: "❖", title: "Sustainability", description: "Eco-conscious building practices" },
  { icon: "✵", title: "Excellence", description: "Uncompromising quality in execution" },
  { icon: "◈", title: "Collaboration", description: "Partnership-driven approach" },
];

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
        className="hero-section new-hero-section about-hero"
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
          <div className="hero-text-wrapper">
            <h1 className="hero-main-title">
              Crafting Dreams Into
              <span className="hero-highlight"> Reality</span>
            </h1>

            <p className="hero-description">
              We transform visions into exceptional living spaces where modern design meets timeless craftsmanship.
              Every home we create is a testament to quality, innovation, and dedication.
            </p>

            {/* Core Values Section */}
            <div className="hero-values">
              {coreValues.map((value, index) => (
                <div key={index} className="hero-value-item">
                  <div className="hero-value-icon">{value.icon}</div>
                  <div className="hero-value-content">
                    <div className="hero-value-title">{value.title}</div>
                    <div className="hero-value-description">{value.description}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hero-cta">
              <AestheticButton href={heroData?.cta.link || "#about"}>
                {heroData?.cta.text || "Discover Our Story"}
              </AestheticButton>
            </div>
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
