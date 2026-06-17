import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home',         href: '#home' },
  { label: 'About',        href: '#about' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Profiles',     href: '#coding' },
  { label: 'Contact',      href: '#contact' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [active,    setActive]    = useState('home')
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [scrollPct, setScrollPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollPct(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1))
    const obs = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id) },
        { rootMargin: '-38% 0px -57% 0px' }
      )
      o.observe(el)
      return o
    })
    return () => obs.forEach(o => o?.disconnect())
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background:          scrolled ? 'rgba(5,5,8,0.88)' : 'transparent',
          backdropFilter:      scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter:scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom:        scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          boxShadow:           scrolled ? '0 4px 32px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-px"
          style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', width: `${scrollPct}%` }}
        />

        <div className="section-wrapper">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <motion.button
              onClick={() => handleNav('#home')}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white flex-shrink-0 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 0 20px rgba(59,130,246,0.4)' }}
              whileHover={{ scale: 1.08, boxShadow: '0 0 32px rgba(59,130,246,0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">NK</span>
              <motion.div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2), transparent)' }}
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.map(({ label, href }) => {
                const id       = href.slice(1)
                const isActive = active === id
                return (
                  <li key={label}>
                    <button
                      onClick={() => handleNav(href)}
                      className="relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 group"
                      style={{ color: isActive ? '#f1f5f9' : '#64748b' }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-lg"
                          style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}
                          transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                        />
                      )}
                      <span className="relative z-10">{label}</span>
                      {/* Animated underline on hover */}
                      {!isActive && (
                        <motion.span
                          className="absolute bottom-1 left-3.5 right-3.5 h-px rounded-full"
                          style={{ background: '#3b82f6' }}
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* Hire Me */}
            <motion.a
              href="#contact"
              onClick={e => { e.preventDefault(); handleNav('#contact') }}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 0 16px rgba(59,130,246,0.3)' }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(59,130,246,0.55)' }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              Hire Me
            </motion.a>

            {/* Hamburger */}
            <motion.button
              className="md:hidden p-2 rounded-lg"
              style={{ color: '#94a3b8', border: '1px solid rgba(255,255,255,0.06)' }}
              onClick={() => setMenuOpen(v => !v)}
              whileTap={{ scale: 0.92 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen
                  ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X    size={20} /></motion.span>
                  : <motion.span key="menu" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={20} /></motion.span>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
              style={{ background: 'rgba(5,5,8,0.97)', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
            >
              <div className="section-wrapper py-4 flex flex-col gap-1">
                {NAV_LINKS.map(({ label, href }, i) => {
                  const id = href.slice(1)
                  const isActive = active === id
                  return (
                    <motion.button
                      key={label}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      onClick={() => handleNav(href)}
                      className="text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-3 transition-all duration-200"
                      style={{
                        color:      isActive ? '#93c5fd' : '#94a3b8',
                        background: isActive ? 'rgba(59,130,246,0.1)' : 'transparent',
                      }}
                    >
                      {isActive && <span className="w-1 h-4 rounded-full bg-blue-400 flex-shrink-0" />}
                      {label}
                    </motion.button>
                  )
                })}
                <motion.a
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                  href="#contact"
                  onClick={e => { e.preventDefault(); handleNav('#contact') }}
                  className="mt-2 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Open to Internship 2027
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
