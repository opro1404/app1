import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import Button from '../ui/Button'

export default function PhotoProofSheet({ isOpen, onClose, taskId, taskLabel }) {
  const addPhotoProof = useAppStore(s => s.addPhotoProof)
  const [preview, setPreview] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const fileRef = useRef()

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setPreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    if (preview) {
      addPhotoProof(taskId, preview)
    } else {
      addPhotoProof(taskId, 'verified')
    }
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setPreview(null)
      onClose()
    }, 1200)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            onDragEnd={(_, info) => { if (info.offset.y > 100) onClose() }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-card rounded-t-3xl border border-border p-6 pb-10"
          >
            <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-6" />

            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center py-6 gap-3"
              >
                <div className="text-5xl">✅</div>
                <p className="text-white font-black text-xl">Proof Verified!</p>
              </motion.div>
            ) : (
              <>
                <h3 className="text-white font-black text-xl mb-1">Prove It 📸</h3>
                <p className="text-dim text-sm mb-6">Add photo proof for: <span className="text-orange font-bold">{taskLabel}</span></p>

                {preview ? (
                  <div className="mb-4">
                    <img src={preview} alt="proof" className="w-full h-40 object-cover rounded-2xl" />
                    <button onClick={() => setPreview(null)} className="text-dim text-sm mt-2">Remove</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-border bg-surface text-white font-semibold text-sm"
                    >
                      <span className="text-2xl">📷</span>
                      Single Photo
                    </button>
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-border bg-surface text-white font-semibold text-sm"
                    >
                      <span className="text-2xl">🔄</span>
                      Before & After
                    </button>
                  </div>
                )}

                <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" capture="environment" />

                <div className="flex gap-3">
                  <Button variant="secondary" onClick={onClose} className="flex-1 py-3">
                    Skip
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1 py-3">
                    {preview ? 'Submit' : 'Mark Done'}
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
