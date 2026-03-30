import { motion } from 'framer-motion'

export default function RingChart({ value = 0, size = 80, strokeWidth = 8, color = '#FF6B2B', label, sublabel }) {
  const r = (size - strokeWidth) / 2
  const circ = 2 * Math.PI * r
  const pct = Math.min(100, Math.max(0, value))

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#3A3A3A" strokeWidth={strokeWidth} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - (pct / 100) * circ }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        {label && <span className="text-white font-black text-sm leading-none">{label}</span>}
        {sublabel && <span className="text-dim text-[10px]">{sublabel}</span>}
      </div>
    </div>
  )
}
