import DemoVideo from '../components/DemoVideo';
import ProjectHero from '../components/ProjectHero';
import SectionDivider from '../components/SectionDivider';
import { memoryGradenContent as content } from '../content/projects/memoryGraden';

const {
  hero,
  overview,
  experience,
  contributionDividerLabel,
  myRole,
  demo,
  buildChallengesDividerLabel,
  build,
  outcome,
  nextStepsSection,
} = content;

function InsightCard({ title, text }) {
  return (
    <article className="card border border-base-300 bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title text-2xl">{title}</h3>
        <p className="leading-relaxed text-base-content/72">{text}</p>
      </div>
    </article>
  );
}

function MemoryGraden() {
  return (
    <div className="min-h-screen bg-base-200">
      <ProjectHero title={hero.title} image={hero.image} />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <div>
            <div className="badge badge-primary badge-outline mb-4">{overview.badge}</div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              {overview.heading}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-base-content/75">
              {overview.paragraph1.before}
              <em>{overview.paragraph1.italic}</em>
              {overview.paragraph1.after}
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              {overview.paragraph2}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={overview.primaryCta.href}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                {overview.primaryCta.label}
              </a>
              <a href={overview.secondaryCta.href} className="btn btn-outline">
                {overview.secondaryCta.label}
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{overview.snapshotLabel}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {overview.snapshotStats.map((stat) => (
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
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{experience.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-bold">{experience.heading}</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              {experience.paragraph}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {experience.cards.map((card) => (
              <InsightCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider label={contributionDividerLabel} />
      </div>

      <section id="my-role" className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{myRole.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-bold">{myRole.heading}</h2>
            {myRole.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={index === 0 ? 'mt-6 leading-relaxed text-base-content/75' : 'mt-4 leading-relaxed text-base-content/75'}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid gap-5">
            {myRole.cards.map((card) => (
              <InsightCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-8 text-3xl font-bold">{demo.heading}</h2>
          <DemoVideo
            label={demo.label}
            title={demo.title}
            embedUrl={demo.embedUrl}
          />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider label={buildChallengesDividerLabel} />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
          <div className="rounded-[2.25rem] border border-base-300 bg-base-100 p-8 shadow-2xl md:p-12">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{build.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-bold">{build.heading}</h2>
            {build.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={index === 0 ? 'mt-6 leading-relaxed text-base-content/75' : 'mt-4 leading-relaxed text-base-content/75'}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid gap-5">
            {build.cards.map((card) => (
              <InsightCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
          <div className="rounded-[2.25rem] border border-base-300 bg-gradient-to-br from-base-100 via-base-200 to-base-100 p-8 shadow-2xl md:p-12">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{outcome.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-bold">{outcome.heading}</h2>
            {outcome.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={index === 0 ? 'mt-6 leading-relaxed text-base-content/75' : 'mt-4 leading-relaxed text-base-content/75'}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="rounded-[2rem] border border-base-300 bg-base-200 p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{nextStepsSection.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold">{nextStepsSection.heading}</h2>
            <div className="mt-6 space-y-4">
              {nextStepsSection.steps.map((step) => (
                <div key={step} className="rounded-[1.25rem] bg-base-100 p-4 shadow-md">
                  <p className="leading-relaxed text-base-content/75">{step}</p>
                </div>
              ))}
            </div>
            <a
              href={nextStepsSection.cta.href}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline mt-8"
            >
              {nextStepsSection.cta.label}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MemoryGraden;
