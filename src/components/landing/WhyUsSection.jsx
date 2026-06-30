import { useNavigate } from 'react-router-dom'

/* ── Detailed outline SVG icons — blue theme ── */
const IconRocket = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <path d="M24 6C24 6 34 10 34 22c0 6-3 11-10 14l-10-10C17 19 18 9 24 6z" stroke="#0040a0" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M14 26c-4 2-6 6-6 10l6-2 2-6-2-2z" stroke="#0040a0" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M22 36c2 4 6 6 10 6l-2-6-6-2-2 2z" stroke="#0040a0" strokeWidth="1.8" strokeLinejoin="round"/>
    <circle cx="28" cy="20" r="3" stroke="#0040a0" strokeWidth="1.8"/>
    <path d="M10 38l4-4" stroke="#0040a0" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const IconShield = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <path d="M24 6L10 12v12c0 8.5 6 16 14 18 8-2 14-9.5 14-18V12L24 6z" stroke="#0040a0" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M17 24l5 5 9-9" stroke="#0040a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 10l-10 4.5V22c0 5.5 4 10.5 10 12 6-1.5 10-6.5 10-12v-7.5L24 10z" stroke="#0040a0" strokeWidth="1.2" strokeDasharray="2 2"/>
  </svg>
)

const IconAutomation = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <rect x="6" y="10" width="36" height="28" rx="4" stroke="#0040a0" strokeWidth="1.8"/>
    <path d="M6 18h36" stroke="#0040a0" strokeWidth="1.5"/>
    <path d="M16 26h6M26 26h6M16 32h4M24 32h8" stroke="#0040a0" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="38" cy="10" r="5" fill="#e8f0fc" stroke="#0040a0" strokeWidth="1.5"/>
    <path d="M36 10l1.5 1.5L40 8" stroke="#0040a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconGlobe = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <circle cx="24" cy="24" r="17" stroke="#0040a0" strokeWidth="1.8"/>
    <ellipse cx="24" cy="24" rx="8" ry="17" stroke="#0040a0" strokeWidth="1.5"/>
    <path d="M7 18h34M7 30h34" stroke="#0040a0" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M24 7v34" stroke="#0040a0" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const IconHeadphones = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <path d="M10 26v-4a14 14 0 0128 0v4" stroke="#0040a0" strokeWidth="1.8" strokeLinecap="round"/>
    <rect x="6" y="26" width="8" height="12" rx="4" stroke="#0040a0" strokeWidth="1.8"/>
    <rect x="34" y="26" width="8" height="12" rx="4" stroke="#0040a0" strokeWidth="1.8"/>
    <path d="M38 38v2a4 4 0 01-4 4h-6" stroke="#0040a0" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const IconPricing = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <rect x="6" y="10" width="36" height="28" rx="4" stroke="#0040a0" strokeWidth="1.8"/>
    <path d="M6 18h36" stroke="#0040a0" strokeWidth="1.5"/>
    <circle cx="24" cy="30" r="6" stroke="#0040a0" strokeWidth="1.8"/>
    <path d="M24 26v8M21.5 27.5h4a1.5 1.5 0 010 3H23a1.5 1.5 0 000 3h4" stroke="#0040a0" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 14h4M32 14h4" stroke="#0040a0" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const REASONS = [
  {
    svg: <IconRocket />,
    title: 'Up & Running in 10 Minutes',
    desc: 'No installation, no IT team needed. Create your school account and go live the same day — with all your data imported.',
  },
  {
    svg: <IconShield />,
    title: 'Secure & Reliable',
    desc: 'Bank-grade data encryption, daily backups, and high uptime guarantee. Your school data is always safe and accessible.',
  },
  {
    svg: <IconAutomation />,
    title: 'Drastically Reduce Admin Work',
    desc: 'Automate fee reminders, attendance reports, and result generation. Your staff focuses on students, not paperwork.',
  },
  {
    svg: <IconGlobe />,
    title: 'Access from Anywhere',
    desc: 'Web + Android + iOS apps for admins, teachers, students, and parents. School management in every pocket.',
  },
  {
    svg: <IconHeadphones />,
    title: 'Dedicated Support Team',
    desc: 'Onboarding assistance, training videos, and live support. We stay with you at every step of your journey.',
  },
  {
    svg: <IconPricing />,
    title: 'No Hidden Charges',
    desc: 'Pay only per student enrolled. Transparent pricing with no setup fees, no long-term contracts.',
  },
]

export default function WhyUsSection() {
  const navigate = useNavigate()

  return (
    <section style={{ background: 'linear-gradient(180deg, #f4fbff 0%, #fff 100%)', padding: '72px 0 80px' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{
            display: 'inline-block', fontSize: 12, fontWeight: 700, color: '#0040a0',
            letterSpacing: 2, textTransform: 'uppercase',
            background: 'rgba(0,64,160,0.08)', padding: '5px 18px', borderRadius: 50, marginBottom: 16,
          }}>
            Why CloudX
          </span>
          <h2 style={{
            fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 700, color: '#1a1a2e',
            lineHeight: 1.15, marginBottom: 14, fontFamily: "'Lato', sans-serif",
          }}>
            Everything Your School Needs,<br />
            <span style={{ color: '#0040a0' }}>Built the Right Way</span>
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
            Built specifically for schools — not adapted from generic software. Every feature
            solves a real problem your staff faces daily.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="why-cards-grid">
          {REASONS.map(({ svg, title, desc }) => (
            <div key={title} style={{
              background: '#fff', borderRadius: 16, padding: '28px 24px',
              border: '1.5px solid #e8f0fc',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              transition: 'all 0.25s', cursor: 'default',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,64,160,0.12)'
                e.currentTarget.style.borderColor = '#a0bce8'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
                e.currentTarget.style.borderColor = '#e8f0fc'
              }}
            >
              {/* Icon circle */}
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'rgba(0,64,160,0.07)',
                border: '1.5px solid rgba(0,64,160,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
              }}>
                {svg}
              </div>
              <h3 style={{
                fontSize: 16, fontWeight: 700, color: '#1a1a2e',
                marginBottom: 10, fontFamily: "'Lato', sans-serif", lineHeight: 1.3,
              }}>{title}</h3>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <button onClick={() => navigate('/register')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '13px 34px', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #0040a0, #0060d0)',
            color: '#fff', fontSize: 15, fontWeight: 700,
            fontFamily: "'Lato', sans-serif",
            boxShadow: '0 8px 24px rgba(0,64,160,0.35)',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 32px rgba(0,64,160,0.45)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,64,160,0.35)' }}
          >
            Register Your School →
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .why-cards-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .why-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
