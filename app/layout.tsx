import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
