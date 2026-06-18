import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ArrowLeft } from 'lucide-react'
import StepSchoolInfo from './StepSchoolInfo'
import StepVerifyOtp from './StepVerifyOtp'
import StepChoosePlan from './StepChoosePlan'
import StepPayment from './StepPayment'
import StepSuccess from './StepSuccess'

const STEPS = [
  { label: 'School Info',  short: '01' },
  { label: 'Verify Email', short: '02' },
  { label: 'Choose Plan',  short: '03' },
  { label: 'Payment',      short: '04' },
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [state, setState] = useState({
    registrationId: null,
    schoolEmail: '',
    schoolName: '',
    selectedPlan: null,
    successData: null,
  })

  const next = (patch = {}) => {
    setState((s) => ({ ...s, ...patch }))
    setStep((s) => s + 1)
  }
  const back = () => setStep((s) => s - 1)

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', position: 'relative', overflow: 'hidden' }}>

      {/* Background blobs */}
      <div style={{ position: 'fixed', top: -200, left: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: -200, right: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Header */}
      <header style={{
        padding: '16px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(10,15,30,0.8)',
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
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg,#6366f1,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, color: '#fff' }}>C</div>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>CloudX LMS</span>
        </div>

        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
          {step < 4 ? `Step ${step + 1} of 4` : 'Complete ✓'}
        </div>
      </header>

      {/* Progress Bar */}
      {step < 4 && (
        <div style={{ height: 3, background: 'rgba(255,255,255,0.06)' }}>
          <div style={{
            height: '100%',
            width: `${((step + 1) / 4) * 100}%`,
            background: 'linear-gradient(90deg,#6366f1,#3b82f6)',
            transition: 'width 0.4s ease',
          }} />
        </div>
      )}

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Step Indicators */}
        {step < 4 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 0, marginBottom: 40 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 70 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 13,
                    background: i < step ? 'linear-gradient(135deg,#22c55e,#16a34a)' : i === step ? 'linear-gradient(135deg,#6366f1,#3b82f6)' : 'rgba(255,255,255,0.07)',
                    color: '#fff',
                    border: i === step ? '2px solid rgba(99,102,241,0.5)' : '2px solid transparent',
                    boxShadow: i === step ? '0 0 20px rgba(99,102,241,0.3)' : 'none',
                    transition: 'all 0.3s',
                  }}>
                    {i < step ? '✓' : s.short}
                  </div>
                  <span style={{ fontSize: 11, marginTop: 6, color: i <= step ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)', textAlign: 'center', whiteSpace: 'nowrap' }}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ width: 50, height: 2, background: i < step ? '#22c55e' : 'rgba(255,255,255,0.08)', marginBottom: 20, transition: 'all 0.3s' }} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Step Content */}
        <div style={{ animation: 'fadeInUp 0.35s ease both' }} key={step}>
          {step === 0 && (
            <StepSchoolInfo
              onNext={(data) => next({ registrationId: data.registrationId, schoolEmail: data.schoolEmail, schoolName: data.schoolName })}
            />
          )}
          {step === 1 && (
            <StepVerifyOtp
              registrationId={state.registrationId}
              schoolEmail={state.schoolEmail}
              onNext={() => next()}
              onBack={back}
            />
          )}
          {step === 2 && (
            <StepChoosePlan
              onNext={(plan) => next({ selectedPlan: plan })}
              onBack={back}
            />
          )}
          {step === 3 && (
            <StepPayment
              registrationId={state.registrationId}
              selectedPlan={state.selectedPlan}
              schoolName={state.schoolName}
              schoolEmail={state.schoolEmail}
              onSuccess={(data) => next({ successData: data })}
              onBack={back}
            />
          )}
          {step === 4 && (
            <StepSuccess data={state.successData} />
          )}
        </div>
      </div>
    </div>
  )
}
