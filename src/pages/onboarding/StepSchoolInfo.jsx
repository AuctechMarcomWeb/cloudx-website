import { useState, useRef } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
  ArrowRight, User, Mail, Phone, MapPin,
  Globe, Hash, FileText, Upload, X, Loader2, ChevronDown, ChevronUp,
} from 'lucide-react'

const API = import.meta.env.VITE_API_BASE_URL

export default function StepSchoolInfo({ onNext }) {
  const [loading, setLoading]       = useState(false)
  const [uploading, setUploading]   = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [logoPreview, setLogoPreview]   = useState(null)
  const fileRef = useRef(null)

  const [form, setForm] = useState({
    schoolName: '', schoolEmail: '', schoolContact: '',
    subdomain: '', schoolCode: '', estNo: '', schoolAddress: '',
    schoolContactAlt: '', description: '', logo: '',
    affiliationLine: '', affiliationNo: '', schoolMedium: '',
    msmeRegNo: '', isoRegNo: '', regInfo: '', registrationNo: '',
    nitiAayog: '', managedBy: '',
    contactPersonName: '', contactPersonDesignation: '',
    city: '', state: '', pincode: '', expectedStudents: '',
  })

  const handle = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  const handleSchoolName = (e) => {
    const val = e.target.value
    setForm((p) => ({
      ...p,
      schoolName: val,
      subdomain: p.subdomain
        ? p.subdomain
        : val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    }))
  }

  const handleSubdomain = (e) => {
    setForm((p) => ({ ...p, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }))
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
      const imageUrl = res?.data?.data?.imageUrl
      if (!imageUrl) throw new Error('No URL returned')
      setLogoPreview(imageUrl)
      setForm((p) => ({ ...p, logo: imageUrl }))
      toast.success('Logo uploaded!')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Upload failed')
      setLogoPreview(form.logo || null)
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
    if (!form.schoolName || !form.schoolEmail || !form.schoolContact) { toast.error('School name, email and contact are required'); return }
    if (!form.subdomain)    { toast.error('Subdomain is required'); return }
    if (!form.schoolCode)   { toast.error('School code is required'); return }
    if (!form.estNo)        { toast.error('Establishment No. is required'); return }
    if (!form.schoolAddress){ toast.error('School address is required'); return }
    if (!/^\d{10}$/.test(form.schoolContact)) { toast.error('Please enter a valid 10-digit contact number'); return }

    setLoading(true)
    try {
      const res = await axios.post(`${API}onboarding/register`, form)
      toast.success(res.data.message)
      onNext({ registrationId: res.data.data.registrationId, schoolEmail: form.schoolEmail, schoolName: form.schoolName })
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6, color: '#fff' }}>School Details</h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>
          Fill in your school details &mdash; takes less than 2 minutes
        </p>
      </div>

      <div className="glass-card" style={{ padding: '28px 28px 24px' }}>
        <form onSubmit={handleSubmit} autoComplete="off">

          {/* ── Section: Logo ── */}
          <div className="form-section">
            <div className="form-section-title">
              <Upload size={12} /> School Logo
            </div>

            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />

            <div style={{
              display: 'flex', alignItems: 'center', gap: 16,
              background: 'rgba(255,255,255,0.025)', borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.07)', padding: 14,
            }}>
              {/* Preview box */}
              <div
                onClick={() => !uploading && fileRef.current?.click()}
                style={{
                  width: 76, height: 76, borderRadius: 12, flexShrink: 0,
                  border: `2px dashed ${uploading ? 'rgba(4,41,84,0.25)' : logoPreview ? 'rgba(74,222,128,0.5)' : 'rgba(255,255,255,0.18)'}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden', background: 'rgba(255,255,255,0.03)',
                  cursor: uploading ? 'wait' : 'pointer', transition: 'all 0.2s', position: 'relative',
                }}
              >
                {uploading ? (
                  <Loader2 size={22} color="#fabf22" style={{ animation: 'spin 1s linear infinite' }} />
                ) : logoPreview ? (
                  <img src={logoPreview} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} />
                ) : (
                  <>
                    <Upload size={18} color="rgba(255,255,255,0.28)" />
                    <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.28)', marginTop: 4, textAlign: 'center', lineHeight: 1.3 }}>
                      Click to<br />upload
                    </span>
                  </>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500, marginBottom: 3 }}>
                  {uploading ? 'Uploading...' : logoPreview ? 'Logo uploaded \u2713' : 'Upload your school logo'}
                </p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>
                  PNG, JPG or SVG &middot; Max 2MB
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="button" onClick={() => !uploading && fileRef.current?.click()} disabled={uploading}
                    style={{ padding: '5px 12px', fontSize: 12, fontWeight: 600, background: 'rgba(26,86,219,0.15)', border: '1px solid rgba(26,86,219,0.25)', borderRadius: 7, cursor: uploading ? 'not-allowed' : 'pointer', color: '#93c5fd', display: 'flex', alignItems: 'center', gap: 5, opacity: uploading ? 0.6 : 1, fontFamily: 'var(--font)' }}>
                    <Upload size={11} /> {logoPreview ? 'Change' : 'Browse'}
                  </button>
                  {logoPreview && !uploading && (
                    <button type="button" onClick={removeLogo}
                      style={{ padding: '5px 10px', fontSize: 12, fontWeight: 600, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.22)', borderRadius: 7, cursor: 'pointer', color: '#f87171', display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font)' }}>
                      <X size={11} /> Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── Section: Identity ── */}
          <div className="form-section">
            <div className="form-section-title"><Globe size={12} /> School Identity</div>

            {/* School Name */}
            <div style={{ marginBottom: 16 }}>
              <label className="form-label">School Name <span className="req">*</span></label>
              <div className="input-group">
                <div className="input-icon"><User size={15} /></div>
                <input className="dark-input" name="schoolName" value={form.schoolName} onChange={handleSchoolName} placeholder="Enter your school name" required />
              </div>
            </div>

            {/* Subdomain */}
            <div style={{ marginBottom: 8 }}>
              <label className="form-label">Subdomain <span className="req">*</span></label>
              <div style={{ display: 'flex', alignItems: 'stretch' }}>
                <div className="input-group" style={{ flex: 1, borderRadius: '10px 0 0 10px', borderRight: 'none' }}>
                  <div className="input-icon"><Globe size={15} /></div>
                  <input className="dark-input" name="subdomain" value={form.subdomain} onChange={handleSubdomain} placeholder="your-school-name" required />
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0 14px', fontSize: 12.5, fontWeight: 600, background: 'rgba(255,255,255,0.03)', border: '1.5px solid rgba(255,255,255,0.1)', borderLeft: 'none', borderRadius: '0 10px 10px 0', color: 'rgba(255,255,255,0.38)', whiteSpace: 'nowrap', userSelect: 'none', letterSpacing: '-0.01em' }}>
                  .schoolcloudx.com
                </span>
              </div>
              <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.28)', marginTop: 5 }}>Lowercase letters, numbers and hyphens only</p>
            </div>
          </div>

          {/* ── Section: Contact ── */}
          <div className="form-section">
            <div className="form-section-title"><Phone size={12} /> Contact Information</div>

            {/* Email + Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div>
                <label className="form-label">Official Email <span className="req">*</span></label>
                <div className="input-group">
                  <div className="input-icon"><Mail size={15} /></div>
                  <input className="dark-input" type="email" name="schoolEmail" value={form.schoolEmail} onChange={handle} placeholder="admin@school.com" required />
                </div>
              </div>
              <div>
                <label className="form-label">Primary Contact <span className="req">*</span></label>
                <div className="input-group">
                  <div className="input-icon"><Phone size={15} /></div>
                  <input className="dark-input" type="tel" name="schoolContact" value={form.schoolContact} onChange={(e) => setForm(p => ({ ...p, schoolContact: e.target.value.replace(/\D/g, '').slice(0, 10) }))} placeholder="10-digit number" required />
                </div>
              </div>
            </div>

            {/* Alternate Contact + Expected Students */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div>
                <label className="form-label">Alternate Contact</label>
                <div className="input-group">
                  <div className="input-icon"><Phone size={15} /></div>
                  <input className="dark-input" name="schoolContactAlt" value={form.schoolContactAlt} onChange={(e) => setForm(p => ({ ...p, schoolContactAlt: e.target.value.replace(/\D/g, '').slice(0, 10) }))} placeholder="10-digit number" />
                </div>
              </div>
              <div>
                <label className="form-label">Expected Students</label>
                <select className="dark-input" name="expectedStudents" value={form.expectedStudents} onChange={handle}>
                  <option value="" style={{ background: '#ffffff', color: '#0f172a' }}>Select range</option>
                  {[['100','Less than 100'],['300','100 - 300'],['500','300 - 500'],['1000','500 - 1000'],['2000','1000 - 2000'],['5000','2000+']].map(([v, l]) => (
                    <option key={v} value={v} style={{ background: '#ffffff', color: '#0f172a' }}>{l}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Contact Person + Designation */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label className="form-label">Contact Person</label>
                <input className="dark-input" name="contactPersonName" value={form.contactPersonName} onChange={handle} placeholder="Principal / Manager" />
              </div>
              <div>
                <label className="form-label">Designation</label>
                <input className="dark-input" name="contactPersonDesignation" value={form.contactPersonDesignation} onChange={handle} placeholder="Principal / Director" />
              </div>
            </div>
          </div>

          {/* ── Section: School Codes ── */}
          <div className="form-section">
            <div className="form-section-title"><Hash size={12} /> Official Codes</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label className="form-label">School Code <span className="req">*</span></label>
                <div className="input-group">
                  <div className="input-icon"><Hash size={15} /></div>
                  <input className="dark-input" name="schoolCode" value={form.schoolCode} onChange={handle} placeholder="e.g. SCH001" required />
                </div>
              </div>
              <div>
                <label className="form-label">Establishment No. <span className="req">*</span></label>
                <div className="input-group">
                  <div className="input-icon"><Hash size={15} /></div>
                  <input className="dark-input" name="estNo" value={form.estNo} onChange={handle} placeholder="e.g. EST/2001/001" required />
                </div>
              </div>
            </div>
          </div>

          {/* ── Section: Address ── */}
          <div className="form-section">
            <div className="form-section-title"><MapPin size={12} /> Address</div>

            <div style={{ marginBottom: 14 }}>
              <label className="form-label">School Address <span className="req">*</span></label>
              <div className="input-group">
                <div className="input-icon" style={{ paddingTop: 10, alignSelf: 'flex-start' }}><MapPin size={15} /></div>
                <textarea className="dark-input" name="schoolAddress" value={form.schoolAddress} onChange={handle} placeholder="Full school address" rows={2} style={{ resize: 'none', paddingTop: 10 }} required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              {[['city','City'],['state','State'],['pincode','Pincode']].map(([n, lbl]) => (
                <div key={n}>
                  <label className="form-label">{lbl}</label>
                  <input className="dark-input" name={n} value={form[n]} onChange={handle} placeholder={lbl} />
                </div>
              ))}
            </div>
          </div>

          {/* ── Description ── */}
          <div className="form-section">
            <label className="form-label"><FileText size={12} style={{ marginRight: 5 }} />Description</label>
            <textarea className="dark-input" name="description" value={form.description} onChange={handle} placeholder="Brief description of your school (optional)" rows={2} style={{ resize: 'none' }} />
          </div>

          {/* ── Advanced / Accreditations ── */}
          <button type="button" onClick={() => setShowAdvanced(v => !v)}
            style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '10px 16px', cursor: 'pointer', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'rgba(255,255,255,0.5)', fontSize: 12.5, fontWeight: 600, fontFamily: 'var(--font)', letterSpacing: '0.01em' }}>
            <span>Registration &amp; Accreditations (optional)</span>
            {showAdvanced ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>

          {showAdvanced && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                {[
                  ['affiliationLine','Affiliation Line','e.g. Affiliation PS'],
                  ['affiliationNo','Affiliation No.','e.g. 2131047'],
                  ['schoolMedium','School Medium','English / Hindi'],
                  ['msmeRegNo','MSME Reg. No.','UDYAM-XX-00-000000'],
                  ['isoRegNo','ISO Reg. No.','ISO-9001-2015'],
                  ['regInfo','Reg. Info','e.g. Reg. 12A'],
                  ['registrationNo','Registration No.','REG/2024/001'],
                  ['nitiAayog','NITI Aayog','NITI AAYOG/XX'],
                  ['managedBy','Managed By','Trust / Society'],
                ].map(([n, lbl, ph]) => (
                  <div key={n}>
                    <label className="form-label">{lbl}</label>
                    <input className="dark-input" name={n} value={form[n]} onChange={handle} placeholder={ph} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit */}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <><div className="spinner" /> Registering...</> : <>Continue <ArrowRight size={17} /></>}
          </button>

          <p style={{ textAlign: 'center', marginTop: 14, fontSize: 11.5, color: 'rgba(255,255,255,0.25)' }}>
            By continuing you agree to our{' '}
            <a href="#" style={{ color: '#fabf22', textDecoration: 'none' }}>Terms</a> &amp;{' '}
            <a href="#" style={{ color: '#fabf22', textDecoration: 'none' }}>Privacy Policy</a>
          </p>
        </form>
      </div>
    </div>
  )
}
