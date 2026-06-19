import { useState, useRef } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ArrowLeft, Building2, MapPin, Upload, X, Loader2 } from 'lucide-react'

const API = import.meta.env.VITE_API_BASE_URL

export default function StepSchoolCreate({ registrationId, onNext, onBack }) {
  const [loading, setLoading]         = useState(false)
  const [uploading, setUploading]     = useState(false)
  const [logoPreview, setLogoPreview] = useState(null)
  const fileRef = useRef(null)

  const [form, setForm] = useState({
    schoolName:       '',
    schoolAddress:    '',
    city:             '',
    state:            '',
    pincode:          '',
    logo:             '',
    affiliationBoard: '',
    affiliationNo:    '',
    schoolMedium:     '',
    description:      '',
  })

  const handle = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { toast.error('Only image files are allowed'); return }
    if (file.size > 2 * 1024 * 1024)    { toast.error('Logo must be smaller than 2MB'); return }

    setLogoPreview(URL.createObjectURL(file))
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await axios.post(`${API}upload/uploadImage`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      const url = res?.data?.data?.imageUrl
      if (!url) throw new Error('No URL returned')
      setLogoPreview(url)
      setForm((p) => ({ ...p, logo: url }))
      toast.success('Logo uploaded successfully!')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Upload failed. Please try again.')
      setLogoPreview(null)
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const removeLogo = () => {
    setForm((p) => ({ ...p, logo: '' }))
    setLogoPreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.schoolName.trim()) {
      toast.error('School name is required')
      return
    }
    setLoading(true)
    try {
      const res = await axios.post(`${API}onboarding/create-school`, {
        registrationId,
        schoolName:       form.schoolName,
        schoolAddress:    form.schoolAddress,
        city:             form.city,
        state:            form.state,
        pincode:          form.pincode,
        logo:             form.logo,
        affiliationBoard: form.affiliationBoard,
        affiliationNo:    form.affiliationNo,
        schoolMedium:     form.schoolMedium,
        description:      form.description,
      })
      toast.success('School created successfully!')
      onNext(res.data.data)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%', margin: '0 auto 16px',
          background: 'linear-gradient(135deg,#042954,#051f3e)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 30px rgba(4,41,84,0.3)',
        }}>
          <Building2 size={28} color="#fff" />
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#fff' }}>
          School Details
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>
          Almost there — fill in your school information to get started
        </p>
      </div>

      <div className="glass-card" style={{ padding: 32 }}>
        <form onSubmit={handleSubmit}>

          {/* Logo Upload */}
          <div style={{ marginBottom: 24 }}>
            <label className="form-label">School Logo</label>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />

            <div style={{
              display: 'flex', alignItems: 'center', gap: 16,
              background: 'rgba(255,255,255,0.03)', borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.08)', padding: 16,
            }}>
              <div
                onClick={() => !uploading && fileRef.current?.click()}
                style={{
                  width: 72, height: 72, borderRadius: 12, flexShrink: 0,
                  border: `2px dashed ${uploading ? '#fabf22' : logoPreview ? 'rgba(34,197,94,0.5)' : 'rgba(255,255,255,0.2)'}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden', background: 'rgba(255,255,255,0.04)',
                  cursor: uploading ? 'wait' : 'pointer', transition: 'all 0.2s',
                }}
              >
                {uploading ? (
                  <Loader2 size={22} color="#fabf22" style={{ animation: 'spin 1s linear infinite' }} />
                ) : logoPreview ? (
                  <img src={logoPreview} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} />
                ) : (
                  <>
                    <Upload size={18} color="rgba(255,255,255,0.3)" />
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 4, textAlign: 'center' }}>Click to<br />upload</span>
                  </>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500, marginBottom: 4 }}>
                  {uploading ? 'Uploading...' : logoPreview ? 'Logo uploaded ✓' : 'Upload your school logo (optional)'}
                </p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>PNG, JPG · Max 2MB</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => !uploading && fileRef.current?.click()}
                    disabled={uploading}
                    style={{ padding: '5px 12px', fontSize: 12, fontWeight: 600, background: 'rgba(4,41,84,0.25)', border: '1px solid rgba(4,41,84,0.3)', borderRadius: 8, cursor: 'pointer', color: '#fabf22', display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    <Upload size={11} /> {logoPreview ? 'Change' : 'Browse'}
                  </button>
                  {logoPreview && !uploading && (
                    <button
                      type="button"
                      onClick={removeLogo}
                      style={{ padding: '5px 10px', fontSize: 12, fontWeight: 600, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8, cursor: 'pointer', color: '#f87171', display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      <X size={11} /> Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* School Name */}
          <div style={{ marginBottom: 20 }}>
            <label className="form-label">School Name *</label>
            <div className="input-group">
              <div className="input-icon"><Building2 size={16} /></div>
              <input
                className="dark-input"
                name="schoolName"
                value={form.schoolName}
                onChange={handle}
                placeholder="e.g. Delhi Public School"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div style={{ marginBottom: 20 }}>
            <label className="form-label">School Address</label>
            <div className="input-group">
              <div className="input-icon" style={{ paddingTop: 10, alignSelf: 'flex-start' }}><MapPin size={16} /></div>
              <textarea
                className="dark-input"
                name="schoolAddress"
                value={form.schoolAddress}
                onChange={handle}
                placeholder="Full school address"
                rows={2}
                style={{ resize: 'none', paddingTop: 8 }}
              />
            </div>
          </div>

          {/* City / State / Pincode */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
            {[['city', 'City'], ['state', 'State'], ['pincode', 'Pincode']].map(([n, lbl]) => (
              <div key={n}>
                <label className="form-label">{lbl}</label>
                <input className="dark-input" name={n} value={form[n]} onChange={handle} placeholder={lbl} />
              </div>
            ))}
          </div>

          {/* Affiliation */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label className="form-label">Affiliation Board</label>
              <select className="dark-input" name="affiliationBoard" value={form.affiliationBoard} onChange={handle} style={{ appearance: 'none' }}>
                <option value="" style={{ background: '#0d1425' }}>Select Board</option>
                {['CBSE', 'ICSE', 'UP Board', 'MP Board', 'Rajasthan Board', 'Bihar Board', 'Maharashtra Board', 'Other'].map((b) => (
                  <option key={b} value={b} style={{ background: '#0d1425' }}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Affiliation No.</label>
              <input className="dark-input" name="affiliationNo" value={form.affiliationNo} onChange={handle} placeholder="e.g. 2131047" />
            </div>
          </div>

          {/* Medium */}
          <div style={{ marginBottom: 28 }}>
            <label className="form-label">School Medium</label>
            <select className="dark-input" name="schoolMedium" value={form.schoolMedium} onChange={handle} style={{ appearance: 'none' }}>
              <option value="" style={{ background: '#0d1425' }}>Select Medium</option>
              {['English', 'Hindi', 'English & Hindi', 'Urdu', 'Other'].map((m) => (
                <option key={m} value={m} style={{ background: '#0d1425' }}>{m}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading
              ? <><div className="spinner" /> Creating your school...</>
              : <><Building2 size={18} /> Create School</>
            }
          </button>

          <button type="button" className="btn-ghost" onClick={onBack} style={{ marginTop: 12 }} disabled={loading}>
            <ArrowLeft size={16} /> Back
          </button>
        </form>
      </div>
    </div>
  )
}
