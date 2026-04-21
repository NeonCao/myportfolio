import ProjectHero from '../components/ProjectHero';
import DemoVideo from '../components/DemoVideo';
import SectionDivider from '../components/SectionDivider';

import heroImg from '../assets/images/overtown/overtown_hero.png';
import longshoremenMuralImage from '../assets/images/overtown/LongShoreMen_Rebuild_Mural.png';
import longshoremenSceneImage from '../assets/images/overtown/LongShoreMen_Rebuild_Scene.png';
import familyTreeMuralImage from '../assets/images/overtown/FamilyTree_Rebuild_Mural.png';
import familyTreeSceneImage from '../assets/images/overtown/FamilyTree_Rebuild_Scene.png';
import gameChangersMuralImage from '../assets/images/overtown/GameChangers_Rebuild_Mural.png';
import gameChangersSceneImage from '../assets/images/overtown/GameChangers_Rebuild_Scene.png';
import overtownHubSceneImage from '../assets/images/overtown/Overtown_Rebuild_Scene.png';
import overtownPrizeOne from '../assets/images/overtown/OverTown_Prize_1.png';
import overtownPrizeTwo from '../assets/images/overtown/OverTown_Prize_2.png';

const snapshotStats = [
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
];

const portalExperiences = [
  {
    eyebrow: 'Story Scene 01',
    title: "International Longshoremen's Association, Local 1416",
    summary:
      'This interactive scene brings visitors into the Port of Miami in the 1930s, where objects in the environment reveal how union formation changed wages, working conditions, and the path to middle-class stability for many Black workers in Miami.',
    muralImage: longshoremenMuralImage,
    muralAlt: "International Longshoremen's Association mural in Overtown",
    sceneImage: longshoremenSceneImage,
    sceneAlt: "Rebuilt Longshoremen interactive scene from Telling Overtown Stories",
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
      'The sports scene broadens the exhibit’s tone without losing its community focus. Through playful interaction, users move from visual recognition into a clearer understanding of how athletic achievement, local pride, identity, and representation connect inside the mural’s story.',
    highlights: [
      'Combines mural storytelling with a playful, game-like spatial tone.',
      'Uses interaction to connect global soccer culture with Miami Edison achievement.',
      'Shows how each mural can have its own rhythm while still revealing history step by step.',
    ],
    accent: 'accent',
  },
];

const contributionCards = [
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
];

const processCards = [
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
];

const sourceLinks = [
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
];

const videoCards = [
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
];

const awardBadges = [
  {
    image: overtownPrizeOne,
    alt: 'Overtown project prize badge 1',
  },
  {
    image: overtownPrizeTwo,
    alt: 'Overtown project prize badge 2',
  },
];

const badgeClasses = {
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
};

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

function PortalExperienceCard({
  eyebrow,
  title,
  summary,
  context,
  highlights = [],
  muralImage,
  muralAlt,
  sceneImage,
  sceneAlt,
  accent,
}) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 shadow-2xl">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
        <div className="grid gap-4 border-b border-base-300 bg-base-200 p-4 lg:border-b-0 lg:border-r">
          <figure className="space-y-2">
            <img src={muralImage} alt={muralAlt} className="h-full w-full rounded-[1.4rem] object-cover shadow-lg" />
            <figcaption className="text-center text-xs uppercase tracking-[0.24em] text-base-content/50">
              Original Mural
            </figcaption>
          </figure>
          <figure className="space-y-2">
            <img src={sceneImage} alt={sceneAlt} className="h-full w-full rounded-[1.4rem] object-cover shadow-lg" />
            <figcaption className="text-center text-xs uppercase tracking-[0.24em] text-base-content/50">
              Rebuilt Interactive Scene
            </figcaption>
          </figure>
        </div>

        <div className="p-6 md:p-8">
          <div className={`badge badge-outline ${badgeClasses[accent] || badgeClasses.primary}`}>{eyebrow}</div>
          <h3 className="mt-5 text-3xl font-semibold leading-tight">{title}</h3>
          <p className="mt-4 leading-relaxed text-base-content/72">{summary}</p>
          <p className="mt-4 leading-relaxed text-base-content/72">{context}</p>

          <div className="mt-6 rounded-[1.4rem] bg-base-200 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-base-content/45">What This Scene Adds</p>
            <ul className="mt-4 space-y-3 leading-relaxed text-base-content/72">
              {highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

function AwardBadgeCard({ image, alt }) {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-neutral p-3 text-neutral-content shadow-xl">
      <div className="flex min-h-[12rem] items-center justify-center rounded-[1.2rem] bg-black/60 p-3">
        <img src={image} alt={alt} className="max-h-[13rem] w-full object-contain" loading="lazy" />
      </div>
    </article>
  );
}

function TellingOvertownStories() {
  return (
    <div className="min-h-screen bg-base-200">
      <ProjectHero
        title="Telling Overtown Stories, Saying Their Names"
        image={heroImg}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <div>
            <div className="badge badge-primary badge-outline mb-4">Community-Centered VR Storytelling Exhibition</div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Turning Overtown&apos;s public murals into interactive story scenes
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-base-content/75">
              Telling Overtown Stories, Saying Their Names is an immersive virtual exhibit developed in the
              University of Miami&apos;s Collaborative Innovation Lab with Miami MoCAAD. The project reimagines
              murals in historic Overtown as gamified interactive scenes, giving audiences a way to reveal the
              history behind each artwork through exploration, object interaction, and guided storytelling.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              Each mural was transformed from a static image into a dynamic storyline. Users interact with objects
              that played critical roles in the history, hear how those moments changed the larger story, and uncover
              the mural&apos;s meaning step by step instead of receiving it as a single block of information.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://verse.museum.miamimocaad.org/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                Explore the Experience
              </a>
              <a href="#my-role" className="btn btn-outline">
                See My Contribution
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
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.28em] text-base-content/50">Recognition</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {awardBadges.map((badge) => (
                  <AwardBadgeCard key={badge.alt} {...badge} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-center">
          <div className="rounded-[2.25rem] border border-base-300 bg-gradient-to-br from-base-100 via-base-200 to-base-100 p-8 shadow-2xl md:p-12">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Why This Project Exists</p>
            <h2 className="mt-3 text-4xl font-bold">A digital format for stories that deserve to travel farther</h2>
            <p className="mt-6 leading-relaxed text-base-content/75">
              The University of Miami reporting around the project describes Overtown as a neighborhood with deep
              cultural significance that is still unfamiliar to many people outside it. The experience responds to
              that gap by using VR as a form of guided historical access: not as spectacle for its own sake, but as
              a way to help more people actively uncover the context surrounding the murals.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              Miami MoCAAD&apos;s own project description also frames the work as a blend of art, history, and
              technology. That combination is what makes the project strong. It treats murals as more than surfaces
              to be viewed; they become interactive narrative systems where meaningful objects, audio, and spatial
              cues gradually reveal labor history, civic life, sports culture, and the living resilience of Overtown.
            </p>
          </div>

          <div className="stats stats-vertical border border-base-300 bg-base-200 shadow-xl">
            <div className="stat">
              <div className="stat-title">Neighborhood Focus</div>
              <div className="stat-value text-primary">Overtown</div>
              <div className="stat-desc">Historic Black Miami community often called the Harlem of the South</div>
            </div>
            <div className="stat">
              <div className="stat-title">Core Interaction</div>
              <div className="stat-value">Object-Based</div>
              <div className="stat-desc">Users interact with scene objects to unlock story moments</div>
            </div>
            <div className="stat">
              <div className="stat-title">Public Launch</div>
              <div className="stat-value text-secondary">Soul Basel</div>
              <div className="stat-desc">Headsets were showcased during Miami MoCAAD&apos;s anniversary event</div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider label="Three Murals, Three Interactive Stories" />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.92fr)] lg:items-center">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-bold">Each environment turns a mural into a step-by-step storyline</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              The public-facing article about the project explains that users begin in a virtual Overtown, approach
              the murals, and then step inside them. In our experience, stepping inside is not passive. Each mural
              becomes a game-like scene where users interact with objects, trigger narration, and reveal how key
              historical changes affected the whole story.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              With the rebuilt mural and scene images included here, the design move becomes much easier to read.
              Each experience starts from a public artwork in the neighborhood, then translates that artwork into a
              spatial storyline with its own mood, interaction pattern, and historical learning path.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              These comparisons also show that the digital spaces are not simple copies. They are interpretations:
              the project chooses which objects matter, what order the story should unfold in, and how interaction
              can help viewers truly understand the history behind the murals.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-base-300 shadow-2xl">
            <img
              src={overtownHubSceneImage}
              alt="Rebuilt Overtown hub scene from the Telling Overtown Stories experience"
              className="w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-12 rounded-[1.75rem] border border-base-300 bg-base-100 p-6 shadow-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Reading The Interaction Structure</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.25rem] bg-base-200 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-base-content/45">1. Start at the mural</p>
              <p className="mt-3 leading-relaxed text-base-content/72">
                The physical artwork anchors each story in a real public site, keeping the history tied to place
                instead of abstracting it away from the neighborhood.
              </p>
            </div>
            <div className="rounded-[1.25rem] bg-base-200 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-base-content/45">2. Interact with key objects</p>
              <p className="mt-3 leading-relaxed text-base-content/72">
                The virtual scene turns important historical symbols into touchpoints. Users discover the story by
                choosing objects, listening to their meaning, and connecting them to the bigger narrative.
              </p>
            </div>
            <div className="rounded-[1.25rem] bg-base-200 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-base-content/45">3. Reveal the story step by step</p>
              <p className="mt-3 leading-relaxed text-base-content/72">
                History unfolds through a sequence of interactions, changing the mural from a static image into a
                dynamic storyline that viewers can understand through action.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-8">
          {portalExperiences.map((portal) => (
            <PortalExperienceCard key={portal.title} {...portal} />
          ))}
        </div>
      </section>

      <section id="my-role" className="bg-base-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">My Contribution</p>
              <h2 className="mt-3 text-4xl font-bold">Leading development while shaping interactive story scenes</h2>
              <p className="mt-6 leading-relaxed text-base-content/75">
                My role on this project was Development Lead. I handled nearly all of the coding work needed to
                bring the exhibit together, which meant taking the team&apos;s design and research decisions and
                turning them into something navigable, interactive, and ready for public-facing use.
              </p>
              <p className="mt-4 leading-relaxed text-base-content/75">
                My contribution also extended past implementation alone. I participated in about half of the scene
                building, so my work sat at the intersection of engineering and environment production. That made
                the role especially satisfying: I was not only wiring the experience together technically, but also
                helping decide how visitors would move through the scene, what objects they would notice, and how
                each interaction would reveal another part of the history.
              </p>
              <p className="mt-4 leading-relaxed text-base-content/75">
                Because the project was collaborative and community-oriented, the job was not just &quot;make it
                run.&quot; It was making sure the experience felt stable, respectful, and clear enough that the
                stories remained the center of attention.
              </p>
            </div>

            <div className="grid gap-5">
              {contributionCards.map((card) => (
                <InsightCard key={card.title} {...card} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider label="Process and Collaboration" />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {processCards.map((card) => (
            <InsightCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-8 text-3xl font-bold">Videos</h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {videoCards.map((video) => (
              <DemoVideo key={video.title} {...video} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
          <div className="rounded-[2.25rem] border border-base-300 bg-gradient-to-br from-base-100 via-base-200 to-base-100 p-8 shadow-2xl md:p-12">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Outcome</p>
            <h2 className="mt-3 text-4xl font-bold">A project built for public learning, not just class critique</h2>
            <p className="mt-6 leading-relaxed text-base-content/75">
              What makes this piece stand out in my portfolio is that it was designed to live in public. The
              experience was launched for community audiences, showcased with headsets in Overtown, and positioned
              as a way for younger audiences and remote visitors to actively learn stories that might otherwise
              stay tied to one physical location.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              The official School of Communication project page also notes that the work received a 2025 Silver
              ADDY. That recognition matters, but the more meaningful outcome is that the project helped extend a
              community storytelling effort into a durable interactive format, where viewers could uncover history
              through movement, objects, and listening instead of only looking.
            </p>
          </div>

          <div className="rounded-[2rem] border border-base-300 bg-base-200 p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Source Links</p>
            <h2 className="mt-3 text-3xl font-bold">Read the official context</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              This page is grounded in the official project materials, the University of Miami coverage, and the
              public exhibition framing around Saying Their Names.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {sourceLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TellingOvertownStories;
