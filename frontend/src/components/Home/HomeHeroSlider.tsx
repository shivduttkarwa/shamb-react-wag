import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./HomeHeroSlider.css";
import { blogPosts } from "../../data/blogPosts";

type Slide = {
  label: string;
  title: string;
  meta: string;
  link: string;
};

const HomeHeroSlider = forwardRef<HTMLDivElement>((_, ref) => {
  const slides: Slide[] = useMemo(() => {
    const derived = blogPosts.slice(0, 6).map((post) => ({
      label: "Blog",
      title: post.title,
      meta: `${post.date} • ${post.readTime}`,
      link: `/blog/${post.slug}`,
    }));

    // If fewer than 6 posts exist, loop through to fill
    if (derived.length < 6 && blogPosts.length) {
      const needed = 6 - derived.length;
      for (let i = 0; i < needed; i++) {
        const post = blogPosts[i % blogPosts.length];
        derived.push({
          label: "Blog",
          title: post.title,
          meta: `${post.date} • ${post.readTime}`,
          link: `/blog/${post.slug}`,
        });
      }
    }
    return derived;
  }, []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <div className="mh-ui-news" ref={ref}>
      <div className="hh-slider-window">
        <div
          className="hh-slider-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide) => (
            <div className="hh-slide" key={slide.title}>
              <div className="hh-label">{slide.label}</div>
              <div className="hh-title">{slide.title}</div>
              <div className="hh-meta">{slide.meta}</div>
              <Link to={slide.link} className="hh-read">
                Read more →
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="hh-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            className={`hh-dot${i === index ? " active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
});

HomeHeroSlider.displayName = "HomeHeroSlider";

export default HomeHeroSlider;
