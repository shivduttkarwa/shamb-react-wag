// ServiceHero.tsx
import React, { useEffect, useRef } from "react";
import ScrollDownButton from "../UI/ScrollDownButton";
import ServiceHeroText from "./ServiceHeroText";
import ServiceHeroSlider from "./ServiceHeroSlider";
import "./ServiceHero.css";

const publicUrl = import.meta.env.BASE_URL || "/";
const getVideoPath = (videoName: string) => {
  return publicUrl.endsWith("/")
    ? `${publicUrl}images/${videoName}`
    : `${publicUrl}/images/${videoName}`;
};

const ServiceHero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
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
