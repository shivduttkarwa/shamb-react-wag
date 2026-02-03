import React, { useRef, Component, useEffect, useState } from "react";
import gsap from "gsap";
import "./NewHeroSection.css";
import { useNewHero } from "../../hooks/useHome";
import AestheticButton from "../UI/AestheticButton";

const publicUrl = import.meta.env.BASE_URL;
const posterImage = `${publicUrl}images/Petralithe_Automne.webp`;
const heroVideo = `${publicUrl}images/services-hero.mp4`;

// Core values and principles
const coreValues = [
  {
    icon: "✦",
    title: "Craftsmanship",
    description: "Meticulous attention to every detail",
  },
  {
    icon: "◆",
    title: "Innovation",
    description: "Modern design meets timeless quality",
  },
  {
    icon: "✧",
    title: "Integrity",
    description: "Built on trust and transparency",
  },
  {
    icon: "❖",
    title: "Sustainability",
    description: "Eco-conscious building practices",
  },
  {
    icon: "✵",
    title: "Excellence",
    description: "Uncompromising quality in execution",
  },
  {
    icon: "◈",
    title: "Collaboration",
    description: "Partnership-driven approach",
  },
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
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const valuesRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const { heroData } = useNewHero();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    // Animation delay matching NewServicesHero
    const heroAnimDelay = 1.6; // seconds

    // Set initial states - similar to NewServicesHero
    gsap.set(titleRef.current, { yPercent: 120, opacity: 0 });
    gsap.set(descriptionRef.current, { y: 30, opacity: 0 });
    gsap.set(ctaRef.current, { y: 30, opacity: 0 });

    // Set value items initial state
    if (valuesRef.current) {
      const valueItems = valuesRef.current.querySelectorAll(".hero-value-item");
      gsap.set(valueItems, {
        y: 30,
        opacity: 0,
      });
    }

    // Create timeline - similar to NewServicesHero
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      paused: true,
      onComplete: () => setHasAnimated(true),
    });

    // Animate title with slide up effect
    tl.to(
      titleRef.current,
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
      },
      0,
    );

    // Animate description
    tl.to(
      descriptionRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
      },
      0.4,
    );

    // Animate values with stagger
    if (valuesRef.current) {
      const valueItems = valuesRef.current.querySelectorAll(".hero-value-item");
      tl.to(
        valueItems,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
        },
        0.6,
      );
    }

    // Animate CTA button
    tl.to(
      ctaRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
      },
      0.9,
    );

    // Delay and play
    gsap.delayedCall(heroAnimDelay, () => tl.play());

    return () => {
      tl.kill();
    };
  }, [hasAnimated]);

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
                "#new-hero-section .video-poster",
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
            <h1 ref={titleRef} className="hero-main-title">
              CRAFTING DREAMS INTO
              <span className="hero-highlight"> Reality</span>
            </h1>

            <p ref={descriptionRef} className="hero-description">
              We transform visions into exceptional living spaces where modern
              design meets timeless craftsmanship. Every home we create is a
              testament to quality, innovation, and dedication.
            </p>

            {/* Core Values Section */}
            <div ref={valuesRef} className="hero-values">
              {coreValues.map((value, index) => (
                <div key={index} className="hero-value-item">
                  <div className="hero-value-icon">{value.icon}</div>
                  <div className="hero-value-content">
                    <div className="hero-value-title">{value.title}</div>
                    <div className="hero-value-description">
                      {value.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div ref={ctaRef} className="hero-cta">
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
