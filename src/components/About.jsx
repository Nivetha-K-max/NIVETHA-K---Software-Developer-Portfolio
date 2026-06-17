import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, MapPin, Cpu, Zap, Code2, Award } from 'lucide-react'

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ target, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const numeric = parseInt(target.replace(/\D/g, ''))
    const start   = performance.now()
    const tick    = (now) => {
      const elapsed = (now - start) / (duration * 1000)
      const progress = Math.min(elapsed, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * numeric))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(numeric)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

// ── 3D tilt image ─────────────────────────────────────────────────────────────
function TiltImage({ imgError, onError }) {
  const ref  = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx   = rect.left + rect.width  / 2
    const cy   = rect.top  + rect.height / 2
    setTilt({
      x: ((e.clientY - cy) / (rect.height / 2)) * -12,
      y: ((e.clientX - cx) / (rect.width  / 2)) *  12,
    })
  }
  const onMouseLeave = () => { setTilt({ x: 0, y: 0 }); setIsHovered(false) }
  const onMouseEnter = () => setIsHovered(true)

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
      className="relative w-64 h-64 sm:w-72 sm:h-72 flex-shrink-0"
    >
      {/* Glow layer */}
      <motion.div
        className="absolute -inset-4 rounded-3xl"
        style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', filter: 'blur(30px)', zIndex: 0 }}
        animate={{ opacity: isHovered ? 0.45 : 0.2 }}
        transition={{ duration: 0.3 }}
      />

      {/* Image card */}
      <motion.div
        className="relative w-full h-full rounded-3xl overflow-hidden"
        style={{
          border: '1.5px solid rgba(59,130,246,0.3)',
          boxShadow: isHovered ? '0 32px 64px rgba(0,0,0,0.6), 0 0 40px rgba(59,130,246,0.15)' : '0 12px 40px rgba(0,0,0,0.4)',
          zIndex: 1,
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center text-7xl font-black gradient-text"
            style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
            NK
          </div>
        ) : (
          <img src="/assets/Nivetha.jpg" alt="Nivetha K — Software Engineer"
            className="w-full h-full object-cover object-top"
            loading="lazy"
            onError={onError}
          />
        )}
        {/* Shine overlay on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)' }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Floating available badge */}
      <motion.div
        className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 z-10"
        style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.35)', color: '#6ee7b7', backdropFilter: 'blur(8px)' }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        Available
      </motion.div>

      {/* Floating code badge */}
      <motion.div
        className="absolute -top-3 -left-3 px-3 py-1.5 rounded-xl text-xs font-mono font-bold z-10"
        style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', color: '#93c5fd', backdropFilter: 'blur(8px)' }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        &lt;dev /&gt;
      </motion.div>

      {/* Rotating orbit ring */}
      <motion.div
        className="absolute -inset-6 rounded-full"
        style={{ border: '1px dashed rgba(59,130,246,0.18)', zIndex: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  )
}

const STATS = [
  { target: '1500', suffix: '+', label: 'Problems Solved', icon: '🧩', color: '#3b82f6' },
  { target: '2',    suffix: 'nd', label: 'University Rank', icon: '🏆', color: '#f59e0b' },
  { target: '4',    suffix: '+',  label: 'Live Projects',   icon: '🚀', color: '#8b5cf6' },
  { target: '8',    suffix: '.54', label: 'CGPA',           icon: '⭐', color: '#10b981' },
]

const INFO_CHIPS = [
  { icon: GraduationCap, text: 'B.Tech IT — Sri Eshwar College of Engineering' },
  { icon: MapPin,         text: 'Tamil Nadu, India' },
  { icon: Award,          text: 'CGPA 8.54 · 2nd University Rank' },
  { icon: Cpu,            text: 'Full Stack & Distributed Systems' },
  { icon: Code2,          text: '3rd Year · Batch 2026' },
  { icon: Zap,            text: 'FAANG Aspirant · Open to Internships' },
]

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] } },
})

const fadeLeft = (delay = 0) => ({
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x:  0, transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] } },
})

const fadeRight = (delay = 0) => ({
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x:  0, transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] } },
})

export default function About() {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="section-pt" style={{ backgroundColor: '#050508' }}>
      <div className="section-wrapper">

        {/* Header */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-16"
        >
          <p className="section-label">01 / About</p>
          <h2 className="section-title">Who I Am</h2>
          <motion.div
            className="mt-3 h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, transparent)', maxWidth: 120 }}
            initial={{ width: 0 }} whileInView={{ width: 120 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Photo + chips */}
          <motion.div
            variants={fadeLeft(0.1)}
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col items-center lg:items-start gap-8"
          >
            <TiltImage imgError={imgError} onError={() => setImgError(true)} />

            {/* Info chips */}
            <div className="grid grid-cols-1 gap-2.5 w-full max-w-sm">
              {INFO_CHIPS.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
                  whileHover={{ x: 4, borderColor: 'rgba(59,130,246,0.25)' }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#94a3b8', transition: 'all 0.2s ease' }}
                >
                  <Icon size={14} className="text-blue-400 flex-shrink-0" />
                  <span>{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Bio + stats */}
          <motion.div
            variants={fadeRight(0.15)}
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col gap-8"
          >
            {/* Bio */}
            <div className="space-y-5">
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-lg leading-relaxed"
                style={{ color: '#cbd5e1' }}
              >
                I'm a{' '}
                <span className="font-bold gradient-text">3rd-year B.Tech IT student</span>
                {' '}building production-grade full stack applications and distributed systems.
                I work across the entire stack — React UIs, Spring Boot APIs, to systems-level Java implementations.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-base leading-relaxed"
                style={{ color: '#64748b' }}
              >
                Selected for{' '}
                <strong className="text-slate-300">Google Big Code Challenge Round 2 2026</strong>{' '}
                and chosen by{' '}
                <strong className="text-slate-300">NXP Semiconductors</strong>{' '}
                from 18,000+ applicants. Every project I build targets production-grade quality.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-base leading-relaxed italic"
                style={{ color: '#475569' }}
              >
                "Build the kind of engineer FAANG wants to hire — one system at a time."
              </motion.p>
            </div>

            {/* Stat counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i + 0.3, duration: 0.5, type: 'spring' }}
                  className="stat-card"
                >
                  <span className="text-xl mb-1">{s.icon}</span>
                  <span className="text-2xl font-black" style={{ color: s.color }}>
                    <Counter target={s.target} suffix={s.suffix} />
                  </span>
                  <span className="text-xs leading-tight text-center" style={{ color: '#64748b' }}>
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Currently building */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="p-5 rounded-2xl relative overflow-hidden"
              style={{ background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.12)' }}
            >
              <div className="absolute inset-0 animate-shimmer pointer-events-none" />
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#3b82f6' }}>
                ⚡ Currently Building
              </p>
              {[
                { name: 'NanoPay Pro',  desc: 'Payment platform · Kafka + WebSocket' },
                { name: 'Redis Clone',  desc: 'In-memory KV store · RESP + AOF' },
              ].map((b, i) => (
                <motion.div key={b.name}
                  className="flex items-center gap-3 mb-2 last:mb-0"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 animate-pulse" />
                  <span className="text-sm font-semibold text-slate-300">{b.name}</span>
                  <span className="text-xs" style={{ color: '#334155' }}>— {b.desc}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
