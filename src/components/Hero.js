import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}
    >
      <div className="hero-overlay bg-neutral/20"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-neutral-content/70">Portfolio</p>
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
              View Projects
            </Link>
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
