import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import mixologyImage from '../assets/images/mixology/MIX_Scr.jpg';
import overtownImage from '../assets/images/overtown/overtown_hero.png';
import espressoImage from '../assets/images/espresso/Espresso_Hero.png';

const projects = [
  {
    title: 'Periodic Table of Mixology',
    description: 'Interactive cocktail explorer rebuilt in React',
    image: mixologyImage,
    details: 'A portfolio rebuild of an old Webflow prototype with searchable cocktail data, mix mode, and reusable React components.',
    href: '/projects/periodic-table-of-mixology',
  },
  {
    title: 'Project Lifehack — Espresso Helper',
    description: 'Physical computing + interaction design',
    image: espressoImage,
    details: 'An iterative smart espresso helper that evolved from a playful prototype into a more usable second version.',
    href: '/projects/auto-espresso',
  },
  {
    title: 'Telling Overtown Stories',
    description: 'Immersive storytelling and community history',
    image: overtownImage,
    details: 'A virtual exhibit experience that extends Overtown mural narratives through interactive storytelling and VR.',
    href: '/projects/telling-overtown-stories',
  },
];

function ProjectList() {
  return (
    <ul className="bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Projects</li>
      {projects.map((project, i) => (
        <li key={project.title} className="flex items-center gap-4 px-4 py-3">
          <div className="text-4xl font-thin opacity-30 tabular-nums w-12">
            {String(i + 1).padStart(2, '0')}
          </div>
          <ProjectCard title={project.title} image={project.image} />
          <div className="flex-1">
            <div>{project.title}</div>
            <div className="text-xs uppercase font-semibold opacity-60">{project.description}</div>
          </div>
          <p className="list-col-wrap text-xs text-base-content/70">
            {project.details}
          </p>
          <Link to={project.href} className="btn btn-square btn-ghost">
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
