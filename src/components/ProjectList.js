import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { projects } from '../content/projectList';

function ProjectList() {
  return (
    <ul className="bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Projects</li>
      {projects.map((project, i) => (
        <li
          key={project.title}
          className="grid gap-4 px-4 py-4 border-t border-base-200 md:grid-cols-[auto_minmax(0,32%)_minmax(0,1fr)_auto] md:items-start"
        >
          <div className="text-4xl font-thin opacity-30 tabular-nums w-12 md:self-start">
            {String(i + 1).padStart(2, '0')}
          </div>
          <ProjectCard
            title={project.title}
            image={project.image}
            className="w-full md:self-start"
            imageClassName="aspect-video w-full"
          />
          <div className="min-w-0 md:self-start">
            <div className="text-lg font-medium leading-tight">{project.title}</div>
            <div className="mt-1 text-xs uppercase font-semibold tracking-wide opacity-60">
              {project.description}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-base-content/70">
              {project.details}
            </p>
          </div>
          <Link to={project.href} className="btn btn-square btn-ghost md:self-start">
            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                <path d="M6 3L20 12 6 21 6 3z"></path>
              </g>
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ProjectList;
