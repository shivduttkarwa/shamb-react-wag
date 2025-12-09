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
import { FormaServices } from "../components/Services/FormaServices";
// import TextVid from "../components/UI/TextVid";
import BodyRenderer from "../components/BodyRenderer";
import { useHome } from "../hooks/useHome";
import { SiteSettings } from "../services/api";

interface HomePageProps {
  settings: SiteSettings | null;
  animateHero?: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ settings: _, animateHero = true }) => {
  const { bodyBlocks } = useHome();

  console.log("HomePage bodyBlocks:", bodyBlocks);

  return (
    <>
      <div id="hero">
        <ModernHero animate={animateHero} />
      </div>
      <EssenceSection />
      <div id="services">
        <ServicesSection />
      </div>
      <ProjectModernSlider />
      <FormaServices />
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
