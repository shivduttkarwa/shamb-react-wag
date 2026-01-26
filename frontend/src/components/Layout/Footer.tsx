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
  const phone = settings?.contact?.phone || "+61 3 1234 5678";
  const email = (
    settings?.contact?.email || "info@FORMAhomes.com"
  ).toLowerCase();

  // Footer visibility
  useEffect(() => {
    const topSection = topSectionRef.current;
    if (topSection) {
      const brandBox = topSection.querySelector(".forma-footer-brand-box");
      const linksSection = topSection.querySelector(".forma-footer-links-section");
      const contactSection = topSection.querySelector(".forma-footer-contact-section");
      const followSection = topSection.querySelector(".forma-footer-follow-us-section");
      const allLinks = topSection.querySelectorAll(".forma-footer-link, .forma-social-link, .forma-footer-contact-item");
      gsap.set([brandBox, linksSection, contactSection, followSection], { opacity: 1, y: 0 });
      gsap.set(allLinks, { opacity: 1, x: 0 });
    }
    const letters = brandTextRef.current?.querySelectorAll(".forma-footer-letter");
    if (letters && letters.length > 0) {
      gsap.set(letters, { yPercent: 0, opacity: 1 });
    }
  }, []);

  // Big FORMA text animation (slide up + color flash)
  useEffect(() => {
    const letters = brandTextRef.current?.querySelectorAll(".forma-footer-letter");
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
    <footer className="forma-footer" ref={footerRef}>
      <div className="forma-footer-container">
        {/* Main Footer Content */}
        <div className="forma-footer-top-section" ref={topSectionRef}>
          {/* Brand Box */}
          <div
            className="forma-footer-brand-box"
            style={{
              overflow: "visible",
              position: "relative",
              paddingTop: "80px",
            }}
          >
            <HomeLogo
              ariaLabel="FORMA"
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
            <p className="forma-footer-brand-description">
              Creating architectural masterpieces that blend vision with
              craftsmanship, transforming dreams into extraordinary living
              spaces across Australia.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="forma-footer-links-section">
            <h3 className="forma-footer-section-title">Explore</h3>
            <div className="forma-footer-links">
              <Link to="/house-designs" className="forma-footer-link">
                <span className="forma-link-arrow">→</span>
                <span className="forma-link-window">
                  <span className="forma-link-track">
                    <span className="forma-link-text">Portfolio</span>
                    <span className="forma-link-text">Portfolio</span>
                  </span>
                </span>
              </Link>
              <Link to="/projects" className="forma-footer-link">
                <span className="forma-link-arrow">→</span>
                <span className="forma-link-window">
                  <span className="forma-link-track">
                    <span className="forma-link-text">Projects</span>
                    <span className="forma-link-text">Projects</span>
                  </span>
                </span>
              </Link>
              <Link to="/services" className="forma-footer-link">
                <span className="forma-link-arrow">→</span>
                <span className="forma-link-window">
                  <span className="forma-link-track">
                    <span className="forma-link-text">Services</span>
                    <span className="forma-link-text">Services</span>
                  </span>
                </span>
              </Link>
              <Link to="/about" className="forma-footer-link">
                <span className="forma-link-arrow">→</span>
                <span className="forma-link-window">
                  <span className="forma-link-track">
                    <span className="forma-link-text">About</span>
                    <span className="forma-link-text">About</span>
                  </span>
                </span>
              </Link>
              <Link to="/contact" className="forma-footer-link">
                <span className="forma-link-arrow">→</span>
                <span className="forma-link-window">
                  <span className="forma-link-track">
                    <span className="forma-link-text">Inquire</span>
                    <span className="forma-link-text">Inquire</span>
                  </span>
                </span>
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className="forma-footer-contact-section">
            <h3 className="forma-footer-section-title">Get in Touch</h3>
            <div className="forma-footer-contact-info">
              <div className="forma-contact-item">
                <div className="forma-contact-label">Visit Us</div>
                {settings?.contact?.address ? (
                  <div
                    className="forma-footer-contact-item"
                    dangerouslySetInnerHTML={{
                      __html: settings.contact.address.replace(/\n/g, "<br/>"),
                    }}
                  />
                ) : (
                  <div className="forma-footer-contact-item">
                    123 Garden Street
                    <br />
                    Melbourne, VIC 3000
                  </div>
                )}
              </div>

              <div className="forma-contact-item">
                <div className="forma-contact-label">Call Us</div>
                <a
                  href={`tel:${settings?.contact?.phone || "+61312345678"}`}
                  className="forma-footer-contact-item"
                >
                  <span className="forma-link-window">
                    <span className="forma-link-track">
                      <span className="forma-link-text">{phone}</span>
                      <span className="forma-link-text">{phone}</span>
                    </span>
                  </span>
                </a>
              </div>

              <div className="forma-contact-item">
                <div className="forma-contact-label">Email Us</div>
                <a
                  href={`mailto:${
                    settings?.contact?.email || "info@FORMAhomes.com"
                  }`}
                  className="forma-footer-contact-item"
                >
                  <span className="forma-link-window">
                    <span className="forma-link-track">
                      <span className="forma-link-text">{email}</span>
                      <span className="forma-link-text">{email}</span>
                    </span>
                  </span>
                </a>
              </div>
            </div>

            <div className="forma-footer-legal">
              <Link
                to="/privacy-policy"
                className="forma-footer-link forma-legal-link"
              >
                <span className="forma-link-window">
                  <span className="forma-link-track">
                    <span className="forma-link-text">Privacy Policy</span>
                    <span className="forma-link-text">Privacy Policy</span>
                  </span>
                </span>
              </Link>
              <Link
                to="/terms-and-conditions"
                className="forma-footer-link forma-legal-link"
              >
                <span className="forma-link-window">
                  <span className="forma-link-track">
                    <span className="forma-link-text">Terms & Conditions</span>
                    <span className="forma-link-text">Terms & Conditions</span>
                  </span>
                </span>
              </Link>
              <span className="forma-footer-copyright">
                © 2025 FORMA. All rights reserved.
              </span>
            </div>
          </div>

          {/* Follow Us Section */}
          <div className="forma-footer-follow-us-section">
            <h3 className="forma-footer-section-title">Follow Us</h3>
            <div className="forma-footer-follow-links">
              <a
                href={settings?.social?.instagram || "https://instagram.com"}
                className="forma-follow-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="forma-link-window">
                  <span className="forma-link-track">
                    <span className="forma-link-text">Instagram</span>
                    <span className="forma-link-text">Instagram</span>
                  </span>
                </span>
              </a>
              <a
                href={settings?.social?.facebook || "https://facebook.com"}
                className="forma-follow-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="forma-link-window">
                  <span className="forma-link-track">
                    <span className="forma-link-text">Facebook</span>
                    <span className="forma-link-text">Facebook</span>
                  </span>
                </span>
              </a>
              <a
                href={settings?.social?.linkedin || "https://linkedin.com"}
                className="forma-follow-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="forma-link-window">
                  <span className="forma-link-track">
                    <span className="forma-link-text">LinkedIn</span>
                    <span className="forma-link-text">LinkedIn</span>
                  </span>
                </span>
              </a>
              <a
                href={settings?.social?.youtube || "https://youtube.com"}
                className="forma-follow-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="forma-link-window">
                  <span className="forma-link-track">
                    <span className="forma-link-text">YouTube</span>
                    <span className="forma-link-text">YouTube</span>
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Large Brand Name at Bottom */}
        <div className="forma-footer-brand-large">
          <h1 className="forma-footer-brand-text" ref={brandTextRef}>
            <div className="forma-footer-mask">
              <span className="forma-footer-letter">F</span>
            </div>
            <div className="forma-footer-mask">
              <span className="forma-footer-letter">O</span>
            </div>
            <div className="forma-footer-mask">
              <span className="forma-footer-letter">R</span>
            </div>
            <div className="forma-footer-mask">
              <span className="forma-footer-letter">M</span>
            </div>
            <div className="forma-footer-mask">
              <span className="forma-footer-letter">A</span>
            </div>
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
