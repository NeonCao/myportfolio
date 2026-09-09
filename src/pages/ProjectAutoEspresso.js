import ProjectHero from '../components/ProjectHero';
import BuildStep from '../components/BuildStep';
import DemoVideo from '../components/DemoVideo';
import SectionDivider from '../components/SectionDivider';

import content from '../content/projects/autoEspresso';

function ProjectAutoEspresso() {
  return (
    <div className="min-h-screen bg-base-200">

      {/* Hero */}
      <ProjectHero title={content.hero.title} image={content.hero.image} />

      {/* Intro */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">{content.intro.heading}</h1>
          <p className="text-base-content/70 leading-relaxed mb-6">
            {content.intro.description}
          </p>
          <div className="flex gap-4 flex-wrap">
            <a href={content.intro.demoVideoUrl} target="_blank" rel="noreferrer" className="btn btn-outline">{content.intro.demoVideoLabel}</a>
          </div>
        </div>
        <img src={content.intro.image} alt={content.intro.imageAlt} className="rounded-box w-full object-cover" />
      </div>

      {/* Quick Jump */}
      <div className="bg-base-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-8">{content.quickJump.heading}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {content.quickJump.links.map((item) => (
              <a key={item.label} href={item.href} className="card bg-base-200 shadow hover:shadow-lg transition-shadow">
                <figure><img src={item.img} alt={item.title} className="w-full h-48 object-cover" /></figure>
                <div className="card-body">
                  <div className="badge badge-neutral mb-2">{item.label}</div>
                  <h3 className="card-title text-base">{item.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── V1 Build Process ── */}
      <div id="build-process" className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold pt-16 mb-2">{content.buildProcess.heading}</h2>

        {content.buildProcess.steps.map((step) => (
          <BuildStep
            key={step.number}
            number={step.number}
            title={step.title}
            text={step.text}
            images={step.images}
            imageLeft={step.imageLeft}
          />
        ))}
      </div>

      {/* ── V2 Divider ── */}
      <div className="max-w-6xl mx-auto px-6">
        <SectionDivider label={content.v2.dividerLabel} />
      </div>

      {/* V2 Intro */}
      <div id="v2" className="max-w-6xl mx-auto px-6 pb-8 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-4">{content.v2.heading}</h2>
          <p className="text-base-content/70 leading-relaxed mb-6">
            {content.v2.description}
          </p>
          <a href={content.v2.demoUrl} target="_blank" rel="noreferrer" className="btn btn-outline">{content.v2.demoLabel}</a>
        </div>
        <img src={content.v2.image} alt={content.v2.imageAlt} className="rounded-box w-full object-cover" />
      </div>

      {/* Userflow Diagram */}
      <div className="bg-base-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-8">{content.userflowDiagram.heading}</h2>
          <img src={content.userflowDiagram.image} alt={content.userflowDiagram.alt} className="w-full rounded-box" />
        </div>
      </div>

      {/* V2 What Changed */}
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold pt-16 mb-2">{content.whatChanged.heading}</h2>

        {content.whatChanged.steps.map((step) => (
          <BuildStep
            key={step.number}
            number={step.number}
            title={step.title}
            text={step.text}
            images={step.images}
            imageLeft={step.imageLeft}
          />
        ))}
      </div>

      {/* Demo Videos + Code side by side */}
      <div className="bg-base-100 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-8">{content.demoVideos.heading}</h2>
          <div className="grid md:grid-cols-2 gap-8">

            {content.demoVideos.videos.map((video) => (
              <DemoVideo
                key={video.label}
                label={video.label}
                title={video.title}
                embedUrl={video.embedUrl}
              >
                <p className="text-sm tracking-widest opacity-80 mb-3">{video.codeLabel}</p>
                <a href={video.codeHref} target="_blank" rel="noreferrer" className="link link-primary text-sm break-all">
                  {video.codeLinkText}
                </a>
              </DemoVideo>
            ))}

          </div>
        </div>
      </div>

    </div>
  );
}

export default ProjectAutoEspresso;
