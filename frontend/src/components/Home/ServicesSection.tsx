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
    title: "Building New With Shambala",
    description:
      "Start fresh with a custom-designed home tailored to your lifestyle. From foundation to finishing touches, we bring your vision to life with innovative layouts, sustainable materials, and modern design that stands the test of time.",
    imageSrc: `${publicUrl}images/sercard1.jpg`,
    alt: "New home construction",
    ctaText: "Learn More",
    ctaLink: "/services/new-builds",
  },
  {
    id: "2",
    title: "Renovate & Elevate",
    description:
      "Transform your current space into something extraordinary. Our renovation expertise enhances both comfort and value with thoughtful upgrades, kitchen remodels, bathroom transformations, and seamless room additions.",
    imageSrc: `${publicUrl}images/sercard2.jpg`,
    alt: "Home renovation services",
    ctaText: "Learn More",
    ctaLink: "/services/renovations",
  },
  {
    id: "3",
    title: "Downsize With Grace",
    description:
      "Transition to a more manageable space without sacrificing style or comfort. Our smart downsizing solutions feature space optimization, clever storage, accessible design, and low-maintenance living tailored to your needs.",
    imageSrc: `${publicUrl}images/sercard3.jpg`,
    alt: "Downsizing solutions",
    ctaText: "Learn More",
    ctaLink: "/services/downsizing",
  },
  {
    id: "4",
    title: "Commercial Excellence",
    description:
      "Professional spaces that inspire productivity and impress clients. From modern offices to retail environments and hospitality venues, we create commercial spaces designed for success and built to perform.",
    imageSrc: `${publicUrl}images/4.avif`,
    alt: "Commercial construction",
    ctaText: "Learn More",
    ctaLink: "/services/commercial",
  },
];

const ServicesSection: React.FC<ServicesSectionProps> = ({
  title = "Find The Right Build",
  subtitle = "Type For Your Needs",
  description =
    "Whether you're dreaming of a brand new custom home, elevating your current space, simplifying your lifestyle, or creating a commercial masterpiece—we have the expertise to bring your vision to life. Each service is crafted with the same dedication to quality, sustainability, and timeless design that defines the Shambala approach.",
  ctaText = "Explore All Services",
  ctaLink = "/services",
  services = defaultServices,
}) => {
  const shortDescription = "Whether you're dreaming of a brand new custom home, elevating your current space, simplifying your lifestyle, or creating a commercial masterpiece—we have the expertise to bring your vision to life.";
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
                  <div className="hss-service-text-wrapper">
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
           <div data-gsap="slide-right" className="hss-services-cta-wrapper-desktop">
             <AestheticButton className="essence-cta-btn" href={ctaLink}>
              {ctaText}
            </AestheticButton>
           </div>
          </div>
        </div>

        {/* Mobile CTA - appears after all cards */}
        <div className="hss-services-cta-wrapper-mobile">
          <AestheticButton className="essence-cta-btn" href={ctaLink}>
            {ctaText}
          </AestheticButton>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
