import { useNavigate } from 'react-router-dom'
import heroImg from '../../assets/herro Section.png'

const FEATURE_PILLS = [
  'Student management','Academics management','Slider management',
  'Teacher management','Session year management','Holiday management',
  'Timetable management','Attendance management','Exam management',
]

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section
      id="home"
      style={{
        background: 'linear-gradient(135deg, #f0fdf9 0%, #e8faf6 50%, #f0fdf9 100%)',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* BG dot pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'radial-gradient(circle, rgba(27,188,155,0.12) 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
          minHeight: 'calc(100vh - 68px)',
          paddingTop: 80,
          paddingBottom: 80,
        }}>

          {/* ── LEFT TEXT ── */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

            <p style={{ fontSize: 13, fontWeight: 600, color: '#1bbc9b', marginBottom: 16, letterSpacing: '0.3px' }}>
              Transform School Management With School CloudX
            </p>

            <h1 style={{
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 700,
              color: '#1a1a2e',
              lineHeight: 1.1,
              letterSpacing: '-0.5px',
              marginBottom: 20,
            }}>
              Transform School<br />Management<br />
              <span style={{ color: '#1bbc9b' }}>With School CloudX</span>
            </h1>

            <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
              Experience the future of education with our CloudX platform. Streamline
              attendance, assignments, exams, and more. Elevate your school's efficiency and engagement.
            </p>

            {/* CTA buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 40 }}>
              <button onClick={() => navigate('/register')} className="btn-primary">
                Register your school
              </button>
              <button
                onClick={() => window.open('https://crestwood-academy.eschool-saas.wrteam.me/', '_blank')}
                className="btn-outline"
              >
                Demo school
              </button>
            </div>

            {/* Feature pills */}
            <p style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 12 }}>
              Opt for CloudX — 14+ robust features for an enhanced educational experience
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {FEATURE_PILLS.map(f => (
                <span key={f} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '6px 14px', borderRadius: 999,
                  background: '#fff', border: '1.5px solid #d1f5ee',
                  fontSize: 12, fontWeight: 500, color: '#374151',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1bbc9b', flexShrink: 0 }} />
                  {f}
                </span>
              ))}
              <button
                onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
                style={{ padding: '6px 16px', fontSize: 12, borderRadius: 999, boxShadow: '0 3px 10px rgba(27,188,155,0.35)' }}
              >
                View more features →
              </button>
            </div>
          </div>

          {/* ── RIGHT IMAGE ── */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Glow */}
            <div style={{
              position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
              width: 420, height: 420, top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              background: 'radial-gradient(circle, rgba(27,188,155,0.15) 0%, transparent 70%)',
            }} />

            {/* Floating card: Top Rated */}
            <div style={{
              position: 'absolute', bottom: 80, left: -10, zIndex: 10,
              background: '#fff', borderRadius: 16, padding: '14px 18px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              animation: 'float 3.5s ease-in-out infinite',
              minWidth: 160,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: 'linear-gradient(135deg,#1bbc9b,#0e9f82)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                }}>⭐</div>
                <div>
                  <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>Rating</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e' }}>4.9 / 5.0</div>
                </div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1a1a2e', textAlign: 'center' }}>Top Rated Instructors</div>
            </div>

            {/* Floating card: Features */}
            <div style={{
              position: 'absolute', top: 30, right: -10, zIndex: 10,
              background: '#fff', borderRadius: 14, padding: '12px 16px',
              boxShadow: '0 8px 28px rgba(0,0,0,0.1)',
              animation: 'float 4s ease-in-out infinite 0.8s',
              maxWidth: 200, fontSize: 12, color: '#64748b', lineHeight: 1.5,
            }}>
              <span style={{ fontWeight: 700, color: '#1bbc9b' }}>Opt for School CloudX</span>
              <br />14+ robust features for an enhanced educational experience.
            </div>

            <img
              src={heroImg}
              alt="School CloudX"
              style={{
                width: '100%', maxWidth: 520, height: 'auto',
                display: 'block', position: 'relative', zIndex: 1,
                filter: 'drop-shadow(0 20px 40px rgba(27,188,155,0.2))',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #home .container > div {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
            padding-top: 48px !important;
            padding-bottom: 48px !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  )
}
