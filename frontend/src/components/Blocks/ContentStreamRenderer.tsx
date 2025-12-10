import React from 'react';

interface ContentStreamItem {
  type: string;
  value: any;
  id?: string;
}

interface ContentStreamRendererProps {
  content: ContentStreamItem[];
}

const ContentStreamRenderer: React.FC<ContentStreamRendererProps> = ({ content }) => {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  const renderBlock = (block: ContentStreamItem) => {
    switch (block.type) {
      case 'heading':
        return (
          <div
            key={block.id || Math.random()}
            className={`heading-block text-${block.value.alignment || 'left'}`}
            dangerouslySetInnerHTML={{ __html: block.value.heading }}
          />
        );

      case 'content':
        return (
          <div
            key={block.id || Math.random()}
            className={`content-block ${block.value.list_style || ''}`}
            dangerouslySetInnerHTML={{ __html: block.value.content }}
          />
        );

      case 'lead':
        return (
          <div
            key={block.id || Math.random()}
            className={`lead-text text-xl font-medium text-${block.value.alignment || 'left'} mb-4`}
          >
            {block.value.content}
          </div>
        );

      case 'quote':
        return (
          <blockquote
            key={block.id || Math.random()}
            className="border-l-4 border-blue-500 pl-4 italic my-6"
          >
            <p className="text-lg">{block.value.quote}</p>
            {block.value.author && (
              <footer className="text-sm text-gray-600 mt-2">
                — {block.value.author}
                {block.value.position && `, ${block.value.position}`}
              </footer>
            )}
          </blockquote>
        );

      case 'button':
        return (
          <div key={block.id || Math.random()} className="button-block my-4">
            <a
              href={block.value.href?.url || '#'}
              target={block.value.href?.is_external ? '_blank' : '_self'}
              rel={block.value.href?.is_external ? 'noopener noreferrer' : undefined}
              className={`inline-block px-6 py-3 rounded-lg transition-colors ${
                block.value.theme === 'btn-primary'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : block.value.theme === 'btn-secondary'
                  ? 'bg-gray-600 text-white hover:bg-gray-700'
                  : 'text-blue-600 hover:text-blue-800'
              } ${block.value.size || ''}`}
            >
              {block.value.text}
            </a>
          </div>
        );

      case 'image':
        return (
          <div key={block.id || Math.random()} className="image-block my-6">
            <img
              src={block.value.image?.url}
              alt={block.value.alt_text || block.value.image?.title || ''}
              className="w-full rounded-lg"
              loading="lazy"
            />
            {block.value.caption && (
              <p className="text-sm text-gray-600 mt-2 text-center">
                {block.value.caption}
              </p>
            )}
          </div>
        );

      case 'space':
        return (
          <div
            key={block.id || Math.random()}
            style={{ height: `${block.value.height || 50}px` }}
          />
        );

      case 'divider':
        return (
          <hr
            key={block.id || Math.random()}
            className={`my-6 border-gray-300 ${
              block.value.style === 'dashed' ? 'border-dashed' :
              block.value.style === 'dotted' ? 'border-dotted' : ''
            }`}
          />
        );

      default:
        console.warn(`Unknown block type: ${block.type}`);
        return null;
    }
  };

  return (
    <div className="content-stream">
      {content.map((block) => renderBlock(block))}
    </div>
  );
};

export default ContentStreamRenderer;