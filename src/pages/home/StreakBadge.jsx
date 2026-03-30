import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { useStreakDisplay } from '../../hooks/useStreak'

export default function StreakBadge() {
  const streak = useAppStore(s => s.user.streak)
  const { color, health } = useStreakDisplay(streak)

  return (
    <div className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <motion.span
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-3xl"
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        >
          🔥
        </motion.span>
        <div>
          <p className="text-white font-black text-2xl leading-none" style={{ color }}>{streak}</p>
          <p className="text-dim text-xs font-semibold">Day Streak</p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1">
        <p className="text-dim text-xs font-semibold">Streak Health</p>
        <div className="flex items-center gap-2">
          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${health}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ background: color }}
            />
          </div>
          <span className="text-xs font-bold" style={{ color }}>{Math.round(health)}%</span>
        </div>
      </div>
    </div>
  )
}
