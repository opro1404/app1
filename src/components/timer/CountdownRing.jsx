import { motion } from 'framer-motion'

export default function CountdownRing({ elapsed, total, size = 260, strokeWidth = 12 }) {
  const r    = (size - strokeWidth) / 2
  const circ = 2 * Math.PI * r
  const pct  = total > 0 ? elapsed / total : 0

  const minutes = Math.floor((total - elapsed) / 60)
  const seconds = (total - elapsed) % 60

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1E1E1E" strokeWidth={strokeWidth} />
        <motion.circle
          cx={size/2} cy={size/2} r={r}
          fill="none"
          stroke="#FF6B2B"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * pct}
          style={{ filter: 'drop-shadow(0 0 8px rgba(255,107,43,0.6))' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-white font-black text-5xl tabular-nums leading-none">
          {String(minutes).padStart(2,'0')}:{String(seconds).padStart(2,'0')}
        </span>
        <span className="text-dim text-sm font-semibold mt-1">remaining</span>
      </div>
    </div>
  )
}
