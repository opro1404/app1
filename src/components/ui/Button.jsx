export default function Button({ children, variant = 'primary', className = '', disabled = false, onClick, type = 'button' }) {
  const base = 'inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-orange text-white shadow-lg shadow-orange/30 hover:bg-orange-light',
    secondary: 'bg-transparent border-2 border-white/20 text-white hover:border-orange hover:text-orange',
    ghost: 'bg-white/5 text-white hover:bg-white/10',
    danger: 'bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30',
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
