import { T } from '@/constants/dashboard/theme';
import { useLogHistory } from '@/hooks/dashboard/useLogHistory';
import { JwtPayload } from '@supabase/supabase-js';
import { ActivityIndicator, Text, View } from 'react-native';

type Props = { claims: JwtPayload }

const RISING_THRESHOLD = 15
const HIGH_THRESHOLD   = 180
const LOW_THRESHOLD    = 70

const AlertBanner = ({ claims }: Props) => {
  const { logHistory, loading } = useLogHistory(claims, 10);
  const latest = logHistory.at(-1) ?? null;

  if (loading) return <ActivityIndicator color={T.purple} style={{ marginTop: 4 }} />
  if (!latest) return null

  const { predicted_glucose_mgdl: pred, current_glucose_mgdl: curr,
          horizon_minutes: horizon, created_at } = latest

  const delta = pred - curr

  // Time = when prediction was made + horizon minutes
  const predTime  = new Date(new Date(created_at).getTime() + horizon * 60 * 1000)
  const timeLabel = predTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const isRising  = delta >= RISING_THRESHOLD
  const isFalling = delta <= -RISING_THRESHOLD
  const isHigh    = pred >= HIGH_THRESHOLD
  const isLow     = pred <= LOW_THRESHOLD

  if (!isRising && !isFalling && !isHigh && !isLow) return null

  type AlertConfig = { color: string; bg: string; border: string; label: string; body: string }

  const alert: AlertConfig = isLow
    ? {
        color:  '#f87171',
        bg:     'rgba(248,113,113,0.10)',
        border: 'rgba(248,113,113,0.28)',
        label:  'Low predicted. ',
        body:   `Glucose may drop to ${Math.round(pred)} mg/dL by ${timeLabel}. Consider a snack.`,
      }
    : isHigh
    ? {
        color:  '#fb923c',
        bg:     'rgba(251,146,60,0.10)',
        border: 'rgba(251,146,60,0.28)',
        label:  'High predicted. ',
        body:   `Glucose may reach ${Math.round(pred)} mg/dL by ${timeLabel}. Check your insulin.`,
      }
    : isRising
    ? {
        color:  '#f472b6',
        bg:     'rgba(244,114,182,0.10)',
        border: 'rgba(244,114,182,0.28)',
        label:  'Rising trend. ',
        body:   `Predicted ${Math.round(pred)} mg/dL by ${timeLabel}. Consider a short walk.`,
      }
    : {
        color:  '#818cf8',
        bg:     'rgba(129,140,248,0.10)',
        border: 'rgba(129,140,248,0.28)',
        label:  'Falling trend. ',
        body:   `Predicted ${Math.round(pred)} mg/dL by ${timeLabel}. Keep a snack nearby.`,
      }

  return (
    <View style={{
      borderRadius: 14, padding: 12,
      backgroundColor: alert.bg,
      borderWidth: 1, borderColor: alert.border,
      flexDirection: 'row', gap: 10, alignItems: 'center',
    }}>
      <View style={{
        width: 28, height: 28, borderRadius: 14,
        backgroundColor: alert.bg,
        alignItems: 'center', justifyContent: 'center',
      }}>
        <Text style={{ color: alert.color, fontSize: 13, fontWeight: '700' }}>⚠</Text>
      </View>
      <Text style={{ color: alert.color, fontSize: 11, flex: 1, lineHeight: 17 }}>
        <Text style={{ fontWeight: '700' }}>{alert.label}</Text>
        {alert.body}
      </Text>
    </View>
  )
}

export default AlertBanner