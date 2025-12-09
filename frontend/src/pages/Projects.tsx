import React from "react";
import ProjectsHero from "../components/Projects/ProjectsHero";

import ProjectsSlider from "../components/Projects/ProjectsSlider";

import ProjectModernSlider from "@/components/Projects/ProjectModernSlider";
import ProjectsShowcase from "../components/Projects/ProjectsShowcase";
import GridGallery from "@/components/Reusable/GridGallery";
import StepSlider from "@/components/Reusable/StepSlider";
import AnimatedGallerySlider from "../components/Home/AnimatedGallerySlider";
import PortfolioShowcase, {
  ShowcaseProject,
} from "../components/Home/PortfolioShowcase";

const publicUrl = import.meta.env.BASE_URL || "/";
const getImage = (name: string) =>
  publicUrl.endsWith("/")
    ? `${publicUrl}images/${name}`
    : `${publicUrl}/images/${name}`;

const projectSlides: ShowcaseProject[] = [
  {
    title: "Clifftop Residence",
    bg: getImage("l11.jpg"),
    thumb: getImage("port1.jpg"),
    tags: ["4 Bed", "Ocean View", "Split-Level", "Timber + Stone"],
    link: "/projects",
  },
  {
    title: "Atrium Courtyard Home",
    bg: getImage("l8.jpg"),
    thumb: getImage("l5.jpg"),
    tags: ["3 Bed", "Central Atrium", "Indoor/Outdoor", "Calm Palettes"],
    link: "/projects",
  },
  {
    title: "Terraced Hillside Villa",
    bg: getImage("l3.jpg"),
    thumb: getImage("l2.jpg"),
    tags: ["Multi-Level", "Panoramic Deck", "Pool", "Custom Joinery"],
    link: "/projects",
  },
  {
    title: "Urban Loft Revival",
    bg: getImage("l4.jpg"),
    thumb: getImage("l1.jpg"),
    tags: ["Loft", "Double Height", "Steel + Oak", "City View"],
    link: "/projects",
  },
  {
    title: "Garden Pavilion House",
    bg: getImage("port3.jpg"),
    thumb: getImage("port1.jpg"),
    tags: ["Pavilion Plan", "Courtyard", "Passive Cooling", "Light Screens"],
    link: "/projects",
  },
];

const Projects: React.FC = () => {
  return (
    <>
      <ProjectsHero />
      <ProjectsSlider />
      <ProjectsShowcase />
      <PortfolioShowcase
        projects={projectSlides}
        heading="Signature Commissions"
        ctaText="View All Projects"
        ctaHref="/projects"
      />
      {/* <ProjectModernSlider /> */}
      <AnimatedGallerySlider />
    </>
  );
};

export default Projects;
