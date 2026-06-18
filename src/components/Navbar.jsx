import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const links = [
    { label: 'Features',   href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing',    href: '#pricing' },
    { label: 'Contact',    href: '#contact' },
  ]

  const scrollTo = (id) => {
    setOpen(false)
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg,#6366f1,#3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 800, color: '#fff',
          }}>C</div>
          <span style={{ fontWeight: 700, fontSize: 20, color: '#fff' }}>CloudX <span style={{ color: '#6366f1' }}>LMS</span></span>
        </div>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.href)}
              style={{
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.65)',
                fontSize: 14, fontWeight: 500, cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.color = '#fff'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.65)'}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button
            onClick={() => navigate('/register')}
            style={{
              padding: '10px 22px',
              background: 'linear-gradient(135deg,#6366f1,#3b82f6)',
              color: '#fff', border: 'none', borderRadius: 10,
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 8px 20px rgba(99,102,241,0.4)' }}
            onMouseLeave={(e) => { e.target.style.transform = ''; e.target.style.boxShadow = '' }}
          >
            Get Started Free
          </button>

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
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(10,15,30,0.98)', backdropFilter: 'blur(20px)',
          padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          {links.map((l) => (
            <button key={l.label} onClick={() => scrollTo(l.href)}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 16, fontWeight: 500, cursor: 'pointer', textAlign: 'left' }}>
              {l.label}
            </button>
          ))}
          <button onClick={() => { navigate('/register'); setOpen(false) }}
            style={{ padding: '12px', background: 'linear-gradient(135deg,#6366f1,#3b82f6)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
            Get Started Free
          </button>
        </div>
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
