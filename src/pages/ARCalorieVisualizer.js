import ProjectHero from '../components/ProjectHero';
import SectionDivider from '../components/SectionDivider';
import ResearchInsightCard from '../components/ResearchInsightCard';
import ProblemSolutionCard from '../components/ProblemSolutionCard';

import { arCalorieVisualizerContent as content } from '../content/projects/arCalorieVisualizer';

function ARCalorieVisualizer() {
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
            {content.intro.paragraphs.map((paragraph, index) => (
              <p key={index} className={index === 0 ? 'mt-6 text-lg leading-relaxed text-base-content/75' : 'mt-4 leading-relaxed text-base-content/75'}>
                {paragraph}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={content.intro.ctaButtons.watchDemo.href}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                {content.intro.ctaButtons.watchDemo.label}
              </a>
              <a href={content.intro.ctaButtons.jumpToChallenges.href} className="btn btn-outline">
                {content.intro.ctaButtons.jumpToChallenges.label}
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.intro.snapshot.label}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {content.intro.snapshot.stats.map((stat) => (
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
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.92fr)] lg:items-center">
            <div className="overflow-hidden rounded-[2rem] border border-base-300 shadow-2xl">
              <img
                src={content.whyExists.image}
                alt={content.whyExists.imageAlt}
                className="w-full object-cover"
              />
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.whyExists.eyebrow}</p>
              <h2 className="mt-3 text-4xl font-bold">{content.whyExists.heading}</h2>
              {content.whyExists.paragraphs.map((paragraph, index) => (
                <p key={index} className={index === 0 ? 'mt-5 leading-relaxed text-base-content/75' : 'mt-4 leading-relaxed text-base-content/75'}>
                  {paragraph}
                </p>
              ))}

              <div className="mt-8 rounded-[1.5rem] border border-base-300 bg-base-200 p-5 shadow-lg">
                <p className="text-xs uppercase tracking-[0.3em] text-base-content/45">{content.whyExists.targetAudience.label}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {content.whyExists.targetAudience.audiences.map((audience) => (
                    <span key={audience} className="badge badge-outline h-auto px-4 py-3">{audience}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider label={content.coreFeaturesDivider.label} />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {content.features.cards.map((feature) => (
            <article
              key={feature.title}
              className="card border border-base-300 bg-base-100 shadow-xl transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="card-body">
                <div className="badge badge-outline badge-secondary">{content.features.badgeLabel}</div>
                <h3 className="card-title text-2xl">{feature.title}</h3>
                <p className="leading-relaxed text-base-content/72">{feature.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.whyArFits.eyebrow}</p>
              <h2 className="mt-3 text-4xl font-bold">{content.whyArFits.heading}</h2>
              {content.whyArFits.paragraphs.map((paragraph, index) => (
                <p key={index} className={index === 0 ? 'mt-5 leading-relaxed text-base-content/75' : 'mt-4 leading-relaxed text-base-content/75'}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="stats stats-vertical bg-base-200 shadow-xl">
              {content.whyArFits.stats.map((stat) => (
                <div key={stat.title} className="stat">
                  <div className="stat-title">{stat.title}</div>
                  <div className={`stat-value ${stat.valueClassName}`}>{stat.value}</div>
                  <div className="stat-desc">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider label={content.engineeringHurdlesDivider.label} />
      </div>

      <section id="engineering-hurdles" className="mx-auto max-w-6xl px-6 py-12">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold">{content.engineeringHurdles.heading}</h2>
          <p className="mt-5 leading-relaxed text-base-content/75">
            {content.engineeringHurdles.description}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {content.engineeringHurdles.cards.map((card) => (
            <ProblemSolutionCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.demo.eyebrow}</p>
              <h2 className="mt-3 text-4xl font-bold">{content.demo.heading}</h2>
            </div>
            <a
              href={content.demo.openLinkHref}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              {content.demo.openLinkLabel}
            </a>
          </div>

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
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.futureDevelopment.eyebrow}</p>
          <h2 className="mt-3 text-4xl font-bold">{content.futureDevelopment.heading}</h2>
          <p className="mt-5 leading-relaxed text-base-content/75">
            {content.futureDevelopment.description}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {content.futureDevelopment.cards.map((card) => (
            <ResearchInsightCard key={card.title} {...card} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ARCalorieVisualizer;
