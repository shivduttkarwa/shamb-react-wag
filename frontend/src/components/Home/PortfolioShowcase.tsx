import React, { useEffect, useRef } from "react";
import "./PortfolioShowcase.css";
import GlassButton from "../UI/GlassButton";
import TiltTextGsap from "../UI/TiltTextGsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const publicUrl = import.meta.env.BASE_URL || "/";

gsap.registerPlugin(ScrollTrigger);

const getImagePath = (imageName: string) => {
  return publicUrl.endsWith("/")
    ? `${publicUrl}images/${imageName}`
    : `${publicUrl}/images/${imageName}`;
};

export interface ShowcaseProject {
  title: string;
  bg: string;
  thumb: string;
  tags: string[];
  link?: string;
}

interface PortfolioShowcaseProps {
  projects?: ShowcaseProject[];
  heading?: string;
  ctaText?: string;
  ctaHref?: string;
}

const defaultProjects: ShowcaseProject[] = [
  {
    title: "Modern Zen Retreat",
    bg: getImagePath("prs1.jpg"),
    thumb: getImagePath("port1.jpg"),
    tags: ["3 Bed", "2 Bath", "1,800 Sqft", "Garden View"],
  },
  {
    title: "Luxury Villa Estate",
    bg: getImagePath("l8.jpg"),
    thumb: getImagePath("5.jpg"),
    tags: ["4 Bed", "3.5 Bath", "2,500 Sqft", "Pool", "Premium"],
  },
  {
    title: "Cozy Family Home",
    bg: getImagePath("port3.jpg"),
    thumb: getImagePath("project2.jpg"),
    tags: ["2 Bed", "2 Bath", "1,200 Sqft", "Family Friendly", "Affordable"],
  },
  {
    title: "Contemporary Loft",
    bg: getImagePath("l3.jpg"),
    thumb: getImagePath("l1.jpg"),
    tags: ["1 Bed", "1 Bath", "900 Sqft", "City View", "Modern"],
  },
  {
    title: "Suburban Dream House",
    bg: getImagePath("l2.jpg"),
    thumb: getImagePath("l3.jpg"),
    tags: ["5 Bed", "4 Bath", "3,200 Sqft", "Garage", "Luxury"],
  },
];

const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  projects = defaultProjects,
  heading = "PROJECTS",
  ctaText = "See More Projects",
  ctaHref = "/projects",
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const featureSection = sectionRef.current;
    if (!featureSection) return;

    // Add class to body to allow overflow for sticky behavior
    document.body.classList.add("portfolio-active");

    // PARALLAX – fully scoped to .project-feature
    const parallaxImages = featureSection.querySelectorAll<HTMLImageElement>(
      ".project > figure > img[data-speed]"
    );

    // Performance optimization variables
    let ticking = false;
    let lastScrollY = 0;

    function handleParallax() {
      if (!parallaxImages.length) return;

      const currentScrollY = window.scrollY;

      // Skip if scroll change is minimal (reduces calculations)
      if (Math.abs(currentScrollY - lastScrollY) < 2) return;
      lastScrollY = currentScrollY;

      if (!ticking) {
        requestAnimationFrame(() => {
          const viewportHeight = window.innerHeight;

          parallaxImages.forEach((img) => {
            const rect = img.getBoundingClientRect();
            const imgCenter = rect.top + rect.height / 2;
            const distanceFromCenter = imgCenter - viewportHeight / 2;

            const speed = parseFloat(img.dataset.speed || "0.25");

            // Convert distance to a translate percentage for smoother feeling
            const translateY =
              (-distanceFromCenter / viewportHeight) * 100 * speed;

            // Use hardware acceleration
            img.style.transform = `translate3d(0, ${translateY}%, 0) scale(1.05)`;
          });

          ticking = false;
        });
        ticking = true;
      }
    }

    // Use passive listeners for better scroll performance
    window.addEventListener("scroll", handleParallax, { passive: true });
    window.addEventListener("load", handleParallax);
    window.addEventListener("resize", handleParallax);

    // Initial run
    handleParallax();

    // Animate title
    const titleLines = titleRef.current?.querySelectorAll(".line");
    if (titleLines && titleLines.length > 0) {
      gsap.set(titleLines, { yPercent: 100 });
      gsap.to(titleLines, {
        yPercent: 0,
        duration: 1.8,
        stagger: 0.8,
        ease: "power1.out",
        scrollTrigger: {
          trigger: featureSection,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }

    return () => {
      // Remove class from body
      document.body.classList.remove("portfolio-active");

      window.removeEventListener("scroll", handleParallax);
      window.removeEventListener("load", handleParallax);
      window.removeEventListener("resize", handleParallax);
    };
  }, []);

  return (
    <section className="project-feature" ref={sectionRef}>
      <div className="block-text">
        <div className="block-text-col">
          <TiltTextGsap
            tag="h3"
            startTrigger="top 70%"
            endTrigger="bottom -10%"
          >
            {heading}
          </TiltTextGsap>
        </div>
      </div>

      <div className="projects-wrapper">
        {projects.map((project) => (
          <a href={project.link || "#"} className="project" key={project.title}>
            <figure>
              <img
                src={project.bg}
                alt={`${project.title} Background`}
                data-speed="0.25"
              />
            </figure>
            <div className="content">
              <div className="sticky">
                <div className="info-wrapper">
                  <h2>{project.title}</h2>
                  <div className="tag-wrapper">
                    {project.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="image-wrapper">
                  <figure>
                    <img
                      src={project.thumb}
                      alt={`${project.title} Interior`}
                    />
                  </figure>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="cta-wrapper">
        <GlassButton href={ctaHref}>{ctaText}</GlassButton>
      </div>
    </section>
  );
};

export default PortfolioShowcase;
