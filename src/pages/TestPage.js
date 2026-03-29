import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';

function TestPage() {
  return (
    <>
      <Header />
      <div className="flex flex-wrap justify-center p-10">
        <ProjectCard
          title="Project Title"
          description="A short description of what this project does."
          image="https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp"
          href="#"
        />
      </div>
    </>
  );
}

export default TestPage;
