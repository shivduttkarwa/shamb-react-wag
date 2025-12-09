import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltTextGsap from "../UI/TiltTextGsap";
import "./ProjectsShowcase.css";

gsap.registerPlugin(ScrollTrigger);

const publicUrl = import.meta.env.BASE_URL || "/";

const ProjectsShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const centerImageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for images
      gsap.fromTo(
        leftImageRef.current,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        rightImageRef.current,
        {
          y: -80,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        centerImageRef.current,
        {
          y: 60,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.4,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: 0.6,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate stats numbers - slide up from bottom (same as ProjectDetails)
      const statNumbers = containerRef.current?.querySelectorAll(
        ".projects-showcase__stat-number"
      );
      statNumbers?.forEach((statNumber) => {
        gsap.fromTo(
          statNumber,
          { 
            opacity: 0, 
            y: 100, // Start from below (100px down)
            scale: 0.8 
          },
          {
            opacity: 1,
            y: 0, // End at original position
            scale: 1,
            duration: 2.7,
            ease: "back.out(2.7)", // Custom back.out easing
            scrollTrigger: {
              trigger: statNumber,
              start: "top 85%", // Trigger when section is visible
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Continuous floating animation
      gsap.to(leftImageRef.current, {
        y: -20,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(rightImageRef.current, {
        y: 15,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.5,
      });

      gsap.to(centerImageRef.current, {
        y: -10,
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="projects-showcase">
      <div className="projects-showcase__container">
        <div className="projects-showcase__images">
          <div
            ref={leftImageRef}
            className="projects-showcase__image projects-showcase__image--left"
          >
            <img
              src={`${publicUrl}images/l1.jpg`}
              alt="Modern interior design"
            />
            <div className="projects-showcase__overlay">
              <span>Interior</span>
            </div>
          </div>

          <div
            ref={centerImageRef}
            className="projects-showcase__image projects-showcase__image--center"
          >
            <img src={`${publicUrl}images/l2.jpg`} alt="Architectural design" />
            <div className="projects-showcase__overlay">
              <span>Architecture</span>
            </div>
          </div>

          <div
            ref={rightImageRef}
            className="projects-showcase__image projects-showcase__image--right"
          >
            <img src={`${publicUrl}images/l3.jpg`} alt="Landscape design" />
            <div className="projects-showcase__overlay">
              <span>Landscape</span>
            </div>
          </div>
        </div>

        <div ref={textRef} className="projects-showcase__content">
          <TiltTextGsap
            tag="h2"
            className="projects-showcase__title"
            startTrigger="top 70%"
            endTrigger="bottom -10%"
          >
            Crafting Spaces That Inspire
          </TiltTextGsap>
          <p className="projects-showcase__description">
            Every project tells a unique story. From conceptual sketches to the
            final reveal, we transform visions into extraordinary living spaces
            that reflect your personality and enhance your lifestyle.
          </p>
          <div className="projects-showcase__stats">
            <div className="projects-showcase__stat">
              <span className="projects-showcase__stat-number">150+</span>
              <span className="projects-showcase__stat-label">
                Projects Completed
              </span>
            </div>
            <div className="projects-showcase__stat">
              <span className="projects-showcase__stat-number">12</span>
              <span className="projects-showcase__stat-label">
                Years Experience
              </span>
            </div>
            <div className="projects-showcase__stat">
              <span className="projects-showcase__stat-number">98%</span>
              <span className="projects-showcase__stat-label">
                Client Satisfaction
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
