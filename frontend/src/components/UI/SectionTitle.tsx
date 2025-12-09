import React from "react";
import "./SectionTitle.css";

interface SectionTitleProps {
  children: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  className = "",
  tag = "h2",
}) => {
  const Tag = tag;

  return (
    <Tag className={`section-title ${className}`}>
      {children}
    </Tag>
  );
};

export default SectionTitle;