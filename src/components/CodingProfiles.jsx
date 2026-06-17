import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const PROFILES = [
  {
    platform:   'LeetCode',
    icon:       '⚡',
    color:      '#ffa116',
    stats:      [
      { label: 'Problems Solved', value: '300+' },
      { label: 'Contest Rating',  value: '1372' },
      { label: 'Contests',        value: '20+' },
    ],
    badge:      'Knight',
    badgeColor: '#ffa116',
    href:       'https://leetcode.com/u/Nivetha-K/',
  },
  {
    platform:   'SkillRack',
    icon:       '🎯',
    color:      '#3b82f6',
    stats:      [
      { label: 'Problems Solved', value: '1240+' },
      { label: 'Certificates',    value: '18' },
      { label: 'Streak',          value: '365 days' },
    ],
    badge:      'Top Solver',
    badgeColor: '#3b82f6',
    href:       'https://www.skillrack.com/',
  },
  {
    platform:   'CodeChef',
    icon:       '👨‍🍳',
    color:      '#8b5cf6',
    stats:      [
      { label: 'Problems Solved', value: '200+' },
      { label: 'Contests',        value: '10+' },
      { label: 'Rating',          value: '1200+' },
    ],
    badge:      '2★',
    badgeColor: '#8b5cf6',
    href:       'https://www.codechef.com/',
  },
  {
    platform:   'HackerRank',
    icon:       '🌿',
    color:      '#10b981',
    stats:      [
      { label: 'Java',   value: '4★' },
      { label: 'SQL',    value: '2★' },
      { label: 'Python', value: '3★' },
    ],
    badge:      '4★ Java',
    badgeColor: '#10b981',
    href:       'https://www.hackerrank.com/',
  },
]

const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55, ease: 'easeOut' } }),
}

export default function CodingProfiles() {
  return (
    <div className="section-pt" style={{ backgroundColor: '#0a0a0f' }}>
      <div className="section-wrapper">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#3b82f6' }}>
            07 / Profiles
          </p>
          <h2 className="section-title">Problem Solving Track</h2>
          <div className="mt-2 w-16 h-1 rounded-full" style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }} />
          <p className="mt-4 text-sm" style={{ color: '#475569' }}>
            1500+ problems solved across platforms · Consistent competitive programmer
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROFILES.map((p, i) => (
            <motion.a
              key={p.platform}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative flex flex-col gap-5 p-6 rounded-2xl group no-underline"
              style={{
                background:  'rgba(18,18,26,0.9)',
                border:      '1px solid rgba(255,255,255,0.06)',
                boxShadow:   '0 4px 24px rgba(0,0,0,0.35)',
                transition:  'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${p.color}40`
                e.currentTarget.style.boxShadow   = `0 12px 40px rgba(0,0,0,0.5), 0 0 24px ${p.color}18`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.boxShadow   = '0 4px 24px rgba(0,0,0,0.35)'
              }}
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }}
              />

              {/* Header */}
              <div className="flex items-start justify-between">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${p.color}18`, border: `1px solid ${p.color}30` }}
                >
                  {p.icon}
                </div>
                <ExternalLink
                  size={14}
                  className="mt-1 transition-colors duration-200"
                  style={{ color: '#334155' }}
                />
              </div>

              {/* Platform name + badge */}
              <div>
                <h3 className="text-base font-bold" style={{ color: '#e2e8f0' }}>{p.platform}</h3>
                <span
                  className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: `${p.color}15`, border: `1px solid ${p.color}30`, color: p.color }}
                >
                  {p.badge}
                </span>
              </div>

              {/* Stats */}
              <div className="flex flex-col gap-2.5">
                {p.stats.map(s => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: '#475569' }}>{s.label}</span>
                    <span className="text-sm font-bold" style={{ color: p.color }}>{s.value}</span>
                  </div>
                ))}
              </div>

              {/* View Profile */}
              <div
                className="flex items-center gap-1.5 text-xs font-semibold pt-1 group-hover:gap-2.5 transition-all duration-200"
                style={{ color: p.color, opacity: 0.75 }}
              >
                View Profile <ExternalLink size={11} />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Total solved banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.12)' }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)' }}
            >
              🧠
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: '#e2e8f0' }}>1500+ Problems Solved</p>
              <p className="text-xs mt-0.5" style={{ color: '#475569' }}>
                LeetCode · SkillRack · CodeChef · HackerRank · Codeforces
              </p>
            </div>
          </div>
          <div
            className="px-4 py-2 rounded-xl text-sm font-semibold flex-shrink-0"
            style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#93c5fd' }}
          >
            Consistent Daily Solver
          </div>
        </motion.div>
      </div>
    </div>
  )
}
