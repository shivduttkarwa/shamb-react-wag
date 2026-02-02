import React from 'react';
import { Link } from 'react-router-dom';

interface ReadMoreButtonProps {
  text?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  target?: '_blank' | '_self';
  rel?: string;
  size?: 'default' | 'compact' | 'card';
}

const ReadMoreButton: React.FC<ReadMoreButtonProps> = ({
  text = 'Read More',
  href,
  onClick,
  disabled = false,
  className = '',
  target = '_self',
  rel,
  size = 'default',
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const isCompact = size === 'compact';
  const isCard = size === 'card';

  const defaultPadding = isCard ? '16px 40px' : isCompact ? '12px 28px' : '24px 60px';
  const defaultFontSize = isCard ? '0.95rem' : isCompact ? '0.8rem' : '1.1rem';
  const defaultLetterSpacing = isCard ? '3px' : isCompact ? '2px' : '5px';

  const styles = {
    button: {
      position: 'relative' as const,
      padding: `var(--rm-padding, ${defaultPadding})`,
      background: 'var(--rm-bg, white)',
      color: 'var(--rm-color, #40513B)',
      border: 'none',
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: `var(--rm-font-size, ${defaultFontSize})`,
      letterSpacing: `var(--rm-letter-spacing, ${defaultLetterSpacing})`,
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

  const content = (
    <>
      <span style={styles.fill}></span>
      <span style={styles.text}>{text}</span>
    </>
  );

  const commonProps = {
    className,
    style: styles.button,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  if (href) {
    if (href.startsWith('/')) {
      return (
        <Link to={href} {...commonProps}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} target={target} rel={rel} {...commonProps}>
        {content}
      </a>
    );
  }

  return (
    <button
      {...commonProps}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {content}
    </button>
  );
};

export default ReadMoreButton;
