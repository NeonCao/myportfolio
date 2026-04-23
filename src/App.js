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
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import Gallery from './pages/Gallery';
import Projects from './pages/Projects';
import { useEffect } from 'react';
import { applyTheme, getActiveTheme } from './utils/theme';
import NavigationEffects from './components/NavigationEffects';
import SiteClickTracker from './components/SiteClickTracker';
import universityOfMiamiLogo from './assets/images/index_Page/Logo_UniversityofMiami.png';
import kingSoftCloudLogo from './assets/images/index_Page/Logo_KingSoftCloud.png';
import bjupiLogo from './assets/images/index_Page/Logo_BJUPI.png';

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

const educationHistory = [
  {
    period: 'Aug 2024 - Dec 2025',
    title: 'Master of Science in Experience and Information Design',
    organization: 'University of Miami',
    logo: universityOfMiamiLogo,
    logoAlt: 'University of Miami logo',
    description:
      'Focused on user research, AI, and Mixed Reality, Learning and Development applications that prioritize user needs and the best practices of AI and Mixed Reality’s integration.',
    relatedWork: [
      { label: 'UM Campus Xplorer', to: '/projects/um-campus-xplorer' },
      { label: 'Espresso Helper', to: '/projects/auto-espresso' },
      { label: 'Project About Myself', to: '/projects/about-myself' },
      { label: 'Telling Overtown Stories', to: '/projects/telling-overtown-stories' },
      { label: 'AR Calorie Visualizer', to: '/projects/ar-calorie-visualizer' },
      { label: 'Stellar Life Cycle', to: '/projects/the-stellar-life-cycle' },
      { label: 'Periodic Table of Mixology', to: '/projects/periodic-table-of-mixology' },
      
    ],
  },
  {
    period: 'Aug 2018 - May 2022',
    title: 'Bachelor of Science in Computer Science',
    organization: 'University of Miami',
    logo: universityOfMiamiLogo,
    logoAlt: 'University of Miami logo',
    description:
      'Getting into the world of coding, learning programming languages like C#, Java, Python and Swift, exploring the fundatmentals of software development, and learning differnet algorthimes and data structures.',
    relatedWork: [
    ],
  },
];

const workHistory = [
  {
    period: 'May 2025 - Feb 2026',
    title: 'Unity Developer',
    organization: 'The VESL Lab (University of Miami)',
    logo: universityOfMiamiLogo,
    logoAlt: 'University of Miami logo',
    lanePreference: 0,
    description:
      'Deliver consistent C# scripts and algorithms to support the Unity project of the University, as well as Design ideas and UX ideas. Using best practices of Virtual Reality, AI and Database Integration to create a seamless experience for both teacher and students.',
    relatedWork: [
      { label: 'Memory Garden', to: '/projects/memory-graden' },
    ],
  },
  {
    period: 'Sep 2025 - Jan 2026',
    title: 'Research Assistant',
    organization: 'University of Miami',
    logo: universityOfMiamiLogo,
    logoAlt: 'University of Miami logo',
    lanePreference: 1,
    description:
      'Research and help utilize new technologies in Unity to recreate a video clip into a 3D, immersive, dreamlike storytelling experience.',
    relatedWork: [
      
      { label: 'Note-Taking Study', to: '/projects/design-student-note-taking' },
      { label: 'UM Card Sorting', to: '/projects/um-card-sorting-study' },
      { label: 'Interactive Piggy Bank', to: '/projects/interactive-piggy-bank' },
    ],
  },
  {
    period: 'Nov 2023 - Aug 2024',
    title: 'AI Algorithm developer Intern',
    organization: 'KingSoft Cloud',
    logo: kingSoftCloudLogo,
    logoAlt: 'KingSoft Cloud logo',
    description:
      'Develop an OCR and AI Algorithm for PDF recognition, also implement an API to use LLM to help find specific topics and related texts in various document types, and successfully integrate that function into the Financial Report Reviewing Tool developed by the company',
    relatedWork: [],
  },
  {
    period: 'Jun 2021 - Aug 2021',
    title: 'Software Engineer Intern',
    organization: 'Beijing Universal Prosperity Company',
    logo: bjupiLogo,
    logoAlt: 'Beijing Universal Prosperity Company logo',
    description:
      'Analyzed and developed technical and functional specifications for the Database and backend of qualification exam services serving up to thousands of employees using MySQL, Tomcat, Spring Boot, React, and Java.',
    relatedWork: [],
  },
];

function Home() {
  return (
    <>
      <Hero />
      <div id="personal-history">
        <PersonalHistory
          educationHistory={educationHistory}
          workHistory={workHistory}
          heading="Recent Personal History"
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
    <BrowserRouter basename={routerBasename}>
      <NavigationEffects basename={routerBasename} />
      <SiteClickTracker />
      <Header />
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
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:photoSlug" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
