import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Mail, Lock, ArrowLeft, Eye, EyeOff, RefreshCw, ShieldCheck } from 'lucide-react'
import { usePortalAuth } from '../../context/PortalAuthContext'

const API = import.meta.env.VITE_API_BASE_URL

export default function PortalLoginPage() {
  const navigate = useNavigate()
  const { login, isLoggedIn } = usePortalAuth()

  useEffect(() => {
    if (isLoggedIn) navigate('/portal/dashboard', { replace: true })
  }, [isLoggedIn])

  const [tab, setTab] = useState('password')

  return (
    <div style={{ minHeight: '100vh', background: '#021a3a', display: 'flex', flexDirection: 'column' }}>
      {/* BG */}
      <div style={{ position: 'fixed', top: -200, left: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(4,41,84,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: -200, right: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(250,191,34,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Header */}
      <header style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(2,26,58,0.9)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
          <ArrowLeft size={16} /> Back to Home
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src="/auctech-logo.png" alt="CloudX Logo" style={{ height: 36, objectFit: 'contain' }} />
        </div>
        <div style={{ width: 120 }} />
      </header>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>

          {/* Icon + Title */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ width: 68, height: 68, borderRadius: '50%', margin: '0 auto 16px', background: 'linear-gradient(135deg,#042954,#051f3e)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 32px rgba(4,41,84,0.5)' }}>
              <ShieldCheck size={30} color="#fabf22" />
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>School Portal Login</h1>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>
              Manage your plan, billing and subscription
            </p>
          </div>

          {/* Tab switcher */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 4, marginBottom: 24, border: '1px solid rgba(255,255,255,0.08)' }}>
            {[['password', 'Login with Password'], ['otp', 'Login with OTP']].map(([key, label]) => (
              <button key={key} onClick={() => setTab(key)} style={{
                flex: 1, padding: '9px 0', border: 'none', cursor: 'pointer', borderRadius: 9,
                fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
                background: tab === key ? 'linear-gradient(135deg,#042954,#051f3e)' : 'transparent',
                color: tab === key ? '#fabf22' : 'rgba(255,255,255,0.45)',
              }}>
                {label}
              </button>
            ))}
          </div>

          <div key={tab} style={{ animation: 'fadeInUp 0.25s ease both' }}>
            {tab === 'password'
              ? <PasswordLoginForm onSuccess={(tok, sch) => { login(tok, sch); navigate('/portal/dashboard') }} />
              : <OtpLoginForm onSuccess={(tok, sch) => { login(tok, sch); navigate('/portal/dashboard') }} />
            }
          </div>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
            New here?{' '}
            <button onClick={() => navigate('/register')} style={{ background: 'none', border: 'none', color: '#fabf22', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
              Register now
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── Password Login Form ── */
function PasswordLoginForm({ onSuccess }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(`${API}portal/login`, { email: email.trim().toLowerCase(), password })
      onSuccess(res.data.data.token, res.data.data.school)
      toast.success('Login successful!')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card" style={{ padding: 28 }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label className="form-label">School Email</label>
          <div className="input-group">
            <div className="input-icon"><Mail size={15} /></div>
            <input className="dark-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@yourschool.com" required />
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
          </div>
          <div className="input-group">
            <div className="input-icon"><Lock size={15} /></div>
            <input className="dark-input" type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={{ paddingRight: 44 }} />
            <button type="button" onClick={() => setShowPass(v => !v)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 12px', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center' }}>
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? <><div className="spinner" /> Logging in...</> : 'Login'}
        </button>
      </form>
    </div>
  )
}

/* ── OTP Login Form ── */
function OtpLoginForm({ onSuccess }) {
  const [step, setStep]           = useState('email')
  const [email, setEmail]         = useState('')
  const [otp, setOtp]             = useState(['', '', '', '', '', ''])
  const [loading, setLoading]     = useState(false)
  const [resending, setResending] = useState(false)
  const [timer, setTimer]         = useState(60)
  const [canResend, setCanResend] = useState(false)
  const refs = useRef([])

  useEffect(() => {
    if (step !== 'otp') return
    refs.current[0]?.focus()
    const id = setInterval(() => {
      setTimer(t => { if (t <= 1) { clearInterval(id); setCanResend(true); return 0 } return t - 1 })
    }, 1000)
    return () => clearInterval(id)
  }, [step])

  const sendOtp = async (e) => {
    e?.preventDefault()
    setLoading(true)
    try {
      await axios.post(`${API}portal/send-otp`, { email: email.trim().toLowerCase() })
      toast.success(`OTP sent to: ${email}`)
      setStep('otp'); setTimer(60); setCanResend(false); setOtp(['','','','','',''])
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed')
    } finally {
      setLoading(false)
    }
  }

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
      const res = await axios.post(`${API}portal/verify-otp`, { email, otp: otpStr })
      onSuccess(res.data.data.token, res.data.data.school)
      toast.success('Login successful!')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'email') {
    return (
      <div className="glass-card" style={{ padding: 28 }}>
        <form onSubmit={sendOtp}>
          <div style={{ marginBottom: 20 }}>
            <label className="form-label">School Email</label>
            <div className="input-group">
              <div className="input-icon"><Mail size={15} /></div>
              <input className="dark-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@yourschool.com" required />
            </div>
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <><div className="spinner" /> Sending...</> : 'Send OTP'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="glass-card" style={{ padding: 28 }}>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20, textAlign: 'center' }}>
        OTP sent to: <strong style={{ color: '#fabf22' }}>{email}</strong>
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }} onPaste={handlePaste}>
        {otp.map((d, i) => (
          <input key={i} ref={el => refs.current[i] = el}
            className={`otp-input ${d ? 'filled' : ''}`}
            type="text" inputMode="numeric" maxLength={1} value={d}
            onChange={e => handleChange(e.target.value, i)}
            onKeyDown={e => handleKey(e, i)}
          />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginBottom: 18 }}>
        {canResend
          ? <button onClick={() => sendOtp()} disabled={resending}
              style={{ background: 'none', border: 'none', color: '#fabf22', cursor: 'pointer', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <RefreshCw size={12} /> Resend OTP
            </button>
          : <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>Resend in <strong style={{ color: '#fabf22' }}>{timer}s</strong></span>
        }
      </div>

      <button className="btn-primary" onClick={verify} disabled={loading || otp.join('').length < 6} style={{ marginBottom: 10 }}>
        {loading ? <><div className="spinner" /> Verifying...</> : 'Verify & Login'}
      </button>
      <button className="btn-ghost" onClick={() => setStep('email')} disabled={loading}>
        <ArrowLeft size={14} /> Change Email
      </button>
    </div>
  )
}
