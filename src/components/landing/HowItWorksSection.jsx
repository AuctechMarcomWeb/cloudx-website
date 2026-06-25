import { CheckCircle } from 'lucide-react'

const SCHOOLS = [
  { name:'Maple Grove High School', initials:'MG', color:'#1bbc9b', grad:'linear-gradient(135deg,#1bbc9b,#0e9f82)' },
  { name:'Crestwood Academy',       initials:'CA', color:'#0ea5e9', grad:'linear-gradient(135deg,#0ea5e9,#0284c7)' },
  { name:'Vidhiya School',          initials:'VS', color:'#8b5cf6', grad:'linear-gradient(135deg,#8b5cf6,#7c3aed)' },
]

export default function HowItWorksSection() {
  return (
    <>
      {/* Schools */}
      <section style={{ background:'#f8fffe', padding:'80px 0' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <span style={{ display:'inline-block',fontSize:12,fontWeight:700,color:'#1bbc9b',letterSpacing:2,textTransform:'uppercase',background:'rgba(27,188,155,0.08)',padding:'5px 16px',borderRadius:50,marginBottom:14 }}>Schools</span>
            <h2 style={{ fontSize:'clamp(26px,4vw,42px)',fontWeight:800,color:'#1a1a2e',marginBottom:14 }}>Schools on CloudX</h2>
            <p style={{ color:'#64748b',fontSize:16,lineHeight:1.7,maxWidth:500,margin:'0 auto' }}>Trusted by schools across the country managing everything with School CloudX.</p>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:24,maxWidth:920,margin:'0 auto' }}>
            {SCHOOLS.map(({ name, initials, color, grad }, i) => (
              <div key={name} style={{ background:'#fff',border:'1.5px solid #e8faf6',borderRadius:20,padding:'36px 28px',textAlign:'center',animation:`fadeInUp 0.45s ease ${i*0.1}s both`,transition:'all 0.25s',boxShadow:'0 2px 12px rgba(0,0,0,0.04)' }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow=`0 16px 40px ${color}22`;e.currentTarget.style.borderColor=`${color}40`}}
                onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 2px 12px rgba(0,0,0,0.04)';e.currentTarget.style.borderColor='#e8faf6'}}
              >
                <div style={{ width:80,height:80,borderRadius:'50%',background:grad,display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,fontWeight:800,color:'#fff',margin:'0 auto 20px',boxShadow:`0 8px 24px ${color}35` }}>{initials}</div>
                <h3 style={{ fontSize:17,fontWeight:700,color:'#1a1a2e',marginBottom:10 }}>{name}</h3>
                <div style={{ display:'inline-flex',alignItems:'center',gap:6,background:`${color}10`,color,borderRadius:50,padding:'4px 14px',fontSize:12,fontWeight:600 }}>
                  <CheckCircle size={12} /> Active School
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it is best */}
      <section id="info" style={{ background:'linear-gradient(135deg,#e8faf6 0%,#d1f5ee 50%,#e8faf6 100%)', padding:'80px 0' }}>
        <div className="container">
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'center' }} className="why-grid">

            <div>
              <p style={{ fontSize:12,fontWeight:700,color:'#1bbc9b',letterSpacing:2,textTransform:'uppercase',marginBottom:12 }}>A modern and unique style</p>
              <h2 style={{ fontSize:'clamp(28px,4vw,46px)',fontWeight:800,color:'#1a1a2e',marginBottom:20,lineHeight:1.15,fontFamily:"'Poppins',sans-serif" }}>Why it is best?</h2>
              <p style={{ color:'#64748b',fontSize:16,lineHeight:1.8,marginBottom:32 }}>
                School CloudX is the pinnacle of school management, offering advanced technology,
                user-friendly features, and personalized solutions. It simplifies communication,
                streamlines administrative tasks, and elevates the educational experience for all
                stakeholders. With School CloudX, excellence in education management is guaranteed.
              </p>
              <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
                {[
                  { label:'Affordable price',           color:'#1bbc9b' },
                  { label:'Easy to manage admin panel', color:'#0ea5e9' },
                  { label:'Data Security',              color:'#8b5cf6' },
                  { label:'Flexible pricing packages',  color:'#f59e0b' },
                ].map(({ label, color }) => (
                  <div key={label} style={{ display:'flex',alignItems:'center',gap:14,background:'#fff',padding:'14px 20px',borderRadius:12,border:'1px solid #e8faf6',boxShadow:'0 1px 6px rgba(0,0,0,0.04)',fontSize:14.5,fontWeight:600,color:'#374151' }}>
                    <div style={{ width:10,height:10,borderRadius:'50%',background:color,flexShrink:0,boxShadow:`0 0 8px ${color}99` }} />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard card */}
            <div style={{ position:'relative' }}>
              <div style={{ background:'#fff',borderRadius:24,boxShadow:'0 20px 60px rgba(27,188,155,0.15)',overflow:'hidden',border:'1px solid rgba(27,188,155,0.12)' }}>
                <div style={{ background:'linear-gradient(135deg,#1bbc9b,#0e9f82)',padding:'24px 28px',display:'flex',alignItems:'center',gap:14 }}>
                  <div style={{ width:46,height:46,borderRadius:12,background:'rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:800,color:'#fff' }}>SC</div>
                  <div>
                    <div style={{ color:'#fff',fontWeight:700,fontSize:16 }}>School CloudX</div>
                    <div style={{ color:'rgba(255,255,255,0.75)',fontSize:12 }}>Super Admin Dashboard</div>
                  </div>
                </div>
                <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:1,background:'#f1f5f9' }}>
                  {[
                    { label:'Total Schools',  val:'127',     color:'#1bbc9b' },
                    { label:'Total Students', val:'1,24,800',color:'#0ea5e9' },
                    { label:'Total Teachers', val:'8,940',   color:'#8b5cf6' },
                    { label:'Revenue',        val:'$48.2k',  color:'#f59e0b' },
                  ].map(({ label, val, color }) => (
                    <div key={label} style={{ background:'#fff',padding:'20px 22px' }}>
                      <div style={{ fontSize:12,color:'#94a3b8',fontWeight:600,marginBottom:6 }}>{label}</div>
                      <div style={{ fontSize:22,fontWeight:800,color }}>{val}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding:'20px 24px' }}>
                  <div style={{ fontSize:12,fontWeight:700,color:'#374151',marginBottom:12 }}>Monthly Enrollment</div>
                  <div style={{ display:'flex',gap:4,alignItems:'flex-end',height:60 }}>
                    {[40,55,38,70,52,80,61,88,72,76,65,90].map((h,i)=>(
                      <div key={i} style={{ flex:1,height:`${h}%`,background:i===11?'linear-gradient(180deg,#1bbc9b,#0e9f82)':`rgba(27,188,155,${0.12+i*0.04})`,borderRadius:'3px 3px 0 0' }} />
                    ))}
                  </div>
                  <div style={{ display:'flex',justifyContent:'space-between',marginTop:6 }}>
                    {['J','F','M','A','M','J','J','A','S','O','N','D'].map(m=>(
                      <span key={m} style={{ fontSize:9,color:'#94a3b8',flex:1,textAlign:'center' }}>{m}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ position:'absolute',bottom:-16,left:-20,background:'#fff',borderRadius:14,padding:'12px 18px',boxShadow:'0 8px 28px rgba(27,188,155,0.2)',border:'1px solid rgba(27,188,155,0.15)',display:'flex',alignItems:'center',gap:10,animation:'float 3.5s ease-in-out infinite' }}>
                <div style={{ width:32,height:32,borderRadius:'50%',background:'linear-gradient(135deg,#1bbc9b,#0e9f82)',display:'flex',alignItems:'center',justifyContent:'center' }}>
                  <CheckCircle size={16} color="#fff" />
                </div>
                <div>
                  <div style={{ fontSize:12,fontWeight:700,color:'#1a1a2e' }}>99.9% Uptime</div>
                  <div style={{ fontSize:10,color:'#94a3b8' }}>Always available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.why-grid{grid-template-columns:1fr!important}}`}</style>
      </section>
    </>
  )
}
