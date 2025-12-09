// ServicesPage.tsx
import React from "react";
import "../components/Services/ServicePage.css";

import ServicePageBase from "../components/Services/ServicePageBase";
import ServiceHero from "../components/Services/ServiceHero";
import ServiceTestimonials from "../components/Services/ServiceTestimonials";
import TiltTextGsap from "../components/UI/TiltTextGsap";
import { ProcessSection } from "../components/Services/ProcessSection";
import StepSlider from "../components/Reusable/StepSlider";
import ModernServicesSlider from "../components/Home/ModernServicesSlider";

const ServicesPage: React.FC = () => {
  return (
    <ServicePageBase>
      <ServiceHero />

      {/* Content anchor for ScrollDownButton */}
      <div id="services-content" className="ser-section-heading">
        <TiltTextGsap tag="h2" className="ser-serif">
          Explore Our Services
        </TiltTextGsap>
        <p>
          Tailored residential and development services—from feasibility and
          planning to interiors and aftercare—delivered by Forma&apos;s
          integrated team.
        </p>
      </div>

      {/* Add other sections here as needed */}
      <ModernServicesSlider />, 
      * <ProcessSection />

      <ServiceTestimonials />

      // {/* <StepSlider /> */}
    </ServicePageBase>
  );
};

export default ServicesPage;
