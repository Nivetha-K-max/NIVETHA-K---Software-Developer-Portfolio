import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ChevronDown, Code2, ExternalLink, Download } from 'lucide-react'

// ─── Typing effect hook (stale-closure-free) ─────────────────────────────────
function useTyping(words, typingSpeed = 90, deletingSpeed = 50, pauseMs = 1800) {
  const [text,     setText]     = useState('')
  const [wordIdx,  setWordIdx]  = useState(0)
  const [deleting, setDeleting] = useState(false)
  const ref = useRef({ text: '', wordIdx: 0, deleting: false })

  useEffect(() => {
    let timer
    const tick = () => {
      const { text: t, wordIdx: wi, deleting: d } = ref.current
      const word = words[wi]
      if (!d) {
        const next = word.slice(0, t.length + 1)
        ref.current.text = next
        setText(next)
        if (next.length === word.length) {
          ref.current.deleting = true
          setDeleting(true)
          timer = setTimeout(tick, pauseMs)
        } else {
          timer = setTimeout(tick, typingSpeed)
        }
      } else {
        const next = word.slice(0, t.length - 1)
        ref.current.text = next
        setText(next)
        if (next.length === 0) {
          const nextIdx = (wi + 1) % words.length
          ref.current.wordIdx   = nextIdx
          ref.current.deleting  = false
          setWordIdx(nextIdx)
          setDeleting(false)
          timer = setTimeout(tick, typingSpeed)
        } else {
          timer = setTimeout(tick, deletingSpeed)
        }
      }
    }
    timer = setTimeout(tick, typingSpeed)
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return text
}

const CODE_SNIPPETS = [
  { code: 'GET /user/1 → 2ms (Redis hit)', x: '7%',  y: '22%', delay: 0 },
  { code: 'replica.sync(leader)',           x: '74%', y: '16%', delay: 0.8 },
  { code: 'LRU.evict() → O(1)',             x: '80%', y: '64%', delay: 1.6 },
  { code: 'AOF fsync: every_sec',           x: '4%',  y: '68%', delay: 2.4 },
  { code: 'partitions: 12, replicas: 3',    x: '58%', y: '78%', delay: 0.4 },
  { code: 'TF-IDF rank: 0.847',             x: '18%', y: '83%', delay: 1.2 },
]

const WORDS  = ['Software Engineer', 'Full Stack Developer', 'FAANG Aspirant', 'Problem Solver']

// TODO: Replace RESUME_URL with your actual resume link
const RESUME_URL = 'https://drive.google.com/file/d/YOUR_RESUME_FILE_ID/view?usp=sharing'

// TODO: Replace with your actual GitHub profile URL if different
const GITHUB_URL = 'https://github.com/Nivetha-K-max'

const SOCIAL = [
  { icon: Github,   href: GITHUB_URL,                                      label: 'GitHub',   hoverColor: '#94a3b8' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/nivetha-k-1b4832327/', label: 'LinkedIn', hoverColor: '#0ea5e9' },
  { icon: Mail,     href: 'mailto:nivetha.k2024it@sece.ac.in',              label: 'Email',    hoverColor: '#f43f5e' },
]

const STATS = [
  { val: '1500+', lbl: 'Problems Solved' },
  { val: '2nd',   lbl: 'University Rank' },
  { val: '4+',    lbl: 'Production Projects' },
]

export default function Hero() {
  const typedText  = useTyping(WORDS)
  const [imgError, setImgError] = useState(false)

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden animated-gradient">

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />

      {/* Radial glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full pointer-events-none blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.13) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-0 left-0 w-72 h-72 rounded-full pointer-events-none blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)' }}
      />

      {/* Floating code snippets */}
      {CODE_SNIPPETS.map((s, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:block font-mono text-xs px-3 py-1.5 rounded-lg pointer-events-none select-none"
          style={{
            left: s.x,
            top:  s.y,
            background: 'rgba(18,18,26,0.75)',
            border: '1px solid rgba(59,130,246,0.15)',
            color: 'rgba(147,197,253,0.55)',
            backdropFilter: 'blur(4px)',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 0.8, 0.8, 0], y: [10, 0, 0, -10] }}
          transition={{ delay: s.delay + 1, duration: 6, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
        >
          {s.code}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 section-wrapper text-center pt-24 pb-12 flex flex-col items-center gap-6">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
          style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', color: '#93c5fd' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          Open to SDE Internships 2025
        </motion.div>

        {/* Profile photo + Name row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-5"
        >
          {/* Circular photo */}
          <div className="relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24">
            {/* Glow ring — outside the overflow-hidden wrapper so it never bleeds onto the image */}
            <div
              className="absolute -inset-2 rounded-full opacity-50"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                filter: 'blur(10px)',
                zIndex: 0,
              }}
            />
            {/* Photo wrapper */}
            <div
              className="relative w-full h-full rounded-full overflow-hidden"
              style={{ border: '2px solid rgba(59,130,246,0.6)', zIndex: 1 }}
            >
              {imgError ? (
                <div
                  className="w-full h-full flex items-center justify-center text-xl font-black"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#fff' }}
                >
                  NK
                </div>
              ) : (
                <img
                  src="/assets/Nivetha.jpg"
                  alt="Nivetha K — Software Engineer"
                  className="w-full h-full object-cover object-top"
                  style={{ display: 'block' }}
                  onError={() => setImgError(true)}
                />
              )}
            </div>
          </div>

          {/* Name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
            <span className="text-white">NIVETHA </span>
            <span className="gradient-text">K</span>
          </h1>
        </motion.div>

        {/* Typing row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center gap-3 text-xl sm:text-2xl font-semibold"
          style={{ color: '#94a3b8' }}
        >
          <Code2 size={22} className="text-blue-400 flex-shrink-0" />
          <span style={{ color: '#93c5fd', minWidth: '220px', textAlign: 'left' }}>{typedText}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            className="inline-block w-0.5 h-6 bg-blue-400"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="max-w-xl text-base sm:text-lg font-medium italic"
          style={{ color: '#64748b' }}
        >
          "I don't just use distributed systems — I build them from scratch"
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-2"
        >
          <button
            className="btn-primary flex items-center gap-2 text-base"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
            <ExternalLink size={16} />
          </button>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost flex items-center gap-2 text-base"
          >
            <Download size={16} />
            Download Resume
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex items-center gap-3 mt-2"
        >
          {SOCIAL.map(({ icon: Icon, href, label, hoverColor }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}
              aria-label={label}
              onMouseEnter={e => { e.currentTarget.style.color = hoverColor; e.currentTarget.style.borderColor = `${hoverColor}50`; e.currentTarget.style.background = `${hoverColor}10` }}
              onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
            >
              <Icon size={19} />
            </motion.a>
          ))}

          {/* LeetCode */}
          <motion.a
            href="https://leetcode.com/u/Nivetha-K/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}
            aria-label="LeetCode"
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#ffa11650'; e.currentTarget.style.background = '#ffa11610' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
          >
            <svg width="18" height="18" viewBox="0 0 50 50" fill="none" aria-hidden="true">
              <path d="M36.2 32.6H21.1a2.7 2.7 0 0 1 0-5.4h15.1a2.7 2.7 0 0 1 0 5.4z" fill="#FFA116"/>
              <path d="M22.5 40.8a2.7 2.7 0 0 1-1.9-4.6l8.4-8.4-8.4-8.4a2.7 2.7 0 0 1 3.8-3.8l10.3 10.3a2.7 2.7 0 0 1 0 3.8L24.4 39.9a2.7 2.7 0 0 1-1.9.9z" fill="#B3B3B3"/>
              <path d="M13.8 40.8c-.7 0-1.4-.3-1.9-.8a2.7 2.7 0 0 1 0-3.8l10.3-10.2L11.9 16.6a2.7 2.7 0 0 1 3.8-3.8L27 24.1a2.7 2.7 0 0 1 0 3.8L15.7 39.9a2.7 2.7 0 0 1-1.9.9z" fill="#FFFFFF"/>
            </svg>
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mt-4"
        >
          {STATS.map(({ val, lbl }) => (
            <div
              key={lbl}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#475569' }}
            >
              <span className="font-bold text-base" style={{ color: '#3b82f6' }}>{val}</span>
              <span>{lbl}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to about section"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: '#334155' }}>Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={18} style={{ color: '#334155' }} />
        </motion.div>
      </motion.div>
    </div>
  )
}
