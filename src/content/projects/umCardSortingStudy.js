import heroImage from '../../assets/images/um-card-sorting/Untitled-1_2.png';
import teamVivian from '../../assets/images/um-card-sorting/image-2.png';
import teamNeon from '../../assets/images/um-card-sorting/image-4.png';
import teamMia from '../../assets/images/um-card-sorting/image-3.png';
import recruitIcon from '../../assets/images/um-card-sorting/icon-Recruit-Participants.png';
import conductIcon from '../../assets/images/um-card-sorting/icon-Analyze-Data.png';
import analyzeIcon from '../../assets/images/um-card-sorting/icon-Compile-report.png';
import reportIcon from '../../assets/images/um-card-sorting/icon-Conduct-Research.png';
import preSortImage from '../../assets/images/um-card-sorting/persortQ.jpg';
import cardSortImage1 from '../../assets/images/um-card-sorting/cardSort1.jpg';
import cardSortImage2 from '../../assets/images/um-card-sorting/7f4c8867e9be91077cfe17cb90ad38df.jpg';
import cardSortImage3 from '../../assets/images/um-card-sorting/cardSort3.jpg';
import postSortImage from '../../assets/images/um-card-sorting/postsortQ.jpg';
import surveyResultImage from '../../assets/images/um-card-sorting/Screenshot-2025-02-27-012706.jpg';
import cardSortResultImage from '../../assets/images/um-card-sorting/Screenshot-2025-02-27-012837.jpg';
import transcriptImage from '../../assets/images/um-card-sorting/Screenshot-2025-02-27-013044.jpg';
import dendrogramImage from '../../assets/images/um-card-sorting/Screenshot-2025-02-27-015009.jpg';
import similarityImage from '../../assets/images/um-card-sorting/similarity-matrix-1.png';
import clusterImage from '../../assets/images/um-card-sorting/Untitled-3_1.png';
import recommendationImage from '../../assets/images/um-card-sorting/Screenshot-2025-02-27-023649.jpg';

export const umCardSortingStudyContent = {
  hero: {
    title: 'Card Sorting Study for UM Interactive Media Site',
    image: heroImage,
  },
  intro: {
    badge: 'UX Research Case Study',
    heading: 'Rebuilding a university site structure around user mental models',
    paragraphs: [
      'This project used an online open card sort to understand how people naturally grouped and named ' +
        'content for the UM Interactive Media website. The goal was to redesign navigation around user ' +
        'expectations instead of preserving a structure that already felt confusing and hard to scan.',
      'The result was a context-rich research study that combined questionnaire data, open sorting, ' +
        'interview recordings, clustering analysis, direct quotes, and a homepage redesign direction.',
    ],
    ctaButtons: {
      methodology: {
        label: 'Jump to Methodology',
        href: '#methodology',
      },
      analysis: {
        label: 'Jump to Analysis',
        href: '#analysis',
      },
    },
    snapshotLabel: 'Project Snapshot',
    snapshotStats: [
      {
        label: 'Method',
        value: 'Open',
        description: 'An online open card sort captured how users naturally grouped and labeled site content.',
      },
      {
        label: 'Audience',
        value: '3',
        description: 'Current UM students, students from other schools, and prospective students.',
      },
      {
        label: 'Timeline',
        value: '14 Days',
        description: 'Recruiting, running sessions, analyzing results, and compiling the report.',
      },
      {
        label: 'Outputs',
        value: '4',
        description: 'Research plan, card-sort findings, IA recommendations, and a homepage redesign direction.',
      },
    ],
  },
  context: {
    eyebrow: 'Project Context',
    heading: 'Why this study was needed',
    paragraphs: [
      'The existing UM Interactive Media website did not match how users naturally grouped and labeled ' +
        'information. That mismatch made it harder to find content and weakened the overall usability of ' +
        'the site, especially for people arriving without prior knowledge of the program.',
      'The objective was to uncover a more intuitive information architecture by observing how users ' +
        'categorized content on their own, then using those patterns to guide navigation redesign.',
    ],
    goal: {
      heading: 'Research Goal',
      body:
        'Design a more intuitive navigation structure for the UM Interactive Media website by aligning ' +
        'site categories and labels with user expectations, task language, and real browsing behavior.',
    },
  },
  team: [
    {
      name: 'Vivian Orellana',
      role: 'UI/UX Designer & Researcher',
      image: teamVivian,
    },
    {
      name: 'Neon Cao',
      role: 'UI/UX Designer & Researcher',
      image: teamNeon,
    },
    {
      name: 'Mia Than',
      role: 'UI/UX Designer & Researcher',
      image: teamMia,
    },
  ],
  methodologyDivider: {
    label: 'Methodology',
  },
  methodology: {
    heading: 'Research methodology and timeline',
    description:
      'The study used an online open card sort to reveal how users naturally organized website content. ' +
      'By recruiting current UM students, students from other schools, and prospective students, the ' +
      'research captured a broader range of expectations than the internal team alone could provide.',
    timeline: [
      {
        title: 'Recruit Participants',
        dates: 'Day 1 - Day 4',
        image: recruitIcon,
      },
      {
        title: 'Conduct Research',
        dates: 'Day 5 - Day 7',
        image: conductIcon,
      },
      {
        title: 'Analyze Data',
        dates: 'Day 8 - Day 12',
        image: analyzeIcon,
      },
      {
        title: 'Compile Report',
        dates: 'Day 12 - Day 14',
        image: reportIcon,
      },
    ],
  },
  participants: {
    eyebrow: 'Participant Strategy',
    heading: 'Recruiting across three perspectives',
    description:
      'The team intentionally recruited from three groups so the final information architecture would ' +
      'reflect both experienced users and people encountering the site more freshly.',
    groups: [
      {
        title: 'Current UM students',
        body:
          'They brought direct familiarity with the site and could point out where the current structure helped or slowed down real use.',
      },
      {
        title: 'Students from other institutions',
        body:
          'Their outside perspective helped surface navigation problems that frequent users might overlook or work around.',
      },
      {
        title: 'Prospective students',
        body:
          'They represented the audience most likely to rely on the site for first impressions, orientation, and application-related questions.',
      },
    ],
  },
  researchSteps: [
    {
      number: '2.1',
      title: 'Pre-sort questionnaire',
      intro:
        'The study started with a short questionnaire to understand who participants were and what context they were bringing into the sort. This helped the team connect grouping behavior with audience background rather than treating every participant as interchangeable.',
      sections: [
        {
          heading: 'What it captured',
          body:
            'The questionnaire gathered age, gender, ethnicity, and familiarity with both technology and the UM Interactive Media website. That gave the team a way to interpret later sorting decisions through the lens of experience and prior expectations.',
        },
        {
          heading: 'Why it mattered',
          body:
            'Because the site serves a mixed audience, the pre-sort stage made it easier to compare how current students and newer visitors approached the information architecture differently.',
        },
      ],
      images: [
        { src: preSortImage, caption: 'Pre-sort questionnaire' },
      ],
    },
    {
      number: '2.2',
      title: 'Open card sort and recorded interview',
      intro:
        'The core of the study used an open card sort so participants could create their own categories and labels instead of being boxed into the site’s existing terminology. Sessions were also recorded, which added another layer of evidence beyond the final card groups.',
      sections: [
        {
          heading: 'Why open card sorting was the right method',
          body:
            'The goal was not just to test whether people could use the current navigation. It was to understand how they would naturally organize the content if given a blank slate. Open sorting exposed user mental models, preferred language, and areas where the site’s internal logic did not match user expectations.',
        },
        {
          heading: 'Why interviews were paired with the sort',
          body:
            'The recordings captured hesitation, rationale, and live reactions to the existing website. That made it possible to connect grouping choices with specific frustrations around labeling, navigation, and visual design.',
        },
      ],
      bullets: [
        'Participants created their own category names rather than choosing from a fixed list.',
        'The team gathered both structural output and qualitative commentary from the same session.',
        'Website trial feedback during the session helped validate broader usability concerns.',
      ],
      images: [
        { src: cardSortImage1, caption: 'Card sorting board example' },
        { src: cardSortImage2, caption: 'Recorded discussion artifact' },
        { src: cardSortImage3, caption: 'Additional card sorting output' },
      ],
      imageLeft: true,
    },
    {
      number: '2.3',
      title: 'Post-sort questionnaire',
      intro:
        'After the sorting activity, participants completed a post-sort questionnaire that focused more directly on site usability and overall impressions. This turned the study into more than a pure IA exercise by linking navigation structure to user satisfaction.',
      sections: [
        {
          heading: 'What it added',
          body:
            'The post-sort questions helped validate whether the current website felt intuitive, whether important content was easy to find, and whether people would want to return to the site. Those answers helped the team connect information structure issues with larger experience problems.',
        },
        {
          heading: 'What it revealed',
          body:
            'Participants did not only struggle with organization. They also described the website as visually static, outdated, and less interactive than they expected from an Interactive Media program.',
        },
      ],
      images: [
        { src: postSortImage, caption: 'Post-sort questionnaire' },
      ],
    },
  ],
  analysisDivider: {
    label: 'Evidence & Analysis',
  },
  evidence: {
    heading: 'Three layers of evidence',
    description:
      'The analysis combined quantitative, structural, and qualitative evidence. Together, these views ' +
      'helped the team move beyond isolated observations and build a more defensible redesign direction.',
    cards: [
      {
        title: 'Survey results',
        summary:
          'Survey data provided a quantitative view of who the users were, how easy they found the site to navigate, and whether the current experience felt strong enough to revisit or recommend.',
        image: surveyResultImage,
        alt: 'Survey chart results',
        eyebrow: 'Quantitative',
        accent: 'primary',
      },
      {
        title: 'Card sorting results',
        summary:
          'The card-sort output showed how participants grouped content and what labels they reached for on their own, helping expose both strong consensus areas and terminology gaps.',
        image: cardSortResultImage,
        alt: 'Card sorting result visualization',
        eyebrow: 'Structure',
        accent: 'secondary',
      },
      {
        title: 'Transcripts and live reactions',
        summary:
          'Transcripts added the “why” behind the grouping patterns, capturing uncertainty, explanations, and candid website feedback that the card sort alone could not reveal.',
        image: transcriptImage,
        alt: 'Transcript screenshot',
        eyebrow: 'Qualitative',
        accent: 'accent',
      },
    ],
  },
  analysisSteps: [
    {
      number: '3.1',
      title: 'Dendrogram: find the strongest merges',
      intro:
        'The dendrogram helped visualize which content items participants repeatedly grouped together and how strongly those groupings held up. Lower branch connections suggested stronger user agreement, while higher merges pointed to weaker or broader relationships.',
      sections: [
        {
          heading: 'What the team found',
          body:
            'At roughly 40% agreement, the structure suggested four major sections: Events & Sharing Spaces, Application & FAQ, Faculty & Accomplishments, and Career & Alumni Services. Some sections merged cleanly, while others stayed fuzzier, signaling where labels or boundaries needed refinement.',
        },
        {
          heading: 'Why it mattered',
          body:
            'This view helped separate content that clearly belonged together from content that users treated more ambiguously. That distinction shaped which areas could become primary navigation anchors and which needed clearer framing.',
        },
      ],
      images: [
        { src: dendrogramImage, caption: 'Dendrogram analysis view' },
      ],
    },
    {
      number: '3.2',
      title: 'Similarity matrix: inspect repeated pairings',
      intro:
        'The similarity matrix made it easier to spot item-to-item relationships that kept recurring across participants. Darker intersections highlighted combinations users consistently saw as related.',
      sections: [
        {
          heading: 'Notable patterns',
          body:
            'Job-related items clustered tightly, suggesting users think about internships, postings, and career support as part of a unified career-resources area. International application questions also paired strongly, which pointed toward a dedicated admissions pathway for that audience.',
        },
        {
          heading: 'Design implication',
          body:
            'The matrix helped the team identify where content could be grouped with high confidence and where the site should avoid splitting closely related tasks across separate sections.',
        },
      ],
      images: [
        { src: similarityImage, caption: 'Similarity matrix' },
      ],
      imageLeft: true,
    },
    {
      number: '3.3',
      title: '3D cluster: look at broader conceptual neighborhoods',
      intro:
        'The 3D cluster model offered a more spatial view of the card-sort relationships. Instead of just looking at pairs, it helped show how larger thematic clusters formed across the content set.',
      sections: [
        {
          heading: 'Cluster outcome',
          body:
            'Six broad groups emerged: External Career Sources, Career Resources for Students & Alumni, Program Overview, Admission & Application, Research Spaces, and Newsletter & Social Media. Career-related content broke into two distinct zones, while research and space-related items stayed more diffuse.',
        },
        {
          heading: 'What that suggested',
          body:
            'The broader spatial grouping reinforced that some content areas were conceptually tight while others needed clearer naming and scope. It also hinted that certain topics should be linked, but not necessarily collapsed into the same navigation bucket.',
        },
      ],
      images: [
        { src: clusterImage, caption: '3D cluster visualization' },
      ],
    },
  ],
  quotesSection: {
    eyebrow: 'Direct Quotes',
    heading: 'What people said about the site experience',
    description:
      'The post-sort website trial surfaced repeated comments about visual design, typography, and a lack ' +
      'of interaction feedback. These reactions widened the scope from information architecture into a ' +
      'fuller experience critique.',
    quotes: [
      '“The fonts feel kind of clunky ... it would be nice if there was some visual feedback.” - P10',
      '“If someone was looking into the program, I’d send them here, but don’t expect anything too exciting.” - P11',
      '“It’s called interactive media, so I feel like the website should be a lot nicer than just a website with images.” - P2',
      '“Somewhat dissatisfied ... the fonts are not nice.” - P5 / P2',
      '“I would have liked if hovering could darken or create a similar effect on the buttons.” - P5',
      '“It was just very stagnant. The website seemed very stagnant.” - P2',
    ],
  },
  recommendationsDivider: {
    label: 'Recommendations',
  },
  recommendationsSection: {
    heading: 'Suggestions for the new site structure',
    description:
      'The recommendations below came from patterns that appeared repeatedly across the card sort, ' +
      'similarity views, transcripts, and usability feedback. They shaped both the information ' +
      'architecture and the broader redesign direction.',
    items: [
      {
        title: 'Make career and application pathways more prominent',
        body:
          'Users showed strong agreement around career-focused content and “how to apply” information. Those tasks should be surfaced quickly instead of being buried inside broader site sections.',
        bullets: [
          'Prioritize opportunities, internships, and apply-related content in prominent navigation areas.',
          'Keep job support and listings closely connected so they read as one resource family.',
          'Use labels that reflect user task language rather than internal program terminology.',
        ],
        image: recommendationImage,
        alt: 'Navigation recommendation mockup',
      },
      {
        title: 'Clarify research, facilities, and space-related terminology',
        body:
          'Research and facility-related items did not receive the same clean, repeated grouping as career content. That points to overlap in meaning and a need for more deliberate naming.',
        bullets: [
          'Reduce overlap between “research,” “spaces,” and “facilities” labels.',
          'Group class-location and meeting-space information in a way that matches user expectations.',
          'Test merged or simplified labels before finalizing the IA.',
        ],
        image: similarityImage,
        alt: 'Similarity matrix supporting facility and research grouping decisions',
        imageLeft: true,
      },
      {
        title: 'Preserve FAQ as a clearly independent section',
        body:
          'Participants consistently recognized FAQ-style content as its own destination, which suggests it should remain easy to find rather than being buried under a larger section.',
        bullets: [
          'Keep FAQ accessible as a standalone help destination.',
          'Use it to support multiple user journeys, especially admissions and program questions.',
          'Avoid hiding common answers inside unrelated navigation branches.',
        ],
        image: dendrogramImage,
        alt: 'Dendrogram supporting FAQ grouping decisions',
      },
      {
        title: 'Update the visual tone so the site feels interactive',
        body:
          'The research exposed more than information-architecture issues. Participants expected the site for an Interactive Media program to feel more responsive, polished, and alive.',
        bullets: [
          'Refresh typography so the site feels more contemporary and intentional.',
          'Add hover and feedback states so navigation feels interactive rather than static.',
          'Let the visual system reinforce the program’s identity instead of underselling it.',
        ],
        image: heroImage,
        alt: 'Homepage redesign concept',
        imageLeft: true,
      },
    ],
  },
  prototype: {
    eyebrow: 'Prototype Direction',
    heading: 'Homepage redesign based on the research',
    description:
      'The findings were not left at the recommendation stage. They were also translated into a homepage ' +
      'redesign concept intended to make the program feel clearer, more contemporary, and more aligned ' +
      'with the expectations users expressed during research.',
    image: heroImage,
    imageAlt: 'UM Interactive Media homepage redesign',
    cta: {
      label: 'View Figma Prototype',
      href:
        'https://www.figma.com/proto/AcyouT9r0TykYkDNRtzbQY/University-of-Miami-Interactive-Website?node-id=1-3&t=PCyj4bYEeef8PQUi-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A3',
    },
  },
  reflection: {
    eyebrow: 'Reflection',
    heading: 'What the project reinforced',
    paragraphs: [
      'This study showed how hard it can be to synthesize multiple kinds of research evidence into one ' +
        'clear design direction. Survey scores, open card-sort structures, transcripts, and visual analysis ' +
        'methods each told a slightly different story, and the real work was finding where those stories ' +
        'overlapped.',
      'Another major lesson was the importance of standardizing open card-sort output without flattening ' +
        'away nuance. People created their own labels and category boundaries, so building a usable ' +
        'information architecture meant carefully comparing similar groupings, clarifying language, and ' +
        'translating messy raw input into something coherent enough to design with.',
      'The project strengthened my ability to move from research collection to synthesis and then into ' +
        'concrete IA and interface recommendations. It also reinforced that navigation problems are often ' +
        'connected to larger questions of tone, clarity, and perceived quality.',
    ],
  },
};

export default umCardSortingStudyContent;
