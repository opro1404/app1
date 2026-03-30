import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { ALL_TASKS, FOCUS_PRESETS } from '../../constants/tasks'
import Button from '../../components/ui/Button'

export default function FocusSetup({ onStart }) {
  const activeTasks = useAppStore(s => s.activeTasks)
  const tasks = ALL_TASKS.filter(t => activeTasks.includes(t.id))

  const [duration, setDuration] = useState(25)
  const [selectedTask, setSelectedTask] = useState(null)
  const [custom, setCustom] = useState('')

  const handleStart = () => {
    const mins = custom ? parseInt(custom) : duration
    if (!mins || mins < 1) return
    onStart(mins * 60, selectedTask)
  }

  return (
    <div className="flex flex-col min-h-dvh px-4 pt-12 pb-8 bg-bg">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-black text-white mb-1">Focus Session</h1>
        <p className="text-dim text-sm mb-8">Lock in. Get it done. Level up.</p>
      </motion.div>

      {/* Duration Presets */}
      <div className="mb-6">
        <p className="text-dim text-xs font-bold uppercase tracking-widest mb-3">Duration</p>
        <div className="flex gap-2 flex-wrap">
          {FOCUS_PRESETS.map(min => (
            <motion.button
              key={min}
              whileTap={{ scale: 0.9 }}
              onClick={() => { setDuration(min); setCustom('') }}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                duration === min && !custom
                  ? 'bg-orange text-white orange-glow'
                  : 'bg-card border border-border text-dim'
              }`}
            >
              {min}m
            </motion.button>
          ))}
          <div className="flex items-center gap-1 bg-card border border-border rounded-xl px-3 py-2">
            <input
              value={custom}
              onChange={e => { setCustom(e.target.value); setDuration(0) }}
              placeholder="Custom"
              type="number"
              className="w-16 bg-transparent text-white font-bold text-sm outline-none placeholder:text-dim"
            />
            <span className="text-dim text-xs">min</span>
          </div>
        </div>
      </div>

      {/* Task Selector */}
      <div className="mb-8">
        <p className="text-dim text-xs font-bold uppercase tracking-widest mb-3">Link a habit (optional)</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          <button
            onClick={() => setSelectedTask(null)}
            className={`shrink-0 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
              !selectedTask ? 'bg-orange text-white' : 'bg-card border border-border text-dim'
            }`}
          >
            Free Focus
          </button>
          {tasks.map(task => (
            <button
              key={task.id}
              onClick={() => setSelectedTask(task.id)}
              className={`shrink-0 px-4 py-2 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                selectedTask === task.id ? 'bg-orange text-white' : 'bg-card border border-border text-dim'
              }`}
            >
              {task.label}
            </button>
          ))}
        </div>
      </div>

      {/* Session Summary */}
      <div className="flex-1" />
      <div className="bg-card border border-border rounded-2xl p-4 mb-6 flex items-center justify-between">
        <div>
          <p className="text-dim text-xs">Session</p>
          <p className="text-white font-black text-xl">{custom || duration} minutes</p>
        </div>
        <div className="text-right">
          <p className="text-dim text-xs">Linked to</p>
          <p className="text-orange font-bold text-sm">{selectedTask ? tasks.find(t => t.id === selectedTask)?.label : 'Free Focus'}</p>
        </div>
      </div>

      <Button onClick={handleStart} disabled={!custom && !duration} className="w-full py-4 text-lg">
        🎯 Start Session
      </Button>
    </div>
  )
}
