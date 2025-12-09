import React from "react";

interface HomeLogoProps {
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}

const HomeLogo: React.FC<HomeLogoProps> = ({
  className = "",
  style,
  ariaLabel = "FORMA",
  onClick,
}) => {
  const publicUrl = import.meta.env.BASE_URL || "/";
  const logoPath = publicUrl.endsWith("/") 
    ? `${publicUrl}images/folo_logo.png`
    : `${publicUrl}/images/folo_logo.png`;

  return (
    <img
      src={logoPath}
      alt={ariaLabel}
      className={className}
      style={style}
      onClick={onClick}
      role="img"
      aria-label={ariaLabel}
    />
  );
};

export default HomeLogo;
