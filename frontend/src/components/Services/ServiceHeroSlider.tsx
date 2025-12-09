import { forwardRef, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../Home/HomeHeroSlider.css"; // Reuse the same styles

type ProjectSlide = {
  label: string;
  title: string;
  meta: string;
  link: string;
};

const ServiceHeroSlider = forwardRef<HTMLDivElement>((_, ref) => {
  const slides: ProjectSlide[] = useMemo(() => {
    const projects = [
      {
        title: "Clifftop Residence",
        tags: ["4 Bed", "Ocean View", "Split-Level", "Timber + Stone"],
      },
      {
        title: "Atrium Courtyard Home",
        tags: ["3 Bed", "Central Atrium", "Indoor/Outdoor", "Calm Palettes"],
      },
      {
        title: "Terraced Hillside Villa",
        tags: ["Multi-Level", "Panoramic Deck", "Pool", "Custom Joinery"],
      },
      {
        title: "Urban Loft Revival",
        tags: ["Loft", "Double Height", "Steel + Oak", "City View"],
      },
      {
        title: "Garden Pavilion House",
        tags: ["Pavilion Plan", "Courtyard", "Passive Cooling", "Light Screens"],
      },
    ];

    return projects.map((project) => ({
      label: "Recent Project",
      title: project.title,
      meta: project.tags.slice(0, 2).join(" • "),
      link: "/projects",
    }));
  }, []);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <div className="mh-ui-news" ref={ref}>
      <div className="hh-slider-window">
        <div
          className="hh-slider-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide) => (
            <div className="hh-slide" key={slide.title}>
              <div className="hh-label">{slide.label}</div>
              <div className="hh-title">{slide.title}</div>
              <div className="hh-meta">{slide.meta}</div>
              <Link to={slide.link} className="hh-read">
                View project →
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="hh-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            className={`hh-dot${i === index ? " active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
});

ServiceHeroSlider.displayName = "ServiceHeroSlider";

export default ServiceHeroSlider;
