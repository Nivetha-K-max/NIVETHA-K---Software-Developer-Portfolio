import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home',         href: '#home' },
  { label: 'About',        href: '#about' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Profiles',     href: '#coding' },
  { label: 'Contact',      href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [active,   setActive]       = useState('home')
  const [menuOpen, setMenuOpen]     = useState(false)

  // Detect scroll for bg change
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section via IntersectionObserver
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1))
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(10,10,15,0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div className="section-wrapper">
        <div className="flex items-center justify-between h-16 sm:h-18">

          {/* Logo */}
          <motion.button
            onClick={() => handleNav('#home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              boxShadow: '0 0 16px rgba(59,130,246,0.35)',
            }}
          >
            NK
          </motion.button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.slice(1)
              const isActive = active === id
              return (
                <li key={label}>
                  <button
                    onClick={() => handleNav(href)}
                    className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
                    style={{ color: isActive ? '#f1f5f9' : '#94a3b8' }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)' }}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Hire Me chip */}
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); handleNav('#contact') }}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              boxShadow: '0 0 16px rgba(59,130,246,0.25)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Hire Me
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: '#94a3b8' }}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(10,10,15,0.97)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div className="section-wrapper py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }) => {
                const id = href.slice(1)
                const isActive = active === id
                return (
                  <button
                    key={label}
                    onClick={() => handleNav(href)}
                    className="text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                    style={{
                      color: isActive ? '#93c5fd' : '#94a3b8',
                      background: isActive ? 'rgba(59,130,246,0.1)' : 'transparent',
                    }}
                  >
                    {label}
                  </button>
                )
              })}
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); handleNav('#contact') }}
                className="mt-2 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open to Opportunities
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
