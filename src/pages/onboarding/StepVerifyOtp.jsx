import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ArrowRight, ArrowLeft, Mail, RefreshCw } from 'lucide-react'

const API = import.meta.env.VITE_API_BASE_URL

export default function StepVerifyOtp({ registrationId, schoolEmail, onNext, onBack }) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [timer, setTimer] = useState(60)
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
    if (otpStr.length < 6) { toast.error('6-digit OTP daalo'); return }
    setLoading(true)
    try {
      const res = await axios.post(`${API}onboarding/verify-otp`, { registrationId, otp: otpStr })
      toast.success(res.data.message)
      onNext()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  const resend = async () => {
    setResending(true)
    try {
      await axios.post(`${API}onboarding/register`, { schoolEmail })
      toast.success('OTP resent!')
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
    <div>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', margin: '0 auto 16px',
          background: 'linear-gradient(135deg,#6366f1,#3b82f6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 30px rgba(99,102,241,0.3)',
        }}>
          <Mail size={32} color="#fff" />
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Email Verify Karo</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>
          OTP bheja gaya hai: <strong style={{ color: '#818cf8' }}>{schoolEmail}</strong>
        </p>
      </div>

      <div className="glass-card" style={{ padding: 32 }}>

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
            <button onClick={resend} disabled={resending}
              style={{ background: 'none', border: 'none', color: '#818cf8', cursor: 'pointer', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 500 }}>
              <RefreshCw size={14} /> {resending ? 'Sending...' : 'Resend OTP'}
            </button>
          ) : (
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
              Resend in <strong style={{ color: '#818cf8' }}>{timer}s</strong>
            </span>
          )}
        </div>

        <button className="btn-primary" onClick={verify} disabled={loading || !filled}>
          {loading ? <><div className="spinner" /> Verifying...</> : <>Verify & Continue <ArrowRight size={18} /></>}
        </button>

        <button className="btn-ghost" onClick={onBack} style={{ marginTop: 12 }} disabled={loading}>
          <ArrowLeft size={16} /> Back
        </button>
      </div>
    </div>
  )
}
