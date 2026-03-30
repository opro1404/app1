export const ALL_TASKS = [
  { id: 'fitness_1', category: 'fitness',     label: 'Morning Workout',        desc: '30 min exercise to start the day',    xpReward: 60,  scoreReward: 12, requiresPhotoProof: true,  defaultFreq: 3 },
  { id: 'fitness_2', category: 'fitness',     label: 'Meal Prep',              desc: 'Prepare healthy meals for the week',  xpReward: 50,  scoreReward: 10, requiresPhotoProof: true,  defaultFreq: 2 },
  { id: 'fitness_3', category: 'fitness',     label: 'Drink 2L Water',         desc: 'Hit your daily hydration goal',       xpReward: 30,  scoreReward: 6,  requiresPhotoProof: false, defaultFreq: 7 },
  { id: 'fitness_4', category: 'fitness',     label: '8 Hours Sleep',          desc: 'Full recovery for peak performance',  xpReward: 40,  scoreReward: 8,  requiresPhotoProof: false, defaultFreq: 7 },
  { id: 'work_1',    category: 'work',        label: 'Deep Work Session',      desc: '90 min uninterrupted focused work',   xpReward: 80,  scoreReward: 16, requiresPhotoProof: false, defaultFreq: 5 },
  { id: 'work_2',    category: 'work',        label: 'Learn Something New',    desc: 'Read or take a course for 30 min',    xpReward: 50,  scoreReward: 10, requiresPhotoProof: false, defaultFreq: 5 },
  { id: 'work_3',    category: 'work',        label: 'Review Finances',        desc: 'Track income, expenses & savings',    xpReward: 40,  scoreReward: 8,  requiresPhotoProof: false, defaultFreq: 1 },
  { id: 'work_4',    category: 'work',        label: 'Network or Outreach',    desc: 'Connect with 1 person in your field', xpReward: 45,  scoreReward: 9,  requiresPhotoProof: false, defaultFreq: 3 },
  { id: 'env_1',     category: 'environment', label: 'Tidy Your Space',        desc: '15 min declutter and clean',          xpReward: 35,  scoreReward: 7,  requiresPhotoProof: true,  defaultFreq: 5 },
  { id: 'env_2',     category: 'environment', label: 'Gratitude Journal',      desc: 'Write 3 things you are grateful for', xpReward: 30,  scoreReward: 6,  requiresPhotoProof: false, defaultFreq: 7 },
  { id: 'custom',    category: 'fitness',     label: 'Other (Custom)',          desc: 'Add your own habit',                  xpReward: 40,  scoreReward: 8,  requiresPhotoProof: false, defaultFreq: 3 },
]

export const DEFAULT_ACTIVE_TASKS = [
  'fitness_1',
  'fitness_3',
  'work_1',
  'work_2',
  'env_1',
  'env_2',
]

export const FOCUS_PRESETS = [15, 25, 45, 60, 90]
