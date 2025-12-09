import React, { useLayoutEffect, useRef } from "react";
import "./BlogSection.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollVelocity from "../animations/ScrollVelocity";
import GlassButton from "../UI/GlassButton";
import SimpleSwiper from "../UI/SimpleSwiper";
import "../UI/SimpleSwiper.css";
import BlogVideoCard from "../UI/BlogVideoCard";
import { blogPosts } from "../../data/blogPosts";

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
  videoSrc?: string; // Add video source
  link: string;
  featured?: boolean;
  additional_text?: string;
  additional_image?: {
    src: string;
    alt: string;
  } | null;
  swiperImages?: string[];
}

interface BlogSectionProps {
  sectionTitle?: string;
  ctaText?: string;
  ctaLink?: string;
  posts?: BlogPost[];
}

const BlogSection: React.FC<BlogSectionProps> = ({
  sectionTitle = "Latest Insights",
  ctaText: _ctaText = "View all blog posts",
  ctaLink: _ctaLink = "/blog",
  posts = blogPosts.map((post, idx) => ({
    id: post.id,
    title: post.title,
    date: post.date,
    category: post.category,
    excerpt: post.excerpt,
    imageSrc: post.heroImage,
    imageAlt: post.heroAlt,
    videoSrc: post.videoSrc, // Add video source
    link: `/blog/${post.slug}`,
    featured: idx === 0,
    additional_text: post.sections[0]?.body[0],
    additional_image: post.sections[0]?.image,
    swiperImages: post.swiperImages,
  })),
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  if (!posts || posts.length === 0) return null;
  const featuredPost = posts[0]; // First blog for featured section
  const gridPosts = posts.slice(1, 3); // Next 2 blogs for grid section

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // FEATURED BLOG IMAGE SLIDE-DOWN REVEAL (same as ProcessSection)
      gsap.utils.toArray(".blog-featured-section .home-blog-reveal-img img, .blog-featured-section .home-blog-reveal-img .blog-featured-swiper").forEach((element) => {
        gsap.to(element as HTMLElement, {
          clipPath: "inset(0% 0 0 0)",
          ease: "power3.out",
          duration: 1.2,
          scrollTrigger: {
            trigger: element as HTMLElement,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      });
      // GRID POSTS IMAGES SLIDE-IN FROM BOTTOM
      gsap.utils.toArray(".blog-posts-section .home-blog-reveal-img img").forEach((img) => {
        gsap.to(img as HTMLElement, {
          y: "0%",
          duration: 1.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: img as HTMLElement,
            start: "top 85%",
          },
        });
      });

      // TEXT HEADING REVEAL (exclude TiltTextGsap components)
      document
        .querySelectorAll(".home-blog-heading:not(.tilt-text-heading)")
        .forEach((heading) => {
          const words = (heading.textContent || "").trim().split(" ");
          heading.innerHTML = "";

          words.forEach((word, index) => {
            const span = document.createElement("span");
            span.textContent = word;
            heading.appendChild(span);

            // Add space after each word except the last one
            if (index < words.length - 1) {
              heading.appendChild(document.createTextNode(" "));
            }
          });

          gsap.to(heading.querySelectorAll("span"), {
            y: "0%",
            opacity: 1,
            duration: 1.05,
            ease: "power3.out",
            stagger: 0.035,
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
            },
          });
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="blog-section-wrapper" ref={sectionRef}>
      {/* SCROLL VELOCITY TITLE */}
      <div className="blog-header">
        <div className="blog-title-container">
          <div className="blog-title-line"></div>
          <ScrollVelocity
            texts={[`${sectionTitle} • `]}
            velocity={39}
            className="blog-scroll-title"
            numCopies={6}
            parallaxClassName="blog-parallax"
            scrollerClassName="blog-scroller"
          />
          <div className="blog-title-line"></div>
        </div>
      </div>

      {/* FIRST SCREEN - 90VH HEIGHT WITH FEATURED BLOG */}
      <section className="blog-featured-section">
        <div className="blog-featured-container">
          {/* Image Half */}
          <div className="blog-featured-image home-blog-reveal-img">
            {featuredPost.swiperImages ? (
              <SimpleSwiper
                images={featuredPost.swiperImages}
                autoplaySpeed={4000}
                className="blog-featured-swiper"
                showPagination={true}
                showNavigation={false}
              />
            ) : (
              <img src={featuredPost.imageSrc} alt={featuredPost.imageAlt} />
            )}
          </div>

          {/* Content Half */}
          <div className="blog-featured-content">
            <h1 className="blog-featured-title">
              {featuredPost.title}
            </h1>

            <div className="blog-featured-description">
              {featuredPost.excerpt}
            </div>

            <GlassButton href={featuredPost.link}>Read More</GlassButton>
          </div>
        </div>
      </section>

      {/* SECOND SCREEN - 2 BLOGS LAYOUT */}
      <section className="blog-posts-section">
        <div className="blog-posts-container">
          {gridPosts.map((post) => (
            <article key={post.id} className="blog-post-card">
              <h3 className="blog-post-title home-blog-heading">
                {post.title}
              </h3>

              <div className="blog-post-image home-blog-reveal-img">
                {post.videoSrc ? (
                  <BlogVideoCard
                    videoSrc={post.videoSrc}
                    fallbackImage={post.imageSrc}
                  />
                ) : (
                  <img src={post.imageSrc} alt={post.imageAlt} />
                )}
              </div>

              <div className="blog-post-description">
                {post.excerpt}
              </div>

              <GlassButton href={post.link}>Read More</GlassButton>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogSection;
