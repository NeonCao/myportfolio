function ProjectBackground({ text, variant = 'L' }) {
  const isLeft = variant === 'L';

  const textBlock = (
    <div className="w-full md:w-1/2 px-12 py-16 flex flex-col justify-center">
      <h2 className="text-xl uppercase tracking-widest opacity-50 mb-3">Background</h2>
      <p className="text-base-content leading-relaxed">{text}</p>
    </div>
  );

  const emptyBlock = <div className="w-full md:w-1/2" />;

  return (
    <div className="flex min-h-96 bg-base-100">
      {isLeft ? textBlock : emptyBlock}
      {isLeft ? emptyBlock : textBlock}
    </div>
  );
}

export default ProjectBackground;
