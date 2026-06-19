import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ArrowRight, Globe, User, Phone, MessageCircle, Mail, CheckCircle, XCircle, Loader2 } from 'lucide-react'

const API = import.meta.env.VITE_API_BASE_URL

export default function StepLeadInfo({ onNext }) {
  const [loading, setLoading]                 = useState(false)
  const [subdomainStatus, setSubdomainStatus] = useState(null)
  const [subdomainTimer, setSubdomainTimer]   = useState(null)

  const [form, setForm] = useState({
    subdomain:      '',
    contactName:    '',
    mobileNo:       '',
    whatsappNo:     '',
    email:          '',
    sameAsWhatsapp: true,
  })

  const handle = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  const handleSubdomain = (e) => {
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
    setForm((p) => ({ ...p, subdomain: val }))
    setSubdomainStatus(null)
    if (subdomainTimer) clearTimeout(subdomainTimer)
    if (val.length >= 3) {
      setSubdomainStatus('checking')
      const t = setTimeout(() => checkSubdomain(val), 700)
      setSubdomainTimer(t)
    }
  }

  const checkSubdomain = async (value) => {
    try {
      const res = await axios.post(`${API}onboarding/check-subdomain`, { subdomain: value })
      setSubdomainStatus(res.data.data.available ? 'available' : 'taken')
    } catch {
      setSubdomainStatus(null)
    }
  }

  const handleMobile = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10)
    setForm((p) => ({
      ...p,
      mobileNo:   val,
      whatsappNo: p.sameAsWhatsapp ? val : p.whatsappNo,
    }))
  }

  const handleSameToggle = (e) => {
    const checked = e.target.checked
    setForm((p) => ({
      ...p,
      sameAsWhatsapp: checked,
      whatsappNo:     checked ? p.mobileNo : '',
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.subdomain || form.subdomain.length < 3) { toast.error('Subdomain must be at least 3 characters'); return }
    if (subdomainStatus === 'taken')    { toast.error('This subdomain is already taken'); return }
    if (subdomainStatus === 'checking') { toast.error('Please wait while we check availability'); return }
    if (!form.contactName.trim())       { toast.error('Please enter your name'); return }
    if (!/^\d{10}$/.test(form.mobileNo))             { toast.error('Please enter a valid 10-digit mobile number'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { toast.error('Please enter a valid email address'); return }

    setLoading(true)
    try {
      const res = await axios.post(`${API}onboarding/create-lead`, {
        subdomain:   form.subdomain,
        contactName: form.contactName,
        mobileNo:    form.mobileNo,
        whatsappNo:  form.whatsappNo || form.mobileNo,
        email:       form.email,
      })
      toast.success(res.data.message || 'OTP sent successfully!')
      onNext({
        registrationId: res.data.data.registrationId,
        email:          form.email,
        mobileNo:       form.mobileNo,
        contactName:    form.contactName,
      })
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  /* subdomain border color based on status */
  const subdomainBorder =
    subdomainStatus === 'available' ? 'rgba(74,222,128,0.55)' :
    subdomainStatus === 'taken'     ? 'rgba(248,113,113,0.55)' :
    'rgba(255,255,255,0.1)'

  const subdomainShadow =
    subdomainStatus === 'available' ? '0 0 0 3px rgba(74,222,128,0.1)' :
    subdomainStatus === 'taken'     ? '0 0 0 3px rgba(248,113,113,0.1)' :
    'none'

  return (
    <div>
      {/* ── Header ── */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        {/* Step pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.22)',
          borderRadius: 50, padding: '5px 14px', marginBottom: 16,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4f8ef7', display: 'inline-block', boxShadow: '0 0 6px #4f8ef7' }} />
          <span style={{ fontSize: 11.5, fontWeight: 700, color: '#4f8ef7', letterSpacing: '0.06em' }}>STEP 1 OF 4</span>
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#fff', letterSpacing: '-0.03em' }}>
          Register Your School
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 14, lineHeight: 1.65 }}>
          Fill in your basic details — school setup comes next
        </p>
      </div>

      <div className="glass-card" style={{ padding: '32px 32px 28px' }}>
        <form onSubmit={handleSubmit} autoComplete="off">

          {/* ── Section: Subdomain ── */}
          <div className="form-section">
            <div className="form-section-title">
              <Globe size={13} /> Your School URL
            </div>

            <label className="form-label">
              School Subdomain <span className="req">*</span>
            </label>

            {/* Combined subdomain row */}
            <div style={{
              display: 'flex', alignItems: 'stretch',
              border: `1.5px solid ${subdomainBorder}`,
              borderRadius: 10, overflow: 'hidden',
              background: 'rgba(255,255,255,0.06)',
              transition: 'border-color 0.18s, box-shadow 0.18s',
              boxShadow: subdomainShadow,
            }}>
              {/* Globe icon */}
              <div style={{
                display: 'flex', alignItems: 'center', padding: '0 13px',
                background: 'rgba(255,255,255,0.04)',
                borderRight: '1px solid rgba(255,255,255,0.07)',
                color: 'rgba(255,255,255,0.3)', flexShrink: 0,
              }}>
                <Globe size={15} />
              </div>

              {/* Text input */}
              <input
                className="dark-input"
                name="subdomain"
                value={form.subdomain}
                onChange={handleSubdomain}
                placeholder="e.g. dps-noida"
                style={{
                  flex: 1, border: 'none', borderRadius: 0,
                  background: 'transparent', boxShadow: 'none',
                  height: 48,
                }}
                autoComplete="off"
              />

              {/* Status icon */}
              {subdomainStatus && (
                <div style={{
                  display: 'flex', alignItems: 'center',
                  paddingRight: 10, background: 'transparent',
                }}>
                  {subdomainStatus === 'checking'  && <Loader2 size={15} color="#fabf22" style={{ animation: 'spin 1s linear infinite' }} />}
                  {subdomainStatus === 'available' && <CheckCircle size={15} color="#4ade80" />}
                  {subdomainStatus === 'taken'     && <XCircle size={15} color="#f87171" />}
                </div>
              )}

              {/* .schoolcloudx.com suffix */}
              <div style={{
                display: 'flex', alignItems: 'center', padding: '0 14px',
                borderLeft: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.03)',
                color: 'rgba(255,255,255,0.38)',
                fontSize: 12.5, fontWeight: 600,
                whiteSpace: 'nowrap', userSelect: 'none',
                letterSpacing: '-0.01em',
              }}>
                .schoolcloudx.com
              </div>
            </div>

            {/* Status hint */}
            <div style={{ marginTop: 8, minHeight: 20 }}>
              {subdomainStatus === 'available' && (
                <p style={{ fontSize: 12.5, color: '#4ade80', display: 'flex', alignItems: 'center', gap: 5, fontWeight: 500 }}>
                  <CheckCircle size={13} /> Subdomain is available
                </p>
              )}
              {subdomainStatus === 'taken' && (
                <p style={{ fontSize: 12.5, color: '#f87171', display: 'flex', alignItems: 'center', gap: 5, fontWeight: 500 }}>
                  <XCircle size={13} /> Already taken — try another
                </p>
              )}
              {subdomainStatus === 'checking' && (
                <p style={{ fontSize: 12.5, color: '#fabf22' }}>Checking availability...</p>
              )}
              {!subdomainStatus && (
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.24)' }}>
                  Lowercase letters, numbers and hyphens only
                </p>
              )}
            </div>
          </div>

          {/* ── Section: Contact Info ── */}
          <div className="form-section">
            <div className="form-section-title">
              <User size={13} /> Contact Details
            </div>

            {/* Full Name */}
            <div style={{ marginBottom: 18 }}>
              <label className="form-label">
                Full Name <span className="req">*</span>
              </label>
              <div className="input-group">
                <div className="input-icon"><User size={15} /></div>
                <input
                  className="dark-input"
                  name="contactName"
                  value={form.contactName}
                  onChange={handle}
                  placeholder="Principal / Director name"
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Mobile + WhatsApp side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 10 }}>
              <div>
                <label className="form-label">
                  Mobile Number <span className="req">*</span>
                </label>
                <div className="input-group">
                  <div className="input-icon"><Phone size={15} /></div>
                  <input
                    className="dark-input"
                    type="tel"
                    name="mobileNo"
                    value={form.mobileNo}
                    onChange={handleMobile}
                    placeholder="10-digit number"
                    maxLength={10}
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">WhatsApp Number</label>
                <div className="input-group" style={{
                  opacity: form.sameAsWhatsapp ? 0.45 : 1,
                  transition: 'opacity 0.2s',
                }}>
                  <div className="input-icon"><MessageCircle size={15} /></div>
                  <input
                    className="dark-input"
                    type="tel"
                    name="whatsappNo"
                    value={form.sameAsWhatsapp ? form.mobileNo : form.whatsappNo}
                    onChange={(e) => setForm((p) => ({
                      ...p,
                      whatsappNo:     e.target.value.replace(/\D/g, '').slice(0, 10),
                      sameAsWhatsapp: false,
                    }))}
                    placeholder="WhatsApp number"
                    disabled={form.sameAsWhatsapp}
                    maxLength={10}
                  />
                </div>
              </div>
            </div>

            {/* Same-as-mobile pill toggle */}
            <div
              onClick={() => handleSameToggle({ target: { checked: !form.sameAsWhatsapp } })}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                cursor: 'pointer', marginBottom: 18,
                padding: '7px 14px',
                background: form.sameAsWhatsapp ? 'rgba(26,86,219,0.12)' : 'rgba(255,255,255,0.04)',
                border: `1.5px solid ${form.sameAsWhatsapp ? 'rgba(79,142,247,0.3)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 8, transition: 'all 0.18s', userSelect: 'none',
              }}
            >
              <div style={{
                width: 17, height: 17, borderRadius: 5, flexShrink: 0,
                background: form.sameAsWhatsapp ? '#1a56db' : 'transparent',
                border: `2px solid ${form.sameAsWhatsapp ? '#1a56db' : 'rgba(255,255,255,0.2)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.18s',
              }}>
                {form.sameAsWhatsapp && (
                  <svg width="9" height="7" viewBox="0 0 10 8" fill="none">
                    <path d="M1 3.5L3.8 6.5L9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span style={{
                fontSize: 12.5, fontWeight: 500,
                color: form.sameAsWhatsapp ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.32)',
              }}>
                Same as mobile number
              </span>
            </div>

            {/* Email */}
            <div>
              <label className="form-label">
                Email Address <span className="req">*</span>
              </label>
              <div className="input-group">
                <div className="input-icon"><Mail size={15} /></div>
                <input
                  className="dark-input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handle}
                  placeholder="your@email.com"
                  autoComplete="email"
                />
              </div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.24)', marginTop: 7, display: 'flex', alignItems: 'center', gap: 5 }}>
                <Mail size={11} opacity={0.5} /> OTP will be sent to this email or mobile number
              </p>
            </div>
          </div>

          {/* ── Submit ── */}
          <button
            type="submit"
            className="btn-primary"
            style={{ marginTop: 4, height: 52, fontSize: 15 }}
            disabled={loading || subdomainStatus === 'taken' || subdomainStatus === 'checking'}
          >
            {loading
              ? <><div className="spinner" /> Sending OTP...</>
              : <>Continue <ArrowRight size={18} /></>
            }
          </button>

          <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
            By continuing you agree to our{' '}
            <a href="#" style={{ color: '#fabf22', textDecoration: 'none', fontWeight: 500 }}>Terms</a>
            {' '}&amp;{' '}
            <a href="#" style={{ color: '#fabf22', textDecoration: 'none', fontWeight: 500 }}>Privacy Policy</a>
          </p>
        </form>
      </div>
    </div>
  )
}
