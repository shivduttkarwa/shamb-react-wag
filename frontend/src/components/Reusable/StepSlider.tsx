import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./StepSlider.css";

const publicUrl = import.meta.env.BASE_URL || "/";

gsap.registerPlugin(ScrollTrigger);

type Slide = {
  image: string;
  counter: string;
  title: string;
  highlight?: string;
  text: string;
};

const slidesData: Slide[] = [
  {
    image: `${publicUrl}images/l11.jpg`,
    counter: "01",
    title: "“Their vision reshaped our home.”",
    highlight: "Sarah & Michael · Modern Residence",
    text: "From the first sketch to the final walk-through, the team guided us with clarity and warmth. Our home now feels calm, intentional, and timeless.",
  },
  {
    image: `${publicUrl}images/l4.jpg`,
    counter: "02",
    title: "“Precision and care in every detail.”",
    highlight: "James R. · Creative Studio",
    text: "They understood our brand instantly. The interiors inspire clients and our team daily—light, material, and flow are all in harmony.",
  },
  {
    image: `${publicUrl}images/l5.jpg`,
    counter: "03",
    title: "“A partner through every stage.”",
    highlight: "Anita & Vikram · Multi-Dwelling",
    text: "Feasibility, approvals, interiors—the whole journey felt seamless. We always knew the next step and why it mattered for the outcome.",
  },
  {
    image: `${publicUrl}images/l6.jpg`,
    counter: "04",
    title: "“Luxury without the noise.”",
    highlight: "Clara W. · Penthouse",
    text: "Sophisticated finishes, quiet technology, and a layout that just works. It feels indulgent yet effortless—a balance we didn’t think possible.",
  },
  {
    image: `${publicUrl}images/l8.jpg`,
    counter: "05",
    title: "“Designed for life and light.”",
    highlight: "Chen Family · Coastal House",
    text: "Natural light, ventilation, and materials were all considered. The home is beautiful, but more importantly, it feels deeply livable.",
  },
  {
    image: `${publicUrl}images/pexels-asphotography-94818.jpg`,
    counter: "06",
    title: "“An experience, not just a project.”",
    highlight: "Leo & Priya · Country Retreat",
    text: "Weekly check-ins, clear visuals, and a team that listened. We felt involved and cared for, and the result is a retreat we love to share.",
  },
];

const StepSlider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const dotsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const stepSlider = sliderRef.current;
    if (!stepSlider) return;

    const cards = cardsRef.current;
    const dots = dotsRef.current;
    const totalCards = cards.length;
    if (totalCards === 0) return;

    const maxIndex = totalCards - 1; // last slide index

    // Pause while slide is in view (quick in/out, good sitting time)
    const pauseStart = 0.3;
    const pauseEnd = 0.7;
    const normalize = (p: number) => {
      if (p <= pauseStart) return 0;
      if (p >= pauseEnd) return 1;
      return (p - pauseStart) / (pauseEnd - pauseStart);
    };

    const updateCards = (progress: number) => {
      // progress: 0 → 1  maps to index: 0 → maxIndex
      const totalProgress = progress * maxIndex;

      cards.forEach((card, index) => {
        if (index === 0) {
          // FIRST CARD STACKING OUT
          const norm = normalize(Math.max(0, Math.min(1, totalProgress)));
          const stackPosition = norm * 2;
          card.style.transform = `
            translateZ(-${stackPosition * 100}px)
            rotateX(-${stackPosition * 5}deg)
            scale(${1 - stackPosition * 0.025})
          `;
          card.style.opacity = (
            1 - Math.min(1, Math.max(0, norm / 2))
          ).toString();
          card.style.zIndex = "100";
        } else {
          const shiftedIndex = index - 1;
          const cardStart = shiftedIndex; // when this slide starts to enter
          const cardEnd = shiftedIndex + 1; // when this slide finishes entering

          let cardProgress =
            (totalProgress - cardStart) / (cardEnd - cardStart);
          cardProgress = Math.max(0, Math.min(1, cardProgress));
          const t = normalize(cardProgress);

          if (totalProgress < cardStart) {
            // Waiting below viewport
            const waitDistance = (cardStart - totalProgress) * 5;
            card.style.transform = `
              translateY(${100 + waitDistance}vh)
              rotateX(-12deg)
              scale(${0.85 - waitDistance * 0.01})
            `;
            card.style.opacity = "0";
            card.style.zIndex = index.toString();
          } else if (totalProgress >= cardStart && totalProgress < cardEnd) {
            // Active slide moving into place
            const yProgress = 1 - t;
            const rotation = -12 + t * 12;
            const scale = 0.85 + t * 0.15;

            card.style.transform = `
              translateY(${yProgress * 100}vh)
              rotateX(${rotation}deg)
              scale(${scale})
            `;
            card.style.opacity = "1";
            card.style.zIndex = (100 + index).toString();
          } else {
            // AFTER its slot is done
            if (index === maxIndex) {
              // LAST SLIDE: KEEP IT FULL, NO SHRINK
              card.style.transform = `
                translateY(0vh)
                rotateX(0deg)
                scale(1)
              `;
              card.style.opacity = "1";
              card.style.zIndex = (100 + index).toString();
            } else {
              // Older slides fade back into stack
              const stackPosition = (totalProgress - cardEnd) * 2;
              card.style.transform = `
                translateZ(-${stackPosition * 200}px)
                rotateX(-${stackPosition * 10}deg)
                scale(${1 - stackPosition * 0.05})
              `;
              card.style.opacity = (
                1 - Math.min(1, Math.max(0, (totalProgress - index) / 2))
              ).toString();
              card.style.zIndex = (100 + index).toString();
            }
          }
        }
      });

      const activeIndex = Math.round(totalProgress); // snap to nearest slide
      dots.forEach((dot, i) => {
        dot.classList.toggle("ssl-is-active", i === activeIndex);
      });
    };

    // Initial positions
    cards.forEach((card, index) => {
      if (index === 0) {
        card.style.transform = "translateY(0) rotateX(0deg) scale(1)";
        card.style.opacity = "1";
        card.style.zIndex = "100";
      } else {
        const waitDistance = (index - 1) * 5;
        card.style.transform = `
          translateY(${100 + waitDistance}vh)
          rotateX(-12deg)
          scale(${0.85 - waitDistance * 0.01})
        `;
        card.style.opacity = "0";
        card.style.zIndex = index.toString();
      }
    });

    const slidesCount = slidesData.length;

    // EXACT distance: (N - 1) * viewport → no extra gap after last slide
    const scrollDistance =
      (slidesCount > 1 ? slidesCount - 1 : 1) * window.innerHeight;

    // Snap per slide (1 step per slide). Using maxIndex so 0 → 1 is 0 → lastIndex.
    const snap =
      slidesCount > 1
        ? {
            snapTo: (value: number) => {
              const step = 1 / maxIndex;
              const snapped = Math.round(value / step) * step;
              return Math.min(1, Math.max(0, snapped));
            },
            duration: 0.3,
            ease: "power2.out",
          }
        : undefined;

    const st = ScrollTrigger.create({
      trigger: stepSlider,
      start: "top top",
      end: () => `+=${scrollDistance}`,
      scrub: true, // still tied to scroll
      pin: true,
      snap,
      onUpdate: (self) => {
        updateCards(self.progress);
      },
      onLeave: () => {
        // we are leaving at progress = 1, last slide full, then immediately next section
        updateCards(1);
      },
      onLeaveBack: () => {
        updateCards(0);
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const addToCardsRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const addToDotsRef = (el: HTMLDivElement | null) => {
    if (el && !dotsRef.current.includes(el)) {
      dotsRef.current.push(el);
    }
  };

  return (
    <div className="ssl-step-slider" ref={sliderRef}>
      <div className="ssl-step-slider__container">
        <div className="ssl-step-slider__track">
          {slidesData.map((slide, index) => (
            <div
              key={index}
              className="ssl-step-slider__card"
              data-index={index}
              ref={addToCardsRef}
            >
              <div className="ssl-step-slider__card-image">
                <img
                  src={slide.image}
                  alt={slide.highlight || slide.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `${publicUrl}images/l1.jpg`;
                  }}
                />
              </div>
              <div className="ssl-step-slider__card-content">
                <p className="ssl-step-slider__counter">{slide.counter}</p>
                <h3 className="ssl-step-slider__title">
                  {slide.title}
                  <br />
                  <i>{slide.highlight}</i>
                </h3>
                <p className="ssl-step-slider__text">{slide.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="ssl-step-slider__progress">
          {slidesData.map((_, idx) => (
            <div
              key={idx}
              className={`ssl-step-slider__progress-dot ${
                idx === 0 ? "ssl-is-active" : ""
              }`}
              ref={addToDotsRef}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepSlider;
