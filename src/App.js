import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectList from './components/ProjectList';
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
import { useEffect } from 'react';
import { applyTheme, getActiveTheme } from './utils/theme';


function Home() {
  return (
    <>
      <Hero />
      <ProjectList />
    </>
  );
}

function App() {
  useEffect(() => {
    applyTheme(getActiveTheme());
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
