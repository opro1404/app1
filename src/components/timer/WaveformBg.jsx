import { motion } from 'framer-motion'

export default function WaveformBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.3 + i * 0.2, 1], opacity: [0.1, 0.05, 0.1] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
          className="absolute rounded-full border border-orange/20"
          style={{
            width: `${200 + i * 120}px`,
            height: `${200 + i * 120}px`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  )
}
