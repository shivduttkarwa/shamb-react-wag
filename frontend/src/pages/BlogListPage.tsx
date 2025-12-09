import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { blogPosts } from "../data/blogPosts";
import { JelloText } from "../components/common/JelloText";

gsap.registerPlugin(ScrollTrigger);
const publicUrl = import.meta.env.BASE_URL || "/";
const getVideoPath = (videoName: string) =>
  publicUrl.endsWith("/") ? `${publicUrl}images/${videoName}` : `${publicUrl}/images/${videoName}`;

const BlogListPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const listRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const title = hero.querySelector(".bl-hero-title");
    const subtitle = hero.querySelector(".bl-hero-subtitle");
    const meta = hero.querySelectorAll(".bl-hero-meta span");

    const splitChars = (el: Element | null) => {
      if (!el) return [];
      if (el.querySelector(".bl-char")) {
        return Array.from(el.querySelectorAll(".bl-char"));
      }
      const text = el.textContent || "";
      el.textContent = "";
      const chars: HTMLElement[] = [];
      [...text].forEach((ch) => {
        const span = document.createElement("span");
        span.className = "bl-char";
        span.textContent = ch === " " ? "\u00a0" : ch;
        el.appendChild(span);
        chars.push(span);
      });
      return chars;
    };

    const titleChars = splitChars(title);
    gsap.set(titleChars, {
      opacity: 0,
      yPercent: 120,
      rotateX: 90,
      transformOrigin: "50% 100%",
    });
    gsap.set(subtitle, { opacity: 0, y: 24 });
    gsap.set(meta, { opacity: 0, y: 10 });

    const tl = gsap.timeline();
    tl.to(titleChars, {
      opacity: 1,
      yPercent: 0,
      rotateX: 0,
      duration: 1,
      ease: "expo.out",
      stagger: 0.02,
    })
      .to(
        meta,
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power3.out" },
        "-=0.6"
      )
      .to(
        subtitle,
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        /* autoplay may fail silently */
      });
    }
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const ctx = gsap.context(() => {
      const cards = list.querySelectorAll(".bl-card");
      
      const splitTitleChars = (el: HTMLElement | null) => {
        if (!el) return [];
        if (el.querySelector(".bl-title-char")) {
          return Array.from(el.querySelectorAll(".bl-title-char"));
        }
        const text = el.textContent || "";
        el.textContent = "";
        const chars: HTMLElement[] = [];
        [...text].forEach((char) => {
          const isSpace = char === " ";
          const span = document.createElement("span");
          span.className = `bl-title-char${isSpace ? " bl-title-space" : ""}`;
          span.textContent = isSpace ? "\u00a0" : char;
          el.appendChild(span);
          chars.push(span);
        });
        return chars;
      };

      cards.forEach((card) => {
        const cardEl = card as HTMLElement;
        
        const imgContainer = cardEl.querySelector(".bl-card-image-container") as HTMLElement | null;
        const meta = cardEl.querySelector(".bl-meta") as HTMLElement | null;
        const title = cardEl.querySelector(".bl-card-title") as HTMLElement | null;
        const excerpt = cardEl.querySelector(".bl-card-excerpt") as HTMLElement | null;
        const link = cardEl.querySelector(".bl-link") as HTMLElement | null;

        // Image slide in animation using clip-path
        if (imgContainer) {
          gsap.set(imgContainer, { clipPath: "inset(100% 0 0 0)" });
          gsap.to(imgContainer, {
            clipPath: "inset(0% 0 0 0)",
            ease: "power3.out",
            duration: 1.2,
            scrollTrigger: {
              trigger: card,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          });
        }

        // Content animations timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        if (meta) {
          tl.fromTo(
            meta,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
          );
        }

        if (title) {
          const charEls = splitTitleChars(title);
          if (charEls.length) {
            gsap.set(title, { perspective: 600 });
            gsap.set(charEls, {
              opacity: 0,
              rotateX: 80,
              yPercent: 40,
              transformOrigin: "50% 100%",
            });

            tl.to(
              charEls,
              {
                opacity: 1,
                rotateX: 0,
                yPercent: 0,
                duration: 0.9,
                ease: "expo.out",
                stagger: {
                  each: 0.02,
                  from: "edges",
                },
              },
              "-=0.4"
            );
          }
        }

        if (excerpt) {
          tl.fromTo(
            excerpt,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
            "-=0.7"
          );
        }

        if (link) {
          tl.fromTo(
            link,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
            "-=0.5"
          );
        }
      });
    }, list);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bl-wrapper">
      <style>{`
        .bl-wrapper {
          background: #f7f4ef;
          color: #0b0d10;
          font-family: 'Nunito', sans-serif;
          min-height: 100vh;
        }

        .bl-hero {
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 0 clamp(2.5rem, 6vw, 3.5rem);
        }

        .bl-hero img,
        .bl-hero video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(1.05) contrast(1.04);
        }

        .bl-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(140deg, rgba(8,10,14,0.82) 0%, rgba(8,10,14,0.58) 50%, rgba(8,10,14,0.78) 100%);
          z-index: 1;
        }

        .bl-hero-content {
          position: relative;
          z-index: 2;
          padding: clamp(2.5rem, 6vw, 4rem);
          display: grid;
          gap: 0.75rem;
          width: min(880px, 90vw);
          text-align: center;
          justify-items: center;
          align-items: center;
        }

        .bl-hero-meta {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          color: #f6f7fb;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 0.86rem;
        }

        .bl-kicker {
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 0.86rem;
          color: #f6f7fb;
        }

        .bl-title {
          margin: 0;
          font-size: clamp(2.6rem, 6vw, 3.8rem);
          letter-spacing: 0.03em;
          color: #f6f7fb;
          text-transform: uppercase;
        }

        .bl-subtitle {
          margin: 0;
          max-width: 760px;
          line-height: 1.65;
          color: #dfe6ff;
          font-size: 1.05rem;
        }

        .bl-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 6vw, 3.5rem) clamp(3rem, 8vw, 4.5rem);
          display: grid;
          gap: 1.75rem;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }

        .bl-card {
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
          display: grid;
          grid-template-rows: 220px 1fr;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .bl-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(15, 23, 42, 0.16);
        }

        .bl-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .bl-card-body {
          padding: 1.25rem 1.4rem 1.5rem;
          display: grid;
          gap: 0.65rem;
        }

        .bl-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          align-items: center;
          font-size: 0.9rem;
          color: #5b6475;
          letter-spacing: 0.04em;
        }

        .bl-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #d59f00;
        }

        .bl-card-title {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.35;
          color: #0b0d10;
        }

        .bl-card-excerpt {
          margin: 0;
          color: #2f3545;
          line-height: 1.6;
          font-size: 0.98rem;
        }

        .bl-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: 0.2rem;
          font-size: 0.95rem;
          letter-spacing: 0.05em;
          text-decoration: none;
          color: #0b0d10;
          text-transform: uppercase;
        }

        .bl-link:hover {
          color: #d59f00;
        }

        .bl-card-image-container {
          overflow: hidden;
        }

        .bl-title-char {
          display: inline-block;
          transform-origin: 50% 100%;
        }

        .bl-title-space {
          width: 0.28em;
        }

        @media (min-width: 1600px) {
          .bl-grid {
            max-width: 1440px; /* 20% increase from 1200px */
            grid-template-columns: repeat(auto-fit, minmax(336px, 1fr)); /* 20% increase from 280px */
          }
          .bl-hero-meta {
            font-size: calc(0.86rem * 1.2); /* 20% increase from 0.86rem */
          }
          .bl-kicker {
            font-size: calc(0.86rem * 1.2); /* 20% increase from 0.86rem */
          }
          .bl-title {
            font-size: calc(clamp(2.6rem, 6vw, 3.8rem) * 1.2); /* 20% increase */
          }
          .bl-subtitle {
            font-size: calc(1.05rem * 1.2); /* 20% increase from 1.05rem */
          }
          .bl-meta {
            font-size: calc(0.9rem * 1.25); /* 25% increase from 0.9rem */
          }
          .bl-card-title {
            font-size: calc(1.25rem * 1.25); /* 25% increase from 1.25rem */
          }
          .bl-card-excerpt {
            font-size: calc(0.98rem * 1.25); /* 25% increase from 0.98rem */
          }
          .bl-link {
            font-size: calc(0.95rem * 1.25); /* 25% increase from 0.95rem */
          }
        }
      `}</style>

      <section className="bl-hero">
        <video
          ref={videoRef}
          src={getVideoPath("services-hero-vid.mp4")}
          muted
          loop
          playsInline
          autoPlay
        />
        <div className="bl-hero-content" ref={heroRef}>
          <div className="bl-hero-meta">
            <span>Journal</span>
            <span>Latest six entries</span>
          </div>
          <JelloText text="DESIGN STORIES" className="bl-title bl-hero-title jello-text" />
          <p className="bl-subtitle bl-hero-subtitle">
            Fast reads on the craft, comfort, and technology shaping our homes.
          </p>
        </div>
      </section>

      <section className="bl-grid" ref={listRef}>
        {blogPosts.slice(0, 6).map((post) => (
          <article key={post.id} className="bl-card">
            <div className="bl-card-image-container">
              <img src={post.heroImage} alt={post.heroAlt} />
            </div>
            <div className="bl-card-body">
              <div className="bl-meta">
                <span>{post.category}</span>
                <span className="bl-dot" />
                <span>{post.date}</span>
                <span className="bl-dot" />
                <span>{post.readTime}</span>
              </div>
              <h3 className="bl-card-title">{post.title}</h3>
              <p className="bl-card-excerpt">{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`} className="bl-link">
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default BlogListPage;
