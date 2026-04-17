import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { galleryPhotos, getGalleryPhotoBySlug } from '../data/galleryPhotos';

function LazyGalleryPhoto({ photo }) {
  const tileRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (shouldLoad || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return undefined;
    }

    const currentTile = tileRef.current;

    if (!currentTile) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '220px 0px',
        threshold: 0.01,
      }
    );

    observer.observe(currentTile);

    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) {
      return undefined;
    }

    let isCancelled = false;
    const image = new Image();

    image.src = photo.src;
    image.decoding = 'async';
    image.onload = () => {
      if (!isCancelled) {
        setIsLoaded(true);
      }
    };
    image.onerror = () => {
      if (!isCancelled) {
        setIsLoaded(true);
      }
    };

    return () => {
      isCancelled = true;
      image.onload = null;
      image.onerror = null;
    };
  }, [photo.src, shouldLoad]);

  return (
    <div ref={tileRef} className="hover-3d">
      {isLoaded ? (
        <img
          src={photo.src}
          alt={photo.alt}
          className="block h-auto w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div
          className="skeleton min-h-56 w-full rounded-[inherit] sm:min-h-72"
          aria-hidden="true"
        ></div>
      )}
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
          <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Gallary</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            My Gallary
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-base-content/72 sm:text-lg">
            A gallary for some of my favorite photography, all taken by my self.
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
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/45">No Photos Yet</p>
            <h2 className="mt-4 text-3xl font-bold">My gallery is still waiting for its first photographs.</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-base-content/70">
              Once I add images, they will appear here as part of this photography collection.
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
            Back To Gallary
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
