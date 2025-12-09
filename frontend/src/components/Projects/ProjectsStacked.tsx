import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const publicUrl = import.meta.env.BASE_URL || "/";
import "./ProjectsStacked.css";

gsap.registerPlugin(ScrollTrigger);

const ProjectsStacked: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Description animation
      gsap.fromTo(
        descriptionRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Images stack animation
      const images = imagesRef.current?.children;
      if (images) {
        gsap.fromTo(
          images,
          {
            y: 100,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Continuous subtle floating animation for images
      if (images) {
        Array.from(images).forEach((image, index) => {
          gsap.to(image, {
            y: -15 + index * 5,
            duration: 3 + index * 0.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.3,
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="projects-stacked">
      <div className="projects-stacked__container">
        <div className="projects-stacked__content">
          <h2 ref={titleRef} className="projects-stacked__title">
            Excellence in Every
            <span className="projects-stacked__accent"> Detail</span>
          </h2>
          <p ref={descriptionRef} className="projects-stacked__description">
            Our commitment to perfection extends beyond design and construction.
            Every material, every finish, every detail is carefully selected and
            executed to create spaces that not only look beautiful but stand the
            test of time. From sustainable materials to innovative technologies,
            we ensure every project reflects the highest standards of quality
            and craftsmanship.
          </p>
        </div>

        <div ref={imagesRef} className="projects-stacked__images">
          <div className="projects-stacked__image projects-stacked__image--1">
            <img
              src={`${publicUrl}images/l4.jpg`}
              alt="Premium materials and finishes"
            />
            <div className="projects-stacked__overlay">
              <span>Premium Materials</span>
            </div>
          </div>

          <div className="projects-stacked__image projects-stacked__image--2">
            <img
              src={`${publicUrl}images/l5.jpg`}
              alt="Sustainable construction practices"
            />
            <div className="projects-stacked__overlay">
              <span>Sustainable Design</span>
            </div>
          </div>

          <div className="projects-stacked__image projects-stacked__image--3">
            <img
              src={`${publicUrl}images/l6.jpg`}
              alt="Innovative architectural solutions"
            />
            <div className="projects-stacked__overlay">
              <span>Innovation</span>
            </div>
          </div>

          <div className="projects-stacked__image projects-stacked__image--4">
            <img
              src={`${publicUrl}images/l7.jpg`}
              alt="Timeless craftsmanship"
            />
            <div className="projects-stacked__overlay">
              <span>Craftsmanship</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsStacked;
