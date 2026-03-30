import { MOCK_USER } from '../../constants/mockData'

export const createUserSlice = (set, get) => ({
  user: { ...MOCK_USER },

  setOnboardingComplete: (val) =>
    set(state => ({ user: { ...state.user, onboardingComplete: val } })),

  addScore: (amount) =>
    set(state => ({ user: { ...state.user, score: state.user.score + amount } })),

  incrementStreak: () =>
    set(state => ({
      user: {
        ...state.user,
        streak: state.user.streak + 1,
        lastActiveDate: new Date().toISOString().slice(0, 10),
      },
    })),

  resetStreak: () =>
    set(state => ({ user: { ...state.user, streak: 0 } })),

  restoreStreak: (amount) =>
    set(state => ({
      user: {
        ...state.user,
        streak: state.user.streak + amount,
        lastActiveDate: new Date().toISOString().slice(0, 10),
      },
    })),

  updateLastActiveDate: () =>
    set(state => ({
      user: { ...state.user, lastActiveDate: new Date().toISOString().slice(0, 10) },
    })),

  setUserName: (name) =>
    set(state => ({ user: { ...state.user, name } })),
})
