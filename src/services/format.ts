import type { Units } from '@/data/profile';

const KM_PER_MILE = 1.609;

export function formatDistance(km: number, units: Units) {
  return units === 'metric' ? `${km.toFixed(2)} km` : `${(km / KM_PER_MILE).toFixed(2)} mi`;
}

// 1260 -> "21:00", 4500 -> "1:15:00"
export function formatDuration(totalSec: number) {
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = Math.floor(totalSec % 60);
  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');
  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`;
}

// average time per km (or per mile)
export function formatPace(durationSec: number, km: number, units: Units) {
  if (km <= 0) return '--:--';
  const perUnit = units === 'metric' ? durationSec / km : (durationSec / km) * KM_PER_MILE;
  const minutes = Math.floor(perUnit / 60);
  const seconds = Math.round(perUnit % 60);
  return `${minutes}:${String(seconds).padStart(2, '0')} /${units === 'metric' ? 'km' : 'mi'}`;
}

// "Fri Oct 23 2026"
export function formatDate(iso: string) {
  return new Date(iso).toDateString();
}