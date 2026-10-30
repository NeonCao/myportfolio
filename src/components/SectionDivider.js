function SectionDivider({ label }) {
  return (
    <div className="fx-reveal relative flex items-center gap-5 py-12">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-base-content/30"></div>
      <span className="inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-base-content/15 bg-base-100/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-base-content/75 shadow-sm backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-fx shadow-[0_0_12px_var(--fx-accent)]"></span>
        {label}
      </span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-base-content/30"></div>
    </div>
  );
}

export default SectionDivider;
