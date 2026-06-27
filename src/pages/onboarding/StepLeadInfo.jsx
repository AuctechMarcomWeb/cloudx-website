import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ArrowRight, Globe, User, Phone, MessageCircle, Mail, CheckCircle, XCircle, Loader2 } from 'lucide-react'

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
      if (devOtp) toast(`📧 Dev OTP: ${devOtp}`, { duration: 15000, icon: '🔑' })
      onNext({ registrationId: res.data.data.registrationId, email: form.email, mobileNo: form.mobileNo, contactName: form.contactName })
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong. Please try again.')
    } finally { setLoading(false) }
  }

  const sdBorder = subdomainStatus === 'available' ? '#1bbc9b' : subdomainStatus === 'taken' ? '#ef4444' : '#e2e8f0'
  const sdShadow = subdomainStatus === 'available' ? '0 0 0 3px rgba(27,188,155,0.12)' : subdomainStatus === 'taken' ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none'

  return (
    <div>
      <div style={{ textAlign:'center', marginBottom:32 }}>
        <div style={{ display:'inline-flex',alignItems:'center',gap:7,background:'rgba(27,188,155,0.08)',border:'1px solid rgba(27,188,155,0.2)',borderRadius:50,padding:'5px 14px',marginBottom:16 }}>
          <span style={{ width:6,height:6,borderRadius:'50%',background:'#1bbc9b',display:'inline-block' }} />
          <span style={{ fontSize:11.5,fontWeight:700,color:'#1bbc9b',letterSpacing:'0.06em' }}>STEP 1 OF 3</span>
        </div>
        <h2 style={{ fontSize:30,fontWeight:800,marginBottom:8,color:'#1a1a2e',fontFamily:"'Lato', sans-serif" }}>Register Your School</h2>
        <p style={{ color:'#64748b',fontSize:15,lineHeight:1.65 }}>Fill in your basic details — school setup comes next</p>
      </div>

      <div style={{ background:'#fff',borderRadius:20,border:'1.5px solid #e8faf6',padding:'32px',boxShadow:'0 4px 24px rgba(27,188,155,0.08)' }}>
        <form onSubmit={handleSubmit} autoComplete="off">

          {/* Subdomain */}
          <div style={{ marginBottom:24 }}>
            <div style={{ display:'flex',alignItems:'center',gap:6,fontSize:11,fontWeight:700,color:'#1bbc9b',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:14,paddingBottom:8,borderBottom:'1px solid rgba(27,188,155,0.12)' }}>
              <Globe size={12} /> Your School URL
            </div>
            <label style={{ display:'flex',alignItems:'center',gap:6,fontSize:13,fontWeight:600,color:'#374151',marginBottom:8 }}>
              School Subdomain <span style={{ color:'#ef4444' }}>*</span>
            </label>
            <div style={{ display:'flex',alignItems:'stretch',border:`1.5px solid ${sdBorder}`,borderRadius:10,overflow:'hidden',background:'#f8fffe',transition:'all 0.18s',boxShadow:sdShadow }}>
              <div style={{ display:'flex',alignItems:'center',padding:'0 13px',background:'rgba(27,188,155,0.06)',borderRight:'1px solid #e8faf6',color:'#1bbc9b',flexShrink:0 }}>
                <Globe size={15} />
              </div>
              <input name="subdomain" value={form.subdomain} onChange={handleSubdomain} placeholder="e.g. dps-noida"
                style={{ flex:1,border:'none',background:'transparent',height:48,padding:'0 12px',fontSize:14,color:'#1a1a2e',outline:'none' }} autoComplete="off" />
              {subdomainStatus && (
                <div style={{ display:'flex',alignItems:'center',paddingRight:10 }}>
                  {subdomainStatus==='checking' && <Loader2 size={15} color="#f59e0b" style={{ animation:'spin 1s linear infinite' }} />}
                  {subdomainStatus==='available' && <CheckCircle size={15} color="#1bbc9b" />}
                  {subdomainStatus==='taken' && <XCircle size={15} color="#ef4444" />}
                </div>
              )}
              <div style={{ display:'flex',alignItems:'center',padding:'0 14px',borderLeft:'1px solid #e8faf6',background:'rgba(27,188,155,0.04)',whiteSpace:'nowrap',fontSize:12.5,fontWeight:600,color:'#94a3b8' }}>
                .schoolcloudx.com
              </div>
            </div>
            <div style={{ marginTop:8, minHeight:20 }}>
              {subdomainStatus==='available' && <p style={{ fontSize:12.5,color:'#1bbc9b',display:'flex',alignItems:'center',gap:5,fontWeight:500 }}><CheckCircle size={13} /> Subdomain is available</p>}
              {subdomainStatus==='taken' && <p style={{ fontSize:12.5,color:'#ef4444',display:'flex',alignItems:'center',gap:5,fontWeight:500 }}><XCircle size={13} /> Already taken — try another</p>}
              {subdomainStatus==='checking' && <p style={{ fontSize:12.5,color:'#f59e0b' }}>Checking availability...</p>}
              {!subdomainStatus && <p style={{ fontSize:12,color:'#94a3b8' }}>Lowercase letters, numbers and hyphens only</p>}
              {form.subdomain && (
                <div style={{ marginTop:8,display:'inline-flex',alignItems:'center',gap:7,background:'rgba(27,188,155,0.06)',border:'1px solid rgba(27,188,155,0.15)',borderRadius:7,padding:'5px 12px' }}>
                  <Globe size={12} color="#1bbc9b" />
                  <span style={{ fontSize:12.5,color:'#64748b' }}>
                    <strong style={{ color:'#1bbc9b' }}>{form.subdomain}</strong>.schoolcloudx.com
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div style={{ marginBottom:24 }}>
            <div style={{ display:'flex',alignItems:'center',gap:6,fontSize:11,fontWeight:700,color:'#1bbc9b',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:14,paddingBottom:8,borderBottom:'1px solid rgba(27,188,155,0.12)' }}>
              <User size={12} /> Contact Details
            </div>

            <div style={{ marginBottom:16 }}>
              <label style={{ display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:8 }}>Full Name <span style={{ color:'#ef4444' }}>*</span></label>
              <div style={{ display:'flex',alignItems:'stretch',border:'1.5px solid #e2e8f0',borderRadius:10,overflow:'hidden',background:'#f8fffe',transition:'all 0.18s' }}
                onFocusCapture={e=>e.currentTarget.style.borderColor='#1bbc9b'} onBlurCapture={e=>e.currentTarget.style.borderColor='#e2e8f0'}>
                <div style={{ display:'flex',alignItems:'center',padding:'0 13px',background:'rgba(27,188,155,0.06)',borderRight:'1px solid #e8faf6',color:'#1bbc9b',flexShrink:0 }}><User size={15} /></div>
                <input className="dark-input" name="contactName" value={form.contactName} onChange={handle} placeholder="Principal / Director name" autoComplete="name"
                  style={{ border:'none',borderRadius:0,background:'transparent',boxShadow:'none' }} />
              </div>
            </div>

            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:12 }}>
              <div>
                <label style={{ display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:8 }}>Mobile Number <span style={{ color:'#ef4444' }}>*</span></label>
                <div style={{ display:'flex',alignItems:'stretch',border:'1.5px solid #e2e8f0',borderRadius:10,overflow:'hidden',background:'#f8fffe' }}
                  onFocusCapture={e=>e.currentTarget.style.borderColor='#1bbc9b'} onBlurCapture={e=>e.currentTarget.style.borderColor='#e2e8f0'}>
                  <div style={{ display:'flex',alignItems:'center',padding:'0 13px',background:'rgba(27,188,155,0.06)',borderRight:'1px solid #e8faf6',color:'#1bbc9b',flexShrink:0 }}><Phone size={15} /></div>
                  <input className="dark-input" type="tel" name="mobileNo" value={form.mobileNo} onChange={handleMobile} placeholder="10-digit number" maxLength={10}
                    style={{ border:'none',borderRadius:0,background:'transparent',boxShadow:'none' }} />
                </div>
              </div>
              <div>
                <label style={{ display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:8 }}>WhatsApp Number</label>
                <div style={{ display:'flex',alignItems:'stretch',border:'1.5px solid #e2e8f0',borderRadius:10,overflow:'hidden',background:'#f8fffe',opacity:form.sameAsWhatsapp?0.5:1 }}>
                  <div style={{ display:'flex',alignItems:'center',padding:'0 13px',background:'rgba(27,188,155,0.06)',borderRight:'1px solid #e8faf6',color:'#1bbc9b',flexShrink:0 }}><MessageCircle size={15} /></div>
                  <input className="dark-input" type="tel" value={form.sameAsWhatsapp ? form.mobileNo : form.whatsappNo}
                    onChange={e=>setForm(p=>({...p,whatsappNo:e.target.value.replace(/\D/g,'').slice(0,10),sameAsWhatsapp:false}))}
                    placeholder="WhatsApp number" disabled={form.sameAsWhatsapp} maxLength={10}
                    style={{ border:'none',borderRadius:0,background:'transparent',boxShadow:'none' }} />
                </div>
              </div>
            </div>

            <div onClick={() => setForm(p=>({...p,sameAsWhatsapp:!p.sameAsWhatsapp,whatsappNo:!p.sameAsWhatsapp?p.mobileNo:''}))} style={{ display:'inline-flex',alignItems:'center',gap:9,cursor:'pointer',marginBottom:16,padding:'7px 14px',background:form.sameAsWhatsapp?'rgba(27,188,155,0.08)':'rgba(0,0,0,0.03)',border:`1.5px solid ${form.sameAsWhatsapp?'rgba(27,188,155,0.3)':'#e2e8f0'}`,borderRadius:8,transition:'all 0.18s',userSelect:'none' }}>
              <div style={{ width:17,height:17,borderRadius:5,flexShrink:0,background:form.sameAsWhatsapp?'#1bbc9b':'transparent',border:`2px solid ${form.sameAsWhatsapp?'#1bbc9b':'#cbd5e0'}`,display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.18s' }}>
                {form.sameAsWhatsapp && <svg width="9" height="7" viewBox="0 0 10 8" fill="none"><path d="M1 3.5L3.8 6.5L9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <span style={{ fontSize:12.5,fontWeight:500,color:form.sameAsWhatsapp?'#374151':'#94a3b8' }}>Same as mobile number</span>
            </div>

            <div>
              <label style={{ display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:8 }}>Email Address <span style={{ color:'#ef4444' }}>*</span></label>
              <div style={{ display:'flex',alignItems:'stretch',border:'1.5px solid #e2e8f0',borderRadius:10,overflow:'hidden',background:'#f8fffe' }}
                onFocusCapture={e=>e.currentTarget.style.borderColor='#1bbc9b'} onBlurCapture={e=>e.currentTarget.style.borderColor='#e2e8f0'}>
                <div style={{ display:'flex',alignItems:'center',padding:'0 13px',background:'rgba(27,188,155,0.06)',borderRight:'1px solid #e8faf6',color:'#1bbc9b',flexShrink:0 }}><Mail size={15} /></div>
                <input className="dark-input" type="email" name="email" value={form.email} onChange={handle} placeholder="your@email.com" autoComplete="email"
                  style={{ border:'none',borderRadius:0,background:'transparent',boxShadow:'none' }} />
              </div>
              <p style={{ fontSize:12,color:'#94a3b8',marginTop:7,display:'flex',alignItems:'center',gap:5 }}><Mail size={11} /> OTP will be sent to this email</p>
            </div>
          </div>

          <button type="submit" disabled={loading || subdomainStatus==='taken' || subdomainStatus==='checking'}
            style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:8,width:'100%',height:52,background:'linear-gradient(135deg,#1bbc9b,#0e9f82)',color:'#fff',border:'none',borderRadius:12,fontSize:15,fontWeight:700,cursor:'pointer',boxShadow:'0 6px 20px rgba(27,188,155,0.35)',transition:'all 0.2s',opacity:(loading||subdomainStatus==='taken'||subdomainStatus==='checking')?0.6:1,fontFamily:'inherit' }}
            onMouseEnter={e=>{if(!loading)e.currentTarget.style.transform='translateY(-1px)'}}
            onMouseLeave={e=>e.currentTarget.style.transform=''}>
            {loading ? <><div className="spinner" /> Sending OTP...</> : <>Continue <ArrowRight size={18} /></>}
          </button>

          <p style={{ textAlign:'center',marginTop:14,fontSize:12,color:'#94a3b8' }}>
            By continuing you agree to our <a href="#" style={{ color:'#1bbc9b',textDecoration:'none',fontWeight:600 }}>Terms</a> &amp; <a href="#" style={{ color:'#1bbc9b',textDecoration:'none',fontWeight:600 }}>Privacy Policy</a>
          </p>
        </form>
      </div>
    </div>
  )
}
