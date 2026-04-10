const accentClasses = {
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
};

function ResearchInsightCard({
  title,
  summary,
  image,
  alt,
  eyebrow,
  accent = 'primary',
}) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-base-300 bg-base-100 shadow-xl">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={alt || title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-4 p-6">
        {eyebrow ? (
          <div className={`badge badge-outline ${accentClasses[accent] || accentClasses.primary}`}>
            {eyebrow}
          </div>
        ) : null}
        <h3 className="text-2xl font-semibold leading-tight">{title}</h3>
        <p className="leading-relaxed text-base-content/72">{summary}</p>
      </div>
    </article>
  );
}

export default ResearchInsightCard;
