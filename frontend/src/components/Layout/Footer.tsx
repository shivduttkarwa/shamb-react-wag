import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Footer.css";
import { SiteSettings } from "../../services/api";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HomeLogo from "../UI/HomeLogo";

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  settings: SiteSettings | null;
}

const Footer: React.FC<FooterProps> = ({ settings }) => {
  const publicUrl = import.meta.env.BASE_URL;
  const navigate = useNavigate();
  const footerRef = useRef<HTMLElement>(null);
  const brandTextRef = useRef<HTMLHeadingElement>(null);
  const topSectionRef = useRef<HTMLDivElement>(null);
  const phone = settings?.contact?.phone || "0428 809 166";
  const email = (settings?.contact?.email || "admin@shambalahomes.com.au").toLowerCase();

  // Footer visibility
  useEffect(() => {
    const topSection = topSectionRef.current;
    if (topSection) {
      const brandBox = topSection.querySelector(".shambala-footer-brand-box");
      const linksSection = topSection.querySelector(
        ".shambala-footer-links-section",
      );
      const contactSection = topSection.querySelector(
        ".shambala-footer-contact-section",
      );
      const followSection = topSection.querySelector(
        ".shambala-footer-follow-us-section",
      );
      const allLinks = topSection.querySelectorAll(
        ".shambala-footer-link, .shambala-footer-contact-item, .shambala-follow-link",
      );
      gsap.set([brandBox, linksSection, contactSection, followSection], {
        opacity: 1,
        y: 0,
      });
      gsap.set(allLinks, { opacity: 1, x: 0 });
    }
    const letters = brandTextRef.current?.querySelectorAll(
      ".shambala-footer-letter",
    );
    if (letters && letters.length > 0) {
      gsap.set(letters, { yPercent: 0, opacity: 1 });
    }
  }, []);

  // Big shambala text animation (slide up + color flash)
  useEffect(() => {
    const letters = brandTextRef.current?.querySelectorAll(
      ".shambala-footer-letter",
    );
    if (!letters || letters.length === 0) return;

    const colors = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#9b59b6", "#ff8b94"];
    gsap.set(letters, { yPercent: 100 });

    const st = ScrollTrigger.create({
      trigger: brandTextRef.current,
      start: "top 90%",
      toggleActions: "play reset play reset",
      onEnter: () => {
        gsap.set(letters, { yPercent: 100, opacity: 1 });
        gsap.to(letters, {
          yPercent: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: "back.out(2.7)",
          onComplete: () => {
            letters.forEach((letter, index) => {
              gsap.to(letter, {
                color: colors[index % colors.length],
                duration: 0.3,
                delay: index * 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut",
                onComplete: () => {
                  gsap.set(letter, { clearProps: "color" });
                },
              });
            });
          },
        });
      },
      onLeaveBack: () => {
        gsap.set(letters, { yPercent: 100 });
      },
    });

    return () => {
      st.kill();
    };
  }, []);
  return (
    <footer className="shambala-footer" ref={footerRef}>
      <div className="shambala-footer-container">
        {/* Main Footer Content */}
        <div className="shambala-footer-top-section" ref={topSectionRef}>
          {/* Brand Box */}
          <div
            className="shambala-footer-brand-box"
            style={{
              overflow: "visible",
              position: "relative",
              paddingTop: "80px",
            }}
          >
            <HomeLogo
              ariaLabel="shambala"
              className="shambala-footer-logo"
              onClick={() => {
                navigate("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                position: "absolute",
                top: window.innerWidth <= 768 ? "-80px" : "-65px",
                left: window.innerWidth <= 768 ? "50%" : "calc(50% - 50px)",
                transform: "translateX(-50%) scale(2.4)",
                transformOrigin: "center top",
                height: "80px",
                width: "auto",
                zIndex: 10,
                cursor: "pointer",
              }}
            />
            <p className="shambala-footer-brand-description">
              Creating architectural masterpieces that blend vision with
              craftsmanship, transforming dreams into extraordinary living
              spaces across Australia.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="shambala-footer-links-section">
            <h3 className="shambala-footer-section-title">Explore</h3>
            <div className="shambala-footer-links">
              <Link to="/services" className="shambala-footer-link">
                <span className="shambala-link-arrow">→</span>
                <span className="shambala-link-window">
                  <span className="shambala-link-track">
                    <span className="shambala-link-text">Services</span>
                    <span className="shambala-link-text">Services</span>
                  </span>
                </span>
              </Link>
              <Link to="/about" className="shambala-footer-link">
                <span className="shambala-link-arrow">→</span>
                <span className="shambala-link-window">
                  <span className="shambala-link-track">
                    <span className="shambala-link-text">About</span>
                    <span className="shambala-link-text">About</span>
                  </span>
                </span>
              </Link>
              <Link to="/contact-us" className="shambala-footer-link">
                <span className="shambala-link-arrow">→</span>
                <span className="shambala-link-window">
                  <span className="shambala-link-track">
                    <span className="shambala-link-text">Contact Us</span>
                    <span className="shambala-link-text">Contact Us</span>
                  </span>
                </span>
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className="shambala-footer-contact-section">
            <h3 className="shambala-footer-section-title">Get in Touch</h3>
            <div className="shambala-footer-contact-info">
              <div className="shambala-contact-item">
                <div className="shambala-contact-label">Visit Us</div>
                {settings?.contact?.address ? (
                  <div
                    className="shambala-footer-contact-item"
                    dangerouslySetInnerHTML={{
                      __html: settings.contact.address.replace(/\n/g, "<br/>"),
                    }}
                  />
                ) : (
                  <div className="shambala-footer-contact-item">
                    Narangba 4504
                  </div>
                )}
              </div>

              <div className="shambala-contact-item">
                <div className="shambala-contact-label">Call Us</div>
                <a
                  href={`tel:${settings?.contact?.phone || "0428809166"}`}
                  className="shambala-footer-contact-item"
                >
                  <span className="shambala-link-window">
                    <span className="shambala-link-track">
                      <span className="shambala-link-text">{phone}</span>
                      <span className="shambala-link-text">{phone}</span>
                    </span>
                  </span>
                </a>
              </div>

              <div className="shambala-contact-item">
                <div className="shambala-contact-label">Email Us</div>
                <a
                  href={`mailto:${
                    settings?.contact?.email || "admin@shambalahomes.com.au"
                  }`}
                  className="shambala-footer-contact-item"
                >
                  <span className="shambala-link-window">
                    <span className="shambala-link-track">
                      <span className="shambala-link-text">{email}</span>
                      <span className="shambala-link-text">{email}</span>
                    </span>
                  </span>
                </a>
              </div>
            </div>

            <div className="shambala-footer-legal">
              <Link
                to="/privacy-policy"
                className="shambala-footer-link shambala-legal-link"
              >
                <span className="shambala-link-window">
                  <span className="shambala-link-track">
                    <span className="shambala-link-text">Privacy Policy</span>
                    <span className="shambala-link-text">Privacy Policy</span>
                  </span>
                </span>
              </Link>
              <Link
                to="/terms-and-conditions"
                className="shambala-footer-link shambala-legal-link"
              >
                <span className="shambala-link-window">
                  <span className="shambala-link-track">
                    <span className="shambala-link-text">
                      Terms & Conditions
                    </span>
                    <span className="shambala-link-text">
                      Terms & Conditions
                    </span>
                  </span>
                </span>
              </Link>
              <span className="shambala-footer-copyright">
                © 2025 shambala. All rights reserved.
              </span>
            </div>
          </div>

          {/* Follow Us Section */}
          <div className="shambala-footer-follow-us-section">
            <h3 className="shambala-footer-section-title">Follow Us</h3>
            <div className="shambala-footer-follow-links">
              <a
                href="/"
                className="shambala-follow-link shambala-follow-icon"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href="/"
                className="shambala-follow-link shambala-follow-icon"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                href="/"
                className="shambala-follow-link shambala-follow-icon"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube" />
              </a>
              <a
                href="/"
                className="shambala-follow-link shambala-follow-icon"
                aria-label="X"
              >
                <i className="fab fa-x-twitter" />
              </a>
            </div>
          </div>
        </div>

        {/* Large Brand Name at Bottom */}
        <div className="shambala-footer-brand-large">
          <div className="shambala-footer-brand-center">
            <h1 className="shambala-footer-brand-text" ref={brandTextRef}>
              <div className="shambala-footer-mask">
                <span className="shambala-footer-letter">S</span>
              </div>
              <div className="shambala-footer-mask">
                <span className="shambala-footer-letter">H</span>
              </div>
              <div className="shambala-footer-mask">
                <span className="shambala-footer-letter">A</span>
              </div>
              <div className="shambala-footer-mask">
                <span className="shambala-footer-letter">M</span>
              </div>
              <div className="shambala-footer-mask">
                <span className="shambala-footer-letter">B</span>
              </div>
              <div className="shambala-footer-mask">
                <span className="shambala-footer-letter">A</span>
              </div>
              <div className="shambala-footer-mask">
                <span className="shambala-footer-letter">L</span>
              </div>
              <div className="shambala-footer-mask">
                <span className="shambala-footer-letter">A</span>
              </div>
            </h1>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
