import { GlucosePoint } from "@/constants/dashboard/glucoseTypes"
import { data } from "@/data/dashboard/glucose"
import { Skia } from "@shopify/react-native-skia"

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

export const  buildPath = (pts: {x:number, y:number|null|undefined}[]) => {
  const path = Skia.Path.Make()
  const valid = pts.filter(p => p.y != null)
  valid.forEach((p, i) => {
    if (i === 0) path.moveTo(p.x, p.y as number)
    else         path.lineTo(p.x, p.y as number)
  })
  return path
}

export const latest    = data.filter(d => d.type==='actual').at(-1)!
export const nextPred  = data.find(d => d.type==='predicted')!
export const trend     = nextPred.value - latest.value