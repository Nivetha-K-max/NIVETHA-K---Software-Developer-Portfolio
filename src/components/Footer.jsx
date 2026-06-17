import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react'

const NAV = [
  { label: 'Home',         id: 'home' },
  { label: 'About',        id: 'about' },
  { label: 'Skills',       id: 'skills' },
  { label: 'Projects',     id: 'projects' },
  { label: 'Achievements', id: 'achievements' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Experience',   id: 'experience' },
  { label: 'Profiles',     id: 'coding' },
  { label: 'Contact',      id: 'contact' },
]

const SOCIALS = [
  { icon: Github,   href: 'https://github.com/Nivetha-K-max',                 label: 'GitHub',   color: '#94a3b8' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/nivetha-k-1b4832327/', label: 'LinkedIn', color: '#0ea5e9' },
  { icon: Mail,     href: 'mailto:nivetha.k2024it@sece.ac.in',                label: 'Email',    color: '#f43f5e' },
]

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const scrollTo  = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="relative pt-20 pb-10 overflow-hidden"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'linear-gradient(180deg, transparent 0%, rgba(5,5,8,1) 100%)' }}>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.06), transparent)', filter: 'blur(40px)' }} />
      </div>

      <div className="section-wrapper relative z-10">
        <div className="flex flex-col items-center gap-8">

          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 4, boxShadow: '0 0 32px rgba(59,130,246,0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollTop}
            className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black text-white"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 0 20px rgba(59,130,246,0.3)' }}
            aria-label="Back to top"
          >
            NK
          </motion.button>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm italic text-center max-w-sm"
            style={{ color: '#334155' }}
          >
            "I don't just use distributed systems — I build them from scratch"
          </motion.p>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label="Footer navigation">
            {NAV.map(({ label, id }) => (
              <motion.button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-xs font-medium transition-colors duration-200"
                style={{ color: '#334155' }}
                whileHover={{ color: '#94a3b8', y: -1 }}
              >
                {label}
              </motion.button>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#475569' }}
                whileHover={{ scale: 1.15, y: -3, color, borderColor: `${color}50`, backgroundColor: `${color}10` }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-2 text-xs" style={{ color: '#334155' }}>
            <p>© {new Date().getFullYear()} Nivetha K · All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              Built with <Heart size={11} fill="currentColor" style={{ color: '#f43f5e' }} /> using React · Tailwind · Framer Motion
            </p>
          </div>
        </div>
      </div>

      {/* Scroll-to-top FAB */}
      <motion.button
        onClick={scrollTop}
        whileHover={{ scale: 1.12, boxShadow: '0 0 24px rgba(59,130,246,0.4)' }}
        whileTap={{ scale: 0.92 }}
        className="absolute bottom-10 right-6 sm:right-10 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', color: '#3b82f6' }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={16} />
      </motion.button>
    </footer>
  )
}
