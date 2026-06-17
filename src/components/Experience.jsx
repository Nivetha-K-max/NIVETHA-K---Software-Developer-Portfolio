import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react'

const EXPERIENCES = [
  {
    role:     'MERN Stack Developer Intern',
    company:  'iGenuine Technologies',
    location: 'Tamil Nadu, India',
    duration: '2024',
    type:     'Internship',
    color:    '#3b82f6',
    bullets:  [
      'Developed full-stack web applications using MongoDB, Express.js, React.js, and Node.js',
      'Built and integrated REST APIs connecting frontend with backend services',
      'Implemented JWT-based authentication and role-based access control',
      'Managed version control and collaborative development workflows using Git & GitHub',
      'Delivered responsive UI components and optimized database queries for performance',
    ],
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Git'],
  },
]

const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Experience() {
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
            06 / Experience
          </p>
          <h2 className="section-title">Work Experience</h2>
          <div className="mt-2 w-16 h-1 rounded-full" style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }} />
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">

          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px hidden sm:block"
            style={{ background: 'linear-gradient(180deg, #3b82f6, rgba(59,130,246,0.05))' }}
          />

          {EXPERIENCES.map((exp) => (
            <motion.div
              key={exp.company}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative sm:pl-20 mb-8"
            >
              {/* Timeline dot */}
              <div
                className="hidden sm:flex absolute left-0 top-6 w-12 h-12 rounded-xl items-center justify-center z-10"
                style={{ background: 'rgba(59,130,246,0.12)', border: '2px solid rgba(59,130,246,0.35)' }}
              >
                <Briefcase size={18} style={{ color: '#3b82f6' }} />
              </div>

              {/* Card */}
              <motion.div
                whileHover={{ y: -4 }}
                className="relative p-6 rounded-2xl"
                style={{ background: 'rgba(18,18,26,0.9)', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                  style={{ background: 'linear-gradient(90deg, #3b82f6, transparent)' }}
                />

                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: '#f1f5f9' }}>{exp.role}</h3>
                    <p className="text-base font-semibold mt-0.5" style={{ color: '#3b82f6' }}>{exp.company}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs" style={{ color: '#475569' }}>
                      <span className="flex items-center gap-1"><Calendar size={12} />{exp.duration}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} />{exp.location}</span>
                    </div>
                  </div>

                  <span
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold w-fit flex-shrink-0"
                    style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', color: '#93c5fd' }}
                  >
                    {exp.type}
                  </span>
                </div>

                {/* Bullet points */}
                <ul className="flex flex-col gap-2 mb-5">
                  {exp.bullets.map(b => (
                    <li key={b} className="flex items-start gap-2.5 text-sm" style={{ color: '#94a3b8' }}>
                      <CheckCircle size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.stack.map(t => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* "More to come" end node */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="hidden sm:flex items-center gap-4 sm:pl-20"
          >
            <div
              className="absolute left-0 w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(139,92,246,0.08)', border: '2px dashed rgba(139,92,246,0.25)' }}
            >
              <span className="text-lg">🚀</span>
            </div>
            <p className="text-sm italic" style={{ color: '#334155' }}>
              Next role loading... actively seeking SDE internships 2025
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
