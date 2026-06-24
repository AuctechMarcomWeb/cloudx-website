import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react'
import { usePortalAuth } from '../context/PortalAuthContext'

export default function Navbar() {
  const navigate = useNavigate()
  const { isLoggedIn, school, logout } = usePortalAuth()
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const links = [
    { label: 'Features',     href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing',      href: '#pricing' },
    { label: 'FAQ',          href: '#faq' },
    { label: 'Contact',      href: '#contact' },
  ]

  const scrollTo = (id) => {
    setOpen(false)
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleLogout = () => {
    logout()
    setProfileOpen(false)
    navigate('/')
  }

  // School initials for avatar
  const initials = school?.name
    ? school.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'SC'

  return (
    <nav className="navbar" style={{ position: 'relative' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <img
            src="/auctech-logo.png"
            alt="Logo"
            style={{ height: 56, maxWidth: 200, objectFit: 'contain' }}
          />
        </div>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.href)}
              style={{
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.65)',
                fontSize: 15, fontWeight: 500, cursor: 'pointer', transition: 'color 0.2s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => e.target.style.color = '#fff'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.65)'}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* CTA / Profile */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {isLoggedIn ? (
            /* ── Profile dropdown ── */
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setProfileOpen(v => !v)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 12, padding: '7px 14px 7px 8px',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
              >
                {/* Avatar */}
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'linear-gradient(135deg,#042954,#051f3e)',
                  border: '2px solid #fabf22',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 800, color: '#fabf22', flexShrink: 0,
                }}>
                  {school?.logo
                    ? <img src={school.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 6 }} />
                    : initials
                  }
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.2, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {school?.name || 'My School'}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1 }}>Portal</div>
                </div>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 2, color: 'rgba(255,255,255,0.4)', transform: profileOpen ? 'rotate(180deg)' : '', transition: 'transform 0.2s' }}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                  background: '#0b2040', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 14, padding: '8px', minWidth: 200,
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                  zIndex: 200, animation: 'fadeInUp 0.15s ease both',
                }}>
                  <div style={{ padding: '10px 12px 12px', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: 6 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{school?.name || 'My School'}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{school?.email || ''}</div>
                  </div>
                  <button
                    onClick={() => { navigate('/portal/dashboard'); setProfileOpen(false) }}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 12px', background: 'none', border: 'none',
                      borderRadius: 8, cursor: 'pointer', color: 'rgba(255,255,255,0.8)',
                      fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                  >
                    <LayoutDashboard size={15} color="#fabf22" /> Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 12px', background: 'none', border: 'none',
                      borderRadius: 8, cursor: 'pointer', color: 'rgba(255,87,87,0.9)',
                      fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                  >
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ── Guest buttons ── */
            <>
              <button
                onClick={() => navigate('/portal/login')}
                style={{
                  padding: '9px 20px',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: 'pointer',
                  transition: 'all 0.2s', fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => { e.target.style.color = '#fff'; e.target.style.borderColor = 'rgba(255,255,255,0.35)' }}
                onMouseLeave={(e) => { e.target.style.color = 'rgba(255,255,255,0.7)'; e.target.style.borderColor = 'rgba(255,255,255,0.15)' }}
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                style={{
                  padding: '10px 22px',
                  background: 'linear-gradient(135deg,#042954,#063a6e)',
                  color: '#fabf22', border: '1px solid rgba(250,191,34,0.3)', borderRadius: 10,
                  fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  transition: 'all 0.2s', fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(4,41,84,0.5)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
              >
                Get Started Free
              </button>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="mobile-menu-btn"
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'none' }}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 150,
          background: 'rgba(2,26,58,0.98)', backdropFilter: 'blur(20px)',
          padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          {links.map((l) => (
            <button key={l.label} onClick={() => scrollTo(l.href)}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 16, fontWeight: 500, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
              {l.label}
            </button>
          ))}
          {isLoggedIn ? (
            <>
              <button onClick={() => { navigate('/portal/dashboard'); setOpen(false) }}
                style={{ padding: '12px', background: 'rgba(4,41,84,0.4)', color: '#fabf22', border: '1px solid rgba(250,191,34,0.2)', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                Dashboard
              </button>
              <button onClick={() => { handleLogout(); setOpen(false) }}
                style={{ padding: '12px', background: 'rgba(239,68,68,0.08)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => { navigate('/portal/login'); setOpen(false) }}
                style={{ padding: '12px', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center' }}>
                Login
              </button>
              <button onClick={() => { navigate('/register'); setOpen(false) }}
                style={{ padding: '12px', background: 'linear-gradient(135deg,#042954,#051f3e)', color: '#fabf22', border: '1px solid rgba(250,191,34,0.3)', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                Get Started Free
              </button>
            </>
          )}
        </div>
      )}

      {/* Close profile dropdown on outside click */}
      {profileOpen && (
        <div
          onClick={() => setProfileOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 100 }}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
