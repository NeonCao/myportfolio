import { Link } from 'react-router-dom';
import { notFoundContent as content } from '../content/notFound';

function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-base-200 px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.eyebrow}</p>
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
