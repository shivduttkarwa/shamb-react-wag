import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./GridGallery.css";

type GgImage = { url: string; name: string; category: string };

const GalleryPage: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const categoryRef = useRef<HTMLParagraphElement | null>(null);
  const controlsRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const prevBtnRef = useRef<HTMLButtonElement | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);

  const images = useMemo<GgImage[]>(
    () => [
      {
        url: "https://cdn.sanity.io/images/aihs9dxi/production/6c724b1117b362159cfd8257c369ccebe8d29070-1536x1024.png",
        name: "Kruger Nyota Resort",
        category: "HOTELS",
      },
      {
        url: "https://cdn.sanity.io/images/aihs9dxi/production/e2bcd938cb302e64e1fdf702fa66c87c981a8287-1536x1024.png",
        name: "Serengeti Haven",
        category: "SAFARI",
      },
      {
        url: "https://cdn.sanity.io/images/aihs9dxi/production/84fdadb0da32cbeb29cf640e2d1845ad31f2d0a8-1536x1024.png",
        name: "Flinders Dunes",
        category: "HOTELS",
      },
      {
        url: "https://cdn.sanity.io/images/aihs9dxi/production/b43eb0db2bb25a4154a5d83599f779a5e517169d-1536x1024.png",
        name: "Hudson Bay Lodge",
        category: "RESORT",
      },
      {
        url: "https://cdn.sanity.io/images/aihs9dxi/production/c6df07eb2c08dbff4c93a67784c8f0682d32a401-1536x1024.png",
        name: "Eden Al Zahra",
        category: "LUXURY",
      },
      {
        url: "https://cdn.sanity.io/images/aihs9dxi/production/efdc72a09d043646e6153c77104a0a046264ca97-1536x1024.png",
        name: "Sundara Retreat",
        category: "WELLNESS",
      },
      {
        url: "https://cdn.sanity.io/images/aihs9dxi/production/fd669f4d117d2e1fc4841128cb43a651adceff95-1536x1024.png",
        name: "Nerea Lodge",
        category: "COASTAL",
      },
      {
        url: "https://cdn.sanity.io/images/aihs9dxi/production/8615cffc58b1c93ed042c984fca7e14db282ebbe-1536x1024.png",
        name: "Azura Sanctuary",
        category: "VILLA",
      },
      {
        url: "https://cdn.sanity.io/images/aihs9dxi/production/cbd4145f41d1f0a503b829ba4aca6286c3e3b980-1536x1024.png",
        name: "Terra Vista",
        category: "BOUTIQUE",
      },
    ],
    []
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    const grid = gridRef.current;
    const info = infoRef.current;
    const nameEl = nameRef.current;
    const categoryEl = categoryRef.current;
    const controls = controlsRef.current;
    const progress = progressRef.current;
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;
    if (
      !wrapper ||
      !container ||
      !grid ||
      !info ||
      !nameEl ||
      !categoryEl ||
      !controls ||
      !progress
    )
      return;

    const items = Array.from(
      grid.querySelectorAll<HTMLDivElement>(".gg-gallery-item")
    );
    if (!items.length) return;
    const centerIndex = Math.floor(items.length / 2);
    const centerItem = items[centerIndex];
    const progressDots = Array.from(
      progress.querySelectorAll<HTMLDivElement>(".gg-progress-dot")
    );

    const currentIndexRef = { value: 0 };
    const isExpandedRef = { value: false };

    items.forEach((item, index) => {
      const col = index % 3;
      if (col === 0) item.dataset.col = "left";
      else if (col === 1) item.dataset.col = "middle";
      else item.dataset.col = "right";
    });

    const setInitialColumnOffsets = () => {
      items.forEach((item) => {
        const col = item.dataset.col;
        let y = 0;
        if (col === "middle") y = window.innerWidth <= 768 ? -180 : -180;
        if (col === "left") y = window.innerWidth <= 768 ? -130 : -90;
        if (col === "right") y = window.innerWidth <= 768 ? -76 : 0;
        item.style.transform = `translateY(${y}px)`;
        item.style.opacity = "1";
      });
    };

    const updateImage = (index: number) => {
      currentIndexRef.value = index;
      centerItem.style.backgroundImage = `url('${images[index].url}')`;
      nameEl.textContent = images[index].name;
      categoryEl.textContent = images[index].category;
      progressDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    };

    const updateLayout = (progressValue: number) => {
      if (progressValue < 0.1) {
        isExpandedRef.value = false;
        grid.style.opacity = "1";
        grid.style.transform = "translate(-50%, -50%) scale(1)";
        setInitialColumnOffsets();
        info.classList.remove("active");
        controls.classList.remove("active");
        progress.classList.remove("active");
      } else if (progressValue >= 0.1 && progressValue < 0.9) {
        const t = (progressValue - 0.1) / 0.8;
        updateImage(centerIndex);

        const itemWidth =
          ((window.innerWidth <= 768 ? 1.16 : 0.99) * window.innerWidth - 80) /
          3;
        const itemHeight = window.innerWidth <= 768 ? 182 : 200;
        const scaleX = window.innerWidth / itemWidth;
        const scaleY = window.innerHeight / itemHeight;
        const targetScale = Math.max(scaleX, scaleY);
        const scale = 1 + t * (targetScale - 1);
        grid.style.transform = `translate(-50%, -50%) scale(${scale})`;

        items.forEach((item) => {
          const col = item.dataset.col;
          const startY =
            col === "middle"
              ? -180
              : col === "left"
              ? window.innerWidth <= 768
                ? -130
                : -90
              : col === "right"
              ? window.innerWidth <= 768
                ? -76
                : 0
              : 0;
          const endY =
            col === "middle"
              ? window.innerWidth <= 768
                ? 5
                : -60
              : window.innerWidth <= 768
              ? -50
              : 0;
          const y = startY + (endY - startY) * t;
          item.style.transform = `translateY(${y}px)`;
          item.style.opacity = "1";
        });

        info.classList.remove("active");
        controls.classList.remove("active");
        progress.classList.remove("active");
      } else {
        isExpandedRef.value = true;
        const itemWidth =
          ((window.innerWidth <= 768 ? 1.16 : 0.99) * window.innerWidth - 80) /
          3;
        const itemHeight = window.innerWidth <= 768 ? 182 : 200;
        const scaleX = window.innerWidth / itemWidth;
        const scaleY = window.innerHeight / itemHeight;
        const scale = Math.max(scaleX, scaleY);
        grid.style.transform = `translate(-50%, -50%) scale(${scale})`;

        items.forEach((item, i) => {
          if (i === centerIndex) {
            item.style.opacity = "1";
            item.style.transform =
              window.innerWidth <= 768
                ? "translateY(-10px)"
                : "translateY(-60px)";
          } else {
            item.style.opacity = "0";
          }
        });

        info.classList.add("active");
        controls.classList.add("active");
        progress.classList.add("active");
      }
    };

    const onItemClick = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      const index = parseInt(target.dataset.index || "0", 10);
      currentIndexRef.value = index;
      updateImage(index);
      window.scrollTo({
        top: wrapper.offsetTop + wrapper.offsetHeight * 0.5,
        behavior: "smooth",
      });
    };
    items.forEach((item) => {
      item.addEventListener("click", onItemClick);
    });

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: () => "+=200vh",
      pin: container,
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => updateLayout(self.progress),
    });

    const onResize = () => {
      setInitialColumnOffsets();
      trigger.refresh();
      updateLayout(trigger.progress);
    };
    window.addEventListener("resize", onResize);
    nextBtn?.addEventListener("click", () => {
      if (!isExpandedRef.value) return;
      const nextIndex = (currentIndexRef.value + 1) % images.length;
      updateImage(nextIndex);
    });
    prevBtn?.addEventListener("click", () => {
      if (!isExpandedRef.value) return;
      const prevIndex =
        (currentIndexRef.value - 1 + images.length) % images.length;
      updateImage(prevIndex);
    });
    const keyListener = (e: KeyboardEvent) => {
      if (!isExpandedRef.value) return;
      if (e.key === "ArrowLeft") {
        const prevIndex =
          (currentIndexRef.value - 1 + images.length) % images.length;
        updateImage(prevIndex);
      }
      if (e.key === "ArrowRight") {
        const nextIndex = (currentIndexRef.value + 1) % images.length;
        updateImage(nextIndex);
      }
    };
    document.addEventListener("keydown", keyListener);

    setInitialColumnOffsets();
    updateImage(0);
    trigger.refresh();
    requestAnimationFrame(() => updateLayout(trigger.progress));

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("keydown", keyListener);
      trigger.kill();
      items.forEach((item) => {
        item.removeEventListener("click", onItemClick);
      });
    };
  }, [images]);

  return (
    <div className="gg-gallery-page">
      <div className="gg-minimal-section gg-section-before">
        <div>SCROLL DOWN</div>
      </div>

      <div className="gg-gallery-wrapper" ref={wrapperRef}>
        <div className="gg-gallery-container" ref={containerRef}>
          <div className="gg-gallery-grid" id="galleryGrid" ref={gridRef}>
            {images.map((image, idx) => (
              <div
                key={image.url}
                className="gg-gallery-item"
                data-index={idx}
                style={{ backgroundImage: `url('${image.url}')` }}
              />
            ))}
          </div>

          <div className="gg-expanded-view" id="expandedView">
            <div className="expanded-image" id="expandedImage"></div>
          </div>

          <div className="gg-image-info" id="imageInfo" ref={infoRef}>
            <h2 id="imageName" ref={nameRef}>
              Flinders Dunes
            </h2>
            <p id="imageCategory" ref={categoryRef}>
              HOTELS
            </p>
          </div>

          <div
            className="gg-gallery-controls"
            id="galleryControls"
            ref={controlsRef}
          >
            <button className="gg-control-btn" id="prevBtn" ref={prevBtnRef}>
              ← PREVIOUS
            </button>
            <button className="gg-control-btn" id="nextBtn" ref={nextBtnRef}>
              NEXT →
            </button>
          </div>

          <div
            className="gg-progress-indicator"
            id="progressIndicator"
            ref={progressRef}
          >
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`gg-progress-dot ${idx === 0 ? "active" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="gg-minimal-section gg-section-after">
        <div>CONTINUE SCROLLING</div>
      </div>
    </div>
  );
};

export default GalleryPage;
