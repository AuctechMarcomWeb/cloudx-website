import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Check, Zap, Star } from 'lucide-react'

const API = import.meta.env.VITE_API_BASE_URL

// Fallback plans if API not available
const FALLBACK_PLANS = [
  {
    _id: 'small', name: 'Starter', targetSchoolSize: 'Small',
    description: '500 tak students',
    price: 2500, pricingModel: 'FIXED', billingCycle: 'Monthly',
    studentLimit: 500, trialDays: 30, isPopular: false,
    yearlyDiscountPercent: 15,
    features: ['Student Management', 'Fee Collection', 'Attendance', 'Basic Reports'],
  },
  {
    _id: 'medium', name: 'Growth', targetSchoolSize: 'Medium',
    description: '2000 tak students',
    price: 6000, pricingModel: 'FIXED', billingCycle: 'Monthly',
    studentLimit: 2000, trialDays: 30, isPopular: true,
    yearlyDiscountPercent: 15,
    features: ['Sab Starter features', 'Transport', 'SMS Alerts', 'Marksheet', 'Mobile App'],
  },
  {
    _id: 'large', name: 'Enterprise', targetSchoolSize: 'Large',
    description: 'Unlimited students',
    price: 0, pricingModel: 'PER_STUDENT', pricePerStudent: 25,
    billingCycle: 'Monthly', studentLimit: 0, trialDays: 0, isPopular: false,
    yearlyDiscountPercent: 20,
    features: ['Sab Growth features', 'Multi-branch', 'Custom branding', 'Dedicated support', 'API access'],
  },
]

export default function PricingSection() {
  const navigate = useNavigate()
  const [plans, setPlans] = useState([])
  const [billing, setBilling] = useState('Monthly')
  const [students, setStudents] = useState(500)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API}onboarding/plans`)
      .then((r) => setPlans(r.data.data.plans?.length ? r.data.data.plans : FALLBACK_PLANS))
      .catch(() => setPlans(FALLBACK_PLANS))
      .finally(() => setLoading(false))
  }, [])

  const getPrice = (plan) => {
    if (plan.pricingModel === 'PER_STUDENT') {
      let base = plan.pricePerStudent * Math.max(students, plan.minStudents || 0)
      if (billing === 'Yearly' && plan.yearlyDiscountPercent) {
        base = base * 12 * (1 - plan.yearlyDiscountPercent / 100)
      }
      return Math.round(base)
    }
    let price = plan.price
    if (billing === 'Yearly' && plan.yearlyDiscountPercent) {
      price = price * 12 * (1 - plan.yearlyDiscountPercent / 100)
    }
    return Math.round(price)
  }

  const hasPerStudent = plans.some((p) => p.pricingModel === 'PER_STUDENT')

  return (
    <section id="pricing" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#6366f1', letterSpacing: 2, textTransform: 'uppercase' }}>
            Pricing
          </span>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, marginTop: 8, marginBottom: 16 }}>
            Transparent pricing, koi hidden charges nahi
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto', fontSize: 16 }}>
            School size ke hisab se plan choose karo. Yearly plan pe 15-20% bachao.
          </p>
        </div>

        {/* Billing Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex', background: 'rgba(255,255,255,0.06)',
            borderRadius: 50, padding: 4, gap: 4,
          }}>
            {['Monthly', 'Yearly'].map((c) => (
              <button
                key={c}
                onClick={() => setBilling(c)}
                style={{
                  padding: '8px 24px', borderRadius: 50, border: 'none', cursor: 'pointer',
                  fontSize: 14, fontWeight: 600, transition: 'all 0.2s',
                  background: billing === c ? 'linear-gradient(135deg,#6366f1,#3b82f6)' : 'transparent',
                  color: billing === c ? '#fff' : 'rgba(255,255,255,0.45)',
                }}
              >
                {c}
                {c === 'Yearly' && (
                  <span style={{
                    marginLeft: 6, fontSize: 10, padding: '2px 6px', borderRadius: 4,
                    background: 'rgba(34,197,94,0.2)', color: '#4ade80',
                  }}>
                    SAVE
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Per-student slider */}
        {hasPerStudent && (
          <div style={{ maxWidth: 480, margin: '0 auto 40px' }}>
            <div className="glass-card" style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Number of Students</span>
                <span style={{ fontWeight: 700, color: '#818cf8', fontSize: 16 }}>{students.toLocaleString()} students</span>
              </div>
              <input type="range" min={100} max={5000} step={100} value={students} onChange={(e) => setStudents(+e.target.value)} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>
                <span>100</span><span>5,000</span>
              </div>
            </div>
          </div>
        )}

        {/* Plan Cards */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div className="spinner" style={{ margin: '0 auto', width: 32, height: 32 }} />
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
            {plans.map((plan) => {
              const price = getPrice(plan)
              return (
                <div
                  key={plan._id}
                  className="plan-card"
                  style={{ position: 'relative', ...(plan.isPopular ? { borderColor: '#6366f1', background: 'rgba(99,102,241,0.08)' } : {}) }}
                >
                  {plan.isPopular && (
                    <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)' }}>
                      <span className="badge badge-popular">
                        <Star size={10} /> Most Popular
                      </span>
                    </div>
                  )}

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
                      {plan.targetSchoolSize || 'Plan'}
                    </div>
                    <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>{plan.name}</h3>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>{plan.description}</p>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                      <span style={{ fontSize: 40, fontWeight: 800, color: '#fff' }}>₹{price.toLocaleString()}</span>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>/{billing === 'Yearly' ? 'yr' : 'mo'}</span>
                    </div>
                    {plan.pricingModel === 'PER_STUDENT' && (
                      <div style={{ fontSize: 13, color: '#818cf8', marginTop: 4 }}>
                        ₹{plan.pricePerStudent}/student/month
                      </div>
                    )}
                    {plan.studentLimit > 0 && (
                      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                        Up to {plan.studentLimit.toLocaleString()} students
                      </div>
                    )}
                    {plan.trialDays > 0 && (
                      <div style={{ marginTop: 8 }}>
                        <span className="badge badge-trial"><Zap size={10} /> {plan.trialDays}-day free trial</span>
                      </div>
                    )}
                  </div>

                  <div className="divider" />

                  <ul style={{ listStyle: 'none', marginBottom: 24 }}>
                    {(plan.features || []).map((f) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                        <Check size={15} color="#22c55e" style={{ marginTop: 2, flexShrink: 0 }} />
                        <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => navigate('/register')}
                    style={{
                      width: '100%', padding: '13px',
                      background: plan.isPopular ? 'linear-gradient(135deg,#6366f1,#3b82f6)' : 'rgba(255,255,255,0.07)',
                      color: '#fff', border: plan.isPopular ? 'none' : '1.5px solid rgba(255,255,255,0.15)',
                      borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => { if (!plan.isPopular) e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
                    onMouseLeave={(e) => { if (!plan.isPopular) e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
                  >
                    {plan.trialDays > 0 ? `${plan.trialDays} din free try karo` : 'Register Karo'}
                  </button>
                </div>
              )
            })}
          </div>
        )}

        <p style={{ textAlign: 'center', marginTop: 32, fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
          Sab plans mein SSL security, 99.9% uptime SLA, aur email support included hai.
        </p>
      </div>
    </section>
  )
}
