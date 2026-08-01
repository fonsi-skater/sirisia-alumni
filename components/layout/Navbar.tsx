import Link from 'next/link';
import { cookies } from 'next/headers';
import { getCurrentMember, SESSION_COOKIE } from '@/lib/session';

const links = [
  { href: '/events', label: 'Events' },
  { href: '/contributions', label: 'Contributions' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/forum', label: 'Forum' },
  { href: '/meetings', label: 'Meetings' },
  { href: '/members', label: 'Members' },
];

export async function Navbar() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const member = await getCurrentMember(token);

  return (
    <header className="glass-strong sticky top-0 z-20 border-b-4 !border-b-pink">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-lg tracking-tight text-blue-dark">
          Sirisia Alumni Class
        </Link>
        <nav className="hidden md:flex gap-6 text-sm items-center">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-ink hover:text-pink-dark transition-colors">
              {link.label}
            </Link>
          ))}
          {member ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-ink/60">Hi, {member.fullName.split(' ')[0]}</span>
              <form action="/api/auth/logout" method="post">
                <button
                  type="submit"
                  className="font-mono text-xs text-pink-dark border border-pink/40 rounded-full px-3 py-1 hover:bg-pink hover:text-parchment transition-colors"
                >
                  Log out
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="font-mono text-xs text-blue-dark border border-blue/40 rounded-full px-3 py-1 hover:bg-blue hover:text-parchment transition-colors"
            >
              Log in
            </Link>
          )}
        </nav>
        <button className="md:hidden text-sm" aria-label="Open menu">
          Menu
        </button>
      </div>
    </header>
  );
}
