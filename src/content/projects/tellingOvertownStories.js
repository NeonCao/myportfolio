import heroImg from '../../assets/images/overtown/overtown_hero.png';
import longshoremenMuralImage from '../../assets/images/overtown/LongShoreMen_Rebuild_Mural.png';
import longshoremenSceneImage from '../../assets/images/overtown/LongShoreMen_Rebuild_Scene.png';
import familyTreeMuralImage from '../../assets/images/overtown/FamilyTree_Rebuild_Mural.png';
import familyTreeSceneImage from '../../assets/images/overtown/FamilyTree_Rebuild_Scene.png';
import gameChangersMuralImage from '../../assets/images/overtown/GameChangers_Rebuild_Mural.png';
import gameChangersSceneImage from '../../assets/images/overtown/GameChangers_Rebuild_Scene.png';
import overtownHubSceneImage from '../../assets/images/overtown/Overtown_Rebuild_Scene.png';
import overtownPrizeOne from '../../assets/images/overtown/OverTown_Prize_1.png';
import overtownPrizeTwo from '../../assets/images/overtown/OverTown_Prize_2.png';

export const tellingOvertownStoriesContent = {
  hero: {
    pageTitle: 'Telling Overtown Stories, Saying Their Names',
    heroImage: heroImg,
    badge: 'Community-Centered VR Storytelling Exhibition',
    heading: "Turning Overtown's public murals into interactive story scenes",
    paragraphs: [
      "Telling Overtown Stories, Saying Their Names is an immersive virtual exhibit developed in the University of Miami's Collaborative Innovation Lab with Miami MoCAAD. The project reimagines murals in historic Overtown as gamified interactive scenes, giving audiences a way to reveal the history behind each artwork through exploration, object interaction, and guided storytelling.",
      "Each mural was transformed from a static image into a dynamic storyline. Users interact with objects that played critical roles in the history, hear how those moments changed the larger story, and uncover the mural's meaning step by step instead of receiving it as a single block of information.",
    ],
    primaryCta: {
      label: 'Explore the Experience',
      href: 'https://verse.museum.miamimocaad.org/',
    },
    secondaryCta: {
      label: 'See My Contribution',
      href: '#my-role',
    },
  },

  snapshot: {
    label: 'Project Snapshot',
    stats: [
      {
        label: 'Role',
        value: 'Development Lead',
        description:
          'I led the implementation work for the experience and carried nearly all of the coding through to the finish line.',
      },
      {
        label: 'Format',
        value: 'VR Story Scenes',
        description:
          'The project turns public murals into gamified interactive scenes where users uncover history through objects, narration, and exploration.',
      },
      {
        label: 'Partners',
        value: 'UM + Miami MoCAAD',
        description:
          'Built in the Collaborative Innovation Lab with Miami Museum of Contemporary Art of the African Diaspora.',
      },
      {
        label: 'Recognition',
        value: '2025 Silver ADDY',
        description:
          'The project received a Silver ADDY in Online/Interactive, Online Storytelling.',
      },
    ],
    recognitionLabel: 'Recognition',
    awardBadges: [
      {
        image: overtownPrizeOne,
        alt: 'Overtown project prize badge 1',
      },
      {
        image: overtownPrizeTwo,
        alt: 'Overtown project prize badge 2',
      },
    ],
  },

  whyThisExists: {
    label: 'Why This Project Exists',
    heading: 'A digital format for stories that deserve to travel farther',
    paragraphs: [
      'The University of Miami reporting around the project describes Overtown as a neighborhood with deep cultural significance that is still unfamiliar to many people outside it. The experience responds to that gap by using VR as a form of guided historical access: not as spectacle for its own sake, but as a way to help more people actively uncover the context surrounding the murals.',
      "Miami MoCAAD's own project description also frames the work as a blend of art, history, and technology. That combination is what makes the project strong. It treats murals as more than surfaces to be viewed; they become interactive narrative systems where meaningful objects, audio, and spatial cues gradually reveal labor history, civic life, sports culture, and the living resilience of Overtown.",
    ],
    stats: {
      neighborhoodFocus: {
        title: 'Neighborhood Focus',
        value: 'Overtown',
        valueClassName: 'text-primary',
        description: 'Historic Black Miami community often called the Harlem of the South',
      },
      coreInteraction: {
        title: 'Core Interaction',
        value: 'Object-Based',
        valueClassName: '',
        description: 'Users interact with scene objects to unlock story moments',
      },
      publicLaunch: {
        title: 'Public Launch',
        value: 'Soul Basel',
        valueClassName: 'text-secondary',
        description: "Headsets were showcased during Miami MoCAAD's anniversary event",
      },
    },
  },

  muralsIntro: {
    dividerLabel: 'Three Murals, Three Interactive Stories',
    heading: 'Each environment turns a mural into a step-by-step storyline',
    paragraphs: [
      'The public-facing article about the project explains that users begin in a virtual Overtown, approach the murals, and then step inside them. In our experience, stepping inside is not passive. Each mural becomes a game-like scene where users interact with objects, trigger narration, and reveal how key historical changes affected the whole story.',
      'With the rebuilt mural and scene images included here, the design move becomes much easier to read. Each experience starts from a public artwork in the neighborhood, then translates that artwork into a spatial storyline with its own mood, interaction pattern, and historical learning path.',
      'These comparisons also show that the digital spaces are not simple copies. They are interpretations: the project chooses which objects matter, what order the story should unfold in, and how interaction can help viewers truly understand the history behind the murals.',
    ],
    hubImage: overtownHubSceneImage,
    hubImageAlt: 'Rebuilt Overtown hub scene from the Telling Overtown Stories experience',
  },

  interactionStructure: {
    label: 'Reading The Interaction Structure',
    steps: {
      start: {
        label: '1. Start at the mural',
        text:
          'The physical artwork anchors each story in a real public site, keeping the history tied to place instead of abstracting it away from the neighborhood.',
      },
      interact: {
        label: '2. Interact with key objects',
        text:
          'The virtual scene turns important historical symbols into touchpoints. Users discover the story by choosing objects, listening to their meaning, and connecting them to the bigger narrative.',
      },
      reveal: {
        label: '3. Reveal the story step by step',
        text:
          'History unfolds through a sequence of interactions, changing the mural from a static image into a dynamic storyline that viewers can understand through action.',
      },
    },
  },

  portalExperiences: [
    {
      eyebrow: 'Story Scene 01',
      title: "International Longshoremen's Association, Local 1416",
      summary:
        'This interactive scene brings visitors into the Port of Miami in the 1930s, where objects in the environment reveal how union formation changed wages, working conditions, and the path to middle-class stability for many Black workers in Miami.',
      muralImage: longshoremenMuralImage,
      muralAlt: "International Longshoremen's Association mural in Overtown",
      sceneImage: longshoremenSceneImage,
      sceneAlt: 'Rebuilt Longshoremen interactive scene from Telling Overtown Stories',
      context:
        'The mural becomes a playable sequence of historical discovery rather than a static wall image. As visitors interact with meaningful objects in the port setting, they hear how each detail connects to labor, organizing, dignity, and the broader story of Black workers shaping Miami.',
      highlights: [
        'Turns public art into an object-based labor history experience.',
        'Uses interaction and narration to reveal union history step by step.',
        'Shows how the mural’s symbols connect to larger changes in work, wages, and community stability.',
      ],
      accent: 'primary',
    },
    {
      eyebrow: 'Story Scene 02',
      title: 'OVERtown: Our Family Tree',
      summary:
        'This scene centers the former law office of Judge Lawson E. Thomas and uses interactive memory objects to reveal Overtown family history, civic dignity, and the neighborhood figures who shaped Black public life in Miami.',
      muralImage: familyTreeMuralImage,
      muralAlt: 'Our Family Tree mural in Overtown',
      sceneImage: familyTreeSceneImage,
      sceneAlt: 'Rebuilt Family Tree interactive scene from Telling Overtown Stories',
      context:
        'This experience leans into memory, lineage, and civic presence. Instead of asking viewers to absorb the mural all at once, the scene lets them uncover the story through focused interactions, making the people, places, and institutions behind the artwork easier to understand.',
      highlights: [
        'Frames family memory and neighborhood legacy as a sequence of discoveries.',
        'Centers Judge Lawson E. Thomas through spatial context and interactive story beats.',
        'Transforms portraiture into a dynamic storyline with stronger emotional context.',
      ],
      accent: 'secondary',
    },
    {
      eyebrow: 'Story Scene 03',
      title: 'Overtown Pitch: Game Changers',
      summary:
        'This scene reframes the mural as a gamified street-festival experience tied to Black global soccer stars and the community pride sparked by the Miami Edison Senior High School girls soccer team.',
      muralImage: gameChangersMuralImage,
      muralAlt: 'Game Changers mural in Overtown',
      sceneImage: gameChangersSceneImage,
      sceneAlt: 'Rebuilt Game Changers interactive scene from Telling Overtown Stories',
      context:
        "The sports scene broadens the exhibit's tone without losing its community focus. Through playful interaction, users move from visual recognition into a clearer understanding of how athletic achievement, local pride, identity, and representation connect inside the mural's story.",
      highlights: [
        'Combines mural storytelling with a playful, game-like spatial tone.',
        'Uses interaction to connect global soccer culture with Miami Edison achievement.',
        'Shows how each mural can have its own rhythm while still revealing history step by step.',
      ],
      accent: 'accent',
    },
  ],

  contribution: {
    label: 'My Contribution',
    heading: 'Leading development while shaping interactive story scenes',
    paragraphs: [
      "My role on this project was Development Lead. I handled nearly all of the coding work needed to bring the exhibit together, which meant taking the team's design and research decisions and turning them into something navigable, interactive, and ready for public-facing use.",
      'My contribution also extended past implementation alone. I participated in about half of the scene building, so my work sat at the intersection of engineering and environment production. That made the role especially satisfying: I was not only wiring the experience together technically, but also helping decide how visitors would move through the scene, what objects they would notice, and how each interaction would reveal another part of the history.',
      'Because the project was collaborative and community-oriented, the job was not just "make it run." It was making sure the experience felt stable, respectful, and clear enough that the stories remained the center of attention.',
    ],
    cards: [
      {
        title: 'Technical ownership',
        text:
          'I served as the Development Lead and was responsible for pushing the interactive build toward a finished, stable experience across the project timeline.',
      },
      {
        title: 'Most of the codebase',
        text:
          'My contribution covered almost all of the coding work, which meant translating the team’s research and design intent into interactive VR scenes where objects, triggers, and story moments worked together.',
      },
      {
        title: 'Shared scene production',
        text:
          'Alongside the implementation work, I also helped build roughly half of the scenes, so my role extended into environmental assembly, interaction placement, and spatial storytelling polish.',
      },
    ],
  },

  process: {
    dividerLabel: 'Process and Collaboration',
    cards: [
      {
        title: 'Grounded in place',
        text:
          'The class began by visiting Overtown and seeing the murals in person, which anchored the digital work in a real neighborhood, real architecture, and real community history.',
      },
      {
        title: 'Built collaboratively',
        text:
          'The team split into design, development, and research tracks, then worked in weekly cycles with Miami MoCAAD staff to keep the exhibit historically grounded and publicly useful.',
      },
      {
        title: 'Designed for access',
        text:
          'A core goal was making the stories understandable beyond the physical mural sites, so the final experience used interaction to guide audiences through history rather than asking them to interpret the murals alone.',
      },
    ],
  },

  videos: {
    heading: 'Videos',
    cards: [
      {
        label: 'Demo Video',
        title: 'Telling Overtown Stories Demo',
        embedUrl: 'https://www.youtube.com/embed/Qyu69lCYvfs?rel=0&controls=1',
      },
      {
        label: 'News Video',
        title: 'Telling Overtown Stories News Coverage',
        embedUrl: 'https://www.youtube.com/embed/TXJENTk2HOY?rel=0&controls=1',
      },
    ],
  },

  outcome: {
    label: 'Outcome',
    heading: 'A project built for public learning, not just class critique',
    paragraphs: [
      'What makes this piece stand out in my portfolio is that it was designed to live in public. The experience was launched for community audiences, showcased with headsets in Overtown, and positioned as a way for younger audiences and remote visitors to actively learn stories that might otherwise stay tied to one physical location.',
      'The official School of Communication project page also notes that the work received a 2025 Silver ADDY. That recognition matters, but the more meaningful outcome is that the project helped extend a community storytelling effort into a durable interactive format, where viewers could uncover history through movement, objects, and listening instead of only looking.',
    ],
  },

  sourceLinks: {
    label: 'Source Links',
    heading: 'Read the official context',
    paragraph:
      'This page is grounded in the official project materials, the University of Miami coverage, and the public exhibition framing around Saying Their Names.',
    links: [
      {
        label: 'Saying Their Names - Project Page',
        href: 'https://sayingtheirnames.org/about',
      },
      {
        label: 'UM News Story',
        href: 'https://news.miami.edu/stories/2026/02/learning-overtowns-history-through-art.html',
      },
      {
        label: 'UM Project Page',
        href: 'https://com.miami.edu/projects/telling-overtown-stories-saying-their-names/',
      },
      {
        label: 'Experience Overtown',
        href: 'https://verse.museum.miamimocaad.org/ArMdDJ3/mocaad-hub',
      },
    ],
  },
};

export default tellingOvertownStoriesContent;
