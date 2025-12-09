import React, { useEffect, useState } from 'react';
import './Preloader.css';

interface PreloaderProps {
  onComplete?: () => void;
  duration?: number;
}

const Preloader: React.FC<PreloaderProps> = ({ 
  onComplete, 
  duration = 2500 // Fast 2.5 seconds total
}) => {
  const [isHidden, setIsHidden] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (hasStarted) return; // Prevent double execution
    
    setHasStarted(true);
    
    // Start percentage counter after border animation (1 second)
    const startDelay = 1500; // Slightly longer delay to ensure animation completes
    const countDuration = 1000; // 1 second for counting
    
    const timer = setTimeout(() => {
      let count = 1; // Start from 1%
      setPercentage(1); // Set initial display to 1%
      const increment = 99 / (countDuration / 16); // 60fps, count from 1 to 100
      
      const counter = setInterval(() => {
        count += increment;
        if (count >= 100) {
          count = 100;
          setPercentage(100);
          clearInterval(counter);
          
          // Hide preloader after completion
          setTimeout(() => {
            setIsHidden(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 500); // Wait for fade out
          }, 200);
        } else {
          setPercentage(Math.floor(count));
        }
      }, 16);
    }, startDelay);

    return () => {
      clearTimeout(timer);
    };
  }, []); // Empty dependency array to run only once

  return (
    <div className={`preloader ${isHidden ? 'preloader--hidden' : ''}`}>
      <div className="preloader__content">
        <div className="loader-frame">
          <div className="loader-corners">
            {/* Top Left */}
            <div className="corner corner--top-left">
              <div className="corner-line corner-line--vertical"></div>
              <div className="corner-line corner-line--horizontal"></div>
            </div>
            
            {/* Top Right */}
            <div className="corner corner--top-right">
              <div className="corner-line corner-line--horizontal"></div>
              <div className="corner-line corner-line--vertical"></div>
            </div>
            
            {/* Bottom Right */}
            <div className="corner corner--bottom-right">
              <div className="corner-line corner-line--vertical"></div>
              <div className="corner-line corner-line--horizontal"></div>
            </div>
            
            {/* Bottom Left */}
            <div className="corner corner--bottom-left">
              <div className="corner-line corner-line--horizontal"></div>
              <div className="corner-line corner-line--vertical"></div>
            </div>
          </div>
          
          <div className="frame-line frame-line--top"></div>
          <div className="frame-line frame-line--bottom"></div>
          
          <div className="percentage">{percentage}%</div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;