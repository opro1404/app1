import { useState } from 'react'
import { motion } from 'framer-motion'
import { ALL_TASKS } from '../../constants/tasks'
import Button from '../../components/ui/Button'

export default function Step3Frequency({ selectedIds, onBack, onFinish }) {
  const tasks = ALL_TASKS.filter(t => selectedIds.includes(t.id))
  const [freqs, setFreqs] = useState(
    Object.fromEntries(tasks.map(t => [t.id, t.defaultFreq]))
  )

  const adjust = (id, delta) => {
    setFreqs(f => ({ ...f, [id]: Math.min(7, Math.max(1, f[id] + delta)) }))
  }

  return (
    <div className="flex flex-col min-h-dvh px-5 pt-24 pb-8">
      <p className="text-orange font-bold text-sm tracking-widest uppercase mb-2">Step 3 of 3</p>
      <h1 className="text-4xl font-black text-white leading-tight mb-2">Set Your Frequency</h1>
      <p className="text-dim text-base mb-6">How often do you want to do each habit?</p>

      <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
        {tasks.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between"
          >
            <div className="flex-1 mr-4">
              <p className="font-bold text-white">{task.label}</p>
              <p className="text-orange text-sm font-semibold mt-0.5">{freqs[task.id]}x per week</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => adjust(task.id, -1)}
                disabled={freqs[task.id] <= 1}
                className="w-9 h-9 rounded-full bg-muted text-white font-black text-lg flex items-center justify-center disabled:opacity-30"
              >
                −
              </button>
              <span className="text-white font-black text-xl w-5 text-center">{freqs[task.id]}</span>
              <button
                onClick={() => adjust(task.id, +1)}
                disabled={freqs[task.id] >= 7}
                className="w-9 h-9 rounded-full bg-orange text-white font-black text-lg flex items-center justify-center disabled:opacity-30"
              >
                +
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-4">
        <div className="flex items-center justify-between mb-3">
          <button onClick={onBack} className="text-dim font-semibold">← Back</button>
        </div>
        <Button onClick={() => onFinish(freqs)} className="w-full py-4 text-lg">
          🚀 Start My Journey
        </Button>
      </div>
    </div>
  )
}
