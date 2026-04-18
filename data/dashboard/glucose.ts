import { GlucosePoint } from "@/constants/dashboard/glucoseTypes"

export const data: GlucosePoint[] = [
  { time:'06:00', value:88,  type:'actual'    },
  { time:'07:00', value:105, type:'actual'    },
  { time:'08:00', value:138, type:'actual'    },
  { time:'09:00', value:124, type:'actual'    },
  { time:'10:00', value:110, type:'actual'    },
  // Last actual = first predicted (the join)
  { time:'11:00', value:118, type:'actual'    },
  { time:'12:00', value:130, type:'predicted' },
  { time:'13:00', value:145, type:'predicted' },
  { time:'14:00', value:122, type:'predicted' },
]