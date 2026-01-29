import { memo } from "react";
import GlassRainButton from "../UI/GlassRainButton";
import "./ModernHero.css";

const publicUrl = import.meta.env.BASE_URL || "/";
const heroVideo = publicUrl.endsWith("/")
  ? `${publicUrl}images/home_hero.mp4`
  : `${publicUrl}/images/home_hero.mp4`;
const heroPoster = publicUrl.endsWith("/")
  ? `${publicUrl}images/home_hero_poster.jpg`
  : `${publicUrl}/images/home_hero_poster.jpg`;
const heroFallback = publicUrl.endsWith("/")
  ? `${publicUrl}images/home_hero_fallback.jpg`
  : `${publicUrl}/images/home_hero_fallback.jpg`;

interface ModernHeroProps {
  animate?: boolean;
}

const ModernHero: React.FC<ModernHeroProps> = () => {
  return (
    <div className="mh-hero">
      {/* Full bleed video */}
      <div className="mh-video-container">
        <video
          src={heroVideo}
          poster={heroPoster}
          muted
          loop
          playsInline
          autoPlay
          className="mh-video"
        />
        <img
          src={heroFallback}
          alt="Architecture background"
          className="mh-fallback-image"
        />
        <div className="mh-overlay"></div>
      </div>

      {/* Hero content */}
      <div className="mh-content">
        <div className="mh-hero-text">
          <h1 className="mh-headline">
            <span className="mh-headline-primary">Designing Spaces</span>
            <span className="mh-headline-secondary">for Modern Living</span>
          </h1>

          <div className="mh-divider"></div>

          <p className="mh-tagline">
            Where architectural vision meets exceptional craftsmanship
          </p>

          <div className="mh-action">
            <GlassRainButton href="/projects">View Portfolio</GlassRainButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ModernHero);
