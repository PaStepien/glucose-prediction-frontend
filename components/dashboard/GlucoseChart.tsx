import { LogHistoryEntry, WindowPoint } from '@/constants/dashboard/glucoseTypes';
import { T } from '@/constants/dashboard/theme';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

type Props = {  
  logHistory: LogHistoryEntry[]
  loading: boolean
  error: string | null }

const GlucoseChart = ({ logHistory, loading, error }: Props) => {

  if (loading) return <View style={styles.centre}><ActivityIndicator color={T.purple} /></View>
  if (error || !logHistory.length) return (
    <View style={styles.centre}>
      <Text style={styles.emptyTxt}>{error ?? 'No data'}</Text>
    </View>
  )

  const latest = logHistory.at(0)!
  const win: WindowPoint[] = latest.lstm_window ?? [];
  const winLen = win.length;

  // ── Y range ───────────────────────────────────────────────────────────────
  const allG = [...win.map(w => w.glucose), latest.predicted_glucose_mgdl]
  const gMin = Math.max(0, Math.floor(Math.min(...allG) / 10) * 10 - 10)
  const gMax =             Math.ceil( Math.max(...allG) / 10) * 10 + 10

  // ── data: full history, no labels except key intervals ───────────────────
  const actualData = win.map((w, i) => {
    const minsAgo = (winLen - 1 - i) * 5;
    return {
      value: w.glucose,
      hideDataPoints: true,

      label: `-${minsAgo}'`, // these are mins
      labelTextStyle: { color: '#3a2f6e', fontSize: 3 },
    };
  });

  // ── data2: pad with nulls to align, then current → predicted ─────────────
  // data2 must be the same length as data (or shorter with nulls).
  const data2: any[] = win.map((w, i) => ({
    value: w.glucose,         
    hideDataPoints: true,
    color: 'transparent',
  }));

  if (winLen > 0) {
    data2[winLen - 1] = {
      value: latest.current_glucose_mgdl,
      hideDataPoints: true,
      label: 'Now',
      labelTextStyle: { color: '#3a2f6e', fontSize: 4 },
    };
  }
  // Append predicted point
  data2.push({
    value: latest.predicted_glucose_mgdl,
    hideDataPoints: false,
    label: `+${latest.horizon_minutes}m`,
    labelTextStyle: { color: T.pink, fontSize: 4 },
  });

  return (
    <View>
      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legRow}>
          <View style={[styles.legLine, { backgroundColor: T.purple }]} />
          <Text style={styles.legTxt}>Actual</Text>
        </View>
        <View style={styles.legRow}>
          <View style={styles.legDash} />
          <Text style={styles.legTxt}>Predicted (+{latest.horizon_minutes}m)</Text>
        </View>
      </View>

      <LineChart
        data={actualData}
        curved
        areaChart
        color={T.purple}
        thickness={2.5}
        startFillColor="rgba(192,132,252,0.15)"
        endFillColor="rgba(192,132,252,0.01)"
        hideDataPoints

        data2={data2}
        dashWidth={5}
        dashGap={4}
        color2={T.pink}
        thickness2={2.5}


        yAxisColor="rgba(58,47,110,0.3)"
        xAxisColor="rgba(58,47,110,0.3)"
        yAxisTextStyle={{ color: '#3a2f6e', fontSize: 4 }}
        noOfSections={4}
        maxValue={gMax}
        yAxisOffset={gMin}
        rulesColor="rgba(58,47,110,0.15)"
        height={150}
        adjustToWidth
        initialSpacing={8}
        spacing={9}
        backgroundColor="transparent"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  centre:   { height: 160, alignItems: 'center', justifyContent: 'center' },
  emptyTxt: { color: '#8b8bb0', fontSize: 12 },

  legend:   { flexDirection: 'row', gap: 14, marginBottom: 8 },
  legRow:   { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legLine:  { width: 16, height: 2.5, borderRadius: 2 },
  legDash:  { width: 16, height: 2, borderRadius: 1,
              borderTopWidth: 2, borderColor: '#f472b6',
              borderStyle: 'dashed' },
  legTxt:   { fontSize: 10, color: '#8b8bb0' },

  dotOuter: { width: 12, height: 12, borderRadius: 6,
              backgroundColor: 'rgba(249,168,212,0.25)',
              alignItems: 'center', justifyContent: 'center' },
})

export default GlucoseChart