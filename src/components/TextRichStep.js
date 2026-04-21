function TextRichStep({
  number,
  title,
  intro,
  sections = [],
  bullets = [],
  images = [],
  imageLeft = false,
}) {
  const textBlock = (
    <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] opacity-50 mb-2">Step {number}</p>
        <h3 className="text-3xl font-bold leading-tight">{title}</h3>
      </div>

      {intro ? (
        <p className="text-base-content/75 leading-relaxed whitespace-pre-line">
          {intro}
        </p>
      ) : null}

      {sections.map((section) => (
        <div key={section.heading || section.body} className="space-y-2">
          {section.heading ? (
            <h4 className="text-lg font-semibold">{section.heading}</h4>
          ) : null}
          {section.body ? (
            <p className="text-base-content/70 leading-relaxed whitespace-pre-line">
              {section.body}
            </p>
          ) : null}
        </div>
      ))}

      {bullets.length ? (
        <ul className="space-y-3 text-base-content/70 leading-relaxed">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );

  const imageBlock = (
    <div className="grid gap-4">
      {images.map((img) => (
        <figure key={img.src} className="space-y-2">
          <img src={img.src} alt={img.caption || title} className="w-full rounded-[1.5rem] object-cover shadow-xl" />
          {img.caption ? (
            <figcaption className="text-xs text-center opacity-50">{img.caption}</figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );

  return (
    <section className="grid gap-10 border-t border-base-300 py-16 lg:grid-cols-[minmax(0,3fr)_minmax(280px,2fr)] lg:items-start">
      {imageLeft ? imageBlock : textBlock}
      {imageLeft ? textBlock : imageBlock}
    </section>
  );
}

export default TextRichStep;
