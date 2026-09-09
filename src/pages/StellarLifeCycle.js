import ProjectHero from '../components/ProjectHero';
import SectionDivider from '../components/SectionDivider';
import TextRichStep from '../components/TextRichStep';

import { stellarLifeCycleContent as content } from '../content/projects/stellarLifeCycle';

const { hero, overview, intro, sectionDividerLabel, processSteps } = content;

function StellarLifeCycle() {
  return (
    <div className="min-h-screen bg-base-200">
      <ProjectHero
        title={hero.title}
        image={hero.image}
      />

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)] items-start">
          <div>
            <div className="badge badge-primary badge-outline mb-4">{overview.badge}</div>
            <h1 className="text-4xl font-bold md:text-5xl">
              {overview.heading}
            </h1>
            {overview.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={index === 0 ? 'mt-6 text-lg leading-relaxed text-base-content/75' : 'mt-4 leading-relaxed text-base-content/75'}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{overview.focusLabel}</p>
              <div className="stats stats-vertical bg-base-200 shadow">
                {overview.stats.map((stat) => (
                  <div className="stat" key={stat.title}>
                    <div className="stat-title">{stat.title}</div>
                    <div className={`stat-value ${stat.valueClassName}`}>{stat.value}</div>
                    <div className="stat-desc">{stat.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="max-w-6xl mx-auto px-6 py-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <h2 className="text-3xl font-bold">{intro.heading}</h2>
            {intro.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={index === 0 ? 'mt-5 leading-relaxed text-base-content/75' : 'mt-4 leading-relaxed text-base-content/75'}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {intro.images.map((image) => (
              <div key={image.src} className={image.className}>
                <img src={image.src} alt={image.alt} className="w-full object-cover" />
              </div>
            ))}
            <div className="flex items-center justify-center rounded-[1.25rem] bg-base-200 p-4 text-sm text-center text-base-content/60">
              {intro.caption}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <SectionDivider label={sectionDividerLabel} />
      </div>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        {processSteps.map((step, index) => (
          <TextRichStep
            key={step.number}
            number={step.number}
            title={step.title}
            intro={step.intro}
            sections={step.sections}
            bullets={step.bullets}
            images={step.images}
            imageLeft={step.imageLeft}
            showTopBorder={index > 0}
          />
        ))}
      </section>
    </div>
  );
}

export default StellarLifeCycle;
