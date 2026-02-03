import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./NewServicesHero.css";
import AestheticButton from "../UI/AestheticButton";

interface ServicePill {
  id: number;
  name: string;
}

interface FloatingCard {
  id: number;
  label: string;
  value: string;
  highlight: string;
  position: "left" | "right";
}

const NewServicesHero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const rootRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const titleLineRefs = useRef<HTMLSpanElement[]>([]);
  const changingWordRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const decoFrameRef = useRef<HTMLDivElement>(null);
  const verticalTextRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const servicePills: ServicePill[] = [
    { id: 1, name: "Residential Design" },
    { id: 2, name: "Interior Architecture" },
    { id: 3, name: "Space Planning" },
    { id: 4, name: "Consultation" },
  ];

  const floatingCards: FloatingCard[] = [
    {
      id: 1,
      label: "Our Focus",
      value: "Bespoke",
      highlight: "Design",
      position: "left",
    },
    {
      id: 2,
      label: "Approach",
      value: "Human",
      highlight: "Centered",
      position: "right",
    },
  ];

  const marqueeItems = [
    "Residential Design",
    "Interior Architecture",
    "Space Planning",
    "Project Consultation",
    "Sustainable Design",
    "3D Visualization",
  ];

  // Initial load animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Custom cursor animation
  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const animateCursor = () => {
      setCursorPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.1,
        y: prev.y + (mousePosition.y - prev.y) * 0.1,
      }));
      animationFrameId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const image = imageRef.current;
      if (image && scrolled < window.innerHeight) {
        image.style.transform = `scale(1) translateY(${scrolled * 0.08}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHoverEnter = () => setIsHovering(true);
  const handleHoverLeave = () => setIsHovering(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = titleLineRefs.current.filter(Boolean);
      const description = descriptionRef.current;
      const cta = ctaRef.current;
      const pills = pillsRef.current;
      const imageReveal = imageRevealRef.current;
      const heroImage = imageRef.current;
      const deco = decoFrameRef.current;
      const verticalText = verticalTextRef.current;
      const marquee = marqueeRef.current;

      gsap.set(lines, { yPercent: 120, opacity: 0 });
      if (description) gsap.set(description, { y: 30, opacity: 0 });
      if (cta) gsap.set(cta, { y: 30, opacity: 0 });
      if (pills) gsap.set(pills, { y: 30, opacity: 0 });
      if (imageReveal) gsap.set(imageReveal, { scaleY: 1, transformOrigin: "top" });
      if (heroImage) gsap.set(heroImage, { scale: 1.15 });
      if (deco) gsap.set(deco, { opacity: 0 });
      if (verticalText) gsap.set(verticalText, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(lines, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
      })
        .to(
          description,
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .to(
          cta,
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.5"
        )
        .to(
          pills,
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.45"
        )
        .to(
          imageReveal,
          { scaleY: 0, duration: 1.1, ease: "power2.inOut" },
          0.2
        )
        .to(
          heroImage,
          { scale: 1, duration: 1.2, ease: "power2.out" },
          0.25
        )
        .to(deco, { opacity: 1, duration: 0.6 }, 0.9)
        .to(verticalText, { opacity: 1, duration: 0.6 }, 1.1);

      if (marquee) {
        gsap.to(marquee, {
          xPercent: -50,
          duration: 30,
          ease: "none",
          repeat: -1,
        });
      }

      const changingWord = changingWordRef.current;
      if (changingWord) {
        const words = ["Living", "Gathering", "Retreat"];
        const wordTl = gsap.timeline({ repeat: -1, defaults: { ease: "power3.out" } });

        const buildSpans = (text: string) => {
          changingWord.innerHTML = "";
          const spans: HTMLSpanElement[] = [];
          text.split("").forEach((char) => {
            const span = document.createElement("span");
            span.textContent = char === " " ? "\u00a0" : char;
            changingWord.appendChild(span);
            spans.push(span);
          });
          return spans;
        };

        words.forEach((word) => {
          wordTl.add(() => {
            const spans = buildSpans(word);
            gsap.set(spans, { opacity: 0, y: 24, filter: "blur(10px)" });
            gsap.to(spans, {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.1,
              stagger: { each: 0.05, from: "start" },
              ease: "power3.out",
            });
          });

          wordTl.to(
            changingWord.children,
            {
              opacity: 0,
              y: -22,
              filter: "blur(10px)",
              duration: 1.0,
              stagger: { each: 0.05, from: "end" },
              ease: "power3.inOut",
            },
            "+=2.0"
          );
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`nsh-hero ${isLoaded ? "nsh-loaded" : ""}`} ref={rootRef}>
      {/* Background Pattern */}
      <div className="nsh-bg-pattern" />

      {/* Left Content */}
      <div className="nsh-content">
        <h1 className="nsh-title">
          <span className="nsh-title-line">
            <span ref={(el) => el && (titleLineRefs.current[0] = el)}>
              ARCHITECTURE FOR
            </span>
          </span>
          <span className="nsh-title-line">
            <span ref={(el) => el && (titleLineRefs.current[1] = el)}>
              SPACES OF
            </span>
          </span>
          <span className="nsh-title-line">
            <span ref={(el) => el && (titleLineRefs.current[2] = el)}>
              <span className="nsh-changing-word">
                <span ref={changingWordRef} />
              </span>
            </span>
          </span>
        </h1>

        <p className="nsh-description" ref={descriptionRef}>
          BOLD, LIVABLE SPACES WITH CLARITY, LIGHT, AND CRAFT.
        </p>

        <div className="nsh-cta-group nsh-cta-desktop" ref={ctaRef}>
          <AestheticButton
            text="Discover Our Services"
            href="#services"
            className="nsh-custom-btn"
          />
        </div>

        <div className="nsh-pills" ref={pillsRef}>
          {servicePills.map((pill) => (
            <div
              key={pill.id}
              className="nsh-pill"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              <span>{pill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="nsh-cta-group nsh-cta-mobile">
        <AestheticButton
          text="Discover Our Services"
          href="#services"
          className="nsh-custom-btn"
        />
      </div>

      {/* Right Visual */}
      <div className="nsh-visual">
        <div className="nsh-vertical-text" ref={verticalTextRef}>
          Shambala Homes — Architecture Studio
        </div>

        <div ref={imageContainerRef} className="nsh-image-container">
          <div className="nsh-deco-frame" ref={decoFrameRef} />

          <div className="nsh-image-frame">
            <div className="nsh-image-reveal" ref={imageRevealRef} />
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Modern Architectural Design"
              className="nsh-main-image"
              ref={imageRef}
            />
          </div>

          {/* Floating Cards */}
          {floatingCards.map((card) => (
            <div
              key={card.id}
              className={`nsh-floating-card nsh-card-${card.position}`}
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              <div className="nsh-card-label">{card.label}</div>
              <div className="nsh-card-value">
                {card.value} <em>{card.highlight}</em>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Marquee */}
      <div className="nsh-marquee-container">
        <div className="nsh-marquee" ref={marqueeRef}>
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="nsh-marquee-content">
              {marqueeItems.map((item, itemIdx) => (
                <span key={itemIdx} className="nsh-marquee-item">
                  <span className="nsh-marquee-dot" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewServicesHero;
