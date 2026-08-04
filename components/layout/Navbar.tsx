import Link from 'next/link';
import { isAdmin } from '@/lib/admin-session';
import { MobileMenu } from './MobileMenu';

const links = [
  { href: '/events', label: 'Events' },
  { href: '/contributions', label: 'Contributions' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/forum', label: 'Forum' },
  { href: '/meetings', label: 'Meetings' },
  { href: '/members', label: 'Members' },
];

export function Navbar() {
  const admin = isAdmin();

  return (
    <header className="sticky top-3 z-20 px-3 sm:px-4">
      <div className="max-w-5xl mx-auto glass-strong rounded-full border border-white/40 px-4 sm:px-5 py-2.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-base tracking-tight text-blue">
          <img
            src="/logo.jpg"
            alt=""
            className="h-8 w-8 rounded-full object-cover border border-white/60"
            style={{ filter: 'saturate(0.5) sepia(0.4) hue-rotate(-10deg) brightness(0.95)' }}
          />
          <span className="hidden sm:inline">Sirisia Alumni Class</span>
        </Link>
        <nav className="hidden md:flex gap-5 text-sm items-center">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-ink hover:text-blue transition-colors">
              {link.label}
            </Link>
          ))}
          {admin ? (
            <form action="/api/auth/admin-logout" method="post">
              <button
                type="submit"
                className="font-mono text-xs text-parchment bg-blue rounded-full px-4 py-1.5 hover:bg-blue-dark transition-colors"
              >
                Log out
              </button>
            </form>
          ) : (
            <Link
              href="/admin-login"
              className="font-mono text-xs text-blue-dark bg-pink rounded-full px-4 py-1.5 hover:bg-pink-dark hover:text-parchment transition-colors"
            >
              Admin login
            </Link>
          )}
        </nav>
        <MobileMenu links={links} admin={admin} />
      </div>
    </header>
  );
}
