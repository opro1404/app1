import { PROGRESSION } from '../../constants/progression'

const FITNESS_ICONS = ['🍔', '🍕', '🍳', '🥗', '🥦', '⚡']
const WORK_ICONS    = ['🚲', '🛵', '🚗', '🚙', '🚐', '🏎️']
const ENV_ICONS     = ['🏚️', '🏠', '🏢', '🏡', '🏰', '👑']

const ICONS = { fitness: FITNESS_ICONS, work: WORK_ICONS, environment: ENV_ICONS }

const SIZES = {
  sm: 'text-2xl',
  md: 'text-4xl',
  lg: 'text-6xl',
  xl: 'text-8xl',
}

export default function ProgressionIcon({ category, level, size = 'md', className = '' }) {
  const icons = ICONS[category] || FITNESS_ICONS
  const icon = icons[Math.min(level - 1, 5)]
  return (
    <span className={`${SIZES[size]} ${className}`} role="img" aria-label={`${category} level ${level}`}>
      {icon}
    </span>
  )
}
