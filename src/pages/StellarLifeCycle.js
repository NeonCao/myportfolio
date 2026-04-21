import ProjectHero from '../components/ProjectHero';
import SectionDivider from '../components/SectionDivider';
import TextRichStep from '../components/TextRichStep';

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

const processSteps = [
  {
    number: 1,
    title: 'Define The Scope And Gather Source Material',
    intro:
      'The project started with a broad fascination for astronomy, but the real design work began by narrowing that interest into a manageable editorial story. Instead of trying to explain all of astronomy, the article focused on stellar evolution and a few specific visual systems that could carry the narrative.',
    sections: [
      {
        heading: 'Why narrowing the topic mattered',
        body:
          'The subject was too large to be useful if treated as one giant information dump. Focusing on the H-R diagram, the lifecycle sequence, and stellar classification created a tighter story and made the eventual layouts more readable.',
      },
      {
        heading: 'How references were used',
        body:
          'The raw material came from a mix of scientific and editorial sources, then got redesigned into a more cohesive visual language. The process was not just collecting facts, but translating them into something that felt curated and understandable.',
      },
    ],
    bullets: sources,
    images: [
      { src: dataSourceImage, caption: 'Research references and early source gathering' },
    ],
  },
  {
    number: 2,
    title: 'Choose Visual Forms That Match The Story',
    intro:
      'Once the scope was clear, the next challenge was choosing visualization types that actually fit the material. This was less about decoration and more about making each idea legible through the right format.',
    sections: [
      {
        heading: 'H-R diagram',
        body:
          'The H-R diagram became the anchor because it naturally shows relationships between luminosity and temperature. It gave the project a scientifically grounded centerpiece and made stellar evolution easier to interpret visually.',
      },
      {
        heading: 'Step chart',
        body:
          'The lifecycle chart worked because stellar evolution is sequential. A step-based format gave the article a clear narrative spine and helped readers follow the transition from nebula to stellar remnant.',
      },
      {
        heading: 'Classification table',
        body:
          'The classification chart was the most reference-oriented of the three. It provided a structured place for spectral classes, temperatures, colors, and examples, balancing the more expressive diagrams with something concrete.',
      },
    ],
    images: [
      { src: graphChoice1, caption: 'Hertzsprung-Russell diagram direction' },
      { src: graphChoice2, caption: 'Lifecycle step chart direction' },
      { src: graphChoice3, caption: 'Classification chart direction' },
    ],
  },
  {
    number: 3,
    title: 'Iterate The Editorial Voice And Composition',
    intro:
      'A major part of the build process was not technical at all. It was editorial. The project changed tone, density, and image strategy several times before the final direction felt right.',
    sections: [
      {
        heading: 'Version 1 to Version 2',
        body:
          'The first version leaned more academic and newspaper-like. That was useful for structure, but it felt dry. The second version pivoted toward a more immersive, image-rich direction inspired by National Geographic, which made the story feel more alive.',
      },
      {
        heading: 'Version 3',
        body:
          'By the third version, all three core visualizations were in place. The project was finally structurally complete, but it still needed stronger explanatory context and more polish in how the text and visuals supported each other.',
      },
      {
        heading: 'Version 4',
        body:
          'The final version filled in empty spaces with star-specific details, improved text arrangement, and added more interpretation around each chart. That was the step that made the whole piece feel complete rather than just assembled.',
      },
    ],
    images: [
      { src: version1, caption: 'Version 1' },
      { src: version2, caption: 'Version 2' },
      { src: version3, caption: 'Version 3' },
      { src: version4, caption: 'Version 4' },
    ],
    imageLeft: true,
  },
  {
    number: 4,
    title: 'Reflect On What The Process Taught',
    intro:
      'The project reinforced that a strong visualization piece is not only about accuracy. It is also about pacing, hierarchy, and deciding how much context a reader needs at each moment.',
    sections: [
      {
        heading: 'Balancing information with readability',
        body:
          'One of the core lessons was that dense information does not automatically become useful when placed on a page. It has to be edited, staged, and supported with enough explanation that the reader can stay oriented.',
      },
      {
        heading: 'Choosing the right chart for the right relationship',
        body:
          'Another important lesson was chart selection. The project became stronger by moving away from default chart types and instead choosing forms that matched the structure of the content: relational, sequential, or reference-based.',
      },
      {
        heading: 'Combining editorial and data design',
        body:
          'The final outcome sits somewhere between infographic, article, and visual essay. That blend was one of the most valuable parts of the process, because it pushed the work beyond isolated charts into a more complete reading experience.',
      },
    ],
    images: [
      { src: reflectionImage, caption: 'Final reflection and presentation spread' },
    ],
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
              Turning astronomical fascination into a built editorial data story
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-base-content/75">
              This project grew out of a fascination with the cosmos and the way star systems are represented in
              games like Elite Dangerous. That curiosity led to a data visualization piece focused on stellar
              evolution, combining astronomy, editorial storytelling, and visual design.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              This page now focuses more explicitly on the building process: how the topic was narrowed, how the
              visual systems were chosen, how the editorial direction changed across versions, and what that
              iteration taught along the way.
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
                  <div className="stat-title">Case Study Lens</div>
                  <div className="stat-value">Process</div>
                  <div className="stat-desc">Research, graph choice, iteration, and reflection</div>
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

      <div className="max-w-6xl mx-auto px-6">
        <SectionDivider label="Building Process" />
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
