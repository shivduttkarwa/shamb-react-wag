import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./AncientHero.css";

const AncientHero: React.FC = () => {
  const particlesRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollBtnRef = useRef<HTMLDivElement>(null);

  const [animationsStarted, setAnimationsStarted] = useState(false);

  useEffect(() => {
    if (particlesRef.current) {
      const particleCount = window.innerWidth < 768 ? 20 : 40;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.left = `${Math.random() * 100}%`;
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${Math.random() * 15 + 25}s`;
        particlesRef.current.appendChild(particle);
      }
    }

    // Lock animated elements hidden until GSAP reveals them
    gsap.set(eyebrowRef.current, { opacity: 0 });
    gsap.set([titleLine1Ref.current, titleLine2Ref.current], { opacity: 0, y: 60 });
    gsap.set(subtitleRef.current, { opacity: 0 });
    gsap.set(ctaRef.current, { opacity: 0, clipPath: "inset(0 100% 0 0)" });
    gsap.set(scrollBtnRef.current, { opacity: 0, y: 30 });

    // Preloader adds "content-loaded" to body right before dispatching curtainOpened.
    // If it's already there, we're navigating from another page — animate after short delay.
    // If not, the preloader is still running — wait for it to finish.
    if (document.body.classList.contains("content-loaded")) {
      const timer = setTimeout(() => setAnimationsStarted(true), 300);
      return () => clearTimeout(timer);
    }

    const handler = () => setAnimationsStarted(true);
    window.addEventListener("curtainOpened", handler);
    return () => window.removeEventListener("curtainOpened", handler);
  }, []);

  // GSAP Timeline Animation
  useEffect(() => {
    if (!animationsStarted) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Eyebrow fades in
    tl.fromTo(
      eyebrowRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 },
      0,
    );

    // 2. Title line 1 slides up
    tl.fromTo(
      titleLine1Ref.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.7, ease: "expo.out" },
      0.3,
    );

    // 3. Title line 2 slides up (staggered)
    tl.fromTo(
      titleLine2Ref.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.7, ease: "expo.out" },
      0.6,
    );

    // 4. Subtitle fades in
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      1.7,
    );

    // 5. CTA reveals with clip-path animation
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, clipPath: "inset(0 100% 0 0)" },
      {
        opacity: 1,
        clipPath: "inset(0 0 0 0)",
        duration: 1.1,
        ease: "expo.out",
      },
      1.5,
    );

    // 6. Scroll indicator slides up
    tl.fromTo(
      scrollBtnRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
      4.3,
    );

    return () => tl.kill();
  }, [animationsStarted]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    btn.style.setProperty("--x", `${x}%`);
    btn.style.setProperty("--y", `${y}%`);
  };

  const handleParallax = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    const gateway = document.querySelector(".gateway") as HTMLElement;
    const mandala = document.querySelector(".mandala") as HTMLElement;

    if (gateway) {
      gateway.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    }
    if (mandala) {
      mandala.style.transform = `translate(-50%, -50%) rotate(${x}deg)`;
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`sanctuary ${animationsStarted ? "hero-unveiled" : ""}`}
      onMouseMove={handleParallax}
    >
      {/* Background Image */}
      <div className="sanctuary__bg">
        <img
          src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2940&auto=format&fit=crop"
          alt="Ancient Himalayan Architecture at Golden Hour"
        />
      </div>

      {/* Atmospheric Effects */}
      <div className="sanctuary__veil" />
      <div className="sanctuary__mist" />

      {/* Sacred Geometry */}
      <div className="mandala">
        <svg viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" />
          <circle cx="100" cy="100" r="70" />
          <circle cx="100" cy="100" r="50" />
          <circle cx="100" cy="100" r="30" />
          <polygon points="100,10 190,100 100,190 10,100" />
          <polygon points="100,30 170,100 100,170 30,100" />
          <line x1="100" y1="10" x2="100" y2="190" />
          <line x1="10" y1="100" x2="190" y2="100" />
          <line x1="30" y1="30" x2="170" y2="170" />
          <line x1="170" y1="30" x2="30" y2="170" />
        </svg>
      </div>

      {/* Golden Dust - Slower */}
      <div className="particles" ref={particlesRef} />

      {/* Main Content */}
      <div className="sanctuary__content">
        <div className="gateway">
          <div ref={eyebrowRef} className="eyebrow">
            Architectural Excellence
          </div>
          <h1 className="ancient-hero-title">
            <span ref={titleLine1Ref} className="line">
              Architectural Vision
            </span>
            <span ref={titleLine2Ref} className="line">
              Realized
            </span>
          </h1>
          <p ref={subtitleRef} className="ancient-hero-subtitle">
            Where modern design meets exceptional craftsmanship. We create
            architectural masterpieces that stand the test of time.
          </p>

          <a
            ref={ctaRef}
            href="/projects"
            className="ancient-hero-cta"
            onMouseMove={handleMouseMove}
          >
            <span className="wheel" />
            <span>View Our Projects</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollBtnRef} className="ancient-hero-scroll-btn">
        <div className="lotus" />
        <div className="lotus-line" />
      </div>
    </section>
  );
};

export default AncientHero;
