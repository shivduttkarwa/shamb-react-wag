import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './LegalPages.css';

const TermsAndConditions: React.FC = () => {
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
          <h1>Terms & Conditions</h1>
          <p>Last updated: January 2024</p>
        </div>
      </div>

      <div className="legal-content" ref={contentRef}>
        <div className="legal-container">
          <section className="legal-section">
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using FORMA's services, you agree to be bound by these Terms and 
              Conditions. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="legal-section">
            <h2>Services</h2>
            <p>
              FORMA provides architectural design, interior design, and related consulting services. 
              Specific service details, timelines, and deliverables will be outlined in individual 
              project agreements.
            </p>
          </section>

          <section className="legal-section">
            <h2>Project Process</h2>
            
            <h3>Initial Consultation</h3>
            <ul>
              <li>Free initial consultation to discuss project requirements</li>
              <li>Assessment of scope, timeline, and budget</li>
              <li>Proposal and agreement preparation</li>
            </ul>

            <h3>Design Phase</h3>
            <ul>
              <li>Concept development and preliminary designs</li>
              <li>Client review and revision process</li>
              <li>Final design approval and documentation</li>
            </ul>

            <h3>Implementation</h3>
            <ul>
              <li>Project management and coordination</li>
              <li>Quality oversight and regular updates</li>
              <li>Final walkthrough and delivery</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Payment Terms</h2>
            <ul>
              <li>Project fees are outlined in individual agreements</li>
              <li>Payment schedule typically follows project milestones</li>
              <li>Late payments may incur additional charges</li>
              <li>Refunds are subject to project stage and agreement terms</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Intellectual Property</h2>
            <p>
              All designs, plans, and creative work remain the intellectual property of FORMA 
              until full payment is received. Upon completion of payment, clients receive 
              usage rights for the intended project purpose.
            </p>
          </section>

          <section className="legal-section">
            <h2>Client Responsibilities</h2>
            <ul>
              <li>Provide accurate and complete project information</li>
              <li>Timely review and feedback on design proposals</li>
              <li>Obtain necessary permits and approvals</li>
              <li>Ensure site access for FORMA team when required</li>
              <li>Make payments according to agreed schedule</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Revisions and Changes</h2>
            <p>
              The number of included revisions is specified in each project agreement. 
              Additional revisions beyond the included amount will be charged at our 
              standard hourly rate. Significant scope changes may require a new agreement.
            </p>
          </section>

          <section className="legal-section">
            <h2>Project Timeline</h2>
            <p>
              Project timelines are estimates based on standard conditions. Delays may occur 
              due to factors including client feedback timing, permit approvals, site 
              conditions, or force majeure events. We will communicate any timeline 
              adjustments promptly.
            </p>
          </section>

          <section className="legal-section">
            <h2>Limitation of Liability</h2>
            <p>
              FORMA's liability is limited to the total value of the project agreement. 
              We are not responsible for construction defects, permit issues, or costs 
              arising from third-party services not directly provided by FORMA.
            </p>
          </section>

          <section className="legal-section">
            <h2>Termination</h2>
            <p>
              Either party may terminate the agreement with written notice. Upon termination, 
              client is responsible for payment of all work completed. Any deliverables 
              for paid work will be provided to the client.
            </p>
          </section>

          <section className="legal-section">
            <h2>Privacy and Confidentiality</h2>
            <p>
              We respect client confidentiality and will not disclose project details 
              without permission. Our privacy policy governs the collection and use 
              of personal information.
            </p>
          </section>

          <section className="legal-section">
            <h2>Governing Law</h2>
            <p>
              These terms are governed by the laws of New York State. Any disputes 
              will be resolved through binding arbitration in New York, NY.
            </p>
          </section>

          <section className="legal-section">
            <h2>Updates to Terms</h2>
            <p>
              We reserve the right to update these terms at any time. Continued use 
              of our services constitutes acceptance of revised terms. Existing 
              project agreements remain governed by the terms in effect at signing.
            </p>
          </section>

          <section className="legal-section">
            <h2>Contact Information</h2>
            <p>
              Questions about these terms should be directed to:
            </p>
            <div className="contact-info">
              <p>Email: <a href="mailto:legal@forma.design">legal@forma.design</a></p>
              <p>Phone: <a href="tel:+15551234567">+1 (555) 123-4567</a></p>
              <p>Address: 123 Design Avenue, Creative District, New York, NY 10001</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;