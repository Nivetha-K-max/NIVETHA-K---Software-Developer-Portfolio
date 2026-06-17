import { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Cpu, Zap } from 'lucide-react'

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } }),
}

const STATS = [
  { value: '1500+', label: 'Problems Solved',    icon: '🧩' },
  { value: '2nd',   label: 'University Rank',     icon: '🏆' },
  { value: '4+',    label: 'Production Projects', icon: '🚀' },
]

const INFO_CHIPS = [
  { icon: GraduationCap, text: 'B.Tech IT — Sri Eshwar College of Engineering' },
  { icon: MapPin,        text: 'Tamil Nadu, India' },
  { icon: Zap,           text: 'CGPA 8.54 · 2nd University Rank' },
  { icon: Cpu,           text: 'Full Stack Software Engineering' },
]

const BUILDING = [
  { name: 'NanoPay Pro',  desc: 'Payment platform with Kafka + WebSocket' },
  { name: 'Redis Clone',  desc: 'In-memory KV store with RESP & AOF' },
]

export default function About() {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="section-pt" style={{ backgroundColor: '#0a0a0f' }}>
      <div className="section-wrapper">

        {/* Header */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#3b82f6' }}>
            01 / About
          </p>
          <h2 className="section-title">Who I Am</h2>
          <div className="mt-2 w-16 h-1 rounded-full" style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }} />
        </motion.div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left — Avatar */}
          <motion.div
            variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-col items-center lg:items-start gap-6"
          >
            {/* Avatar card */}
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-3xl blur-xl opacity-30"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
              />
              <div
                className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden"
                style={{ border: '2px solid rgba(59,130,246,0.3)' }}
              >
                {imgError ? (
                  <div
                    className="w-full h-full flex items-center justify-center text-7xl font-black"
                    style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))' }}
                  >
                    <span className="gradient-text">NK</span>
                  </div>
                ) : (
                  <img
                    src="/assets/Nivetha.jpg"
                    alt="Nivetha K — Software Engineer"
                    className="w-full h-full object-cover object-top"
                    onError={() => setImgError(true)}
                  />
                )}
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -right-4 px-3 py-2 rounded-xl text-xs font-semibold"
                style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#6ee7b7' }}
              >
                🟢 Available
              </motion.div>
            </div>

            {/* Info chips */}
            <div className="flex flex-col gap-2.5 w-full max-w-xs">
              {INFO_CHIPS.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#94a3b8' }}
                >
                  <Icon size={15} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            {/* Bio */}
            <div className="space-y-4">
              <p className="text-lg leading-relaxed" style={{ color: '#cbd5e1' }}>
                I'm a <span className="font-semibold" style={{ color: '#93c5fd' }}>3rd-year B.Tech IT student</span> building
                production-grade full stack applications and distributed systems. I work across the
                entire stack — from React UIs to Spring Boot APIs to systems-level Java implementations.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#64748b' }}>
                Solved <strong className="text-slate-300">1500+ DSA problems</strong> across LeetCode, CodeChef, and SkillRack.
                Selected for <strong className="text-slate-300">Google Big Code Challenge Round 2 2026</strong> and
                chosen by <strong className="text-slate-300">NXP Semiconductors</strong> from 18,000+ applicants.
                Every project I build targets the same quality bar as production-grade systems.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#64748b' }}>
                My goal is simple: <span className="italic text-slate-400">build the kind of engineer FAANG wants to hire</span> —
                one system at a time.
              </p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-3">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp} custom={i + 2} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="flex flex-col items-center gap-1.5 p-4 rounded-2xl text-center"
                  style={{ background: 'rgba(18,18,26,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <span className="text-xl">{s.icon}</span>
                  <span className="text-2xl font-black gradient-text">{s.value}</span>
                  <span className="text-xs leading-tight" style={{ color: '#64748b' }}>{s.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Currently building */}
            <div
              className="p-5 rounded-2xl"
              style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#3b82f6' }}>
                ⚡ Currently Building
              </p>
              <div className="flex flex-col gap-2.5">
                {BUILDING.map(b => (
                  <div key={b.name} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 animate-pulse" />
                    <span className="text-sm font-medium text-slate-300">{b.name}</span>
                    <span className="text-xs" style={{ color: '#475569' }}>— {b.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
