import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import BottomTabBar from '../components/navigation/BottomTabBar'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8,  transition: { duration: 0.15, ease: 'easeIn'  } },
}

export default function MainLayout() {
  const location = useLocation()

  return (
    <div className="flex flex-col min-h-dvh bg-bg">
      <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
      <BottomTabBar />
    </div>
  )
}
