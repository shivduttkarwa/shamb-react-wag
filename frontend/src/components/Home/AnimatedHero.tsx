import React, { useEffect, useRef, Component } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassRainButton from "../UI/GlassRainButton";
import "./AnimatedHero.css";

// Register plugin
gsap.registerPlugin(ScrollTrigger);

const publicUrl = import.meta.env.BASE_URL;

// Error Boundary Component
class AnimatedHeroErrorBoundary extends Component<
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

const AnimatedHeroContent: React.FC = () => {
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const videoSpaceRef = useRef<HTMLDivElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const overlayTextRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Animation controls - optimized for smooth video expansion
  const ANIMATION_CONTROLS = {
    videoScrollDistance: 2.9,
    videoExpandSpeed: 0.6, // Faster expansion like GsapVideoText
    videoScrubSmooth: 1.2, // Slightly more smooth scrubbing
    galleryItemStagger: 0.12,
    galleryItemDuration: 0.45,
    galleryItemOffset: -70,
    textCharStagger: 0.08,
    textCharInDuration: 1.2,
    textCharOutDuration: 1.0,
    textCharBlur: 10,
    galleryStartDelay: 0.15,
    textRevealDelay: 0.6,
    overlayCharStagger: 0.05,
    overlayCharDuration: 0.4,
    overlayCharEase: "back.out(2)",
    overlayStartY: 40,
  };

  // Split text into characters
  const splitTextToChars = (el: HTMLElement | null) => {
    if (!el) return;
    const text = el.textContent || "";
    if (el.querySelector("span")) return;
    el.setAttribute("aria-label", text.trim());
    el.innerHTML = "";
    text.split("").forEach((char) => {
      const ch = document.createElement("span");
      ch.textContent = char === " " ? "\u00A0" : char;
      ch.setAttribute("aria-hidden", "true");
      el.appendChild(ch);
    });
  };

  // Calculate video transform for full screen
  const calculateVideoTransform = () => {
    if (!videoSpaceRef.current)
      return { translateX: 0, translateY: 0, scale: 1 };

    const rect = videoSpaceRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;

    const translateX = viewportCenterX - centerX;
    const translateY = viewportCenterY - centerY;

    const scaleX = window.innerWidth / rect.width;
    const scaleY = window.innerHeight / rect.height;
    // Add a slight overscale buffer (2%) to avoid 1px gaps at certain
    // viewport sizes or due to subpixel rounding when elements are scaled.
    const OVERSCALE_BUFFER = 1.02;
    const scale = Math.max(scaleX, scaleY) * OVERSCALE_BUFFER;

    return { translateX, translateY, scale };
  };

  // Split overlay lines into characters
  const splitOverlayToChars = () => {
    if (!heroSectionRef.current) return;
    const overlayLines =
      heroSectionRef.current.querySelectorAll(".overlay-line");
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

  // Calculate gallery transform for bottom center
  const calculateGalleryTransform = () => {
    if (!galleryRef.current) return { translateX: 0, translateY: 0 };

    const rect = galleryRef.current.getBoundingClientRect();
    const galleryCenterX = rect.left + rect.width / 2;
    const galleryCenterY = rect.top + rect.height / 2;
    const targetCenterX = window.innerWidth / 2;
    const targetCenterY = window.innerHeight - window.innerHeight * 0.09; // Increased from 0.05 to 0.15

    const translateX = targetCenterX - galleryCenterX;
    const translateY = targetCenterY - galleryCenterY;
    return { translateX, translateY };
  };

  // Build animations
  const buildTimelines = () => {
    if (
      !heroSectionRef.current ||
      !videoSpaceRef.current ||
      !galleryRef.current
    )
      return;

    // Clear only this component's timeline (which includes its ScrollTrigger)
    if (timelineRef.current) {
      timelineRef.current.scrollTrigger?.kill();
      timelineRef.current.kill();
      timelineRef.current = null;
    }

    // Reset all elements to their initial states
    gsap.set(videoSpaceRef.current, { clearProps: "all" });
    gsap.set(
      heroSectionRef.current.querySelectorAll(".line-1, .line-2, .line-3 span"),
      { clearProps: "all" }
    );
    gsap.set(
      heroSectionRef.current.querySelectorAll(".hero-text .text-line span"),
      { clearProps: "all" }
    );
    gsap.set(galleryRef.current, { clearProps: "all" });
    gsap.set(heroSectionRef.current.querySelectorAll(".gallery-item"), {
      clearProps: "all",
    });
    gsap.set(heroSectionRef.current.querySelectorAll(".overlay-char"), {
      clearProps: "all",
    });
    gsap.set(heroSectionRef.current.querySelector(".hero-cta"), {
      clearProps: "all",
    });

    const transform = calculateVideoTransform();
    const galleryTransform = calculateGalleryTransform();

    // Set hero section height - use fixed calculation for consistency
    const desiredHeight =
      (ANIMATION_CONTROLS.videoScrollDistance + 1) * window.innerHeight;
    heroSectionRef.current.style.height = `${desiredHeight}px`;
    // Also set via CSS to prevent layout shifts
    heroSectionRef.current.style.minHeight = `${desiredHeight}px`;

    // Get gallery items (limit to 3 on mobile)
    const allGalleryItems = gsap.utils.toArray(
      heroSectionRef.current.querySelectorAll(".gallery-item")
    ) as HTMLElement[];
    const isMobileView = window.matchMedia("(max-width: 768px)").matches;
    const galleryItems = isMobileView
      ? allGalleryItems.slice(0, 3)
      : allGalleryItems;

    // Main timeline with ScrollTrigger
    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: "top top",
        end: () =>
          `+=${window.innerHeight * ANIMATION_CONTROLS.videoScrollDistance}`,
        scrub: ANIMATION_CONTROLS.videoScrubSmooth,
        pin: heroSectionRef.current.querySelector(".hero-sticky"),
        pinSpacing: true,
        anticipatePin: 0.5,
        invalidateOnRefresh: true,
        refreshPriority: -1,
        onUpdate: () => {
          // Ensure visibility is managed correctly during scroll
          const gallery = heroSectionRef.current?.querySelector(
            ".gallery"
          ) as HTMLElement;
          if (gallery && gallery.style.visibility !== "visible") {
            gallery.style.visibility = "visible";
          }
        },
      },
    });

    // Set initial states for ALL elements before animation
    gsap.set(videoSpaceRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      borderRadius: 12,
      zIndex: 5,
    });

    gsap.set(
      heroSectionRef.current.querySelectorAll(".line-1, .line-2, .line-3 span"),
      {
        scale: 1,
        opacity: 1,
      }
    );

    gsap.set(
      heroSectionRef.current.querySelectorAll(".hero-text .text-line span"),
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }
    );

    // Reset gallery to initial position (top center)
    gsap.set(galleryRef.current, {
      x: 0,
      y: 0,
      position: "absolute",
      top: -50,
      left: "50%",
      transform: "translateX(-50%)",
    });

    gsap.set(heroSectionRef.current.querySelectorAll(".overlay-char"), {
      opacity: 0,
      y: ANIMATION_CONTROLS.overlayStartY,
    });

    gsap.set(heroSectionRef.current.querySelector(".hero-cta"), {
      opacity: 0,
      x: 200, // Start from right side
      y: 0,
      scale: 0.8,
    });

    const videoTimeline = timelineRef.current;

    // Phase 1: Expand video with smooth easing from GsapVideoText
    videoTimeline
      .to(
        videoSpaceRef.current,
        {
          x: transform.translateX,
          y: transform.translateY,
          scale: transform.scale,
          borderRadius: 0,
          zIndex: 1000,
          duration: ANIMATION_CONTROLS.videoExpandSpeed,
          ease: "power2.inOut", // Same smooth easing as GsapVideoText
        },
        0
      )
      // Fade out company description during video expansion
      .to(
        heroSectionRef.current.querySelector(".hero-description"),
        { opacity: 0, y: -8, duration: 0.35, ease: "power2.out" },
        0
      )
      .to(
        heroSectionRef.current.querySelectorAll(
          ".line-1, .line-2, .line-3 span"
        ),
        {
          scale: 0.7,
          opacity: 0.3,
          duration: 1.0,
          ease: "power2.out",
        },
        0
      )
      .to(
        heroSectionRef.current.querySelectorAll(".hero-text .text-line span"),
        {
          opacity: 0.35,
          y: -14,
          filter: `blur(${ANIMATION_CONTROLS.textCharBlur}px)`,
          duration: ANIMATION_CONTROLS.textCharOutDuration,
          stagger: ANIMATION_CONTROLS.textCharStagger,
          ease: "sine.in",
        },
        0
      );

    // After video expansion
    videoTimeline.addLabel("afterExpand", 1.3);

    // Gallery and text animations
    videoTimeline
      .to(
        galleryRef.current,
        {
          x: galleryTransform.translateX,
          y: galleryTransform.translateY,
          duration: 0.4,
          ease: "power7.inOut",
        },
        "afterExpand"
      )
      .to(videoSpaceRef.current, { zIndex: 5, duration: 0.5 }, "afterExpand")
      .to(
        galleryItems,
        {
          y: 0,
          scale: 1,
          stagger: ANIMATION_CONTROLS.overlayCharStagger, // Same as overlay text
          duration: ANIMATION_CONTROLS.overlayCharDuration, // Same as overlay text
          ease: ANIMATION_CONTROLS.overlayCharEase, // Same as overlay text: "back.out(2)"
        },
        `afterExpand+=${ANIMATION_CONTROLS.galleryStartDelay}`
      )
      .fromTo(
        heroSectionRef.current.querySelectorAll(".overlay-char"),
        {
          opacity: 0,
          y: ANIMATION_CONTROLS.overlayStartY,
        },
        {
          opacity: 1,
          y: 0,
          duration: ANIMATION_CONTROLS.overlayCharDuration,
          ease: ANIMATION_CONTROLS.overlayCharEase,
          stagger: ANIMATION_CONTROLS.overlayCharStagger,
          force3D: true,
        },
        `afterExpand+=${ANIMATION_CONTROLS.galleryStartDelay}`
      )
      .to(
        heroSectionRef.current.querySelector(".hero-cta"),
        {
          opacity: 1,
          x: 0, // Slide in from right
          y: 0,
          scale: 1,
          duration: 0.8, // Slower than overlay text (0.4s)
          ease: ANIMATION_CONTROLS.overlayCharEase, // Same as overlay text: "back.out(2)"
        },
        `afterExpand+=${ANIMATION_CONTROLS.galleryStartDelay}`
      )
      .to(
        heroSectionRef.current.querySelectorAll(
          ".line-1, .line-2, .line-3 span"
        ),
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        `afterExpand+=${ANIMATION_CONTROLS.textRevealDelay}`
      )
      .to(
        heroSectionRef.current.querySelectorAll(".hero-text .text-line span"),
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: ANIMATION_CONTROLS.textCharInDuration,
          stagger: ANIMATION_CONTROLS.textCharStagger,
          ease: "sine.out",
        },
        `afterExpand+=${ANIMATION_CONTROLS.textRevealDelay}`
      )
      .to(
        heroSectionRef.current.querySelector(".line-1"),
        { y: -120, ease: "none" },
        `afterExpand+=${ANIMATION_CONTROLS.textRevealDelay}`
      )
      .to(
        heroSectionRef.current.querySelector(".line-2"),
        { y: -70, ease: "none" },
        `afterExpand+=${ANIMATION_CONTROLS.textRevealDelay}`
      )
      .to(
        heroSectionRef.current.querySelectorAll(".line-3 span"),
        { y: -40, ease: "none" },
        `afterExpand+=${ANIMATION_CONTROLS.textRevealDelay}`
      );

    // Set initial states for gallery items
    galleryItems.forEach((item, index) => {
      const offset = ANIMATION_CONTROLS.galleryItemOffset * (index + 1);
      gsap.set(item, { autoAlpha: 1, y: offset, scale: 0.98 });
    });
  };

  // Wait for gallery images to load
  const waitForGalleryImages = () => {
    if (!heroSectionRef.current) return Promise.resolve();
    const images = gsap.utils.toArray(
      heroSectionRef.current.querySelectorAll(".gallery img")
    ) as HTMLImageElement[];
    return Promise.all(
      images.map((img) => {
        if (img.complete && img.naturalWidth !== 0) return Promise.resolve();
        return new Promise<void>((resolve) => {
          img.addEventListener("load", () => resolve());
          img.addEventListener("error", () => resolve());
        });
      })
    );
  };

  // Initial text animation
  const animateHeroTextInitial = () => {
    if (!heroSectionRef.current) return;
    const chars = gsap.utils.toArray(
      heroSectionRef.current.querySelectorAll(".hero-text .text-line span")
    ) as HTMLElement[];
    gsap.set(chars, {
      opacity: 0,
      y: 20,
      filter: `blur(${ANIMATION_CONTROLS.textCharBlur}px)`,
    });
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      stagger: ANIMATION_CONTROLS.textCharStagger,
      duration: ANIMATION_CONTROLS.textCharInDuration,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    if (!heroSectionRef.current) return;

    // Split text into characters
    const textLine1 = heroSectionRef.current.querySelector(".line-1");
    const textLine2 = heroSectionRef.current.querySelector(".line-2");
    const textLine3Spans = gsap.utils.toArray(
      heroSectionRef.current.querySelectorAll(".line-3 > span")
    );

    splitTextToChars(textLine1 as HTMLElement);
    splitTextToChars(textLine2 as HTMLElement);
    textLine3Spans.forEach((span) => splitTextToChars(span as HTMLElement));
    splitOverlayToChars();

    // Add hover effects to gallery items
    const allGalleryItems = gsap.utils.toArray(
      heroSectionRef.current.querySelectorAll(".gallery-item")
    ) as HTMLElement[];
    allGalleryItems.forEach((item) => {
      item.addEventListener("pointerenter", () => {
        gsap.to(item, { scale: 1.08, duration: 0.3, ease: "power3.out" });
      });
      item.addEventListener("pointerleave", () => {
        gsap.to(item, { scale: 1, duration: 0.25, ease: "power3.out" });
      });
    });

    // Initialize animations after images load
    waitForGalleryImages()
      .then(() => {
        buildTimelines();
        const gallery = heroSectionRef.current?.querySelector(
          ".gallery"
        ) as HTMLElement;
        if (gallery) gallery.style.visibility = "visible";
        heroSectionRef.current?.classList.remove("no-js");

        // Force scroll to top and reset animation progress
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
      })
      .catch(() => {
        buildTimelines();
        const gallery = heroSectionRef.current?.querySelector(
          ".gallery"
        ) as HTMLElement;
        if (gallery) gallery.style.visibility = "visible";
        heroSectionRef.current?.classList.remove("no-js");

        // Force scroll to top and reset animation progress
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
      });

    // Initial text animation - only run if we're at the top of the page
    if (window.scrollY === 0) {
      setTimeout(animateHeroTextInitial, 60);
    }

    // Resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Force refresh ScrollTrigger first
        ScrollTrigger.refresh();
        // Then rebuild timelines
        buildTimelines();
      }, 250);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      // Clean up only this component's animations
      if (timelineRef.current) {
        timelineRef.current.scrollTrigger?.kill();
        timelineRef.current.kill();
      }
    };
  }, []);

  const defaultBg = `${publicUrl}images/bg.png`;

  return (
    <section
      ref={heroSectionRef}
      className="hero-section no-js"
      id="animated-hero-section"
    >
      <div
        className="hero-sticky"
        style={{
          backgroundImage: `url(${defaultBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(0,0,0,0.15)",
          backgroundBlendMode: "multiply",
        }}
      >
        {/* Hero Text */}
        <div ref={heroTextRef} className="hero-text">
          <div className="text-line line-1">DESIGN</div>
          <div className="text-line line-2">BEYOND</div>
          <div className="text-line line-3">
            <span>THE</span>
            <div ref={videoSpaceRef} className="video-space">
              <video autoPlay muted loop playsInline>
                {/* Desktop hero uses `hero-new.mp4`; fallback to `hero1.mp4` when needed */}
                <source src={`${publicUrl}images/hero2.mp4`} type="video/mp4" />
                <source src={`${publicUrl}images/hero1.mp4`} type="video/mp4" />
                <source
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <span>ORDINARY</span>
          </div>
        </div>

        {/* Overlay Text */}
        <div
          ref={overlayTextRef}
          className="hero-overlay-text"
          aria-label="Live Better Feel More"
        >
          <div className="overlay-line" data-text="Live Better"></div>
          <div className="overlay-line" data-text="Feel More"></div>
        </div>

        {/* Company description in top-right */}
        <div className="hero-description" aria-hidden="false">
          <div className="hero-description-inner">
            We design spaces that feel like home — thoughtful, timeless, human.
          </div>
        </div>

        {/* Gallery */}
        <div
          ref={galleryRef}
          className="gallery"
          style={{ visibility: "hidden" }}
        >
          <div className="gallery-item">
            <img src={`${publicUrl}images/l11.jpg`} alt="Gallery 1" />
          </div>
          <div className="gallery-item">
            <img src={`${publicUrl}images/l4.jpg`} alt="Gallery 2" />
          </div>
          <div className="gallery-item">
            <img src={`${publicUrl}images/l5.jpg`} alt="Gallery 3" />
          </div>
          <div className="gallery-item">
            <img src={`${publicUrl}images/l6.jpg`} alt="Gallery 4" />
          </div>
          <div className="gallery-item">
            <img src={`${publicUrl}images/l8.jpg`} alt="Gallery 5" />
          </div>
          <div className="gallery-item">
            <img
              src={`${publicUrl}images/pexels-asphotography-94818.jpg`}
              alt="Gallery 6"
            />
          </div>
          <div className="gallery-item">
            <img
              src={`${publicUrl}images/pexels-fotoaibe-1571460.jpg`}
              alt="Gallery 7"
            />
          </div>
          <div className="gallery-item">
            <img
              src={`${publicUrl}images/pexels-jvdm-1457842.jpg`}
              alt="Gallery 8"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="hero-cta">
          <GlassRainButton href="#next-section">Explore Homes</GlassRainButton>
        </div>
      </div>
    </section>
  );
};

const AnimatedHero: React.FC = () => {
  return (
    <AnimatedHeroErrorBoundary>
      <AnimatedHeroContent />
    </AnimatedHeroErrorBoundary>
  );
};

export default AnimatedHero;
