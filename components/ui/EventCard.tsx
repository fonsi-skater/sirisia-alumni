import type { EventItem } from '@/lib/mock-data';

const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

type Props = {
  event: EventItem;
  isPast?: boolean;
};

export function EventCard({ event, isPast }: Props) {
  const d = new Date(event.date + 'T00:00:00');
  const day = d.getDate();
  const month = monthNames[d.getMonth()];

  return (
    <div className={`glass rounded-xl p-5 flex gap-4 ${isPast ? 'opacity-60' : ''}`}>
      <div className="shrink-0 w-16 h-16 rounded-lg bg-blue text-parchment flex flex-col items-center justify-center border-b-4 border-pink">
        <span className="font-mono text-[10px] uppercase tracking-wide">{month}</span>
        <span className="font-display text-2xl leading-none">{day}</span>
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg text-blue-dark">{event.title}</h3>
          {!isPast && (
            <span className="shrink-0 font-mono text-xs text-pink-dark bg-pink-light/30 rounded-full px-2 py-0.5">
              {event.attendeeCount} going
            </span>
          )}
        </div>
        <p className="text-sm text-ink/70 font-mono mt-0.5">{event.time} · {event.location}</p>
        <p className="text-sm text-ink/80 mt-2">{event.description}</p>
        {!isPast && (
          <button className="mt-3 text-sm font-mono text-blue-dark border border-blue/40 rounded-full px-4 py-1 hover:bg-blue hover:text-parchment transition-colors">
            RSVP
          </button>
        )}
      </div>
    </div>
  );
}
