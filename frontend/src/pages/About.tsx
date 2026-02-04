import React from "react";

import AboutCompanyShowcase from "../components/About/AboutCompanyShowcase";
import Philosophy from "../components/About/Philosophy";
import NewHeroSection from "@/components/Home/NewHeroSection";

const About: React.FC = () => {
  return (
    <>
      <div id="about-hero" className="about-section about-section--hero">
        <NewHeroSection />
      </div>

      <section className="about-section about-section--philosophy">
        <Philosophy />
      </section>

      <section className="about-section about-section--company-showcase">
        <AboutCompanyShowcase />
      </section>
    </>
  );
};

export default About;
