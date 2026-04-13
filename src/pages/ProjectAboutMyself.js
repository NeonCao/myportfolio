import ProjectHero from '../components/ProjectHero';
import SectionDivider from '../components/SectionDivider';
import TextRichStepTextFocused from '../components/TextRichStepTextFocused';
import ResearchInsightCard from '../components/ResearchInsightCard';

import heroImage from '../assets/images/project-about-myself/IMG_1744.JPG';
import programmingScene from '../assets/images/project-about-myself/P1_Game.jpg';
import cookingScene from '../assets/images/project-about-myself/P2_Cooking.jpg';
import gamingScene from '../assets/images/project-about-myself/P3_Gaming.jpg';
import watchImage from '../assets/images/project-about-myself/P4_Watch.jpg';
import sketch1 from '../assets/images/project-about-myself/P5_Scretch1.png';
import sketch2 from '../assets/images/project-about-myself/P6_Scretch2.png';
import build1 from '../assets/images/project-about-myself/P7.png';
import build2 from '../assets/images/project-about-myself/P8.png';
import build3 from '../assets/images/project-about-myself/P9.png';
import build4 from '../assets/images/project-about-myself/P10.png';
import build5 from '../assets/images/project-about-myself/P11.png';
import build6 from '../assets/images/project-about-myself/P12.png';
import build7 from '../assets/images/project-about-myself/P13.png';
import finalImage from '../assets/images/project-about-myself/P14.png';
import flawMotor from '../assets/images/project-about-myself/P15_icon.png';
import flawFriction from '../assets/images/project-about-myself/P16_icon.png';
import flawLighting from '../assets/images/project-about-myself/P17_icon.png';
import flawPolish from '../assets/images/project-about-myself/P18_icon.png';

const snapshotStats = [
  {
    label: 'Type',
    value: 'Course',
    description: 'A coursework project about expressing personal identity through physical computing.',
  },
  {
    label: 'Themes',
    value: '3',
    description: 'Cooking, gaming, and programming were translated into separate mechanical scenes.',
  },
  {
    label: 'Medium',
    value: 'Kinetic',
    description: 'A planetary-gear-inspired physical build with sound, motion, and planned lighting.',
  },
  {
    label: 'Focus',
    value: 'Story',
    description: 'The project explored how motion and mechanics could tell a personal story.',
  },
];

const passionCards = [
  {
    title: 'Programming',
    summary:
      'Cooler tones and rhythmic electronic sound were meant to express focus, flow, and the logic-heavy side of my personality.',
    image: programmingScene,
    alt: 'Programming scene concept',
    eyebrow: 'Scene',
    accent: 'primary',
  },
  {
    title: 'Cooking',
    summary:
      'Warm lighting and softer sensory cues represented comfort, making, and the more tactile creative part of my daily life.',
    image: cookingScene,
    alt: 'Cooking scene concept',
    eyebrow: 'Scene',
    accent: 'secondary',
  },
  {
    title: 'Gaming',
    summary:
      'Bolder color and arcade-inspired energy were used to capture play, excitement, and a more neon-driven visual mood.',
    image: gamingScene,
    alt: 'Gaming scene concept',
    eyebrow: 'Scene',
    accent: 'accent',
  },
];

const buildSteps = [
  {
    number: 1,
    title: 'Define the self-portrait through scenes instead of literal biography',
    intro:
      'The project started by asking how “about myself” could be expressed through atmosphere and interaction rather than a direct list of facts. I focused on three passions that shape my life most clearly: cooking, gaming, and programming.',
    sections: [
      {
        heading: 'Why scenes worked better',
        body:
          'Instead of treating each hobby as a label, I wanted each one to feel like a small animated world. That gave the project a more emotional tone and made it possible to use light, sound, and motion as storytelling tools.',
      },
      {
        heading: 'How each hobby was translated',
        body:
          'Cooking used warmer light and calmer cues. Gaming leaned more neon and energetic. Programming was represented through cooler colors and more rhythmic electronic sound. Together they formed a dynamic portrait instead of a static introduction.',
      },
    ],
    images: [
      { src: programmingScene, caption: 'Programming scene concept' },
      { src: cookingScene, caption: 'Cooking scene concept' },
      { src: gamingScene, caption: 'Gaming scene concept' },
    ],
  },
  {
    number: 2,
    title: 'Choose a display form that also says something about me',
    intro:
      'An early concept used a large rotating wheel divided into three parts, but it quickly felt too bulky and too literal. Because I enjoy mechanical systems and technical elegance, the project shifted toward a planetary gearset-inspired structure.',
    sections: [
      {
        heading: 'Why the gearset mattered',
        body:
          'The mechanism solved more than just space. It also reflected part of my identity: curiosity about engineering, motion, and systems that feel precise and a little intricate.',
      },
      {
        heading: 'What the new form added',
        body:
          'Moving from a simple spinning wheel to a planetary arrangement made the project feel more compact, more technically expressive, and more aligned with the balance of creativity and logic that the piece was trying to communicate.',
      },
    ],
    images: [
      { src: watchImage, caption: 'Mechanical watch reference using planetary gearing' },
    ],
    imageLeft: true,
  },
  {
    number: 3,
    title: 'Turn the mechanism into a storytelling system',
    intro:
      'The final plan centered on a motor driving a large gear that would move three smaller gears along an outer rail. Each smaller gear carried a hobby scene, so the act of rotation became the transition between identities.',
    sections: [
      {
        heading: 'How the motion supported the concept',
        body:
          'The goal was for movement itself to become part of the story. The gears would not just rotate as machinery; they would reveal one scene after another, making the transitions feel continuous and theatrical.',
      },
      {
        heading: 'Supporting cues',
        body:
          'Sound and planned lighting were meant to deepen the separation between scenes so each hobby felt distinct even while living inside one shared mechanical structure.',
      },
    ],
    images: [
      { src: sketch1, caption: 'Early structure sketch' },
      { src: sketch2, caption: 'Expanded concept sketch' },
    ],
  },
  {
    number: 4,
    title: 'Build, test, adapt, and keep the concept alive through constraints',
    intro:
      'The build phase revealed where the concept and the physical reality diverged. Cutting gears, assembling the base, and adding 3D-printed reciprocating mechanisms brought the structure to life, but friction, motor limitations, and coding issues forced several compromises.',
    sections: [
      {
        heading: 'Mechanical challenge',
        body:
          'The wooden base was too rough, producing far more friction than expected. Even after adding vinyl and lubrication, the system still required high-speed operation to move, which undercut the original plan for slower and more dramatic reveals.',
      },
      {
        heading: 'Control challenge',
        body:
          'The continuous motor could not stop accurately at scene positions, so the transitions became less intentional than planned. Lighting integration also failed due to coding issues, which weakened the visual storytelling layer.',
      },
      {
        heading: 'What still worked',
        body:
          'Even with these constraints, the project still delivered motion and audio behavior. I programmed two music modes based on clockwise versus counterclockwise movement and added a switch to mute sound when needed, which helped preserve the idea’s interactive core.',
      },
    ],
    images: [
      { src: finalImage, caption: 'Final result' },
    ],
    imageLeft: true,
  },
];

const flawCards = [
  {
    title: 'Excessive friction on the wooden base',
    image: flawFriction,
    body:
      'The rough wooden surface added too much resistance, forcing the motor to work harder and making slow, smooth motion unrealistic.',
    improvement:
      'Acrylic, smoother plywood, aluminum, or low-friction bearings would make the movement more reliable and closer to the intended pacing.',
  },
  {
    title: 'Continuous motor without precise stopping',
    image: flawMotor,
    body:
      'Because the motor only supported continuous spinning, the system could not pause exactly at each scene the way the concept required.',
    improvement:
      'A stepper or servo motor would allow deliberate scene positioning and much stronger control over transitions.',
  },
  {
    title: 'Lighting integration never fully landed',
    image: flawLighting,
    body:
      'Coding issues prevented the LED layer from being integrated, which reduced the contrast and emotional identity of the three scenes.',
    improvement:
      'Breaking the firmware into smaller debug steps or isolating lighting control into a simpler subsystem would make the effects easier to implement and test.',
  },
  {
    title: 'Mechanics outweighed finish and polish',
    image: flawPolish,
    body:
      'The project invested heavily in the mechanical system, which left the visual storytelling and finish quality less refined than the concept deserved.',
    improvement:
      'More time on enclosure, material finish, and scene-specific styling would make the final piece feel both technically strong and emotionally complete.',
  },
];

const buildGallery = [
  { src: build1, caption: 'Reciprocating mechanism pair' },
  { src: build2, caption: '3D print models during assembly' },
  { src: build3, caption: 'Intermediate prototype view' },
  { src: build4, caption: 'Mechanism detail' },
  { src: build5, caption: 'Integrated structure test' },
  { src: build6, caption: 'Additional motion component' },
  { src: build7, caption: 'Assembly refinement stage' },
  { src: finalImage, caption: 'Final result' },
];

function ProjectAboutMyself() {
  return (
    <div className="min-h-screen bg-base-200">
      <ProjectHero title="Project About Myself" image={heroImage} />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <div>
            <div className="badge badge-primary badge-outline mb-4">Course Project</div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Building a kinetic self-portrait through sound, scenes, and planetary motion
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-base-content/75">
              This project explored how a personal introduction could be expressed through physical computing
              instead of a conventional presentation. Rather than describing myself directly, I built a moving
              mechanism that cycled through scenes representing my core interests.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              Cooking, gaming, and programming became the narrative backbone. A planetary-gear-inspired system,
              sound behavior, and planned lighting turned those interests into a more performative and
              mechanical portrait.
            </p>
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
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Core Themes</p>
            <h2 className="mt-3 text-4xl font-bold">Three passions translated into three moving worlds</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              The piece was designed around the overlap between creativity, play, and logic. Each hobby became
              its own scene with a distinct sensory tone, allowing the final build to say something personal
              without relying on literal biography.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {passionCards.map((card) => (
              <ResearchInsightCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider label="Build Process" />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-16">
        {buildSteps.map((step) => (
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
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Prototype Gallery</p>
            <h2 className="mt-3 text-4xl font-bold">Mechanical iterations and build artifacts</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              A large part of the project was learning through physical iteration: sketching, printing parts,
              testing mechanisms, and adapting the structure around the limitations of the build.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {buildGallery.map((item) => (
              <figure
                key={item.src}
                className="overflow-hidden rounded-[1.5rem] border border-base-300 bg-base-200 shadow-lg"
              >
                <img src={item.src} alt={item.caption} className="aspect-[4/3] w-full object-cover" />
                <figcaption className="px-4 py-3 text-sm text-base-content/65">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-4xl font-bold">Demo Video</h2>
        <div className="relative mt-8 w-full overflow-hidden rounded-[2rem] shadow-2xl" style={{ paddingTop: '56.25%' }}>
          <iframe
            src="https://www.youtube.com/embed/q6cm-D7tKVw?rel=0&controls=1"
            title="Project About Myself Demo"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider label="Major Flaws" />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {flawCards.map((flaw) => (
            <article key={flaw.title} className="rounded-[1.75rem] border border-base-300 bg-base-100 p-6 shadow-xl">
              <div className="aspect-[3/2] overflow-hidden rounded-[1.25rem] bg-base-200">
                <img src={flaw.image} alt={flaw.title} className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-5 text-xl font-semibold leading-tight">{flaw.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-base-content/72">
                <strong>Flaw:</strong> {flaw.body}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-base-content/72">
                <strong>Improvement:</strong> {flaw.improvement}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
          <div className="rounded-[2.25rem] border border-base-300 bg-gradient-to-br from-base-100 via-base-200 to-base-100 p-8 shadow-2xl md:p-12">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Reflection</p>
            <h2 className="mt-3 text-4xl font-bold">What the project taught me</h2>
            <p className="mt-6 leading-relaxed text-base-content/75">
              The strongest lesson from this project was that technical complexity does not automatically create
              a strong experience. I became deeply invested in the planetary gear mechanism, but the more time
              I spent on mechanical sophistication, the more I saw how easy it was to neglect finish, clarity,
              and emotional expression.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              Looking back, the project worked best when the mechanism supported the story rather than becoming
              the story. If I were to revisit it, I would keep the technical ambition but put more emphasis on
              polish, scene identity, and the overall sense of completeness.
            </p>
          </div>

          <div className="rounded-[2rem] border border-base-300 bg-base-200 p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Code</p>
            <h2 className="mt-3 text-3xl font-bold">Project source link</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              The code for the project lives in the coursework repository and documents the logic used to drive
              the interaction behavior.
            </p>
            <a
              href="https://github.com/NeonCao/CIM_683/blob/main/assignment1_code.py"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary mt-8"
            >
              View GitHub Code
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProjectAboutMyself;
