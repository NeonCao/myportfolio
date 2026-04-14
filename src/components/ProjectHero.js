function ProjectHero({ title, image, font }) {
  return (
    <div
      className="relative w-full"
      style={{ height: '100vh', backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-8 left-8">
        <h1 className="text-5xl font-bold text-white max-w-2xl leading-tight" style={font ? { fontFamily: font } : {}}>{title}</h1>
      </div>
    </div>
  );
}

export default ProjectHero;
