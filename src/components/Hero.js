import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ASMRStaticBackground from './ASMRStaticBackground';

const rotatingRoles = [
  { label: 'UX Designer', className: 'text-info' },
  { label: 'Programmer', className: 'text-success' },
  { label: 'Developer', className: 'text-warning-content' },
  { label: 'Researcher', className: 'text-secondary' },
];

function Hero() {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveRoleIndex((currentIndex) => (currentIndex + 1) % rotatingRoles.length);
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="hero relative min-h-screen overflow-hidden bg-[#0a0a0c]">
      <ASMRStaticBackground />
      <div className="hero-overlay bg-black/45"></div>
      <div className="hero-content relative z-10 w-full px-4 text-neutral-content text-center sm:px-6">
        <div className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.05] px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md md:px-10 md:py-10">
          <p className="text-sm uppercase tracking-[0.35em] text-neutral-content/70">Portfolio</p>
          <div className="mx-auto my-5 h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            <span>Hello, I&apos;m Neon Cao, a </span>
            <span className="hero-text-rotate">
              <span
                className="hero-text-rotate-track"
                style={{ '--hero-role-index': activeRoleIndex }}
              >
                {rotatingRoles.map((role) => (
                  <span
                    key={role.label}
                    className={`hero-text-rotate-chip ${role.className}`}
                  >
                    {role.label}
                  </span>
                ))}
              </span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-content/78 md:text-lg">
            I build thoughtful digital experiences across UX, frontend development, backend development, and immersive media,
            with a focus on making technology feel easy-accessible, ai-driven, and worth exploring.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/projects" className="btn btn-primary">
              My Projects
            </Link>
            <a
              href="https://www.linkedin.com/in/wenxin-cao-80322a230/"
              target="_blank"
              rel="noreferrer"
              className="btn border-[#0059b3] bg-[#0967C2] text-white hover:border-[#004a95] hover:bg-[#0059b3]"
            >
              <svg
                aria-label="LinkedIn logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  fill="white"
                  d="M26.111,3H5.889c-1.595,0-2.889,1.293-2.889,2.889V26.111c0,1.595,1.293,2.889,2.889,2.889H26.111c1.595,0,2.889-1.293,2.889-2.889V5.889c0-1.595-1.293-2.889-2.889-2.889ZM10.861,25.389h-3.877V12.87h3.877v12.519Zm-1.957-14.158c-1.267,0-2.293-1.034-2.293-2.31s1.026-2.31,2.293-2.31,2.292,1.034,2.292,2.31-1.026,2.31-2.292,2.31Zm16.485,14.158h-3.858v-6.571c0-1.802-.685-2.809-2.111-2.809-1.551,0-2.362,1.048-2.362,2.809v6.571h-3.718V12.87h3.718v1.686s1.118-2.069,3.775-2.069,4.556,1.621,4.556,4.975v7.926Z"
                  fillRule="evenodd"
                ></path>
              </svg>
              My LinkedIn
            </a>
            <a href="#personal-history" className="btn btn-outline text-neutral-content">
              See My Personal History
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
