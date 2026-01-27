import React from 'react';

interface ReadMoreButtonProps {
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const ReadMoreButton: React.FC<ReadMoreButtonProps> = ({
  text = 'Read More',
  onClick,
  disabled = false,
  className = '',
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const styles = {
    button: {
      position: 'relative' as const,
      padding: '24px 60px',
      background: 'white',
      color: '#40513B',
      border: 'none',
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: '1.1rem',
      letterSpacing: '5px',
      textTransform: 'uppercase' as const,
      cursor: disabled ? 'not-allowed' : 'pointer',
      boxShadow: isHovered
        ? '0 15px 40px rgba(230, 126, 34, 0.3)'
        : '0 5px 20px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.5s ease',
      overflow: 'hidden',
      opacity: disabled ? 0.6 : 1,
      transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
    } as React.CSSProperties,

    fill: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      width: isHovered ? '100%' : '4px',
      height: '100%',
      background: '#E67E22',
      transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    } as React.CSSProperties,

    text: {
      position: 'relative' as const,
      zIndex: 2,
      color: isHovered ? 'white' : '#40513B',
      transition: 'color 0.5s ease',
    } as React.CSSProperties,
  };

  return (
    <button
      className={className}
      style={styles.button}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={styles.fill}></span>
      <span style={styles.text}>{text}</span>
    </button>
  );
};

export default ReadMoreButton;