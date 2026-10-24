// MODEL for Challenges. Phase 1 returns mock data after a short delay
// (so the loading state can be seen); Phase 2 reads Firestore here.
import { CHALLENGES, type Challenge } from '@/data/challenges';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getChallenges(): Promise<Challenge[]> {
  await wait(700);
  return CHALLENGES;
}

// Join or leave one challenge; a team gains or loses one member
export function toggleJoined(challenge: Challenge): Challenge {
  const joined = !challenge.joined;
  const members = challenge.kind === 'team' ? challenge.members + (joined ? 1 : -1) : challenge.members;
  return { ...challenge, joined, members };
}