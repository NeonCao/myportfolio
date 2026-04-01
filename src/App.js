import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectList from './components/ProjectList';
import InteractivePiggyBank from './pages/InteractivePiggyBank';
import TellingOvertownStories from './pages/TellingOvertownStories';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
