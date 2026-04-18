export type GlucosePoint = {
  time:  string
  value: number
  type:  'actual' | 'predicted'
}