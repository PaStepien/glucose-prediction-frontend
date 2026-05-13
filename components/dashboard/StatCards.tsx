import { LogHistoryEntry } from '@/constants/dashboard/glucoseTypes';
import { T } from '@/constants/dashboard/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

type StatCardsProps = {
  logHistory: LogHistoryEntry[]
  loading: boolean
  error: string | null
}

const StatCards = ({ logHistory, loading, error }: StatCardsProps) => {
  const latest = logHistory[0] ?? null;

  if (loading) {
    return (
      <View style={[styles.row, styles.centre]}>
        <ActivityIndicator color={T.purple} />
      </View>
    )
  }

  if (error || !latest) {
    return (
      <View style={[styles.row, styles.centre]}>
        <Text style={styles.errTxt}>{error ?? 'No data'}</Text>
      </View>
    )
  }

  const current   = latest.current_glucose_mgdl
  const predicted = Math.round(latest.predicted_glucose_mgdl)

  const delta      = latest.predicted_glucose_mgdl - current
  const ratePerMin = Math.abs(delta) / latest.horizon_minutes

  const trendLabel = delta > 0
    ? ratePerMin > 2 ? 'Rapid ↑' : ratePerMin > 1 ? 'Moderate ↑' : 'Slow ↑'
    : delta < 0
    ? ratePerMin > 2 ? 'Rapid ↓' : ratePerMin > 1 ? 'Moderate ↓' : 'Slow ↓'
    : 'Stable →'

  return (
    <View style={styles.row}>
      <LinearGradient colors={['rgba(192,132,252,0.18)', 'rgba(129,140,248,0.1)']} style={styles.card}>
        <Text style={styles.label}>Current</Text>
        <Text style={styles.value}>{current}</Text>
        <Text style={styles.unit}>mg/dL</Text>
      </LinearGradient>

      <LinearGradient colors={['rgba(244,114,182,0.18)', 'rgba(192,132,252,0.1)']} style={styles.card}>
        <Text style={styles.label}>In {latest.horizon_minutes}m</Text>
        <Text style={[styles.value, { color: '#f9a8d4' }]}>{predicted}</Text>
        <Text style={styles.unit}>mg/dL</Text>
      </LinearGradient>

      <LinearGradient colors={['rgba(129,140,248,0.18)', 'rgba(192,132,252,0.1)']} style={styles.card}>
        <Text style={styles.label}>Trend</Text>
        <Text style={[styles.value, { fontSize: 13, marginTop: 4 }]}>{trendLabel}</Text>
      </LinearGradient>
    </View>
  )
}

// styles unchanged
const styles = StyleSheet.create({
  row:    { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 10 },
  centre: { justifyContent: 'center', height: 90 },
  errTxt: { color: '#f87171', fontSize: 12 },
  card:   { flex: 1, marginHorizontal: 2, borderRadius: T.radius.md,
            paddingVertical: 16, paddingHorizontal: 10, alignItems: 'center',
            backgroundColor: T.surface, borderWidth: 1, borderColor: T.border, minWidth: 90 },
  label:  { fontSize: T.font.xs, color: T.text, marginBottom: 2, fontWeight: '500' },
  value:  { fontSize: T.font.xl, color: T.text, fontWeight: '700', marginBottom: 2 },
  unit:   { fontSize: T.font.sm, color: T.muted, marginTop: 2 },
})

export default StatCards