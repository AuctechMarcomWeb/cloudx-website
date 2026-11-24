import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const COMPANY = 'Auctech Marketing Communication Pvt. Ltd.'
const PRODUCT = 'School CloudX'
const EMAIL   = 'cloudxsupport@gmail.com'
const PHONE   = '+91 9838075493'
const ADDRESS = 'Shaligram Building New, 167/101, Jiamau Rd, 1090 Chauraha, Hazratganj, Lucknow, Uttar Pradesh 226001'
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9001/api/'

/* ─── Styles ─── */
const s = {
  page:        { background: '#f9fafb', minHeight: '100vh', fontFamily: 'Lato, sans-serif' },
  hero:        { background: 'linear-gradient(135deg, #0b2040 0%, #0040a0 100%)', padding: '72px 0 48px', textAlign: 'center' },
  heroTitle:   { fontSize: 36, fontWeight: 800, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.5px' },
  heroSub:     { fontSize: 15, color: 'rgba(255,255,255,0.65)', margin: 0 },
  badge:       { display: 'inline-block', background: 'rgba(77,159,255,0.18)', border: '1px solid rgba(77,159,255,0.35)', color: '#4d9fff', borderRadius: 20, padding: '5px 16px', fontSize: 12.5, fontWeight: 600, letterSpacing: '0.4px', marginBottom: 18 },
  wrap:        { maxWidth: 980, margin: '0 auto', padding: '0 24px' },
  wrapNarrow:  { maxWidth: 820, margin: '0 auto', padding: '0 24px' },
  section:     { margin: '56px 0' },
  sectionHead: { fontSize: 24, fontWeight: 800, color: '#0b2040', margin: '0 0 6px', letterSpacing: '-0.3px' },
  sectionSub:  { fontSize: 15, color: '#6b7280', margin: '0 0 28px' },
  card:        { background: '#fff', borderRadius: 16, boxShadow: '0 2px 20px rgba(0,0,0,0.07)', padding: '36px 40px' },
  h2:          { fontSize: 18, fontWeight: 800, color: '#0b2040', margin: '0 0 8px' },
  p:           { fontSize: 15, lineHeight: 1.85, color: '#374151', margin: '0 0 12px' },
  divider:     { border: 'none', borderTop: '1px solid #e5e7eb', margin: '32px 0' },
  highlight:   { background: 'rgba(77,159,255,0.07)', border: '1px solid rgba(77,159,255,0.2)', borderRadius: 10, padding: '14px 18px', margin: '14px 0' },
}

/* ─── Contact Channel Cards ─── */
const channels = [
  {
    icon: '📧',
    title: 'Email Support',
    desc: 'Send us a detailed message and we\'ll respond within 24 hours on business days.',
    value: EMAIL,
    action: `mailto:${EMAIL}`,
    label: 'Send Email',
    color: '#0040a0',
  },
  {
    icon: '📞',
    title: 'Phone Support',
    desc: 'Speak directly with our support team. Available Mon–Sat, 10 AM – 6 PM IST.',
    value: PHONE,
    action: `tel:${PHONE}`,
    label: 'Call Now',
    color: '#16a34a',
  },
  {
    icon: '💬',
    title: 'WhatsApp',
    desc: 'Chat with us on WhatsApp for quick help and screenshots.',
    value: PHONE,
    action: `https://wa.me/919838075493`,
    label: 'Open WhatsApp',
    color: '#16a34a',
    external: true,
  },
  {
    icon: '📍',
    title: 'Office Address',
    desc: 'Visit or write to us at our registered office.',
    value: ADDRESS,
    action: `https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`,
    label: 'View on Map',
    color: '#7c3aed',
    external: true,
  },
]

/* ─── FAQ data ─── */
const faqs = [
  {
    q: 'How do I register my school on School CloudX?',
    a: 'Click "Start Free Trial" on the homepage, fill in your school details, verify your phone number, and choose a plan. Your school portal will be ready in minutes.',
  },
  {
    q: 'Is there a free trial? Do I need a credit card?',
    a: 'Yes — we offer a 30-day free trial with full access to all features. No credit card is required to start the trial.',
  },
  {
    q: 'How do I add students and teachers?',
    a: 'Log in to your school portal → go to Student Management or Teacher Management → click "Add New" and fill in the required details. You can also import in bulk using an Excel/CSV file.',
  },
  {
    q: 'I forgot my password. How do I reset it?',
    a: 'On the login page, click "Forgot Password", enter your registered email or phone number, and you will receive an OTP to set a new password.',
  },
  {
    q: 'How does the Parent App work?',
    a: 'Parents download the School CloudX app from Google Play or the App Store, log in with the credentials provided by the school, and can then view their child\'s attendance, marks, homework, notices, and fee receipts.',
  },
  {
    q: 'Can I collect fees online through the platform?',
    a: 'Yes. School CloudX includes an integrated fee management module. Schools can create fee structures, generate challans, accept online payments, and issue receipts — all from the portal.',
  },
  {
    q: 'How do I download mark sheets or reports?',
    a: 'Go to Examination Management → select the exam → click "Generate Marksheet". Reports can be downloaded as PDFs for individual students or the entire class.',
  },
  {
    q: 'What happens to my data if I cancel?',
    a: 'Your data is retained for 30 days after cancellation, giving you time to export records. After 30 days, all data is permanently deleted. Financial records are retained for 7 years as required by law.',
  },
  {
    q: 'How do I delete my account?',
    a: 'You can request account deletion from within the app (Settings → Delete Account) or via our Account Deletion page. We will process the request within 7 business days.',
  },
  {
    q: 'Is my school\'s data secure?',
    a: 'Yes. All data is encrypted in transit (TLS/SSL) and at rest. We use role-based access control so users only see data they are authorised to access. Our servers are hosted on secure cloud infrastructure in India.',
  },
]

/* ─── Support Ticket Form ─── */
function SupportForm() {
  const [form,    setForm]    = useState({ name: '', email: '', school: '', category: 'general', subject: '', message: '' })
  const [sent,    setSent]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const field = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const inputStyle = {
    width: '100%', height: 44, padding: '0 14px', borderRadius: 10,
    border: '1.5px solid #d1d5db', background: '#fff', fontSize: 14,
    fontFamily: 'Lato, sans-serif', color: '#111827', outline: 'none',
    boxSizing: 'border-box', transition: 'border-color 0.2s',
  }
  const labelStyle = { fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }
  const focus = e => e.target.style.borderColor = '#0040a0'
  const blur  = e => e.target.style.borderColor = '#d1d5db'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}support-ticket`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('failed')
      setSent(true)
    } catch {
      /* Fallback to email */
      const subject = encodeURIComponent(`[Support] ${form.subject || form.category} – ${form.school || form.name}`)
      const body    = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nSchool: ${form.school}\nCategory: ${form.category}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`
      )
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <div style={{ fontSize: 52, marginBottom: 14 }}>✅</div>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0b2040', margin: '0 0 8px' }}>Ticket Submitted!</h3>
        <p style={{ fontSize: 15, color: '#6b7280', maxWidth: 400, margin: '0 auto' }}>
          Our support team will get back to you at <strong>{form.email}</strong> within <strong>24 hours</strong> on business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <label style={labelStyle}>Your Full Name *</label>
          <input style={inputStyle} required value={form.name} onChange={e => field('name', e.target.value)} placeholder="Ramesh Kumar" onFocus={focus} onBlur={blur} />
        </div>
        <div>
          <label style={labelStyle}>Email Address *</label>
          <input style={inputStyle} type="email" required value={form.email} onChange={e => field('email', e.target.value)} placeholder="your@email.com" onFocus={focus} onBlur={blur} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <label style={labelStyle}>School Name</label>
          <input style={inputStyle} value={form.school} onChange={e => field('school', e.target.value)} placeholder="Name of your school" onFocus={focus} onBlur={blur} />
        </div>
        <div>
          <label style={labelStyle}>Issue Category *</label>
          <select style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }} required value={form.category} onChange={e => field('category', e.target.value)}>
            <option value="general">General Enquiry</option>
            <option value="login">Login / Access Issue</option>
            <option value="student">Student Management</option>
            <option value="fees">Fee Management</option>
            <option value="attendance">Attendance</option>
            <option value="exam">Exam / Marks</option>
            <option value="app">Mobile App</option>
            <option value="billing">Billing / Subscription</option>
            <option value="deletion">Account Deletion</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle}>Subject *</label>
        <input style={inputStyle} required value={form.subject} onChange={e => field('subject', e.target.value)} placeholder="Brief description of your issue" onFocus={focus} onBlur={blur} />
      </div>

      <div>
        <label style={labelStyle}>Message *</label>
        <textarea
          style={{ ...inputStyle, height: 130, padding: '10px 14px', resize: 'vertical', lineHeight: 1.7 }}
          required value={form.message} onChange={e => field('message', e.target.value)}
          placeholder="Describe your issue in detail — include any error messages, steps you've tried, and screenshots if possible."
          onFocus={focus} onBlur={blur}
        />
      </div>

      {error && <p style={{ fontSize: 13, color: '#dc2626', margin: 0 }}>{error}</p>}

      <button type="submit" disabled={loading} style={{
        height: 48, borderRadius: 10, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
        background: loading ? '#9ca3af' : 'linear-gradient(135deg, #0040a0, #0ea5e9)',
        color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: 'Lato, sans-serif',
        boxShadow: '0 4px 16px rgba(0,64,160,0.25)', transition: 'all 0.2s',
        opacity: loading ? 0.7 : 1,
      }}>
        {loading ? 'Submitting…' : '📩 Submit Support Ticket'}
      </button>
    </form>
  )
}

/* ─── FAQ Accordion ─── */
function FAQ({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      borderRadius: 12, border: `1.5px solid ${open ? 'rgba(77,159,255,0.35)' : '#e5e7eb'}`,
      background: open ? 'rgba(240,246,255,0.6)' : '#fff',
      overflow: 'hidden', transition: 'all 0.2s',
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left', gap: 12,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 700, color: '#0b2040', lineHeight: 1.5, fontFamily: 'Lato, sans-serif' }}>{q}</span>
        <span style={{
          fontSize: 18, color: '#4d9fff', flexShrink: 0, transition: 'transform 0.2s',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          display: 'inline-block',
        }}>+</span>
      </button>
      {open && (
        <div style={{ padding: '0 20px 18px', fontSize: 14.5, lineHeight: 1.8, color: '#374151' }}>
          {a}
        </div>
      )}
    </div>
  )
}

/* ─── Main Page ─── */
export default function HelpSupportPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={s.page}>
      <Navbar />

      {/* Hero */}
      <div style={s.hero}>
        <div style={s.wrap}>
          <div style={s.badge}>Support</div>
          <h1 style={s.heroTitle}>Help &amp; Support</h1>
          <p style={s.heroSub}>We're here to help — find answers, raise a ticket, or reach us directly.</p>
        </div>
      </div>

      <div style={s.wrap}>

        {/* ── Contact Channels ── */}
        <div style={s.section}>
          <h2 style={s.sectionHead}>Contact Us</h2>
          <p style={s.sectionSub}>Choose the most convenient way to reach our support team.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {channels.map(({ icon, title, desc, value, action, label, color, external }) => (
              <div key={title} style={{
                background: '#fff', borderRadius: 16, padding: '28px 24px',
                boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                border: '1px solid #e5e7eb',
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <div style={{ fontSize: 32 }}>{icon}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#0b2040' }}>{title}</div>
                <p style={{ fontSize: 13.5, color: '#6b7280', lineHeight: 1.7, margin: 0, flex: 1 }}>{desc}</p>
                <div style={{ fontSize: 13, color: '#374151', fontWeight: 600, wordBreak: 'break-word' }}>{value}</div>
                <a
                  href={action}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'inline-block', marginTop: 4, padding: '9px 18px',
                    borderRadius: 8, background: color, color: '#fff',
                    fontSize: 13.5, fontWeight: 700, textDecoration: 'none',
                    textAlign: 'center',
                  }}
                >
                  {label} →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ── Support Hours ── */}
        <div style={{ ...s.card, margin: '0 0 56px', display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center' }}>
          <div style={{ flex: '1 1 260px' }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0b2040', margin: '0 0 8px' }}>⏰ Support Hours</h3>
            <p style={{ fontSize: 14, color: '#6b7280', margin: 0, lineHeight: 1.7 }}>
              Our team is available to assist you during the following hours.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, flex: '2 1 320px' }}>
            {[
              { day: 'Monday – Friday',  time: '9:00 AM – 7:00 PM IST',  status: 'active' },
              { day: 'Saturday',         time: '10:00 AM – 4:00 PM IST', status: 'active' },
              { day: 'Sunday',           time: 'Closed',                  status: 'closed' },
              { day: 'Public Holidays',  time: 'Email only',              status: 'limited' },
            ].map(({ day, time, status }) => (
              <div key={day} style={{
                background: '#f9fafb', borderRadius: 10, padding: '12px 18px',
                border: '1px solid #e5e7eb', minWidth: 160,
              }}>
                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>{day}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: status === 'closed' ? '#dc2626' : '#0b2040' }}>{time}</div>
                <div style={{
                  display: 'inline-block', marginTop: 6, padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                  background: status === 'active' ? 'rgba(34,197,94,0.1)' : status === 'closed' ? 'rgba(239,68,68,0.1)' : 'rgba(251,191,36,0.1)',
                  color: status === 'active' ? '#16a34a' : status === 'closed' ? '#dc2626' : '#b45309',
                }}>
                  {status === 'active' ? 'Available' : status === 'closed' ? 'Closed' : 'Limited'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div style={s.section}>
          <h2 style={s.sectionHead}>Frequently Asked Questions</h2>
          <p style={s.sectionSub}>Quick answers to the most common questions about School CloudX.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {faqs.map(({ q, a }) => <FAQ key={q} q={q} a={a} />)}
          </div>
        </div>

        {/* ── Ticket Form ── */}
        <div style={{ ...s.section, maxWidth: 820, margin: '0 auto 56px' }}>
          <h2 style={s.sectionHead}>Submit a Support Ticket</h2>
          <p style={s.sectionSub}>Can't find an answer? Fill in the form and we'll get back to you within 24 hours.</p>
          <div style={s.card}>
            <SupportForm />
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div style={{ ...s.card, margin: '0 0 64px', background: '#0b2040' }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: '0 0 20px' }}>📚 Helpful Resources</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {[
              { label: '🔒 Privacy Policy',         href: '/privacy-policy' },
              { label: '📄 Terms & Conditions',     href: '/terms' },
              { label: '💳 Refund & Cancellation',  href: '/refund-policy' },
              { label: '🗑️ Account Deletion',       href: '/account-deletion' },
            ].map(({ label, href }) => (
              <a key={label} href={href} style={{
                display: 'inline-block', padding: '9px 18px', borderRadius: 8,
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(77,159,255,0.2)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}
