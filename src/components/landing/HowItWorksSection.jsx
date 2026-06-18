import { ClipboardList, CreditCard, LogIn, Rocket } from 'lucide-react'

const STEPS = [
  { icon: ClipboardList, num: '01', title: 'Form Bharo',      desc: 'School ka naam, email aur contact number enter karo. Bas 2 minute lagenge.' },
  { icon: CreditCard,    num: '02', title: 'Plan Choose Karo', desc: 'Apne school size ke hisab se plan select karo. Per-student ya fixed pricing.' },
  { icon: LogIn,         num: '03', title: 'Payment Karo',     desc: 'Razorpay se secure payment — UPI, Card, NetBanking sab accepted.' },
  { icon: Rocket,        num: '04', title: 'Login Karo',       desc: 'Credentials email pe aayenge. 30 minutes mein school fully live!' },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#6366f1', letterSpacing: 2, textTransform: 'uppercase' }}>
            Process
          </span>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, marginTop: 8, marginBottom: 16 }}>
            Sirf 4 steps mein shuru karo
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto', fontSize: 16 }}>
            Koi installation nahi, koi server setup nahi — sirf browser kholo aur shuru karo.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 0,
          position: 'relative',
        }}>
          {/* Connecting line (desktop) */}
          <div style={{
            position: 'absolute', top: 36, left: '12.5%', right: '12.5%', height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)',
            pointerEvents: 'none',
          }} />

          {STEPS.map(({ icon: Icon, num, title, desc }, i) => (
            <div key={num} style={{ padding: '0 16px', textAlign: 'center', animation: `fadeInUp 0.5s ease ${i * 0.1}s both` }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%', margin: '0 auto 20px',
                background: 'linear-gradient(135deg,#6366f1,#3b82f6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 30px rgba(99,102,241,0.3)',
                position: 'relative', zIndex: 1,
              }}>
                <Icon size={28} color="#fff" />
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', letterSpacing: 2, marginBottom: 8 }}>
                STEP {num}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: '#fff' }}>{title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
