import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown, LayoutDashboard, LogOut } from 'lucide-react'
import { usePortalAuth } from '../context/PortalAuthContext'

const NAV_LINKS = [
  { label: 'Home',     href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'About us', href: '#info' },
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
    <nav className="navbar" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container">
        <div className="nav-inner">

          {/* Logo */}
          <div onClick={() => navigate('/')} className="nav-logo">
            <img src="/auctech-logo.png" alt="CloudX" />
          </div>

          {/* Desktop links */}
          <div className="desk-nav">
            {NAV_LINKS.map(l => (
              <button key={l.label} onClick={() => scrollTo(l.href)} className="nav-link-btn">
                {l.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="nav-right">
            {isLoggedIn ? (
              <div style={{ position: 'relative' }}>
                <button onClick={() => setDrop(v => !v)} className="school-menu-btn"
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#0040a0'; e.currentTarget.style.background = '#e8f0fc' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#f9fafb' }}
                >
                  <div className="school-avatar">
                    {school?.logo ? <img src={school.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 6 }} /> : initials}
                  </div>
                  <span className="school-name mob-hide">
                    {school?.name || 'My School'}
                  </span>
                  <ChevronDown size={14} color="#6b7280" style={{ transform: drop ? 'rotate(180deg)' : '', transition: 'transform 0.2s' }} />
                </button>

                {drop && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 8, minWidth: 200, boxShadow: '0 10px 40px rgba(0,0,0,0.12)', zIndex: 200 }}>
                    <div style={{ padding: '10px 12px 12px', borderBottom: '1px solid #f3f4f6', marginBottom: 6 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e' }}>{school?.name || 'My School'}</div>
                      <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{school?.email || ''}</div>
                    </div>
                    <button onClick={() => { navigate('/portal/dashboard'); setDrop(false) }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'none', border: 'none', borderRadius: 8, cursor: 'pointer', color: '#374151', fontSize: 13, fontWeight: 500, fontFamily: 'Lato, sans-serif', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#e8f0fc'} onMouseLeave={e => e.currentTarget.style.background = 'none'}
                    ><LayoutDashboard size={15} color="#0040a0" /> Dashboard</button>
                    <button onClick={() => { logout(); setDrop(false); navigate('/') }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'none', border: 'none', borderRadius: 8, cursor: 'pointer', color: '#ef4444', fontSize: 13, fontWeight: 500, fontFamily: 'Lato, sans-serif', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'} onMouseLeave={e => e.currentTarget.style.background = 'none'}
                    ><LogOut size={15} /> Logout</button>
                  </div>
                )}
              </div>
            ) : null}

            {/* Hamburger */}
            <button onClick={() => setOpen(!open)} className="mob-btn">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="mob-menu">
          {NAV_LINKS.map(l => (
            <button key={l.label} onClick={() => scrollTo(l.href)} className="mob-menu-link"
              onMouseEnter={e => { e.currentTarget.style.background = '#e8f0fc'; e.currentTarget.style.color = '#0040a0' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#4a5568' }}
            >{l.label}</button>
          ))}
        </div>
      )}

      {drop && <div onClick={() => setDrop(false)} style={{ position: 'fixed', inset: 0, zIndex: 100 }} />}

      <style>{`
        /* Nav inner layout */
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
        }

        /* Logo */
        .nav-logo {
          cursor: pointer;
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }
        .nav-logo img {
          height: 48px;
          width: auto;
          max-width: 160px;
          object-fit: contain;
          display: block;
        }

        /* Desktop nav links */
        .desk-nav {
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .nav-link-btn {
          background: none;
          border: none;
          color: #4a5568;
          font-size: 14.5px;
          font-weight: 500;
          cursor: pointer;
          padding: 8px 14px;
          border-radius: 8px;
          transition: all 0.2s;
          font-family: Lato, sans-serif;
        }
        .nav-link-btn:hover {
          color: #0040a0;
          background: #e8f0fc;
        }

        /* Right section */
        .nav-right {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        /* School menu button */
        .school-menu-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f9fafb;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          padding: 6px 12px 6px 6px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .school-avatar {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: linear-gradient(135deg,#0040a0,#002f80);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 800;
          color: #fff;
          flex-shrink: 0;
          overflow: hidden;
        }
        .school-name {
          font-size: 13px;
          font-weight: 600;
          color: #1a1a2e;
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Hamburger button */
        .mob-btn {
          display: none;
          background: none;
          border: 1px solid #e2e8f0;
          color: #4a5568;
          cursor: pointer;
          border-radius: 8px;
          padding: 6px;
          align-items: center;
          justify-content: center;
        }

        /* Mobile menu */
        .mob-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          z-index: 150;
          background: #fff;
          padding: 16px 24px 20px;
          border-top: 1px solid #e8f0fc;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .mob-menu-link {
          background: none;
          border: none;
          color: #4a5568;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
          padding: 10px 12px;
          border-radius: 8px;
          font-family: Lato, sans-serif;
        }

        /* Tablet: shrink nav links */
        @media (max-width: 1024px) {
          .nav-link-btn { padding: 8px 10px !important; font-size: 13.5px !important; }
        }

        /* Mobile: hide desktop nav, show hamburger */
        @media (max-width: 900px) {
          .desk-nav { display: none !important; }
          .mob-btn  { display: flex !important; }
          .mob-hide { display: none !important; }
        }

        @media (max-width: 480px) {
          .nav-inner { height: 60px; }
          .nav-logo img { height: 38px; }
          .btn-primary { padding: 8px 14px !important; font-size: 13px !important; }
        }
      `}</style>
    </nav>
  )
}
