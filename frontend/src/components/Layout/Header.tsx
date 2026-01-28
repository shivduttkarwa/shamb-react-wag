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
      
      <div className="header-inner" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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

              .header-inner {
                padding: 1rem 1.25rem;
              }

              @media (max-width: 1024px) {
                header {
                  height: 3.94rem !important;
                }

                .header-logo {
                  transform: scale(1.5) translateY(0.14rem) !important;
                }

                .header-logo-container {
                  transform: scale(0.75) !important;
                  transform-origin: left center !important;
                }

                #toggle-btn.olm-btn {
                  transform: scale(0.75) !important;
                  transform-origin: right center !important;
                }
              }

              /* Mobile Styles */
              @media (max-width: 768px) {
                .header-logo {
                  transform: scale(2.2176) translateY(0.5rem) !important;
                  transform-origin: left center !important;
                }

                .header-inner {
                  padding: 0.75rem;
                }

                #toggle-btn.olm-btn {
                  transform: scale(1.2) translateY(0.35rem) !important;
                  transform-origin: right center !important;
                }
              }

              @media (max-width: 480px) {
                .header-inner {
                  padding: 0.6rem;
                }

                #toggle-btn.olm-btn {
                  transform: scale(1.2) translateY(1rem) !important;
                }
              }

              @media (max-width: 360px) {
                .header-inner {
                  padding: 0.5rem;
                }

                #toggle-btn.olm-btn {
                  transform: scale(1.2) translateY(1rem) !important;
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
