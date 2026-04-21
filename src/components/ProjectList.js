import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import mixologyImage from '../assets/images/mixology/MIX_Scr.jpg';
import overtownImage from '../assets/images/overtown/overtown_hero.png';
import espressoImage from '../assets/images/espresso/Espresso_Hero.png';
import piggyBankImage from '../assets/images/piggy-bank/PIGGY_Hero.png';
import umCampusXplorerImage from '../assets/images/um-campus-xplorer/UMCR_Hero.jpg';
import arCalorieImage from '../assets/images/ar-calorie-visualizer/hero.jpg';
import stellarImage from '../assets/images/stellar-life-cycle/Stellar_Hero.jpeg';
import noteTakingImage from '../assets/images/design-note-taking/Untitled-4.png';
import cardSortingImage from '../assets/images/um-card-sorting/Untitled-1_2.png';
import aboutMyselfImage from '../assets/images/project-about-myself/IMG_1744.JPG';
import memoryGradenImage from '../assets/images/memory_garden/memory_garden_Hero.png';
import lexiLearnImage from '../assets/images/lexilearn/lexiLearn_Hero.png';

const projects = [
  {
    title: 'Periodic Table of Mixology',
    description: 'Interactive cocktail mixing tool and recipe database',
    image: mixologyImage,
    details: 'A portfolio rebuild of an old Webflow prototype with searchable cocktail data, mix mode, and reusable React components.',
    href: '/projects/periodic-table-of-mixology',
  },
  {
    title: 'Memory Graden',
    description: 'Mixed reality memory-care concept for Alzheimer’s patients',
    image: memoryGradenImage,
    details: 'An MR and AI-assisted concept that turns family photos into explorable 3D memory anchors for people living with Alzheimer’s and memory loss.',
    href: '/projects/memory-graden',
  },
  {
    title: 'Project Lifehack — Espresso Helper',
    description: 'Physical computing + interaction design',
    image: espressoImage,
    details: 'An iterative smart espresso helper that evolved from a playful prototype into a more usable second version.',
    href: '/projects/auto-espresso',
  },
  {
    title: 'Interactive Piggy Bank',
    description: 'Family-centered financial learning app',
    image: piggyBankImage,
    details: 'A dual-interface app concept that helps children build money habits while giving parents tools to guide saving, spending, and goal setting.',
    href: '/projects/interactive-piggy-bank',
  },
  {
    title: 'Telling Overtown Stories',
    description: 'Immersive storytelling exhibition in VR setup',
    image: overtownImage,
    details: 'A virtual exhibit experience that extends Overtown mural narratives through interactive storytelling and VR.',
    href: '/projects/telling-overtown-stories',
  },
  {
    title: 'UM Campus Xplorer',
    description: 'Mixed reality campus navigation concept',
    image: umCampusXplorerImage,
    details: 'An augmented reality campus wayfinding concept that overlays building, room, and path guidance directly into the real world.',
    href: '/projects/um-campus-xplorer',
  },
  {
    title: 'AR Calorie Visualizer',
    description: 'OCR-powered food feedback in AR',
    image: arCalorieImage,
    details: 'An augmented reality experiment that reads nutrition labels and turns calorie counts into grounded 3D chip piles to make food data easier to picture.',
    href: '/projects/ar-calorie-visualizer',
  },
  {
    title: 'The Stellar Life Cycle: A Cosmic Journey Through Data',
    description: 'Educational data visualization project',
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
  {
    title: 'Card Sorting Study for UM Interactive Media Site',
    description: 'Information architecture research case study',
    image: cardSortingImage,
    details: 'A context-rich card sorting study that combines questionnaires, clustering analysis, quotes, and a navigation redesign direction.',
    href: '/projects/um-card-sorting-study',
  },
  {
    title: 'Project About Myself',
    description: 'Kinetic storytelling and physical computing',
    image: aboutMyselfImage,
    details: 'A course project that turns cooking, gaming, and programming into a planetary-gear-inspired mechanical self-portrait.',
    href: '/projects/about-myself',
  },
  {
    title: 'Lexi Learn',
    description: 'VR + AI literacy learning for children',
    image: lexiLearnImage,
    details: 'An ongoing research project exploring adaptive literacy learning in immersive virtual environments through AI, play, and multisensory design.',
    href: '/projects/lexilearn',
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
