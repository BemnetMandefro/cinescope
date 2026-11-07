import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-3xl tracking-wider">
          CINE<span className="text-primary">SCOPE</span>
        </Link>

        <Link
          href="/favorites"
          className="glow-hover rounded-full border border-primary/60 px-5 py-2 text-sm font-medium text-white hover:border-primary hover:bg-primary/20"
        >
          ♥ Favorites
        </Link>
      </nav>
    </header>
  );
}