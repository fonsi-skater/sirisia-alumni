'use client';

import { useState } from 'react';
import Link from 'next/link';

type LinkItem = { href: string; label: string };

export function MobileMenu({ links, admin }: { links: LinkItem[]; admin: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`block h-0.5 w-6 bg-blue-dark rounded-full transition-transform duration-200 ${
            open ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-blue-dark rounded-full transition-opacity duration-200 ${
            open ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-blue-dark rounded-full transition-transform duration-200 ${
            open ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      <div
        className={`fixed inset-x-0 top-[72px] z-30 overflow-hidden transition-[max-height] duration-300 ease-out ${
          open ? 'max-h-[28rem]' : 'max-h-0'
        }`}
      >
        <nav className="glass-strong mx-3 sm:mx-4 rounded-2xl p-4 flex flex-col gap-1 border border-white/40">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-ink text-sm py-2.5 px-2 rounded-lg hover:bg-white/40 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t border-line mt-1 pt-3">
            {admin ? (
              <form action="/api/auth/admin-logout" method="post">
                <button
                  type="submit"
                  className="w-full text-left font-mono text-xs text-pink-dark py-2 px-2"
                >
                  Log out (admin)
                </button>
              </form>
            ) : (
              <Link
                href="/admin-login"
                onClick={() => setOpen(false)}
                className="block font-mono text-xs text-blue-dark py-2 px-2"
              >
                Admin login
              </Link>
            )}
          </div>
        </nav>
      </div>

      {open && (
        <div
          className="fixed inset-0 top-[72px] z-20 bg-ink/10"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
