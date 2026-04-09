import ProjectHero from '../components/ProjectHero';
import BuildStep from '../components/BuildStep';
import SectionDivider from '../components/SectionDivider';

import heroImage from '../assets/images/stellar-life-cycle/Stellar_Hero.jpeg';
import introImage2 from '../assets/images/stellar-life-cycle/Stellar_Intro_P2.jpeg';
import introImage3 from '../assets/images/stellar-life-cycle/Stellar_Intro_P3.jpeg';
import dataSourceImage from '../assets/images/stellar-life-cycle/Stellar_DataSource_P1.png';
import graphChoice1 from '../assets/images/stellar-life-cycle/Stellar_ChoiceOfGraphs_P1.jpeg';
import graphChoice2 from '../assets/images/stellar-life-cycle/Stellar_ChoiceOfGraphs_P2.jpeg';
import graphChoice3 from '../assets/images/stellar-life-cycle/Stellar_ChoiceOfGraphs_P3.jpeg';
import version1 from '../assets/images/stellar-life-cycle/Stellar_VersionHistory_P1.jpeg';
import version2 from '../assets/images/stellar-life-cycle/Stellar_VersionHistory_P2.jpeg';
import version3 from '../assets/images/stellar-life-cycle/Stellar_VersionHistory_P3.jpeg';
import version4 from '../assets/images/stellar-life-cycle/Stellar_VersionHistory_P4.jpeg';
import reflectionImage from '../assets/images/stellar-life-cycle/Stellar_Reflection_P1.jpeg';

const sources = [
  'Wikipedia for general astronomical information',
  'NASA for scientific reference material and imagery',
  'Universe Today for current astronomy explainers and context',
  'National Geographic for visual inspiration and editorial tone',
];

const graphChoices = [
  {
    number: 1,
    title: 'Hertzsprung-Russell Diagram',
    text: `The H-R diagram became the project’s anchor because it directly visualizes the relationship between stellar luminosity and temperature. It makes stellar evolution easier to understand by revealing large-scale patterns such as the main sequence, giant branch, and white dwarf sequence.\n\nThat structure helped translate astronomy into something readers could scan visually instead of only reading as text.`,
    image: graphChoice1,
  },
  {
    number: 2,
    title: 'Stellar Evolution Step Chart',
    text: `A step chart worked well for showing the sequential nature of stellar evolution. Breaking the process into clear stages — nebula, protostar, main sequence, red giant, and stellar remnant — made the lifecycle easier to follow.\n\nEven though each star’s exact path depends on mass and other factors, the step format communicates the broad story cleanly.`,
    image: graphChoice2,
  },
  {
    number: 3,
    title: 'Stellar Classification Chart',
    text: `A structured chart was the best fit for comparing spectral classes, temperature ranges, colors, and examples of well-known stars. Unlike a more decorative graphic, this format made it easy to organize mixed kinds of information without losing clarity.\n\nIt also gave the project a practical reference layer to complement the more narrative diagrams.`,
    image: graphChoice3,
  },
];

const versions = [
  {
    number: '01',
    title: 'Version 1',
    text: 'The earliest version centered on getting the H-R diagram in place and establishing an academic editorial tone inspired by The Economist. It built the core foundation, but still felt more formal than immersive.',
    image: version1,
  },
  {
    number: '02',
    title: 'Version 2',
    text: 'This iteration shifted away from the earlier newspaper-like tone and moved closer to a National Geographic-inspired style, with stronger visuals, better image use, and improved reading flow in the first half of the page.',
    image: version2,
  },
  {
    number: '03',
    title: 'Version 3',
    text: 'By version three, all three main visual systems were present: the H-R diagram, the stellar evolution step chart, and the classification chart. The content became more complete, even though it still needed richer context and supporting detail.',
    image: version3,
  },
  {
    number: '04',
    title: 'Version 4',
    text: 'The final version filled in earlier gaps with detailed star annotations, more polished text placement, and better contextual writing around each visualization. This is where the project started to feel cohesive as both an article and a visual system.',
    image: version4,
  },
];

function StellarLifeCycle() {
  return (
    <div className="min-h-screen bg-base-200">
      <ProjectHero
        title="The Stellar Life Cycle: A Cosmic Journey Through Data"
        image={heroImage}
      />

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)] items-start">
          <div>
            <div className="badge badge-primary badge-outline mb-4">Making-of Article</div>
            <h1 className="text-4xl font-bold md:text-5xl">
              Turning astronomical fascination into an editorial data story
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-base-content/75">
              This project grew out of a fascination with the cosmos and the way star systems are represented in
              games like Elite Dangerous. That curiosity led to a data visualization piece focused on stellar
              evolution, combining astronomy, editorial storytelling, and visual design.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              The final work centers on three main visualization systems: a Hertzsprung-Russell diagram, a step
              chart showing the lifecycle of stars, and a classification chart summarizing the major spectral
              classes. Together they make a dense topic more approachable and visually memorable.
            </p>
          </div>

          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Project Focus</p>
              <div className="stats stats-vertical bg-base-200 shadow">
                <div className="stat">
                  <div className="stat-title">Core Visualizations</div>
                  <div className="stat-value text-primary">3</div>
                  <div className="stat-desc">H-R diagram, lifecycle chart, and classification chart</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Subject</div>
                  <div className="stat-value text-secondary">Stars</div>
                  <div className="stat-desc">Stellar evolution, classification, and astronomy context</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Format</div>
                  <div className="stat-value">Editorial</div>
                  <div className="stat-desc">A data story designed to be informative and enjoyable to read</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="max-w-6xl mx-auto px-6 py-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <h2 className="text-3xl font-bold">Intro</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              The project began with a simple question: how could the beauty and complexity of stellar evolution
              be translated into something more readable and engaging than a dense textbook explanation?
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              To answer that, the piece focused on a few carefully chosen slices of the subject rather than
              trying to explain the entire universe at once. That narrowing made it possible to combine factual
              accuracy with a more immersive and visually rich editorial tone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3 overflow-hidden rounded-[1.5rem] shadow-xl">
              <img src={heroImage} alt="Elite Dangerous star chart inspiration" className="w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-[1.25rem] shadow-lg">
              <img src={introImage2} alt="Stellar intro supporting visual 1" className="w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-[1.25rem] shadow-lg">
              <img src={introImage3} alt="Stellar intro supporting visual 2" className="w-full object-cover" />
            </div>
            <div className="flex items-center justify-center rounded-[1.25rem] bg-base-200 p-4 text-sm text-center text-base-content/60">
              In-game cosmic visuals helped spark the project’s original direction.
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-center">
          <div className="overflow-hidden rounded-[2rem] shadow-2xl">
            <img src={dataSourceImage} alt="Stellar data sources" className="w-full object-cover" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Data Sources</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              Accuracy mattered, so the article pulled from multiple reference sources and then reworked the raw
              material into a more cohesive visual narrative. The goal was not just to collect information, but
              to redesign it into something easier to read and more visually compelling.
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-base-content/75">
              {sources.map((source) => (
                <li key={source}>{source}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <SectionDivider label="Graph Choices" />
      </div>

      <section className="max-w-6xl mx-auto px-6 py-16">
        {graphChoices.map((choice, index) => (
          <BuildStep
            key={choice.number}
            number={choice.number}
            title={choice.title}
            text={choice.text}
            images={[{ src: choice.image, caption: choice.title }]}
            imageLeft={index % 2 === 1}
          />
        ))}
      </section>

      <section className="bg-base-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold mb-8">Version History</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            {versions.map((version) => (
              <article key={version.number} className="card bg-base-200 shadow-xl overflow-hidden">
                <figure>
                  <img src={version.image} alt={version.title} className="w-full object-cover" />
                </figure>
                <div className="card-body">
                  <p className="text-sm uppercase tracking-[0.3em] text-base-content/50">{version.number}</p>
                  <h3 className="card-title text-2xl">{version.title}</h3>
                  <p className="text-base-content/75 leading-relaxed">{version.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] items-center">
          <div>
            <h2 className="text-3xl font-bold">Reflection & What I Learnt</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              One of the biggest lessons from this project was the importance of balancing factual depth with
              readability. Complex topics do not automatically become understandable just because the data is
              accurate; they need structure, context, and visual pacing.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              The project also reinforced how much chart selection shapes understanding. Instead of defaulting to
              generic chart types, the work became stronger by choosing formats that better matched the story of
              stellar evolution and the relationships between star properties.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              Overall, this was a valuable exercise in combining data, illustration, layout, and editorial voice
              into one coherent piece. It pushed the work beyond a simple visualization exercise and closer to a
              designed reading experience.
            </p>
          </div>
          <div className="overflow-hidden rounded-[2rem] shadow-2xl">
            <img src={reflectionImage} alt="Stellar reflection layout" className="w-full object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default StellarLifeCycle;
