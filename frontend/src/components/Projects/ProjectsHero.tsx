import React, { useEffect, useRef } from "react";
import ScrollDownButton from "../UI/ScrollDownButton";
import gsap from "gsap";
import "./ProjectsHero.css";

const publicUrl = import.meta.env.BASE_URL || "/";
const getVideoPath = (videoName: string) => {
  return publicUrl.endsWith("/") 
    ? `${publicUrl}images/${videoName}`
    : `${publicUrl}/images/${videoName}`;
};

const ProjectsHero: React.FC = () => {
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const animateText = (element: HTMLElement, stagger = 0.05) => {
      const chars = element.textContent?.split("") || [];
      element.innerHTML = "";
      const spans: HTMLElement[] = [];
      chars.forEach((ch) => {
        const span = document.createElement("span");
        if (ch === " ") {
          span.innerHTML = "&nbsp;";
        } else {
          span.textContent = ch;
        }
        span.style.display = "inline-block";
        element.appendChild(span);
        spans.push(span);
      });

      gsap.fromTo(
        spans,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger,
          duration: 1.2,
          ease: "back.out(1.4)",
          delay: 2.0 // Set to 2 seconds
        }
      );
    };

    if (heroTitleRef.current) animateText(heroTitleRef.current, 0.08);
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 3.0, ease: "power2.out" } // 1 second after title
      );
    }

    // Auto-play video
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handle autoplay failure silently
      });
    }
  }, []);

  return (
    <div className="pr-hero-container">
      {/* Background Video */}
      <div className="pr-hero-video">
        <video 
          ref={videoRef}
          src={getVideoPath("projects-hero.webm")}
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

      {/* Content */}
      <div className="pr-hero-content">
        <h1 ref={heroTitleRef} className="pr-hero-title">
          PROJECTS
        </h1>
        <p ref={subtitleRef} className="pr-hero-subtitle">
          Architectural excellence through timeless design
        </p>
      </div>
      <ScrollDownButton targetId="projects-slider" />
    </div>
  );
};

export default ProjectsHero;
