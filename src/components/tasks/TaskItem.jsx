import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { ALL_TASKS } from '../../constants/tasks'
import PhotoProofSheet from './PhotoProofSheet'

const CATEGORY_BADGE = {
  fitness:     'text-green-400',
  work:        'text-blue-400',
  environment: 'text-purple-400',
}

export default function TaskItem({ task }) {
  const completedToday  = useAppStore(s => s.completedToday)
  const completeTask    = useAppStore(s => s.completeTask)
  const uncompleteTask  = useAppStore(s => s.uncompleteTask)
  const addXP           = useAppStore(s => s.addXP)
  const addScore        = useAppStore(s => s.addScore)
  const updateLastActiveDate = useAppStore(s => s.updateLastActiveDate)
  const settings        = useAppStore(s => s.settings)
  const photoProofs     = useAppStore(s => s.photoProofs)

  const [showProof, setShowProof] = useState(false)
  const isDone = completedToday.includes(task.id)
  const hasProof = !!photoProofs[task.id]

  const handleToggle = () => {
    if (isDone) {
      uncompleteTask(task.id)
    } else {
      completeTask(task.id)
      addXP(task.category, task.xpReward)
      addScore(task.scoreReward)
      updateLastActiveDate()
      if (task.requiresPhotoProof && settings.photoProofEnabled) {
        setShowProof(true)
      }
    }
  }

  return (
    <>
      <motion.div
        layout
        className={`flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${
          isDone ? 'bg-orange/5 border-orange/20' : 'bg-card border-border'
        }`}
      >
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleToggle}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
            isDone ? 'bg-orange border-orange' : 'border-dim'
          }`}
        >
          <AnimatePresence>
            {isDone && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="text-white text-xs font-black"
              >
                ✓
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <div className="flex-1">
          <p className={`font-bold text-sm transition-all ${isDone ? 'text-dim line-through' : 'text-white'}`}>
            {task.label}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`text-xs font-semibold ${CATEGORY_BADGE[task.category]}`}>
              {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
            </span>
            <span className="text-dim text-xs">+{task.xpReward} XP</span>
          </div>
        </div>

        {task.requiresPhotoProof && (
          <button
            onClick={() => setShowProof(true)}
            className={`text-lg ${hasProof ? 'opacity-100' : 'opacity-30'}`}
          >
            {hasProof ? '✅' : '📷'}
          </button>
        )}
      </motion.div>

      <PhotoProofSheet
        isOpen={showProof}
        onClose={() => setShowProof(false)}
        taskId={task.id}
        taskLabel={task.label}
      />
    </>
  )
}
