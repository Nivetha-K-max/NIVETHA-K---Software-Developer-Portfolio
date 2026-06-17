import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Star, Lock, ChevronRight } from 'lucide-react'

const PROJECTS = [
  {
    title: 'Redis Clone — Key-Value Store',
    tags: ['Featured', 'Systems'],
    tagColor: '#3b82f6',
    icon: '🗄️',
    description: 'Production-grade in-memory key-value store built from scratch implementing the RESP protocol, LRU eviction with O(1) ops, TTL lazy+active expiry, AOF persistence with configurable fsync, Java NIO non-blocking event loop, and master-replica async replication.',
    highlights: [
      'RESP protocol — full GET/SET/DEL/EXPIRE/TTL',
      'LRU eviction: doubly-linked list + hashmap O(1)',
      'AOF persistence — < 1s data loss on crash',
      'Master-replica replication with failover',
    ],
    stack: ['Java', 'TCP Sockets', 'NIO', 'AOF', 'Docker', 'LRU'],
    github: null, demo: null, featured: true,
  },
  {
    title: 'NanoPay Pro — Payment Platform',
    tags: ['Featured', 'Fintech'],
    tagColor: '#8b5cf6',
    icon: '💳',
    description: 'Production-grade payment platform with multi-role JWT + OAuth2 auth, wallet engine with pessimistic locking, Kafka event streaming, fraud detection rules engine, real-time WebSocket notifications, and full observability with Prometheus + Grafana.',
    highlights: [
      'Pessimistic locking — zero double-spend',
      'Kafka event streaming for async flows',
      'Real-time WebSocket balance updates',
      'Prometheus + Grafana observability',
    ],
    stack: ['Java', 'Spring Boot', 'Kafka', 'Redis', 'MySQL', 'React.js', 'Docker', 'Prometheus'],
    github: null, demo: null, featured: true,
  },
  {
    title: 'Distributed Message Queue',
    tags: ['Systems', 'Kafka-Inspired'],
    tagColor: '#f59e0b',
    icon: '📡',
    description: 'Kafka-inspired pub-sub message queue built from scratch — topics, partitions, consumer group offset tracking. Java NIO non-blocking TCP benchmarked at 100,000+ messages/sec, leader election, async replication, Docker multi-broker simulation.',
    highlights: [
      '100,000+ messages/sec via Java NIO',
      'Consumer group offset persistence on disk',
      'Leader election + async replication',
      'Docker multi-broker failover testing',
    ],
    stack: ['Java', 'TCP Sockets', 'NIO', 'Docker', 'Replication'],
    github: null, demo: null, featured: false,
  },
  {
    title: 'Mini Search Engine',
    tags: ['Systems', 'Information Retrieval'],
    tagColor: '#ec4899',
    icon: '🔍',
    description: 'BFS web crawler with robots.txt compliance indexing 50,000+ pages into an on-disk inverted index. TF-IDF + PageRank ranking, boolean query parser (AND/OR/NOT) under 100ms latency. 60% index compression.',
    highlights: [
      '50,000+ pages indexed with BFS crawler',
      'TF-IDF + PageRank ranking pipeline',
      'AND/OR/NOT boolean query parser',
      '60% index size reduction via compression',
    ],
    stack: ['Java', 'Inverted Index', 'TF-IDF', 'PageRank', 'REST API'],
    github: null, demo: null, featured: false,
  },
  {
    title: 'URL Shortener — Distributed',
    tags: ['Full Stack', 'Distributed'],
    tagColor: '#06b6d4',
    icon: '🔗',
    description: 'Distributed URL shortening system with SHA-256 hashing, Redis caching achieving 87% latency reduction, rate limiting per IP with sliding window, and real-time analytics dashboard tracking CTR and geographic distribution.',
    highlights: [
      '87% latency reduction via Redis caching',
      'SHA-256 hashing + collision handling',
      'Rate limiting per IP with sliding window',
      'Analytics dashboard with live metrics',
    ],
    stack: ['Node.js', 'React.js', 'MongoDB', 'Redis', 'Express.js'],
    github: null, demo: null, featured: false,
  },
  {
    title: 'E-Commerce Platform',
    tags: ['Full Stack', 'MERN'],
    tagColor: '#10b981',
    icon: '🛒',
    description: 'Full-stack e-commerce application with JWT auth, product management, cart and order workflows, MongoDB schema optimization (40% faster queries), and an admin dashboard for inventory with role-based access.',
    highlights: [
      '40% faster queries via schema optimization',
      'JWT auth with role-based access control',
      'Admin dashboard for inventory + orders',
      'Optimized MongoDB aggregation pipelines',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    github: null, demo: null, featured: false,
  },
]

const FILTERS = ['All', 'Featured', 'Systems', 'Full Stack']

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hov, setHov]   = useState(false)

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    setTilt({
      x: ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * -5,
      y: ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) *  5,
    })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={onMove}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHov(false) }}
      onMouseEnter={() => setHov(true)}
      style={{ transformStyle: 'preserve-3d', perspective: 800, rotateX: tilt.x, rotateY: tilt.y }}
      className="project-card relative flex flex-col p-6 rounded-2xl"
    >
      {/* Dynamic border + glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: `1px solid ${hov ? `${project.tagColor}40` : 'rgba(255,255,255,0.07)'}`,
          boxShadow: hov ? `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${project.tagColor}18` : '0 4px 24px rgba(0,0,0,0.4)',
          transition: 'all 0.35s ease',
        }}
      />

      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${project.tagColor}, transparent)` }}
        animate={{ opacity: hov ? 1 : 0.5 }}
      />

      {/* Featured badge */}
      {project.featured && (
        <motion.div
          className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
          style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }}
          animate={{ boxShadow: hov ? '0 0 16px rgba(251,191,36,0.2)' : 'none' }}
        >
          <Star size={9} fill="currentColor" />
          Featured
        </motion.div>
      )}

      {/* Icon + title */}
      <div className="flex items-start gap-4 mb-4 pr-20">
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: `${project.tagColor}15`, border: `1px solid ${project.tagColor}30` }}
          animate={{ boxShadow: hov ? `0 0 20px ${project.tagColor}30` : 'none' }}
          transition={{ duration: 0.3 }}
        >
          {project.icon}
        </motion.div>
        <div className="flex flex-col gap-1.5">
          <h3 className="text-base font-bold leading-tight" style={{ color: '#f1f5f9' }}>
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(tag => (
              <span key={tag}
                className="px-2 py-0.5 rounded-md text-xs font-semibold"
                style={{ background: `${project.tagColor}18`, border: `1px solid ${project.tagColor}30`, color: project.tagColor }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-4 flex-grow" style={{ color: '#94a3b8' }}>
        {project.description}
      </p>

      {/* Highlights */}
      <div className="mb-4 space-y-1.5">
        {project.highlights.map(h => (
          <motion.div key={h}
            className="flex items-start gap-2 text-xs"
            style={{ color: '#64748b' }}
            animate={{ x: hov ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight size={12} className="mt-0.5 flex-shrink-0" style={{ color: project.tagColor }} />
            {h}
          </motion.div>
        ))}
      </div>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.stack.map(t => <span key={t} className="tech-badge">{t}</span>)}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-auto">
        {project.github ? (
          <motion.a
            href={project.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}
            whileHover={{ y: -2, borderColor: 'rgba(255,255,255,0.25)', color: '#f1f5f9' }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={15} /> GitHub
          </motion.a>
        ) : (
          <span
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', color: '#334155' }}
          >
            <Lock size={13} /> Private Repo
          </span>
        )}
        {project.demo && (
          <motion.a
            href={project.demo} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ background: `${project.tagColor}18`, border: `1px solid ${project.tagColor}35`, color: project.tagColor }}
            whileHover={{ y: -2, boxShadow: `0 0 16px ${project.tagColor}35` }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink size={15} /> Live Demo
          </motion.a>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = PROJECTS.filter(p => {
    if (activeFilter === 'All')      return true
    if (activeFilter === 'Featured') return p.featured
    return p.tags.some(t => t === activeFilter)
  })

  return (
    <div className="section-pt" style={{ backgroundColor: '#050508' }}>
      <div className="section-wrapper">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="section-label">03 / Projects</p>
          <h2 className="section-title">What I've Built</h2>
          <motion.div
            className="mt-3 h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, transparent)', maxWidth: 120 }}
            initial={{ width: 0 }} whileInView={{ width: 120 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="mt-4 text-sm" style={{ color: '#475569' }}>
            Systems-level projects built from scratch, not tutorials.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center gap-2 mb-10"
        >
          {FILTERS.map(f => (
            <motion.button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-4 py-2 rounded-xl text-sm font-semibold relative overflow-hidden"
              style={{
                background: activeFilter === f ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.03)',
                border: activeFilter === f ? '1px solid rgba(59,130,246,0.45)' : '1px solid rgba(255,255,255,0.07)',
                color: activeFilter === f ? '#93c5fd' : '#64748b',
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeFilter === f && (
                <motion.div
                  layoutId="filter-active"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'rgba(59,130,246,0.08)' }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </motion.button>
          ))}
          <span className="ml-auto text-xs" style={{ color: '#334155' }}>
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
