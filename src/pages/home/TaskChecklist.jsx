import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { ALL_TASKS } from '../../constants/tasks'
import TaskItem from '../../components/tasks/TaskItem'

export default function TaskChecklist() {
  const activeTasks    = useAppStore(s => s.activeTasks)
  const completedToday = useAppStore(s => s.completedToday)
  const tasks = ALL_TASKS.filter(t => activeTasks.includes(t.id))
  const done  = completedToday.length
  const total = tasks.length
  const pct   = total ? Math.round((done / total) * 100) : 0

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-dim text-xs">{done}/{total} complete</span>
        <span className="text-orange font-bold text-xs">{pct}%</span>
      </div>

      <div className="w-full bg-muted rounded-full h-1 mb-4 overflow-hidden">
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5 }}
          className="h-full bg-orange rounded-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        {tasks.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <TaskItem task={task} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
