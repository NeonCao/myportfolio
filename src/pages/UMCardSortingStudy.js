import ProjectHero from '../components/ProjectHero';
import SectionDivider from '../components/SectionDivider';
import TextRichStepTextFocused from '../components/TextRichStepTextFocused';
import ResearchInsightCard from '../components/ResearchInsightCard';
import RecommendationSpotlight from '../components/RecommendationSpotlight';
import { umCardSortingStudyContent as content } from '../content/projects/umCardSortingStudy';

function UMCardSortingStudy() {
  return (
    <div className="min-h-screen bg-base-200">
      <ProjectHero
        title={content.hero.title}
        image={content.hero.image}
      />

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
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={content.intro.ctaButtons.methodology.href} className="btn btn-primary">
                {content.intro.ctaButtons.methodology.label}
              </a>
              <a href={content.intro.ctaButtons.analysis.href} className="btn btn-outline">
                {content.intro.ctaButtons.analysis.label}
              </a>
            </div>
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
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
          <div className="space-y-5">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.context.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold">{content.context.heading}</h2>
            </div>
            <p className="leading-relaxed text-base-content/75">
              {content.context.paragraphs[0]}
            </p>
            <p className="leading-relaxed text-base-content/75">
              {content.context.paragraphs[1]}
            </p>
          </div>

          <div className="card border border-base-300 bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl">{content.context.goal.heading}</h2>
              <p className="leading-relaxed text-base-content/75">
                {content.context.goal.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {content.team.map((member) => (
            <article
              key={member.name}
              className="overflow-hidden rounded-[1.75rem] border border-base-300 bg-base-100 shadow-xl"
            >
              <div className="aspect-square bg-base-200 p-6">
                <img src={member.image} alt={member.name} className="h-full w-full object-contain" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.25em] text-base-content/55">{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div id="methodology" className="mx-auto max-w-6xl px-6">
        <SectionDivider label={content.methodologyDivider.label} />
      </div>

      <section className="bg-base-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-bold">{content.methodology.heading}</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              {content.methodology.description}
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {content.methodology.timeline.map((phase) => (
              <article
                key={phase.title}
                className="rounded-[1.5rem] border border-base-300 bg-base-200 p-6 shadow-lg"
              >
                <img src={phase.image} alt={phase.title} className="h-16 w-16 object-contain" />
                <h3 className="mt-5 text-xl font-semibold">{phase.title}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.25em] text-base-content/55">{phase.dates}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="rounded-[2rem] border border-base-300 bg-base-100 p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.participants.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold">{content.participants.heading}</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              {content.participants.description}
            </p>
          </div>

          <div className="grid gap-4">
            {content.participants.groups.map((group) => (
              <div
                key={group.title}
                className="rounded-[1.5rem] border border-base-300 bg-base-100 p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold">{group.title}</h3>
                <p className="mt-3 leading-relaxed text-base-content/72">{group.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        {content.researchSteps.map((step) => (
          <TextRichStepTextFocused
            key={step.number}
            number={step.number}
            title={step.title}
            intro={step.intro}
            sections={step.sections}
            bullets={step.bullets}
            images={step.images}
            imageLeft={step.imageLeft}
          />
        ))}
      </section>

      <div id="analysis" className="mx-auto max-w-6xl px-6">
        <SectionDivider label={content.analysisDivider.label} />
      </div>

      <section className="bg-base-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-bold">{content.evidence.heading}</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              {content.evidence.description}
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {content.evidence.cards.map((card) => (
              <ResearchInsightCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        {content.analysisSteps.map((step) => (
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
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.quotesSection.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-bold">{content.quotesSection.heading}</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              {content.quotesSection.description}
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {content.quotesSection.quotes.map((quote) => (
              <blockquote
                key={quote}
                className="rounded-[1.5rem] border border-base-300 bg-base-200 p-6 text-sm leading-relaxed shadow-lg"
              >
                {quote}
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider label={content.recommendationsDivider.label} />
      </div>

      <section className="mx-auto max-w-6xl space-y-12 px-6 py-16">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold">{content.recommendationsSection.heading}</h2>
          <p className="mt-5 leading-relaxed text-base-content/75">
            {content.recommendationsSection.description}
          </p>
        </div>

        {content.recommendationsSection.items.map((recommendation) => (
          <RecommendationSpotlight key={recommendation.title} {...recommendation} />
        ))}
      </section>

      <section className="bg-base-100">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="overflow-hidden rounded-[2rem] border border-base-300 shadow-2xl">
            <img src={content.prototype.image} alt={content.prototype.imageAlt} className="w-full object-cover" />
          </div>

          <div className="rounded-[2rem] border border-base-300 bg-base-200 p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.prototype.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold">{content.prototype.heading}</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              {content.prototype.description}
            </p>
            <a
              href={content.prototype.cta.href}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary mt-8"
            >
              {content.prototype.cta.label}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-[2.25rem] border border-base-300 bg-gradient-to-br from-base-100 via-base-200 to-base-100 p-8 shadow-2xl md:p-12">
          <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.reflection.eyebrow}</p>
          <h2 className="mt-3 text-4xl font-bold">{content.reflection.heading}</h2>
          <p className="mt-6 leading-relaxed text-base-content/75">
            {content.reflection.paragraphs[0]}
          </p>
          <p className="mt-4 leading-relaxed text-base-content/75">
            {content.reflection.paragraphs[1]}
          </p>
          <p className="mt-4 leading-relaxed text-base-content/75">
            {content.reflection.paragraphs[2]}
          </p>
        </div>
      </section>
    </div>
  );
}

export default UMCardSortingStudy;
