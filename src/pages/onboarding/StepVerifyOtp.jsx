import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ArrowRight, ArrowLeft, RefreshCw, ShieldCheck } from 'lucide-react'

const API = import.meta.env.VITE_API_BASE_URL

export default function StepVerifyOtp({ registrationId, schoolEmail, onNext, onBack }) {
  const [otp, setOtp] = useState(['','','','','',''])
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const refs = useRef([])
  const timerRef = useRef(null)

  useEffect(() => {
    setOtp(['','','','','',''])
    setTimer(60); setCanResend(false)
    clearInterval(timerRef.current)
    setTimeout(() => refs.current[0]?.focus(), 50)
    timerRef.current = setInterval(() => {
      setTimer(t => { if (t <= 1) { clearInterval(timerRef.current); setCanResend(true); return 0 } return t - 1 })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  const handleChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]; next[idx] = val; setOtp(next)
    if (val && idx < 5) refs.current[idx + 1]?.focus()
  }
  const handleKey = (e, idx) => { if (e.key === 'Backspace' && !otp[idx] && idx > 0) refs.current[idx - 1]?.focus() }
  const handlePaste = (e) => {
    const p = e.clipboardData.getData('text').replace(/\D/g,'').slice(0,6)
    if (p.length === 6) { setOtp(p.split('')); refs.current[5]?.focus() }
  }

  const verify = async () => {
    const otpStr = otp.join('')
    if (otpStr.length < 6) { toast.error('Please enter the 6-digit OTP'); return }
    setLoading(true)
    try {
      const res = await axios.post(`${API}onboarding/verify-lead-otp`, { registrationId, otp: otpStr })
      toast.success(res.data.message || 'Email verified!')
      onNext()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Invalid OTP. Please try again.')
    } finally { setLoading(false) }
  }

  const resend = async () => {
    setResending(true)
    try {
      const res = await axios.post(`${API}onboarding/resend-otp`, { registrationId })
      toast.success(res.data.message || 'OTP resent!')
      setTimer(60); setCanResend(false); setOtp(['','','','','','']); refs.current[0]?.focus()
      clearInterval(timerRef.current)
      timerRef.current = setInterval(() => setTimer(t => { if (t<=1){clearInterval(timerRef.current);setCanResend(true);return 0} return t-1 }), 1000)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to resend OTP.')
    } finally { setResending(false) }
  }

  const filled = otp.join('').length === 6
  const maskedEmail = schoolEmail
    ? schoolEmail.replace(/(.{2})(.*)(@.*)/, (_,a,b,c) => a + '*'.repeat(Math.min(b.length, 5)) + c)
    : ''

  return (
    <div>
      {/* Header */}
      <div style={{ textAlign:'center', marginBottom:28 }}>
        <h2 style={{ fontSize:24, fontWeight:700, marginBottom:6, color:'#1a1a2e' }}>
          Verify Your Email
        </h2>
        <p style={{ color:'#64748b', fontSize:14 }}>
          We sent a 6-digit code to <strong style={{ color:'#0040a0' }}>{maskedEmail}</strong>
        </p>
      </div>

      {/* Card */}
      <div style={{
        background:'#fff', borderRadius:16, border:'1px solid #e2e8f0',
        padding:28, boxShadow:'0 2px 12px rgba(0,0,0,0.06)',
      }}>
        {/* OTP Boxes */}
        <div style={{ display:'flex', justifyContent:'center', gap:8, marginBottom:20 }} onPaste={handlePaste}>
          {otp.map((d, i) => (
            <input
              key={i}
              ref={el => refs.current[i] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={e => handleChange(e.target.value, i)}
              onKeyDown={e => handleKey(e, i)}
              className="otp-input"
              style={{ color:'#1a1a2e', background: d ? '#e8f0fc' : '#f9fafb', borderColor: d ? '#0040a0' : '#e2e8f0' }}
            />
          ))}
        </div>

        {/* Resend */}
        <div style={{ textAlign:'center', marginBottom:22 }}>
          {canResend ? (
            <button
              onClick={resend}
              disabled={resending}
              style={{ background:'none', border:'none', color:'#0040a0', cursor:'pointer', fontSize:13, display:'inline-flex', alignItems:'center', gap:5, fontWeight:600, fontFamily:'inherit' }}
            >
              <RefreshCw size={13} /> {resending ? 'Sending...' : 'Resend Code'}
            </button>
          ) : (
            <span style={{ color:'#94a3b8', fontSize:13 }}>
              Resend in <strong style={{ color:'#0040a0' }}>{timer}s</strong>
            </span>
          )}
        </div>

        {/* Verify button */}
        <button
          onClick={verify}
          disabled={loading || !filled}
          className="btn-primary btn-block"
          style={{ marginBottom:10 }}
        >
          {loading ? <><div className="spinner" /> Verifying...</> : <>Verify & Continue <ArrowRight size={16} /></>}
        </button>

        {/* Back button */}
        <div style={{ textAlign:'center', marginTop:4 }}>
          <button
            onClick={onBack}
            disabled={loading}
            className="btn-ghost"
          >
            <ArrowLeft size={13} /> Back
          </button>
        </div>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:5, marginTop:18, color:'#94a3b8', fontSize:12 }}>
          <ShieldCheck size={12} color="#0040a0" /> Secured with 256-bit SSL encryption
        </div>
      </div>
    </div>
  )
}
