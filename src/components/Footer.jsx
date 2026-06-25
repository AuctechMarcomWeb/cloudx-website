import { ExternalLink } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior:'smooth', block:'start' })
  }

  return (
    <footer style={{ background:'#0d1f1a', color:'rgba(255,255,255,0.55)', paddingTop:56 }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:40, paddingBottom:48, borderBottom:'1px solid rgba(255,255,255,0.07)' }}>

          {/* Brand */}
          <div>
            <img src="/auctech-logo.png" alt="School CloudX" style={{ height:38, objectFit:'contain', marginBottom:16, filter:'brightness(0) invert(1)' }} />
            <p style={{ fontSize:14, lineHeight:1.75, color:'rgba(255,255,255,0.4)', maxWidth:240, marginBottom:20 }}>
              School CloudX — Manage Your School with ease and efficiency.
            </p>
            <div style={{ display:'flex', gap:10 }}>
              {[
                { label:'FB',  href:'https://www.facebook.com' },
                { label:'IG',  href:'https://www.instagram.com' },
                { label:'IN',  href:'https://www.linkedin.com' },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  style={{ width:36,height:36,borderRadius:8,background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(255,255,255,0.45)',transition:'all 0.2s',textDecoration:'none',fontSize:11,fontWeight:700 }}
                  onMouseEnter={e=>{e.currentTarget.style.background='rgba(27,188,155,0.25)';e.currentTarget.style.borderColor='rgba(27,188,155,0.5)';e.currentTarget.style.color='#fff'}}
                  onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.06)';e.currentTarget.style.borderColor='rgba(255,255,255,0.1)';e.currentTarget.style.color='rgba(255,255,255,0.45)'}}
                >{label}</a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontSize:13,fontWeight:700,color:'#fff',letterSpacing:1,textTransform:'uppercase',marginBottom:18 }}>Links</h4>
            <ul style={{ listStyle:'none',display:'flex',flexDirection:'column',gap:11 }}>
              {[
                { label:'Home',     href:'#home' },
                { label:'Features', href:'#features' },
                { label:'Pricing',  href:'#pricing' },
                { label:'FAQs',     href:'#faq' },
                { label:'Info',     href:'#info' },
                { label:'Contact',  href:'#contact' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <button onClick={() => scrollTo(href)} style={{ background:'none',border:'none',color:'rgba(255,255,255,0.45)',fontSize:14,cursor:'pointer',padding:0,fontFamily:'inherit',transition:'color 0.2s',textAlign:'left' }}
                    onMouseEnter={e=>e.currentTarget.style.color='#1bbc9b'}
                    onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.45)'}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 style={{ fontSize:13,fontWeight:700,color:'#fff',letterSpacing:1,textTransform:'uppercase',marginBottom:18 }}>Info</h4>
            <ul style={{ listStyle:'none',display:'flex',flexDirection:'column',gap:11 }}>
              {['About us','Privacy policy','Terms & conditions','Refund cancellation'].map(label => (
                <li key={label}>
                  <a href="#" style={{ color:'rgba(255,255,255,0.45)',fontSize:14,textDecoration:'none',transition:'color 0.2s' }}
                    onMouseEnter={e=>e.currentTarget.style.color='#1bbc9b'}
                    onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.45)'}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Download */}
          <div>
            <h4 style={{ fontSize:13,fontWeight:700,color:'#fff',letterSpacing:1,textTransform:'uppercase',marginBottom:18 }}>Follow</h4>
            <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
              {[
                { label:'Google Play', href:'https://play.google.com/store/apps/details?id=com.wrteam.saas.school' },
                { label:'App Store',   href:'https://testflight.apple.com/join/HxZcnKO6' },
                { label:'Student Web', href:'https://eschool-saas.student-web.wrteam.me/' },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  style={{ display:'inline-flex',alignItems:'center',gap:7,padding:'8px 14px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,fontSize:13,fontWeight:500,color:'rgba(255,255,255,0.5)',textDecoration:'none',transition:'all 0.2s' }}
                  onMouseEnter={e=>{e.currentTarget.style.background='rgba(27,188,155,0.15)';e.currentTarget.style.borderColor='rgba(27,188,155,0.4)';e.currentTarget.style.color='#fff'}}
                  onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.04)';e.currentTarget.style.borderColor='rgba(255,255,255,0.08)';e.currentTarget.style.color='rgba(255,255,255,0.5)'}}>
                  <ExternalLink size={13} /> {label}
                </a>
              ))}
            </div>
          </div>

        </div>

        <div style={{ padding:'20px 0',display:'flex',flexWrap:'wrap',gap:12,justifyContent:'space-between',alignItems:'center' }}>
          <p style={{ fontSize:13,color:'rgba(255,255,255,0.25)' }}>© {year} School CloudX. All Rights Reserved.</p>
          <p style={{ fontSize:13,color:'rgba(255,255,255,0.2)' }}>Powered by AucTech Solutions</p>
        </div>
      </div>
    </footer>
  )
}
