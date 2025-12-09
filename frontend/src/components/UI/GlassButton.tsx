import React from "react";
import { Link } from "react-router-dom";
import "./GlassButton.css";

interface GlassButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  target?: "_blank" | "_self";
  rel?: string;
  icon?: string;
  showIcon?: boolean;
  style?: React.CSSProperties;
}

const GlassButton: React.FC<GlassButtonProps> = ({
  href,
  onClick,
  children,
  className = "",
  target = "_self",
  rel,
  icon = "→",
  showIcon = true,
  style,
}) => {
  const buttonContent = (
    <>
      <span className="home-benefits-cta-bg"></span>
      <span className="home-benefits-cta-label">{children}</span>
      {showIcon && <span className="home-benefits-cta-icon">{icon}</span>}
    </>
  );

  const combinedClassName = `home-benefits-cta ${className}`.trim();

  if (href) {
    if (href.startsWith("/")) {
      // Internal link; use react-router Link to preserve SPA navigation
      return (
        <Link
          to={href}
          className={combinedClassName}
          style={style}
          onClick={() => {
            /* preserve optional behaviour */
          }}
        >
          {buttonContent}
        </Link>
      );
    }
    return (
      <a href={href} className={combinedClassName} style={style} target={target} rel={rel}>
        {buttonContent}
      </a>
    );
  }

  return (
    <button className={combinedClassName} style={style} onClick={onClick}>
      {buttonContent}
    </button>
  );
};

export default GlassButton;
