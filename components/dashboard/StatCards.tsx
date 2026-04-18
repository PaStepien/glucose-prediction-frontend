import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { T } from '../../constants/dashboard/theme';

type StatCardsProps = {
  current: number | string;
  predicted: number | string;
  trend: number;
};

const StatCards= ({ current, predicted, trend }: StatCardsProps) =>{
  return (
    <View style={styles.row}>

      {/* Current reading */}
      <LinearGradient
        colors={['rgba(192,132,252,0.18)', 'rgba(129,140,248,0.1)']}
        style={styles.card}
      >
        <Text style={styles.label}>Current</Text>
        <Text style={styles.value}>{current}</Text>
        <Text style={styles.unit}>mg/dL</Text>
      </LinearGradient>

      {/* Next predicted */}
      <LinearGradient
        colors={['rgba(244,114,182,0.18)', 'rgba(192,132,252,0.1)']}
        style={styles.card}
      >
        <Text style={styles.label}>Next (1h)</Text>
        <Text style={[styles.value, {color:'#f9a8d4'}]}>{predicted}</Text>
        <Text style={styles.unit}>mg/dL</Text>
      </LinearGradient>

      {/* Trend arrow */}
      <LinearGradient
        colors={['rgba(129,140,248,0.18)', 'rgba(192,132,252,0.1)']}
        style={styles.card}
      >
        <Text style={styles.label}>Trend</Text>
        <Text style={[styles.value, {fontSize:32}]}>
          {trend > 0 ? '↗' : trend < 0 ? '↘' : '→'}
        </Text>
        <Text style={styles.unit}>
          {Math.abs(trend)} mg/dL/h
        </Text>
      </LinearGradient>

    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 10,
  },
  card: {
    flex: 1,
    marginHorizontal: 2,
    borderRadius: T.radius.md,
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: T.surface,
    borderWidth: 1,
    borderColor: T.border,
    minWidth: 90,
  },
  label: {
    fontSize: T.font.xs,
    color: T.text,
    marginBottom: 2,
    fontWeight: '500',
  },
  value: {
    fontSize: T.font.xl,
    color: T.text,
    fontWeight: '700',
    marginBottom: 2,
  },
  unit: {
    fontSize: T.font.sm,
    color: T.muted,
    marginTop: 2,
  },
});


export default StatCards;