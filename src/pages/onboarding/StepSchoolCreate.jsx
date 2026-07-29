import { useState, useRef } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ArrowLeft, Building2, Upload, X, Loader2 } from 'lucide-react'

const API = import.meta.env.VITE_API_BASE_URL

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

  return (
    <div>
      {/* Header */}
      <div style={{ textAlign:'center', marginBottom:28 }}>
        <h2 style={{ fontSize:24, fontWeight:700, marginBottom:6, color:'#1a1a2e' }}>School Details</h2>
        <p style={{ color:'#64748b', fontSize:14 }}>Almost there — fill in your school information</p>
      </div>

      {/* Card */}
      <div style={{ background:'#fff', borderRadius:16, border:'1px solid #e2e8f0', padding:'24px 28px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
        <form onSubmit={handleSubmit}>

          {/* Logo upload */}
          <div style={{ marginBottom:24 }}>
            <label style={lbl}>School Logo <span style={{ color:'#94a3b8', fontWeight:400 }}>(optional)</span></label>
            <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handleFileChange} />
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <div
                onClick={() => !uploading && fileRef.current?.click()}
                style={{
                  width:64, height:64, borderRadius:12, flexShrink:0,
                  border:`1.5px dashed ${logoPreview ? '#0040a0' : '#d1d5db'}`,
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                  overflow:'hidden', background:'#f9fafb',
                  cursor: uploading ? 'wait' : 'pointer',
                }}
              >
                {uploading
                  ? <Loader2 size={20} color="#94a3b8" style={{ animation:'spin 1s linear infinite' }} />
                  : logoPreview
                    ? <img src={logoPreview} alt="logo" style={{ width:'100%', height:'100%', objectFit:'contain', padding:4 }} />
                    : <Upload size={18} color="#9ca3af" />
                }
              </div>
              <div>
                <p style={{ fontSize:13, color:'#374151', marginBottom:4 }}>PNG, JPG · Max 2MB</p>
                <div style={{ display:'flex', gap:8 }}>
                  <button type="button" onClick={() => !uploading && fileRef.current?.click()} disabled={uploading}
                    style={smallBtn}>
                    <Upload size={11} /> {logoPreview ? 'Change' : 'Upload'}
                  </button>
                  {logoPreview && !uploading && (
                    <button type="button"
                      onClick={() => { setForm(p=>({...p,logo:''})); setLogoPreview(null); if(fileRef.current)fileRef.current.value='' }}
                      style={{ ...smallBtn, color:'#ef4444', borderColor:'#fca5a5' }}>
                      <X size={11} /> Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <hr style={{ border:'none', borderTop:'1px solid #f1f5f9', margin:'0 0 20px' }} />

          {/* School Name */}
          <div style={field}>
            <label style={lbl}>School Name <span style={{ color:'#ef4444' }}>*</span></label>
            <input className="dark-input" name="schoolName" value={form.schoolName}
              onChange={handle} placeholder="Enter your school name" required />
          </div>

          {/* Address */}
          <div style={field}>
            <label style={lbl}>School Address</label>
            <textarea className="dark-input" name="schoolAddress" value={form.schoolAddress}
              onChange={handle} placeholder="Full school address" rows={3}
              style={{ height:'auto', minHeight:80, padding:'10px 14px', resize:'none', lineHeight:1.6 }} />
          </div>

          {/* City / State / Pincode */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginBottom:20 }}>
            {[['city','City'],['state','State'],['pincode','Pincode']].map(([n,l]) => (
              <div key={n}>
                <label style={lbl}>{l}</label>
                <input className="dark-input" name={n} value={form[n]} onChange={handle} placeholder={l} />
              </div>
            ))}
          </div>

          <hr style={{ border:'none', borderTop:'1px solid #f1f5f9', margin:'0 0 20px' }} />

          {/* Affiliation Board + No */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:20 }}>
            <div>
              <label style={lbl}>Affiliation Board</label>
              <select className="dark-input" name="affiliationBoard" value={form.affiliationBoard} onChange={handle}>
                <option value="">Select Board</option>
                {['CBSE','ICSE','UP Board','MP Board','Rajasthan Board','Bihar Board','Maharashtra Board','Other'].map(b=>(
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={lbl}>Affiliation No.</label>
              <input className="dark-input" name="affiliationNo" value={form.affiliationNo}
                onChange={handle} placeholder="e.g. 2131047" />
            </div>
          </div>

          {/* Medium */}
          <div style={{ marginBottom:24 }}>
            <label style={lbl}>School Medium</label>
            <select className="dark-input" name="schoolMedium" value={form.schoolMedium} onChange={handle}>
              <option value="">Select Medium</option>
              {['English','Hindi','English & Hindi','Urdu','Other'].map(m=>(
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading} className="btn-primary btn-block" style={{ marginBottom:12 }}>
            {loading ? <><div className="spinner" /> Creating...</> : <><Building2 size={16} /> Create School</>}
          </button>

          {/* Back */}
          <div style={{ textAlign:'center' }}>
            <button type="button" onClick={onBack} disabled={loading} className="btn-ghost">
              <ArrowLeft size={13} /> Back
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

/* local style shortcuts */
const lbl  = { display:'block', fontSize:13, fontWeight:500, color:'#374151', marginBottom:6 }
const field = { marginBottom:16 }
const smallBtn = {
  padding:'5px 12px', fontSize:12, fontWeight:500,
  background:'#f9fafb', border:'1px solid #e2e8f0',
  borderRadius:6, cursor:'pointer', color:'#374151',
  display:'inline-flex', alignItems:'center', gap:4,
  fontFamily:'inherit',
}
