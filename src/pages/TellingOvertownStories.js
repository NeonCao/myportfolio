import ProjectHero from '../components/ProjectHero';
import DemoVideo from '../components/DemoVideo';
import SectionDivider from '../components/SectionDivider';

import heroImg from '../assets/images/overtown/overtown_hero.png';
import polysAwardBadge from '../assets/images/overtown/polys-immersive-awards-2025-nominee.svg';
import beaAwardBadge from '../assets/images/overtown/bea-festival-media-arts-2026-winner.svg';

const snapshotStats = [
  {
    label: 'Role',
    value: 'Development Lead',
    description:
      'I led the implementation work for the experience and carried nearly all of the coding through to the finish line.',
  },
  {
    label: 'Format',
    value: 'VR Exhibit',
    description:
      'The project turns public murals into explorable portals that can be experienced on the web, on laptops, and in headsets.',
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

const portalCards = [
  {
    eyebrow: 'Portal 01',
    title: "International Longshoremen's Association, Local 1416",
    summary:
      'This mural portal brings visitors into the Port of Miami in the 1930s so they can understand how union formation changed wages, work, and the path to middle-class stability for many Black workers in Miami.',
    accent: 'primary',
  },
  {
    eyebrow: 'Portal 02',
    title: 'OVERtown: Our Family Tree',
    summary:
      'This experience centers the former law office of Judge Lawson E. Thomas and uses the mural as a gateway into Overtown family history, civic dignity, and the neighborhood figures who shaped Black public life in Miami.',
    accent: 'secondary',
  },
  {
    eyebrow: 'Portal 03',
    title: 'Overtown Pitch: Game Changers',
    summary:
      'This portal reframes the mural as a street-festival experience tied to Black global soccer stars and the community pride sparked by the Miami Edison Senior High School girls soccer team.',
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
      'My contribution covered almost all of the coding work, which meant translating the team’s research and design intent into an explorable, interactive VR experience.',
  },
  {
    title: 'Shared scene production',
    text:
      'Alongside the implementation work, I also helped build roughly half of the scenes, so my role extended into environmental assembly and spatial storytelling polish.',
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
      'A core goal was making the stories available beyond the physical mural sites, so the final experience was framed as a way to bring Overtown history to audiences who may never visit the neighborhood in person.',
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
    image: polysAwardBadge,
    alt: 'The Polys Immersive Awards 2025 Nominee badge for Saying Their Names',
  },
  {
    image: beaAwardBadge,
    alt: 'BEA Festival of Media Arts 2026 Winner badge',
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

function PortalCard({ eyebrow, title, summary, accent }) {
  return (
    <article className="rounded-[1.75rem] border border-base-300 bg-base-100 p-6 shadow-xl">
      <div className={`badge badge-outline ${badgeClasses[accent] || badgeClasses.primary}`}>{eyebrow}</div>
      <h3 className="mt-5 text-2xl font-semibold leading-tight">{title}</h3>
      <p className="mt-4 leading-relaxed text-base-content/72">{summary}</p>
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
            <div className="badge badge-primary badge-outline mb-4">Community-Centered VR Storytelling</div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Turning Overtown&apos;s public murals into immersive portals for history, memory, and place
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-base-content/75">
              Telling Overtown Stories, Saying Their Names is an immersive virtual exhibit developed in the
              University of Miami&apos;s Collaborative Innovation Lab with Miami MoCAAD. The project reimagines
              murals in historic Overtown as interactive portals, giving audiences a way to move through the
              stories behind the artwork instead of only standing in front of it.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              The official project framing emphasizes accessibility, community memory, and cultural preservation.
              That became the design challenge: build something immersive enough to deepen curiosity, but grounded
              enough to honor the neighborhood, the people represented, and the public-art context the work comes
              from.
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
              that gap by using VR as a form of historical access: not as spectacle for its own sake, but as a way
              to help more people step into the context surrounding the murals.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              Miami MoCAAD&apos;s own project description also frames the work as a blend of art, history, and
              technology. That combination is what makes the project strong. It treats murals as more than surfaces
              to be viewed; they become entry points into labor history, civic life, sports culture, and the living
              resilience of Overtown.
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
              <div className="stat-value">Portal-Based</div>
              <div className="stat-desc">Users walk into murals to uncover deeper historical context</div>
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
        <SectionDivider label="Three Murals, Three Portals" />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold">Each environment expands a mural into a fuller world</h2>
          <p className="mt-5 leading-relaxed text-base-content/75">
            The public-facing article about the project explains that users begin in a virtual Overtown, approach
            the murals, and then step inside them. That structure made the exhibit feel less like a gallery page
            and more like a sequence of interactive historical worlds.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {portalCards.map((card) => (
            <PortalCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section id="my-role" className="bg-base-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">My Contribution</p>
              <h2 className="mt-3 text-4xl font-bold">Leading development while helping shape the virtual spaces</h2>
              <p className="mt-6 leading-relaxed text-base-content/75">
                My role on this project was Development Lead. I handled nearly all of the coding work needed to
                bring the exhibit together, which meant taking the team&apos;s design and research decisions and
                turning them into something navigable, interactive, and ready for public-facing use.
              </p>
              <p className="mt-4 leading-relaxed text-base-content/75">
                My contribution also extended past implementation alone. I participated in about half of the scene
                building, so my work sat at the intersection of engineering and environment production. That made
                the role especially satisfying: I was not only wiring the experience together technically, but also
                helping shape how visitors would move through and feel those historical spaces.
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
              as a way for younger audiences and remote visitors to access stories that might otherwise stay tied to
              one physical location.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              The official School of Communication project page also notes that the work received a 2025 Silver
              ADDY. That recognition matters, but the more meaningful outcome is that the project helped extend a
              community storytelling effort into a durable digital format.
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
