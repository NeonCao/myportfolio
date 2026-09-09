import heroImage from '../../assets/images/memory_garden/memory_garden_Hero.png';

const devpostUrl = 'https://devpost.com/software/re-member-a-memory-garden-for-alzheimer-s';

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

export const memoryGradenContent = {
  hero: {
    title: 'Memory Graden',
    image: heroImage,
  },
  overview: {
    badge: 'Mixed Reality + AI Care Concept',
    heading: 'Re:Member turns family photos into a memory garden for people living with Alzheimer’s',
    paragraph1: {
      before: 'Memory Graden, presented on Devpost as ',
      italic: 'Re:Member: A Memory Garden for Alzheimer’s',
      after:
        ', is a mixed reality experience designed to help people with Alzheimer’s, dementia, and memory loss reconnect with important moments from their lives. The core idea is simple but emotionally strong: instead of treating family photos like static archives, the project turns them into explorable 3D memory anchors inside a gentle virtual garden.',
    },
    paragraph2:
      'The project draws on Reminiscence Therapy and Cognitive Stimulation Therapy, using familiar images, voices, and conversational prompts to support recall while keeping the overall interaction calm and human. That therapeutic framing is what makes the concept more than an XR demo. It is a design proposal for how immersive technology might support dignity, connection, and shared family memory.',
    primaryCta: { label: 'View Devpost', href: devpostUrl },
    secondaryCta: { label: 'See My Role', href: '#my-role' },
    snapshotLabel: 'Project Snapshot',
    snapshotStats,
  },
  experience: {
    eyebrow: 'Experience',
    heading: 'A calm interaction model built around memory, voice, and touch',
    paragraph:
      'On Devpost, the team describes a flow where the user enters a gentle garden of 3D objects generated from family photos, selects one, sees the original 2D image, hears a loved one’s voice, and can continue the moment through an AI-supported reminiscence conversation. That sequence gives the project a strong emotional rhythm: object, photo, voice, memory, conversation.',
    cards: experienceCards,
  },
  contributionDividerLabel: 'My Contribution',
  myRole: {
    eyebrow: 'What I Focused On',
    heading: 'Backend implementation, visual effects, and 2D-to-3D memory generation',
    paragraphs: [
      'In this project, my main focus was the backend and technical implementation side of the experience. I worked on the code and supporting systems that made the prototype function coherently, while also contributing visual effects work that helped the memory garden feel softer and more immersive.',
      'A particularly important part of my contribution was the system that generates 3D models from 2D images. That feature sits at the center of the whole concept, because the experience depends on family photographs becoming spatial memory objects instead of staying as flat media. I also supported the project’s item handling, motion behavior, and interactive flow so the overall garden felt cohesive.',
      'The Devpost contribution note also describes my work on Unity-side interaction, animations, scripts, and scene implementation. My own read on that contribution is that I helped bridge the invisible technical layer and the visible emotional layer of the project at the same time.',
    ],
    cards: contributionCards,
  },
  demo: {
    heading: 'Demo Video',
    label: 'Devpost Video',
    title: 'Memory Garden - Let your memories Bloom Again',
    embedUrl: 'https://www.youtube.com/embed/qveLRDvn6sY?rel=0&controls=1',
  },
  buildChallengesDividerLabel: 'Build and Challenges',
  build: {
    eyebrow: 'How It Was Built',
    heading: 'Unity, Meta SDK, AI, and custom 3D content',
    paragraphs: [
      'The Devpost write-up explains that the team built Memory Garden in Unity, using the Meta SDK and the Valem Meta Ray-Ban Display Glasses sample UI as the prototype foundation for the Meta Ray-Ban AI Display Glasses. The experience also connected to the OpenAI API and used custom 3D assets refined through Autodesk Maya and Substance Painter.',
      'That technical stack matters because the project had to coordinate multiple layers at once: immersive interaction, AI support, visual storytelling, and emotionally sensitive content. Even in hackathon form, it was already trying to solve a multi-system problem rather than a single gimmick.',
    ],
    cards: challengeCards,
  },
  outcome: {
    eyebrow: 'Outcome and Reflection',
    heading: 'A prototype that treated care and ethics as part of the design brief',
    paragraphs: [
      'The team describes the main accomplishment as building a working prototype that successfully brought the concept together. That is important, but what stands out even more is the project’s tone. The Devpost story repeatedly returns to dignity, emotional care, and ethical restraint, which gave the prototype a seriousness that many hackathon XR projects never reach.',
      'The project also leaves a clear path forward: more hardware validation, collaboration with clinicians and caregivers, and safer pipelines for personal memory data. Those next steps suggest a concept that could grow well beyond hackathon scope if developed with the right partners.',
    ],
  },
  nextStepsSection: {
    eyebrow: 'What’s Next',
    heading: 'Future directions named on Devpost',
    steps: nextSteps,
    cta: { label: 'Open Devpost Entry', href: devpostUrl },
  },
};

export default memoryGradenContent;
