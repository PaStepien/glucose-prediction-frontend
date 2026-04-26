import { GlucosePoint } from "@/constants/dashboard/glucoseTypes"
import { data } from "@/data/dashboard/glucose"

export const getJoin = (d: GlucosePoint, i: number) => {
  const splitIdx = data.findIndex(p => p.type === 'predicted')
  if (i === splitIdx - 1) return { actual: d.value, predicted: d.value }
  if (i === splitIdx)     return { actual: d.value, predicted: d.value }
  return {}
}

export const chartData = data.map((d, i) => ({
  index:     i,                     
  actual:    d.type === 'actual'    ? d.value : null,
  predicted: d.type === 'predicted' ? d.value : null,
  ...(getJoin(d, i)),
  time: d.time,
}))

export const latest    = data.filter(d => d.type==='actual').at(-1)!
export const nextPred  = data.find(d => d.type==='predicted')!
export const trend     = nextPred.value - latest.value