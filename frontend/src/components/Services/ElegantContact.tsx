import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassRainButton from "../UI/GlassRainButton";

gsap.registerPlugin(ScrollTrigger);

const ElegantContact: React.FC<{ className?: string }> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Elegant architectural contact slides
  const contactSlides = [
    {
      leftBg: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&auto=format",
      rightBg: "#f8f9fa",
      leftContent: {
        title: "Let's Create\nSomething Extraordinary",
        subtitle: "Architecture • Design • Innovation",
        description: "Every remarkable project begins with a conversation. Share your vision with us and discover how we can transform your space into something truly exceptional.",
      },
      rightContent: {
        title: "Get in Touch",
        contactInfo: [
          { label: "Studio", value: "+61 3 1234 5678", link: "tel:+61312345678" },
          { label: "Email", value: "studio@forma.archi", link: "mailto:studio@forma.archi" },
          { label: "Hours", value: "Monday - Friday\n9AM - 6PM AEST" }
        ]
      }
    },
    {
      leftBg: "#2d3748",
      rightBg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&auto=format",
      leftContent: {
        title: "Visit Our Studio",
        subtitle: "Melbourne • Fitzroy",
        description: "Experience our design philosophy firsthand in our thoughtfully crafted studio space in Melbourne's creative heart.",
        contactInfo: [
          { label: "Address", value: "Level 3, 150 Gertrude Street\nFitzroy, VIC 3065\nAustralia" },
          { label: "Transport", value: "5 minutes walk from\nParliament Station" }
        ]
      },
      rightContent: {
        title: "Design Philosophy",
        quote: "Architecture is a visual art, and the buildings speak for themselves.",
        author: "Julia Morgan"
      }
    },
    {
      leftBg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop&auto=format",
      rightBg: "#f8f9fa",
      leftContent: {
        title: "Our Services",
        subtitle: "Comprehensive Architectural Solutions",
        description: "From initial concept to final construction, we provide complete architectural services tailored to your unique vision."
      },
      rightContent: {
        title: "What We Offer",
        services: [
          {
            name: "Residential New Build",
            description: "Custom homes designed for modern living"
          },
          {
            name: "Renovation & Extension",
            description: "Breathing new life into existing spaces"
          },
          {
            name: "Commercial Architecture",
            description: "Innovative spaces for business success"
          },
          {
            name: "Interior Design",
            description: "Creating beautiful, functional interiors"
          }
        ]
      }
    },
    {
      leftBg: "#1a202c",
      rightBg: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop&auto=format",
      leftContent: {
        title: "Start Your Project",
        subtitle: "Tell Us About Your Vision",
        description: "Ready to begin your architectural journey? Share your project details with us and we'll create a tailored approach that brings your vision to life."
      },
      rightContent: {
        title: "Project Consultation",
        showForm: true
      }
    },
    {
      leftBg: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&h=1080&fit=crop&auto=format",
      rightBg: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1920&h=1080&fit=crop&auto=format",
      leftContent: {
        title: "Ready to Begin?",
        subtitle: "Your Dream Space Awaits",
        description: "Let's transform your vision into reality with our expert architectural guidance."
      },
      rightContent: {
        title: "Take the Next Step",
        showButton: true
      }
    }
  ];

  // Mobile slides
  const mobileSlides = [
    {
      title: "Let's Create Together",
      subtitle: "Premium Architectural Design",
      description: "Transform your space with our award-winning architectural expertise. Every project is a unique journey of creative collaboration.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&auto=format"
    },
    {
      title: "Share Your Vision", 
      subtitle: "Project Consultation",
      description: "Whether it's a new build, renovation, or commercial project - we're here to listen, understand, and bring your architectural dreams to life.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&auto=format"
    },
    {
      title: "Our Process",
      subtitle: "From Concept to Reality", 
      description: "We guide you through every step with clear communication, expert craftsmanship, and meticulous attention to detail.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&auto=format"
    },
    {
      title: "Let's Connect",
      subtitle: "Begin Your Journey",
      description: "Ready to start your project? Contact us today for a consultation and discover how we can create something extraordinary together.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&auto=format"
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.matchMedia("(max-width: 900px)").matches;

    // Desktop slide animation
    const animateSlide = (index: number) => {
      const slide = container.querySelector(`.elegant-slide-${index + 1}`) as HTMLDivElement | null;
      if (!slide) return;

      // Animate text elements
      const textElements = slide.querySelectorAll('.elegant-text-element');
      gsap.fromTo(textElements,
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.15,
          ease: "power3.out" 
        }
      );

      // Animate service items
      const serviceItems = slide.querySelectorAll('.elegant-service-item');
      if (serviceItems.length > 0) {
        gsap.fromTo(serviceItems,
          { opacity: 0, x: 30 },
          { 
            opacity: 1, 
            x: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.3
          }
        );
      }

      // Animate form fields
      const formFields = slide.querySelectorAll('.elegant-form-field');
      if (formFields.length > 0) {
        gsap.fromTo(formFields,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            delay: 0.4
          }
        );
      }

      // Background parallax effect
      const leftBg = slide.querySelector('.elegant-left-bg') as HTMLElement;
      const rightBg = slide.querySelector('.elegant-right-bg') as HTMLElement;
      
      if (leftBg) {
        gsap.fromTo(leftBg,
          { scale: 1.1, opacity: 0.8 },
          { 
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out"
          }
        );
      }

      if (rightBg) {
        gsap.fromTo(rightBg,
          { scale: 1.1, opacity: 0.8 },
          { 
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out"
          }
        );
      }
    };

    const animateMobileSlide = (index: number) => {
      const mobileEl = container.querySelector('.elegant-mobile') as HTMLDivElement | null;
      if (!mobileEl) return;
      
      const slide = mobileEl.querySelectorAll('.elegant-mobile-slide')[index] as HTMLDivElement;
      if (!slide) return;

      const elements = slide.querySelectorAll('.mobile-elegant-element');
      gsap.fromTo(elements,
        { opacity: 0, y: 50, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out"
        }
      );
    };

    if (isMobile) {
      // Mobile implementation
      const mobileEl = container.querySelector('.elegant-mobile') as HTMLDivElement | null;
      const inner = mobileEl?.querySelector('.elegant-mobile-inner') as HTMLDivElement | null;
      const slides = mobileEl?.querySelectorAll('.elegant-mobile-slide') as NodeListOf<HTMLDivElement> | null;

      if (!mobileEl || !inner || !slides || slides.length === 0) return;

      const total = slides.length;
      gsap.set(inner, { yPercent: 0 });

      const tl = gsap.to(inner, {
        yPercent: -100 * (total - 1),
        ease: "none",
        paused: true,
      });

      let currentMobile = 0;
      animateMobileSlide(0);

      const st = ScrollTrigger.create({
        trigger: mobileEl,
        start: "top top",
        end: () => "+=" + window.innerHeight * (total - 1),
        pin: true,
        scrub: 0.8,
        snap: {
          snapTo: (value) => {
            const index = Math.round(value * (total - 1));
            return index / (total - 1);
          },
          duration: 0.4,
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          tl.progress(self.progress);
          const raw = self.progress * (total - 1);
          const index = Math.round(raw);
          if (index !== currentMobile) {
            currentMobile = index;
            animateMobileSlide(currentMobile);
          }
        },
      });

      return () => {
        st.kill();
        tl.kill();
      };
    }

    // Desktop implementation
    const slideElements = Array.from(
      container.querySelectorAll<HTMLDivElement>(".elegant-slide")
    );

    let current = 0;
    const animTime = 1200;
    let isAnimating = false;

    const setClasses = () => {
      slideElements.forEach((slide, index) => {
        slide.classList.remove("elegant-active", "elegant-inactive");
        if (index === current) {
          slide.classList.add("elegant-active");
        } else if (index < current) {
          slide.classList.add("elegant-inactive");
        }
      });
    };

    const paginate = () => {
      isAnimating = true;
      setClasses();
      animateSlide(current);
      window.setTimeout(() => {
        isAnimating = false;
      }, animTime);
    };

    const navigateDown = () => {
      if (isAnimating || current === slideElements.length - 1) return;
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
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
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
      const atLast = current === slideElements.length - 1;

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
      const atLast = current === slideElements.length - 1;

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
    animateSlide(0);

    return () => {
      container.removeEventListener("wheel", wheelHandler);
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);

  const isImage = (bg: string) => bg.startsWith('http');

  return (
    <div ref={containerRef} className={`elegant-container ${className}`}>
      <style>{`
        .elegant-container {
          position: relative;
          width: 100%;
          background: #ffffff;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
          overflow: hidden;
        }

        /* DESKTOP ELEGANT SLIDES */
        .elegant-slides {
          position: relative;
          height: 100vh;
          width: 100%;
        }

        .elegant-slide {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100vh;
        }

        .elegant-half {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100vh;
          transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          overflow: hidden;
        }

        .elegant-half--left {
          left: 0;
          transform: translate3d(-32.4vh, 100%, 0);
        }

        .elegant-half--right {
          left: 50%;
          transform: translate3d(32.4vh, -100%, 0);
        }

        .elegant-slide.elegant-active .elegant-half {
          transform: translate3d(0, 0, 0);
        }

        .elegant-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transform: skewX(-18deg);
          transform-origin: center;
        }

        .elegant-half--left .elegant-background {
          transform: skewX(18deg);
        }

        .elegant-half--right .elegant-background {
          transform: skewX(-18deg);
        }

        .elegant-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          transform: skewX(-18deg);
        }

        .elegant-half--left .elegant-overlay {
          transform: skewX(18deg);
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1));
        }

        .elegant-half--right .elegant-overlay {
          transform: skewX(-18deg);
          background: rgba(255, 255, 255, 0.95);
        }

        .elegant-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 60px;
          transform: skewX(-18deg);
          color: #ffffff;
        }

        .elegant-half--left .elegant-content {
          transform: skewX(18deg);
          color: #ffffff;
        }

        .elegant-half--right .elegant-content {
          transform: skewX(-18deg);
          color: #2d3748;
        }

        .elegant-title {
          font-size: clamp(48px, 6vw, 72px);
          font-weight: 300;
          line-height: 1.1;
          margin-bottom: 20px;
          font-family: "Dream Avenue", cursive;
          text-transform: uppercase;
          white-space: pre-line;
          letter-spacing: 0.02em;
        }

        .elegant-subtitle {
          font-size: 18px;
          margin-bottom: 30px;
          opacity: 0.9;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: inherit;
        }

        .elegant-description {
          font-size: 18px;
          line-height: 1.7;
          margin-bottom: 40px;
          max-width: 500px;
          opacity: 0.95;
          white-space: pre-line;
        }

        .elegant-quote {
          font-size: 24px;
          line-height: 1.5;
          font-style: italic;
          margin-bottom: 20px;
          max-width: 400px;
          font-family: "Dream Avenue", cursive;
        }

        .elegant-author {
          font-size: 16px;
          opacity: 0.8;
          font-weight: 500;
        }

        /* Contact Info */
        .elegant-contact-list {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .elegant-contact-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .elegant-contact-label {
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.7;
          font-weight: 600;
        }

        .elegant-contact-value {
          font-size: 18px;
          line-height: 1.5;
          white-space: pre-line;
          text-decoration: none;
          color: inherit;
          transition: opacity 0.3s ease;
        }

        .elegant-contact-value:hover {
          opacity: 0.8;
        }

        /* Services */
        .elegant-services-list {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .elegant-service-item {
          padding: 30px 0;
          border-bottom: 1px solid rgba(45, 55, 72, 0.1);
        }

        .elegant-service-item:last-child {
          border-bottom: none;
        }

        .elegant-service-name {
          font-size: 22px;
          font-weight: 500;
          margin-bottom: 8px;
          color: #2d3748;
          font-family: "Dream Avenue", cursive;
        }

        .elegant-service-description {
          font-size: 16px;
          color: #718096;
          line-height: 1.6;
        }

        /* Form */
        .elegant-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
          max-width: 450px;
        }

        .elegant-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .elegant-form-field {
          display: flex;
          flex-direction: column;
        }

        .elegant-form-input,
        .elegant-form-select,
        .elegant-form-textarea {
          padding: 18px 20px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-size: 16px;
          border-radius: 8px;
          outline: none;
          transition: all 0.3s ease;
          font-family: inherit;
          backdrop-filter: blur(10px);
        }

        .elegant-half--right .elegant-form-input,
        .elegant-half--right .elegant-form-select,
        .elegant-half--right .elegant-form-textarea {
          border-color: rgba(45, 55, 72, 0.2);
          background: rgba(255, 255, 255, 0.8);
          color: #2d3748;
        }

        .elegant-form-input:focus,
        .elegant-form-select:focus,
        .elegant-form-textarea:focus {
          border-color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .elegant-half--right .elegant-form-input:focus,
        .elegant-half--right .elegant-form-select:focus,
        .elegant-half--right .elegant-form-textarea:focus {
          border-color: #667eea;
          background: rgba(255, 255, 255, 0.95);
        }

        .elegant-form-input::placeholder,
        .elegant-form-textarea::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .elegant-half--right .elegant-form-input::placeholder,
        .elegant-half--right .elegant-form-textarea::placeholder {
          color: rgba(45, 55, 72, 0.6);
        }

        .elegant-form-textarea {
          min-height: 120px;
          resize: vertical;
          line-height: 1.6;
        }

        .elegant-button-container {
          display: flex;
          justify-content: flex-start;
          margin-top: 20px;
        }

        /* MOBILE */
        .elegant-mobile {
          display: none;
        }

        .elegant-mobile-inner {
          position: relative;
          width: 100%;
        }

        .elegant-mobile-slide {
          min-height: 100vh;
          padding: 60px 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #ffffff;
          position: relative;
        }

        .elegant-mobile-slide:nth-child(even) {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .mobile-image-container {
          width: 100%;
          height: 250px;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 40px;
          position: relative;
        }

        .mobile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .mobile-content {
          text-align: center;
        }

        .mobile-title {
          font-size: 32px;
          font-weight: 300;
          margin-bottom: 12px;
          color: #2d3748;
          font-family: "Dream Avenue", cursive;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .mobile-subtitle {
          font-size: 16px;
          color: #667eea;
          margin-bottom: 25px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 500;
        }

        .mobile-description {
          font-size: 18px;
          line-height: 1.7;
          color: #4a5568;
          max-width: 500px;
          margin: 0 auto;
        }

        /* Mobile Form */
        .elegant-mobile-form {
          padding: 50px 30px;
          background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
          color: #ffffff;
        }

        .mobile-form-title {
          font-size: 28px;
          text-align: center;
          margin-bottom: 40px;
          font-family: "Dream Avenue", cursive;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .mobile-form-grid {
          display: grid;
          gap: 25px;
          margin-bottom: 35px;
        }

        .mobile-form-field {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .mobile-form-label {
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          opacity: 0.9;
        }

        .mobile-form-input,
        .mobile-form-select,
        .mobile-form-textarea {
          padding: 18px 20px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: #ffffff;
          font-size: 16px;
          outline: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .mobile-form-input:focus,
        .mobile-form-select:focus,
        .mobile-form-textarea:focus {
          border-color: rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.15);
        }

        .mobile-form-textarea {
          min-height: 120px;
          resize: vertical;
        }

        .mobile-form-submit {
          width: 100%;
          padding: 20px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border: none;
          border-radius: 8px;
          color: #ffffff;
          font-size: 18px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mobile-form-submit:hover {
          background: linear-gradient(135deg, #5a6fd8, #6b4391);
          transform: translateY(-2px);
        }

        /* Responsive */
        @media (min-width: 901px) {
          .elegant-container {
            height: 100vh;
            overflow: hidden;
          }
        }

        @media (max-width: 900px) {
          .elegant-container {
            height: auto;
            overflow: visible;
          }

          .elegant-slides {
            display: none;
          }

          .elegant-mobile {
            display: block;
            position: relative;
            height: 100vh;
            overflow: hidden;
          }

          .elegant-form-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .elegant-content {
            padding: 60px 40px;
          }
          
          .mobile-image-container {
            height: 200px;
          }
        }
      `}</style>

      {/* DESKTOP: Elegant Contact Slides */}
      <div className="elegant-slides">
        {contactSlides.map((slide, index) => (
          <div
            key={index}
            className={`elegant-slide elegant-slide-${index + 1} ${
              index === 0 ? "elegant-active" : ""
            }`}
          >
            {/* LEFT HALF */}
            <div className="elegant-half elegant-half--left">
              {isImage(slide.leftBg) ? (
                <div 
                  className="elegant-background elegant-left-bg"
                  style={{ backgroundImage: `url(${slide.leftBg})` }}
                />
              ) : (
                <div 
                  className="elegant-background elegant-left-bg"
                  style={{ backgroundColor: slide.leftBg }}
                />
              )}
              <div className="elegant-overlay" />
              <div className="elegant-content">
                <h1 className="elegant-title elegant-text-element">{slide.leftContent.title}</h1>
                <p className="elegant-subtitle elegant-text-element">{slide.leftContent.subtitle}</p>
                <p className="elegant-description elegant-text-element">{slide.leftContent.description}</p>
                
                {slide.leftContent.contactInfo && (
                  <div className="elegant-contact-list elegant-text-element">
                    {slide.leftContent.contactInfo.map((item, idx) => (
                      <div key={idx} className="elegant-contact-item">
                        <span className="elegant-contact-label">{item.label}</span>
                        {item.link ? (
                          <a href={item.link} className="elegant-contact-value">
                            {item.value}
                          </a>
                        ) : (
                          <span className="elegant-contact-value">{item.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT HALF */}
            <div className="elegant-half elegant-half--right">
              {isImage(slide.rightBg) ? (
                <div 
                  className="elegant-background elegant-right-bg"
                  style={{ backgroundImage: `url(${slide.rightBg})` }}
                />
              ) : (
                <div 
                  className="elegant-background elegant-right-bg"
                  style={{ backgroundColor: slide.rightBg }}
                />
              )}
              <div className="elegant-overlay" />
              <div className="elegant-content">
                <h2 className="elegant-title elegant-text-element">{slide.rightContent.title}</h2>
                
                {slide.rightContent.contactInfo && (
                  <div className="elegant-contact-list elegant-text-element">
                    {slide.rightContent.contactInfo.map((item, idx) => (
                      <div key={idx} className="elegant-contact-item">
                        <span className="elegant-contact-label">{item.label}</span>
                        {item.link ? (
                          <a href={item.link} className="elegant-contact-value">
                            {item.value}
                          </a>
                        ) : (
                          <span className="elegant-contact-value">{item.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {slide.rightContent.quote && (
                  <div className="elegant-text-element">
                    <p className="elegant-quote">{slide.rightContent.quote}</p>
                    <p className="elegant-author">— {slide.rightContent.author}</p>
                  </div>
                )}

                {slide.rightContent.services && (
                  <div className="elegant-services-list elegant-text-element">
                    {slide.rightContent.services.map((service, idx) => (
                      <div key={idx} className="elegant-service-item">
                        <h3 className="elegant-service-name">{service.name}</h3>
                        <p className="elegant-service-description">{service.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {slide.rightContent.showForm && (
                  <div className="elegant-form elegant-text-element">
                    <div className="elegant-form-row">
                      <div className="elegant-form-field">
                        <input 
                          className="elegant-form-input" 
                          type="text" 
                          placeholder="Your Name" 
                          required 
                        />
                      </div>
                      <div className="elegant-form-field">
                        <input 
                          className="elegant-form-input" 
                          type="email" 
                          placeholder="Email Address" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="elegant-form-field">
                      <input 
                        className="elegant-form-input" 
                        type="tel" 
                        placeholder="Phone Number" 
                      />
                    </div>
                    
                    <div className="elegant-form-row">
                      <div className="elegant-form-field">
                        <select className="elegant-form-select" defaultValue="" required>
                          <option value="" disabled>Project Type</option>
                          <option>Residential New Build</option>
                          <option>Renovation & Extension</option>
                          <option>Commercial Architecture</option>
                          <option>Interior Design</option>
                        </select>
                      </div>
                      <div className="elegant-form-field">
                        <select className="elegant-form-select" defaultValue="">
                          <option value="" disabled>Budget Range</option>
                          <option>Under $500K</option>
                          <option>$500K - $1M</option>
                          <option>$1M - $2M</option>
                          <option>Over $2M</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="elegant-form-field">
                      <textarea 
                        className="elegant-form-textarea" 
                        placeholder="Tell us about your project vision, site location, and specific requirements..."
                        required
                      />
                    </div>
                    
                    <div className="elegant-button-container">
                      <GlassRainButton href="#">Send Project Brief</GlassRainButton>
                    </div>
                  </div>
                )}

                {slide.rightContent.showButton && (
                  <div className="elegant-button-container elegant-text-element">
                    <GlassRainButton href="/projects">View Our Work</GlassRainButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE: Elegant Contact */}
      <div className="elegant-mobile">
        <div className="elegant-mobile-inner">
          {mobileSlides.map((slide, index) => (
            <div key={index} className="elegant-mobile-slide">
              <div className="mobile-image-container mobile-elegant-element">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="mobile-image"
                />
              </div>
              
              <div className="mobile-content">
                <h2 className="mobile-title mobile-elegant-element">{slide.title}</h2>
                <p className="mobile-subtitle mobile-elegant-element">{slide.subtitle}</p>
                <p className="mobile-description mobile-elegant-element">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE: Contact Form */}
      <div className="elegant-mobile-form">
        <h2 className="mobile-form-title">Start Your Project</h2>
        <div className="mobile-form-grid">
          <div className="mobile-form-field">
            <label className="mobile-form-label">Name</label>
            <input className="mobile-form-input" type="text" placeholder="Your full name" required />
          </div>
          <div className="mobile-form-field">
            <label className="mobile-form-label">Email</label>
            <input className="mobile-form-input" type="email" placeholder="your@email.com" required />
          </div>
          <div className="mobile-form-field">
            <label className="mobile-form-label">Phone</label>
            <input className="mobile-form-input" type="tel" placeholder="+61 xxx xxx xxx" />
          </div>
          <div className="mobile-form-field">
            <label className="mobile-form-label">Project Type</label>
            <select className="mobile-form-select" defaultValue="" required>
              <option value="" disabled>Select project type</option>
              <option>Residential New Build</option>
              <option>Renovation & Extension</option>
              <option>Commercial Architecture</option>
              <option>Interior Design</option>
            </select>
          </div>
          <div className="mobile-form-field">
            <label className="mobile-form-label">Budget Range</label>
            <select className="mobile-form-select" defaultValue="">
              <option value="" disabled>Select budget range</option>
              <option>Under $500K</option>
              <option>$500K - $1M</option>
              <option>$1M - $2M</option>
              <option>Over $2M</option>
            </select>
          </div>
          <div className="mobile-form-field">
            <label className="mobile-form-label">Project Description</label>
            <textarea 
              className="mobile-form-textarea" 
              placeholder="Tell us about your project vision, site location, and requirements..."
              required
            />
          </div>
        </div>
        <button className="mobile-form-submit" type="button">
          Send Project Brief
        </button>
      </div>
    </div>
  );
};

export default ElegantContact;