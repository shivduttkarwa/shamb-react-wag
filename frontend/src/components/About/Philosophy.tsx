import React, { useEffect, useRef } from "react";
import "./Philosophy.css";
import TiltTextGsap from "../UI/TiltTextGsap";
import { initGsapSwitchAnimations } from "../../lib/gsapSwitchAnimations";

const Philosophy: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => initGsapSwitchAnimations(sectionRef.current || undefined), []);

  return (
    <section className="philosophy-section" ref={sectionRef}>
      <div className="philosophy-shell">
        <div className="philosophy-content">
          <span data-gsap="fade-up" className="philosophy-eyebrow">
            Company Philosophy
          </span>
          <TiltTextGsap tag="h2" startTrigger="top 85%" endTrigger="top 65%">
            Quietly Bold, Built for Life
          </TiltTextGsap>
          <p data-gsap="fade-up" data-gsap-delay="0.1" className="philosophy-copy">
            We believe architecture should feel effortless—calm light, intuitive
            flow, and materials that age beautifully. Every decision is guided by
            real life: how you move, gather, and rest. The result is a home that
            feels composed today and timeless tomorrow.
          </p>
          <div data-gsap="fade-up" data-gsap-delay="0.2" className="philosophy-pill-group">
            <span className="philosophy-pill">Human-scaled planning</span>
            <span className="philosophy-pill">Natural light first</span>
            <span className="philosophy-pill">Durable, warm materials</span>
          </div>
        </div>
        <div data-gsap="fade-up" data-gsap-delay="0.2" className="philosophy-frame">
          <div className="philosophy-frame-inner">
            <div className="philosophy-quote">
              “Design is the quiet craft of making daily life feel clear,
              generous, and grounded.”
            </div>
            <div className="philosophy-meta">
              Shambala Homes · Architecture & Build
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
