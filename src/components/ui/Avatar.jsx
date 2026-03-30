export default function Avatar({ name = 'A', size = 'md', level, className = '' }) {
  const sizes = { sm: 'w-10 h-10 text-sm', md: 'w-16 h-16 text-xl', lg: 'w-24 h-24 text-3xl' }
  const initials = name.slice(0, 2).toUpperCase()

  return (
    <div className={`relative ${className}`}>
      <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-orange to-orange-dark flex items-center justify-center font-black text-white orange-glow`}>
        {initials}
      </div>
      {level && (
        <span className="absolute -bottom-1 -right-1 bg-orange text-white text-xs font-black rounded-full w-6 h-6 flex items-center justify-center border-2 border-bg">
          {level}
        </span>
      )}
    </div>
  )
}
