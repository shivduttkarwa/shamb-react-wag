import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./FeaturedProperties.css";
import GlassButton from "../UI/GlassButton";
import DragBtn from "../Projects/DragBtn";

const publicUrl = import.meta.env.BASE_URL;

interface PropertySlide {
  id: number;
  category: string;
  title: string;
  leftImage: string;
  rightImage: string;
  tabletImage: string;
  subtitle: string;
  description: string;
  link: string;
}

const defaultProperties: PropertySlide[] = [
  {
    id: 1,
    category: "",
    title: '"WHERE VISION\nMEETS\nDREAMS"',
    leftImage: `${publicUrl}images/l4.jpg`,
    rightImage: `${publicUrl}images/zz.jpg`,
    tabletImage: `${publicUrl}images/zz.jpg`,
    subtitle: "Creating exceptional living spaces",
    description:
      "Building tomorrow's homes today. Our vision is to transform how Australians live by creating homes that harmonize with nature, embrace sustainability, and foster community connections. Every FORMA home is designed to enhance your lifestyle while respecting the environment. Thoughtful design, timeless comfort.",
    link: "/projects",
  },
  {
    id: 2,
    category: "",
    title: '"SUSTAINABLE\nDESIGN\nTOMORROW"',
    leftImage: `${publicUrl}images/pr3.jpg`,
    rightImage: `${publicUrl}images/pexels-fotoaibe-1571460.jpg`,
    tabletImage: `${publicUrl}images/pexels-fotoaibe-1571460.jpg`,
    subtitle: "Sustainable design philosophy",
    description:
      "Innovation meets responsibility. We believe in building homes that give back to the environment through renewable materials and energy-efficient systems. Our sustainable design philosophy creates homes that care for our planet. Efficiency without compromise.",
    link: "/projects",
  },
  {
    id: 3,
    category: "",
    title: '"COMMUNITY\nCENTERED\nLIVING"',
    leftImage: `${publicUrl}images/net2.jpg`,
    rightImage: `${publicUrl}images/net1.jpg`,
    tabletImage: `${publicUrl}images/net2.jpg`,
    subtitle: "Community-centered approach",
    description:
      "Building connections, not just homes. Our vision extends beyond individual homes to creating vibrant communities that encourage interaction and wellbeing. We design neighborhoods that foster lasting relationships between residents and their environment. Spaces that bring people together.",
    link: "/projects",
  },
  
];

interface FeaturedPropertiesProps {
  properties?: PropertySlide[];
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties = defaultProperties,
}) => {
  const swiperRef = useRef<any>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const dragBtnRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [showDragBtn, setShowDragBtn] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isInSection, setIsInSection] = useState(false);
  const [isOverNavButton, setIsOverNavButton] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const dragStartXRef = useRef<number | null>(null);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
  const updateDragPosition = (x: number, y: number) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    const clampX = rect ? Math.min(Math.max(x, rect.left), rect.right) : x;
    const clampY = rect ? Math.min(Math.max(y, rect.top), rect.bottom) : y;
    if (!dragBtnRef.current) return;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(() => {
      if (dragBtnRef.current) {
        dragBtnRef.current.style.left = `${clampX}px`;
        dragBtnRef.current.style.top = `${clampY - 15}px`;
      }
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isDesktop = () => window.innerWidth >= 1024;

    const handleMouseEnter = (e: MouseEvent) => {
      if (!isDesktop()) return;
      setIsInSection(true);
      setShowDragBtn(true);
      document.body.style.cursor = "none";
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
      updateDragPosition(e.clientX, e.clientY);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const { clientX, clientY } = e;
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        setIsInSection(false);
        setShowDragBtn(false);
        setIsDragging(false);
        document.body.style.cursor = "default";
        section.classList.remove("show-cursor");
      }
    };

    section.addEventListener("mouseenter", handleMouseEnter);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mouseenter", handleMouseEnter);
      section.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.body.style.cursor = "default";
    };
  }, [isInSection]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
      if (isInSection && !isOverNavButton) {
        setDragPosition({ x: e.clientX, y: e.clientY });
        const section = sectionRef.current;
        if (section) {
          section.classList.remove("show-cursor");
        }
        updateDragPosition(e.clientX, e.clientY);

        const dragBtnCenterX = e.clientX;
        const dragBtnCenterY = e.clientY - 15;
        const padding = 10;

        const buttonElements = document.querySelectorAll(
          ".fp-swiper-button-next, .fp-swiper-button-prev, .fp-left-navigation, .home-benefits-cta"
        );
        let overButton = false;

        buttonElements.forEach((button) => {
          const rect = button.getBoundingClientRect();
          if (
            dragBtnCenterX >= rect.left - padding &&
            dragBtnCenterX <= rect.right + padding &&
            dragBtnCenterY >= rect.top - padding &&
            dragBtnCenterY <= rect.bottom + padding
          ) {
            overButton = true;
          }
        });

        if (overButton && showDragBtn) {
          setShowDragBtn(false);
          const sliderElement = sectionRef.current;
          if (sliderElement) {
            sliderElement.classList.add("show-cursor");
          }
        } else if (!overButton && !showDragBtn) {
          setShowDragBtn(true);
          const sliderElement = sectionRef.current;
          if (sliderElement) {
            sliderElement.classList.remove("show-cursor");
          }
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isInSection, isOverNavButton, showDragBtn]);

  useEffect(() => {
    const handleButtonEnter = () => {
      setIsOverNavButton(true);
      setShowDragBtn(false);
      document.body.style.cursor = "pointer";
    };

    const handleButtonLeave = () => {
      setIsOverNavButton(false);
      if (isInSection) {
        setShowDragBtn(true);
        document.body.style.cursor = "none";
      } else {
        document.body.style.cursor = "default";
      }
    };

    const bucketElements = document.querySelectorAll(
      ".fp-swiper-button-next, .fp-swiper-button-prev, .fp-left-navigation, .home-benefits-cta"
    );

    bucketElements.forEach((el) => {
      el.addEventListener("mouseenter", handleButtonEnter);
      el.addEventListener("mouseleave", handleButtonLeave);
    });

    return () => {
      bucketElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleButtonEnter);
        el.removeEventListener("mouseleave", handleButtonLeave);
      });
    };
  }, [isInSection]);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
  };
  const handleDragEnd = () => {
    setIsDragging(false);
    dragStartXRef.current = null;
  };

  const handleDragMove = (e: MouseEvent) => {
    if (!isDragging || !swiperRef.current) return;
    const deltaX = e.movementX;
    if (Math.abs(deltaX) > 2) {
      const swiperInstance = swiperRef.current.swiper || swiperRef.current;
      if (deltaX > 0) {
        swiperInstance?.slidePrev?.();
      } else {
        swiperInstance?.slideNext?.();
      }
    }
    setDragPosition({ x: e.clientX, y: e.clientY });
    updateDragPosition(e.clientX, e.clientY);
  };

  // Sync drag button visibility with section bounds even without movement
  useEffect(() => {
    const checkPointerInSection = () => {
      const section = sectionRef.current;
      const pointer = lastPointerRef.current;
      if (!section || !pointer) return;

      const rect = section.getBoundingClientRect();
      const inside =
        pointer.x >= rect.left &&
        pointer.x <= rect.right &&
        pointer.y >= rect.top &&
        pointer.y <= rect.bottom;

      if (inside && !isOverNavButton) {
        setIsInSection(true);
        setShowDragBtn(true);
        document.body.style.cursor = "none";
        updateDragPosition(pointer.x, pointer.y);
      } else if (!inside) {
        setIsInSection(false);
        setShowDragBtn(false);
        setIsDragging(false);
        document.body.style.cursor = "default";
      }
    };

    window.addEventListener("scroll", checkPointerInSection, { passive: true });
    window.addEventListener("resize", checkPointerInSection);
    checkPointerInSection();

    return () => {
      window.removeEventListener("scroll", checkPointerInSection);
      window.removeEventListener("resize", checkPointerInSection);
    };
  }, [isOverNavButton]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleDragMove);
      document.addEventListener("mouseup", handleDragEnd);
      document.body.style.userSelect = "none";
    } else {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.body.style.userSelect = "";
    }

    return () => {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  return (
    <section id="fp-home_accommodation" ref={sectionRef}>
      {/* Navigation buttons positioned to overlay exactly where they were */}
      <div className="fp-left-navigation">
        <button className="fp-nav-btn fp-swiper-button-prev">
          <div className="fp-btn-outline fp-btn-outline-1"></div>
          <div className="fp-btn-outline fp-btn-outline-2"></div>
          <div className="fp-arrow-container">
            <svg
              width="30"
              height="12"
              viewBox="0 0 30 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 6H1M1 6L6 1M1 6L6 11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
        <button className="fp-nav-btn fp-swiper-button-next">
          <div className="fp-btn-outline fp-btn-outline-1"></div>
          <div className="fp-btn-outline fp-btn-outline-2"></div>
          <div className="fp-arrow-container">
            <svg
              width="30"
              height="12"
              viewBox="0 0 30 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 6H29M29 6L24 1M29 6L24 11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>

      <div className="fp-accommodation_swipe">
        <Swiper
          ref={swiperRef}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          speed={1000}
          navigation={{
            nextEl: ".fp-swiper-button-next",
            prevEl: ".fp-swiper-button-prev",
          }}
          className="fp-swiper swiper"
        >
          {properties.map((property) => (
            <SwiperSlide key={property.id} className="fp-swiper-slide">
              <div className="fp-left">
                {property.category && <p>{property.category}</p>}
                <h2>{property.title}</h2>
                <div className="fp-image">
                  <img src={property.leftImage} alt={property.subtitle} />
                  <img
                    className="fp-image-tablet"
                    src={property.tabletImage}
                    alt={property.subtitle}
                  />
                </div>
              </div>
              <div className="fp-right">
                <div className="fp-image">
                  <img src={property.rightImage} alt={property.subtitle} />
                </div>
                <div className="fp-content-wrapper">
                  <h4>{property.subtitle}</h4>
                  <div className="fp-text">
                    <p>{property.description}</p>
                  </div>
                  <GlassButton href={property.link}>Discover</GlassButton>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {showDragBtn && (
        <DragBtn
          ref={dragBtnRef}
          dragging={isDragging}
          onMouseDown={handleDragStart}
          variant="dark"
        />
      )}
    </section>
  );
};

export default FeaturedProperties;
