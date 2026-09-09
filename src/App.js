import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import PersonalHistory from './components/PersonalHistory';
import InteractivePiggyBank from './pages/InteractivePiggyBank';
import TellingOvertownStories from './pages/TellingOvertownStories';
import ProjectAutoEspresso from './pages/ProjectAutoEspresso';
import PeriodicTableOfMixology from './pages/PeriodicTableOfMixology';
import UMCampusXplorer from './pages/UMCampusXplorer';
import ARCalorieVisualizer from './pages/ARCalorieVisualizer';
import StellarLifeCycle from './pages/StellarLifeCycle';
import DesignStudentNotetaking from './pages/DesignStudentNotetaking';
import UMCardSortingStudy from './pages/UMCardSortingStudy';
import ProjectAboutMyself from './pages/ProjectAboutMyself';
import MemoryGraden from './pages/MemoryGraden';
import LexiLearn from './pages/LexiLearn';
import FiveStarHostRedesign from './pages/FiveStarHostRedesign';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import Gallery from './pages/Gallery';
import Projects from './pages/Projects';
import { useEffect } from 'react';
import { applyTheme, getActiveTheme } from './utils/theme';
import NavigationEffects from './components/NavigationEffects';
import SiteClickTracker from './components/SiteClickTracker';
import { ENGLISH, LanguageProvider, useTranslation } from './i18n/LanguageContext';
import ProjectPageTranslator from './components/ProjectPageTranslator';
import { homeHistoryByLanguage } from './content/home';

function getRouterBasename() {
  const publicUrl = process.env.PUBLIC_URL;

  if (!publicUrl) {
    return undefined;
  }

  try {
    const { pathname } = new URL(publicUrl, window.location.origin);
    const normalizedPath = pathname.replace(/\/$/, '');

    return normalizedPath || undefined;
  } catch {
    return publicUrl.replace(/\/$/, '') || undefined;
  }
}

const routerBasename = getRouterBasename();

function Home() {
  const { language, t } = useTranslation();
  const { educationHistory, workHistory } = homeHistoryByLanguage[language] || homeHistoryByLanguage[ENGLISH];

  return (
    <>
      <Hero />
      <div id="personal-history">
        <PersonalHistory
          educationHistory={educationHistory}
          workHistory={workHistory}
          heading={t('history.heading')}
        />
      </div>
    </>
  );
}

function App() {
  useEffect(() => {
    applyTheme(getActiveTheme());
  }, []);

  return (
    <LanguageProvider>
      <BrowserRouter basename={routerBasename}>
        <NavigationEffects basename={routerBasename} />
        <SiteClickTracker />
        <Header />
        <ProjectPageTranslator />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/interactive-piggy-bank" element={<InteractivePiggyBank />} />
          <Route path="/projects/telling-overtown-stories" element={<TellingOvertownStories />} />
          <Route path="/projects/auto-espresso" element={<ProjectAutoEspresso />} />
          <Route path="/projects/periodic-table-of-mixology" element={<PeriodicTableOfMixology />} />
          <Route path="/projects/um-campus-xplorer" element={<UMCampusXplorer />} />
          <Route path="/projects/ar-calorie-visualizer" element={<ARCalorieVisualizer />} />
          <Route path="/projects/the-stellar-life-cycle" element={<StellarLifeCycle />} />
          <Route path="/projects/design-student-note-taking" element={<DesignStudentNotetaking />} />
          <Route path="/projects/um-card-sorting-study" element={<UMCardSortingStudy />} />
          <Route path="/projects/about-myself" element={<ProjectAboutMyself />} />
          <Route path="/projects/memory-graden" element={<MemoryGraden />} />
          <Route path="/projects/lexilearn" element={<LexiLearn />} />
          <Route path="/projects/5-star-host-web-page-redesign" element={<FiveStarHostRedesign />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:photoSlug" element={<Gallery />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
