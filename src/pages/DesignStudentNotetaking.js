import ProjectHero from '../components/ProjectHero';
import SectionDivider from '../components/SectionDivider';
import ResearchInsightCard from '../components/ResearchInsightCard';
import RecommendationSpotlight from '../components/RecommendationSpotlight';
import TextRichStepTextFocused from '../components/TextRichStepTextFocused';
import { designStudentNotetakingContent as content } from '../content/projects/designStudentNotetaking';

function DesignStudentNotetaking() {
  return (
    <div className="min-h-screen bg-base-200">
      <ProjectHero
        title={content.hero.title}
        image={content.hero.image}
      />

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] items-start">
          <div>
            <div className="badge badge-primary badge-outline mb-4">{content.intro.badge}</div>
            <h1 className="text-4xl font-bold md:text-5xl leading-tight">
              {content.intro.heading}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-base-content/75">
              {content.intro.paragraphs[0]}
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              {content.intro.paragraphs[1]}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {content.intro.ctas.map((cta) => (
                <a key={cta.label} href={cta.href} className={`btn ${cta.variant}`}>{cta.label}</a>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.intro.snapshotLabel}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {content.overviewStats.map((stat) => (
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
        <div className="max-w-6xl mx-auto px-6 py-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.82fr)]">
          <div className="space-y-5">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.overview.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold">{content.overview.heading}</h2>
            </div>
            <p className="leading-relaxed text-base-content/75">
              {content.overview.paragraphs[0]}
            </p>
            <p className="leading-relaxed text-base-content/75">
              {content.overview.paragraphs[1]}
            </p>
          </div>

          <div className="card border border-base-300 bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl">{content.overview.contributions.heading}</h2>
              <ul className="space-y-3 text-sm leading-relaxed text-base-content/75">
                {content.overview.contributions.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <SectionDivider label={content.researchFlowDividerLabel} />
      </div>

      <section className="max-w-6xl mx-auto px-6 py-16">
        {content.processSteps.map((step) => (
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

      <section id={content.findingsSection.id} className="bg-base-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.findingsSection.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-bold">{content.findingsSection.heading}</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              {content.findingsSection.description}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {content.findings.map((finding) => (
              <ResearchInsightCard key={finding.title} {...finding} />
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <SectionDivider label={content.designDirectionsDividerLabel} />
      </div>

      <section id={content.recommendationsSection.id} className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.recommendationsSection.eyebrow}</p>
          <h2 className="mt-3 text-4xl font-bold">{content.recommendationsSection.heading}</h2>
          <p className="mt-5 leading-relaxed text-base-content/75">
            {content.recommendationsSection.description}
          </p>
        </div>

        {content.recommendations.map((recommendation) => (
          <RecommendationSpotlight key={recommendation.title} {...recommendation} />
        ))}
      </section>

      <section className="bg-base-100">
        <div className="max-w-6xl mx-auto px-6 py-16 grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(320px,0.98fr)]">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.artifactsSection.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold">{content.artifactsSection.heading}</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              {content.artifactsSection.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {content.artifacts.map((artifact) => (
                <figure
                  key={artifact.title}
                  className="overflow-hidden rounded-[1.5rem] border border-base-300 bg-base-200 shadow-lg"
                >
                  <img src={artifact.src} alt={artifact.title} className="w-full object-cover" />
                  <figcaption className="px-4 py-3 text-sm text-base-content/65">{artifact.title}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-base-300 bg-base-200 p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.constraints.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold">{content.constraints.heading}</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              {content.constraints.paragraphs[0]}
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              {content.constraints.paragraphs[1]}
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
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
      </section>
    </div>
  );
}

export default DesignStudentNotetaking;
