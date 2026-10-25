import { View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useTheme } from '@/context/theme';
import type { RoutePoint } from '@/data/workouts';
import { regionFor } from './region';

type Props = {
  points: RoutePoint[];
  height?: number;
  live?: boolean; // during a workout: follow the newest point, no dragging
};

// The route on a real map: Apple Maps on iPhone, Google Maps on Android.
// Shared by Live Tracking, Workout Summary and Workout Details.
export function RouteMap({ points, height = 220, live = false }: Props) {
  const { mode, colors } = useTheme();
  const start = points[0];
  const end = points[points.length - 1];
  const fit = regionFor(points);
  const region = live && end ? { ...fit, latitude: end.latitude, longitude: end.longitude } : fit;

  return (
    <View className="overflow-hidden rounded-2xl border border-line" style={{ height }} accessibilityLabel="Map of the route">
      <MapView style={{ flex: 1 }} region={region} userInterfaceStyle={mode} scrollEnabled={!live} zoomEnabled={!live}>
        {points.length > 1 ? <Polyline coordinates={points} strokeColor={colors.ink} strokeWidth={5} /> : null}
        {start ? <Marker coordinate={start} title="Start" pinColor="green" /> : null}
        {end && points.length > 1 && !live ? <Marker coordinate={end} title="Finish" pinColor="red" /> : null}
      </MapView>
    </View>
  );
}