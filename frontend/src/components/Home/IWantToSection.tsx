import React, { useState, useEffect, useRef } from 'react';
import { initGsapSwitchAnimations } from '../../lib/gsapSwitchAnimations';
import AestheticButton from '../UI/AestheticButton';

interface ServiceOption {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const serviceOptions: ServiceOption[] = [
  {
    id: 1,
    title: 'Build New',
    subtitle: 'Start fresh with your dream home',
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
        <line x1="9" y1="17" x2="15" y2="17"/>
        <circle cx="12" cy="7" r="1"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Upgrade',
    subtitle: 'Elevate your current space',
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10L12 3L3 10v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/>
        <polyline points="8 10 12 6 16 10"/>
        <line x1="8" y1="21" x2="8" y2="14"/>
        <line x1="12" y1="21" x2="12" y2="11"/>
        <line x1="16" y1="21" x2="16" y2="16"/>
      </svg>
    ),
  },
];

const useWindowSize = () => {
  const [windowSize, setWindowSize] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth });
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const IWantToSection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    return initGsapSwitchAnimations(sectionRef.current || undefined);
  }, []);

  const styles: { [key: string]: React.CSSProperties } = {
    section: {
      width: '100%',
      padding: isMobile ? '5rem 1.5rem' : isTablet ? '7rem 2.5rem' : '9rem 4rem',
      backgroundColor: 'transparent',
      fontFamily: '"Nunito", sans-serif',
      position: 'relative',
      overflow: 'hidden',
    },
    
    
    container: {
      maxWidth: '97.75rem',
      margin: '0 auto',
      position: 'relative',
    },
    header: {
      marginBottom: isMobile ? '3.5rem' : isTablet ? '4.5rem' : '5.5rem',
      position: 'relative',
      textAlign: 'center',
    },
    eyebrow: {
      fontSize: '0.9rem',
      fontWeight: 700,
      letterSpacing: '0.2rem',
      textTransform: 'uppercase',
      color: '#6a4c09',
      marginBottom: '1.25rem',
    },
    title: {
      fontSize: 'var(--home-section-title-size)',
      fontWeight: 800,
      fontFamily: '"Dream Avenue", sans-serif',
      color: '#1A1A1A',
      margin: '0 0 1rem 0',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    titleAccent: {
      color: '#6a4c09',
    },
    description: {
      fontSize: isMobile ? '1.3rem' : '1.38rem',
      color: '#000000',
      maxWidth: '40rem',
      margin: '0 auto',
      lineHeight: 1.7,
      fontWeight: 400,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: isMobile ? '1.5rem' : isTablet ? '2.5rem' : '3rem',
      maxWidth: isMobile ? '100%' : isTablet ? '90%' : '85%',
      margin: '0 auto',
    },
    ctaWrapper: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: isMobile ? '3rem' : isTablet ? '4rem' : '5rem',
    },
  };

  const getCardStyles = (id: number, index: number): React.CSSProperties => {
    const isHovered = hoveredId === id;

    // Color palette from ServiceTestimonials
    const cardColors = ['#ffe66d', '#a8e6cf'];
    const backgroundColor = cardColors[index] || '#FFFFFF';

    return {
      position: 'relative',
      padding: isMobile ? '3rem 2.5rem' : isTablet ? '4rem 3rem' : '5rem 4rem',
      backgroundColor: backgroundColor,
      border: '1px solid #E8E8E3',
      borderRadius: '1rem',
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all 0.2s ease',
      overflow: 'hidden',
      minHeight: isMobile ? '20rem' : isTablet ? '28rem' : '32rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: isHovered
        ? '0 0.25rem 0.75rem rgba(0, 0, 0, 0.08), 0 0.125rem 0.25rem rgba(0, 0, 0, 0.06)'
        : '0 0.5rem 1.5rem rgba(0, 0, 0, 0.1), 0 0.25rem 0.5rem rgba(0, 0, 0, 0.08)',
      transform: isHovered ? 'translateY(0.25rem)' : 'translateY(0)',
    };
  };


  const getIconWrapperStyles = (id: number): React.CSSProperties => {
    const isHovered = hoveredId === id;

    return {
      width: isMobile ? '5rem' : isTablet ? '6rem' : '7rem',
      height: isMobile ? '5rem' : isTablet ? '6rem' : '7rem',
      marginBottom: isMobile ? '2.5rem' : '3rem',
      color: isHovered ? '#47614D' : '#47614D',
      transition: 'all 0.3s ease',
      transform: isHovered ? 'scale(1.05) rotate(-5deg)' : 'scale(1)',
      position: 'relative',
      zIndex: 2,
    };
  };

  const getContentStyles = (): React.CSSProperties => {
    return {
      position: 'relative',
      zIndex: 2,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    };
  };

  const getTitleStyles = (id: number): React.CSSProperties => {
    const isHovered = hoveredId === id;

    return {
      fontSize: isMobile ? '2.8rem' : isTablet ? '3.5rem' : '4rem',
      fontWeight: 800,
      color: isHovered ? '#47614D' : '#1A1A1A',
      margin: '0 0 1rem 0',
      lineHeight: 1.2,
      transition: 'all 0.3s ease',
      letterSpacing: '-0.01em',
    };
  };

  const getSubtitleStyles = (id: number): React.CSSProperties => {
    const isHovered = hoveredId === id;

    return {
      fontSize: isMobile ? '1.3rem' : isTablet ? '1.5rem' : '1.7rem',
      color: isHovered ? '#47614D' : '#333',
      margin: '0 0 3rem 0',
      lineHeight: 1.6,
      fontWeight: 400,
      transition: 'all 0.3s ease',
    };
  };

  const getArrowWrapperStyles = (id: number): React.CSSProperties => {
    const isHovered = hoveredId === id;

    return {
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: '0.8rem',
      color: isHovered ? '#47614D' : '#47614D',
      fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem',
      fontWeight: 700,
      letterSpacing: '0.12rem',
      textTransform: 'uppercase',
      transition: 'all 0.3s ease',
    };
  };

  const getArrowStyles = (id: number): React.CSSProperties => {
    const isHovered = hoveredId === id;

    return {
      width: isHovered ? '4rem' : '3rem',
      height: '2px',
      backgroundColor: isHovered ? '#47614D' : '#47614D',
      transition: 'all 0.3s ease',
      position: 'relative',
    };
  };

  const getArrowHeadStyles = (id: number): React.CSSProperties => {
    const isHovered = hoveredId === id;

    return {
      position: 'absolute',
      right: '-5px',
      top: '-4px',
      width: '12px',
      height: '12px',
      borderTop: `2px solid ${isHovered ? '#47614D' : '#47614D'}`,
      borderRight: `2px solid ${isHovered ? '#47614D' : '#47614D'}`,
      transform: 'rotate(45deg)',
      transition: 'all 0.3s ease',
    };
  };

  return (
    <>
      
      
      <section
        ref={sectionRef}
        style={styles.section}
        className="i-want-section"
      >
        <div style={styles.ornamentTop} />
        
        
        <div style={styles.container}>
          {/* Header */}
          <div style={styles.header}>
            <div data-gsap="fade-up" style={styles.eyebrow}>Your Journey Begins</div>
            <h2 data-gsap="fade-up" style={styles.title}>
              I want to<span style={styles.titleAccent}>...</span>
            </h2>
            <p data-gsap="lines" style={styles.description} className="lead">
              Every great transformation starts with a single decision. Choose your path and let us guide you through an exceptional experience.
            </p>
          </div>

          {/* Grid */}
          <div data-gsap="slide-right" data-gsap-stagger="0.2" data-gsap-ease="back.out(1.2)" style={styles.grid} className="image-cards-row">
            {serviceOptions.map((option, index) => (
              <button
                key={option.id}
                style={getCardStyles(option.id, index)}
                className="i-want-section__card"
                onMouseEnter={() => setHoveredId(option.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => console.log(`Navigate to ${option.title}`)}
                aria-label={`${option.title} - ${option.subtitle}`}
              >
                {/* Content */}
                <div style={getContentStyles()} className="i-want-section__card-content">
                  <div style={getIconWrapperStyles(option.id)}>
                    {option.icon}
                  </div>
                  
                  <div>
                    <h3 style={getTitleStyles(option.id)}>{option.title}</h3>
                    <p style={getSubtitleStyles(option.id)}>{option.subtitle}</p>
                  </div>
                  
                  {/* Arrow CTA */}
                  <div style={getArrowWrapperStyles(option.id)}>
                    <span>Explore</span>
                    <div style={getArrowStyles(option.id)}>
                      <div style={getArrowHeadStyles(option.id)} />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* CTA Section */}
          <div data-gsap="btn-clip-bottom" style={styles.ctaWrapper}>
            <AestheticButton className="essence-cta-btn" text="Get in Touch" href="/contact" />
          </div>

        </div>
      </section>
    </>
  );
};

export default IWantToSection;
