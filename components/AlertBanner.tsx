import { nextPred, trend } from '@/helpers/dashboard/graphHelpers'
import { Text, View } from 'react-native'

const AlertBanner = () =>{
  if (trend <= 5) return null // this is not accurate, i need actual trends
  return (
    <View style={{ borderRadius:14, padding:12,
      backgroundColor:'rgba(244,114,182,0.10)',
      borderWidth:1, borderColor:'rgba(244,114,182,0.28)',
      flexDirection:'row', gap:10, alignItems:'center' }}>
      <View style={{ width:28, height:28, borderRadius:14,
        backgroundColor:'rgba(244,114,182,0.2)',
        alignItems:'center', justifyContent:'center' }}>
        <Text style={{ color:'#f472b6', fontSize:13, fontWeight: 700 }}>⚠</Text>
      </View>
      <Text style={{ color:'#f472b6', fontSize:11,
        flex:1, lineHeight:17 }}>
        <Text style={{ fontWeight:'700' }}>Rising trend. </Text>
        Predicted {nextPred.value} mg/dL by 13:00.
        Consider a short walk.
      </Text>
    </View>
  )
}


export default AlertBanner;