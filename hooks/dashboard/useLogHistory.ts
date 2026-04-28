import { LogHistoryEntry } from '@/constants/dashboard/glucoseTypes'
import { JwtPayload } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

export const useLogHistory = (claims: JwtPayload | null, days = 10) => {
  const [logHistory, setLogHistory] = useState<LogHistoryEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const userId = claims?.sub
    if (!userId) return
    ;(async () => {
      try {
        setLoading(true)
        const res = await fetch(`http://127.0.0.1:8000/api/log-history/${userId}?days=${days}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: LogHistoryEntry[] = await res.json()
        setLogHistory(data)
      } catch (e: any) {
        setError(e.message ?? 'Failed to load')
      } finally {
        setLoading(false)
      }
    })()
  }, [claims?.sub, days])

  return { logHistory, loading, error }
}
