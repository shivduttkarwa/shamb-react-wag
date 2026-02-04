import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AestheticButton from "../UI/AestheticButton";
import "./ContactUsPage.css";

const ContactUsPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".contact-animate");

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
          },
        );
      });

      gsap.set(".cup-hero-reveal-line", { yPercent: 120, autoAlpha: 0 });
      gsap.set(".cup-hero-actions > *", {
        y: 80,
        autoAlpha: 0,
        scale: 0.6,
      });

      const heroTl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 1.6,
      });

      heroTl.to(".cup-hero-title .cup-hero-reveal-line", {
        yPercent: 0,
        autoAlpha: 1,
        duration: 1,
        skewY: 0,
      });
      heroTl.to(
        ".cup-hero-subtitle .cup-hero-reveal-line",
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.9,
        },
        "-=0.32",
      );
      heroTl.to(
        ".cup-hero-actions > *",
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power1.out",
        },
        "-=0.35",
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if all fields are filled
    if (
      !formData.name ||
      !formData.email ||
      !formData.message ||
      !selectedOption
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Validate email format
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    console.log("Contact form submitted", {
      ...formData,
      lookingFor: selectedOption,
    });

    // Show success message
    setShowSuccess(true);

    // Reset form
    setFormData({ name: "", email: "", message: "" });
    setSelectedOption("");

    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const options = [
    "New House Construction",
    "Home Renovation",
    "Kitchen & Bathroom Remodel",
    "Home Extension",
  ];

  const scrollToForm = () => {
    const formSection = document.getElementById("contact-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:hello@shambala.design";
  };

  return (
    <div className="cup-page">
      {/* HERO */}
      <section className="cup-hero">
        <div className="cup-hero-overlay" />
        <div className="cup-hero-content">
          <h1 className="cup-hero-title">
            <span className="cup-hero-reveal-line">Let's Connect</span>
          </h1>
          <p className="cup-hero-subtitle">
            <span className="cup-hero-reveal-line">
              New home, refined upgrade, or a commercial property that needs a
              quieter kind of drama— tell us where you are, and we'll help you
              plan what comes next.
            </span>
          </p>

          <div className="cup-hero-actions">
            <AestheticButton onClick={scrollToForm} className="cup-hero-cta">
              Start Your Project
            </AestheticButton>
            <AestheticButton onClick={handleEmailClick} className="cup-hero-cta">
              Email Our Team
            </AestheticButton>
          </div>
        </div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="cup-main" id="contact-form">
        <div className="cup-inner">
          <div className="cup-info-wrapper">
            {/* LEFT – FORM */}
            <div className="cup-form contact-animate">
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

            {/* RIGHT – CONTACT INFO (shambala) */}
            <div className="cup-info-column contact-animate">
              <h3 className="cup-info-title">Shambala Homes</h3>
              <ul className="cup-info-list">
                <li>
                  <strong>Projects:</strong>{" "}
                  <a href="mailto:hello@shambala.design">hello@shambala.design</a>
                </li>
                <li>
                  <strong>New enquiries:</strong>{" "}
                  <a href="mailto:hello@shambala.design">hello@shambala.design</a>
                </li>
                <li>
                  <strong>Response time:</strong> 24–48 hours
                </li>
                <li>
                  <strong>Phone:</strong>{" "}
                  <a href="tel:+61400000000">+61 (0) 400 000 000</a>
                </li>
                <li>
                  <strong>Visits:</strong> By appointment only, Melbourne /
                  Jaipur
                </li>
                <li>
                  <strong>Hours:</strong> Monday–Friday, 9am–6pm
                </li>
              </ul>

              <AestheticButton
                href="mailto:hello@shambala.design"
                className="cup-info-cta"
                text="Schedule a Call"
              />

              <div className="cup-arrow" aria-hidden="true">
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
        <div className="cup-parallax-content contact-animate">
          <div className="cup-parallax-top">
            <h2>Where considered spaces meet calm living.</h2>
          </div>

          <div className="cup-parallax-bottom">
            <p>
              From new builds to thoughtful renovations, we shape architecture
              that balances form, light, and everyday life—so your spaces feel
              timeless, not temporary.
            </p>
            <AestheticButton
              href="mailto:hello@shambala.design"
              className="cup-parallax-cta-btn"
              text="Book a Call"
            />
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

      {/* SUCCESS MESSAGE */}
      {showSuccess && (
        <>
          <div
            className="cup-success-overlay"
            onClick={() => setShowSuccess(false)}
          />
          <div className="cup-success-message">
            <h3>Thank You!</h3>
            <p>
              Your message has been sent successfully. We'll get back to you
              soon.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactUsPage;
