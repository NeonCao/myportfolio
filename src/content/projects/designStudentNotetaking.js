import heroImage from '../../assets/images/design-note-taking/Untitled-4.png';
import paperImage from '../../assets/images/design-note-taking/photo-1434030216411-0b793f4b4173.jpg';
import overloadImage from '../../assets/images/design-note-taking/maxresdefault.jpg';
import organizationImage from '../../assets/images/design-note-taking/Canva-Blog-banner.png';
import collaborationImage from '../../assets/images/design-note-taking/what-is-rbac-cover.png';
import handwritingImage from '../../assets/images/design-note-taking/67cb70089c597e9b81a1bf09_old-letters-436503_1280.jpg';
import structureImage from '../../assets/images/design-note-taking/67cb737360ac4f826e2d3a04_ux-788002_640.jpg';
import searchImage from '../../assets/images/design-note-taking/67cb73c5413fbc8af9bdb492_search-2041815_1280.jpg';
import versionImage from '../../assets/images/design-note-taking/67cb744868afbbbcfde697f4_art5.jpg';
import sharingImage from '../../assets/images/design-note-taking/share-2482016_1280.jpg';
import captureImage from '../../assets/images/design-note-taking/cellphone-2590471_1280.jpg';
import artifact1 from '../../assets/images/design-note-taking/Untitled-1_1.png';
import artifact2 from '../../assets/images/design-note-taking/Untitled-2_1.png';
import artifact3 from '../../assets/images/design-note-taking/Screenshot-2025-04-08-025230.jpg';
import artifact4 from '../../assets/images/design-note-taking/Untitled-3.png';

export const designStudentNotetakingContent = {
  hero: {
    title: 'Research Case Study: Note-Taking Application for Design Students',
    image: heroImage,
  },

  intro: {
    badge: 'UX Research Case Study',
    heading: 'Understanding how design students capture, organize, and revisit creative thinking',
    paragraphs: [
      'This study explored a simple tension: design students need the freedom of sketches, fragments, and multimedia notes, but they also need the organization and collaboration benefits that digital tools promise. Existing products often solved only one side of that problem well.',
      'The outcome was a research-backed set of product directions for a note-taking experience that supports creative messiness without sacrificing findability, sharing, or structure.',
    ],
    ctas: [
      { href: '#findings', label: 'Jump to Findings', variant: 'btn-primary' },
      { href: '#recommendations', label: 'Jump to Recommendations', variant: 'btn-outline' },
    ],
    snapshotLabel: 'Project Snapshot',
  },

  overviewStats: [
    {
      label: 'Interviews',
      value: '10',
      description: 'Semi-structured sessions run over Zoom, each lasting roughly 25 to 40 minutes.',
    },
    {
      label: 'Timeline',
      value: '2 Weeks',
      description: 'Research planning, recruiting, interviews, synthesis, and report writing.',
    },
    {
      label: 'Team',
      value: '2',
      description: 'Both teammates contributed as UI/UX designers and researchers.',
    },
    {
      label: 'My Role',
      value: '5',
      description: 'I conducted half of the interviews and supported planning, synthesis, and reporting.',
    },
  ],

  overview: {
    eyebrow: 'Project Overview',
    heading: 'What the research set out to answer',
    paragraphs: [
      'Design students operate across sketches, typed notes, screenshots, photos, and collaborative boards. That makes their note-taking behavior richer than what many mainstream productivity tools assume. The study asked how a note-taking app could better support that layered workflow from early ideation through project critique.',
      'The research lens was intentionally practical: understand what students do today, where their current systems fail them, and what features would actually remove friction instead of simply adding more capability on paper.',
    ],
    contributions: {
      heading: 'My Contributions',
      items: [
        'Developed the research plan, interview script, and consent form with my teammate.',
        'Conducted 5 interviews and organized transcripts for synthesis.',
        'Extracted quotes and themes through affinity mapping.',
        'Helped turn insights into recommendations and the final report.',
      ],
    },
  },

  researchFlowDividerLabel: 'Research Flow',

  processSteps: [
    {
      number: 1,
      title: 'Frame the research around real creative workflows',
      intro:
        'The research started with a narrow but important question: what breaks when design students try to use general-purpose note-taking tools for highly visual, iterative work? Instead of assuming the answer was just “make it more digital,” the team defined goals around capture, organization, retrieval, and collaboration.',
      sections: [
        {
          heading: 'Research goals',
          body:
            'The study focused on understanding how design students record ideas, what tools they already rely on, where they get stuck when notes need to support project work, and what a better hybrid workflow might look like.',
        },
        {
          heading: 'Participants',
          body:
            'Participants were college students in design-related majors. That kept the study grounded in people who regularly move between sketches, written notes, references, and collaborative critique.',
        },
      ],
      bullets: [
        'Understand note-taking behaviors, tool choices, and pain points.',
        'Identify how students organize and retrieve notes for projects and critiques.',
        'Explore collaboration needs such as sharing, permissions, and version history.',
        'Look for opportunities to combine creative freedom with better structure.',
      ],
      images: [
        { src: artifact1, caption: 'Research framing and report artifact' },
      ],
    },
    {
      number: 2,
      title: 'Use interviews and affinity mapping to surface patterns',
      intro:
        'Ten semi-structured interviews gave the team rich qualitative material to work with, but the real value came from how those interviews were organized afterward. Affinity diagramming helped turn long conversations and transcripts into clusters of recurring needs and frustrations.',
      sections: [
        {
          heading: 'Methods',
          body:
            'Each interview was conducted over Zoom and followed a semi-structured script, leaving room for participants to describe habits, workarounds, and emotional preferences in their own words. A demographic survey added supporting context around background and tool familiarity.',
        },
        {
          heading: 'My contribution',
          body:
            'I helped build the research plan, interview script, and consent materials, then conducted five of the interviews myself. Afterward I organized transcripts, extracted quotes, and used affinity clustering to help shape the final insight summary and report.',
        },
      ],
      bullets: [
        '10 interview sessions, 25 to 40 minutes each.',
        'Transcript organization and quote extraction across more than 100 pages of material.',
        'Affinity mapping used to compress raw observations into clearer themes.',
      ],
      images: [
        { src: artifact2, caption: 'Research synthesis artifact' },
        { src: artifact3, caption: 'Report layout and supporting documentation' },
      ],
      imageLeft: true,
    },
    {
      number: 3,
      title: 'Translate findings into product directions instead of abstract takeaways',
      intro:
        'The final phase focused on making the findings actionable. Rather than stopping at broad observations like “students like handwriting,” the research was pushed further into design implications about input modes, organization systems, sharing, and collaboration history.',
      sections: [
        {
          heading: 'Why that mattered',
          body:
            'This project was less about validating an existing product and more about building a stronger foundation for one. Turning each insight into a concrete design direction made the case study more useful for future concept development.',
        },
        {
          heading: 'Constraint-aware synthesis',
          body:
            'Because the team had only two weeks, the work had to stay sharply focused. Interviews were scheduled efficiently, analysis was split across teammates, and the synthesis emphasized the most repeated and high-impact behaviors instead of trying to preserve every detail equally.',
        },
      ],
      bullets: [
        'Move from “paper is better” to “support handwriting without losing digital benefits.”',
        'Move from “too many features feel messy” to “hide complexity until it is needed.”',
        'Move from “sharing is chaotic” to “build explicit version and permission controls.”',
      ],
      images: [
        { src: artifact4, caption: 'Final presentation artifact' },
      ],
    },
  ],

  findingsSection: {
    id: 'findings',
    eyebrow: 'Key Findings',
    heading: 'What surfaced most clearly from the interviews',
    description:
      'The most useful insights were not about a single missing feature. They were about mismatches between creative practice and the structure of existing tools. These four themes appeared repeatedly across interviews and became the backbone of the design directions that followed.',
  },

  findings: [
    {
      title: 'Paper still wins when ideas are messy',
      summary:
        'Design students repeatedly described pen and paper as faster, freer, and more forgiving for early ideation. The problem was not that digital tools were useless, but that many tools interrupted the flow that sketching naturally supports.',
      image: paperImage,
      alt: 'Notebook and pencil representing freeform note-taking',
      eyebrow: 'Behavior',
      accent: 'primary',
    },
    {
      title: 'Customization helps until it turns into interface noise',
      summary:
        'Participants liked flexible tools, but they did not want to configure everything up front. A note-taking app for design students needs progressive complexity: capable when needed, quiet when not.',
      image: overloadImage,
      alt: 'Complex interface imagery representing feature overload',
      eyebrow: 'Tension',
      accent: 'secondary',
    },
    {
      title: 'Organization breaks down long after capture',
      summary:
        'The hardest part was often not writing a note, but finding it again later during project work or critique prep. Students needed stronger ways to group related fragments, visuals, and references without flattening them into rigid folders too early.',
      image: organizationImage,
      alt: 'Visual banner used to represent note organization',
      eyebrow: 'Pain Point',
      accent: 'accent',
    },
    {
      title: 'Collaboration is useful, but trust and traceability matter',
      summary:
        'Students already collaborated with tools like FigJam and Google Drive, yet they still ran into confusing permissions, broken links, and version ambiguity. Collaborative note-taking only works when people know what changed, who changed it, and what access others have.',
      image: collaborationImage,
      alt: 'Permission control illustration',
      eyebrow: 'Collaboration',
      accent: 'primary',
    },
  ],

  designDirectionsDividerLabel: 'Design Directions',

  recommendationsSection: {
    id: 'recommendations',
    eyebrow: 'Recommendations',
    heading: 'Translating research into product strategy',
    description:
      'These recommendations turn the findings into concrete design moves. Together they point toward a hybrid note-taking product that respects analog habits while building stronger support for retrieval, collaboration, and device-spanning workflows.',
  },

  recommendations: [
    {
      title: 'Support handwriting and freeform composition first',
      body:
        'The clearest opportunity was to preserve what students already love about analog note-taking while removing the pain of digitizing, storing, and sharing it later.',
      bullets: [
        'Digital handwriting that feels close to pencil-and-paper sketching.',
        'Gesture-based cleanup like scribble-to-erase and drag-to-group.',
        'Pages that allow handwriting, typed text, and sketches to coexist naturally.',
      ],
      image: handwritingImage,
      alt: 'Handwritten letters and paper textures',
    },
    {
      title: 'Balance freedom with gentle structure',
      body:
        'Students did want structure, just not structure that gets in the way of creative work. The interface should reveal organization tools gradually and make reconfiguration feel lightweight.',
      bullets: [
        'Optional grids, templates, and bullets that stay hidden until needed.',
        'Drag-and-drop rearrangement for boards, pages, or note clusters.',
        'Auto-formatting that cleans up content without removing flexibility.',
      ],
      image: structureImage,
      alt: 'Abstract user experience image representing structure and usability',
      imageLeft: true,
    },
    {
      title: 'Invest in retrieval, linking, and search',
      body:
        'A better capture experience is only half the solution. Students also need to rediscover notes quickly across text, sketches, and media when projects become more complex.',
      bullets: [
        'Search that can span typed text, handwriting, and attached media.',
        'Smart tagging and categorization to reduce manual filing overhead.',
        'Visual linking or mind-map style relationships between related notes.',
      ],
      image: searchImage,
      alt: 'Magnifying glass representing search and retrieval',
    },
    {
      title: 'Make collaboration states legible',
      body:
        'Sharing should feel safe and predictable. Version history, permissions, and changes need to be visible enough that students can collaborate without wondering whether a file was overwritten or mis-shared.',
      bullets: [
        'Timeline-based version history for rollback and comparison.',
        'Clear roles such as view, comment, and edit permissions.',
        'Change tracking, annotations, and alerts when notes are updated.',
      ],
      image: versionImage,
      alt: 'Artwork representing version control and history',
      imageLeft: true,
    },
    {
      title: 'Reduce friction in sharing and quick capture',
      body:
        'The app should make it easier to bring new material in and easier to share it back out, especially when ideas are moving fast across devices and critique sessions.',
      bullets: [
        'One-click share links with expiration and access settings.',
        'Support for images, audio, video, and other media alongside notes.',
        'Fast capture tools for photos, handwriting recognition, and on-the-go idea capture.',
      ],
      image: sharingImage,
      alt: 'Network nodes representing file sharing',
    },
    {
      title: 'Treat multimedia capture as a core workflow, not an add-on',
      body:
        'Design students do not work in text alone. Their note systems often include reference photos, voice notes, screenshots, sketches, and quick scans, so those modes should be first-class rather than buried.',
      bullets: [
        'Camera-to-note flows that are fast enough to use during critique or class.',
        'Audio and image support for messy early-stage documentation.',
        'Mobile-first capture that syncs back into the larger project workspace.',
      ],
      image: captureImage,
      alt: 'Phone representing quick mobile capture',
      imageLeft: true,
    },
  ],

  artifactsSection: {
    eyebrow: 'Artifacts',
    heading: 'Report and presentation snapshots',
    description:
      'The final deliverables combined interview synthesis, affinity-based insights, and design recommendations into a presentation-ready case study. These visuals capture how the research was documented and communicated.',
  },

  artifacts: [
    { src: artifact1, title: 'Research framing deck' },
    { src: artifact2, title: 'Interview synthesis board' },
    { src: artifact3, title: 'Report composition' },
    { src: artifact4, title: 'Final presentation spread' },
  ],

  constraints: {
    eyebrow: 'Constraints & Limitations',
    heading: 'What shaped the scope',
    paragraphs: [
      'The project was completed within a tight two-week window, which meant recruitment, interviewing, transcription, analysis, and reporting all had to move in parallel. Participants also came from our personal network, which helped us move quickly but naturally limited diversity and scale.',
      'Another major challenge was analysis load: more than 100 pages of transcripts had to be reviewed and compressed into meaningful themes. Affinity mapping and careful division of labor helped keep the work manageable without losing the most important patterns.',
    ],
  },

  reflection: {
    eyebrow: 'Reflection',
    heading: 'What this study changed in my thinking',
    paragraphs: [
      'One of the strongest takeaways was how quickly assumptions can fall apart once real users start describing their workflow in detail. Before the interviews, I expected most design students to have fully shifted to tablets and digital note systems. Instead, many still preferred paper because it better matched the speed and openness of early ideation.',
      'That contrast reinforced the value of user research as a design correction tool. It reminded me that good product directions do not come from adding more features by default. They come from understanding the shape of people’s real habits, then designing technology that meets them there.',
    ],
  },
};

export default designStudentNotetakingContent;
