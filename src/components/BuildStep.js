function BuildStep({ number, title, text, images, imageLeft = false }) {
  const textBlock = (
    <div className="md:sticky md:top-28 md:self-start">
      <p className="text-xs uppercase tracking-widest opacity-50 mb-2">Step {number}</p>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-base-content/70 leading-relaxed whitespace-pre-line">{text}</p>
    </div>
  );

  const imageBlock = (
    <div className="flex flex-col gap-4">
      {images.map((img, i) => (
        <div key={i}>
          <img src={img.src} alt={img.caption} className="w-full rounded-box object-cover" />
          {img.caption && <p className="text-xs text-center opacity-50 mt-2">{img.caption}</p>}
        </div>
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16 border-t border-base-300">
      {imageLeft ? imageBlock : textBlock}
      {imageLeft ? textBlock : imageBlock}
    </div>
  );
}

export default BuildStep;
