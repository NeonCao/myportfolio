import { useTranslation } from '../i18n/LanguageContext';

const LINKEDIN_URL = 'https://www.linkedin.com/in/wenxin-cao-80322a230/';
const GITHUB_URL = 'https://github.com/NeonCao';

function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-base-300 bg-base-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fx to-transparent opacity-60"></div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 text-center sm:flex-row sm:text-left">
        <div>
          <p className="text-lg font-bold tracking-tight">Neon Cao</p>
          <p className="mt-1 text-sm text-base-content/70">{t('footer.tagline')}</p>
          <p className="mt-1 text-xs text-base-content/55">
            © {year} Neon Cao. {t('footer.rights')}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline">
            LinkedIn
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline">
            GitHub
          </a>
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {t('footer.backToTop')} ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
