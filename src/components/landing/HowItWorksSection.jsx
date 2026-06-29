import whyImg from '../../assets/682c33c666a931.887378031747727302.png'
import { CheckCircle2 } from 'lucide-react'

const STEPS = [
  {
    num: '01',
    title: 'Register your school',
    desc: 'Sign up in minutes. Add your school name, contact details and choose a plan. No paperwork needed.',
  },
  {
    num: '02',
    title: 'Set up students, teachers & classes',
    desc: 'Add students individually or in bulk. Create classes, assign teachers, and set up fee structures.',
  },
  {
    num: '03',
    title: 'Manage everything from one dashboard',
    desc: 'Mark attendance, collect fees, schedule exams, send announcements, and keep parents updated — all in one place.',
  },
]

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

        {/* ── How it works ── */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span className="section-badge">How it works</span>
          <h2 className="section-title" style={{ marginBottom: 8 }}>Up and running in 3 simple steps</h2>
          <p className="section-sub" style={{ marginBottom: 0 }}>No IT team, no complex setup. Any school can be live on School CloudX today.</p>
        </div>

        <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginBottom: 52 }}>
          {STEPS.map(({ num, title, desc }) => (
            <div key={num} style={{
              background: '#f8fafe', borderRadius: 16, padding: '24px 22px',
              border: '1.5px solid #e8f0fc', position: 'relative',
              transition: 'transform 0.25s, box-shadow 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,64,160,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              {/* Step badge */}
              <div style={{ marginBottom: 14 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, background: '#0040a0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: 13, fontFamily: "'Lato',sans-serif" }}>{num}</span>
                </div>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 8, fontFamily: "'Lato', sans-serif", lineHeight: 1.35 }}>{title}</h3>
              <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>

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
