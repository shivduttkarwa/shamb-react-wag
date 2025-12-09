import React from "react";
import { useNavigate } from "react-router-dom";
import GlassButton from "../components/UI/GlassButton";
import "./Contact.css";

const Contact: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="contact-page">
      <div className="mobile-coming-soon">
        <div className="coming-soon-content">
          <h1>Coming Soon</h1>
          <GlassButton 
            onClick={() => navigate('/')}
            className="home-redirect-btn"
          >
            Go to Home
          </GlassButton>
        </div>
      </div>
    </div>
  );
};

export default Contact;
