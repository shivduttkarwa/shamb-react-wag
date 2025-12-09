import React from 'react';
import './FilterGlassButton.css';

interface FilterGlassButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

const FilterGlassButton: React.FC<FilterGlassButtonProps> = ({
  onClick,
  children,
  className = '',
  isActive = false
}) => {
  return (
    <button
      className={`filter-benefits-cta ${isActive ? 'active' : ''} ${className}`}
      onClick={onClick}
    >
      <span className="filter-benefits-cta-bg"></span>
      <span className="filter-benefits-cta-label">{children}</span>
    </button>
  );
};

export default FilterGlassButton;