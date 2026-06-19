import { useState, useEffect } from 'react'
import axios from 'axios'
import { Check, Zap, Star, ArrowRight, ArrowLeft } from 'lucide-react'

const API = import.meta.env.VITE_API_BASE_URL

const FALLBACK_PLANS = [
  {
    _id: 'starter',
    name: 'Starter',
    targetSchoolSize: 'Small',
    description: 'Perfect for up to 500 students',
    price: 2500,
    pricingModel: 'FIXED',
    billingCycle: 'Monthly',
    studentLimit: 500,
    trialDays: 30,
    isPopular: false,
    yearlyDiscountPercent: 15,
    features: [
      'Student Management',
      'Fee Collection',
      'Attendance System',
      'Basic Reports',
      'Email Support',
    ],
  },
  {
    _id: 'growth',
    name: 'Growth',
    targetSchoolSize: 'Medium',
    description: 'Ideal for up to 2000 students',
    price: 6000,
    pricingModel: 'FIXED',
    billingCycle: 'Monthly',
    studentLimit: 2000,
    trialDays: 30,
    isPopular: true,
    yearlyDiscountPercent: 15,
    features: [
      'All Starter features',
      'Transport Management',
      'SMS & App Notifications',
      'Exam & Marksheet',
      'Parent Mobile App',
      'Priority Support',
    ],
  },
  {
    _id: 'enterprise',
    name: 'Enterprise',
    targetSchoolSize: 'Large',
    description: 'Unlimited students, multi-branch',
    price: 0,
    pricingModel: 'PER_STUDENT',
    pricePerStudent: 25,
    billingCycle: 'Monthly',
    studentLimit: 0,
    trialDays: 0,
    isPopular: false,
    yearlyDiscountPercent: 20,
    features: [
      'All Growth features',
      'Multi-branch Support',
      'Custom Branding',
      'Dedicated Account Manager',
      'API Access',
      '24/7 Phone Support',
    ],
  },
]

export default function StepChoosePlan({ onNext, onBack }) {
  const [plans, setPlans] = useState([])
  const [selected, setSelected] = useState(null)
  const [billing, setBilling] = useState('Monthly')
  const [students, setStudents] = useState(500)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`${API}onboarding/plans`)
      .then((r) => setPlans(r.data?.data?.plans?.length ? r.data.data.plans : FALLBACK_PLANS))
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
  const selectedPlan = plans.find((p) => p._id === selected)

  const handleNext = () => {
    if (!selectedPlan) return
    onNext({ ...selectedPlan, computedPrice: getPrice(selectedPlan), billing })
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Choose Your Plan</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>
          Select the plan that best fits your school size
        </p>
      </div>

      {/* Billing Toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
        <div
          style={{
            display: 'inline-flex',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 50,
            padding: 4,
            gap: 4,
          }}
        >
          {['Monthly', 'Yearly'].map((c) => (
            <button
              key={c}
              onClick={() => setBilling(c)}
              style={{
                padding: '8px 20px',
                borderRadius: 50,
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                transition: 'all 0.2s',
                background:
                  billing === c
                    ? 'linear-gradient(135deg,#042954,#051f3e)'
                    : 'transparent',
                color: billing === c ? '#fff' : 'rgba(255,255,255,0.45)',
              }}
            >
              {c}
              {c === 'Yearly' && (
                <span
                  style={{
                    marginLeft: 6,
                    fontSize: 10,
                    padding: '2px 6px',
                    borderRadius: 4,
                    background: 'rgba(34,197,94,0.2)',
                    color: '#4ade80',
                  }}
                >
                  SAVE
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Per-student slider */}
      {!loading && hasPerStudent && (
        <div style={{ maxWidth: 480, margin: '0 auto 24px' }}>
          <div className="glass-card" style={{ padding: '16px 20px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                Number of Students
              </span>
              <span style={{ fontWeight: 700, color: '#fabf22', fontSize: 15 }}>
                {students.toLocaleString()} students
              </span>
            </div>
            <input
              type="range"
              min={100}
              max={5000}
              step={100}
              value={students}
              onChange={(e) => setStudents(+e.target.value)}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 11,
                color: 'rgba(255,255,255,0.3)',
                marginTop: 4,
              }}
            >
              <span>100</span>
              <span>5,000</span>
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            marginBottom: 28,
          }}
        >
          {plans.map((plan) => {
            const price = getPrice(plan)
            const isSelected = selected === plan._id
            return (
              <div
                key={plan._id}
                className={`plan-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelected(plan._id)}
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  ...(plan.isPopular && !isSelected
                    ? {
                        borderColor: 'rgba(4,41,84,0.25)',
                        background: 'rgba(4,41,84,0.25)',
                      }
                    : {}),
                }}
              >
                {plan.isPopular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <span className="badge badge-popular">
                      <Star size={10} /> Most Popular
                    </span>
                  </div>
                )}

                {/* Selection indicator */}
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 14,
                      right: 14,
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg,#22c55e,#16a34a)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Check size={13} color="#fff" />
                  </div>
                )}

                <div style={{ marginBottom: 14 }}>
                  <div
                    style={{
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.4)',
                      fontWeight: 600,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                      marginBottom: 3,
                    }}
                  >
                    {plan.targetSchoolSize || 'Plan'}
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>
                    {plan.name}
                  </h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                    {plan.description}
                  </p>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontSize: 34, fontWeight: 800, color: '#fff' }}>
                      â‚¹{price.toLocaleString()}
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
                      /{billing === 'Yearly' ? 'yr' : 'mo'}
                    </span>
                  </div>
                  {plan.pricingModel === 'PER_STUDENT' && (
                    <div style={{ fontSize: 12, color: '#fabf22', marginTop: 2 }}>
                      â‚¹{plan.pricePerStudent}/student/month
                    </div>
                  )}
                  {plan.trialDays > 0 && (
                    <div style={{ marginTop: 6 }}>
                      <span className="badge badge-trial">
                        <Zap size={10} /> {plan.trialDays}-day free trial
                      </span>
                    </div>
                  )}
                </div>

                <div className="divider" />

                <ul style={{ listStyle: 'none', marginTop: 12 }}>
                  {(plan.features || []).map((f) => (
                    <li
                      key={f}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 8,
                        marginBottom: 8,
                      }}
                    >
                      <Check
                        size={13}
                        color="#22c55e"
                        style={{ marginTop: 2, flexShrink: 0 }}
                      />
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      )}

      {/* Action Buttons */}
      <button
        className="btn-primary"
        onClick={handleNext}
        disabled={!selected}
        style={{ marginBottom: 12 }}
      >
        Continue to Payment <ArrowRight size={18} />
      </button>
      <button className="btn-ghost" onClick={onBack}>
        <ArrowLeft size={16} /> Back
      </button>

      <p
        style={{
          textAlign: 'center',
          marginTop: 16,
          fontSize: 12,
          color: 'rgba(255,255,255,0.3)',
        }}
      >
        All plans include SSL security and a 99.9% uptime SLA.
      </p>
    </div>
  )
}



