import Link from 'next/link';

const links = [
  { href: '/events', label: 'Events' },
  { href: '/contributions', label: 'Contributions' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/forum', label: 'Forum' },
  { href: '/meetings', label: 'Meetings' },
  { href: '/members', label: 'Members' },
];

export function Navbar() {
  return (
    <header className="glass-strong sticky top-0 z-20 border-b-4 !border-b-pink">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-lg tracking-tight text-blue-dark">
          Sirisia Alumni Class
        </Link>
        <nav className="hidden md:flex gap-6 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-ink hover:text-pink-dark transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <button className="md:hidden text-sm" aria-label="Open menu">
          Menu
        </button>
      </div>
    </header>
  );
}