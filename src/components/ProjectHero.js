function ProjectHero({ title, image, font }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'calc(100svh - 4rem)', minHeight: '30rem' }}>
      <div
        role="img"
        aria-label={title}
        className="fx-hero-image absolute inset-x-0 bottom-0"
        style={{
          top: '-15%',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/5 to-black/75"></div>
      <div className="absolute inset-x-0 bottom-0 px-6 pb-20 sm:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="fx-hero-title">
            <span className="mb-5 block h-1 w-16 rounded-full bg-gradient-to-r from-fx to-fx-2"></span>
            <h1
              className="fx-plain max-w-4xl text-5xl font-black leading-[1.05] tracking-tight text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)] md:text-7xl"
              style={font ? { fontFamily: font } : {}}
            >
              {title}
            </h1>
          </div>
        </div>
      </div>
      <div
        className="fx-hero-cue pointer-events-none absolute inset-x-0 bottom-6 flex justify-center text-white/80"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}

export default ProjectHero;
