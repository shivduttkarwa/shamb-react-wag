import React from "react";
import ModernHero from "../components/Reusable/ModernHero";
import {
  EssenceSection,
  PortfolioShowcase,
  FeaturedProperties,
  
} from "../components/Home";
import OurVisionSection from "../components/Home/OurVisionSection";
import CTASection from "../components/Home/CTASection";
import ServicesSection from "../components/Home/ServicesSection";
import BlogSection from "../components/Home/BlogSection";
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
        <ModernHero />
      </div>
      <EssenceSection />
      <div id="services">
        <ServicesSection />
      </div>
      <IWantToSection />
      
      <ProjectModernSlider />
      <ShambalaServices />
      <div id="projects">
        <PortfolioShowcase />
      </div>
      {/* <div id="projects">
        <TextVid />
      </div> */}

      <div id="vision">
        <OurVisionSection />
      </div>

      <FeaturedProperties />

      <BlogSection />

      <BodyRenderer blocks={bodyBlocks} />

      <div id="contact">
        <CTASection />
      </div>
    </>
  );
};

export default HomePage;
