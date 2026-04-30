import { useEffect, useState } from 'react';

function HoverImageTile({ image, fallbackAlt, onOpen, tileFit, size = 'standard' }) {
  const alt = image.alt || image.caption || fallbackAlt;
  const mediaStyle = size === 'preview' ? { height: '480px' } : undefined;
  const mediaClassName = [
    'gallery-photo-media bg-base-200 shadow-xl',
    size === 'featured' ? 'h-[min(70vh,620px)]' : '',
    size === 'support' ? 'h-80 sm:h-96' : '',
  ].filter(Boolean).join(' ');
  const imageClassName = tileFit === 'contain'
    ? `${size === 'standard' ? 'block h-auto' : 'h-full'} w-full object-contain`
    : `${size === 'standard' ? 'aspect-[4/3]' : 'h-full'} w-full object-cover object-top`;

  return (
    <button
      type="button"
      className="hover-3d gallery-photo-tile block w-full rounded-[1rem] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100"
      onClick={onOpen}
      aria-label={`Enlarge ${alt}`}
    >
      <div className={mediaClassName} style={mediaStyle}>
        <img
          src={image.src}
          alt={alt}
          className={imageClassName}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </button>
  );
}

function ExpandableImageRow({ images = [], title = 'Project image', tileFit = 'cover', layout = 'grid' }) {
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (!activeImage) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveImage(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeImage]);

  if (!images.length) {
    return null;
  }

  const renderImage = (image, index, size = 'standard') => (
    <figure key={image.src || `${title}-${index}`} className="space-y-2">
      <HoverImageTile
        image={image}
        fallbackAlt={`${title} ${index + 1}`}
        tileFit={tileFit}
        size={size}
        onOpen={() => setActiveImage(image)}
      />
      {image.caption ? (
        <figcaption className="text-center text-xs opacity-50">{image.caption}</figcaption>
      ) : null}
    </figure>
  );

  const featuredImage = images[0];
  const supportingImages = images.slice(1);
  const imageRows = [];

  for (let index = 0; index < images.length; index += 3) {
    imageRows.push(images.slice(index, index + 3));
  }

  return (
    <>
      {layout === 'featured-first' && featuredImage ? (
        <div className="space-y-5">
          {renderImage(featuredImage, 0, 'featured')}

          {supportingImages.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {supportingImages.map((image, index) => renderImage(image, index + 1, 'support'))}
            </div>
          ) : null}
        </div>
      ) : layout === 'balanced-grid' ? (
        <div className="space-y-4">
          {imageRows.map((row, rowIndex) => (
            <div key={`${title}-row-${rowIndex}`} className="flex justify-center gap-4">
              {row.map((image, index) => (
                <div
                  key={image.src || `${title}-${rowIndex}-${index}`}
                  className="w-[calc((100%_-_2rem)/3)]"
                >
                  {renderImage(image, rowIndex * 3 + index, 'preview')}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((image, index) => (
            renderImage(image, index)
          ))}
        </div>
      )}

      {activeImage ? (
        <div
          className="fixed inset-0 z-[100] overflow-y-auto bg-black/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt || activeImage.caption || title}
          onClick={() => setActiveImage(null)}
        >
          <div className="flex min-h-full items-start justify-center">
            <img
              src={activeImage.src}
              alt={activeImage.alt || activeImage.caption || title}
              className="max-w-full rounded-[1rem] bg-base-100 object-contain shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ExpandableImageRow;
