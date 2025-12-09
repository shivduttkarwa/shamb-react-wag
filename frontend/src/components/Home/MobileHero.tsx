import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassRainButton from "../UI/GlassRainButton";
import "./MobileHero.css";

gsap.registerPlugin(ScrollTrigger);

const publicUrl = import.meta.env.BASE_URL;

const MobileHero: React.FC = () => {
  const videoSpaceRef = useRef<HTMLDivElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);
  const overlayTextRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Split text into character spans
  const splitTextToChars = (element: HTMLElement) => {
    const text = element.textContent || "";
    element.innerHTML = "";

    const chars = text.split("");
    chars.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      element.appendChild(span);
    });

    return element.querySelectorAll("span");
  };

  // Initial hero text animation (ChangingText style)
  const animateHeroTextAppearing = () => {
    if (!heroTextRef.current) return;

    // Get all text lines
    const textLines = heroTextRef.current.querySelectorAll(".mobile-text-line");

    textLines.forEach((line, lineIndex) => {
      const chars = splitTextToChars(line as HTMLElement);

      // Set initial state
      gsap.set(chars, {
        opacity: 0,
        y: 20,
        filter: "blur(10px)",
      });

      // Animate in with stagger
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.05,
        duration: 0.6,
        ease: "power2.out",
        delay: lineIndex * 0.3, // Stagger each line
      });
    });
  };

  useEffect(() => {
    if (
      !wrapperRef.current ||
      !videoSpaceRef.current ||
      !heroTextRef.current ||
      !contentRef.current
    ) {
      return;
    }

    // onRefreshHandler needs to be referenced in cleanup, so declare in the useEffect scope
    let onRefreshHandler: (() => void) | undefined;
    // We don't use a watcher currently; keep the variable removed to avoid lint errors
    const ctx = gsap.context(() => {
      // Initial text animation
      setTimeout(() => {
        animateHeroTextAppearing();
      }, 500);

      // Split overlay text into characters
      const splitOverlayToChars = () => {
        if (!overlayTextRef.current) return;
        const overlayLines =
          overlayTextRef.current.querySelectorAll(".overlay-line");
        overlayLines.forEach((line) => {
          const text = line.getAttribute("data-text") || "";
          line.textContent = "";
          for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            const span = document.createElement("span");
            span.classList.add("overlay-char");
            span.setAttribute("aria-hidden", "true");
            span.textContent = ch === " " ? "\u00A0" : ch;
            line.appendChild(span);
          }
        });
      };
      splitOverlayToChars();

      // Video expansion animation - EXACT copy from GsapVideoText
      const ANIMATION_CONTROLS = {
        // Keep this closer to desktop to ensure there's enough scroll length
        videoScrollDistance: 2.9,
        videoExpandSpeed: 0.6,
        videoScrubSmooth: 1.4,
        // (gallery-related options removed for mobile)
        overlayCharStagger: 0.05,
        overlayCharDuration: 0.4,
        overlayCharEase: "back.out(2)",
        overlayStartY: 40,
      };

      // Set hero section height according to animation controls so ScrollTrigger maps correctly
      // Add extra height to prevent overlap with next section
      const desiredHeight = Math.ceil(
        (ANIMATION_CONTROLS.videoScrollDistance + 1.2) * window.innerHeight
      );
      wrapperRef.current!.style.height = `${desiredHeight}px`;

      // console.debug('Mobile timeline desiredHeight:', desiredHeight); // Debug only
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: () =>
            `+=${window.innerHeight * ANIMATION_CONTROLS.videoScrollDistance}`,
          scrub: ANIMATION_CONTROLS.videoScrubSmooth,
          pin: contentRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Add onRefresh handler to recompute wrapper height
      onRefreshHandler = () => {
        if (wrapperRef.current) {
          wrapperRef.current.style.height = `${Math.ceil(
            (ANIMATION_CONTROLS.videoScrollDistance + 1.2) * window.innerHeight
          )}px`;
        }
      };
      if (onRefreshHandler)
        ScrollTrigger.addEventListener("refresh", onRefreshHandler);
      // refresh once to apply sizes immediately
      ScrollTrigger.refresh();

      // Small delay to ensure DOM is fully rendered and CSS applied
      setTimeout(() => {
        // Minimal GSAP initialization - let CSS handle positioning
        gsap.set(videoSpaceRef.current, {
          x: 0,
          y: 0,
          scale: 1,
          borderRadius: 8,
          zIndex: 1000,
        });

        // Get text line elements for animations
        const line1 = heroTextRef.current!.querySelector(
          ".mobile-line-1"
        ) as HTMLElement;
        const line2 = heroTextRef.current!.querySelector(
          ".mobile-line-2"
        ) as HTMLElement;
        const line4 = heroTextRef.current!.querySelector(
          ".mobile-line-4"
        ) as HTMLElement;
        const line5 = heroTextRef.current!.querySelector(
          ".mobile-line-5"
        ) as HTMLElement;

        tl.to(videoSpaceRef.current, {
          width: "100vw",
          height: "130vh",
          borderRadius: 0,
          zIndex: 1000,
          opacity: 1,
          scale: 1,
          x: () => {
            // Calculate offset to center of screen from current position
            if (!videoSpaceRef.current) return 0;
            const rect = videoSpaceRef.current.getBoundingClientRect();
            const videoCenterX = rect.left + rect.width / 2;
            const screenCenterX = window.innerWidth / 2;
            return screenCenterX - videoCenterX;
          },
          y: () => {
            if (!videoSpaceRef.current) return 0;
            const rect = videoSpaceRef.current.getBoundingClientRect();
            const videoCenterY = rect.top + rect.height / 2;
            const screenCenterY = window.innerHeight / 2;
            return screenCenterY - videoCenterY;
          },
          ease: "power2.inOut",
          duration: 0.6,
        });

        // Fade out text during expansion with sliding animation
        // (line variables already declared above)

        tl.to(
          line1,
          {
            y: -400,
            opacity: 0,
            ease: "power2.inOut",
            duration: 0.6,
          },
          0
        )
          .to(
            line2,
            {
              y: -300,
              opacity: 0,
              ease: "power2.inOut",
              duration: 0.6,
            },
            0
          )
          .to(
            line4,
            {
              y: 300,
              opacity: 0,
              ease: "power2.inOut",
              duration: 0.6,
            },
            0
          )
          .to(
            line5,
            {
              y: 400,
              opacity: 0,
              ease: "power2.inOut",
              duration: 0.6,
            },
            0
          )
          // Reduced pause duration; overlay reveal follows
          .to({}, { duration: 0.2 })
          .addLabel("afterExpand")
          .to(
            videoSpaceRef.current,
            { zIndex: 5, duration: 0.15 },
            "afterExpand"
          );

        // Refresh ScrollTrigger sizes in case anything layout-related changed
        ScrollTrigger.refresh();

        // Overlay animation - split to chars and animate
        const overlayChars = gsap.utils.toArray(
          overlayTextRef.current?.querySelectorAll(".overlay-char") || []
        ) as HTMLElement[];
        gsap.set(overlayChars, { opacity: 0, y: 40 });
        tl.fromTo(
          overlayChars,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "back.out(2)",
            stagger: 0.02, // Reduced from 0.05 to 0.02 for faster animation
          },
          "afterExpand+=0.1"
        );

        // Glass button animation - same trigger, animates from left
        const ctaButton = document.querySelector(".mobile-cta") as HTMLElement;
        gsap.set(ctaButton, { opacity: 0, x: -200 });
        tl.fromTo(
          ctaButton,
          { opacity: 0, x: -200 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: "back.out(2)",
          },
          "afterExpand+=0.1"
        );

        // Gallery items animation - exact same behavior as overlay text but from top
        const galleryItems = gsap.utils.toArray(
          ".mobile-gallery-item"
        ) as HTMLElement[];
        gsap.set(galleryItems, { opacity: 0, y: -400 }); // Start much higher above screen
        tl.fromTo(
          galleryItems,
          { opacity: 0, y: -400 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "back.out(2)",
            stagger: 0.05,
          },
          "afterExpand+=0.1"
        );
      }, 50); // Small delay for DOM readiness
    }, wrapperRef);

    return () => {
      // cleanup the ScrollTrigger event listener to prevent leaks
      if (onRefreshHandler)
        ScrollTrigger.removeEventListener("refresh", onRefreshHandler);
      // no lingering class cleanup needed
      ctx.revert();
    };
  }, []);

  // no gallery portal mounting required

  const defaultBg = `${publicUrl}images/bg.png`;

  return (
    <>
      <section
        ref={wrapperRef}
        className="mobile-hero-section"
        id="mobile-hero-section"
      >
        <div
          ref={contentRef}
          className="mobile-hero-container"
          style={{
            backgroundImage: `url(${defaultBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "rgba(0,0,0,0.12)",
            backgroundBlendMode: "multiply",
          }}
        >
          {/* Hero Text */}
          <div ref={heroTextRef} className="mobile-hero-text">
            <div className="mobile-text-line mobile-line-1">DESIGN</div>
            <div className="mobile-text-line mobile-line-2">BEYOND</div>

            {/* Line 3 - Empty space for video positioning */}
            <div className="mobile-video-line">
              <div className="mobile-video-placeholder"></div>
            </div>

            <div className="mobile-text-line mobile-line-4">THE</div>
            <div className="mobile-text-line mobile-line-5">ORDINARY</div>
          </div>

          {/* Overlay Text */}
          {/*
          To quickly adjust overlay position, edit the CSS variables in
          `frontend/src/components/Home/MobileHero.css` or set them on the
          wrapper selector `.mobile-hero-section`.

          Example (CSS):
            .mobile-hero-section { --overlay-left: 120px; --overlay-up: 160px; }
        */}
          <div
            ref={overlayTextRef}
            className="mobile-hero-overlay"
            aria-label="Live Better Feel More"
          >
            <div className="overlay-line" data-text="Live Better"></div>
            <div className="overlay-line" data-text="Feel More"></div>
          </div>

          {/* Video - separate from text container */}
          <div ref={videoSpaceRef} className="mobile-video-space">
            <video autoPlay muted loop playsInline>
              {/* Mobile hero uses `hero-new.mp4`; fallback to `hero1.mp4` when needed */}
              <source
                src={`${publicUrl}images/mobile-hero.mp4`}
                type="video/mp4"
              />
              <source src={`${publicUrl}images/hero1.mp4`} type="video/mp4" />
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          {/* Glass Button */}
          <div className="mobile-cta">
            <GlassRainButton href="#next-section">
              Explore Homes
            </GlassRainButton>
          </div>

          {/* Gallery Items */}
          <div className="mobile-gallery">
            <div className="mobile-gallery-item">
              <img src={`${publicUrl}images/l11.jpg`} alt="Gallery 1" />
            </div>
            <div className="mobile-gallery-item">
              <img src={`${publicUrl}images/l4.jpg`} alt="Gallery 2" />
            </div>
            <div className="mobile-gallery-item">
              <img src={`${publicUrl}images/l5.jpg`} alt="Gallery 3" />
            </div>
            <div className="mobile-gallery-item">
              <img src={`${publicUrl}images/l6.jpg`} alt="Gallery 4" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MobileHero;
