import React, { useEffect, useRef, useState } from "react";
import "./NewServicesHero.css";
import AestheticButton from "../UI/AestheticButton";

interface ServicePill {
  id: number;
  name: string;
}

interface FloatingCard {
  id: number;
  label: string;
  value: string;
  highlight: string;
  position: "left" | "right";
}

const NewServicesHero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  const servicePills: ServicePill[] = [
    { id: 1, name: "Residential Design" },
    { id: 2, name: "Interior Architecture" },
    { id: 3, name: "Space Planning" },
    { id: 4, name: "Consultation" },
  ];

  const floatingCards: FloatingCard[] = [
    {
      id: 1,
      label: "Our Focus",
      value: "Bespoke",
      highlight: "Design",
      position: "left",
    },
    {
      id: 2,
      label: "Approach",
      value: "Human",
      highlight: "Centered",
      position: "right",
    },
  ];

  const marqueeItems = [
    "Residential Design",
    "Interior Architecture",
    "Space Planning",
    "Project Consultation",
    "Sustainable Design",
    "3D Visualization",
  ];

  // Initial load animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Custom cursor animation
  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const animateCursor = () => {
      setCursorPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.1,
        y: prev.y + (mousePosition.y - prev.y) * 0.1,
      }));
      animationFrameId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const image = document.querySelector(
        ".nsh-main-image",
      ) as HTMLImageElement;
      if (image && scrolled < window.innerHeight) {
        image.style.transform = `scale(1) translateY(${scrolled * 0.08}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHoverEnter = () => setIsHovering(true);
  const handleHoverLeave = () => setIsHovering(false);

  return (
    <section className={`nsh-hero ${isLoaded ? "nsh-loaded" : ""}`}>
      {/* Background Pattern */}
      <div className="nsh-bg-pattern" />

      {/* Left Content */}
      <div className="nsh-content">
        <h1 className="nsh-title">
          <span className="nsh-title-line">
            <span>Architecture</span>
          </span>
          <span className="nsh-title-line">
            <span>That Speaks to</span>
          </span>
          <span className="nsh-title-line">
            <span>
              Your <em>Soul</em>
            </span>
          </span>
        </h1>

        <p className="nsh-description">
          We create thoughtfully designed spaces where every detail matters.
          Fresh perspectives, bold ideas, and a commitment to bringing your
          vision to life.
        </p>

        <div className="nsh-cta-group">
          <AestheticButton
            text="Discover Our Services"
            href="#services"
            className="nsh-custom-btn"
          />
        </div>

        <div className="nsh-pills">
          {servicePills.map((pill) => (
            <div
              key={pill.id}
              className="nsh-pill"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              <span>{pill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Visual */}
      <div className="nsh-visual">
        <div className="nsh-vertical-text">
          Shambala Homes — Architecture Studio
        </div>

        <div ref={imageContainerRef} className="nsh-image-container">
          <div className="nsh-deco-frame" />

          <div className="nsh-image-frame">
            <div className="nsh-image-reveal" />
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Modern Architectural Design"
              className="nsh-main-image"
            />
          </div>

          {/* Floating Cards */}
          {floatingCards.map((card) => (
            <div
              key={card.id}
              className={`nsh-floating-card nsh-card-${card.position}`}
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              <div className="nsh-card-label">{card.label}</div>
              <div className="nsh-card-value">
                {card.value} <em>{card.highlight}</em>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Marquee */}
      <div className="nsh-marquee-container">
        <div className="nsh-marquee">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="nsh-marquee-content">
              {marqueeItems.map((item, itemIdx) => (
                <span key={itemIdx} className="nsh-marquee-item">
                  <span className="nsh-marquee-dot" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewServicesHero;
