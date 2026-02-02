import { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = () => {
  const [counter, setCounter] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [hidePreloader, setHidePreloader] = useState(false);
  const [hideCurtain, setHideCurtain] = useState(false);
  const [hideCounter, setHideCounter] = useState(false);

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
      setHideCounter(true);

      setTimeout(() => {
        setHidePreloader(true);
        setCurtainOpen(true);
        // Dispatch event when curtain starts opening
        window.dispatchEvent(new CustomEvent('curtainStarted'));

        setTimeout(() => {
          setHideCurtain(true);
          // Allow body scrolling
          document.body.classList.add('content-loaded');
          // Dispatch event to trigger hero animations after curtain opens
          window.dispatchEvent(new CustomEvent('curtainOpened'));
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
    setHideCounter(true);

    setTimeout(() => {
      setHidePreloader(true);
      setCurtainOpen(true);
      // Dispatch event when curtain starts opening
      window.dispatchEvent(new CustomEvent('curtainStarted'));

      setTimeout(() => {
        setHideCurtain(true);
        // Allow body scrolling
        document.body.classList.add('content-loaded');
        // Dispatch event to trigger hero animations after curtain opens
        window.dispatchEvent(new CustomEvent('curtainOpened'));
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

          {/* LAYER 1: Outer Energy Ring */}
          <svg className="mandala-svg layer-outer" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="95" fill="none" stroke="#d4af37" strokeWidth="0.3" opacity="0.25" />

            <g fill="none" stroke="#d4af37" strokeWidth="0.4" opacity="0.3">
              {[...Array(16)].map((_, i) => (
                <g key={i} transform={`rotate(${i * 22.5} 100 100)`}>
                  <path d="M100,6 Q100,20 100,34" strokeLinecap="round" />
                  <circle cx="100" cy="6" r="1" fill="#d4af37" opacity="0.4" />
                </g>
              ))}
            </g>

            <circle cx="100" cy="100" r="68" fill="none" stroke="#d4af37" strokeWidth="0.3" opacity="0.3" strokeDasharray="2 6" />
          </svg>

          {/* LAYER 2: Sacred Lotus */}
          <svg className="mandala-svg layer-lotus" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="60" fill="none" stroke="#d4af37" strokeWidth="0.4" opacity="0.4" />

            <g fill="none" stroke="#d4af37" strokeWidth="0.6" opacity="0.45" strokeLinecap="round">
              {[...Array(8)].map((_, i) => (
                <g key={i} transform={`rotate(${i * 45} 100 100)`}>
                  <path d="M100,42 Q108,50 110,62 Q106,70 100,75 Q94,70 90,62 Q92,50 100,42 Z" />
                  <path d="M100,45 Q104,52 100,65" strokeWidth="0.3" opacity="0.5" />
                </g>
              ))}
            </g>
          </svg>

          {/* LAYER 3: Inner Energy Waves */}
          <svg className="mandala-svg layer-inner" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="40" fill="none" stroke="#d4af37" strokeWidth="0.4" opacity="0.5" />

            <g fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.5" strokeLinecap="round">
              {[...Array(12)].map((_, i) => (
                <g key={i} transform={`rotate(${i * 30} 100 100)`}>
                  <path d="M100,62 Q105,75 100,88" />
                  <path d="M100,62 Q95,75 100,88" />
                </g>
              ))}
            </g>
          </svg>

          {/* LAYER 4: Sacred Center */}
          <svg className="mandala-svg layer-center" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="22" fill="none" stroke="#d4af37" strokeWidth="0.4" opacity="0.6" />
            <circle cx="100" cy="100" r="16" fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.7" />

            <g fill="none" stroke="#d4af37" strokeWidth="0.7" opacity="0.7" strokeLinecap="round">
              {[...Array(4)].map((_, i) => (
                <path
                  key={i}
                  d="M100,86 Q106,90 100,94 Q94,90 100,86"
                  transform={`rotate(${i * 90} 100 100)`}
                />
              ))}
            </g>

            <g>
              <circle cx="100" cy="100" r="9" fill="#d4af37" opacity="0.15" />
              <circle cx="100" cy="100" r="6" fill="#d4af37" opacity="0.25" />
              <circle cx="100" cy="100" r="5" fill="none" stroke="#d4af37" strokeWidth="0.6" opacity="0.85" />
              <circle cx="100" cy="100" r="3" fill="#d4af37" opacity="0.9" />
              <circle cx="100" cy="100" r="1.2" fill="#0d0d0d" opacity="1" />
            </g>
          </svg>
        </div>

        {/* Logo */}
        <img className="brand-logo" src={`${import.meta.env.BASE_URL}images/shambala.png`} alt="Shambala Homes Logo" />
      </div>

      {/* Counter - Bottom Right */}
      <div
        className="counter-container"
        style={{
          opacity: hideCounter ? 0 : 1,
          display: hideCounter ? 'none' : 'block'
        }}
      >
        <div className="counter">
          <span className="digit">{Math.floor(counter / 100) || ''}</span>
          <span className="digit">{counter >= 10 ? Math.floor((counter % 100) / 10) : (counter >= 100 ? 0 : '')}</span>
          <span className="digit">{counter % 10}</span>
          <span className="percent">%</span>
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
