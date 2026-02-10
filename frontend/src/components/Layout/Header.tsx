import React, { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import OverLayMenu from "./OverLayMenu";
import { SiteSettings } from "../../services/api";
import HomeLogo from "../UI/HomeLogo";
import "./Header.css";

interface HeaderProps {
  settings: SiteSettings | null;
}

const Header: React.FC<HeaderProps> = ({ settings }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerBgRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const publicUrl = import.meta.env.BASE_URL || "/";
  
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY;
      const isScrollingDown = currentScrollY > lastScrollY;

      if (headerRef.current) {
        // At the very top - show header without background
        if (currentScrollY <= 50) {
          gsap.to(headerRef.current, {
            y: 0,
            duration: 0.4,
            ease: "power3.out"
          });
          if (headerBgRef.current) {
            gsap.to(headerBgRef.current, {
              opacity: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }
        // Scrolling down - hide header immediately
        else if (isScrollingDown && currentScrollY > 50) {
          gsap.to(headerRef.current, {
            y: "-100%",
            duration: 0.3,
            ease: "power3.out"
          });
        }
        // Scrolling up - show header with background
        else if (isScrollingUp && currentScrollY > 50) {
          gsap.to(headerRef.current, {
            y: 0,
            duration: 0.4,
            ease: "power3.out"
          });
          if (headerBgRef.current) {
            gsap.to(headerBgRef.current, {
              opacity: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.set(headerRef.current, { y: 0 });
  }, []);

  return (
    <header 
      ref={headerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        transform: 'translateY(0)',
        transition: 'none'
      }}
    >
      {/* Background that appears on scroll up */}
      <div 
        ref={headerBgRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(0.625rem)',
          opacity: 0,
          zIndex: -1
        }}
      />
      
      <div className="header-inner">
        {/* Logo - Left Side */}
        <div
          onClick={() => navigate('/')}
          className="header-logo-container"
        >
          <HomeLogo className="header-logo" />
        </div>
        
        {/* Hamburger Menu - Right Side */}
        <div className="header-hamburger-container">
          <OverLayMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
