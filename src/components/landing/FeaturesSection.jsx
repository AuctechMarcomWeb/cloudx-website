import { Users, CreditCard, BookOpen, Bus, Bell, BarChart2, FileText, Shield, GraduationCap, Calendar, ClipboardList, Home, Settings } from 'lucide-react'
import superAdminImg   from '../../assets/HxCMMWD6ttfGHPpTS4EzpysImSjyF4c8d1GLbQ12.png'
import studentImg      from '../../assets/StudentImage.png'
import schoolAdminImg  from '../../assets/682c33c666a931.887378031747727302.png'
import teacherImg      from '../../assets/qFMqcY4MZ7kTMZ0fRigMJkhlhDFiOcCg9v3qosVw.png'
import staffAppImg     from '../../assets/mobile phone.png'
import parentsAppImg   from '../../assets/ourApp.png'
import schoolLogoImg   from '../../assets/6561c20cbfb617.710131971700905484.jpg'

const SCHOOL_LIST = [
  { name: 'Maple Grove High School', logo: schoolLogoImg },
  { name: 'Crestwood Academy',       logo: schoolLogoImg },
  { name: 'Vidhiya School',          logo: schoolLogoImg },
]

/* ─────────────────────────────────────────────
   Exact phone mockup with real app-like UI
   Matches the screenshot style exactly
───────────────────────────────────────────── */
function PhoneMockup({ children, tilt = false }) {
  return (
    <div style={{
      width: 158,
      background: '#1a1a2e',
      borderRadius: 32,
      padding: '8px 8px 12px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
      transform: tilt ? 'translateY(24px)' : 'none',
      flexShrink: 0,
      position: 'relative',
    }}>
      {/* Notch */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'6px 12px 4px', marginBottom: 2 }}>
        <span style={{ fontSize:7, color:'rgba(255,255,255,0.6)', fontWeight:700 }}>9:41</span>
        <div style={{ width:40, height:8, borderRadius:20, background:'rgba(255,255,255,0.15)' }} />
        <span style={{ fontSize:7, color:'rgba(255,255,255,0.6)' }}>●●●</span>
      </div>
      {/* Screen */}
      <div style={{ borderRadius:22, overflow:'hidden', background:'#fff', minHeight:340 }}>
        {children}
      </div>
      {/* Home bar */}
      <div style={{ display:'flex', justifyContent:'center', paddingTop:8 }}>
        <div style={{ width:50, height:4, borderRadius:3, background:'rgba(255,255,255,0.25)' }} />
      </div>
    </div>
  )
}

/* ── Super Admin screens ── */
function SuperAdminScreen1() {
  return (
    <>
      <div style={{ background:'linear-gradient(135deg,#0040a0,#0ea5e9)', padding:'10px 12px 8px', display:'flex', alignItems:'center', gap:8 }}>
        <div style={{ width:28,height:28,borderRadius:8,background:'rgba(255,255,255,0.25)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:800,color:'#fff' }}>SA</div>
        <div>
          <div style={{ fontSize:8,color:'#fff',fontWeight:800 }}>Super Admin</div>
          <div style={{ fontSize:6.5,color:'rgba(255,255,255,0.8)' }}>Dashboard</div>
        </div>
      </div>
      <div style={{ padding:'8px', background:'#f8fffe' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:5, marginBottom:8 }}>
          {[{l:'Schools',v:'127',c:'#0040a0'},{l:'Students',v:'1.2L',c:'#0ea5e9'},{l:'Teachers',v:'8.9K',c:'#8b5cf6'},{l:'Revenue',v:'$48k',c:'#f59e0b'}].map((s,i)=>(
            <div key={i} style={{ background:s.c+'15',borderRadius:8,padding:'7px 8px',textAlign:'center' }}>
              <div style={{ fontSize:11,fontWeight:900,color:s.c,fontFamily:"'Lato', sans-serif" }}>{s.v}</div>
              <div style={{ fontSize:6,color:'#64748b',marginTop:1 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize:7,fontWeight:700,color:'#374151',marginBottom:5 }}>Schools</div>
        {[{n:'Maple Grove',c:'#0040a0'},{n:'Crestwood',c:'#0ea5e9'},{n:'Vidhiya School',c:'#8b5cf6'}].map((s,i)=>(
          <div key={i} style={{ display:'flex',alignItems:'center',gap:7,padding:'5px 6px',marginBottom:4,background:'#fff',borderRadius:7,border:'1px solid #f0fdf9' }}>
            <div style={{ width:22,height:22,borderRadius:6,background:s.c,display:'flex',alignItems:'center',justifyContent:'center',fontSize:8,fontWeight:800,color:'#fff',flexShrink:0 }}>{s.n[0]}</div>
            <div style={{ flex:1,fontSize:7,fontWeight:700,color:'#1a1a2e' }}>{s.n}</div>
            <div style={{ fontSize:6,background:'#e8f0fc',color:'#0040a0',borderRadius:4,padding:'1px 5px',fontWeight:700 }}>Active</div>
          </div>
        ))}
      </div>
      <div style={{ background:'#f1f5f9',padding:'6px 0',display:'flex',justifyContent:'space-around' }}>
        {['⊞','🏫','💰','⚙️'].map((ic,i)=><span key={i} style={{ fontSize:12 }}>{ic}</span>)}
      </div>
    </>
  )
}
function SuperAdminScreen2() {
  return (
    <>
      <div style={{ background:'#0040a0',padding:'10px 12px 8px' }}>
        <div style={{ fontSize:8,color:'#fff',fontWeight:800 }}>Packages</div>
        <div style={{ fontSize:6.5,color:'rgba(255,255,255,0.85)' }}>Manage Plans</div>
      </div>
      <div style={{ padding:'8px' }}>
        {[{n:'Basic',p:'$0.02/student',c:'#0040a0',pop:false},{n:'Standard',p:'$1.00/student',c:'#0ea5e9',pop:false},{n:'Pro',p:'$99 package',c:'#8b5cf6',pop:true}].map((pl,i)=>(
          <div key={i} style={{ background:pl.pop?pl.c:'#f8fffe',borderRadius:10,padding:'8px 10px',marginBottom:6,border:`1.5px solid ${pl.pop?pl.c:pl.c+'30'}` }}>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
              <span style={{ fontSize:8,fontWeight:800,color:pl.pop?'#fff':'#1a1a2e',fontFamily:"'Lato', sans-serif" }}>{pl.n}</span>
              {pl.pop && <span style={{ fontSize:6,background:'rgba(255,255,255,0.25)',color:'#fff',borderRadius:4,padding:'1px 5px',fontWeight:700 }}>Popular</span>}
            </div>
            <div style={{ fontSize:7,color:pl.pop?'rgba(255,255,255,0.85)':pl.c,marginTop:2,fontWeight:600 }}>{pl.p}</div>
          </div>
        ))}
        <div style={{ background:'linear-gradient(135deg,#0040a0,#0ea5e9)',borderRadius:9,padding:'8px',textAlign:'center',marginTop:4 }}>
          <span style={{ fontSize:7.5,color:'#fff',fontWeight:800 }}>Add-Ons Available</span>
        </div>
      </div>
    </>
  )
}

/* ── School Admin screens ── */
function SchoolAdminScreen1() {
  return (
    <>
      <div style={{ background:'linear-gradient(135deg,#0040a0,#0ea5e9)',padding:'10px 12px 8px',display:'flex',alignItems:'center',gap:8 }}>
        <div style={{ width:28,height:28,borderRadius:8,background:'rgba(255,255,255,0.25)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:800,color:'#fff' }}>MA</div>
        <div><div style={{ fontSize:8,color:'#fff',fontWeight:800 }}>Maple Grove</div><div style={{ fontSize:6.5,color:'rgba(255,255,255,0.8)' }}>Admin Dashboard</div></div>
      </div>
      <div style={{ padding:'8px',background:'#f8fffe' }}>
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:5,marginBottom:8 }}>
          {[{l:'Students',v:'2,847',c:'#0040a0'},{l:'Teachers',v:'184',c:'#0ea5e9'},{l:'Classes',v:'56',c:'#8b5cf6'},{l:'Fees Due',v:'$12k',c:'#f59e0b'}].map((s,i)=>(
            <div key={i} style={{ background:s.c+'15',borderRadius:8,padding:'6px',textAlign:'center' }}>
              <div style={{ fontSize:10,fontWeight:900,color:s.c,fontFamily:"'Lato', sans-serif" }}>{s.v}</div>
              <div style={{ fontSize:5.5,color:'#64748b',marginTop:1 }}>{s.l}</div>
            </div>
          ))}
        </div>
        {['Admission Form','Fee Collection','Exam Schedule','Staff Leave','Timetable'].map((m,i)=>(
          <div key={i} style={{ background:'#fff',borderRadius:7,padding:'6px 9px',marginBottom:4,display:'flex',alignItems:'center',justifyContent:'space-between',border:'1px solid #e8f0fc' }}>
            <span style={{ fontSize:7,fontWeight:700,color:'#374151' }}>{m}</span>
            <span style={{ fontSize:9,color:'#0040a0' }}>›</span>
          </div>
        ))}
      </div>
    </>
  )
}
function SchoolAdminScreen2() {
  return (
    <>
      <div style={{ background:'#0040a0',padding:'10px 12px 8px' }}>
        <div style={{ fontSize:8,color:'#fff',fontWeight:800 }}>Students</div>
        <div style={{ fontSize:6.5,color:'rgba(255,255,255,0.8)' }}>Class X-A · 42 students</div>
      </div>
      <div style={{ padding:'8px' }}>
        {[{n:'Riya Sharma',r:'Roll 01',c:'#0040a0'},{n:'Arjun Patel',r:'Roll 02',c:'#0ea5e9'},{n:'Priya Mehta',r:'Roll 03',c:'#8b5cf6'},{n:'Rahul Kumar',r:'Roll 04',c:'#f59e0b'},{n:'Sneha T.',r:'Roll 05',c:'#ec4899'}].map((st,i)=>(
          <div key={i} style={{ display:'flex',alignItems:'center',gap:7,padding:'5px 2px',borderBottom:'1px solid #f0fdf9' }}>
            <div style={{ width:24,height:24,borderRadius:7,background:st.c,display:'flex',alignItems:'center',justifyContent:'center',fontSize:8,fontWeight:800,color:'#fff',flexShrink:0 }}>{st.n[0]}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:7.5,fontWeight:800,color:'#1a1a2e' }}>{st.n}</div>
              <div style={{ fontSize:6,color:'#94a3b8' }}>{st.r}</div>
            </div>
            <span style={{ fontSize:6,background:'#e8f0fc',color:'#0040a0',borderRadius:4,padding:'1px 5px',fontWeight:700 }}>Active</span>
          </div>
        ))}
      </div>
    </>
  )
}

/* ── Teacher screens ── */
function TeacherScreen1() {
  return (
    <>
      <div style={{ background:'linear-gradient(135deg,#8b5cf6,#0040a0)',padding:'10px 12px 8px' }}>
        <div style={{ fontSize:8,color:'#fff',fontWeight:800 }}>Teacher Panel</div>
        <div style={{ fontSize:6.5,color:'rgba(255,255,255,0.8)' }}>Mrs. Sharma · Maths</div>
      </div>
      <div style={{ padding:'8px',background:'#f8fffe' }}>
        <div style={{ fontSize:7,fontWeight:700,color:'#374151',marginBottom:6 }}>Today's Timetable</div>
        {[{s:'Class X-A',t:'09:00',sub:'Maths',c:'#0040a0'},{s:'Class IX-B',t:'11:00',sub:'Algebra',c:'#0ea5e9'},{s:'Class VIII',t:'02:00',sub:'Geometry',c:'#8b5cf6'}].map((c,i)=>(
          <div key={i} style={{ background:'#fff',borderRadius:8,padding:'7px 8px',marginBottom:5,border:`1.5px solid ${c.c}22`,display:'flex',alignItems:'center',gap:8 }}>
            <div style={{ width:3,height:34,background:c.c,borderRadius:3,flexShrink:0 }} />
            <div style={{ flex:1 }}>
              <div style={{ fontSize:7.5,fontWeight:800,color:'#1a1a2e' }}>{c.s}</div>
              <div style={{ fontSize:6.5,color:c.c,fontWeight:600 }}>{c.sub}</div>
            </div>
            <div style={{ fontSize:6.5,color:'#94a3b8',background:'#f0fdf9',padding:'2px 6px',borderRadius:4,fontWeight:600 }}>{c.t}</div>
          </div>
        ))}
        <div style={{ background:'#e8f0fc',borderRadius:9,padding:'8px',textAlign:'center',marginTop:6,border:'1.5px solid rgba(0,64,160,0.25)' }}>
          <div style={{ fontSize:7.5,fontWeight:800,color:'#0040a0' }}>✅ Mark Attendance</div>
          <div style={{ fontSize:6,color:'#64748b',marginTop:1 }}>Class X-A · 42 students</div>
        </div>
      </div>
    </>
  )
}
function TeacherScreen2() {
  return (
    <>
      <div style={{ background:'#0ea5e9',padding:'10px 12px 8px' }}>
        <div style={{ fontSize:8,color:'#fff',fontWeight:800 }}>Assignments</div>
        <div style={{ fontSize:6.5,color:'rgba(255,255,255,0.85)' }}>Class X-A · Maths</div>
      </div>
      <div style={{ padding:'8px' }}>
        {[{n:'Chapter 5 Integration',d:'Due: 28 Jun',s:'12/42',c:'#f59e0b'},{n:'Practice Set 3',d:'Due: 30 Jun',s:'35/42',c:'#0040a0'},{n:'Model Paper 2025',d:'Due: 05 Jul',s:'5/42',c:'#ef4444'}].map((a,i)=>(
          <div key={i} style={{ background:'#f8fffe',borderRadius:9,padding:'7px 9px',marginBottom:6,border:`1.5px solid ${a.c}22` }}>
            <div style={{ fontSize:7.5,fontWeight:800,color:'#1a1a2e',marginBottom:3 }}>{a.n}</div>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
              <span style={{ fontSize:6,color:'#94a3b8' }}>{a.d}</span>
              <span style={{ fontSize:6.5,color:a.c,fontWeight:700,background:a.c+'18',padding:'1px 6px',borderRadius:4 }}>{a.s}</span>
            </div>
          </div>
        ))}
        <div style={{ background:'linear-gradient(135deg,#0ea5e9,#0040a0)',borderRadius:9,padding:'8px',textAlign:'center',marginTop:2 }}>
          <span style={{ fontSize:7.5,color:'#fff',fontWeight:800 }}>+ Create Assignment</span>
        </div>
      </div>
    </>
  )
}

/* ── Parents/Students App screens — exact screenshot match ── */
function ParentsScreen1() {
  return (
    <>
      <div style={{ background:'#0040a0',padding:'8px 10px',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
        <div style={{ display:'flex',alignItems:'center',gap:7 }}>
          <div style={{ width:26,height:26,borderRadius:'50%',background:'rgba(255,255,255,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,overflow:'hidden',border:'2px solid rgba(255,255,255,0.5)' }}>😊</div>
          <div>
            <div style={{ fontSize:7.5,color:'#fff',fontWeight:800 }}>Divy Jani</div>
            <div style={{ fontSize:6,color:'rgba(255,255,255,0.8)' }}>Class 1-A · Roll No. 5</div>
          </div>
        </div>
        <span style={{ fontSize:14 }}>🔔</span>
      </div>
      {/* Christmas banner */}
      <div style={{ background:'linear-gradient(135deg,#0d8f75,#0040a0)',margin:'6px',borderRadius:10,padding:'8px 10px',display:'flex',alignItems:'center',gap:8 }}>
        <span style={{ fontSize:20 }}>🎄</span>
        <div>
          <div style={{ fontSize:7.5,color:'#fff',fontWeight:800 }}>Merry Christmas</div>
          <div style={{ fontSize:6,color:'rgba(255,255,255,0.8)',marginTop:1 }}>25 December is a holiday<br/>In tomorrow and holiday</div>
        </div>
      </div>
      <div style={{ padding:'4px 8px 6px' }}>
        <div style={{ fontSize:7,fontWeight:800,color:'#1a1a2e',marginBottom:6 }}>My Subjects</div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:5 }}>
          {[{s:'Maths\n(Practice)',ic:'📐',c:'#3b82f6'},{s:'Science\n(Practice)',ic:'🔬',c:'#0040a0'},{s:'English',ic:'📖',c:'#f59e0b'},{s:'History',ic:'🏛️',c:'#8b5cf6'},{s:'Computer',ic:'💻',c:'#0ea5e9'},{s:'Art',ic:'🎨',c:'#ec4899'}].map((sub,i)=>(
            <div key={i} style={{ background:'#f8fffe',borderRadius:8,padding:'6px 4px',textAlign:'center',border:`1px solid ${sub.c}20` }}>
              <div style={{ fontSize:16 }}>{sub.ic}</div>
              <div style={{ fontSize:5.5,fontWeight:700,color:'#374151',marginTop:2,lineHeight:1.3 }}>{sub.s}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background:'#f8fffe',borderTop:'1px solid #e8f0fc',padding:'6px 0',display:'flex',justifyContent:'space-around',marginTop:4 }}>
        {['🏠','📚','📅','☰'].map((ic,i)=>(
          <div key={i} style={{ textAlign:'center' }}>
            <div style={{ fontSize:13 }}>{ic}</div>
            {i===0 && <div style={{ width:16,height:2,background:'#0040a0',borderRadius:2,margin:'2px auto 0' }} />}
          </div>
        ))}
      </div>
    </>
  )
}

function ParentsScreen2() {
  return (
    <>
      <div style={{ background:'#0040a0',padding:'8px 10px',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
        <div style={{ display:'flex',alignItems:'center',gap:7 }}>
          <div style={{ width:26,height:26,borderRadius:'50%',background:'rgba(255,255,255,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,border:'2px solid rgba(255,255,255,0.5)' }}>👨</div>
          <div>
            <div style={{ fontSize:7.5,color:'#fff',fontWeight:800 }}>John Doe</div>
            <div style={{ fontSize:6,color:'rgba(255,255,255,0.8)' }}>parent@gmail.com</div>
          </div>
        </div>
        <span style={{ fontSize:14 }}>🔔</span>
      </div>
      {/* School image */}
      <div style={{ height:58,background:'linear-gradient(135deg,#0ea5e9,#0040a0)',margin:'6px',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',inset:0,backgroundImage:'repeating-linear-gradient(45deg,rgba(255,255,255,0.04) 0,rgba(255,255,255,0.04) 2px,transparent 2px,transparent 8px)' }} />
        <div style={{ textAlign:'center',zIndex:1 }}>
          <div style={{ fontSize:8,color:'#fff',fontWeight:800 }}>Where Learning</div>
          <div style={{ fontSize:7,color:'rgba(255,255,255,0.85)' }}>is an Adventure</div>
        </div>
      </div>
      <div style={{ padding:'2px 8px 4px' }}>
        <div style={{ fontSize:7,fontWeight:800,color:'#1a1a2e',marginBottom:5 }}>My Children</div>
        <div style={{ background:'#f0fdf9',borderRadius:9,padding:'7px 8px',border:'1.5px solid rgba(0,64,160,0.2)',display:'flex',alignItems:'center',gap:8,marginBottom:6 }}>
          <div style={{ width:28,height:28,borderRadius:'50%',background:'linear-gradient(135deg,#0040a0,#0ea5e9)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13 }}>👦</div>
          <div>
            <div style={{ fontSize:7.5,fontWeight:800,color:'#1a1a2e' }}>Divy Jani</div>
            <div style={{ fontSize:6,color:'#64748b' }}>Class 1-A · Roll No. 5</div>
          </div>
        </div>
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4 }}>
          <span style={{ fontSize:7,fontWeight:800,color:'#1a1a2e' }}>Latest notices</span>
          <span style={{ fontSize:6.5,color:'#0040a0',fontWeight:700 }}>View All</span>
        </div>
        {[{t:'Holiday',d:'Due to bad weather...',ic:'🏖️'},{t:'Exam Schedule',d:'Finals from 10 Jul',ic:'📝'}].map((n,i)=>(
          <div key={i} style={{ display:'flex',gap:6,padding:'4px 0',borderTop:'1px solid #f0fdf9',alignItems:'flex-start' }}>
            <span style={{ fontSize:13 }}>{n.ic}</span>
            <div>
              <div style={{ fontSize:7,fontWeight:800,color:'#1a1a2e' }}>{n.t}</div>
              <div style={{ fontSize:6,color:'#94a3b8' }}>{n.d}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background:'#f8fffe',borderTop:'1px solid #e8f0fc',padding:'6px 0',display:'flex',justifyContent:'space-around' }}>
        {['🏠','👨‍👩‍👧','📚','☰'].map((ic,i)=><span key={i} style={{ fontSize:13 }}>{ic}</span>)}
      </div>
    </>
  )
}

/* ── Student screens ── */
function StudentScreen1() {
  return (
    <>
      <div style={{ background:'linear-gradient(135deg,#0040a0,#0ea5e9)',padding:'10px 12px 8px' }}>
        <div style={{ fontSize:8,color:'#fff',fontWeight:800 }}>My Subjects</div>
        <div style={{ fontSize:6.5,color:'rgba(255,255,255,0.8)' }}>Class X-A · Riya Sharma</div>
      </div>
      <div style={{ padding:'8px' }}>
        {[{s:'Mathematics',p:87,c:'#0040a0'},{s:'Science',p:92,c:'#0ea5e9'},{s:'English',p:78,c:'#8b5cf6'},{s:'History',p:85,c:'#f59e0b'}].map((sub,i)=>(
          <div key={i} style={{ background:'#f8fffe',borderRadius:8,padding:'6px 8px',marginBottom:5,border:'1px solid #e8f0fc' }}>
            <div style={{ display:'flex',justifyContent:'space-between',marginBottom:4 }}>
              <span style={{ fontSize:7.5,fontWeight:800,color:'#1a1a2e' }}>{sub.s}</span>
              <span style={{ fontSize:8,fontWeight:900,color:sub.c,fontFamily:"'Lato', sans-serif" }}>{sub.p}%</span>
            </div>
            <div style={{ background:'#e8f0fc',borderRadius:4,height:5,overflow:'hidden' }}>
              <div style={{ width:`${sub.p}%`,height:'100%',background:`linear-gradient(90deg,${sub.c},${sub.c}bb)`,borderRadius:4 }} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
function StudentScreen2() {
  return (
    <>
      <div style={{ background:'#8b5cf6',padding:'10px 12px 8px' }}>
        <div style={{ fontSize:8,color:'#fff',fontWeight:800 }}>Exam Results</div>
        <div style={{ fontSize:6.5,color:'rgba(255,255,255,0.85)' }}>Term 2 · 2024-25</div>
      </div>
      <div style={{ padding:'8px' }}>
        <div style={{ background:'linear-gradient(135deg,#e8f0fc,#ccdaf5)',borderRadius:10,padding:'10px',textAlign:'center',marginBottom:8,border:'1.5px solid rgba(0,64,160,0.2)' }}>
          <div style={{ fontSize:22,fontWeight:900,color:'#0040a0',fontFamily:"'Lato', sans-serif" }}>87.4%</div>
          <div style={{ fontSize:7,color:'#64748b',marginTop:2 }}>Overall Score · Grade A</div>
        </div>
        {[{s:'Maths',m:'92/100',c:'#0040a0'},{s:'Science',m:'88/100',c:'#0ea5e9'},{s:'English',m:'82/100',c:'#8b5cf6'},{s:'History',m:'85/100',c:'#f59e0b'}].map((r,i)=>(
          <div key={i} style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'5px 0',borderTop:'1px solid #f0fdf9' }}>
            <span style={{ fontSize:7.5,color:'#374151',fontWeight:700 }}>{r.s}</span>
            <span style={{ fontSize:7.5,color:r.c,fontWeight:800,background:r.c+'18',padding:'2px 8px',borderRadius:5,fontFamily:"'Lato', sans-serif" }}>{r.m}</span>
          </div>
        ))}
      </div>
    </>
  )
}

/* ── Teacher Staff screens ── */
function StaffScreen1() {
  return (
    <>
      <div style={{ background:'linear-gradient(135deg,#0ea5e9,#8b5cf6)',padding:'10px 12px 8px' }}>
        <div style={{ fontSize:8,color:'#fff',fontWeight:800 }}>Staff Dashboard</div>
        <div style={{ fontSize:6.5,color:'rgba(255,255,255,0.8)' }}>Mr. Raj · Science Dept.</div>
      </div>
      <div style={{ padding:'8px' }}>
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:5,marginBottom:8 }}>
          {[{l:'Classes Today',v:'4',c:'#0040a0'},{l:'Pending Leave',v:'2',c:'#f59e0b'},{l:'Assignments',v:'8',c:'#0ea5e9'},{l:'Notices',v:'3',c:'#8b5cf6'}].map((s,i)=>(
            <div key={i} style={{ background:s.c+'18',borderRadius:8,padding:'6px',textAlign:'center' }}>
              <div style={{ fontSize:13,fontWeight:900,color:s.c,fontFamily:"'Lato', sans-serif" }}>{s.v}</div>
              <div style={{ fontSize:5.5,color:'#64748b',marginTop:1,lineHeight:1.3 }}>{s.l}</div>
            </div>
          ))}
        </div>
        {[{t:'09:00',s:'Class X-A',sub:'Science',c:'#0040a0'},{t:'11:00',s:'Class IX-B',sub:'Biology',c:'#0ea5e9'},{t:'02:00',s:'Class XI-A',sub:'Physics',c:'#8b5cf6'}].map((c,i)=>(
          <div key={i} style={{ background:'#f0fdf9',borderRadius:7,padding:'5px 8px',marginBottom:4,display:'flex',alignItems:'center',gap:7,border:`1px solid ${c.c}22` }}>
            <span style={{ fontSize:6.5,color:c.c,fontWeight:800,minWidth:32 }}>{c.t}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:7.5,fontWeight:800,color:'#1a1a2e' }}>{c.s}</div>
              <div style={{ fontSize:6,color:'#64748b' }}>{c.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
function StaffScreen2() {
  return (
    <>
      <div style={{ background:'#0040a0',padding:'10px 12px 8px' }}>
        <div style={{ fontSize:8,color:'#fff',fontWeight:800 }}>Leave Management</div>
        <div style={{ fontSize:6.5,color:'rgba(255,255,255,0.85)' }}>Apply & Track</div>
      </div>
      <div style={{ padding:'8px' }}>
        {[{t:'Sick Leave',d:'12–13 Jun',s:'Approved',sc:'#0040a0'},{t:'Casual Leave',d:'20 Jun',s:'Pending',sc:'#f59e0b'},{t:'Emergency',d:'25 Jun',s:'Rejected',sc:'#ef4444'}].map((l,i)=>(
          <div key={i} style={{ background:'#f8fffe',borderRadius:9,padding:'7px 9px',marginBottom:6,border:`1.5px solid ${l.sc}22` }}>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:2 }}>
              <span style={{ fontSize:8,fontWeight:800,color:'#1a1a2e' }}>{l.t}</span>
              <span style={{ fontSize:6.5,fontWeight:700,color:l.sc,background:l.sc+'18',padding:'1px 6px',borderRadius:4 }}>{l.s}</span>
            </div>
            <div style={{ fontSize:6.5,color:'#94a3b8' }}>{l.d}</div>
          </div>
        ))}
        <div style={{ background:'linear-gradient(135deg,#0040a0,#0ea5e9)',borderRadius:9,padding:'8px',textAlign:'center',marginTop:4 }}>
          <span style={{ fontSize:8,color:'#fff',fontWeight:800 }}>+ Apply New Leave</span>
        </div>
      </div>
    </>
  )
}

/* ── Panel data ── */
const PANELS = [
  {
    id:'super-admin', label:'Super Admin Panel',
    heading:'Manage multiple schools or classes from a centralised administrative dashboard.',
    image: superAdminImg,
    screens:[<SuperAdminScreen1/>,<SuperAdminScreen2/>],
    features:[
      {icon:Users,      title:'Multiple School Management',       desc:'Create, delegate, and manage schools with ease. Simplify your administrative tasks with our intuitive platform.'},
      {icon:CreditCard, title:'Tailored Packages for Schools',    desc:"Design feature-wise packages for schools and classes. The options that best fit the institution's needs."},
      {icon:Settings,   title:'Add-Ons - Enhanced Functionality', desc:'Unlock additional features for your school with our customisable add-ons.'},
      {icon:Shield,     title:'Streamlined Staff Management',     desc:'Effortlessly assign permissions with role-based staff management. Organise and allocate responsibilities with ease.'},
      {icon:Home,       title:'Customize Website Settings',       desc:"Take control of the website's appearance and functionality with all-in-one settings management for the web."},
    ],
  },
  {
    id:'school-admin', label:'School Admin Panel',
    heading:'Manage school operations with our intuitive admin panel and operate seamless daily operations.',
    image: schoolAdminImg,
    screens:[<SchoolAdminScreen1/>,<SchoolAdminScreen2/>],
    features:[
      {icon:GraduationCap,title:'Academy Setup Made Easy',        desc:'Simplify academy management with our all-in-one solution. From creating mediums, subjects, and semesters to managing shifts.'},
      {icon:Users,        title:'Effortless Student Management',  desc:'Create admission forms, add students individually or in bulk and manage parent details seamlessly.'},
      {icon:ClipboardList,title:'Streamlined Teacher Management', desc:'Effortlessly adding and managing teachers in the teacher section. Fill in all necessary information.'},
      {icon:Calendar,     title:'Flexible Timetable Creation',    desc:'Customize schedules for division and teachers effortlessly with our timetable section.'},
      {icon:Bell,         title:'Announcements Made Simple',      desc:'Easily create and manage section-specific announcements. Keep your school community informed.'},
      {icon:BarChart2,    title:'Effortless Exam Management',     desc:'Simplify exam scheduling and management with our online and offline sections.'},
      {icon:CreditCard,   title:'Fees Management',                desc:'Create different types and maintain comprehensive logs of payments. Ensuring accurate records.'},
      {icon:FileText,     title:'Staff Leave Management',         desc:'Leave management for all employees — teachers & staff. Track and manage leave requests.'},
    ],
  },
  {
    id:'teacher', label:'Teacher Panel',
    heading:'Simplify classroom management with our intuitive Teacher Admin Panel.',
    image: teacherImg,
    screens:[<TeacherScreen1/>,<TeacherScreen2/>],
    features:[
      {icon:BookOpen,     title:'Lesson & Topic Crafting',               desc:'Teachers manage comprehensive lessons and break them down into topics for effective teaching and learning.'},
      {icon:ClipboardList,title:'Assignments',                           desc:'Generate assignments by class, including weightage and resubmission options. Manage submitted student lists.'},
      {icon:Users,        title:'Seamless Attendance Management',        desc:'Easily submit student attendance and view comprehensive attendance lists for effective record-keeping.'},
      {icon:BarChart2,    title:'Efficient Offline/Online Exam Management',desc:'Exam processes by uploading offline exam marks and managing student-wise results.'},
      {icon:Calendar,     title:'Personalized Timetable',                desc:'Teachers to view their personalized timetables, ensuring they stay organized and prepared.'},
    ],
  },
  {
    id:'parents-app', label:'Parents/Students App',
    heading:'Bridge the gap between home and school, creating a collaborative learning environment that supports growth and success.',
    image: parentsAppImg,
    screens:[<ParentsScreen1/>,<ParentsScreen2/>],
    features:[
      {icon:Home,         title:'Attractive Home',                desc:'Keep up-to-date with the latest announcements and subject information right from our homepage.'},
      {icon:BookOpen,     title:'Subject Lessons and Assignments',desc:'Access subject-specific lessons and assignments, track submissions, and stay organized all in one place.'},
      {icon:Settings,     title:'Centralized School Operations',  desc:'Access all essential school management tools in one convenient menu section.'},
      {icon:GraduationCap,title:'Elective Subject',              desc:"Simplify elective subject selection for students with our app's intuitive profile creation feature."},
    ],
  },
  {
    id:'student', label:'Student Panel',
    heading:'Everything Students Need - Courses, Assignments, Results & More - in One Smart Dashboard.',
    image: studentImg,
    screens:[<StudentScreen1/>,<StudentScreen2/>],
    features:[
      {icon:BookOpen, title:'Subjects & Lessons',              desc:'Students can easily access subject materials, lesson topics, and study resources in one organized space.'},
      {icon:Bus,      title:'Transportation Tracking',         desc:'Students can view their assigned bus route, pickup timings, and transport details.'},
      {icon:FileText, title:'Assignment Management',           desc:'Students can check homework, submit assignments online, and stay updated with submission status.'},
      {icon:BarChart2,title:'Exam Results (Online & Offline)', desc:'Students can view their exam scores, subject-wise marks, and performance reports for all assessments.'},
    ],
  },
  {
    id:'teacher-staff-app', label:'Teacher - Staff App',
    heading:'From Classroom to Office: Enhancing Communication for Educators and Admins.',
    image: staffAppImg,
    screens:[<StaffScreen1/>,<StaffScreen2/>],
    features:[
      {icon:BarChart2,title:'Attractive Dashboard',desc:'Easily access timetable, leave details, and holiday schedules all in one place.'},
      {icon:BookOpen, title:'Manage Lesson',       desc:'Subject teachers can easily manage lessons and topics with just a few clicks.'},
      {icon:FileText, title:'Leaves',              desc:'Conveniently apply for leave. Only authorised persons can approve or reject leave requests.'},
      {icon:Calendar, title:'Timetable',           desc:'Teachers and staff users can view the class timetable, facilitating efficient scheduling.'},
      {icon:Bell,     title:'Announcements',       desc:'Send important announcements directly from the application, ensuring timely communication.'},
    ],
  },
]

/* ── Feature Grid Icons (SVG - matching reference site style) ── */
const FEATURE_GRID = [
  {
    title: 'Student management',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
        <circle cx="24" cy="14" r="7" stroke="#0040a0" strokeWidth="2" fill="none"/>
        <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="#0040a0" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M34 10l8-4-8-4v8z" stroke="#0040a0" strokeWidth="1.5" fill="none"/>
        <circle cx="38" cy="18" r="2" stroke="#0040a0" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
  {
    title: 'Academics management',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
        <rect x="8" y="12" width="32" height="28" rx="3" stroke="#0040a0" strokeWidth="2" fill="none"/>
        <path d="M16 12V8a2 2 0 012-2h12a2 2 0 012 2v4" stroke="#0040a0" strokeWidth="2" fill="none"/>
        <path d="M16 24h16M16 30h10" stroke="#0040a0" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="36" cy="36" r="6" fill="#e8f0fc" stroke="#0040a0" strokeWidth="1.5"/>
        <path d="M34 36l1.5 1.5L38 34" stroke="#0040a0" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Slider management',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
        <rect x="4" y="12" width="40" height="26" rx="3" stroke="#0040a0" strokeWidth="2" fill="none"/>
        <path d="M4 18h40" stroke="#0040a0" strokeWidth="1.5"/>
        <rect x="10" y="22" width="28" height="10" rx="2" stroke="#0040a0" strokeWidth="1.5" fill="none"/>
        <circle cx="14" cy="40" r="2" fill="#0040a0"/>
        <circle cx="24" cy="40" r="2" fill="#ccdaf5" stroke="#0040a0" strokeWidth="1.5"/>
        <circle cx="34" cy="40" r="2" fill="#ccdaf5" stroke="#0040a0" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    title: 'Teacher management',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
        <rect x="6" y="8" width="36" height="26" rx="3" stroke="#0040a0" strokeWidth="2" fill="none"/>
        <path d="M16 38h16M24 34v4" stroke="#0040a0" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="20" r="5" stroke="#0040a0" strokeWidth="1.5" fill="none"/>
        <path d="M14 30c0-5.523 4.477-8 10-8s10 2.477 10 8" stroke="#0040a0" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    title: 'Session year management',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
        <rect x="6" y="10" width="36" height="32" rx="3" stroke="#0040a0" strokeWidth="2" fill="none"/>
        <path d="M6 18h36" stroke="#0040a0" strokeWidth="1.5"/>
        <path d="M16 6v8M32 6v8" stroke="#0040a0" strokeWidth="2" strokeLinecap="round"/>
        <rect x="12" y="24" width="8" height="6" rx="1" fill="#e8f0fc" stroke="#0040a0" strokeWidth="1.2"/>
        <rect x="28" y="24" width="8" height="6" rx="1" fill="#e8f0fc" stroke="#0040a0" strokeWidth="1.2"/>
        <path d="M12 34h8M28 34h8" stroke="#0040a0" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Holiday management',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
        <path d="M24 6C15.163 6 8 13.163 8 22c0 8.284 5.5 15.284 13 17.5V42h6v-2.5C34.5 37.284 40 30.284 40 22c0-8.837-7.163-16-16-16z" stroke="#0040a0" strokeWidth="2" fill="none"/>
        <path d="M18 22c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#0040a0" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M20 42h8" stroke="#0040a0" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="22" r="2" fill="#0040a0"/>
      </svg>
    ),
  },
  {
    title: 'Timetable management',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
        <rect x="6" y="8" width="36" height="34" rx="3" stroke="#0040a0" strokeWidth="2" fill="none"/>
        <path d="M6 18h36" stroke="#0040a0" strokeWidth="1.5"/>
        <path d="M16 8v6M32 8v6" stroke="#0040a0" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 25h6v5h-6zM21 25h6v5h-6zM30 25h6v5h-6z" stroke="#0040a0" strokeWidth="1.2" fill="none"/>
        <path d="M12 34h6M21 34h6M30 34h6" stroke="#0040a0" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Attendance management',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
        <rect x="8" y="8" width="32" height="36" rx="3" stroke="#0040a0" strokeWidth="2" fill="none"/>
        <path d="M16 4v8M32 4v8" stroke="#0040a0" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 24l4 4 8-8" stroke="#0040a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 34h12M14 30h20" stroke="#0040a0" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Exam management',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
        <rect x="10" y="6" width="28" height="36" rx="3" stroke="#0040a0" strokeWidth="2" fill="none"/>
        <path d="M18 16h12M18 22h12M18 28h8" stroke="#0040a0" strokeWidth="2" strokeLinecap="round"/>
        <rect x="28" y="28" width="10" height="10" rx="2" fill="#e8f0fc" stroke="#0040a0" strokeWidth="1.5"/>
        <path d="M30 33l2 2 4-4" stroke="#0040a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

/* ── Main Component — Simple vertical scroll, no tabs ── */
export default function FeaturesSection() {

  return (
    <section id="features" style={{ background: '#fff' }}>

      {/* ── Section Header ── */}
      <div style={{ textAlign: 'center', padding: '80px 0 48px' }}>
        <span style={{ display:'inline-block',fontSize:12,fontWeight:700,color:'#0040a0',letterSpacing:2,textTransform:'uppercase',background:'rgba(0,64,160,0.08)',padding:'5px 16px',borderRadius:50,marginBottom:14 }}>Features</span>
        <h2 className="section-title">Explore our top features</h2>
        <p style={{ color:'#64748b',fontSize:16,lineHeight:1.7,maxWidth:520,margin:'0 auto' }}>14+ robust features for an enhanced educational experience.</p>
      </div>

      {/* ── Feature Grid ── */}
      <div style={{ padding: '0 0 72px' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
            maxWidth: 960,
            margin: '0 auto',
          }} className="feat-icon-grid">
            {FEATURE_GRID.map(({ title, icon }) => (
              <div key={title} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                background: '#fff',
                border: '1.5px solid #e8f5f2',
                borderLeft: '4px solid #0040a0',
                borderRadius: 10,
                padding: '16px 20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,64,160,0.15)'; e.currentTarget.style.borderColor = '#0040a0' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#e8f5f2'; e.currentTarget.style.borderLeftColor = '#0040a0' }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 10, flexShrink: 0,
                  background: '#f0fdf9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {icon}
                </div>
                <span style={{
                  fontSize: 14.5, fontWeight: 600, color: '#1a1a2e',
                  fontFamily: "'Lato', sans-serif", lineHeight: 1.4,
                }}>{title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── All Panels stacked vertically ── */}
      {PANELS.map((panel) => {
        return (
          <div
            key={panel.id}
            id={`panel-${panel.id}`}
            className="feat-panel"
            style={{ padding: '80px 0', borderBottom: '1px solid #f1f5f9' }}
          >
            <div className="container">

              {/* Panel heading */}
              <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <p style={{ fontSize:14,fontWeight:700,color:'#0040a0',marginBottom:12,fontFamily:"'Lato', sans-serif" }}>{panel.label}</p>
                <h3 style={{
                  fontSize: 'clamp(26px, 3.5vw, 40px)',
                  fontWeight: 700,
                  color: '#1a1a2e',
                  maxWidth: 700,
                  margin: '0 auto 20px',
                  lineHeight: 1.2,
                  fontFamily:"'Lato', sans-serif",
                }}>{panel.heading}</h3>
                {/* Divider line with dot */}
                <div style={{ display:'flex',alignItems:'center',justifyContent:'center',maxWidth:600,margin:'0 auto' }}>
                  <div style={{ flex:1,height:2,background:'#1a1a2e',opacity:0.1 }} />
                  <div style={{ width:10,height:10,borderRadius:'50%',background:'#0040a0',margin:'0 8px',flexShrink:0,boxShadow:'0 0 8px rgba(0,64,160,0.4)' }} />
                  <div style={{ flex:1,height:2,background:'#1a1a2e',opacity:0.1 }} />
                </div>
              </div>

              {/* Two column: image left, features right */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 64,
                alignItems: 'start',
                maxWidth: 1000,
                margin: '0 auto',
              }} className="feat-grid">

                {/* Left — image: sticky so it stays centered while list scrolls */}
                <div style={{
                  position: 'sticky',
                  top: 100,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                  <img
                    src={panel.image}
                    alt={panel.label}
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

                {/* Right — feature list */}
                <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                  {panel.features.map(({ icon: Icon, title, desc }) => (
                    <div
                      key={title}
                      style={{
                        display: 'flex',
                        gap: 14,
                        padding: '14px 16px',
                        borderRadius: 12,
                      }}
                    >
                      <div style={{
                        width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                        background: 'rgba(0,64,160,0.1)',
                        border: '1px solid rgba(0,64,160,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={18} color='#0040a0' />
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h4 style={{
                          fontSize: 15, fontWeight: 700, color: '#1a1a2e',
                          margin: 0, fontFamily:"'Lato', sans-serif", lineHeight: 1.3,
                        }}>{title}</h4>
                        <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, margin: '4px 0 0' }}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        )
      })}

      {/* ── Schools Section — directly after features ── */}
      <div style={{ background: '#fff', padding: '60px 0 80px' }}>
        <div className="container">

          {/* Title with teal underline — exactly like reference */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a2e', marginBottom: 12 }}>Schools</h2>
            <div style={{ width: 120, height: 3, background: 'linear-gradient(90deg, #0040a0, #0ea5e9)', borderRadius: 2, margin: '0 auto' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, maxWidth: 860, margin: '0 auto' }} className="schools-grid">
            {SCHOOL_LIST.map(school => (
              <div key={school.name} style={{
                background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8,
                padding: '24px 16px 16px', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 12,
                transition: 'box-shadow 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <img src={school.logo} alt={school.name} style={{ width: 80, height: 80, objectFit: 'contain' }} />
                <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', textAlign: 'center', margin: 0 }}>{school.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width: 900px){
          .feat-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .feat-icon-grid { grid-template-columns: 1fr 1fr !important; }
          .schools-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media(max-width: 600px){
          .feat-icon-grid { grid-template-columns: 1fr !important; }
          .schools-grid { grid-template-columns: 1fr !important; }
          .feat-panel { padding: 48px 0 !important; }
          .feat-panel-heading { font-size: 20px !important; }
        }
        @media(max-width: 480px){
          .feat-icon-grid > div { padding: 12px 14px !important; }
        }
      `}</style>
    </section>
  )
}


