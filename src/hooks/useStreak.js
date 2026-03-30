import { MOCK_WEEKLY_STATS } from '../constants/mockData'

export function useStreakColor(streak) {
  // Compute health from last 7 days completion rate
  const avg = MOCK_WEEKLY_STATS.reduce((sum, d) => sum + d.completionRate, 0) / MOCK_WEEKLY_STATS.length
  const health = avg * 100

  if (streak === 0) return { color: '#EF4444', health: 0 }
  if (health >= 70) return { color: '#FF6B2B', health }
  if (health >= 40) return { color: '#EAB308', health }
  return { color: '#EF4444', health }
}

export function useStreakDisplay(streak) {
  const { color, health } = useStreakColor(streak)
  return { color, health, isHealthy: health >= 70, isDanger: health < 40 }
}
