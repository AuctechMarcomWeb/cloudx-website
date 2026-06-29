import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ArrowRight, Globe, CheckCircle, XCircle, Loader2 } from 'lucide-react'

const API = import.meta.env.VITE_API_BASE_URL

export default function StepLeadInfo({ onNext }) {
  const [loading, setLoading] = useState(false)
  const [subdomainStatus, setSubdomainStatus] = useState(null)
  const [subdomainTimer, setSubdomainTimer] = useState(null)
  const [form, setForm] = useState({ subdomain:'', contactName:'', mobileNo:'', whatsappNo:'', email:'', sameAsWhatsapp:true })

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubdomain = (e) => {
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
    setForm(p => ({ ...p, subdomain: val }))
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
    } catch { setSubdomainStatus(null) }
  }

  const handleMobile = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10)
    setForm(p => ({ ...p, mobileNo: val, whatsappNo: p.sameAsWhatsapp ? val : p.whatsappNo }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.subdomain || form.subdomain.length < 3) { toast.error('Subdomain must be at least 3 characters'); return }
    if (subdomainStatus === 'taken') { toast.error('This subdomain is already taken'); return }
    if (subdomainStatus === 'checking') { toast.error('Please wait while we check availability'); return }
    if (!form.contactName.trim()) { toast.error('Please enter your name'); return }
    if (!/^\d{10}$/.test(form.mobileNo)) { toast.error('Please enter a valid 10-digit mobile number'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { toast.error('Please enter a valid email address'); return }
    setLoading(true)
    try {
      const res = await axios.post(`${API}onboarding/create-lead`, {
        subdomain: form.subdomain, contactName: form.contactName,
        mobileNo: form.mobileNo, whatsappNo: form.whatsappNo || form.mobileNo, email: form.email,
      })
      const devOtp = res.data.data?.devOtp
      toast.success(res.data.message || 'OTP sent successfully!')
      if (import.meta.env.DEV && devOtp) toast(`📧 Dev OTP: ${devOtp}`, { duration: 15000, icon: '🔑' })
      onNext({ registrationId: res.data.data.registrationId, email: form.email, mobileNo: form.mobileNo, contactName: form.contactName })
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong. Please try again.')
    } finally { setLoading(false) }
  }

  const sdBorder = subdomainStatus === 'available' ? '#0040a0' : subdomainStatus === 'taken' ? '#ef4444' : '#e2e8f0'
  const sdShadow = subdomainStatus === 'available' ? '0 0 0 3px rgba(0,64,160,0.12)' : subdomainStatus === 'taken' ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none'

  return (
    <div>
      <div style={{ textAlign:'center', marginBottom:28 }}>
        <h2 style={{ fontSize:24, fontWeight:700, marginBottom:6, color:'#1a1a2e' }}>Register Your School</h2>
        <p style={{ color:'#64748b', fontSize:14, lineHeight:1.6 }}>Fill in your details to get started</p>
      </div>

      <div style={{ background:'#fff', borderRadius:16, border:'1px solid #e2e8f0', padding:'24px 28px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
        <form onSubmit={handleSubmit} autoComplete="off">

          {/* Subdomain */}
          <div style={{ marginBottom:20 }}>
            <label style={{ display:'block',fontSize:13,fontWeight:500,color:'#374151',marginBottom:6 }}>
              School Subdomain <span style={{ color:'#ef4444' }}>*</span>
            </label>
            <div style={{ display:'flex',alignItems:'stretch',border:`1.5px solid ${sdBorder}`,borderRadius:10,overflow:'hidden',background:'#f9fafb',transition:'all 0.18s',boxShadow:sdShadow }}>
              <input name="subdomain" value={form.subdomain} onChange={handleSubdomain} placeholder="e.g. dps-noida"
                style={{ flex:1,border:'none',background:'transparent',height:48,padding:'0 14px',fontSize:14,color:'#1a1a2e',outline:'none' }} autoComplete="off" />
              {subdomainStatus && (
                <div style={{ display:'flex',alignItems:'center',paddingRight:12 }}>
                  {subdomainStatus==='checking' && <Loader2 size={15} color="#f59e0b" style={{ animation:'spin 1s linear infinite' }} />}
                  {subdomainStatus==='available' && <CheckCircle size={15} color="#0040a0" />}
                  {subdomainStatus==='taken' && <XCircle size={15} color="#ef4444" />}
                </div>
              )}
              <div style={{ display:'flex',alignItems:'center',padding:'0 14px',borderLeft:'1px solid #e8f0fc',background:'rgba(0,64,160,0.04)',whiteSpace:'nowrap',fontSize:12.5,fontWeight:600,color:'#94a3b8' }}>
                .schoolcloudx.com
              </div>
            </div>
            <div style={{ marginTop:8, minHeight:20 }}>
              {subdomainStatus==='available' && <p style={{ fontSize:12.5,color:'#0040a0',display:'flex',alignItems:'center',gap:5,fontWeight:500 }}><CheckCircle size={13} /> Subdomain is available</p>}
              {subdomainStatus==='taken' && <p style={{ fontSize:12.5,color:'#ef4444',display:'flex',alignItems:'center',gap:5,fontWeight:500 }}><XCircle size={13} /> Already taken — try another</p>}
              {subdomainStatus==='checking' && <p style={{ fontSize:12.5,color:'#f59e0b' }}>Checking availability...</p>}
              {!subdomainStatus && <p style={{ fontSize:12,color:'#94a3b8' }}>Lowercase letters, numbers and hyphens only</p>}
              {form.subdomain && (
                <div style={{ marginTop:8,display:'inline-flex',alignItems:'center',gap:7,background:'rgba(0,64,160,0.06)',border:'1px solid rgba(0,64,160,0.15)',borderRadius:7,padding:'5px 12px' }}>
                  <Globe size={12} color="#0040a0" />
                  <span style={{ fontSize:12.5,color:'#64748b' }}>
                    <strong style={{ color:'#0040a0' }}>{form.subdomain}</strong>.schoolcloudx.com
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div style={{ marginBottom:20 }}>
            <div style={{ marginBottom:16 }}>
              <label style={{ display:'block',fontSize:13,fontWeight:500,color:'#374151',marginBottom:6 }}>Full Name <span style={{ color:'#ef4444' }}>*</span></label>
              <input className="dark-input" name="contactName" value={form.contactName} onChange={handle} placeholder="Principal / Director name" autoComplete="name" />
            </div>

            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:12 }}>
              <div>
                <label style={{ display:'block',fontSize:13,fontWeight:500,color:'#374151',marginBottom:6 }}>Mobile Number <span style={{ color:'#ef4444' }}>*</span></label>
                <input className="dark-input" type="tel" name="mobileNo" value={form.mobileNo} onChange={handleMobile} placeholder="10-digit number" maxLength={10} />
              </div>
              <div>
                <label style={{ display:'block',fontSize:13,fontWeight:500,color:'#374151',marginBottom:6 }}>WhatsApp Number</label>
                <input className="dark-input" type="tel" value={form.sameAsWhatsapp ? form.mobileNo : form.whatsappNo}
                  onChange={e=>setForm(p=>({...p,whatsappNo:e.target.value.replace(/\D/g,'').slice(0,10),sameAsWhatsapp:false}))}
                  placeholder="WhatsApp number" disabled={form.sameAsWhatsapp} maxLength={10}
                  style={{ opacity: form.sameAsWhatsapp ? 0.5 : 1 }} />
              </div>
            </div>

            <div onClick={() => setForm(p=>({...p,sameAsWhatsapp:!p.sameAsWhatsapp,whatsappNo:!p.sameAsWhatsapp?p.mobileNo:''}))}
              style={{ display:'inline-flex',alignItems:'center',gap:8,cursor:'pointer',marginBottom:16,userSelect:'none' }}>
              <div style={{ width:16,height:16,borderRadius:4,flexShrink:0,background:form.sameAsWhatsapp?'#0040a0':'transparent',border:`1.5px solid ${form.sameAsWhatsapp?'#0040a0':'#d1d5db'}`,display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.15s' }}>
                {form.sameAsWhatsapp && <svg width="9" height="7" viewBox="0 0 10 8" fill="none"><path d="M1 3.5L3.8 6.5L9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <span style={{ fontSize:13,color:'#374151' }}>Same as mobile number</span>
            </div>

            <div>
              <label style={{ display:'block',fontSize:13,fontWeight:500,color:'#374151',marginBottom:6 }}>Email Address <span style={{ color:'#ef4444' }}>*</span></label>
              <input className="dark-input" type="email" name="email" value={form.email} onChange={handle} placeholder="your@email.com" autoComplete="email" />
              <p style={{ fontSize:12,color:'#94a3b8',marginTop:6 }}>OTP will be sent to this email</p>
            </div>
          </div>

          <button type="submit" disabled={loading || subdomainStatus==='taken' || subdomainStatus==='checking'}
            className="btn-primary btn-block">
            {loading ? <><div className="spinner" /> Sending OTP...</> : <>Continue <ArrowRight size={18} /></>}
          </button>

          <p style={{ textAlign:'center',marginTop:14,fontSize:12,color:'#94a3b8' }}>
            By continuing you agree to our <a href="#" style={{ color:'#0040a0',textDecoration:'none',fontWeight:600 }}>Terms</a> &amp; <a href="#" style={{ color:'#0040a0',textDecoration:'none',fontWeight:600 }}>Privacy Policy</a>
          </p>
        </form>
      </div>
    </div>
  )
}
