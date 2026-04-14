const educationHistory = [
  {
    period: 'Add years',
    title: 'Add school or program',
    organization: 'Add university name',
    description:
      'Replace this with your degree, concentration, or a short description of what you studied during this stage.',
  },
  {
    period: 'Add years',
    title: 'Add second school or milestone',
    organization: 'Add university or institution',
    description:
      'Use this space for another degree, certificate, exchange program, or important educational transition.',
  },
  {
    period: 'Add years',
    title: 'Add recent study milestone',
    organization: 'Add current school or learning community',
    description:
      'You can also use this for workshops, research programs, or coursework that shaped your design practice.',
  },
];

const workHistory = [
  {
    period: 'Add years',
    title: 'Add role title',
    organization: 'Add company or organization',
    description:
      'Replace this with your position, where you worked, and a short description of the kind of work you did.',
  },
  {
    period: 'Add years',
    title: 'Add second role',
    organization: 'Add studio, lab, or employer',
    description:
      'This can be a full-time role, internship, assistantship, freelance position, or other relevant work experience.',
  },
  {
    period: 'Add years',
    title: 'Add recent role or current focus',
    organization: 'Add current company, client, or team',
    description:
      'You can also use this entry for project-based consulting, lab work, or a current position you want to highlight.',
  },
];

const timelineLength = Math.max(educationHistory.length, workHistory.length);

function TimelineIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function TimelineCard({ item, align }) {
  if (!item) {
    return <div className={align === 'left' ? 'timeline-start mb-10 md:text-end' : 'timeline-end mb-10'}></div>;
  }

  const baseClass = align === 'left' ? 'timeline-start mb-10 md:text-end' : 'timeline-end mb-10';

  return (
    <div className={baseClass}>
      <time className="font-mono text-xs uppercase tracking-[0.25em] text-base-content/55">{item.period}</time>
      <div className={`mt-3 flex items-start gap-3 ${align === 'left' ? 'md:flex-row-reverse' : ''}`}>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-dashed border-base-300 bg-base-200 text-[10px] font-semibold uppercase tracking-[0.2em] text-base-content/40">
          Icon
        </div>
        <div className={align === 'left' ? 'md:text-right' : ''}>
          <div className="text-lg font-black">{item.title}</div>
          <div className="mt-1 text-sm font-semibold text-primary">{item.organization}</div>
        </div>
      </div>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-base-content/72">{item.description}</p>
    </div>
  );
}

function PersonalHistory() {
  return (
    <section className="bg-base-200/60 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Personal History</p>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">Education on the left, work on the right</h2>
          <p className="mt-4 leading-relaxed text-base-content/72">
            A timeline view for showing your academic path and professional experience side by side.
          </p>
        </div>

        <div className="rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-2xl sm:p-8">
          <div className="mb-8 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-base-content/55 md:text-right">
              Education
            </div>
            <div className="hidden h-10 w-px bg-base-300 md:block"></div>
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-base-content/55">
              Work
            </div>
          </div>

          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            {Array.from({ length: timelineLength }).map((_, index) => {
              const educationItem = educationHistory[index];
              const workItem = workHistory[index];
              const isLast = index === timelineLength - 1;

              return (
                <li key={`history-row-${index}`}>
                  {index > 0 ? <hr /> : null}
                  <TimelineCard item={educationItem} align="left" />
                  <div className="timeline-middle text-primary">
                    <TimelineIcon />
                  </div>
                  <TimelineCard item={workItem} align="right" />
                  {!isLast ? <hr /> : null}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default PersonalHistory;
