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
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'linear-gradient(135deg,#6366f1,#3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 800, color: '#fff',
          }}>C</div>
          <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>CloudX LMS</span>
        </div>
        <p>© {new Date().getFullYear()} CloudX LMS. All rights reserved.</p>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy Policy', 'Terms of Service', 'Support'].map((l) => (
            <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = '#818cf8'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.35)'}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
