import { useState } from 'react';
import { Text, View } from 'react-native';
import type { RoutePoint } from '@/data/workouts';

type Props = { points: RoutePoint[]; height?: number; live?: boolean };

// BROWSER ONLY. react-native-maps does not work on the web, so Expo uses this
// file instead (".web.tsx") when the app runs in a browser. It draws the route as dots.
// On the phone, RouteMap.tsx (the real map) is used.
export function RouteMap({ points, height = 220 }: Props) {
  const [width, setWidth] = useState(0);
  const lats = points.map((p) => p.latitude);
  const lngs = points.map((p) => p.longitude);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const pad = 24;
  const scale = Math.min((width - pad * 2) / (Math.max(...lngs) - minLng || 1), (height - pad * 2) / (maxLat - minLat || 1));

  // One dot per point, plus extra dots in between so it looks like a line
  const dots = [];
  for (let i = 1; i < points.length; i++) {
    for (let step = 0; step < 12; step++) {
      const t = step / 12;
      const lat = points[i - 1].latitude + (points[i].latitude - points[i - 1].latitude) * t;
      const lng = points[i - 1].longitude + (points[i].longitude - points[i - 1].longitude) * t;
      dots.push({ x: pad + (lng - minLng) * scale, y: pad + (maxLat - lat) * scale });
    }
  }

  return (
    <View
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      className="overflow-hidden rounded-2xl border border-line bg-card"
      style={{ height }}
      accessibilityLabel="Map of the route"
    >
      {width > 0
        ? dots.map((dot, i) => (
            <View key={i} className="absolute h-1.5 w-1.5 rounded-full bg-ink" style={{ left: dot.x, top: dot.y }} />
          ))
        : null}
      <Text className="absolute bottom-2 right-3 text-xs text-muted">Map preview (web)</Text>
    </View>
  );
}