import React from 'react';
import { BodyBlock } from '../services/api';
import './BodyRenderer.css';

// Import all block components
import EssenceSection from './Home/EssenceSection';
import FallingTextVideoComponent from './UI/FallingTextVideoComponent';

interface BodyRendererProps {
  blocks: BodyBlock[];
}

const BodyRenderer: React.FC<BodyRendererProps> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className="body-renderer">
      {blocks.map((block, index) => {
        const key = block.id || `block-${index}`;
        
        switch (block.type) {
          case 'essence_section':
            return (
              <EssenceSection
                key={key}
                heading={block.value.title}
                description={block.value.description}
                ctaText={block.value.cta_text}
                ctaHref={block.value.cta_href}
                image={block.value.image ? {
                  src: block.value.image.src,
                  alt: block.value.image.alt
                } : undefined}
              />
            );

          case 'gsap_text_video':
            return (
              <FallingTextVideoComponent
                key={key}
                leftText={block.value.left_text}
                rightText={block.value.right_text}
                videoSrc={block.value.video_src}
                backgroundColor={block.value.background_color}
                bottomLeftText={block.value.bottom_left_text}
                bottomRightText={block.value.bottom_right_text}
              />
            );

          case 'horizontal_slider':
            // TODO: Implement horizontal slider component
            return (
              <div key={key} className="block-placeholder">
                <h3>Horizontal Slider Block</h3>
                <p>Title: {block.value.title}</p>
                <p>Slides: {block.value.slides?.length || 0}</p>
              </div>
            );

          case 'residential_projects':
            // TODO: Implement residential projects component
            return (
              <div key={key} className="block-placeholder">
                <h3>Residential Projects Block</h3>
                <p>Title: {block.value.title}</p>
                <p>Projects: {block.value.projects?.length || 0}</p>
              </div>
            );

          case 'commercial_projects':
            // TODO: Implement commercial projects component
            return (
              <div key={key} className="block-placeholder">
                <h3>Commercial Projects Block</h3>
                <p>Title: {block.value.title}</p>
                <p>Projects: {block.value.projects?.length || 0}</p>
              </div>
            );

          case 'quality_homes':
            // TODO: Implement quality homes component
            return (
              <div key={key} className="block-placeholder">
                <h3>Quality Homes Block</h3>
                <p>Title: {block.value.main_title}</p>
                <p>Features: {block.value.features?.length || 0}</p>
              </div>
            );

          case 'blog_section':
            // TODO: Implement blog section component
            return (
              <div key={key} className="block-placeholder">
                <h3>Blog Section Block</h3>
                <p>Title: {block.value.section_title}</p>
                <p>Posts: {block.value.posts?.length || 0}</p>
              </div>
            );

          case 'featured_properties':
            // TODO: Implement featured properties component
            return (
              <div key={key} className="block-placeholder">
                <h3>Featured Properties Block</h3>
                <p>Properties: {block.value.properties?.length || 0}</p>
              </div>
            );

          case 'content_with_image':
            // TODO: Implement content with image component
            return (
              <div key={key} className="block-placeholder">
                <h3>Content with Image Block</h3>
                <p>Alignment: {block.value.alignment}</p>
                <p>Content blocks: {block.value.content?.length || 0}</p>
              </div>
            );

          default:
            // Handle unknown block types gracefully
            console.warn(`Unknown block type: ${(block as any).type}`);
            return (
              <div key={key} className="unknown-block">
                <p>Unknown block type: {(block as any).type}</p>
              </div>
            );
        }
      })}
    </div>
  );
};

export default BodyRenderer;