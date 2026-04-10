import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import mixologyImage from '../assets/images/mixology/MIX_Scr.jpg';
import overtownImage from '../assets/images/overtown/overtown_hero.png';
import espressoImage from '../assets/images/espresso/Espresso_Hero.png';
import umCampusXplorerImage from '../assets/images/um-campus-xplorer/UMCR_Hero.jpg';
import stellarImage from '../assets/images/stellar-life-cycle/Stellar_Hero.jpeg';
import noteTakingImage from '../assets/images/design-note-taking/Untitled-4.png';

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
  {
    title: 'UM Campus Xplorer',
    description: 'AR campus navigation concept',
    image: umCampusXplorerImage,
    details: 'An augmented reality campus wayfinding concept that overlays building, room, and path guidance directly into the real world.',
    href: '/projects/um-campus-xplorer',
  },
  {
    title: 'The Stellar Life Cycle: A Cosmic Journey Through Data',
    description: 'Editorial data visualization project',
    image: stellarImage,
    details: 'A making-of article about designing an astronomy-focused data story through diagrams, charts, imagery, and iteration.',
    href: '/projects/the-stellar-life-cycle',
  },
  {
    title: 'Research Case Study: Note-Taking for Design Students',
    description: 'Context-rich UX research case study',
    image: noteTakingImage,
    details: 'An interview-driven study about creative note-taking workflows, synthesis patterns, and product recommendations for design students.',
    href: '/projects/design-student-note-taking',
  },
];

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
