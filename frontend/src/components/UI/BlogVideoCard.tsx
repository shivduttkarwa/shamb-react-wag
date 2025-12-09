import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BlogVideoCard.css';

gsap.registerPlugin(ScrollTrigger);

interface BlogVideoCardProps {
  videoSrc: string;
  fallbackImage?: string;
}

const BlogVideoCard: React.FC<BlogVideoCardProps> = ({ 
  videoSrc, 
  fallbackImage
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Image slide down reveal using clip-path (same as ProcessSection)
    gsap.to(containerRef.current, {
      clipPath: "inset(0% 0 0 0)",
      ease: "power3.out",
      duration: 1.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && !isFullscreen && videoLoaded) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && !isFullscreen) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleCardClick = () => {
    setIsFullscreen(true);
    // Pause the small video and play the fullscreen one
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setTimeout(() => {
      if (fullscreenVideoRef.current) {
        fullscreenVideoRef.current.play();
      }
    }, 100);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.pause();
      fullscreenVideoRef.current.currentTime = 0;
    }
  };

  return (
    <>
      <div 
        ref={containerRef}
        className="blog-video-card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
      >
        {/* Fallback image while video loads or if video fails */}
        {!videoLoaded && fallbackImage && (
          <img 
            src={fallbackImage} 
            alt="Video fallback" 
            className="blog-video-card-fallback"
          />
        )}
        
        <video
          ref={videoRef}
          className="blog-video-card-video"
          src={videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoLoaded(false)}
        />
        
        {/* Play icon overlay */}
        <div className={`blog-video-card-play-icon ${isHovered ? 'visible' : ''}`}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>

      {/* Fullscreen video modal */}
      {isFullscreen && (
        <div className="blog-video-fullscreen-overlay" onClick={handleCloseFullscreen}>
          <div className="blog-video-fullscreen-container" onClick={(e) => e.stopPropagation()}>
            <button 
              className="blog-video-close-btn"
              onClick={handleCloseFullscreen}
              aria-label="Close video"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            
            <video
              ref={fullscreenVideoRef}
              className="blog-video-fullscreen"
              src={videoSrc}
              controls
              autoPlay
              preload="metadata"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BlogVideoCard;
