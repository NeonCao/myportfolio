import ProjectHero from '../components/ProjectHero';
import MixologyExplorer from '../components/MixologyExplorer';

import heroImage from '../assets/images/mixology/MIX_Hero.png';
import posterImage from '../assets/images/mixology/MIX_Blog_step0_1.jpg';
import versionOneImage from '../assets/images/mixology/Screenshot-2025-04-08-021110.jpg';
import versionTwoImage from '../assets/images/mixology/MIX_Blog_step2_1.jpg';
import versionThreeImage from '../assets/images/mixology/MIX_Blog_step3_1.jpg';
import futureOneImage from '../assets/images/mixology/MIX_Blog_step4_1.png';
import futureTwoImage from '../assets/images/mixology/MIX_Blog_step4_2.png';
import futureThreeImage from '../assets/images/mixology/MIX_Blog_step4_3.jpg';
import recapImage from '../assets/images/mixology/MIX_Blog_stepF.jpg';

const highlights = [
  {
    title: 'Poster to Product',
    text: 'The original project started from a real poster hanging at home and turned into a browsable cocktail interface.',
  },
  {
    title: 'Three Iterations',
    text: 'Each version responded to feedback: clearer layout, ingredient search, better icon quality, and onboarding help.',
  },
  {
    title: 'React Rebuild',
    text: 'This portfolio version replaces the old DOM scripting with reusable React components and DaisyUI-driven layout blocks.',
  },
];

const versionCards = [
  {
    eyebrow: 'Version 1',
    title: 'Clickable poster recreation',
    image: versionOneImage,
    text: 'The first pass focused on translating the physical periodic-table poster into a digital grid. It proved the concept, but the experience still felt more like a collection of buttons than a guided tool.',
  },
  {
    eyebrow: 'Version 2',
    title: 'Search, structure, and clearer hierarchy',
    image: versionTwoImage,
    text: 'After user feedback, the project gained ingredient-based search, clearer grouping, more complete data, and a calmer layout that explained why the cocktails were arranged the way they were.',
  },
  {
    eyebrow: 'Version 3',
    title: 'Tutorials and a redrawn icon system',
    image: versionThreeImage,
    text: 'The final Webflow iteration focused on approachability and polish. Tutorial steps reduced confusion, and the custom redrawn vector icons made the grid feel intentional instead of extracted from a poster scan.',
  },
];

function PeriodicTableOfMixology() {
  return (
    <div className="min-h-screen bg-base-200">
      <ProjectHero title="Periodic Table of Mixology" image={heroImage} />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-start">
          <div>
            <div className="badge badge-primary badge-outline mb-4">UX + Frontend Rebuild</div>
            <h1 className="text-4xl font-bold md:text-5xl">
              Rebuilding a cocktail poster into an interactive portfolio project
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-base-content/75">
              This project began as a playful experiment: what if a decorative Periodic Table of Mixology poster
              could become a practical exploration tool? The old version lived in Webflow with hand-written
              JavaScript. This new portfolio version rebuilds the idea in React with DaisyUI, reusable
              components, local assets, and a cleaner interaction model.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#mixology-explorer" className="btn btn-primary">
                Jump to Explorer
              </a>
              <a href="#build-story" className="btn btn-outline">
                Read the Build Story
              </a>
            </div>
          </div>

          <div className="stats stats-vertical shadow-xl bg-base-100 border border-base-300">
            <div className="stat">
              <div className="stat-title">Cocktails Archived</div>
              <div className="stat-value text-primary">58</div>
              <div className="stat-desc">Imported from the older prototype</div>
            </div>
            <div className="stat">
              <div className="stat-title">Project Iterations</div>
              <div className="stat-value">3</div>
              <div className="stat-desc">Before this React portfolio rebuild</div>
            </div>
            <div className="stat">
              <div className="stat-title">Core Interactions</div>
              <div className="stat-value">4</div>
              <div className="stat-desc">Browse, search, mix, and build your own</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div className="overflow-hidden rounded-[2rem] shadow-2xl">
            <img src={posterImage} alt="Periodic Table of Mixology poster" className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Project Background</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Starting with something already loved</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              The concept came from a real cocktail poster that already worked beautifully as wall art, but not as
              a tool. You could admire it, but you could not click, filter, search, or experiment. That gap made
              the project compelling: keep the delight of the original artifact while giving it the usefulness of a
              digital interface.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              In the new portfolio, the project page does not just describe the work. It includes a rebuilt React
              explorer so the case study and the artifact live together in one place.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p className="text-base-content/75">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="build-story" className="bg-base-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Build Story</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              The project evolved through feedback, not just features
            </h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              The most interesting part of this project is how visibly it changed from version to version. Each
              new pass fixed a real usability problem from the last one, which makes it a strong portfolio piece
              for process as much as for visuals.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {versionCards.map((card) => (
              <article key={card.title} className="card bg-base-200 shadow-xl overflow-hidden">
                <figure>
                  <img src={card.image} alt={card.title} className="h-64 w-full object-cover" />
                </figure>
                <div className="card-body">
                  <p className="text-sm uppercase tracking-[0.3em] text-base-content/50">{card.eyebrow}</p>
                  <h3 className="card-title text-2xl">{card.title}</h3>
                  <p className="text-base-content/75">{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="mixology-explorer" className="mx-auto w-full max-w-[96rem] px-6 py-16">
        <MixologyExplorer />
      </section>

      <section className="bg-base-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Next Opportunities</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Where the concept could go next</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              The original blog ended by asking how the tool could keep improving. That still feels right. The
              rebuilt portfolio page makes the current prototype easier to maintain, which opens the door for
              richer filtering, recipe comparisons, and maybe a more deliberate visual legend that leans even
              harder into the “periodic table” metaphor.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="card bg-base-200 shadow-xl overflow-hidden">
              <figure>
                <img src={futureOneImage} alt="Potential future visual for mixology project" className="h-64 w-full object-cover" />
              </figure>
              <div className="card-body">
                <h3 className="card-title">Clearer comparison views</h3>
                <p className="text-base-content/75">
                  Give people a faster way to compare related drinks side by side instead of opening them one at
                  a time.
                </p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl overflow-hidden">
              <figure>
                <img src={futureTwoImage} alt="Future information architecture idea for mixology project" className="h-64 w-full object-cover" />
              </figure>
              <div className="card-body">
                <h3 className="card-title">Stronger visual legend</h3>
                <p className="text-base-content/75">
                  Push the family grouping and periodic-table logic further so the structure teaches itself at a
                  glance.
                </p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl overflow-hidden">
              <figure>
                <img src={futureThreeImage} alt="Future refined mockup for mixology project" className="h-64 w-full object-cover" />
              </figure>
              <div className="card-body">
                <h3 className="card-title">More guided onboarding</h3>
                <p className="text-base-content/75">
                  Keep the playful tone, but make first-time exploration feel even more intentional with
                  lightweight onboarding cues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="card overflow-hidden bg-base-100 shadow-2xl border border-base-300 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <figure className="h-full">
            <img src={recapImage} alt="Mixology project reflection collage" className="h-full w-full object-cover" />
          </figure>
          <div className="card-body justify-center p-8 md:p-12">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Project Summary</p>
            <h2 className="mt-3 text-3xl font-bold">A playful concept that became a stronger UX case study</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              This project started with a cocktail poster that looked beautiful but could not really be explored.
              Through several iterations, it became a more interactive experience with clearer structure, better
              search, improved visuals, and a rebuilt React version that lets the case study and the working
              product live together.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              What I learned most from this project is that good design is not just about making something look
              interesting. It is about making it easier to understand, easier to use, and easier to improve over
              time. Reworking this idea taught me how much thoughtful iteration, user feedback, and stronger
              frontend structure can transform a fun visual concept into a more intentional product experience.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PeriodicTableOfMixology;
