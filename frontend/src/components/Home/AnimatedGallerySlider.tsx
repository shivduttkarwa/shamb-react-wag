import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AnimatedGallerySlider.css";

gsap.registerPlugin(ScrollTrigger);

const publicUrl = import.meta.env.BASE_URL || "/";

const AnimatedGallerySlider: React.FC = () => {
  // Root wrapper for everything GSAP touches
  const rootRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const overlayTextRef = useRef<HTMLDivElement | null>(null);
  const slidesSectionRef = useRef<HTMLElement | null>(null);

  const ANIMATION_CONTROLS = {
    galleryItemStagger: 0.12,
    overlayCharStagger: 0.05,
    overlayCharDuration: 0.4,
    overlayCharEase: "back.out(2)",
    overlayStartY: 40,
  };

  // Split overlay lines into characters (runs inside gsap.context)
  const splitOverlayToChars = (sectionEl: HTMLElement | null) => {
    if (!sectionEl) return;

    const overlayLines = sectionEl.querySelectorAll(".ags-overlay-line");
    overlayLines.forEach((line) => {
      const text = line.getAttribute("data-text") || "";
      // Clear React's empty content and rebuild our spans
      line.textContent = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        const span = document.createElement("span");
        span.classList.add("ags-overlay-char");
        span.setAttribute("aria-hidden", "true");

        if (ch === " ") {
          span.textContent = "\u00A0";
          span.classList.add("ags-space-char");
        } else {
          span.textContent = ch;
        }

        line.appendChild(span);
      }
    });
  };

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    // gsap.context safely scopes everything and cleans up on unmount/StrictMode
    const ctx = gsap.context(() => {
      const sectionEl = sectionRef.current;
      const galleryEl = galleryRef.current;
      const slidesSectionEl = slidesSectionRef.current;

      if (!sectionEl || !galleryEl) return;

      splitOverlayToChars(sectionEl);

      const galleryItems = gsap.utils.toArray(
        sectionEl.querySelectorAll(".ags-gallery-item")
      ) as HTMLElement[];

      const overlayChars = sectionEl.querySelectorAll(".ags-overlay-char");

      // Initial states
      gsap.set(galleryEl, {
        x: 0,
        y: 0,
        position: "absolute",
        top: -50,
        left: "50%",
        transform: "translateX(-50%)",
      });

      gsap.set(overlayChars, {
        opacity: 0,
        y: ANIMATION_CONTROLS.overlayStartY,
      });

      galleryItems.forEach((item, index) => {
        const offset = -70 * (index + 1);
        gsap.set(item, { autoAlpha: 1, y: offset, scale: 0.98 });
      });

      // Gallery Timeline + ScrollTrigger
      const galleryTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: "+=1500vh",
          pin: sectionEl, // let ScrollTrigger choose pinType
          scrub: 3,
          invalidateOnRefresh: true,
        },
      });

      galleryTimeline
        .to(
          galleryItems,
          {
            y: "89vh",
            scale: 1,
            stagger: 0.3,
            duration: 5,
            ease: "back.out(1.7)",
          },
          1.5
        )
        .fromTo(
          overlayChars,
          {
            opacity: 0,
            y: ANIMATION_CONTROLS.overlayStartY,
          },
          {
            opacity: 1,
            y: 0,
            duration: ANIMATION_CONTROLS.overlayCharDuration * 3,
            ease: ANIMATION_CONTROLS.overlayCharEase,
            stagger: ANIMATION_CONTROLS.overlayCharStagger * 3,
            force3D: true,
          },
          1.5
        )
        .to(
          galleryItems,
          {
            x: -window.innerWidth - 300,
            stagger: 0.8,
            duration: 8,
            ease: "power2.inOut",
          },
          7
        );

      // Slides Timeline + ScrollTrigger
      if (slidesSectionEl) {
        const slides = gsap.utils.toArray(
          slidesSectionEl.querySelectorAll(".ags-slide")
        ) as HTMLElement[];

        slides.forEach((slide) => {
          gsap.set(slide, {
            x: -window.innerWidth,
            opacity: 1,
          });
        });

        const slidesTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: slidesSectionEl,
            start: "top top",
            end: `+=${slides.length * 800}vh`,
            pin: slidesSectionEl,
            scrub: 5,
            invalidateOnRefresh: true,
          },
        });

        slides.forEach((slide, index) => {
          slidesTimeline.to(
            slide,
            {
              x: 0,
              duration: 1,
              ease: "power1.inOut",
            },
            index * 1.5
          );
        });
      }

      // Make gallery visible once everything is set
      galleryEl.style.visibility = "visible";
    }, rootRef); // end gsap.context

    // Cleanup – this automatically kills all timelines + ScrollTriggers
    // created inside the context and restores inline styles / DOM mutations.
    return () => {
      ctx.revert();
    };
  }, []);

  const backgroundImage = `${publicUrl}images/bg.png`;
  const backgroundVideo = `${publicUrl}images/hero1.mp4`;

  return (
    <div ref={rootRef}>
      {/* Gallery Section */}
      <section
        ref={sectionRef}
        className="ags-gallery-section"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="ags-bg-media">
          <video
            className="ags-bg-video"
            src={backgroundVideo}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
          <div className="ags-bg-overlay" aria-hidden="true" />
        </div>

        <div className="ags-section-container">
          {/* Overlay Text */}
          <div
            ref={overlayTextRef}
            className="ags-section-overlay-text"
            aria-label="Live Better Feel More"
          >
            <div className="ags-overlay-line" data-text="Live  Better"></div>
            <div className="ags-overlay-line" data-text="Feel  More"></div>
          </div>

          {/* Gallery */}
          <div
            ref={galleryRef}
            className="ags-gallery"
            style={{ visibility: "hidden" }}
          >
            <div className="ags-gallery-item">
              <img src={`${publicUrl}images/l11.jpg`} alt="Gallery 1" />
            </div>
            <div className="ags-gallery-item">
              <img src={`${publicUrl}images/l4.jpg`} alt="Gallery 2" />
            </div>
            <div className="ags-gallery-item">
              <img src={`${publicUrl}images/l5.jpg`} alt="Gallery 3" />
            </div>
            <div className="ags-gallery-item">
              <img src={`${publicUrl}images/l6.jpg`} alt="Gallery 4" />
            </div>
            <div className="ags-gallery-item">
              <img src={`${publicUrl}images/l8.jpg`} alt="Gallery 5" />
            </div>
            <div className="ags-gallery-item">
              <img src={`${publicUrl}images/l2.jpg`} alt="Gallery 6" />
            </div>
            <div className="ags-gallery-item">
              <img
                src={`${publicUrl}images/pexels-fotoaibe-1571460.jpg`}
                alt="Gallery 7"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Slides Section */}
      <section
        ref={slidesSectionRef}
        className="ags-slides-section"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="ags-slides-bg-text">
          <div className="ags-bg-text-line">Creating</div>
          <div className="ags-bg-text-line">Spaces</div>
          <div className="ags-bg-text-line">That</div>
          <div className="ags-bg-text-line">Inspire</div>
        </div>

        <div className="ags-slides-overlay" />

        <div className="ags-slide">
          <div className="ags-slide-image">
            <img src={`${publicUrl}images/l11.jpg`} alt="Modern Architecture" />
          </div>
          <div className="ags-slide-content">
            <h2>Modern Architecture</h2>
            <p>
              Contemporary design meets functional living spaces that blend
              aesthetics with practicality. Our approach to modern architecture
              focuses on clean lines, open spaces, and innovative use of
              materials that create environments where people truly want to live
              and work.
            </p>
            <p>
              We believe that great architecture should respond to its
              surroundings while pushing the boundaries of what's possible.
              Every project begins with understanding the site, the climate, and
              most importantly, the people who will inhabit the space.
            </p>
          </div>
        </div>

        <div className="ags-slide">
          <div className="ags-slide-image">
            <img src={`${publicUrl}images/l4.jpg`} alt="Interior Design" />
          </div>
          <div className="ags-slide-content">
            <h2>Interior Design</h2>
            <p>
              Thoughtful interiors that inspire and elevate everyday experiences
              through careful attention to detail. Our interior design
              philosophy centers on creating spaces that feel both sophisticated
              and deeply personal.
            </p>
            <p>
              We curate every element from custom furniture and lighting to
              artwork and textiles, ensuring each piece contributes to a
              cohesive vision. Our team works closely with clients to understand
              their lifestyle, preferences, and functional needs.
            </p>
          </div>
        </div>

        <div className="ags-slide">
          <div className="ags-slide-image">
            <img src={`${publicUrl}images/l5.jpg`} alt="Sustainable Spaces" />
          </div>
          <div className="ags-slide-content">
            <h2>Sustainable Spaces</h2>
            <p>
              Environmentally conscious design for the future, creating spaces
              that respect both people and planet. Sustainability isn't just a
              trend for us—it's a core principle that guides every decision we
              make.
            </p>
            <p>
              Our sustainable design approach incorporates renewable materials,
              energy-efficient systems, and passive design strategies that
              reduce environmental impact while enhancing occupant comfort and
              health.
            </p>
          </div>
        </div>

        <div className="ags-slide">
          <div className="ags-slide-image">
            <img src={`${publicUrl}images/l6.jpg`} alt="Residential Projects" />
          </div>
          <div className="ags-slide-content">
            <h2>Residential Projects</h2>
            <p>
              Creating homes that feel uniquely yours, where every space tells
              your personal story. Our residential design process is deeply
              collaborative, ensuring that each home reflects the personality,
              lifestyle, and dreams of its inhabitants.
            </p>
            <p>
              From intimate urban apartments to sprawling suburban estates, we
              design homes that grow with families and adapt to changing needs.
              Our expertise spans new construction, renovations, and additions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnimatedGallerySlider;
