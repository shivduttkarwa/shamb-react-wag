import React, { useEffect, useRef } from "react";
import gsap from "gsap";

type TitlePair = { one: string; two: string };

interface EraserTextProps {
  pairs?: TitlePair[];
  darkMode?: boolean;
  className?: string;
}

const defaultPairs: TitlePair[] = [
  { one: "PROJECT", two: "DETAILS" },
  { one: "SIGNATURE", two: "SPACES" },
  { one: "MODERN", two: "RETREATS" },
  { one: "ENDURING", two: "DETAILS" },
  { one: "QUIET", two: "LUXURY" },
];

const EraserText: React.FC<EraserTextProps> = ({
  pairs = defaultPairs,
  darkMode = false,
  className = "",
}) => {
  const textOneRef = useRef<HTMLDivElement | null>(null);
  const textTwoRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const slideBarRef = useRef<HTMLDivElement | null>(null);

  const colors = {
    white: darkMode ? "#181717" : "#f1eaea",
    black: darkMode ? "#f1eaea" : "#181717",
  };

  useEffect(() => {
    if (!textOneRef.current || !textTwoRef.current || !barRef.current || !slideBarRef.current) {
      return;
    }

    let titleIndex = 0;
    const textOneH1 = textOneRef.current.querySelector("h1");
    const textTwoH1 = textTwoRef.current.querySelector("h1");

    const setTitles = () => {
      const pair = pairs[titleIndex % pairs.length];
      if (textOneH1) textOneH1.textContent = pair.one;
      if (textTwoH1) textTwoH1.textContent = pair.two;
    };

    setTitles();

    const slideTL = gsap.timeline();
    const maskTL = gsap.timeline();

    const mainTL = gsap.timeline({
      repeat: -1,
      onRepeat: () => {
        titleIndex++;
        setTitles();
        gsap.set(textTwoRef.current, { opacity: 0 });
        gsap.set(barRef.current, { scaleY: 0.1, y: 0 });
        if (textOneH1) gsap.set(textOneH1, { opacity: 1 });
        gsap.set(textOneRef.current, {
          clipPath: "polygon(0 0, 18% 0, 8% 100%, 0% 100%)",
        });
      },
    });

    gsap.set(textTwoRef.current, { opacity: 0 });
    gsap.set(barRef.current, { scaleY: 0.1, y: 0 });
    gsap.set(textOneRef.current, {
      clipPath: "polygon(0 0, 18% 0, 8% 100%, 0% 100%)",
    });
    gsap.set(textTwoRef.current, {
      clipPath: "polygon(0 0, 91% 0, 81% 100%, 0% 100%)",
    });

    slideTL
      .to(barRef.current, {
        duration: 1,
        y: 225,
        scaleY: 1,
        ease: "back.out",
      })
      .to(slideBarRef.current, {
        duration: 1.5,
        x: 600,
        delay: 0.5,
        ease: "back.inOut(0.8)",
      })
      .to(slideBarRef.current, {
        duration: 1.5,
        x: 0,
        delay: 0.5,
        ease: "back.inOut(0.8)",
      })
      .to(slideBarRef.current, {
        duration: 1.5,
        x: 600,
        delay: 0.5,
        ease: "back.inOut(0.8)",
      })
      .to(barRef.current, {
        duration: 1,
        y: 500,
        scaleY: 0.1,
        ease: "back.in",
      });

    maskTL
      .to(textOneRef.current, {
        duration: 1.5,
        ease: "back.inOut(0.8)",
        clipPath: "polygon(0 0, 91% 0, 81% 100%, 0% 100%)",
        onComplete: () => {
          gsap.set(textTwoRef.current, { opacity: 1 });
        },
      })
      .to(textOneRef.current, {
        duration: 1.5,
        delay: 0.5,
        ease: "back.inOut(0.8)",
        clipPath: "polygon(0 0, 18% 0, 8% 100%, 0% 100%)",
        onComplete: () => {
          if (textOneH1) gsap.set(textOneH1, { opacity: 0 });
        },
      })
      .to(textOneRef.current, {
        duration: 1.5,
        delay: 0.5,
        ease: "back.inOut(0.8)",
        clipPath: "polygon(0 0, 91% 0, 81% 100%, 0% 100%)",
      });

    mainTL.add(slideTL).add(maskTL, 1.5);

    return () => {
      mainTL.kill();
      slideTL.kill();
      maskTL.kill();
    };
  }, [pairs]);

  const rootStyle: React.CSSProperties = {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: colors.white,
    padding: "80px 16px",
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    maxWidth: "800px",
    height: "300px",
    overflow: "hidden",
    background: colors.white,
  };

  const slideBarStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "100px",
    transform: "translateY(-50%) rotateZ(15deg)",
    width: "10px",
    height: "600px",
    zIndex: 10,
  };

  const barStyle: React.CSSProperties = {
    width: "100%",
    height: "150px",
    borderRadius: "100px",
    backgroundColor: colors.black,
  };

  const textBlockStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeItems: "center",
    backgroundColor: colors.white,
  };

  const h1Style: React.CSSProperties = {
    fontFamily: '"Raleway", sans-serif',
    fontSize: "5rem",
    fontWeight: 800,
    fontStyle: "italic",
    letterSpacing: "2px",
    position: "relative",
    perspective: "500px",
    transformStyle: "preserve-3d",
    color: colors.black,
  };

  return (
    <section className={`pd-root ${className}`} style={rootStyle}>
      <div className="pd-container" style={containerStyle}>
        <div className="pd-slide-bar" style={slideBarStyle} ref={slideBarRef}>
          <div className="pd-bar" style={barStyle} ref={barRef}></div>
        </div>

        <div className="pd-text-block pd-text-one" style={textBlockStyle} ref={textOneRef}>
          <h1 style={h1Style}></h1>
        </div>
        <div className="pd-text-block pd-text-two" style={textBlockStyle} ref={textTwoRef}>
          <h1 style={h1Style}></h1>
        </div>
      </div>
    </section>
  );
};

export default EraserText;
