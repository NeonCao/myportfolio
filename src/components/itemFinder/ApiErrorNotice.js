import { useItemFinderText } from './useItemFinderText';

function ApiErrorNotice({ error, onRetry }) {
  const { text } = useItemFinderText();
  const notFound = error?.status === 404;
  let message = text.errorGeneric;

  if (notFound) {
    message = text.errorNotFound;
  } else if (error?.status === 429) {
    message = text.errorRateLimited;
  }

  return (
    <div
      role="alert"
      className="flex flex-wrap items-center gap-3 rounded-box border border-error/40 bg-error/10 p-4 text-sm"
    >
      <span>{message}</span>
      {onRetry && !notFound ? (
        <button type="button" className="btn btn-sm btn-outline" onClick={onRetry}>
          {text.retry}
        </button>
      ) : null}
    </div>
  );
}

export default ApiErrorNotice;
