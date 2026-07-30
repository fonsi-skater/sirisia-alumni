import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContributionThermometer } from '@/components/ui/ContributionThermometer';

const quickLinks = [
  { href: '/events', title: 'Upcoming events', body: 'See what\u2019s planned and RSVP.' },
  { href: '/gallery', title: 'Photo gallery', body: 'Relive moments from past gatherings.' },
  { href: '/forum', title: 'Discussion', body: 'Raise a topic or a burning issue.' },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6">
        <section className="grid md:grid-cols-2 gap-10 items-center py-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-pink-dark mb-3">
              Class of Sirisia
            </p>
            <h1 className="font-display text-4xl sm:text-5xl text-blue-dark leading-tight mb-4">
              Pulling together, wherever we are.
            </h1>
            <p className="text-ink/80 max-w-md">
              Events, contributions, and community - all in one place for
              every member of the Sirisia Alumni Class.
            </p>
          </div>

          <ContributionThermometer
            title="School library fund"
            currentTotal={186500}
            goalAmount={400000}
          />
        </section>

        <section className="grid sm:grid-cols-3 gap-5 pb-16">
          {quickLinks.map((link) => (
            
              key={link.href}
              href={link.href}
              className="glass rounded-xl p-5 hover:!bg-white/55 transition-colors"
            >
              <h3 className="font-display text-lg text-blue-dark mb-1">{link.title}</h3>
              <p className="text-sm text-ink/70">{link.body}</p>
            </a>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}