// ServiceHero.tsx
import React, { useEffect, useRef } from "react";
import ScrollDownButton from "../UI/ScrollDownButton";
import ServiceHeroText from "./ServiceHeroText";
import ServiceHeroSlider from "./ServiceHeroSlider";
import "../Projects/ProjectsHero.css"; // Use ProjectsHero styling

// Add custom CSS for XL screen letter spacing and font size
const xlScreenStyles = `
  @media (min-width: 1280px) {
    .pr-hero-title .mm-section {
      font-size: calc(clamp(70px, 8vw, 90px) * 1.5) !important; /* Increase font size by 50% */
    }
    .pr-hero-title .mm-heading {
      font-size: calc(clamp(70px, 8vw, 90px) * 1.5) !important; /* Increase font size by 50% */
      letter-spacing: calc(0.05em * 1.7) !important; /* Increase letter spacing by 70% */
    }
    .pr-hero-title .mm-second-line {
      font-size: calc(clamp(70px, 8vw, 90px) * 1.5) !important; /* Increase font size by 50% */
      letter-spacing: calc(0.05em * 1.7) !important; /* Increase letter spacing by 70% */
    }
    .pr-hero-title .mm-second-line .changing-text {
      font-size: calc(clamp(70px, 8vw, 90px) * 1.5) !important; /* Increase font size by 50% */
      letter-spacing: calc(0.05em * 1.7) !important; /* Increase letter spacing by 70% */
    }
    .pr-hero-title .mm-second-line .changing-text span {
      font-size: calc(clamp(70px, 8vw, 90px) * 1.5) !important; /* Increase font size by 50% */
      letter-spacing: calc(0.05em * 1.7) !important; /* Increase letter spacing by 70% */
    }
  }

  @media (min-width: 1600px) {
    .pr-hero-title .mm-section {
      font-size: calc(clamp(70px, 8vw, 90px) * 1.4) !important; /* Increase font size by 40% */
    }
    .pr-hero-title .mm-heading {
      font-size: calc(clamp(70px, 8vw, 90px) * 1.4) !important; /* Increase font size by 40% */
      letter-spacing: calc(0.05em * 1.7) !important; /* Increase letter spacing by 70% */
    }
    .pr-hero-title .mm-second-line {
      font-size: calc(clamp(70px, 8vw, 90px) * 1.4) !important; /* Increase font size by 40% */
      letter-spacing: calc(0.05em * 1.7) !important; /* Increase letter spacing by 70% */
    }
    .pr-hero-title .mm-second-line .changing-text {
      font-size: calc(clamp(70px, 8vw, 90px) * 1.4) !important; /* Increase font size by 40% */
      letter-spacing: calc(0.05em * 1.7) !important; /* Increase letter spacing by 70% */
    }
    .pr-hero-title .mm-second-line .changing-text span {
      font-size: calc(clamp(70px, 8vw, 90px) * 1.4) !important; /* Increase font size by 40% */
      letter-spacing: calc(0.05em * 1.7) !important; /* Increase letter spacing by 70% */
    }
  }

  /* Position the slider in right bottom corner */
  .pr-hero-container .mh-ui-news {
    position: absolute;
    z-index: 60;
    pointer-events: auto;
    opacity: 1;
    bottom: 2rem;
    right: 2rem;
  }

  .pr-hero-container .hh-slider-window {
    width: 240px;
    max-width: 260px;
    overflow: hidden;
    border-radius: 14px;
    background: rgba(15, 23, 42, 0.9);
    border: 1px solid rgba(148, 163, 184, 0.4);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
  }

  .pr-hero-container .hh-slider-track {
    display: flex;
    transition: transform 0.6s ease;
    will-change: transform;
  }

  .pr-hero-container .hh-slide {
    flex: 0 0 100%;
    padding: 0.95rem 1.1rem 1.1rem;
    color: #e5e7eb;
    box-sizing: border-box;
  }

  .pr-hero-container .hh-label {
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    opacity: 0.7;
    margin-bottom: 0.35rem;
  }

  .pr-hero-container .hh-title {
    font-size: 0.95rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .pr-hero-container .hh-meta {
    font-size: 0.78rem;
    opacity: 0.85;
  }

  .pr-hero-container .hh-read {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    margin-top: 0.5rem;
    font-size: 0.82rem;
    text-decoration: none;
    color: #f7d046;
    letter-spacing: 0.06em;
  }

  .pr-hero-container .hh-read:hover {
    color: #ffffff;
  }

  .pr-hero-container .hh-dots {
    display: flex;
    gap: 0.4rem;
    justify-content: center;
    width: 240px;
    margin: 0.5rem auto 0;
    padding-left: 0;
  }

  .pr-hero-container .hh-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.35);
    cursor: pointer;
    padding: 0;
  }

  .pr-hero-container .hh-dot.active {
    background: #f7d046;
  }

  /* Extra Large Screens - Increase hero news slide dimensions */
  @media (min-width: 1560px) {
    .pr-hero-container .hh-slider-window {
      width: calc(240px * 1.3) !important; /* 312px - 30% wider */
      max-width: calc(260px * 1.3) !important; /* 338px - 30% wider */
      margin-left: -26px; /* Push 35px to the left (20px + 15px more) */
    }
    
    .pr-hero-container .hh-slide {
      padding: calc(0.95rem * 1.2) calc(1.1rem * 1.2) calc(1.1rem * 1.2) !important; /* 20% more padding */
    }
    
    /* Increase text sizes by 20% */
    .pr-hero-container .hh-label {
      font-size: calc(0.7rem * 1.2) !important; /* 0.84rem */
    }
    
    .pr-hero-container .hh-title {
      font-size: calc(0.95rem * 1.2) !important; /* 1.14rem */
    }
    
    .pr-hero-container .hh-meta {
      font-size: calc(0.78rem * 1.2) !important; /* 0.936rem */
    }
    
    .pr-hero-container .hh-read {
      font-size: calc(0.82rem * 1.2) !important; /* 0.984rem */
    }
    
    /* Increase pagination dot size by 15% and center in enlarged slider */
    .pr-hero-container .hh-dots {
      width: calc(260px * 1.3) !important; /* Match slider max-width (338px) for proper centering */
      margin: 0.5rem 0 0 !important; /* Remove auto centering */
      transform: translateX(-42px) !important; /* Push dots 30px to the left */
    }
    
    .pr-hero-container .hh-dot {
      width: calc(12px * 1.15) !important; /* 13.8px */
      height: calc(12px * 1.15) !important; /* 13.8px */
    }
  }

  @media (max-width: 575.98px) {
    .pr-hero-container .mh-ui-news {
      display: none;
    }
  }
`;

const publicUrl = import.meta.env.BASE_URL || "/";
const getVideoPath = (videoName: string) => {
  return publicUrl.endsWith("/") 
    ? `${publicUrl}images/${videoName}`
    : `${publicUrl}/images/${videoName}`;
};

const ServiceHero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Inject custom styles for XL screens
    const styleElement = document.createElement('style');
    styleElement.textContent = xlScreenStyles;
    document.head.appendChild(styleElement);

    // Auto-play video
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handle autoplay failure silently
      });
    }

    // Cleanup styles on unmount
    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  return (
    <div className="pr-hero-container">
      {/* Background Video */}
      <div className="pr-hero-video">
        <video 
          ref={videoRef}
          src={getVideoPath("services-hero-vid.mp4")}
          muted 
          loop 
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <div className="pr-hero-overlay"></div>
      </div>

      {/* Content - Only ServiceHeroText, no description */}
      <div className="pr-hero-content">
        <div className="pr-hero-title">
          <ServiceHeroText text={"Building"} />
        </div>
      </div>
      <ScrollDownButton targetId="services-content" />
      <ServiceHeroSlider />
    </div>
  );
};

export default ServiceHero;
