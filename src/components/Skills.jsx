import { motion } from 'framer-motion'

const SKILL_GROUPS = [
  {
    category:  'Languages',
    icon:      '💻',
    color:     '#3b82f6',
    textColor: '#93c5fd',
    skills:    ['Java', 'JavaScript', 'C++', 'SQL', 'TypeScript'],
  },
  {
    category:  'Frontend',
    icon:      '🎨',
    color:     '#06b6d4',
    textColor: '#67e8f9',
    skills:    ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    category:  'Backend',
    icon:      '⚙️',
    color:     '#8b5cf6',
    textColor: '#c4b5fd',
    skills:    ['Spring Boot', 'Node.js', 'Express.js', 'REST APIs', 'Microservices', 'JWT', 'OAuth2'],
  },
  {
    category:  'Databases',
    icon:      '🗄️',
    color:     '#f59e0b',
    textColor: '#fcd34d',
    skills:    ['MySQL', 'MongoDB', 'Redis', 'PostgreSQL'],
  },
  {
    category:  'DevOps & Cloud',
    icon:      '☁️',
    color:     '#10b981',
    textColor: '#6ee7b7',
    skills:    ['Docker', 'GitHub Actions', 'CI/CD', 'AWS EC2', 'AWS S3', 'Prometheus', 'Postman'],
  },
  {
    category:  'Core CS',
    icon:      '🧠',
    color:     '#ec4899',
    textColor: '#f9a8d4',
    skills:    ['DSA', 'System Design', 'OOP', 'DBMS', 'OS', 'Distributed Systems', 'Computer Networks'],
  },
]

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden:  { opacity: 0, scale: 0.85, y: 8 },
  visible: { opacity: 1, scale: 1,    y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } }),
}

export default function Skills() {
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
            02 / Skills
          </p>
          <h2 className="section-title">Technical Arsenal</h2>
          <div className="mt-2 w-16 h-1 rounded-full" style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }} />
          <p className="mt-4 text-sm" style={{ color: '#475569' }}>
            Technologies I've worked with across the full stack and systems level.
          </p>
        </motion.div>

        {/* Skill group cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.category}
              variants={cardVariants}
              custom={gi}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 20px ${group.color}15` }}
              className="p-6 rounded-2xl transition-shadow duration-300"
              style={{
                background: 'rgba(18,18,26,0.8)',
                border: `1px solid rgba(255,255,255,0.06)`,
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: `${group.color}18`, border: `1px solid ${group.color}35` }}
                >
                  {group.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold" style={{ color: '#e2e8f0' }}>
                    {group.category}
                  </h3>
                  <div className="mt-1 h-0.5 w-10 rounded-full" style={{ background: `linear-gradient(90deg, ${group.color}, transparent)` }} />
                </div>
              </div>

              {/* Skill pills */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {group.skills.map(skill => (
                  <motion.span
                    key={skill}
                    variants={itemVariants}
                    whileHover={{ scale: 1.08, y: -1 }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-default select-none"
                    style={{
                      background:  `${group.color}12`,
                      border:      `1px solid ${group.color}28`,
                      color:       group.textColor,
                      transition:  'all 0.2s ease',
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <div className="h-px w-16 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <p className="text-sm text-center" style={{ color: '#334155' }}>
            Always learning · Currently exploring Kafka internals & Raft consensus
          </p>
          <div className="h-px w-16 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </motion.div>
      </div>
    </div>
  )
}
