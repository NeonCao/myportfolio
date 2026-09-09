import ProjectHero from '../components/ProjectHero';
import MixologyExplorer from '../components/MixologyExplorer';
import { periodicTableOfMixologyContent as content } from '../content/projects/periodicTableOfMixology';

function PeriodicTableOfMixology() {
  return (
    <div className="min-h-screen bg-base-200">
      <ProjectHero title={content.hero.title} image={content.hero.image} />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-start">
          <div>
            <div className="badge badge-primary badge-outline mb-4">{content.intro.badge}</div>
            <h1 className="text-4xl font-bold md:text-5xl">
              {content.intro.heading}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-base-content/75">
              {content.intro.paragraph}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#mixology-explorer" className="btn btn-primary">
                {content.intro.primaryButtonLabel}
              </a>
              <a href="#build-story" className="btn btn-outline">
                {content.intro.secondaryButtonLabel}
              </a>
            </div>
          </div>

          <div className="stats stats-vertical shadow-xl bg-base-100 border border-base-300">
            {content.stats.map((stat) => (
              <div key={stat.key} className="stat">
                <div className="stat-title">{stat.title}</div>
                <div className={`stat-value ${stat.valueClassName}`}>{stat.value}</div>
                <div className="stat-desc">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div className="overflow-hidden rounded-[2rem] shadow-2xl">
            <img src={content.background.image} alt={content.background.imageAlt} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.background.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">{content.background.heading}</h2>
            {content.background.paragraphs.map((paragraph, index) => (
              <p key={index} className={index === 0 ? 'mt-5 leading-relaxed text-base-content/75' : 'mt-4 leading-relaxed text-base-content/75'}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {content.highlights.map((item) => (
            <div key={item.title} className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p className="text-base-content/75">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="build-story" className="bg-base-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.buildStory.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              {content.buildStory.heading}
            </h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              {content.buildStory.paragraph}
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {content.versionCards.map((card) => (
              <article key={card.title} className="card bg-base-200 shadow-xl overflow-hidden">
                <figure>
                  <img src={card.image} alt={card.title} className="h-64 w-full object-cover" />
                </figure>
                <div className="card-body">
                  <p className="text-sm uppercase tracking-[0.3em] text-base-content/50">{card.eyebrow}</p>
                  <h3 className="card-title text-2xl">{card.title}</h3>
                  <p className="text-base-content/75">{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="mixology-explorer" className="mx-auto w-full max-w-[96rem] px-6 py-16">
        <MixologyExplorer />
      </section>

      <section className="bg-base-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.futureIdeas.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">{content.futureIdeas.heading}</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              {content.futureIdeas.paragraph}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {content.futureIdeas.cards.map((card) => (
              <div key={card.title} className="card bg-base-200 shadow-xl overflow-hidden">
                <figure>
                  <img src={card.image} alt={card.alt} className="h-64 w-full object-cover" />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{card.title}</h3>
                  <p className="text-base-content/75">
                    {card.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="card overflow-hidden bg-base-100 shadow-2xl border border-base-300 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <figure className="h-full">
            <img src={content.summary.image} alt={content.summary.imageAlt} className="h-full w-full object-cover" />
          </figure>
          <div className="card-body justify-center p-8 md:p-12">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.summary.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold">{content.summary.heading}</h2>
            {content.summary.paragraphs.map((paragraph, index) => (
              <p key={index} className={index === 0 ? 'mt-5 leading-relaxed text-base-content/75' : 'mt-4 leading-relaxed text-base-content/75'}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PeriodicTableOfMixology;
