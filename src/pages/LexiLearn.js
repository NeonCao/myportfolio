import ProjectHero from '../components/ProjectHero';
import lexiLearnContent from '../content/projects/lexiLearn';

const { hero, intro, team, overview } = lexiLearnContent;

function LexiLearn() {
  return (
    <main className="min-h-screen bg-[#030405] text-[#f6f0df]">
      <ProjectHero title={hero.title} image={hero.image} />

      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(103,232,249,0.16),transparent_28%),radial-gradient(circle_at_82%_40%,rgba(190,242,100,0.12),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
          <div>
            <div className="badge border-cyan-200/40 bg-cyan-200/10 px-4 py-3 text-cyan-100">
              {intro.badge}
            </div>
            <h1 className="mt-6 text-5xl font-black leading-tight tracking-[-0.05em] text-[#fff7d6] md:text-7xl">
              {intro.headline}
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-[#f6f0df]/75">
              {intro.paragraphs[0]}
            </p>
            <p className="mt-5 leading-relaxed text-[#f6f0df]/68">
              {intro.paragraphs[1]}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {intro.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-cyan-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl backdrop-blur">
            <p className="text-xs uppercase tracking-[0.35em] text-lime-100/50">{team.label}</p>
            <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-black/40 p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-100/50">{team.principalInvestigator.label}</p>
              <p className="mt-2 text-2xl font-bold text-[#fff7d6]">{team.principalInvestigator.name}</p>
            </div>

            <div className="mt-5 space-y-3">
              {team.members.map((member) => (
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
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-100/45">{overview.label}</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-3">
            <p className="leading-relaxed text-[#f6f0df]/70 lg:col-span-2">
              {overview.paragraphs[0]}
            </p>
            <div className="rounded-[1.5rem] border border-lime-100/20 bg-lime-100/[0.06] p-6">
              <p className="text-3xl font-black text-lime-100">{overview.moreSoon.heading}</p>
              <p className="mt-3 leading-relaxed text-[#f6f0df]/65">
                {overview.moreSoon.paragraph}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LexiLearn;
