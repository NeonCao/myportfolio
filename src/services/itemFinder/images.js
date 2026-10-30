// Item pictures come from the Star Citizen Wiki's media server through the API. They are CIG's game
// renders, shown with credit under CIG's fan-content terms; set to false to drop every image on the page.
export const SHOW_ITEM_IMAGES = true;

const IMAGE_HOST = 'media.starcitizen.tools';

// Only https URLs on the wiki's media host are used, whatever else the API might return.
export function safeImageUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && parsed.hostname === IMAGE_HOST ? parsed.href : null;
  } catch {
    return null;
  }
}

// The API lists images first-best; take the first with a usable thumbnail.
export function pickItemImage(images) {
  for (const image of Array.isArray(images) ? images : []) {
    const thumb = safeImageUrl(image?.thumbnail_url) ?? safeImageUrl(image?.original_url);

    if (thumb) {
      return {
        thumb,
        width: image.thumbnail_width ?? image.original_width ?? null,
        height: image.thumbnail_height ?? image.original_height ?? null,
      };
    }
  }

  return null;
}
