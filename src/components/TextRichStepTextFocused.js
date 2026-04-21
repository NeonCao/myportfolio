function TextRichStepTextFocused({
  number,
  title,
  intro,
  sections = [],
  bullets = [],
  images = [],
  imageLeft = false,
}) {
  const textBlock = (
    <div className={`space-y-6 lg:sticky lg:top-28 lg:col-span-3 lg:self-start ${imageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.35em] opacity-50">Step {number}</p>
        <h3 className="text-3xl font-bold leading-tight">{title}</h3>
      </div>

      {intro ? (
        <p className="whitespace-pre-line leading-relaxed text-base-content/75">
          {intro}
        </p>
      ) : null}

      {sections.map((section) => (
        <div key={section.heading || section.body} className="space-y-2">
          {section.heading ? <h4 className="text-lg font-semibold">{section.heading}</h4> : null}
          {section.body ? (
            <p className="whitespace-pre-line leading-relaxed text-base-content/70">
              {section.body}
            </p>
          ) : null}
        </div>
      ))}

      {bullets.length ? (
        <ul className="space-y-3 leading-relaxed text-base-content/70">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );

  const imageBlock = (
    <div className={`grid gap-4 lg:col-span-2 ${imageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
      {images.map((img) => (
        <figure key={img.src} className="space-y-2">
          <img src={img.src} alt={img.caption || title} className="w-full rounded-[1.5rem] object-cover shadow-xl" />
          {img.caption ? <figcaption className="text-center text-xs opacity-50">{img.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  );

  return (
    <section className="grid gap-10 border-t border-base-300 py-16 lg:grid-cols-5 lg:items-start">
      {textBlock}
      {imageBlock}
    </section>
  );
}

export default TextRichStepTextFocused;
