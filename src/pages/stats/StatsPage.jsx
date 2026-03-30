import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { MOCK_STATS, MOCK_WEEKLY_STATS } from '../../constants/mockData'
import RingChart from '../../components/charts/RingChart'
import WeeklyChart from '../../components/charts/WeeklyChart'
import Card from '../../components/ui/Card'
import { useStreakDisplay } from '../../hooks/useStreak'

const STAT_CARDS = [
  { key: 'completion',  label: 'Completion',  icon: '✅', color: '#22c55e', suffix: '%' },
  { key: 'consistency', label: 'Consistency', icon: '📊', color: '#3b82f6', suffix: '%' },
  { key: 'focusScore',  label: 'Focus Score', icon: '🎯', color: '#a855f7', suffix: '%' },
  { key: 'streak',      label: 'Day Streak',  icon: '🔥', color: '#FF6B2B', suffix: ' days' },
]

export default function StatsPage() {
  const user = useAppStore(s => s.user)
  const { color: streakColor } = useStreakDisplay(user.streak)

  const stats = {
    ...MOCK_STATS,
    streak: user.streak,
    score: user.score,
  }

  return (
    <div className="min-h-dvh bg-bg px-4 pt-12 pb-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-black text-white mb-1">Your Stats</h1>
        <p className="text-dim text-sm mb-6">Track your progress across all dimensions.</p>
      </motion.div>

      {/* Score Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-orange/20 to-orange-dark/10 border border-orange/30 rounded-3xl p-5 mb-5 text-center"
      >
        <p className="text-dim text-xs font-bold uppercase tracking-widest mb-1">Total Score</p>
        <p className="text-white font-black text-5xl">{stats.score.toLocaleString()}</p>
        <p className="text-orange text-sm font-semibold mt-1">Keep pushing to the top 🚀</p>
      </motion.div>

      {/* Ring Charts row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-3 mb-5"
      >
        {[
          { value: stats.completion,  label: `${stats.completion}%`,  sub: 'Done',      color: '#22c55e' },
          { value: stats.consistency, label: `${stats.consistency}%`, sub: 'Streak',    color: '#3b82f6' },
          { value: stats.focusScore,  label: `${stats.focusScore}%`,  sub: 'Focus',     color: '#a855f7' },
        ].map((item, i) => (
          <Card key={i} className="p-3 flex flex-col items-center gap-2">
            <RingChart value={item.value} size={72} strokeWidth={7} color={item.color} label={item.label} sublabel={item.sub} />
          </Card>
        ))}
      </motion.div>

      {/* Streak card */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <Card className="p-4 mb-5 flex items-center gap-4">
          <div className="text-4xl" style={{ filter: `drop-shadow(0 0 8px ${streakColor})` }}>🔥</div>
          <div>
            <p className="text-white font-black text-3xl" style={{ color: streakColor }}>{user.streak} Days</p>
            <p className="text-dim text-xs font-semibold">Current Streak</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-dim text-xs">Best Habit</p>
            <p className="text-white font-bold text-sm">Morning Workout</p>
          </div>
        </Card>
      </motion.div>

      {/* Weekly chart */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="p-4 mb-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-white font-bold">Weekly Score</p>
            <span className="text-orange text-xs font-bold">Last 7 days</span>
          </div>
          <WeeklyChart />
          <div className="flex justify-between mt-4 pt-4 border-t border-border">
            {MOCK_WEEKLY_STATS.slice(-4).map((w, i) => (
              <div key={i} className="text-center">
                <p className="text-white font-bold text-sm">{w.score}</p>
                <p className="text-dim text-xs">{Math.round(w.completionRate * 100)}%</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Stat grid */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Sessions', value: '12', icon: '⏱️', sub: 'this month' },
            { label: 'Focus Time', value: '8.5h', icon: '🎯', sub: 'this week' },
            { label: 'Tasks Done', value: '84', icon: '✅', sub: 'total' },
            { label: 'Photos Shared', value: '21', icon: '📸', sub: 'total' },
          ].map((s, i) => (
            <Card key={i} className="p-4">
              <p className="text-2xl mb-2">{s.icon}</p>
              <p className="text-white font-black text-2xl">{s.value}</p>
              <p className="text-dim text-xs">{s.label}</p>
              <p className="text-dim text-[10px]">{s.sub}</p>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
