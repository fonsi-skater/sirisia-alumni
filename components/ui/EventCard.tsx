import { RsvpButton } from './RsvpButton';

const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

type MemberOption = { id: string; fullName: string };

type Props = {
  id: string;
  title: string;
  eventDate: Date;
  location: string | null;
  description: string | null;
  attendeeCount: number;
  members?: MemberOption[];
  rsvpMemberIds?: string[];
  isPast?: boolean;
};

export function EventCard({
  id,
  title,
  eventDate,
  location,
  description,
  attendeeCount,
  members = [],
  rsvpMemberIds = [],
  isPast,
}: Props) {
  const day = eventDate.getDate();
  const month = monthNames[eventDate.getMonth()];
  const time = eventDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

  return (
    <div className={`glass rounded-xl p-5 flex gap-4 ${isPast ? 'opacity-60' : ''}`}>
      <div className="shrink-0 w-16 h-16 rounded-lg bg-blue text-parchment flex flex-col items-center justify-center border-b-4 border-pink">
        <span className="font-mono text-[10px] uppercase tracking-wide">{month}</span>
        <span className="font-display text-2xl leading-none">{day}</span>
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg text-blue-dark">{title}</h3>
          {!isPast && (
            <span className="shrink-0 font-mono text-xs text-pink-dark bg-pink-light/30 rounded-full px-2 py-0.5">
              {attendeeCount} going
            </span>
          )}
        </div>
        <p className="text-sm text-ink/70 font-mono mt-0.5">{time}{location ? ` · ${location}` : ''}</p>
        {description && <p className="text-sm text-ink/80 mt-2">{description}</p>}
        {!isPast && (
          <div className="mt-3">
            <RsvpButton eventId={id} members={members} rsvpMemberIds={rsvpMemberIds} />
          </div>
        )}
      </div>
    </div>
  );
}
