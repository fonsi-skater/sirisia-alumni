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
    <header className="glass-strong sticky top-0 z-20 border-b-4 !border-b-pink">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-lg tracking-tight text-blue-dark">
          <img src="/logo.jpg" alt="" className="h-8 w-8 rounded-full object-cover border border-white/60" />
          Sirisia Alumni Class
        </Link>
        <nav className="hidden md:flex gap-6 text-sm items-center">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-ink hover:text-pink-dark transition-colors">
              {link.label}
            </Link>
          ))}
          {admin ? (
            <form action="/api/auth/admin-logout" method="post">
              <button
                type="submit"
                className="font-mono text-xs text-pink-dark border border-pink/40 rounded-full px-3 py-1 hover:bg-pink hover:text-parchment transition-colors"
              >
                Log out (admin)
              </button>
            </form>
          ) : (
            <Link
              href="/admin-login"
              className="font-mono text-xs text-blue-dark border border-blue/40 rounded-full px-3 py-1 hover:bg-blue hover:text-parchment transition-colors"
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
