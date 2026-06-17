import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Send, Github, Linkedin, Mail, Phone, CheckCircle, AlertCircle, Loader, MapPin, Clock } from 'lucide-react'

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const SOCIALS = [
  { icon: Github,   label: 'GitHub',   href: 'https://github.com/Nivetha-K-max',                 color: '#94a3b8' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/nivetha-k-1b4832327/', color: '#0ea5e9' },
  { icon: Mail,     label: 'Email',    href: 'mailto:nivetha.k2024it@sece.ac.in',                color: '#f43f5e' },
  { icon: Phone,    label: 'Phone',    href: 'tel:+919003753632',                                color: '#10b981' },
]

const INFO_ITEMS = [
  { icon: Mail,    label: 'Email',    value: 'nivetha.k2024it@sece.ac.in', href: 'mailto:nivetha.k2024it@sece.ac.in' },
  { icon: Phone,   label: 'Phone',   value: '+91 90037 53632',             href: 'tel:+919003753632' },
  { icon: MapPin,  label: 'Location', value: 'Tamil Nadu, India',          href: null },
  { icon: Clock,   label: 'Response', value: 'Within 24 hours',            href: null },
]

export default function Contact() {
  const [form,    setForm]    = useState({ name: '', email: '', message: '' })
  const [status,  setStatus]  = useState('idle')
  const [touched, setTouched] = useState({})
  const [focused, setFocused] = useState(null)

  const validate = () => {
    const errs = {}
    if (!form.name.trim())                                          errs.name    = 'Name is required'
    if (!form.email.trim())                                         errs.email   = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))       errs.email   = 'Enter a valid email'
    if (!form.message.trim())                                       errs.message = 'Message is required'
    else if (form.message.trim().length < 10)                       errs.message = 'At least 10 characters'
    return errs
  }

  const errors  = validate()
  const isValid = Object.keys(errors).length === 0

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const handleBlur   = (e) => { setTouched(prev => ({ ...prev, [e.target.name]: true })); setFocused(null) }
  const handleFocus  = (e) => setFocused(e.target.name)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    if (!isValid) return
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    form.name,
          from_email:   form.email,
          message:      form.message,
          reply_to:     form.email,
        },
        EMAILJS_PUBLIC_KEY,
      )
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTouched({})
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 5000)
  }

  const fieldBorder = (name) => {
    if (touched[name] && errors[name]) return '1px solid rgba(244,63,94,0.5)'
    if (focused === name)              return '1px solid rgba(59,130,246,0.6)'
    return '1px solid rgba(255,255,255,0.07)'
  }

  const fieldShadow = (name) => {
    if (touched[name] && errors[name]) return '0 0 0 3px rgba(244,63,94,0.08)'
    if (focused === name)              return '0 0 0 3px rgba(59,130,246,0.1)'
    return 'none'
  }

  const fieldStyle = (name) => ({
    background: focused === name ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
    border: fieldBorder(name),
    boxShadow: fieldShadow(name),
    color: '#f1f5f9',
    outline: 'none',
    transition: 'all 0.2s ease',
  })

  return (
    <div className="section-pt pb-24" style={{ backgroundColor: '#0a0a0f' }}>
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
            08 / Contact
          </p>
          <h2 className="section-title">Let's Connect</h2>
          <div className="mt-2 w-16 h-1 rounded-full" style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }} />
          <p className="mt-4 text-sm max-w-lg" style={{ color: '#475569' }}>
            Have a role, a project, or just want to talk systems? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* Left — info (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-7"
          >
            {/* Availability badge */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl w-fit"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              <span className="text-sm font-semibold" style={{ color: '#6ee7b7' }}>
                Open to Internship Opportunities
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#f1f5f9' }}>
                Looking for a software engineering intern?
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
                I'm actively seeking full stack / software engineering internship roles.
                Whether it's a quick question, a collaboration, or a role at your company —
                I usually respond within 24 hours.
              </p>
            </div>

            {/* Contact info cards */}
            <div className="flex flex-col gap-2.5">
              {INFO_ITEMS.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      color: '#94a3b8',
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}
                    >
                      <Icon size={14} style={{ color: '#3b82f6' }} />
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: '#334155' }}>{label}</p>
                      <p className="font-medium text-sm" style={{ color: '#94a3b8' }}>{value}</p>
                    </div>
                  </div>
                )
                return href ? (
                  <a key={label} href={href} className="no-underline hover:-translate-y-0.5 transition-transform duration-200 block">
                    {inner}
                  </a>
                ) : (
                  <div key={label}>{inner}</div>
                )
              })}
            </div>

            {/* Social row */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#334155' }}>
                Find me on
              </p>
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ icon: Icon, label, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.12, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#64748b',
                    }}
                    aria-label={label}
                    onMouseEnter={e => { e.currentTarget.style.color = color; e.currentTarget.style.borderColor = `${color}50`; e.currentTarget.style.background = `${color}10` }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5 p-8 rounded-2xl"
              style={{
                background: 'rgba(18,18,26,0.95)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
              }}
            >
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#475569' }}>
                    Name <span style={{ color: '#f43f5e' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    placeholder="Your name"
                    autoComplete="name"
                    className="px-4 py-3 rounded-xl text-sm w-full"
                    style={fieldStyle('name')}
                  />
                  <AnimatePresence>
                    {touched.name && errors.name && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="text-xs flex items-center gap-1"
                        style={{ color: '#f87171' }}
                      >
                        <AlertCircle size={11} /> {errors.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#475569' }}>
                    Email <span style={{ color: '#f43f5e' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    placeholder="your@email.com"
                    autoComplete="email"
                    className="px-4 py-3 rounded-xl text-sm w-full"
                    style={fieldStyle('email')}
                  />
                  <AnimatePresence>
                    {touched.email && errors.email && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="text-xs flex items-center gap-1"
                        style={{ color: '#f87171' }}
                      >
                        <AlertCircle size={11} /> {errors.email}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#475569' }}>
                  Message <span style={{ color: '#f43f5e' }}>*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  placeholder="Hi Nivetha, I'd love to discuss..."
                  rows={6}
                  className="px-4 py-3 rounded-xl text-sm w-full resize-none"
                  style={fieldStyle('message')}
                />
                <div className="flex items-center justify-between">
                  <AnimatePresence>
                    {touched.message && errors.message && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="text-xs flex items-center gap-1"
                        style={{ color: '#f87171' }}
                      >
                        <AlertCircle size={11} /> {errors.message}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span className="text-xs ml-auto" style={{ color: form.message.length > 0 ? '#475569' : '#334155' }}>
                    {form.message.length} chars
                  </span>
                </div>
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={status !== 'sending' ? { scale: 1.02, y: -1 } : {}}
                whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                className="btn-primary flex items-center justify-center gap-2 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ fontSize: '0.95rem' }}
              >
                {status === 'sending' ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Status messages */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl text-sm font-medium"
                    style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', color: '#6ee7b7' }}
                  >
                    <CheckCircle size={16} />
                    Message sent! I'll reply within 24 hours. 🎉
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl text-sm font-medium"
                    style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5' }}
                  >
                    <AlertCircle size={16} />
                    Something went wrong. Email me directly at nivetha.k2024it@sece.ac.in
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
