import { motion } from 'framer-motion'
import Button from '../../components/ui/Button'

export default function Step1Goals({ goals, setGoals, onNext }) {
  const updateGoal = (i, val) => {
    const g = [...goals]
    g[i] = val
    setGoals(g)
  }
  const addGoal = () => goals.length < 5 && setGoals([...goals, ''])
  const removeGoal = (i) => goals.length > 3 && setGoals(goals.filter((_, idx) => idx !== i))
  const filled = goals.filter(g => g.trim().length > 0)
  const canProceed = filled.length >= 3

  return (
    <div className="flex flex-col min-h-dvh px-5 pt-24 pb-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <p className="text-orange font-bold text-sm tracking-widest uppercase mb-2">Step 1 of 3</p>
        <h1 className="text-4xl font-black text-white leading-tight mb-3">
          What do you<br />want to achieve?
        </h1>
        <p className="text-dim text-base mb-8">Add 3–5 goals to start your journey.</p>
      </motion.div>

      <div className="flex flex-col gap-3 flex-1">
        {goals.map((goal, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="flex items-center gap-2 bg-card border border-border rounded-2xl px-4 py-3"
          >
            <span className="text-orange font-black text-lg w-6 shrink-0">{i + 1}</span>
            <input
              value={goal}
              onChange={e => updateGoal(i, e.target.value)}
              placeholder={`Goal ${i + 1}...`}
              className="flex-1 bg-transparent text-white placeholder:text-dim outline-none font-medium text-base"
            />
            {goals.length > 3 && (
              <button onClick={() => removeGoal(i)} className="text-dim hover:text-red-400 transition-colors text-lg">×</button>
            )}
          </motion.div>
        ))}

        {goals.length < 5 && (
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            onClick={addGoal}
            className="flex items-center gap-2 text-dim hover:text-orange transition-colors text-sm font-semibold px-4 py-3"
          >
            <span className="text-xl">+</span> Add another goal
          </motion.button>
        )}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: canProceed ? 1 : 0.4, y: 0 }} transition={{ delay: 0.3 }}>
        <Button onClick={onNext} disabled={!canProceed} className="w-full py-4 text-lg">
          Next →
        </Button>
      </motion.div>
    </div>
  )
}
