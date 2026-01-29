import React, { useEffect, useRef } from 'react';
import './AncientHero.css';

const AncientHero: React.FC = () => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (particlesRef.current) {
      const particleCount = window.innerWidth < 768 ? 20 : 40;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        // Slower animation duration (25s instead of 15s)
        particle.style.animationDuration = `${Math.random() * 15 + 25}s`;
        particlesRef.current.appendChild(particle);
      }
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    btn.style.setProperty('--x', `${x}%`);
    btn.style.setProperty('--y', `${y}%`);
  };

  const handleParallax = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    const gateway = document.querySelector('.gateway') as HTMLElement;
    const mandala = document.querySelector('.mandala') as HTMLElement;
    
    if (gateway) {
      gateway.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    }
    if (mandala) {
      mandala.style.transform = `translate(-50%, -50%) rotate(${x}deg)`;
    }
  };

  return (
    <section className="sanctuary" onMouseMove={handleParallax}>
      {/* Background Image */}
      <div className="sanctuary__bg">
        <img 
          src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2940&auto=format&fit=crop" 
          alt="Ancient Himalayan Architecture at Golden Hour"
        />
      </div>

      {/* Atmospheric Effects */}
      <div className="sanctuary__veil" />
      <div className="sanctuary__mist" />

      {/* Sacred Geometry */}
      <div className="mandala">
        <svg viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90"/>
          <circle cx="100" cy="100" r="70"/>
          <circle cx="100" cy="100" r="50"/>
          <circle cx="100" cy="100" r="30"/>
          <polygon points="100,10 190,100 100,190 10,100"/>
          <polygon points="100,30 170,100 100,170 30,100"/>
          <line x1="100" y1="10" x2="100" y2="190"/>
          <line x1="10" y1="100" x2="190" y2="100"/>
          <line x1="30" y1="30" x2="170" y2="170"/>
          <line x1="170" y1="30" x2="30" y2="170"/>
        </svg>
      </div>

      {/* Golden Dust - Slower */}
      <div className="particles" ref={particlesRef} />

      {/* Main Content */}
      <div className="sanctuary__content">
        <div className="gateway">
          <div className="subtitle">The Hidden Kingdom</div>
          <h1>
            <span className="line">Architecture</span>
            <span className="line">of the Soul</span>
          </h1>
          <p className="tagline">
            We design sacred spaces that bridge the earthly and the divine, 
            drawing from the ancient wisdom of Shambhala's golden age.
          </p>
          
          <a 
            href="#" 
            className="cta-prayer" 
            onMouseMove={handleMouseMove}
          >
            <span className="wheel" />
            <span>Enter the Sanctuary</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator - Moved Down */}
      <div className="lotus-scroll">
        <div className="lotus" />
        <div className="lotus-line" />
      </div>
    </section>
  );
};

export default AncientHero;