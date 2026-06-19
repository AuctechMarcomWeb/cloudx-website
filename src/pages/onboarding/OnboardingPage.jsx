import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ArrowLeft } from 'lucide-react'
import StepLeadInfo from './StepLeadInfo'
import StepVerifyOtp from './StepVerifyOtp'
import StepSchoolCreate from './StepSchoolCreate'
import StepSuccess from './StepSuccess'

/**
 * New 2-Step Flow:
 *  Step 0 → Lead Info (subdomain + name + mobile + whatsapp + email)
 *  Step 1 → OTP Verify
 *  Step 2 → School Details (name, address, logo, affiliation)
 *  Step 3 → Success (credentials sent)
 */
const STEPS = [
  { label: 'Your Info',   short: '01' },
  { label: 'Verify OTP', short: '02' },
  { label: 'School Info', short: '03' },
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [state, setState] = useState({
    registrationId: null,
    email: '',
    mobileNo: '',
    contactName: '',
    successData: null,
  })

  const next = (patch = {}) => {
    setState((s) => ({ ...s, ...patch }))
    setStep((s) => s + 1)
  }
  const back = () => setStep((s) => s - 1)

  const totalSteps = STEPS.length
  const isSuccess  = step === totalSteps

  return (
    <div style={{ minHeight: '100vh', background: '#021a3a', position: 'relative', overflow: 'hidden' }}>

      {/* Background blobs */}
      <div style={{ position: 'fixed', top: -200, left: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(4,41,84,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: -200, right: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(250,191,34,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Header */}
      <header style={{
        padding: '16px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(2,26,58,0.8)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <button
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: 14 }}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg,#042954,#051f3e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, color: '#fff' }}>C</div>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>School CloudX</span>
        </div>

        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
          {isSuccess ? 'Complete ✓' : `Step ${step + 1} of ${totalSteps}`}
        </div>
      </header>

      {/* Progress Bar */}
      {!isSuccess && (
        <div style={{ height: 3, background: 'rgba(255,255,255,0.06)' }}>
          <div style={{
            height: '100%',
            width: `${((step + 1) / totalSteps) * 100}%`,
            background: 'linear-gradient(90deg,#6366f1,#3b82f6)',
            transition: 'width 0.4s ease',
          }} />
        </div>
      )}

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Step Indicators */}
        {!isSuccess && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 0, marginBottom: 40 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 13,
                    background: i < step
                      ? 'linear-gradient(135deg,#22c55e,#16a34a)'
                      : i === step
                        ? 'linear-gradient(135deg,#042954,#051f3e)'
                        : 'rgba(255,255,255,0.07)',
                    color: '#fff',
                    border: i === step ? '2px solid rgba(4,41,84,0.4)' : '2px solid transparent',
                    boxShadow: i === step ? '0 0 20px rgba(4,41,84,0.3)' : 'none',
                    transition: 'all 0.3s',
                  }}>
                    {i < step ? '✓' : s.short}
                  </div>
                  <span style={{ fontSize: 11, marginTop: 6, color: i <= step ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)', textAlign: 'center', whiteSpace: 'nowrap' }}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ width: 60, height: 2, background: i < step ? '#22c55e' : 'rgba(255,255,255,0.08)', marginBottom: 20, transition: 'all 0.3s' }} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Step Content */}
        <div key={step} style={{ animation: 'fadeInUp 0.35s ease both' }}>

          {step === 0 && (
            <StepLeadInfo
              onNext={(data) => next({
                registrationId: data.registrationId,
                email: data.email,
                mobileNo: data.mobileNo,
                contactName: data.contactName,
              })}
            />
          )}

          {step === 1 && (
            <StepVerifyOtp
              registrationId={state.registrationId}
              schoolEmail={state.email}
              mobileNo={state.mobileNo}
              onNext={() => next()}
              onBack={back}
            />
          )}

          {step === 2 && (
            <StepSchoolCreate
              registrationId={state.registrationId}
              contactName={state.contactName}
              onNext={(data) => next({ successData: data })}
              onBack={back}
            />
          )}

          {step === 3 && (
            <StepSuccess data={state.successData} />
          )}

        </div>
      </div>

      <Toaster position="top-right" />
    </div>
  )
}
