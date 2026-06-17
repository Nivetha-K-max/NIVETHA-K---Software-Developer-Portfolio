import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import About        from './components/About'
import Skills       from './components/Skills'
import Projects     from './components/Projects'
import Achievements from './components/Achievements'
import Experience   from './components/Experience'
import CodingProfiles from './components/CodingProfiles'
import Contact      from './components/Contact'
import Footer       from './components/Footer'

function LoadingScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1400)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: '#0a0a0f' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-72 h-72 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #3b82f6, #8b5cf6)' }}
        />
      </div>

      <div className="relative flex flex-col items-center gap-6">
        {/* NK Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: 'backOut' }}
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 0 40px rgba(59,130,246,0.5)' }}
        >
          NK
        </motion.div>

        {/* Name */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-slate-400 text-xs font-semibold tracking-[0.3em] uppercase"
        >
          Nivetha K
        </motion.p>

        {/* Progress bar */}
        <motion.div
          className="w-40 h-0.5 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.07)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.5, duration: 0.7, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-screen bg-grid"
        style={{ backgroundColor: '#0a0a0f', visibility: loading ? 'hidden' : 'visible' }}
      >
        <Navbar />
        <main>
          <section id="home"><Hero /></section>
          <section id="about"><About /></section>
          <section id="skills"><Skills /></section>
          <section id="projects"><Projects /></section>
          <section id="achievements"><Achievements /></section>
          <section id="experience"><Experience /></section>
          <section id="coding"><CodingProfiles /></section>
          <section id="contact"><Contact /></section>
        </main>
        <Footer />
      </motion.div>
    </>
  )
}
