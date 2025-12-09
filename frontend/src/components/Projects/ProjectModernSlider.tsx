import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Parallax,
  Navigation,
  Pagination,
  Keyboard,
} from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/parallax";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./ProjectModernSlider.css";
import TiltTextGsap from "../UI/TiltTextGsap";
import DragBtn from "./DragBtn";

const publicUrl = import.meta.env.BASE_URL;

interface SlideData {
  id: number;
  image: string;
  tag?: string;
  title: string;
  description: string;
  buttonText: string;
}

const ProjectModernSlider: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const sliderSectionRef = useRef<HTMLElement>(null);
  const dragBtnRef = useRef<HTMLDivElement>(null);
  const [isInSection, setIsInSection] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [showDragBtn, setShowDragBtn] = useState(false);
  const [isOverNavButton, setIsOverNavButton] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);

  const slidesData: SlideData[] = [
    {
      id: 1,
      image: `${publicUrl}images/l1.jpg`,
      tag: "ARCHITECTURAL DESIGN",
      title: "VISION",
      description:
        "Transform your vision into architectural excellence with our comprehensive design services. From conceptual sketches to detailed blueprints, we create spaces that blend functionality with aesthetic appeal.",
      buttonText: "Explore Projects",
    },
    {
      id: 2,
      image: `${publicUrl}images/l2.jpg`,
      tag: "CONSTRUCTION EXCELLENCE",
      title: "BUILDING",
      description:
        "Experience superior craftsmanship with our comprehensive construction services. From foundation to finish, we execute every project with precision, using premium materials and advanced techniques.",
      buttonText: "View Portfolio",
    },
    {
      id: 3,
      image: `${publicUrl}images/l3.jpg`,
      tag: "INTERIOR DESIGN",
      title: "LIVING",
      description:
        "Discover the potential of your interior spaces with our expert design services. Let's create a home that truly reflects your unique lifestyle and personality.",
      buttonText: "See Designs",
    },
  ];

  // Smooth cursor following with requestAnimationFrame
  const updateDragButtonPosition = (x: number, y: number) => {
    if (!dragBtnRef.current) return;
    const rect = sliderSectionRef.current?.getBoundingClientRect();
    const clampX = rect ? Math.min(Math.max(x, rect.left), rect.right) : x;
    const clampY = rect ? Math.min(Math.max(y, rect.top), rect.bottom) : y;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      if (dragBtnRef.current) {
        dragBtnRef.current.style.left = `${clampX}px`;
        dragBtnRef.current.style.top = `${clampY - 15}px`; // Position slightly above cursor
      }
    });
  };

  // Handle mouse enter/leave for drag button
  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      setIsInSection(true);
      if (!isOverNavButton) {
        setShowDragBtn(true);
        document.body.style.cursor = "none"; // Hide cursor completely
        lastPointerRef.current = { x: e.clientX, y: e.clientY };
        updateDragButtonPosition(e.clientX, e.clientY);
      }
    };

    const handleMouseLeave = () => {
      setIsInSection(false);
      setShowDragBtn(false);
      setIsDragging(false);
      document.body.style.cursor = "default"; // Restore cursor
      
      const section = sliderSectionRef.current;
      if (section) {
        section.classList.remove("show-cursor");
      }
    };

    // Global mouse move handler to detect when leaving section bounds
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isInSection) {
        const section = sliderSectionRef.current;
        if (section) {
          const rect = section.getBoundingClientRect();
          const { clientX, clientY } = e;
          
          // If mouse is outside section bounds, trigger leave
          if (clientX < rect.left || clientX > rect.right || 
              clientY < rect.top || clientY > rect.bottom) {
            setIsInSection(false);
            setShowDragBtn(false);
            setIsDragging(false);
            document.body.style.cursor = "default";
            section.classList.remove("show-cursor");
          }
        }
      }
    };

    const section = sliderSectionRef.current;
    if (section) {
      section.addEventListener("mouseenter", handleMouseEnter);
      section.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("mousemove", handleGlobalMouseMove);
    }

    return () => {
      if (section) {
        section.removeEventListener("mouseenter", handleMouseEnter);
        section.removeEventListener("mouseleave", handleMouseLeave);
      }
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.body.style.cursor = "default"; // Ensure cursor is restored
    };
  }, [isOverNavButton, isInSection]);

  // Handle mouse move for drag button position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
      if (isInSection && !isOverNavButton) {
        setDragPosition({ x: e.clientX, y: e.clientY });
        updateDragButtonPosition(e.clientX, e.clientY);
        
        // Check if drag button overlaps with any buttons
        // Drag button is 104x104px and positioned at cursor - 15px Y offset
        const dragBtnCenterX = e.clientX;
        const dragBtnCenterY = e.clientY - 15;
        const dragBtnSize = 52; // Half of 104px for radius-based collision
        
        const buttonElements = document.querySelectorAll('.pms-swiper-button-next, .pms-swiper-button-prev');
        let overButton = false;
        
        buttonElements.forEach(button => {
          const rect = button.getBoundingClientRect();
          // Add some padding to make collision detection more stable
          const padding = 10;
          if (dragBtnCenterX >= (rect.left - padding) && dragBtnCenterX <= (rect.right + padding) && 
              dragBtnCenterY >= (rect.top - padding) && dragBtnCenterY <= (rect.bottom + padding)) {
            overButton = true;
          }
        });
        
        if (overButton && showDragBtn) {
          setShowDragBtn(false);
          // Add CSS class to show pointer cursor
          const sliderElement = sliderSectionRef.current;
          if (sliderElement) {
            sliderElement.classList.add("show-cursor");
          }
        } else if (!overButton && !showDragBtn) {
          setShowDragBtn(true);
          // Remove CSS class to hide cursor
          const sliderElement = sliderSectionRef.current;
          if (sliderElement) {
            sliderElement.classList.remove("show-cursor");
          }
        }
      }
    };

    if (isInSection && !isOverNavButton) {
      document.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isInSection, isOverNavButton, showDragBtn]);

  useEffect(() => {
    if (!isInSection || !showDragBtn) {
      document.body.style.cursor = "default";
    }
  }, [isInSection, showDragBtn]);

  // Check if mouse is over navigation buttons and slide buttons
  useEffect(() => {
    const handleButtonEnter = () => {
      setIsOverNavButton(true);
      setShowDragBtn(false);
      document.body.style.cursor = "pointer"; // Show pointer for buttons
    };

    const handleButtonLeave = () => {
      setIsOverNavButton(false);
      if (isInSection) {
        setShowDragBtn(true);
        document.body.style.cursor = "none"; // Hide cursor again
      } else {
        document.body.style.cursor = "default"; // Restore cursor
      }
    };

    const nextButton = document.querySelector(".pms-swiper-button-next");
    const prevButton = document.querySelector(".pms-swiper-button-prev");
    const slideButtons = document.querySelectorAll(".pms-creative-slide--btn");

    // Navigation buttons
    if (nextButton) {
      nextButton.addEventListener("mouseenter", handleButtonEnter);
      nextButton.addEventListener("mouseleave", handleButtonLeave);
    }
    if (prevButton) {
      prevButton.addEventListener("mouseenter", handleButtonEnter);
      prevButton.addEventListener("mouseleave", handleButtonLeave);
    }

    // Slide buttons (Explore Projects, View Portfolio, See Designs)
    slideButtons.forEach(button => {
      button.addEventListener("mouseenter", handleButtonEnter);
      button.addEventListener("mouseleave", handleButtonLeave);
    });

    return () => {
      if (nextButton) {
        nextButton.removeEventListener("mouseenter", handleButtonEnter);
        nextButton.removeEventListener("mouseleave", handleButtonLeave);
      }
      if (prevButton) {
        prevButton.removeEventListener("mouseenter", handleButtonEnter);
        prevButton.removeEventListener("mouseleave", handleButtonLeave);
      }
      
      slideButtons.forEach(button => {
        button.removeEventListener("mouseenter", handleButtonEnter);
        button.removeEventListener("mouseleave", handleButtonLeave);
      });
    };
  }, [isInSection]);

  // Keep drag button visibility in sync with slider bounds even without mouse movement
  useEffect(() => {
    const checkPointerInSection = () => {
      const section = sliderSectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const outOfView = rect.bottom <= 0 || rect.top >= window.innerHeight;

      if (outOfView) {
        setIsInSection(false);
        setShowDragBtn(false);
        setIsDragging(false);
        document.body.style.cursor = "default";
        return;
      }

      const pointer = lastPointerRef.current;
      const px = pointer?.x ?? window.innerWidth / 2;
      const py = pointer?.y ?? window.innerHeight / 2;

      const inside =
        px >= rect.left &&
        px <= rect.right &&
        py >= rect.top &&
        py <= rect.bottom;

      if (inside && !isOverNavButton) {
        setIsInSection(true);
        setShowDragBtn(true);
        document.body.style.cursor = "none";
        updateDragButtonPosition(px, py);
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

  // Observer to hide drag button when slider leaves viewport without needing mouse movement
  useEffect(() => {
    const section = sliderSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setIsInSection(false);
            setShowDragBtn(false);
            setIsDragging(false);
            document.body.style.cursor = "default";
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      document.body.style.cursor = "default";
    };
  }, []);

  // Drag functionality
  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);

    // Stop autoplay when dragging starts
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleDragMove = (e: MouseEvent) => {
    if (!isDragging || !swiperRef.current) return;

    const deltaX = e.movementX;
    if (Math.abs(deltaX) > 2) {
      if (deltaX > 0) {
        swiperRef.current.slidePrev();
      } else {
        swiperRef.current.slideNext();
      }
    }

    // Update position during drag
    setDragPosition({ x: e.clientX, y: e.clientY });
    updateDragButtonPosition(e.clientX, e.clientY);
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    // Restart autoplay after a delay if not in section
    setTimeout(() => {
      if (swiperRef.current && !isInSection) {
        swiperRef.current.autoplay.start();
      }
    }, 2000);
  };

  // Global mouse event listeners for drag
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

  useEffect(() => {
    const section = sliderSectionRef.current;
    if (!section) return;

    if (showDragBtn && isInSection && !isOverNavButton) {
      section.classList.add("pms-hide-cursor");
      document.body.style.cursor = "none";
    } else {
      section.classList.remove("pms-hide-cursor");
      document.body.style.cursor = "default";
    }

    return () => {
      section.classList.remove("pms-hide-cursor");
      document.body.style.cursor = "default";
    };
  }, [showDragBtn, isInSection, isOverNavButton]);

  return (
    <section className="pms-creative-fullpage--slider" ref={sliderSectionRef}>
      <div className="pms-banner-horizental">
        <Swiper
          modules={[Autoplay, Parallax, Navigation, Pagination, Keyboard]}
          speed={1600}
          parallax={true}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".pms-swiper-button-next",
            prevEl: ".pms-swiper-button-prev",
          }}
          pagination={{
            el: ".pms-swiper-pagination",
            type: "progressbar",
          }}
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          loop={true}
          className="pms-swiper-container-h"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={() => {
            if (isInSection && !isOverNavButton) {
              setShowDragBtn(true);
            }
          }}
        >
          {slidesData.map((slide) => (
            <SwiperSlide key={slide.id} className="pms-swiper-slide">
              <div className="pms-slider-inner" data-swiper-parallax="100">
                <img
                  src={slide.image}
                  alt="full_screen-image"
                  className="pms-slide-image"
                />
                <div className="pms-swiper-content" data-swiper-parallax="2000">
                  <div className="pms-title-area">
                    {slide.tag && <p className="pms-tag">{slide.tag}</p>}
                    {slide.id === 1 ? (
                      <TiltTextGsap
                        startTrigger="top 80%"
                        endTrigger="bottom -1000%"
                        className="pms-title pms-title-tilt"
                      >
                        {slide.title}
                      </TiltTextGsap>
                    ) : (
                      <a href="#" className="pms-title">
                        {slide.title}
                      </a>
                    )}
                  </div>
                  <p className="pms-disc">{slide.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="pms-swiper-button-wrapper pms-creative-button--wrapper">
            <div
              className="pms-swiper-button-next"
              tabIndex={0}
              role="button"
              aria-label="Next slide"
            ></div>
            <div
              className="pms-swiper-button-prev"
              tabIndex={0}
              role="button"
              aria-label="Previous slide"
            ></div>
          </div>

          <div className="pms-slider-pagination-area">
            <h5 className="pms-slide-range pms-one">01</h5>
            <div className="pms-swiper-pagination pms-swiper-pagination-progressbar pms-swiper-pagination-horizontal"></div>
            <h5 className="pms-slide-range pms-three">03</h5>
          </div>
        </Swiper>
      </div>

      {/* Drag Button */}
      {showDragBtn && (
        <DragBtn
          ref={dragBtnRef}
          dragging={isDragging}
          onMouseDown={handleDragStart}
        />
      )}
    </section>
  );
};

export default ProjectModernSlider;
