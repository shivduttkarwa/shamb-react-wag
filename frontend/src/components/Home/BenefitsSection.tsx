import React from "react";
import { Link } from "react-router-dom";
import "./BenefitsSection.css";
import GlassButton from "../UI/GlassButton";
import TiltTextGsap from "../UI/TiltTextGsap";

interface Benefit {
  id: number;
  title: string;
  icon: React.ReactNode;
}

interface BenefitsSectionProps {
  sectionTitle?: string;
  benefits?: Benefit[];
  ctaText?: string;
  ctaLink?: string;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  sectionTitle = "",
  benefits = [
    {
      id: 1,
      title: "Build your first home",
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        >
          <path d="M11.25 20.105h-6a1.5 1.5 0 01-1.5-1.5V9.75M.75 8.25l9.531-7.145a1.5 1.5 0 011.938 0L21.75 8.25"></path>
          <path d="M8.25 20.105v-4.052a1.5 1.5 0 011.5-1.5h1.5"></path>
          <circle cx="11.25" cy="7.5" r="2.25"></circle>
          <path d="M18 15.75v7.5M20.25 15.75H16.5a2.244 2.244 0 00-1.572 1.1.376.376 0 01-.678-.222V15a3 3 0 013-3h3zM20.75 11.25h2.5v5.25h-2.5a.5.5 0 01-.5-.5v-4.25a.5.5 0 01.5-.5z"></path>
        </svg>
      ),
    },
    {
      id: 2,
      title: "Upgrade to a bigger home",
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        >
          <path d="M21.75 12v10.5h-4.5M2.25 12v10.5h4.5M3.75 1.5h3v3h-3zM3 1.5h4.5M17.25 1.5h3v3h-3zM16.5 1.5H21"></path>
          <path d="M20.25 12h3l-1.259-6.294A1.5 1.5 0 0020.52 4.5h-5.707M3.75 12h-3l1.259-6.294A1.5 1.5 0 013.48 4.5h5.707"></path>
          <path d="M17.25 7.75V22.5H6.75V7.75"></path>
          <path d="M18.75 9.75l-5.55-7.4a1.5 1.5 0 00-2.4 0l-5.55 7.4M14.25 22.5h-4.5v-6a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5zM.75 22.5h22.5M12 9.375a.375.375 0 01.375.375M11.625 9.75A.375.375 0 0112 9.375M12 10.125a.375.375 0 01-.375-.375M12.375 9.75a.375.375 0 01-.375.375"></path>
        </svg>
      ),
    },
    {
      id: 3,
      title: "Build an investment property",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        >
          <path d="M14.25 17.25v6h-6M11.25 20.25v3M8.25 17.85v5.4h-6v-4.5"></path>
          <path d="M7.5 18.75l3.75-4.5H4.5l-3.75 4.5H7.5zM15.75 18.75l-4.5-4.5M11.967 6.75l5.283-6H10.5l-5.283 6h6.75zM23.25 6.75l-6-6M12.75 5.861v5.389M21.75 5.25v13.5h-3M6.75 11.25v-4.5M15.75 7.5v.75M18.75 7.5v.75M15.75 11.25V12M18.75 11.25V12M18.75 15v.75"></path>
        </svg>
      ),
    },
    {
      id: 4,
      title: "Downsize to a smaller home",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M22.873 8.947L20.25 6.969V1.5H16.5v2.641L12 .748 1.127 8.947a1.184 1.184 0 00-.377.8v12.522a.981.981 0 00.978.979H8.25v-7.5a1.5 1.5 0 011.5-1.5h4.5a1.5 1.5 0 011.5 1.5v7.5h6.522a.981.981 0 00.978-.979V9.748a1.184 1.184 0 00-.377-.801z"
          ></path>
        </svg>
      ),
    },
  ],
  ctaText = "Start Your Journey Today",
  ctaLink = "/contact",
}) => {
  return (
    <section data-block-type="blockBenefits">
      {/* SECTION TITLE - INSIDE SECTION, BEFORE STICKY CONTEXT */}
      {sectionTitle && (
        <div className="benefits-inside-title">
          <TiltTextGsap
            startTrigger="top 70%"
            endTrigger="bottom -200%"
          >
            {`${sectionTitle}...`}
          </TiltTextGsap>
        </div>
      )}

      <div className="benefits-overflow-clip benefits-px-8">
        <div className="benefits-relative benefits-isolate benefits-size-full">
          {/* Background & Cards */}
          <div className="benefits-bg-base-stone-20">
            {/* Desktop Layout */}
            <div className="benefits-hidden benefits-lg-grid benefits-desktop-grid">
              {/* Column 1 */}
              <div className="benefits-w-full">
                <Link to="/contact" className="benefits-card benefits-card-active">
                  <span className="benefits-block">
                    <div className="benefits-icon">{benefits[0].icon}</div>
                    <h2 className="benefits-title">{benefits[0].title}</h2>
                  </span>
                </Link>
                <div className="benefits-spacer"></div>
                <div className="benefits-spacer"></div>
                <div className="benefits-spacer"></div>
              </div>

              {/* Column 2 */}
              <div className="benefits-w-full">
                <div className="benefits-spacer"></div>
                <Link to="/contact" className="benefits-card benefits-card-active">
                  <span className="benefits-block">
                    <div className="benefits-icon">{benefits[1].icon}</div>
                    <h2 className="benefits-title">{benefits[1].title}</h2>
                  </span>
                </Link>
                <div className="benefits-spacer"></div>
                <div className="benefits-spacer"></div>
              </div>

              {/* Column 3 */}
              <div className="benefits-w-full">
                <div className="benefits-spacer"></div>
                <div className="benefits-spacer"></div>
                <Link to="/contact" className="benefits-card benefits-card-active">
                  <span className="benefits-block">
                    <div className="benefits-icon">{benefits[2].icon}</div>
                    <h2 className="benefits-title">{benefits[2].title}</h2>
                  </span>
                </Link>
                <div className="benefits-spacer"></div>
              </div>

              {/* Column 4 */}
              <div className="benefits-w-full">
                <div className="benefits-spacer"></div>
                <div className="benefits-spacer"></div>
                <div className="benefits-spacer"></div>
                <Link to="/contact" className="benefits-card benefits-card-active">
                  <span className="benefits-block">
                    <div className="benefits-icon">{benefits[3].icon}</div>
                    <h2 className="benefits-title">{benefits[3].title}</h2>
                  </span>
                </Link>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="benefits-grid benefits-grid-cols-2 benefits-lg-hidden">
              <div>
                <Link to="/contact" className="benefits-card benefits-card-mobile">
                  <span className="benefits-block">
                    <div className="benefits-icon">{benefits[0].icon}</div>
                    <h2 className="benefits-title">{benefits[0].title}</h2>
                  </span>
                </Link>
              </div>
            </div>

            <div className="benefits-grid benefits-grid-cols-2 benefits-lg-hidden">
              <div className="benefits-col-start-2">
                <Link to="/contact" className="benefits-card benefits-card-mobile">
                  <span className="benefits-block">
                    <div className="benefits-icon">{benefits[1].icon}</div>
                    <h2 className="benefits-title">{benefits[1].title}</h2>
                  </span>
                </Link>
              </div>
            </div>

            <div className="benefits-grid benefits-grid-cols-2 benefits-lg-hidden">
              <div>
                <Link to="/contact" className="benefits-card benefits-card-mobile">
                  <span className="benefits-block">
                    <div className="benefits-icon">{benefits[2].icon}</div>
                    <h2 className="benefits-title">{benefits[2].title}</h2>
                  </span>
                </Link>
              </div>
            </div>

            <div className="benefits-grid benefits-grid-cols-2 benefits-lg-hidden">
              <div className="benefits-col-start-2">
                <Link to="/contact" className="benefits-card benefits-card-mobile">
                  <span className="benefits-block">
                    <div className="benefits-icon">{benefits[3].icon}</div>
                    <h2 className="benefits-title">{benefits[3].title}</h2>
                  </span>
                </Link>
              </div>
            </div>

            {/* CTA */}
            <div className="benefits-cta-container">
              <div className="benefits-lg-col-start-2">
                <span className="benefits-block">
                  <GlassButton href={ctaLink}>{ctaText}</GlassButton>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
