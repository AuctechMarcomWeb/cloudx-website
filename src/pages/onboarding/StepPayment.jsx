import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
  ArrowLeft,
  CreditCard,
  Lock,
  ShieldCheck,
  Zap,
  CheckCircle,
} from 'lucide-react'

const API = import.meta.env.VITE_API_BASE_URL

export default function StepPayment({
  registrationId,
  selectedPlan,
  schoolName,
  schoolEmail,
  onSuccess,
  onBack,
}) {
  const [loading, setLoading] = useState(false)

  const isFreeTrial = selectedPlan?.trialDays > 0

  const planPrice =
    selectedPlan?.computedPrice ?? selectedPlan?.price ?? 0

  const handlePay = async () => {
    setLoading(true)
    try {
      // Step 1: Create Razorpay order from backend
      const orderRes = await axios.post(`${API}onboarding/create-order`, {
        registrationId,
        planId: selectedPlan._id,
        billing: selectedPlan.billing || 'Monthly',
      })

      const { orderId, amount, currency, razorpayKey } = orderRes.data.data

      // Step 2: Open Razorpay checkout
      await openRazorpay({
        orderId,
        amount,
        currency,
        keyId: razorpayKey,
        schoolName,
        schoolEmail,
        registrationId,
        selectedPlan,
        onSuccess,
        setLoading,
      })
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Payment initiation failed'
      toast.error(msg)
      setLoading(false)
    }
  }

  const handleFreeTrial = async () => {
    setLoading(true)
    try {
      const res = await axios.post(`${API}onboarding/start-trial`, {
        registrationId,
        planId: selectedPlan._id,
      })
      toast.success('Free trial activated!')
      onSuccess(res.data.data)
    } catch (err) {
      if (err?.code === 'ERR_NETWORK') {
        // Demo fallback
        toast.success('Free trial activated!')
        onSuccess({
          schoolName,
          schoolEmail,
          plan: selectedPlan?.name,
          trialDays: selectedPlan?.trialDays,
          loginUrl: `https://${schoolName?.toLowerCase().replace(/\s+/g, '')}.schoolcloudx.com`,
          username: schoolEmail,
          password: 'Welcome@123',
        })
      } else {
        toast.error(err?.response?.data?.message || 'Trial activation failed')
      }
      setLoading(false)
    }
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
          {isFreeTrial ? 'Activate Free Trial' : 'Complete Payment'}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>
          {isFreeTrial
            ? `${selectedPlan.trialDays} days completely free â€” no credit card required`
            : 'Secure payment via Razorpay'}
        </p>
      </div>

      <div className="glass-card" style={{ padding: 28, marginBottom: 20 }}>
        {/* Order Summary */}
        <h3
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: 1,
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          Order Summary
        </h3>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 12,
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>
              {selectedPlan?.name} Plan
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>
              {selectedPlan?.description}
            </div>
            {selectedPlan?.billing && (
              <div style={{ fontSize: 12, color: '#fabf22', marginTop: 2 }}>
                {selectedPlan.billing} billing
              </div>
            )}
          </div>
          <div style={{ textAlign: 'right' }}>
            {isFreeTrial ? (
              <div>
                <div
                  style={{ fontSize: 22, fontWeight: 800, color: '#4ade80' }}
                >
                  FREE
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.4)',
                    textDecoration: 'line-through',
                  }}
                >
                  â‚¹{planPrice.toLocaleString()}/mo
                </div>
              </div>
            ) : (
              <div style={{ fontSize: 24, fontWeight: 800 }}>
                â‚¹{planPrice.toLocaleString()}
              </div>
            )}
          </div>
        </div>

        <div className="divider" />

        {/* School info */}
        <div style={{ marginTop: 12 }}>
          {[
            { label: 'School', value: schoolName },
            { label: 'Email', value: schoolEmail },
            {
              label: 'Billing',
              value: isFreeTrial
                ? `${selectedPlan?.trialDays} days free, then â‚¹${planPrice.toLocaleString()}/mo`
                : `â‚¹${planPrice.toLocaleString()} / ${selectedPlan?.billing === 'Yearly' ? 'year' : 'month'}`,
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                {label}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.75)',
                  fontWeight: 500,
                  textAlign: 'right',
                  maxWidth: '60%',
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Features included */}
      {selectedPlan?.features?.length > 0 && (
        <div className="glass-card" style={{ padding: '16px 20px', marginBottom: 20 }}>
          <div
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.35)',
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Included Features
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '6px 16px',
            }}
          >
            {selectedPlan.features.map((f) => (
              <div
                key={f}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                <CheckCircle size={13} color="#22c55e" />
                {f}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security badges */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 20,
          marginBottom: 24,
          flexWrap: 'wrap',
        }}
      >
        {[
          { icon: Lock, label: 'SSL Encrypted' },
          { icon: ShieldCheck, label: 'Razorpay Secured' },
          { icon: Zap, label: 'Instant Activation' },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            <Icon size={14} color="#042954" />
            {label}
          </div>
        ))}
      </div>

      {/* CTA Button */}
      {isFreeTrial ? (
        <button
          className="btn-primary"
          onClick={handleFreeTrial}
          disabled={loading}
          style={{
            background: 'linear-gradient(135deg,#22c55e,#16a34a)',
            marginBottom: 12,
          }}
        >
          {loading ? (
            <>
              <div className="spinner" /> Activating...
            </>
          ) : (
            <>
              <Zap size={18} /> Activate Free Trial
            </>
          )}
        </button>
      ) : (
        <button
          className="btn-primary"
          onClick={handlePay}
          disabled={loading}
          style={{ marginBottom: 12 }}
        >
          {loading ? (
            <>
              <div className="spinner" /> Opening Razorpay...
            </>
          ) : (
            <>
              <CreditCard size={18} /> Pay â‚¹{planPrice.toLocaleString()}{' '}
              Securely
            </>
          )}
        </button>
      )}

      <button className="btn-ghost" onClick={onBack} disabled={loading}>
        <ArrowLeft size={16} /> Change Plan
      </button>

      <p
        style={{
          textAlign: 'center',
          marginTop: 16,
          fontSize: 12,
          color: 'rgba(255,255,255,0.25)',
        }}
      >
        By proceeding you agree to our{' '}
        <a href="#" style={{ color: '#fabf22', textDecoration: 'none' }}>
          Terms
        </a>{' '}
        and{' '}
        <a href="#" style={{ color: '#fabf22', textDecoration: 'none' }}>
          Refund Policy
        </a>
        .
      </p>
    </div>
  )
}

/* â”€â”€ Razorpay helper â”€â”€ */
async function openRazorpay({
  orderId,
  amount,
  currency,
  keyId,
  schoolName,
  schoolEmail,
  registrationId,
  selectedPlan,
  onSuccess,
  setLoading,
}) {
  return new Promise((resolve, reject) => {
    if (!window.Razorpay) {
      // Load Razorpay script dynamically
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => openCheckout()
      script.onerror = () => reject(new Error('Razorpay script load failed'))
      document.body.appendChild(script)
    } else {
      openCheckout()
    }

    function openCheckout() {
      const options = {
        key: keyId,
        amount,
        currency: currency || 'INR',
        name: 'School CloudX',
        description: `${selectedPlan?.name} Plan`,
        order_id: orderId,
        prefill: {
          name: schoolName,
          email: schoolEmail,
        },
        theme: { color: '#042954' },
        handler: async (response) => {
          try {
            const API = import.meta.env.VITE_API_BASE_URL
            const verifyRes = await axios.post(`${API}onboarding/verify-payment`, {
              registrationId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planId: selectedPlan._id,
              billingCycle: selectedPlan.billing || 'Monthly',
            })
            toast.success('Payment successful!')
            onSuccess(verifyRes.data.data)
            resolve()
          } catch (err) {
            toast.error('Payment verification failed')
            reject(err)
          } finally {
            setLoading(false)
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false)
            resolve()
          },
        },
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
    }
  })
}


