import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AestheticButton from "../UI/AestheticButton";
import ReadMoreButton from "../UI/ReadMoreButton";
import "./CTASection.css";

gsap.registerPlugin(ScrollTrigger);

const CTASection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const mandalaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation - word by word reveal
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".cta-word");
        gsap.from(words, {
          yPercent: 120,
          opacity: 0,
          rotationX: -90,
          transformOrigin: "center bottom",
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }

      // Description fade in with slide
      if (descriptionRef.current) {
        gsap.from(descriptionRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Form animation - slide up with scale
      if (formRef.current) {
        gsap.from(formRef.current, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.9,
          delay: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // CTA buttons animation
      const ctaButtons = sectionRef.current?.querySelectorAll(".cta-actions > *");
      if (ctaButtons) {
        gsap.from(ctaButtons, {
          opacity: 0,
          y: 30,
          scale: 0.9,
          duration: 0.7,
          stagger: 0.15,
          delay: 0.9,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".cta-actions",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setIsSubmitted(true);

    gsap.from(".cta-success-message", {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });

    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
    }, 4000);
  };

  const handleParallax = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    const content = sectionRef.current?.querySelector('.cta-container') as HTMLElement;
    const mandala = mandalaRef.current;

    if (content) {
      content.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    }
    if (mandala) {
      mandala.style.transform = `translate(-50%, -50%) rotate(${x}deg)`;
    }
  };

  return (
    <section className="cta-section" ref={sectionRef} onMouseMove={handleParallax}>
      {/* Atmospheric Effects */}
      <div className="cta-veil" />
      <div className="cta-mist" />

      {/* Sacred Geometry */}
      <div className="cta-mandala" ref={mandalaRef}>
        <svg viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90"/>
          <circle cx="100" cy="100" r="70"/>
          <circle cx="100" cy="100" r="50"/>
          <circle cx="100" cy="100" r="30"/>
          <polygon points="100,10 190,100 100,190 10,100"/>
          <polygon points="100,30 170,100 100,170 30,100"/>
          <line x1="100" y1="10" x2="100" y2="190"/>
          <line x1="10" y1="100" x2="190" y2="100"/>
          <line x1="30" y1="30" x2="170" y2="170"/>
          <line x1="170" y1="30" x2="30" y2="170"/>
        </svg>
      </div>

      <div className="cta-container">
        <div className="cta-content">
          {/* Main Title */}
          <h2 className="cta-title" ref={titleRef}>
            <span className="cta-word-wrapper">
              <span className="cta-word">Build</span>
            </span>{" "}
            <span className="cta-word-wrapper">
              <span className="cta-word">Your</span>
            </span>{" "}
            <span className="cta-word-wrapper">
              <em className="cta-word">Dream</em>
            </span>
          </h2>

          {/* Description */}
          <p className="cta-description" ref={descriptionRef}>
            Transform your vision into reality. Let's create something extraordinary together.
          </p>

          {/* Email Form */}
          <form
            className={`cta-form ${isFocused ? "cta-form-focused" : ""}`}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div className="cta-input-group">
              <label htmlFor="cta-email" className="cta-label">
                Email Address
              </label>
              <div className="cta-input-wrapper">
                <input
                  id="cta-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="your@email.com"
                  className="cta-email-input"
                  required
                  disabled={isSubmitted}
                />
                <div className="cta-input-line"></div>
                <div className="cta-input-focus-line"></div>
              </div>
            </div>
            <button
              type="submit"
              className="cta-submit-button"
              disabled={isSubmitted}
            >
              <span className="cta-submit-text">
                {isSubmitted ? "Subscribed!" : "Subscribe"}
              </span>
              <span className="cta-submit-arrow">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 10H16M16 10L11 5M16 10L11 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </form>

          {/* Success Message */}
          {isSubmitted && (
            <div className="cta-success-message">
              <svg className="cta-success-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Welcome to our community! Check your inbox.</span>
            </div>
          )}

          {/* CTA Actions */}
          <div className="cta-actions">
            <div className="cta-primary-action">
              <AestheticButton href="/contact" className="cta-aesthetic-btn">
                Start Your Project
              </AestheticButton>
            </div>
            <div className="cta-secondary-action">
              <ReadMoreButton
                href="/projects"
                text="View Our Work"
                size="default"
                className="cta-readmore-btn"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
