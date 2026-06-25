import { Star, Quote } from 'lucide-react'

const TESTIMONIALS = [
  { name:'Ramesh Kumar', role:'Principal, DPS Lucknow', initials:'RK', color:'#1bbc9b', grad:'linear-gradient(135deg,#1bbc9b,#0e9f82)', quote:'School CloudX has completely transformed our school management. Fee collection and attendance tracking are now effortless for our entire staff.', stars:5 },
  { name:'Sunita Sharma', role:"Director, St. Mary's School, Kanpur", initials:'SS', color:'#0ea5e9', grad:'linear-gradient(135deg,#0ea5e9,#0284c7)', quote:'We used to rely on 4 different software tools. Now everything is in one place — School CloudX. Staff save time, and parents are happy.', stars:5 },
  { name:'Arvind Singh', role:'Administrator, Modern Academy, Agra', initials:'AS', color:'#8b5cf6', grad:'linear-gradient(135deg,#8b5cf6,#7c3aed)', quote:'We were convinced within the 30-day trial. Setup was straightforward and the support team guided us every step of the way. Highly recommended.', stars:5 },
]

export default function TestimonialsSection() {
  return (
    <section style={{ background:'#f8fffe', padding:'80px 0' }}>
      <div className="container">
        <div style={{ textAlign:'center', marginBottom:52 }}>
          <span style={{ display:'inline-block',fontSize:12,fontWeight:700,color:'#1bbc9b',letterSpacing:2,textTransform:'uppercase',background:'rgba(27,188,155,0.08)',padding:'5px 16px',borderRadius:50,marginBottom:14 }}>Testimonials</span>
          <h2 style={{ fontSize:'clamp(26px,4vw,42px)',fontWeight:800,color:'#1a1a2e',marginBottom:14 }}>Schools already using School CloudX</h2>
          <p style={{ color:'#64748b',fontSize:16,lineHeight:1.7,maxWidth:500,margin:'0 auto' }}>Trusted by hundreds of schools. Here's what some of our users have to say.</p>
        </div>

        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))',gap:24 }}>
          {TESTIMONIALS.map(({ name, role, initials, color, grad, quote, stars }, i) => (
            <div key={name} style={{ background:'#fff',border:'1.5px solid #e8faf6',borderRadius:20,padding:'30px 26px',position:'relative',overflow:'hidden',animation:`fadeInUp 0.5s ease ${i*0.1}s both`,transition:'all 0.25s' }}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow=`0 16px 40px ${color}18`;e.currentTarget.style.borderColor=`${color}30`}}
              onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='';e.currentTarget.style.borderColor='#e8faf6'}}
            >
              <div style={{ position:'absolute',top:0,left:0,right:0,height:3,background:grad }} />
              <div style={{ position:'absolute',top:18,right:22,opacity:0.06 }}><Quote size={52} color={color} /></div>
              <div style={{ display:'flex',gap:3,marginBottom:14,marginTop:8 }}>
                {Array.from({length:stars}).map((_,j)=><Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />)}
              </div>
              <p style={{ fontSize:14.5,color:'#374151',lineHeight:1.8,marginBottom:24,fontStyle:'italic' }}>"{quote}"</p>
              <div style={{ display:'flex',alignItems:'center',gap:12 }}>
                <div style={{ width:46,height:46,borderRadius:'50%',background:grad,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:14,color:'#fff',flexShrink:0,boxShadow:`0 4px 12px ${color}40` }}>{initials}</div>
                <div>
                  <div style={{ fontWeight:700,fontSize:14,color:'#1a1a2e' }}>{name}</div>
                  <div style={{ fontSize:12.5,color:'#94a3b8',marginTop:2 }}>{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
