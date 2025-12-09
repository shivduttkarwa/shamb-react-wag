import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './LegalPages.css';

const PrivacyPolicy: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      gsap.fromTo(contentRef.current, {
        opacity: 0,
        y: 50
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="legal-page">
      <div className="legal-header" ref={headerRef}>
        <div className="legal-header__content">
          <h1>Privacy Policy</h1>
          <p>Last updated: January 2024</p>
        </div>
      </div>

      <div className="legal-content" ref={contentRef}>
        <div className="legal-container">
          <section className="legal-section">
            <h2>Introduction</h2>
            <p>
              At FORMA, we respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when 
              you visit our website or engage our services.
            </p>
          </section>

          <section className="legal-section">
            <h2>Information We Collect</h2>
            
            <h3>Personal Information</h3>
            <p>We may collect the following personal information:</p>
            <ul>
              <li>Name and contact information (email, phone number, address)</li>
              <li>Project details and requirements</li>
              <li>Communication preferences</li>
              <li>Payment and billing information</li>
            </ul>

            <h3>Technical Information</h3>
            <p>We automatically collect certain technical information, including:</p>
            <ul>
              <li>IP address and browser information</li>
              <li>Website usage patterns and analytics</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Device and operating system information</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul>
              <li>Providing and improving our design services</li>
              <li>Communicating about projects and updates</li>
              <li>Processing payments and managing accounts</li>
              <li>Sending relevant marketing communications (with consent)</li>
              <li>Analyzing website performance and user experience</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. 
              We may share information only in the following circumstances:
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
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="legal-section">
            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access and review your personal information</li>
              <li>Request corrections to inaccurate data</li>
              <li>Request deletion of your personal information</li>
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
              <p>Email: <a href="mailto:privacy@forma.design">privacy@forma.design</a></p>
              <p>Phone: <a href="tel:+15551234567">+1 (555) 123-4567</a></p>
              <p>Address: 123 Design Avenue, Creative District, New York, NY 10001</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;