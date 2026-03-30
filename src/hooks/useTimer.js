import { useEffect, useRef } from 'react'
import { useAppStore } from '../store/useAppStore'

export function useTimerTick() {
  const phase   = useAppStore(s => s.timer.phase)
  const tickTimer = useAppStore(s => s.tickTimer)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (phase === 'active') {
      intervalRef.current = setInterval(() => {
        tickTimer()
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [phase, tickTimer])
}
