function RecommendationSpotlight({
  title,
  body,
  bullets = [],
  image,
  alt,
  imageLeft = false,
}) {
  const imageBlock = (
    <div className="overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 shadow-2xl">
      <img src={image} alt={alt || title} className="h-full w-full object-cover" />
    </div>
  );

  const textBlock = (
    <div className="rounded-[2rem] border border-base-300 bg-base-100 p-8 shadow-xl">
      <p className="text-xs uppercase tracking-[0.35em] text-base-content/50">Design Recommendation</p>
      <h3 className="mt-3 text-3xl font-bold leading-tight">{title}</h3>
      <p className="mt-5 leading-relaxed text-base-content/72">{body}</p>
      <ul className="mt-6 space-y-3 text-sm leading-relaxed text-base-content/68">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <article className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center">
      {imageLeft ? imageBlock : textBlock}
      {imageLeft ? textBlock : imageBlock}
    </article>
  );
}

export default RecommendationSpotlight;
