
import { buildPath, chartData } from '@/helpers/dashboard/graphHelpers'
import { Circle, DashPathEffect, matchFont, Path } from '@shopify/react-native-skia'
import { useMemo } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { Area, CartesianChart, Line } from 'victory-native'
import { T } from '../../constants/dashboard/theme'

const GlucoseChart = () => {

const font = useMemo(() => {
  const family = Platform.select({ ios: "Helvetica", android: "sans-serif", default: "sans-serif" });
  return matchFont({ fontFamily: family });
}, []);

  return (
    <View style={styles.wrap}>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legRow}>
          <View style={[styles.legLine,{backgroundColor:T.purple}]}/>
          <Text style={styles.legTxt}>Actual</Text>
        </View>
        <View style={styles.legRow}>
          <View style={styles.legDash}/>
          <Text style={styles.legTxt}>Predicted</Text>
        </View>
      </View>

      <CartesianChart
        data={chartData}
        xKey="index"
        yKeys={["actual", "predicted"]}
        domain={{ y:[60, 200] }}
        axisOptions={{
          font,                    
          tickCount: { x:5, y:4 },
          labelColor: '#3a2f6e',
          lineColor:  'rgba(58, 47, 110, 0.3)',
 
        }}
      >
        {({ points, chartBounds }) => {

          // the predicted dashed line
          const predPath = buildPath(points.predicted.filter(p => p.y != null) )

          return (
            <>
              <Area
                points={points.actual}
                y0={chartBounds.bottom}
                color="rgba(192,132,252,0.07)"
                animate={{ type: "timing", duration: 300 }} //will animate if data changes live // possibly remove
                curveType="natural"
              />

              <Line
                points={points.actual}
                color={T.purple}
                strokeWidth={2.5}
                curveType="natural"
                animate={{ type:'timing', duration:800 }} //will animate if data changes live // possibly remove
              />
              

              <Path
                path={predPath}
                color={T.pink}
                style="stroke"
                strokeWidth={2.5}
                strokeCap="round"
                strokeJoin="round"
              >
                <DashPathEffect intervals={[6, 4]} />
              </Path>

              {/* joined dot  */}
              {(() => {
                const joinPt = points.actual
                  .filter(p => p.y != null).at(-1)
                return joinPt ? (
                  <>
                    <Circle cx={joinPt.x} cy={joinPt.y ?? 0}
                      r={6} color='rgba(249,168,212,0.25)' />
                    <Circle cx={joinPt.x} cy={joinPt.y ?? 0}
                      r={4} color={T.dot} />
                  </>
                ) : null
              })()}
            </>
          )
        }}
      </CartesianChart>

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
})

export default GlucoseChart;