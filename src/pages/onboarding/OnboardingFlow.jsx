import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import Step1Goals from './Step1Goals'
import Step2Tasks from './Step2Tasks'
import Step3Frequency from './Step3Frequency'

const slideVariants = {
  initial: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit:    (dir) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 0, transition: { duration: 0.2 } }),
}

export default function OnboardingFlow() {
  const [step, setStep] = useState(0)
  const [dir, setDir]   = useState(1)
  const [goals, setGoals]     = useState(['', '', ''])
  const [selected, setSelected] = useState([])
  const navigate = useNavigate()
  const setActiveTasks = useAppStore(s => s.setActiveTasks)
  const setTaskFrequency = useAppStore(s => s.setTaskFrequency)
  const setOnboardingComplete = useAppStore(s => s.setOnboardingComplete)

  const next = () => { setDir(1); setStep(s => s + 1) }
  const back = () => { setDir(-1); setStep(s => s - 1) }

  const finish = (freqs) => {
    setActiveTasks(selected)
    Object.entries(freqs).forEach(([id, freq]) => setTaskFrequency(id, freq))
    setOnboardingComplete(true)
    navigate('/home')
  }

  const steps = [
    <Step1Goals key="s1" goals={goals} setGoals={setGoals} onNext={next} />,
    <Step2Tasks key="s2" selected={selected} setSelected={setSelected} onNext={next} onBack={back} />,
    <Step3Frequency key="s3" selectedIds={selected} onBack={back} onFinish={finish} />,
  ]

  return (
    <div className="min-h-dvh bg-bg flex flex-col overflow-hidden relative">
      {/* Progress dots */}
      <div className="absolute top-14 left-0 right-0 flex justify-center gap-2 z-10">
        {[0,1,2].map(i => (
          <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-orange' : 'w-2 bg-muted'}`} />
        ))}
      </div>

      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={step}
          custom={dir}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex-1 flex flex-col"
        >
          {steps[step]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
