import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./GlassRainButton.css";

interface GlassRainButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const GlassRainButton: React.FC<GlassRainButtonProps> = ({
  children,
  href,
  onClick,
  className = "",
}) => {
  const rainLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dropCount = 15;
    const speedMultiplier = 6.175; //  higher = slower, lower = faster
    const sizeMultiplier = 2.5; // higher = bigger drops, lower = smaller drops
    const rainLayer = rainLayerRef.current;
    if (!rainLayer) return;

    const dropsContainer = rainLayer.querySelector(
      ".btn-rain-drops"
    ) as HTMLDivElement;
    const shadowsContainer = rainLayer.querySelector(
      ".btn-rain-shadows"
    ) as HTMLDivElement;

    if (!dropsContainer || !shadowsContainer) return;

    const maxDelay = 2.0; // total stagger spread in seconds

    for (let i = 0; i < dropCount; i++) {
      const drop = document.createElement("div");
      const shadow = document.createElement("div");

      drop.className = "btn-rain-drop";
      shadow.className = "btn-rain-shadow";

      // RANDOM X across full width
      const x = Math.random();
      const leftPercent = x * 100;

      // SIZE: Simple control
      const baseWidth = (1 + Math.random() * 3) * sizeMultiplier; // 1–4px base
      let dropWidth = baseWidth;

      // SHAPE: 85% round-ish, 15% short streak (removed longest drops)
      const shapeVariant = Math.random();
      let heightRatio;

      if (shapeVariant < 0.85) {
        // round-ish
        heightRatio = 1 + Math.random() * 0.3; // 1–1.3x
      } else {
        // short streak (reduced max length)
        heightRatio = 1.4 + Math.random() * 0.3; // 1.4–1.7x (was 1.6–2.2x)
      }

      let dropHeight = baseWidth * heightRatio;

      // SPEED: Simple control
      const baseTime = 1.2 + Math.random() * 1.6;
      const dropTime = baseTime * speedMultiplier;

      // EVEN STAGGER
      const dropDelay = (i / dropCount) * maxDelay;

      drop.style.left = leftPercent + "%";
      drop.style.width = dropWidth + "px";
      drop.style.height = dropHeight + "px";
      drop.style.animation = `${dropTime}s btn-streaking linear infinite`;
      drop.style.animationDelay = `${dropDelay}s`;

      shadow.style.left = leftPercent + "%";
      shadow.style.width = Math.max(dropWidth - 1, 1) + "px";
      shadow.style.height = Math.max(dropHeight - 1, 1) + "px";
      shadow.style.animation = `${dropTime}s btn-streaking linear infinite`;
      shadow.style.animationDelay = `${dropDelay}s`;

      dropsContainer.appendChild(drop);
      shadowsContainer.appendChild(shadow);
    }

    // Cleanup function
    return () => {
      dropsContainer.innerHTML = "";
      shadowsContainer.innerHTML = "";
    };
  }, []);

  const commonProps = {
    className: `glass-rain-btn ${className}`,
    onClick,
  };

  const content = (
    <>
      <span className="glass-rain-btn-bg"></span>

      {/* rain layer */}
      <div className="btn-rain-layer" ref={rainLayerRef}>
        <div className="btn-rain-shadows"></div>
        <div className="btn-rain-drops"></div>
      </div>

      <span className="glass-rain-btn-label">{children}</span>
      <span className="glass-rain-btn-icon">→</span>
    </>
  );

  if (href) {
    return (
      <Link {...commonProps} to={href}>
        {content}
      </Link>
    );
  }

  return (
    <button {...commonProps} type="button">
      {content}
    </button>
  );
};

export default GlassRainButton;
