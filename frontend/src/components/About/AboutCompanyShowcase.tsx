import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./AboutCompanyShowcase.css";
import ReadMoreButton from "../UI/ReadMoreButton";
import TiltTextGsap from "../UI/TiltTextGsap";

const publicUrl = import.meta.env.BASE_URL || "/";

const getImagePath = (imageName: string) =>
  publicUrl.endsWith("/") ? `${publicUrl}images/${imageName}` : `${publicUrl}/images/${imageName}`;

type ShowcaseCard = {
  title: string;
  body: string;
  color: string;
};

type ShowcasePanel = {
  title: string;
  bg: string;
  cards: ShowcaseCard[];
  sideColor: string;
  sideTitle: string;
  sideDescription: string;
  bullets: string[];
  ctas: { text: string; href: string }[];
};

const panels: ShowcasePanel[] = [
  {
    title: "The Studio",
    sideColor: "#ffd6d9",
    bg: getImagePath("l1.jpg"),
    cards: [
      {
        title: "New Home Architecture",
        body: "Site‑responsive homes shaped by light, flow, and long‑term livability. We align planning, materials, and detailing so your build is clear and calm from day one.",
        color: "#ffe66d",
      },
    ],
    sideTitle: "A fresh studio",
    sideDescription:
      "We are a new architecture and build studio delivering thoughtful homes that feel tailored, livable, and enduring. Every brief is crafted with clarity, precision, and care.",
    bullets: [
      "Design-led from first sketch to final detail",
      "Material palettes that balance warmth and durability",
      "Build support to protect the design intent",
    ],
    ctas: [{ text: "Start a Project", href: "/new-contact" }],
  },
  {
    title: "Our Method",
    sideColor: "#cfe8ff",
    bg: getImagePath("l4.jpg"),
    cards: [
      {
        title: "Design Method",
        body: "We translate your goals into clear spatial strategies, refined concepts, and build‑ready documentation that keeps decisions simple and confident.",
        color: "#c7ceea",
      },
    ],
    sideTitle: "Clear process",
    sideDescription:
      "We keep the process transparent and collaborative, balancing creative ideas with buildable solutions so every decision feels informed and steady.",
    bullets: [
      "Clear milestones and approvals",
      "Practical detailing and builder-ready drawings",
      "Ongoing support through construction",
    ],
    ctas: [{ text: "Book a Call", href: "/new-contact" }],
  },
  {
    title: "Design Ethos",
    sideColor: "#e9ddff",
    bg: getImagePath("l2.jpg"),
    cards: [
      {
        title: "Design Ethos",
        body: "Human‑scaled layouts, generous light, and tactile materials that feel warm, quiet, and timeless—without sacrificing function.",
        color: "#ff8b94",
      },
    ],
    sideTitle: "Effortless homes",
    sideDescription:
      "We focus on the quiet details—proportion, texture, and transitions—so the home feels grounded, warm, and easy to live in every day.",
    bullets: [
      "Human-scaled, practical layouts",
      "Natural palettes with long-term durability",
      "Details resolved early to avoid surprises",
    ],
    ctas: [{ text: "See Our Process", href: "/services" }],
  },
  {
    title: "Build Support",
    sideColor: "#dff4e1",
    bg: getImagePath("l3.jpg"),
    cards: [
      {
        title: "Build Support",
        body: "Consultant coordination, tender clarity, and site support that protects the design intent from approvals through handover.",
        color: "#ffe66d",
      },
    ],
    sideTitle: "Built right",
    sideDescription:
      "We stay involved through construction, coordinating consultants, resolving details, and supporting the builder so the outcome matches the vision.",
    bullets: [
      "Tender-ready documentation",
      "Responsive design decisions during build",
      "Final handover support",
    ],
    ctas: [{ text: "Talk to Us", href: "/new-contact" }],
  },
  {
    title: "Aftercare",
    sideColor: "#d6d0c5",
    bg: getImagePath("l5.jpg"),
    cards: [
      {
        title: "Aftercare + Styling",
        body: "Final styling, furnishing guidance, and post‑handover tweaks so your home feels complete and stays aligned as life evolves.",
        color: "#ffdac1",
      },
    ],
    sideTitle: "Aftercare",
    sideDescription:
      "After move-in, we’re still here to refine, adjust, and help your home evolve as your life changes.",
    bullets: [
      "Post-handover adjustments",
      "Furniture and styling guidance",
      "Future renovations or add-ons",
    ],
    ctas: [{ text: "Book a Styling Call", href: "/new-contact" }],
  },
];

const AboutCompanyShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const featureSection = sectionRef.current;
    if (!featureSection) return;

    document.body.classList.add("about-showcase-active");

    const parallaxImages = featureSection.querySelectorAll<HTMLImageElement>(
      ".company-panel > figure > img[data-speed]"
    );

    let ticking = false;
    let lastScrollY = 0;

    function handleParallax() {
      if (!parallaxImages.length) return;

      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) < 2) return;
      lastScrollY = currentScrollY;

      if (!ticking) {
        requestAnimationFrame(() => {
          const viewportHeight = window.innerHeight;

          parallaxImages.forEach((img) => {
            const rect = img.getBoundingClientRect();
            const imgCenter = rect.top + rect.height / 2;
            const distanceFromCenter = imgCenter - viewportHeight / 2;
            const speed = parseFloat(img.dataset.speed || "0.22");

            const translateY =
              (-distanceFromCenter / viewportHeight) * 100 * speed;

            img.style.transform = `translate3d(0, ${translateY}%, 0) scale(1.05)`;
          });

          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", handleParallax, { passive: true });
    window.addEventListener("load", handleParallax);
    window.addEventListener("resize", handleParallax);

    handleParallax();

    return () => {
      document.body.classList.remove("about-showcase-active");
      window.removeEventListener("scroll", handleParallax);
      window.removeEventListener("load", handleParallax);
      window.removeEventListener("resize", handleParallax);
    };
  }, []);

  return (
    <section className="company-showcase" ref={sectionRef}>
      <div className="company-showcase-heading">
        <TiltTextGsap tag="h3" startTrigger="top 70%" endTrigger="bottom -10%">
          The Shambala Approach
        </TiltTextGsap>
        <p
          data-gsap="fade-up"
          data-gsap-delay="0.1"
          className="company-showcase-subtitle"
        >
          A clear, design-led way of working—crafted for new builds, thoughtful
          renovations, and enduring interiors.
        </p>
      </div>

      <div className="company-panels">
        {panels.map((panel) => (
          <div className="company-panel" key={panel.title}>
            <figure>
              <img src={panel.bg} alt={panel.title} data-speed="0.22" />
              <div className="company-panel-overlay" />
            </figure>

            <div className="company-panel-content">
              <div className="company-panel-sticky">
                <div className="company-panel-cards">
                  {panel.cards.map((card, idx) => (
                    <div
                      key={card.title}
                      className={`company-card company-card-${idx === 0 ? "left" : "right"}`}
                      style={{ backgroundColor: card.color }}
                    >
                      <h4>{card.title}</h4>
                      <p>{card.body}</p>
                    </div>
                  ))}
                </div>

                <div
                  className="company-panel-side"
                  style={{ backgroundColor: panel.sideColor }}
                >
                  <span className="company-panel-kicker">{panel.title}</span>
                  <h2>{panel.sideTitle}</h2>
                  <p>{panel.sideDescription}</p>
                  <ul>
                    {panel.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="company-panel-ctas">
                    {panel.ctas.map((cta) => (
                      <ReadMoreButton
                        key={cta.text}
                        href={cta.href}
                        text={cta.text}
                        size="card"
                        className="company-panel-cta"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutCompanyShowcase;
