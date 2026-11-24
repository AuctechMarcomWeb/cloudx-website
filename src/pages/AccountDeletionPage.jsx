import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const COMPANY   = 'Auctech Marketing Communication Pvt. Ltd.'
const PRODUCT   = 'School CloudX'
const EMAIL     = 'cloudxsupport@gmail.com'
const PHONE     = '+91 9838075493'
const APP_NAME  = 'School CloudX'

const s = {
  page:        { background: '#f9fafb', minHeight: '100vh', fontFamily: 'Lato, sans-serif' },
  hero:        { background: 'linear-gradient(135deg, #0b2040 0%, #0040a0 100%)', padding: '72px 0 48px', textAlign: 'center' },
  heroTitle:   { fontSize: 36, fontWeight: 800, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.5px' },
  heroSub:     { fontSize: 15, color: 'rgba(255,255,255,0.6)', margin: 0 },
  badge:       { display: 'inline-block', background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', color: '#fca5a5', borderRadius: 20, padding: '5px 16px', fontSize: 12.5, fontWeight: 600, letterSpacing: '0.4px', marginBottom: 18 },
  wrap:        { maxWidth: 820, margin: '0 auto', padding: '0 24px' },
  card:        { background: '#fff', borderRadius: 16, boxShadow: '0 2px 20px rgba(0,0,0,0.07)', padding: '48px 52px', margin: '48px 0' },
  h2:          { fontSize: 20, fontWeight: 800, color: '#0b2040', margin: '36px 0 10px', letterSpacing: '-0.2px' },
  h2first:     { fontSize: 20, fontWeight: 800, color: '#0b2040', margin: '0 0 10px', letterSpacing: '-0.2px' },
  p:           { fontSize: 15, lineHeight: 1.85, color: '#374151', margin: '0 0 14px' },
  ul:          { margin: '8px 0 14px', paddingLeft: 22 },
  li:          { fontSize: 15, lineHeight: 1.85, color: '#374151', marginBottom: 6 },
  divider:     { border: 'none', borderTop: '1px solid #e5e7eb', margin: '28px 0' },
  redBox:      { background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '16px 20px', margin: '14px 0' },
  warnBox:     { background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: 10, padding: '14px 18px', margin: '14px 0' },
  highlight:   { background: 'rgba(77,159,255,0.08)', border: '1px solid rgba(77,159,255,0.2)', borderRadius: 10, padding: '14px 18px', margin: '14px 0' },
  stepWrap:    { display: 'flex', flexDirection: 'column', gap: 16, margin: '14px 0' },
  step:        { display: 'flex', gap: 16, alignItems: 'flex-start' },
  stepNum:     { width: 32, height: 32, borderRadius: '50%', background: '#0040a0', color: '#fff', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 },
  stepText:    { flex: 1 },
  stepTitle:   { fontSize: 15, fontWeight: 700, color: '#0b2040', marginBottom: 4 },
  stepDesc:    { fontSize: 14, color: '#6b7280', lineHeight: 1.7, margin: 0 },
  dataTable:   { width: '100%', borderCollapse: 'collapse', margin: '14px 0', fontSize: 14 },
  th:          { background: '#0b2040', color: '#fff', padding: '10px 14px', textAlign: 'left', fontSize: 13 },
  td:          { padding: '10px 14px', borderBottom: '1px solid #e5e7eb', color: '#374151', verticalAlign: 'top' },
  tdAlt:       { padding: '10px 14px', borderBottom: '1px solid #e5e7eb', color: '#374151', background: '#f9fafb', verticalAlign: 'top' },
  pill:        { display: 'inline-block', borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 700 },
  pillRed:     { background: 'rgba(239,68,68,0.1)', color: '#dc2626' },
  pillGreen:   { background: 'rgba(34,197,94,0.1)', color: '#16a34a' },
  pillYellow:  { background: 'rgba(251,191,36,0.1)', color: '#b45309' },
  emailCard:   { background: 'linear-gradient(135deg, #0b2040, #0040a0)', borderRadius: 14, padding: '32px 36px', margin: '28px 0', textAlign: 'center' },
  emailTitle:  { fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 10 },
  emailSub:    { fontSize: 14, color: 'rgba(255,255,255,0.65)', marginBottom: 20 },
  emailBtn:    { display: 'inline-block', background: 'linear-gradient(135deg, #e0c000, #b89a00)', color: '#fff', fontWeight: 700, fontSize: 15, padding: '12px 32px', borderRadius: 10, textDecoration: 'none', boxShadow: '0 4px 16px rgba(224,192,0,0.3)' },
  contactBox:  { background: '#0b2040', borderRadius: 12, padding: '28px 32px', marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 24 },
  contactItem: { flex: '1 1 180px' },
  contactLabel:{ fontSize: 11.5, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 4 },
  contactVal:  { fontSize: 14, color: '#fff', fontWeight: 600 },
}

function Step({ num, title, desc }) {
  return (
    <div style={s.step}>
      <div style={s.stepNum}>{num}</div>
      <div style={s.stepText}>
        <div style={s.stepTitle}>{title}</div>
        <p style={s.stepDesc}>{desc}</p>
      </div>
    </div>
  )
}

function Section({ id, title, first, children }) {
  return (
    <section id={id}>
      <h2 style={first ? s.h2first : s.h2}>{title}</h2>
      {children}
    </section>
  )
}

/* ── Email Request Form ── */
function DeletionRequestForm() {
  const [form,    setForm]    = useState({ name: '', email: '', role: 'parent', school: '', reason: '' })
  const [sent,    setSent]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const field = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const inputStyle = {
    width: '100%', height: 44, padding: '0 14px', borderRadius: 10,
    border: '1.5px solid #d1d5db', background: '#fff', fontSize: 14,
    fontFamily: 'Lato, sans-serif', color: '#111827', outline: 'none',
    boxSizing: 'border-box', transition: 'border-color 0.2s',
  }
  const labelStyle = { fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9001/api/'
      const res = await fetch(`${API}account-deletion-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.message || 'Request failed. Please try emailing us directly.')
      }
      setSent(true)
    } catch (err) {
      /* Fallback: open email client */
      const subject = encodeURIComponent(`Account Deletion Request – ${form.school || form.name}`)
      const body    = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nRole: ${form.role}\nSchool: ${form.school}\nReason: ${form.reason}`
      )
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '36px 0' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0b2040', marginBottom: 8 }}>Request Received</h3>
        <p style={{ fontSize: 15, color: '#6b7280', maxWidth: 440, margin: '0 auto' }}>
          We will process your deletion request and confirm via email within <strong>7 business days</strong>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <label style={labelStyle}>Your Full Name *</label>
          <input style={inputStyle} required value={form.name} onChange={e => field('name', e.target.value)}
            placeholder="e.g. Ramesh Kumar"
            onFocus={e => e.target.style.borderColor = '#0040a0'}
            onBlur={e => e.target.style.borderColor = '#d1d5db'} />
        </div>
        <div>
          <label style={labelStyle}>Registered Email Address *</label>
          <input style={inputStyle} type="email" required value={form.email} onChange={e => field('email', e.target.value)}
            placeholder="your@email.com"
            onFocus={e => e.target.style.borderColor = '#0040a0'}
            onBlur={e => e.target.style.borderColor = '#d1d5db'} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <label style={labelStyle}>Your Role *</label>
          <select style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }} required value={form.role} onChange={e => field('role', e.target.value)}>
            <option value="school_admin">School Admin</option>
            <option value="teacher">Teacher / Staff</option>
            <option value="student">Student</option>
            <option value="parent">Parent / Guardian</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>School Name</label>
          <input style={inputStyle} value={form.school} onChange={e => field('school', e.target.value)}
            placeholder="Name of your school"
            onFocus={e => e.target.style.borderColor = '#0040a0'}
            onBlur={e => e.target.style.borderColor = '#d1d5db'} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Reason for Deletion (optional)</label>
        <textarea
          style={{ ...inputStyle, height: 100, padding: '10px 14px', resize: 'vertical', lineHeight: 1.6 }}
          value={form.reason} onChange={e => field('reason', e.target.value)}
          placeholder="Help us improve — tell us why you're leaving."
          onFocus={e => e.target.style.borderColor = '#0040a0'}
          onBlur={e => e.target.style.borderColor = '#d1d5db'}
        />
      </div>

      {error && <p style={{ fontSize: 13, color: '#dc2626', margin: 0 }}>{error}</p>}

      <div style={s.warnBox}>
        <p style={{ fontSize: 13, color: '#92400e', margin: 0, lineHeight: 1.7 }}>
          ⚠️ <strong>Warning:</strong> Account deletion is permanent and cannot be undone. All your personal data will be erased within 30 days. Financial records may be retained for up to 7 years as required by law.
        </p>
      </div>

      <button type="submit" disabled={loading} style={{
        height: 48, borderRadius: 10, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
        background: loading ? '#9ca3af' : 'linear-gradient(135deg, #dc2626, #b91c1c)',
        color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: 'Lato, sans-serif',
        boxShadow: '0 4px 16px rgba(220,38,38,0.25)', transition: 'all 0.2s',
        opacity: loading ? 0.7 : 1,
      }}>
        {loading ? 'Submitting…' : '🗑️ Submit Deletion Request'}
      </button>
    </form>
  )
}

export default function AccountDeletionPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={s.page}>
      <Navbar />

      <div style={s.hero}>
        <div style={s.wrap}>
          <div style={s.badge}>Account Management</div>
          <h1 style={s.heroTitle}>Account &amp; Data Deletion</h1>
          <p style={s.heroSub}>Request permanent deletion of your account and personal data</p>
        </div>
      </div>

      <div style={s.wrap}>
        <div style={s.card}>

          {/* Intro */}
          <Section id="intro" title="Your Right to Delete" first>
            <p style={s.p}>
              {PRODUCT} respects your right to privacy and data control. You can request permanent deletion of your account and all associated personal data at any time — no questions asked. This page explains what gets deleted, what is retained, and how to submit your request.
            </p>
            <div style={s.highlight}>
              <p style={{ ...s.p, margin: 0 }}>
                📱 <strong>Google Play / App Store users:</strong> This page serves as the official account deletion page for the {APP_NAME} Android and iOS apps, as required by Google Play Console policy.
              </p>
            </div>
          </Section>

          <hr style={s.divider} />

          {/* Who can request */}
          <Section id="who" title="Who Can Request Deletion?">
            <p style={s.p}>Any user of the {APP_NAME} platform can request deletion of their account and data, including:</p>
            <ul style={s.ul}>
              <li style={s.li}><strong>School Admins</strong> — full school account and all associated records.</li>
              <li style={s.li}><strong>Teachers / Staff</strong> — personal profile and login credentials.</li>
              <li style={s.li}><strong>Students</strong> — personal profile, attendance, marks, and homework data.</li>
              <li style={s.li}><strong>Parents / Guardians</strong> — parent app account and notification preferences.</li>
            </ul>
            <p style={s.p}>
              For <strong>school admin deletions</strong>: deleting the school admin account will initiate deletion of the entire school's data. We may contact you to confirm this is intentional.
            </p>
          </Section>

          <hr style={s.divider} />

          {/* What gets deleted */}
          <Section id="data" title="What Data Gets Deleted vs. Retained?">
            <table style={s.dataTable}>
              <thead>
                <tr>
                  <th style={s.th}>Data Type</th>
                  <th style={s.th}>Action</th>
                  <th style={s.th}>Timeframe</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Name, email, phone number',         'Permanently deleted', 'deleted',  '30 days'],
                  ['Profile photo',                     'Permanently deleted', 'deleted',  '30 days'],
                  ['Login credentials & sessions',      'Permanently deleted', 'deleted',  'Immediately'],
                  ['Student records (attendance, marks)','Permanently deleted','deleted',  '30 days'],
                  ['Chat & notification history',       'Permanently deleted', 'deleted',  '30 days'],
                  ['App usage analytics (anonymised)',  'Retained (no PII)',   'retained', 'Indefinite'],
                  ['Billing & payment invoices',        'Retained by law',     'law',      '7 years'],
                  ['Backup copies',                     'Purged from backups', 'deleted',  '90 days'],
                ].map(([type, action, status, time], i) => (
                  <tr key={i}>
                    <td style={i % 2 === 0 ? s.td : s.tdAlt}>{type}</td>
                    <td style={i % 2 === 0 ? s.td : s.tdAlt}>
                      <span style={{
                        ...s.pill,
                        ...(status === 'deleted' ? s.pillRed : status === 'retained' ? s.pillGreen : s.pillYellow)
                      }}>{action}</span>
                    </td>
                    <td style={i % 2 === 0 ? s.td : s.tdAlt}>{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <hr style={s.divider} />

          {/* In-app steps */}
          <Section id="inapp" title="Option 1: Delete from the App (In-App)">
            <p style={s.p}>
              You can delete your account directly from within the {APP_NAME} mobile app:
            </p>
            <div style={s.stepWrap}>
              <Step num={1} title="Open the App" desc={`Launch the ${APP_NAME} app on your Android or iOS device and log in.`} />
              <Step num={2} title="Go to Profile" desc='Tap your profile icon or avatar in the top corner of the screen.' />
              <Step num={3} title="Open Settings" desc='Navigate to Settings or Account Settings from the profile menu.' />
              <Step num={4} title="Select 'Delete Account'" desc="Scroll to the bottom and tap 'Delete Account' or 'Request Account Deletion'." />
              <Step num={5} title="Confirm Deletion" desc="Read the warning and tap 'Confirm Delete'. You may be asked to verify via OTP or password." />
              <Step num={6} title="Confirmation Email" desc="You will receive a confirmation email within 24 hours. Your data will be permanently deleted within 30 days." />
            </div>
          </Section>

          <hr style={s.divider} />

          {/* Web portal steps */}
          <Section id="portal" title="Option 2: Delete via Web Portal">
            <div style={s.stepWrap}>
              <Step num={1} title='Log in to your School Portal' desc='Visit your school portal URL and log in with your credentials.' />
              <Step num={2} title='Go to Account Settings' desc='Click on your name/avatar at the top right → Account Settings.' />
              <Step num={3} title="Click 'Delete My Account'" desc="Scroll to the Danger Zone section at the bottom of the page." />
              <Step num={4} title='Enter your password to confirm' desc='Type your current password and click the final Confirm button.' />
            </div>
          </Section>

          <hr style={s.divider} />

          {/* Form */}
          <Section id="form" title="Option 3: Submit a Deletion Request Below">
            <p style={s.p}>
              Can't access the app or portal? Fill in the form below and our team will process your deletion request manually within <strong>7 business days</strong>.
            </p>
            <DeletionRequestForm />
          </Section>

          <hr style={s.divider} />

          {/* Email option */}
          <Section id="email" title="Option 4: Email Us Directly">
            <div style={s.emailCard}>
              <div style={s.emailTitle}>Prefer to email?</div>
              <div style={s.emailSub}>
                Send a deletion request to our support team. Include your registered email, school name, and your role (admin / teacher / student / parent).
              </div>
              <a href={`mailto:${EMAIL}?subject=Account%20Deletion%20Request&body=Name%3A%20%0ARegistered%20Email%3A%20%0ASchool%20Name%3A%20%0ARole%3A%20`} style={s.emailBtn}>
                📧 Email Us
              </a>
            </div>
          </Section>

          <hr style={s.divider} />

          {/* After deletion */}
          <Section id="after" title="After Deletion">
            <ul style={s.ul}>
              <li style={s.li}>You will receive a confirmation email once your request is verified.</li>
              <li style={s.li}>Your account access will be revoked immediately upon confirmation.</li>
              <li style={s.li}>Personal data will be permanently deleted within <strong>30 days</strong>.</li>
              <li style={s.li}>Backup purge completes within <strong>90 days</strong>.</li>
              <li style={s.li}>Deletion is <strong>irreversible</strong>. You cannot reactivate a deleted account.</li>
            </ul>
            <p style={s.p}>
              For more details on how we handle data, see our{' '}
              <Link to="/privacy-policy" style={{ color: '#0040a0', fontWeight: 600 }}>Privacy Policy</Link>.
            </p>
          </Section>

          <hr style={s.divider} />

          <Section id="contact" title="Need Help?">
            <p style={s.p}>Contact our support team for any deletion-related questions:</p>
            <div style={s.contactBox}>
              {[
                { label: 'Company', val: COMPANY },
                { label: 'Product', val: PRODUCT },
                { label: 'Email',   val: EMAIL },
                { label: 'Phone',   val: PHONE },
              ].map(({ label, val }) => (
                <div key={label} style={s.contactItem}>
                  <div style={s.contactLabel}>{label}</div>
                  <div style={s.contactVal}>{val}</div>
                </div>
              ))}
            </div>
          </Section>

        </div>
      </div>

      <Footer />
    </div>
  )
}
