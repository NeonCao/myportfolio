import ProjectHero from '../components/ProjectHero';
import SectionDivider from '../components/SectionDivider';
import TextRichStepTextFocused from '../components/TextRichStepTextFocused';
import ResearchInsightCard from '../components/ResearchInsightCard';
import { aboutMyselfContent as content } from '../content/projects/aboutMyself';

function ProjectAboutMyself() {
  return (
    <div className="min-h-screen bg-base-200">
      <ProjectHero title={content.hero.title} image={content.hero.image} />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <div>
            <div className="badge badge-primary badge-outline mb-4">{content.intro.badge}</div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              {content.intro.heading}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-base-content/75">
              {content.intro.paragraphs[0]}
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              {content.intro.paragraphs[1]}
            </p>
          </div>

          <div className="rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.intro.snapshotLabel}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {content.intro.snapshotStats.map((stat) => (
                <div key={stat.label} className="rounded-[1.25rem] bg-base-200 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-base-content/50">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-2 text-sm leading-relaxed text-base-content/68">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.passions.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-bold">{content.passions.heading}</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              {content.passions.description}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {content.passions.cards.map((card) => (
              <ResearchInsightCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider label={content.buildProcess.dividerLabel} />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-16">
        {content.buildProcess.steps.map((step) => (
          <TextRichStepTextFocused
            key={step.number}
            number={step.number}
            title={step.title}
            intro={step.intro}
            sections={step.sections}
            images={step.images}
            imageLeft={step.imageLeft}
          />
        ))}
      </section>

      <section className="bg-base-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.gallery.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-bold">{content.gallery.heading}</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              {content.gallery.description}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {content.gallery.items.map((item) => (
              <figure
                key={item.src}
                className="overflow-hidden rounded-[1.5rem] border border-base-300 bg-base-200 shadow-lg"
              >
                <img src={item.src} alt={item.caption} className="aspect-[4/3] w-full object-cover" />
                <figcaption className="px-4 py-3 text-sm text-base-content/65">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-4xl font-bold">{content.demo.heading}</h2>
        <div className="relative mt-8 w-full overflow-hidden rounded-[2rem] shadow-2xl" style={{ paddingTop: '56.25%' }}>
          <iframe
            src={content.demo.videoSrc}
            title={content.demo.videoTitle}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider label={content.flaws.dividerLabel} />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {content.flaws.cards.map((flaw) => (
            <article key={flaw.title} className="rounded-[1.75rem] border border-base-300 bg-base-100 p-6 shadow-xl">
              <div className="aspect-[3/2] overflow-hidden rounded-[1.25rem] bg-base-200">
                <img src={flaw.image} alt={flaw.title} className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-5 text-xl font-semibold leading-tight">{flaw.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-base-content/72">
                <strong>{content.flaws.flawLabel}</strong> {flaw.body}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-base-content/72">
                <strong>{content.flaws.improvementLabel}</strong> {flaw.improvement}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
          <div className="rounded-[2.25rem] border border-base-300 bg-gradient-to-br from-base-100 via-base-200 to-base-100 p-8 shadow-2xl md:p-12">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.reflection.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-bold">{content.reflection.heading}</h2>
            <p className="mt-6 leading-relaxed text-base-content/75">
              {content.reflection.paragraphs[0]}
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              {content.reflection.paragraphs[1]}
            </p>
          </div>

          <div className="rounded-[2rem] border border-base-300 bg-base-200 p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.reflection.code.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold">{content.reflection.code.heading}</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              {content.reflection.code.description}
            </p>
            <a
              href={content.reflection.code.linkHref}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary mt-8"
            >
              {content.reflection.code.linkLabel}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProjectAboutMyself;
