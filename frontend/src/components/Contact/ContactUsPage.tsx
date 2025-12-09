import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassRainButton from "../UI/GlassRainButton";
import GlassButton from "../UI/GlassButton";

const ContactUsPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const listeners: Array<{
      el: HTMLElement;
      move: (e: MouseEvent) => void;
      leave: () => void;
    }> = [];

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".contact-animate");
      const tiltCards = gsap.utils.toArray<HTMLElement>(".contact-tilt");

      cards.forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 60, scale: 0.95 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.set(".cup-hero-reveal-line", { yPercent: 120, autoAlpha: 0 });
      gsap.set(".cup-hero-actions .glass-rain-btn", {
        y: 80,
        autoAlpha: 0,
        scale: 0.6,
      });

      const heroTl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.2,
      });

      heroTl.to(".cup-hero-kicker .cup-hero-reveal-line", {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.8,
      });
      heroTl.to(
        ".cup-hero-title .cup-hero-reveal-line",
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1,
          skewY: 0,
        },
        "-=0.25"
      );
      heroTl.to(
        ".cup-hero-subtitle .cup-hero-reveal-line",
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.9,
        },
        "-=0.32"
      );
      heroTl.to(
        ".cup-hero-actions .glass-rain-btn",
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "back.out(1.4)",
        },
        "-=0.35"
      );

      tiltCards.forEach((card) => {
        const move = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const rotateX = gsap.utils.mapRange(0, rect.height, -10, 10, y);
          const rotateY = gsap.utils.mapRange(0, rect.width, 10, -10, x);

          gsap.to(card, {
            duration: 0.7,
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            ease: "power2.out",
          });
        };

        const leave = () => {
          gsap.to(card, {
            duration: 1,
            rotationX: 0,
            rotationY: 0,
            ease: "elastic.out(1, 0.5)",
          });
        };

        card.addEventListener("mousemove", move);
        card.addEventListener("mouseleave", leave);
        listeners.push({ el: card, move, leave });
      });
    });

    return () => {
      listeners.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
      ctx.revert();
    };
  }, []);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message && selectedOption) {
      console.log("Contact form submitted", {
        ...formData,
        lookingFor: selectedOption,
      });
    }
  };

  const options = ["New house", "Upgrade", "Commercial property", "Downsize"];

  const scrollToForm = () => {
    const formSection = document.getElementById("contact-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:studio@forma.design";
  };

  return (
    <div className="cup-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .cup-page {
          --cup-accent: var(--color-green, #5b7c4f);
          --cup-accent-soft: #9bc56f;
          --cup-ink: #1f271f;
          --cup-paper: var(--color-off-white, #f7f7f2);
          --cup-muted: #5f6a61;
          background: var(--cup-paper);
          color: var(--cup-ink);
          font-family: "Nunito", "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.5;
        }

        /* ========== HERO ========== */
        .cup-hero {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-image: linear-gradient(
              135deg,
              rgba(13, 20, 16, 0.68),
              rgba(34, 49, 39, 0.82)
            ),
            url('/images/ess.jpg');
          display: flex;
          align-items: center;
          justify-content: center;
          isolation: isolate;
        }

        .cup-hero-overlay {
          position: absolute;
          inset: 0;
          background:rgba(0, 0, 0, 0.35); 
        }

        .cup-hero-content {
          position: relative;
          max-width: 980px;
          width: 100%;
          padding: clamp(1.5rem, 4vw, 3rem);
          text-align: center;
          color: #f7f7f2;
          background: transparent;
          border: none;
          backdrop-filter: none;
          border-radius: 0;
          box-shadow: none;
          text-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
        }

        .cup-hero-kicker {
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-size: 0.92rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 1rem;
          overflow: hidden;
        }

        .cup-hero-title {
          font-size: clamp(3.4rem, 7vw, 5.4rem);
          line-height: 0.98;
          margin: 0 0 1rem;
          font-weight: 400;
          letter-spacing: 0.01em;
          overflow: hidden;
        }

        .cup-hero-subtitle {
          margin: 0 0 2.4rem;
          font-size: 1.08rem;
          opacity: 0.9;
          max-width: 38rem;
          margin-left: auto;
          margin-right: auto;
          color: rgba(247, 247, 242, 0.9);
          overflow: hidden;
        }

        .cup-hero-reveal-line {
          display: inline-block;
        }

        .cup-hero-actions {
          display: inline-flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 0.5rem;
          transform-origin: center;
          overflow: hidden;
        }

        .cup-hero-glass-btn {
          min-width: 190px;
          border-radius: 12px;
        }

        .cup-hero .glass-rain-btn:focus,
        .cup-hero .glass-rain-btn:focus-visible,
        .cup-hero .glass-rain-btn:active {
          outline: none;
          box-shadow: none;
        }

        .cup-hero-glass-btn .glass-rain-btn-icon {
          border-color: rgba(255, 255, 255, 0.55);
        }

        .cup-hero-glass-btn .glass-rain-btn-bg {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.3),
            rgba(255, 255, 255, 0.1)
          );
          opacity: 0.24;
        }

        .cup-hero-glass-btn--ghost {
          background: rgba(255, 255, 255, 0.08);
          border-top: 1px solid rgba(255, 255, 255, 0.28);
          border-bottom: 1px solid rgba(255, 255, 255, 0.28);
        }

        .cup-hero-glass-btn--ghost .glass-rain-btn-bg {
          background: rgba(255, 255, 255, 0.22);
        }

        .cup-hero-btn {
          min-width: 160px;
          padding: 0.85rem 1.7rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          cursor: pointer;
          background: rgba(0, 0, 0, 0.2);
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
          text-decoration: none;
        }

        .cup-hero-btn span {
          font-size: 0.8rem;
        }

        .cup-hero-btn-primary {
          background: #f5f5f5;
          color: #111;
          border-color: #f5f5f5;
        }

        .cup-hero-btn:hover,
        .cup-hero-btn:focus-visible {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
        }

        /* ========== MAIN CONTACT SECTION ========== */
        .cup-main {
          padding: clamp(4rem, 8vw, 7rem) 0;
          background: linear-gradient(180deg, var(--cup-paper) 0%, #f0eee6 100%);
        }

        .cup-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .cup-info-wrapper {
          display: flex;
          gap: clamp(2.5rem, 5vw, 4rem);
          align-items: stretch;
        }

        .contact-tilt {
          will-change: transform;
          transform-style: preserve-3d;
        }

        /* FORM */
        .cup-form {
          flex: 1;
          background: #ffffff;
          border: 1px solid #ede9dd;
          border-radius: 18px;
          padding: clamp(2rem, 4vw, 3rem);
          box-shadow: 0 30px 80px rgba(15, 23, 18, 0.12);
        }

        .cup-input-wrapper {
          position: relative;
          margin-bottom: clamp(1.8rem, 4vw, 2.8rem);
        }

        /* One font-size rule for all 4 fields */
        .cup-big-line {
          font-size: clamp(2.8rem, 4.8vw, 4.4rem);
        }

        .cup-contact-header {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-weight: 400;
          letter-spacing: -0.01em;
          color: var(--cup-ink);
          opacity: 0.95;
          padding: 0;
          font-family: inherit;
        }

        .cup-contact-header::placeholder {
          color: rgba(31, 39, 31, 0.55);
          opacity: 1;
        }

        .cup-contact-header:focus,
        .cup-contact-header:not(:placeholder-shown) {
          color: var(--cup-ink);
          opacity: 1;
        }

        .cup-contact-textarea {
          min-height: 120px;
          resize: none;
        }

        .cup-underline {
          height: 2px;
          width: 0%;
          background: linear-gradient(
            90deg,
            var(--cup-accent) 0%,
            var(--cup-accent-soft) 100%
          );
          transition: width 0.4s ease;
        }

        .cup-input-wrapper input:focus + .cup-underline,
        .cup-input-wrapper textarea:focus + .cup-underline,
        .cup-input-wrapper.focused .cup-underline {
          width: 100%;
        }

        /* Custom Select Dropdown */
        .cup-select-wrapper {
          position: relative;
          cursor: pointer;
        }

        .cup-select-display {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-weight: 400;
          letter-spacing: -0.01em;
          color: rgba(31, 39, 31, 0.65);
          opacity: 1;
          padding: 0;
          padding-right: 2.5rem; /* space for accordion icon */
          cursor: pointer;
          user-select: none;
        }

        .cup-select-display.has-value {
          color: var(--cup-ink);
          opacity: 1;
        }

        .cup-select-icon {
          position: absolute;
          right: 0.4rem;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cup-select-icon svg {
          width: 100%;
          height: 100%;
          fill: var(--cup-muted);
          transition: transform 0.25s ease, fill 0.25s ease;
        }

        .cup-input-wrapper.focused .cup-select-icon svg {
          transform: translateY(-50%) rotate(180deg);
          fill: var(--cup-accent);
        }

        .cup-select-options {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #ffffff;
          border: 1px solid #ede9dd;
          border-radius: 14px;
          margin-top: 0.5rem;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          z-index: 10;
          box-shadow: 0 26px 60px rgba(15, 23, 18, 0.12);
          backdrop-filter: blur(8px);
        }

        .cup-select-options.open {
          max-height: 300px;
          opacity: 1;
          transform: translateY(0);
        }

        .cup-select-option {
          padding: 1rem 1.5rem;
          font-size: 1.2rem;
          color: var(--cup-ink);
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .cup-select-option:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #203124;
        }

        .cup-select-option:first-child {
          border-radius: 14px 14px 0 0;
        }

        .cup-select-option:last-child {
          border-radius: 0 0 14px 14px;
        }

        /* ========== SUBMIT BUTTON ========== */
        .cup-button-area {
          position: relative;
          display: flex;
          align-items: center;
          margin-top: 1rem;
        }

        .cup-behind-line {
          flex: 1;
          height: 1px;
          background: var(--cup-ink);
          opacity: 0.2;
        }

        .cup-button-wrapper {
          position: relative;
          margin-left: -60px;
        }

        .cup-submit-button {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: linear-gradient(
            135deg,
            var(--cup-accent) 0%,
            #2f3c33 100%
          );
          color: #f7f7f2;
          cursor: pointer;
          outline: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-origin: center;
          transform: translateY(0);
          box-shadow: 0 20px 44px rgba(13, 20, 16, 0.3);
          transition: transform 0.45s cubic-bezier(0.23, 1, 0.32, 1),
            box-shadow 0.45s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .cup-submit-inner {
          transform: translateY(0);
          transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .cup-p-button {
          font-size: 0.9rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin: 0;
          transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1),
            letter-spacing 0.35s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .cup-submit-button:hover,
        .cup-submit-button:focus-visible {
          transform: translate(-8px, -8px);
          box-shadow: 0 28px 52px rgba(11, 17, 14, 0.42);
        }

        .cup-submit-button:hover .cup-submit-inner,
        .cup-submit-button:focus-visible .cup-submit-inner {
          transform: translateY(-4px);
        }

        .cup-submit-button:hover .cup-p-button,
        .cup-submit-button:focus-visible .cup-p-button {
          transform: translateY(-2px);
          letter-spacing: 0.28em;
        }

        /* ========== RIGHT-SIDE CONTACT INFO (FORMA) ========== */
        .cup-info-column {
          width: 35%;
          flex: 0 0 35%;
          background: #ffffff;
          border: 1px solid #ede9dd;
          border-radius: 18px;
          padding: clamp(1.6rem, 4vw, 2.2rem);
          box-shadow: 0 22px 60px rgba(15, 23, 18, 0.12);
        }

        .cup-info-title {
          margin-bottom: 1.5rem;
          font-size: 2.8rem;
          font-weight: 600;
          color: var(--cup-accent);
          letter-spacing: -0.02em;
        }

        .cup-info-list {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem;
          line-height: 1.9;
          font-size: 1.2rem;
          color: var(--cup-ink);
        }

        .cup-info-list li {
          margin-bottom: 0.85rem;
        }

        .cup-info-list li strong {
          font-weight: 700;
          color: var(--cup-accent);
        }

        .cup-arrow {
          width: 70px;
          margin-top: 1rem;
        }

        .cup-arrow-icon {
          width: 100%;
          fill: var(--cup-accent);
          opacity: 0.85;
        }

        /* ========== PARALLAX SECTION ========== */
        .cup-parallax {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          /* Modern architectural interior / lobby */
          background-image: url('/images/el1.webp');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        /* Desktop: Use background-attachment fixed for true parallax */
        @media (min-width: 768px) {
          .cup-parallax {
            background-attachment: fixed;
          }
        }

        /* Mobile: Use standard background scroll - more reliable */
        @media (max-width: 767px) {
          .cup-parallax {
            background-attachment: scroll;
            background-size: cover;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
          }
        }

        .cup-parallax-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
              120deg,
              rgba(12, 18, 14, 0.2),
              rgba(12, 18, 14, 0.15)
            );
          z-index: 1;
        }

        .cup-parallax-content {
          position: relative;
          max-width: 1200px;
          width: 100%;
          padding: clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem);
          color: #f7f7f2;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 3rem;
          z-index: 2;
          background: rgba(16, 24, 19, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          backdrop-filter: blur(6px);
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.35);
        }

        .cup-parallax-top h2 {
          font-size: clamp(3rem, 5vw, 4.6rem);
          max-width: 14ch;
          line-height: 1.05;
          margin: 0;
          font-weight: 400;
          letter-spacing: 0.01em;
        }

        .cup-parallax-bottom {
          max-width: 480px;
        }

        .cup-parallax-bottom p {
          margin-bottom: 1.5rem;
          font-size: 1.02rem;
          line-height: 1.8;
          opacity: 0.92;
          color: rgba(247, 247, 242, 0.92);
        }

        .cup-parallax .home-benefits-cta {
          color: #f7f7f2;
          border-top: 1px solid rgba(247, 247, 242, 0.28);
          border-bottom: 1px solid rgba(247, 247, 242, 0.28);
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(8px);
          font-size: 0.85rem;
          letter-spacing: 0.14em;
        }

        .cup-parallax .home-benefits-cta-icon {
          border-color: rgba(247, 247, 242, 0.45);
          color: #f7f7f2;
        }

        .cup-parallax .home-benefits-cta-bg {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.3),
            rgba(255, 255, 255, 0.1)
          );
          opacity: 0.28;
        }

        .cup-parallax .home-benefits-cta:hover {
          color: #0f1712;
          background: rgba(247, 247, 242, 0.9);
        }

        .cup-parallax .home-benefits-cta:hover .home-benefits-cta-icon {
          border-color: rgba(15, 23, 18, 0.16);
          color: #0f1712;
        }

        .cup-parallax-cta-btn {
          margin-top: 0.5rem;
        }

        /* ========== MAP SECTION ========== */
        .cup-map-section {
          padding: 5rem 0;
          background: #ffffff;
          border-top: 1px solid #ede9dd;
        }

        .cup-map-header {
          margin-bottom: 2rem;
        }

        .cup-map-header h2 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          color: var(--cup-accent);
          letter-spacing: -0.01em;
        }

        .cup-map-header p {
          color: var(--cup-muted);
        }

        .cup-map-wrapper iframe {
          width: 100%;
          height: 400px;
          border: none;
          border-radius: 12px;
          border: 1px solid #ede9dd;
          box-shadow: 0 24px 60px rgba(15, 23, 18, 0.12);
        }

        /* ========== LARGE SCREENS (1600px+) ========== */
        @media (min-width: 1600px) {
          .cup-inner {
            max-width: 1440px;
          }

          .cup-hero-title {
            font-size: clamp(4rem, 8vw, 6.2rem);
          }

          .cup-hero-subtitle {
            font-size: 1.32rem;
          }

          .cup-big-line {
            font-size: clamp(3.36rem, 5.8vw, 5.28rem);
          }

          .cup-info-title {
            font-size: 3.84rem;
          }

          .cup-info-list {
            font-size: 1.6rem;
          }

          .cup-parallax-top h2 {
            font-size: clamp(3.6rem, 6vw, 5.4rem);
          }

          .cup-parallax-bottom p {
            font-size: 1.22rem;
          }

          .cup-map-header h2 {
            font-size: 3rem;
          }

          .cup-map-header p {
            font-size: 1.2rem;
          }

          .cup-select-option {
            font-size: 1.44rem;
          }
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 900px) {
          .cup-info-wrapper {
            flex-direction: column;
            gap: 3rem;
          }

          .cup-info-column {
            width: 100%;
            flex: 1;
          }

          .cup-info-title {
            font-size: 2.4rem;
          }

          .cup-info-list {
            font-size: 1.2rem;
          }

          .cup-button-wrapper {
            margin-left: -40px;
          }

          .cup-submit-button {
            width: 110px;
            height: 110px;
          }

          .cup-big-line {
            font-size: clamp(2.2rem, 6vw, 3.4rem);
          }

          .cup-parallax {
            min-height: 70vh;
          }

          .cup-parallax-content {
            gap: 2.5rem;
          }

          .cup-parallax-top h2 {
            max-width: 100%;
          }

          .cup-select-option {
            font-size: 1rem;
            padding: 0.8rem 1rem;
          }

          .cup-hero-subtitle {
            font-size: 0.98rem;
          }
        }
      `}</style>

      {/* HERO */}
      <section className="cup-hero">
        <div className="cup-hero-overlay" />
        <div className="cup-hero-content">
          <p className="cup-hero-kicker">
            <span className="cup-hero-reveal-line">Forma Studio</span>
          </p>
          <h1 className="cup-hero-title">
            <span className="cup-hero-reveal-line">
              Let’s shape your next space.
            </span>
          </h1>
          <p className="cup-hero-subtitle">
            <span className="cup-hero-reveal-line">
              New home, refined upgrade, or a commercial property that needs a
              quieter kind of drama— tell us where you are, and we’ll help you
              plan what comes next.
            </span>
          </p>

          <div className="cup-hero-actions">
            <GlassRainButton
              className="cup-hero-glass-btn"
              onClick={scrollToForm}
            >
              Start a Project
            </GlassRainButton>
            <GlassRainButton
              className="cup-hero-glass-btn cup-hero-glass-btn--ghost"
              onClick={handleEmailClick}
            >
              Email the Studio
            </GlassRainButton>
          </div>
        </div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="cup-main" id="contact-form">
        <div className="cup-inner">
          <div className="cup-info-wrapper">
            {/* LEFT – FORM */}
            <div className="cup-form contact-animate contact-tilt">
              {/* NAME */}
              <div className="cup-input-wrapper">
                <input
                  placeholder="Your Name"
                  className="cup-contact-header cup-big-line"
                  autoComplete="off"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <div className="cup-underline" />
              </div>

              {/* EMAIL */}
              <div className="cup-input-wrapper">
                <input
                  placeholder="Your Email"
                  className="cup-contact-header cup-big-line"
                  autoComplete="off"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <div className="cup-underline" />
              </div>

              {/* SELECT SERVICE */}
              <div
                className={`cup-input-wrapper ${
                  isOpen || selectedOption ? "focused" : ""
                }`}
              >
                <div className="cup-select-wrapper">
                  <div
                    className={`cup-select-display cup-big-line ${
                      selectedOption ? "has-value" : ""
                    }`}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {selectedOption || "Select service"}
                  </div>
                  <div className={`cup-select-options ${isOpen ? "open" : ""}`}>
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className="cup-select-option"
                        onClick={() => {
                          setSelectedOption(option);
                          setIsOpen(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                  <div className="cup-select-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M7 10l5 5 5-5H7z" />
                    </svg>
                  </div>
                </div>
                <div className="cup-underline" />
              </div>

              {/* MESSAGE */}
              <div className="cup-input-wrapper">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  className="cup-contact-header cup-contact-textarea cup-big-line"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
                <div className="cup-underline" />
              </div>

              <div className="cup-button-area">
                <div className="cup-behind-line" />
                <div className="cup-button-wrapper">
                  <button
                    className="cup-submit-button"
                    onClick={handleSubmit}
                    tabIndex={0}
                  >
                    <div className="cup-submit-inner">
                      <p className="cup-p-button">SUBMIT</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT – CONTACT INFO (FORMA) */}
            <div className="cup-info-column contact-animate contact-tilt">
              <h3 className="cup-info-title">Forma Studio</h3>
              <ul className="cup-info-list">
                <li>
                  <strong>Projects:</strong> studio@forma.design
                </li>
                <li>
                  <strong>New enquiries:</strong> hello@forma.design
                </li>
                <li>
                  <strong>Phone:</strong> +61 (0) 400 000 000
                </li>
                <li>
                  <strong>Studio:</strong> By appointment only, Melbourne /
                  Jaipur
                </li>
              </ul>

              <div className="cup-arrow">
                <svg viewBox="0 0 36.41 36.41" className="cup-arrow-icon">
                  <path d="M18.21,0a18.21,18.21,0,1,0,18.2,18.21A18.22,18.22,0,0,0,18.21,0Zm0,.71A17.5,17.5,0,1,1,.71,18.21,17.53,17.53,0,0,1,18.21.71Zm0,9a.34.34,0,0,0-.36.35V25.51l-4.68-4.67a.35.35,0,0,0-.49.49L18,26.62a.33.33,0,0,0,.25.1.32.32,0,0,0,.25-.1l5.28-5.28a.33.33,0,0,0,0-.5.34.34,0,0,0-.49,0l-4.68,4.68V10a.34.34,0,0,0-.36-.35Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARALLAX SECTION - SIMPLE AND CLEAN */}
      <section className="cup-parallax">
        <div className="cup-parallax-overlay" />
        <div className="cup-parallax-content contact-animate contact-tilt">
          <div className="cup-parallax-top">
            <h2>Where considered spaces meet calm living.</h2>
          </div>

          <div className="cup-parallax-bottom">
            <p>
              From new builds to thoughtful renovations, we shape architecture
              that balances form, light, and everyday life—so your spaces feel
              timeless, not temporary.
            </p>
            <GlassButton
              href="mailto:studio@forma.design"
              className="cup-parallax-cta-btn"
            >
              Schedule a Consultation
            </GlassButton>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="cup-map-section">
        <div className="cup-inner">
          <div className="cup-map-header">
            <h2>Find Us</h2>
            <p>
              Drop by, or schedule a visit in advance. We're happy to walk you
              through everything.
            </p>
          </div>

          <div className="cup-map-wrapper">
            <iframe
              title="Location map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.4486912397893!2d-79.6431!3d43.5890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDM1JzIwLjQiTiA3OcKwMzgnMzUuMiJX!5e0!3m2!1sen!2sca!4v1234567890"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
