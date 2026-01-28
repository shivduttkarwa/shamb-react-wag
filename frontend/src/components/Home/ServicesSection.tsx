import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ServicesSection.css";
import ReadMoreButton from "../UI/ReadMoreButton";
import AestheticButton from "../UI/AestheticButton";
import TiltTextGsap from "../UI/TiltTextGsap";
import { initGsapSwitchAnimations } from "../../lib/gsapSwitchAnimations";


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

interface ServicesSectionProps {
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
    title: "Seacliff Residence",
    description:
      "Ocean-facing luxury retreat with layered terraces, native landscaping, and seamless indoor-outdoor living. Crafted to capture sunrise light, the plan flows from sheltered courtyards to broad coastal decks.",
    imageSrc: `${publicUrl}images/sercard1.jpg`,
    alt: "Seacliff Residence project",
    ctaText: "View Project",
    ctaLink: "/projects/seacliff-residence",
  },
  {
    id: "2",
    title: "Hinterland Pavilion",
    description:
      "Elevated pavilion home with timber screening, passive cooling, and a warm minimalist interior palette. Deep overhangs, cross-ventilation, and a central hearth create a calm, low-maintenance retreat.",
    imageSrc: `${publicUrl}images/sercard2.jpg`,
    alt: "Hinterland Pavilion project",
    ctaText: "View Project",
    ctaLink: "/projects/hinterland-pavilion",
  },
  {
    id: "3",
    title: "Urban Courtyard House",
    description:
      "Inner-city sanctuary built around a sculpted courtyard, clerestory light, and bespoke joinery moments. The layout opens and closes with the day, creating layered spaces for work and family life.",
    imageSrc: `${publicUrl}images/sercard3.jpg`,
    alt: "Urban Courtyard House project",
    ctaText: "View Project",
    ctaLink: "/projects/urban-courtyard-house",
  },
  {
    id: "4",
    title: "Forest Ridge Lodge",
    description:
      "Weekend lodge with stone, cedar, and expansive glazing framing the treetops. Warm, textured rooms wrap a central fireplace, easing the transition between forest and interior.",
    imageSrc: `${publicUrl}images/4.avif`,
    alt: "Forest Ridge Lodge project",
    ctaText: "View Project",
    ctaLink: "/projects/forest-ridge-lodge",
  },
];

const ServicesSection: React.FC<ServicesSectionProps> = ({
  title = "shambala PROJECTS",
  subtitle = "",
  description =
    "A curated look at how we shape coastal retreats, urban sanctuaries, and country escapes—each crafted with calm, warmth, and precision. From the first sketch to final styling, our teams steward every detail so the architecture, interiors, and landscape speak the same language. Expect measured light, honest materials, and rooms that feel effortlessly livable day after day.",
  ctaText = "View All Projects",
  ctaLink = "/projects",
  services = defaultServices,
}) => {
  const shortDescription = "A curated look at how we shape coastal retreats, urban sanctuaries, and country escapes—each crafted with calm, warmth, and precision. From the first sketch to final styling, our teams steward every detail so the architecture, interiors, and landscape speak the same language.";
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Get all cards
      const cards = gsap.utils.toArray(".hss-service-card");

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
        const img = (card as Element).querySelector(".hss-service-card-image");
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

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
      return initGsapSwitchAnimations(sectionRef.current || undefined);
    }, []);

  return (
    <section className="hss-services-section" ref={sectionRef}>
      <div className="hss-services-container">
        <div className="hss-services-layout">
          {/* Left side - Service Cards */}
          <div className="hss-services-cards">
            {services.map((service) => (
              <div
                key={service.id}
                className="hss-service-card"
                data-card={service.id}
              >
                <img
                  src={service.imageSrc}
                  alt={service.alt}
                  className="hss-service-card-image"
                />
                <div className="hss-service-overlay">
                  <div>
                    <div className="hss-service-title">
                      {service.title}
                    </div>
                    <div className="hss-service-description">
                      {service.description}
                    </div>
                  </div>
                  <ReadMoreButton
                    href={service.ctaLink || "#"}
                    text={service.ctaText || "Read More"}
                    size="card"
                    className="hss-readmore-btn"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Sticky Content */}
          <div className="hss-services-content">
            <TiltTextGsap startTrigger="top 90%" >
              {`${title} ${subtitle}`}
            </TiltTextGsap>
            <div data-gsap="fade-up" className="hss-services-description">
              {typeof window !== 'undefined' && window.innerWidth < 1600 ? shortDescription : description}
            </div>
           <div data-gsap="slide-right" > <AestheticButton className="essence-cta-btn" href={ctaLink}>
              {ctaText}
            </AestheticButton></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
