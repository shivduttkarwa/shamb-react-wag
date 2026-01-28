import React from 'react';
import { Link } from 'react-router-dom';

interface AestheticButtonProps extends React.PropsWithChildren {
  text?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  target?: '_blank' | '_self';
  rel?: string;
}

const AestheticButton: React.FC<AestheticButtonProps> = ({
  children,
  text = 'Get Quote',
  href,
  onClick,
  disabled = false,
  className = '',
  target = '_self',
  rel,
}) => {
  const styles = {
    button: {
      padding: 0,
      background: 'transparent',
      border: 'none',
      borderRadius: '8px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'inline-flex',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      fontFamily: "'Montserrat', sans-serif",
      overflow: 'hidden',
      width: 'fit-content',
      whiteSpace: 'nowrap',
      lineHeight: 1,
      transition: 'box-shadow 0.4s ease',
      opacity: disabled ? 0.6 : 1,
    } as React.CSSProperties,

    text: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '20px 32px',
      background: '#40513B',
      color: '#E5D9B6',
      fontSize: '0.8rem',
      letterSpacing: '0.16em',
      textTransform: 'uppercase' as const,
      transition: 'all 0.4s ease',
    } as React.CSSProperties,

    icon: {
      display: 'inline-flex',
      padding: '20px 18px',
      background: '#E67E22',
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.4s ease',
    } as React.CSSProperties,
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const buttonInner = (
    <>
      <span
        style={{
          ...styles.text,
          background: isHovered ? '#628141' : '#40513B',
          padding: isHovered ? '20px 36px' : '20px 32px',
        }}
      >
        {children ?? text}
      </span>
      <span
        style={{
          ...styles.icon,
          padding: isHovered ? '20px 22px' : '20px 18px',
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
    </>
  );

  const commonProps = {
    className,
    style: {
      ...styles.button,
      boxShadow: isHovered
        ? '0 12px 30px rgba(64, 81, 59, 0.22)'
        : '0 4px 16px rgba(64, 81, 59, 0.12)',
    } as React.CSSProperties,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  if (href) {
    if (href.startsWith('/')) {
      return (
        <Link to={href} {...commonProps}>
          {buttonInner}
        </Link>
      );
    }
    return (
      <a href={href} target={target} rel={rel} {...commonProps}>
        {buttonInner}
      </a>
    );
  }

  return (
    <button {...commonProps} onClick={onClick} disabled={disabled} type="button">
      {buttonInner}
    </button>
  );
};

export default AestheticButton;
