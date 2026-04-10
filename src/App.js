import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectList from './components/ProjectList';
import InteractivePiggyBank from './pages/InteractivePiggyBank';
import TellingOvertownStories from './pages/TellingOvertownStories';
import ProjectAutoEspresso from './pages/ProjectAutoEspresso';
import PeriodicTableOfMixology from './pages/PeriodicTableOfMixology';
import UMCampusXplorer from './pages/UMCampusXplorer';
import StellarLifeCycle from './pages/StellarLifeCycle';
import DesignStudentNotetaking from './pages/DesignStudentNotetaking';

function Home() {
  return (
    <>
      <Hero />
      <ProjectList />
    </>
  );
}

function App() {
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
        <Route path="/projects/the-stellar-life-cycle" element={<StellarLifeCycle />} />
        <Route path="/projects/design-student-note-taking" element={<DesignStudentNotetaking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
