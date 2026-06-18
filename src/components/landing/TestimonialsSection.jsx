import { Star } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Ramesh Kumar',
    role: 'Principal, DPS Lucknow',
    avatar: 'RK',
    color: '#6366f1',
    quote: 'CloudX ne humari school management completely transform kar di. Fee collection aur attendance tracking ab bahut aasaan ho gaya hai.',
    stars: 5,
  },
  {
    name: 'Sunita Sharma',
    role: 'Director, St. Mary\'s School, Kanpur',
    avatar: 'SS',
    color: '#3b82f6',
    quote: 'Pehle 4 alag softwares use karte the. Ab sab ek jagah — CloudX pe. Staff ka time bachta hai, parents happy hain.',
    stars: 5,
  },
  {
    name: 'Arvind Singh',
    role: 'Administrator, Modern Academy, Agra',
    avatar: 'AS',
    color: '#06b6d4',
    quote: '30 din trial mein hi convince ho gaye. Setup bahut aasaan tha aur support team ne haath pakad ke sab sikhaya.',
    stars: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#6366f1', letterSpacing: 2, textTransform: 'uppercase' }}>
            Testimonials
          </span>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, marginTop: 8, marginBottom: 16 }}>
            Schools jo CloudX use kar rahe hain
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {TESTIMONIALS.map(({ name, role, avatar, color, quote, stars }, i) => (
            <div
              key={name}
              className="glass-card"
              style={{ padding: 28, animation: `fadeInUp 0.5s ease ${i * 0.1}s both` }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                {Array.from({ length: stars }).map((_, j) => (
                  <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>

              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 24, fontStyle: 'italic' }}>
                "{quote}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${color}, ${color}88)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 14, color: '#fff', flexShrink: 0,
                }}>
                  {avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#fff' }}>{name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
