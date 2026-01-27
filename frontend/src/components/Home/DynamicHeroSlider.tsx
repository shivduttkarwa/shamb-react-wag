import React, { forwardRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomeHeroSlider.css";
import { SliderData, SliderSlide } from "../../hooks/useMainHero";
import HomeHeroSlider from "./HomeHeroSlider";

interface DynamicHeroSliderProps {
  sliderData: SliderData | null;
  sliderType: 'news' | 'blog' | 'none';
}

const DynamicHeroSlider = forwardRef<HTMLDivElement, DynamicHeroSliderProps>(
  ({ sliderData, sliderType }, ref) => {
    const [index, setIndex] = useState(0);

    const slides = sliderData?.slides || [];
    

    useEffect(() => {
      if (!slides.length || !sliderData?.settings.autoplay) return;
      
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % slides.length);
      }, sliderData.settings.autoplay_delay || 4200);
      
      return () => clearInterval(timer);
    }, [slides.length, sliderData?.settings.autoplay, sliderData?.settings.autoplay_delay]);

    // Don't render if no slider data or type is 'none'
    if (!sliderData || sliderType === 'none' || !slides.length) {
      // Fallback to original HomeHeroSlider if no data
      return <HomeHeroSlider ref={ref} />;
    }

    const currentSlide = slides[index];
    
    // Safety check for current slide
    if (!currentSlide) {
      return null;
    }

    const shambalatMeta = (slide: SliderSlide) => {
      const parts: string[] = [];
      
      if (slide.date) {
        const date = new Date(slide.date);
        parts.push(date.toLocaleDateString());
      }
      
      if (sliderType === 'blog' && slide.read_time) {
        parts.push(`${slide.read_time} min read`);
      }
      
      if (sliderType === 'news' && slide.author) {
        parts.push(`By ${slide.author}`);
      }
      
      if (slide.category) {
        parts.push(slide.category);
      }
      
      return parts.join(' • ');
    };

    const getSlideLabel = () => {
      return sliderType === 'blog' ? 'Blog' : 'News';
    };

    const getSlideLink = (slide: SliderSlide) => {
      if (slide.link?.url) {
        return slide.link.url;
      }
      // Fallback link based on type
      return sliderType === 'blog' ? '/blog' : '/news';
    };

    return (
      <div className="mh-ui-news" ref={ref}>
        <div className="mh-ui-news-container">
          <div className="mh-ui-news-content">
            <span className="mh-ui-news-label">{getSlideLabel()}</span>
            <h4 className="mh-ui-news-title">
              <Link to={getSlideLink(currentSlide)}>
                {currentSlide.title}
              </Link>
            </h4>
            <p className="mh-ui-news-meta">
              {shambalatMeta(currentSlide)}
            </p>
            {currentSlide.excerpt && (
              <p className="mh-ui-news-excerpt">
                {currentSlide.excerpt}
              </p>
            )}
            {sliderType === 'blog' && currentSlide.tags && (
              <div className="mh-ui-news-tags">
                {currentSlide.tags.split(',').map((tag, idx) => (
                  <span key={idx} className="mh-ui-news-tag">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* Simple pagination dots only - no navigation arrows */}
          {slides.length > 1 && (
            <div className="mh-ui-news-indicators">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`mh-ui-news-indicator ${i === index ? "active" : ""}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

DynamicHeroSlider.displayName = 'DynamicHeroSlider';

export default DynamicHeroSlider;