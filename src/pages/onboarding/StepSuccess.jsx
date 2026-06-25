import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Mail, ExternalLink, Copy, Check, Rocket, BookOpen, Users, BarChart2, ShieldCheck, MessageCircle, Zap, CalendarDays } from 'lucide-react'
import toast from 'react-hot-toast'

const NEXT_STEPS = [
  { icon:Users,    title:'Add Students',  desc:'Onboard students via bulk import or manual entry.' },
  { icon:BookOpen, title:'Set Up Classes', desc:'Configure classes, sections and subjects.' },
  { icon:BarChart2,title:'Add Staff',      desc:'Create accounts for teachers and admin staff.' },
  { icon:Rocket,   title:'Go Live!',      desc:'Share the app link with parents and get started.' },
]

export default function StepSuccess({ data }) {
  const navigate = useNavigate()
  const [copied, setCopied] = useState('')
  const [confetti, setConfetti] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setConfetti(false), 4000)
    return () => clearTimeout(t)
  }, [])

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key)
      toast.success('Copied!')
      setTimeout(() => setCopied(''), 2000)
    })
  }

  const subdomain    = data?.subdomain || ''
  const loginUrl     = data?.loginUrl  || `https://${subdomain}.schoolcloudx.com`
  const loginPageUrl = `${loginUrl}/login`
  const superAdminId = data?.credentials?.superAdmin?.userId   || '—'
  const superAdminPw = data?.credentials?.superAdmin?.password || '(sent via email)'
  const adminId      = data?.credentials?.admin?.userId        || '—'
  const adminPw      = data?.credentials?.admin?.password      || '(sent via email)'
  const schoolName   = data?.schoolName  || 'Your School'
  const trial        = data?.trial
  const trialEndsOn  = trial?.endsOn ? new Date(trial.endsOn) : null
  const fmtDate      = d => d ? d.toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) : '—'

  return (
    <div style={{ position:'relative' }}>

      {/* Confetti */}
      {confetti && (
        <div style={{ position:'fixed',top:0,left:0,right:0,bottom:0,pointerEvents:'none',zIndex:999,overflow:'hidden' }}>
          {Array.from({length:36}).map((_,i) => (
            <div key={i} style={{
              position:'absolute', top:'-10px',
              left:`${Math.random()*100}%`,
              width:`${6+Math.random()*8}px`, height:`${6+Math.random()*8}px`,
              borderRadius: Math.random()>0.5?'50%':'2px',
              background:['#1bbc9b','#0ea5e9','#f59e0b','#ec4899','#8b5cf6','#10b981'][Math.floor(Math.random()*6)],
              animation:`confettiFall ${1.5+Math.random()*2}s ease ${Math.random()}s forwards`,
            }} />
          ))}
        </div>
      )}

      {/* Header */}
      <div style={{ textAlign:'center', marginBottom:28, animation:'fadeInUp 0.5s ease both' }}>
        <div style={{ width:88,height:88,borderRadius:'50%',margin:'0 auto 20px',background:'linear-gradient(135deg,#1bbc9b,#0ea5e9)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 0 50px rgba(27,188,155,0.35)' }}>
          <CheckCircle size={44} color="#fff" />
        </div>
        <h2 style={{ fontSize:32,fontWeight:800,marginBottom:10,color:'#1a1a2e',fontFamily:"'Poppins',sans-serif" }}>
          🎉 School Created Successfully!
        </h2>
        <p style={{ color:'#64748b',fontSize:16,lineHeight:1.6 }}>
          <strong style={{ color:'#1bbc9b' }}>{schoolName}</strong> is now live on School CloudX.
          <br /><span style={{ fontSize:14 }}>Login credentials have been sent to your email.</span>
        </p>
      </div>

      {/* Trial banner */}
      {trial?.active && (
        <div style={{ background:'linear-gradient(135deg,#e8faf6,#d1f5ee)',borderRadius:16,border:'1.5px solid rgba(27,188,155,0.25)',padding:'18px 22px',marginBottom:20,animation:'fadeInUp 0.5s ease 0.1s both' }}>
          <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:12 }}>
            <div style={{ width:40,height:40,borderRadius:12,background:'linear-gradient(135deg,#1bbc9b,#0ea5e9)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
              <Zap size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize:15,fontWeight:700,color:'#0e6b5a' }}>🎁 {trial.days||30}-Day Free Trial Activated!</div>
              <div style={{ fontSize:12,color:'#64748b',marginTop:1 }}>{trial.planName||'Free Trial'} — No payment required</div>
            </div>
            <div style={{ marginLeft:'auto',fontSize:12,fontWeight:700,padding:'4px 12px',borderRadius:20,background:'#1bbc9b',color:'#fff' }}>FREE</div>
          </div>
          <div style={{ display:'flex',gap:12,flexWrap:'wrap' }}>
            {[
              { icon:CalendarDays, text:`Trial ends: ${fmtDate(trialEndsOn)}` },
              { icon:Users, text: trial.studentLimit>0 ? `${trial.studentLimit.toLocaleString('en-IN')} student limit` : 'Unlimited students' },
            ].map(({icon:Icon,text},i)=>(
              <div key={i} style={{ display:'flex',alignItems:'center',gap:6,background:'#fff',padding:'6px 14px',borderRadius:8,border:'1px solid rgba(27,188,155,0.2)',fontSize:12,color:'#374151',fontWeight:500 }}>
                <Icon size={13} color="#1bbc9b" /> {text}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delivery confirmation */}
      <div style={{ background:'#f0fdf9',borderRadius:12,border:'1.5px solid rgba(27,188,155,0.2)',padding:'12px 18px',marginBottom:20,display:'flex',alignItems:'center',gap:16,flexWrap:'wrap',animation:'fadeInUp 0.5s ease 0.12s both' }}>
        <div style={{ display:'flex',alignItems:'center',gap:6,fontSize:13,color:'#1bbc9b',fontWeight:600 }}><Mail size={14} /> Credentials sent via email</div>
        <div style={{ width:1,height:16,background:'#d1f5ee' }} />
        <div style={{ display:'flex',alignItems:'center',gap:6,fontSize:13,color:'#1bbc9b',fontWeight:600 }}><MessageCircle size={14} /> Sent via WhatsApp</div>
      </div>

      {/* Credentials card */}
      <div style={{ background:'#fff',borderRadius:20,border:'1.5px solid #e8faf6',padding:24,marginBottom:20,boxShadow:'0 4px 24px rgba(27,188,155,0.08)',animation:'fadeInUp 0.5s ease 0.15s both' }}>
        <div style={{ fontSize:12,fontWeight:700,color:'#1bbc9b',letterSpacing:1,textTransform:'uppercase',marginBottom:16,display:'flex',alignItems:'center',gap:6 }}>
          <ShieldCheck size={13} /> Login Credentials
        </div>
        {[
          { label:'Portal URL',       value:loginPageUrl, key:'url'  },
          { label:'Super Admin ID',   value:superAdminId, key:'said' },
          { label:'Super Admin Pass', value:superAdminPw, key:'sap'  },
          { label:'Admin ID',         value:adminId,      key:'aid'  },
          { label:'Admin Pass',       value:adminPw,      key:'ap'   },
        ].map(({label,value,key})=>(
          <div key={label} style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid #f0fdf9' }}>
            <span style={{ fontSize:12,color:'#94a3b8',minWidth:130,fontWeight:500 }}>{label}</span>
            <div style={{ display:'flex',alignItems:'center',gap:8,maxWidth:'60%' }}>
              <span style={{ fontSize:13,fontWeight:500,wordBreak:'break-all',textAlign:'right',color:key==='url'?'#1bbc9b':'#374151',fontFamily:key!=='url'?'monospace':'inherit' }}>{value}</span>
              <button onClick={()=>copyText(value,key)} style={{ background:'none',border:'none',cursor:'pointer',padding:4,flexShrink:0,color:copied===key?'#1bbc9b':'#d1d5db',transition:'color 0.2s' }}>
                {copied===key ? <Check size={13} /> : <Copy size={13} />}
              </button>
            </div>
          </div>
        ))}
        <div style={{ display:'flex',alignItems:'center',gap:6,marginTop:12 }}>
          <ShieldCheck size={12} color="#1bbc9b" />
          <span style={{ fontSize:11,color:'#94a3b8' }}>Please change your password after the first login.</span>
        </div>
      </div>

      {/* Open portal button */}
      <a href={loginPageUrl} target="_blank" rel="noopener noreferrer"
        style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:8,width:'100%',height:52,background:'linear-gradient(135deg,#1bbc9b,#0e9f82)',color:'#fff',borderRadius:12,textDecoration:'none',fontSize:15,fontWeight:700,boxShadow:'0 6px 20px rgba(27,188,155,0.35)',marginBottom:16,animation:'fadeInUp 0.5s ease 0.2s both',transition:'all 0.2s' }}
        onMouseEnter={e=>e.currentTarget.style.transform='translateY(-1px)'}
        onMouseLeave={e=>e.currentTarget.style.transform=''}>
        <Rocket size={18} /> Open School Portal <ExternalLink size={14} style={{ opacity:0.7 }} />
      </a>

      {/* Next steps */}
      <div style={{ background:'#fff',borderRadius:20,border:'1.5px solid #e8faf6',padding:24,marginBottom:20,boxShadow:'0 4px 24px rgba(27,188,155,0.06)',animation:'fadeInUp 0.5s ease 0.25s both' }}>
        <div style={{ fontSize:12,fontWeight:700,color:'#1bbc9b',letterSpacing:1,textTransform:'uppercase',marginBottom:16 }}>What's Next</div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:12 }}>
          {NEXT_STEPS.map(({icon:Icon,title,desc})=>(
            <div key={title} style={{ display:'flex',gap:10,padding:'12px',borderRadius:12,background:'#f8fffe',border:'1.5px solid #e8faf6' }}>
              <div style={{ width:36,height:36,borderRadius:10,background:'rgba(27,188,155,0.1)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                <Icon size={16} color="#1bbc9b" />
              </div>
              <div>
                <div style={{ fontSize:13,fontWeight:700,marginBottom:3,color:'#1a1a2e' }}>{title}</div>
                <div style={{ fontSize:12,color:'#64748b',lineHeight:1.5 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={()=>navigate('/')} style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:8,width:'100%',height:44,background:'transparent',color:'#64748b',border:'1.5px solid #e2e8f0',borderRadius:12,fontSize:14,fontWeight:500,cursor:'pointer',fontFamily:'inherit',transition:'all 0.2s',animation:'fadeInUp 0.5s ease 0.3s both' }}
        onMouseEnter={e=>{e.currentTarget.style.borderColor='#1bbc9b';e.currentTarget.style.color='#1bbc9b'}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor='#e2e8f0';e.currentTarget.style.color='#64748b'}}>
        ← Back to Home
      </button>

      <p style={{ textAlign:'center',marginTop:16,fontSize:12,color:'#94a3b8' }}>
        Need help? <a href="mailto:support@schoolcloudx.com" style={{ color:'#1bbc9b',textDecoration:'none',fontWeight:600 }}>support@schoolcloudx.com</a>
      </p>

      <style>{`@keyframes confettiFall { to { transform:translateY(100vh) rotate(360deg); opacity:0; } }`}</style>
    </div>
  )
}
