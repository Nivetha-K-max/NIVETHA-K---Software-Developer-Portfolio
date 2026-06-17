import { motion } from 'framer-motion'

const ACHIEVEMENTS = [
  {
    icon:  '🏆',
    title: '2nd University Rank',
    org:   'Sri Eshwar College of Engineering',
    desc:  'Secured 2nd rank across the university in B.Tech Information Technology with a CGPA of 8.54.',
    color: '#f59e0b',
    year:  '2024',
  },
  {
    icon:  '🔍',
    title: 'Google Big Code Challenge — Round 2',
    org:   'Google',
    desc:  'Qualified for Round 2 of Google Big Code Challenge 2026, competing among top competitive programmers nationally.',
    color: '#3b82f6',
    year:  '2026',
  },
  {
    icon:  '🚀',
    title: 'NXP Semiconductors — Selected',
    org:   'NXP Semiconductors',
    desc:  'Shortlisted from 18,000+ applicants nationwide for NXP Semiconductors recruitment drive.',
    color: '#8b5cf6',
    year:  '2025',
  },
  {
    icon:  '📊',
    title: 'ICAT 2025 — All India Rank 232',
    org:   'ICAT',
    desc:  'Achieved All India Rank 232 in ICAT 2025, a national-level aptitude and technical assessment.',
    color: '#06b6d4',
    year:  '2025',
  },
  {
    icon:  '💼',
    title: 'PayPal Career Academy — Finalist',
    org:   'PayPal',
    desc:  'Selected as a finalist for PayPal Career Academy India 2025, a highly competitive program for aspiring engineers.',
    color: '#10b981',
    year:  '2025',
  },
  {
    icon:  '🤖',
    title: 'Agentica 2.0 Hackathon',
    org:   'IIIT Sri City',
    desc:  'Participated in Agentica 2.0 AI Hackathon hosted by IIIT Sri City, building AI-powered agent solutions.',
    color: '#ec4899',
    year:  '2025',
  },
]

const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } }),
}

export default function Achievements() {
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
            04 / Achievements
          </p>
          <h2 className="section-title">Milestones & Recognition</h2>
          <div className="mt-2 w-16 h-1 rounded-full" style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }} />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.title}
              variants={cardVariants}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="relative p-6 rounded-2xl flex flex-col gap-4"
              style={{
                background:  'rgba(18,18,26,0.85)',
                border:      '1px solid rgba(255,255,255,0.06)',
                boxShadow:   '0 4px 24px rgba(0,0,0,0.35)',
                transition:  'box-shadow 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${a.color}35`
                e.currentTarget.style.boxShadow   = `0 12px 40px rgba(0,0,0,0.5), 0 0 20px ${a.color}12`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.boxShadow   = '0 4px 24px rgba(0,0,0,0.35)'
              }}
            >
              {/* Color accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${a.color}, transparent)` }}
              />

              {/* Icon + year */}
              <div className="flex items-start justify-between">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${a.color}15`, border: `1px solid ${a.color}30` }}
                >
                  {a.icon}
                </div>
                <span
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                  style={{ background: `${a.color}12`, border: `1px solid ${a.color}25`, color: a.color }}
                >
                  {a.year}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1.5 flex-grow">
                <h3 className="text-sm font-bold leading-snug" style={{ color: '#e2e8f0' }}>{a.title}</h3>
                <p className="text-xs font-semibold" style={{ color: a.color }}>{a.org}</p>
                <p className="text-xs leading-relaxed mt-1" style={{ color: '#64748b' }}>{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
