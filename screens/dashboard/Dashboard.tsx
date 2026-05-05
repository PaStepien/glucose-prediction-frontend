import AlertBanner from '@/components/AlertBanner';
import GlucoseChart from '@/components/dashboard/GlucoseChart';
import { useLogHistory } from '@/hooks/dashboard/useLogHistory';
import { useFocusEffect } from '@react-navigation/native';
import { JwtPayload } from '@supabase/supabase-js';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatCards from '../../components/dashboard/StatCards';
import { T } from '../../constants/dashboard/theme';

type DashboardProps = { claims: JwtPayload }

export const Dashboard = ({ claims }: DashboardProps) => {
  const todayDate = new Date();
  const { logHistory, loading, error, fetchHistory } = useLogHistory(claims, 10)

  useFocusEffect(
    useCallback(() => {
      fetchHistory()
    }, [fetchHistory])
  )

  const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}
const name = (claims?.user_metadata?.full_name as string)
  ?? (claims?.email as string)?.split('@')[0]
  ?? 'there'

const initial = name[0].toUpperCase()
  return (
    <LinearGradient colors={T.gradBg} style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}>
          {/* ── Header ── */}
          <View style={styles.header}>
            <View style={{ marginBlockEnd: 20 }}>
              <Text style={styles.greet}>{getGreeting()}</Text>
              <Text style={styles.name}>{name}</Text>
            </View>
            <View style={styles.avatar}>
              <Text style={{ color: T.purple, fontSize: 14 }}>{initial}</Text>
            </View>
          </View>

          <StatCards logHistory={logHistory} loading={loading} error={error} />

          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Glucose levels: {todayDate.toLocaleDateString()}
            </Text>
            <GlucoseChart logHistory={logHistory} loading={loading} error={error} />
          </View>

          <AlertBanner logHistory={logHistory} loading={loading} error={error} />

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  flex:      { flex: 1 },
  scroll:    { padding: 20, gap: 10, paddingBottom: 32 },
  header:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greet:     { fontSize: T.font.sm, color: T.muted },
  name:      { fontSize: T.font.xl, fontWeight: '700', color: T.text },
  avatar:    { width: 36, height: 36, borderRadius: 18,
               backgroundColor: 'rgba(192,132,252,0.15)',
               borderWidth: 1, borderColor: T.border,
               alignItems: 'center', justifyContent: 'center' },
  card:      { backgroundColor: T.surface, padding: 14 },
  cardTitle: { fontSize: T.font.sm, fontWeight: '600', color: T.text, marginBottom: 6 },
  section:   { fontSize: T.font.sm, fontWeight: '600', color: T.text },
})