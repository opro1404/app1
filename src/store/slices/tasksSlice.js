import { ALL_TASKS, DEFAULT_ACTIVE_TASKS } from '../../constants/tasks'

const today = () => new Date().toISOString().slice(0, 10)

export const createTasksSlice = (set, get) => ({
  activeTasks: DEFAULT_ACTIVE_TASKS,          // task IDs the user has selected
  taskFrequencies: {},                         // { taskId: number }
  completedToday: [],                          // task IDs completed today
  photoProofs: {},                             // { taskId: { dataUrl, verified, date } }
  lastResetDate: today(),
  comebackCompleted: false,

  setActiveTasks: (ids) => set({ activeTasks: ids }),

  setTaskFrequency: (taskId, freq) =>
    set(state => ({
      taskFrequencies: { ...state.taskFrequencies, [taskId]: freq },
    })),

  completeTask: (taskId) =>
    set(state => {
      if (state.completedToday.includes(taskId)) return {}
      return { completedToday: [...state.completedToday, taskId] }
    }),

  uncompleteTask: (taskId) =>
    set(state => ({
      completedToday: state.completedToday.filter(id => id !== taskId),
    })),

  addPhotoProof: (taskId, dataUrl) =>
    set(state => ({
      photoProofs: {
        ...state.photoProofs,
        [taskId]: { dataUrl, verified: false, date: today() },
      },
    })),

  resetDailyTasks: () =>
    set({ completedToday: [], lastResetDate: today(), comebackCompleted: false }),

  completeComebackChallenge: () =>
    set({ comebackCompleted: true }),

  getTodayTasks: () => {
    const state = get()
    return ALL_TASKS.filter(t => state.activeTasks.includes(t.id))
  },

  getCompletionRate: () => {
    const state = get()
    const total = state.activeTasks.length
    if (!total) return 0
    return state.completedToday.length / total
  },
})
