import React, { useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { blogPosts, getBlogBySlug } from "../data/blogPosts";
import GlassButton from "../components/UI/GlassButton";

gsap.registerPlugin(ScrollTrigger);

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const post = useMemo(() => getBlogBySlug(slug) || blogPosts[0], [slug]);

  useEffect(() => {
    if (!slug && blogPosts[0]) {
      navigate(`/blog/${blogPosts[0].slug}`, { replace: true });
      return;
    }
    if (slug && !getBlogBySlug(slug)) {
      navigate("/blog", { replace: true });
    }
  }, [slug, navigate]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Split heading into characters for hero + section titles
      const splitChars = (el: HTMLElement | null) => {
        if (!el) return [];
        if (el.querySelector(".bd-title-char")) {
          return Array.from(el.querySelectorAll(".bd-title-char"));
        }

        const text = el.textContent || "";
        el.textContent = "";
        const chars: HTMLElement[] = [];

        [...text].forEach((char) => {
          const isSpace = char === " ";
          const span = document.createElement("span");
          span.className = `bd-title-char${isSpace ? " bd-title-space" : ""}`;
          span.textContent = isSpace ? "\u00a0" : char;
          el.appendChild(span);
          chars.push(span);
        });

        return chars;
      };

      const heroTitle = containerRef.current?.querySelector(
        ".bd-hero-title"
      ) as HTMLElement | null;
      const heroSubtitle = containerRef.current?.querySelector(
        ".bd-hero-subtitle"
      ) as HTMLElement | null;

      const heroChars = splitChars(heroTitle);
      gsap.set(heroChars, {
        opacity: 0,
        yPercent: 120,
        rotateX: 80,
        transformOrigin: "50% 100%",
      });

      const heroTl = gsap.timeline({ delay: 0.2 });
      heroTl.to(heroChars, {
        opacity: 1,
        yPercent: 0,
        rotateX: 0,
        duration: 1,
        ease: "expo.out",
        stagger: {
          each: 0.03,
          from: "start",
        },
      });

      if (heroSubtitle) {
        heroTl.fromTo(
          heroSubtitle,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        );
      }

      // Content + image animations
      const contentBlocks = containerRef.current?.querySelectorAll(
        ".bd-animate-content"
      );
      contentBlocks?.forEach((block) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        const title = block.querySelector(".bd-animate-title") as HTMLElement;
        const chars = splitChars(title);
        if (chars.length) {
          gsap.set(chars, {
            opacity: 0,
            yPercent: 90,
            rotateX: 70,
            transformOrigin: "50% 100%",
          });
          tl.to(chars, {
            opacity: 1,
            yPercent: 0,
            rotateX: 0,
            ease: "expo.out",
            duration: 0.9,
            stagger: 0.02,
          });
        }

        const paragraphs = block.querySelectorAll("p");
        if (paragraphs.length) {
          tl.fromTo(
            paragraphs,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.08,
            },
            chars.length ? "-=0.5" : 0
          );
        }
      });

      const imageBlocks =
        containerRef.current?.querySelectorAll(".bd-animate-image");
      imageBlocks?.forEach((img) => {
        gsap.fromTo(
          img,
          { clipPath: "inset(50% 0 50% 0)", y: 30, opacity: 1 },
          {
            clipPath: "inset(0% 0 0% 0)",
            y: 0,
            opacity: 1,
            duration: 2.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [post]);

  if (!post) return null;

  const {
    heroImage,
    heroAlt,
    title,
    category,
    date,
    readTime,
    excerpt,
    sections,
    gallery,
  } = post;

  return (
    <div ref={containerRef} className="bd-wrapper">
      <style>{`
        .bd-wrapper {
          background: #f7f4ef;
          color: #0b0d10;
          font-family: 'Nunito', sans-serif;
          min-height: 100vh;
        }

        .bd-hero {
          position: relative;
          min-height: 100vh;
          display: grid;
          align-items: center;
          padding: clamp(2rem, 6vw, 4rem);
          overflow: hidden;
        }

        .bd-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, rgba(8,10,14,0.78) 0%, rgba(8,10,14,0.62) 45%, rgba(8,10,14,0.86) 100%);
          z-index: 1;
        }

        .bd-hero img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(1.04) contrast(1.04);
        }

        .bd-hero-content {
          position: relative;
          z-index: 2;
          max-width: 1080px;
          display: grid;
          gap: 1.2rem;
          margin: 0 auto;
          text-align: center;
          justify-items: center;
        }

        .bd-meta {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          padding: 0.65rem 1rem;
          background: rgba(12,15,20,0.7);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 999px;
          backdrop-filter: blur(10px);
          width: fit-content;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25);
          margin: 0 auto;
        }

        .bd-meta-chip {
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #f6f7fb;
        }

        .bd-meta-dot {
          width: 6px;
          height: 6px;
          background: #d59f00;
          border-radius: 50%;
        }

        .bd-hero-title {
          font-family: "Dream Avenue", cursive;
          font-size: clamp(2.8rem, 5vw, 4.2rem);
          line-height: 1.05;
          letter-spacing: 0.04em;
          margin: 0;
          display: inline-block;
          color: #f6f7fb;
        }

        .bd-hero-subtitle {
          max-width: 720px;
          color: #dfe6ff;
          font-size: 1.06rem;
          line-height: 1.75;
        }

        .bd-back-link {
          position: absolute;
          bottom: clamp(1.5rem, 5vw, 2.5rem);
          left: clamp(1.2rem, 4vw, 2rem);
          z-index: 3;
          color: #f6f7fb;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.18);
          padding: 0.45rem 0.9rem;
          border-radius: 999px;
          background: rgba(12,15,20,0.7);
          backdrop-filter: blur(8px);
          font-size: 0.92rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
        }

        .bd-section {
          padding: clamp(2.5rem, 7vw, 4rem) clamp(1.5rem, 6vw, 4rem);
        }

        .bd-content-grid {
          display: grid;
          grid-template-columns: 4fr 6fr; /* Explicit 40/60 split */
          gap: clamp(1.5rem, 4vw, 2.5rem);
          align-items: start;
          max-width: 1400px;
          margin: 0 auto;
        }

        .bd-content-text {
          display: grid;
          gap: 1rem;
          padding: 0 1rem;
        }

        @media (min-width: 768px) {
          .bd-content-text {
            padding: 0 2rem;
          }
        }

        .bd-content-text p {
          margin: 0;
          color: #2f3545;
          font-size: calc(1.04rem * 1.2); /* Increased by 20% */
          line-height: 1.75;
        }

        .bd-content-heading {
          font-size: clamp(2rem, 4vw, 2.6rem);
          margin: 0;
          letter-spacing: 0.02em;
          color: #0b0d10;
        }

        .bd-content-image {
          /* No grid column needed - using fractional units */
        }

        .bd-image-frame {
          position: relative;
          border-radius: 0px;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.1));
          box-shadow: 0 16px 44px rgba(15, 23, 42, 0.12);
        }

        .bd-image-frame img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .bd-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 1rem;
          margin-top: 2rem;
        }

        @media (min-width: 768px) {
          .bd-gallery {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 1.25rem;
          }
        }

        .bd-gallery .bd-image-frame {
          min-height: 160px;
        }

        @media (min-width: 768px) {
          .bd-gallery .bd-image-frame {
            min-height: 240px;
          }
        }

        .bd-longform {
          min-height: 100vh;
          padding: clamp(2.5rem, 7vw, 4.5rem) clamp(1.5rem, 6vw, 4.5rem);
          display: grid;
          align-items: center;
          background: linear-gradient(180deg, #f7f4ef 0%, #f1ece4 100%);
        }

        .bd-longform-inner {
          max-width: 960px;
          margin: 0 auto;
          display: grid;
          gap: 1.1rem;
        }

        .bd-longform h2 {
          margin: 0;
          font-size: clamp(2.2rem, 4.6vw, 2.8rem);
          letter-spacing: 0.02em;
          color: #0b0d10;
        }

        .bd-longform p {
          margin: 0;
          color: #2f3545;
          line-height: 1.85;
          font-size: 1.05rem;
        }

        .bd-cta {
          padding: clamp(2.5rem, 6vw, 3.5rem);
          background: linear-gradient(120deg, rgba(255,255,255,0.9), rgba(247,244,239,0.6));
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 0px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          box-shadow: 0 16px 44px rgba(15, 23, 42, 0.12);
        }

        .bd-cta h3 {
          margin: 0;
          font-size: 1.6rem;
          color: #0b0d10;
        }

        .bd-cta p {
          margin: 0.5rem 0 0;
          color: #2f3545;
          max-width: 600px;
        }

        .bd-title-char {
          display: inline-block;
          transform-origin: 50% 100%;
        }

        .bd-title-space {
          width: 0.28em;
        }

        @media (max-width: 1024px) {
          .bd-content-grid {
            grid-template-columns: 1fr;
            max-width: 100%;
          }
        }

        @media (min-width: 1600px) {
          .bd-content-grid {
            max-width: calc(1400px * 1.2); /* 20% increase in container width */
          }
          .bd-content-text p {
            font-size: calc(1.04rem * 1.2 * 1.2); /* 20% increase on top of existing 20% increase */
          }
          .bd-content-heading {
            font-size: calc(clamp(2rem, 4vw, 2.6rem) * 1.2); /* 20% increase */
          }
          .bd-hero-title {
            font-size: calc(clamp(2.8rem, 5vw, 4.2rem) * 1.2); /* 20% increase */
          }
          .bd-hero-subtitle {
            font-size: calc(1.06rem * 1.2); /* 20% increase */
          }
          .bd-longform h2 {
            font-size: calc(clamp(2.2rem, 4.6vw, 2.8rem) * 1.2); /* 20% increase */
          }
          .bd-longform p {
            font-size: calc(1.05rem * 1.2); /* 20% increase */
          }
          .bd-cta h3 {
            font-size: calc(1.6rem * 1.2); /* 20% increase */
          }
          .bd-cta p {
            font-size: calc(1rem * 1.2); /* 20% increase */
          }
          .bd-meta-chip {
            font-size: calc(0.78rem * 1.2); /* 20% increase */
          }
        }

        @media (max-width: 768px) {
          .bd-hero {
            min-height: calc(100vh - 15vh); /* Reduce by 10vh */
            align-items: center;
            padding: clamp(1rem, 4vw, 2rem);
          }
          .bd-hero-content {
            gap: 1rem;
          }
          .bd-hero-title {
            font-size: clamp(2rem, 6vw, 2.8rem);
            line-height: 1.1;
          }
          .bd-hero-subtitle {
            font-size: 1rem;
            line-height: 1.6;
          }
          .bd-meta {
            gap: 0.75rem;
            padding: 0.5rem 0.8rem;
          }
          .bd-meta-chip {
            font-size: 0.7rem;
          }
          .bd-section {
            padding: clamp(1.5rem, 5vw, 2rem) clamp(1rem, 4vw, 1.5rem);
          }
          .bd-content-grid {
            grid-template-columns: 1fr;
            gap: clamp(1rem, 3vw, 1.5rem);
            max-width: 100%;
          }
          .bd-content-text p {
            font-size: 1rem;
          }
          .bd-content-heading {
            font-size: clamp(1.5rem, 5vw, 2rem);
          }
          .bd-longform {
            padding: clamp(2rem, 6vw, 2.5rem) clamp(1rem, 4vw, 1.5rem);
          }
          .bd-longform h2 {
            font-size: clamp(1.6rem, 5vw, 2.2rem);
          }
          .bd-longform p {
            font-size: 1rem;
          }
          .bd-cta {
            flex-direction: column;
            align-items: flex-start;
            padding: clamp(1.5rem, 5vw, 2rem);
            gap: 1rem;
          }
          .bd-cta h3 {
            font-size: 1.3rem;
          }
          .bd-cta p {
            font-size: 0.95rem;
          }
          .bd-hero-back-btn {
            position: absolute;
            bottom: 3rem; /* Position from bottom with enough space */
            left: 1rem;
            z-index: 10;
          }
        }

        @media (max-width: 480px) {
          .bd-hero {
            min-height: 85vh;
            padding: clamp(0.8rem, 3vw, 1.5rem);
          }
          .bd-hero-title {
            font-size: clamp(1.8rem, 7vw, 2.5rem);
          }
          .bd-hero-subtitle {
            font-size: 0.95rem;
          }
          .bd-meta {
            gap: 0.5rem;
            padding: 0.4rem 0.6rem;
          }
          .bd-meta-chip {
            font-size: 0.75rem;
          }
          .bd-meta-dot {
            width: 4px;
            height: 4px;
          }
          .bd-section {
            padding: clamp(1rem, 4vw, 1.5rem) clamp(0.8rem, 3vw, 1rem);
          }
          .bd-content-grid {
            gap: clamp(0.8rem, 2.5vw, 1rem);
          }
          .bd-content-text {
            padding: 0 0.5rem;
          }
          .bd-content-text p {
            font-size: 0.95rem;
            line-height: 1.7;
          }
          .bd-content-heading {
            font-size: clamp(1.3rem, 6vw, 1.8rem);
          }
          .bd-gallery {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 0.8rem;
          }
          .bd-gallery .bd-image-frame {
            min-height: 120px;
          }
          .bd-longform {
            padding: clamp(1.5rem, 5vw, 2rem) clamp(0.8rem, 3vw, 1rem);
          }
          .bd-longform h2 {
            font-size: clamp(1.4rem, 6vw, 2rem);
          }
          .bd-longform p {
            font-size: 0.95rem;
          }
          .bd-cta {
            padding: clamp(1rem, 4vw, 1.5rem);
          }
          .bd-cta h3 {
            font-size: 1.2rem;
          }
          .bd-cta p {
            font-size: 0.9rem;
          }
          .bd-hero-back-btn {
            position: absolute;
            bottom: calc(1rem + 80px); /* Push up by 80px from bottom to be visible */
            left: 1rem;
            z-index: 10; /* Ensure higher z-index */
          }
        }
      `}</style>

      <section className="bd-hero">
        <img src={heroImage} alt={heroAlt} />
        <GlassButton 
          href="/blog" 
          className="bd-hero-back-btn"
          icon="←"
          showIcon={true}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '2rem',
            zIndex: 3,
            background: 'rgba(255, 255, 255, 0.9)',
            color: '#000',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)'
          }}
        >
          Back to All Blogs
        </GlassButton>
        <div className="bd-hero-content">
          <div className="bd-meta">
            <span className="bd-meta-chip">{category}</span>
            <span className="bd-meta-dot" aria-hidden="true"></span>
            <span className="bd-meta-chip">{date}</span>
            <span className="bd-meta-dot" aria-hidden="true"></span>
            <span className="bd-meta-chip">{readTime}</span>
          </div>
          <h1 className="bd-hero-title">{title}</h1>
          <p className="bd-hero-subtitle">{excerpt}</p>
        </div>
      </section>

      {sections.map((section, idx) => (
        <section className="bd-section" key={idx}>
          <div className="bd-content-grid">
            <div className="bd-content-text bd-animate-content">
              {section.heading && (
                <h2 className="bd-content-heading bd-animate-title">
                  {section.heading}
                </h2>
              )}
              {section.body.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>
            {section.image && (
              <div className="bd-content-image">
                <div className="bd-image-frame bd-animate-image">
                  <img src={section.image.src} alt={section.image.alt} />
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      <section className="bd-section">
        <div className="bd-gallery">
          {gallery.map((image, idx) => (
            <div className="bd-image-frame bd-animate-image" key={idx}>
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
      </section>

      <section className="bd-longform">
        <div className="bd-longform-inner bd-animate-content">
          <h2 className="bd-animate-title">Design that lives beyond the frame</h2>
          <p>
            After the last image, the work deepens: circulation is tuned to daily rituals, storage hides the quiet mechanics of life, and materials are chosen to patinate with you. We design for the way mornings sound, how evenings glow, and the small thresholds that make arrivals feel intentional.
          </p>
          <p>
            Services are routed with foresight so upgrades stay simple and discreet. Lighting is layered—ambient, task, accent—to flex between celebration and calm. We keep a close dialogue with landscape so breezes, scents, and shade patterns become part of the interior story rather than an afterthought.
          </p>
          <p>
            Ultimately, each project is a choreography of comfort and restraint: generous where it matters, quiet where it counts. The goal is an environment that feels inevitable on its site and unmistakably yours every day after the photos are taken.
          </p>
        </div>
      </section>

      <section className="bd-section">
        <div className="bd-cta bd-animate-content">
          <div>
            <h3 className="bd-animate-title">Planning something bold?</h3>
            <p>
              We craft architecture, interiors, and landscapes that feel
              tailored, timeless, and deeply human.
            </p>
          </div>
          <GlassButton href="/contact">Start a project</GlassButton>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailPage;
