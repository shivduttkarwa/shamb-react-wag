import React, { useRef, useEffect } from "react";
import "./HoverText.css";

interface HoverTextProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  fromSettings?: string;
  toSettings?: string;
  radius?: number;
  falloff?: "linear" | "exponential" | "gaussian";
}

const HoverText: React.FC<HoverTextProps> = ({
  children,
  className = "",
  style = {},
  fromSettings = "'wght' 400",
  toSettings = "'wght' 700",
  radius = 120,
  falloff = "gaussian",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const letterSpansRef = useRef<HTMLSpanElement[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const lastPositionRef = useRef({ x: null as number | null, y: null as number | null });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const container = containerRef.current;
    const proximityEl = textRef.current;

    // Build letter spans from text
    const buildLetterSpans = () => {
      proximityEl.innerHTML = "";
      letterSpansRef.current = [];

      const words = children.split(" ");
      
      words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement("span");
        wordSpan.className = "hover-text-word";

        word.split("").forEach((letter) => {
          const letterSpan = document.createElement("span");
          letterSpan.className = "hover-text-letter";
          letterSpan.textContent = letter;
          letterSpan.style.fontVariationSettings = fromSettings;
          wordSpan.appendChild(letterSpan);
          letterSpansRef.current.push(letterSpan);
        });

        proximityEl.appendChild(wordSpan);

        if (wordIndex < words.length - 1) {
          const spaceSpan = document.createElement("span");
          spaceSpan.className = "hover-text-space";
          spaceSpan.textContent = " ";
          proximityEl.appendChild(spaceSpan);
        }
      });

      // Add screen reader text
      const srOnly = document.createElement("span");
      srOnly.className = "sr-only";
      srOnly.textContent = children;
      proximityEl.appendChild(srOnly);
    };

    // Parse font variation settings
    const parseSettings = (settingsStr: string) => {
      return new Map(
        settingsStr
          .split(",")
          .map(s => s.trim())
          .filter(Boolean)
          .map(s => {
            const parts = s.split(/\s+/);
            const axisName = parts[0].replace(/['"]/g, "");
            const value = parseFloat(parts[1]);
            return [axisName, value];
          })
      );
    };

    const fromSettingsMap = parseSettings(fromSettings);
    const toSettingsMap = parseSettings(toSettings);

    const parsedSettings = Array.from(fromSettingsMap.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettingsMap.has(axis) ? toSettingsMap.get(axis)! : fromValue,
    }));

    // Mouse tracking
    const updatePosition = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      mousePositionRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const handleMouseMove = (ev: MouseEvent) => {
      updatePosition(ev.clientX, ev.clientY);
    };

    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      if (touch) updatePosition(touch.clientX, touch.clientY);
    };

    // Distance and falloff calculations
    const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const calculateFalloff = (distance: number) => {
      const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
      switch (falloff) {
        case "exponential":
          return Math.pow(norm, 2);
        case "gaussian":
          return Math.exp(-Math.pow(distance / (radius / 2), 2) / 2);
        case "linear":
        default:
          return norm;
      }
    };

    // Animation loop
    const animate = () => {
      const containerRect = container.getBoundingClientRect();
      const { x, y } = mousePositionRef.current;

      if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      lastPositionRef.current = { x, y };

      letterSpansRef.current.forEach((letterSpan) => {
        if (!letterSpan) return;

        const rect = letterSpan.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
        const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

        const distance = calculateDistance(x, y, letterCenterX, letterCenterY);

        if (distance >= radius) {
          letterSpan.style.fontVariationSettings = fromSettings;
          return;
        }

        const falloffValue = calculateFalloff(distance);

        const newSettings = parsedSettings
          .map((axisInfo) => {
            const interpolatedValue =
              axisInfo.fromValue + (axisInfo.toValue - axisInfo.fromValue) * falloffValue;
            return `'${axisInfo.axis}' ${interpolatedValue}`;
          })
          .join(", ");

        letterSpan.style.fontVariationSettings = newSettings;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    buildLetterSpans();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [children, fromSettings, toSettings, radius, falloff]);

  return (
    <div ref={containerRef} className={`hover-text-container ${className}`} style={style}>
      <span ref={textRef} className="hover-text" />
    </div>
  );
};

export default HoverText;