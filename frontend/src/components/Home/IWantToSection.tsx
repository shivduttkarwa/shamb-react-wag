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
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10L12 3L3 10v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/>
        <polyline points="8 10 12 6 16 10"/>
        <line x1="8" y1="21" x2="8" y2="14"/>
        <line x1="12" y1="21" x2="12" y2="11"/>
        <line x1="16" y1="21" x2="16" y2="16"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Downsize',
    subtitle: 'Simplify your lifestyle',
    icon: (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
        <rect x="8" y="8" width="8" height="8" rx="1" ry="1"/>
        <line x1="8" y1="12" x2="16" y2="12"/>
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Commercial',
    subtitle: 'Professional business spaces',
    icon: (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="7" width="18" height="13" rx="2" ry="2"/>
        <path d="M8 3v4M16 3v4"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <circle cx="7.5" cy="16" r="0.5" fill="currentColor"/>
        <circle cx="12" cy="16" r="0.5" fill="currentColor"/>
        <circle cx="16.5" cy="16" r="0.5" fill="currentColor"/>
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
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? '1.5rem' : isTablet ? '2rem' : '2rem',
      maxWidth: isMobile ? '100%' : '115%',
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

    return {
      position: 'relative',
      padding: isMobile ? '2.5rem 2rem' : '3rem 2.25rem',
      backgroundColor: '#FFFFFF',
      border: '1px solid #E8E8E3',
      borderRadius: '0.75rem',
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all 0.2s ease',
      overflow: 'hidden',
      minHeight: isMobile ? '18rem' : '22rem',
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
      width: '4.5rem',
      height: '4.5rem',
      marginBottom: '2rem',
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
      fontSize: isMobile ? '2.4375rem' : '2.925rem',
      fontWeight: 800,
      color: isHovered ? '#47614D' : '#1A1A1A',
      margin: '0 0 0.625rem 0',
      lineHeight: 1.2,
      transition: 'all 0.3s ease',
      letterSpacing: '-0.01em',
    };
  };

  const getSubtitleStyles = (id: number): React.CSSProperties => {
    const isHovered = hoveredId === id;

    return {
      fontSize: '1.21875rem',
      color: isHovered ? '#47614D' : '#6B6B6B',
      margin: '0 0 2.5rem 0',
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
      gap: '0.625rem',
      color: isHovered ? '#47614D' : '#47614D',
      fontSize: '0.975rem',
      fontWeight: 700,
      letterSpacing: '0.12rem',
      textTransform: 'uppercase',
      transition: 'all 0.3s ease',
    };
  };

  const getArrowStyles = (id: number): React.CSSProperties => {
    const isHovered = hoveredId === id;

    return {
      width: isHovered ? '3.25rem' : '2.275rem',
      height: '1.5px',
      backgroundColor: isHovered ? '#47614D' : '#47614D',
      transition: 'all 0.3s ease',
      position: 'relative',
    };
  };

  const getArrowHeadStyles = (id: number): React.CSSProperties => {
    const isHovered = hoveredId === id;

    return {
      position: 'absolute',
      right: '-4px',
      top: '-3px',
      width: '10.4px',
      height: '10.4px',
      borderTop: `1.5px solid ${isHovered ? '#47614D' : '#47614D'}`,
      borderRight: `1.5px solid ${isHovered ? '#47614D' : '#47614D'}`,
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
