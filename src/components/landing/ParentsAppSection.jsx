import { useState } from 'react'
import { Home, BookOpen, Settings, GraduationCap } from 'lucide-react'
import appImage from '../../assets/ourApp.png'

/* ─── Feature list ─── */
const FEATURES = [
  {
    icon: Home,
    title: 'Attractive Home',
    desc: 'Keep up-to-date with the latest announcements and subject information right from our homepage.',
  },
  {
    icon: BookOpen,
    title: 'Subject Lessons and Assignments',
    desc: 'Access subject-specific lessons and assignments, track submissions, and stay organized all in one place.',
  },
  {
    icon: Settings,
    title: 'Centralized School Operations',
    desc: 'Access all essential school management tools in one convenient menu section.',
  },
  {
    icon: GraduationCap,
    title: 'Elective Subject',
    desc: "Simplify elective subject selection for students with our app's intuitive profile creation feature.",
  },
]

/* ─── Main Section ─── */
export default function ParentsAppSection() {
  const [active, setActive] = useState(0)

  return (
    <section style={{ padding: '80px 0', background: '#f8fffe', overflow: 'hidden' }}>
      <div className="container">

        {/* Top label */}
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <span style={{
            fontSize: 15,
            fontWeight: 700,
            color: '#1bbc9b',
            letterSpacing: 0.2,
            fontFamily: 'Nunito, sans-serif',
          }}>
            Parents/Students App
          </span>
        </div>

        {/* Heading */}
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(22px, 3vw, 32px)',
          fontWeight: 800,
          color: '#1a1a2e',
          maxWidth: 640,
          margin: '0 auto 14px',
          lineHeight: 1.35,
          fontFamily: 'Nunito, sans-serif',
        }}>
          Bridge the gap between home and school, creating a collaborative learning environment that supports growth and success
        </h2>

        {/* Divider */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 56 }}>
          <div style={{ width: 200, height: 3, background: 'linear-gradient(90deg, #1bbc9b, transparent)', borderRadius: 4 }} />
        </div>

        {/* Content row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(32px, 6vw, 72px)',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>

          {/* ── Left: App Image ── */}
          <div style={{
            position: 'relative',
            flexShrink: 0,
            borderRadius: 32,
            background: 'linear-gradient(135deg, #e8faf6 0%, #d1f5ee 60%, #b6ede3 100%)',
            padding: '24px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img
              src={appImage}
              alt="Parents and Students App Screenshots"
              style={{
                width: '100%',
                maxWidth: 420,
                height: 'auto',
                display: 'block',
                borderRadius: 16,
                filter: 'drop-shadow(0 20px 48px rgba(0,0,0,0.15))',
              }}
            />
          </div>

          {/* ── Right: Feature list ── */}
          <div style={{ flex: 1, minWidth: 280, maxWidth: 480 }}>
            {FEATURES.map((f, i) => {
              const Icon = f.icon
              const isActive = active === i
              return (
                <div
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 16,
                    padding: '16px 20px',
                    marginBottom: 8,
                    borderRadius: 14,
                    cursor: 'pointer',
                    border: isActive ? '1.5px solid rgba(27,188,155,0.3)' : '1.5px solid transparent',
                    background: isActive
                      ? 'linear-gradient(135deg, #e8faf6 0%, #f0fdf9 100%)'
                      : 'transparent',
                    borderLeft: isActive ? '4px solid #1bbc9b' : '4px solid transparent',
                    transition: 'all 0.22s ease',
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: isActive ? '#1bbc9b' : '#e8faf6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.22s ease',
                    boxShadow: isActive ? '0 4px 12px rgba(27,188,155,0.35)' : 'none',
                  }}>
                    <Icon size={18} color={isActive ? '#fff' : '#1bbc9b'} strokeWidth={2} />
                  </div>

                  {/* Text */}
                  <div>
                    <div style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: isActive ? '#1a1a2e' : '#374151',
                      marginBottom: 4,
                      fontFamily: 'Nunito, sans-serif',
                    }}>
                      {f.title}
                    </div>
                    <div style={{
                      fontSize: 13.5,
                      color: isActive ? '#4a5568' : '#94a3b8',
                      lineHeight: 1.6,
                      transition: 'color 0.22s',
                    }}>
                      {f.desc}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
