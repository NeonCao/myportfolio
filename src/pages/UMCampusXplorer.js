import ProjectHero from '../components/ProjectHero';
import BuildStep from '../components/BuildStep';
import SectionDivider from '../components/SectionDivider';

import { umCampusXplorerContent as content } from '../content/projects/umCampusXplorer';

function UMCampusXplorer() {
  return (
    <div className="min-h-screen bg-base-200">
      <ProjectHero title={content.hero.title} image={content.hero.image} />

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] items-start">
          <div>
            <div className="badge badge-primary badge-outline mb-4">{content.intro.badge}</div>
            <h1 className="text-4xl font-bold md:text-5xl">{content.intro.heading}</h1>
            <p className="mt-6 text-lg leading-relaxed text-base-content/75">
              {content.intro.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={content.intro.ctaButtons.watchDemo.href}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                {content.intro.ctaButtons.watchDemo.label}
              </a>
              <a href={content.intro.ctaButtons.jumpToStoryboard.href} className="btn btn-outline">
                {content.intro.ctaButtons.jumpToStoryboard.label}
              </a>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.intro.audienceCard.label}</p>
              <div className="flex flex-wrap gap-3 mt-2">
                {content.intro.audienceCard.audiences.map((audience) => (
                  <span key={audience} className="badge badge-outline h-auto px-4 py-3">
                    {audience}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-base-content/70">
                {content.intro.audienceCard.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.appDescription.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold">{content.appDescription.heading}</h2>
              {content.appDescription.paragraphs.map((paragraph, index) => (
                <p key={index} className={index === 0 ? 'mt-5 leading-relaxed text-base-content/75' : 'mt-4 leading-relaxed text-base-content/75'}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="stats stats-vertical shadow-xl bg-base-200">
              {content.appDescription.stats.map((stat) => (
                <div key={stat.key} className="stat">
                  <div className="stat-title">{stat.title}</div>
                  <div className={`stat-value ${stat.valueClassName}`}>{stat.value}</div>
                  <div className="stat-desc">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="storyboard" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-4">{content.storyboard.heading}</h2>
        <p className="text-base-content/70 max-w-3xl mb-6 leading-relaxed">
          {content.storyboard.description}
        </p>

        {content.storyboard.steps.map((step, index) => (
          <BuildStep
            key={step.number}
            number={step.number}
            title={step.title}
            text={step.text}
            images={[{ src: step.image, caption: step.imageCaption }]}
            imageLeft={index % 2 === 1}
          />
        ))}
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <SectionDivider label={content.whyArDivider.label} />
      </div>

      <section className="bg-base-100 mt-8">
        <div className="max-w-6xl mx-auto px-6 py-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] items-center">
          <div>
            <h2 className="text-3xl font-bold">{content.whyAr.heading}</h2>
            {content.whyAr.paragraphs.map((paragraph, index) => (
              <p key={index} className={index === 0 ? 'mt-5 leading-relaxed text-base-content/75' : 'mt-4 leading-relaxed text-base-content/75'}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className="overflow-hidden rounded-[2rem] shadow-2xl">
            <img src={content.whyAr.image} alt={content.whyAr.imageAlt} className="w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-3xl">{content.iteration.heading}</h2>
              <p className="text-base-content/70 leading-relaxed">
                {content.iteration.description}
              </p>
              <ul className="space-y-3 text-sm leading-relaxed text-base-content/75 mt-2">
                {content.iteration.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-3xl">{content.evaluation.heading}</h2>
              {content.evaluation.paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-base-content/75">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-8">{content.demoVideo.heading}</h2>
          <div className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl" style={{ paddingTop: '56.25%' }}>
            <iframe
              src={content.demoVideo.src}
              title={content.demoVideo.title}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default UMCampusXplorer;
