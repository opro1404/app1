import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { PROGRESSION, getXPProgress } from '../../constants/progression'
import ProgressionIcon from '../../components/progression/ProgressionIcon'
import ProgressBar from '../../components/ui/ProgressBar'

export default function LevelTimeline({ category, title, icon }) {
  const navigate    = useNavigate()
  const data        = useAppStore(s => s.progression[category])
  const levels      = PROGRESSION[category]
  const progress    = getXPProgress(category, data.xp)
  const currentLevel = data.level

  return (
    <div className="min-h-dvh bg-bg pb-8">
      {/* Hero header */}
      <div className="relative bg-gradient-to-b from-orange/10 to-bg pt-12 pb-8 px-4 text-center overflow-hidden">
        <button
          onClick={() => navigate('/progress')}
          className="absolute left-4 top-12 text-dim hover:text-white transition-colors text-sm font-semibold"
        >
          ← Back
        </button>
        <p className="text-dim text-xs font-bold uppercase tracking-widest mb-2">{title}</p>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ProgressionIcon category={category} level={currentLevel} size="xl" />
        </motion.div>
        <h2 className="text-white font-black text-2xl mt-3">{levels[currentLevel - 1].label}</h2>
        <div className="flex items-center justify-center gap-2 mt-2 mb-4">
          <div className="bg-orange/20 border border-orange/30 rounded-full px-4 py-1 flex items-center gap-2">
            <span className="text-orange font-black">Level {currentLevel}</span>
            <span className="text-dim">•</span>
            <span className="text-white text-sm">{data.xp} XP</span>
          </div>
        </div>
        <ProgressBar value={progress} max={100} height="h-2" className="max-w-[200px] mx-auto" />
        <p className="text-dim text-xs mt-2">
          {currentLevel < 6 ? `${levels[currentLevel].xpRequired - data.xp} XP to Level ${currentLevel + 1}` : '🏆 MAX LEVEL'}
        </p>
      </div>

      {/* Timeline */}
      <div className="px-4 pt-6">
        <p className="text-dim text-xs font-bold uppercase tracking-widest mb-4">All Levels</p>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-border" />

          {levels.map((level, i) => {
            const isUnlocked = i + 1 <= currentLevel
            const isCurrent  = i + 1 === currentLevel
            const levelNum   = i + 1

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`relative flex gap-4 mb-4 pl-16 ${!isUnlocked ? 'opacity-40' : ''}`}
              >
                {/* Icon on line */}
                <div className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 z-10
                  ${isCurrent ? 'border-orange bg-orange/10 orange-glow' : isUnlocked ? 'border-green-500/50 bg-green-500/10' : 'border-border bg-card'}`}
                >
                  <ProgressionIcon category={category} level={levelNum} size="sm" />
                </div>

                {/* Content */}
                <div className={`flex-1 bg-card border rounded-2xl p-4 ${isCurrent ? 'border-orange orange-glow' : 'border-border'}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-dim text-xs font-bold">Level {levelNum}</span>
                        {isCurrent && <span className="text-orange text-xs font-black bg-orange/10 px-2 py-0.5 rounded-full">CURRENT</span>}
                        {isUnlocked && !isCurrent && <span className="text-green-400 text-xs">✓ Unlocked</span>}
                      </div>
                      <p className="text-white font-bold">{level.label}</p>
                      <p className="text-dim text-xs mt-0.5">{level.desc}</p>
                    </div>
                    <span className="text-dim text-xs shrink-0 ml-2">{level.xpRequired} XP</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
