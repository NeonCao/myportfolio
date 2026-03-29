function ProjectCard({ title, image }) {
  return (
    <div className="hover-3d">
      <img src={image} alt={title} className="size-10 rounded-box object-cover" />
      <div></div><div></div><div></div><div></div>
      <div></div><div></div><div></div><div></div>
    </div>
  );
}

export default ProjectCard;
