import { useState } from 'react';
import { SHOW_ITEM_IMAGES, safeImageUrl } from '../../services/itemFinder/images';

const SIZES = {
  sm: 'h-10 w-14',
  md: 'h-14 w-24',
  lg: 'h-32 w-56',
};

// Small picture of an item. Decorative (the name is always next to it), lazy, and gone if it fails to load.
function ItemImage({ src, size = 'sm', className = '' }) {
  const [failed, setFailed] = useState(false);
  const url = SHOW_ITEM_IMAGES ? safeImageUrl(src) : null;

  if (!url || failed) {
    return null;
  }

  return (
    <span
      className={`block shrink-0 overflow-hidden rounded-md border border-base-300 bg-base-300/40 ${SIZES[size]} ${className}`}
    >
      <img
        src={url}
        alt=""
        loading={size === 'sm' ? 'lazy' : 'eager'}
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
    </span>
  );
}

export default ItemImage;
