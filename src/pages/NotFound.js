import { Link } from 'react-router-dom';
import { notFoundContent as content } from '../content/notFound';

function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-base-200 px-6 py-20">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none bg-gradient-to-b from-base-content/15 to-transparent bg-clip-text text-[min(38vw,22rem)] font-black leading-none tracking-tighter text-transparent"
      >
        {content.eyebrow}
      </p>
      <div className="relative mx-auto max-w-xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-base-content/60">{content.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{content.heading}</h1>
        <p className="mt-5 leading-relaxed text-base-content/70">{content.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-primary">
            {content.homeButtonLabel}
          </Link>
          <Link to="/projects" className="btn btn-outline">
            {content.projectsButtonLabel}
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
