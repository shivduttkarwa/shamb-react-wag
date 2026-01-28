import { memo } from "react";
import GlassRainButton from "../UI/GlassRainButton";
import "./ModernHero.css";

const publicUrl = import.meta.env.BASE_URL || "/";
const heroVideo = publicUrl.endsWith("/")
  ? `${publicUrl}images/home_hero.mp4`
  : `${publicUrl}/images/home_hero.mp4`;

interface ModernHeroProps {
  animate?: boolean;
}

const ModernHero: React.FC<ModernHeroProps> = () => {
  return (
    <div className="mh-hero">
      <div className="mh-curtain" aria-hidden="true"></div>

      <div className="mh-text-container">
        <div className="mh-text-backdrop" aria-hidden="true"></div>
        <h1 className="mh-scatter-word">CREATE</h1>

        <div className="mh-subtitle">
          <span className="mh-subtitle-static">Something </span>
          <span className="mh-subtitle-dynamic">ELEGANT</span>
        </div>

        <div className="mh-cta mh-cta--left">
          <GlassRainButton href="/projects">Start a Project</GlassRainButton>
        </div>

        <div className="mh-cta mh-cta--right">
          <GlassRainButton href="tel:+1234567890">Call Us</GlassRainButton>
        </div>
      </div>

      <div className="mh-hero-video" aria-hidden="true">
        <video src={heroVideo} muted loop playsInline autoPlay />
        <div className="mh-image-overlay"></div>
      </div>
    </div>
  );
};

// Memoized so React doesn't rerender and wipe the GSAP-managed DOM nodes
export default memo(ModernHero);
