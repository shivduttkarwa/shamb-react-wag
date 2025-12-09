import { memo, useEffect, useRef } from "react";
import gsap from "gsap";
import GlassRainButton from "../UI/GlassRainButton";
import HomeHeroSlider from "../Home/HomeHeroSlider";
import "./ModernHero.css";

const publicUrl = import.meta.env.BASE_URL || "/";
const heroVideo = publicUrl.endsWith("/")
  ? `${publicUrl}images/home_hero.mp4`
  : `${publicUrl}/images/home_hero.mp4`;

interface ModernHeroProps {
  animate?: boolean;
}

const ModernHero: React.FC<ModernHeroProps> = ({ animate = true }) => {
  const curtainRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLDivElement>(null);
  const videoElRef = useRef<HTMLVideoElement>(null);
  const scatterWordRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const subtitleDynamicRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate) return;

    const curtain = curtainRef.current;
    const heroVideo = heroVideoRef.current;
    const videoEl = videoElRef.current;
    const scatterWordEl = scatterWordRef.current;
    const subtitleEl = subtitleRef.current;
    const subtitleDynamicEl = subtitleDynamicRef.current;
    const ctaEl = ctaRef.current;
    const newsEl = newsRef.current;
    const hero = heroRef.current;

    if (
      !curtain ||
      !heroVideo ||
      !videoEl ||
      !scatterWordEl ||
      !subtitleEl ||
      !subtitleDynamicEl ||
      !ctaEl ||
      !newsEl ||
      !hero
    )
      return;

    function createCharSpans(
      element: HTMLElement,
      text: string,
      extraClass?: string
    ) {
      element.innerHTML = "";
      const chars = text.split("");
      const spans: HTMLSpanElement[] = [];
      chars.forEach((ch) => {
        const span = document.createElement("span");
        if (ch === " ") {
          span.innerHTML = "&nbsp;";
        } else {
          span.textContent = ch;
        }
        if (extraClass) span.classList.add(extraClass);
        element.appendChild(span);
        spans.push(span);
      });
      return spans;
    }

    const SCATTER_TEXT = "CREATE";

    const scatterSpans = createCharSpans(
      scatterWordEl,
      SCATTER_TEXT,
      "mh-scatter-letter"
    );

    const changingWords = window.innerWidth < 576 
  ? ["SCULPTED", "WARM", "BALANCED", "ICONIC"] // Mobile: keep current words
  : ["ELEGANT", "STUNNING", "PREMIUM", "CLASSIC"]; // Desktop: shorter by ~20%

    function animateSubtitleWord(index: number) {
      if (!subtitleDynamicEl) return;

      const text = changingWords[index];
      subtitleDynamicEl.innerHTML = "";
      const chars = text.split("");
      const spans: HTMLSpanElement[] = [];

      chars.forEach((ch) => {
        const span = document.createElement("span");
        span.textContent = ch;
        subtitleDynamicEl.appendChild(span);
        spans.push(span);
      });

      gsap.fromTo(
        spans,
        { opacity: 0, y: 20, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.08,
          duration: 1.1,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(spans, {
              opacity: 0,
              y: -20,
              filter: "blur(10px)",
              stagger: 0.08,
              delay: 1.8,
              duration: 0.9,
              ease: "power2.in",
              onComplete: () => {
                const nextIndex = (index + 1) % changingWords.length;
                animateSubtitleWord(nextIndex);
              },
            });
          },
        }
      );
    }

    gsap.set(scatterWordEl, { xPercent: -50, left: "50%", top: "50%" });

    // Wait for next frame to ensure proper dimensions
    const calculatePositions = () => {
      const heroRect = hero.getBoundingClientRect();
      const vw = heroRect.width;
      const vh = heroRect.height;

      // Use window dimensions for more reliable detection
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Fallback to window dimensions if hero dimensions seem incorrect
      const finalVw = vw > 0 ? vw : windowWidth;
      const finalVh = vh > 0 ? vh : windowHeight;

      let sizeLabel: string;
      if (windowWidth < 576) {
        sizeLabel = "small";
      } else if (windowWidth < 992) {
        sizeLabel = "medium";
      } else if (windowWidth < 1440) {
        sizeLabel = "large";
      } else {
        sizeLabel = "xlarge";
      }

      let logoTargetX: number, logoTargetY: number, assembleY: number;
      let ctaTargetX: number, ctaTargetY: number;
      let newsTargetX: number, newsTargetY: number;

      if (sizeLabel === "small") {
        logoTargetX = -finalVw / 2 + 70;
        logoTargetY = -finalVh / 2 + 25;
        assembleY = -110;
        ctaTargetX = 0;
        ctaTargetY = finalVh / 2 - 70;
        newsTargetX = finalVw / 2 - 115;
        newsTargetY = finalVh / 2 - 80;
      } else if (sizeLabel === "medium") {
        logoTargetX = -finalVw / 2 + 70;
        logoTargetY = -finalVh / 2 + 25;
        assembleY = -110;
        ctaTargetX = -finalVw / 2 + 150;
        ctaTargetY = finalVh / 2 - 90;
        newsTargetX = finalVw / 2 - 140;
        newsTargetY = finalVh / 2 - 100;
      } else {
        logoTargetX = -finalVw / 2 + 110;
        logoTargetY = -finalVh / 2 + 35;
        assembleY = -220;
        ctaTargetX = -finalVw / 2 + 170;
        ctaTargetY = finalVh / 2 - 100;
        newsTargetX = finalVw / 2 - 160;
        newsTargetY = finalVh / 2 - 110;
      }

      return {
        logoTargetX,
        logoTargetY,
        assembleY,
        ctaTargetX,
        ctaTargetY,
        newsTargetX,
        newsTargetY,
        sizeLabel,
        finalVw,
        finalVh,
      };
    };

    const positions = calculatePositions();

    const MAX_CONTAINER_WIDTH = 800;
    const MAX_CONTAINER_HEIGHT = 600;

    let scaleFactor: number, heightFraction: number;
    switch (positions.sizeLabel) {
      case "small":
        scaleFactor = 0.7;
        heightFraction = 0.85;
        break;
      case "medium":
        scaleFactor = 0.9;
        heightFraction = 0.75;
        break;
      case "large":
        scaleFactor = 1.2;
        heightFraction = 0.7;
        break;
      case "xlarge":
      default:
        scaleFactor = 1.4;
        heightFraction = 0.7;
        break;
    }

    const containerWidth = Math.min(
      MAX_CONTAINER_WIDTH * scaleFactor,
      positions.finalVw * 0.9
    );
    const containerHeight = Math.min(
      MAX_CONTAINER_HEIGHT * scaleFactor,
      positions.finalVh * heightFraction
    );

    let initialScale: number,
      marginX: number,
      marginY: number,
      minDistance: number;
    if (positions.sizeLabel === "small") {
      initialScale = 1.1;
      marginX = 40;
      marginY = 50;
      minDistance = 80;
    } else if (positions.sizeLabel === "medium") {
      initialScale = 1.3;
      marginX = 60;
      marginY = 70;
      minDistance = 100;
    } else {
      initialScale = 1.5;
      marginX = 70;
      marginY = 80;
      minDistance = 130;
    }

    const halfW = containerWidth / 2 - marginX;
    const halfH = containerHeight / 2 - marginY;

    function generateNonOverlappingPositions(
      count: number,
      halfW: number,
      halfH: number,
      minDist: number
    ) {
      const positions: { x: number; y: number }[] = [];
      const maxAttempts = 2000;
      let attempts = 0;
      const minDistSq = minDist * minDist;

      while (positions.length < count && attempts < maxAttempts) {
        attempts++;
        const x = (Math.random() * 2 - 1) * halfW;
        const y = (Math.random() * 2 - 1) * halfH;

        let ok = true;
        for (let p of positions) {
          const dx = x - p.x;
          const dy = y - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < minDistSq) {
            ok = false;
            break;
          }
        }

        if (ok) positions.push({ x, y });
      }

      while (positions.length < count) {
        const x = (Math.random() * 2 - 1) * halfW;
        const y = (Math.random() * 2 - 1) * halfH;
        positions.push({ x, y });
      }

      return positions;
    }

    const scatterPositions = generateNonOverlappingPositions(
      scatterSpans.length,
      halfW,
      halfH,
      minDistance
    );

    gsap.set(scatterSpans, { x: 0, y: 0, opacity: 0, scale: 1 });

    videoEl.pause();
    videoEl.currentTime = 0;

    gsap.set(ctaEl, { x: positions.ctaTargetX, y: positions.ctaTargetY + 80 });
    gsap.set(newsEl, {
      x: positions.newsTargetX + 120,
      y: positions.newsTargetY,
    });

    const VIDEO_EXPAND_DURATION = 1.8;
    const SCATTER_FADE_DURATION = 0.4;
    const SCATTER_ASSEMBLE_DURATION = 1.5;
    const SUBTITLE_DELAY_AFTER_ASSEMBLY = 0.02;

    const tl = gsap.timeline();

    // Start with video at small scale and 0 opacity
    gsap.set(heroVideo, { scale: 0.05, opacity: 1 });

    // Start directly with video expanding from left bottom
    tl.to(
      heroVideo,
      {
        scale: 1,
        opacity: 1,
        duration: VIDEO_EXPAND_DURATION,
        ease: "power2.out",
        onStart: () => {
          videoEl.currentTime = 0;
          videoEl.play();
        },
      },
      0
    )
      .set(
        scatterSpans,
        {
          x: (i: number) => scatterPositions[i].x,
          y: (i: number) => scatterPositions[i].y,
          scale: initialScale,
          opacity: 0,
        },
        "videoScatter"
      )
      .to(
        scatterSpans,
        {
          opacity: 1,
          duration: SCATTER_FADE_DURATION,
          stagger: 0.05,
        },
        "videoScatter"
      )
      .to(
        scatterSpans,
        {
          x: 0,
          y: positions.assembleY,
          rotation: 0,
          scale: 1,
          duration: SCATTER_ASSEMBLE_DURATION,
          stagger: 0.08,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.5"
      )
      .set(
        scatterSpans,
        {
          opacity: 1,
        },
        "postAssemble"
      )
      .add("postAssemble")
      .to(
        ctaEl,
        {
          x: positions.ctaTargetX,
          y: positions.ctaTargetY,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        },
        "postAssemble-=0"
      )
      .to(
        newsEl,
        {
          x: positions.newsTargetX,
          y: positions.newsTargetY,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        },
        "postAssemble+=0"
      )
      .to(
        subtitleEl,
        {
          opacity: 1,
          y: -10,
          duration: 1,
          ease: "power2.out",
          onComplete: () => {
            animateSubtitleWord(0);
          },
        },
        "postAssemble+=" + SUBTITLE_DELAY_AFTER_ASSEMBLY
      );
  }, [animate]);

  return (
    <div className="mh-hero" ref={heroRef}>
      <div className="mh-curtain" ref={curtainRef}></div>

      <div className="mh-text-container">
        <div className="mh-text-backdrop" aria-hidden="true"></div>
        <h1 className="mh-scatter-word" ref={scatterWordRef}></h1>

        <div className="mh-subtitle" ref={subtitleRef}>
          <span className="mh-subtitle-static">Something </span>
          <span className="mh-subtitle-dynamic" ref={subtitleDynamicRef}></span>
        </div>

        <div className="mh-ui-cta" ref={ctaRef}>
          <GlassRainButton href="/projects">Start a Project</GlassRainButton>
        </div>

        <HomeHeroSlider ref={newsRef} />
      </div>

      <div className="mh-hero-video" ref={heroVideoRef}>
        <video ref={videoElRef} src={heroVideo} muted loop playsInline />
        <div className="mh-image-overlay"></div>
      </div>
    </div>
  );
};

// Memoized so React doesn't rerender and wipe the GSAP-managed DOM nodes
export default memo(ModernHero);
