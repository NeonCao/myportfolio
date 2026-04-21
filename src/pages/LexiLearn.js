import ProjectHero from '../components/ProjectHero';
import heroImage from '../assets/images/lexilearn/lexiLearn_Hero.png';

const tags = ['VR', 'AI', 'Literacy', 'Adaptive Learning', 'Educational Technology', 'Multisensory Design'];

const teamMembers = [
  'Neon Cao, Developer',
  'Lucas Yeykelis, Developer',
  'Nasir Grant, UI/UX Designer',
  'Dan Zahal, Audio Engineer',
  'Chris Edgar, Project Manager',
  'Bryson Rudolph, Lab Manager, VESEL',
  'Marie Holm, Visiting Research Scholar, Haptics',
];

function LexiLearn() {
  return (
    <main className="min-h-screen bg-[#030405] text-[#f6f0df]">
      <ProjectHero title="Lexi Learn" image={heroImage} />

      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(103,232,249,0.16),transparent_28%),radial-gradient(circle_at_82%_40%,rgba(190,242,100,0.12),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
          <div>
            <div className="badge border-cyan-200/40 bg-cyan-200/10 px-4 py-3 text-cyan-100">
              Ongoing Research Project
            </div>
            <h1 className="mt-6 text-5xl font-black leading-tight tracking-[-0.05em] text-[#fff7d6] md:text-7xl">
              Advancing adaptive literacy learning in immersive environments
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-[#f6f0df]/75">
              Lexi Learn is a research project exploring how immersive virtual environments and artificial
              intelligence can be integrated into early literacy education through multisensory and adaptive design.
            </p>
            <p className="mt-5 leading-relaxed text-[#f6f0df]/68">
              The project is currently ongoing, and more implementation detail awaits to be revealed. This page will
              expand as the research, prototype, and evaluation work become ready to share publicly.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-cyan-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl backdrop-blur">
            <p className="text-xs uppercase tracking-[0.35em] text-lime-100/50">Project Team</p>
            <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-black/40 p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-100/50">Principal Investigator</p>
              <p className="mt-2 text-2xl font-bold text-[#fff7d6]">Dr. Anna Queiroz</p>
            </div>

            <div className="mt-5 space-y-3">
              {teamMembers.map((member) => (
                <div key={member} className="rounded-[1.1rem] border border-white/10 bg-black/30 p-4 text-sm text-[#f6f0df]/72">
                  {member}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.035] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-100/45">Project Overview</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-3">
            <p className="leading-relaxed text-[#f6f0df]/70 lg:col-span-2">
              Developed as a literacy-focused educational game, Lexi Learn transforms reading and spelling into an
              interactive and exploratory experience. Within a calm, nature-inspired virtual environment, learners
              engage in playful literacy tasks that combine movement, sound, and visual association to reinforce
              phonetic understanding and word recognition.
            </p>
            <div className="rounded-[1.5rem] border border-lime-100/20 bg-lime-100/[0.06] p-6">
              <p className="text-3xl font-black text-lime-100">More soon</p>
              <p className="mt-3 leading-relaxed text-[#f6f0df]/65">
                Research details, prototype walkthroughs, and design artifacts will be added as the project reaches
                a public-share stage.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LexiLearn;
