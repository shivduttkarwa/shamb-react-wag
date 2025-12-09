import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./HeroLoader.css";

interface HeroLoaderProps {
  onComplete?: () => void;
}

/** All timing controls in ONE place — tweak these */
const TIMING = {
  curtainDuration: 1.8, // how long curtain takes to come up
  gapCurtainToText1: 0.1, // wait after curtain finishes before text1 starts
  textInDuration: 1.1, // how long each text takes to come IN
  holdText1BeforeOut: 0.3, // pause after text1 in before it goes up
  textOutDuration: 1.1, // how long each text takes to go OUT
  gapText1OutToText2In: 0, // wait after text1 out before text2 starts
  holdText2BeforeOut: 0.7, // pause after text2 in before it goes up
  gapText2OutToComplete: 0.2, // wait after text2 out before loader completes
  stagger: 0.03, // time between each letter in the wave
};

const HeroLoader: React.FC<HeroLoaderProps> = ({ onComplete }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const onCompleteRef = useRef(onComplete);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const curtain = curtainRef.current;
    const text1 = text1Ref.current;
    const text2 = text2Ref.current;
    const loader = loaderRef.current;

    if (!curtain || !text1 || !text2 || !loader) return;

    const fallback = window.setTimeout(() => {
      setVisible(false);
      onCompleteRef.current?.();
    }, 12000); // a bit generous since timings are adjustable

    // --- helper: split heading into spans ---
    const splitHeading = (el: HTMLElement): HTMLSpanElement[] => {
      const raw = el.textContent || "";
      el.textContent = "";
      const spans: HTMLSpanElement[] = [];

      raw.split("").forEach((ch) => {
        const span = document.createElement("span");
        span.classList.add("hero-loader-char");
        span.textContent = ch === " " ? "\u00A0" : ch;
        el.appendChild(span);
        spans.push(span);
      });

      return spans;
    };

    const chars1 = splitHeading(text1);
    const chars2 = splitHeading(text2);
    const allChars = [...chars1, ...chars2];

    if (!allChars.length) {
      clearTimeout(fallback);
      return;
    }

    // initial positions
    gsap.set(curtain, { yPercent: 100 });
    gsap.set(allChars, {
      y: "120vh",
      opacity: 0,
      transformOrigin: "50% 100%",
    });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        setVisible(false);
        onCompleteRef.current?.();
        clearTimeout(fallback);
      },
    });

    // --- 1. Curtain comes up and stays ---
    tl.to(curtain, {
      yPercent: 0,
      duration: TIMING.curtainDuration,
      ease: "power2.inOut",
    });

    // wave helpers
    const waveIn = (chars: HTMLSpanElement[], position?: gsap.Position) => {
      tl.to(
        chars,
        {
          y: 0,
          opacity: 1,
          duration: TIMING.textInDuration,
          ease: "back.out(1)",
          stagger: {
            each: TIMING.stagger,
            from: "start", // left -> right
          },
        },
        position
      );
    };

    const waveOut = (chars: HTMLSpanElement[], position?: gsap.Position) => {
      tl.to(
        chars,
        {
          y: "-120vh",
          opacity: 0,
          duration: TIMING.textOutDuration,
          ease: "back.in(1)",
          stagger: {
            each: TIMING.stagger,
            from: "end", // right -> left
          },
        },
        position
      );
    };

    // --- 2. text1 in (after curtain) ---
    waveIn(chars1, `>+${TIMING.gapCurtainToText1}`);

    // --- 3. text1 out (after hold) ---
    waveOut(chars1, `>+${TIMING.holdText1BeforeOut}`);

    // --- 4. text2 in (after gap from text1 out) ---
    waveIn(chars2, `>+${TIMING.gapText1OutToText2In}`);

    // --- 5. text2 out (after hold) ---
    waveOut(chars2, `>+${TIMING.holdText2BeforeOut}`);

    // --- 6. small gap before we end loader & show website hero ---
    tl.to(
      curtain,
      {
        duration: TIMING.gapText2OutToComplete,
        // no visual change, just a timed pause
      },
      ">"
    );

    // curtain stays; onComplete fires after this dummy tween

    return () => {
      tl.kill();
      clearTimeout(fallback);
    };
  }, []);

  if (!visible) return null;

  return (
    <div ref={loaderRef} className="hero-loader">
      <div ref={curtainRef} className="hero-loader-curtain" />
      <div className="hero-loader-text-container">
        <div className="hero-loader-backdrop" />
        <h1 ref={text1Ref} className="hero-loader-text hero-loader-text-1">
          Inspire
        </h1>
        <h1 ref={text2Ref} className="hero-loader-text hero-loader-text-2">
        A True Living
        </h1>
      </div>
    </div>
  );
};

export default HeroLoader;
