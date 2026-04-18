import DemoVideo from '../components/DemoVideo';
import ProjectHero from '../components/ProjectHero';
import SectionDivider from '../components/SectionDivider';
import heroImage from '../assets/images/memory_garden/memory_garden_Hero.png';

const snapshotStats = [
  {
    label: 'Format',
    value: 'MR + AI',
    description: 'A mixed reality prototype designed around memory recall, voice storytelling, and gentle conversational interaction.',
  },
  {
    label: 'Platform',
    value: 'Unity + Meta SDK',
    description: 'Built in Unity for Meta Ray-Ban AI Display Glasses using the Meta SDK and the Valem sample UI as a prototype foundation.',
  },
  {
    label: 'Audience',
    value: 'Alzheimer’s Care',
    description: 'Designed for people living with Alzheimer’s, dementia, and memory loss through a reminiscence-focused interaction model.',
  },
  {
    label: 'Event',
    value: 'SensAI Hack 2025',
    description: 'Submitted as a hackathon prototype with a strong emphasis on ethical design and healthcare-adjacent storytelling.',
  },
];

const experienceCards = [
  {
    title: 'A garden made from family memories',
    text:
      'The experience imagines a calm mixed reality garden filled with 3D objects generated from family photos, turning memory recall into something spatial, gentle, and explorable.',
  },
  {
    title: '2D photos become interactive memory anchors',
    text:
      'When a user selects an object, the experience brings it closer, reveals the original 2D image, and uses that moment as the anchor for voice and AI-supported reminiscence.',
  },
  {
    title: 'Voices and AI continue the story',
    text:
      'Loved ones’ recorded stories give each memory emotional context, while the AI agent helps keep the conversation going with a soft, reflective tone instead of a task-heavy one.',
  },
];

const contributionCards = [
  {
    title: 'Backend and systems logic',
    text:
      'My main focus was the backend side of the prototype: the scripts, handling logic, and technical flow that connected interactions, memory objects, and the rest of the experience together.',
  },
  {
    title: '2D-to-3D generation pipeline',
    text:
      'I also worked on the system that transforms 2D memory images into 3D content, helping the project’s core idea feel real instead of staying as a flat photo-viewing concept.',
  },
  {
    title: 'Visual effects and scene polish',
    text:
      'Alongside the systems work, I contributed visual effects and implementation polish so the garden felt softer, more atmospheric, and more appropriate for the emotional tone of the project.',
  },
];

const challengeCards = [
  {
    title: 'MR integration was harder than expected',
    text:
      'According to the Devpost write-up, integrating the MR hardware and the sample UI took more effort than the team originally expected, especially under hackathon time pressure.',
  },
  {
    title: 'Interaction design had to stay delicate',
    text:
      'Micro-gesture interaction was not just a technical problem. It also needed to feel calm, readable, and low-friction for a user group that required extra care around comfort and clarity.',
  },
  {
    title: 'Ethics shaped the feature set',
    text:
      'The team framed safety and dignity as first-class concerns, which meant prioritizing emotional appropriateness and restraint over adding flashy XR features for their own sake.',
  },
];

const nextSteps = [
  'Test the experience on Meta Ray-Ban AI Display Glasses and other MR hardware to validate comfort, reliability, and accessibility.',
  'Collaborate with clinicians, caregivers, and advocacy groups to refine the flow and make the concept more grounded in real care contexts.',
  'Build privacy-conscious pipelines so families can safely upload photos, record stories, and manage sensitive memory data.',
];

function InsightCard({ title, text }) {
  return (
    <article className="card border border-base-300 bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title text-2xl">{title}</h3>
        <p className="leading-relaxed text-base-content/72">{text}</p>
      </div>
    </article>
  );
}

function MemoryGraden() {
  return (
    <div className="min-h-screen bg-base-200">
      <ProjectHero title="Memory Graden" image={heroImage} />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <div>
            <div className="badge badge-primary badge-outline mb-4">Mixed Reality + AI Care Concept</div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Re:Member turns family photos into a memory garden for people living with Alzheimer&apos;s
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-base-content/75">
              Memory Graden, presented on Devpost as <em>Re:Member: A Memory Garden for Alzheimer&apos;s</em>, is
              a mixed reality experience designed to help people with Alzheimer&apos;s, dementia, and memory loss
              reconnect with important moments from their lives. The core idea is simple but emotionally strong:
              instead of treating family photos like static archives, the project turns them into explorable 3D
              memory anchors inside a gentle virtual garden.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              The project draws on Reminiscence Therapy and Cognitive Stimulation Therapy, using familiar images,
              voices, and conversational prompts to support recall while keeping the overall interaction calm and
              human. That therapeutic framing is what makes the concept more than an XR demo. It is a design
              proposal for how immersive technology might support dignity, connection, and shared family memory.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://devpost.com/software/re-member-a-memory-garden-for-alzheimer-s"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                View Devpost
              </a>
              <a href="#my-role" className="btn btn-outline">
                See My Role
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
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Experience</p>
            <h2 className="mt-3 text-4xl font-bold">A calm interaction model built around memory, voice, and touch</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              On Devpost, the team describes a flow where the user enters a gentle garden of 3D objects generated
              from family photos, selects one, sees the original 2D image, hears a loved one&apos;s voice, and can
              continue the moment through an AI-supported reminiscence conversation. That sequence gives the project
              a strong emotional rhythm: object, photo, voice, memory, conversation.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {experienceCards.map((card) => (
              <InsightCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider label="My Contribution" />
      </div>

      <section id="my-role" className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">What I Focused On</p>
            <h2 className="mt-3 text-4xl font-bold">Backend implementation, visual effects, and 2D-to-3D memory generation</h2>
            <p className="mt-6 leading-relaxed text-base-content/75">
              In this project, my main focus was the backend and technical implementation side of the experience.
              I worked on the code and supporting systems that made the prototype function coherently, while also
              contributing visual effects work that helped the memory garden feel softer and more immersive.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              A particularly important part of my contribution was the system that generates 3D models from 2D
              images. That feature sits at the center of the whole concept, because the experience depends on family
              photographs becoming spatial memory objects instead of staying as flat media. I also supported the
              project&apos;s item handling, motion behavior, and interactive flow so the overall garden felt cohesive.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              The Devpost contribution note also describes my work on Unity-side interaction, animations, scripts,
              and scene implementation. My own read on that contribution is that I helped bridge the invisible
              technical layer and the visible emotional layer of the project at the same time.
            </p>
          </div>

          <div className="grid gap-5">
            {contributionCards.map((card) => (
              <InsightCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-8 text-3xl font-bold">Demo Video</h2>
          <DemoVideo
            label="Devpost Video"
            title="Memory Garden - Let your memories Bloom Again"
            embedUrl="https://www.youtube.com/embed/qveLRDvn6sY?rel=0&controls=1"
          />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider label="Build and Challenges" />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
          <div className="rounded-[2.25rem] border border-base-300 bg-base-100 p-8 shadow-2xl md:p-12">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">How It Was Built</p>
            <h2 className="mt-3 text-4xl font-bold">Unity, Meta SDK, AI, and custom 3D content</h2>
            <p className="mt-6 leading-relaxed text-base-content/75">
              The Devpost write-up explains that the team built Memory Garden in Unity, using the Meta SDK and the
              Valem Meta Ray-Ban Display Glasses sample UI as the prototype foundation for the Meta Ray-Ban AI
              Display Glasses. The experience also connected to the OpenAI API and used custom 3D assets refined
              through Autodesk Maya and Substance Painter.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              That technical stack matters because the project had to coordinate multiple layers at once:
              immersive interaction, AI support, visual storytelling, and emotionally sensitive content. Even in
              hackathon form, it was already trying to solve a multi-system problem rather than a single gimmick.
            </p>
          </div>

          <div className="grid gap-5">
            {challengeCards.map((card) => (
              <InsightCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
          <div className="rounded-[2.25rem] border border-base-300 bg-gradient-to-br from-base-100 via-base-200 to-base-100 p-8 shadow-2xl md:p-12">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Outcome and Reflection</p>
            <h2 className="mt-3 text-4xl font-bold">A prototype that treated care and ethics as part of the design brief</h2>
            <p className="mt-6 leading-relaxed text-base-content/75">
              The team describes the main accomplishment as building a working prototype that successfully brought
              the concept together. That is important, but what stands out even more is the project&apos;s tone. The
              Devpost story repeatedly returns to dignity, emotional care, and ethical restraint, which gave the
              prototype a seriousness that many hackathon XR projects never reach.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              The project also leaves a clear path forward: more hardware validation, collaboration with clinicians
              and caregivers, and safer pipelines for personal memory data. Those next steps suggest a concept that
              could grow well beyond hackathon scope if developed with the right partners.
            </p>
          </div>

          <div className="rounded-[2rem] border border-base-300 bg-base-200 p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">What&apos;s Next</p>
            <h2 className="mt-3 text-3xl font-bold">Future directions named on Devpost</h2>
            <div className="mt-6 space-y-4">
              {nextSteps.map((step) => (
                <div key={step} className="rounded-[1.25rem] bg-base-100 p-4 shadow-md">
                  <p className="leading-relaxed text-base-content/75">{step}</p>
                </div>
              ))}
            </div>
            <a
              href="https://devpost.com/software/re-member-a-memory-garden-for-alzheimer-s"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline mt-8"
            >
              Open Devpost Entry
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MemoryGraden;
