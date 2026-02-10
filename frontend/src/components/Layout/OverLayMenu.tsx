import React, { useEffect } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import GlassRainButton from "../UI/GlassRainButton";
import "./OverLayMenu.css";

const publicUrl = import.meta.env.BASE_URL || "/";
const getImagePath = (imageName: string) => {
  return publicUrl.endsWith("/")
    ? `${publicUrl}images/${imageName}`
    : `${publicUrl}/images/${imageName}`;
};

const OverlayMenu: React.FC = () => {
  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const closeSpeed = isMobile ? 2.6 : 1.8;

    const path = document.querySelector(
      ".olm-overlay svg path",
    ) as SVGPathElement | null;

    // Initial menu state - hidden by default
    gsap.set(".olm-menu", { visibility: "hidden" });
    gsap.set(".olm-overlay", { opacity: 0 });
    // Set initial state for mobile CTA and social icons
    gsap.set(".olm-mobile-cta", {
      opacity: 0,
      y: 24,
      scale: 0.95,
    });
    gsap.set(".olm-mobile-social-icon", {
      opacity: 0,
      y: 20,
      scale: 0.9,
    });

    // Secondary menu items: fade in/out together with bg (no slide)
    gsap.set(
      [
        ".olm-contact-btn",
        ".olm-email-btn",
        ".olm-menu-item .olm-social-content",
        ".olm-menu-item .olm-footer-content",
      ],
      { autoAlpha: 0, top: 0 },
    );

    const revealMenuItems = () => {
      if (!path) return;

      // Optimized paths for full screen coverage with pronounced curve
      const start = "M0 700S100 100 500 100s400 600 1000 700V0H0Z";
      const end = "M0 1000S100 1000 500 1000s500 1000 1000 1000V0H0Z";
      const power2 = "power2.inout";

      // Keep toggle button static (no GSAP on hamburger/logo)

      tl.to(
        ".olm-overlay",
        {
          duration: 0.25,
          opacity: 1,
          ease: "power1.out",
        },
        0,
      );

      tl.to(
        path,
        {
          duration: 0.4,
          attr: { d: start },
          ease: "power2.out",
        },
        "<",
      ).to(
        path,
        {
          duration: 0.4,
          attr: { d: end },
          ease: "power2.inOut",
        },
        ">",
      );

      // Menu appears AFTER background completes
      tl.to(
        ".olm-menu",
        {
          duration: 0.4,
          visibility: "visible",
        },
        "-=0.32",
      );

      // Primary menu items
      tl.to(
        ".olm-primary-menu .olm-menu-item>a",
        {
          duration: 0.32,
          top: 0,
          ease: "power3.in",
          stagger: {
            amount: 0.24,
          },
        },
        "-=0.48",
      );
      // Mobile CTA + social icons - animate after primary menu
      tl.to(
        ".olm-mobile-cta",
        {
          duration: 0.45,
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power3.out",
        },
        "+=0.1",
      )
        .to(
          ".olm-mobile-social-icon",
          {
            duration: 0.5,
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power3.out",
            stagger: {
              amount: 0.3,
              from: "center",
            },
          },
          "-=0.05", // Start shortly after CTA
        )
        // Secondary menu background image (comes in earlier)
        .to(
          ".olm-secondary-menu-bg",
          {
            duration: 0.24,
            top: 0,
            ease: "power7.in",
          },
          "-=0.92",
        )
        // Secondary items fade in together (no slide, no stagger)
        .to(
          [
            ".olm-contact-btn",
            ".olm-email-btn",
            ".olm-menu-item .olm-social-content",
            ".olm-menu-item .olm-footer-content",
          ],
          {
            duration: 0.28,
            autoAlpha: 1,
            ease: "power2.out",
          },
          "-=0.7",
        )
        .reverse(); // start in reversed (closed) state
    };

    // Build timeline
    revealMenuItems();

    const hamburger = document.getElementById("hamburger");
    const toggleBtn = document.getElementById("toggle-btn");

    const handleToggle = (e: Event) => {
      e.preventDefault();
      if (!hamburger) return;

      hamburger.classList.toggle("active");
      toggleBtn?.classList.toggle("is-open");
      const isReversed = !tl.reversed();
      tl.timeScale(isReversed ? closeSpeed : 1);
      tl.reversed(isReversed);

      if (isReversed) {
        // Menu closing
        document.body.style.overflow = "";
        document.body.classList.remove("menu-open");
      } else {
        // Menu opening
        document.body.style.overflow = "hidden";
        document.body.classList.add("menu-open");
      }
    };

    toggleBtn?.addEventListener("pointerup", handleToggle);

    // Menu link click behaviour (close menu for React Router Links)
    const menuLinks = [
      ...document.querySelectorAll<HTMLAnchorElement>(".olm-menu-item a"),
      ...document.querySelectorAll<HTMLAnchorElement>(
        ".olm-mobile-social-icon",
      ),
    ];

    const handleMenuLinkClick = (e: Event) => {
      const link = e.currentTarget as HTMLAnchorElement;
      const href = link.getAttribute("href") || "";

      // Only handle hash links and external links, let React Router handle the rest
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(
          href,
        ) as HTMLElement | null;
        if (targetSection) {
          const scrollInstance = (window as any).scroll;
          if (scrollInstance) {
            scrollInstance.scrollTo(targetSection);
          } else {
            targetSection.scrollIntoView({ behavior: "smooth" });
          }
        }
      } else if (href.startsWith("mailto:") || href.startsWith("http")) {
        // Allow external links and email to work normally
        return;
      }

      // Close menu for all internal navigation
      if (hamburger && hamburger.classList.contains("active")) {
        hamburger.classList.remove("active");
        toggleBtn?.classList.remove("is-open");
        tl.timeScale(closeSpeed);
        tl.reverse();
        document.body.style.overflow = "";
        document.body.classList.remove("menu-open");
      }
    };

    menuLinks.forEach((link) =>
      link.addEventListener("click", handleMenuLinkClick),
    );

    // Cleanup
    return () => {
      // Kill any running GSAP animations to prevent DOM conflicts
      tl.kill();
      gsap.killTweensOf([
        ".olm-overlay",
        path,
        ".olm-menu",
        ".olm-primary-menu .olm-menu-item>a",
        ".olm-secondary-menu-bg",
        ".olm-contact-btn",
        ".olm-email-btn",
        ".olm-menu-item .olm-social-content",
        ".olm-menu-item .olm-footer-content",
        ".olm-mobile-social-icon",
      ]);

      toggleBtn?.removeEventListener("pointerup", handleToggle);
      toggleBtn?.classList.remove("is-open");
      menuLinks.forEach((link) =>
        link.removeEventListener("click", handleMenuLinkClick),
      );
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, []);

  return (
    <>
      {/* Toggle Button */}
      <div id="toggle-btn" className="olm-btn">
        <div className="olm-btn-outline olm-btn-outline-1"></div>
        <div className="olm-btn-outline olm-btn-outline-2"></div>
        <div id="hamburger">
          <span className="line line-1"></span>
          <span className="line line-2"></span>
        </div>
      </div>

      {/* SVG Overlay */}
      <div className="olm-overlay">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M0 2S175 1 500 1s500 1 500 1V0H0Z"></path>
        </svg>
      </div>

      {/* Full Screen Menu */}
      <div className="olm-menu">
        {/* Primary navigation items */}
        <div className="olm-primary-menu">
          <div className="olm-menu-container">
            <div className="olm-wrapper">
              {/* 1 - HOME */}
              <div className="olm-menu-item olm-modern-menu-item olm-menu-item-home">
                <div className="olm-menu-line"></div>
                <Link to="/">
                  <span className="olm-menu-number">00.</span>
                  <div className="olm-menu-arrow">
                    <svg width="40" height="25" viewBox="0 0 40 25">
                      <path
                        className="olm-arrow-line"
                        d="M2 25 L2 5 L25 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <polygon
                        className="olm-arrow-tip"
                        points="25,1 37,5 25,9"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <span className="olm-menu-text">HOME</span>
                </Link>
                <div className="olm-menu-item-revealer"></div>
              </div>

              {/* 2 - Services */}
              <div className="olm-menu-item olm-modern-menu-item olm-menu-item-services">
                <div className="olm-menu-line"></div>
                <Link to="/services">
                  <span className="olm-menu-number">01.</span>
                  <div className="olm-menu-arrow">
                    <svg width="40" height="25" viewBox="0 0 40 25">
                      <path
                        className="olm-arrow-line"
                        d="M2 25 L2 5 L25 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <polygon
                        className="olm-arrow-tip"
                        points="25,1 37,5 25,9"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <span className="olm-menu-text">Services</span>
                </Link>
                <div className="olm-menu-item-revealer"></div>
              </div>

              {/* 4 - About Us */}
              <div className="olm-menu-item olm-modern-menu-item olm-menu-item-about">
                <div className="olm-menu-line"></div>
                <Link to="/about">
                  <span className="olm-menu-number">03.</span>
                  <div className="olm-menu-arrow">
                    <svg width="40" height="25" viewBox="0 0 40 25">
                      <path
                        className="olm-arrow-line"
                        d="M2 25 L2 5 L25 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <polygon
                        className="olm-arrow-tip"
                        points="25,1 37,5 25,9"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <span className="olm-menu-text">About Us</span>
                </Link>
                <div className="olm-menu-item-revealer"></div>
              </div>

              {/* 5 - Contact Us */}
              <div className="olm-menu-item olm-modern-menu-item olm-menu-item-contact">
                <div className="olm-menu-line"></div>
                <Link to="/contact-us">
                  <span className="olm-menu-number">04.</span>
                  <div className="olm-menu-arrow">
                    <svg width="40" height="25" viewBox="0 0 40 25">
                      <path
                        className="olm-arrow-line"
                        d="M2 25 L2 5 L25 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <polygon
                        className="olm-arrow-tip"
                        points="25,1 37,5 25,9"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <span className="olm-menu-text">Contact Us</span>
                </Link>
                <div className="olm-menu-item-revealer"></div>
              </div>

              {/* Mobile Secondary Menu - Only visible on mobile */}
              <div className="olm-mobile-secondary-menu">
                <div className="olm-mobile-cta">
                  <GlassRainButton href="/contact-us">
                    Start a Project
                  </GlassRainButton>
                </div>
                <div className="olm-mobile-social-icons">
                  <Link to="/" className="olm-mobile-social-icon">
                    <i className="fab fa-instagram" />
                  </Link>
                  <Link to="/" className="olm-mobile-social-icon">
                    <i className="fab fa-facebook-f" />
                  </Link>
                  <Link to="/" className="olm-mobile-social-icon">
                    <i className="fab fa-youtube" />
                  </Link>
                  <Link to="/" className="olm-mobile-social-icon">
                    <i className="fab fa-x-twitter" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary menu */}
        <div className="olm-secondary-menu">
          <div
            className="olm-secondary-menu-bg"
            style={{
              backgroundImage: `url(${getImagePath("bg.png")})`,
              backgroundSize: "cover",
              backgroundPosition: "right center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="olm-menu-container">
            {/* Contact Section */}
            <div className="olm-contact-section">
              <div className="olm-menu-item olm-secondary-menu-item">
                <div
                  className="olm-contact-btn"
                  style={{ position: "relative", top: "100vh" }}
                >
                  <GlassRainButton href="/contact-us">
                    Contact Us
                  </GlassRainButton>
                </div>
                <div className="olm-menu-item-revealer"></div>
              </div>

              <div className="olm-menu-item olm-secondary-menu-item">
                <div
                  className="olm-email-btn"
                  style={{ position: "relative", top: "100vh" }}
                >
                  <GlassRainButton href="mailto:admin@shambalahomes.com.au">
                    Send Email
                  </GlassRainButton>
                </div>
                <div className="olm-menu-item-revealer"></div>
              </div>
            </div>

            {/* Social media */}
            <div className="olm-menu-item olm-social-menu-item">
              <div className="olm-social-content">
                <div className="olm-social-grid">
                  <Link to="/" className="olm-social-card olm-instagram">
                    <i className="fab fa-instagram" />
                  </Link>
                  <Link to="/" className="olm-social-card olm-facebook">
                    <i className="fab fa-facebook-f" />
                  </Link>
                  <Link to="/" className="olm-social-card olm-youtube">
                    <i className="fab fa-youtube" />
                  </Link>
                  <Link to="/" className="olm-social-card olm-x">
                    <i className="fab fa-x-twitter" />
                  </Link>
                </div>
              </div>
              <div className="olm-menu-item-revealer"></div>
            </div>

            {/* Footer */}
            <div className="olm-menu-item olm-footer-menu-item">
              <div className="olm-footer-content">
                <div className="olm-footer-links">
                  <Link to="/privacy-policy" className="olm-footer-link">
                    Privacy
                  </Link>
                  <Link to="/terms-and-conditions" className="olm-footer-link">
                    Terms
                  </Link>
                  <Link to="/blog" className="olm-footer-link">
                    Cookies
                  </Link>
                </div>
                <div className="olm-copyright">
                  <p>© 2025 shambala. All rights reserved.</p>
                </div>
              </div>
              <div className="olm-menu-item-revealer"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverlayMenu;
