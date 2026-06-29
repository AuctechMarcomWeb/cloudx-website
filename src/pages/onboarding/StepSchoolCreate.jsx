import { useState, useRef } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ArrowLeft, Building2, MapPin, Upload, X, Loader2, Globe } from 'lucide-react'

const API = import.meta.env.VITE_API_BASE_URL

const FIELD_STYLE = {
  display:'flex',alignItems:'stretch',border:'1.5px solid #e2e8f0',borderRadius:10,
  overflow:'hidden',background:'#f8fffe',transition:'all 0.18s',
}
const ICON_STYLE = {
  display:'flex',alignItems:'center',padding:'0 13px',
  background:'rgba(0,64,160,0.06)',borderRight:'1px solid #e8f0fc',
  color:'#0040a0',flexShrink:0,
}
const INPUT_STYLE = {
  border:'none',borderRadius:0,background:'transparent',
  boxShadow:'none',flex:1,height:48,padding:'0 14px',
  fontSize:14,color:'#1a1a2e',outline:'none',fontFamily:'inherit',
}

export default function StepSchoolCreate({ registrationId, onNext, onBack }) {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [logoPreview, setLogoPreview] = useState(null)
  const fileRef = useRef(null)

  const [form, setForm] = useState({
    schoolName:'', schoolAddress:'', city:'', state:'', pincode:'',
    logo:'', affiliationBoard:'', affiliationNo:'', schoolMedium:'', description:'',
  })

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { toast.error('Only image files allowed'); return }
    if (file.size > 2*1024*1024) { toast.error('Logo must be < 2MB'); return }
    setLogoPreview(URL.createObjectURL(file))
    setUploading(true)
    try {
      const fd = new FormData(); fd.append('file', file)
      const res = await axios.post(`${API}upload/uploadImage`, fd, { headers:{ 'Content-Type':'multipart/form-data' } })
      const url = res?.data?.data?.imageUrl
      if (!url) throw new Error('No URL')
      setLogoPreview(url); setForm(p => ({ ...p, logo: url }))
      toast.success('Logo uploaded!')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Upload failed.')
      setLogoPreview(null)
    } finally { setUploading(false); if (fileRef.current) fileRef.current.value = '' }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.schoolName.trim()) { toast.error('School name is required'); return }
    setLoading(true)
    try {
      const res = await axios.post(`${API}onboarding/create-school`, { registrationId, ...form })
      toast.success('School created successfully!')
      onNext(res.data.data)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong.')
    } finally { setLoading(false) }
  }

  const labelStyle = { display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:8 }
  const sectionTitle = { display:'flex',alignItems:'center',gap:6,fontSize:11,fontWeight:700,color:'#0040a0',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:14,paddingBottom:8,borderBottom:'1px solid rgba(0,64,160,0.12)' }

  return (
    <div>
      <div style={{ textAlign:'center', marginBottom:32 }}>
        <div style={{ width:72,height:72,borderRadius:'50%',margin:'0 auto 16px',background:'linear-gradient(135deg,#0040a0,#0ea5e9)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 8px 32px rgba(0,64,160,0.3)' }}>
          <Building2 size={32} color="#fff" />
        </div>
        <div style={{ display:'inline-flex',alignItems:'center',gap:7,background:'rgba(0,64,160,0.08)',border:'1px solid rgba(0,64,160,0.2)',borderRadius:50,padding:'5px 14px',marginBottom:14 }}>
          <span style={{ width:6,height:6,borderRadius:'50%',background:'#0040a0',display:'inline-block' }} />
          <span style={{ fontSize:11.5,fontWeight:700,color:'#0040a0',letterSpacing:'0.06em' }}>STEP 3 OF 3</span>
        </div>
        <h2 style={{ fontSize:30,fontWeight:800,marginBottom:8,color:'#1a1a2e',fontFamily:"'Lato', sans-serif" }}>School Details</h2>
        <p style={{ color:'#64748b',fontSize:15 }}>Almost there — fill in your school information</p>
      </div>

      <div style={{ background:'#fff',borderRadius:20,border:'1.5px solid #e8f0fc',padding:32,boxShadow:'0 4px 24px rgba(0,64,160,0.08)' }}>
        <form onSubmit={handleSubmit}>

          {/* Logo */}
          <div style={{ marginBottom:24 }}>
            <div style={sectionTitle}><Upload size={12} /> School Logo</div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handleFileChange} />
            <div style={{ display:'flex',alignItems:'center',gap:16,background:'#f8fffe',borderRadius:14,border:'1.5px solid #e8f0fc',padding:16 }}>
              <div onClick={() => !uploading && fileRef.current?.click()} style={{
                width:80,height:80,borderRadius:14,flexShrink:0,
                border:`2px dashed ${uploading?'#f59e0b':logoPreview?'#0040a0':'#cbd5e0'}`,
                display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
                overflow:'hidden',background:logoPreview?'#f0fdf9':'rgba(0,64,160,0.03)',
                cursor:uploading?'wait':'pointer',transition:'all 0.2s',
              }}>
                {uploading ? <Loader2 size={22} color="#f59e0b" style={{ animation:'spin 1s linear infinite' }} />
                  : logoPreview ? <img src={logoPreview} alt="logo" style={{ width:'100%',height:'100%',objectFit:'contain',padding:6 }} />
                  : <><Upload size={18} color="#94a3b8" /><span style={{ fontSize:9,color:'#94a3b8',marginTop:4,textAlign:'center' }}>Click to<br />upload</span></>}
              </div>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:13,color:'#374151',fontWeight:600,marginBottom:4 }}>
                  {uploading ? 'Uploading...' : logoPreview ? 'Logo uploaded ✓' : 'Upload school logo (optional)'}
                </p>
                <p style={{ fontSize:11,color:'#94a3b8',marginBottom:10 }}>PNG, JPG · Max 2MB</p>
                <div style={{ display:'flex',gap:8 }}>
                  <button type="button" onClick={() => !uploading && fileRef.current?.click()} disabled={uploading}
                    style={{ padding:'5px 14px',fontSize:12,fontWeight:600,background:'rgba(0,64,160,0.1)',border:'1px solid rgba(0,64,160,0.25)',borderRadius:8,cursor:'pointer',color:'#0040a0',display:'flex',alignItems:'center',gap:4,fontFamily:'inherit' }}>
                    <Upload size={11} /> {logoPreview ? 'Change' : 'Browse'}
                  </button>
                  {logoPreview && !uploading && (
                    <button type="button" onClick={() => { setForm(p=>({...p,logo:''})); setLogoPreview(null); if(fileRef.current)fileRef.current.value='' }}
                      style={{ padding:'5px 10px',fontSize:12,fontWeight:600,background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:8,cursor:'pointer',color:'#ef4444',display:'flex',alignItems:'center',gap:4,fontFamily:'inherit' }}>
                      <X size={11} /> Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* School Name */}
          <div style={{ marginBottom:20 }}>
            <div style={sectionTitle}><Building2 size={12} /> School Information</div>
            <label style={labelStyle}>School Name <span style={{ color:'#ef4444' }}>*</span></label>
            <div style={FIELD_STYLE} onFocusCapture={e=>e.currentTarget.style.borderColor='#0040a0'} onBlurCapture={e=>e.currentTarget.style.borderColor='#e2e8f0'}>
              <div style={ICON_STYLE}><Building2 size={15} /></div>
              <input name="schoolName" value={form.schoolName} onChange={handle} placeholder="e.g. Delhi Public School" required style={INPUT_STYLE} />
            </div>
          </div>

          {/* Address */}
          <div style={{ marginBottom:20 }}>
            <label style={labelStyle}>School Address</label>
            <div style={{ ...FIELD_STYLE,alignItems:'flex-start' }} onFocusCapture={e=>e.currentTarget.style.borderColor='#0040a0'} onBlurCapture={e=>e.currentTarget.style.borderColor='#e2e8f0'}>
              <div style={{ ...ICON_STYLE,paddingTop:14,alignSelf:'flex-start' }}><MapPin size={15} /></div>
              <textarea name="schoolAddress" value={form.schoolAddress} onChange={handle} placeholder="Full school address" rows={2}
                style={{ ...INPUT_STYLE,height:'auto',padding:'12px 14px',resize:'none',lineHeight:1.55 }} />
            </div>
          </div>

          {/* City / State / Pincode */}
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12,marginBottom:20 }}>
            {[['city','City'],['state','State'],['pincode','Pincode']].map(([n,lbl])=>(
              <div key={n}>
                <label style={labelStyle}>{lbl}</label>
                <input name={n} value={form[n]} onChange={handle} placeholder={lbl}
                  style={{ ...INPUT_STYLE,width:'100%',border:'1.5px solid #e2e8f0',borderRadius:10,background:'#f8fffe' }}
                  onFocus={e=>e.target.style.borderColor='#0040a0'} onBlur={e=>e.target.style.borderColor='#e2e8f0'} />
              </div>
            ))}
          </div>

          {/* Affiliation */}
          <div style={{ marginBottom:20 }}>
            <div style={sectionTitle}><Globe size={12} /> Affiliation & Medium</div>
            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14 }}>
              <div>
                <label style={labelStyle}>Affiliation Board</label>
                <select name="affiliationBoard" value={form.affiliationBoard} onChange={handle}
                  style={{ ...INPUT_STYLE,width:'100%',border:'1.5px solid #e2e8f0',borderRadius:10,background:'#f8fffe',appearance:'none',cursor:'pointer',backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' fill='none'/%3E%3C/svg%3E\")",backgroundRepeat:'no-repeat',backgroundPosition:'right 12px center',paddingRight:36 }}
                  onFocus={e=>e.target.style.borderColor='#0040a0'} onBlur={e=>e.target.style.borderColor='#e2e8f0'}>
                  <option value="">Select Board</option>
                  {['CBSE','ICSE','UP Board','MP Board','Rajasthan Board','Bihar Board','Maharashtra Board','Other'].map(b=><option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Affiliation No.</label>
                <input name="affiliationNo" value={form.affiliationNo} onChange={handle} placeholder="e.g. 2131047"
                  style={{ ...INPUT_STYLE,width:'100%',border:'1.5px solid #e2e8f0',borderRadius:10,background:'#f8fffe' }}
                  onFocus={e=>e.target.style.borderColor='#0040a0'} onBlur={e=>e.target.style.borderColor='#e2e8f0'} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>School Medium</label>
              <select name="schoolMedium" value={form.schoolMedium} onChange={handle}
                style={{ ...INPUT_STYLE,width:'100%',border:'1.5px solid #e2e8f0',borderRadius:10,background:'#f8fffe',appearance:'none',cursor:'pointer',backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' fill='none'/%3E%3C/svg%3E\")",backgroundRepeat:'no-repeat',backgroundPosition:'right 12px center',paddingRight:36 }}
                onFocus={e=>e.target.style.borderColor='#0040a0'} onBlur={e=>e.target.style.borderColor='#e2e8f0'}>
                <option value="">Select Medium</option>
                {['English','Hindi','English & Hindi','Urdu','Other'].map(m=><option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading}
            style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:8,width:'100%',height:52,background:'linear-gradient(135deg,#0040a0,#002f80)',color:'#fff',border:'none',borderRadius:12,fontSize:15,fontWeight:700,cursor:'pointer',boxShadow:'0 6px 20px rgba(0,64,160,0.35)',transition:'all 0.2s',opacity:loading?0.7:1,fontFamily:'inherit',marginBottom:12 }}
            onMouseEnter={e=>{if(!loading)e.currentTarget.style.transform='translateY(-1px)'}}
            onMouseLeave={e=>e.currentTarget.style.transform=''}>
            {loading ? <><div className="spinner" /> Creating your school...</> : <><Building2 size={18} /> Create School</>}
          </button>

          <button type="button" onClick={onBack} disabled={loading}
            style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:8,width:'100%',height:44,background:'transparent',color:'#64748b',border:'1.5px solid #e2e8f0',borderRadius:12,fontSize:14,fontWeight:500,cursor:'pointer',transition:'all 0.18s',fontFamily:'inherit' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='#0040a0';e.currentTarget.style.color='#0040a0'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='#e2e8f0';e.currentTarget.style.color='#64748b'}}>
            <ArrowLeft size={16} /> Back
          </button>
        </form>
      </div>
    </div>
  )
}
