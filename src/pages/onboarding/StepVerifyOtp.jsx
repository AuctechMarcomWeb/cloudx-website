import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ArrowRight, ArrowLeft, Mail, Phone, RefreshCw, ShieldCheck } from 'lucide-react'

const API = import.meta.env.VITE_API_BASE_URL
const STATIC_PHONE_OTP = '123456'

export default function StepVerifyOtp({ registrationId, schoolEmail, mobileNo, onNext, onBack }) {
  const [mode, setMode] = useState('email')
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
  }, [mode])

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
    if (mode === 'phone') {
      if (otpStr === STATIC_PHONE_OTP) { toast.success('Phone number verified!'); onNext() }
      else toast.error('Invalid OTP. Use demo OTP shown below.')
      return
    }
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
    if (mode === 'phone') {
      toast.success(`Demo OTP: ${STATIC_PHONE_OTP}`, { duration: 5000 })
      setTimer(60); setCanResend(false); setOtp(['','','','','',''])
      clearInterval(timerRef.current)
      timerRef.current = setInterval(() => setTimer(t => { if (t<=1){clearInterval(timerRef.current);setCanResend(true);return 0} return t-1 }), 1000)
      return
    }
    setResending(true)
    try {
      const res = await axios.post(`${API}onboarding/resend-otp`, { registrationId })
      toast.success(res.data.message || 'OTP resent!')
      const devOtp = res.data.data?.devOtp
      if (devOtp) toast(`📧 Dev OTP: ${devOtp}`, { duration: 15000, icon: '🔑' })
      setTimer(60); setCanResend(false); setOtp(['','','','','','']); refs.current[0]?.focus()
      clearInterval(timerRef.current)
      timerRef.current = setInterval(() => setTimer(t => { if (t<=1){clearInterval(timerRef.current);setCanResend(true);return 0} return t-1 }), 1000)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to resend OTP.')
    } finally { setResending(false) }
  }

  const filled = otp.join('').length === 6
  const maskedEmail = schoolEmail ? schoolEmail.replace(/(.{2})(.*)(@.*)/, (_,a,b,c) => a+'*'.repeat(Math.min(b.length,5))+c) : ''
  const maskedPhone = mobileNo ? mobileNo.replace(/(\d{2})(\d+)(\d{2})/, (_,a,b,c) => a+'*'.repeat(b.length)+c) : ''

  return (
    <div>
      <div style={{ textAlign:'center', marginBottom:32 }}>
        <div style={{ width:72,height:72,borderRadius:'50%',margin:'0 auto 16px',background:'linear-gradient(135deg,#1bbc9b,#0ea5e9)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 8px 32px rgba(27,188,155,0.3)' }}>
          {mode==='email' ? <Mail size={32} color="#fff" /> : <Phone size={32} color="#fff" />}
        </div>
        <div style={{ display:'inline-flex',alignItems:'center',gap:7,background:'rgba(27,188,155,0.08)',border:'1px solid rgba(27,188,155,0.2)',borderRadius:50,padding:'5px 14px',marginBottom:14 }}>
          <span style={{ width:6,height:6,borderRadius:'50%',background:'#1bbc9b',display:'inline-block' }} />
          <span style={{ fontSize:11.5,fontWeight:700,color:'#1bbc9b',letterSpacing:'0.06em' }}>STEP 2 OF 3</span>
        </div>
        <h2 style={{ fontSize:30,fontWeight:800,marginBottom:8,color:'#1a1a2e',fontFamily:"'Lato', sans-serif" }}>
          {mode==='email' ? 'Verify Your Email' : 'Verify Your Phone'}
        </h2>
        <p style={{ color:'#64748b',fontSize:15 }}>
          {mode==='email'
            ? <>We sent a 6-digit OTP to <strong style={{ color:'#1bbc9b' }}>{maskedEmail}</strong></>
            : <>Enter OTP for <strong style={{ color:'#1bbc9b' }}>{maskedPhone}</strong></>}
        </p>
      </div>

      <div style={{ background:'#fff',borderRadius:20,border:'1.5px solid #e8faf6',padding:32,boxShadow:'0 4px 24px rgba(27,188,155,0.08)' }}>

        {/* Mode tabs */}
        <div style={{ display:'flex',background:'#f0fdf9',borderRadius:12,padding:4,marginBottom:28,gap:4 }}>
          {[{key:'email',label:'Email OTP',Icon:Mail},{key:'phone',label:'Phone OTP',Icon:Phone}].map(({key,label,Icon})=>(
            <button key={key} onClick={()=>setMode(key)} style={{
              flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:7,
              padding:'10px 0',borderRadius:9,border:'none',cursor:'pointer',fontSize:13,fontWeight:600,
              background:mode===key?'linear-gradient(135deg,#1bbc9b,#0e9f82)':'transparent',
              color:mode===key?'#fff':'#64748b',
              boxShadow:mode===key?'0 4px 14px rgba(27,188,155,0.3)':'none',
              transition:'all 0.25s',fontFamily:'inherit',
            }}><Icon size={15} />{label}</button>
          ))}
        </div>

        {/* Phone demo notice */}
        {mode==='phone' && (
          <div style={{ background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:10,padding:'12px 16px',marginBottom:24,display:'flex',alignItems:'center',gap:10 }}>
            <span style={{ fontSize:18 }}>🔧</span>
            <div>
              <p style={{ fontSize:13,fontWeight:600,color:'#d97706',margin:0 }}>Demo Mode — Use static OTP</p>
              <p style={{ fontSize:12,color:'#64748b',margin:'3px 0 0' }}>Enter: <strong style={{ color:'#1a1a2e',letterSpacing:3 }}>{STATIC_PHONE_OTP}</strong></p>
            </div>
          </div>
        )}

        {/* OTP Boxes */}
        <div style={{ display:'flex',justifyContent:'center',gap:10,marginBottom:28 }} onPaste={handlePaste}>
          {otp.map((d,i)=>(
            <input key={i} ref={el=>refs.current[i]=el} type="text" inputMode="numeric" maxLength={1} value={d}
              onChange={e=>handleChange(e.target.value,i)} onKeyDown={e=>handleKey(e,i)}
              style={{
                width:52,height:60,fontSize:22,fontWeight:700,textAlign:'center',
                background: d ? '#e8faf6' : '#f8fffe',
                border:`1.5px solid ${d?'#1bbc9b':'#e2e8f0'}`,
                borderRadius:12,color:'#1a1a2e',transition:'all 0.18s',outline:'none',
                boxShadow: d ? '0 0 0 3px rgba(27,188,155,0.1)' : 'none',
              }}
              onFocus={e=>{e.target.style.borderColor='#1bbc9b';e.target.style.boxShadow='0 0 0 3px rgba(27,188,155,0.12)'}}
              onBlur={e=>{if(!d){e.target.style.borderColor='#e2e8f0';e.target.style.boxShadow='none'}}}
            />
          ))}
        </div>

        {/* Resend */}
        <div style={{ textAlign:'center',marginBottom:24 }}>
          {canResend ? (
            <button onClick={resend} disabled={resending} style={{ background:'none',border:'none',color:'#1bbc9b',cursor:'pointer',fontSize:14,display:'inline-flex',alignItems:'center',gap:6,fontWeight:600,fontFamily:'inherit' }}>
              <RefreshCw size={14} /> {resending ? 'Sending...' : 'Resend OTP'}
            </button>
          ) : (
            <span style={{ color:'#94a3b8',fontSize:14 }}>
              Resend in <strong style={{ color:'#1bbc9b' }}>{timer}s</strong>
            </span>
          )}
        </div>

        <button onClick={verify} disabled={loading||!filled}
          style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:8,width:'100%',height:52,background:'linear-gradient(135deg,#1bbc9b,#0e9f82)',color:'#fff',border:'none',borderRadius:12,fontSize:15,fontWeight:700,cursor:'pointer',boxShadow:'0 6px 20px rgba(27,188,155,0.35)',transition:'all 0.2s',opacity:(!filled||loading)?0.6:1,fontFamily:'inherit',marginBottom:12 }}
          onMouseEnter={e=>{if(filled&&!loading)e.currentTarget.style.transform='translateY(-1px)'}}
          onMouseLeave={e=>e.currentTarget.style.transform=''}>
          {loading ? <><div className="spinner" /> Verifying...</> : <>Verify & Continue <ArrowRight size={18} /></>}
        </button>

        <button onClick={onBack} disabled={loading}
          style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:8,width:'100%',height:44,background:'transparent',color:'#64748b',border:'1.5px solid #e2e8f0',borderRadius:12,fontSize:14,fontWeight:500,cursor:'pointer',transition:'all 0.18s',fontFamily:'inherit' }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='#1bbc9b';e.currentTarget.style.color='#1bbc9b'}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor='#e2e8f0';e.currentTarget.style.color='#64748b'}}>
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:6,marginTop:20,color:'#94a3b8',fontSize:12 }}>
          <ShieldCheck size={13} color="#1bbc9b" /> Secured with 256-bit SSL encryption
        </div>
      </div>
    </div>
  )
}
