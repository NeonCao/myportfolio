import { Link, Navigate, useParams } from 'react-router-dom';
import { galleryPhotos, getGalleryPhotoBySlug } from '../data/galleryPhotos';

function GalleryWall() {
  return (
    <main className="min-h-screen bg-base-200">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-8 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.95fr)] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Gallary</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              A wall of favorite photographs, packed tightly together
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-base-content/72 sm:text-lg">
              This page automatically loads every image placed in `src/assets/images/gallery`. The layout keeps the
              photos close together, lets the images do the work visually, and opens each one into its own focused
              view when selected.
            </p>
          </div>

          <div className="rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Source Folder</p>
            <p className="mt-4 text-xl font-semibold">`src/assets/images/gallery`</p>
            <p className="mt-4 leading-relaxed text-base-content/70">
              Add `png`, `jpg`, `jpeg`, `webp`, `gif`, or `avif` files there and the page will pick them up
              automatically.
            </p>
            <div className="stats stats-vertical mt-6 w-full bg-base-200 shadow">
              <div className="stat">
                <div className="stat-title">Photos Loaded</div>
                <div className="stat-value text-primary">{galleryPhotos.length}</div>
                <div className="stat-desc">Current supported images found in the folder</div>
              </div>
            </div>
          </div>
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
                <div className="hover-3d">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="block h-auto w-full object-cover"
                    loading="lazy"
                  />
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-base-300 bg-base-100 p-10 text-center shadow-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/45">No Photos Yet</p>
            <h2 className="mt-4 text-3xl font-bold">The gallery is ready, but the folder is still empty.</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-base-content/70">
              Put a few images into `src/assets/images/gallery` and refresh the app. The page will automatically
              render them here in the tighter photo wall layout.
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
