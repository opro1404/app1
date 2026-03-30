export const MOCK_USER = {
  name: 'Alex',
  score: 1043,
  streak: 14,
  lastActiveDate: new Date().toISOString().slice(0, 10),
  onboardingComplete: true,
  avatar: null,
}

export const MOCK_PROGRESSION = {
  fitness: { level: 3, xp: 620 },
  work: { level: 2, xp: 310 },
  environment: { level: 2, xp: 280 },
}

export const MOCK_WEEKLY_STATS = [
  { date: '2026-03-24', completionRate: 0.6, focusMinutes: 30, tasksCompleted: 3, score: 95 },
  { date: '2026-03-25', completionRate: 0.8, focusMinutes: 45, tasksCompleted: 4, score: 140 },
  { date: '2026-03-26', completionRate: 0.5, focusMinutes: 0,  tasksCompleted: 2, score: 60 },
  { date: '2026-03-27', completionRate: 0.9, focusMinutes: 60, tasksCompleted: 5, score: 180 },
  { date: '2026-03-28', completionRate: 0.7, focusMinutes: 25, tasksCompleted: 4, score: 120 },
  { date: '2026-03-29', completionRate: 1.0, focusMinutes: 90, tasksCompleted: 6, score: 220 },
  { date: '2026-03-30', completionRate: 0.7, focusMinutes: 45, tasksCompleted: 4, score: 140 },
]

export const MOCK_PHOTO_PROOFS = [
  { id: 'p1', taskId: 'fitness_1', date: '2026-03-28', dataUrl: null, verified: true },
  { id: 'p2', taskId: 'work_1',    date: '2026-03-28', dataUrl: null, verified: true },
  { id: 'p3', taskId: 'fitness_2', date: '2026-03-29', dataUrl: null, verified: false },
  { id: 'p4', taskId: 'env_1',     date: '2026-03-29', dataUrl: null, verified: true },
]

export const MOCK_STATS = {
  completion: 72,
  consistency: 85,
  focusScore: 60,
  streak: 14,
  score: 1043,
}

export const COMEBACK_CHALLENGE = {
  id: 'comeback_challenge',
  label: 'Rise & Grind — Complete 3 tasks today',
  message: "Every legend has a comeback story. Today is yours.",
  streakRestore: 5,
}
