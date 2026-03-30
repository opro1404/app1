import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import GreetingHeader from './GreetingHeader'
import ProgressionRow from './ProgressionRow'
import StreakBadge from './StreakBadge'
import TaskChecklist from './TaskChecklist'
import WeeklyBar from './WeeklyBar'
import ComebackBanner from './ComebackBanner'

export default function HomePage() {
  const comebackMode = useAppStore(s => s.settings.comebackMode)

  return (
    <div className="min-h-dvh bg-bg px-4 pt-12 pb-6">
      <GreetingHeader />

      <div className="mt-6">
        {comebackMode ? <ComebackBanner /> : <StreakBadge />}
      </div>

      <div className="mt-5">
        <p className="text-dim text-xs font-bold uppercase tracking-widest mb-3">Life Levels</p>
        <ProgressionRow />
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-dim text-xs font-bold uppercase tracking-widest">Today's Habits</p>
        </div>
        <TaskChecklist />
      </div>

      <div className="mt-6">
        <WeeklyBar />
      </div>
    </div>
  )
}
