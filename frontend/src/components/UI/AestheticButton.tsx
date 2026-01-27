import React from 'react';

interface AestheticButtonProps {
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const AestheticButton: React.FC<AestheticButtonProps> = ({
  text = 'Get Quote',
  onClick,
  disabled = false,
  className = '',
}) => {
  const styles = {
    button: {
      padding: 0,
      background: 'transparent',
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'flex',
      fontFamily: "'Montserrat', sans-serif",
      overflow: 'hidden',
      boxShadow: '0 5px 20px rgba(64, 81, 59, 0.15)',
      transition: 'box-shadow 0.4s ease',
      opacity: disabled ? 0.6 : 1,
    } as React.CSSProperties,

    text: {
      padding: '20px 40px',
      background: '#40513B',
      color: '#E5D9B6',
      fontSize: '0.85rem',
      letterSpacing: '3px',
      textTransform: 'uppercase' as const,
      transition: 'all 0.4s ease',
    } as React.CSSProperties,

    icon: {
      padding: '20px 22px',
      background: '#E67E22',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.4s ease',
    } as React.CSSProperties,
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      className={className}
      style={{
        ...styles.button,
        boxShadow: isHovered
          ? '0 15px 40px rgba(64, 81, 59, 0.25)'
          : '0 5px 20px rgba(64, 81, 59, 0.15)',
      }}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        style={{
          ...styles.text,
          background: isHovered ? '#628141' : '#40513B',
          padding: isHovered ? '20px 45px' : '20px 40px',
        }}
      >
        {text}
      </span>
      <span
        style={{
          ...styles.icon,
          padding: isHovered ? '20px 28px' : '20px 22px',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          style={{
            width: '18px',
            height: '18px',
            transition: 'transform 0.4s ease',
            transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </span>
    </button>
  );
};

export default AestheticButton;