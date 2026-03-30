import { useAppStore } from '../store/useAppStore'
import { PROGRESSION, getXPProgress } from '../constants/progression'

export function useProgressionData(category) {
  const progression = useAppStore(s => s.progression)
  const cat = progression[category]
  const levels = PROGRESSION[category]
  const currentLevelData = levels[cat.level - 1]
  const nextLevelData = levels[cat.level] || null
  const progress = getXPProgress(category, cat.xp)

  return {
    level: cat.level,
    xp: cat.xp,
    progress,
    currentLevelData,
    nextLevelData,
    levels,
    xpToNext: nextLevelData ? nextLevelData.xpRequired - cat.xp : 0,
  }
}
