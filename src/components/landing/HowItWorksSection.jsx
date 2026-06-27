import { CheckCircle } from 'lucide-react'
import whyImg from '../../assets/682c33c666a931.887378031747727302.png'

const SCHOOLS = [
  { name: 'Maple Grove High School', initials: 'MG', color: '#1bbc9b', grad: 'linear-gradient(135deg,#1bbc9b,#0e9f82)' },
  { name: 'Crestwood Academy',       initials: 'CA', color: '#0ea5e9', grad: 'linear-gradient(135deg,#0ea5e9,#0284c7)' },
  { name: 'Vidhiya School',          initials: 'VS', color: '#8b5cf6', grad: 'linear-gradient(135deg,#8b5cf6,#7c3aed)' },
]

export default function HowItWorksSection() {
  return (
    <>
      {/* ── Schools ── */}
      <section style={{ background: '#f8fffe', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="section-badge">Schools</span>
            <h2 className="section-title">Schools on CloudX</h2>
            <p className="section-sub">Trusted by schools across the country managing everything with School CloudX.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 920, margin: '0 auto' }}>
            {SCHOOLS.map(({ name, initials, color, grad }) => (
              <div key={name} className="card" style={{ textAlign: 'center' }}>
                <div style={{
                  width: 80, height: 80, borderRadius: '50%', background: grad,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26, fontWeight: 700, color: '#fff',
                  margin: '0 auto 20px',
                  boxShadow: `0 8px 24px ${color}35`,
                }}>
                  {initials}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1a1a2e', marginBottom: 10 }}>{name}</h3>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  borderRadius: 999, padding: '4px 14px',
                  fontSize: 12, fontWeight: 600,
                  background: `${color}18`, color,
                }}>
                  <CheckCircle size={12} /> Active School
                </span>
              </div>
            ))}
          </div>
        </div>

        <style>{`@media(max-width:768px){.schools-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ── Why it is best ── */}
      <section id="info" style={{ background: '#fff', padding: '80px 0', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center', maxWidth: 1100, margin: '0 auto' }}>

            {/* Left */}
            <div>
              <div style={{ borderLeft: '3px solid #1bbc9b', paddingLeft: 14, marginBottom: 20 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#1bbc9b', margin: 0 }}>A modern and unique style</p>
              </div>

              <h2 className="section-title">Why it is best?</h2>

              <p style={{ fontSize: 15.5, color: '#64748b', lineHeight: 1.85, marginBottom: 36, maxWidth: 460 }}>
                School CloudX is the pinnacle of school management, offering advanced technology,
                user-friendly features, and personalized solutions. It simplifies communication,
                streamlines administrative tasks, and elevates the educational experience for all
                stakeholders. With School CloudX, excellence in education management is guaranteed.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {['Affordable price', 'Easy to manage admin panel', 'Data Security'].map(label => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                      border: '2px solid #1bbc9b',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                        <path d="M1 4.5L4 7.5L10 1" stroke="#1bbc9b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 600, color: '#374151' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={whyImg}
                alt="Why it is best"
                style={{ width: '100%', maxWidth: 480, height: 'auto', display: 'block', filter: 'drop-shadow(0 20px 48px rgba(0,0,0,0.12))' }}
              />
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){#info .container > div{grid-template-columns:1fr!important;gap:40px!important}}`}</style>
      </section>
    </>
  )
}
