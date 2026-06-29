import { useNavigate } from 'react-router-dom'
import { Star, Rocket, Gift, Users } from 'lucide-react'

// No fake testimonials — early adopter value proposition instead
const PERKS = [
  {
    icon: Rocket,
    color: '#0040a0',
    bg: 'rgba(0,64,160,0.08)',
    title: 'Priority Onboarding',
    desc: 'Our team personally helps you set up your school from scratch. No learning curve, no confusion.',
  },
  {
    icon: Gift,
    color: '#e0c000',
    bg: 'rgba(224,192,0,0.10)',
    title: 'Locked-in Early Pricing',
    desc: 'Schools that register now keep the lowest pricing forever — even as we grow and add features.',
  },
  {
    icon: Star,
    color: '#002f80',
    bg: 'rgba(0,47,128,0.08)',
    title: 'Shape the Product',
    desc: 'Early schools get direct input on new features. Your feedback will be built into the platform.',
  },
  {
    icon: Users,
    color: '#0ea5e9',
    bg: 'rgba(14,165,233,0.08)',
    title: 'Dedicated Support',
    desc: 'A real person available to help you — not a chatbot. We pick up calls and respond to messages fast.',
  },
]

export default function TestimonialsSection() {
  const navigate = useNavigate()

  return (
    <section style={{ background: 'linear-gradient(135deg, #f0f4ff, #e8f0fc)', padding: '80px 0' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span className="section-badge">Early Access</span>
          <h2 className="section-title">Join as a founding school</h2>
          <p className="section-sub">
            We're onboarding our first schools right now. Early schools get exclusive perks that won't be available later.
          </p>
        </div>

        {/* Perks grid */}
        <div className="perks-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 52 }}>
          {PERKS.map(({ icon: Icon, color, bg, title, desc }) => (
            <div key={title} style={{
              background: '#fff', borderRadius: 20, padding: '28px 28px',
              border: '1.5px solid #e8f0fc',
              display: 'flex', alignItems: 'flex-start', gap: 20,
              boxShadow: '0 4px 20px rgba(0,64,160,0.06)',
              transition: 'transform 0.25s, box-shadow 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,64,160,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,64,160,0.06)' }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 14, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={24} color={color} strokeWidth={1.8} />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 8, fontFamily: "'Lato', sans-serif" }}>{title}</div>
                <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof — honest */}
        <div style={{
          background: '#fff', borderRadius: 20, padding: '32px 36px',
          border: '2px solid #ccdaf5', textAlign: 'center',
          boxShadow: '0 4px 24px rgba(0,64,160,0.08)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 14 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} fill="#f59e0b" color="#f59e0b" />
            ))}
          </div>
          <p style={{ fontSize: 18, fontWeight: 600, color: '#1a1a2e', lineHeight: 1.7, maxWidth: 600, margin: '0 auto 20px', fontFamily: "'Lato', sans-serif" }}>
            "The platform is already being used by our registered schools and they love how simple it is to manage everything in one place."
          </p>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 28 }}>— School CloudX Team</div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/register')}
              className="btn-primary"
              style={{ padding: '13px 32px', fontSize: 15 }}
            >
              Register your school free →
            </button>
            <button
              onClick={() => window.open('https://crestwood-academy.eschool-saas.wrteam.me/', '_blank')}
              className="btn-outline"
              style={{ padding: '13px 28px', fontSize: 15 }}
            >
              See live demo first
            </button>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .perks-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
