import React from 'react';
import ContentStreamRenderer from './ContentStreamRenderer';

interface ContentWithImageBlockProps {
  image: {
    url: string;
    alt: string;
  };
  alignment: 'left' | 'right';
  content: any[]; // ContentStreamBlock content
  background?: string;
  topPadding?: string;
  bottomPadding?: string;
  cssClass?: string;
}

const ContentWithImageBlock: React.FC<ContentWithImageBlockProps> = ({
  image,
  alignment,
  content,
  background,
  topPadding,
  bottomPadding,
  cssClass
}) => {
  const getPaddingClass = (padding?: string) => {
    if (!padding) return '';
    return padding;
  };

  const getBackgroundClass = (bg?: string) => {
    if (!bg) return '';
    return bg;
  };

  const sectionClasses = [
    'content-with-image-block',
    getPaddingClass(topPadding),
    getPaddingClass(bottomPadding),
    getBackgroundClass(background),
    cssClass
  ].filter(Boolean).join(' ');

  return (
    <section className={sectionClasses}>
      <div className="container mx-auto px-4">
        <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
          alignment === 'right' ? 'lg:flex-row-reverse' : ''
        }`}>
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2">
            <div className="prose prose-lg max-w-none">
              <ContentStreamRenderer content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentWithImageBlock;