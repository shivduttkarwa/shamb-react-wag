import React from 'react';
import './ScrollDownButton.css';

interface ScrollDownButtonProps {
  targetId?: string;
  onClick?: () => void;
}

const ScrollDownButton: React.FC<ScrollDownButtonProps> = ({ targetId, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (targetId) {
      const element = document.getElementById(targetId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="scroll-down-btn" onClick={handleClick} aria-label="Scroll down">
      <div className="scroll-down-btn-inner">
        <svg
          className="scroll-down-icon"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="-0.8" x2="12" y2="19"></line>
          <polyline points="19,12 12,19 5,12"></polyline>
        </svg>
      </div>
    </div>
  );
};

export default ScrollDownButton;
