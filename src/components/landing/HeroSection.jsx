import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import heroImg from '../../assets/herro Section.png'

const FEATURE_PILLS = [
  'Student management','Academics management','Slider management',
  'Teacher management','Session year management','Holiday management',
  'Timetable management','Attendance management','Exam management',
]

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section id="home" style={{
      background: 'linear-gradient(135deg, #f0fdf9 0%, #e8faf6 50%, #f0fdf9 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: 0,
    }}>

      {/* BG dot pattern */}
      <div style={{
        position:'absolute', inset:0, zIndex:0,
        backgroundImage:'radial-gradient(circle, rgba(27,188,155,0.12) 1.5px, transparent 1.5px)',
        backgroundSize:'28px 28px',
        pointerEvents:'none',
      }} />

      <div className="container" style={{ position:'relative', zIndex:1, width:'100%' }}>
        <div style={{
          display:'grid',
          gridTemplateColumns:'1fr 1fr',
          gap:48,
          alignItems:'center',
          minHeight:'calc(100vh - 68px)',
          paddingTop:40,
          paddingBottom:40,
        }} className="hero-grid">

          {/* ── LEFT TEXT ── */}
          <div>
            {/* small top label */}
            <p style={{ fontSize:13, fontWeight:600, color:'#1bbc9b', marginBottom:16, letterSpacing:0.3 }}>
              Transform School Management With School CloudX
            </p>

            <h1 style={{
              fontSize:'clamp(32px,4vw,52px)',
              fontWeight:800,
              lineHeight:1.15,
              color:'#1a1a2e',
              fontFamily:"'Poppins',sans-serif",
              marginBottom:20,
              letterSpacing:'-0.5px',
            }}>
              Transform School<br />Management<br />
              <span style={{ color:'#1bbc9b' }}>With School CloudX</span>
            </h1>

            <p style={{ fontSize:16, color:'#64748b', lineHeight:1.75, marginBottom:32, maxWidth:480 }}>
              Experience the future of education with our CloudX platform. Streamline
              attendance, assignments, exams, and more. Elevate your school's efficiency and engagement.
            </p>

            {/* CTA buttons */}
            <div style={{ display:'flex', gap:14, flexWrap:'wrap', marginBottom:48 }}>
              <button onClick={() => navigate('/register')} style={{
                display:'inline-flex', alignItems:'center', gap:8,
                padding:'13px 28px',
                background:'linear-gradient(135deg,#1bbc9b,#0e9f82)',
                color:'#fff', border:'none', borderRadius:8,
                fontSize:15, fontWeight:600, cursor:'pointer',
                boxShadow:'0 6px 24px rgba(27,188,155,0.4)',
                transition:'all 0.22s',
              }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 10px 32px rgba(27,188,155,0.5)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 6px 24px rgba(27,188,155,0.4)'}}
              >Register your school</button>

              <button onClick={() => window.open('https://crestwood-academy.eschool-saas.wrteam.me/','_blank')} style={{
                display:'inline-flex', alignItems:'center', gap:8,
                padding:'13px 28px',
                background:'transparent',
                color:'#1bbc9b', border:'2px solid #1bbc9b',
                borderRadius:8, fontSize:15, fontWeight:600, cursor:'pointer',
                transition:'all 0.22s',
              }}
                onMouseEnter={e=>{e.currentTarget.style.background='#1bbc9b';e.currentTarget.style.color='#fff'}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='#1bbc9b'}}
              >Demo school</button>
            </div>

            {/* Feature pills label */}
            <p style={{ fontSize:12.5, color:'#94a3b8', fontWeight:600, letterSpacing:1, textTransform:'uppercase', marginBottom:14 }}>
              Opt for CloudX &mdash; 14+ robust features for an enhanced educational experience
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {FEATURE_PILLS.map(f => (
                <span key={f} style={{
                  display:'inline-flex', alignItems:'center', gap:6,
                  padding:'6px 14px', borderRadius:50,
                  background:'#fff',
                  border:'1.5px solid #d1f5ee',
                  fontSize:12.5, fontWeight:500, color:'#374151',
                  boxShadow:'0 1px 4px rgba(0,0,0,0.04)',
                }}>
                  <span style={{ width:6,height:6,borderRadius:'50%',background:'#1bbc9b',flexShrink:0 }} />
                  {f}
                </span>
              ))}
              <button onClick={() => document.querySelector('#features')?.scrollIntoView({behavior:'smooth'})}
                style={{ display:'inline-flex',alignItems:'center',gap:6,padding:'6px 16px',borderRadius:50,background:'linear-gradient(135deg,#1bbc9b,#0e9f82)',fontSize:12.5,fontWeight:600,color:'#fff',border:'none',cursor:'pointer',boxShadow:'0 3px 10px rgba(27,188,155,0.35)' }}>
                View more features →
              </button>
            </div>
          </div>

          {/* ── RIGHT IMAGE ── */}
          <div style={{ position:'relative', display:'flex', justifyContent:'center', alignItems:'center' }}>

            {/* Green circle glow behind image */}
            <div style={{
              position:'absolute', top:'50%', left:'50%',
              transform:'translate(-50%,-50%)',
              width:420, height:420, borderRadius:'50%',
              background:'radial-gradient(circle, rgba(27,188,155,0.15) 0%, transparent 70%)',
              pointerEvents:'none',
            }} />

            {/* Floating card: Top Rated */}
            <div style={{
              position:'absolute', bottom:80, left:-10, zIndex:10,
              background:'#fff', borderRadius:16, padding:'14px 18px',
              boxShadow:'0 8px 32px rgba(0,0,0,0.12)',
              animation:'float 3.5s ease-in-out infinite',
              minWidth:160,
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#1bbc9b,#0e9f82)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ fontSize:16 }}>⭐</span>
                </div>
                <div>
                  <div style={{ fontSize:11, color:'#94a3b8', fontWeight:500 }}>Rating</div>
                  <div style={{ fontSize:13, fontWeight:700, color:'#1a1a2e' }}>4.9 / 5.0</div>
                </div>
              </div>
              <div style={{ fontSize:12, fontWeight:700, color:'#1a1a2e', textAlign:'center' }}>Top Rated Instructors</div>
            </div>

            {/* Floating card: Features */}
            <div style={{
              position:'absolute', top:30, right:-10, zIndex:10,
              background:'#fff', borderRadius:14, padding:'12px 16px',
              boxShadow:'0 8px 28px rgba(0,0,0,0.1)',
              animation:'float 4s ease-in-out infinite 0.8s',
              maxWidth:200, fontSize:12, color:'#64748b', lineHeight:1.5,
            }}>
              <span style={{ fontWeight:700, color:'#1bbc9b' }}>Opt for School CloudX</span>
              <br />14+ robust features for an enhanced educational experience.
            </div>

            {/* Main image */}
            <img
              src={heroImg}
              alt="School CloudX"
              style={{
                width:'100%',
                maxWidth:540,
                height:'auto',
                display:'block',
                position:'relative',
                zIndex:1,
                filter:'drop-shadow(0 20px 40px rgba(27,188,155,0.2))',
              }}
            />
          </div>

        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .hero-grid{grid-template-columns:1fr!important;min-height:auto!important;padding-top:40px!important;}
        }
      `}</style>
    </section>
  )
}
