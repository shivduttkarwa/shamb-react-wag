import React, { useState, useEffect, useCallback, useRef } from 'react';
import TiltTextGsap from '../UI/TiltTextGsap';
import AestheticButton from '../UI/AestheticButton';
import { initGsapSwitchAnimations } from '../../lib/gsapSwitchAnimations';
import './ShambalaServices.css';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'New Home',
    subtitle: 'Build Your Dream',
    description: 'Start fresh with a custom-designed home tailored to your lifestyle. From foundation to finishing touches, we bring your vision to life.',
    features: ['Custom Floor Plans', 'Premium Materials', 'Energy Efficient', 'Smart Home Ready'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  },
  {
    id: 2,
    title: 'Upgrade',
    subtitle: 'Elevate Your Living',
    description: 'Transform your current space into something extraordinary. Modern renovations that enhance both comfort and value.',
    features: ['Kitchen Remodels', 'Bathroom Upgrades', 'Room Additions', 'Outdoor Living'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  },
  {
    id: 3,
    title: 'Downsize',
    subtitle: 'Simplify Elegantly',
    description: 'Transition to a more manageable space without sacrificing style. Smart solutions for comfortable, efficient living.',
    features: ['Space Optimization', 'Storage Solutions', 'Accessible Design', 'Low Maintenance'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    id: 4,
    title: 'Commercial',
    subtitle: 'Business Excellence',
    description: 'Professional spaces that inspire productivity and impress clients. From offices to retail, we build for success.',
    features: ['Office Design', 'Retail Spaces', 'Hospitality', 'Industrial'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  },
];

// Custom hook for responsive detection
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const ShambalaServices: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { width, height } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isLandscape = width > height;
  const isMobileLandscape = isMobile && isLandscape;

  const goToSlide = useCallback((index: number, dir?: 'next' | 'prev') => {
    if (isTransitioning || index === currentSlide) return;

    setDirection(dir || (index > currentSlide ? 'next' : 'prev'));
    setPreviousSlide(currentSlide);
    setIsTransitioning(true);

    // Change slide immediately so both images are visible during transition
    setCurrentSlide(index);

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  }, [currentSlide, isTransitioning]);

  const nextSlide = useCallback(() => {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next, 'next');
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prev, 'prev');
  }, [currentSlide, goToSlide]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  useEffect(() => {
    if (isPaused) return;
    return undefined;
  }, [isPaused]);

  useEffect(() => {
    return initGsapSwitchAnimations(sectionRef.current || undefined);
  }, []);

  
  // Only dynamic animation styles that depend on state
  const getAnimationStyle = (isActive: boolean, isPrevious: boolean) => {
    if (!isActive || !isTransitioning) return {};

    const animationName = direction === 'next' ? 'slideOverFromRight' : 'slideOverFromLeft';
    return {
      animation: `${animationName} 1s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
    };
  };

  const getPanelAnimationStyle = () => {
    if (!isTransitioning) return {};

    const animationName = direction === 'next' ? 'panelInFromRight' : 'panelInFromLeft';
    return {
      animation: `${animationName} 1s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
    };
  };

  return (
    <section
      ref={sectionRef}
      className="shambala-services"
      onMouseEnter={() => !isMobile && !isMobileLandscape && setIsPaused(true)}
      onMouseLeave={() => !isMobile && !isMobileLandscape && setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="shambala-services__header">
        <TiltTextGsap
          className="shambala-services__section-title"
          startTrigger="top 90%"
          endTrigger="top 70%"
        >
          Explore our services
        </TiltTextGsap>
      </div>

      <div className="shambala-services__container">
        {/* Image Side - Positioned first for mobile background */}
        <div className="shambala-services__image-side" data-gsap="slide-left">
          <div className="shambala-services__image-container">
            {slides.map((slide, idx) => {
              const isActive = idx === currentSlide;
              const isPrevious = idx === previousSlide;
              const shouldShow = isActive || (isPrevious && isTransitioning);

              if (!shouldShow) return null;

              const animationName = direction === 'next' ? 'slideOverFromRight' : 'slideOverFromLeft';

              return (
                <img
                  key={`${slide.id}-${isActive ? 'active' : 'prev'}`}
                  src={slide.image}
                  alt={slide.title}
                  className="shambala-services__slide-image"
                  style={{
                    zIndex: isActive ? 2 : 1,
                    ...getAnimationStyle(isActive, isPrevious),
                  }}
                />
              );
            })}
            <div className="shambala-services__image-overlay" />
          </div>


          {/* Mobile controls over image */}
          {(isMobile || isMobileLandscape) && (
            <>
              <div className="shambala-services__navigation">
                <button
                  className="shambala-services__nav-button"
                  onClick={prevSlide}
                >
                  <svg width={isMobileLandscape ? '16' : isMobile ? '18' : '20'} height={isMobileLandscape ? '16' : isMobile ? '18' : '20'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </button>
                <button
                  className="shambala-services__nav-button"
                  onClick={nextSlide}
                >
                  <svg width={isMobileLandscape ? '16' : isMobile ? '18' : '20'} height={isMobileLandscape ? '16' : isMobile ? '18' : '20'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>

              <div className="shambala-services__pagination">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    className={`shambala-services__pagination-dot ${idx === currentSlide ? 'shambala-services__pagination-dot--active' : ''}`}
                    onClick={() => goToSlide(idx)}
                  />
                ))}
              </div>
            </>
          )}

          {/* Vertical Indicators - Only on desktop */}
          {!isMobile && !isMobileLandscape && !isTablet && (
            <div className="shambala-services__slide-indicator-vertical">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  className={`shambala-services__vertical-dot ${idx === currentSlide ? 'shambala-services__vertical-dot--active' : ''}`}
                  onClick={() => goToSlide(idx)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content Side */}
        <div className="shambala-services__content-side">
          {/* Mobile overlay for better text readability */}
          {(isMobile && !isMobileLandscape) && <div className="shambala-services__mobile-overlay" />}

          <div className="shambala-services__decorative-element" />


          <div className="shambala-services__content-stack">
            {isTransitioning && (
              <div
                className="shambala-services__content-panel shambala-services__content-layer shambala-services__content-layer--previous"
                style={{
                  pointerEvents: 'none',
                  zIndex: 1,
                  opacity: 1,
                }}
                aria-hidden="true"
              >
                <div className="shambala-services__big-slide-number-box">
                  <span className="shambala-services__big-slide-number">
                    {String(previousSlide + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="shambala-services__slide-content">


                  <p data-gsap="fade-up" data-gsap-delay="0.1" className="shambala-services__subtitle">{slides[previousSlide].subtitle}</p>
                  <h2 data-gsap="fade-up" data-gsap-delay="0.2" className="shambala-services__title">{slides[previousSlide].title}</h2>
                  <p data-gsap="fade-up" data-gsap-delay="0.3" className="shambala-services__description">{slides[previousSlide].description}</p>

                  <div data-gsap="fade-up" data-gsap-delay="0.4" className="shambala-services__features">
                    {slides[previousSlide].features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="shambala-services__feature-item"
                      >
                        <span className="shambala-services__feature-icon">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div data-gsap="btn-clip-bottom"  className="shambala-services__explore-cta">
                  <AestheticButton
                    className="essence-cta-btn"
                    text="Explore Service"
                    href={`/services/${slides[previousSlide].title.toLowerCase().replace(' ', '-')}`}
                  />
                  </div>
                </div>
              </div>
            )}

            <div
              key={currentSlide}
              className="shambala-services__content-panel shambala-services__content-layer shambala-services__content-layer--active"
              style={{
                zIndex: 2,
                ...getPanelAnimationStyle(),
              }}
            >
              <div data-gsap="zoom-in" data-gsap-delay="0.4" data-gsap-ease="back.out(1.7)" className="shambala-services__big-slide-number-box">
                <span className="shambala-services__big-slide-number">
                  {String(currentSlide + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="shambala-services__slide-content">


                <p data-gsap="fade-up" data-gsap-delay="0.1" className="shambala-services__subtitle">{slides[currentSlide].subtitle}</p>
                <h2 data-gsap="fade-up" data-gsap-delay="0.2" className="shambala-services__title">{slides[currentSlide].title}</h2>
                <p data-gsap="fade-up" data-gsap-delay="0.3" className="shambala-services__description">{slides[currentSlide].description}</p>

                <div data-gsap="fade-up" data-gsap-delay="0.4" className="shambala-services__features">
                  {slides[currentSlide].features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="shambala-services__feature-item"
                    >
                      <span className="shambala-services__feature-icon">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>

                <div data-gsap="fade-up">
                <AestheticButton
                  className="essence-cta-btn"
                  text="Explore Service"
                  href={`/services/${slides[currentSlide].title.toLowerCase().replace(' ', '-')}`}
                />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation - Desktop only */}
          {!isMobile && !isMobileLandscape && (
            <div data-gsap="slide-right" data-gsap-ease="back.out(1.7)" data-gsap-start="top 100%" className="fp-left-navigation shambala-services-nav">
              <button className="fp-nav-btn fp-swiper-button-prev" onClick={prevSlide}>
                <div className="fp-btn-outline fp-btn-outline-1"></div>
                <div className="fp-btn-outline fp-btn-outline-2"></div>
                <div className="fp-arrow-container">
                  <svg width="30" height="12" viewBox="0 0 30 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 6H1M1 6L6 1M1 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              </button>
              <button className="fp-nav-btn fp-swiper-button-next" onClick={nextSlide}>
                <div className="fp-btn-outline fp-btn-outline-1"></div>
                <div className="fp-btn-outline fp-btn-outline-2"></div>
                <div className="fp-arrow-container">
                  <svg width="30" height="12" viewBox="0 0 30 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 6H29M29 6L24 1M29 6L24 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default ShambalaServices;
