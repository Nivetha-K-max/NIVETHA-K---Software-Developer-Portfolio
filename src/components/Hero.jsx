import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Github, Linkedin, Mail, ChevronDown, Download, Sparkles } from 'lucide-react'
import Particles from './Particles'

// ── Typing hook ───────────────────────────────────────────────────────────────
function useTyping(words, speed = 85, deleteSpeed = 45, pause = 2000) {
  const ref = useRef({ text: '', idx: 0, del: false })
  const [text, setText] = useState('')

  useEffect(() => {
    let timer
    const tick = () => {
      const { text: t, idx: wi, del: d } = ref.current
      const word = words[wi]
      if (!d) {
        const next = word.slice(0, t.length + 1)
        ref.current.text = next; setText(next)
        if (next.length === word.length) {
          ref.current.del = true; timer = setTimeout(tick, pause)
        } else { timer = setTimeout(tick, speed) }
      } else {
        const next = word.slice(0, t.length - 1)
        ref.current.text = next; setText(next)
        if (next.length === 0) {
          ref.current.idx = (wi + 1) % words.length
          ref.current.del = false; timer = setTimeout(tick, speed)
        } else { timer = setTimeout(tick, deleteSpeed) }
      }
    }
    timer = setTimeout(tick, speed)
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return text
}

// ── Magnetic button ───────────────────────────────────────────────────────────
function MagneticButton({ children, className, style, onClick, href, target, rel }) {
  const ref   = useRef(null)
  const mx    = useMotionValue(0)
  const my    = useMotionValue(0)
  const sx    = useSpring(mx, { stiffness: 200, damping: 20 })
  const sy    = useSpring(my, { stiffness: 200, damping: 20 })

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left - rect.width  / 2) * 0.35)
    my.set((e.clientY - rect.top  - rect.height / 2) * 0.35)
  }
  const onMouseLeave = () => { mx.set(0); my.set(0) }

  const Tag = href ? motion.a : motion.button
  return (
    <Tag
      ref={ref}
      href={href} target={target} rel={rel}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: sx, y: sy, ...style }}
      className={className}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </Tag>
  )
}

const WORDS       = ['Software Engineer', 'Full Stack Developer', 'FAANG Aspirant', 'Problem Solver']
const RESUME_URL  = 'https://drive.google.com/file/d/YOUR_RESUME_FILE_ID/view?usp=sharing'
const GITHUB_URL  = 'https://github.com/Nivetha-K-max'

const SOCIAL = [
  { icon: Github,   href: GITHUB_URL,                                        label: 'GitHub',   color: '#e2e8f0', glowColor: 'rgba(226,232,240,0.25)' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/nivetha-k-1b4832327/',label: 'LinkedIn', color: '#0a66c2', glowColor: 'rgba(10,102,194,0.35)' },
  { icon: Mail,     href: 'mailto:nivetha.k2024it@sece.ac.in',               label: 'Email',    color: '#f43f5e', glowColor: 'rgba(244,63,94,0.3)' },
]

const STATS = [
  { val: '1500+', lbl: 'Problems Solved',   color: '#3b82f6' },
  { val: '2nd',   lbl: 'University Rank',   color: '#8b5cf6' },
  { val: '4+',    lbl: 'Live Projects',     color: '#06b6d4' },
  { val: '15K+',  lbl: 'Google Challengers', color: '#10b981' },
]

const CODE_SNIPPETS = [
  { code: 'GET /cache → 2ms (Redis)',  x: '6%',  y: '20%', delay: 0 },
  { code: 'replica.sync(leader)',      x: '72%', y: '14%', delay: 1 },
  { code: 'LRU.evict() → O(1)',        x: '78%', y: '62%', delay: 2 },
  { code: 'AOF fsync: every_sec',      x: '3%',  y: '66%', delay: 3 },
  { code: 'partitions: 12, rf: 3',     x: '56%', y: '80%', delay: 1.5 },
]

export default function Hero() {
  const typedText  = useTyping(WORDS)
  const [imgError, setImgError] = useState(false)

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
  }
  const item = {
    hidden: { opacity: 0, y: 30 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden animated-gradient">

      {/* Particle background */}
      <div className="absolute inset-0">
        <Particles count={55} color="#3b82f6" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      {/* Radial orbs */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ width: 800, height: 800, top: '10%', left: '50%', x: '-50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 65%)',
          filter: 'blur(1px)' }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="glow-orb w-80 h-80" style={{ background: '#8b5cf6', bottom: '5%', right: '-5%', opacity: 0.08 }} />
      <div className="glow-orb w-64 h-64" style={{ background: '#06b6d4', top: '5%',  left: '-5%', opacity: 0.06 }} />

      {/* Floating code snippets */}
      {CODE_SNIPPETS.map((s, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:flex font-mono text-xs px-3 py-2 rounded-lg pointer-events-none select-none items-center gap-2"
          style={{
            left: s.x, top: s.y,
            background: 'rgba(13,13,20,0.8)',
            border: '1px solid rgba(59,130,246,0.18)',
            color: 'rgba(147,197,253,0.65)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 0.9, 0.9, 0], y: [20, 0, 0, -15] }}
          transition={{ delay: s.delay + 1.5, duration: 5, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
        >
          <span style={{ color: '#3b82f6', fontSize: 8 }}>●</span>
          {s.code}
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 section-wrapper text-center pt-24 pb-16 flex flex-col items-center gap-7"
      >

        {/* Status badge */}
        <motion.div variants={item}>
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold"
            style={{
              background: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(59,130,246,0.2)',
              color: '#93c5fd',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            Open to SDE Internship 2027
            <Sparkles size={14} className="text-yellow-400" />
          </div>
        </motion.div>

        {/* Photo + Name */}
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-6">
          {/* Photo */}
          <div className="relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28">
            <motion.div
              className="absolute -inset-1 rounded-full"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', filter: 'blur(8px)', opacity: 0.55, zIndex: 0 }}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="relative w-full h-full rounded-full overflow-hidden"
              style={{ border: '2px solid rgba(59,130,246,0.5)', zIndex: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {imgError ? (
                <div className="w-full h-full flex items-center justify-center text-2xl font-black"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#fff' }}>
                  NK
                </div>
              ) : (
                <img src="/assets/Nivetha.jpg" alt="Nivetha K"
                  className="w-full h-full object-cover object-top block"
                  onError={() => setImgError(true)} />
              )}
            </motion.div>
            {/* Rotating ring */}
            <motion.div
              className="absolute -inset-3 rounded-full"
              style={{ border: '1px dashed rgba(59,130,246,0.3)', zIndex: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-none">
            <motion.span
              className="text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              NIVETHA{' '}
            </motion.span>
            <motion.span
              className="gradient-text"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              K
            </motion.span>
          </h1>
        </motion.div>

        {/* Typing row */}
        <motion.div variants={item}
          className="flex items-center gap-3 text-xl sm:text-2xl font-semibold"
          style={{ color: '#64748b' }}
        >
          <span style={{ color: '#3b82f6' }}>&lt;</span>
          <span style={{ color: '#93c5fd', minWidth: 240, textAlign: 'left' }}>{typedText}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, repeatType: 'reverse' }}
            className="inline-block w-0.5 h-7 rounded-full"
            style={{ background: '#3b82f6' }}
          />
          <span style={{ color: '#3b82f6' }}>/&gt;</span>
        </motion.div>

        {/* Tagline */}
        <motion.p variants={item}
          className="max-w-xl text-base sm:text-lg italic"
          style={{ color: '#475569' }}
        >
          "I don't just use distributed systems — I build them from scratch"
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-4 mt-1">
          <MagneticButton
            className="btn-primary flex items-center gap-2.5 text-base"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
          </MagneticButton>

          <MagneticButton
            href={RESUME_URL} target="_blank" rel="noopener noreferrer"
            className="btn-ghost flex items-center gap-2.5 text-base"
          >
            <Download size={16} />
            Download Resume
          </MagneticButton>
        </motion.div>

        {/* Socials */}
        <motion.div variants={item} className="flex items-center gap-3">
          {SOCIAL.map(({ icon: Icon, href, label, color, glowColor }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                width: 48, height: 48,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#94a3b8',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
              whileHover={{
                scale: 1.15,
                y: -4,
                color,
                borderColor: `${color}60`,
                backgroundColor: `${color}14`,
                boxShadow: `0 8px 24px ${glowColor}, 0 0 0 1px ${color}30`,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ delay: 0.9 + i * 0.1, type: 'spring', stiffness: 350, damping: 18 }}
            >
              <Icon size={22} strokeWidth={1.8} />
            </motion.a>
          ))}

          {/* LeetCode */}
          <motion.a
            href="https://leetcode.com/u/Nivetha-K/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              width: 48, height: 48,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            whileHover={{
              scale: 1.15,
              y: -4,
              borderColor: '#ffa11660',
              backgroundColor: '#ffa11614',
              boxShadow: '0 8px 24px rgba(255,161,22,0.25), 0 0 0 1px #ffa11630',
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ delay: 1.2, type: 'spring', stiffness: 350, damping: 18 }}
          >
            <svg width="20" height="20" viewBox="0 0 50 50" fill="none" aria-hidden="true">
              <path d="M36.2 32.6H21.1a2.7 2.7 0 0 1 0-5.4h15.1a2.7 2.7 0 0 1 0 5.4z" fill="#FFA116"/>
              <path d="M22.5 40.8a2.7 2.7 0 0 1-1.9-4.6l8.4-8.4-8.4-8.4a2.7 2.7 0 0 1 3.8-3.8l10.3 10.3a2.7 2.7 0 0 1 0 3.8L24.4 39.9a2.7 2.7 0 0 1-1.9.9z" fill="#B3B3B3"/>
              <path d="M13.8 40.8c-.7 0-1.4-.3-1.9-.8a2.7 2.7 0 0 1 0-3.8l10.3-10.2L11.9 16.6a2.7 2.7 0 0 1 3.8-3.8L27 24.1a2.7 2.7 0 0 1 0 3.8L15.7 39.9a2.7 2.7 0 0 1-1.9.9z" fill="#FFFFFF"/>
            </svg>
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div variants={item}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2 w-full max-w-2xl"
        >
          {STATS.map(({ val, lbl, color }) => (
            <motion.div key={lbl}
              className="flex flex-col items-center gap-0.5 py-3 px-4 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              whileHover={{ y: -4, borderColor: `${color}35`, boxShadow: `0 8px 24px rgba(0,0,0,0.4), 0 0 16px ${color}18` }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="text-xl font-black" style={{ color }}>{val}</span>
              <span className="text-xs text-center leading-tight" style={{ color: '#475569' }}>{lbl}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-[0.25em] uppercase" style={{ color: '#334155' }}>Scroll</span>
        <div className="w-6 h-10 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: '1.5px solid rgba(255,255,255,0.12)' }}>
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ background: '#3b82f6' }}
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.button>
    </div>
  )
}
