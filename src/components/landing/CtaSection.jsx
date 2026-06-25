import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Phone, Mail, MapPin, Send, Smartphone } from 'lucide-react'

export default function CtaSection() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name:'', email:'', message:'' })
  }

  return (
    <>
      {/* ── Contact ── */}
      <section id="contact" style={{ background:'#fff', padding:'80px 0' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <span style={{ display:'inline-block',fontSize:12,fontWeight:700,color:'#1bbc9b',letterSpacing:2,textTransform:'uppercase',background:'rgba(27,188,155,0.08)',padding:'5px 16px',borderRadius:50,marginBottom:14 }}>Contact</span>
            <h2 style={{ fontSize:'clamp(26px,4vw,42px)',fontWeight:800,color:'#1a1a2e',marginBottom:14 }}>Let's get in touch</h2>
            <p style={{ color:'#64748b',maxWidth:480,margin:'0 auto',fontSize:16,lineHeight:1.7 }}>Have a question or just want to say hi? We'd love to hear from you.</p>
          </div>

          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:40,maxWidth:960,margin:'0 auto',alignItems:'start' }}>
            <div style={{ background:'#f8fffe',borderRadius:20,border:'1.5px solid #e8faf6',padding:'36px 32px',boxShadow:'0 4px 20px rgba(27,188,155,0.06)' }}>
              <form onSubmit={handleSubmit} style={{ display:'flex',flexDirection:'column',gap:18 }}>
                <div>
                  <label style={{ display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:7 }}>Your Name</label>
                  <input className="dark-input" type="text" placeholder="e.g. Ramesh Sharma" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required />
                </div>
                <div>
                  <label style={{ display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:7 }}>Email Address</label>
                  <input className="dark-input" type="email" placeholder="you@school.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required />
                </div>
                <div>
                  <label style={{ display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:7 }}>Message</label>
                  <textarea className="dark-input" rows={4} placeholder="How can we help you?" value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} required style={{ height:'auto',padding:'12px 16px' }} />
                </div>
                <button type="submit" style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:8,padding:'13px',background:'linear-gradient(135deg,#1bbc9b,#0e9f82)',color:'#fff',border:'none',borderRadius:12,fontSize:15,fontWeight:600,cursor:'pointer',boxShadow:'0 6px 20px rgba(27,188,155,0.35)',transition:'all 0.2s',fontFamily:'inherit' }}
                  onMouseEnter={e=>e.currentTarget.style.transform='translateY(-1px)'}
                  onMouseLeave={e=>e.currentTarget.style.transform=''}>
                  {sent ? '✓ Message Sent!' : <><Send size={16} /> Send</>}
                </button>
              </form>
            </div>

            <div style={{ display:'flex',flexDirection:'column',gap:20,paddingTop:8 }}>
              {[
                { Icon:Phone,  label:'Phone',    color:'#1bbc9b', bg:'rgba(27,188,155,0.08)',  value:'Mobile : 1234567890' },
                { Icon:Mail,   label:'Email',    color:'#0ea5e9', bg:'rgba(14,165,233,0.08)',  value:'example@gmail.com' },
                { Icon:MapPin, label:'Location', color:'#8b5cf6', bg:'rgba(139,92,246,0.08)', value:'#262-263, Time Square Empire, SH 42 Mirjapar highway, Bhuj - Kutch 370001 Gujarat India.' },
              ].map(({ Icon, label, color, bg, value }) => (
                <div key={label} style={{ display:'flex',alignItems:'flex-start',gap:16,background:'#f8fffe',borderRadius:14,border:'1.5px solid #e8faf6',padding:'18px 20px',boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ width:44,height:44,borderRadius:12,flexShrink:0,background:bg,display:'flex',alignItems:'center',justifyContent:'center' }}>
                    <Icon size={20} color={color} />
                  </div>
                  <div>
                    <div style={{ fontSize:11,fontWeight:700,color:'#94a3b8',textTransform:'uppercase',letterSpacing:1,marginBottom:4 }}>{label}</div>
                    <div style={{ fontSize:14,fontWeight:600,color:'#374151',lineHeight:1.5 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── App Download ── */}
      <section style={{ background:'linear-gradient(135deg,#0a1628 0%,#0d2b22 60%,#0a1628 100%)', padding:'80px 0', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute',top:-80,left:'20%',width:300,height:300,borderRadius:'50%',background:'radial-gradient(circle,rgba(27,188,155,0.15) 0%,transparent 70%)',pointerEvents:'none' }} />
        <div style={{ position:'absolute',bottom:-60,right:'15%',width:250,height:250,borderRadius:'50%',background:'radial-gradient(circle,rgba(27,188,155,0.1) 0%,transparent 70%)',pointerEvents:'none' }} />

        <div className="container" style={{ position:'relative',zIndex:1 }}>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:60,alignItems:'center' }} className="app-dl-grid">
            <div>
              <div style={{ display:'inline-flex',alignItems:'center',gap:8,background:'rgba(27,188,155,0.15)',border:'1px solid rgba(27,188,155,0.3)',color:'#4ade80',borderRadius:50,padding:'6px 16px',fontSize:12,fontWeight:600,marginBottom:22 }}>
                <Smartphone size={13} /> Download our app now!
              </div>
              <h2 style={{ fontSize:'clamp(26px,4vw,44px)',fontWeight:800,color:'#fff',marginBottom:16,lineHeight:1.2,fontFamily:"'Poppins',sans-serif" }}>
                Manage your school<br /><span style={{ color:'#1bbc9b' }}>on the go</span>
              </h2>
              <p style={{ color:'rgba(255,255,255,0.5)',fontSize:15,lineHeight:1.75,maxWidth:420,marginBottom:32 }}>
                Join thousands of schools using our mobile app for Students, Parents, and Teachers. Available on both Android and iOS platforms.
              </p>
              <div style={{ display:'flex',gap:14,flexWrap:'wrap',marginBottom:20 }}>
                <a href="https://play.google.com/store/apps/details?id=com.wrteam.saas.school" target="_blank" rel="noreferrer"
                  style={{ display:'inline-flex',alignItems:'center',gap:12,background:'#fff',color:'#0f172a',borderRadius:12,padding:'11px 22px',textDecoration:'none',fontWeight:700,fontSize:13.5,boxShadow:'0 4px 16px rgba(0,0,0,0.3)',transition:'all 0.2s' }}
                  onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                  onMouseLeave={e=>e.currentTarget.style.transform=''}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                    <path d="M3.18 23.76a2.5 2.5 0 01-.68-1.76V2c0-.7.25-1.31.68-1.76L13 10.05l-9.82 13.71z" fill="#EA4335"/>
                    <path d="M16.92 13.99L13 10.05l3.92-3.92 4.5 2.56c1.28.73 1.28 1.93 0 2.66l-4.5 2.64z" fill="#FBBC04"/>
                    <path d="M3.18.24C3.7-.07 4.38-.07 5.02.28L16.92 7l-3.92 3.05L3.18.24z" fill="#34A853"/>
                    <path d="M3.18 23.76L13 13.97l3.92 3.03L5.02 23.72c-.64.36-1.32.36-1.84.04z" fill="#4285F4"/>
                  </svg>
                  <div>
                    <div style={{ fontSize:9,opacity:0.55,lineHeight:1 }}>GET IT ON</div>
                    <div style={{ fontSize:14,fontWeight:800 }}>Google Play</div>
                  </div>
                </a>
                <a href="https://testflight.apple.com/join/HxZcnKO6" target="_blank" rel="noreferrer"
                  style={{ display:'inline-flex',alignItems:'center',gap:12,background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',color:'#fff',borderRadius:12,padding:'11px 22px',textDecoration:'none',fontWeight:700,fontSize:13.5,transition:'all 0.2s' }}
                  onMouseEnter={e=>{e.currentTarget.style.background='rgba(27,188,155,0.2)';e.currentTarget.style.transform='translateY(-2px)'}}
                  onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.08)';e.currentTarget.style.transform=''}}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div>
                    <div style={{ fontSize:9,opacity:0.6,lineHeight:1 }}>DOWNLOAD ON THE</div>
                    <div style={{ fontSize:14,fontWeight:800 }}>App Store</div>
                  </div>
                </a>
              </div>
              <a href="https://eschool-saas.student-web.wrteam.me/" target="_blank" rel="noreferrer"
                style={{ color:'#1bbc9b',fontSize:14,fontWeight:600,textDecoration:'none' }}
                onMouseEnter={e=>e.currentTarget.style.color='#4ade80'}
                onMouseLeave={e=>e.currentTarget.style.color='#1bbc9b'}>
                Student Web →
              </a>
            </div>

            {/* Phone mockups */}
            <div style={{ display:'flex',justifyContent:'center',alignItems:'flex-end',gap:14 }}>
              <div style={{ background:'rgba(255,255,255,0.06)',border:'1px solid rgba(27,188,155,0.2)',borderRadius:26,padding:10,animation:'float 4s ease-in-out infinite 0.5s',marginBottom:24 }}>
                <svg viewBox="0 0 90 170" width="90" height="170" fill="none">
                  <rect width="90" height="170" rx="14" fill="rgba(27,188,155,0.04)" />
                  <rect x="30" y="8" width="30" height="5" rx="2.5" fill="rgba(255,255,255,0.2)" />
                  <rect x="8" y="22" width="74" height="24" rx="6" fill="rgba(27,188,155,0.5)" />
                  <text x="45" y="38" textAnchor="middle" fontSize="8" fontWeight="700" fill="white">CloudX</text>
                  {[55,74,93,112].map((y,i)=>(
                    <g key={i}>
                      <rect x="8" y={y} width="74" height="16" rx="4" fill="rgba(255,255,255,0.06)" />
                      <circle cx="19" cy={y+8} r="5" fill={['#1bbc9b','#0ea5e9','#8b5cf6','#f59e0b'][i]} opacity="0.8" />
                      <rect x="28" y={y+4} width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />
                      <rect x="28" y={y+10} width="26" height="2" rx="1" fill="rgba(255,255,255,0.1)" />
                    </g>
                  ))}
                  <rect x="28" y="154" width="34" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
                </svg>
              </div>
              <div style={{ background:'rgba(255,255,255,0.1)',border:'1.5px solid rgba(27,188,155,0.3)',borderRadius:28,padding:12,animation:'float 3.5s ease-in-out infinite' }}>
                <svg viewBox="0 0 110 210" width="110" height="210" fill="none">
                  <rect width="110" height="210" rx="18" fill="rgba(27,188,155,0.05)" />
                  <rect x="38" y="10" width="34" height="5" rx="2.5" fill="rgba(255,255,255,0.25)" />
                  <rect x="8" y="24" width="94" height="30" rx="7" fill="url(#appg)" />
                  <circle cx="23" cy="39" r="9" fill="rgba(255,255,255,0.3)" />
                  <text x="38" y="35" fontSize="7" fontWeight="700" fill="white">Good Morning!</text>
                  <text x="38" y="46" fontSize="6" fill="rgba(255,255,255,0.7)">Admin · School CloudX</text>
                  <rect x="8" y="63" width="44" height="32" rx="7" fill="rgba(27,188,155,0.3)" />
                  <text x="30" y="75" textAnchor="middle" fontSize="12" fontWeight="800" fill="white">127</text>
                  <text x="30" y="86" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.7)">Schools</text>
                  <rect x="58" y="63" width="44" height="32" rx="7" fill="rgba(14,165,233,0.3)" />
                  <text x="80" y="75" textAnchor="middle" fontSize="10" fontWeight="800" fill="white">1.2L</text>
                  <text x="80" y="86" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.7)">Students</text>
                  {[{y:105,l:'Attendance',p:88},{y:122,l:'Fees Paid',p:76},{y:139,l:'Assignments',p:91},{y:156,l:'Exams',p:64}].map(({y,l,p})=>(
                    <g key={l}>
                      <rect x="8" y={y} width="94" height="14" rx="4" fill="rgba(255,255,255,0.05)" />
                      <text x="12" y={y+10} fontSize="6" fill="rgba(255,255,255,0.6)">{l}</text>
                      <text x="98" y={y+10} textAnchor="end" fontSize="6" fontWeight="700" fill="rgba(255,255,255,0.9)">{p}%</text>
                      <rect x="8" y={y+12} width="94" height="2" rx="1" fill="rgba(255,255,255,0.07)" />
                      <rect x="8" y={y+12} width={94*p/100} height="2" rx="1" fill="#1bbc9b" opacity="0.7" />
                    </g>
                  ))}
                  <rect x="8" y="180" width="94" height="16" rx="7" fill="rgba(255,255,255,0.07)" />
                  <rect x="39" y="200" width="32" height="4" rx="2" fill="rgba(255,255,255,0.18)" />
                  <defs>
                    <linearGradient id="appg" x1="0" y1="0" x2="100%" y2="0">
                      <stop offset="0%" stopColor="#1bbc9b"/><stop offset="100%" stopColor="#0ea5e9"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div style={{ background:'rgba(255,255,255,0.06)',border:'1px solid rgba(27,188,155,0.2)',borderRadius:26,padding:10,animation:'float 4.2s ease-in-out infinite 1s',marginBottom:24 }}>
                <svg viewBox="0 0 90 170" width="90" height="170" fill="none">
                  <rect width="90" height="170" rx="14" fill="rgba(27,188,155,0.04)" />
                  <rect x="30" y="8" width="30" height="5" rx="2.5" fill="rgba(255,255,255,0.2)" />
                  <rect x="8" y="22" width="74" height="24" rx="6" fill="rgba(139,92,246,0.4)" />
                  <text x="45" y="38" textAnchor="middle" fontSize="8" fontWeight="700" fill="white">Students</text>
                  <circle cx="45" cy="75" r="22" fill="rgba(27,188,155,0.12)" stroke="rgba(27,188,155,0.4)" strokeWidth="2" />
                  <text x="45" y="71" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1bbc9b">87%</text>
                  <text x="45" y="82" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.55)">Attendance</text>
                  {[108,124,140,156].map((y,i)=>(
                    <g key={i}>
                      <rect x="8" y={y} width="74" height="12" rx="3" fill="rgba(255,255,255,0.05)" />
                      <rect x="8" y={y+10} width={[55,42,60,48][i]} height="2" rx="1" fill={['#1bbc9b','#0ea5e9','#8b5cf6','#f59e0b'][i]} opacity="0.6" />
                    </g>
                  ))}
                  <rect x="28" y="154" width="34" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.app-dl-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ background:'linear-gradient(135deg,#1bbc9b 0%,#0e9f82 50%,#0ea5e9 100%)', padding:'80px 0', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute',top:-80,right:-80,width:320,height:320,borderRadius:'50%',background:'rgba(255,255,255,0.06)',pointerEvents:'none' }} />
        <div style={{ position:'absolute',bottom:-60,left:-60,width:260,height:260,borderRadius:'50%',background:'rgba(255,255,255,0.05)',pointerEvents:'none' }} />
        <div className="container" style={{ position:'relative',zIndex:1,textAlign:'center' }}>
          <span style={{ display:'inline-flex',alignItems:'center',gap:6,background:'rgba(255,255,255,0.2)',border:'1px solid rgba(255,255,255,0.3)',color:'#fff',borderRadius:50,padding:'5px 18px',fontSize:12,fontWeight:600,marginBottom:22 }}>
            ✦ 30-day free trial — no credit card required
          </span>
          <h2 style={{ fontSize:'clamp(28px,5vw,56px)',fontWeight:800,color:'#fff',marginBottom:16,lineHeight:1.1,fontFamily:"'Poppins',sans-serif" }}>
            Register your school today
          </h2>
          <p style={{ color:'rgba(255,255,255,0.8)',fontSize:17,maxWidth:500,margin:'0 auto 36px',lineHeight:1.7 }}>
            Register in 5 minutes. Credentials delivered to your email. Your school goes digital tomorrow.
          </p>
          <div style={{ display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap' }}>
            <button onClick={()=>navigate('/register')} style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'15px 36px',background:'#fff',color:'#1bbc9b',border:'none',borderRadius:12,fontSize:16,fontWeight:700,cursor:'pointer',boxShadow:'0 8px 28px rgba(0,0,0,0.2)',transition:'all 0.2s',fontFamily:'inherit' }}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
              onMouseLeave={e=>e.currentTarget.style.transform=''}>
              Register your school <ArrowRight size={18} />
            </button>
            <button onClick={()=>navigate('/portal/login')} style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'15px 32px',background:'rgba(255,255,255,0.15)',color:'#fff',border:'1.5px solid rgba(255,255,255,0.35)',borderRadius:12,fontSize:16,fontWeight:600,cursor:'pointer',transition:'all 0.2s',fontFamily:'inherit' }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.25)'}
              onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.15)'}>
              Already registered? Login
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
