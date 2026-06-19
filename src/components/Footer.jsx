export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '40px 0',
      color: 'rgba(255,255,255,0.35)',
      fontSize: 14,
    }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img
            src="/auctech-logo.png"
            alt="CloudX Logo"
            style={{ height: 32, objectFit: 'contain' }}
          />
        </div>
        <p>© {new Date().getFullYear()} School CloudX. All rights reserved.</p>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy Policy', 'Terms of Service', 'Support'].map((l) => (
            <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = '#fabf22'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.35)'}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
