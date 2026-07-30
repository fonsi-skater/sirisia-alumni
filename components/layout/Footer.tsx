import Link from 'next/link';

const links = [
  { href: '/events', label: 'Events' },
  { href: '/contributions', label: 'Contributions' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/forum', label: 'Forum' },
  { href: '/meetings', label: 'Meetings' },
  { href: '/members', label: 'Members' },
];

export function Footer() {
  return (
    <footer className="glass-strong border-t-4 !border-t-pink mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <p className="font-display text-lg tracking-tight text-blue-dark">
            Sirisia Alumni Class
          </p>
          <p className="text-sm text-ink/70 mt-1">
            Pulling together, wherever we are.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink hover:text-pink-dark transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-ink/10">
        <p className="max-w-5xl mx-auto px-4 sm:px-6 py-4 text-xs text-ink/60 font-mono">
          © {new Date().getFullYear()} Sirisia Alumni Class. All rights reserved.
        </p>
      </div>
    </footer>
  );
}