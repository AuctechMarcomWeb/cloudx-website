import whyImg from '../../assets/682c33c666a931.887378031747727302.png'
import { CheckCircle2 } from 'lucide-react'

const STEPS = [
  {
    num: '01',
    title: 'Register your school',
    desc: 'Sign up in 2 minutes. No paperwork, no technical setup — just your school name and email.',
  },
  {
    num: '02',
    title: 'Add students, staff & classes',
    desc: 'Import or manually add your school data. Our onboarding team helps you every step of the way.',
  },
  {
    num: '03',
    title: 'Go live — manage everything',
    desc: 'Attendance, fees, exams, timetables, parent communication — all from one simple dashboard.',
  },
]

const WHY_POINTS = [
  'Affordable — starts at $0.02 per student',
  'No IT team needed — anyone can manage it',
  'Your data stays private and fully encrypted',
  'Works on mobile, tablet, and desktop',
]

export default function HowItWorksSection() {
  return (
    <section id="info" style={{ background: '#fff', padding: '80px 0', overflow: 'hidden' }}>
      <div className="container">

        {/* ── How it works ── */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span className="section-badge">How it works</span>
          <h2 className="section-title">Up and running in 3 simple steps</h2>
          <p className="section-sub">No IT team, no complex setup. Any school can be live on School CloudX today.</p>
        </div>

        <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginBottom: 80 }}>
          {STEPS.map(({ num, title, desc }) => (
            <div key={num} style={{
              background: '#f8fafe', borderRadius: 20, padding: '32px 24px',
              border: '1.5px solid #e8f0fc', position: 'relative',
              transition: 'transform 0.25s, box-shadow 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,64,160,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              {/* Step number */}
              <div style={{
                fontSize: 48, fontWeight: 900, color: 'rgba(0,64,160,0.07)',
                lineHeight: 1, marginBottom: 16, fontFamily: "'Lato', sans-serif",
                userSelect: 'none',
              }}>{num}</div>
              <div style={{
                width: 40, height: 40, borderRadius: 12, background: '#0040a0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: 14, fontFamily: "'Lato',sans-serif" }}>{num}</span>
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1a1a2e', marginBottom: 10, fontFamily: "'Lato', sans-serif" }}>{title}</h3>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* ── Why CloudX ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center', maxWidth: 1100, margin: '0 auto' }} className="why-grid">

          {/* Left */}
          <div>
            <span className="section-badge">Why School CloudX</span>
            <h2 className="section-title">Built for Indian schools, priced right</h2>
            <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.85, marginBottom: 32, maxWidth: 460 }}>
              Most school software is expensive, complicated, or built for foreign markets.
              School CloudX is designed specifically for schools like yours — simple to use,
              easy on the budget, and backed by real support.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {WHY_POINTS.map(label => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <CheckCircle2 size={20} color='#0040a0' strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 15, fontWeight: 500, color: '#374151', lineHeight: 1.5 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={whyImg}
              alt="School CloudX Dashboard"
              style={{ width: '100%', maxWidth: 480, height: 'auto', display: 'block', filter: 'drop-shadow(0 20px 48px rgba(0,0,0,0.12))' }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width: 900px) {
          .steps-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media(max-width: 600px) {
          .why-grid { gap: 28px !important; }
          #info { padding: 56px 0 !important; }
        }
      `}</style>
    </section>
  )
}
