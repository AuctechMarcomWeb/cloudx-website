import { useState } from 'react'
import { Phone, Mail, MapPin, Send } from 'lucide-react'

export default function CtaSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" style={{ background: '#fff', padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span className="section-badge">Contact</span>
          <h2 className="section-title">Let's get in touch</h2>
          <p className="section-sub">Have a question or just want to say hi? We'd love to hear from you.</p>
        </div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 40, maxWidth: 960, margin: '0 auto', alignItems: 'start' }}>

          {/* Form */}
          <div style={{ background: '#f8fffe', borderRadius: 20, border: '1.5px solid #e8f0fc', padding: '36px 32px', boxShadow: '0 4px 20px rgba(0,64,160,0.06)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label className="form-label">Your Name</label>
                <input className="dark-input" type="text" placeholder="e.g. Ramesh Sharma"
                  value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
              </div>
              <div>
                <label className="form-label">Email Address</label>
                <input className="dark-input" type="email" placeholder="you@school.com"
                  value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
              </div>
              <div>
                <label className="form-label">Message</label>
                <textarea className="dark-input" rows={4} placeholder="How can we help you?"
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                {sent ? '✓ Message Sent!' : <><Send size={16} /> Send</>}
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 8 }}>
            {[
              { Icon: Phone,  label: 'Phone',    color: '#0040a0', bg: 'rgba(0,64,160,0.08)',  value: 'Mobile : 1234567890' },
              { Icon: Mail,   label: 'Email',    color: '#0ea5e9', bg: 'rgba(14,165,233,0.08)',  value: 'example@gmail.com' },
              { Icon: MapPin, label: 'Location', color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', value: '#262-263, Time Square Empire, SH 42 Mirjapar highway, Bhuj - Kutch 370001 Gujarat India.' },
            ].map(({ Icon, label, color, bg, value }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, background: '#f8fffe', borderRadius: 14, border: '1.5px solid #e8f0fc', padding: '18px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} color={color} />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#374151', lineHeight: 1.5 }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </section>
  )
}
