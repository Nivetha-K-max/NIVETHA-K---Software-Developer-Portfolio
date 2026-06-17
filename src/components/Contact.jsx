import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Send, Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle, Loader, Github, Linkedin } from 'lucide-react'

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const SOCIALS = [
  { icon: Github,   label: 'GitHub',   href: 'https://github.com/Nivetha-K-max',                 color: '#94a3b8' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/nivetha-k-1b4832327/', color: '#0ea5e9' },
  { icon: Mail,     label: 'Email',    href: 'mailto:nivetha.k2024it@sece.ac.in',                color: '#f43f5e' },
  { icon: Phone,    label: 'Phone',    href: 'tel:+919003753632',                                color: '#10b981' },
]

const INFO = [
  { icon: Mail,   label: 'Email',    value: 'nivetha.k2024it@sece.ac.in', href: 'mailto:nivetha.k2024it@sece.ac.in' },
  { icon: Phone,  label: 'Phone',   value: '+91 90037 53632',             href: 'tel:+919003753632' },
  { icon: MapPin, label: 'Location', value: 'Tamil Nadu, India',          href: null },
  { icon: Clock,  label: 'Response', value: 'Within 24 hours',            href: null },
]

export default function Contact() {
  const [form,    setForm]    = useState({ name: '', email: '', message: '' })
  const [status,  setStatus]  = useState('idle')
  const [touched, setTouched] = useState({})
  const [focused, setFocused] = useState(null)

  const validate = () => {
    const e = {}
    if (!form.name.trim())                                    e.name    = 'Name is required'
    if (!form.email.trim())                                   e.email   = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email   = 'Enter a valid email'
    if (!form.message.trim())                                 e.message = 'Message is required'
    else if (form.message.trim().length < 10)                 e.message = 'At least 10 characters'
    return e
  }

  const errors  = validate()
  const isValid = Object.keys(errors).length === 0

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleBlur   = (e) => { setTouched(p => ({ ...p, [e.target.name]: true })); setFocused(null) }
  const handleFocus  = (e) => setFocused(e.target.name)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    if (!isValid) return
    setStatus('sending')
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:  form.name,
        from_email: form.email,
        message:    form.message,
        reply_to:   form.email,
      }, EMAILJS_PUBLIC_KEY)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTouched({})
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 6000)
  }

  const inputStyle = (name) => ({
    background: focused === name ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
    border: touched[name] && errors[name]
      ? '1px solid rgba(244,63,94,0.5)'
      : focused === name
        ? '1px solid rgba(59,130,246,0.6)'
        : '1px solid rgba(255,255,255,0.08)',
    boxShadow: focused === name && !(touched[name] && errors[name])
      ? '0 0 0 3px rgba(59,130,246,0.1), 0 0 20px rgba(59,130,246,0.06)'
      : 'none',
    color: '#f1f5f9',
    outline: 'none',
    transition: 'all 0.2s ease',
    width: '100%',
    padding: '12px 16px',
    borderRadius: 12,
    fontSize: 14,
  })

  return (
    <div className="section-pt pb-28" style={{ backgroundColor: '#050508' }}>
      <div className="section-wrapper">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label">09 / Contact</p>
          <h2 className="section-title">Let's Connect</h2>
          <motion.div
            className="mt-3 h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6,transparent)', maxWidth: 120 }}
            initial={{ width: 0 }} whileInView={{ width: 120 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="mt-4 text-sm max-w-lg" style={{ color: '#475569' }}>
            Have a role, a project, or just want to talk systems? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* Left info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex flex-col gap-7"
          >
            {/* Availability badge */}
            <motion.div
              className="inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl w-fit"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
              animate={{ boxShadow: ['0 0 0px rgba(16,185,129,0)', '0 0 20px rgba(16,185,129,0.15)', '0 0 0px rgba(16,185,129,0)'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              <span className="text-sm font-bold" style={{ color: '#6ee7b7' }}>
                Open to Internship Opportunities
              </span>
            </motion.div>

            <div>
              <h3 className="text-xl font-black mb-2" style={{ color: '#f1f5f9' }}>
                Looking for a software engineering intern?
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
                I'm actively seeking full stack / SDE internship roles.
                Whether it's a quick question, collaboration, or a role —
                I reply within 24 hours.
              </p>
            </div>

            {/* Info cards */}
            <div className="flex flex-col gap-2.5">
              {INFO.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <motion.div
                    whileHover={{ x: 4, borderColor: 'rgba(59,130,246,0.25)' }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: '#94a3b8', transition: 'all 0.2s ease' }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                      <Icon size={14} style={{ color: '#3b82f6' }} />
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: '#334155' }}>{label}</p>
                      <p className="font-semibold text-sm" style={{ color: '#94a3b8' }}>{value}</p>
                    </div>
                  </motion.div>
                )
                return href
                  ? <a key={label} href={href} className="no-underline block">{inner}</a>
                  : <div key={label}>{inner}</div>
              })}
            </div>

            {/* Social icons */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#334155' }}>
                Find me on
              </p>
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ icon: Icon, label, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b' }}
                    whileHover={{ scale: 1.15, y: -4, color, borderColor: `${color}50`, backgroundColor: `${color}10` }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {/* Success overlay */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl gap-5 text-center p-8"
                  style={{ background: 'rgba(13,13,20,0.97)', border: '1px solid rgba(16,185,129,0.25)' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  >
                    <CheckCircle size={64} style={{ color: '#10b981' }} />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-2">Message Sent! 🎉</h3>
                    <p className="text-sm" style={{ color: '#64748b' }}>I'll reply within 24 hours.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="relative flex flex-col gap-5 p-8 rounded-2xl overflow-hidden"
              style={{ background: 'rgba(13,13,20,0.95)', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 8px 48px rgba(0,0,0,0.5)' }}
            >
              {/* Shimmer */}
              <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-30" />

              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, transparent)' }} />

              <h3 className="text-lg font-black relative z-10" style={{ color: '#f1f5f9' }}>
                Send a Message
              </h3>

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide" style={{ color: '#475569' }}>
                    Name <span style={{ color: '#f43f5e' }}>*</span>
                  </label>
                  <input
                    type="text" name="name" value={form.name}
                    onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus}
                    placeholder="Your name" autoComplete="name"
                    style={inputStyle('name')}
                  />
                  <AnimatePresence>
                    {touched.name && errors.name && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="text-xs flex items-center gap-1" style={{ color: '#f87171' }}
                      >
                        <AlertCircle size={11} /> {errors.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide" style={{ color: '#475569' }}>
                    Email <span style={{ color: '#f43f5e' }}>*</span>
                  </label>
                  <input
                    type="email" name="email" value={form.email}
                    onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus}
                    placeholder="your@email.com" autoComplete="email"
                    style={inputStyle('email')}
                  />
                  <AnimatePresence>
                    {touched.email && errors.email && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="text-xs flex items-center gap-1" style={{ color: '#f87171' }}
                      >
                        <AlertCircle size={11} /> {errors.email}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5 relative z-10">
                <label className="text-xs font-bold uppercase tracking-wide" style={{ color: '#475569' }}>
                  Message <span style={{ color: '#f43f5e' }}>*</span>
                </label>
                <textarea
                  name="message" value={form.message} rows={6}
                  onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus}
                  placeholder="Hi Nivetha, I'd love to discuss..."
                  style={{ ...inputStyle('message'), resize: 'none' }}
                />
                <div className="flex items-center justify-between">
                  <AnimatePresence>
                    {touched.message && errors.message && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="text-xs flex items-center gap-1" style={{ color: '#f87171' }}
                      >
                        <AlertCircle size={11} /> {errors.message}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span className="text-xs ml-auto" style={{ color: '#334155' }}>
                    {form.message.length} chars
                  </span>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary flex items-center justify-center gap-2.5 relative z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={status !== 'sending' ? { scale: 1.02, y: -1 } : {}}
                whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
              >
                {status === 'sending' ? (
                  <><Loader size={16} className="animate-spin" /> Sending...</>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </motion.button>

              {/* Error */}
              <AnimatePresence>
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl text-sm font-medium relative z-10"
                    style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5' }}
                  >
                    <AlertCircle size={16} />
                    Something went wrong. Email me at nivetha.k2024it@sece.ac.in
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
