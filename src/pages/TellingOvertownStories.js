import ProjectHero from '../components/ProjectHero';
import DemoVideo from '../components/DemoVideo';
import SectionDivider from '../components/SectionDivider';
import { tellingOvertownStoriesContent as content } from '../content/projects/tellingOvertownStories';

const badgeClasses = {
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
};

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

function PortalExperienceCard({
  eyebrow,
  title,
  summary,
  context,
  highlights = [],
  muralImage,
  muralAlt,
  sceneImage,
  sceneAlt,
  accent,
}) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 shadow-2xl">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
        <div className="grid gap-4 border-b border-base-300 bg-base-200 p-4 lg:border-b-0 lg:border-r">
          <figure className="space-y-2">
            <img src={muralImage} alt={muralAlt} className="h-full w-full rounded-[1.4rem] object-cover shadow-lg" />
            <figcaption className="text-center text-xs uppercase tracking-[0.24em] text-base-content/50">
              Original Mural
            </figcaption>
          </figure>
          <figure className="space-y-2">
            <img src={sceneImage} alt={sceneAlt} className="h-full w-full rounded-[1.4rem] object-cover shadow-lg" />
            <figcaption className="text-center text-xs uppercase tracking-[0.24em] text-base-content/50">
              Rebuilt Interactive Scene
            </figcaption>
          </figure>
        </div>

        <div className="p-6 md:p-8">
          <div className={`badge badge-outline ${badgeClasses[accent] || badgeClasses.primary}`}>{eyebrow}</div>
          <h3 className="mt-5 text-3xl font-semibold leading-tight">{title}</h3>
          <p className="mt-4 leading-relaxed text-base-content/72">{summary}</p>
          <p className="mt-4 leading-relaxed text-base-content/72">{context}</p>

          <div className="mt-6 rounded-[1.4rem] bg-base-200 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-base-content/45">What This Scene Adds</p>
            <ul className="mt-4 space-y-3 leading-relaxed text-base-content/72">
              {highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

function AwardBadgeCard({ image, alt }) {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-neutral p-3 text-neutral-content shadow-xl">
      <div className="flex min-h-[12rem] items-center justify-center rounded-[1.2rem] bg-black/60 p-3">
        <img src={image} alt={alt} className="max-h-[13rem] w-full object-contain" loading="lazy" />
      </div>
    </article>
  );
}

function TellingOvertownStories() {
  return (
    <div className="min-h-screen bg-base-200">
      <ProjectHero
        title={content.hero.pageTitle}
        image={content.hero.heroImage}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <div>
            <div className="badge badge-primary badge-outline mb-4">{content.hero.badge}</div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              {content.hero.heading}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-base-content/75">
              {content.hero.paragraphs[0]}
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              {content.hero.paragraphs[1]}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={content.hero.primaryCta.href}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                {content.hero.primaryCta.label}
              </a>
              <a href={content.hero.secondaryCta.href} className="btn btn-outline">
                {content.hero.secondaryCta.label}
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.snapshot.label}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {content.snapshot.stats.map((stat) => (
                <div key={stat.label} className="rounded-[1.25rem] bg-base-200 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-base-content/50">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-2 text-sm leading-relaxed text-base-content/68">{stat.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.28em] text-base-content/50">{content.snapshot.recognitionLabel}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {content.snapshot.awardBadges.map((badge) => (
                  <AwardBadgeCard key={badge.alt} {...badge} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-center">
          <div className="rounded-[2.25rem] border border-base-300 bg-gradient-to-br from-base-100 via-base-200 to-base-100 p-8 shadow-2xl md:p-12">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.whyThisExists.label}</p>
            <h2 className="mt-3 text-4xl font-bold">{content.whyThisExists.heading}</h2>
            <p className="mt-6 leading-relaxed text-base-content/75">
              {content.whyThisExists.paragraphs[0]}
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              {content.whyThisExists.paragraphs[1]}
            </p>
          </div>

          <div className="stats stats-vertical border border-base-300 bg-base-200 shadow-xl">
            <div className="stat">
              <div className="stat-title">{content.whyThisExists.stats.neighborhoodFocus.title}</div>
              <div className={`stat-value ${content.whyThisExists.stats.neighborhoodFocus.valueClassName}`}>
                {content.whyThisExists.stats.neighborhoodFocus.value}
              </div>
              <div className="stat-desc">{content.whyThisExists.stats.neighborhoodFocus.description}</div>
            </div>
            <div className="stat">
              <div className="stat-title">{content.whyThisExists.stats.coreInteraction.title}</div>
              <div className={`stat-value ${content.whyThisExists.stats.coreInteraction.valueClassName}`}>
                {content.whyThisExists.stats.coreInteraction.value}
              </div>
              <div className="stat-desc">{content.whyThisExists.stats.coreInteraction.description}</div>
            </div>
            <div className="stat">
              <div className="stat-title">{content.whyThisExists.stats.publicLaunch.title}</div>
              <div className={`stat-value ${content.whyThisExists.stats.publicLaunch.valueClassName}`}>
                {content.whyThisExists.stats.publicLaunch.value}
              </div>
              <div className="stat-desc">{content.whyThisExists.stats.publicLaunch.description}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider label={content.muralsIntro.dividerLabel} />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.92fr)] lg:items-center">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-bold">{content.muralsIntro.heading}</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              {content.muralsIntro.paragraphs[0]}
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              {content.muralsIntro.paragraphs[1]}
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              {content.muralsIntro.paragraphs[2]}
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-base-300 shadow-2xl">
            <img
              src={content.muralsIntro.hubImage}
              alt={content.muralsIntro.hubImageAlt}
              className="w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-12 rounded-[1.75rem] border border-base-300 bg-base-100 p-6 shadow-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.interactionStructure.label}</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.25rem] bg-base-200 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-base-content/45">
                {content.interactionStructure.steps.start.label}
              </p>
              <p className="mt-3 leading-relaxed text-base-content/72">
                {content.interactionStructure.steps.start.text}
              </p>
            </div>
            <div className="rounded-[1.25rem] bg-base-200 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-base-content/45">
                {content.interactionStructure.steps.interact.label}
              </p>
              <p className="mt-3 leading-relaxed text-base-content/72">
                {content.interactionStructure.steps.interact.text}
              </p>
            </div>
            <div className="rounded-[1.25rem] bg-base-200 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-base-content/45">
                {content.interactionStructure.steps.reveal.label}
              </p>
              <p className="mt-3 leading-relaxed text-base-content/72">
                {content.interactionStructure.steps.reveal.text}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-8">
          {content.portalExperiences.map((portal) => (
            <PortalExperienceCard key={portal.title} {...portal} />
          ))}
        </div>
      </section>

      <section id="my-role" className="bg-base-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.contribution.label}</p>
              <h2 className="mt-3 text-4xl font-bold">{content.contribution.heading}</h2>
              <p className="mt-6 leading-relaxed text-base-content/75">
                {content.contribution.paragraphs[0]}
              </p>
              <p className="mt-4 leading-relaxed text-base-content/75">
                {content.contribution.paragraphs[1]}
              </p>
              <p className="mt-4 leading-relaxed text-base-content/75">
                {content.contribution.paragraphs[2]}
              </p>
            </div>

            <div className="grid gap-5">
              {content.contribution.cards.map((card) => (
                <InsightCard key={card.title} {...card} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider label={content.process.dividerLabel} />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {content.process.cards.map((card) => (
            <InsightCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-8 text-3xl font-bold">{content.videos.heading}</h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {content.videos.cards.map((video) => (
              <DemoVideo key={video.title} {...video} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
          <div className="rounded-[2.25rem] border border-base-300 bg-gradient-to-br from-base-100 via-base-200 to-base-100 p-8 shadow-2xl md:p-12">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.outcome.label}</p>
            <h2 className="mt-3 text-4xl font-bold">{content.outcome.heading}</h2>
            <p className="mt-6 leading-relaxed text-base-content/75">
              {content.outcome.paragraphs[0]}
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              {content.outcome.paragraphs[1]}
            </p>
          </div>

          <div className="rounded-[2rem] border border-base-300 bg-base-200 p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.sourceLinks.label}</p>
            <h2 className="mt-3 text-3xl font-bold">{content.sourceLinks.heading}</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              {content.sourceLinks.paragraph}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {content.sourceLinks.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TellingOvertownStories;
