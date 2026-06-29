import { useState } from 'react'
import { Mail, Phone } from 'lucide-react'
import { useSiteSettings } from '../hooks/useSiteSettings'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9001/api/'

function NewsletterForm() {
  const [email,   setEmail]   = useState('')
  const [done,    setDone]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (!email) return
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE}newsletter/subscribe`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data?.message || 'Subscription failed. Try again.')
        return
      }

      setDone(true)
      setEmail('')
      setTimeout(() => setDone(false), 4000)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flexShrink: 0 }}>
      <input
        type="email" value={email} onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com" required
        style={{
          height: 44, padding: '0 16px', borderRadius: 10, border: '1.5px solid rgba(255,255,255,0.25)',
          background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 14,
          fontFamily: 'Lato, sans-serif', outline: 'none', minWidth: 220,
          transition: 'border-color 0.2s',
        }}
        onFocus={e => e.target.style.borderColor = '#e0c000'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.25)'}
      />
      <button type="submit" style={{
        height: 44, padding: '0 22px', borderRadius: 10, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
        background: done ? 'rgba(255,255,255,0.2)' : 'linear-gradient(135deg, #e0c000, #b89a00)',
        color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: 'Lato, sans-serif',
        boxShadow: '0 4px 16px rgba(224,192,0,0.3)', transition: 'all 0.2s',
        whiteSpace: 'nowrap', opacity: loading ? 0.7 : 1,
      }}
        disabled={loading}>
        {done ? '✓ Subscribed!' : loading ? 'Please wait…' : 'Subscribe ✦'}
      </button>
      {error && (
        <p style={{ width: '100%', margin: '4px 0 0', fontSize: 12, color: '#fca5a5', textAlign: 'left' }}>{error}</p>
      )}
    </form>
  )
}

/* ── Inline SVG social icons ── */
const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 2h-3.5C11.567 2 10 3.567 10 5.5V8H7v4h3v10h4V12h3l.5-4H14V5.5c0-.276.224-.5.5-.5H17V2z"/>
  </svg>
)
const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
  </svg>
)
const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.98 3.5A2.49 2.49 0 002.5 6a2.49 2.49 0 002.48 2.5A2.49 2.49 0 007.46 6 2.49 2.49 0 004.98 3.5zM3 8.976h3.96V21H3V8.976zm7.902 0H14.8v1.65h.054c.546-1.034 1.882-2.124 3.874-2.124C22.914 8.502 24 11.37 24 15v6h-3.958v-5.318c0-1.27-.022-2.903-1.768-2.903-1.77 0-2.04 1.383-2.04 2.81V21H12.39V8.976h-.488z"/>
  </svg>
)

const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 20.5v-17c0-.83.93-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6l-14 8.5c-.67.5-1.6.03-1.6-.8z"/>
  </svg>
)
const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
)
const WebIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
)

export default function Footer() {
  const year = new Date().getFullYear()
  const { settings } = useSiteSettings()

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const linkStyle = {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    textDecoration: 'none',
    transition: 'color 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    lineHeight: 1,
  }

  const colHead = {
    fontSize: 12,
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '1.8px',
    textTransform: 'uppercase',
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  }

  const dot = (
    <span style={{
      display: 'inline-block', width: 6, height: 6,
      borderRadius: '50%', background: '#0040a0', flexShrink: 0,
    }} />
  )

  return (
    <footer style={{ background: '#0a1c15', fontFamily: 'Lato, sans-serif' }}>

      {/* ── Top gradient line ── */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, #0040a0, #0ea5e9, #0040a0)' }} />

      {/* ── Newsletter Strip ── */}
      <div style={{ background: 'linear-gradient(135deg, #0040a0, #002f80)', padding: '40px 0' }}>
        <div className="container">
          <div className="newsletter-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: '0 0 6px', fontFamily: 'Lato, sans-serif' }}>
                Stay updated with School CloudX
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
                Get product updates, tips and school management insights straight to your inbox.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '0 24px' }}>

        {/* ── Main content ── */}
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.8fr 1fr 1fr 1.6fr',
          gap: 40,
          paddingTop: 60,
          paddingBottom: 48,
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>

          {/* ── Col 1: Brand ── */}
          <div>
            <div style={{ background: '#fff', borderRadius: 12, padding: '8px 14px', display: 'inline-block', marginBottom: 18 }}>
              <img
                src="/auctech-logo.png"
                alt="School CloudX"
                style={{ height: 42, objectFit: 'contain', display: 'block' }}
              />
            </div>

            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', maxWidth: 230, marginBottom: 24, margin: '0 0 24px' }}>
              A modern school management platform — built for speed, simplicity, and every stakeholder.
            </p>

            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {[
                { Icon: Phone, text: `+91 ${settings.phone}` },
                { Icon: Mail,  text: settings.email },
              ].map(({ Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: 7,
                    background: 'rgba(0,64,160,0.12)',
                    border: '1px solid rgba(0,64,160,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={13} color="#0040a0" />
                  </span>
                  {text}
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { label: 'Facebook',  Icon: FacebookIcon },
                { label: 'Instagram', Icon: InstagramIcon },
                { label: 'LinkedIn',  Icon: LinkedInIcon },
              ].map(({ label, Icon }) => (
                <span
                  key={label}
                  aria-label={label}
                  title={label}
                  style={{
                    width: 36, height: 36, borderRadius: 9,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    transition: 'all 0.2s',
                    flexShrink: 0,
                  }}
                >
                  <Icon />
                </span>
              ))}
            </div>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div>
            <div style={colHead}>
              <span style={{ width: 3, height: 16, background: '#0040a0', borderRadius: 2, display: 'inline-block' }} />
              Quick Links
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 13 }}>
              {[
                { label: 'Home',     href: '#home' },
                { label: 'Features', href: '#features' },
                { label: 'About us', href: '#info' },
                { label: 'FAQs',     href: '#faq' },
                { label: 'Contact',  href: '#contact' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(href)}
                    style={{ ...linkStyle, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'Lato, sans-serif' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#0040a0' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
                  >
                    {dot}{label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Info ── */}
          <div>
            <div style={colHead}>
              <span style={{ width: 3, height: 16, background: '#0040a0', borderRadius: 2, display: 'inline-block' }} />
              Info
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 13 }}>
              {[
                { label: 'About us',              href: '#info',    ext: false },
                { label: 'Privacy Policy',        href: null,       ext: false },
                { label: 'Terms & Conditions',    href: null,       ext: false },
                { label: 'Refund & Cancellation', href: null,       ext: false },
              ].map(({ label, href, ext }) => (
                <li key={label}>
                  {href ? (
                  <a
                    href={href}
                    target={ext ? '_blank' : '_self'}
                    rel="noreferrer"
                    style={linkStyle}
                    onMouseEnter={e => { e.currentTarget.style.color = '#0040a0' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
                  >
                    {dot}{label}
                  </a>
                  ) : (
                  <span style={linkStyle}>{dot}{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Download ── */}
          <div>
            <div style={colHead}>
              <span style={{ width: 3, height: 16, background: '#0040a0', borderRadius: 2, display: 'inline-block' }} />
              Download App
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Google Play', sub: 'Get it on',       Icon: PlayIcon,  bg: '#34a853' },
                { label: 'App Store',   sub: 'Download on the', Icon: AppleIcon, bg: '#555' },
                { label: 'Student Web', sub: 'Access via',      Icon: WebIcon,   bg: '#0ea5e9' },
              ].map(({ label, sub, Icon, bg }) => (
                <span
                  key={label}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '10px 14px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 10,
                  }}
                >
                  {/* Icon box */}
                  <span style={{
                    width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                    background: bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff',
                  }}>
                    <Icon />
                  </span>
                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.5px', lineHeight: 1, marginBottom: 4 }}>{sub}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.85)', lineHeight: 1, whiteSpace: 'nowrap' }}>{label}</div>
                  </div>
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom" style={{
          padding: '20px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
        }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            © {year} School CloudX. All rights reserved.
          </p>
        </div>

      </div>

      <style>{`
        /* ── Tablet: 2 col ── */
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 36px 48px !important;
            padding-top: 52px !important;
          }
        }
        /* ── Mobile: 1 col ── */
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            padding-top: 40px !important;
            padding-bottom: 36px !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 4px !important;
            padding: 16px 0 !important;
          }
        }
      `}</style>
    </footer>
  )
}
