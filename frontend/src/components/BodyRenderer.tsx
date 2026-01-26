import React from "react";
import {
  BodyBlock,
  QualityHomesBlock,
  BlogSectionBlock,
  FeaturedPropertiesBlock,
} from "../services/api";
import { BlogSection, FeaturedProperties } from "./Home";
import OurVisionSection from "./Home/OurVisionSection";

interface BodyRendererProps {
  blocks: BodyBlock[];
}

const BodyRenderer: React.FC<BodyRendererProps> = ({ blocks }) => {
  // Handle empty blocks array
  if (!blocks || blocks.length === 0) {
    return null;
  }

  const renderBlock = (block: BodyBlock) => {
    console.log('Rendering block type:', block.type, block);
    switch (block.type) {
      case "quality_homes":
        return renderQualityHomesBlock(block);
      case "blog_section":
        return renderBlogSectionBlock(block);
      case "featured_properties":
        return renderFeaturedPropertiesBlock(block);
      default:
        console.log('Unknown block type:', block.type);
        return null;
    }
  };

  const renderQualityHomesBlock = (block: QualityHomesBlock) => {
    const { value } = block;
    const API_BASE =
      import.meta.env.VITE_API_URL?.replace("/api/v2", "") ||
      "http://127.0.0.1:8000";

    // Use the first feature image if available, otherwise use a default
    let centerImage = {
      src: `${import.meta.env.BASE_URL || "/"}images/l2.jpg`,
      alt: "Our approach image",
      overlayText: "Our approach",
    };

    if (value.features && value.features.length > 0 && value.features[0].image?.src) {
      centerImage.src = value.features[0].image.src.startsWith("http")
        ? value.features[0].image.src
        : `${API_BASE}${value.features[0].image.src}`;
      centerImage.alt = value.features[0].image.alt || "Our approach image";
    }

    return (
      <OurVisionSection
        key={block.id}
        leftText="Our"
        rightText="Vision"
        centerImage={centerImage}
      />
    );
  };


  const renderBlogSectionBlock = (block: BlogSectionBlock) => {
    const { value } = block;
    const API_BASE =
      import.meta.env.VITE_API_URL?.replace("/api/v2", "") ||
      "http://127.0.0.1:8000";

    // Transform blog posts data - ensure image URLs are absolute
    const transformedPosts = value.posts.map((post) => ({
      ...post,
      imageSrc: post.imageSrc?.startsWith("http")
        ? post.imageSrc
        : `${API_BASE}${post.imageSrc}`,
      // Handle additional image for featured posts
      ...(post.additional_image && {
        additional_image: {
          src: post.additional_image.src?.startsWith("http")
            ? post.additional_image.src
            : `${API_BASE}${post.additional_image.src}`,
          alt: post.additional_image.alt,
        },
      }),
    }));

    // Transform CTA data
    let ctaText = undefined;
    let ctaLink = "#";

    if (value.cta) {
      ctaText = value.cta.text;
      ctaLink = value.cta.link;
    }

    return (
      <BlogSection
        key={block.id}
        sectionTitle={value.section_title}
        posts={transformedPosts}
        ctaText={ctaText}
        ctaLink={ctaLink}
      />
    );
  };

  const renderFeaturedPropertiesBlock = (block: FeaturedPropertiesBlock) => {
    const { value } = block;
    const API_BASE =
      import.meta.env.VITE_API_URL?.replace("/api/v2", "") ||
      "http://127.0.0.1:8000";

    // Transform properties data to match PropertySlide interface
    const transformedProperties = value.properties.map((property) => ({
      id: property.id,
      category: property.category,
      title: property.title,
      leftImage: property.leftImage.src?.startsWith("http")
        ? property.leftImage.src
        : `${API_BASE}${property.leftImage.src}`,
      rightImage: property.rightImage.src?.startsWith("http")
        ? property.rightImage.src
        : `${API_BASE}${property.rightImage.src}`,
      tabletImage: property.tabletImage.src?.startsWith("http")
        ? property.tabletImage.src
        : `${API_BASE}${property.tabletImage.src}`,
      subtitle: property.subtitle,
      description: property.description,
      link: property.link,
    }));

    return (
      <FeaturedProperties
        key={block.id}
        properties={transformedProperties}
      />
    );
  };

  return (
    <div className="body-content" style={{ margin: 0, padding: 0 }}>
      {blocks.map((block, index) => <div key={index}>{renderBlock(block)}</div>)}
    </div>
  );
};

export default BodyRenderer;
