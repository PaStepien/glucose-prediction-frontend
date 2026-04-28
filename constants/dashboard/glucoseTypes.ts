export type GlucosePoint = {
  time:  string
  value: number
  type:  'actual' | 'predicted'
}

export type WindowPoint = {
  carbs: number; steps: number; glucose: number
  bolus_raw: number; insulin_activity: number
  steps_weighted_avg: number; [key: string]: number
}

export type LogHistoryEntry = {
  id?: string
  user_id?: string
  created_at: string
  prediction_for_time?: string
  predicted_glucose_mgdl: number
  current_glucose_mgdl: number
  horizon_minutes: number
  lstm_window?: any[]
}