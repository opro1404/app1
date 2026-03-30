import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const TABS = [
  { path: '/home',     label: 'Home',    icon: HomeIcon },
  { path: '/focus',    label: 'Focus',   icon: FocusIcon },
  { path: '/stats',    label: 'Stats',   icon: StatsIcon },
  { path: '/progress', label: 'Progress',icon: ProgressIcon },
  { path: '/profile',  label: 'Profile', icon: ProfileIcon },
]

export default function BottomTabBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const active = TABS.find(t =>
    t.path === '/progress'
      ? location.pathname.startsWith('/progress')
      : location.pathname === t.path
  )?.path || '/home'

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50">
      <div className="glass border-t border-border flex items-center justify-around px-2 pb-safe pt-2 h-16">
        {TABS.map(tab => {
          const isActive = active === tab.path
          const Icon = tab.icon
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="relative flex flex-col items-center justify-center w-16 h-12 gap-0.5"
            >
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-xl bg-orange/10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={22}
                className={`relative transition-colors ${isActive ? 'text-orange' : 'text-dim'}`}
              />
              <span className={`relative text-[10px] font-semibold transition-colors ${isActive ? 'text-orange' : 'text-dim'}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function HomeIcon({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 12L12 3L21 12V21H15V15H9V21H3V12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  )
}

function FocusIcon({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
    </svg>
  )
}

function StatsIcon({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="12" width="4" height="9" rx="1" fill="currentColor" opacity="0.5"/>
      <rect x="10" y="6" width="4" height="15" rx="1" fill="currentColor" opacity="0.7"/>
      <rect x="17" y="2" width="4" height="19" rx="1" fill="currentColor"/>
    </svg>
  )
}

function ProgressIcon({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  )
}

function ProfileIcon({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M4 20C4 17 7.6 15 12 15C16.4 15 20 17 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}
