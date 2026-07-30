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
    title: "End-of-year reunion",
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