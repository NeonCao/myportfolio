import ProjectHero from '../components/ProjectHero';
import SectionDivider from '../components/SectionDivider';
import TextRichStepTextFocused from '../components/TextRichStepTextFocused';
import ResearchInsightCard from '../components/ResearchInsightCard';
import PiggyBankPrototypePhone from '../components/PiggyBankPrototypePhone';

import heroImage from '../assets/images/piggy-bank/PIGGY_Hero.png';
import research1 from '../assets/images/piggy-bank/PiggyBank_RunThough_1_P1.jpg';
import research2 from '../assets/images/piggy-bank/PiggyBank_RunThough_1_P2.jpg';
import research3 from '../assets/images/piggy-bank/PiggyBank_RunThough_1_P3.jpg';
import research4 from '../assets/images/piggy-bank/PiggyBank_RunThough_1_P4.jpg';
import paper1 from '../assets/images/piggy-bank/PiggyBank_RunThough_2_P1.jpg';
import paper2 from '../assets/images/piggy-bank/PiggyBank_RunThough_2_P2.jpg';
import paper3 from '../assets/images/piggy-bank/PiggyBank_RunThough_2_P3.jpg';
import paper4 from '../assets/images/piggy-bank/PiggyBank_RunThough_2_P4.jpg';
import paper5 from '../assets/images/piggy-bank/PiggyBank_RunThough_2_P5.jpg';
import paper6 from '../assets/images/piggy-bank/PiggyBank_RunThough_2_P6.jpg';
import hifiImage from '../assets/images/piggy-bank/PiggyBank_RunThough_3_P1.jpg';
import testingImage from '../assets/images/piggy-bank/PiggyBank_RunThough_4_P1.png';
import iteration1 from '../assets/images/piggy-bank/PiggyBank_RunThough_5_P1.jpg';
import iteration2 from '../assets/images/piggy-bank/PiggyBank_RunThough_5_P2.jpg';
import iteration3 from '../assets/images/piggy-bank/PiggyBank_RunThough_5_P3.jpg';
import iteration4 from '../assets/images/piggy-bank/PiggyBank_RunThough_5_P4.jpg';
import challenge1 from '../assets/images/piggy-bank/PiggyBank_Challenges_P1.png';
import challenge2 from '../assets/images/piggy-bank/PiggyBank_Challenges_P2.png';
import challenge3 from '../assets/images/piggy-bank/PiggyBank_Challenges_P3.png';
import reflectionImage from '../assets/images/piggy-bank/PiggyBank_Conclusion_P1.jpg';

const snapshotStats = [
  {
    label: 'Duration',
    value: '12 Weeks',
    description: 'Research, wireframing, prototyping, testing, and iteration over a semester-long timeline.',
  },
  {
    label: 'Team',
    value: '2',
    description: 'A two-person collaboration combining research, synthesis, and visual design work.',
  },
  {
    label: 'Audience',
    value: '6-14',
    description: 'Children and their parents, designed as a dual-interface family learning system.',
  },
  {
    label: 'Roles',
    value: 'UX/UI',
    description: 'I contributed as both a UI/UX designer and a UX research partner on the project.',
  },
];

const principles = [
  {
    title: 'Family-centered financial learning',
    summary:
      'The app was built around shared use, giving parents a way to guide while allowing children to explore spending, saving, and goals through an interface that still felt approachable.',
    image: heroImage,
    alt: 'Interactive Piggy Bank hero mockup',
    eyebrow: 'Core Idea',
    accent: 'primary',
  },
  {
    title: 'Goal-setting as a teaching tool',
    summary:
      'Research showed that saving toward visible goals helps children connect money habits with patience, planning, and progress instead of treating money as something abstract.',
    image: research3,
    alt: 'Goal-setting research artifact',
    eyebrow: 'Insight',
    accent: 'secondary',
  },
  {
    title: 'Track the small purchases too',
    summary:
      'Families described everyday spending as easy to lose track of, which pushed the design toward lightweight logging and clearer visibility into where money was going.',
    image: research4,
    alt: 'Expense tracking research artifact',
    eyebrow: 'Need',
    accent: 'accent',
  },
];

const processSteps = [
  {
    number: 1,
    title: 'Research how families actually teach money habits',
    intro:
      'The project began with surveys and interviews focused on both parents and children, since the app needed to support a shared learning dynamic rather than a single-user workflow.',
    sections: [
      {
        heading: 'What the research looked for',
        body:
          'The team studied saving behavior, spending habits, parental involvement, and the small day-to-day purchases that often escape attention. Affinity mapping and empathy work helped organize those findings into clearer design directions.',
      },
      {
        heading: 'What surfaced',
        body:
          'Three themes stood out: parents wanted to stay involved, children benefited from visible goals, and families needed easier ways to talk about small spending choices before they became invisible habits.',
      },
    ],
    bullets: [
      'Surveys gave quantitative context around financial habits and frustrations.',
      'Interviews added personal stories and revealed family teaching styles.',
      'Affinity and empathy diagrams helped turn raw responses into design guidance.',
    ],
    images: [
      { src: research1, caption: 'Research artifact 1' },
      { src: research2, caption: 'Research artifact 2' },
      { src: research3, caption: 'Research artifact 3' },
      { src: research4, caption: 'Research artifact 4' },
    ],
  },
  {
    number: 2,
    title: 'Translate insights into paper wireframes and rough flows',
    intro:
      'With the core needs identified, the next step was to sketch how a dual-interface system could work. Paper wireframes made it easier to move quickly while testing structure, content grouping, and interaction ideas.',
    sections: [
      {
        heading: 'Why paper mattered',
        body:
          'Because the product had to support both children and parents, the early design stage was as much about organizing two related experiences as it was about making individual screens. Sketching made it easier to compare alternatives without overcommitting too early.',
      },
      {
        heading: 'What the wireframes focused on',
        body:
          'The low-fidelity concepts centered on shared goals, spending logs, progress feedback, and clear separation between the child-facing and parent-facing views.',
      },
    ],
    images: [
      { src: paper1, caption: 'Paper wireframe 1' },
      { src: paper2, caption: 'Paper wireframe 2' },
      { src: paper3, caption: 'Paper wireframe 3' },
      { src: paper4, caption: 'Paper wireframe 4' },
      { src: paper5, caption: 'Paper wireframe 5' },
      { src: paper6, caption: 'Paper wireframe 6' },
    ],
    imageLeft: true,
  },
  {
    number: 3,
    title: 'Build a high-fidelity prototype around shared financial conversations',
    intro:
      'After refining the structure, the project moved into digital high-fidelity wireframes and a clickable prototype. This phase turned the earlier research themes into a more realistic product experience that could be tested with users.',
    sections: [
      {
        heading: 'What the prototype emphasized',
        body:
          'The visual system leaned on clarity and encouragement instead of complexity. Progress tracking, savings goals, and family-facing interaction points were designed to feel understandable at a glance.',
      },
      {
        heading: 'Why fidelity mattered here',
        body:
          'Because the app depended on trust and communication between parents and children, the prototype needed to simulate enough realism that people could react to the experience instead of only the concept.',
      },
    ],
    images: [
      { src: hifiImage, caption: 'High-fidelity prototype' },
    ],
  },
  {
    number: 4,
    title: 'Use testing to uncover confusion and trim complexity',
    intro:
      'User testing exposed the places where the first version was trying to do too much or explain too little. Direct feedback showed that some flows were unclear, some features felt too complex, and some functions were harder to understand than expected.',
    sections: [
      {
        heading: 'What the team learned',
        body:
          'The first version needed clearer navigation and stronger prioritization. The testing phase made it obvious that even useful features can become a burden if the structure around them is not simple enough for both adults and children to follow.',
      },
      {
        heading: 'How the findings were used',
        body:
          'Problems were grouped, prioritized by impact, and turned into concrete revisions. This helped the next iteration focus on removing friction rather than just adding more functionality.',
      },
    ],
    images: [
      { src: testingImage, caption: 'User testing and issue tracking' },
    ],
    imageLeft: true,
  },
  {
    number: 5,
    title: 'Iterate until the experience feels more intuitive',
    intro:
      'The final stage focused on refining screens, simplifying interactions, and tightening the app’s visual communication. Each round of change was driven by earlier feedback, then checked again to make sure it solved the right problem.',
    sections: [
      {
        heading: 'What improved',
        body:
          'The design became more focused, more legible, and more supportive of family use. Dashboard clarity improved, interaction patterns became easier to read, and shared saving and spending features felt more intentional.',
      },
      {
        heading: 'Why iteration mattered',
        body:
          'This phase reinforced that the product worked best when it reduced cognitive load and supported conversation, rather than trying to prove how many features it could include.',
      },
    ],
    images: [
      { src: iteration1, caption: 'Iteration screen 1' },
      { src: iteration2, caption: 'Iteration screen 2' },
      { src: iteration3, caption: 'Iteration screen 3' },
      { src: iteration4, caption: 'Iteration screen 4' },
    ],
  },
];

const challengeCards = [
  {
    title: 'Time constraints during research',
    summary:
      'The team had just over a week to interview nearly ten participants, organize transcripts, and extract meaningful insight. That compressed schedule raised the stakes on prioritization and research efficiency.',
    image: challenge1,
    alt: 'Time constraint challenge graphic',
    eyebrow: 'Challenge 1',
    accent: 'primary',
  },
  {
    title: 'Uneven Figma familiarity within the team',
    summary:
      'One teammate was still learning Figma components and grouping workflows, so part of the project included tool onboarding and collaboration support while the wireframes were being built.',
    image: challenge2,
    alt: 'Figma familiarity challenge graphic',
    eyebrow: 'Challenge 2',
    accent: 'secondary',
  },
  {
    title: 'Aligning different strengths and ideas',
    summary:
      'The project benefited from complementary strengths, but those same differences sometimes created friction in decision-making. Reaching alignment took active discussion and tradeoff evaluation.',
    image: challenge3,
    alt: 'Team alignment challenge graphic',
    eyebrow: 'Challenge 3',
    accent: 'accent',
  },
];

function InteractivePiggyBank() {
  return (
    <div className="min-h-screen bg-base-200">
      <ProjectHero title="Interactive Piggy Bank" image={heroImage} />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <div>
            <div className="badge badge-primary badge-outline mb-4">Family Finance UX</div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Designing a dual-interface app that turns money habits into family learning
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-base-content/75">
              Interactive Piggy Bank is a family-focused financial education app for children and their parents.
              The concept combines savings goals, spending awareness, and parental guidance in a shared system
              designed to make money conversations more approachable and more consistent at home.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              The project grew out of research into real family habits and evolved through wireframing,
              prototyping, testing, and iteration. The result is a product concept built around engagement,
              simplicity, and collaborative learning rather than one-way financial tracking.
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
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Overview</p>
            <h2 className="mt-3 text-4xl font-bold">A playful app built around real financial behavior</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              The project aimed to help children build smart money habits while also giving parents practical
              ways to guide and support that learning. Instead of treating finance as a purely adult-oriented
              dashboard problem, the design framed it as a shared educational experience.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              The app concept centered on dual interfaces, goal-oriented saving, spending visibility, and
              conversation-based learning. Research, testing, and iteration all pushed the product toward
              clarity, encouragement, and family participation.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {principles.map((card) => (
              <ResearchInsightCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider label="Design Walkthrough" />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-16">
        {processSteps.map((step) => (
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

      <section className="bg-base-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Challenges</p>
            <h2 className="mt-3 text-4xl font-bold">What made the project harder</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              The project moved through real constraints around time, tooling, and teamwork. Those challenges
              affected both pace and process, and they shaped how the team collaborated from research through
              refinement.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {challengeCards.map((card) => (
              <ResearchInsightCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 items-center lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.92fr)]">
          <div className="rounded-[2.25rem] border border-base-300 bg-gradient-to-br from-base-100 via-base-200 to-base-100 p-8 shadow-2xl md:p-12">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Reflection</p>
            <h2 className="mt-3 text-4xl font-bold">What this project taught me about design work</h2>
            <p className="mt-6 leading-relaxed text-base-content/75">
              This was one of my earliest opportunities to work through a full design cycle with another
              person, from problem framing and research to prototypes, testing, and revision. That made the
              project especially valuable because it exposed how much product quality depends on collaboration,
              communication, and iteration rather than only visual execution.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              A major takeaway was learning how complementary strengths can improve a project when the team is
              willing to discuss and negotiate ideas thoughtfully. My teammate’s research and synthesis skills
              balanced my visual design focus, and working through those differences helped create a stronger
              final direction.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              The tight schedule also sharpened my time management and prioritization skills. The project
              reinforced that user-centered design is rarely linear: it is a process of listening, simplifying,
              testing, and refining until the product supports the people it is meant to help.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-base-300 shadow-2xl">
            <img
              src={reflectionImage}
              alt="Interactive Piggy Bank concluding reflection visual"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      <PiggyBankPrototypePhone />
    </div>
  );
}

export default InteractivePiggyBank;
