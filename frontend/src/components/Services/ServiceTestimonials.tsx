// ServiceTestimonials.tsx
import React, { useEffect, useRef, MouseEvent as ReactMouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ServicePage.css";
import TiltTextGsap from "../UI/TiltTextGsap";

gsap.registerPlugin(ScrollTrigger);

const ServiceTestimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const ctx = gsap.context(() => {
      // Scroll reveal only for elements in this section
      gsap.utils.toArray<HTMLElement>(".ser-animate-in").forEach((elem) => {
        gsap.fromTo(
          elem,
          { autoAlpha: 0, y: 60 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionEl);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleCardMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const { width, height } = rect;

    const rotateX = gsap.utils.mapRange(0, height, -10, 10)(y);
    const rotateY = gsap.utils.mapRange(0, width, 10, -10)(x);

    gsap.to(card, {
      duration: 0.7,
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
    });
  };

  const handleCardMouseLeave = (e: ReactMouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      duration: 1,
      rotationX: 0,
      rotationY: 0,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <section className="ser-testimonials-section" ref={sectionRef}>
      <div className="ser-testimonials-header ser-animate-in">
        <TiltTextGsap tag="h2" className="ser-serif">
          What our clients say
        </TiltTextGsap>
        <p>
          Real stories from real people who&apos;ve transformed their spaces
          with Forma&apos;s thoughtful design approach.
        </p>
      </div>

      <div className="ser-features-grid">
        {/* Testimonial 1 */}
        <div
          className="ser-card ser-animate-in ser-interactive-card"
          style={{ backgroundColor: "#ffe66d" }}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <h3 className="ser-text-4xl" style={{ fontFamily: "'Nunito', sans-serif" }}>
            "Absolutely{" "}
            <span style={{ color: "var(--ser-color-gold)" }}>exceptional</span>{" "}
            work"
          </h3>
          <p className="ser-mb-8" style={{ color: "#333" }}>
            "Forma completely transformed our home. Every detail was considered,
            from the natural light flow to the choice of materials. Our space
            now feels calm, functional, and truly reflects who we are as a
            family."
          </p>
          <div className="ser-testimonial-author">
            <strong>Sarah &amp; Michael Chen</strong>
            <br />
            <small style={{ color: "var(--ser-color-tertiary-brown)" }}>
              Modern Family Home, Melbourne
            </small>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div
          className="ser-card ser-animate-in ser-interactive-card"
          style={{ backgroundColor: "#a8e6cf" }}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <h3 className="ser-text-4xl" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Beyond our
            <br />
            expectations
          </h3>
          <p className="ser-mb-8" style={{ color: "#333" }}>
            "The team at Forma didn&apos;t just design our office space—they
            understood our brand and created an environment where creativity
            flows naturally. Our clients are always impressed."
          </p>
          <div className="ser-testimonial-author">
            <strong>James Rodriguez</strong>
            <br />
            <small style={{ color: "var(--ser-color-tertiary-brown)" }}>
              Creative Studio, Sydney
            </small>
          </div>
        </div>

        {/* Testimonial 3 */}
        <div
          className="ser-card ser-animate-in ser-interactive-card"
          style={{ backgroundColor: "#ff6b6b" }}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <h3 className="ser-text-4xl" style={{ fontFamily: "'Nunito', sans-serif" }}>
            "Visionary{" "}
            <span style={{ color: "#fff" }}>design</span>{" "}
            meets reality"
          </h3>
          <p className="ser-mb-8" style={{ color: "#fff" }}>
            "Forma took our vision and brought it to life in ways we never
            imagined. The attention to detail and innovative solutions made our
            dream home a reality. Every day feels like a luxury retreat."
          </p>
          <div className="ser-testimonial-author">
            <strong>Emma &amp; David Thompson</strong>
            <br />
            <small style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              Luxury Residence, Brisbane
            </small>
          </div>
        </div>

        {/* Testimonial 4 */}
        <div
          className="ser-card ser-animate-in ser-interactive-card"
          style={{ backgroundColor: "#4ecdc4" }}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <h3 className="ser-text-4xl" style={{ fontFamily: "'Nunito', sans-serif" }}>
            "Sustainable{" "}
            <span style={{ color: "#fff" }}>elegance</span>
          </h3>
          <p className="ser-mb-8" style={{ color: "#fff" }}>
            "We wanted an eco-friendly home without compromising on style.
            Forma delivered perfectly with sustainable materials and smart
            design that reduces our environmental footprint while looking
            absolutely stunning."
          </p>
          <div className="ser-testimonial-author">
            <strong>Lisa Park</strong>
            <br />
            <small style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              Eco Home, Perth
            </small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceTestimonials;
