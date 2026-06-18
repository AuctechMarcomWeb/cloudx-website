import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ArrowRight, User, Mail, Phone, MapPin, Users } from 'lucide-react'

const API = import.meta.env.VITE_API_BASE_URL

const STUDENT_OPTIONS = [
  { value: '100',  label: 'Less than 100' },
  { value: '300',  label: '100 – 300' },
  { value: '500',  label: '300 – 500' },
  { value: '1000', label: '500 – 1000' },
  { value: '2000', label: '1000 – 2000' },
  { value: '5000', label: '2000+' },
]

export default function StepSchoolInfo({ onNext }) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    schoolName: '', schoolEmail: '', schoolContact: '',
    contactPersonName: '', contactPersonDesignation: '',
    schoolAddress: '', city: '', state: '', pincode: '', expectedStudents: '',
  })

  const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.schoolName || !form.schoolEmail || !form.schoolContact) {
      toast.error('School name, email aur contact zaroori hai')
      return
    }
    setLoading(true)
    try {
      const res = await axios.post(`${API}onboarding/register`, form)
      toast.success(res.data.message)
      onNext({ registrationId: res.data.data.registrationId, schoolEmail: form.schoolEmail, schoolName: form.schoolName })
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>School Register Karo</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>Basic details bharo — 2 minute mein ho jayega</p>
      </div>

      <div className="glass-card" style={{ padding: 32 }}>
        <form onSubmit={handleSubmit}>

          {/* School Name */}
          <div style={{ marginBottom: 20 }}>
            <label className="form-label">School Name *</label>
            <div className="input-group">
              <div className="input-icon"><User size={16} /></div>
              <input className="dark-input" name="schoolName" value={form.schoolName} onChange={handle} placeholder="e.g. Delhi Public School" required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label className="form-label">Official Email *</label>
              <div className="input-group">
                <div className="input-icon"><Mail size={16} /></div>
                <input className="dark-input" type="email" name="schoolEmail" value={form.schoolEmail} onChange={handle} placeholder="admin@school.com" required />
              </div>
            </div>
            <div>
              <label className="form-label">Contact Number *</label>
              <div className="input-group">
                <div className="input-icon"><Phone size={16} /></div>
                <input className="dark-input" type="tel" name="schoolContact" value={form.schoolContact} onChange={handle} placeholder="+91 98765 43210" required />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label className="form-label">Contact Person</label>
              <input className="dark-input" name="contactPersonName" value={form.contactPersonName} onChange={handle} placeholder="Principal / Manager" />
            </div>
            <div>
              <label className="form-label">Designation</label>
              <input className="dark-input" name="contactPersonDesignation" value={form.contactPersonDesignation} onChange={handle} placeholder="Principal / Director" />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label className="form-label">School Address</label>
            <div className="input-group">
              <div className="input-icon"><MapPin size={16} /></div>
              <input className="dark-input" name="schoolAddress" value={form.schoolAddress} onChange={handle} placeholder="Street address" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
            {[['city','City'],['state','State'],['pincode','Pincode']].map(([n, p]) => (
              <div key={n}>
                <label className="form-label">{p}</label>
                <input className="dark-input" name={n} value={form[n]} onChange={handle} placeholder={p} />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 28 }}>
            <label className="form-label">
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Users size={14} /> Approx. Number of Students</span>
            </label>
            <select className="dark-input" name="expectedStudents" value={form.expectedStudents} onChange={handle}
              style={{ appearance: 'none' }}>
              <option value="" style={{ background: '#0d1425' }}>Select student count</option>
              {STUDENT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} style={{ background: '#0d1425' }}>{o.label}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <><div className="spinner" /> OTP Bhej raha hai...</> : <>Continue <ArrowRight size={18} /></>}
          </button>

          <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
            Continue karne se aap hamare{' '}
            <a href="#" style={{ color: '#818cf8', textDecoration: 'none' }}>Terms</a> aur{' '}
            <a href="#" style={{ color: '#818cf8', textDecoration: 'none' }}>Privacy Policy</a> se agree karte hain
          </p>
        </form>
      </div>
    </div>
  )
}
