import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: 'Project Alpha',
    description: 'A full-stack web application',
    image: 'https://pighub.top/data/炸猪(十猪一桶).jpg',
    details: '哈基米哈基米哈基米哈基米哈基米哈基米哈基米',
    href: '#',
  },
  {
    title: 'Project Beta',
    description: 'Mobile-first responsive dashboard',
    image: 'https://pighub.top/data/旋转猪(快).gif',
    details: '哈基米哈基米哈基米哈基米哈基米哈基米哈基米',
    href: '#',
  },
  {
    title: 'Interactive Piggy Bank',
    description: 'REST API with authentication',
    image: 'https://pighub.top/data/猪之暗面.jpg',
    details: '哈基米哈基米哈基米哈基米哈基米哈基米哈基米',
    href: '/projects/interactive-piggy-bank',
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
          <p class="list-col-wrap text-xs">
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
