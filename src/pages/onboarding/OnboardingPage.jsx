import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import StepLeadInfo from './StepLeadInfo'
import StepVerifyOtp from './StepVerifyOtp'
import StepSchoolCreate from './StepSchoolCreate'
import StepSuccess from './StepSuccess'

const STEPS = [
  { label: 'Your Info',    short: '01' },
  { label: 'Verify OTP',  short: '02' },
  { label: 'School Info', short: '03' },
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [state, setState] = useState({
    registrationId: null, email: '', mobileNo: '', contactName: '', successData: null,
  })

  const next = (patch = {}) => { setState(s => ({ ...s, ...patch })); setStep(s => s + 1) }
  const back = () => setStep(s => s - 1)
  const isSuccess = step === STEPS.length

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(160deg,#f0fdf9 0%,#e8f0fc 40%,#f0f9ff 100%)', position:'relative', overflow:'hidden' }}>

      {/* Decorative blobs */}
      <div style={{ position:'fixed', top:-200, right:-200, width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(0,64,160,0.12) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'fixed', bottom:-200, left:-200, width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(14,165,233,0.1) 0%,transparent 70%)', pointerEvents:'none' }} />

      {/* Header */}
      <header style={{
        padding:'0 24px', borderBottom:'1px solid rgba(0,64,160,0.15)',
        background:'rgba(255,255,255,0.92)', backdropFilter:'blur(20px)',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        position:'sticky', top:0, zIndex:50, height:64,
      }}>
        <button onClick={() => navigate('/')} style={{ display:'flex', alignItems:'center', gap:8, background:'none', border:'none', cursor:'pointer', color:'#64748b', fontSize:14, fontWeight:500, transition:'color 0.2s' }}
          onMouseEnter={e=>e.currentTarget.style.color='#0040a0'} onMouseLeave={e=>e.currentTarget.style.color='#64748b'}>
          <ArrowLeft size={16} /> Back to Home
        </button>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <img src="/auctech-logo.png" alt="CloudX" style={{ height:34, objectFit:'contain' }} />
        </div>
        <div style={{ fontSize:13, color:'#94a3b8', fontWeight:500 }}>
          {isSuccess ? <span style={{ color:'#0040a0', fontWeight:700 }}>Complete ✓</span> : `Step ${step + 1} of ${STEPS.length}`}
        </div>
      </header>

      {/* Progress Bar */}
      {!isSuccess && (
        <div style={{ height:3, background:'rgba(0,64,160,0.1)' }}>
          <div style={{ height:'100%', width:`${((step+1)/STEPS.length)*100}%`, background:'linear-gradient(90deg,#0040a0,#0ea5e9)', transition:'width 0.4s ease', borderRadius:'0 3px 3px 0' }} />
        </div>
      )}

      <div style={{ maxWidth:640, margin:'0 auto', padding:'40px 24px 80px' }}>

        {/* Step indicators */}
        {!isSuccess && (
          <div style={{ display:'flex', justifyContent:'center', gap:0, marginBottom:40 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center' }}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', minWidth:90 }}>
                  <div style={{
                    width:40, height:40, borderRadius:'50%',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontWeight:700, fontSize:13,
                    background: i < step ? 'linear-gradient(135deg,#0040a0,#002f80)' : i === step ? '#fff' : '#fff',
                    color: i < step ? '#fff' : i === step ? '#0040a0' : '#94a3b8',
                    border: i < step ? 'none' : i === step ? '2.5px solid #0040a0' : '2px solid #e2e8f0',
                    boxShadow: i === step ? '0 0 0 4px rgba(0,64,160,0.15)' : 'none',
                    transition:'all 0.3s',
                  }}>
                    {i < step ? <CheckCircle size={18} /> : s.short}
                  </div>
                  <span style={{ fontSize:11.5, marginTop:8, color: i <= step ? '#0040a0' : '#94a3b8', fontWeight: i === step ? 700 : 500, textAlign:'center', whiteSpace:'nowrap' }}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ width:64, height:2, background: i < step ? '#0040a0' : '#e2e8f0', marginBottom:22, transition:'background 0.3s', borderRadius:2 }} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Step content */}
        <div key={step} style={{ animation:'fadeInUp 0.35s ease both' }}>
          {step === 0 && <StepLeadInfo onNext={d => next({ registrationId:d.registrationId, email:d.email, mobileNo:d.mobileNo, contactName:d.contactName })} />}
          {step === 1 && <StepVerifyOtp registrationId={state.registrationId} schoolEmail={state.email} mobileNo={state.mobileNo} onNext={() => next()} onBack={back} />}
          {step === 2 && <StepSchoolCreate registrationId={state.registrationId} contactName={state.contactName} onNext={d => next({ successData:d })} onBack={back} />}
          {step === 3 && <StepSuccess data={state.successData} />}
        </div>
      </div>

      <Toaster position="top-right" toastOptions={{
        style:{ background:'#fff', color:'#1a1a2e', border:'1px solid #ccdaf5', borderRadius:10, fontSize:14, boxShadow:'0 8px 24px rgba(0,64,160,0.15)' },
        success:{ iconTheme:{ primary:'#0040a0', secondary:'#fff' } },
        error:{ iconTheme:{ primary:'#ef4444', secondary:'#fff' } },
      }} />

      <style>{`
        @keyframes confettiFall {
          to { transform: translateY(100vh) rotate(360deg); opacity:0; }
        }
      `}</style>
    </div>
  )
}
