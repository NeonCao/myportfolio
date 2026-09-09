import ProjectHero from '../components/ProjectHero';
import ResearchInsightCard from '../components/ResearchInsightCard';
import TextRichStepImageFocused from '../components/TextRichStepImageFocused';
import TextRichStepImageFocusedExpandable from '../components/TextRichStepImageFocusedExpandable';
import fiveStarHostRedesignContent from '../content/projects/fiveStarHostRedesign';

const { hero, findings, redesignSteps, wireframingContribution } = fiveStarHostRedesignContent;

function WireframingContributionSection({ content }) {
  return (
    <section className="border-t border-base-300 py-16">
      <div className="max-w-4xl">
        <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{content.label}</p>
        <h2 className="mt-3 text-4xl font-bold">{content.heading}</h2>
        <p className="mt-5 leading-relaxed text-base-content/75">
          {content.paragraph}
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {content.items.map((item) => (
          <article key={item.title} className="overflow-hidden rounded-[1.5rem] border border-base-300 bg-base-200/40 shadow-sm">
            {item.image ? (
              <div className="aspect-[4/3] overflow-hidden bg-base-200">
                <img src={item.image} alt={item.alt || item.title} className="h-full w-full object-cover object-top" />
              </div>
            ) : null}
            <div className="p-6">
              <h3 className="text-xl font-semibold leading-tight">{item.title}</h3>
              <p className="mt-4 leading-relaxed text-base-content/72">{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FiveStarHostRedesign() {
  return (
    <main>
      <ProjectHero title={hero.title} image={hero.image} />

      <section id="findings" className="bg-base-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">{findings.label}</p>
            <h2 className="mt-3 text-4xl font-bold">{findings.heading}</h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {findings.items.map((item) => (
              <ResearchInsightCard key={item.eyebrow} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="max-w-6xl mx-auto px-6">
          {redesignSteps.map((step) => (
            step.number === '2' ? (
              <div key={step.number}>
                <TextRichStepImageFocused {...step} />
                <WireframingContributionSection content={wireframingContribution} />
              </div>
            ) : step.number === '3' ? (
              <TextRichStepImageFocusedExpandable key={step.number} {...step} />
            ) : (
              <TextRichStepImageFocused key={step.number} {...step} />
            )
          ))}
        </div>
      </section>
    </main>
  );
}

export default FiveStarHostRedesign;
