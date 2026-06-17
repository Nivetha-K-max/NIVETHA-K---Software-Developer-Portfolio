import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, X, Award, Calendar, Shield } from 'lucide-react'

// ── Data ─────────────────────────────────────────────────────────────────────
// Sorted latest-first by year: 2026 → 2026 → 2025 → 2025 → 2024
const CERTS = [
  {
    id: 1,
    title: 'Linguaskill Business',
    year: '2026',
    color: '#3b82f6',
    icon: '🎓',
    badge: 'CEFR Certified',
    org: 'Cambridge University Press & Assessment',
    sub:
      'CEFR B1 (Writing: B2)\n' +
      'Listening: B1\n' +
      'Reading: B1\n' +
      'Speaking: B1\n' +
      'Writing: B2\n\n' +
      'Overall CEFR Level: B1',
    credentialUrl: null,
    image: '/src/assets/certifications/linguaskill.png',

  },
  {
    id: 2,
    title: 'Problem Solving Intermediate',
    year: '2026',
    color: '#10b981',
    icon: '⚡',
    badge: 'Verified',
    org: 'HackerRank',
    sub: 'Problem Solving Intermediate',
    credentialUrl: 'https://www.hackerrank.com/',
    image: '/src/assets/certifications/problem-hackerank.png',
  },
  {
    id: 3,
    title: 'SQL Intermediate',
    year: '2026',
    color: '#14b8a6',
    icon: '🗃️',
    badge: 'Verified',
    org: 'HackerRank',
    sub: 'SQL Intermediate',
    credentialUrl: 'https://www.hackerrank.com/',
    image: '/src/assets/certifications/sql-hackerank.png',
  },
  {
    id: 4,
    title: 'Java Spring Boot — The Complete Guide',
    year: '2025',
    color: '#f59e0b',
    icon: '☕',
    badge: 'Completed',
    org: 'Udemy',
    sub: 'Full Course Completion',
    credentialUrl: null,
    image: '/src/assets/certifications/udemy.png',
  },
  {
    id: 5,
    title: 'DBMS Interview Preparation',
    year: '2025',
    color: '#ec4899',
    icon: '🗄️',
    badge: 'Completed',
    org: 'CodeChef',
    sub: 'Interview Preparation Certification',
    credentialUrl: null,
    image: '/src/assets/certifications/codechef.png',
  },
  {
    id: 6,
    title: 'C Programming',
    year: '2024',
    color: '#8b5cf6',
    icon: '🧩',
    badge: 'IIT Certified',
    org: 'IIT Bombay Spoken Tutorial',
    sub: 'C Spoken Tutorial Certification',
    credentialUrl: null,
    image: '/src/assets/certifications/c.png',
  },
  {
    id: 7,
    title: 'C++ Programming',
    year: '2024',
    color: '#7c3aed',
    icon: '💻',
    badge: 'IIT Certified',
    org: 'IIT Bombay Spoken Tutorial',
    sub: 'C++ Spoken Tutorial Certification',
    credentialUrl: null,
    image: '/src/assets/certifications/cpp.png',
  },
]

// ── Certificate Preview Modal ─────────────────────────────────────────────────
function CertModal({ cert, onClose }) {
  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative mx-4 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-900"
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3">
              <div className="flex items-center gap-3">
                <div
                  className="grid h-10 w-10 place-items-center rounded-xl"
                  style={{ backgroundColor: cert.color }}
                >
                  <span className="text-lg">{cert.icon}</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white/90">{cert.title}</div>
                  <div className="text-xs text-white/60">{cert.org}</div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/80 transition hover:bg-white/5 hover:text-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <div className="relative p-4">
              {cert.image ? (
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="max-h-[70vh] w-full rounded-xl object-contain bg-black"
                />
              ) : (
                <div className="flex min-h-[50vh] items-center justify-center rounded-xl border border-dashed border-white/15 bg-black/30 p-6 text-center">
                  <div>
                    <div className="text-sm font-semibold text-white">Image not available</div>
                    <div className="mt-1 text-xs text-white/60">Add a certificate image to src/assets/certifications.</div>
                  </div>
                </div>
              )}

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                  <Calendar size={14} className="text-white/60" />
                  <span>{cert.year}</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                  <Shield size={14} className="text-white/60" />
                  <span>{cert.badge}</span>
                </div>
              </div>

              {cert.credentialUrl ? (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-white/90"
                >
                  <ExternalLink size={16} />
                  View credential
                </a>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Certifications() {
  const [selected, setSelected] = useState(null)

  const grouped = useMemo(() => CERTS, [])

  return (
    <section className="relative py-16" id="certifications">
      <div className="mx-auto w-full max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
              <Award size={18} className="text-white/80" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Certifications</h2>
              <p className="mt-1 text-sm text-white/60">Professional certifications, verified assessments, and course completions.</p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {grouped.map((cert) => (
            <motion.button
              key={cert.id}
              onClick={() => setSelected(cert)}
              whileHover={{ y: -2 }}
              className="group relative text-left"
            >
              <div
                className="h-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 p-5 transition hover:border-white/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <div
                        className="grid h-12 w-12 place-items-center rounded-2xl text-lg ring-1 ring-white/10"
                        style={{ backgroundColor: cert.color }}
                      >
                        <span aria-hidden>{cert.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-base font-semibold text-white/90">{cert.title}</div>
                        <div className="mt-1 text-xs text-white/60">{cert.org}</div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                        {cert.year}
                      </span>
                      <span
                        className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                        style={{ color: cert.color }}
                      >
                        {cert.badge}
                      </span>
                    </div>

                    <p className="mt-3 whitespace-pre-line text-sm text-white/70">{cert.sub}</p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition group-hover:bg-white/10">
                    <ExternalLink size={18} className="text-white/70" />
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <CertModal cert={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

