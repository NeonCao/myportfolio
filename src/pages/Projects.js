import ProjectList from '../components/ProjectList';
import { projectsPageContent as content } from '../content/projectsPage';

function Projects() {
  return (
    <main className="bg-base-200/40 py-10 sm:py-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.eyebrow}</p>
          <h1 className="text-4xl font-bold sm:text-5xl">{content.heading}</h1>
          <p className="max-w-3xl text-base-content/70">
            {content.description}
          </p>
        </div>
        <ProjectList />
      </div>
    </main>
  );
}

export default Projects;
