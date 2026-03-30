import { motion } from 'framer-motion'
import { MOCK_WEEKLY_STATS } from '../../constants/mockData'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function WeeklyChart({ data = MOCK_WEEKLY_STATS }) {
  const maxScore = Math.max(...data.map(d => d.score), 1)

  return (
    <div className="flex items-end justify-between gap-1.5 h-24">
      {data.map((d, i) => {
        const pct = (d.score / maxScore) * 100
        const isToday = i === data.length - 1
        return (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: 'easeOut' }}
              style={{ height: `${Math.max(8, pct)}%`, originY: 1 }}
              className={`w-full rounded-t-lg ${isToday ? 'bg-orange' : 'bg-muted'}`}
            />
            <span className={`text-[10px] font-semibold ${isToday ? 'text-orange' : 'text-dim'}`}>
              {DAYS[i]}
            </span>
          </div>
        )
      })}
    </div>
  )
}
