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

export type Photo = {
  id: string;
  eventTitle: string;
  imageUrl: string;
  caption: string;
};

export const mockPhotos: Photo[] = [
  { id: 'p1', eventTitle: 'Mid-year get-together', imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80', caption: 'Classmates catching up in Kitale' },
  { id: 'p2', eventTitle: 'Mid-year get-together', imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', caption: 'Group photo before lunch' },
  { id: 'p3', eventTitle: 'Library fundraising walk (2025)', imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80', caption: 'The walk sets off from town' },
  { id: 'p4', eventTitle: 'End-of-year reunion (2025)', imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', caption: 'Speeches at the reunion' },
  { id: 'p5', eventTitle: 'End-of-year reunion (2025)', imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80', caption: 'Dinner and dancing' },
  { id: 'p6', eventTitle: 'Committee planning day', imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80', caption: 'Committee members mapping out the year' },
];

export type ForumTopic = {
  id: string;
  title: string;
  author: string;
  body: string;
  replyCount: number;
  lastActivity: string;
};

export const mockForumTopics: ForumTopic[] = [
  {
    id: 'f1',
    title: 'Reunion venue — school grounds or a hotel this year?',
    author: 'Peter Barasa',
    body: "We've done the school grounds twice now. Curious if people want a change of scenery this time, even if it costs a bit more.",
    replyCount: 14,
    lastActivity: '2026-07-29',
  },
  {
    id: 'f2',
    title: 'Proposal: quarterly instead of annual contributions reminder',
    author: 'Grace Wanjiru',
    body: "Some of us keep forgetting to contribute until right before a deadline. Would a gentle SMS every quarter help, or is that too much?",
    replyCount: 9,
    lastActivity: '2026-07-27',
  },
  {
    id: 'f3',
    title: "Congratulations to Mary Nafula's daughter — KCSE results",
    author: 'Mary Nafula',
    body: 'Sharing some good news — my daughter got an A- in her KCSE. Thank you all for the encouragement over the years.',
    replyCount: 22,
    lastActivity: '2026-07-25',
  },
];

export type MeetingItem = {
  id: string;
  title: string;
  dateTime: string;
  joinUrl: string;
  agenda: string;
};

export const mockMeetings: MeetingItem[] = [
  {
    id: 'm1',
    title: 'Committee planning call',
    dateTime: '2026-08-10T20:00:00',
    joinUrl: 'https://meet.jit.si/SirisiaAlumniAug2026',
    agenda: 'Reunion budget, venue decision, and library fund progress.',
  },
];
