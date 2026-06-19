import {
  Users, CreditCard, BookOpen, Bus, Bell, BarChart2,
  FileText, Shield, Smartphone,
} from 'lucide-react'

const FEATURES = [
  { icon: Users,      title: 'Student Management',   desc: 'From admission to transfer certificate — complete student lifecycle in one place.' },
  { icon: CreditCard, title: 'Fee Management',        desc: 'Online/offline collection, installments, receipts, and overdue reminders.' },
  { icon: BookOpen,   title: 'Attendance System',     desc: 'Daily attendance with teacher-wise and class-wise reports.' },
  { icon: BarChart2,  title: 'Exam & Marksheet',      desc: 'Exam scheduling, marks entry, and auto-generated report cards.' },
  { icon: Bus,        title: 'Transport Management',  desc: 'Route planning, bus tracking, and transport fee integration.' },
  { icon: Bell,       title: 'Notice & SMS',          desc: 'Instant notices to parents via app notification and SMS.' },
  { icon: FileText,   title: 'Certificates',          desc: 'Bonafide, TC, character certificate — one-click print.' },
  { icon: Shield,     title: 'Role-Based Access',     desc: 'Super Admin, Admin, Teacher — separate permissions for each role.' },
  { icon: Smartphone, title: 'Mobile Ready',          desc: 'Fully responsive interface for parents and teachers.' },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="section" style={{ position: 'relative' }}>

      {/* background grid pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#fabf22', letterSpacing: 2, textTransform: 'uppercase' }}>
            Features
          </span>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, marginTop: 8, marginBottom: 16 }}>
            One tool for every task
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto', fontSize: 16 }}>
            Eliminate separate software — School CloudX has everything built-in.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="glass-card"
              style={{
                padding: '24px',
                animation: `fadeInUp 0.5s ease ${i * 0.05}s both`,
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 12, marginBottom: 16,
                background: 'linear-gradient(135deg,rgba(4,41,84,0.4),rgba(5,31,62,0.4))',
                border: '1px solid rgba(250,191,34,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={22} color="#fabf22" />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#fff' }}>{title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
