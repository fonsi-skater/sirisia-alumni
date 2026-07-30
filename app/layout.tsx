import type { Metadata } from 'next';
import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google';
import { GlassBackdrop } from '@/components/layout/GlassBackdrop';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600'],
});
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['500'],
});

export const metadata: Metadata = {
  title: 'Sirisia Alumni Class',
  description: 'Events, contributions, and community for the Sirisia Alumni Class',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="bg-parchment text-ink font-sans" style={{ colorScheme: 'light' }}>
        <GlassBackdrop />
        {children}
      </body>
    </html>
  );
}