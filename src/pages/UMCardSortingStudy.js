import ProjectHero from '../components/ProjectHero';
import SectionDivider from '../components/SectionDivider';
import TextRichStepTextFocused from '../components/TextRichStepTextFocused';
import ResearchInsightCard from '../components/ResearchInsightCard';
import RecommendationSpotlight from '../components/RecommendationSpotlight';

import heroImage from '../assets/images/um-card-sorting/Untitled-1_2.png';
import teamVivian from '../assets/images/um-card-sorting/image-2.png';
import teamNeon from '../assets/images/um-card-sorting/image-4.png';
import teamMia from '../assets/images/um-card-sorting/image-3.png';
import recruitIcon from '../assets/images/um-card-sorting/icon-Recruit-Participants.png';
import conductIcon from '../assets/images/um-card-sorting/icon-Analyze-Data.png';
import analyzeIcon from '../assets/images/um-card-sorting/icon-Compile-report.png';
import reportIcon from '../assets/images/um-card-sorting/icon-Conduct-Research.png';
import preSortImage from '../assets/images/um-card-sorting/persortQ.jpg';
import cardSortImage1 from '../assets/images/um-card-sorting/cardSort1.jpg';
import cardSortImage2 from '../assets/images/um-card-sorting/7f4c8867e9be91077cfe17cb90ad38df.jpg';
import cardSortImage3 from '../assets/images/um-card-sorting/cardSort3.jpg';
import postSortImage from '../assets/images/um-card-sorting/postsortQ.jpg';
import surveyResultImage from '../assets/images/um-card-sorting/Screenshot-2025-02-27-012706.jpg';
import cardSortResultImage from '../assets/images/um-card-sorting/Screenshot-2025-02-27-012837.jpg';
import transcriptImage from '../assets/images/um-card-sorting/Screenshot-2025-02-27-013044.jpg';
import dendrogramImage from '../assets/images/um-card-sorting/Screenshot-2025-02-27-015009.jpg';
import similarityImage from '../assets/images/um-card-sorting/similarity-matrix-1.png';
import clusterImage from '../assets/images/um-card-sorting/Untitled-3_1.png';
import recommendationImage from '../assets/images/um-card-sorting/Screenshot-2025-02-27-023649.jpg';

const snapshotStats = [
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
];

const team = [
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
];

const timeline = [
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
];

const participantGroups = [
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
];

const researchSteps = [
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
];

const evidenceCards = [
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
];

const analysisSteps = [
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
];

const quotes = [
  '“The fonts feel kind of clunky ... it would be nice if there was some visual feedback.” - P10',
  '“If someone was looking into the program, I’d send them here, but don’t expect anything too exciting.” - P11',
  '“It’s called interactive media, so I feel like the website should be a lot nicer than just a website with images.” - P2',
  '“Somewhat dissatisfied ... the fonts are not nice.” - P5 / P2',
  '“I would have liked if hovering could darken or create a similar effect on the buttons.” - P5',
  '“It was just very stagnant. The website seemed very stagnant.” - P2',
];

const recommendations = [
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
];

function UMCardSortingStudy() {
  return (
    <div className="min-h-screen bg-base-200">
      <ProjectHero
        title="Card Sorting Study for UM Interactive Media Site"
        image={heroImage}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <div>
            <div className="badge badge-primary badge-outline mb-4">UX Research Case Study</div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Rebuilding a university site structure around user mental models
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-base-content/75">
              This project used an online open card sort to understand how people naturally grouped and named
              content for the UM Interactive Media website. The goal was to redesign navigation around user
              expectations instead of preserving a structure that already felt confusing and hard to scan.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              The result was a context-rich research study that combined questionnaire data, open sorting,
              interview recordings, clustering analysis, direct quotes, and a homepage redesign direction.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#methodology" className="btn btn-primary">Jump to Methodology</a>
              <a href="#analysis" className="btn btn-outline">Jump to Analysis</a>
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
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
          <div className="space-y-5">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Project Context</p>
              <h2 className="mt-3 text-3xl font-bold">Why this study was needed</h2>
            </div>
            <p className="leading-relaxed text-base-content/75">
              The existing UM Interactive Media website did not match how users naturally grouped and labeled
              information. That mismatch made it harder to find content and weakened the overall usability of
              the site, especially for people arriving without prior knowledge of the program.
            </p>
            <p className="leading-relaxed text-base-content/75">
              The objective was to uncover a more intuitive information architecture by observing how users
              categorized content on their own, then using those patterns to guide navigation redesign.
            </p>
          </div>

          <div className="card border border-base-300 bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl">Research Goal</h2>
              <p className="leading-relaxed text-base-content/75">
                Design a more intuitive navigation structure for the UM Interactive Media website by aligning
                site categories and labels with user expectations, task language, and real browsing behavior.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {team.map((member) => (
            <article
              key={member.name}
              className="overflow-hidden rounded-[1.75rem] border border-base-300 bg-base-100 shadow-xl"
            >
              <div className="aspect-square bg-base-200 p-6">
                <img src={member.image} alt={member.name} className="h-full w-full object-contain" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.25em] text-base-content/55">{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div id="methodology" className="mx-auto max-w-6xl px-6">
        <SectionDivider label="Methodology" />
      </div>

      <section className="bg-base-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-bold">Research methodology and timeline</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              The study used an online open card sort to reveal how users naturally organized website content.
              By recruiting current UM students, students from other schools, and prospective students, the
              research captured a broader range of expectations than the internal team alone could provide.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {timeline.map((phase) => (
              <article
                key={phase.title}
                className="rounded-[1.5rem] border border-base-300 bg-base-200 p-6 shadow-lg"
              >
                <img src={phase.image} alt={phase.title} className="h-16 w-16 object-contain" />
                <h3 className="mt-5 text-xl font-semibold">{phase.title}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.25em] text-base-content/55">{phase.dates}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="rounded-[2rem] border border-base-300 bg-base-100 p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Participant Strategy</p>
            <h2 className="mt-3 text-3xl font-bold">Recruiting across three perspectives</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              The team intentionally recruited from three groups so the final information architecture would
              reflect both experienced users and people encountering the site more freshly.
            </p>
          </div>

          <div className="grid gap-4">
            {participantGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-[1.5rem] border border-base-300 bg-base-100 p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold">{group.title}</h3>
                <p className="mt-3 leading-relaxed text-base-content/72">{group.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        {researchSteps.map((step) => (
          <TextRichStepTextFocused
            key={step.number}
            number={step.number}
            title={step.title}
            intro={step.intro}
            sections={step.sections}
            bullets={step.bullets}
            images={step.images}
            imageLeft={step.imageLeft}
          />
        ))}
      </section>

      <div id="analysis" className="mx-auto max-w-6xl px-6">
        <SectionDivider label="Evidence & Analysis" />
      </div>

      <section className="bg-base-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-bold">Three layers of evidence</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              The analysis combined quantitative, structural, and qualitative evidence. Together, these views
              helped the team move beyond isolated observations and build a more defensible redesign direction.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {evidenceCards.map((card) => (
              <ResearchInsightCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        {analysisSteps.map((step) => (
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
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Direct Quotes</p>
            <h2 className="mt-3 text-4xl font-bold">What people said about the site experience</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              The post-sort website trial surfaced repeated comments about visual design, typography, and a lack
              of interaction feedback. These reactions widened the scope from information architecture into a
              fuller experience critique.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {quotes.map((quote) => (
              <blockquote
                key={quote}
                className="rounded-[1.5rem] border border-base-300 bg-base-200 p-6 text-sm leading-relaxed shadow-lg"
              >
                {quote}
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider label="Recommendations" />
      </div>

      <section className="mx-auto max-w-6xl space-y-12 px-6 py-16">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold">Suggestions for the new site structure</h2>
          <p className="mt-5 leading-relaxed text-base-content/75">
            The recommendations below came from patterns that appeared repeatedly across the card sort,
            similarity views, transcripts, and usability feedback. They shaped both the information
            architecture and the broader redesign direction.
          </p>
        </div>

        {recommendations.map((recommendation) => (
          <RecommendationSpotlight key={recommendation.title} {...recommendation} />
        ))}
      </section>

      <section className="bg-base-100">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="overflow-hidden rounded-[2rem] border border-base-300 shadow-2xl">
            <img src={heroImage} alt="UM Interactive Media homepage redesign" className="w-full object-cover" />
          </div>

          <div className="rounded-[2rem] border border-base-300 bg-base-200 p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Prototype Direction</p>
            <h2 className="mt-3 text-3xl font-bold">Homepage redesign based on the research</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              The findings were not left at the recommendation stage. They were also translated into a homepage
              redesign concept intended to make the program feel clearer, more contemporary, and more aligned
              with the expectations users expressed during research.
            </p>
            <a
              href="https://www.figma.com/proto/AcyouT9r0TykYkDNRtzbQY/University-of-Miami-Interactive-Website?node-id=1-3&t=PCyj4bYEeef8PQUi-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A3"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary mt-8"
            >
              View Figma Prototype
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-[2.25rem] border border-base-300 bg-gradient-to-br from-base-100 via-base-200 to-base-100 p-8 shadow-2xl md:p-12">
          <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Reflection</p>
          <h2 className="mt-3 text-4xl font-bold">What the project reinforced</h2>
          <p className="mt-6 leading-relaxed text-base-content/75">
            This study showed how hard it can be to synthesize multiple kinds of research evidence into one
            clear design direction. Survey scores, open card-sort structures, transcripts, and visual analysis
            methods each told a slightly different story, and the real work was finding where those stories
            overlapped.
          </p>
          <p className="mt-4 leading-relaxed text-base-content/75">
            Another major lesson was the importance of standardizing open card-sort output without flattening
            away nuance. People created their own labels and category boundaries, so building a usable
            information architecture meant carefully comparing similar groupings, clarifying language, and
            translating messy raw input into something coherent enough to design with.
          </p>
          <p className="mt-4 leading-relaxed text-base-content/75">
            The project strengthened my ability to move from research collection to synthesis and then into
            concrete IA and interface recommendations. It also reinforced that navigation problems are often
            connected to larger questions of tone, clarity, and perceived quality.
          </p>
        </div>
      </section>
    </div>
  );
}

export default UMCardSortingStudy;
