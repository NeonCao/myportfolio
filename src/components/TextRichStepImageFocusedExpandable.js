import ExpandableImageRow from './ExpandableImageRow';

function TextRichStepImageFocusedExpandable({
  number,
  title,
  intro,
  sections = [],
  bullets = [],
  images = [],
  tileFit = 'cover',
  imageLayout = 'grid',
}) {
  const textBlock = (
    <div className="max-w-4xl space-y-6">
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
        <ul className="list-disc space-y-3 pl-5 leading-relaxed text-base-content/70">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );

  const imageBlock = (
    <div className="grid gap-4">
      {images.length > 1 ? (
        <ExpandableImageRow images={images} title={title} tileFit={tileFit} layout={imageLayout} />
      ) : (
        images.map((img) => (
          <figure key={img.src} className="space-y-2">
            <img src={img.src} alt={img.alt || img.caption || title} className="w-full rounded-[1.5rem] object-cover shadow-xl" />
            {img.caption ? <figcaption className="text-center text-xs opacity-50">{img.caption}</figcaption> : null}
          </figure>
        ))
      )}
    </div>
  );

  return (
    <section className="space-y-10 border-t border-base-300 py-16">
      {textBlock}
      {imageBlock}
    </section>
  );
}

export default TextRichStepImageFocusedExpandable;
