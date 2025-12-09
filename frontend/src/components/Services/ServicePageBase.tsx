// ServicePageBase.tsx
import React from "react";
import "./ServicePage.css";

interface ServicePageBaseProps {
  children: React.ReactNode;
}

const ServicePageBase: React.FC<ServicePageBaseProps> = ({ children }) => {
  return <div className="ser-services-page">{children}</div>;
};

export default ServicePageBase;
