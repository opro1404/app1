import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { PROGRESSION } from '../../constants/progression'
import ProgressionIcon from './ProgressionIcon'
import Button from '../ui/Button'

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: (Math.random() - 0.5) * 300,
  y: (Math.random() - 0.5) * 400,
  rotate: Math.random() * 720 - 360,
  scale: 0.5 + Math.random() * 1,
  color: ['#FF6B2B', '#FFD700', '#FF8C5A', '#FFF'][i % 4],
}))

export default function LevelUpOverlay() {
  const levelUpPending = useAppStore(s => s.levelUpPending)
  const clearLevelUp   = useAppStore(s => s.clearLevelUp)

  if (!levelUpPending) return null

  const { category, newLevel } = levelUpPending
  const levelData = PROGRESSION[category][newLevel - 1]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={clearLevelUp}
    >
      {/* Particles */}
      {PARTICLES.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: 0, x: p.x, y: p.y, scale: p.scale, rotate: p.rotate }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
          className="absolute w-3 h-3 rounded-full pointer-events-none"
          style={{ background: p.color }}
        />
      ))}

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        className="bg-card border-2 border-orange rounded-3xl p-8 mx-6 text-center orange-glow-lg"
        onClick={e => e.stopPropagation()}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ProgressionIcon category={category} level={newLevel} size="xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-orange font-black text-sm tracking-widest uppercase mt-4 mb-1">Level Up!</p>
          <h2 className="text-white font-black text-3xl mb-1">{levelData.label}</h2>
          <p className="text-dim mb-6">{levelData.desc}</p>
          <div className="inline-flex items-center gap-2 bg-orange/20 border border-orange/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-orange font-black">Level {newLevel}</span>
          </div>
        </motion.div>

        <Button onClick={clearLevelUp} className="w-full py-3 text-base">
          🔥 Keep Going!
        </Button>
      </motion.div>
    </motion.div>
  )
}
