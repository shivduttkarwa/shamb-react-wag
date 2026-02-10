import React, { useEffect } from "react";

import AboutCompanyShowcase from "../components/About/AboutCompanyShowcase";
import Philosophy from "../components/About/Philosophy";
import NewHeroSection from "@/components/Home/NewHeroSection";

const About: React.FC = () => {
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
    <>
      <div id="about-hero" className="about-section about-section--hero">
        <NewHeroSection />
      </div>

      <section id="philosophy" className="about-section about-section--philosophy">
        <Philosophy />
      </section>

      <section id="approach" className="about-section about-section--company-showcase">
        <AboutCompanyShowcase />
      </section>
    </>
  );
};

export default About;
