import { Link, useSearchParams } from 'react-router-dom';

// Opens an item in the finder's detail panel (the API accepts a uuid wherever it takes a slug).
function OpenItemLink({ id, className = '', children, ...props }) {
  const [params] = useSearchParams();
  const next = new URLSearchParams(params);
  next.set('item', id);
  next.delete('view');

  return (
    <Link to={{ search: `?${next.toString()}` }} state={{ focusItem: id }} className={className} {...props}>
      {children}
    </Link>
  );
}

export default OpenItemLink;
