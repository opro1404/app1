export const PROGRESSION = {
  fitness: [
    { level: 1, label: 'Junk Food Diet',    emoji: '🍔', desc: 'Fast food every day',       xpRequired: 0,    color: '#6B6B6B' },
    { level: 2, label: 'Fast Food Regular', emoji: '🍕', desc: 'Takeout a few times a week', xpRequired: 200,  color: '#8B7355' },
    { level: 3, label: 'Home Cooking',      emoji: '🍳', desc: 'Cooking your own meals',     xpRequired: 500,  color: '#4CAF50' },
    { level: 4, label: 'Balanced Meals',    emoji: '🥗', desc: 'Balanced macros & nutrients',xpRequired: 900,  color: '#2196F3' },
    { level: 5, label: 'Clean Eating',      emoji: '🥦', desc: 'Whole foods, no junk',       xpRequired: 1400, color: '#9C27B0' },
    { level: 6, label: 'Elite Nutrition',   emoji: '⚡', desc: 'Optimised performance diet', xpRequired: 2000, color: '#FF6B2B' },
  ],
  work: [
    { level: 1, label: 'Bicycle',        emoji: '🚲', desc: 'Just getting started',          xpRequired: 0,    color: '#6B6B6B' },
    { level: 2, label: 'Scooter',        emoji: '🛵', desc: 'Making moves',                  xpRequired: 200,  color: '#8B7355' },
    { level: 3, label: 'Hatchback',      emoji: '🚗', desc: 'First real car',                xpRequired: 500,  color: '#4CAF50' },
    { level: 4, label: 'Sedan',          emoji: '🚙', desc: 'Climbing the ranks',            xpRequired: 900,  color: '#2196F3' },
    { level: 5, label: 'SUV',            emoji: '🚐', desc: 'Living comfortably',            xpRequired: 1400, color: '#9C27B0' },
    { level: 6, label: 'Luxury Vehicle', emoji: '🏎️', desc: 'Top of the game',              xpRequired: 2000, color: '#FF6B2B' },
  ],
  environment: [
    { level: 1, label: 'Empty Room',      emoji: '🏚️', desc: 'Bare walls, big dreams',      xpRequired: 0,    color: '#6B6B6B' },
    { level: 2, label: 'Basic Studio',    emoji: '🏠', desc: 'Basic furniture',              xpRequired: 200,  color: '#8B7355' },
    { level: 3, label: 'Apartment',       emoji: '🏢', desc: 'A proper living space',        xpRequired: 500,  color: '#4CAF50' },
    { level: 4, label: 'House',           emoji: '🏡', desc: 'Your own place',               xpRequired: 900,  color: '#2196F3' },
    { level: 5, label: 'Modern Home',     emoji: '🏰', desc: 'Designed & upgraded',          xpRequired: 1400, color: '#9C27B0' },
    { level: 6, label: 'Luxury Mansion',  emoji: '👑', desc: 'The pinnacle of living',       xpRequired: 2000, color: '#FF6B2B' },
  ],
}

export const XP_THRESHOLDS = {
  fitness:     PROGRESSION.fitness.map(l => l.xpRequired),
  work:        PROGRESSION.work.map(l => l.xpRequired),
  environment: PROGRESSION.environment.map(l => l.xpRequired),
}

export function getLevelForXP(category, xp) {
  const thresholds = XP_THRESHOLDS[category]
  let level = 1
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (xp >= thresholds[i]) { level = i + 1; break }
  }
  return Math.min(level, 6)
}

export function getXPProgress(category, xp) {
  const thresholds = XP_THRESHOLDS[category]
  const level = getLevelForXP(category, xp)
  if (level >= 6) return 100
  const current = thresholds[level - 1]
  const next    = thresholds[level]
  return Math.round(((xp - current) / (next - current)) * 100)
}

export const CATEGORY_META = {
  fitness:     { label: 'Fitness',     icon: '🍽️', tab: 'fitness'     },
  work:        { label: 'Work/Money',  icon: '💼', tab: 'work'        },
  environment: { label: 'Environment', icon: '🏠', tab: 'environment' },
}
