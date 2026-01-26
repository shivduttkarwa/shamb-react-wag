import React, { useState, useEffect, useCallback } from 'react';

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
  const [contentVisible, setContentVisible] = useState(true);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const goToSlide = useCallback((index: number, dir?: 'next' | 'prev') => {
    if (!contentVisible || index === currentSlide) return;

    setDirection(dir || (index > currentSlide ? 'next' : 'prev'));
    setContentVisible(false);

    setTimeout(() => {
      setCurrentSlide(index);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setContentVisible(true);
        });
      });
    }, 400);
  }, [currentSlide, contentVisible]);

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
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

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
    contentSide: {
      width: isMobile ? '100%' : isTablet ? '55%' : '50%',
      padding: isMobile ? '6.25rem 1.5rem 2.5rem' : isTablet ? '3.75rem 2.5rem' : '5rem 3.75rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      backgroundColor: isMobile ? 'transparent' : 'var(--color-white)',
      zIndex: 2,
      minHeight: isMobile ? '60vh' : 'auto',
      paddingBottom: isMobile ? '12rem' : '2.5rem',
    },
    imageSide: {
      width: isMobile ? '100%' : isTablet ? '45%' : '50%',
      position: isMobile ? 'absolute' : 'relative',
      overflow: 'hidden',
      height: isMobile ? '100%' : 'auto',
      inset: isMobile ? 0 : 'auto',
      zIndex: isMobile ? 0 : 1,
    },
    mobileOverlay: {
      position: 'absolute',
      inset: 0,
      background: isMobile
        ? 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.7) 100%)'
        : 'none',
      zIndex: 1,
      pointerEvents: 'none',
    },
    slideContent: {
      position: 'relative',
      maxWidth: isMobile ? '100%' : '31.25rem',
      zIndex: 2,
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
      opacity: contentVisible ? 1 : 0,
      transform: contentVisible ? 'translateY(0)' : 'translateY(1.25rem)',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDelay: contentVisible ? '0.1s' : '0s',
    },
    title: {
      fontSize: isMobile ? '2.5rem' : isTablet ? '2.5rem' : 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: 800,
      color: 'var(--color-black)',
      margin: isMobile ? '0 0 1rem 0' : '0 0 1.5rem 0',
      lineHeight: 1.1,
      opacity: contentVisible ? 1 : 0,
      transform: contentVisible ? 'translateY(0)' : 'translateY(1.875rem)',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDelay: contentVisible ? '0.15s' : '0s',
    },
    description: {
      fontSize: isMobile ? '1rem' : '1rem',
      lineHeight: 1.8,
      color: 'var(--color-tertiary-brown)',
      marginBottom: isMobile ? '1.5rem' : '2rem',
      opacity: contentVisible ? 1 : 0,
      transform: contentVisible ? 'translateY(0)' : 'translateY(1.25rem)',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDelay: contentVisible ? '0.2s' : '0s',
    },
    features: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: isMobile ? '0.75rem' : '1rem',
      marginBottom: isMobile ? '2rem' : '3rem',
      opacity: contentVisible ? 1 : 0,
      transform: contentVisible ? 'translateY(0)' : 'translateY(1.25rem)',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDelay: contentVisible ? '0.25s' : '0s',
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
      opacity: contentVisible ? 1 : 0,
      transform: contentVisible ? 'translateY(0)' : 'translateY(1.25rem)',
      transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease',
      transitionDelay: contentVisible ? '0.3s' : '0s',
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
      transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    imageOverlay: {
      position: 'absolute',
      inset: 0,
      background: isMobile
        ? 'none'
        : 'linear-gradient(135deg, rgba(71, 97, 77, 0.3) 0%, rgba(0, 0, 0, 0.2) 100%)',
      zIndex: 1,
    },
    slideNumber: {
      position: 'absolute',
      bottom: isMobile ? 'auto' : '2.5rem',
      top: isMobile ? '1.5rem' : 'auto',
      right: isMobile ? '1.5rem' : '2.5rem',
      zIndex: 10,
      display: 'flex',
      alignItems: 'baseline',
      gap: '0.5rem',
      color: isMobile ? 'var(--color-black)' : 'var(--color-white)',
    },
    currentNum: {
      fontSize: isMobile ? '1.75rem' : '3rem',
      fontWeight: 700,
      lineHeight: 1,
    },
    totalNum: {
      fontSize: isMobile ? '0.875rem' : '1rem',
      fontWeight: 400,
      opacity: 0.7,
    },
    navigation: {
      position: 'absolute',
      bottom: isMobile ? '2rem' : '2.5rem',
      left: isMobile ? '50%' : '3.75rem',
      transform: isMobile ? 'translateX(-50%)' : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: isMobile ? '1rem' : '1.5rem',
      zIndex: 3,
    },
    navButton: {
      width: isMobile ? '2.75rem' : '3.125rem',
      height: isMobile ? '2.75rem' : '3.125rem',
      border: '0.125rem solid var(--color-gold)',
      backgroundColor: isMobile ? 'var(--color-white)' : 'transparent',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      color: 'var(--color-gold)',
      borderRadius: isMobile ? '50%' : '0',
    },
    pagination: {
      position: 'absolute',
      left: '50%',
      bottom: isMobile ? '5rem' : '2.5rem',
      transform: 'translateX(-50%)',
      display: 'flex',
      justifyContent: 'center',
      gap: isMobile ? '0.375rem' : '0.5rem',
      zIndex: 3,
    },
    paginationDot: {
      width: isMobile ? '1.5rem' : '2.5rem',
      height: '0.25rem',
      backgroundColor: 'var(--color-gold-light)',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      padding: 0,
      borderRadius: isMobile ? '0.125rem' : '0',
    },
    paginationDotActive: {
      backgroundColor: 'var(--color-gold)',
      transform: 'scaleY(1.5)',
      width: isMobile ? '2rem' : '2.5rem',
    },
    progressBar: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: isMobile ? '0.1875rem' : '0.25rem',
      backgroundColor: 'var(--color-gold)',
      zIndex: 10,
      animation: isPaused ? 'none' : 'progress 6s linear infinite',
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
      width: '0.1875rem',
      height: '1.875rem',
      backgroundColor: 'rgba(255,255,255,0.3)',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    verticalDotActive: {
      backgroundColor: 'var(--color-gold)',
      height: '3.125rem',
    },
    swipeHint: {
      position: 'absolute',
      bottom: '8rem',
      left: '50%',
      transform: 'translateX(-50%)',
      display: isMobile ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      fontSize: '0.75rem',
      color: 'var(--color-tertiary-brown)',
      opacity: 0.7,
      zIndex: 3,
    },
  };

  const keyframes = `
    @keyframes progress {
      from { width: 0%; }
      to { width: 100%; }
    }
    @keyframes slideInFromRight {
      from {
        clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
      }
      to {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }
    }
    @keyframes slideInFromLeft {
      from {
        clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
      }
      to {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }
    }
    @keyframes scaleIn {
      from { transform: scale(1.1); }
      to { transform: scale(1); }
    }
    @keyframes swipeHint {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(0.625rem); }
    }
  `;

  return (
    <section
      style={styles.section}
      onMouseEnter={() => !isMobile && setIsPaused(true)}
      onMouseLeave={() => !isMobile && setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <style>{keyframes}</style>

      {/* Progress Bar */}
      <div
        key={currentSlide}
        style={styles.progressBar}
      />

      <div style={styles.container}>
        {/* Image Side - Positioned first for mobile background */}
        <div style={styles.imageSide}>
          <div style={styles.imageContainer}>
            {slides.map((slide, idx) => (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.title}
                style={{
                  ...styles.slideImage,
                  opacity: idx === currentSlide ? 1 : 0,
                  transform: idx === currentSlide ? 'scale(1)' : 'scale(1.1)',
                  clipPath: idx === currentSlide
                    ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                    : direction === 'next'
                      ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
                      : 'polygon(0 0, 0 0, 0 100%, 0 100%)',
                  animation: idx === currentSlide
                    ? `${direction === 'next' ? 'slideInFromRight' : 'slideInFromLeft'} 0.8s cubic-bezier(0.4, 0, 0.2, 1), scaleIn 1.2s ease-out`
                    : 'none',
                }}
              />
            ))}
            <div style={styles.imageOverlay} />
          </div>

          {/* Slide Number - Only show on desktop */}
          {!isMobile && (
            <div style={styles.slideNumber}>
              <span style={styles.currentNum}>0{currentSlide + 1}</span>
              <span style={styles.totalNum}>/ 0{slides.length}</span>
            </div>
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

          {/* Slide Number - Mobile position */}
          {isMobile && (
            <div style={styles.slideNumber}>
              <span style={styles.currentNum}>0{currentSlide + 1}</span>
              <span style={styles.totalNum}>/ 0{slides.length}</span>
            </div>
          )}

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

          {/* Navigation - Fixed position for both mobile and desktop */}
          <div style={styles.navigation}>
            <button
              style={styles.navButton}
              onClick={prevSlide}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.backgroundColor = 'var(--color-gold)';
                  e.currentTarget.style.color = 'var(--color-white)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-gold)';
                }
              }}
            >
              <svg width={isMobile ? '18' : '20'} height={isMobile ? '18' : '20'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <button
              style={styles.navButton}
              onClick={nextSlide}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.backgroundColor = 'var(--color-gold)';
                  e.currentTarget.style.color = 'var(--color-white)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-gold)';
                }
              }}
            >
              <svg width={isMobile ? '18' : '20'} height={isMobile ? '18' : '20'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* Pagination - Fixed position */}
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

          {/* Swipe Hint - Fixed position */}
          {isMobile && (
            <div style={styles.swipeHint}>
              <span>Swipe to explore</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ animation: 'swipeHint 1.5s ease-in-out infinite' }}
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShambalaServices;
