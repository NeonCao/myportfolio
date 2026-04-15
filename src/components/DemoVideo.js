function DemoVideo({ label, title, embedUrl, children }) {
  return (
    <div>
      {label ? <p className="mb-3 text-xs uppercase tracking-widest opacity-50">{label}</p> : null}
      <div className="relative mb-4 w-full" style={{ paddingTop: '56.25%' }}>
        <iframe
          src={embedUrl}
          title={title}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute inset-0 h-full w-full rounded-box"
        />
      </div>
      {children ? <div>{children}</div> : null}
    </div>
  );
}

export default DemoVideo;
