import { motion } from 'framer-motion'

export default function Toggle({ enabled, onToggle, label }) {
  return (
    <div className="flex items-center justify-between">
      {label && <span className="text-white font-medium">{label}</span>}
      <button
        onClick={onToggle}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${enabled ? 'bg-orange' : 'bg-muted'}`}
      >
        <motion.div
          animate={{ x: enabled ? 24 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
        />
      </button>
    </div>
  )
}
