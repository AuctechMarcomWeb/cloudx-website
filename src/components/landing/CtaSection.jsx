import { useNavigate } from 'react-router-dom'
import { ArrowRight, Zap } from 'lucide-react'

export default function CtaSection() {
  const navigate = useNavigate()
  return (
    <section id="contact" className="section">
      <div className="container">
        <div style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(59,130,246,0.15))',
          border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: 28, padding: 'clamp(40px,6vw,80px)',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          {/* glow */}
          <div style={{
            position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
            width: 600, height: 400, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <span className="badge badge-trial" style={{ marginBottom: 20, display: 'inline-flex' }}>
              <Zap size={11} /> 30 din free trial — koi credit card nahi
            </span>
            <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
              Aaj hi apni school ko<br />
              <span className="gradient-text">digital banao</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.7 }}>
              5 minutes mein register karo. Credentials email pe milenge. Kal se school digital.
            </p>
            <button
              onClick={() => navigate('/register')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '18px 40px',
                background: 'linear-gradient(135deg,#6366f1,#3b82f6)',
                color: '#fff', border: 'none', borderRadius: 16,
                fontSize: 17, fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 16px 50px rgba(99,102,241,0.45)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(99,102,241,0.55)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 16px 50px rgba(99,102,241,0.45)' }}
            >
              Abhi Shuru Karo <ArrowRight size={20} />
            </button>
            <p style={{ marginTop: 16, fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
              Already registered? <a href="#" style={{ color: '#818cf8', textDecoration: 'none' }}>Login karein</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
