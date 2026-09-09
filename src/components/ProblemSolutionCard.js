import { useTranslation } from '../i18n/LanguageContext';

const accentClasses = {
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
};

function ProblemSolutionCard({
  title,
  problem,
  solution,
  accent = 'primary',
}) {
  const { isChinese } = useTranslation();
  const accentClass = accentClasses[accent] || accentClasses.primary;

  return (
    <article className="card h-full border border-base-300 bg-base-100 shadow-xl">
      <div className="card-body gap-5">
        <div className={`badge badge-outline ${accentClass}`}>{isChinese ? '工程难点' : 'Engineering Hurdle'}</div>
        <h3 className="card-title text-2xl leading-tight">{title}</h3>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-base-content/45">{isChinese ? '问题' : 'Problem'}</p>
          <p className="leading-relaxed text-base-content/72">{problem}</p>
        </div>

        <div className="divider my-0" />

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-base-content/45">{isChinese ? '解决方案' : 'Solution'}</p>
          <p className="leading-relaxed text-base-content/72">{solution}</p>
        </div>
      </div>
    </article>
  );
}

export default ProblemSolutionCard;
