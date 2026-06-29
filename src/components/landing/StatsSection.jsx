import { useNavigate } from 'react-router-dom'
import { Clock, Zap, ShieldCheck, HeadphonesIcon } from 'lucide-react'

// Values based on actual software capabilities
const BENEFITS = [
  {
    icon: Clock,
    value: '30',
    unit: 'Days',
    label: 'Free Trial',
    desc: 'Try every feature free for 30 days. No credit card, no commitment.',
    color: '#0040a0',
    bg: 'rgba(0,64,160,0.08)',
  },
  {
    icon: Zap,
    value: '14',
    unit: '+',
    label: 'Features',
    desc: 'Student, fees, exams, attendance, timetable, transport, chat and more.',
    color: '#e0c000',
    bg: 'rgba(224,192,0,0.10)',
  },
  {
    icon: ShieldCheck,
    value: '3',
    unit: ' Apps',
    label: 'Mobile Apps',
    desc: 'Separate apps for parents, students, and teachers — all included.',
    color: '#002f80',
    bg: 'rgba(0,47,128,0.08)',
  },
  {
    icon: HeadphonesIcon,
    value: '24',
    unit: '/7',
    label: 'Support',
    desc: 'Real person support — not a chatbot. We respond fast and help you onboard.',
    color: '#0ea5e9',
    bg: 'rgba(14,165,233,0.08)',
  },
]

export default function StatsSection() {
  const navigate = useNavigate()

  return (
    <section style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f0fc 100%)', padding: '72px 0', borderTop: '1px solid #ccdaf5', borderBottom: '1px solid #ccdaf5' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span className="section-badge">Why choose us</span>
          <h2 className="section-title">Everything your school needs,<br />nothing you don't</h2>
          <p className="section-sub">Built for schools of all sizes — from 50 students to 5,000. Simple, powerful, and affordable.</p>
        </div>

        {/* Benefit cards */}
        <div className="benefits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 48 }}>
          {BENEFITS.map(({ icon: Icon, value, unit, label, desc, color, bg }) => (
            <div key={label} style={{
              background: '#fff', borderRadius: 20, padding: '28px 22px',
              border: '1.5px solid #e8f0fc', textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,64,160,0.06)',
              transition: 'transform 0.25s, box-shadow 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,64,160,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,64,160,0.06)' }}
            >
              <div style={{ width: 56, height: 56, borderRadius: 16, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Icon size={26} color={color} strokeWidth={1.8} />
              </div>
              <div style={{ lineHeight: 1, marginBottom: 6 }}>
                <span style={{ fontSize: 40, fontWeight: 800, color: '#1a1a2e', fontFamily: "'Lato', sans-serif" }}>{value}</span>
                <span style={{ fontSize: 18, fontWeight: 700, color, marginLeft: 2 }}>{unit}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e', marginBottom: 8 }}>{label}</div>
              <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        {/* Early adopter CTA banner */}
        <div style={{
          background: 'linear-gradient(135deg, #0040a0 0%, #002f80 100%)',
          borderRadius: 20, padding: '32px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 24, flexWrap: 'wrap',
          boxShadow: '0 12px 40px rgba(0,64,160,0.25)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* BG orb */}
          <div style={{ position: 'absolute', right: -40, top: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', left: '40%', bottom: -60, width: 180, height: 180, borderRadius: '50%', background: 'rgba(224,192,0,0.08)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(224,192,0,0.2)', border: '1px solid rgba(224,192,0,0.4)', borderRadius: 999, padding: '4px 14px', marginBottom: 12 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e0c000', display: 'inline-block' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#e0c000', letterSpacing: 1, textTransform: 'uppercase' }}>Limited Early Access</span>
            </div>
            <h3 style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 700, color: '#fff', margin: '0 0 8px', fontFamily: "'Lato', sans-serif", lineHeight: 1.3 }}>
              Be among the first schools on School CloudX
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', margin: 0, maxWidth: 480 }}>
              Early schools get priority support, free onboarding assistance, and locked-in pricing forever.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, flexShrink: 0, position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/register')}
              style={{
                padding: '12px 28px', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #e0c000, #b89a00)',
                color: '#fff', fontSize: 15, fontWeight: 700,
                fontFamily: "'Lato', sans-serif",
                boxShadow: '0 6px 20px rgba(224,192,0,0.4)',
                transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(224,192,0,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(224,192,0,0.4)' }}
            >
              Register your school free →
            </button>
            <button
              onClick={() => window.open('https://crestwood-academy.eschool-saas.wrteam.me/', '_blank')}
              style={{
                padding: '12px 24px', borderRadius: 10, cursor: 'pointer',
                background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.25)',
                color: '#fff', fontSize: 15, fontWeight: 600,
                fontFamily: "'Lato', sans-serif", transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
            >
              View live demo
            </button>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .benefits-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .benefits-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
