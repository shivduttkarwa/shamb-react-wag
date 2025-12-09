import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FSerList.css";

gsap.registerPlugin(ScrollTrigger);

const publicUrl = import.meta.env.BASE_URL || "/";

interface Project {
  title: string;
  image: string;
  caption: string;
}

const projects: Project[] = [
  {
    title: "Modern Villa",
    image: `${publicUrl}images/l11.jpg`,
    caption: "Modern Villa — Melbourne, VIC"
  },
  {
    title: "Urban Loft",
    image: `${publicUrl}images/l4.jpg`,
    caption: "Urban Loft — Sydney, NSW"
  },
  {
    title: "Coastal Home",
    image: `${publicUrl}images/l5.jpg`,
    caption: "Coastal Home — Byron Bay, NSW"
  },
  {
    title: "Garden House",
    image: `${publicUrl}images/l6.jpg`,
    caption: "Garden House — Adelaide, SA"
  },
  {
    title: "City Penthouse",
    image: `${publicUrl}images/l8.jpg`,
    caption: "City Penthouse — Perth, WA"
  }
];

const FSerList: React.FC = () => {
  const titleTrackRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const titlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!titleTrackRef.current) return;

    const sections = sectionsRef.current;
    const titles = titlesRef.current;
    const track = titleTrackRef.current;

    if (sections.length === 0 || titles.length === 0) return;

    const step = titles[1]?.getBoundingClientRect().top - titles[0]?.getBoundingClientRect().top || 0;

    // Force initial perfect center
    gsap.set(track, { y: 60 });

    function setActive(i: number) {
      gsap.to(track, {
        y: -step * i + 60,
        duration: 1.4,
        ease: "cubic-bezier(.16,.69,.11,1)",
      });

      titles.forEach((t, idx) => {
        t.classList.remove("fsl-is-active", "fsl-is-next", "fsl-is-prev");
        if (idx === i) t.classList.add("fsl-is-active");
        if (idx === i + 1) t.classList.add("fsl-is-next");
        if (idx === i - 1) t.classList.add("fsl-is-prev");
      });
    }

    setActive(0);

    const triggers: ScrollTrigger[] = [];

    sections.forEach((sec, index) => {
      const trigger = ScrollTrigger.create({
        trigger: sec,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          setActive(index);
          sec.classList.add("fsl-is-active");
        },
        onEnterBack: () => {
          setActive(index);
          sec.classList.add("fsl-is-active");
        },
        onLeave: () => sec.classList.remove("fsl-is-active"),
        onLeaveBack: () => sec.classList.remove("fsl-is-active"),
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  const addToSectionsRef = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const addToTitlesRef = (el: HTMLDivElement | null) => {
    if (el && !titlesRef.current.includes(el)) {
      titlesRef.current.push(el);
    }
  };

  return (
    <div className="fsl-component">
      <div className="fsl-container">
        {/* LEFT */}
        <div className="fsl-left">
          <div className="fsl-titles-mask">
            <div className="fsl-titles-inner" ref={titleTrackRef}>
              {projects.map((project, index) => (
                <div 
                  key={index}
                  className="fsl-title" 
                  ref={addToTitlesRef}
                >
                  {project.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT IMAGES */}
        <div className="fsl-right">
          {projects.map((project, index) => (
            <section 
              key={index}
              className="fsl-project-section" 
              ref={addToSectionsRef}
            >
              <div className="fsl-project-img-wrap">
                <img
                  className="fsl-project-img"
                  src={project.image}
                  alt={project.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `${publicUrl}images/l1.jpg`;
                  }}
                />
              </div>
              <div className="fsl-caption">{project.caption}</div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FSerList;