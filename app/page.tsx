import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContributionThermometer } from '@/components/ui/ContributionThermometer';

const quickLinks = [
  { href: '/events', title: 'Upcoming events', body: 'See what\u2019s planned and RSVP.' },
  { href: '/gallery', title: 'Photo gallery', body: 'Relive moments from past gatherings.' },
  { href: '/forum', title: 'Discussion', body: 'Raise a topic or a burning issue.' },
];

const stats = [
  { value: '21', label: 'Registered members' },
  { value: '3', label: 'Active funds' },
  { value: '2014', label: 'Class year' },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative mt-4 mx-3 sm:mx-4 rounded-3xl overflow-hidden">
          <img src="/background.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-dark/80 via-blue-dark/70 to-blue-dark/90" />

          <div className="relative max-w-3xl mx-auto px-6 sm:px-10 py-16 sm:py-24 text-center">
            <span className="inline-block font-mono text-xs uppercase tracking-wide text-pink bg-white/10 rounded-full px-4 py-1.5 mb-6">
              Class of Sirisia · Est. 2014
            </span>
            <h1 className="font-display text-4xl sm:text-6xl text-parchment leading-tight mb-5">
              Pulling together, wherever we are.
            </h1>
            <p className="text-parchment/80 text-sm sm:text-base max-w-lg mx-auto mb-8">
              Events, contributions, and community — all in one place for
              every member of the Sirisia Alumni Class.
            </p>

            <div className="flex items-center justify-center gap-3 flex-wrap mb-14">
              <a
                href="/contributions"
                className="font-mono text-sm text-blue-dark bg-pink rounded-full px-6 py-3 hover:bg-pink-dark hover:text-parchment transition-colors"
              >
                View contributions
              </a>
              <a
                href="/events"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-parchment hover:bg-white/20 transition-colors"
                aria-label="See events"
              >
                &#8599;
              </a>
            </div>

            <div className="flex items-center justify-center gap-8 sm:gap-14 flex-wrap border-t border-white/15 pt-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-2xl sm:text-3xl text-parchment">{s.value}</p>
                  <p className="text-parchment/60 text-xs sm:text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <section className="py-14 sm:py-16">
            <ContributionThermometer
              title="School library fund"
              currentTotal={186500}
              goalAmount={400000}
            />
          </section>

          <section className="grid sm:grid-cols-3 gap-5 pb-16">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="glass rounded-xl p-5 hover:!bg-white/55 transition-colors"
              >
                <h3 className="font-display text-lg text-blue mb-1">{link.title}</h3>
                <p className="text-sm text-ink/70">{link.body}</p>
              </a>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
