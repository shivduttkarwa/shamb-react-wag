import React, { useEffect, useRef } from 'react';
import { initGsapSwitchAnimations } from '../../lib/gsapSwitchAnimations';
import AestheticButton from '../UI/AestheticButton';
import './QualityHomes.css';

const QualityHomes: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    return initGsapSwitchAnimations(sectionRef.current || undefined);
  }, []);

  return (
    <section ref={sectionRef} className="quality home-section home-section--quality">
      <div className="quality__inner">
        {/* Content Side */}
        <div className="quality__content">
          <p data-gsap="fade-up" data-gsap-delay="0.1" className="quality__label">Why Shambala</p>

          <h2 data-gsap="fade-up" data-gsap-delay="0.2" className="quality__title">
            Homes built with
            <span>intention</span>
          </h2>

          <p data-gsap="fade-up" data-gsap-delay="0.3" className="quality__desc">
            We believe a home is more than walls and windows. It's where
            life happens, memories are made, and dreams take shape.
          </p>

          {/* Features */}
          <div data-gsap="fade-up" data-gsap-stagger="0.2" className="quality__features">
            <div className="quality__feature">
              <div className="quality__feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div className="quality__feature-text">
                <h3>Thoughtful Design</h3>
                <p>Every space crafted with purpose and beauty in mind.</p>
              </div>
            </div>

            <div className="quality__feature">
              <div className="quality__feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div className="quality__feature-text">
                <h3>Quality Assured</h3>
                <p>Premium materials and meticulous craftsmanship.</p>
              </div>
            </div>

            <div className="quality__feature">
              <div className="quality__feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <div className="quality__feature-text">
                <h3>Timely Delivery</h3>
                <p>Your dream home, delivered when promised.</p>
              </div>
            </div>

            <div className="quality__feature">
              <div className="quality__feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <div className="quality__feature-text">
                <h3>Personal Touch</h3>
                <p>Dedicated support through every step of your journey.</p>
              </div>
            </div>
          </div>

          <div data-gsap="btn-clip-bottom" data-gsap-delay="0.5" style={{ display: 'flex', justifyContent: 'center' }}>
            <AestheticButton className="essence-cta-btn" text="Learn More" href="/about" />
          </div>
        </div>

        {/* Image Side */}
        <div className="quality__media">
          <div className="quality__img-wrap">
            <img data-gsap="zoom-in"
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80"
              alt="Luxury Interior"
              className="quality__img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityHomes;