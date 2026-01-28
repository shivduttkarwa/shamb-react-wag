import React from "react";
import ModernHero from "../components/Reusable/ModernHero";
import {
  EssenceSection,
 
  FeaturedProperties,
  QualityHomes,
 
  
} from "../components/Home";
import OurVisionSection from "../components/Home/OurVisionSection";
import CTASection from "../components/Home/CTASection";
import ServicesSection from "../components/Home/ServicesSection";

import ProjectModernSlider from "../components/Projects/ProjectModernSlider";
import ShambalaServices from
  "../components/Home/ShambalaServices";
// import TextVid from "../components/UI/TextVid";
import BodyRenderer from "../components/BodyRenderer";
import { useHome } from "../hooks/useHome";
import { SiteSettings } from "../services/api";
import IWantToSection from "@/components/Home/IWantToSection";

interface HomePageProps {
  settings: SiteSettings | null;
}

const HomePage: React.FC<HomePageProps> = ({ settings: _ }) => {
  const { bodyBlocks } = useHome();

  console.log("HomePage bodyBlocks:", bodyBlocks);

  return (
    <>
      <div id="hero">
        <div className="home-section home-section--hero">
          <ModernHero />
        </div>
      </div>
      <section className="home-section home-section--essence">
        <EssenceSection />
      </section>

      <section className="home-section home-section--iwant">
        <IWantToSection />
      </section>
      <div id="services" className="home-section home-section--services">
        <ServicesSection />
      </div>
      
      
      
      <section className="home-section home-section--projects">
        <ProjectModernSlider />
      </section>
      <section className="home-section home-section--shambala-services">
        <ShambalaServices />
      </section>

      <section>
        <QualityHomes />
      </section>
      
      {/* <div id="projects">
        <TextVid />
      </div> */}

      <div id="vision" className="home-section home-section--vision">
        <OurVisionSection />
      </div>

      <section className="home-section home-section--featured">
        <FeaturedProperties />
      </section>

      

      <BodyRenderer blocks={bodyBlocks} />

      <div id="contact" className="home-section home-section--contact">
        <CTASection />
      </div>
    </>
  );
};

export default HomePage;
