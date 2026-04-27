import AlertBanner from '@/components/AlertBanner';
import GlucoseChart from '@/components/dashboard/GlucoseChart';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatCards from '../../components/dashboard/StatCards';
import { T } from '../../constants/dashboard/theme';

export const Dashboard = () => {
const todayDate = new Date();
  return (
    <LinearGradient colors={T.gradBg} style={styles.flex}>
      <SafeAreaView style={styles.flex}>

        <ScrollView contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}>

          {/* ── Header ── */}
          <View style={styles.header}>
            <View style={{marginBlockEnd: 20}}>
              <Text style={styles.greet}>Good morning</Text>
              <Text style={styles.name}>Maria</Text>
            </View>
            <View style={styles.avatar}>
              <Text style={{ color: T.purple, fontSize:14 }}>M</Text>
            </View>
          </View>

  
          <StatCards current={120} predicted={130} trend={5} />

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Glucose levels: {todayDate.toLocaleDateString()} </Text>
            <GlucoseChart />
          </View>

          <AlertBanner />

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  flex:      { flex:1 },
  scroll:    { padding:20, gap:10, paddingBottom:32 },
  header:    { flexDirection:'row', justifyContent:'space-between',
               alignItems:'center' },
  greet:     { fontSize: T.font.sm, color: T.muted },
  name:      { fontSize: T.font.xl, fontWeight:'700', color: T.text },
  avatar:    { width:36, height:36, borderRadius:18,
               backgroundColor:'rgba(192,132,252,0.15)',
               borderWidth:1, borderColor: T.border,
               alignItems:'center', justifyContent:'center' },
  card:      { backgroundColor: T.surface, padding:14 },
  cardTitle: { fontSize: T.font.sm, fontWeight:'600',
               color: T.text, marginBottom:6 },
  section:   { fontSize: T.font.sm, fontWeight:'600', color: T.text },
})