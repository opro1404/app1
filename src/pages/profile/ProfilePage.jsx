import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { MOCK_PHOTO_PROOFS, MOCK_STATS } from '../../constants/mockData'
import { PROGRESSION } from '../../constants/progression'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import ProgressionIcon from '../../components/progression/ProgressionIcon'
import { useStreakDisplay } from '../../hooks/useStreak'

const VERIFIED_BADGES = 12

export default function ProfilePage() {
  const navigate    = useNavigate()
  const user        = useAppStore(s => s.user)
  const progression = useAppStore(s => s.progression)
  const activeTasks = useAppStore(s => s.activeTasks)
  const { color }   = useStreakDisplay(user.streak)

  const CATEGORIES = [
    { id: 'fitness',     label: 'Fitness' },
    { id: 'work',        label: 'Work' },
    { id: 'environment', label: 'Home' },
  ]

  return (
    <div className="min-h-dvh bg-bg pb-6">
      {/* Header */}
      <div className="relative bg-gradient-to-b from-orange/10 to-bg px-4 pt-12 pb-8">
        <button
          onClick={() => navigate('/settings')}
          className="absolute right-4 top-12 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-dim hover:text-white transition-colors"
        >
          ⚙️
        </button>

        <div className="flex flex-col items-center text-center">
          <Avatar name={user.name} size="lg" className="mb-3" />
          <h1 className="text-white font-black text-2xl">{user.name}</h1>
          <p className="text-dim text-sm">@{user.name.toLowerCase()}</p>

          <div className="flex items-center gap-2 mt-3">
            <Badge color="orange">🏆 {user.score.toLocaleString()} pts</Badge>
            <div className="flex items-center gap-1 bg-card border border-border rounded-full px-3 py-1" style={{ borderColor: `${color}40` }}>
              <span style={{ filter: `drop-shadow(0 0 4px ${color})` }}>🔥</span>
              <span className="font-black text-sm" style={{ color }}>{user.streak}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Levels */}
        <Card className="p-4">
          <p className="text-dim text-xs font-bold uppercase tracking-widest mb-3">Life Levels</p>
          <div className="flex justify-around">
            {CATEGORIES.map(cat => (
              <div key={cat.id} className="flex flex-col items-center gap-2">
                <ProgressionIcon category={cat.id} level={progression[cat.id].level} size="md" />
                <div className="text-center">
                  <p className="text-white font-black text-sm">Lv.{progression[cat.id].level}</p>
                  <p className="text-dim text-xs">{cat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Active streaks */}
        <Card className="p-4">
          <p className="text-dim text-xs font-bold uppercase tracking-widest mb-3">Active Habits</p>
          <div className="flex flex-col gap-2">
            {activeTasks.slice(0, 4).map((id, i) => (
              <div key={id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange" />
                  <span className="text-white text-sm font-medium">{id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                </div>
                <div className="flex items-center gap-1 text-sm" style={{ color }}>
                  <span>🔥</span>
                  <span className="font-bold">{14 - i}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Verified sessions */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-dim text-xs font-bold uppercase tracking-widest">Verified Sessions</p>
            <Badge color="green">✅ {VERIFIED_BADGES} badges</Badge>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: VERIFIED_BADGES }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className="aspect-square rounded-xl bg-gradient-to-br from-orange/20 to-orange-dark/10 border border-orange/20 flex items-center justify-center"
              >
                <span className="text-xl">🏅</span>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Photo grid */}
        <Card className="p-4">
          <p className="text-dim text-xs font-bold uppercase tracking-widest mb-3">Photo Proofs</p>
          <div className="grid grid-cols-2 gap-2">
            {MOCK_PHOTO_PROOFS.map((proof, i) => (
              <motion.div
                key={proof.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="aspect-square rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-2 relative overflow-hidden"
              >
                <span className="text-3xl">📷</span>
                <p className="text-dim text-xs text-center px-2">{proof.taskId.replace(/_/g, ' ')}</p>
                {proof.verified && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Stats summary */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Completion', value: `${MOCK_STATS.completion}%` },
            { label: 'Consistency', value: `${MOCK_STATS.consistency}%` },
            { label: 'Focus', value: `${MOCK_STATS.focusScore}%` },
          ].map((s, i) => (
            <Card key={i} className="p-3 text-center">
              <p className="text-white font-black text-lg">{s.value}</p>
              <p className="text-dim text-xs">{s.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
