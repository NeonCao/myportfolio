function SectionDivider({ label }) {
  return (
    <div className="relative flex items-center gap-4 py-12">
      <div className="flex-1 border-t border-base-300"></div>
      <span className="text-xs uppercase tracking-widest opacity-40 whitespace-nowrap">{label}</span>
      <div className="flex-1 border-t border-base-300"></div>
    </div>
  );
}

export default SectionDivider;
