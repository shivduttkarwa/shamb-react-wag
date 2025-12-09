import React from "react";
import "./ElectricBorderCard.css";

interface ElectricBorderCardProps {
  badge?: string;
  title?: string;
  description?: string;
  borderColor?: string;
}

const ElectricBorderCard: React.FC<ElectricBorderCardProps> = ({
  badge = "Dramatic",
  title = "Electric Border",
  description = "In case you'd like to emphasize something very dramatically.",
  borderColor = "#dd8448",
}) => {
  return (
    <div className="electric-main-container">
      <svg className="electric-svg-container">
        <defs>
          <filter
            id="turbulent-displace"
            colorInterpolationFilters="sRGB"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={10}
              result="noise1"
              seed={1}
            />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate
                attributeName="dy"
                values="700; 0"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={10}
              result="noise2"
              seed={1}
            />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate
                attributeName="dy"
                values="0; -700"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={10}
              result="noise1"
              seed={2}
            />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate
                attributeName="dx"
                values="490; 0"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={10}
              result="noise2"
              seed={2}
            />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate
                attributeName="dx"
                values="0; -490"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend
              in="part1"
              in2="part2"
              mode="color-dodge"
              result="combinedNoise"
            />

            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale="15"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="electric-card-container"
        style={
          {
            "--electric-border-color": borderColor,
          } as React.CSSProperties
        }
      >
        <div className="electric-inner-container">
          <div className="electric-border-outer">
            <div className="electric-main-card"></div>
          </div>
          <div className="electric-glow-layer-1"></div>
          <div className="electric-glow-layer-2"></div>
        </div>

        <div className="electric-overlay-1"></div>
        <div className="electric-overlay-2"></div>
        <div className="electric-background-glow"></div>

        <div className="electric-content-container">
          <div className="electric-content-top">
            <div className="electric-scrollbar-glass">{badge}</div>
            <p className="electric-title">{title}</p>
          </div>

          <hr className="electric-divider" />

          <div className="electric-content-bottom">
            <p className="electric-description">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricBorderCard;
