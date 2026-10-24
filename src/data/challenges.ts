export type ChallengeKind = 'team' | 'solo';

export type Challenge = {
  id: string;
  title: string;
  kind: ChallengeKind;
  description: string;
  targetKm: number;
  progressKm: number; // team: everyone's distance together; solo: yours
  members: number;
  daysLeft: number;
  joined: boolean;
};

// Mock challenges (Phase 2: a "challenges" collection in Firestore)
export const CHALLENGES: Challenge[] = [
  { id: 'c1', title: 'BUE 100 km October', kind: 'team', description: 'Run, walk or ride with your class to reach 100 km together.', targetKm: 100, progressKm: 63.4, members: 12, daysLeft: 7, joined: true },
  { id: 'c2', title: 'Weekend 10K', kind: 'solo', description: 'Cover 10 km this weekend, any workout type.', targetKm: 10, progressKm: 3.6, members: 1, daysLeft: 2, joined: false },
  { id: 'c3', title: 'Campus Loop Crew', kind: 'team', description: 'Five laps of the campus loop as a team.', targetKm: 18, progressKm: 7.2, members: 5, daysLeft: 10, joined: false },
  { id: 'c4', title: 'Ride 50', kind: 'solo', description: 'Cycle 50 km in two weeks.', targetKm: 50, progressKm: 18.5, members: 1, daysLeft: 12, joined: false },
];