import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { projects } from '../content/projectList';

function ProjectList() {
  return (
    <ul className="overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-xl">
      <li className="p-4 pb-2 text-xs tracking-wide opacity-60">Projects</li>
      {projects.map((project, i) => (
        <li
          key={project.title}
          className="group relative grid gap-4 border-t border-base-300/70 px-4 py-5 transition-colors duration-300 before:absolute before:inset-y-0 before:left-0 before:w-1 before:origin-top before:scale-y-0 before:bg-gradient-to-b before:from-fx before:to-fx-2 before:transition-transform before:duration-500 hover:bg-base-200/60 hover:before:scale-y-100 md:grid-cols-[auto_minmax(0,32%)_minmax(0,1fr)_auto] md:items-start md:gap-6 md:px-6"
        >
          <div className="w-12 text-5xl font-thin tabular-nums text-base-content/20 transition-colors duration-300 group-hover:text-fx md:self-start">
            {String(i + 1).padStart(2, '0')}
          </div>
          <Link to={project.href} aria-label={project.title} className="block w-full rounded-box md:self-start">
            <ProjectCard
              title={project.title}
              image={project.image}
              className="w-full"
              imageClassName="aspect-video w-full"
            />
          </Link>
          <div className="min-w-0 md:self-start">
            <Link to={project.href} className="text-lg font-semibold leading-tight transition-colors hover:text-fx">
              {project.title}
            </Link>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wide opacity-60">{project.description}</div>
            <p className="mt-3 text-sm leading-relaxed text-base-content/70">{project.details}</p>
          </div>
          <Link
            to={project.href}
            aria-label={project.title}
            className="btn btn-circle btn-outline transition-colors group-hover:border-fx group-hover:text-fx md:self-start"
          >
            <svg
              className="size-[1.2em] transition-transform duration-300 group-hover:translate-x-0.5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                <path d="M5 12h14M13 6l6 6-6 6"></path>
              </g>
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ProjectList;
