import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { galleryPhotos, getGalleryPhotoBySlug } from '../data/galleryPhotos';
import { galleryPageContent as content } from '../content/gallery';

function LazyGalleryPhoto({ photo }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [photo.src]);

  return (
    <div className="hover-3d gallery-photo-tile">
      <div className="gallery-photo-media">
        <img
          src={photo.src}
          alt={photo.alt}
          className={`block h-auto w-full transition-opacity duration-200 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />

        {!isLoaded ? (
          <div
            className="skeleton absolute inset-0 w-full rounded-[inherit]"
            aria-hidden="true"
          ></div>
        ) : null}
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

function GalleryWall() {
  return (
    <main className="min-h-screen bg-base-200">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.wall.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            {content.wall.heading}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-base-content/72 sm:text-lg">
            {content.wall.description}
          </p>
        </div>

        {galleryPhotos.length ? (
          <div className="gallery-masonry">
            {galleryPhotos.map((photo) => (
              <Link
                key={photo.id}
                to={`/gallery/${photo.slug}`}
                className="gallery-masonry-item block"
                aria-label={`Open ${photo.baseName}`}
              >
                <LazyGalleryPhoto photo={photo} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-base-300 bg-base-100 p-10 text-center shadow-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/45">{content.empty.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-bold">{content.empty.heading}</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-base-content/70">
              {content.empty.description}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

function GalleryPhotoView({ photo }) {
  return (
    <main className="min-h-screen bg-base-200">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link to="/gallery" className="btn btn-outline">
            {content.photoView.backLabel}
          </Link>
          <p className="text-sm uppercase tracking-[0.28em] text-base-content/45">{photo.baseName}</p>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <img
            src={photo.src}
            alt={photo.alt}
            className="max-h-[78vh] max-w-full object-contain shadow-2xl"
          />
        </div>
      </section>
    </main>
  );
}

function Gallery() {
  const { photoSlug } = useParams();

  if (photoSlug) {
    const photo = getGalleryPhotoBySlug(photoSlug);

    if (!photo) {
      return <Navigate to="/gallery" replace />;
    }

    return <GalleryPhotoView photo={photo} />;
  }

  return <GalleryWall />;
}

export default Gallery;
