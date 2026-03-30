import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { PROGRESSION, getXPProgress } from '../../constants/progression'
import ProgressionIcon from './ProgressionIcon'

const ROUTE = { fitness: '/progress/fitness', work: '/progress/work', environment: '/progress/environment' }
const LABELS = { fitness: 'Fitness', work: 'Work', environment: 'Home' }

export default function ProgressionCard({ category }) {
  const navigate = useNavigate()
  const data = useAppStore(s => s.progression[category])
  const levels = PROGRESSION[category]
  const levelData = levels[data.level - 1]
  const progress = getXPProgress(category, data.xp)

  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      onClick={() => navigate(ROUTE[category])}
      className="flex-1 bg-card border border-border rounded-2xl p-3 flex flex-col items-center gap-2 relative overflow-hidden"
    >
      {/* Glow bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange/5 to-transparent pointer-events-none" />

      <ProgressionIcon category={category} level={data.level} size="md" />

      <div className="w-full">
        <div className="flex justify-between items-center mb-1">
          <span className="text-white text-xs font-bold">{LABELS[category]}</span>
          <span className="text-orange text-xs font-black">Lv.{data.level}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-1 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-orange rounded-full"
          />
        </div>
      </div>

      <p className="text-dim text-[10px] text-center">{levelData.label}</p>
    </motion.button>
  )
}
