import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import Navbar         from './components/Navbar'
import Hero           from './components/Hero'
import About          from './components/About'
import Skills         from './components/Skills'
import Projects       from './components/Projects'
import Achievements   from './components/Achievements'
import Experience     from './components/Experience'
import CodingProfiles from './components/CodingProfiles'
import Contact        from './components/Contact'
import Certifications from './components/Certifications'
import Footer         from './components/Footer'
import CustomCursor   from './components/CustomCursor'

// ── Loading Screen ────────────────────────────────────────────────────────────
function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const steps = [20, 45, 70, 88, 100]
    let i = 0
    const iv = setInterval(() => {
      if (i < steps.length) { setProgress(steps[i]); i++ }
      else { clearInterval(iv); setTimeout(onDone, 300) }
    }, 200)
    return () => clearInterval(iv)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: '#050508' }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)', top: '20%', left: '30%', filter: 'blur(60px)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)', bottom: '20%', right: '25%', filter: 'blur(60px)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative flex flex-col items-center gap-8 z-10">
        {/* NK Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: 'backOut' }}
          className="relative"
        >
          <div
            className="absolute inset-0 rounded-2xl blur-xl opacity-60"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', transform: 'scale(1.3)' }}
          />
          <div
            className="relative w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-black text-white"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 0 50px rgba(59,130,246,0.6)' }}
          >
            NK
          </div>
        </motion.div>

        {/* Name + role */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col items-center gap-1"
        >
          <p className="text-white font-bold text-lg tracking-wide">Nivetha K</p>
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: '#475569' }}>
            Software Engineer
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 200 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-48 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
          <span className="text-xs font-mono" style={{ color: '#334155' }}>{progress}%</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true)

  // Lenis smooth scroll
  useEffect(() => {
    if (loading) return
    const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [loading])

  return (
    <>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6 }}
        style={{ visibility: loading ? 'hidden' : 'visible' }}
        className="relative min-h-screen bg-grid"
        id="app-root"
      >
        <Navbar />
        <main>
          <section id="home"><Hero /></section>
          <div className="section-divider" />
          <section id="about"><About /></section>
          <div className="section-divider" />
          <section id="skills"><Skills /></section>
          <div className="section-divider" />
          <section id="projects"><Projects /></section>
          <div className="section-divider" />
          <section id="achievements"><Achievements /></section>
          <div className="section-divider" />
          <section id="certifications"><Certifications /></section>
          <div className="section-divider" />
          <section id="experience"><Experience /></section>
          <div className="section-divider" />
          <section id="coding"><CodingProfiles /></section>
          <div className="section-divider" />
          <section id="contact"><Contact /></section>
        </main>
        <Footer />
      </motion.div>
    </>
  )
}
