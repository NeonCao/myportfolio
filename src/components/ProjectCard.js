function ProjectCard({ title, image, className = '', imageClassName = '' }) {
  return (
    <div className={`hover-3d ${className}`.trim()}>
      <img src={image} alt={title} className={`rounded-box object-cover ${imageClassName}`.trim()} />
      <div></div><div></div><div></div><div></div>
      <div></div><div></div><div></div><div></div>
    </div>
  );
}

export default ProjectCard;
