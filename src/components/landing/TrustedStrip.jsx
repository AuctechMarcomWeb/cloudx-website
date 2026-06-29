import {
  GraduationCap, ClipboardCheck, Banknote, FileText,
  CalendarDays, Smartphone, MessageCircle, Bus,
  Building2, ShieldCheck, Zap, Gift,
} from 'lucide-react'

const HIGHLIGHTS = [
  { icon: GraduationCap,  text: 'Student Management',    color: '#0040a0' },
  { icon: ClipboardCheck, text: 'Attendance Tracking',   color: '#0ea5e9' },
  { icon: Banknote,       text: 'Fee Management',        color: '#e0c000' },
  { icon: FileText,       text: 'Exam & Results',        color: '#002f80' },
  { icon: CalendarDays,   text: 'Timetable Management',  color: '#0040a0' },
  { icon: Smartphone,     text: 'Parent Mobile App',     color: '#0ea5e9' },
  { icon: MessageCircle,  text: 'Chat Module',           color: '#002f80' },
  { icon: Bus,            text: 'Transportation Module', color: '#e0c000' },
  { icon: Building2,      text: 'Multi-School Support',  color: '#0040a0' },
  { icon: ShieldCheck,    text: 'Secure & Encrypted',    color: '#0ea5e9' },
  { icon: Zap,            text: '10-Min Setup',          color: '#002f80' },
  { icon: Gift,           text: '30-Day Free Trial',     color: '#e0c000' },
]

export default function TrustedStrip() {
  const doubled = [...HIGHLIGHTS, ...HIGHLIGHTS]

  return (
    <section style={{ background: '#fff', padding: '18px 0', overflow: 'hidden', borderBottom: '1px solid #e8f0fc', borderTop: '1px solid #e8f0fc' }}>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Fade edges */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 60, zIndex: 2, background: 'linear-gradient(to right, #fff, transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 60, zIndex: 2, background: 'linear-gradient(to left, #fff, transparent)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', gap: 12, animation: 'stripScroll 36s linear infinite', width: 'max-content', padding: '4px 0' }}>
          {doubled.map((h, i) => {
            const Icon = h.icon
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#f8fafe', border: '1.5px solid #e8f0fc',
                borderRadius: 999, padding: '8px 18px',
                flexShrink: 0, whiteSpace: 'nowrap',
              }}>
                <Icon size={15} color={h.color} strokeWidth={2} />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{h.text}</span>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @keyframes stripScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
