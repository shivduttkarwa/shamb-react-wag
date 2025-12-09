import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassRainButton from "../UI/GlassRainButton";

gsap.registerPlugin(ScrollTrigger);

const BlueprintSlider: React.FC<{ className?: string }> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // BLUEPRINT SLIDES DATA - Each slide is a "technical drawing"
  const blueprintSlides = [
    {
      drawingTitle: "CONTACT.DWG",
      drawingVersion: "V1.2",
      leftContent: {
        title: "INITIATE_PROJECT()",
        subtitle: "// Start new architectural consultation",
        description: "Execute contact protocol to begin\ndigital architectural process.",
        annotations: ["PHASE: INITIAL_CONTACT", "STATUS: READY", "PRIORITY: HIGH"]
      },
      rightContent: {
        title: "CONTACT_ENDPOINTS",
        data: [
          { label: "PHONE_NUMBER", value: "+61.3.1234.5678" },
          { label: "EMAIL_ADDRESS", value: "studio@forma.archi" },
          { label: "WORK_HOURS", value: "MON-FRI 09:00-18:00 AEST" },
          { label: "RESPONSE_TIME", value: "< 24 HOURS" }
        ]
      },
      wireframeElements: ["grid", "phone-icon", "email-icon"]
    },
    {
      drawingTitle: "LOCATION.DWG", 
      drawingVersion: "V2.1",
      leftContent: {
        title: "STUDIO_COORDINATES",
        subtitle: "// Physical workspace location",
        description: "Access our design laboratory\nin Melbourne's creative district.",
        annotations: ["ZONE: FITZROY", "ACCESS: PUBLIC_TRANSPORT", "PARKING: AVAILABLE"]
      },
      rightContent: {
        title: "SPATIAL_DATA",
        data: [
          { label: "ADDRESS_LINE_1", value: "Level 3, 150 Gertrude Street" },
          { label: "ADDRESS_LINE_2", value: "Fitzroy, VIC 3065" },
          { label: "COORDINATES", value: "-37.7963°S, 144.9896°E" },
          { label: "TRANSPORT_NODE", value: "Parliament Station + 300m" }
        ]
      },
      wireframeElements: ["building-wireframe", "map-grid", "location-pin"]
    },
    {
      drawingTitle: "SERVICES.DWG",
      drawingVersion: "V3.0", 
      leftContent: {
        title: "ARCHITECTURAL_MODULES",
        subtitle: "// Available design services",
        description: "Select from our comprehensive\narchitectural service matrix.",
        annotations: ["SCALE: RESIDENTIAL-COMMERCIAL", "TYPE: FULL_SERVICE", "DELIVERY: TURNKEY"]
      },
      rightContent: {
        title: "SERVICE_ARRAY",
        services: [
          { code: "RES_NEW", name: "Residential.New_Build", scope: "GROUND_UP_CONSTRUCTION" },
          { code: "RES_RENO", name: "Renovation.Extension", scope: "EXISTING_STRUCTURE_MODIFY" },
          { code: "COM_ARCH", name: "Commercial.Architecture", scope: "BUSINESS_SPACE_DESIGN" },
          { code: "INT_DES", name: "Interior.Design", scope: "SPATIAL_EXPERIENCE_CRAFT" }
        ]
      },
      wireframeElements: ["blueprint-grid", "dimension-lines", "section-markers"]
    },
    {
      drawingTitle: "PROJECT_FORM.DWG",
      drawingVersion: "V4.5",
      leftContent: {
        title: "DATA_INPUT_INTERFACE",
        subtitle: "// Project specification form", 
        description: "Initialize new project record\nwith comprehensive parameters.",
        annotations: ["INPUT: REQUIRED_FIELDS", "VALIDATION: REAL_TIME", "ENCRYPTION: AES_256"]
      },
      rightContent: {
        title: "FORM_CONSTRUCTOR",
        showForm: true
      },
      wireframeElements: ["form-wireframe", "input-fields", "submit-button"]
    },
    {
      drawingTitle: "EXECUTE.DWG", 
      drawingVersion: "V5.0",
      leftContent: {
        title: "DEPLOYMENT_READY",
        subtitle: "// System ready for project launch",
        description: "All parameters configured.\nInitiate architectural process.",
        annotations: ["STATUS: OPERATIONAL", "RESOURCES: ALLOCATED", "TIMELINE: OPTIMIZED"]
      },
      rightContent: {
        title: "LAUNCH_SEQUENCE",
        data: [
          { label: "STEP_01", value: "Project Brief Analysis" },
          { label: "STEP_02", value: "Design Concept Development" },
          { label: "STEP_03", value: "Technical Documentation" },
          { label: "STEP_04", value: "Construction Administration" }
        ],
        showButton: true
      },
      wireframeElements: ["rocket-wireframe", "progress-bar", "launch-button"]
    }
  ];

  // MOBILE BLUEPRINT SLIDES
  const mobileBlueprintSlides = [
    {
      title: "SYSTEM_INITIALIZE",
      subtitle: "// Welcome to Forma Digital Studio",
      description: "Advanced architectural design platform\nready for new project input.",
      annotations: ["STATUS: ONLINE", "VERSION: 2024.1"]
    },
    {
      title: "PROJECT_PARAMETERS", 
      subtitle: "// Define your requirements",
      description: "Specify project type, scale, budget,\nand timeline for optimal processing.",
      annotations: ["INPUT: REQUIRED", "VALIDATION: ACTIVE"]
    },
    {
      title: "DESIGN_PROTOCOL",
      subtitle: "// Our systematic approach", 
      description: "Structured methodology ensures\ndelivery of exceptional results.",
      annotations: ["PROCESS: PROVEN", "QUALITY: GUARANTEED"]
    },
    {
      title: "CONTACT_EXECUTE",
      subtitle: "// Ready for deployment",
      description: "System configured and ready\nto process your project request.",
      annotations: ["STATUS: READY", "ACTION: SUBMIT"]
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.matchMedia("(max-width: 900px)").matches;

    // DESKTOP: Blueprint CAD Interface
    const animateBlueprintSlide = (index: number) => {
      const slide = container.querySelector(`.blueprint-slide-${index + 1}`) as HTMLDivElement | null;
      if (!slide) return;

      // Animate grid lines drawing
      const gridLines = slide.querySelectorAll('.blueprint-grid-line');
      gsap.fromTo(gridLines, 
        { scaleX: 0, scaleY: 0 },
        { 
          scaleX: 1, 
          scaleY: 1, 
          duration: 0.8, 
          stagger: 0.05,
          ease: "power2.out" 
        }
      );

      // Animate text appearing with typewriter effect
      const textElements = slide.querySelectorAll('.blueprint-text');
      textElements.forEach((el) => {
        const text = el.textContent || '';
        el.textContent = '';
        let i = 0;
        const typeWriter = () => {
          if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
          }
        };
        setTimeout(typeWriter, 300);
      });

      // Animate wireframe elements with stroke-dasharray
      const wireframes = slide.querySelectorAll('.wireframe-element');
      gsap.fromTo(wireframes,
        { strokeDashoffset: 100, opacity: 0 },
        { 
          strokeDashoffset: 0, 
          opacity: 1,
          duration: 1.2, 
          stagger: 0.2,
          ease: "power2.inOut" 
        }
      );

      // Glitch effect on title
      const title = slide.querySelector('.blueprint-title');
      if (title) {
        gsap.fromTo(title,
          { filter: 'hue-rotate(0deg)', opacity: 0.7 },
          { 
            filter: 'hue-rotate(360deg)', 
            opacity: 1,
            duration: 0.5,
            ease: "power2.out" 
          }
        );
      }
    };

    const animateMobileBlueprintSlide = (index: number) => {
      const mobileEl = container.querySelector('.blueprint-mobile') as HTMLDivElement | null;
      if (!mobileEl) return;
      
      const slide = mobileEl.querySelectorAll('.blueprint-mobile-slide')[index] as HTMLDivElement;
      if (!slide) return;

      const elements = slide.querySelectorAll('.mobile-blueprint-text');
      gsap.fromTo(elements,
        { opacity: 0, y: 30, filter: 'blur(5px)' },
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          duration: 0.8, 
          stagger: 0.1,
          ease: "power2.out" 
        }
      );
    };

    if (isMobile) {
      // MOBILE: Blueprint interface
      const mobileEl = container.querySelector('.blueprint-mobile') as HTMLDivElement | null;
      const inner = mobileEl?.querySelector('.blueprint-mobile-inner') as HTMLDivElement | null;
      const slides = mobileEl?.querySelectorAll('.blueprint-mobile-slide') as NodeListOf<HTMLDivElement> | null;

      if (!mobileEl || !inner || !slides || slides.length === 0) return;

      const total = slides.length;
      gsap.set(inner, { yPercent: 0 });

      const tl = gsap.to(inner, {
        yPercent: -100 * (total - 1),
        ease: "none",
        paused: true,
      });

      let currentMobile = 0;
      animateMobileBlueprintSlide(0);

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
          duration: 0.3,
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          tl.progress(self.progress);
          const raw = self.progress * (total - 1);
          const index = Math.round(raw);
          if (index !== currentMobile) {
            currentMobile = index;
            animateMobileBlueprintSlide(currentMobile);
          }
        },
      });

      return () => {
        st.kill();
        tl.kill();
      };
    }

    // DESKTOP: Blueprint slides navigation
    const slideElements = Array.from(
      container.querySelectorAll<HTMLDivElement>(".blueprint-slide")
    );

    let current = 0;
    const animTime = 1000;
    let isAnimating = false;

    const setClasses = () => {
      slideElements.forEach((slide, index) => {
        slide.classList.remove("blueprint-active", "blueprint-inactive");
        if (index === current) {
          slide.classList.add("blueprint-active");
        } else if (index < current) {
          slide.classList.add("blueprint-inactive");
        }
      });
    };

    const paginate = () => {
      isAnimating = true;
      setClasses();
      animateBlueprintSlide(current);
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
    animateBlueprintSlide(0);

    return () => {
      container.removeEventListener("wheel", wheelHandler);
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);

  return (
    <div ref={containerRef} className={`blueprint-container ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

        .blueprint-container {
          position: relative;
          width: 100%;
          background: #0a1020;
          font-family: "JetBrains Mono", "Space Mono", monospace;
          overflow: hidden;
        }

        .blueprint-container::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(90deg, transparent 98px, rgba(0, 255, 255, 0.03) 100px, transparent 102px),
            linear-gradient(180deg, transparent 98px, rgba(0, 255, 255, 0.03) 100px, transparent 102px);
          background-size: 100px 100px;
          pointer-events: none;
          z-index: 1;
        }

        /* DESKTOP BLUEPRINT SLIDES */
        .blueprint-slides {
          position: relative;
          height: 100vh;
          width: 100%;
        }

        .blueprint-slide {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100vh;
          z-index: 2;
        }

        .blueprint-half {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100vh;
          transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(0, 255, 255, 0.2);
          background: rgba(0, 20, 40, 0.8);
          backdrop-filter: blur(10px);
        }

        .blueprint-half--left {
          left: 0;
          transform: translate3d(-32.4vh, 100%, 0);
          border-right: 2px solid #00ffff;
        }

        .blueprint-half--right {
          left: 50%;
          transform: translate3d(32.4vh, -100%, 0);
          border-left: 2px solid #00ffff;
        }

        .blueprint-slide.blueprint-active .blueprint-half {
          transform: translate3d(0, 0, 0);
        }

        .blueprint-content {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 60px 40px;
          color: #00ffff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transform: skewX(-18deg);
          overflow: hidden;
        }

        .blueprint-half--left .blueprint-content {
          transform: skewX(18deg);
        }

        .blueprint-half--right .blueprint-content {
          transform: skewX(-18deg);
        }

        /* Drawing Title Bar */
        .blueprint-title-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background: rgba(0, 255, 255, 0.1);
          border: 1px solid #00ffff;
          margin-bottom: 30px;
          font-family: "Space Mono", monospace;
        }

        .blueprint-title {
          font-size: 14px;
          font-weight: 700;
          color: #00ffff;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .blueprint-version {
          font-size: 12px;
          color: rgba(0, 255, 255, 0.7);
        }

        /* Content Sections */
        .blueprint-section {
          margin-bottom: 40px;
        }

        .blueprint-section-title {
          font-size: 24px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 1px solid #00ffff;
          padding-bottom: 8px;
        }

        .blueprint-subtitle {
          font-size: 14px;
          color: #00ff88;
          margin-bottom: 15px;
          font-style: italic;
        }

        .blueprint-description {
          font-size: 16px;
          color: #e0e0e0;
          line-height: 1.6;
          white-space: pre-line;
          margin-bottom: 20px;
          font-family: "JetBrains Mono", monospace;
        }

        .blueprint-annotations {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .blueprint-annotation {
          font-size: 11px;
          color: #ffaa00;
          background: rgba(255, 170, 0, 0.1);
          padding: 4px 8px;
          border-left: 2px solid #ffaa00;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Data Display */
        .blueprint-data-grid {
          display: grid;
          gap: 15px;
        }

        .blueprint-data-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 15px;
          background: rgba(0, 255, 255, 0.05);
          border: 1px solid rgba(0, 255, 255, 0.2);
          font-family: "Space Mono", monospace;
        }

        .blueprint-data-label {
          font-size: 12px;
          color: #00ffff;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .blueprint-data-value {
          font-size: 14px;
          color: #ffffff;
          text-align: right;
          font-weight: 400;
        }

        /* Services Grid */
        .blueprint-services-grid {
          display: grid;
          gap: 15px;
        }

        .blueprint-service-item {
          padding: 15px;
          border: 1px solid rgba(0, 255, 255, 0.3);
          background: rgba(0, 255, 255, 0.05);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .blueprint-service-item:hover {
          background: rgba(0, 255, 255, 0.15);
          border-color: #00ffff;
          transform: translateY(-2px);
        }

        .blueprint-service-code {
          font-size: 12px;
          color: #ffaa00;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .blueprint-service-name {
          font-size: 16px;
          color: #ffffff;
          font-weight: 500;
          margin-bottom: 5px;
        }

        .blueprint-service-scope {
          font-size: 11px;
          color: #00ff88;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Form Styling */
        .blueprint-form {
          display: grid;
          gap: 20px;
        }

        .blueprint-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .blueprint-form-field {
          position: relative;
        }

        .blueprint-form-input,
        .blueprint-form-select,
        .blueprint-form-textarea {
          width: 100%;
          padding: 15px;
          background: rgba(0, 20, 40, 0.8);
          border: 1px solid rgba(0, 255, 255, 0.3);
          color: #ffffff;
          font-family: "JetBrains Mono", monospace;
          font-size: 14px;
          outline: none;
          transition: all 0.3s ease;
        }

        .blueprint-form-input:focus,
        .blueprint-form-select:focus,
        .blueprint-form-textarea:focus {
          border-color: #00ffff;
          background: rgba(0, 255, 255, 0.05);
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
        }

        .blueprint-form-input::placeholder,
        .blueprint-form-textarea::placeholder {
          color: rgba(0, 255, 255, 0.5);
          font-style: italic;
        }

        .blueprint-form-textarea {
          min-height: 100px;
          resize: vertical;
        }

        .blueprint-button-container {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        /* Grid Lines Animation */
        .blueprint-grid-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
        }

        .blueprint-grid-line {
          position: absolute;
          background: rgba(0, 255, 255, 0.1);
          transform-origin: left center;
        }

        .blueprint-grid-line.horizontal {
          width: 100%;
          height: 1px;
          transform-origin: left center;
        }

        .blueprint-grid-line.vertical {
          width: 1px;
          height: 100%;
          transform-origin: center top;
        }

        /* Wireframe Elements */
        .wireframe-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .wireframe-element {
          position: absolute;
          stroke: rgba(0, 255, 255, 0.3);
          stroke-width: 1;
          fill: none;
          stroke-dasharray: 20, 5;
          stroke-dashoffset: 100;
          opacity: 0;
        }

        /* MOBILE BLUEPRINT */
        .blueprint-mobile {
          display: none;
        }

        .blueprint-mobile-inner {
          position: relative;
          width: 100%;
        }

        .blueprint-mobile-slide {
          min-height: 100vh;
          padding: 80px 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: linear-gradient(135deg, #0a1020 0%, #0f1419 100%);
          position: relative;
          border-top: 2px solid rgba(0, 255, 255, 0.3);
        }

        .blueprint-mobile-slide::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(90deg, transparent 48px, rgba(0, 255, 255, 0.03) 50px, transparent 52px),
            linear-gradient(180deg, transparent 48px, rgba(0, 255, 255, 0.03) 50px, transparent 52px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        .mobile-blueprint-header {
          margin-bottom: 40px;
          padding: 20px;
          border: 1px solid rgba(0, 255, 255, 0.3);
          background: rgba(0, 255, 255, 0.05);
        }

        .mobile-blueprint-title {
          font-size: 28px;
          font-weight: 600;
          color: #00ffff;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .mobile-blueprint-subtitle {
          font-size: 14px;
          color: #00ff88;
          font-style: italic;
          margin-bottom: 15px;
        }

        .mobile-blueprint-description {
          font-size: 16px;
          color: #e0e0e0;
          line-height: 1.6;
          margin-bottom: 20px;
          white-space: pre-line;
        }

        .mobile-blueprint-annotations {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .mobile-blueprint-annotation {
          font-size: 10px;
          color: #ffaa00;
          background: rgba(255, 170, 0, 0.1);
          padding: 5px 10px;
          border: 1px solid #ffaa00;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Mobile Form */
        .blueprint-mobile-form {
          padding: 40px 30px;
          background: linear-gradient(135deg, #0a1020 0%, #0f1419 100%);
          border-top: 2px solid #00ffff;
        }

        .blueprint-mobile-form-title {
          font-size: 24px;
          color: #00ffff;
          text-align: center;
          margin-bottom: 30px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .blueprint-mobile-form-grid {
          display: grid;
          gap: 20px;
          margin-bottom: 30px;
        }

        .blueprint-mobile-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .blueprint-mobile-label {
          font-size: 12px;
          color: #00ffff;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }

        .blueprint-mobile-input,
        .blueprint-mobile-select,
        .blueprint-mobile-textarea {
          padding: 15px;
          background: rgba(0, 20, 40, 0.9);
          border: 1px solid rgba(0, 255, 255, 0.3);
          color: #ffffff;
          font-family: "JetBrains Mono", monospace;
          font-size: 14px;
          outline: none;
        }

        .blueprint-mobile-input:focus,
        .blueprint-mobile-select:focus,
        .blueprint-mobile-textarea:focus {
          border-color: #00ffff;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
        }

        .blueprint-mobile-textarea {
          min-height: 120px;
          resize: vertical;
        }

        .blueprint-mobile-submit {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, #00ffff, #0099cc);
          border: none;
          color: #0a1020;
          font-family: "Space Mono", monospace;
          font-size: 16px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .blueprint-mobile-submit:hover {
          background: linear-gradient(135deg, #00ccff, #0088bb);
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
        }

        /* Responsive */
        @media (min-width: 901px) {
          .blueprint-container {
            height: 100vh;
            overflow: hidden;
          }
        }

        @media (max-width: 900px) {
          .blueprint-container {
            height: auto;
            overflow: visible;
          }

          .blueprint-slides {
            display: none;
          }

          .blueprint-mobile {
            display: block;
            position: relative;
            height: 100vh;
            overflow: hidden;
          }

          .blueprint-form-row {
            grid-template-columns: 1fr;
          }
        }

        /* Glitch Effects */
        @keyframes glitch {
          0% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
          100% { transform: translateX(0); }
        }

        .blueprint-title:hover {
          animation: glitch 0.5s infinite;
        }

        /* Scan Line Effect */
        @keyframes scan {
          0% { top: -2px; }
          100% { top: 100%; }
        }

        .blueprint-container::after {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00ffff, transparent);
          animation: scan 3s infinite;
          pointer-events: none;
          z-index: 100;
        }
      `}</style>

      {/* DESKTOP: Blueprint CAD Interface */}
      <div className="blueprint-slides">
        {blueprintSlides.map((slide, index) => (
          <div
            key={index}
            className={`blueprint-slide blueprint-slide-${index + 1} ${
              index === 0 ? "blueprint-active" : ""
            }`}
          >
            {/* Grid Lines */}
            <div className="blueprint-grid-lines">
              {[...Array(20)].map((_, i) => (
                <React.Fragment key={i}>
                  <div 
                    className="blueprint-grid-line horizontal" 
                    style={{ top: `${(i + 1) * 5}%` }}
                  />
                  <div 
                    className="blueprint-grid-line vertical" 
                    style={{ left: `${(i + 1) * 5}%` }}
                  />
                </React.Fragment>
              ))}
            </div>

            {/* Wireframe Elements */}
            <div className="wireframe-elements">
              <svg width="100%" height="100%" viewBox="0 0 200 200">
                {slide.wireframeElements.includes('grid') && (
                  <>
                    <rect className="wireframe-element" x="50" y="50" width="100" height="100" />
                    <rect className="wireframe-element" x="75" y="75" width="50" height="50" />
                  </>
                )}
                {slide.wireframeElements.includes('phone-icon') && (
                  <>
                    <rect className="wireframe-element" x="80" y="80" width="40" height="60" />
                    <line className="wireframe-element" x1="90" y1="90" x2="110" y2="90" />
                    <line className="wireframe-element" x1="95" y1="130" x2="105" y2="130" />
                  </>
                )}
                {slide.wireframeElements.includes('building-wireframe') && (
                  <>
                    <rect className="wireframe-element" x="60" y="60" width="80" height="100" />
                    <line className="wireframe-element" x1="80" y1="80" x2="120" y2="80" />
                    <line className="wireframe-element" x1="80" y1="100" x2="120" y2="100" />
                    <line className="wireframe-element" x1="80" y1="120" x2="120" y2="120" />
                  </>
                )}
              </svg>
            </div>

            {/* LEFT HALF */}
            <div className="blueprint-half blueprint-half--left">
              <div className="blueprint-content">
                <div className="blueprint-title-bar">
                  <span className="blueprint-title">{slide.drawingTitle}</span>
                  <span className="blueprint-version">{slide.drawingVersion}</span>
                </div>
                
                <div className="blueprint-section">
                  <h2 className="blueprint-section-title blueprint-text">{slide.leftContent.title}</h2>
                  <p className="blueprint-subtitle blueprint-text">{slide.leftContent.subtitle}</p>
                  <p className="blueprint-description blueprint-text">{slide.leftContent.description}</p>
                  
                  <div className="blueprint-annotations">
                    {slide.leftContent.annotations.map((annotation, idx) => (
                      <div key={idx} className="blueprint-annotation">
                        {annotation}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT HALF */}
            <div className="blueprint-half blueprint-half--right">
              <div className="blueprint-content">
                <div className="blueprint-title-bar">
                  <span className="blueprint-title">DATA_INTERFACE</span>
                  <span className="blueprint-version">LIVE</span>
                </div>

                <div className="blueprint-section">
                  <h2 className="blueprint-section-title">{slide.rightContent.title}</h2>
                  
                  {slide.rightContent.data && (
                    <div className="blueprint-data-grid">
                      {slide.rightContent.data.map((item, idx) => (
                        <div key={idx} className="blueprint-data-item">
                          <span className="blueprint-data-label">{item.label}:</span>
                          <span className="blueprint-data-value">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {slide.rightContent.services && (
                    <div className="blueprint-services-grid">
                      {slide.rightContent.services.map((service, idx) => (
                        <div key={idx} className="blueprint-service-item">
                          <div className="blueprint-service-code">[{service.code}]</div>
                          <div className="blueprint-service-name">{service.name}</div>
                          <div className="blueprint-service-scope">{service.scope}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {slide.rightContent.showForm && (
                    <div className="blueprint-form">
                      <div className="blueprint-form-row">
                        <div className="blueprint-form-field">
                          <input 
                            className="blueprint-form-input" 
                            type="text" 
                            placeholder="FULL_NAME *" 
                            required 
                          />
                        </div>
                        <div className="blueprint-form-field">
                          <input 
                            className="blueprint-form-input" 
                            type="email" 
                            placeholder="EMAIL_ADDRESS *" 
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="blueprint-form-field">
                        <input 
                          className="blueprint-form-input" 
                          type="tel" 
                          placeholder="PHONE_NUMBER" 
                        />
                      </div>
                      
                      <div className="blueprint-form-row">
                        <div className="blueprint-form-field">
                          <select className="blueprint-form-select" defaultValue="" required>
                            <option value="" disabled>PROJECT_TYPE *</option>
                            <option>RESIDENTIAL_NEW_BUILD</option>
                            <option>RENOVATION_EXTENSION</option>
                            <option>COMMERCIAL_ARCHITECTURE</option>
                            <option>INTERIOR_DESIGN</option>
                          </select>
                        </div>
                        <div className="blueprint-form-field">
                          <select className="blueprint-form-select" defaultValue="">
                            <option value="" disabled>BUDGET_RANGE</option>
                            <option>UNDER_500K</option>
                            <option>500K_TO_1M</option>
                            <option>1M_TO_2M</option>
                            <option>OVER_2M</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="blueprint-form-field">
                        <textarea 
                          className="blueprint-form-textarea" 
                          placeholder="PROJECT_DESCRIPTION *&#10;&#10;Enter detailed specifications, site location, requirements, and project vision..."
                          required
                        />
                      </div>
                      
                      <div className="blueprint-button-container">
                        <GlassRainButton href="#">EXECUTE_SUBMIT()</GlassRainButton>
                      </div>
                    </div>
                  )}

                  {slide.rightContent.showButton && (
                    <div className="blueprint-button-container">
                      <GlassRainButton href="/projects">LAUNCH_PROJECT()</GlassRainButton>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE: Blueprint Interface */}
      <div className="blueprint-mobile">
        <div className="blueprint-mobile-inner">
          {mobileBlueprintSlides.map((slide, index) => (
            <div key={index} className="blueprint-mobile-slide">
              <div className="mobile-blueprint-header">
                <h2 className="mobile-blueprint-title mobile-blueprint-text">{slide.title}</h2>
                <p className="mobile-blueprint-subtitle mobile-blueprint-text">{slide.subtitle}</p>
                <p className="mobile-blueprint-description mobile-blueprint-text">{slide.description}</p>
                <div className="mobile-blueprint-annotations">
                  {slide.annotations.map((annotation, idx) => (
                    <span key={idx} className="mobile-blueprint-annotation">
                      {annotation}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE: Form Interface */}
      <div className="blueprint-mobile-form">
        <h2 className="blueprint-mobile-form-title">PROJECT_INPUT_FORM</h2>
        <div className="blueprint-mobile-form-grid">
          <div className="blueprint-mobile-field">
            <label className="blueprint-mobile-label">FULL_NAME *</label>
            <input className="blueprint-mobile-input" type="text" placeholder="Enter your full name" required />
          </div>
          <div className="blueprint-mobile-field">
            <label className="blueprint-mobile-label">EMAIL_ADDRESS *</label>
            <input className="blueprint-mobile-input" type="email" placeholder="your.email@domain.com" required />
          </div>
          <div className="blueprint-mobile-field">
            <label className="blueprint-mobile-label">PHONE_NUMBER</label>
            <input className="blueprint-mobile-input" type="tel" placeholder="+61 xxx xxx xxx" />
          </div>
          <div className="blueprint-mobile-field">
            <label className="blueprint-mobile-label">PROJECT_TYPE *</label>
            <select className="blueprint-mobile-select" defaultValue="" required>
              <option value="" disabled>Select project type</option>
              <option>RESIDENTIAL_NEW_BUILD</option>
              <option>RENOVATION_EXTENSION</option>
              <option>COMMERCIAL_ARCHITECTURE</option>
              <option>INTERIOR_DESIGN</option>
            </select>
          </div>
          <div className="blueprint-mobile-field">
            <label className="blueprint-mobile-label">BUDGET_RANGE</label>
            <select className="blueprint-mobile-select" defaultValue="">
              <option value="" disabled>Select budget range</option>
              <option>UNDER_500K</option>
              <option>500K_TO_1M</option>
              <option>1M_TO_2M</option>
              <option>OVER_2M</option>
            </select>
          </div>
          <div className="blueprint-mobile-field">
            <label className="blueprint-mobile-label">PROJECT_DESCRIPTION *</label>
            <textarea 
              className="blueprint-mobile-textarea" 
              placeholder="Describe your project vision, site location, specific requirements, and any additional details..."
              required
            />
          </div>
        </div>
        <button className="blueprint-mobile-submit" type="button">
          EXECUTE_SUBMISSION()
        </button>
      </div>
    </div>
  );
};

export default BlueprintSlider;