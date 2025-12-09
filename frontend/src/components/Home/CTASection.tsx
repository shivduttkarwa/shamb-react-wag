import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation - word by word reveal using FROM
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".cta-word");
        gsap.from(words, {
          yPercent: 100,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Description fade in
      if (descriptionRef.current) {
        gsap.from(descriptionRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Form animation - animate entire form wrapper
      if (formRef.current) {
        gsap.from(formRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
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
    // Handle form submission logic here
    console.log("Email submitted:", email);
    setIsSubmitted(true);

    // Animate success message
    gsap.from(".cta-success-message", {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
    });

    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <section className="cta-section" ref={sectionRef}>
      {/* Background decorative elements */}
      <div className="cta-bg-pattern"></div>
      <div className="cta-gradient-orb cta-gradient-orb-1"></div>
      <div className="cta-gradient-orb cta-gradient-orb-2"></div>

      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-title" ref={titleRef}>
            <span className="cta-word-wrapper">
              <span className="cta-word">On</span>
            </span>{" "}
            <span className="cta-word-wrapper">
              <span className="cta-word">the</span>
            </span>{" "}
            <span className="cta-word-wrapper">
              <em className="cta-word">Inside</em>
            </span>
          </h2>

          <div className="cta-form-wrapper">
            <p className="cta-description" ref={descriptionRef}>
              Receive exclusive insights, inspiration and studio updates.
            </p>

            <form
              className={`cta-form ${isFocused ? "cta-form-focused" : ""}`}
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <div className="cta-input-wrapper">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="EMAIL ADDRESS"
                  className="cta-email-input"
                  required
                  disabled={isSubmitted}
                />
                <div className="cta-input-line"></div>
              </div>
              <button
                type="submit"
                className="cta-submit-button"
                disabled={isSubmitted}
              >
                <span className="cta-submit-text">SUBMIT</span>
                <span className="cta-submit-icon">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M3 9H15M15 9L9 3M15 9L9 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </form>

            {isSubmitted && (
              <div className="cta-success-message">
                <svg
                  className="cta-success-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M16.6668 5L7.50016 14.1667L3.3335 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>You're in! Welcome to our inner circle.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
