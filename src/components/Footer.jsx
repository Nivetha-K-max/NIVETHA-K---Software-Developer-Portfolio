import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home',         id: 'home' },
  { label: 'About',        id: 'about' },
  { label: 'Skills',       id: 'skills' },
  { label: 'Projects',     id: 'projects' },
  { label: 'Achievements', id: 'achievements' },
  { label: 'Experience',   id: 'experience' },
  { label: 'Profiles',     id: 'coding' },
  { label: 'Contact',      id: 'contact' },
]

const SOCIALS = [
  { icon: Github,   href: 'https://github.com/Nivetha-K-max',                 label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/nivetha-k-1b4832327/', label: 'LinkedIn' },
  { icon: Mail,     href: 'mailto:nivetha.k2024it@sece.ac.in',                label: 'Email' },
]

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const scrollTo  = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer
      className="relative pt-16 pb-10"
      style={{
        borderTop:  '1px solid rgba(255,255,255,0.05)',
        background: 'linear-gradient(180deg, rgba(10,10,15,0) 0%, rgba(10,10,15,1) 100%)',
      }}
    >
      <div className="section-wrapper">
        <div className="flex flex-col items-center gap-8">

          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.08, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollTop}
            className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-black text-white"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 0 24px rgba(59,130,246,0.35)' }}
            aria-label="Scroll to top"
          >
            NK
          </motion.button>

          {/* Tagline */}
          <p className="text-sm italic text-center" style={{ color: '#334155', maxWidth: '340px' }}>
            "I don't just use distributed systems — I build them from scratch"
          </p>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label="Footer navigation">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-xs font-medium transition-colors duration-200 hover:text-slate-300"
                style={{ color: '#475569' }}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={label}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#475569' }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-2 text-xs" style={{ color: '#334155' }}>
            <p>© {new Date().getFullYear()} Nivetha K · All rights reserved.</p>
            <p className="flex items-center gap-1">
              Built with <Heart size={11} fill="currentColor" style={{ color: '#f43f5e' }} /> using React · Tailwind · Framer Motion
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to top FAB */}
      <motion.button
        onClick={scrollTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-10 right-6 sm:right-10 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', color: '#3b82f6' }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={16} />
      </motion.button>
    </footer>
  )
}
