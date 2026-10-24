import { Text, View } from 'react-native';
import type { Units } from '@/data/profile';
import { formatDistance } from '@/services/format';
import type { Row } from '../api';

type Props = { row: Row; units: Units };

// One line of the leaderboard; my own line is filled so it stands out
export function RankRow({ row, units }: Props) {
  const box = row.isMe ? 'bg-ink' : 'bg-card';
  const text = row.isMe ? 'text-on-ink' : 'text-ink';
  const small = row.isMe ? 'text-on-ink' : 'text-muted';

  return (
    <View
      className={`flex-row items-center gap-4 rounded-2xl px-4 py-3 ${box}`}
      accessible
      accessibilityLabel={`Rank ${row.rank}, ${row.name}, ${formatDistance(row.distanceKm, units)}`}
    >
      <Text className={`w-8 text-lg font-bold ${small}`}>#{row.rank}</Text>
      <View className={`h-10 w-10 items-center justify-center rounded-full border ${row.isMe ? 'border-on-ink' : 'border-line'}`}>
        <Text className={`font-bold ${text}`}>{row.name.charAt(0)}</Text>
      </View>
      <Text className={`flex-1 text-base font-bold ${text}`}>{row.name}</Text>
      <Text className={`font-bold ${text}`}>{formatDistance(row.distanceKm, units)}</Text>
    </View>
  );
}