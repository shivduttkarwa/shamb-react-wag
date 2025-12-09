import { useEffect, useRef } from "react";
import "./SelectedProjectsStack.css";

export default function SelectedProjectsStack() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const titlesInner = container.querySelector(
      ".prstack-titles-inner"
    ) as HTMLElement | null;
    const titles = Array.from(
      container.querySelectorAll(".prstack-title")
    ) as HTMLElement[];
    const sections = Array.from(
      container.querySelectorAll(".prstack-project-section")
    ) as HTMLElement[];
    const mask = container.querySelector(
      ".prstack-titles-mask"
    ) as HTMLElement | null;

    if (!titlesInner || !titles.length || !sections.length || !mask) return;

    const getCurrentTranslateY = () => {
      const style = window.getComputedStyle(titlesInner);
      const transform = style.transform || "";
      const match = transform.match(/matrix\(.*,\s*(-?\d+(\.\d+)?)\)$/);
      if (match && match[1]) {
        return parseFloat(match[1]);
      }
      // try translateY(xpx)
      const match2 = transform.match(/translateY\((-?\d+(\.\d+)?)px\)/);
      if (match2 && match2[1]) {
        return parseFloat(match2[1]);
      }
      return 0;
    };

    const setActive = (index: number) => {
      if (index < 0 || index >= titles.length) return;

      const activeTitle = titles[index];
      const maskRect = mask.getBoundingClientRect();
      const titleRect = activeTitle.getBoundingClientRect();

      const maskCenter = maskRect.top + maskRect.height / 2;
      const titleCenter = titleRect.top + titleRect.height / 2;
      const delta = maskCenter - titleCenter;

      const currentY = getCurrentTranslateY();
      const newY = currentY + delta;

      titlesInner.style.transform = `translateY(${newY}px)`;

      // state classes for opacity
      titles.forEach((t, i) => {
        t.classList.toggle("prstack-title--active", i === index);
        t.classList.toggle("prstack-title--next", i === index + 1);
        t.classList.toggle("prstack-title--prev", i === index - 1);
      });

      sections.forEach((sec, i) => {
        sec.classList.toggle("prstack-project-section--active", i === index);
      });
    };

    // IntersectionObserver picks the active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const sec = entry.target as HTMLElement;
          const index = sections.indexOf(sec);
          if (index !== -1) {
            setActive(index);
          }
        });
      },
      {
        root: null, // viewport
        threshold: 0.5, // ~center area
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    // initial centering on load (first title)
    const initTimeout = setTimeout(() => {
      setActive(0);
    }, 150);

    return () => {
      clearTimeout(initTimeout);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="prstack-root" ref={containerRef}>
      {/* HERO */}
      <section className="prstack-hero">
        <img
          src="https://images.unsplash.com/photo-1505842465776-3b4953ca4f44?auto=format&fit=crop&w=2000&q=80"
          alt="Hero"
        />
        <div className="prstack-hero-content">
          <h1>SELECTED PROJECTS</h1>
          <p>Architecture designed for human experience.</p>
        </div>
        <div className="prstack-scroll-cue">Scroll ↓</div>
      </section>

      {/* MAIN GRID */}
      <div className="prstack-container">
        {/* LEFT TITLES */}
        <div className="prstack-left">
          <div className="prstack-titles-mask">
            <div className="prstack-titles-inner">
              <div className="prstack-title">Beehive House</div>
              <div className="prstack-title">Broadway Loft</div>
              <div className="prstack-title">Ocean Parkway</div>
              <div className="prstack-title">Sequoia House</div>
              <div className="prstack-title">Son Del North</div>
            </div>
          </div>
        </div>

        {/* RIGHT PROJECTS */}
        <div className="prstack-right">
          <section className="prstack-project-section">
            <div className="prstack-project-img-wrap">
              <img
                className="prstack-project-img"
                src="https://images.prismic.io/andre-arch/Z6wzp5bqstJ9-gm9_BEEHIVE-EXT-2Bee.png?auto=format&fit=crop&w=2000&q=80"
                alt="Beehive House"
              />
            </div>
            <div className="prstack-caption">Beehive House — Accord, NY</div>
          </section>

          <section className="prstack-project-section">
            <div className="prstack-project-img-wrap">
              <img
                className="prstack-project-img"
                src="https://images.prismic.io/andre-arch/Z99gaHdAxsiBvxNk_718BRDWY-KITCHEN-ABSTRACT.png?auto=format&fit=crop&w=2000&q=80"
                alt="Broadway Loft"
              />
            </div>
            <div className="prstack-caption">Broadway Loft — New York, NY</div>
          </section>

          <section className="prstack-project-section">
            <div className="prstack-project-img-wrap">
              <img
                className="prstack-project-img"
                src="https://images.prismic.io/andre-arch/Z-HjnndAxsiBv2H4_CopyofOCEANPKWYEXT-1.jpg?auto=format&fit=crop&w=2000&q=80"
                alt="Ocean Parkway"
              />
            </div>
            <div className="prstack-caption">Ocean Parkway — New York, NY</div>
          </section>

          <section className="prstack-project-section">
            <div className="prstack-project-img-wrap">
              <img
                className="prstack-project-img"
                src="https://images.prismic.io/andre-arch/Z-6KNHdAxsiBwRrJ_SEQUOIA-FRONT1-EDIT.jpg?auto=format&fit=crop&w=2000&q=80"
                alt="Sequoia House"
              />
            </div>
            <div className="prstack-caption">Sequoia House — CA</div>
          </section>

          <section className="prstack-project-section">
            <div className="prstack-project-img-wrap">
              <img
                className="prstack-project-img"
                src="https://images.prismic.io/andre-arch/Z6LpFJbqstJ9-O8h_7%2BSonDelNorte.png?auto=format&fit=crop&w=2000&q=80"
                alt="Son Del North"
              />
            </div>
            <div className="prstack-caption">Son Del North — NY</div>
          </section>
        </div>
      </div>
    </div>
  );
}
