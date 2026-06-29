import { useNavigate } from 'react-router-dom'
import heroImg from '../../assets/herro Section.png'

// Actual software features only
const FEATURE_PILLS = [
  'Student Management', 'Fees Management', 'Attendance Tracking',
  'Exam Management', 'Lessons & Assignments', 'Timetable',
  'Announcements', 'Staff Management', 'Transportation',
  'Chat Module', 'Parent & Student App', 'School Gallery',
]

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section
      id="home"
      style={{
        background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f0fc 50%, #f7f9ff 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* BG dot pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'radial-gradient(circle, rgba(0,64,160,0.10) 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px',
      }} />
      {/* Animated orbs */}
      <div style={{ position:'absolute', top: -80, left: -80, width: 400, height: 400, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,64,160,0.13) 0%, transparent 70%)', pointerEvents:'none', zIndex:0, animation:'float 6s ease-in-out infinite' }} />
      <div style={{ position:'absolute', bottom: -60, right: -60, width: 360, height: 360, borderRadius:'50%', background:'radial-gradient(circle, rgba(224,192,0,0.12) 0%, transparent 70%)', pointerEvents:'none', zIndex:0, animation:'float 8s ease-in-out infinite 1.5s' }} />
      <div style={{ position:'absolute', top:'40%', right:'15%', width: 200, height: 200, borderRadius:'50%', background:'radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 70%)', pointerEvents:'none', zIndex:0, animation:'float 5s ease-in-out infinite 0.8s' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '55% 45%',
          gap: 48,
          alignItems: 'center',
          paddingTop: 80,
          paddingBottom: 80,
        }} className="hero-grid">

          {/* ── LEFT TEXT ── */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

            <h1 style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 700,
              color: '#1a1a2e',
              lineHeight: 1.1,
              letterSpacing: '-0.5px',
              marginBottom: 20,
            }} className="hero-h1">
              Transform School<br />Management<br />
              <span style={{ color: '#0040a0' }}>With School CloudX</span>
            </h1>

            <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.75, marginBottom: 32, maxWidth: 560 }}>
              One platform for your entire school — manage students, teachers, fees, exams,
              timetables, attendance, assignments, and parent communication. Everything your
              school needs, in one place.
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
                  background: '#fff', border: '1.5px solid #ccdaf5',
                  fontSize: 12, fontWeight: 500, color: '#374151',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0040a0', flexShrink: 0 }} />
                  {f}
                </span>
              ))}
              <button
                onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
                style={{ padding: '6px 16px', fontSize: 12, borderRadius: 999, boxShadow: '0 3px 10px rgba(0,64,160,0.35)' }}
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
              background: 'radial-gradient(circle, rgba(0,64,160,0.15) 0%, transparent 70%)',
            }} />

            {/* Floating card: Free Trial */}
            <div className="hero-float-left" style={{
              position: 'absolute', bottom: 80, left: -10, zIndex: 10,
              background: '#fff', borderRadius: 16, padding: '14px 18px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              animation: 'float 3.5s ease-in-out infinite',
              minWidth: 160,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: 'linear-gradient(135deg,#e0c000,#b89a00)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                }}>🎓</div>
                <div>
                  <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>No card needed</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e' }}>30-Day Free Trial</div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: '#0040a0', fontWeight: 600, textAlign: 'center' }}>Start today, cancel anytime</div>
            </div>

            {/* Floating card: Setup time */}
            <div className="hero-float-right" style={{
              position: 'absolute', top: 30, right: -10, zIndex: 10,
              background: '#fff', borderRadius: 14, padding: '12px 16px',
              boxShadow: '0 8px 28px rgba(0,0,0,0.1)',
              animation: 'float 4s ease-in-out infinite 0.8s',
              maxWidth: 190,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#22c55e' }}>Live in 10 minutes</span>
              </div>
              <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>
                <span style={{ fontWeight: 700, color: '#0040a0' }}>Zero setup cost.</span>
                <br />Your school is online today.
              </div>
            </div>

            <img
              src={heroImg}
              alt="School CloudX"
              className="hero-img"
              style={{
                width: '100%', maxWidth: 520, height: 'auto',
                display: 'block', position: 'relative', zIndex: 1,
                filter: 'drop-shadow(0 20px 40px rgba(0,64,160,0.2))',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding-top: 48px !important;
            padding-bottom: 48px !important;
            gap: 36px !important;
          }
          .hero-img { max-width: 360px !important; margin: 0 auto !important; }
          .hero-float-left  { display: none !important; }
          .hero-float-right { display: none !important; }
        }
        @media (max-width: 600px) {
          .hero-grid {
            padding-top: 32px !important;
            padding-bottom: 40px !important;
            gap: 28px !important;
          }
          .hero-h1 { font-size: 26px !important; }
          .hero-img { max-width: 100% !important; }
        }
      `}</style>
    </section>
  )
}
