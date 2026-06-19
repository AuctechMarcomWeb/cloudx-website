import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
  ArrowLeft, Mail, CreditCard, Zap,
  GraduationCap, CalendarDays, Clock, ExternalLink, Rocket,
  Users, ShieldCheck, AlertTriangle, Check, RefreshCw, Search,
} from 'lucide-react'

const API = import.meta.env.VITE_API_BASE_URL

const STATUS_CONFIG = {
  ACTIVE:    { label: 'Active',    color: '#22c55e', bg: 'rgba(34,197,94,0.12)'  },
  TRIAL:     { label: 'Trial',     color: '#60a5fa', bg: 'rgba(4,41,84,0.2)'     },
  EXPIRED:   { label: 'Expired',   color: '#f87171', bg: 'rgba(239,68,68,0.12)'  },
  CANCELLED: { label: 'Cancelled', color: '#fb923c', bg: 'rgba(249,115,22,0.12)' },
  PENDING:   { label: 'Pending',   color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
}

// â”€â”€â”€ Step 1: Email form â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function StepEmail({ onOtpSent }) {
  const [email, setEmail]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(`${API}onboarding/my-plan/send-otp`, { email: email.trim().toLowerCase() })
      toast.success(`OTP sent to: ${email}`)
      onOtpSent(email.trim().toLowerCase())
    } catch (err) {
      const msg = err?.response?.data?.message || 'Something went wrong'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card" style={{ padding: 32 }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{
          width: 60, height: 60, borderRadius: '50%', margin: '0 auto 14px',
          background: 'linear-gradient(135deg,#042954,#051f3e)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 24px rgba(4,41,84,0.25)',
        }}>
          <Mail size={26} color="#fff" />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Enter Your Email</h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>
          An OTP will be sent to your registered school email
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="form-label">School Email</label>
        <div className="input-group" style={{ marginBottom: 20 }}>
          <div className="input-icon"><Mail size={16} /></div>
          <input
            className="dark-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@yourschool.com"
            required
          />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading
            ? <><div className="spinner" /> Sending OTP...</>
            : <>Send OTP <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} /></>
          }
        </button>
      </form>
    </div>
  )
}

// â”€â”€â”€ Step 2: OTP verify â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function StepOtp({ email, onVerified, onBack }) {
  const [otp, setOtp]         = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [timer, setTimer]     = useState(60)
  const [canResend, setCanResend] = useState(false)
  const refs = useRef([])

  useEffect(() => {
    refs.current[0]?.focus()
    const id = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) { clearInterval(id); setCanResend(true); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const handleChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]; next[idx] = val; setOtp(next)
    if (val && idx < 5) refs.current[idx + 1]?.focus()
  }

  const handleKey = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) refs.current[idx - 1]?.focus()
  }

  const handlePaste = (e) => {
    const p = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (p.length === 6) { setOtp(p.split('')); refs.current[5]?.focus() }
  }

  const verify = async () => {
    const otpStr = otp.join('')
    if (otpStr.length < 6) { toast.error('Please enter the 6-digit OTP'); return }
    setLoading(true)
    try {
      const res = await axios.post(`${API}onboarding/my-plan`, {
        email,
        otp: otpStr,
      })
      onVerified(res.data.data)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  const resend = async () => {
    setResending(true)
    try {
      await axios.post(`${API}onboarding/my-plan/send-otp`, { email })
      toast.success('OTP resent successfully!')
      setTimer(60); setCanResend(false); setOtp(['', '', '', '', '', ''])
      refs.current[0]?.focus()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed')
    } finally {
      setResending(false)
    }
  }

  const filled = otp.join('').length === 6

  return (
    <div className="glass-card" style={{ padding: 32 }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{
          width: 60, height: 60, borderRadius: '50%', margin: '0 auto 14px',
          background: 'linear-gradient(135deg,#042954,#051f3e)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 24px rgba(4,41,84,0.25)',
        }}>
          <ShieldCheck size={26} color="#fff" />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Verify OTP</h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>
          OTP sent to: <strong style={{ color: '#fabf22' }}>{email}</strong>
        </p>
      </div>

      {/* OTP boxes */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 24 }} onPaste={handlePaste}>
        {otp.map((d, i) => (
          <input
            key={i}
            ref={(el) => (refs.current[i] = el)}
            className={`otp-input ${d ? 'filled' : ''}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKey(e, i)}
          />
        ))}
      </div>

      {/* Resend */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        {canResend ? (
          <button onClick={resend} disabled={resending}
            style={{ background: 'none', border: 'none', color: '#fabf22', cursor: 'pointer', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <RefreshCw size={13} /> {resending ? 'Sending...' : 'Resend OTP'}
          </button>
        ) : (
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
            Resend in <strong style={{ color: '#fabf22' }}>{timer}s</strong>
          </span>
        )}
      </div>

      <button className="btn-primary" onClick={verify} disabled={loading || !filled} style={{ marginBottom: 10 }}>
        {loading ? <><div className="spinner" /> Verifying...</> : <>Verify & View Plan <Check size={16} /></>}
      </button>
      <button className="btn-ghost" onClick={onBack} disabled={loading}>
        <ArrowLeft size={15} /> Change Email
      </button>
    </div>
  )
}

// â”€â”€â”€ Step 3: Plan result â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function PlanResult({ result, onReset }) {
  const { school, plan } = result
  const statusCfg = STATUS_CONFIG[plan?.status] || STATUS_CONFIG.PENDING

  const formatDate = (d) => d
    ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    : 'â€”'

  return (
    <div style={{ animation: 'fadeInUp 0.35s ease both' }}>

      {/* School header */}
      <div className="glass-card" style={{ padding: 20, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 12, flexShrink: 0, overflow: 'hidden',
          background: 'rgba(4,41,84,0.25)', border: '1px solid rgba(4,41,84,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {school.logo
            ? <img src={school.logo} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} />
            : <ShieldCheck size={22} color="#fabf22" />
          }
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>{school.name}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{school.email}</div>
          <div style={{ fontSize: 11, color: '#fabf22', marginTop: 3, fontFamily: 'monospace' }}>
            {school.subdomain}.schoolcloudx.com
          </div>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20,
          background: school.isActive ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
          color: school.isActive ? '#4ade80' : '#f87171',
        }}>
          {school.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      {/* Plan card */}
      <div className="glass-card" style={{
        padding: 24, marginBottom: 16,
        border: `1px solid ${statusCfg.color}33`,
        background: statusCfg.bg,
      }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {plan.isTrial ? <Zap size={18} color="#60a5fa" /> : <CreditCard size={18} color="#fabf22" />}
            <span style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{plan.name}</span>
            {plan.isTrial && (
              <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: 'rgba(4,41,84,0.15)', color: '#60a5fa' }}>TRIAL</span>
            )}
          </div>
          <span style={{
            fontSize: 12, fontWeight: 700, padding: '5px 14px', borderRadius: 20,
            background: statusCfg.bg, color: statusCfg.color,
            border: `1px solid ${statusCfg.color}44`,
          }}>
            {statusCfg.label}
          </span>
        </div>

        {/* Price */}
        <div style={{ marginBottom: 18 }}>
          {plan.isTrial
            ? <div style={{ fontSize: 32, fontWeight: 800, color: '#4ade80' }}>FREE</div>
            : (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontSize: 32, fontWeight: 800, color: '#fff' }}>
                  â‚¹{Number(plan.price || 0).toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                  /{plan.billingCycle === 'Yearly' ? 'year' : 'month'}
                </span>
              </div>
            )
          }
        </div>

        <div className="divider" />

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
          <StatItem icon={GraduationCap} label="Student Limit"
            value={plan.studentLimit > 0 ? plan.studentLimit.toLocaleString('en-IN') : 'Unlimited'} />
          <StatItem icon={Users} label="Students Used"
            value={`${plan.usedStudents || 0} / ${plan.studentLimit > 0 ? plan.studentLimit : 'âˆž'}`} />
          <StatItem icon={CalendarDays} label="Start Date" value={formatDate(plan.startDate)} />
          <StatItem
            icon={CalendarDays}
            label={plan.isTrial ? 'Trial Ends' : 'Valid Till'}
            value={formatDate(plan.isTrial ? plan.trialEndDate : plan.endDate)}
            highlight={plan.status === 'EXPIRED'}
          />
          {plan.billingCycle && (
            <StatItem icon={CreditCard} label="Billing Cycle" value={plan.billingCycle} />
          )}

          {/* Days left warning */}
          {plan.status !== 'EXPIRED' && (plan.daysLeft !== null || plan.trialDaysLeft !== null) && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 10,
              background: (plan.daysLeft ?? plan.trialDaysLeft) <= 7 ? 'rgba(239,68,68,0.1)'
                : (plan.daysLeft ?? plan.trialDaysLeft) <= 30 ? 'rgba(251,191,36,0.1)' : 'rgba(34,197,94,0.1)',
              border: '1px solid rgba(255,255,255,0.06)', gridColumn: '1 / -1',
            }}>
              <Clock size={14} color={
                (plan.daysLeft ?? plan.trialDaysLeft) <= 7 ? '#f87171'
                : (plan.daysLeft ?? plan.trialDaysLeft) <= 30 ? '#fbbf24' : '#4ade80'
              } />
              <div>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                  {plan.daysLeft ?? plan.trialDaysLeft} days remaining
                </span>
                {(plan.daysLeft ?? plan.trialDaysLeft) <= 30 && (
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginLeft: 6 }}>â€” Please renew soon</span>
                )}
              </div>
            </div>
          )}

          {plan.status === 'EXPIRED' && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px',
              borderRadius: 10, background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.2)', gridColumn: '1 / -1',
            }}>
              <AlertTriangle size={14} color="#f87171" />
              <span style={{ fontSize: 13, color: '#f87171', fontWeight: 600 }}>
                Your plan has expired â€” please renew
              </span>
            </div>
          )}
        </div>

        {/* Features */}
        {plan.features?.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <div className="divider" />
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: 1, textTransform: 'uppercase', margin: '14px 0 10px' }}>
              Included Features
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px' }}>
              {plan.features.map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>
                  <Check size={12} color="#22c55e" style={{ flexShrink: 0 }} /> {f}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add-ons */}
        {plan.addons?.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <div className="divider" />
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: 1, textTransform: 'uppercase', margin: '14px 0 10px' }}>
              Active Add-ons
            </div>
            {plan.addons.map((addon) => (
              <div key={addon.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{addon.name}</span>
                <span style={{ fontSize: 12, color: '#fabf22', fontWeight: 600 }}>+{addon.studentLimit} students</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <a href={school.loginUrl} target="_blank" rel="noopener noreferrer" className="btn-primary"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none', marginBottom: 10 }}>
        <Rocket size={18} /> Open School Portal <ExternalLink size={14} style={{ opacity: 0.7 }} />
      </a>
      <button className="btn-ghost" onClick={onReset}>
        <Search size={15} /> Check Another Email
      </button>
    </div>
  )
}

// â”€â”€â”€ Main Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function MyPlanPage() {
  const navigate = useNavigate()
  // step: 'email' | 'otp' | 'result'
  const [step, setStep]     = useState('email')
  const [email, setEmail]   = useState('')
  const [result, setResult] = useState(null)

  const reset = () => { setStep('email'); setEmail(''); setResult(null) }

  return (
    <div style={{ minHeight: '100vh', background: '#021a3a', position: 'relative', overflow: 'hidden' }}>

      {/* BG blobs */}
      <div style={{ position: 'fixed', top: -200, left: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(4,41,84,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: -200, right: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(250,191,34,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Header */}
      <header style={{
        padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(2,26,58,0.8)', backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <button onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
          <ArrowLeft size={16} /> Back to Home
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg,#042954,#051f3e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, color: '#fff' }}>C</div>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>School CloudX</span>
        </div>
        <div style={{ width: 100 }} />
      </header>

      <div style={{ maxWidth: 580, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Title â€” sirf email/otp step pe */}
        {step !== 'result' && (
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%', margin: '0 auto 16px',
              background: 'linear-gradient(135deg,#042954,#051f3e)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 30px rgba(4,41,84,0.25)',
            }}>
              <CreditCard size={28} color="#fff" />
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>My Plan</h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>
              {step === 'email'
                ? 'An OTP will be sent to your registered email â€” only you can view this'
                : 'Enter the OTP to view your plan details'}
            </p>
          </div>
        )}

        <div key={step} style={{ animation: 'fadeInUp 0.3s ease both' }}>
          {step === 'email' && (
            <StepEmail
              onOtpSent={(e) => { setEmail(e); setStep('otp') }}
            />
          )}
          {step === 'otp' && (
            <StepOtp
              email={email}
              onVerified={(data) => { setResult(data); setStep('result') }}
              onBack={() => setStep('email')}
            />
          )}
          {step === 'result' && result && (
            <PlanResult result={result} onReset={reset} />
          )}
        </div>

      </div>
    </div>
  )
}

/* â”€â”€ Helper â”€â”€ */
function StatItem({ icon: Icon, label, value, highlight = false }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 12px', borderRadius: 10,
      background: 'rgba(255,255,255,0.04)',
      border: `1px solid ${highlight ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.06)'}`,
    }}>
      <div style={{
        width: 30, height: 30, borderRadius: 8, flexShrink: 0,
        background: 'rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={14} color={highlight ? '#f87171' : 'rgba(255,255,255,0.5)'} />
      </div>
      <div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 13, color: highlight ? '#f87171' : 'rgba(255,255,255,0.85)', fontWeight: 600, marginTop: 1 }}>{value}</div>
      </div>
    </div>
  )
}



