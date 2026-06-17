import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Star, Lock } from 'lucide-react'

// TODO: Replace each project's github value with the specific repo URL once available
const PROJECTS = [
  {
    title:       'Redis Clone — Key-Value Store',
    tags:        ['Featured', 'Systems'],
    tagColor:    '#3b82f6',
    icon:        '🗄️',
    description: 'Production-grade in-memory key-value store built from scratch implementing the RESP protocol, LRU eviction with O(1) ops, TTL lazy+active expiry, AOF persistence with configurable fsync, Java NIO non-blocking event loop, and master-replica async replication — mirroring real Redis architecture.',
    highlights:  [
      'RESP protocol — full GET/SET/DEL/EXPIRE/TTL',
      'LRU eviction: doubly-linked list + hashmap O(1)',
      'AOF persistence — < 1s data loss on crash',
      'Master-replica replication with failover',
    ],
    stack:    ['Java', 'TCP Sockets', 'NIO', 'AOF', 'Docker', 'LRU'],
    github:   null,
    demo:     null,
    featured: true,
  },
  {
    title:       'NanoPay Pro — Payment Platform',
    tags:        ['Featured', 'Fintech'],
    tagColor:    '#8b5cf6',
    icon:        '💳',
    description: 'Production-grade payment platform with multi-role JWT + OAuth2 auth, wallet engine with pessimistic locking for concurrency safety, Kafka event streaming, fraud detection rules engine, real-time WebSocket notifications, and a full observability stack with Prometheus + Grafana.',
    highlights:  [
      'Pessimistic locking — zero double-spend',
      'Kafka event streaming for async flows',
      'Real-time WebSocket balance updates',
      'Prometheus + Grafana observability',
    ],
    stack:    ['Java', 'Spring Boot', 'Kafka', 'Redis', 'MySQL', 'React.js', 'Docker', 'Prometheus'],
    github:   null,
    demo:     null,
    featured: true,
  },
  {
    title:       'Distributed Message Queue',
    tags:        ['Systems', 'Kafka-Inspired'],
    tagColor:    '#f59e0b',
    icon:        '📡',
    description: 'Kafka-inspired pub-sub message queue built from scratch supporting topics, partitions, producer publishing, and consumer group offset tracking. Java NIO non-blocking TCP server benchmarked at 100,000+ messages/sec. Leader election for fault tolerance with async replication and Docker multi-broker simulation.',
    highlights:  [
      '100,000+ messages/sec via Java NIO',
      'Consumer group offset persistence on disk',
      'Leader election + async replication',
      'Docker multi-broker failover testing',
    ],
    stack:    ['Java', 'TCP Sockets', 'NIO', 'Docker', 'Replication'],
    github:   null,
    demo:     null,
    featured: false,
  },
  {
    title:       'Mini Search Engine',
    tags:        ['Systems', 'Information Retrieval'],
    tagColor:    '#ec4899',
    icon:        '🔍',
    description: 'BFS web crawler with robots.txt compliance indexing 50,000+ pages into an on-disk inverted index. TF-IDF + iterative PageRank ranking, boolean query parser (AND/OR/NOT) with phrase matching served via REST API under 100ms latency. Index compression reduced on-disk size by 60%.',
    highlights:  [
      '50,000+ pages indexed with BFS crawler',
      'TF-IDF + PageRank ranking pipeline',
      'AND/OR/NOT boolean query parser',
      '60% index size reduction via compression',
    ],
    stack:    ['Java', 'Inverted Index', 'TF-IDF', 'PageRank', 'REST API'],
    github:   null,
    demo:     null,
    featured: false,
  },
  {
    title:       'URL Shortener — Distributed',
    tags:        ['Full Stack', 'Distributed'],
    tagColor:    '#06b6d4',
    icon:        '🔗',
    description: 'Distributed URL shortening system with SHA-256 hashing and collision detection, Redis caching achieving 87% latency reduction on redirections, rate limiting per IP, and a real-time analytics dashboard tracking click-through rates and geographic distribution.',
    highlights:  [
      '87% latency reduction via Redis caching',
      'SHA-256 hashing + collision handling',
      'Rate limiting per IP with sliding window',
      'Analytics dashboard with live metrics',
    ],
    stack:    ['Node.js', 'React.js', 'MongoDB', 'Redis', 'Express.js'],
    github:   null,
    demo:     null,
    featured: false,
  },
  {
    title:       'E-Commerce Platform',
    tags:        ['Full Stack', 'MERN'],
    tagColor:    '#10b981',
    icon:        '🛒',
    description: 'Full-stack e-commerce application with JWT authentication, product management, cart and order workflows, MongoDB schema optimization achieving 40% faster queries, and an admin dashboard for inventory control with role-based access.',
    highlights:  [
      '40% faster queries via schema optimization',
      'JWT auth with role-based access control',
      'Admin dashboard for inventory + orders',
      'Optimized MongoDB aggregation pipelines',
    ],
    stack:    ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    github:   null,
    demo:     null,
    featured: false,
  },
]

const FILTERS = ['All', 'Featured', 'Systems', 'Full Stack']

const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } }),
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = PROJECTS.filter(p => {
    if (activeFilter === 'All')      return true
    if (activeFilter === 'Featured') return p.featured
    return p.tags.some(t => t === activeFilter)
  })

  return (
    <div className="section-pt" style={{ backgroundColor: '#0a0a0f' }}>
      <div className="section-wrapper">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#3b82f6' }}>
            03 / Projects
          </p>
          <h2 className="section-title">What I've Built</h2>
          <div className="mt-2 w-16 h-1 rounded-full" style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }} />
          <p className="mt-4 text-sm" style={{ color: '#475569' }}>
            Systems-level projects built from scratch, not tutorials.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background:   activeFilter === f ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.03)',
                border:       activeFilter === f ? '1px solid rgba(59,130,246,0.4)' : '1px solid rgba(255,255,255,0.07)',
                color:        activeFilter === f ? '#93c5fd' : '#64748b',
                transform:    activeFilter === f ? 'translateY(-1px)' : 'none',
              }}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto self-center text-xs" style={{ color: '#334155' }}>
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </motion.div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                variants={cardVariants}
                custom={i}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -6 }}
                className="relative flex flex-col p-6 rounded-2xl group cursor-default"
                style={{
                  background:  'rgba(18,18,26,0.9)',
                  border:      '1px solid rgba(255,255,255,0.07)',
                  boxShadow:   '0 4px 24px rgba(0,0,0,0.4)',
                  transition:  'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${project.tagColor}45`
                  e.currentTarget.style.boxShadow   = `0 12px 48px rgba(0,0,0,0.55), 0 0 28px ${project.tagColor}18`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.boxShadow   = '0 4px 24px rgba(0,0,0,0.4)'
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, ${project.tagColor}, transparent)` }}
                />

                {/* Featured star */}
                {project.featured && (
                  <div
                    className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }}
                  >
                    <Star size={10} fill="currentColor" />
                    Featured
                  </div>
                )}

                {/* Top row */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `${project.tagColor}15`, border: `1px solid ${project.tagColor}30` }}
                  >
                    {project.icon}
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0 pr-16">
                    <h3 className="text-base font-bold leading-tight" style={{ color: '#f1f5f9' }}>
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-xs font-medium"
                          style={{ background: `${project.tagColor}18`, border: `1px solid ${project.tagColor}30`, color: project.tagColor }}
                        >
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
                <div className="mb-5 grid grid-cols-1 gap-1.5">
                  {project.highlights.map(h => (
                    <div key={h} className="flex items-start gap-2 text-xs" style={{ color: '#64748b' }}>
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.tagColor }} />
                      {h}
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map(t => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 mt-auto">
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}
                    >
                      <Github size={15} />
                      GitHub
                    </a>
                  ) : (
                    <span
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', color: '#334155' }}
                    >
                      <Lock size={13} />
                      Private Repo
                    </span>
                  )}

                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                      style={{ background: `${project.tagColor}18`, border: `1px solid ${project.tagColor}35`, color: project.tagColor }}
                    >
                      <ExternalLink size={15} />
                      Live Demo
                    </a>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
