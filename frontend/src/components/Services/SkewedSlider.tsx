import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassRainButton from "../UI/GlassRainButton";

gsap.registerPlugin(ScrollTrigger);

const SkewedSlider: React.FC<{ className?: string }> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // DESKTOP: Light elegant colors for better readability
  const elegantColors = [
    "#ffffff", "#f8f9fa", "#f1f3f4", "#e8eaed", "#dadce0", 
    "#bdc1c6", "#9aa0a6", "#80868b", "#5f6368", "#3c4043",
    "#202124", "#1a73e8", "#34a853", "#fbbc04", "#ea4335"
  ];

  // Using elegant architectural photography
  const architecturalImages = [
    "/images/slide1.jpg",
    "/images/slide2.jpg", 
    "/images/slide3.jpg",
    "/images/slide4.jpg",
    "/images/slide5.jpg",
    "/images/slide6.jpg"
  ];

  const pages = [
    {
      leftBg: architecturalImages[0],
      rightBg: elegantColors[0],
      leftHeading: "Let's Create\nSomething Extraordinary",
      leftDesc: "Every exceptional project begins with your vision.",
      leftLink: "",
      rightHeading: "+91 98765 43210",
      rightDesc: "info@shambala.studio\n\nMon-Sat, 10AM-7PM IST",
    },
    {
      leftBg: elegantColors[8],
      rightBg: architecturalImages[1],
      leftHeading: "Visit Our\nDesign Studio",
      leftDesc: "Experience architectural excellence in the heart of the city.",
      leftLink: "",
      rightHeading: "Shambala Design Studio\nSector 44, Gurgaon\nHaryana, India",
      rightDesc: "15 mins from Huda City Metro",
    },
    {
      leftBg: architecturalImages[2],
      rightBg: elegantColors[2],
      leftHeading: "What Can\nWe Create\nTogether?",
      leftDesc: "From concept to completion, we transform spaces into experiences.",
      leftLink: "",
      rightHeading: "",
      rightDesc: "",
      serviceButtons: [
        "Luxury Residences",
        "Commercial Spaces", 
        "Interior Design",
        "Landscape Architecture",
      ],
    },
    {
      leftBg: elegantColors[12],
      rightBg: architecturalImages[3],
      leftHeading: "Start Your\nDesign\nJourney",
      leftDesc:
        "Share your vision with us and discover how we can transform your space into something extraordinary.",
      leftLink: "",
      rightHeading: "Tell Us About Your Vision",
      rightDesc: "",
      showForm: true,
    },
    {
      leftBg: architecturalImages[4],
      rightBg: architecturalImages[5],
      leftHeading:
        "Architecture is the\ntestimony of human\naspiration.",
      leftDesc: "— Frank Lloyd Wright",
      leftLink: "",
      rightHeading: "Ready to Begin?",
      rightDesc: "Let's bring your vision to life",
      showRainButton: true,
    },
  ];

  // MOBILE: Modern contact journey slides
  const mobileSlides = [
    {
      heading: "Let's Create Together",
      label: "Welcome",
      desc: "Transform your space with award-winning architectural design. We bring vision, innovation, and expertise to every project.",
    },
    {
      heading: "Your Project Vision",
      label: "Tell us about it",
      desc: "Whether it's a new build, renovation, commercial space, or interior design - share your dreams and we'll help make them reality.",
    },
    {
      heading: "Professional Process",
      label: "How we work",
      desc: "From initial consultation to final completion, we guide you through every step with clear communication, expert craftsmanship, and attention to detail.",
    },
    {
      heading: "Ready to Start?",
      label: "Let's begin",
      desc: "Contact us today for a consultation. We'll discuss your vision, timeline, and budget to create a tailored approach for your project.",
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.matchMedia("(max-width: 900px)").matches;

    // Simple function to set up click handlers without animations
    const setupDesktopSlide = (index: number) => {
      const page = container.querySelector(
        `.skew-page-${index + 1}`
      ) as HTMLDivElement | null;
      if (!page) return;

      const phoneHeading = page.querySelector(
        ".skew-page__heading"
      ) as HTMLElement | null;
      const emailDesc = page.querySelector(
        ".skew-page__description"
      ) as HTMLElement | null;

      if (phoneHeading && phoneHeading.textContent?.includes("+91")) {
        phoneHeading.addEventListener("click", () => {
          window.location.href = "tel:+919876543210";
        });
      }

      if (emailDesc && emailDesc.textContent?.includes("@")) {
        emailDesc.addEventListener("click", () => {
          window.location.href = "mailto:info@shambala.studio";
        });
      }
    };

    // No mobile animations - keep it simple
    const setupMobileSlide = (index: number) => {
      // No animations, just keep slides visible
      return;
    };

    if (isMobile) {
      // MOBILE: ScrollTrigger pin slider
      const mobileEl = container.querySelector(
        ".skew-mobile"
      ) as HTMLDivElement | null;
      const inner = mobileEl?.querySelector(
        ".skew-mobile__inner"
      ) as HTMLDivElement | null;
      const slides = mobileEl?.querySelectorAll(
        ".skew-mobile__slide"
      ) as NodeListOf<HTMLDivElement> | null;

      if (!mobileEl || !inner || !slides || slides.length === 0) return;

      const total = slides.length;

      gsap.set(inner, { yPercent: 0 });

      const tl = gsap.to(inner, {
        yPercent: -100 * (total - 1),
        ease: "none",
        paused: true,
      });

      let currentMobile = 0;
      setupMobileSlide(0);

      const st = ScrollTrigger.create({
        trigger: mobileEl,
        start: "top top",
        end: () => "+=" + window.innerHeight * (total - 1),
        pin: true,
        scrub: 0.7,
        snap: {
          snapTo: (value) => {
            const index = Math.round(value * (total - 1));
            return index / (total - 1);
          },
          duration: 0.25,
          ease: "power1.out",
        },
        onUpdate: (self) => {
          tl.progress(self.progress);
          const raw = self.progress * (total - 1);
          const index = Math.round(raw);
          if (index !== currentMobile) {
            currentMobile = index;
            setupMobileSlide(currentMobile);
          }
        },
      });

      return () => {
        st.kill();
        tl.kill();
      };
    }

    // DESKTOP: skew pages + wheel / key navigation
    const pageElements = Array.from(
      container.querySelectorAll<HTMLDivElement>(".skew-page")
    );

    let current = 0;
    const animTime = 1000;
    let isAnimating = false;

    const setClasses = () => {
      pageElements.forEach((page, index) => {
        page.classList.remove("skew-active", "skew-inactive");
        if (index === current) {
          page.classList.add("skew-active");
        } else if (index < current) {
          page.classList.add("skew-inactive");
        }
      });
    };

    const paginate = () => {
      isAnimating = true;
      setClasses();
      setupDesktopSlide(current);
      window.setTimeout(() => {
        isAnimating = false;
      }, animTime);
    };

    const navigateDown = () => {
      if (isAnimating || current === pageElements.length - 1) return;
      current++;
      paginate();
    };

    const navigateUp = () => {
      if (isAnimating || current === 0) return;
      current--;
      paginate();
    };

    const sliderInView = () => {
      const rect = container.getBoundingClientRect();
      const viewportH =
        window.innerHeight || document.documentElement.clientHeight;
      return rect.top >= -1 && rect.bottom <= viewportH + 1;
    };

    const wheelHandler = (e: WheelEvent) => {
      if (!sliderInView()) return;

      if (isAnimating) {
        e.preventDefault();
        return;
      }

      const goingDown = e.deltaY > 0;
      const atFirst = current === 0;
      const atLast = current === pageElements.length - 1;

      if (goingDown && !atLast) {
        e.preventDefault();
        navigateDown();
      } else if (!goingDown && !atFirst) {
        e.preventDefault();
        navigateUp();
      }
    };

    const keyHandler = (e: KeyboardEvent) => {
      if (!sliderInView()) return;
      if (isAnimating) {
        e.preventDefault();
        return;
      }

      const atFirst = current === 0;
      const atLast = current === pageElements.length - 1;

      if (e.key === "ArrowDown" && !atLast) {
        e.preventDefault();
        navigateDown();
      } else if (e.key === "ArrowUp" && !atFirst) {
        e.preventDefault();
        navigateUp();
      }
    };

    container.addEventListener("wheel", wheelHandler, { passive: false });
    window.addEventListener("keydown", keyHandler);

    setClasses();
    setupDesktopSlide(0);

    return () => {
      container.removeEventListener("wheel", wheelHandler);
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);

  const isImage = (bg: string) => bg.startsWith("http");

  return (
    <div ref={containerRef} className={`skew-container ${className}`}>
      <style>{`
        .skew-container {
          position: relative;
          width: 100%;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          font-family: "Nunito", -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* ---------- DESKTOP SKEWED CONTACT STORY ---------- */
        .skew-pages {
          position: relative;
          height: 100%;
          width: 100%;
          overflow: hidden;
        }

        .skew-page {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }

        .skew-page__half {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100vh;
          transition: transform 1s;
        }

        .skew-page__half--left {
          left: 0;
          transform: translate3d(-32.4vh, 100%, 0);
        }

        .skew-page__half--right {
          left: 50%;
          transform: translate3d(32.4vh, -100%, 0);
        }

        .skew-page.skew-active .skew-page__half {
          transform: translate3d(0, 0, 0);
        }

        .skew-page__skewed {
          overflow: hidden;
          position: absolute;
          top: 0;
          width: 140%;
          height: 100%;
          transform: skewX(-18deg);
          background: #000;
        }

        .skew-page__half--left .skew-page__skewed {
          left: -40%;
        }

        .skew-page__half--right .skew-page__skewed {
          right: -40%;
        }

        .skew-page__content {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-flow: column wrap;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          padding: 0 24%;
          color: #fff;
          transform: skewX(18deg);
          transition: transform 1s, opacity 1s;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          text-align: center;
          position: relative;
        }

        .skew-page__content::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.85),
            rgba(248, 249, 250, 0.9)
          );
          mix-blend-mode: normal;
          z-index: 0;
        }

        .skew-page__content > * {
          position: relative;
          z-index: 1;
        }

        .skew-page__half--left .skew-page__content {
          padding-left: 24%;
          padding-right: 24%;
          transform-origin: 100% 0;
        }

        .skew-page__half--right .skew-page__content {
          padding-left: 24%;
          padding-right: 24%;
          transform-origin: 0 100%;
        }

        .skew-page.skew-inactive .skew-page__content {
          opacity: 0.45;
          transform: skewX(18deg) scale(0.95);
        }

        .skew-page__heading {
          margin-bottom: 30px;
          font-size: clamp(45px, 7vw, 75px) !important;
          font-weight: 400;
          letter-spacing: 0.08em;
          text-align: center;
          font-family: "Dream Avenue", serif;
          line-height: 1.3;
          word-spacing: 0.2em;
          white-space: pre-line;
          cursor: pointer;
          transition: all 0.3s ease;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          color: #202124;
        }

        .skew-page__heading:hover {
          transform: scale(1.05);
          opacity: 0.9;
        }

        .skew-page__description {
          font-size: 22px;
          text-align: center;
          max-width: 32rem;
          line-height: 1.8;
          word-spacing: 0.1em;
          letter-spacing: 0.02em;
          white-space: pre-line;
          cursor: pointer;
          transition: transform 0.3s ease, opacity 0.3s ease;
          color: #3c4043;
          font-weight: 400;
          text-shadow: none;
          font-family: "Nunito", sans-serif;
        }

        .skew-page__description:hover {
          transform: scale(1.05);
          opacity: 0.9;
        }

        /* Elegant large service buttons */
        .skew-page__description.service-buttons {
          font-size: 26px;
          font-weight: 500;
          letter-spacing: 0.05em;
          word-spacing: 0.15em;
          line-height: 1.4;
          padding: 35px 45px;
          background: rgba(32, 33, 36, 0.05);
          border: 2px solid rgba(32, 33, 36, 0.1);
          border-radius: 12px;
          backdrop-filter: blur(20px);
          margin: 20px 0;
          display: block;
          width: 100%;
          max-width: 400px;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
          color: #202124;
          text-shadow: none;
          font-family: "Nunito", sans-serif;
        }

        .skew-page__description.service-buttons::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(32, 33, 36, 0.05),
            transparent
          );
          transition: left 0.6s;
        }

        .skew-page__description.service-buttons:hover {
          background: rgba(32, 33, 36, 0.08);
          border-color: rgba(32, 33, 36, 0.2);
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
        }

        .skew-page__description.service-buttons:hover::before {
          left: 100%;
        }

        .service-buttons-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 25px;
          padding: 30px;
          max-width: 500px;
          margin: 0 auto;
        }

        .skew-page__link {
          color: #f2c265;
          margin-top: 1.75rem;
          text-decoration: none;
          font-size: 0.9rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
        }

        .skew-page__link-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 1.75rem;
        }

        .skew-hint {
          position: absolute;
          right: 20px;
          bottom: 20px;
          color: #aaa;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          pointer-events: none;
        }

        /* ---------- IMAGE-ONLY LAST SLIDE (background imgs, skewed edges) ---------- */
        .skew-page__content--image-only {
          padding: 0;
        }

        .skew-page__content--image-only::before {
          background: rgba(255, 255, 255, 0.7); /* light overlay so images still visible, but edges skewed */
        }

        /* Contact Form Styles */
        .contact-form-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 450px;
          margin: 0 auto;
        }

        .contact-form-grid {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          width: 100%;
        }

        .contact-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .contact-form-field {
          display: flex;
          flex-direction: column;
        }

        .contact-form-input,
        .contact-form-textarea {
          background: rgba(248, 249, 250, 0.8);
          border: 2px solid rgba(32, 33, 36, 0.1);
          border-radius: 8px;
          padding: 1.2rem 1.5rem;
          font-size: 1rem;
          color: #202124;
          outline: none;
          backdrop-filter: blur(15px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: "Nunito", sans-serif;
          letter-spacing: 0.02em;
        }

        .contact-form-input::placeholder,
        .contact-form-textarea::placeholder {
          color: rgba(32, 33, 36, 0.6);
        }

        .contact-form-input:focus,
        .contact-form-textarea:focus {
          border-color: rgba(26, 115, 232, 0.5);
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
        }

        .contact-form-textarea {
          resize: vertical;
          min-height: 90px;
          line-height: 1.6;
        }

        select.contact-form-input {
          cursor: pointer;
        }

        @media (max-width: 600px) {
          .contact-form-row {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        .rain-button-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 300px;
          margin: 2rem auto 0;
        }

        /* ---------- MOBILE CONTACT SLIDER ---------- */
        .skew-mobile {
          display: none;
        }

        .skew-mobile__form-block {
          padding: 3rem 2rem 3.5rem;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          color: #202124;
        }

        .skew-mobile__form-heading {
          font-size: 1.8rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          margin-bottom: 1.4rem;
          font-family: "Dream Avenue", serif;
        }

        .skew-mobile__form-grid {
          display: grid;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .skew-mobile__field {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .skew-mobile__label {
          font-size: 0.8rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          opacity: 0.7;
          font-family: "Nunito", sans-serif;
        }

        .skew-mobile__input,
        .skew-mobile__textarea,
        .skew-mobile__select {
          background: rgba(248, 249, 250, 0.8);
          border: 1px solid rgba(32, 33, 36, 0.1);
          border-radius: 6px;
          padding: 0.75rem 0.9rem;
          font-size: 0.95rem;
          color: #202124;
          outline: none;
          font-family: "Nunito", sans-serif;
        }

        .skew-mobile__textarea {
          min-height: 110px;
          resize: vertical;
        }

        .skew-mobile__input:focus,
        .skew-mobile__textarea:focus,
        .skew-mobile__select:focus {
          border-color: rgba(26, 115, 232, 0.5);
          background: rgba(255, 255, 255, 0.9);
        }

        .skew-mobile__submit {
          margin-top: 1rem;
          padding: 1rem 2rem;
          border-radius: 6px;
          border: none;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: #1a73e8;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          font-family: "Nunito", sans-serif;
        }

        .skew-mobile__submit:hover {
          background: #1557b0;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(26, 115, 232, 0.3);
        }

        .skew-mobile__meta {
          margin-top: 1.75rem;
          font-size: 0.9rem;
          line-height: 1.7;
          opacity: 0.85;
          font-family: "Nunito", sans-serif;
        }

        @media (min-width: 901px) {
          .skew-container {
            height: 100vh;
            overflow: hidden;
          }
        }

        @media (max-width: 900px) {
          .skew-container {
            height: auto;
            overflow: visible;
          }

          .skew-pages {
            display: none;
          }

          .skew-mobile {
            display: block;
            position: relative;
            height: 100vh;
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            color: #202124;
            overflow: hidden;
          }

          .skew-mobile__inner {
            position: relative;
            width: 100%;
          }

          .skew-mobile__slide {
            min-height: 100vh;
            padding: 3.1rem 1.9rem 2.4rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
          }

          .skew-mobile__heading {
            font-size: 2rem;
            line-height: 1.3;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            word-spacing: 0.2em;
            margin-bottom: 1.1rem;
            font-family: "Dream Avenue", serif;
          }

          .skew-mobile__desc {
            font-size: 1.1rem;
            line-height: 1.8;
            letter-spacing: 0.02em;
            word-spacing: 0.1em;
            max-width: 26rem;
            opacity: 0.9;
            font-family: "Nunito", sans-serif;
          }

          .skew-hint {
            right: 14px;
            bottom: 14px;
            font-size: 0.68rem;
          }
        }
      `}</style>

      {/* DESKTOP: skewed contact storytelling */}
      <div className="skew-pages">
        {pages.map((page, index) => {
          const isLast = index === pages.length - 1;

          return (
            <div
              key={index}
              className={`skew-page skew-page-${index + 1} ${
                index === 0 ? "skew-active" : ""
              }`}
            >
              {/* LEFT HALF */}
              <div className="skew-page__half skew-page__half--left">
                <div className="skew-page__skewed">
                  {isLast ? (
                    // Last slide left: skewed background image
                    <div
                      className="skew-page__content skew-page__content--image-only"
                      style={{
                        backgroundImage: `url(/images/l11.jpg)`,
                      }}
                    />
                  ) : (
                    <div
                      className="skew-page__content"
                      style={
                        isImage(page.leftBg)
                          ? { backgroundImage: `url(${page.leftBg})` }
                          : { backgroundColor: page.leftBg }
                      }
                    >
                      <h2
                        className="skew-page__heading"
                        data-heading={page.leftHeading}
                      >
                        {page.leftHeading}
                      </h2>
                      <p className="skew-page__description">{page.leftDesc}</p>
                      {page.leftLink && (
                        <div className="skew-page__link-container">
                          <GlassRainButton href="/projects">
                            {page.leftLink}
                          </GlassRainButton>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT HALF */}
              <div className="skew-page__half skew-page__half--right">
                <div className="skew-page__skewed">
                  {isLast ? (
                    // Last slide right: skewed background image
                    <div
                      className="skew-page__content skew-page__content--image-only"
                      style={{
                        backgroundImage: `url(/images/l6.jpg)`,
                      }}
                    />
                  ) : (
                    <div
                      className="skew-page__content"
                      style={
                        isImage(page.rightBg)
                          ? { backgroundImage: `url(${page.rightBg})` }
                          : { backgroundColor: page.rightBg }
                      }
                    >
                      <h2
                        className="skew-page__heading"
                        data-heading={page.rightHeading}
                      >
                        {page.rightHeading}
                      </h2>
                      {page.showForm ? (
                        <div className="contact-form-container">
                          <div className="contact-form-grid">
                            <div className="contact-form-row">
                              <div className="contact-form-field">
                                <input
                                  className="contact-form-input"
                                  type="text"
                                  placeholder="Full Name *"
                                  required
                                />
                              </div>
                              <div className="contact-form-field">
                                <input
                                  className="contact-form-input"
                                  type="email"
                                  placeholder="Email Address *"
                                  required
                                />
                              </div>
                            </div>
                            <div className="contact-form-field">
                              <input
                                className="contact-form-input"
                                type="tel"
                                placeholder="Phone Number"
                              />
                            </div>
                            <div className="contact-form-row">
                              <div className="contact-form-field">
                                <select className="contact-form-input" defaultValue="" required>
                                  <option value="" disabled>Project Type *</option>
                                  <option>Residential New Build</option>
                                  <option>Renovation & Extension</option>
                                  <option>Commercial Architecture</option>
                                  <option>Interior Design</option>
                                </select>
                              </div>
                              <div className="contact-form-field">
                                <select className="contact-form-input" defaultValue="">
                                  <option value="" disabled>Budget Range</option>
                                  <option>Under $500K</option>
                                  <option>$500K - $1M</option>
                                  <option>$1M - $2M</option>
                                  <option>Over $2M</option>
                                </select>
                              </div>
                            </div>
                            <div className="contact-form-field">
                              <textarea
                                className="contact-form-textarea"
                                placeholder="Tell us about your project vision, site location, and specific requirements..."
                                rows={3}
                                required
                              />
                            </div>
                            <GlassRainButton href="#">
                              Send Project Brief
                            </GlassRainButton>
                          </div>
                        </div>
                      ) : page.showRainButton ? (
                        <div className="rain-button-container">
                          <GlassRainButton href="/contact">
                            Start Your Project
                          </GlassRainButton>
                        </div>
                      ) : page.serviceButtons ? (
                        <div className="service-buttons-container">
                          {page.serviceButtons.map((button, btnIndex) => (
                            <div
                              key={btnIndex}
                              className="skew-page__description service-buttons"
                            >
                              {button}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="skew-page__description">
                          {page.rightDesc}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MOBILE: contact-focused slider */}
      <div className="skew-mobile">
        <div className="skew-mobile__inner">
          {mobileSlides.map((slide, index) => (
            <div key={index} className="skew-mobile__slide">
              <div className="skew-mobile__label">
                {slide.label} · 0{index + 1}/0{mobileSlides.length}
              </div>
              <h2 className="skew-mobile__heading">{slide.heading}</h2>
              <p className="skew-mobile__desc">{slide.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE contact form + details */}
      <div id="contact-form" className="skew-mobile__form-block">
        <h2 className="skew-mobile__form-heading">Contact Forma</h2>
        <div className="skew-mobile__form-grid">
          <div className="skew-mobile__field">
            <label className="skew-mobile__label">Full Name *</label>
            <input
              className="skew-mobile__input"
              type="text"
              placeholder="Your full name"
              required
            />
          </div>
          <div className="skew-mobile__field">
            <label className="skew-mobile__label">Email Address *</label>
            <input
              className="skew-mobile__input"
              type="email"
              placeholder="your.email@example.com"
              required
            />
          </div>
          <div className="skew-mobile__field">
            <label className="skew-mobile__label">Phone Number</label>
            <input
              className="skew-mobile__input"
              type="tel"
              placeholder="+61 xxx xxx xxx"
            />
          </div>
          <div className="skew-mobile__field">
            <label className="skew-mobile__label">Project Type *</label>
            <select className="skew-mobile__select" defaultValue="" required>
              <option value="" disabled>
                Select your project type
              </option>
              <option>Residential New Build</option>
              <option>Renovation & Extension</option>
              <option>Commercial Architecture</option>
              <option>Interior Design</option>
              <option>Multi-Residential</option>
              <option>Hospitality Design</option>
              <option>Other</option>
            </select>
          </div>
          <div className="skew-mobile__field">
            <label className="skew-mobile__label">Budget Range</label>
            <select className="skew-mobile__select" defaultValue="">
              <option value="" disabled>
                Select budget range (optional)
              </option>
              <option>Under $500K</option>
              <option>$500K - $1M</option>
              <option>$1M - $2M</option>
              <option>$2M - $5M</option>
              <option>Over $5M</option>
              <option>Let's discuss</option>
            </select>
          </div>
          <div className="skew-mobile__field">
            <label className="skew-mobile__label">Project Timeline</label>
            <select className="skew-mobile__select" defaultValue="">
              <option value="" disabled>
                When would you like to start?
              </option>
              <option>Immediately</option>
              <option>1-3 months</option>
              <option>3-6 months</option>
              <option>6-12 months</option>
              <option>Just exploring options</option>
            </select>
          </div>
          <div className="skew-mobile__field">
            <label className="skew-mobile__label">Project Description *</label>
            <textarea
              className="skew-mobile__textarea"
              placeholder="Tell us about your project vision, site location, specific requirements, and any inspiration you have in mind..."
              required
            />
          </div>
        </div>
        <button className="skew-mobile__submit" type="button">
          Send enquiry
        </button>

        <div className="skew-mobile__meta">
          Shambala Design Studio · India
          <br />
          info@shambala.studio · +91 98765 43210
          <br />
          Mon–Sat · 10am–7pm IST
        </div>
      </div>

      <div className="skew-hint">Scroll / Swipe</div>
    </div>
  );
};

export default SkewedSlider;
