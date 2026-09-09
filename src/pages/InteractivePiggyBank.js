import ProjectHero from '../components/ProjectHero';
import SectionDivider from '../components/SectionDivider';
import TextRichStepTextFocused from '../components/TextRichStepTextFocused';
import ResearchInsightCard from '../components/ResearchInsightCard';
import PiggyBankPrototypePhone from '../components/PiggyBankPrototypePhone';

import { interactivePiggyBankContent as content } from '../content/projects/interactivePiggyBank';

function InteractivePiggyBank() {
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
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.overview.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-bold">{content.overview.heading}</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              {content.overview.paragraphs[0]}
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              {content.overview.paragraphs[1]}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {content.overview.principles.map((card) => (
              <ResearchInsightCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider label={content.designWalkthroughLabel} />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-16">
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

      <section className="bg-base-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.challenges.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-bold">{content.challenges.heading}</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              {content.challenges.paragraph}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {content.challenges.cards.map((card) => (
              <ResearchInsightCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 items-center lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.92fr)]">
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

          <div className="overflow-hidden rounded-[2rem] border border-base-300 shadow-2xl">
            <img
              src={content.reflection.image}
              alt={content.reflection.imageAlt}
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      <PiggyBankPrototypePhone />
    </div>
  );
}

export default InteractivePiggyBank;
