import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { PROGRESSION } from '../../constants/progression'
import ProgressionIcon from '../../components/progression/ProgressionIcon'
import ProgressBar from '../../components/ui/ProgressBar'
import { getXPProgress } from '../../constants/progression'

const CATEGORIES = [
  { id: 'fitness',     label: 'Fitness',     sub: 'Nutrition Level', route: '/progress/fitness',     desc: 'Upgrade your diet from junk to elite nutrition.' },
  { id: 'work',        label: 'Work/Money',  sub: 'Vehicle Level',   route: '/progress/work',        desc: 'Level up from bicycle to luxury car.' },
  { id: 'environment', label: 'Environment', sub: 'Home Level',      route: '/progress/environment', desc: 'Build your dream space from empty room to mansion.' },
]

export default function ProgressPage() {
  const navigate = useNavigate()
  const progression = useAppStore(s => s.progression)

  return (
    <div className="min-h-dvh bg-bg px-4 pt-12 pb-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-black text-white mb-1">Your Progress</h1>
        <p className="text-dim text-sm mb-8">Level up your life in every dimension.</p>
      </motion.div>

      <div className="flex flex-col gap-4">
        {CATEGORIES.map((cat, i) => {
          const data = progression[cat.id]
          const levels = PROGRESSION[cat.id]
          const levelData = levels[data.level - 1]
          const progress = getXPProgress(cat.id, data.xp)

          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(cat.route)}
              className="w-full bg-card border border-border rounded-3xl p-5 text-left relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 bottom-0 flex items-center pr-4 opacity-20">
                <ProgressionIcon category={cat.id} level={data.level} size="xl" />
              </div>

              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-dim text-xs font-bold uppercase tracking-widest">{cat.sub}</p>
                    <h2 className="text-white font-black text-2xl">{cat.label}</h2>
                  </div>
                  <div className="bg-orange/20 border border-orange/30 rounded-xl px-3 py-1.5 text-right">
                    <p className="text-orange font-black text-lg leading-none">Lv.{data.level}</p>
                    <p className="text-orange/70 text-xs">{progress}%</p>
                  </div>
                </div>

                <p className="text-dim text-sm mb-3">{levelData.label}</p>

                <ProgressBar value={progress} max={100} height="h-1.5" />

                <div className="flex items-center justify-between mt-2">
                  <span className="text-dim text-xs">{data.xp} XP total</span>
                  <span className="text-orange text-xs font-bold">
                    {data.level < 6 ? `${PROGRESSION[cat.id][data.level].xpRequired - data.xp} XP to next` : 'MAX LEVEL'}
                  </span>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
