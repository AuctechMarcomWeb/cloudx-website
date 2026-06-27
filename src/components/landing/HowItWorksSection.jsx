import whyImg from '../../assets/682c33c666a931.887378031747727302.png'

export default function HowItWorksSection() {
  return (
    <section id="info" style={{ background: '#fff', padding: '80px 0', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center', maxWidth: 1100, margin: '0 auto' }} className="why-grid">

          {/* Left */}
          <div>
            <div style={{ borderLeft: '3px solid #1bbc9b', paddingLeft: 14, marginBottom: 20 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#1bbc9b', margin: 0 }}>A modern and unique style</p>
            </div>

            <h2 className="section-title">Why it is best?</h2>

            <p style={{ fontSize: 15.5, color: '#64748b', lineHeight: 1.85, marginBottom: 36, maxWidth: 460 }}>
              School CloudX is the pinnacle of school management, offering advanced technology,
              user-friendly features, and personalized solutions. It simplifies communication,
              streamlines administrative tasks, and elevates the educational experience for all
              stakeholders. With School CloudX, excellence in education management is guaranteed.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {['Affordable price', 'Easy to manage admin panel', 'Data Security'].map(label => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                    border: '2px solid #1bbc9b',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                      <path d="M1 4.5L4 7.5L10 1" stroke="#1bbc9b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#374151' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={whyImg}
              alt="Why it is best"
              style={{ width: '100%', maxWidth: 480, height: 'auto', display: 'block', filter: 'drop-shadow(0 20px 48px rgba(0,0,0,0.12))' }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width: 900px) {
          .why-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media(max-width: 600px) {
          .why-grid { gap: 28px !important; }
          #info { padding: 56px 0 !important; }
        }
      `}</style>
    </section>
  )
}
