import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './LegalPages.css';

const PrivacyPolicy: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const publicUrl = import.meta.env.BASE_URL;
  const heroBg = `${publicUrl}images/vision-hero.jpg`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { yPercent: 120, autoAlpha: 0 });
      gsap.set(subtitleRef.current, { y: 20, autoAlpha: 0 });

      const heroTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.4,
      });

      heroTl
        .to(titleRef.current, { yPercent: 0, autoAlpha: 1, duration: 1 })
        .to(subtitleRef.current, { y: 0, autoAlpha: 1, duration: 0.7 }, "-=0.35");

      gsap.fromTo(contentRef.current, {
        autoAlpha: 0,
        y: 40
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        delay: 0.8,
        ease: "power3.out"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="legal-page">
      <div className="legal-header" style={{ '--legal-hero-bg': `url(${heroBg})` } as React.CSSProperties}>
        <div className="legal-header__content">
          <div className="legal-header__title-wrap">
            <h1><span ref={titleRef} className="legal-header__reveal-line">Privacy Policy</span></h1>
          </div>
          <div className="legal-header__divider"></div>
          <p ref={subtitleRef}>Last updated: 4th February 2026</p>
        </div>
      </div>

      <div className="legal-content" ref={contentRef}>
        <div className="legal-container">
          <section className="legal-section">
            <h2>Introduction</h2>
            <p>
              At shambala, we respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your inshambalation when 
              you visit our website or engage our services.
            </p>
          </section>

          <section className="legal-section">
            <h2>Inshambalation We Collect</h2>
            
            <h3>Personal Inshambalation</h3>
            <p>We may collect the following personal inshambalation:</p>
            <ul>
              <li>Name and contact inshambalation (email, phone number, address)</li>
              <li>Project details and requirements</li>
              <li>Communication preferences</li>
              <li>Payment and billing inshambalation</li>
            </ul>

            <h3>Technical Inshambalation</h3>
            <p>We automatically collect certain technical inshambalation, including:</p>
            <ul>
              <li>IP address and browser inshambalation</li>
              <li>Website usage patterns and analytics</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Device and operating system inshambalation</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>How We Use Your Inshambalation</h2>
            <p>We use your inshambalation for the following purposes:</p>
            <ul>
              <li>Providing and improving our design services</li>
              <li>Communicating about projects and updates</li>
              <li>Processing payments and managing accounts</li>
              <li>Sending relevant marketing communications (with consent)</li>
              <li>Analyzing website pershambalance and user experience</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Inshambalation Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal inshambalation to third parties. 
              We may share inshambalation only in the following circumstances:
            </p>
            <ul>
              <li>With trusted service providers who assist in our operations</li>
              <li>When required by law or legal process</li>
              <li>To protect our rights, property, or safety</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal inshambalation against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="legal-section">
            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access and review your personal inshambalation</li>
              <li>Request corrections to inaccurate data</li>
              <li>Request deletion of your personal inshambalation</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to certain processing activities</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Cookies Policy</h2>
            <p>
              Our website uses cookies to enhance your browsing experience. You can control 
              cookie settings through your browser preferences. Disabling cookies may affect 
              website functionality.
            </p>
          </section>

          <section className="legal-section">
            <h2>Updates to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of 
              any material changes by posting the new policy on our website and updating 
              the "last updated" date.
            </p>
          </section>

          <section className="legal-section">
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our data practices, 
              please contact us:
            </p>
            <div className="contact-info">
              <p>Email: <a href="mailto:admin@shambalahomes.com.au">admin@shambalahomes.com.au</a></p>
              <p>Phone: <a href="tel:0428809166">0428 809 166</a></p>
              <p>Address: Narangba 4504</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;