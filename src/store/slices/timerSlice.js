export const createTimerSlice = (set) => ({
  timer: {
    phase: 'setup',       // 'setup' | 'active' | 'complete'
    duration: 25 * 60,    // seconds
    elapsed: 0,
    selectedTask: null,
    proveItTriggered: false,
    proveItDismissed: false,
    proveItVerified: false,
    proveItTarget: null,  // random point (20-80%) to trigger
    sessionVerified: false,
  },

  setTimerDuration: (seconds) =>
    set(state => ({ timer: { ...state.timer, duration: seconds } })),

  setTimerTask: (taskId) =>
    set(state => ({ timer: { ...state.timer, selectedTask: taskId } })),

  startTimer: (duration, taskId) => {
    const pct = 0.2 + Math.random() * 0.6 // 20–80%
    set(state => ({
      timer: {
        ...state.timer,
        phase: 'active',
        duration,
        elapsed: 0,
        selectedTask: taskId,
        proveItTriggered: false,
        proveItDismissed: false,
        proveItVerified: false,
        proveItTarget: Math.floor(duration * pct),
        sessionVerified: false,
      },
    }))
  },

  tickTimer: () =>
    set(state => {
      const { elapsed, duration, proveItTarget, proveItTriggered, proveItDismissed } = state.timer
      const newElapsed = elapsed + 1
      const shouldTrigger =
        !proveItTriggered &&
        !proveItDismissed &&
        proveItTarget !== null &&
        newElapsed >= proveItTarget

      if (newElapsed >= duration) {
        return { timer: { ...state.timer, elapsed: duration, phase: 'complete' } }
      }

      return {
        timer: {
          ...state.timer,
          elapsed: newElapsed,
          proveItTriggered: shouldTrigger ? true : proveItTriggered,
        },
      }
    }),

  pauseTimer: () =>
    set(state => ({ timer: { ...state.timer, phase: 'paused' } })),

  resumeTimer: () =>
    set(state => ({ timer: { ...state.timer, phase: 'active' } })),

  stopTimer: () =>
    set(state => ({
      timer: {
        ...state.timer,
        phase: 'setup',
        elapsed: 0,
        proveItTriggered: false,
        proveItDismissed: false,
      },
    })),

  completeTimer: () =>
    set(state => ({ timer: { ...state.timer, phase: 'complete' } })),

  dismissProveIt: (verified) =>
    set(state => ({
      timer: {
        ...state.timer,
        proveItTriggered: false,
        proveItDismissed: true,
        proveItVerified: verified,
        sessionVerified: verified,
      },
    })),

  resetTimer: () =>
    set(state => ({
      timer: {
        ...state.timer,
        phase: 'setup',
        elapsed: 0,
        proveItTriggered: false,
        proveItDismissed: false,
        proveItVerified: false,
        sessionVerified: false,
        selectedTask: null,
      },
    })),
})
