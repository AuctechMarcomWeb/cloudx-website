import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
  CreditCard, Zap, GraduationCap, CalendarDays, Clock,
  ExternalLink, Rocket, Users, ShieldCheck, AlertTriangle,
  Check, LogOut, Lock, Eye, EyeOff, Star, ArrowRight,
  BarChart2, History,
} from 'lucide-react'
import { usePortalAuth } from '../../context/PortalAuthContext'

const API = import.meta.env.VITE_API_BASE_URL

const STATUS_CFG = {
  ACTIVE:    { label: 'Active',    color: '#22c55e', bg: 'rgba(34,197,94,0.12)'  },
  TRIAL:     { label: 'Trial',     color: '#60a5fa', bg: 'rgba(59,130,246,0.12)' },
  EXPIRED:   { label: 'Expired',   color: '#f87171', bg: 'rgba(239,68,68,0.12)'  },
  CANCELLED: { label: 'Cancelled', color: '#fb923c', bg: 'rgba(249,115,22,0.12)' },
  PENDING:   { label: 'Pending',   color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
}

export default function PortalDashboard() {
  const navigate              = useNavigate()
  const { token, school, logout, isLoggedIn } = usePortalAuth()
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('plan') // plan | upgrade | history | security

  useEffect(() => {
    if (!isLoggedIn) { navigate('/portal/login', { replace: true }); return }
    fetchDashboard()
  }, [isLoggedIn])

  const fetchDashboard = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API}portal/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setData(res.data.data)
    } catch (err) {
      if (err?.response?.status === 401) { logout(); navigate('/portal/login') }
      else toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try { await axios.post(`${API}portal/logout`, {}, { headers: { Authorization: `Bearer ${token}` } }) } catch {}
    logout()
    navigate('/')
    toast.success('Logged out')
  }

  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'â€”'

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#021a3a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="spinner" style={{ width: 36, height: 36, margin: '0 auto 12px' }} />
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Loading...</p>
      </div>
    </div>
  )

  const { currentPlan: plan, allPlans, school: sc } = data || {}
  const statusCfg = STATUS_CFG[plan?.status] || STATUS_CFG.PENDING

  return (
    <div style={{ minHeight: '100vh', background: '#021a3a' }}>
      {/* BG */}
      <div style={{ position: 'fixed', top: -200, left: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(4,41,84,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Header */}
      <header style={{ padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(2,26,58,0.9)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg,#042954,#051f3e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, color: '#fff' }}>C</div>
          <span style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>School CloudX</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginLeft: 4 }}>/ Portal</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {sc?.logo
            ? <img src={sc.logo} alt="" style={{ width: 30, height: 30, borderRadius: 8, objectFit: 'contain', border: '1px solid rgba(255,255,255,0.1)' }} />
            : <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(4,41,84,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShieldCheck size={15} color="#818cf8" /></div>
          }
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sc?.name || school?.name}</span>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500 }}>
            <LogOut size={13} /> Logout
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 20px 80px' }}>

        {/* School banner */}
        <div className="glass-card" style={{ padding: '18px 22px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, overflow: 'hidden', background: 'rgba(4,41,84,0.25)', border: '1px solid rgba(4,41,84,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {sc?.logo ? <img src={sc.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} /> : <ShieldCheck size={20} color="#818cf8" />}
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700 }}>{sc?.name}</div>
              <div style={{ fontSize: 11, color: '#fabf22', fontFamily: 'monospace', marginTop: 2 }}>{sc?.subdomain}.schoolcloudx.com</div>
            </div>
          </div>
          <a href={sc?.loginUrl} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'rgba(4,41,84,0.25)', border: '1px solid rgba(4,41,84,0.35)', borderRadius: 10, color: '#fabf22', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
            <Rocket size={14} /> School Portal <ExternalLink size={12} style={{ opacity: 0.7 }} />
          </a>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 4, border: '1px solid rgba(255,255,255,0.07)', overflowX: 'auto' }}>
          {[['plan','My Plan', CreditCard], ['upgrade','Upgrade', Star], ['history','History', History], ['security','Security', Lock]].map(([key, label, Icon]) => (
            <button key={key} onClick={() => setActiveTab(key)} style={{
              flex: 1, minWidth: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              padding: '9px 12px', border: 'none', cursor: 'pointer', borderRadius: 9, fontSize: 13, fontWeight: 600,
              transition: 'all 0.2s', whiteSpace: 'nowrap',
              background: activeTab === key ? 'linear-gradient(135deg,#042954,#051f3e)' : 'transparent',
              color: activeTab === key ? '#fff' : 'rgba(255,255,255,0.4)',
            }}>
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        <div key={activeTab} style={{ animation: 'fadeInUp 0.25s ease both' }}>
          {activeTab === 'plan'     && <TabCurrentPlan plan={plan} statusCfg={statusCfg} fmtDate={fmtDate} />}
          {activeTab === 'upgrade'  && <TabUpgrade allPlans={allPlans} currentPlanId={plan?.planId} />}
          {activeTab === 'history'  && <TabHistory plan={plan} fmtDate={fmtDate} />}
          {activeTab === 'security' && <TabSecurity token={token} sc={sc} />}
        </div>
      </div>
    </div>
  )
}

/* â”€â”€ Tab: Current Plan â”€â”€ */
function TabCurrentPlan({ plan, statusCfg, fmtDate }) {
  if (!plan) return (
    <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
      <AlertTriangle size={40} color="#fbbf24" style={{ margin: '0 auto 12px' }} />
      <p style={{ color: 'rgba(255,255,255,0.5)' }}>No active subscription found</p>
    </div>
  )

  return (
    <div className="glass-card" style={{ padding: 28, border: `1px solid ${statusCfg.color}33`, background: statusCfg.bg }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {plan.isTrial ? <Zap size={20} color="#60a5fa" /> : <CreditCard size={20} color="#818cf8" />}
          <span style={{ fontSize: 24, fontWeight: 800 }}>{plan.name}</span>
          {plan.isTrial && <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: 'rgba(59,130,246,0.2)', color: '#60a5fa' }}>TRIAL</span>}
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, padding: '5px 14px', borderRadius: 20, background: statusCfg.bg, color: statusCfg.color, border: `1px solid ${statusCfg.color}44` }}>
          {statusCfg.label}
        </span>
      </div>

      <div style={{ marginBottom: 20 }}>
        {plan.isTrial
          ? <span style={{ fontSize: 32, fontWeight: 800, color: '#4ade80' }}>FREE</span>
          : <span style={{ fontSize: 32, fontWeight: 800 }}>â‚¹{Number(plan.price || 0).toLocaleString('en-IN')}<span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>/{plan.billingCycle === 'Yearly' ? 'yr' : 'mo'}</span></span>
        }
      </div>

      <div className="divider" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
        <StatItem icon={GraduationCap} label="Student Limit" value={plan.studentLimit > 0 ? plan.studentLimit.toLocaleString('en-IN') : 'Unlimited'} />
        <StatItem icon={Users} label="Used" value={`${plan.usedStudents || 0} / ${plan.studentLimit || 'âˆž'}`} />
        <StatItem icon={CalendarDays} label="Start Date" value={fmtDate(plan.startDate)} />
        <StatItem icon={CalendarDays} label={plan.isTrial ? 'Trial Ends' : 'Valid Till'} value={fmtDate(plan.isTrial ? plan.trialEndDate : plan.endDate)} highlight={plan.status === 'EXPIRED'} />
        {plan.billingCycle && <StatItem icon={CreditCard} label="Billing" value={plan.billingCycle} />}

        {plan.status !== 'EXPIRED' && (plan.daysLeft !== null || plan.trialDaysLeft !== null) && (
          <div style={{ gridColumn: '1/-1', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 10, background: (plan.daysLeft ?? plan.trialDaysLeft) <= 7 ? 'rgba(239,68,68,0.1)' : (plan.daysLeft ?? plan.trialDaysLeft) <= 30 ? 'rgba(251,191,36,0.1)' : 'rgba(34,197,94,0.1)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <Clock size={14} color={(plan.daysLeft ?? plan.trialDaysLeft) <= 7 ? '#f87171' : (plan.daysLeft ?? plan.trialDaysLeft) <= 30 ? '#fbbf24' : '#4ade80'} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>{plan.daysLeft ?? plan.trialDaysLeft} days remaining</span>
            {(plan.daysLeft ?? plan.trialDaysLeft) <= 30 && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginLeft: 4 }}>â€” Please renew soon</span>}
          </div>
        )}
        {plan.status === 'EXPIRED' && (
          <div style={{ gridColumn: '1/-1', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 10, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <AlertTriangle size={14} color="#f87171" />
            <span style={{ fontSize: 13, color: '#f87171', fontWeight: 600 }}>Your plan has expired â€” please renew</span>
          </div>
        )}
      </div>

      {plan.features?.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div className="divider" />
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: 1, textTransform: 'uppercase', margin: '14px 0 10px' }}>Included Features</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px' }}>
            {plan.features.map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>
                <Check size={12} color="#22c55e" style={{ flexShrink: 0 }} /> {f}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* â”€â”€ Tab: Upgrade Plans â”€â”€ */
function TabUpgrade({ allPlans, currentPlanId }) {
  if (!allPlans?.length) return <div className="glass-card" style={{ padding: 32, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>No plans available</div>

  return (
    <div>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>To upgrade, contact support or renew from the portal.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        {allPlans.map(p => {
          const isCurrent = p._id === currentPlanId?.toString()
          return (
            <div key={p._id} className="glass-card" style={{ padding: 22, position: 'relative', border: isCurrent ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.08)', background: isCurrent ? 'rgba(4,41,84,0.2)' : undefined }}>
              {isCurrent && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: '#042954', color: '#fff', whiteSpace: 'nowrap' }}>Current Plan</div>}
              {p.isPopular && !isCurrent && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: 'linear-gradient(135deg,#fabf22,#f59e0b)', color: '#fff', whiteSpace: 'nowrap' }}>Most Popular</div>}

              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{p.planType}</div>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{p.name}</div>
              {p.description && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 12 }}>{p.description}</div>}

              <div style={{ marginBottom: 14 }}>
                {p.pricingModel === 'PER_STUDENT'
                  ? <div><span style={{ fontSize: 24, fontWeight: 800 }}>â‚¹{p.pricePerStudent}</span><span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>/student/mo</span></div>
                  : <div><span style={{ fontSize: 24, fontWeight: 800 }}>â‚¹{Number(p.price).toLocaleString('en-IN')}</span><span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>/{p.billingCycle === 'Yearly' ? 'yr' : 'mo'}</span></div>
                }
                {p.trialDays > 0 && <div style={{ fontSize: 11, color: '#4ade80', marginTop: 4 }}>{p.trialDays}-day free trial</div>}
              </div>

              <div className="divider" />
              <ul style={{ listStyle: 'none', marginTop: 10 }}>
                {(p.features || []).slice(0, 5).map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 6, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                    <Check size={11} color="#22c55e" style={{ marginTop: 2, flexShrink: 0 }} /> {f}
                  </li>
                ))}
              </ul>

              {!isCurrent && (
                <a href="mailto:support@schoolcloudx.com" style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px', background: 'rgba(4,41,84,0.25)', border: '1px solid rgba(4,41,84,0.4)', borderRadius: 8, color: '#fabf22', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
                  Upgrade karo <ArrowRight size={12} />
                </a>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* â”€â”€ Tab: History â”€â”€ */
function TabHistory({ plan, fmtDate }) {
  const history = plan?.history || []
  const TYPE_LABELS = { TRIAL_START: 'Trial Start', PLAN_PURCHASE: 'Plan Purchase', PLAN_UPGRADE: 'Plan Upgrade', RENEWAL: 'Renewal', ADDON_PURCHASE: 'Add-on' }

  if (!history.length) return (
    <div className="glass-card" style={{ padding: 32, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
      <BarChart2 size={36} style={{ margin: '0 auto 10px', opacity: 0.3 }} />
      <p>No billing history found</p>
    </div>
  )

  return (
    <div className="glass-card" style={{ padding: 4, overflow: 'hidden' }}>
      {history.map((h, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: i < history.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(4,41,84,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CreditCard size={16} color="#818cf8" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{h.name}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{TYPE_LABELS[h.type] || h.type} Â· {fmtDate(h.createdAt)}</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: h.price === 0 ? '#4ade80' : '#fff' }}>{h.price === 0 ? 'FREE' : `â‚¹${Number(h.price).toLocaleString('en-IN')}`}</div>
            {h.endDate && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>Till {fmtDate(h.endDate)}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

/* â”€â”€ Tab: Security (Set Password) â”€â”€ */
function TabSecurity({ token, sc }) {
  const [password, setPassword]   = useState('')
  const [confirm, setConfirm]     = useState('')
  const [showPass, setShowPass]   = useState(false)
  const [loading, setLoading]     = useState(false)
  const [done, setDone]           = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    if (password !== confirm) { toast.error('Passwords do not match'); return }
    setLoading(true)
    try {
      await axios.post(`${API}portal/set-password`, { password }, { headers: { Authorization: `Bearer ${token}` } })
      toast.success('Password set ho gaya!')
      setDone(true); setPassword(''); setConfirm('')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card" style={{ padding: 28, maxWidth: 420 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <Lock size={18} color="#818cf8" />
        <div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Portal Password</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Set a password to log in without OTP</div>
        </div>
      </div>

      {done && <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80', fontSize: 13, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}><Check size={14} /> Password set successfully!</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 14 }}>
          <label className="form-label">New Password</label>
          <div className="input-group">
            <div className="input-icon"><Lock size={14} /></div>
            <input className="dark-input" type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" required />
            <button type="button" onClick={() => setShowPass(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 12px', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center' }}>
              {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label className="form-label">Confirm Password</label>
          <div className="input-group">
            <div className="input-icon"><Lock size={14} /></div>
            <input className="dark-input" type={showPass ? 'text' : 'password'} value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Confirm password" required />
          </div>
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? <><div className="spinner" /> Saving...</> : <><Lock size={15} /> Set Password</>}
        </button>
      </form>
    </div>
  )
}

/* â”€â”€ Shared helper â”€â”€ */
function StatItem({ icon: Icon, label, value, highlight = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: `1px solid ${highlight ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.06)'}` }}>
      <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={14} color={highlight ? '#f87171' : 'rgba(255,255,255,0.5)'} />
      </div>
      <div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 13, color: highlight ? '#f87171' : 'rgba(255,255,255,0.85)', fontWeight: 600, marginTop: 1 }}>{value}</div>
      </div>
    </div>
  )
}

