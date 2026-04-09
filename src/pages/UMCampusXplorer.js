import ProjectHero from '../components/ProjectHero';
import BuildStep from '../components/BuildStep';
import SectionDivider from '../components/SectionDivider';

import heroImage from '../assets/images/um-campus-xplorer/UMCR_Hero.jpg';
import arReasonImage from '../assets/images/um-campus-xplorer/UMCR_Hero_2.jpg';
import storyboard1 from '../assets/images/um-campus-xplorer/UMXRP_StoryBoard_P1.png';
import storyboard2 from '../assets/images/um-campus-xplorer/UMXRP_StoryBoard_P2.png';
import storyboard3 from '../assets/images/um-campus-xplorer/UMXRP_StoryBoard_P3.png';
import storyboard4 from '../assets/images/um-campus-xplorer/UMXRP_StoryBoard_P4.png';

const audiences = [
  'Incoming students',
  'Campus visitors and tour groups',
  'Facility staff and event participants',
];

const storyboardSteps = [
  {
    number: 1,
    title: 'Launch Into AR Navigation',
    text: `The app opens directly into an AR camera view. A compact information panel shows latitude, longitude, and current system accuracy, which improves with use. A floating compass helps users stay oriented while moving through campus.`,
    image: storyboard1,
  },
  {
    number: 2,
    title: 'Recognize Buildings In Context',
    text: `Semi-transparent campus building models hover over their real-world counterparts. When a user points the phone at a building, an information panel appears with the building name and extra details that can later be used for room search.`,
    image: storyboard2,
  },
  {
    number: 3,
    title: 'Switch Between Outdoor And Indoor Search',
    text: `The interface supports two search modes. Geolocation Search works like a map app for outdoor destinations. Room Search lets users search for a specific campus room using a building name plus room number, such as "Com 1018".`,
    image: storyboard3,
  },
  {
    number: 4,
    title: 'Guide Users To The Destination',
    text: `After a successful search, the app places an AR pin at the destination and draws a glowing guidance line from the user’s current position to that pin. For room-level search, the pin lands near the room entrance with a rough 2–5 meter accuracy target.`,
    image: storyboard4,
  },
];

const iterationNotes = [
  'Wheel rebuilding: early attempts focused on scripting features from scratch before leaning on third-party packages.',
  'Package trying: different AR and geospatial packages were tested to find the best balance of documentation, support, and future flexibility.',
  'Initial prototype: the earliest version focused only on building-level geolocation and basic marker spawning.',
  'Room search expansion: indoor room search was added using structured JSON data with room names and WGS84 coordinates.',
  'Dual search modes: a switcher interface helped users move between outdoor geolocation and indoor room search.',
  'Visual feedback improvements: brighter emission pins and glowing lines made wayfinding easier to see in AR.',
  'Transparency and interaction: semi-transparent buildings reduced occlusion and made raycast interaction more practical.',
];

function UMCampusXplorer() {
  return (
    <div className="min-h-screen bg-base-200">
      <ProjectHero title="UM Campus Xplorer" image={heroImage} />

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] items-start">
          <div>
            <div className="badge badge-primary badge-outline mb-4">AR Navigation Concept</div>
            <h1 className="text-4xl font-bold md:text-5xl">Augmenting campus wayfinding through AR</h1>
            <p className="mt-6 text-lg leading-relaxed text-base-content/75">
              UM Campus Xplorer is a mobile augmented reality concept built to help students and visitors
              navigate a large university campus more intuitively. Instead of asking people to decode a flat
              map, the app overlays pins, building labels, and direction lines directly onto the real world
              through the phone camera.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://youtu.be/-OsL0Cu7xwg"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                Watch Demo
              </a>
              <a href="#storyboard" className="btn btn-outline">
                Jump to Storyboard
              </a>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Who It Helps</p>
              <div className="flex flex-wrap gap-3 mt-2">
                {audiences.map((audience) => (
                  <span key={audience} className="badge badge-outline h-auto px-4 py-3">
                    {audience}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-base-content/70">
                The core goal was simple: make it easier to find buildings and specific rooms on campus,
                especially when signage is inconsistent or a visitor has no mental map of the area.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">App Description</p>
              <h2 className="mt-3 text-3xl font-bold">Making campus navigation feel spatial instead of abstract</h2>
              <p className="mt-5 leading-relaxed text-base-content/75">
                The app is designed around two everyday frustrations: finding the right building and finding
                the right room once you are there. By placing wayfinding information into an AR view, UM
                Campus Xplorer reduces the jump between map-reading and real-world orientation.
              </p>
              <p className="mt-4 leading-relaxed text-base-content/75">
                Rather than replacing the real environment, the app uses it as the interface itself. That makes
                wayfinding more immediate for new students, tour groups, faculty, and event visitors.
              </p>
            </div>

            <div className="stats stats-vertical shadow-xl bg-base-200">
              <div className="stat">
                <div className="stat-title">Search Modes</div>
                <div className="stat-value text-primary">2</div>
                <div className="stat-desc">Outdoor geolocation and indoor room search</div>
              </div>
              <div className="stat">
                <div className="stat-title">Core Feedback</div>
                <div className="stat-value">AR</div>
                <div className="stat-desc">Pins, labels, glowing paths, and contextual overlays</div>
              </div>
              <div className="stat">
                <div className="stat-title">Primary Goal</div>
                <div className="stat-value text-secondary">Wayfinding</div>
                <div className="stat-desc">Lower confusion in a large and complex campus environment</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="storyboard" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-4">Storyboard: User Flow and Interaction</h2>
        <p className="text-base-content/70 max-w-3xl mb-6 leading-relaxed">
          The app centers on two search modes: geospatial campus navigation for outdoor landmarks and room
          search for indoor destinations. The storyboard below shows how the experience unfolds.
        </p>

        {storyboardSteps.map((step, index) => (
          <BuildStep
            key={step.number}
            number={step.number}
            title={step.title}
            text={step.text}
            images={[{ src: step.image, caption: `Storyboard step ${step.number}` }]}
            imageLeft={index % 2 === 1}
          />
        ))}
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <SectionDivider label="Why AR" />
      </div>

      <section className="bg-base-100 mt-8">
        <div className="max-w-6xl mx-auto px-6 py-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] items-center">
          <div>
            <h2 className="text-3xl font-bold">Why augmented reality makes this useful</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              A traditional campus map can show a destination, but it still asks the user to translate that map
              into the surrounding space. UM Campus Xplorer skips that translation step. Building labels,
              direction lines, and destination markers appear where users are already looking.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              That is what makes AR the right medium here. It keeps people in the real world while still giving
              them digital guidance. The experience is less about visual spectacle and more about reducing
              uncertainty at the moment someone needs help navigating.
            </p>
          </div>
          <div className="overflow-hidden rounded-[2rem] shadow-2xl">
            <img src={arReasonImage} alt="UM Campus Xplorer AR interface" className="w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-3xl">Design Iteration</h2>
              <p className="text-base-content/70 leading-relaxed">
                The project moved through several rounds of technical and interaction refinement, from early
                experimentation to more user-facing usability decisions.
              </p>
              <ul className="space-y-3 text-sm leading-relaxed text-base-content/75 mt-2">
                {iterationNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-3xl">Evaluation</h2>
              <p className="leading-relaxed text-base-content/75">
                Evaluation happened primarily through self-testing on campus, checking whether AR pins landed
                in expected places, whether paths were readable, and whether the search modes behaved clearly in
                motion. Each issue led to another round of revision and testing.
              </p>
              <p className="leading-relaxed text-base-content/75">
                Later, a live classroom demo brought in outside feedback from the instructor and classmates.
                Their comments helped highlight usability and clarity issues that were less obvious during solo
                development, giving the project a stronger final polish.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-8">Demo Video</h2>
          <div className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl" style={{ paddingTop: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/-OsL0Cu7xwg?rel=0&controls=1"
              title="UM Campus Xplorer Demo Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default UMCampusXplorer;
