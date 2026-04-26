import { chartData } from '@/helpers/dashboard/graphHelpers'
import { StyleSheet, Text, View } from 'react-native'
import { LineChart } from 'react-native-gifted-charts'
import { T } from '../../constants/dashboard/theme'

const actualData  = chartData.map((d: { actual: any }) => ({ value: d.actual  ?? undefined }))
const predictData = chartData.map((d: { predicted: any }) => ({
  value: d.predicted ?? undefined,
  dashWidth: 6,
  dashGap: 4,
}))

const GlucoseChart = () => {
  return (
    <View style={styles.wrap}>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legRow}>
          <View style={[styles.legLine, { backgroundColor: T.purple }]} />
          <Text style={styles.legTxt}>Actual</Text>
        </View>
        <View style={styles.legRow}>
          <View style={styles.legDash} />
          <Text style={styles.legTxt}>Predicted</Text>
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
        startOpacity={1}
        endOpacity={0}
        data2={predictData}
        color2={T.pink}
        thickness2={2.5}
        hideDataPoints2

        // Join dot at last actual point 
        customDataPoint={(item: any, index: number) => {
          if (index === actualData.length - 1) {
            return (
              <View style={styles.dotOuter}>
                <View style={styles.dotInner} />
              </View>
            )
          }
          return null
        }}

        // Axes
        yAxisColor="rgba(58,47,110,0.3)"
        xAxisColor="rgba(58,47,110,0.3)"
        yAxisTextStyle={{ color: '#3a2f6e', fontSize: 10 }}
        xAxisLabelTextStyle={{ color: '#3a2f6e', fontSize: 10 }}
        noOfSections={3}
        maxValue={200}
      yAxisOffset={60}
        rulesColor="rgba(58,47,110,0.15)"

        height={160}
        adjustToWidth
        initialSpacing={8}
        spacing={38}
        backgroundColor="transparent"
      />

    </View>
  )
}

const styles = StyleSheet.create({
  wrap:    { height:220 },
  legend:  { flexDirection:'row', gap:14, marginBottom:8 },
  legRow:  { flexDirection:'row', alignItems:'center', gap:6 },
  legLine: { width:16, height:2.5, borderRadius:2 },
  legDash: { width:16, height:2, borderRadius:1,
             borderTopWidth:2, borderColor:'#f472b6',
             borderStyle:'dashed' },
  legTxt:  { fontSize:10, color:'#8b8bb0' },
  dotOuter: {
    width: 12, height: 12, borderRadius: 6,
    backgroundColor: 'rgba(249,168,212,0.25)',
    alignItems: 'center', justifyContent: 'center',
  },
  dotInner: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: T.dot ?? '#f472b6',
  },
})

export default GlucoseChart;