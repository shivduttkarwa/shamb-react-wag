import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassRainButton from "../UI/GlassRainButton";
import "./ModernContact.css";

gsap.registerPlugin(ScrollTrigger);

const ModernContact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section parallax
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelector(".modern-contact-hero-bg"),
          { scale: 1.2, y: 0 },
          {
            scale: 1,
            y: -100,
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          }
        );

        // Hero text animation
        const heroElements = heroRef.current.querySelectorAll(
          ".modern-contact-hero-title, .modern-contact-hero-subtitle, .modern-contact-hero-desc"
        );
        gsap.fromTo(
          heroElements,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.5,
          }
        );
      }

      // Form animations
      if (formRef.current) {
        const formFields = formRef.current.querySelectorAll(".form-field, .form-button");
        gsap.fromTo(
          formFields,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Info cards animation
      if (infoRef.current) {
        const infoCards = infoRef.current.querySelectorAll(".info-card");
        gsap.fromTo(
          infoCards,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: infoRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="modern-contact-container" ref={containerRef}>
      {/* Hero Section */}
      <section className="modern-contact-hero" ref={heroRef}>
        <div
          className="modern-contact-hero-bg"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&auto=format)`,
          }}
        />
        <div className="modern-contact-hero-overlay" />
        <div className="modern-contact-hero-content">
          <h1 className="modern-contact-hero-title">Let's Create Something Beautiful</h1>
          <p className="modern-contact-hero-subtitle">Architecture • Design • Innovation</p>
          <p className="modern-contact-hero-desc">
            Transform your vision into reality with our expert architectural services.
            Every great project begins with a conversation.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Grid */}
      <section className="modern-contact-main">
        <div className="modern-contact-grid">
          {/* Left - Contact Form */}
          <div className="modern-contact-form-section">
            <div className="section-header">
              <h2>Start Your Project</h2>
              <p>Tell us about your vision and we'll bring it to life</p>
            </div>
            
            <form className="modern-contact-form" ref={formRef}>
              <div className="form-row">
                <div className="form-field">
                  <label>Name *</label>
                  <input type="text" placeholder="Your full name" required />
                </div>
                <div className="form-field">
                  <label>Email *</label>
                  <input type="email" placeholder="your@email.com" required />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-field">
                  <label>Phone</label>
                  <input type="tel" placeholder="+61 xxx xxx xxx" />
                </div>
                <div className="form-field">
                  <label>Project Type</label>
                  <select defaultValue="">
                    <option value="" disabled>Select project type</option>
                    <option value="residential-new">New Residential</option>
                    <option value="residential-renovation">Renovation & Extension</option>
                    <option value="commercial">Commercial</option>
                    <option value="hospitality">Hospitality</option>
                    <option value="multi-residential">Multi-Residential</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="form-field">
                <label>Budget Range</label>
                <select defaultValue="">
                  <option value="" disabled>Select budget range</option>
                  <option value="under-500k">Under $500K</option>
                  <option value="500k-1m">$500K - $1M</option>
                  <option value="1m-2m">$1M - $2M</option>
                  <option value="2m-5m">$2M - $5M</option>
                  <option value="over-5m">Over $5M</option>
                  <option value="discuss">Let's discuss</option>
                </select>
              </div>
              
              <div className="form-field">
                <label>Project Timeline</label>
                <select defaultValue="">
                  <option value="" disabled>When do you want to start?</option>
                  <option value="immediately">Immediately</option>
                  <option value="1-3-months">1-3 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="6-12-months">6-12 months</option>
                  <option value="planning">Just planning</option>
                </select>
              </div>
              
              <div className="form-field">
                <label>Project Description *</label>
                <textarea 
                  placeholder="Tell us about your project vision, site location, specific requirements, and any inspiration you have in mind..."
                  rows={5}
                  required
                />
              </div>
              
              <div className="form-button">
                <GlassRainButton href="#">Send Project Brief</GlassRainButton>
              </div>
            </form>
          </div>

          {/* Right - Contact Info & Images */}
          <div className="modern-contact-info-section" ref={infoRef}>
            <div className="info-card contact-details">
              <div className="info-card-image">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&auto=format" 
                  alt="Studio workspace" 
                />
              </div>
              <div className="info-card-content">
                <h3>Get In Touch</h3>
                <div className="contact-item">
                  <span className="contact-label">Studio</span>
                  <a href="tel:+61312345678" className="contact-value">+61 3 1234 5678</a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Email</span>
                  <a href="mailto:studio@forma.archi" className="contact-value">studio@forma.archi</a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Hours</span>
                  <span className="contact-value">Mon-Fri, 9AM-6PM AEST</span>
                </div>
              </div>
            </div>

            <div className="info-card office-location">
              <div className="info-card-image">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&auto=format" 
                  alt="Melbourne office building" 
                />
              </div>
              <div className="info-card-content">
                <h3>Visit Our Studio</h3>
                <div className="contact-item">
                  <span className="contact-label">Address</span>
                  <span className="contact-value">
                    Level 3, 150 Gertrude Street<br />
                    Fitzroy, VIC 3065<br />
                    Australia
                  </span>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Public Transport</span>
                  <span className="contact-value">5 mins walk from Parliament Station</span>
                </div>
              </div>
            </div>

            <div className="info-card process-info">
              <div className="info-card-image">
                <img 
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop&auto=format" 
                  alt="Design process" 
                />
              </div>
              <div className="info-card-content">
                <h3>What Happens Next?</h3>
                <div className="process-steps">
                  <div className="process-step">
                    <span className="step-number">01</span>
                    <span className="step-text">We review your brief within 24 hours</span>
                  </div>
                  <div className="process-step">
                    <span className="step-number">02</span>
                    <span className="step-text">Schedule a discovery call or meeting</span>
                  </div>
                  <div className="process-step">
                    <span className="step-number">03</span>
                    <span className="step-text">Present a tailored project proposal</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="info-card social-proof">
              <div className="info-card-content full-content">
                <h3>Join Our Community</h3>
                <p>Follow our journey and get inspired by our latest projects</p>
                <div className="social-links">
                  <a href="#" className="social-link">
                    <span>Instagram</span>
                    <span className="arrow">→</span>
                  </a>
                  <a href="#" className="social-link">
                    <span>LinkedIn</span>
                    <span className="arrow">→</span>
                  </a>
                  <a href="#" className="social-link">
                    <span>Architecture Awards</span>
                    <span className="arrow">→</span>
                  </a>
                </div>
                <div className="awards">
                  <span className="award-item">AIA Victoria Awards 2023</span>
                  <span className="award-item">Australian Architecture Awards 2022</span>
                  <span className="award-item">Houses Awards 2021</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="modern-contact-cta">
        <div className="cta-content">
          <h2>Ready to Start Your Architectural Journey?</h2>
          <p>Every extraordinary building begins with a simple conversation.</p>
          <div className="cta-buttons">
            <GlassRainButton href="/projects">View Our Work</GlassRainButton>
            <GlassRainButton href="/services">Our Services</GlassRainButton>
          </div>
        </div>
        <div className="cta-background">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=600&fit=crop&auto=format" 
            alt="Modern architecture" 
          />
        </div>
      </section>
    </div>
  );
};

export default ModernContact;