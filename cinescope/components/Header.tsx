import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-neutral-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <Link href="/" className="text-xl font-bold">
          🎬 CineScope
        </Link>
        <Link href="/favorites" className="text-sm hover:underline">
          ❤️ Favorites
        </Link>
      </nav>
    </header>
  );
}