// GsapSlider.tsx
import { FC, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltTextGsap from "../UI/TiltTextGsap";
import GlassButton from "../UI/GlassButton";
import "./GsapSlider.css";

gsap.registerPlugin(ScrollTrigger);

type ServiceSlide = {
  title: string;
  metaType: string;
  metaScope: string;
  description: string;
  image: string;
};

const serviceSlides: ServiceSlide[] = [
  {
    title: "Build a new house",
    metaType: "RESIDENTIAL",
    metaScope: "NEW BUILD",
    description:
      "From blank site to front door keys, we handle every detail of your new build – planning, structure and finishes – to create a home that feels tailored, calm and effortless from day one.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
  },
  {
    title: "Upgrade your house",
    metaType: "RESIDENTIAL",
    metaScope: "RENOVATION & ADDITIONS",
    description:
      "Open up dark rooms, add light, storage and flow. We rework layouts, extensions and finishes so your home feels fresh, functional and genuinely modern without losing its character.",
    image:
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=1920&q=80",
  },
  {
    title: "Build a commercial place",
    metaType: "COMMERCIAL",
    metaScope: "WORKPLACE & RETAIL",
    description:
      "Studios, showrooms and boutique offices designed to feel refined, practical and on-brand – spaces your clients remember and your team genuinely enjoys working in.",
    image:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1920&q=80",
  },
  {
    title: "Downsize your place",
    metaType: "LIFESTYLE",
    metaScope: "SMART DOWNSIZING",
    description:
      "Thoughtful layouts, warm materiality and clever storage so you can live with less, not compromise more – homes that are easier to maintain and a pleasure to live in.",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=80",
  },
];

const GsapSlider: FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(rootRef);

      const fsImageCover = q(".gs-fs-image-cover")[0] as HTMLDivElement | undefined;
      const fsLeft = q(".gs-fs-left")[0] as HTMLDivElement | undefined;
      const fsKicker = q(".gs-fs-kicker")[0] as HTMLElement | undefined;
      const fsTitle = q(".gs-fs-title")[0] as HTMLElement | undefined;
      const fsMetaType = q(".gs-fs-meta-type")[0] as HTMLElement | undefined;
      const fsMetaScope = q(".gs-fs-meta-scope")[0] as HTMLElement | undefined;
      const fsDesc = q(".gs-fs-description")[0] as HTMLElement | undefined;
      const fsMetaEl = q(".gs-fs-meta")[0] as HTMLElement | undefined;
      const fsCounterCurrent = q(".gs-fs-counter-current")[0] as HTMLElement | undefined;
      const fsImageCounter = q(".gs-fs-image-counter")[0] as HTMLElement | undefined;
      const fsImageCurrentText = q(".gs-fs-image-current-text")[0] as HTMLElement | undefined;
      const imgCurrentEl = q(".gs-fs-image-current")[0] as HTMLImageElement | undefined;
      const imgNextEl = q(".gs-fs-image-next")[0] as HTMLImageElement | undefined;
      const fsSection = q(".gs-fs-section")[0] as HTMLElement | undefined;
      const fsInner = q(".gs-fs-inner")[0] as HTMLElement | undefined;

      if (
        !fsImageCover ||
        !fsLeft ||
        !fsKicker ||
        !fsTitle ||
        !fsMetaType ||
        !fsMetaScope ||
        !fsDesc ||
        !fsMetaEl ||
        !fsCounterCurrent ||
        !fsImageCounter ||
        !fsImageCurrentText ||
        !imgCurrentEl ||
        !imgNextEl ||
        !fsSection ||
        !fsInner
      ) {
        return;
      }

      let fsTextIndex = 0;
      let fsLastTransitionIndex = -1;

      const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);

      const setTextInstant = (index: number) => {
        const slide = serviceSlides[index];
        if (!slide) return;

        fsTitle.textContent = slide.title;
        fsMetaType.textContent = slide.metaType;
        fsMetaScope.textContent = slide.metaScope;
        fsDesc.textContent = slide.description;

        const idxText = pad2(index + 1);
        fsCounterCurrent.textContent = idxText;
        fsImageCurrentText.textContent = idxText;
      };

      const animateTextSlide = (
        index: number,
        direction: "forward" | "backward"
      ) => {
        const slide = serviceSlides[index];
        if (!slide) return;

        const textEls = [fsKicker, fsTitle, fsMetaEl, fsDesc];
        const outY = direction === "forward" ? -20 : 20;
        const inFromY = direction === "forward" ? 20 : -20;

        gsap.to(textEls, {
          y: outY,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            setTextInstant(index);
            gsap.fromTo(
              textEls,
              { y: inFromY, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
                stagger: 0.04,
              }
            );
          },
        });
      };

      // Image transition: next grows from center over current
      const applyCenterExpand = (localT: number) => {
        const t = Math.min(Math.max(localT, 0), 1);
        const nextScale = 0.25 + 0.75 * t;
        const currentScale = 1 - 0.15 * t;
        const currentOpacity = 1 - 0.6 * t;
        const nextOpacity = t;

        gsap.set(imgCurrentEl, {
          scale: currentScale,
          opacity: currentOpacity,
        });
        gsap.set(imgNextEl, {
          scale: nextScale,
          opacity: nextOpacity,
        });
      };

      // initial content & images
      setTextInstant(0);
      imgCurrentEl.setAttribute("src", serviceSlides[0].image);
      if (serviceSlides[1]) {
        imgNextEl.setAttribute("src", serviceSlides[1].image);
      }
      gsap.set([imgCurrentEl, imgNextEl], { transformOrigin: "50% 50%" });
      gsap.set(imgCurrentEl, { yPercent: 0, scale: 1, opacity: 1 });
      gsap.set(imgNextEl, { yPercent: 0, scale: 0.25, opacity: 0 });

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          // 0 → shrinkEnd: full-bleed shrinks
          // shrinkEnd → slidesStart: half-width, slide 1 stays, no transitions
          // slidesStart → 1: slide transitions
          const shrinkEnd = 0.2;
          const slidesStart = 0.3;
          const transitionsCount = serviceSlides.length - 1;

          ScrollTrigger.create({
            trigger: fsSection,
            start: "top top",
            end: "+=600%",
            scrub: true,
            pin: fsInner,
            snap:
              transitionsCount > 0
                ? {
                    snapTo: (value: number) => {
                      const snapped =
                        Math.round(value * transitionsCount) / transitionsCount;
                      return Math.min(1, Math.max(0, snapped));
                    },
                    duration: 0.6,
                    ease: "power2.inOut",
                  }
                : undefined,
            onUpdate: (self) => {
              const p = self.progress;
              const clamped = Math.min(
                Math.max((p - slidesStart) / (1 - slidesStart), 0),
                1
              );
              const slideProgress = clamped * transitionsCount;
              const transitionIndex = Math.floor(slideProgress);
              const localT = slideProgress - transitionIndex;

              const currentIndex = transitionIndex;
              const nextIndex = transitionIndex + 1;

              if (transitionIndex !== fsLastTransitionIndex) {
                fsLastTransitionIndex = transitionIndex;
                imgCurrentEl.setAttribute(
                  "src",
                  serviceSlides[currentIndex].image
                );
                if (serviceSlides[nextIndex]) {
                  imgNextEl.setAttribute("src", serviceSlides[nextIndex].image);
                }
                setTextInstant(currentIndex);
              }

              if (p <= shrinkEnd) {
                const tSplit = Math.min(Math.max(p / shrinkEnd, 0), 1);
                const width = 100 - 50 * tSplit;
                const left = 0 + 50 * tSplit;

                gsap.set(fsImageCover, {
                  width: `${width}%`,
                  left: `${left}%`,
                });
              } else {
                gsap.set(fsImageCover, {
                  width: "50%",
                  left: "50%",
                });
              }

              applyCenterExpand(localT);

              const dominantIndex = localT < 0.5 ? currentIndex : nextIndex;

              if (dominantIndex !== fsTextIndex) {
                const direction =
                  dominantIndex > fsTextIndex ? "forward" : "backward";
                fsTextIndex = dominantIndex;
                animateTextSlide(dominantIndex, direction);
              }
            },
          });
        },
      });
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const first = serviceSlides[0];

  return (
    <div className="gs-forma-services" id="services-content" ref={rootRef}>
      <div className="gs-fs-heading">
        <TiltTextGsap
          tag="h2"
          className="section-title gs-fs-heading-title"
          startTrigger="top 75%"
          endTrigger="bottom 0%"
        >
          Forma Services
        </TiltTextGsap>
        <div className="gs-fs-heading-subtitle">
          Architecture, interiors, and landscapes crafted as one seamless story,
          guided by calm, warm materiality and precise detailing so every space
          feels thoughtful, livable, and enduring.
        </div>
      </div>
      <div className="gs-fs-section">
        <div className="gs-fs-inner">
          <div className="gs-fs-layout">
            <div className="gs-fs-left">
              <div>
                <div className="gs-fs-kicker">FORMA SERVICES</div>
                <h1 className="gs-fs-title">{first.title}</h1>

                <div className="gs-fs-meta">
                  <span className="gs-fs-meta-type">{first.metaType}</span>
                  <div className="gs-fs-dot" />
                  <span className="gs-fs-meta-scope">{first.metaScope}</span>
                </div>

                <div className="gs-fs-description">
                  {`${first.description} Every brief becomes a bespoke journey—more light, better flow, layered textures, and tailored joinery that quietly elevates daily life.`}
                </div>
              </div>

              <div>
                <div className="gs-fs-cta">
                  <GlassButton href="/projects">Talk to Forma</GlassButton>
                </div>
                <div className="gs-fs-counter">
                  <span className="gs-fs-counter-current">01</span> / {" "}
                  {serviceSlides.length.toString().padStart(2, "0")}
                </div>
              </div>
            </div>

            <div className="gs-fs-right-placeholder" />
          </div>

          <div className="gs-fs-image-cover">
            <div className="gs-fs-image-counter">
              <span className="gs-fs-image-current-text">01</span>
              <span> / {serviceSlides.length.toString().padStart(2, "0")}</span>
            </div>
            <div className="gs-fs-image-cover-inner">
              <img
                className="gs-fs-image gs-fs-image-current"
                src={first.image}
                alt={first.title}
              />
              <img
                className="gs-fs-image gs-fs-image-next"
                src={serviceSlides[1].image}
                alt={serviceSlides[1].title}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GsapSlider;
