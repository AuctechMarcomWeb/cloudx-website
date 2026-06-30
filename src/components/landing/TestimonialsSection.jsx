import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Rocket, Gift, Star, Users } from 'lucide-react'

import personPhoto from '../../assets/6561c20cbfb617.710131971700905484.jpg'

const SCHOOLS = [
  {
    personName: 'Mr. Rajesh Sharma',
    role: 'Principal',
    schoolName: 'Maple Grove High School, Delhi',
    photo: personPhoto,
    desc: 'Maple Grove transformed how they manage 1,200+ students. Fee collection, attendance, and parent communication all moved to one platform seamlessly...',
  },
  {
    personName: 'Mrs. Priya Mehta',
    role: 'Admin Head',
    schoolName: 'Crestwood Academy, Mumbai',
    photo: personPhoto,
    desc: 'Crestwood switched from manual registers to School CloudX in under a week. The timetable and exam modules alone saved 10+ hours every month...',
  },
  {
    personName: 'Dr. Suresh Nair',
    role: 'Director',
    schoolName: 'Vidhiya International School, Bengaluru',
    photo: personPhoto,
    desc: 'Parents love getting real-time attendance alerts and fee reminders on the app. Staff communication improved dramatically since moving to CloudX...',
  },
  {
    personName: 'Mr. Amit Patel',
    role: 'Managing Trustee',
    schoolName: 'Sunrise Public School, Ahmedabad',
    photo: personPhoto,
    desc: 'Managing six schools from one super admin dashboard was a dream. School CloudX made it reality with its powerful yet simple interface...',
  },
  {
    personName: 'Sr. Mary Thomas',
    role: 'Headmistress',
    schoolName: "St. Mary's Convent School, Pune",
    photo: personPhoto,
    desc: 'Within 3 days the entire school was live — students, teachers, timetables, everything configured. The onboarding team was exceptional...',
  },
]

const PERKS = [
  { icon: Rocket, title: 'Priority Onboarding',    desc: 'Our team personally helps you set up. No learning curve, no confusion.' },
  { icon: Gift,   title: 'Locked-in Early Pricing', desc: 'Register now and keep the lowest pricing forever as we grow.' },
  { icon: Star,   title: 'Shape the Product',       desc: 'Early schools get direct input on new features built into the platform.' },
  { icon: Users,  title: 'Dedicated Support',       desc: 'A real person to help — not a chatbot. We respond fast.' },
]

const VISIBLE_DESKTOP = 3
const VISIBLE_TABLET  = 2
const VISIBLE_MOBILE  = 1

export default function TestimonialsSection() {
  const navigate  = useNavigate()
  const [start, setStart]   = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(VISIBLE_DESKTOP)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 600)      setVisible(VISIBLE_MOBILE)
      else if (window.innerWidth < 900) setVisible(VISIBLE_TABLET)
      else                              setVisible(VISIBLE_DESKTOP)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const total    = SCHOOLS.length
  const maxStart = Math.max(0, total - visible)

  const goNext = () => setStart(s => (s >= maxStart ? 0 : s + 1))
  const goPrev = () => setStart(s => (s <= 0 ? maxStart : s - 1))

  useEffect(() => {
    if (paused) return
    const id = setInterval(goNext, 4000)
    return () => clearInterval(id)
  }, [paused, start, visible])

  const visibleCards = SCHOOLS.slice(start, start + visible)

  return (
    <section style={{ background: '#fff', padding: 'clamp(48px,8vw,90px) 0 clamp(40px,6vw,80px)' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#0040a0', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
            Our Client Says
          </p>
          <h2 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 800, color: '#1a1a2e', lineHeight: 1.2, fontFamily: "'Lato',sans-serif" }}>
            Why Institutes Love{' '}
            <span style={{ color: '#0040a0' }}>School CloudX?</span>
          </h2>
        </div>

        {/* Cards */}
        <div
          className="testi-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginBottom: 32 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {visibleCards.map(s => <TestiCard key={s.personName} school={s} />)}
        </div>

        {/* Arrows only — no dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          <ArrowBtn onClick={goPrev} dir="left"  />
          <ArrowBtn onClick={goNext} dir="right" />
        </div>

        {/* Early adopter CTA */}
        <div style={{
          marginTop: 72,
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,64,160,0.15)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }} className="cta-strip">

          {/* Left — content */}
          <div className="cta-left" style={{
            background: 'linear-gradient(135deg, #0040a0 0%, #0056cc 100%)',
            padding: 'clamp(28px,4vw,52px) clamp(24px,4vw,48px)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* BG circle deco */}
            <div style={{ position:'absolute', top:-40, left:-40, width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,0.05)', pointerEvents:'none' }} />
            <div style={{ position:'absolute', bottom:-60, right:-20, width:160, height:160, borderRadius:'50%', background:'rgba(255,255,255,0.04)', pointerEvents:'none' }} />

            <div style={{ position:'relative', zIndex:1 }}>
              <div style={{
                display:'inline-flex', alignItems:'center', gap:6,
                background:'rgba(255,213,0,0.15)', border:'1px solid rgba(255,213,0,0.3)',
                borderRadius:50, padding:'4px 14px', marginBottom:20,
              }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#ffd500', display:'inline-block' }} />
                <span style={{ fontSize:11, fontWeight:700, color:'#ffd500', letterSpacing:1, textTransform:'uppercase' }}>Limited Early Access</span>
              </div>

              <h3 style={{ fontSize:'clamp(22px,2.8vw,32px)', fontWeight:800, color:'#fff', margin:'0 0 12px', lineHeight:1.25, fontFamily:"'Lato',sans-serif" }}>
                Start free.<br />Scale as you grow.
              </h3>
              <p style={{ fontSize:14, color:'rgba(255,255,255,0.72)', lineHeight:1.8, margin:'0 0 32px', maxWidth:340 }}>
                Schools that register now get priority onboarding, locked-in pricing, and a dedicated support person — not a chatbot.
              </p>

              <button onClick={() => navigate('/register')} style={{
                display:'inline-flex', alignItems:'center', gap:8,
                padding:'13px 28px', borderRadius:10, border:'none', cursor:'pointer',
                background:'#ffd500', color:'#1a1a2e',
                fontSize:14, fontWeight:700, fontFamily:"'Lato',sans-serif",
                boxShadow:'0 6px 24px rgba(255,213,0,0.35)', transition:'all 0.2s',
              }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 10px 30px rgba(255,213,0,0.45)' }}
                onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 6px 24px rgba(255,213,0,0.35)' }}
              >
                Register your school free →
              </button>
            </div>
          </div>

          {/* Right — perks list */}
          <div className="cta-right" style={{ background:'#f8faff', padding:'clamp(28px,4vw,52px) clamp(24px,4vw,48px)', display:'flex', flexDirection:'column', justifyContent:'center', gap:24 }}>
            {PERKS.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ display:'flex', alignItems:'flex-start', gap:16 }}>
                <div style={{
                  width:42, height:42, borderRadius:10, flexShrink:0,
                  background:'linear-gradient(135deg,#0040a0,#0ea5e9)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <Icon size={18} color="#fff" strokeWidth={1.8} />
                </div>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:'#1a1a2e', marginBottom:3, fontFamily:"'Lato',sans-serif" }}>{title}</div>
                  <div style={{ fontSize:13, color:'#64748b', lineHeight:1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .testi-grid { grid-template-columns: 1fr 1fr !important; }
          .cta-strip  { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .testi-grid { grid-template-columns: 1fr !important; }
          .cta-right  { gap: 16px !important; }
        }
      `}</style>
    </section>
  )
}

/* ── Card ── */
function TestiCard({ school }) {
  return (
    <div style={{
      background: '#e8f0fc',
      borderRadius: 12,
      padding: '28px 22px 22px',
      border: '1px solid #c5d8f8',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      minHeight: 280,
      boxShadow: '0 2px 12px rgba(0,64,160,0.07)',
      transition: 'box-shadow 0.25s, transform 0.25s',
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow='0 10px 32px rgba(0,64,160,0.15)'; e.currentTarget.style.transform='translateY(-4px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow='0 2px 12px rgba(0,64,160,0.07)'; e.currentTarget.style.transform='none' }}
    >
      {/* Person photo — circular with ring + quote badge */}
      <div style={{ position: 'relative', width: 72, height: 72 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          border: '3px solid #c5d8f8',
          padding: 2,
          background: '#fff',
          boxSizing: 'border-box',
        }}>
          <img
            src={school.photo}
            alt={school.personName}
            style={{
              width: '100%', height: '100%',
              borderRadius: '50%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
            }}
          />
        </div>
        {/* Quote badge — overlapping bottom-right */}
        <div style={{
          position: 'absolute', bottom: -4, right: -6,
          width: 26, height: 26, borderRadius: '50%',
          background: '#0040a0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,64,160,0.3)',
        }}>
          <svg width="10" height="8" viewBox="0 0 15 12" fill="none">
            <path d="M0 12V7.909C0 6.576 0.29 5.358 0.87 4.254C1.45 3.15 2.37 2.182 3.636 1.4L5.09 2.682C4.167 3.291 3.504 3.924 3.102 4.582C2.7 5.24 2.5 5.977 2.5 6.795H5.09V12H0ZM8.41 12V7.909C8.41 6.576 8.7 5.358 9.28 4.254C9.86 3.15 10.78 2.182 12.046 1.4L13.5 2.682C12.577 3.291 11.914 3.924 11.512 4.582C11.11 5.24 10.91 5.977 10.91 6.795H13.5V12H8.41Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Person name + school */}
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e', fontFamily: "'Lato',sans-serif", lineHeight: 1.3 }}>
          {school.personName}
        </div>
        <div style={{ fontSize: 12, color: '#0040a0', fontWeight: 600, marginTop: 2 }}>
          {school.role}
        </div>
        <div style={{ fontSize: 12, color: '#64748b', marginTop: 1 }}>
          {school.schoolName}
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontSize: 13, color: '#475569', lineHeight: 1.75, margin: 0, flex: 1,
        display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {school.desc}
      </p>

      {/* Read Case Studies link */}
      <a href="#contact" style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: 13, fontWeight: 700, color: '#e05a00',
        textDecoration: 'none', marginTop: 4,
        transition: 'gap 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.gap = '10px'}
        onMouseLeave={e => e.currentTarget.style.gap = '6px'}
      >
        Read Case Studies <span style={{ fontSize: 16 }}>→</span>
      </a>
    </div>
  )
}

/* ── Arrow button ── */
function ArrowBtn({ onClick, dir }) {
  const [hov, setHov] = useState(false)
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 40, height: 40, borderRadius: '50%',
        border: `1.5px solid ${hov ? '#0040a0' : '#c5d8f8'}`,
        background: hov ? '#0040a0' : '#fff',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 10px rgba(0,64,160,0.10)',
        transition: 'all 0.2s',
      }}
    >
      {dir === 'left'
        ? <ChevronLeft  size={18} color={hov ? '#fff' : '#0040a0'} />
        : <ChevronRight size={18} color={hov ? '#fff' : '#0040a0'} />
      }
    </button>
  )
}
