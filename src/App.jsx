import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAppStore } from './store/useAppStore'
import MainLayout from './layouts/MainLayout'
import OnboardingFlow from './pages/onboarding/OnboardingFlow'
import HomePage from './pages/home/HomePage'
import FocusPage from './pages/focus/FocusPage'
import StatsPage from './pages/stats/StatsPage'
import ProgressPage from './pages/progress/ProgressPage'
import FitnessProgress from './pages/progress/FitnessProgress'
import WorkProgress from './pages/progress/WorkProgress'
import EnvProgress from './pages/progress/EnvProgress'
import ProfilePage from './pages/profile/ProfilePage'
import SettingsPage from './pages/settings/SettingsPage'
import LevelUpOverlay from './components/progression/LevelUpOverlay'

function RootRedirect() {
  const onboardingComplete = useAppStore(s => s.user.onboardingComplete)
  return <Navigate to={onboardingComplete ? '/home' : '/onboarding'} replace />
}

export default function App() {
  const lastResetDate  = useAppStore(s => s.lastResetDate)
  const resetDailyTasks = useAppStore(s => s.resetDailyTasks)
  const streak         = useAppStore(s => s.user.streak)
  const resetStreak    = useAppStore(s => s.resetStreak)
  const setComebackMode = useAppStore(s => s.setComebackMode)
  const levelUpPending = useAppStore(s => s.levelUpPending)

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10)
    if (lastResetDate && lastResetDate !== today) {
      const last     = new Date(lastResetDate)
      const now      = new Date(today)
      const diffDays = Math.floor((now - last) / 86400000)
      resetDailyTasks()
      if (diffDays > 1 && streak > 0) {
        resetStreak()
        setComebackMode(true)
      }
    }
  }, [])

  return (
    <BrowserRouter>
      {levelUpPending && <LevelUpOverlay />}
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/onboarding" element={<OnboardingFlow />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/focus" element={<FocusPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/progress/fitness" element={<FitnessProgress />} />
          <Route path="/progress/work" element={<WorkProgress />} />
          <Route path="/progress/environment" element={<EnvProgress />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
