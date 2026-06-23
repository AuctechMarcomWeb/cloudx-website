import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle, Mail, ExternalLink, Copy, Check,
  Rocket, BookOpen, Users, BarChart2, ShieldCheck, MessageCircle,
  Zap, CalendarDays,
} from 'lucide-react'
import toast from 'react-hot-toast'

const NEXT_STEPS = [
  { icon: Users,     title: 'Add Students',   desc: 'Onboard students via bulk import or manual entry.'     },
  { icon: BookOpen,  title: 'Set Up Classes',  desc: 'Configure classes, sections and subjects.'            },
  { icon: BarChart2, title: 'Add Staff',       desc: 'Create accounts for teachers and administrative staff.' },
  { icon: Rocket,    title: 'Go Live!',        desc: 'Share the app link with parents and get started.'     },
]

export default function StepSuccess({ data }) {
  const navigate = useNavigate()
  const [copied, setCopied]     = useState('')
  const [confetti, setConfetti] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setConfetti(false), 4000)
    return () => clearTimeout(t)
  }, [])

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key)
      toast.success('Copied!')
      setTimeout(() => setCopied(''), 2000)
    })
  }

  const subdomain      = data?.subdomain || ''
  const loginUrl       = data?.loginUrl  || `https://${subdomain}.schoolcloudx.com`
  const loginPageUrl   = `${loginUrl}/login`
  const superAdminId   = data?.credentials?.superAdmin?.userId   || '—'
  const superAdminPass = data?.credentials?.superAdmin?.password || '(sent via email)'
  const adminId        = data?.credentials?.admin?.userId        || '—'
  const adminPass      = data?.credentials?.admin?.password      || '(sent via email)'
  const schoolName     = data?.schoolName  || 'Your School'
  const schoolEmail    = data?.schoolEmail || '—'

  /* ── Trial info ── */
  const trial       = data?.trial
  const trialEndsOn = trial?.endsOn ? new Date(trial.endsOn) : null
  const fmtDate     = (d) => d
    ? d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    : '—'

  return (
    <div style={{ position: 'relative' }}>

      {/* Confetti */}
      {confetti && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 999, overflow: 'hidden' }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute', top: '-10px',
              left: `${Math.random() * 100}%`,
              width: `${6 + Math.random() * 8}px`, height: `${6 + Math.random() * 8}px`,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              background: ['#042954', '#fabf22', '#22c55e', '#f59e0b', '#ec4899', '#06b6d4'][Math.floor(Math.random() * 6)],
              animation: `confettiFall ${1.5 + Math.random() * 2}s ease ${Math.random()}s forwards`,
            }} />
          ))}
        </div>
      )}

      {/* Success Header */}
      <div style={{ textAlign: 'center', marginBottom: 28, animation: 'fadeInUp 0.5s ease both' }}>
        <div style={{
          width: 88, height: 88, borderRadius: '50%', margin: '0 auto 20px',
          background: 'linear-gradient(135deg,#22c55e,#16a34a)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 50px rgba(34,197,94,0.4)',
        }}>
          <CheckCircle size={44} color="#fff" />
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 10, color: '#fff' }}>
          🎉 School Created Successfully!
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.6 }}>
          <strong style={{ color: '#fabf22' }}>{schoolName}</strong> is now live on School CloudX.
          <br />
          <span style={{ fontSize: 14 }}>Your login credentials have been sent to your email.</span>
        </p>
      </div>

      {/* 30-Day Free Trial Banner */}
      {trial?.active && (
        <div className="glass-card" style={{
          padding: '16px 20px', marginBottom: 20,
          border: '1px solid rgba(96,165,250,0.3)',
          background: 'linear-gradient(135deg, rgba(4,41,84,0.35) 0%, rgba(59,130,246,0.08) 100%)',
          animation: 'fadeInUp 0.5s ease 0.12s both',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10, flexShrink: 0,
              background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 16px rgba(59,130,246,0.3)',
            }}>
              <Zap size={17} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>
                🎁 {trial.days || 30}-Day Free Trial Activated!
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 1 }}>
                {trial.planName || 'Free Trial'} — No payment required
              </div>
            </div>
            <div style={{
              marginLeft: 'auto', fontSize: 11, fontWeight: 700,
              padding: '3px 10px', borderRadius: 20,
              background: 'rgba(96,165,250,0.15)',
              color: '#60a5fa', border: '1px solid rgba(96,165,250,0.25)',
              whiteSpace: 'nowrap',
            }}>
              FREE
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 12px', borderRadius: 8,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <CalendarDays size={13} color="#60a5fa" />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                Trial ends: <strong style={{ color: '#fff' }}>{fmtDate(trialEndsOn)}</strong>
              </span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 12px', borderRadius: 8,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <Users size={13} color="#60a5fa" />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                {trial.studentLimit > 0
                  ? <><strong style={{ color: '#fff' }}>{trial.studentLimit.toLocaleString('en-IN')}</strong> student limit</>
                  : <strong style={{ color: '#4ade80' }}>Unlimited students</strong>
                }
              </span>
            </div>
          </div>

          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 10, lineHeight: 1.5 }}>
            Trial expire hone ke baad admin se plan assign karwayein. Aapka data safe rahega.
          </p>
        </div>
      )}

      {/* Delivery Confirmation */}
      <div className="glass-card" style={{
        padding: '14px 20px', marginBottom: 20,
        border: '1px solid rgba(34,197,94,0.2)',
        background: 'rgba(34,197,94,0.04)',
        display: 'flex', alignItems: 'center', gap: 16,
        animation: 'fadeInUp 0.5s ease 0.1s both',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#4ade80' }}>
          <Mail size={15} /> Credentials sent via email
        </div>
        <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#4ade80' }}>
          <MessageCircle size={15} /> Sent via WhatsApp
        </div>
      </div>

      {/* Credentials Card */}
      <div className="glass-card" style={{
        padding: 24, marginBottom: 20,
        border: '1px solid rgba(250,191,34,0.2)',
        background: 'rgba(250,191,34,0.03)',
        animation: 'fadeInUp 0.5s ease 0.15s both',
      }}>
        <div style={{
          fontSize: 12, fontWeight: 600, color: '#fabf22',
          letterSpacing: 1, textTransform: 'uppercase',
          marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <ShieldCheck size={13} /> Login Credentials
        </div>

        {[
          { label: 'Portal URL',       value: loginPageUrl,  key: 'url'  },
          { label: 'Super Admin ID',   value: superAdminId,  key: 'said' },
          { label: 'Super Admin Pass', value: superAdminPass,key: 'sap'  },
          { label: 'Admin ID',         value: adminId,       key: 'aid'  },
          { label: 'Admin Pass',       value: adminPass,     key: 'ap'   },
        ].map(({ label, value, key }) => (
          <div key={label} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', minWidth: 130 }}>{label}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, maxWidth: '60%' }}>
              <span style={{
                fontSize: 13, fontWeight: 500, wordBreak: 'break-all', textAlign: 'right',
                color: key === 'url' ? '#fabf22' : 'rgba(255,255,255,0.85)',
                fontFamily: key !== 'url' ? 'monospace' : 'inherit',
              }}>
                {value}
              </span>
              <button onClick={() => copyText(value, key)} style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 4, flexShrink: 0,
                color: copied === key ? '#22c55e' : 'rgba(255,255,255,0.3)', transition: 'color 0.2s',
              }}>
                {copied === key ? <Check size={13} /> : <Copy size={13} />}
              </button>
            </div>
          </div>
        ))}

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}>
          <ShieldCheck size={12} color="#fabf22" />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
            Please change your password after the first login.
          </span>
        </div>
      </div>

      {/* Open Portal Button */}
      <a
        href={loginPageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          textDecoration: 'none', marginBottom: 12,
          animation: 'fadeInUp 0.5s ease 0.2s both',
        }}
      >
        <Rocket size={18} /> Open School Portal <ExternalLink size={14} style={{ opacity: 0.7 }} />
      </a>

      {/* Next Steps */}
      <div className="glass-card" style={{ padding: 24, marginBottom: 20, animation: 'fadeInUp 0.5s ease 0.25s both' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>
          What's Next
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          {NEXT_STEPS.map(({ icon: Icon, title, desc }) => (
            <div key={title} style={{
              display: 'flex', gap: 10, padding: '10px 12px', borderRadius: 10,
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(4,41,84,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={15} color="#fabf22" />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2, color: '#fff' }}>{title}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="btn-ghost" onClick={() => navigate('/')} style={{ animation: 'fadeInUp 0.5s ease 0.3s both' }}>
        ← Back to Home
      </button>

      <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
        Need help?{' '}
        <a href="mailto:support@schoolcloudx.com" style={{ color: '#fabf22', textDecoration: 'none' }}>
          support@schoolcloudx.com
        </a>
      </p>
    </div>
  )
}
