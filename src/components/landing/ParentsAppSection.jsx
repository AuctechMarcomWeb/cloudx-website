import appImage from '../../assets/ourApp.png'

const GooglePlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3.18 1.07C2.76 1.31 2.5 1.77 2.5 2.36v19.28c0 .59.26 1.05.68 1.29l.1.06 10.81-10.81v-.25L3.28 1.01l-.1.06z" fill="#4285F4"/>
    <path d="M17.7 15.64l-3.6-3.61v-.26l3.6-3.6.08.05 4.27 2.43c1.22.69 1.22 1.82 0 2.51l-4.27 2.43-.08.05z" fill="#FBBC04"/>
    <path d="M17.78 15.59L14.09 12 3.18 22.93c.4.43 1.06.48 1.8.05l12.8-7.39" fill="#EA4335"/>
    <path d="M17.78 8.41L4.98 1.02C4.24.59 3.58.64 3.18 1.07L14.09 12l3.69-3.59z" fill="#34A853"/>
  </svg>
)

const AppleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
)

const GradCapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
  </svg>
)

const STORE_BUTTONS = [
  { icon: <GooglePlayIcon />, label: 'Get it on',       title: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.wrteam.saas.school' },
  { icon: <AppleIcon />,      label: 'Download on the', title: 'App Store',   href: 'https://testflight.apple.com/join/HxZcnKO6' },
  { icon: <GradCapIcon />,    label: 'Access via',      title: 'Student Web', href: 'https://eschool-saas.student-web.wrteam.me/' },
]

export default function ParentsAppSection() {
  return (
    <section style={{ background: '#fff', padding: '80px 0', overflow: 'hidden' }}>
      <div className="container">
        <div className="parents-grid" style={{ display: 'flex', alignItems: 'center', gap: 64, flexWrap: 'wrap', justifyContent: 'center' }}>

          {/* Image */}
          <div style={{ flexShrink: 0, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {[420, 320, 220].map(size => (
              <div key={size} style={{
                position: 'absolute', borderRadius: '50%',
                width: size, height: size,
                border: '1px solid rgba(200,200,200,0.35)',
                top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                pointerEvents: 'none',
              }} />
            ))}
            <img
              src={appImage}
              alt="Parents and Students App"
              style={{ width: '100%', maxWidth: 420, height: 'auto', display: 'block', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 24px 56px rgba(0,0,0,0.13))' }}
            />
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 300, maxWidth: 480 }}>
            <h2 className="section-title" style={{ fontSize: 32, marginBottom: 20 }}>
              Parents always in the loop, on their phone
            </h2>

            <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.75, marginBottom: 36, maxWidth: 420 }}>
              Keep parents informed and engaged — automatically. Real-time attendance alerts,
              exam results, fee reminders, timetable updates and announcements all delivered
              straight to their phone. No more missed communications between school and home.
            </p>

            <div className="store-btns" style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              {STORE_BUTTONS.map(({ icon, label, title, href }) => (
                <a key={title} href={href} target="_blank" rel="noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: '#1a1a2e', color: '#fff',
                  borderRadius: 10, padding: '12px 20px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                  transition: 'transform 0.18s, box-shadow 0.18s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)' }}
                >
                  {icon}
                  <div>
                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', lineHeight: 1, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{label}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>{title}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .parents-grid { gap: 40px !important; }
        }
        @media (max-width: 600px) {
          .parents-grid { flex-direction: column !important; gap: 32px !important; align-items: stretch !important; }
          .parents-grid > div:first-child { width: 100% !important; }
          .parents-grid > div:first-child img { max-width: 280px !important; }
          .parents-grid > div:last-child { min-width: unset !important; width: 100% !important; }
          .store-btns { flex-direction: column !important; }
          .store-btns a { width: 100% !important; justify-content: center !important; }
        }
        @media (max-width: 400px) {
          .parents-grid > div:first-child img { max-width: 220px !important; }
        }
      `}</style>
    </section>
  )
}
