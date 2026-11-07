export default function Footer() {
  return (
    <footer className="mt-20">
      <div className="h-px bg-gradient-to-r from-transparent via-primary to-accent" />
      <div className="mx-auto max-w-7xl px-6 py-8 text-center">
        <p className="font-display text-2xl tracking-wider">
          CINE<span className="text-primary">SCOPE</span>
        </p>
        <p className="mt-2 text-sm text-muted">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </div>
    </footer>
  );
}