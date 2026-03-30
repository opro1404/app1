import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import FocusSetup from './FocusSetup'
import FocusActive from './FocusActive'
import FocusComplete from './FocusComplete'

export default function FocusPage() {
  const navigate    = useNavigate()
  const timer       = useAppStore(s => s.timer)
  const startTimer  = useAppStore(s => s.startTimer)
  const resetTimer  = useAppStore(s => s.resetTimer)

  const phase = timer.phase === 'paused' ? 'active' : timer.phase

  return (
    <AnimatePresence mode="wait">
      {phase === 'setup' && (
        <motion.div key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <FocusSetup onStart={(duration, taskId) => startTimer(duration, taskId)} />
        </motion.div>
      )}
      {(phase === 'active') && (
        <motion.div key="active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <FocusActive />
        </motion.div>
      )}
      {phase === 'complete' && (
        <motion.div key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <FocusComplete
            onDone={() => { resetTimer(); navigate('/home') }}
            onAnother={() => resetTimer()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
