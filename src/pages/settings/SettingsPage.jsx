import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import Toggle from '../../components/ui/Toggle'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

export default function SettingsPage() {
  const navigate = useNavigate()
  const settings = useAppStore(s => s.settings)
  const toggleNotifications = useAppStore(s => s.toggleNotifications)
  const togglePhotoProof    = useAppStore(s => s.togglePhotoProof)
  const user = useAppStore(s => s.user)

  const SECTIONS = [
    {
      title: 'Notifications',
      items: [
        {
          label: 'Daily Reminders',
          sub: 'Get reminded to complete your habits',
          value: settings.notificationsEnabled,
          toggle: toggleNotifications,
        },
      ],
    },
    {
      title: 'Habits',
      items: [
        {
          label: 'Photo Proof Mode',
          sub: 'Require photo for habit completion',
          value: settings.photoProofEnabled,
          toggle: togglePhotoProof,
        },
      ],
    },
  ]

  return (
    <div className="min-h-dvh bg-bg px-4 pt-12 pb-6">
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate('/profile')}
          className="text-dim hover:text-white transition-colors text-sm font-semibold"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-black text-white">Settings</h1>
      </div>

      {/* Profile card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-4 mb-5 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange to-orange-dark flex items-center justify-center font-black text-white text-lg">
            {user.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-white font-bold">{user.name}</p>
            <p className="text-dim text-xs">@{user.name.toLowerCase()}</p>
          </div>
        </Card>
      </motion.div>

      <div className="space-y-5">
        {SECTIONS.map((section, si) => (
          <motion.div
            key={si}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.1 }}
          >
            <p className="text-dim text-xs font-bold uppercase tracking-widest mb-2 px-1">{section.title}</p>
            <Card className="overflow-hidden">
              {section.items.map((item, ii) => (
                <div
                  key={ii}
                  className={`flex items-center justify-between p-4 ${ii > 0 ? 'border-t border-border' : ''}`}
                >
                  <div>
                    <p className="text-white font-semibold text-sm">{item.label}</p>
                    <p className="text-dim text-xs mt-0.5">{item.sub}</p>
                  </div>
                  <Toggle enabled={item.value} onToggle={item.toggle} />
                </div>
              ))}
            </Card>
          </motion.div>
        ))}

        {/* About */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <p className="text-dim text-xs font-bold uppercase tracking-widest mb-2 px-1">About</p>
          <Card className="overflow-hidden">
            {[
              { label: 'Version', value: '1.0.0' },
              { label: 'Build', value: 'LevelUp Beta' },
            ].map((row, i) => (
              <div key={i} className={`flex items-center justify-between p-4 ${i > 0 ? 'border-t border-border' : ''}`}>
                <span className="text-white font-semibold text-sm">{row.label}</span>
                <span className="text-dim text-sm">{row.value}</span>
              </div>
            ))}
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
