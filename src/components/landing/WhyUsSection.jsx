import whyImg from '../../assets/682c33c666a931.887378031747727302.png'
import { CheckCircle2 } from 'lucide-react'



const WHY_POINTS = [
  'Starts at just $0.02 per student per month',
  'Super Admin panel to manage multiple schools',
  'Parent & Student mobile app included',
  'Online + offline exam management',
  'Transportation module with route management',
  'Works on mobile, tablet, and desktop',
]

export default function HowItWorksSection() {
  return (
    <section id="info" style={{ background: '#fff', padding: '52px 0 60px', overflow: 'hidden' }}>
      <div className="container">

        {/* ── Why CloudX ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 52, alignItems: 'center' }} className="why-grid">

          {/* Left */}
          <div>
            <span className="section-badge">Why School CloudX</span>
            <h2 className="section-title" style={{ marginBottom: 12 }}>Built for Indian schools, priced right</h2>
            <p style={{ fontSize: 14.5, color: '#64748b', lineHeight: 1.8, marginBottom: 24 }}>
              Most school software is expensive, complicated, or built for foreign markets.
              School CloudX is designed specifically for schools like yours — simple to use,
              easy on the budget, and backed by real support.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {WHY_POINTS.map(label => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <CheckCircle2 size={18} color='#0040a0' strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 14.5, fontWeight: 500, color: '#374151', lineHeight: 1.5 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={whyImg}
              alt="School CloudX Dashboard"
              style={{ width: '100%', height: 'auto', display: 'block', filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.12))' }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width: 900px) {
          .steps-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
          .why-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @media(max-width: 600px) {
          .why-grid { gap: 24px !important; }
          #info { padding: 36px 0 44px !important; }
        }
      `}</style>
    </section>
  )
}
