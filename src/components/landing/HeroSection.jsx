import { useNavigate } from 'react-router-dom'
import { ArrowRight, Play, Users, BookOpen, Award } from 'lucide-react'

const STATS = [
  { icon: Users,    value: '500+',  label: 'Schools' },
  { icon: BookOpen, value: '2L+',   label: 'Students' },
  { icon: Award,    value: '99.9%', label: 'Uptime' },
]

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '100px 0 80px' }}>

      {/* Background glows */}
      <div style={{
        position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 800, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(4,41,84,0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 100, right: -100,
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(250,191,34,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Badge */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 50,
            background: 'rgba(4,41,84,0.3)',
            border: '1px solid rgba(250,191,34,0.4)',
            fontSize: 13, fontWeight: 500, color: '#fabf22',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fabf22', display: 'inline-block', animation: 'pulse-ring 1.5s ease infinite' }} />
            India's #1 School Management SaaS
          </span>
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 800, lineHeight: 1.1,
          textAlign: 'center', marginBottom: 24,
          letterSpacing: '-1px',
        }}>
          Take Your School{' '}
          <span className="gradient-text">Digital</span>
          <br />Today — in 30 Minutes
        </h1>

        <p style={{
          textAlign: 'center', fontSize: 18, color: 'rgba(255,255,255,0.55)',
          maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.7,
        }}>
          Admissions, Fees, Attendance, Marksheets, Transport — everything on one platform.
          No IT team needed. Set up, log in, and get started.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}>
          <button
            onClick={() => navigate('/register')}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '16px 32px',
              background: 'linear-gradient(135deg,#042954,#051f3e)',
              color: '#fff', border: 'none', borderRadius: 14,
              fontSize: 16, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 12px 40px rgba(4,41,84,0.5)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = ''}
          >
            Get Started Free <ArrowRight size={18} />
          </button>
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '16px 32px',
              background: 'rgba(255,255,255,0.06)',
              color: '#fff',
              border: '1.5px solid rgba(255,255,255,0.12)',
              borderRadius: 14, fontSize: 16, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
          >
            <Play size={16} /> Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 48,
          flexWrap: 'wrap',
        }}>
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 4 }}>
                <Icon size={18} color="#fabf22" />
                <span style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>{value}</span>
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
