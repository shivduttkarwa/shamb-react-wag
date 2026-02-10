// ServicesPage.tsx
import React, { useEffect, useRef } from "react";
import "../components/Services/ServicePage.css";

import ServicePageBase from "../components/Services/ServicePageBase";
import NewServicesHero from "../components/Services/NewServicesHero";
import ServiceTestimonials from "../components/Services/ServiceTestimonials";
import TiltTextGsap from "../components/UI/TiltTextGsap";
import { ProcessSection } from "../components/Services/ProcessSection";
import { initGsapSwitchAnimations } from "../lib/gsapSwitchAnimations";

import ModernServicesSlider from "../components/Home/ModernServicesSlider";

const ServicesPage: React.FC = () => {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return initGsapSwitchAnimations(headingRef.current || undefined);
  }, []);

  useEffect(() => {
    // Handle scroll to hash after animations
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 1200);
      }
    };

    scrollToHash();
  }, []);

  return (
    <ServicePageBase>
      <NewServicesHero />
      {/* Content anchor for ScrollDownButton */}
      <div
        id="services-content"
        className="ser-section-heading"
        ref={headingRef}
      >
        <TiltTextGsap
          tag="h2"
          className="ser-serif"
          startTrigger="top 85%"
          endTrigger="bottom 0%"
        >
          Explore Our Services
        </TiltTextGsap>
        <p data-gsap="fade-up" data-gsap-delay="0.1">
          Tailored residential and development services—from feasibility and
          planning to interiors and aftercare—delivered by shambala&apos;s
          integrated team.
        </p>
      </div>
      {/* Add other sections here as needed */}
      <ModernServicesSlider />
      <ProcessSection />
      <ServiceTestimonials />
      {/* <StepSlider /> */}
    </ServicePageBase>
  );
};

export default ServicesPage;
