import { MOCK_PROGRESSION } from '../../constants/mockData'
import { getLevelForXP } from '../../constants/progression'

export const createProgressionSlice = (set, get) => ({
  progression: { ...MOCK_PROGRESSION },
  levelUpPending: null, // { category, newLevel } or null

  addXP: (category, amount) =>
    set(state => {
      const cat     = state.progression[category]
      const newXP   = cat.xp + amount
      const oldLevel = cat.level
      const newLevel = getLevelForXP(category, newXP)
      const leveledUp = newLevel > oldLevel

      return {
        progression: {
          ...state.progression,
          [category]: { xp: newXP, level: newLevel },
        },
        levelUpPending: leveledUp
          ? { category, newLevel }
          : state.levelUpPending,
      }
    }),

  clearLevelUp: () => set({ levelUpPending: null }),

  setProgression: (category, data) =>
    set(state => ({
      progression: { ...state.progression, [category]: data },
    })),
})
