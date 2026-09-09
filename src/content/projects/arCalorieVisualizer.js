import heroImage from '../../assets/images/ar-calorie-visualizer/Calories_Hero.png';
import sceneImage from '../../assets/images/ar-calorie-visualizer/scene.jpg';
import futureTrackingImage from '../../assets/images/ar-calorie-visualizer/future-tracking.webp';
import futureNutritionImage from '../../assets/images/ar-calorie-visualizer/future-nutrition.webp';

export const arCalorieVisualizerContent = {
  hero: {
    title: 'AR Calorie Visualizer',
    image: heroImage,
  },
  intro: {
    badge: 'AR + OCR Food Concept',
    heading: 'Turning calorie labels into something people can actually picture',
    paragraphs: [
      'AR Calorie Visualizer is an augmented reality experiment that makes nutrition labels feel less ' +
        'abstract. Once the app reads a calorie value from packaging, it translates that number into a ' +
        'pile of chip bags and loose chips directly on top of the product in AR.',
      'The goal was not nutritional precision for its own sake. It was to test whether a playful, ' +
        'physical metaphor could help people understand calorie quantity faster than a plain number on a ' +
        'label. Humor became part of the UX strategy: if the visualization makes you pause, it has already ' +
        'done useful work.',
    ],
    ctaButtons: {
      watchDemo: {
        label: 'Watch Demo',
        href: 'https://www.youtube.com/watch?v=SdJvrvjzPL4',
      },
      jumpToChallenges: {
        label: 'Jump to Challenges',
        href: '#engineering-hurdles',
      },
    },
    snapshot: {
      label: 'Project Snapshot',
      stats: [
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
      ],
    },
  },
  whyExists: {
    image: sceneImage,
    imageAlt: 'AR Calorie Visualizer showing a calorie scene anchored over a label',
    eyebrow: 'Why This Exists',
    heading: 'Calories are easy to read and still hard to feel',
    paragraphs: [
      'Most people can read a nutrition label, but that does not mean they can quickly interpret what ' +
        'the number means in real terms. A value like 240 calories is technically informative while still ' +
        'being psychologically slippery.',
      'This project reframed the problem as a translation task. Instead of showing the number again in a ' +
        'fancier UI, the app converts the number into a deliberately tangible visual pile. The result is ' +
        'lighter in tone, but stronger in memorability.',
    ],
    targetAudience: {
      label: 'Target Audience',
      audiences: ['General consumers', 'Health-conscious users', 'People who learn better visually'],
    },
  },
  coreFeaturesDivider: {
    label: 'Core Features',
  },
  features: {
    badgeLabel: 'Feature',
    cards: [
      {
        title: 'Marker-based AR anchoring',
        text: 'Vuforia image targets keep the calorie visualization attached to the physical package, so the feedback appears exactly where the nutrition label already lives.',
      },
      {
        title: 'Readable calorie scaling',
        text: 'Large calorie values are shown with chip bags and smaller amounts with loose chips, which keeps the scene understandable without overwhelming the user with hundreds of repeated objects.',
      },
      {
        title: 'OCR-assisted detection',
        text: 'Instead of hardcoding every label, the project extracts calorie numbers from camera captures so the experience can respond to more than one predefined package.',
      },
      {
        title: 'Physics-aware placement',
        text: 'Spawned chips use local gravity aligned to the detected marker, making the pile feel grounded to the real label even when the package is tilted.',
      },
    ],
  },
  whyArFits: {
    eyebrow: 'Why AR Fits',
    heading: 'The medium matters as much as the metaphor',
    paragraphs: [
      'This concept works because the visualization appears on the actual product instead of in a ' +
        'detached dashboard. A regular nutrition app could show a number, and a chart could show scale, ' +
        'but AR makes the explanation inhabit the exact package that triggered the question.',
      'That makes the experience less about spectacle and more about context. The user does not need to ' +
        'mentally map one screen to another. The label, the product, and the explanation occupy the same ' +
        'space, which keeps the interaction immediate.',
    ],
    stats: [
      {
        title: 'Anchoring',
        value: 'Label',
        valueClassName: 'text-primary',
        description: 'Visualization is attached to the real package',
      },
      {
        title: 'Translation',
        value: 'Number to Object',
        valueClassName: '',
        description: 'Calories become countable physical stand-ins',
      },
      {
        title: 'Tone',
        value: 'Playful',
        valueClassName: 'text-secondary',
        description: 'Humor lowers friction without removing the message',
      },
    ],
  },
  engineeringHurdlesDivider: {
    label: 'Engineering Hurdles',
  },
  engineeringHurdles: {
    heading: 'What had to be solved to make the joke believable',
    description:
      'The concept is playful, but the implementation had several technical constraints underneath it. ' +
      'Reading labels, orienting physics correctly in AR, and keeping the scene understandable all required ' +
      'deliberate tradeoffs and small custom systems.',
    cards: [
      {
        title: 'OCR packages did not fit cleanly inside Unity',
        problem: 'The calorie-reading workflow depended on Python OCR tooling that could not simply be dropped into the Unity runtime.',
        solution: 'The app sends a captured image to a local Python server, which performs OCR and returns the calorie value back to Unity for visualization.',
        accent: 'primary',
      },
      {
        title: 'Default world gravity broke the AR illusion',
        problem: 'Unity gravity always points down the world Y-axis, so chips would fall in the wrong direction whenever the nutrition label was angled in the camera view.',
        solution: 'A custom ChipGravity script reoriented gravity using the marker surface so the chip pile falls perpendicular to the scanned package instead of the global scene.',
        accent: 'secondary',
      },
      {
        title: 'Repeated scans created endless visual clutter',
        problem: 'Each new scan could keep adding more bags and chips, quickly making the scene unreadable and heavier to render.',
        solution: 'A cleanup routine destroys previously spawned objects before the next visualization is generated, keeping the feedback focused and performant.',
        accent: 'accent',
      },
      {
        title: 'Large calorie numbers stopped being intuitive',
        problem: 'A one-object-per-calorie approach becomes absurd almost immediately, which makes the metaphor collapse for higher-calorie snacks.',
        solution: 'The display was changed to a tiered system: one bag per 160 calories and one chip per 7 remaining calories, preserving the joke without losing readability.',
        accent: 'primary',
      },
      {
        title: 'Suitable chip assets were not readily available',
        problem: 'The Unity Asset Store did not provide a ready-made set of potato chips and chip bag models that matched the concept.',
        solution: '3D assets were sourced from Sketchfab, then cleaned up, rematerialed, and turned into prefabs that could be spawned repeatedly in the AR scene.',
        accent: 'secondary',
      },
    ],
  },
  demo: {
    eyebrow: 'Demo',
    heading: 'See the AR visualization in action',
    openLinkLabel: 'Open on YouTube',
    openLinkHref: 'https://www.youtube.com/watch?v=SdJvrvjzPL4',
    videoSrc: 'https://www.youtube.com/embed/SdJvrvjzPL4?rel=0&controls=1',
    videoTitle: 'AR Calorie Visualizer Demo Video',
  },
  futureDevelopment: {
    eyebrow: 'Further Development',
    heading: 'Where the concept could grow next',
    description:
      'The first version proves the communication idea. A next version could make the tracking sturdier, ' +
      'widen the nutrition pipeline, and turn the project from a clever prototype into a more robust food ' +
      'literacy tool.',
    cards: [
      {
        title: 'Upgrade the tracking stack',
        summary: 'A future version could move beyond Vuforia toward ARKit, ARCore, or Unity MARS for stronger image tracking, better stability, and more flexible spatial behavior.',
        image: futureTrackingImage,
        alt: 'Concept image for improved AR tracking',
        eyebrow: 'Next Step',
        accent: 'primary',
      },
      {
        title: 'Read more than just calories',
        summary: 'The same pipeline could expand to sodium, carbohydrates, fat, or protein, turning the joke into a fuller nutrition explainer instead of a single-number visualization.',
        image: futureNutritionImage,
        alt: 'Concept image for expanded nutrition recognition',
        eyebrow: 'Expansion',
        accent: 'secondary',
      },
    ],
  },
};

export default arCalorieVisualizerContent;
