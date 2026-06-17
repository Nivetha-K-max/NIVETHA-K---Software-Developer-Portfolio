import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, Calendar, MapPin, CheckCircle, ArrowRight, Trophy } from 'lucide-react'

// ── Animated number counter ───────────────────────────────────────────────────
function AnimatedNumber({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView) return
    const numeric = parseInt(String(target).replace(/\D/g, ''), 10)
    const startTime = performance.now()
    const tick = (now) => {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * numeric))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(numeric)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

const EXPERIENCES = [
  {
    id:       'igenuine',
    role:     'MERN Stack Developer Intern',
    company:  'iGenuine Technologies',
    location: 'Tamil Nadu, India',
    duration: '2024',
    type:     'Internship',
    color:    '#3b82f6',
    accentColors: null,
    icon:     Briefcase,
    stat:     null,
    bullets: [
      'Developed full-stack web applications using MongoDB, Express.js, React.js, and Node.js',
      'Built and integrated REST APIs connecting frontend with backend services',
      'Implemented JWT-based authentication and role-based access control',
      'Managed version control and collaborative development workflows using Git & GitHub',
      'Delivered responsive UI components and optimized database queries for performance',
    ],
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Git'],
  },
]


// Google multi-color animated top bar
function GoogleAccentBar({ colors, inView }) {
  return (
    <div className="absolute top-0 left-0 right-0 h-px overflow-hidden rounded-t-2xl flex">
      {colors.map((c, i) => (
        <motion.div
          key={i}
          className="flex-1 h-full"
          style={{ background: c }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.3 + i * 0.12, duration: 0.5, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

function TimelineItem({ exp, isLast }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const IconComp = exp.icon

  const isGoogle = exp.id === 'google'

  return (
    <div ref={ref} className="relative flex gap-8">
      {/* Dot + line */}
      <div className="hidden sm:flex flex-col items-center flex-shrink-0" style={{ width: 48 }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
          className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: isGoogle
              ? 'linear-gradient(135deg, rgba(66,133,244,0.15), rgba(52,168,83,0.1))'
              : 'rgba(59,130,246,0.12)',
            border: `2px solid ${isGoogle ? 'rgba(66,133,244,0.5)' : 'rgba(59,130,246,0.4)'}`,
            boxShadow: inView ? `0 0 24px ${isGoogle ? 'rgba(66,133,244,0.3)' : 'rgba(59,130,246,0.25)'}` : 'none',
          }}
        >
          <IconComp size={18} style={{ color: exp.color }} />
          {inView && (
            <motion.div
              className="absolute inset-0 rounded-xl"
              style={{ border: `2px solid ${exp.color}` }}
              animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </motion.div>

        {!isLast && (
          <motion.div
            className="flex-1 w-0.5 mt-2"
            style={{ background: 'linear-gradient(180deg, rgba(59,130,246,0.4), rgba(59,130,246,0.05))' }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex-1 pb-10"
      >
        <motion.div
          whileHover={{ y: -5, boxShadow: isGoogle
            ? '0 20px 48px rgba(0,0,0,0.55), 0 0 32px rgba(66,133,244,0.15)'
            : '0 20px 48px rgba(0,0,0,0.55), 0 0 24px rgba(59,130,246,0.12)' }}
          className="relative p-6 rounded-2xl overflow-hidden"
          style={{
            background: isGoogle
              ? 'linear-gradient(135deg, rgba(13,13,20,0.95), rgba(10,15,25,0.95))'
              : 'rgba(13,13,20,0.9)',
            border: `1px solid ${isGoogle ? 'rgba(66,133,244,0.2)' : 'rgba(255,255,255,0.07)'}`,
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {/* Top accent */}
          {isGoogle && exp.accentColors ? (
            <GoogleAccentBar colors={exp.accentColors} inView={inView} />
          ) : (
            <motion.div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, ${exp.color}, transparent)` }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.7 }}
            />
          )}

          {/* Shimmer */}
          <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-40" />

          {/* Google special bg glow */}
          {isGoogle && (
            <div className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{ background: 'radial-gradient(circle at 20% 50%, rgba(66,133,244,0.05), transparent 60%)' }} />
          )}

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5 relative z-10">
            <div className="flex-1">
              {/* Google logo pill */}
              {isGoogle && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3"
                  style={{ background: 'rgba(66,133,244,0.1)', border: '1px solid rgba(66,133,244,0.25)' }}
                >
                  {/* Google G logo */}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span style={{ color: '#4285f4' }}>Google</span>
                </motion.div>
              )}

              <h3 className="text-lg font-black leading-snug" style={{ color: '#f1f5f9' }}>
                {exp.role}
              </h3>
              <p className="text-base font-bold mt-1"
                style={{ color: isGoogle ? '#4285f4' : exp.color }}>
                {exp.company}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs" style={{ color: '#475569' }}>
                <span className="flex items-center gap-1.5"><Calendar size={12} />{exp.duration}</span>
                <span className="flex items-center gap-1.5"><MapPin size={12} />{exp.location}</span>
              </div>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-2">
              <motion.span
                className="px-3 py-1.5 rounded-xl text-xs font-bold w-fit"
                style={{
                  background: isGoogle ? 'rgba(66,133,244,0.12)' : 'rgba(59,130,246,0.1)',
                  border: `1px solid ${isGoogle ? 'rgba(66,133,244,0.3)' : 'rgba(59,130,246,0.25)'}`,
                  color: isGoogle ? '#74a9f7' : '#93c5fd',
                }}
                whileHover={{ boxShadow: `0 0 16px ${isGoogle ? 'rgba(66,133,244,0.3)' : 'rgba(59,130,246,0.3)'}` }}
              >
                {exp.type}
              </motion.span>

              {/* Animated stat counter for Google */}
              {exp.stat && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.5, type: 'spring' }}
                  className="flex flex-col items-center px-4 py-2 rounded-xl text-center"
                  style={{ background: 'rgba(66,133,244,0.08)', border: '1px solid rgba(66,133,244,0.2)' }}
                >
                  <span className="text-xl font-black" style={{ color: '#4285f4' }}>
                    <AnimatedNumber target={exp.stat.value} suffix={exp.stat.suffix} />
                  </span>
                  <span className="text-xs" style={{ color: '#475569' }}>{exp.stat.label}</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Bullets */}
          <ul className="flex flex-col gap-2.5 mb-5 relative z-10">
            {exp.bullets.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.07, duration: 0.4 }}
                className="flex items-start gap-2.5 text-sm"
                style={{ color: '#94a3b8' }}
              >
                <CheckCircle
                  size={14}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: isGoogle ? '#4285f4' : '#3b82f6' }}
                />
                {b}
              </motion.li>
            ))}
          </ul>

          {/* Stack */}
          <div className="flex flex-wrap gap-1.5 relative z-10">
            {exp.stack.map(t => (
              <span key={t}
                className="px-2.5 py-1 rounded-md text-xs font-medium"
                style={{
                  background: isGoogle ? 'rgba(66,133,244,0.1)' : 'rgba(139,92,246,0.1)',
                  border: `1px solid ${isGoogle ? 'rgba(66,133,244,0.2)' : 'rgba(139,92,246,0.2)'}`,
                  color: isGoogle ? '#74a9f7' : '#c4b5fd',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function Experience() {
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
          <p className="section-label">07 / Experience</p>
          <h2 className="section-title">Work Experience</h2>
          <motion.div
            className="mt-3 h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, transparent)', maxWidth: 120 }}
            initial={{ width: 0 }} whileInView={{ width: 120 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {EXPERIENCES.map((exp, i) => (
            <TimelineItem
              key={exp.id}
              exp={exp}
              isLast={i === EXPERIENCES.length - 1}
            />
          ))}

          {/* Next role node */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="hidden sm:flex items-center gap-5 pl-0"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(139,92,246,0.08)', border: '2px dashed rgba(139,92,246,0.25)' }}>
              <span className="text-lg">🚀</span>
            </div>
            <div className="flex items-center gap-2 text-sm italic" style={{ color: '#334155' }}>
              <ArrowRight size={14} />
              Next role loading... actively seeking SDE internships 2027
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
