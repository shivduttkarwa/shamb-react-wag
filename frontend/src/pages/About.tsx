import React from "react";
import AboutDetails from "../components/About/AboutDetails";
import NewHeroSection from "../components/Home/NewHeroSection";

const About: React.FC = () => {
  return (
    <>
      <NewHeroSection />
      <AboutDetails />
    </>
  );
};

export default About;
