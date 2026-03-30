import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { createUserSlice } from './slices/userSlice'
import { createTasksSlice } from './slices/tasksSlice'
import { createProgressionSlice } from './slices/progressionSlice'
import { createTimerSlice } from './slices/timerSlice'
import { createSettingsSlice } from './slices/settingsSlice'

export const useAppStore = create(
  persist(
    (...a) => ({
      ...createUserSlice(...a),
      ...createTasksSlice(...a),
      ...createProgressionSlice(...a),
      ...createTimerSlice(...a),
      ...createSettingsSlice(...a),
    }),
    {
      name: 'levelup-habitracker',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        progression: state.progression,
        activeTasks: state.activeTasks,
        taskFrequencies: state.taskFrequencies,
        completedToday: state.completedToday,
        photoProofs: state.photoProofs,
        lastResetDate: state.lastResetDate,
        comebackCompleted: state.comebackCompleted,
        settings: state.settings,
      }),
    }
  )
)
