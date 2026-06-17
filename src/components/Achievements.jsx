import { motion } from 'framer-motion'

const ACHIEVEMENTS = [
  {
    icon: '🏆', title: '2nd University Rank',
    org: 'Sri Eshwar College of Engineering',
    desc: 'Secured 2nd rank across the university in B.Tech IT with a CGPA of 8.54.',
    color: '#f59e0b', year: '2024',
  },
  {
    icon: '🔍', title: 'Google Big Code Challenge — Round 2',
    org: 'Google',
    desc: 'Qualified for Round 2 of Google Big Code Challenge 2026 among top competitive programmers nationally.',
    color: '#3b82f6', year: '2026',
  },
  {
    icon: '🚀', title: 'NXP Semiconductors — Selected',
    org: 'NXP Semiconductors',
    desc: 'Shortlisted from 18,000+ applicants nationwide for NXP Semiconductors recruitment drive.',
    color: '#8b5cf6', year: '2025',
  },
  {
    icon: '📊', title: 'ICAT 2025 — All India Rank 232',
    org: 'ICAT',
    desc: 'Achieved All India Rank 232 in ICAT 2025, a national-level aptitude and technical assessment.',
    color: '#06b6d4', year: '2025',
  },
  {
    icon: '💼', title: 'PayPal Career Academy — Finalist',
    org: 'PayPal',
    desc: 'Selected as a finalist for PayPal Career Academy India 2025, a highly competitive program for aspiring engineers.',
    color: '#10b981', year: '2025',
  },
  {
    icon: '🤖', title: 'Agentica 2.0 Hackathon',
    org: 'IIIT Sri City',
    desc: 'Participated in Agentica 2.0 AI Hackathon hosted by IIIT Sri City, building AI-powered agent solutions.',
    color: '#ec4899', year: '2025',
  },
]

export default function Achievements() {
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
          <p className="section-label">04 / Achievements</p>
          <h2 className="section-title">Milestones & Recognition</h2>
          <motion.div
            className="mt-3 h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6,transparent)', maxWidth: 120 }}
            initial={{ width: 0 }} whileInView={{ width: 120 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -6 }}
              className="relative p-6 rounded-2xl flex flex-col gap-4 overflow-hidden group"
              style={{
                background: 'rgba(13,13,20,0.85)',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${a.color}35`
                e.currentTarget.style.boxShadow   = `0 16px 48px rgba(0,0,0,0.55), 0 0 24px ${a.color}15`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.boxShadow   = '0 4px 24px rgba(0,0,0,0.35)'
              }}
            >
              {/* Top accent */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${a.color}, transparent)` }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
              />

              {/* Subtle bg glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${a.color}08, transparent 70%)` }}
              />

              {/* Icon + year row */}
              <div className="flex items-start justify-between relative z-10">
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: `${a.color}15`, border: `1px solid ${a.color}30` }}
                  whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${a.color}40` }}
                  transition={{ duration: 0.2 }}
                >
                  {a.icon}
                </motion.div>
                <span
                  className="px-2.5 py-1 rounded-lg text-xs font-bold"
                  style={{ background: `${a.color}12`, border: `1px solid ${a.color}25`, color: a.color }}
                >
                  {a.year}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1.5 flex-grow relative z-10">
                <h3 className="text-sm font-black leading-snug" style={{ color: '#e2e8f0' }}>
                  {a.title}
                </h3>
                <p className="text-xs font-bold" style={{ color: a.color }}>{a.org}</p>
                <p className="text-xs leading-relaxed mt-1" style={{ color: '#64748b' }}>{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
