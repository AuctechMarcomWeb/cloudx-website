import { ExternalLink } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer style={{ background: '#0d1f1a', color: 'rgba(255,255,255,0.5)' }}>
      {/* Top gradient bar */}
      <div style={{ height: 4, background: 'linear-gradient(90deg, #1bbc9b, #0ea5e9)' }} />

      <div className="container" style={{ paddingTop: 56, paddingBottom: 0 }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1.4fr', gap: 48, paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>

          {/* Brand */}
          <div>
            <img src="/auctech-logo.png" alt="School CloudX" style={{ height: 36, objectFit: 'contain', marginBottom: 16, filter: 'brightness(0) invert(1)' }} />
            <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.4)', maxWidth: 220, marginBottom: 24 }}>
              School CloudX — Manage Your School with ease and efficiency.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { label: 'FB', href: 'https://www.facebook.com/wrteam.in/' },
                { label: 'IG', href: 'https://www.instagram.com/wrteam.in/' },
                { label: 'IN', href: 'https://in.linkedin.com/company/wrteam' },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
                  fontSize: 11, fontWeight: 700, transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(27,188,155,0.25)'; e.currentTarget.style.borderColor = 'rgba(27,188,155,0.5)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
                >{label}</a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 20 }}>Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 13 }}>
              {[
                { label: 'Home',     href: '#home' },
                { label: 'Features', href: '#features' },
                { label: 'Faqs',     href: '#faq' },
                { label: 'Info',     href: '#info' },
                { label: 'About us', href: '#info' },
                { label: 'Contact',  href: '#contact' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <button onClick={() => scrollTo(href)} style={{
                    background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)',
                    fontSize: 14, cursor: 'pointer', padding: 0, fontFamily: 'Lato, sans-serif',
                    textAlign: 'left', transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = '#1bbc9b'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                  >{label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 20 }}>Info</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 13 }}>
              {[
                { label: 'About us',            href: '#' },
                { label: 'Privacy policy',      href: 'https://eschool-saas.wrteam.me/page/type/privacy-policy' },
                { label: 'Terms & conditions',  href: 'https://eschool-saas.wrteam.me/page/type/terms-conditions' },
                { label: 'Refund cancellation', href: 'https://eschool-saas.wrteam.me/page/type/refund-cancellation' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noreferrer" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#1bbc9b'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                  >{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 20 }}>Follow</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.wrteam.saas.school' },
                { label: 'App Store',   href: 'https://testflight.apple.com/join/HxZcnKO6' },
                { label: 'Student Web', href: 'https://eschool-saas.student-web.wrteam.me/' },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 16px', background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
                  fontSize: 13.5, fontWeight: 500, color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(27,188,155,0.15)'; e.currentTarget.style.borderColor = 'rgba(27,188,155,0.4)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
                >
                  <ExternalLink size={14} />{label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ padding: '20px 0', display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', margin: 0 }}>© {year} School CloudX. All Rights Reserved</p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)', margin: 0 }}>
            © <a href="https://wrteam.in/" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#1bbc9b'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
            >WRTeam</a>. All Rights Reserved
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
