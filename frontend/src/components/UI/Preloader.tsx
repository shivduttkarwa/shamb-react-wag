import { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = () => {
  const [counter, setCounter] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [hidePreloader, setHidePreloader] = useState(false);
  const [hideCurtain, setHideCurtain] = useState(false);

  useEffect(() => {
    const duration = 4500;
    const interval = duration / 100;
    let count = 0;
    let timeoutId: number;

    const updateCounter = () => {
      if (count <= 100) {
        setCounter(count);
        count++;
        timeoutId = window.setTimeout(updateCounter, interval);
      } else {
        window.setTimeout(revealHero, 500);
      }
    };

    const revealHero = () => {
      setIsLoaded(true);

      setTimeout(() => {
        setHidePreloader(true);
        setCurtainOpen(true);

        setTimeout(() => {
          setHideCurtain(true);
        }, 2500);
      }, 1000);
    };

    const startTimer = window.setTimeout(() => {
      updateCounter();
    }, 800);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleSkip = () => {
    setCounter(100);
    setIsLoaded(true);

    setTimeout(() => {
      setHidePreloader(true);
      setCurtainOpen(true);

      setTimeout(() => {
        setHideCurtain(true);
      }, 2500);
    }, 100);
  };

  return (
    <>
      {/* Preloader */}
      <div
        className={`preloader ${isLoaded ? 'loaded' : ''}`}
        style={{ display: hidePreloader ? 'none' : 'flex' }}
        onClick={handleSkip}
      >
        <div className="mandala-container">
          {/* Ambient Glow */}
          <div className="ambient-glow"></div>

          {/* LAYER 1: Outer Ring - 12 elegant petals */}
          <svg className="mandala-svg layer-outer" viewBox="0 0 200 200">
            <g fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.4">
              <circle cx="100" cy="100" r="95" strokeDasharray="2 8" />
            </g>
            <g fill="none" stroke="#d4af37" strokeWidth="0.75" opacity="0.5">
              {[...Array(12)].map((_, i) => (
                <path
                  key={i}
                  d="M100,8 Q108,50 100,92 Q92,50 100,8"
                  transform={`rotate(${i * 30} 100 100)`}
                />
              ))}
            </g>
          </svg>

          {/* LAYER 2: Second Ring - 8 pointed star pattern */}
          <svg className="mandala-svg layer-second" viewBox="0 0 200 200">
            <g fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.5">
              <circle cx="100" cy="100" r="72" />
            </g>
            <g fill="none" stroke="#d4af37" strokeWidth="0.75" opacity="0.6">
              {[...Array(8)].map((_, i) => (
                <line
                  key={i}
                  x1="100"
                  y1="30"
                  x2="100"
                  y2="70"
                  transform={`rotate(${i * 45} 100 100)`}
                />
              ))}
            </g>
            <g fill="#d4af37" opacity="0.5">
              {[...Array(8)].map((_, i) => (
                <circle
                  key={i}
                  cx="100"
                  cy="30"
                  r="2"
                  transform={`rotate(${i * 45} 100 100)`}
                />
              ))}
            </g>
          </svg>

          {/* LAYER 3: Third Ring - 6 curved arcs */}
          <svg className="mandala-svg layer-third" viewBox="0 0 200 200">
            <g fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.4">
              <circle cx="100" cy="100" r="52" strokeDasharray="4 4" />
            </g>
            <g fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.7">
              {[...Array(6)].map((_, i) => (
                <g key={i}>
                  <path
                    d="M100,52 Q120,76 100,100"
                    transform={`rotate(${i * 60} 100 100)`}
                  />
                  <path
                    d="M100,52 Q80,76 100,100"
                    transform={`rotate(${i * 60} 100 100)`}
                  />
                </g>
              ))}
            </g>
          </svg>

          {/* LAYER 4: Inner Ring - Simple geometric */}
          <svg className="mandala-svg layer-inner" viewBox="0 0 200 200">
            <g fill="none" stroke="#d4af37" strokeWidth="0.75" opacity="0.6">
              <circle cx="100" cy="100" r="35" />
            </g>
          </svg>

          {/* LAYER 5: Center - Lotus essence */}
          <svg className="mandala-svg layer-center" viewBox="0 0 200 200">
            <g fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.8">
              <circle cx="100" cy="100" r="18" />
            </g>
            <g fill="#d4af37">
              <circle cx="100" cy="100" r="6" opacity="0.9" />
              <circle cx="100" cy="100" r="3" fill="#0d0d0d" />
            </g>
            <g fill="none" stroke="#d4af37" strokeWidth="0.75" opacity="0.7">
              {[...Array(4)].map((_, i) => (
                <ellipse
                  key={i}
                  cx="100"
                  cy="85"
                  rx="4"
                  ry="8"
                  transform={`rotate(${i * 90} 100 100)`}
                />
              ))}
            </g>
          </svg>
        </div>

        {/* Brand Name */}
        <div className="brand-name">
          <h1>Shambala</h1>
          <div className="divider"></div>
          <p>Homes</p>
        </div>

        {/* Counter */}
        <div className="counter-container">
          <div className="counter">
            <span>{counter}</span>%
          </div>
          <div className="progress-line">
            <div className="progress-fill" style={{ width: `${counter}%` }}></div>
          </div>
        </div>
      </div>

      {/* Curtain */}
      <div
        className={`curtain ${curtainOpen ? 'open' : ''}`}
        style={{ display: hideCurtain ? 'none' : 'flex' }}
      >
        <div className="curtain-left"></div>
        <div className="curtain-right"></div>
      </div>
    </>
  );
};

export default Preloader;