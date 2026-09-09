import heroImage from '../../assets/images/um-campus-xplorer/UMCR_Hero.jpg';
import arReasonImage from '../../assets/images/um-campus-xplorer/UMCR_Hero_2.jpg';
import storyboard1 from '../../assets/images/um-campus-xplorer/UMXRP_StoryBoard_P1.png';
import storyboard2 from '../../assets/images/um-campus-xplorer/UMXRP_StoryBoard_P2.png';
import storyboard3 from '../../assets/images/um-campus-xplorer/UMXRP_StoryBoard_P3.png';
import storyboard4 from '../../assets/images/um-campus-xplorer/UMXRP_StoryBoard_P4.png';

export const umCampusXplorerContent = {
  hero: {
    title: 'UM Campus Xplorer',
    image: heroImage,
  },
  intro: {
    badge: 'AR Navigation Concept',
    heading: 'Augmenting campus wayfinding through AR',
    description:
      'UM Campus Xplorer is a mobile augmented reality concept built to help students and visitors ' +
      'navigate a large university campus more intuitively. Instead of asking people to decode a flat ' +
      'map, the app overlays pins, building labels, and direction lines directly onto the real world ' +
      'through the phone camera.',
    ctaButtons: {
      watchDemo: {
        label: 'Watch Demo',
        href: 'https://youtu.be/-OsL0Cu7xwg',
      },
      jumpToStoryboard: {
        label: 'Jump to Storyboard',
        href: '#storyboard',
      },
    },
    audienceCard: {
      label: 'Who It Helps',
      audiences: [
        'Incoming students',
        'Campus visitors and tour groups',
        'Facility staff and event participants',
      ],
      description:
        'The core goal was simple: make it easier to find buildings and specific rooms on campus, ' +
        'especially when signage is inconsistent or a visitor has no mental map of the area.',
    },
  },
  appDescription: {
    eyebrow: 'App Description',
    heading: 'Making campus navigation feel spatial instead of abstract',
    paragraphs: [
      'The app is designed around two everyday frustrations: finding the right building and finding ' +
        'the right room once you are there. By placing wayfinding information into an AR view, UM ' +
        'Campus Xplorer reduces the jump between map-reading and real-world orientation.',
      'Rather than replacing the real environment, the app uses it as the interface itself. That makes ' +
        'wayfinding more immediate for new students, tour groups, faculty, and event visitors.',
    ],
    stats: [
      {
        key: 'searchModes',
        title: 'Search Modes',
        value: '2',
        valueClassName: 'text-primary',
        description: 'Outdoor geolocation and indoor room search',
      },
      {
        key: 'coreFeedback',
        title: 'Core Feedback',
        value: 'AR',
        valueClassName: '',
        description: 'Pins, labels, glowing paths, and contextual overlays',
      },
      {
        key: 'primaryGoal',
        title: 'Primary Goal',
        value: 'Wayfinding',
        valueClassName: 'text-secondary',
        description: 'Lower confusion in a large and complex campus environment',
      },
    ],
  },
  storyboard: {
    heading: 'Storyboard: User Flow and Interaction',
    description:
      'The app centers on two search modes: geospatial campus navigation for outdoor landmarks and room ' +
      'search for indoor destinations. The storyboard below shows how the experience unfolds.',
    steps: [
      {
        number: 1,
        title: 'Launch Into AR Navigation',
        text: 'The app opens directly into an AR camera view. A compact information panel shows latitude, longitude, and current system accuracy, which improves with use. A floating compass helps users stay oriented while moving through campus.',
        image: storyboard1,
        imageCaption: 'Storyboard step 1',
      },
      {
        number: 2,
        title: 'Recognize Buildings In Context',
        text: 'Semi-transparent campus building models hover over their real-world counterparts. When a user points the phone at a building, an information panel appears with the building name and extra details that can later be used for room search.',
        image: storyboard2,
        imageCaption: 'Storyboard step 2',
      },
      {
        number: 3,
        title: 'Switch Between Outdoor And Indoor Search',
        text: 'The interface supports two search modes. Geolocation Search works like a map app for outdoor destinations. Room Search lets users search for a specific campus room using a building name plus room number, such as "Com 1018".',
        image: storyboard3,
        imageCaption: 'Storyboard step 3',
      },
      {
        number: 4,
        title: 'Guide Users To The Destination',
        text: 'After a successful search, the app places an AR pin at the destination and draws a glowing guidance line from the user’s current position to that pin. For room-level search, the pin lands near the room entrance with a rough 2–5 meter accuracy target.',
        image: storyboard4,
        imageCaption: 'Storyboard step 4',
      },
    ],
  },
  whyArDivider: {
    label: 'Why AR',
  },
  whyAr: {
    heading: 'Why augmented reality makes this useful',
    paragraphs: [
      'A traditional campus map can show a destination, but it still asks the user to translate that map ' +
        'into the surrounding space. UM Campus Xplorer skips that translation step. Building labels, ' +
        'direction lines, and destination markers appear where users are already looking.',
      'That is what makes AR the right medium here. It keeps people in the real world while still giving ' +
        'them digital guidance. The experience is less about visual spectacle and more about reducing ' +
        'uncertainty at the moment someone needs help navigating.',
    ],
    image: arReasonImage,
    imageAlt: 'UM Campus Xplorer AR interface',
  },
  iteration: {
    heading: 'Design Iteration',
    description:
      'The project moved through several rounds of technical and interaction refinement, from early ' +
      'experimentation to more user-facing usability decisions.',
    notes: [
      'Wheel rebuilding: early attempts focused on scripting features from scratch before leaning on third-party packages.',
      'Package trying: different AR and geospatial packages were tested to find the best balance of documentation, support, and future flexibility.',
      'Initial prototype: the earliest version focused only on building-level geolocation and basic marker spawning.',
      'Room search expansion: indoor room search was added using structured JSON data with room names and WGS84 coordinates.',
      'Dual search modes: a switcher interface helped users move between outdoor geolocation and indoor room search.',
      'Visual feedback improvements: brighter emission pins and glowing lines made wayfinding easier to see in AR.',
      'Transparency and interaction: semi-transparent buildings reduced occlusion and made raycast interaction more practical.',
    ],
  },
  evaluation: {
    heading: 'Evaluation',
    paragraphs: [
      'Evaluation happened primarily through self-testing on campus, checking whether AR pins landed ' +
        'in expected places, whether paths were readable, and whether the search modes behaved clearly in ' +
        'motion. Each issue led to another round of revision and testing.',
      'Later, a live classroom demo brought in outside feedback from the instructor and classmates. ' +
        'Their comments helped highlight usability and clarity issues that were less obvious during solo ' +
        'development, giving the project a stronger final polish.',
    ],
  },
  demoVideo: {
    heading: 'Demo Video',
    src: 'https://www.youtube.com/embed/-OsL0Cu7xwg?rel=0&controls=1',
    title: 'UM Campus Xplorer Demo Video',
  },
};

export default umCampusXplorerContent;
