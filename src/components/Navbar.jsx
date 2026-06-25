import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown, LayoutDashboard, LogOut } from 'lucide-react'
import { usePortalAuth } from '../context/PortalAuthContext'

const NAV_LINKS = [
  { label: 'Home',     href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'About us', href: '#info' },
  { label: 'Pricing',  href: '#pricing' },
  { label: 'Faqs',     href: '#faq' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const { isLoggedIn, school, logout } = usePortalAuth()
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState(false)

  const scrollTo = (id) => {
    setOpen(false)
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const initials = school?.name
    ? school.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'SC'

  return (
    <nav className="navbar">
      <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:68 }}>

        {/* Logo */}
        <div onClick={() => navigate('/')} style={{ cursor:'pointer', flexShrink:0, display:'flex', alignItems:'center', gap:10 }}>
          <img src="/auctech-logo.png" alt="CloudX" style={{ height:40, objectFit:'contain', maxWidth:160 }} />
        </div>

        {/* Desktop links */}
        <div style={{ display:'flex', alignItems:'center', gap:2 }} className="desk-nav">
          {NAV_LINKS.map(l => (
            <button key={l.label} onClick={() => scrollTo(l.href)} style={{
              background:'none', border:'none', color:'#4a5568',
              fontSize:14.5, fontWeight:500, cursor:'pointer',
              padding:'8px 14px', borderRadius:8,
              transition:'all 0.2s', fontFamily:'inherit',
            }}
              onMouseEnter={e => { e.currentTarget.style.color='#1bbc9b'; e.currentTarget.style.background='#e8faf6' }}
              onMouseLeave={e => { e.currentTarget.style.color='#4a5568'; e.currentTarget.style.background='none' }}
            >{l.label}</button>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          {isLoggedIn ? (
            <div style={{ position:'relative' }}>
              <button onClick={() => setDrop(v => !v)} style={{
                display:'flex', alignItems:'center', gap:8,
                background:'#f9fafb', border:'1.5px solid #e2e8f0',
                borderRadius:12, padding:'6px 12px 6px 6px', cursor:'pointer', transition:'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='#1bbc9b'; e.currentTarget.style.background='#e8faf6' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.background='#f9fafb' }}
              >
                <div style={{ width:30, height:30, borderRadius:8, background:'linear-gradient(135deg,#1bbc9b,#0e9f82)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, color:'#fff' }}>
                  {school?.logo ? <img src={school.logo} alt="" style={{ width:'100%', height:'100%', objectFit:'contain', borderRadius:6 }} /> : initials}
                </div>
                <span style={{ fontSize:13, fontWeight:600, color:'#1a1a2e', maxWidth:100, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{school?.name || 'My School'}</span>
                <ChevronDown size={14} color="#6b7280" style={{ transform: drop ? 'rotate(180deg)' : '', transition:'transform 0.2s' }} />
              </button>
              {drop && (
                <div style={{ position:'absolute', top:'calc(100% + 8px)', right:0, background:'#fff', border:'1px solid #e2e8f0', borderRadius:14, padding:8, minWidth:200, boxShadow:'0 10px 40px rgba(0,0,0,0.12)', zIndex:200 }}>
                  <div style={{ padding:'10px 12px 12px', borderBottom:'1px solid #f3f4f6', marginBottom:6 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:'#1a1a2e' }}>{school?.name || 'My School'}</div>
                    <div style={{ fontSize:11, color:'#9ca3af', marginTop:2 }}>{school?.email || ''}</div>
                  </div>
                  <button onClick={() => { navigate('/portal/dashboard'); setDrop(false) }} style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'10px 12px', background:'none', border:'none', borderRadius:8, cursor:'pointer', color:'#374151', fontSize:13, fontWeight:500, fontFamily:'inherit', transition:'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background='#e8faf6'} onMouseLeave={e => e.currentTarget.style.background='none'}
                  ><LayoutDashboard size={15} color="#1bbc9b" /> Dashboard</button>
                  <button onClick={() => { logout(); setDrop(false); navigate('/') }} style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'10px 12px', background:'none', border:'none', borderRadius:8, cursor:'pointer', color:'#ef4444', fontSize:13, fontWeight:500, fontFamily:'inherit', transition:'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background='#fef2f2'} onMouseLeave={e => e.currentTarget.style.background='none'}
                  ><LogOut size={15} /> Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={() => navigate('/portal/login')} style={{
                padding:'9px 24px', background:'transparent',
                color:'#1bbc9b', border:'2px solid #1bbc9b',
                borderRadius:8, fontSize:14, fontWeight:600, cursor:'pointer',
                transition:'all 0.2s', fontFamily:'inherit',
              }}
                onMouseEnter={e => { e.currentTarget.style.background='#1bbc9b'; e.currentTarget.style.color='#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#1bbc9b' }}
              >Login</button>
              <button onClick={() => navigate('/register')} style={{
                padding:'10px 24px',
                background:'linear-gradient(135deg,#1bbc9b,#0e9f82)',
                color:'#fff', border:'none', borderRadius:8,
                fontSize:14, fontWeight:600, cursor:'pointer',
                transition:'all 0.2s', fontFamily:'inherit',
                boxShadow:'0 4px 14px rgba(27,188,155,0.4)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 8px 20px rgba(27,188,155,0.5)' }}
                onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 4px 14px rgba(27,188,155,0.4)' }}
              >Start trial</button>
            </>
          )}

          <button onClick={() => setOpen(!open)} className="mob-btn" style={{ background:'none', border:'1px solid #e2e8f0', color:'#4a5568', cursor:'pointer', borderRadius:8, padding:6, display:'none' }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ position:'absolute', top:'100%', left:0, right:0, zIndex:150, background:'#fff', padding:'16px 24px 20px', borderTop:'1px solid #e8faf6', boxShadow:'0 10px 30px rgba(0,0,0,0.08)', display:'flex', flexDirection:'column', gap:4 }}>
          {NAV_LINKS.map(l => (
            <button key={l.label} onClick={() => scrollTo(l.href)} style={{ background:'none', border:'none', color:'#4a5568', fontSize:15, fontWeight:500, cursor:'pointer', textAlign:'left', padding:'10px 12px', borderRadius:8, fontFamily:'inherit' }}
              onMouseEnter={e => { e.currentTarget.style.background='#e8faf6'; e.currentTarget.style.color='#1bbc9b' }}
              onMouseLeave={e => { e.currentTarget.style.background='none'; e.currentTarget.style.color='#4a5568' }}
            >{l.label}</button>
          ))}
          <div style={{ borderTop:'1px solid #f3f4f6', marginTop:8, paddingTop:12, display:'flex', flexDirection:'column', gap:8 }}>
            <button onClick={() => { navigate('/portal/login'); setOpen(false) }} style={{ padding:'12px', background:'transparent', color:'#1bbc9b', border:'2px solid #1bbc9b', borderRadius:10, fontSize:15, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>Login</button>
            <button onClick={() => { navigate('/register'); setOpen(false) }} style={{ padding:'12px', background:'linear-gradient(135deg,#1bbc9b,#0e9f82)', color:'#fff', border:'none', borderRadius:10, fontSize:15, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>Start trial</button>
          </div>
        </div>
      )}

      {drop && <div onClick={() => setDrop(false)} style={{ position:'fixed', inset:0, zIndex:100 }} />}
      <style>{`@media(max-width:768px){.desk-nav{display:none!important}.mob-btn{display:flex!important}}`}</style>
    </nav>
  )
}
