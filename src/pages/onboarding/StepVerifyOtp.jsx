import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ArrowRight, ArrowLeft, Mail, Phone, RefreshCw } from 'lucide-react'

const API = import.meta.env.VITE_API_BASE_URL

// ─── Static demo OTP for phone (no WhatsApp/SMS API yet) ───────────────────
const STATIC_PHONE_OTP = '123456'

export default function StepVerifyOtp({ registrationId, schoolEmail, mobileNo, onNext, onBack }) {
  const [mode, setMode]           = useState('email')
  const [otp, setOtp]             = useState(['', '', '', '', '', ''])
  const [loading, setLoading]     = useState(false)
  const [resending, setResending] = useState(false)
  const [timer, setTimer]         = useState(60)
  const [canResend, setCanResend] = useState(false)
  const refs = useRef([])
  const timerRef = useRef(null)

  // Reset state + restart timer whenever mode changes
  useEffect(() => {
    setOtp(['', '', '', '', '', ''])
    setTimer(60)
    setCanResend(false)
    clearInterval(timerRef.current)

    setTimeout(() => refs.current[0]?.focus(), 50)

    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) { clearInterval(timerRef.current); setCanResend(true); return 0 }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [mode])

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

  // ── Verify ──────────────────────────────────────────────────────────────
  const verify = async () => {
    const otpStr = otp.join('')
    if (otpStr.length < 6) { toast.error('Please enter the 6-digit OTP'); return }

    // Phone mode: static OTP check (no API)
    if (mode === 'phone') {
      if (otpStr === STATIC_PHONE_OTP) {
        toast.success('Phone number verified successfully!')
        onNext()
      } else {
        toast.error('Invalid OTP. Use the demo OTP shown below.')
      }
      return
    }

    // Email mode: real API call
    setLoading(true)
    try {
      const res = await axios.post(`${API}onboarding/verify-lead-otp`, { registrationId, otp: otpStr })
      toast.success(res.data.message || 'Email verified successfully!')
      onNext()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Invalid OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── Resend ───────────────────────────────────────────────────────────────
  const resend = async () => {
    // Phone mode: just reset timer, show toast with static OTP
    if (mode === 'phone') {
      toast.success(`Demo OTP resent! Use: ${STATIC_PHONE_OTP}`, { duration: 5000 })
      setTimer(60)
      setCanResend(false)
      setOtp(['', '', '', '', '', ''])
      refs.current[0]?.focus()
      // restart timer
      clearInterval(timerRef.current)
      timerRef.current = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) { clearInterval(timerRef.current); setCanResend(true); return 0 }
          return t - 1
        })
      }, 1000)
      return
    }

    // Email mode: real API call
    setResending(true)
    try {
      const res = await axios.post(`${API}onboarding/resend-otp`, { registrationId })
      toast.success(res.data.message || 'OTP resent successfully!')
      setTimer(60)
      setCanResend(false)
      setOtp(['', '', '', '', '', ''])
      refs.current[0]?.focus()
      clearInterval(timerRef.current)
      timerRef.current = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) { clearInterval(timerRef.current); setCanResend(true); return 0 }
          return t - 1
        })
      }, 1000)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to resend OTP. Please try again.')
    } finally {
      setResending(false)
    }
  }

  const filled = otp.join('').length === 6

  // Mask helpers
  const maskedEmail = schoolEmail
    ? schoolEmail.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => a + '*'.repeat(Math.min(b.length, 5)) + c)
    : ''
  const maskedPhone = mobileNo
    ? mobileNo.replace(/(\d{2})(\d+)(\d{2})/, (_, a, b, c) => a + '*'.repeat(b.length) + c)
    : ''

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', margin: '0 auto 16px',
          background: 'linear-gradient(135deg,#042954,#051f3e)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 30px rgba(4,41,84,0.3)',
          transition: 'all 0.3s',
        }}>
          {mode === 'email' ? <Mail size={32} color="#fff" /> : <Phone size={32} color="#fff" />}
        </div>

        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#fff' }}>
          {mode === 'email' ? 'Verify Your Email' : 'Verify Your Phone'}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>
          {mode === 'email'
            ? <>We sent a 6-digit OTP to <strong style={{ color: '#fabf22' }}>{maskedEmail}</strong></>
            : <>Enter the OTP for <strong style={{ color: '#fabf22' }}>{maskedPhone}</strong></>
          }
        </p>
      </div>

      <div className="glass-card" style={{ padding: 32 }}>

        {/* Mode Toggle Tabs */}
        <div style={{
          display: 'flex',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: 12,
          padding: 4,
          marginBottom: 28,
          gap: 4,
        }}>
          {[
            { key: 'email', label: 'Email OTP', Icon: Mail },
            { key: 'phone', label: 'Phone OTP', Icon: Phone },
          ].map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              style={{
                flex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                padding: '10px 0',
                borderRadius: 9,
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                transition: 'all 0.25s',
                background: mode === key
                  ? 'linear-gradient(135deg,#042954,#051f3e)'
                  : 'transparent',
                color: mode === key ? '#fff' : 'rgba(255,255,255,0.4)',
                boxShadow: mode === key ? '0 4px 14px rgba(4,41,84,0.4)' : 'none',
              }}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {/* ── Phone demo notice ── */}
        {mode === 'phone' && (
          <div style={{
            background: 'rgba(250,191,34,0.08)',
            border: '1px solid rgba(250,191,34,0.25)',
            borderRadius: 10,
            padding: '12px 16px',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <span style={{ fontSize: 18 }}>🔧</span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#fabf22', margin: 0 }}>
                Demo Mode — WhatsApp/SMS API coming soon
              </p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: '3px 0 0' }}>
                Use static OTP: <strong style={{ color: '#fff', letterSpacing: 3 }}>{STATIC_PHONE_OTP}</strong>
              </p>
            </div>
          </div>
        )}

        {/* OTP Boxes */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 28 }} onPaste={handlePaste}>
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
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          {canResend ? (
            <button
              onClick={resend}
              disabled={resending}
              style={{
                background: 'none', border: 'none', color: '#fabf22',
                cursor: 'pointer', fontSize: 14,
                display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 500,
              }}
            >
              <RefreshCw size={14} /> {resending ? 'Sending...' : 'Resend OTP'}
            </button>
          ) : (
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
              Resend available in <strong style={{ color: '#fabf22' }}>{timer}s</strong>
            </span>
          )}
        </div>

        <button className="btn-primary" onClick={verify} disabled={loading || !filled}>
          {loading
            ? <><div className="spinner" /> Verifying...</>
            : <>Verify & Continue <ArrowRight size={18} /></>
          }
        </button>

        <button className="btn-ghost" onClick={onBack} style={{ marginTop: 12 }} disabled={loading}>
          <ArrowLeft size={16} /> Back
        </button>
      </div>
    </div>
  )
}
