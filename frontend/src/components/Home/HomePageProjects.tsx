import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HomePageProjects.css";
import GlassButton from "../UI/GlassButton";
import TiltTextGsap from "../UI/TiltTextGsap";

const publicUrl = import.meta.env.BASE_URL;

gsap.registerPlugin(ScrollTrigger);

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  alt: string;
  ctaText?: string;
  ctaLink?: string;
}

interface HomePageProjectsProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  services?: ServiceCard[];
}

const defaultServices: ServiceCard[] = [
  {
    id: "1",
    title: "New Home Construction",
    description:
      "From concept to completion, we build homes tailored to your lifestyle and vision.",
    imageSrc: `${publicUrl}images/sercard1.jpg`,
    alt: "New Home Construction",
    ctaText: "Learn More",
    ctaLink: "/services",
  },
  {
    id: "2",
    title: "Complete Renovations",
    description:
      "Transform your existing home with our comprehensive renovation and remodeling services.",
    imageSrc: `${publicUrl}images/sercard2.jpg`,
    alt: "Home Renovations",
    ctaText: "Learn More",
    ctaLink: "/services",
  },
  {
    id: "3",
    title: "Extensions & Upgrades",
    description:
      "Expand your living space with expertly designed extensions that blend seamlessly with your home.",
    imageSrc: `${publicUrl}images/sercard3.jpg`,
    alt: "Home Extensions",
    ctaText: "Learn More",
    ctaLink: "/services",
  },
  {
    id: "4",
    title: "Downsizing Solutions",
    description:
      "Thoughtful designs that maximize comfort and functionality in smaller, more efficient spaces.",
    imageSrc: `${publicUrl}images/4.avif`,
    alt: "Downsizing Solutions",
    ctaText: "Learn More",
    ctaLink: "/services",
  },
];

const HomePageProjects: React.FC<HomePageProjectsProps> = ({
  title = "BUILDING EXCELLENCE",
  subtitle = "",
  description = "FORMA delivers comprehensive construction services from new home builds to complete renovations. With decades of experience and unwavering commitment to quality, we transform architectural visions into lasting realities.",
  ctaText = "View All Services",
  ctaLink = "/services",
  services = defaultServices,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Get all cards
      const cards = gsap.utils.toArray(".home-page-projects-card");

      // Animate each card on scroll with stagger
      cards.forEach((card, index) => {
        // Alternate direction: even indexes (0,2,4...) from left, odd indexes (1,3,5...) from right
        const isFromLeft = index % 2 === 0;
        const startX = isFromLeft ? -150 : 150;

        // Set initial state for each card individually
        gsap.set(card as gsap.TweenTarget, {
          opacity: 0,
          x: startX,
          y: 100,
          rotation: isFromLeft ? 16 : -16,
          transformOrigin: "center center",
        });

        gsap.to(card as gsap.TweenTarget, {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: card as gsap.DOMTarget,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1,
        });
      });

      // Parallax effect on images
      cards.forEach((card) => {
        const img = (card as Element).querySelector(
          ".home-page-projects-card-image"
        );
        if (img) {
          gsap.to(img, {
            yPercent: -1,
            ease: "linear",
            scrollTrigger: {
              trigger: card as gsap.DOMTarget,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      // Fade in content elements on desktop only
      if (window.innerWidth > 1024) {
        gsap.from(".home-page-projects-description", {
          scrollTrigger: {
            trigger: ".home-page-projects-content",
            start: "top 70%",
          },
          opacity: 0,
          y: 20,
          duration: 0.6,
          delay: 0.4,
          ease: "linear",
        });

        // Button animation - simple fade in
        gsap.from(".home-page-projects-content .home-benefits-cta", {
          opacity: 0,
          y: 15,
          duration: 0.6,
          delay: 0.6,
          ease: "linear",
          scrollTrigger: {
            trigger: ".home-page-projects-content",
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="home-page-projects-section" ref={sectionRef}>
      <div className="home-page-projects-container">
        <div className="home-page-projects-layout">
          {/* Left side - Service Cards */}
          <div className="home-page-projects-cards">
            {services.map((service) => (
              <div
                key={service.id}
                className="home-page-projects-card"
                data-card={service.id}
              >
                <img
                  src={service.imageSrc}
                  alt={service.alt}
                  className="home-page-projects-card-image"
                />
                <div className="home-page-projects-overlay">
                  <div>
                    <div className="home-page-projects-title">
                      {service.title}
                    </div>
                    <div className="home-page-projects-description">
                      {service.description}
                    </div>
                  </div>
                  <GlassButton href={service.ctaLink || "#"}>
                    {service.ctaText || "Learn More"}
                  </GlassButton>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Sticky Content */}
          <div className="home-page-projects-content">
            <TiltTextGsap startTrigger="top 70%" endTrigger="bottom -1000%">
              {`${title} ${subtitle}`}
            </TiltTextGsap>
            <div className="home-page-projects-description">
              {description}
            </div>
            <GlassButton href={ctaLink}>{ctaText}</GlassButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageProjects;
