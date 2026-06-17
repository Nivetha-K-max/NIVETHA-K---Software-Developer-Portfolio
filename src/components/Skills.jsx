import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILL_GROUPS = [
  { category: 'Languages',    icon: '💻', color: '#3b82f6', textColor: '#93c5fd',
    skills: ['Java', 'JavaScript', 'TypeScript', 'C++', 'SQL'] },
  { category: 'Frontend',     icon: '🎨', color: '#06b6d4', textColor: '#67e8f9',
    skills: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'] },
  { category: 'Backend',      icon: '⚙️', color: '#8b5cf6', textColor: '#c4b5fd',
    skills: ['Spring Boot', 'Node.js', 'Express.js', 'REST APIs', 'Microservices', 'JWT', 'OAuth2'] },
  { category: 'Databases',    icon: '🗄️', color: '#f59e0b', textColor: '#fcd34d',
    skills: ['MySQL', 'MongoDB', 'Redis', 'PostgreSQL'] },
  { category: 'DevOps & Cloud', icon: '☁️', color: '#10b981', textColor: '#6ee7b7',
    skills: ['Docker', 'GitHub Actions', 'CI/CD', 'AWS EC2', 'AWS S3', 'Prometheus', 'Postman'] },
  { category: 'Core CS',      icon: '🧠', color: '#ec4899', textColor: '#f9a8d4',
    skills: ['DSA', 'System Design', 'OOP', 'DBMS', 'OS', 'Distributed Systems', 'Computer Networks'] },
]

// Proficiency levels for the progress bars
const PROFICIENCY = {
  Java: 92, JavaScript: 88, TypeScript: 78, 'C++': 75, SQL: 82,
  'React.js': 87, HTML5: 92, CSS3: 85, 'Tailwind CSS': 90, Bootstrap: 80,
  'Spring Boot': 84, 'Node.js': 82, 'Express.js': 80, 'REST APIs': 88,
  Microservices: 72, JWT: 85, OAuth2: 75,
  MySQL: 85, MongoDB: 82, Redis: 80, PostgreSQL: 72,
  Docker: 78, 'GitHub Actions': 75, 'CI/CD': 73, 'AWS EC2': 68, 'AWS S3': 65,
  Prometheus: 62, Postman: 88,
  DSA: 90, 'System Design': 80, OOP: 92, DBMS: 82, OS: 78,
  'Distributed Systems': 76, 'Computer Networks': 74,
}

function ProgressBar({ value, color }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <div ref={ref} className="w-full h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
        initial={{ width: 0 }}
        animate={{ width: inView ? `${value}%` : 0 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
      />
    </div>
  )
}

function SkillCard({ group, index }) {
  const [tilt, setTilt]     = useState({ x: 0, y: 0 })
  const [hovered, setHov]   = useState(false)
  const ref = useRef(null)
  const [expanded, setExp]  = useState(false)

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    setTilt({
      x: ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * -6,
      y: ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) *  6,
    })
  }

  const shown = expanded ? group.skills : group.skills.slice(0, 4)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={onMove}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHov(false) }}
      onMouseEnter={() => setHov(true)}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      className="relative p-6 rounded-2xl"
      whileStyle={{
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${group.color}20` : '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      {/* Card background */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: hovered
            ? `linear-gradient(135deg, rgba(18,18,28,0.95), rgba(18,18,28,0.85))`
            : 'rgba(13,13,20,0.8)',
          border: `1px solid ${hovered ? `${group.color}30` : 'rgba(255,255,255,0.06)'}`,
          boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.5), 0 0 24px ${group.color}18` : '0 4px 24px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease',
        }}
      />

      {/* Top accent */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${group.color}, transparent)` }}
        animate={{ opacity: hovered ? 1 : 0.4 }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <motion.div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: `${group.color}18`, border: `1px solid ${group.color}35` }}
            animate={{ boxShadow: hovered ? `0 0 20px ${group.color}40` : 'none' }}
            transition={{ duration: 0.3 }}
          >
            {group.icon}
          </motion.div>
          <div>
            <h3 className="text-sm font-bold" style={{ color: '#e2e8f0' }}>{group.category}</h3>
            <motion.div
              className="mt-1 h-0.5 rounded-full"
              style={{ background: `linear-gradient(90deg, ${group.color}, transparent)` }}
              initial={{ width: 24 }}
              animate={{ width: hovered ? 48 : 24 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="ml-auto text-xs" style={{ color: group.color, opacity: 0.6 }}>
            {group.skills.length} skills
          </span>
        </div>

        {/* Skill pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {shown.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="skill-pill px-3 py-1.5 text-xs font-medium"
              style={{
                background:  `${group.color}12`,
                border:      `1px solid ${group.color}28`,
                color:       group.textColor,
              }}
            >
              {skill}
            </motion.span>
          ))}
          {!expanded && group.skills.length > 4 && (
            <button
              onClick={() => setExp(true)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#475569' }}
            >
              +{group.skills.length - 4} more
            </button>
          )}
        </div>

        {/* Top skill progress bar */}
        <div className="space-y-2">
          {group.skills.slice(0, 2).map(skill => (
            <div key={skill} className="flex items-center gap-3">
              <span className="text-xs w-24 flex-shrink-0" style={{ color: '#475569' }}>{skill}</span>
              <ProgressBar value={PROFICIENCY[skill] || 75} color={group.color} />
              <span className="text-xs w-8 text-right flex-shrink-0" style={{ color: group.color, opacity: 0.7 }}>
                {PROFICIENCY[skill] || 75}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
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
          <p className="section-label">02 / Skills</p>
          <h2 className="section-title">Technical Arsenal</h2>
          <motion.div
            className="mt-3 h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, transparent)', maxWidth: 120 }}
            initial={{ width: 0 }} whileInView={{ width: 120 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="mt-4 text-sm" style={{ color: '#475569' }}>
            Technologies I've worked with across the full stack and systems level.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((group, i) => (
            <SkillCard key={group.category} group={group} index={i} />
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          <div className="h-px flex-1 max-w-xs rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <p className="text-sm text-center px-4" style={{ color: '#334155' }}>
            Always learning · Currently exploring Kafka internals & Raft consensus
          </p>
          <div className="h-px flex-1 max-w-xs rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
        </motion.div>
      </div>
    </div>
  )
}
