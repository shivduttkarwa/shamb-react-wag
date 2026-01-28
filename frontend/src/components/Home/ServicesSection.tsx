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
    title: "Sustainable Vision",
    description:
      "We believe in building for generations, not just years. Every project honors the environment through eco-conscious materials, energy-efficient design, and practices that minimize our footprint while maximizing your home's harmony with nature.",
    imageSrc: `${publicUrl}images/sercard1.jpg`,
    alt: "Sustainable building philosophy",
    ctaText: "Our Approach",
    ctaLink: "/about",
  },
  {
    id: "2",
    title: "Timeless Craftsmanship",
    description:
      "Quality isn't rushed—it's refined. Our master craftsmen blend time-honored techniques with modern innovation, ensuring every detail stands as a testament to precision, durability, and enduring beauty that transcends fleeting trends.",
    imageSrc: `${publicUrl}images/sercard2.jpg`,
    alt: "Quality craftsmanship",
    ctaText: "Our Approach",
    ctaLink: "/about",
  },
  {
    id: "3",
    title: "Human-Centered Design",
    description:
      "Spaces shape lives. We listen deeply to understand how you live, work, and dream—then craft environments that elevate your daily experience, nurture well-being, and grow beautifully with your evolving story.",
    imageSrc: `${publicUrl}images/sercard3.jpg`,
    alt: "Human-centered design philosophy",
    ctaText: "Our Approach",
    ctaLink: "/about",
  },
  {
    id: "4",
    title: "Integrity & Trust",
    description:
      "Your vision deserves unwavering commitment. We build relationships on transparency, honest communication, and meticulous attention to your needs—because the foundation of every great project is trust earned through consistent excellence.",
    imageSrc: `${publicUrl}images/4.avif`,
    alt: "Trust and integrity",
    ctaText: "Our Approach",
    ctaLink: "/about",
  },
];

const ServicesSection: React.FC<ServicesSectionProps> = ({
  title = "Our Foundation",
  subtitle = "Built to Last",
  description =
    "At Shambala, we don't just construct buildings—we cultivate lasting legacies. Our philosophy is rooted in four unwavering pillars: respect for the environment, reverence for craftsmanship, dedication to human experience, and an unshakeable commitment to integrity. These aren't just values we speak; they're the foundation of every project we touch, every relationship we build, and every space we bring to life.",
  ctaText = "Discover Our Story",
  ctaLink = "/about",
  services = defaultServices,
}) => {
  const shortDescription = "At Shambala, we don't just construct buildings—we cultivate lasting legacies. Our philosophy is rooted in four unwavering pillars: respect for the environment, reverence for craftsmanship, dedication to human experience, and integrity.";
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
           <div data-gsap="btn-clip-bottom" className="hss-services-cta-wrapper-desktop">
             <AestheticButton className="essence-cta-btn" href={ctaLink}>
              {ctaText}
            </AestheticButton>
           </div>
          </div>
        </div>

        {/* Mobile CTA - appears after all cards */}
        <div data-gsap="btn-clip-bottom" className="hss-services-cta-wrapper-mobile">
          <AestheticButton className="essence-cta-btn" href={ctaLink}>
            {ctaText}
          </AestheticButton>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
