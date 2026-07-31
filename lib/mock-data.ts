export type Target = {
  id: string;
  title: string;
  currentTotal: number;
  goalAmount: number;
  deadline?: string;
};

export type RecentContribution = {
  id: string;
  memberName: string;
  amount: number;
  targetTitle: string;
  status: 'matched' | 'unmatched' | 'pending';
  paidAt: string;
};

export type EventItem = {
  id: string;
  title: string;
  date: string; // ISO date
  time: string;
  location: string;
  description: string;
  attendeeCount: number;
};

// Placeholder data — replace with real Prisma queries once
// lib/db.ts is connected to a live Postgres instance.
export const mockTargets: Target[] = [
  {
    id: 't1',
    title: 'School library fund',
    currentTotal: 186500,
    goalAmount: 400000,
    deadline: '2026-12-01',
  },
  {
    id: 't2',
    title: 'End-of-year reunion',
    currentTotal: 42000,
    goalAmount: 60000,
    deadline: '2026-11-15',
  },
  {
    id: 't3',
    title: 'Emergency support fund',
    currentTotal: 15200,
    goalAmount: 100000,
  },
];

export const mockRecentContributions: RecentContribution[] = [
  { id: 'c1', memberName: 'Grace Wanjiru', amount: 2000, targetTitle: 'School library fund', status: 'matched', paidAt: '2026-07-29' },
  { id: 'c2', memberName: 'Peter Barasa', amount: 1000, targetTitle: 'End-of-year reunion', status: 'matched', paidAt: '2026-07-29' },
  { id: 'c3', memberName: 'Unmatched — 0722***881', amount: 500, targetTitle: 'School library fund', status: 'unmatched', paidAt: '2026-07-28' },
  { id: 'c4', memberName: 'Mary Nafula', amount: 5000, targetTitle: 'Emergency support fund', status: 'matched', paidAt: '2026-07-27' },
];

export const mockEvents: EventItem[] = [
  {
    id: 'e1',
    title: 'End-of-year reunion',
    date: '2026-11-15',
    time: '11:00 AM',
    location: 'Sirisia Boys Secondary School grounds',
    description: 'Our biggest gathering of the year — food, speeches, and catching up with classmates from every stream.',
    attendeeCount: 62,
  },
  {
    id: 'e2',
    title: 'Library fundraising walk',
    date: '2026-09-20',
    time: '7:00 AM',
    location: 'Sirisia town centre',
    description: 'A short community walk to raise visibility (and a bit more cash) for the library fund.',
    attendeeCount: 24,
  },
  {
    id: 'e3',
    title: 'Virtual planning meeting',
    date: '2026-08-10',
    time: '8:00 PM',
    location: 'Online (link on the Meetings page)',
    description: 'Committee and general members discuss the reunion budget and logistics.',
    attendeeCount: 18,
  },
  {
    id: 'e4',
    title: 'Mid-year get-together',
    date: '2026-06-14',
    time: '12:00 PM',
    location: "Grace Wanjiru's home, Kitale",
    description: 'A smaller, informal catch-up hosted by classmates in the Kitale area.',
    attendeeCount: 15,
  },
];
