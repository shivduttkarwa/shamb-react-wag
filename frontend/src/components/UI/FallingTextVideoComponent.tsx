import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FallingTextVideoComponent.css";

gsap.registerPlugin(ScrollTrigger);

interface FallingTextVideoComponentProps {
  leftText?: string;
  rightText?: string;
  videoSrc?: string;
  backgroundColor?: string;
  bottomLeftText?: string;
  bottomRightText?: string;
}

const FallingTextVideoComponent: React.FC<FallingTextVideoComponentProps> = ({
  leftText = "Latest",
  rightText = "Project",
  videoSrc = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  backgroundColor = "var(--light-bg)",
  bottomLeftText = "CREATIVE",
  bottomRightText = "DIGITAL",
}) => {
  const wrapperRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textLeftRef = useRef<HTMLDivElement>(null);
  const textRightRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  const initFallingText = () => {
    const containers = [bottomLeftRef.current, bottomRightRef.current];
    const texts = [bottomLeftText, bottomRightText];

    containers.forEach((container, index) => {
      if (!container) return;
      
      const text = texts[index];
      const inner = document.createElement("div");
      inner.className = "ftv-falling-text-inner";

      text.split("").forEach((ch) => {
        const span = document.createElement("span");
        span.className = "ftv-falling-char";
        span.textContent = ch === " " ? "\u00A0" : ch;
        inner.appendChild(span);
      });

      // Use text only once

      container.innerHTML = "";
      container.appendChild(inner);
    });
  };

  useEffect(() => {
    if (
      !wrapperRef.current ||
      !videoContainerRef.current ||
      !textLeftRef.current ||
      !textRightRef.current
    ) {
      return;
    }

    // Initialize falling text
    initFallingText();

    // Force video play on mobile
    const handleVideoLoad = async () => {
      if (videoRef.current) {
        try {
          // Remove controls to hide play button
          videoRef.current.controls = false;
          videoRef.current.setAttribute('webkit-playsinline', 'true');
          videoRef.current.setAttribute('playsinline', 'true');
          
          // Try to play the video
          await videoRef.current.play();
        } catch (error) {
          console.log('Video autoplay prevented:', error);
          
          // If autoplay fails, add a one-time click handler to start video
          const handleFirstInteraction = async () => {
            try {
              if (videoRef.current) {
                await videoRef.current.play();
                document.removeEventListener('touchstart', handleFirstInteraction);
                document.removeEventListener('click', handleFirstInteraction);
              }
            } catch (e) {
              console.log('Failed to play video on interaction:', e);
            }
          };
          
          document.addEventListener('touchstart', handleFirstInteraction, { once: true });
          document.addEventListener('click', handleFirstInteraction, { once: true });
        }
      }
    };

    // Set up video load handler
    if (videoRef.current) {
      if (videoRef.current.readyState >= 3) {
        handleVideoLoad();
      } else {
        videoRef.current.addEventListener('canplaythrough', handleVideoLoad, { once: true });
      }
    }

    const ctx = gsap.context(() => {
      // Initial state for top text
      gsap.set(textLeftRef.current, { xPercent: -150, opacity: 0 });
      gsap.set(textRightRef.current, { xPercent: 150, opacity: 0 });

      // Slide in top text
      gsap.to([textLeftRef.current, textRightRef.current], {
        xPercent: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // Set initial state for falling text
      const bottomContainers = [bottomLeftRef.current, bottomRightRef.current];
      bottomContainers.forEach((container) => {
        if (!container) return;
        const chars = container.querySelectorAll(".ftv-falling-char");
        gsap.set(chars, { 
          y: 0, 
          opacity: 1,
          rotation: 0
        });
      });

      // Main scroll animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: ".ftv-video-content",
          pinSpacing: true,
        },
      });

      // Collect all falling chars for scrubbed animation
      const allChars: Element[] = [];
      bottomContainers.forEach((container) => {
        if (!container) return;
        const chars = container.querySelectorAll(".ftv-falling-char");
        allChars.push(...chars);
      });

      // Video expansion to full screen - takes 60% of timeline (0 to 0.6)
      tl.to(
        videoContainerRef.current,
        {
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          ease: "power2.inOut",
          duration: 0.6,
        },
        0
      )

      // Top text fades out in sync with video expansion
      .to(
        textLeftRef.current,
        {
          x: -500,
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.6,
        },
        0
      )
      .to(
        textRightRef.current,
        {
          x: 500,
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.6,
        },
        0
      )

      // Falling text animation - immediate free fall ALL AT ONCE
      .to(
        allChars,
        {
          y: "80vh",
          opacity: 1,
          rotation: (i) => gsap.utils.random(-25, 25),
          ease: "power1.in",
          duration: 0.15,
          stagger: 0
        },
        0
      )
      
      // Bounce back up slightly
      .to(
        allChars,
        {
          y: 180,
          ease: "bounce.out",
          duration: 0.1,
          stagger: 0
        },
        0.15
      )
      
      // Hold the final state
      .to({}, { duration: 0.3 });

    }, wrapperRef);

    return () => ctx.revert();
  }, [bottomLeftText, bottomRightText]);

  return (
    <section
      ref={wrapperRef}
      className="ftv-video-wrapper"
      style={{ backgroundColor }}
    >
      <div className="ftv-video-content">
        {/* Top big headings */}
        <div className="ftv-text-container">
          <div ref={textLeftRef} className="ftv-text-left">
            {leftText}
          </div>
          <div ref={textRightRef} className="ftv-text-right">
            {rightText}
          </div>
        </div>

        {/* Center video */}
        <div ref={videoContainerRef} className="ftv-video-container">
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            playsInline
            controls={false}
            preload="auto"
            webkit-playsinline="true"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Bottom words with falling text */}
        <div className="ftv-bottom-text">
          <div className="ftv-bottom-left">
            <div ref={bottomLeftRef} className="ftv-falling-text-container"></div>
          </div>
          
          {/* Scroll down indicator */}
          <div className="ftv-scroll-down-indicator">
            <div className="ftv-scroll-arrow">
              <span>↓</span>
            </div>
            <div className="ftv-scroll-text">Scroll</div>
          </div>
          
          <div className="ftv-bottom-right">
            <div ref={bottomRightRef} className="ftv-falling-text-container"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FallingTextVideoComponent;