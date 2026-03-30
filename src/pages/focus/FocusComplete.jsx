import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { ALL_TASKS } from '../../constants/tasks'
import Button from '../../components/ui/Button'

export default function FocusComplete({ onDone, onAnother }) {
  const timer     = useAppStore(s => s.timer)
  const addXP     = useAppStore(s => s.addXP)
  const addScore  = useAppStore(s => s.addScore)
  const task      = ALL_TASKS.find(t => t.id === timer.selectedTask)
  const durationMins = Math.round(timer.duration / 60)
  const xpBonus   = durationMins // 1 XP per minute per category

  const handleDone = () => {
    // Award bonus XP to all categories for focus time
    addXP('fitness', xpBonus)
    addXP('work', xpBonus)
    addXP('environment', xpBonus)
    addScore(durationMins * 2)
    onDone()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-bg px-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="text-8xl mb-6"
      >
        {timer.sessionVerified ? '🏆' : '✅'}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-4xl font-black text-white mb-2">Session Complete!</h2>
        <p className="text-dim mb-8">You crushed it. Keep the momentum going.</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-xs mx-auto mb-8">
          <div className="bg-card border border-border rounded-2xl p-4">
            <p className="text-orange font-black text-2xl">{durationMins}m</p>
            <p className="text-dim text-xs">Duration</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4">
            <p className="text-orange font-black text-2xl">+{xpBonus * 3}</p>
            <p className="text-dim text-xs">XP Earned</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4">
            <p className="text-orange font-black text-lg">{task?.label || 'Free'}</p>
            <p className="text-dim text-xs">Habit</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4">
            <p className={`font-black text-lg ${timer.sessionVerified ? 'text-green-400' : 'text-dim'}`}>
              {timer.sessionVerified ? '✅ Yes' : '—'}
            </p>
            <p className="text-dim text-xs">Verified</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <Button onClick={onAnother} variant="secondary" className="py-4 text-base">
            🔄 Start Another
          </Button>
          <Button onClick={handleDone} className="py-4 text-base">
            🏠 Done
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
