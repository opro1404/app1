export default function Badge({ children, color = 'orange', className = '' }) {
  const colors = {
    orange: 'bg-orange/20 text-orange border-orange/30',
    green:  'bg-green-500/20 text-green-400 border-green-500/30',
    blue:   'bg-blue-500/20 text-blue-400 border-blue-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    dim:    'bg-white/5 text-dim border-white/10',
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg border text-xs font-bold ${colors[color] || colors.orange} ${className}`}>
      {children}
    </span>
  )
}
