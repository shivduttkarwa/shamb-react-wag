import React, { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import OverLayMenu from "./OverLayMenu";
import { SiteSettings } from "../../services/api";
import HomeLogo from "../UI/HomeLogo";

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
      
      if (headerRef.current) {
        if (isScrollingUp && currentScrollY > 100) {
          // Show header when scrolling up
          gsap.to(headerRef.current, {
            y: 0,
            duration: 0.4,
            ease: "power3.out"
          });
          // Show background
          if (headerBgRef.current) {
            gsap.to(headerBgRef.current, {
              opacity: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        } else if (currentScrollY > 200) {
          // Hide header when scrolling down (after 200px)
          gsap.to(headerRef.current, {
            y: "-100%",
            duration: 0.4,
            ease: "power3.out"
          });
        }
        
        // Hide background when at top
        if (currentScrollY <= 100 && headerBgRef.current) {
          gsap.to(headerBgRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
          });
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
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(0.625rem)',
          opacity: 0,
          zIndex: -1
        }}
      />
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        height: '5.25rem'
      }}>
        {/* Logo - Left Side */}
        <div 
          onClick={() => navigate('/')}
          className="header-logo-container"
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <HomeLogo
            className="header-logo"
            style={{
              height: "5rem",
              width: "auto",
              transform: "scale(2) translateY(0.1875rem)",
              transformOrigin: "left center",
            }}
          />
        </div>
        
        {/* Hamburger Menu - Right Side */}
        <div className="header-hamburger-container">
          <style>
            {`
              .header-logo {
                filter: brightness(0) invert(1);
              }

              /* Mobile Styles */
              @media (max-width: 768px) {
                .header-logo {
                  transform: scale(1.6) !important;
                  transform-origin: left center !important;
                }
                
                .header-logo-container {
                  position: absolute !important;
                  left: 0.375rem !important;
                  top: 50% !important;
                  transform: translateY(-50%) !important;
                }
              }
              
              /* Large screens 1600px and above - increase logo size by 15% */
              @media (min-width: 1600px) {
                .header-logo {
                  transform: scale(2.3) translateY(0.4375rem) !important;
                  transform-origin: left center !important;
                }
              }
            `}
          </style>
          <OverLayMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
