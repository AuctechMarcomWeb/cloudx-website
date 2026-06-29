import { CheckCircle2, Zap, HeadphonesIcon, Globe, ShieldCheck, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const REASONS = [
  {
    icon: Zap,
    color: '#f59e0b',
    bg: '#fffbeb',
    border: '#fde68a',
    title: 'Up & Running in 10 Minutes',
    desc: 'No installation, no IT team needed. Create your school account and go live the same day — with all your data imported.',
  },
  {
    icon: ShieldCheck,
    color: '#0040a0',
    bg: '#eff6ff',
    border: '#bfdbfe',
    title: 'Secure & Reliable',
    desc: 'Bank-grade data encryption, daily backups, and high uptime guarantee. Your school data is always safe and accessible.',
  },
  {
    icon: TrendingUp,
    color: '#16a34a',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    title: 'Drastically Reduce Admin Work',
    desc: 'Automate fee reminders, attendance reports, and result generation. Your staff focuses on students, not paperwork.',
  },
  {
    icon: Globe,
    color: '#7c3aed',
    bg: '#f5f3ff',
    border: '#ddd6fe',
    title: 'Access from Anywhere',
    desc: 'Web + Android + iOS apps for admins, teachers, students, and parents. School management in every pocket.',
  },
  {
    icon: HeadphonesIcon,
    color: '#0891b2',
    bg: '#ecfeff',
    border: '#a5f3fc',
    title: 'Dedicated Support Team',
    desc: 'Onboarding assistance, training videos, and live support. We stay with you at every step of your journey.',
  },
  {
    icon: CheckCircle2,
    color: '#dc2626',
    bg: '#fff1f2',
    border: '#fecdd3',
    title: 'No Hidden Charges',
    desc: 'Pay only per student enrolled. Transparent pricing with no setup fees, no long-term contracts.',
  },
]

export default function WhyUsSection() {
  const navigate = useNavigate()

  return (
    <section style={{ background: 'linear-gradient(180deg, #f4fbff 0%, #fff 100%)', padding: '90px 0 100px' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            display: 'inline-block', fontSize: 12, fontWeight: 700, color: '#0040a0',
            letterSpacing: 2, textTransform: 'uppercase',
            background: 'rgba(0,64,160,0.08)', padding: '5px 18px', borderRadius: 50, marginBottom: 16,
          }}>
            Why CloudX
          </span>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 700, color: '#1a1a2e',
            lineHeight: 1.15, marginBottom: 16, fontFamily: "'Lato', sans-serif",
          }}>
            Everything Your School Needs,<br />
            <span style={{ color: '#0040a0' }}>Built the Right Way</span>
          </h2>
          <p style={{ fontSize: 17, color: '#64748b', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            Built specifically for schools — not adapted from generic software. Every feature
            solves a real problem your staff faces daily.
          </p>
        </div>

        {/* Reason cards grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
        }} className="why-cards-grid">
          {REASONS.map(({ icon: Icon, color, bg, border, title, desc }) => (
            <div key={title} style={{
              background: '#fff', borderRadius: 16, padding: '28px 24px',
              border: `1.5px solid ${border}`,
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              transition: 'all 0.25s',
              cursor: 'default',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.10)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 14, background: bg,
                border: `1.5px solid ${border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 18,
              }}>
                <Icon size={24} color={color} strokeWidth={2} />
              </div>
              <h3 style={{
                fontSize: 17, fontWeight: 700, color: '#1a1a2e',
                marginBottom: 10, fontFamily: "'Lato', sans-serif", lineHeight: 1.3,
              }}>{title}</h3>
              <p style={{ fontSize: 14.5, color: '#64748b', lineHeight: 1.7, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <button onClick={() => navigate('/register')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '14px 36px', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #0040a0, #0060d0)',
            color: '#fff', fontSize: 16, fontWeight: 700,
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
