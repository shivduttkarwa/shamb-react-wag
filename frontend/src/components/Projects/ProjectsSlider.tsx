import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltTextGsap from "../UI/TiltTextGsap";
import "./ProjectsSlider.css";

gsap.registerPlugin(ScrollTrigger);

type ServiceCard = {
  title: string;
  desc: string;
  bg: string;
  thumb: string;
  cta: string;
  link: string;
};

const publicUrl = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
const asset = (path: string) => `${publicUrl}${path.replace(/^\/+/, "")}`;

const CARDS: ServiceCard[] = [
  {
    title: "Luxury Villa in Brighton",
    desc: "Modern villa with ocean views, clean lines, and sunlit open spaces.",
    bg: asset("images/l1.jpg"),
    thumb: asset("images/sm1.jpg"),
    cta: "View Project",
    link: "/projects/luxury-villa-brighton",
  },
  {
    title: "Contemporary Family Home",
    desc: "Open-plan family home built with warm tones and sustainable finishes.",
    bg: asset("images/l2.jpg"),
    thumb: asset("images/sm2.jpg"),
    cta: "View Project",
    link: "/projects/contemporary-family-home",
  },
  {
    title: "Urban Penthouse Renovation",
    desc: "City penthouse makeover with premium details and skyline views.",
    bg: asset("images/l3.jpg"),
    thumb: asset("images/sm3.jpg"),
    cta: "View Project",
    link: "/projects/urban-penthouse-renovation",
  },
  {
    title: "Heritage Estate Restoration",
    desc: "Historic estate refreshed—character preserved, comfort upgraded.",
    bg: asset("images/l4.jpg"),
    thumb: asset("images/sm4.jpg"),
    cta: "View Project",
    link: "/projects/heritage-estate-restoration",
  },
  {
    title: "Eco-Friendly Townhouse",
    desc: "Eco townhouse with green tech and light-filled living.",
    bg: asset("images/l5.jpg"),
    thumb: asset("images/sm5.jpg"),
    cta: "View Project",
    link: "/projects/eco-friendly-townhouse",
  },
  {
    title: "Coastal Retreat Escape",
    desc: "Breezy retreat with layered decks, soft light, and ocean-calming interiors.",
    bg: asset("images/l6.jpg"),
    thumb: asset("images/l6.jpg"),
    cta: "View Project",
    link: "/projects/coastal-retreat-escape",
  },
  {
    title: "Hillside Garden Home",
    desc: "Terraced living with lush courtyards, warm timber, and sweeping views.",
    bg: asset("images/l8.jpg"),
    thumb: asset("images/l8.jpg"),
    cta: "View Project",
    link: "/projects/hillside-garden-home",
  },
  {
    title: "Modern Courtyard Residence",
    desc: "Minimal lines, sculpted light, and a tranquil courtyard at the heart.",
    bg: asset("images/l11.jpg"),
    thumb: asset("images/l11.jpg"),
    cta: "View Project",
    link: "/projects/modern-courtyard-residence",
  },
];

const ProjectsSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width:767px)").matches
      : false
  );

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.matchMedia("(max-width:767px)").matches);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const centerCard = (index: number) => {
    const wrap = sliderRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;

    if (isMobile) {
      const start = card.offsetTop;
      const size = card.clientHeight;
      const wrapSize = wrap.clientHeight;
      wrap.scrollTo({
        top: start - (wrapSize / 2 - size / 2),
        behavior: "smooth",
      });
    } else {
      const start = card.offsetLeft;
      const size = card.clientWidth;
      const wrapSize = wrap.clientWidth;
      wrap.scrollTo({
        left: start - (wrapSize / 2 - size / 2),
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    centerCard(activeIndex);
  }, [activeIndex, isMobile]);

  const goTo = (index: number) => {
    if (index < 0 || index >= CARDS.length) return;
    if (index === activeIndex) return;
    setActiveIndex(index);
  };

  const goStep = (step: number) => {
    goTo(activeIndex + step);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      goStep(1);
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      goStep(-1);
    }
  };

  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;

    const threshold = 60;

    if (isMobile) {
      if (Math.abs(dy) > threshold) {
        goStep(dy > 0 ? -1 : 1);
      }
    } else {
      if (Math.abs(dx) > threshold) {
        goStep(dx > 0 ? -1 : 1);
      }
    }
  };

  return (
    <section
      className="pr-projects-slider-section"
      id="projects-slider"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      ref={sectionRef}
    >
      <div className="pr-head">
        <TiltTextGsap
          tag="h1"
          className="pr-projects-slider-title"
          startTrigger="top 70%"
          endTrigger="bottom -10%"
        >
          Our Projects
        </TiltTextGsap>
      </div>

      <div
        className="pr-slider"
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="pr-track" id="track" ref={trackRef}>
          {CARDS.map((card, index) => (
            <article
              key={card.title}
              className="pr-project-card"
              data-active={index === activeIndex}
              onMouseEnter={() => {
                if (window.matchMedia("(hover:hover)").matches) {
                  goTo(index);
                }
              }}
              onClick={() => goTo(index)}
            >
              <img
                className="pr-project-card__bg"
                src={card.bg}
                alt={card.title}
              />
              <div className="pr-project-card__content">
                <div>
                  <h3 className="pr-project-card__title">{card.title}</h3>
                  <p className="pr-project-card__desc">{card.desc}</p>
                  <Link to={card.link} className="pr-project-card__btn">
                    {card.cta}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {!isMobile && (
        <div className="pr-dots" id="dots">
          {CARDS.map((card, index) => (
            <span
              key={card.title}
              className={"pr-dot" + (index === activeIndex ? " pr-active" : "")}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectsSlider;
