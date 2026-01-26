import React, { useState, useEffect, useCallback } from 'react';
import SectionTitle from '../UI/SectionTitle';
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

  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

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

  const styles: { [key: string]: React.CSSProperties } = {
    section: {
      width: '100%',
      minHeight: '100vh',
      backgroundColor: 'var(--color-off-white)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"Nunito", sans-serif',
    },
    container: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      minHeight: '100vh',
      position: 'relative',
    },
    sectionHeader: {
      width: '100%',
      padding: isMobile ? '2.5rem 1.5rem 1.5rem' : isTablet ? '3rem 2.5rem 1.5rem' : '3.5rem 3.75rem 1.5rem',
      textAlign: isMobile ? 'center' : 'left',
    },
    contentSide: {
      width: isMobile ? '100%' : isTablet ? '55%' : '50%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 2,
      minHeight: isMobile ? 'auto' : '100vh',
      overflow: 'hidden',
    },
    imageSide: {
      width: isMobile ? '100%' : isTablet ? '45%' : '50%',
      position: 'relative',
      overflow: 'hidden',
      height: isMobile ? '36vh' : 'auto',
      zIndex: 1,
    },
    mobileOverlay: {
      position: 'absolute',
      inset: 0,
      background: isMobile
        ? 'none'
        : 'none',
      zIndex: 1,
      pointerEvents: 'none',
    },
    slideContent: {
      position: 'relative',
      maxWidth: isMobile ? '100%' : '31.25rem',
      zIndex: 2,
    },
    contentStack: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      position: 'relative',
      zIndex: 2,
    },
    contentLayer: {
      gridArea: '1 / 1',
    },
    contentPanel: {
      backgroundColor: 'var(--color-white)',
      padding: isMobile ? '2.5rem 1.5rem 5rem' : isTablet ? '3.75rem 2.5rem' : '5rem 3.75rem',
      paddingBottom: isMobile ? '6rem' : '2.5rem',
      minHeight: isMobile ? 'auto' : '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    brandLabel: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: isMobile ? '0.5rem' : '0.75rem',
      marginBottom: isMobile ? '1rem' : '1.5rem',
      fontSize: isMobile ? '0.75rem' : '0.75rem',
      fontWeight: 700,
      letterSpacing: isMobile ? '0.125rem' : '0.1875rem',
      textTransform: 'uppercase',
      color: 'var(--color-green)',
    },
    brandLine: {
      width: isMobile ? '1.5rem' : '2.5rem',
      height: '0.125rem',
      backgroundColor: 'var(--color-gold)',
    },
    subtitle: {
      fontSize: isMobile ? '0.875rem' : '0.875rem',
      fontWeight: 600,
      letterSpacing: '0.125rem',
      textTransform: 'uppercase',
      color: 'var(--color-gold)',
      marginBottom: isMobile ? '0.5rem' : '0.75rem',
      opacity: 1,
      transition: 'opacity 0.3s ease',
    },
    title: {
      fontSize: isMobile ? '2.5rem' : isTablet ? '2.5rem' : 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: 800,
      color: 'var(--color-black)',
      margin: isMobile ? '0 0 1rem 0' : '0 0 1.5rem 0',
      lineHeight: 1.1,
      opacity: 1,
      transition: 'opacity 0.3s ease',
    },
    titleRow: {
      display: 'flex',
      alignItems: 'baseline',
      gap: isMobile ? '0.75rem' : '1rem',
      flexWrap: 'wrap',
    },
    description: {
      fontSize: isMobile ? '1rem' : '1rem',
      lineHeight: 1.8,
      color: 'var(--color-tertiary-brown)',
      marginBottom: isMobile ? '1.5rem' : '2rem',
      opacity: 1,
      transition: 'opacity 0.3s ease',
    },
    features: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: isMobile ? '0.75rem' : '1rem',
      marginBottom: isMobile ? '2rem' : '3rem',
      opacity: 1,
      transition: 'opacity 0.3s ease',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '0.5rem' : '0.625rem',
      fontSize: isMobile ? '0.9375rem' : '0.875rem',
      color: 'var(--color-black)',
    },
    featureIcon: {
      width: isMobile ? '1.125rem' : '1.25rem',
      height: isMobile ? '1.125rem' : '1.25rem',
      borderRadius: '50%',
      backgroundColor: 'var(--color-green-soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--color-success-text)',
      fontSize: isMobile ? '0.625rem' : '0.75rem',
      flexShrink: 0,
    },
    ctaButton: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      padding: isMobile ? '0.875rem 1.5rem' : '1rem 2rem',
      backgroundColor: 'var(--color-green)',
      color: 'var(--color-white)',
      border: 'none',
      fontSize: isMobile ? '0.9375rem' : '0.875rem',
      fontWeight: 600,
      letterSpacing: '0.0625rem',
      cursor: 'pointer',
      opacity: 1,
      transition: 'opacity 0.3s ease, background-color 0.3s ease',
      width: isMobile ? '100%' : 'auto',
    },
    imageContainer: {
      position: 'absolute',
      inset: 0,
    },
    slideImage: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      willChange: 'transform',
    },
    imageOverlay: {
      position: 'absolute',
      inset: 0,
      background: isMobile
        ? 'none'
        : 'linear-gradient(135deg, rgba(71, 97, 77, 0.3) 0%, rgba(0, 0, 0, 0.2) 100%)',
      zIndex: 1,
    },
    bigSlideNumber: {
      fontSize: isMobile ? '3rem' : '6rem',
      fontWeight: 700,
      color: isMobile ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.35)',
      letterSpacing: '0.25rem',
      fontFamily: '"Dream Avenue", cursive',
      pointerEvents: 'none',
    },
    bigSlideNumberBox: {
      position: 'absolute',
      top: isMobile ? 'calc(1.5rem + 30px)' : 'calc(2rem + 30px)',
      right: isMobile ? '1.5rem' : '2.5rem',
      zIndex: 3,
      pointerEvents: 'none',
    },
    navigation: {
      position: 'absolute',
      bottom: isMobile ? '2.75rem' : '2.5rem',
      left: isMobile ? '50%' : '3.75rem',
      transform: isMobile ? 'translateX(-50%)' : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: isMobile ? '1.25rem' : '1.5rem',
      zIndex: 3,
    },
    navButton: {
      width: isMobile ? '2.75rem' : '3.125rem',
      height: isMobile ? '2.75rem' : '3.125rem',
      border: isMobile ? '0.0625rem solid rgba(255,255,255,0.85)' : '0.125rem solid rgba(0,0,0,0.15)',
      backgroundColor: isMobile ? 'rgba(0,0,0,0.45)' : 'var(--color-green)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      color: 'var(--color-white)',
      borderRadius: '50%',
      boxShadow: isMobile ? 'none' : '0 0.75rem 1.5rem rgba(0,0,0,0.15)',
    },
    pagination: {
      position: 'absolute',
      left: '50%',
      bottom: isMobile ? '0.75rem' : '2.5rem',
      transform: 'translateX(-50%)',
      display: 'flex',
      justifyContent: 'center',
      gap: isMobile ? '0.375rem' : '0.5rem',
      zIndex: 3,
    },
    paginationDot: {
      width: isMobile ? '1.5rem' : '2.5rem',
      height: '0.25rem',
      backgroundColor: isMobile ? 'rgba(255,255,255,0.5)' : 'var(--color-gold-light)',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      padding: 0,
      borderRadius: isMobile ? '0.125rem' : '0',
    },
    paginationDotActive: {
      backgroundColor: isMobile ? 'var(--color-white)' : 'var(--color-gold)',
      transform: 'scaleY(1.5)',
      width: isMobile ? '2rem' : '2.5rem',
    },
    decorativeElement: {
      position: 'absolute',
      top: '50%',
      left: '-1.25rem',
      transform: 'translateY(-50%)',
      width: '2.5rem',
      height: '12.5rem',
      backgroundColor: 'var(--color-gold)',
      opacity: 0.1,
      zIndex: 0,
      display: isMobile ? 'none' : 'block',
    },
    slideIndicatorVertical: {
      position: 'absolute',
      right: '1.25rem',
      top: '50%',
      transform: 'translateY(-50%)',
      display: isMobile ? 'none' : 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      zIndex: 3,
    },
    verticalDot: {
      width: '0.25rem',
      height: '2.25rem',
      backgroundColor: 'rgba(255,255,255,0.6)',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    verticalDotActive: {
      backgroundColor: 'var(--color-gold)',
      height: '3.5rem',
      width: '0.3125rem',
    },
  };

  const keyframes = `
    @keyframes slideOverFromRight {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
      }
    }
    @keyframes slideOverFromLeft {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0);
      }
    }
    @keyframes contentFadeIn {
      from {
        opacity: 0;
        transform: translateY(1.25rem);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes contentInFromRight {
      from {
        opacity: 0;
        transform: translateX(1rem) translateY(0.5rem);
      }
      to {
        opacity: 1;
        transform: translateX(0) translateY(0);
      }
    }
    @keyframes contentInFromLeft {
      from {
        opacity: 0;
        transform: translateX(-1rem) translateY(0.5rem);
      }
      to {
        opacity: 1;
        transform: translateX(0) translateY(0);
      }
    }
    @keyframes panelInFromRight {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
      }
    }
    @keyframes panelInFromLeft {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0);
      }
    }
  `;

  return (
    <section
      className="shambala-services"
      style={styles.section}
      onMouseEnter={() => !isMobile && setIsPaused(true)}
      onMouseLeave={() => !isMobile && setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <style>{keyframes}</style>


      <div style={styles.sectionHeader}>
        <SectionTitle>Explore our services</SectionTitle>
      </div>

      <div style={styles.container}>
        {/* Image Side - Positioned first for mobile background */}
        <div style={styles.imageSide}>
          <div style={styles.imageContainer}>
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
                  style={{
                    ...styles.slideImage,
                    zIndex: isActive ? 2 : 1,
                    opacity: 1,
                    animation: isActive && isTransitioning
                      ? `${animationName} 1s cubic-bezier(0.4, 0, 0.2, 1) forwards`
                      : 'none',
                  }}
                />
              );
            })}
            <div style={styles.imageOverlay} />
          </div>


          {/* Mobile controls over image */}
          {isMobile && (
            <>
              <div style={styles.navigation}>
                <button
                  style={styles.navButton}
                  onClick={prevSlide}
                >
                  <svg width={isMobile ? '18' : '20'} height={isMobile ? '18' : '20'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </button>
                <button
                  style={styles.navButton}
                  onClick={nextSlide}
                >
                  <svg width={isMobile ? '18' : '20'} height={isMobile ? '18' : '20'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>

              <div style={styles.pagination}>
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    style={{
                      ...styles.paginationDot,
                      ...(idx === currentSlide ? styles.paginationDotActive : {}),
                    }}
                    onClick={() => goToSlide(idx)}
                  />
                ))}
              </div>
            </>
          )}

          {/* Vertical Indicators - Only on desktop */}
          {!isMobile && (
            <div style={styles.slideIndicatorVertical}>
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  style={{
                    ...styles.verticalDot,
                    ...(idx === currentSlide ? styles.verticalDotActive : {}),
                  }}
                  onClick={() => goToSlide(idx)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content Side */}
        <div style={styles.contentSide}>
          {/* Mobile overlay for better text readability */}
          {isMobile && <div style={styles.mobileOverlay} />}

          <div style={styles.decorativeElement} />


          <div style={styles.contentStack}>
            {isTransitioning && (
              <div
                style={{
                  ...styles.contentPanel,
                  ...styles.contentLayer,
                  pointerEvents: 'none',
                  zIndex: 1,
                  opacity: 1,
                }}
                aria-hidden="true"
              >
                <div style={styles.bigSlideNumberBox}>
                  <span style={styles.bigSlideNumber}>
                    {String(previousSlide + 1).padStart(2, '0')}
                  </span>
                </div>
                <div style={styles.slideContent}>
                  <div style={styles.brandLabel}>
                    <span style={styles.brandLine} />
                    Shambala Homes
                  </div>

                  <p style={styles.subtitle}>{slides[previousSlide].subtitle}</p>
                  <h2 style={styles.title}>{slides[previousSlide].title}</h2>
                  <p style={styles.description}>{slides[previousSlide].description}</p>

                  <div style={styles.features}>
                    {slides[previousSlide].features.map((feature, idx) => (
                      <div
                        key={idx}
                        style={styles.featureItem}
                      >
                        <span style={styles.featureIcon}>✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <button style={styles.ctaButton}>
                    Explore Service
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}

            <div
              key={currentSlide}
              style={{
                ...styles.contentPanel,
                ...styles.contentLayer,
                zIndex: 2,
                animation: isTransitioning
                  ? `${direction === 'next' ? 'panelInFromRight' : 'panelInFromLeft'} 1s cubic-bezier(0.4, 0, 0.2, 1) forwards`
                  : 'none',
              }}
            >
              <div style={styles.bigSlideNumberBox}>
                <span style={styles.bigSlideNumber}>
                  {String(currentSlide + 1).padStart(2, '0')}
                </span>
              </div>
              <div style={styles.slideContent}>
                <div style={styles.brandLabel}>
                  <span style={styles.brandLine} />
                  Shambala Homes
                </div>

                <p style={styles.subtitle}>{slides[currentSlide].subtitle}</p>
                <h2 style={styles.title}>{slides[currentSlide].title}</h2>
                <p style={styles.description}>{slides[currentSlide].description}</p>

                <div style={styles.features}>
                  {slides[currentSlide].features.map((feature, idx) => (
                    <div
                      key={idx}
                      style={styles.featureItem}
                    >
                      <span style={styles.featureIcon}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>

                <button
                  style={styles.ctaButton}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.backgroundColor = 'var(--color-gold)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.backgroundColor = 'var(--color-green)';
                    }
                  }}
                >
                  Explore Service
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Navigation - Desktop only */}
          {!isMobile && (
            <div className="fp-left-navigation shambala-services-nav">
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
