import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ASCIIGlitchText from "../shared/ASCIIGlitchText";
import ArchScrollReveal from "./ArchScrollReveal";
import "./AboutDetails.css";

const publicUrl = import.meta.env.BASE_URL;

gsap.registerPlugin(ScrollTrigger);

const AboutDetails: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    /* -------- Scroll Animations -------- */
    gsap.utils.toArray(".about-animate-in").forEach((elem) => {
      gsap.fromTo(
        elem as gsap.TweenTarget,
        { autoAlpha: 0, y: 60, scale: 0.95 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: elem as gsap.DOMTarget,
            start: "top 85%",
            toggleActions: "play none none reverse",
            onEnter: () => {
              // Add 2.5s delay for page transition to complete
              setTimeout(() => {
                gsap.to(elem as gsap.TweenTarget, {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: 1,
                  ease: "power4.out",
                });
              }, );
            },
            onEnterBack: () => {
              // Add 2.5s delay for page transition to complete
              setTimeout(() => {
                gsap.to(elem as gsap.TweenTarget, {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: 1,
                  ease: "power4.out",
                });
              }, );
            },
          },
        }
      );
    });

    /* -------- Hero Parallax on Mouse Move -------- */
    const hero = document.querySelector(".aboutdetail-section");
    if (hero) {
      hero.addEventListener("mousemove", (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = hero.getBoundingClientRect();
        const clientX = mouseEvent.clientX - rect.left;
        const clientY = mouseEvent.clientY - rect.top;
        const { width, height } = rect;

        const xPos = (clientX / width - 0.5) * 30;
        const yPos = (clientY / height - 0.5) * 30;

        gsap.to(".aboutdetail-image-container", {
          duration: 1,
          x: -xPos,
          y: -yPos,
          ease: "power3.out",
        });
        gsap.to(".aboutdetail-text-container", {
          duration: 1,
          x: xPos,
          y: yPos,
          ease: "power3.out",
        });
      });

      hero.addEventListener("mouseleave", () => {
        gsap.to(".aboutdetail-image-container, .aboutdetail-text-container", {
          duration: 1,
          x: 0,
          y: 0,
          ease: "elastic.out(1, 0.5)",
        });
      });
    }

    /* -------- Interactive Card Tilt Effect -------- */
    const cards = document.querySelectorAll(".about-interactive-card");
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = card.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;
        const { width, height } = rect;

        const rotateX = gsap.utils.mapRange(0, height, -10, 10, y);
        const rotateY = gsap.utils.mapRange(0, width, 10, -10, x);

        gsap.to(card, {
          duration: 0.7,
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 1000,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          duration: 1,
          rotationX: 0,
          rotationY: 0,
          ease: "elastic.out(1, 0.5)",
        });
      });
    });
  }, []);

  return (
    <div className="about-page antialiased">
      {/* Main Content ONLY */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="aboutdetail-section p-8 md:p-12 mb-20">
          <div className="about-rule-of-thirds-grid aboutdetail-grid">
            {/* Image (2/3) */}
            <div className="w-full h-auto rounded-2xl overflow-hidden about-animate-in aboutdetail-image-container">
              <img
                src={`${publicUrl}images/hero_poster.jpg`}
                alt="FORMA Architectural Excellence"
                className="reduced-hero-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `${publicUrl}images/sercard1.jpg`;
                }}
              />
            </div>

            {/* Text Content (1/3) */}
            <div className="about-animate-in aboutdetail-text-container">
              <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight aboutdetail-hero-title">
                Architectural Excellence Since 1999
              </h1>
              <div className="mb-8 aboutdetail-hero-description">
                <ASCIIGlitchText
                  text="Crafting exceptional living spaces that blend luxury with nature's harmony. Our vision transforms architectural dreams into sustainable realities, creating homes that nurture both body and soul."
                  className="about-interactive-element text-lg leading-relaxed mb-4 block"
                  duration={800}
                  spread={0.8}
                  chars="!?&#$@0123456789*.,·-─~+:;=*π"
                  tag="p"
                />
                <ASCIIGlitchText
                  text="With over 25 years of experience, FORMA has established itself as a pioneering force in sustainable luxury design. From intimate residential retreats to grand commercial complexes, we create spaces that honor both aesthetic excellence and environmental stewardship."
                  className="about-interactive-element text-lg leading-relaxed"
                  duration={900}
                  spread={0.7}
                  chars="!?&#$@0123456789*.,·-─~+:;=*π"
                  tag="p"
                />
              </div>
              {/* Buttons removed per request */}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid lg:grid-cols-2 gap-10 mb-20 max-w-7xl mx-auto px-4">
          {/* Card 1 - Experience */}
          <div className="about-card enhanced-card p-12 md:p-16 about-animate-in about-interactive-card">
            <div className="card-icon-container mb-6">
              <i className="fas fa-award text-4xl text-gold"></i>
            </div>
            <h2 className="text-7xl md:text-8xl font-black mb-6 aboutdetail-card-title experience-number">
              25+
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-green-primary uppercase tracking-wide">
              Years of Excellence
            </h3>
            <ASCIIGlitchText
              text="Excellence in architectural design and sustainable construction. Building dreams with precision, passion, and environmental consciousness for over two decades."
              className="text-lg mb-6 leading-relaxed text-brown-tertiary about-interactive-element"
              duration={850}
              spread={0.6}
              chars="!?&#$@0123456789*.,·-─~+:;=*π"
              tag="p"
            />
            <ASCIIGlitchText
              text="Our team specializes in LEED-certified buildings and smart home integration, combining traditional craftsmanship with modern engineering to create timeless, forward-thinking spaces."
              className="text-base mb-8 leading-relaxed text-brown-tertiary about-interactive-element"
              duration={900}
              spread={0.6}
              chars="!?&#$@0123456789*.,·-─~+:;=*π"
              tag="p"
            />
            <div className="stats-grid grid grid-cols-2 gap-4 mb-8">
              <div className="stat-item">
                <div className="text-3xl font-bold text-gold">200+</div>
                <div className="text-sm text-brown-tertiary uppercase tracking-wider">Projects</div>
              </div>
              <div className="stat-item">
                <div className="text-3xl font-bold text-gold">50+</div>
                <div className="text-sm text-brown-tertiary uppercase tracking-wider">Awards</div>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link
                to="/projects"
                className="about-btn-primary-enhanced flex-1 min-w-[120px] text-center"
              >
                Portfolio
              </Link>
              <Link
                to="/contact"
                className="about-btn-secondary-enhanced flex-1 min-w-[120px] text-center"
              >
                Get Quote
              </Link>
            </div>
          </div>

          {/* Card 2 - Philosophy */}
          <div className="about-card about-gold-card enhanced-card p-12 md:p-16 relative about-animate-in about-interactive-card">
            <div className="card-icon-container mb-6">
              <i className="fas fa-leaf text-4xl text-green-primary"></i>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight aboutdetail-luxury-title uppercase">
              Sustainable Luxury
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-green-primary">
              Where Nature Meets Design
            </h3>
            <ASCIIGlitchText
              text="Where modern elegance meets natural harmony. Our designs celebrate the seamless integration of contemporary living with environmental stewardship."
              className="text-lg mb-4 leading-relaxed about-interactive-element"
              duration={850}
              spread={0.7}
              chars="!?&#$@0123456789*.,·-─~+:;=*π"
              tag="p"
            />
            <ASCIIGlitchText
              text="We source materials ethically, prioritize energy efficiency, and ensure each project reflects our commitment to luxury that doesn't compromise environmental responsibility."
              className="text-base mb-6 leading-relaxed about-interactive-element"
              duration={800}
              spread={0.7}
              chars="!?&#$@0123456789*.,·-─~+:;=*π"
              tag="p"
            />
            <div className="philosophy-points mb-8 space-y-3">
              <div className="flex items-center gap-3">
                <i className="fas fa-check-circle text-green-primary"></i>
                <span className="text-base">LEED Certified Designs</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-check-circle text-green-primary"></i>
                <span className="text-base">Energy Efficient Solutions</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-check-circle text-green-primary"></i>
                <span className="text-base">Natural Material Integration</span>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                to="/services"
                className="about-btn-action-enhanced"
              >
                Discover More
              </Link>
              <Link
                to="/contact"
                className="about-link-arrow group"
              >
                Start Your Project
                <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform ml-2"></i>
              </Link>
            </div>
          </div>
        </section>

        {/* New Services Preview Section */}
        <section className="services-preview-section mb-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-black mb-4 text-black">Our Services</h2>
              <ASCIIGlitchText
                text="From conceptual design to final construction, we deliver comprehensive architectural solutions"
                className="text-xl text-brown-tertiary max-w-2xl mx-auto leading-relaxed about-interactive-element"
                duration={900}
                spread={0.5}
                chars="!?&#$@0123456789*.,·-─~+:;=*π"
                tag="p"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="service-card about-animate-in about-interactive-card">
                <div className="service-icon mb-6">
                  <i className="fas fa-drafting-compass text-5xl text-gold"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-black">Design & Planning</h3>
                <ASCIIGlitchText
                  text="Comprehensive architectural design services from initial concepts to detailed blueprints."
                  className="text-brown-tertiary mb-6 leading-relaxed about-interactive-element"
                  duration={750}
                  spread={0.6}
                  chars="!?&#$@0123456789*.,·-─~+:;=*π"
                  tag="p"
                />
                <Link to="/services" className="service-link text-green-primary font-semibold">
                  Learn More <i className="fas fa-arrow-right ml-1"></i>
                </Link>
              </div>
              
              {/* Service 2 */}
              <div className="service-card about-animate-in about-interactive-card">
                <div className="service-icon mb-6">
                  <i className="fas fa-hammer text-5xl text-gold"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-black">Construction</h3>
                <ASCIIGlitchText
                  text="Expert construction management ensuring quality, timeline, and budget adherence."
                  className="text-brown-tertiary mb-6 leading-relaxed about-interactive-element"
                  duration={750}
                  spread={0.6}
                  chars="!?&#$@0123456789*.,·-─~+:;=*π"
                  tag="p"
                />
                <Link to="/services" className="service-link text-green-primary font-semibold">
                  Learn More <i className="fas fa-arrow-right ml-1"></i>
                </Link>
              </div>
              
              {/* Service 3 */}
              <div className="service-card about-animate-in about-interactive-card">
                <div className="service-icon mb-6">
                  <i className="fas fa-seedling text-5xl text-gold"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-black">Sustainability</h3>
                <ASCIIGlitchText
                  text="Eco-friendly solutions that reduce environmental impact while maximizing efficiency."
                  className="text-brown-tertiary mb-6 leading-relaxed about-interactive-element"
                  duration={750}
                  spread={0.6}
                  chars="!?&#$@0123456789*.,·-─~+:;=*π"
                  tag="p"
                />
                <Link to="/services" className="service-link text-green-primary font-semibold">
                  Learn More <i className="fas fa-arrow-right ml-1"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Arch Scroll Reveal Section */}
      <ArchScrollReveal />
    </div>
  );
};

export default AboutDetails;
