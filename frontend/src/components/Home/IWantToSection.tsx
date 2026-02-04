import React, { useState, useEffect, useRef } from 'react';
import { initGsapSwitchAnimations } from '../../lib/gsapSwitchAnimations';
import AestheticButton from '../UI/AestheticButton';
import './IWantToSection.css';

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

const IWantToSection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    return initGsapSwitchAnimations(sectionRef.current || undefined);
  }, []);

  return (
    <section ref={sectionRef} className="i-want-section">
      <div className="i-want-section__container">
        {/* Header */}
        <div className="i-want-section__header">
          <div data-gsap="fade-up" className="i-want-section__eyebrow">
            Your Journey Begins
          </div>
          <h2 data-gsap="fade-up" className="i-want-section__title">
            I want to<span className="i-want-section__title-accent">...</span>
          </h2>
        </div>

        {/* Grid */}
        <div
          data-gsap="slide-right"
          data-gsap-stagger="0.2"
          data-gsap-ease="back.out(1.2)"
          className="i-want-section__grid image-cards-row"
        >
          {serviceOptions.map((option) => (
            <button
              key={option.id}
              className="i-want-section__card"
              onMouseEnter={() => setHoveredId(option.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => console.log(`Navigate to ${option.title}`)}
              aria-label={`${option.title} - ${option.subtitle}`}
            >
              {/* Content */}
              <div className="i-want-section__card-content">
                <div className="i-want-section__icon">
                  {option.icon}
                </div>

                <div>
                  <h3 className="i-want-section__card-title">{option.title}</h3>
                  <p className="i-want-section__card-subtitle">{option.subtitle}</p>
                </div>

                {/* Arrow CTA */}
                <div className="i-want-section__arrow-wrapper">
                  <span>Explore</span>
                  <div className="i-want-section__arrow">
                    <div className="i-want-section__arrow-head" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* CTA Section */}
        <div data-gsap="btn-clip-bottom" className="i-want-section__cta-wrapper">
          <AestheticButton className="essence-cta-btn" text="Get in Touch" href="/contact-us" />
        </div>
      </div>
    </section>
  );
};

export default IWantToSection;
