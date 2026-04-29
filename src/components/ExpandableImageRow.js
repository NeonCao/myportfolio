import { useEffect, useState } from 'react';

function HoverImageTile({ image, fallbackAlt, onOpen }) {
  const alt = image.alt || image.caption || fallbackAlt;

  return (
    <button
      type="button"
      className="hover-3d gallery-photo-tile block w-full rounded-[1rem] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100"
      onClick={onOpen}
      aria-label={`Enlarge ${alt}`}
    >
      <div className="gallery-photo-media bg-base-200 shadow-xl">
        <img
          src={image.src}
          alt={alt}
          className="aspect-[4/3] h-full w-full object-cover"
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

function ExpandableImageRow({ images = [], title = 'Project image' }) {
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

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image, index) => (
          <figure key={image.src || `${title}-${index}`} className="space-y-2">
            <HoverImageTile
              image={image}
              fallbackAlt={`${title} ${index + 1}`}
              onOpen={() => setActiveImage(image)}
            />
            {image.caption ? (
              <figcaption className="text-center text-xs opacity-50">{image.caption}</figcaption>
            ) : null}
          </figure>
        ))}
      </div>

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
