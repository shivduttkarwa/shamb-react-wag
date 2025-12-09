import React, { useEffect, useRef } from "react";
import "./BlackHoleLoader.css";

interface BlackHoleLoaderProps {
  /** Called when counter reaches 100% */
  onComplete?: () => void;
}

const BlackHoleLoader: React.FC<BlackHoleLoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const centerHoverRef = useRef<HTMLDivElement | null>(null);
  const loaderCountRef = useRef<HTMLDivElement | null>(null);
  const onCompleteRef = useRef(onComplete);

  // Update ref when onComplete changes
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const container = containerRef.current;
    const centerHover = centerHoverRef.current;
    const loaderCount = loaderCountRef.current;

    if (!container || !centerHover || !loaderCount) return;

    const maxorbit = 255;
    const cw = container.offsetWidth || window.innerWidth;
    const ch = container.offsetHeight || window.innerHeight;
    const centerx = cw / 2;
    const centery = ch / 2;

    const startTime = new Date().getTime();
    let currentTime = 0;

    const stars: Star[] = [];
    let collapse = false;
    let expanse = false;

    // Canvas setup
    const canvas = document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    container.appendChild(canvas);
    const context = canvas.getContext("2d");

    if (!context) return;
    context.globalCompositeOperation = "multiply";

    function setDPI(canvas: HTMLCanvasElement, dpi: number) {
      if (!canvas.style.width) canvas.style.width = canvas.width + "px";
      if (!canvas.style.height) canvas.style.height = canvas.height + "px";

      const scaleFactor = dpi / 96;
      canvas.width = Math.ceil(canvas.width * scaleFactor);
      canvas.height = Math.ceil(canvas.height * scaleFactor);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(scaleFactor, scaleFactor);
    }

    function rotate(
      cx: number,
      cy: number,
      x: number,
      y: number,
      angle: number
    ) {
      const radians = angle;
      const cos = Math.cos(radians);
      const sin = Math.sin(radians);
      const nx = cos * (x - cx) + sin * (y - cy) + cx;
      const ny = cos * (y - cy) - sin * (x - cx) + cy;
      return [nx, ny] as const;
    }

    setDPI(canvas, 192);

    class Star {
      orbital: number;
      x: number;
      y: number;
      yOrigin: number;
      speed: number;
      rotation: number;
      startRotation: number;
      id: number;
      collapseBonus: number;
      color: string;
      hoverPos: number;
      expansePos: number;
      prevR: number;
      prevX: number;
      prevY: number;

      constructor() {
        const rands: number[] = [];
        rands.push(Math.random() * (maxorbit / 2) + 1);
        rands.push(Math.random() * (maxorbit / 2) + maxorbit);

        this.orbital = rands.reduce((p, c) => p + c, 0) / rands.length;

        this.x = centerx;
        this.y = centery + this.orbital;

        this.yOrigin = centery + this.orbital;

        this.speed = ((Math.floor(Math.random() * 2.5) + 1.5) * Math.PI) / 180;
        this.rotation = 0;
        this.startRotation =
          ((Math.floor(Math.random() * 360) + 1) * Math.PI) / 180;

        this.id = stars.length;

        this.collapseBonus = this.orbital - maxorbit * 0.7;
        if (this.collapseBonus < 0) {
          this.collapseBonus = 0;
        }

        this.color = "rgba(255,255,255," + (1 - this.orbital / 255) + ")";

        this.hoverPos = centery + maxorbit / 2 + this.collapseBonus;
        this.expansePos =
          centery +
          (this.id % 100) * -10 +
          (Math.floor(Math.random() * 20) + 1);

        this.prevR = this.startRotation;
        this.prevX = this.x;
        this.prevY = this.y;

        stars.push(this);
      }

      draw() {
        if (!expanse) {
          this.rotation = this.startRotation + currentTime * this.speed;
          if (!collapse) {
            if (this.y > this.yOrigin) {
              this.y -= 2.5;
            }
            if (this.y < this.yOrigin - 4) {
              this.y += (this.yOrigin - this.y) / 10;
            }
          } else {
            if (this.y > this.hoverPos) {
              this.y -= (this.hoverPos - this.y) / -5;
            }
            if (this.y < this.hoverPos - 4) {
              this.y += 2.5;
            }
          }
        } else {
          // Expansion
          this.rotation = this.startRotation + currentTime * (this.speed / 2);
          if (this.y > this.expansePos) {
            this.y -= Math.floor(this.expansePos - this.y) / -80;
          }
        }

        if (!context) return;

        context.save();
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.beginPath();
        const [oldX, oldY] = rotate(
          centerx,
          centery,
          this.prevX,
          this.prevY,
          -this.prevR
        );
        context.moveTo(oldX, oldY);
        context.translate(centerx, centery);
        context.rotate(this.rotation);
        context.translate(-centerx, -centery);
        context.lineTo(this.x, this.y);
        context.stroke();
        context.restore();

        this.prevR = this.rotation;
        this.prevX = this.x;
        this.prevY = this.y;
      }
    }

    let animationId: number;
    let intervalId: number | null = null;
    let canEnter = false;

    const loop = () => {
      const now = new Date().getTime();
      currentTime = (now - startTime) / 50;

      context.fillStyle = "rgba(18,36,28,0.18)";
      context.fillRect(0, 0, cw, ch);

      for (let i = 0; i < stars.length; i++) {
        stars[i].draw();
      }

      animationId = requestAnimationFrame(loop);
    };

    const startProgress = () => {
      loaderCount.classList.add("visible");
      let progress = 0;
      loaderCount.textContent = "0%";

      intervalId = window.setInterval(() => {
        progress += 2; // faster counter
        if (progress > 100) progress = 100;
        loaderCount.textContent = `${progress}%`;

        if (progress >= 100) {
          canEnter = true;
          centerHover.classList.add("ready");
          loaderCount.classList.remove("visible");
          loaderCount.classList.add("hidden");
          if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
          }
        }
      }, 15);
    };

    const init = () => {
      context.fillStyle = "rgba(20,42,32,1)";
      context.fillRect(0, 0, cw, ch);
      for (let i = 0; i < 2500; i++) {
        new Star();
      }
      loop();
      startProgress();
    };

    // Events
    const handleClick = () => {
      if (expanse || !canEnter) return;
      collapse = false;
      expanse = true;
      centerHover.classList.add("open");
      centerHover.classList.remove("ready");

      // allow particle spread to play before unmounting loader
      setTimeout(() => {
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }, 3200);
    };

    const handleMouseOver = () => {
      if (!expanse) collapse = true;
    };

    const handleMouseOut = () => {
      if (!expanse) collapse = false;
    };

    centerHover.addEventListener("click", handleClick);
    centerHover.addEventListener("mouseover", handleMouseOver);
    centerHover.addEventListener("mouseout", handleMouseOut);

    init();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
      centerHover.removeEventListener("click", handleClick);
      centerHover.removeEventListener("mouseover", handleMouseOver);
      centerHover.removeEventListener("mouseout", handleMouseOut);
      if (canvas.parentNode) {
        container.removeChild(canvas);
      }
    };
  }, []); // Empty dependencies - only run once

  return (
    <div id="blackhole" ref={containerRef}>
      <div className="centerHover" ref={centerHoverRef}>
        <span>ENTER</span>
      </div>
      <div className="loader-count" ref={loaderCountRef}>
        0%
      </div>
    </div>
  );
};

export default BlackHoleLoader;
