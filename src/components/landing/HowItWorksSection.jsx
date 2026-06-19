import { ClipboardList, CreditCard, LogIn, Rocket } from 'lucide-react'

const STEPS = [
  { icon: ClipboardList, num: '01', title: 'Fill the Form',    desc: 'Enter your school name, email, and contact number. Takes less than 2 minutes.' },
  { icon: CreditCard,    num: '02', title: 'Choose a Plan',    desc: 'Select the right plan based on your school size. Per-student or fixed pricing.' },
  { icon: LogIn,         num: '03', title: 'Make Payment',     desc: 'Secure payment via Razorpay — UPI, Card, and NetBanking all accepted.' },
  { icon: Rocket,        num: '04', title: 'Log In',           desc: 'Credentials will be sent to your email. School fully live in 30 minutes!' },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#fabf22', letterSpacing: 2, textTransform: 'uppercase' }}>
            Process
          </span>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, marginTop: 8, marginBottom: 16 }}>
            Get started in just 4 steps
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto', fontSize: 16 }}>
            No installation, no server setup — just open a browser and get started.
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
            background: 'linear-gradient(90deg, transparent, rgba(250,191,34,0.5), transparent)',
            pointerEvents: 'none',
          }} />

          {STEPS.map(({ icon: Icon, num, title, desc }, i) => (
            <div key={num} style={{ padding: '0 16px', textAlign: 'center', animation: `fadeInUp 0.5s ease ${i * 0.1}s both` }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%', margin: '0 auto 20px',
                background: 'linear-gradient(135deg,#042954,#051f3e)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 30px rgba(4,41,84,0.5)',
                position: 'relative', zIndex: 1,
              }}>
                <Icon size={28} color="#fabf22" />
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#fabf22', letterSpacing: 2, marginBottom: 8 }}>
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
