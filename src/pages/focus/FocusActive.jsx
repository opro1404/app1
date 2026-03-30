import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { ALL_TASKS } from '../../constants/tasks'
import { useTimerTick } from '../../hooks/useTimer'
import CountdownRing from '../../components/timer/CountdownRing'
import WaveformBg from '../../components/timer/WaveformBg'
import ProveItPopup from './ProveItPopup'
import Button from '../../components/ui/Button'

export default function FocusActive() {
  useTimerTick()

  const timer      = useAppStore(s => s.timer)
  const stopTimer  = useAppStore(s => s.stopTimer)
  const pauseTimer = useAppStore(s => s.pauseTimer)
  const resumeTimer= useAppStore(s => s.resumeTimer)

  const task = ALL_TASKS.find(t => t.id === timer.selectedTask)
  const pct  = timer.duration > 0 ? Math.round((timer.elapsed / timer.duration) * 100) : 0
  const isActive = timer.phase === 'active'

  return (
    <div className="relative flex flex-col items-center justify-center min-h-dvh bg-bg overflow-hidden">
      <WaveformBg />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Task label */}
        <div className="mb-8 text-center">
          <p className="text-dim text-xs font-bold uppercase tracking-widest mb-1">Focus Session</p>
          <p className="text-orange font-bold text-sm">{task ? task.label : 'Free Focus'}</p>
        </div>

        <CountdownRing
          elapsed={timer.elapsed}
          total={timer.duration}
          size={260}
        />

        <div className="mt-4 text-center">
          <span className="text-dim text-sm font-semibold">{pct}% complete</span>
        </div>

        {timer.proveItVerified && (
          <div className="mt-3 flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-1.5">
            <span className="text-green-400 font-bold text-sm">✅ Session Verified</span>
          </div>
        )}
      </motion.div>

      {/* Controls */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-4 px-8 z-10">
        <Button variant="ghost" onClick={stopTimer} className="flex-1 py-3 text-sm">
          ✕ Stop
        </Button>
        <Button
          variant={isActive ? 'secondary' : 'primary'}
          onClick={isActive ? pauseTimer : resumeTimer}
          className="flex-1 py-3 text-sm"
        >
          {isActive ? '⏸ Pause' : '▶ Resume'}
        </Button>
      </div>

      {/* Prove It Popup */}
      <AnimatePresence>
        {timer.proveItTriggered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
          >
            <ProveItPopup />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
