import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good Morning'
  if (h < 17) return 'Good Afternoon'
  return 'Good Evening'
}

export default function GreetingHeader() {
  const user  = useAppStore(s => s.user)
  const score = user.score

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start justify-between"
    >
      <div>
        <p className="text-dim text-sm font-semibold">{getGreeting()},</p>
        <h1 className="text-3xl font-black text-white">{user.name} 👋</h1>
      </div>
      <div className="flex flex-col items-end">
        <div className="bg-orange/10 border border-orange/20 rounded-2xl px-3 py-1.5 text-right">
          <p className="text-orange font-black text-xl leading-none">{score.toLocaleString()}</p>
          <p className="text-orange/70 text-xs font-semibold">Score</p>
        </div>
      </div>
    </motion.div>
  )
}
