import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import Button from '../../components/ui/Button'

export default function ProveItPopup() {
  const dismissProveIt = useAppStore(s => s.dismissProveIt)
  const [timeLeft, setTimeLeft] = useState(120)
  const [hasPhoto, setHasPhoto] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) { dismissProveIt(false); return }
    const t = setInterval(() => setTimeLeft(s => s - 1), 1000)
    return () => clearInterval(t)
  }, [timeLeft])

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1, rotate: [0, -2, 0] }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-50"
    >
      <div className="bg-card border-2 border-orange rounded-3xl p-6 orange-glow-lg">
        <div className="text-center mb-5">
          <motion.p
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-4xl mb-2"
          >
            📸
          </motion.p>
          <h3 className="text-white font-black text-2xl">Prove It!</h3>
          <p className="text-dim text-sm mt-1">Show us you're doing the work</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-5 bg-orange/10 rounded-2xl py-3">
          <span className="text-orange font-black text-2xl tabular-nums">
            {String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}
          </span>
          <span className="text-dim text-sm">to respond</span>
        </div>

        {hasPhoto ? (
          <div className="flex items-center justify-center gap-2 py-3 text-green-400 font-bold">
            <span>✅</span> Photo received!
          </div>
        ) : (
          <div className="mb-4">
            <label className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-border cursor-pointer hover:border-orange transition-colors">
              <span className="text-3xl">📷</span>
              <span className="text-white font-semibold text-sm">Tap to add photo</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={() => setHasPhoto(true)}
              />
            </label>
          </div>
        )}

        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => dismissProveIt(false)} className="flex-1 py-3 text-sm">
            Skip
          </Button>
          <Button onClick={() => dismissProveIt(hasPhoto)} className="flex-1 py-3 text-sm">
            {hasPhoto ? '✅ Verified' : 'Continue'}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
