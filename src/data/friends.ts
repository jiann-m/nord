export type Friend = {
  id: string;
  name: string;
  weekKm: number; // distance in the last 7 days
  monthKm: number; // distance in the last 4 weeks
};

// Mock friends (Phase 2: a "friendships" collection in Firestore)
export const FRIENDS: Friend[] = [
  { id: 'f1', name: 'Omar Khaled', weekKm: 41.2, monthKm: 120.5 },
  { id: 'f2', name: 'Salma Adel', weekKm: 36.5, monthKm: 98.0 },
  { id: 'f3', name: 'Youssef Tarek', weekKm: 28.0, monthKm: 70.3 },
  { id: 'f4', name: 'Mariam Ahmed', weekKm: 22.4, monthKm: 60.0 },
  { id: 'f5', name: 'Karim Nabil', weekKm: 15.1, monthKm: 52.6 },
];