import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectList from './components/ProjectList';
import InteractivePiggyBank from './pages/InteractivePiggyBank';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
