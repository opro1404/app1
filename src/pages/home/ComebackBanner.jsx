import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { COMEBACK_CHALLENGE } from '../../constants/mockData'
import Button from '../../components/ui/Button'

export default function ComebackBanner() {
  const completeComebackChallenge = useAppStore(s => s.completeComebackChallenge)
  const comebackCompleted = useAppStore(s => s.comebackCompleted)
  const restoreStreak  = useAppStore(s => s.restoreStreak)
  const setComebackMode = useAppStore(s => s.setComebackMode)
  const addScore       = useAppStore(s => s.addScore)

  const handleComplete = () => {
    completeComebackChallenge()
    restoreStreak(COMEBACK_CHALLENGE.streakRestore)
    addScore(150)
    setComebackMode(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-r from-red-500/20 to-orange/20 border border-orange/30 rounded-2xl p-5"
    >
      <div className="flex items-start gap-3 mb-4">
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-4xl"
        >
          ⚡
        </motion.span>
        <div>
          <h3 className="text-white font-black text-lg leading-tight">Comeback Challenge</h3>
          <p className="text-dim text-sm mt-0.5">{COMEBACK_CHALLENGE.message}</p>
        </div>
      </div>

      <div className="bg-black/30 rounded-xl p-3 mb-4">
        <p className="text-white font-bold text-sm">{COMEBACK_CHALLENGE.label}</p>
        <p className="text-orange text-xs font-semibold mt-1">+{COMEBACK_CHALLENGE.streakRestore} streak days on completion</p>
      </div>

      {comebackCompleted ? (
        <div className="flex items-center justify-center gap-2 py-2">
          <span className="text-2xl">✅</span>
          <span className="text-white font-bold">Challenge Complete!</span>
        </div>
      ) : (
        <Button onClick={handleComplete} className="w-full py-3">
          🔥 Accept the Challenge
        </Button>
      )}
    </motion.div>
  )
}
