import { motion } from 'framer-motion'
import { ExternalLink, TrendingUp } from 'lucide-react'

const PROFILES = [
  {
    platform: 'LeetCode', icon: '⚡', color: '#ffa116',
    stats: [
      { label: 'Problems Solved', value: '400+' },
      { label: 'Max Rating',      value: '1489' },
      { label: 'Contests',        value: '25+' },
    ],
    badge: 'Knight', href: 'https://leetcode.com/u/Nivetha-K/',
  },
  {
    platform: 'SkillRack', icon: '🎯', color: '#3b82f6',
    stats: [
      { label: 'Problems Solved', value: '1240+' },
      { label: 'Certificates',    value: '18' },
      { label: 'Streak',          value: '365 days' },
    ],
    badge: 'Top Solver', href: 'https://www.skillrack.com/',
  },
  {
    platform: 'CodeChef', icon: '👨‍🍳', color: '#8b5cf6',
    stats: [
      { label: 'Problems Solved', value: '200+' },
      { label: 'Contests',        value: '10+' },
      { label: 'Rating',          value: '1200+' },
    ],
    badge: '2★', href: 'https://www.codechef.com/',
  },
  {
    platform: 'HackerRank', icon: '🌿', color: '#10b981',
    stats: [
      { label: 'Java',   value: '4★' },
      { label: 'SQL',    value: '2★' },
      { label: 'Python', value: '3★' },
    ],
    badge: '4★ Java', href: 'https://www.hackerrank.com/',
  },
]

export default function CodingProfiles() {
  return (
    <div className="section-pt" style={{ backgroundColor: '#050508' }}>
      <div className="section-wrapper">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label">08 / Profiles</p>
          <h2 className="section-title">Problem Solving Track</h2>
          <motion.div
            className="mt-3 h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6,transparent)', maxWidth: 120 }}
            initial={{ width: 0 }} whileInView={{ width: 120 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="mt-4 text-sm" style={{ color: '#475569' }}>
            1500+ problems solved across platforms · Consistent competitive programmer
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {PROFILES.map((p, i) => (
            <motion.a
              key={p.platform}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative flex flex-col gap-5 p-6 rounded-2xl group no-underline overflow-hidden"
              style={{
                background: 'rgba(13,13,20,0.9)',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
                transition: 'all 0.35s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${p.color}40`
                e.currentTarget.style.boxShadow   = `0 20px 50px rgba(0,0,0,0.55), 0 0 28px ${p.color}18`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.boxShadow   = '0 4px 24px rgba(0,0,0,0.35)'
              }}
            >
              {/* Top accent */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
              />

              {/* Hover bg glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${p.color}08, transparent 70%)` }}
              />

              {/* Icon + external */}
              <div className="flex items-start justify-between relative z-10">
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: `${p.color}18`, border: `1px solid ${p.color}30` }}
                  whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${p.color}40` }}
                >
                  {p.icon}
                </motion.div>
                <ExternalLink size={14} style={{ color: '#334155' }} className="mt-1 group-hover:text-slate-400 transition-colors" />
              </div>

              {/* Name + badge */}
              <div className="relative z-10">
                <h3 className="text-base font-black" style={{ color: '#e2e8f0' }}>{p.platform}</h3>
                <span
                  className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold"
                  style={{ background: `${p.color}15`, border: `1px solid ${p.color}30`, color: p.color }}
                >
                  {p.badge}
                </span>
              </div>

              {/* Stats */}
              <div className="flex flex-col gap-2.5 relative z-10">
                {p.stats.map(s => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: '#475569' }}>{s.label}</span>
                    <span className="text-sm font-black" style={{ color: p.color }}>{s.value}</span>
                  </div>
                ))}
              </div>

              {/* View link */}
              <motion.div
                className="flex items-center gap-1.5 text-xs font-bold relative z-10 group-hover:gap-2.5 transition-all duration-200"
                style={{ color: p.color, opacity: 0.7 }}
              >
                <TrendingUp size={11} /> View Profile
              </motion.div>
            </motion.a>
          ))}
        </div>

        {/* Total banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden"
          style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.12)' }}
        >
          <div className="absolute inset-0 animate-shimmer pointer-events-none" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)' }}>
              🧠
            </div>
            <div>
              <p className="text-sm font-black" style={{ color: '#e2e8f0' }}>1500+ Problems Solved</p>
              <p className="text-xs mt-0.5" style={{ color: '#475569' }}>
                LeetCode · SkillRack · CodeChef · HackerRank · Codeforces
              </p>
            </div>
          </div>
          <div
            className="px-4 py-2 rounded-xl text-sm font-bold flex-shrink-0 relative z-10"
            style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#93c5fd' }}
          >
            Consistent Daily Solver
          </div>
        </motion.div>
      </div>
    </div>
  )
}
