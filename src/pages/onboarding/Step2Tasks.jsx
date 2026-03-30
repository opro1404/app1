import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ALL_TASKS } from '../../constants/tasks'
import Button from '../../components/ui/Button'

const CATEGORY_COLORS = {
  fitness:     'text-green-400 bg-green-400/10',
  work:        'text-blue-400 bg-blue-400/10',
  environment: 'text-purple-400 bg-purple-400/10',
}

export default function Step2Tasks({ selected, setSelected, onNext, onBack }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(t)
  }, [])

  const toggle = (id) => {
    setSelected(sel =>
      sel.includes(id) ? sel.filter(s => s !== id) : [...sel, id]
    )
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <div className="px-5 pt-24 pb-4">
        <p className="text-orange font-bold text-sm tracking-widest uppercase mb-2">Step 2 of 3</p>
        <h1 className="text-4xl font-black text-white leading-tight mb-2">Pick Your Habits</h1>
        <p className="text-dim text-base">Select at least 3 habits to track daily.</p>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 rounded-full border-4 border-orange/20 border-t-orange"
            />
            <p className="text-dim font-semibold">Finding the best habits for you…</p>
          </motion.div>
        ) : (
          <motion.div key="tasks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 overflow-y-auto px-5 pb-4">
            <div className="grid grid-cols-2 gap-3">
              {ALL_TASKS.map((task, i) => {
                const isSelected = selected.includes(task.id)
                return (
                  <motion.button
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => toggle(task.id)}
                    className={`relative text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-orange bg-orange/10'
                        : 'border-border bg-card'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-orange flex items-center justify-center">
                        <span className="text-white text-xs font-black">✓</span>
                      </div>
                    )}
                    <p className="font-bold text-white text-sm mb-1 pr-5">{task.label}</p>
                    <p className="text-dim text-xs mb-2 leading-snug">{task.desc}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[task.category]}`}>
                      {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="px-5 pb-8 pt-4 bg-bg border-t border-border sticky bottom-0">
          <div className="flex items-center justify-between mb-3">
            <button onClick={onBack} className="text-dim font-semibold">← Back</button>
            <span className="text-dim text-sm">{selected.length} selected</span>
          </div>
          <Button onClick={onNext} disabled={selected.length < 3} className="w-full py-4 text-lg">
            Next →
          </Button>
        </div>
      )}
    </div>
  )
}
