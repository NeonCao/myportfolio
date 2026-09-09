import heroImage from '../../assets/images/mixology/MIX_Hero.png';
import posterImage from '../../assets/images/mixology/MIX_Blog_step0_1.jpg';
import versionOneImage from '../../assets/images/mixology/Screenshot-2025-04-08-021110.jpg';
import versionTwoImage from '../../assets/images/mixology/MIX_Blog_step2_1.jpg';
import versionThreeImage from '../../assets/images/mixology/MIX_Blog_step3_1.jpg';
import futureOneImage from '../../assets/images/mixology/MIX_Blog_step4_1.png';
import futureTwoImage from '../../assets/images/mixology/MIX_Blog_step4_2.png';
import futureThreeImage from '../../assets/images/mixology/MIX_Blog_step4_3.jpg';
import recapImage from '../../assets/images/mixology/MIX_Blog_stepF.jpg';

const highlights = [
  {
    title: 'Poster to Product',
    text: 'The original project started from a real poster hanging at home and turned into a browsable cocktail interface.',
  },
  {
    title: 'Three Iterations',
    text: 'Each version responded to feedback: clearer layout, ingredient search, better icon quality, and onboarding help.',
  },
  {
    title: 'React Rebuild',
    text: 'This portfolio version replaces the old DOM scripting with reusable React components and DaisyUI-driven layout blocks.',
  },
];

const versionCards = [
  {
    eyebrow: 'Version 1',
    title: 'Clickable poster recreation',
    image: versionOneImage,
    text: 'The first pass focused on translating the physical periodic-table poster into a digital grid. It proved the concept, but the experience still felt more like a collection of buttons than a guided tool.',
  },
  {
    eyebrow: 'Version 2',
    title: 'Search, structure, and clearer hierarchy',
    image: versionTwoImage,
    text: 'After user feedback, the project gained ingredient-based search, clearer grouping, more complete data, and a calmer layout that explained why the cocktails were arranged the way they were.',
  },
  {
    eyebrow: 'Version 3',
    title: 'Tutorials and a redrawn icon system',
    image: versionThreeImage,
    text: 'The final Webflow iteration focused on approachability and polish. Tutorial steps reduced confusion, and the custom redrawn vector icons made the grid feel intentional instead of extracted from a poster scan.',
  },
];

export const periodicTableOfMixologyContent = {
  hero: {
    title: 'Periodic Table of Mixology',
    image: heroImage,
  },
  intro: {
    badge: 'UX + Frontend Rebuild',
    heading: 'Rebuilding a cocktail poster into an interactive portfolio project',
    paragraph:
      'This project began as a playful experiment: what if a decorative Periodic Table of Mixology poster ' +
      'could become a practical exploration tool? The old version lived in Webflow with hand-written ' +
      'JavaScript. This new portfolio version rebuilds the idea in React with DaisyUI, reusable ' +
      'components, local assets, and a cleaner interaction model.',
    primaryButtonLabel: 'Jump to Explorer',
    secondaryButtonLabel: 'Read the Build Story',
  },
  stats: [
    {
      key: 'cocktailsArchived',
      title: 'Cocktails Archived',
      value: '58',
      valueClassName: 'text-primary',
      desc: 'Imported from the older prototype',
    },
    {
      key: 'projectIterations',
      title: 'Project Iterations',
      value: '3',
      valueClassName: '',
      desc: 'Before this React portfolio rebuild',
    },
    {
      key: 'coreInteractions',
      title: 'Core Interactions',
      value: '4',
      valueClassName: '',
      desc: 'Browse, search, mix, and build your own',
    },
  ],
  background: {
    image: posterImage,
    imageAlt: 'Periodic Table of Mixology poster',
    eyebrow: 'Project Background',
    heading: 'Starting with something already loved',
    paragraphs: [
      'The concept came from a real cocktail poster that already worked beautifully as wall art, but not as ' +
        'a tool. You could admire it, but you could not click, filter, search, or experiment. That gap made ' +
        'the project compelling: keep the delight of the original artifact while giving it the usefulness of a ' +
        'digital interface.',
      'In the new portfolio, the project page does not just describe the work. It includes a rebuilt React ' +
        'explorer so the case study and the artifact live together in one place.',
    ],
  },
  highlights,
  buildStory: {
    eyebrow: 'Build Story',
    heading: 'The project evolved through feedback, not just features',
    paragraph:
      'The most interesting part of this project is how visibly it changed from version to version. Each ' +
      'new pass fixed a real usability problem from the last one, which makes it a strong portfolio piece ' +
      'for process as much as for visuals.',
  },
  versionCards,
  futureIdeas: {
    eyebrow: 'Next Opportunities',
    heading: 'Where the concept could go next',
    paragraph:
      'The original blog ended by asking how the tool could keep improving. That still feels right. The ' +
      'rebuilt portfolio page makes the current prototype easier to maintain, which opens the door for ' +
      'richer filtering, recipe comparisons, and maybe a more deliberate visual legend that leans even ' +
      'harder into the “periodic table” metaphor.',
    cards: [
      {
        image: futureOneImage,
        alt: 'Potential future visual for mixology project',
        title: 'Clearer comparison views',
        text: 'Give people a faster way to compare related drinks side by side instead of opening them one at a time.',
      },
      {
        image: futureTwoImage,
        alt: 'Future information architecture idea for mixology project',
        title: 'Stronger visual legend',
        text: 'Push the family grouping and periodic-table logic further so the structure teaches itself at a glance.',
      },
      {
        image: futureThreeImage,
        alt: 'Future refined mockup for mixology project',
        title: 'More guided onboarding',
        text: 'Keep the playful tone, but make first-time exploration feel even more intentional with lightweight onboarding cues.',
      },
    ],
  },
  summary: {
    image: recapImage,
    imageAlt: 'Mixology project reflection collage',
    eyebrow: 'Project Summary',
    heading: 'A playful concept that became a stronger UX case study',
    paragraphs: [
      'This project started with a cocktail poster that looked beautiful but could not really be explored. ' +
        'Through several iterations, it became a more interactive experience with clearer structure, better ' +
        'search, improved visuals, and a rebuilt React version that lets the case study and the working ' +
        'product live together.',
      'What I learned most from this project is that good design is not just about making something look ' +
        'interesting. It is about making it easier to understand, easier to use, and easier to improve over ' +
        'time. Reworking this idea taught me how much thoughtful iteration, user feedback, and stronger ' +
        'frontend structure can transform a fun visual concept into a more intentional product experience.',
    ],
  },
};

export default periodicTableOfMixologyContent;
