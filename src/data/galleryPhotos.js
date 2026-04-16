const galleryContext = require.context('../assets/images/gallery', false, /\.(png|jpe?g|webp|gif|avif)$/i);

function normalizeBaseName(filename) {
  return filename.replace(/\.[^/.]+$/, '');
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function makeReadableLabel(value) {
  return value
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const galleryPhotos = galleryContext.keys().sort().map((key, index) => {
  const filename = key.replace('./', '');
  const baseName = normalizeBaseName(filename);
  const readableLabel = makeReadableLabel(baseName);

  return {
    id: `${baseName}-${index}`,
    slug: slugify(baseName) || `photo-${index + 1}`,
    src: galleryContext(key),
    alt: readableLabel || `Gallery photo ${index + 1}`,
    baseName,
    readableLabel,
  };
});

export function getGalleryPhotoBySlug(slug) {
  return galleryPhotos.find((photo) => photo.slug === slug);
}
