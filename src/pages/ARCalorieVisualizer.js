import ProjectHero from '../components/ProjectHero';
import SectionDivider from '../components/SectionDivider';
import ResearchInsightCard from '../components/ResearchInsightCard';
import ProblemSolutionCard from '../components/ProblemSolutionCard';

import heroImage from '../assets/images/ar-calorie-visualizer/Calories_Hero.png';
import sceneImage from '../assets/images/ar-calorie-visualizer/scene.jpg';
import futureTrackingImage from '../assets/images/ar-calorie-visualizer/future-tracking.webp';
import futureNutritionImage from '../assets/images/ar-calorie-visualizer/future-nutrition.webp';

const snapshotStats = [
  {
    label: 'Platform',
    value: 'Unity + AR',
    description: 'A mobile AR prototype built around OCR, image targets, and physics-based 3D feedback.',
  },
  {
    label: 'Input',
    value: 'OCR',
    description: 'Calorie values are read from nutrition labels instead of relying only on pre-authored data.',
  },
  {
    label: 'Visual Scale',
    value: '160 / 7',
    description: 'One chip bag stands for 160 calories, while single chips cover the smaller remainder.',
  },
  {
    label: 'Core Metaphor',
    value: 'Chips',
    description: 'Calories become something physical and funny enough to remember at a glance.',
  },
];

const featureCards = [
  {
    title: 'Marker-based AR anchoring',
    text:
      'Vuforia image targets keep the calorie visualization attached to the physical package, so the feedback appears exactly where the nutrition label already lives.',
  },
  {
    title: 'Readable calorie scaling',
    text:
      'Large calorie values are shown with chip bags and smaller amounts with loose chips, which keeps the scene understandable without overwhelming the user with hundreds of repeated objects.',
  },
  {
    title: 'OCR-assisted detection',
    text:
      'Instead of hardcoding every label, the project extracts calorie numbers from camera captures so the experience can respond to more than one predefined package.',
  },
  {
    title: 'Physics-aware placement',
    text:
      'Spawned chips use local gravity aligned to the detected marker, making the pile feel grounded to the real label even when the package is tilted.',
  },
];

const challengeCards = [
  {
    title: 'OCR packages did not fit cleanly inside Unity',
    problem:
      'The calorie-reading workflow depended on Python OCR tooling that could not simply be dropped into the Unity runtime.',
    solution:
      'The app sends a captured image to a local Python server, which performs OCR and returns the calorie value back to Unity for visualization.',
    accent: 'primary',
  },
  {
    title: 'Default world gravity broke the AR illusion',
    problem:
      'Unity gravity always points down the world Y-axis, so chips would fall in the wrong direction whenever the nutrition label was angled in the camera view.',
    solution:
      'A custom ChipGravity script reoriented gravity using the marker surface so the chip pile falls perpendicular to the scanned package instead of the global scene.',
    accent: 'secondary',
  },
  {
    title: 'Repeated scans created endless visual clutter',
    problem:
      'Each new scan could keep adding more bags and chips, quickly making the scene unreadable and heavier to render.',
    solution:
      'A cleanup routine destroys previously spawned objects before the next visualization is generated, keeping the feedback focused and performant.',
    accent: 'accent',
  },
  {
    title: 'Large calorie numbers stopped being intuitive',
    problem:
      'A one-object-per-calorie approach becomes absurd almost immediately, which makes the metaphor collapse for higher-calorie snacks.',
    solution:
      'The display was changed to a tiered system: one bag per 160 calories and one chip per 7 remaining calories, preserving the joke without losing readability.',
    accent: 'primary',
  },
  {
    title: 'Suitable chip assets were not readily available',
    problem:
      'The Unity Asset Store did not provide a ready-made set of potato chips and chip bag models that matched the concept.',
    solution:
      '3D assets were sourced from Sketchfab, then cleaned up, rematerialed, and turned into prefabs that could be spawned repeatedly in the AR scene.',
    accent: 'secondary',
  },
];

const futureCards = [
  {
    title: 'Upgrade the tracking stack',
    summary:
      'A future version could move beyond Vuforia toward ARKit, ARCore, or Unity MARS for stronger image tracking, better stability, and more flexible spatial behavior.',
    image: futureTrackingImage,
    alt: 'Concept image for improved AR tracking',
    eyebrow: 'Next Step',
    accent: 'primary',
  },
  {
    title: 'Read more than just calories',
    summary:
      'The same pipeline could expand to sodium, carbohydrates, fat, or protein, turning the joke into a fuller nutrition explainer instead of a single-number visualization.',
    image: futureNutritionImage,
    alt: 'Concept image for expanded nutrition recognition',
    eyebrow: 'Expansion',
    accent: 'secondary',
  },
];

function ARCalorieVisualizer() {
  return (
    <div className="min-h-screen bg-base-200">
      <ProjectHero title="AR Calorie Visualizer" image={heroImage} />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <div>
            <div className="badge badge-primary badge-outline mb-4">AR + OCR Food Concept</div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Turning calorie labels into something people can actually picture
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-base-content/75">
              AR Calorie Visualizer is an augmented reality experiment that makes nutrition labels feel less
              abstract. Once the app reads a calorie value from packaging, it translates that number into a
              pile of chip bags and loose chips directly on top of the product in AR.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              The goal was not nutritional precision for its own sake. It was to test whether a playful,
              physical metaphor could help people understand calorie quantity faster than a plain number on a
              label. Humor became part of the UX strategy: if the visualization makes you pause, it has already
              done useful work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://www.youtube.com/watch?v=SdJvrvjzPL4"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                Watch Demo
              </a>
              <a href="#engineering-hurdles" className="btn btn-outline">
                Jump to Challenges
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Project Snapshot</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {snapshotStats.map((stat) => (
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
                src={sceneImage}
                alt="AR Calorie Visualizer showing a calorie scene anchored over a label"
                className="w-full object-cover"
              />
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Why This Exists</p>
              <h2 className="mt-3 text-4xl font-bold">Calories are easy to read and still hard to feel</h2>
              <p className="mt-5 leading-relaxed text-base-content/75">
                Most people can read a nutrition label, but that does not mean they can quickly interpret what
                the number means in real terms. A value like 240 calories is technically informative while still
                being psychologically slippery.
              </p>
              <p className="mt-4 leading-relaxed text-base-content/75">
                This project reframed the problem as a translation task. Instead of showing the number again in a
                fancier UI, the app converts the number into a deliberately tangible visual pile. The result is
                lighter in tone, but stronger in memorability.
              </p>

              <div className="mt-8 rounded-[1.5rem] border border-base-300 bg-base-200 p-5 shadow-lg">
                <p className="text-xs uppercase tracking-[0.3em] text-base-content/45">Target Audience</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <span className="badge badge-outline h-auto px-4 py-3">General consumers</span>
                  <span className="badge badge-outline h-auto px-4 py-3">Health-conscious users</span>
                  <span className="badge badge-outline h-auto px-4 py-3">People who learn better visually</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider label="Core Features" />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {featureCards.map((feature) => (
            <article
              key={feature.title}
              className="card border border-base-300 bg-base-100 shadow-xl transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="card-body">
                <div className="badge badge-outline badge-secondary">Feature</div>
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
              <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Why AR Fits</p>
              <h2 className="mt-3 text-4xl font-bold">The medium matters as much as the metaphor</h2>
              <p className="mt-5 leading-relaxed text-base-content/75">
                This concept works because the visualization appears on the actual product instead of in a
                detached dashboard. A regular nutrition app could show a number, and a chart could show scale,
                but AR makes the explanation inhabit the exact package that triggered the question.
              </p>
              <p className="mt-4 leading-relaxed text-base-content/75">
                That makes the experience less about spectacle and more about context. The user does not need to
                mentally map one screen to another. The label, the product, and the explanation occupy the same
                space, which keeps the interaction immediate.
              </p>
            </div>

            <div className="stats stats-vertical bg-base-200 shadow-xl">
              <div className="stat">
                <div className="stat-title">Anchoring</div>
                <div className="stat-value text-primary">Label</div>
                <div className="stat-desc">Visualization is attached to the real package</div>
              </div>
              <div className="stat">
                <div className="stat-title">Translation</div>
                <div className="stat-value">Number to Object</div>
                <div className="stat-desc">Calories become countable physical stand-ins</div>
              </div>
              <div className="stat">
                <div className="stat-title">Tone</div>
                <div className="stat-value text-secondary">Playful</div>
                <div className="stat-desc">Humor lowers friction without removing the message</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider label="Engineering Hurdles" />
      </div>

      <section id="engineering-hurdles" className="mx-auto max-w-6xl px-6 py-12">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold">What had to be solved to make the joke believable</h2>
          <p className="mt-5 leading-relaxed text-base-content/75">
            The concept is playful, but the implementation had several technical constraints underneath it.
            Reading labels, orienting physics correctly in AR, and keeping the scene understandable all required
            deliberate tradeoffs and small custom systems.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {challengeCards.map((card) => (
            <ProblemSolutionCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Demo</p>
              <h2 className="mt-3 text-4xl font-bold">See the AR visualization in action</h2>
            </div>
            <a
              href="https://www.youtube.com/watch?v=SdJvrvjzPL4"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              Open on YouTube
            </a>
          </div>

          <div className="relative mt-8 w-full overflow-hidden rounded-[2rem] shadow-2xl" style={{ paddingTop: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/SdJvrvjzPL4?rel=0&controls=1"
              title="AR Calorie Visualizer Demo Video"
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
          <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Further Development</p>
          <h2 className="mt-3 text-4xl font-bold">Where the concept could grow next</h2>
          <p className="mt-5 leading-relaxed text-base-content/75">
            The first version proves the communication idea. A next version could make the tracking sturdier,
            widen the nutrition pipeline, and turn the project from a clever prototype into a more robust food
            literacy tool.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {futureCards.map((card) => (
            <ResearchInsightCard key={card.title} {...card} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ARCalorieVisualizer;
