import React from 'react'
import { Users, CreditCard, BookOpen, Bus, Bell, BarChart2, FileText, Shield, GraduationCap, Calendar, ClipboardList, Home, Settings } from 'lucide-react'
import superAdminImg   from '../../assets/HxCMMWD6ttfGHPpTS4EzpysImSjyF4c8d1GLbQ12.png'
import studentImg      from '../../assets/StudentImage.png'
import schoolAdminImg  from '../../assets/682c33c666a931.887378031747727302.png'
import teacherImg      from '../../assets/qFMqcY4MZ7kTMZ0fRigMJkhlhDFiOcCg9v3qosVw.png'
import staffAppImg     from '../../assets/mobile phone.png'
import parentsAppImg   from '../../assets/ourApp.png'
import schoolLogoImg   from '../../assets/6561c20cbfb617.710131971700905484.jpg'

/* ── Feature-specific screenshots from reference files ── */
import feat_multiSchool   from '../../assets/Transform School Management With eSchool SaaS_files/HxCMMWD6ttfGHPpTS4EzpysImSjyF4c8d1GLbQ12.png'
import feat_packages      from '../../assets/Transform School Management With eSchool SaaS_files/682c33c63c5ee5.046102311747727302.png'
import feat_addons        from '../../assets/Transform School Management With eSchool SaaS_files/4NAmlU5byYY0J96KtSk96dnE8u7ZUhp4WuiPiphb.png'
import feat_staff         from '../../assets/Transform School Management With eSchool SaaS_files/NUFaNlPvdp1tcuVbpBPblhD9xeedyuwT0UHNvofg.png'
import feat_website       from '../../assets/Transform School Management With eSchool SaaS_files/TCkUawdabsTEei1hym9YeV1n4yc5uelci0v1Kumq.png'
import feat_academy       from '../../assets/Transform School Management With eSchool SaaS_files/682c33c666a931.887378031747727302.png'
import feat_students      from '../../assets/Transform School Management With eSchool SaaS_files/3fDl3iw6gxhjjMoLaAU9xgohPF31dVcXFxQQb2HB.png'
import feat_teachers      from '../../assets/Transform School Management With eSchool SaaS_files/qFMqcY4MZ7kTMZ0fRigMJkhlhDFiOcCg9v3qosVw.png'
import feat_timetable     from '../../assets/Transform School Management With eSchool SaaS_files/5poWFmozQ3ivOeQohZhX8wpsHRjwSFUQfl6fZj5q.png'
import feat_announce      from '../../assets/Transform School Management With eSchool SaaS_files/wQlvitZmfh1FX3dNEMPozLuUIF4S2SdKraM2zdDM.png'
import feat_exam          from '../../assets/Transform School Management With eSchool SaaS_files/XuefSezViBEVkFGfU39FLSnXap4cK1yt5osGVrew.png'
import feat_fees          from '../../assets/Transform School Management With eSchool SaaS_files/KjO0IjKCPHc8XqY1HyxpigM1dQMdv6YHuomVNdVv.png'
import feat_lessons       from '../../assets/Transform School Management With eSchool SaaS_files/RMA8ExnQRSbwelgL2qulPTnH6I6y6S7Ss3UfZNy5.png'
import feat_assignments   from '../../assets/Transform School Management With eSchool SaaS_files/UXxcBKoGEAVGcoKteSyKs0NQ49A5nAJOH8MH67RZ.png'
import feat_attendance    from '../../assets/Transform School Management With eSchool SaaS_files/tLHQtBRwQvpV3MBawCW7TFpfPPZ3N5OLRh64TWNu.png'
import feat_parentsHome   from '../../assets/ourApp.png'
import feat_transport     from '../../assets/Transform School Management With eSchool SaaS_files/zf2i1fBLkW4ZigmO6egVUqOQUMbsxkfvJ5Wstpym.png'
import feat_staffDash     from '../../assets/Transform School Management With eSchool SaaS_files/qfKu1Xo49Rpt7xTue58B32nME1utaiH0RnWJyzgT.png'

const SCHOOL_LIST = [
  { name: 'Maple Grove High School', logo: schoolLogoImg },
  { name: 'Crestwood Academy',       logo: schoolLogoImg },
  { name: 'Vidhiya School',          logo: schoolLogoImg },
]

/* ---------------------------------------------
   Exact phone mockup with real app-like UI
   Matches the screenshot style exactly
--------------------------------------------- */
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
        <span style={{ fontSize:7, color:'rgba(255,255,255,0.6)' }}>???</span>
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

/* -- Super Admin screens -- */
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
        {['?','??','??','??'].map((ic,i)=><span key={i} style={{ fontSize:12 }}>{ic}</span>)}
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

/* -- School Admin screens -- */
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
            <span style={{ fontSize:9,color:'#0040a0' }}>�</span>
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
        <div style={{ fontSize:6.5,color:'rgba(255,255,255,0.8)' }}>Class X-A � 42 students</div>
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

/* -- Teacher screens -- */
function TeacherScreen1() {
  return (
    <>
      <div style={{ background:'linear-gradient(135deg,#8b5cf6,#0040a0)',padding:'10px 12px 8px' }}>
        <div style={{ fontSize:8,color:'#fff',fontWeight:800 }}>Teacher Panel</div>
        <div style={{ fontSize:6.5,color:'rgba(255,255,255,0.8)' }}>Mrs. Sharma � Maths</div>
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
          <div style={{ fontSize:7.5,fontWeight:800,color:'#0040a0' }}>? Mark Attendance</div>
          <div style={{ fontSize:6,color:'#64748b',marginTop:1 }}>Class X-A � 42 students</div>
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
        <div style={{ fontSize:6.5,color:'rgba(255,255,255,0.85)' }}>Class X-A � Maths</div>
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

/* -- Parents/Students App screens � exact screenshot match -- */
function ParentsScreen1() {
  return (
    <>
      <div style={{ background:'#0040a0',padding:'8px 10px',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
        <div style={{ display:'flex',alignItems:'center',gap:7 }}>
          <div style={{ width:26,height:26,borderRadius:'50%',background:'rgba(255,255,255,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,overflow:'hidden',border:'2px solid rgba(255,255,255,0.5)' }}>??</div>
          <div>
            <div style={{ fontSize:7.5,color:'#fff',fontWeight:800 }}>Divy Jani</div>
            <div style={{ fontSize:6,color:'rgba(255,255,255,0.8)' }}>Class 1-A � Roll No. 5</div>
          </div>
        </div>
        <span style={{ fontSize:14 }}>??</span>
      </div>
      {/* Christmas banner */}
      <div style={{ background:'linear-gradient(135deg,#0d8f75,#0040a0)',margin:'6px',borderRadius:10,padding:'8px 10px',display:'flex',alignItems:'center',gap:8 }}>
        <span style={{ fontSize:20 }}>??</span>
        <div>
          <div style={{ fontSize:7.5,color:'#fff',fontWeight:800 }}>Merry Christmas</div>
          <div style={{ fontSize:6,color:'rgba(255,255,255,0.8)',marginTop:1 }}>25 December is a holiday<br/>In tomorrow and holiday</div>
        </div>
      </div>
      <div style={{ padding:'4px 8px 6px' }}>
        <div style={{ fontSize:7,fontWeight:800,color:'#1a1a2e',marginBottom:6 }}>My Subjects</div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:5 }}>
          {[{s:'Maths\n(Practice)',ic:'??',c:'#3b82f6'},{s:'Science\n(Practice)',ic:'??',c:'#0040a0'},{s:'English',ic:'??',c:'#f59e0b'},{s:'History',ic:'???',c:'#8b5cf6'},{s:'Computer',ic:'??',c:'#0ea5e9'},{s:'Art',ic:'??',c:'#ec4899'}].map((sub,i)=>(
            <div key={i} style={{ background:'#f8fffe',borderRadius:8,padding:'6px 4px',textAlign:'center',border:`1px solid ${sub.c}20` }}>
              <div style={{ fontSize:16 }}>{sub.ic}</div>
              <div style={{ fontSize:5.5,fontWeight:700,color:'#374151',marginTop:2,lineHeight:1.3 }}>{sub.s}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background:'#f8fffe',borderTop:'1px solid #e8f0fc',padding:'6px 0',display:'flex',justifyContent:'space-around',marginTop:4 }}>
        {['??','??','??','?'].map((ic,i)=>(
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
          <div style={{ width:26,height:26,borderRadius:'50%',background:'rgba(255,255,255,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,border:'2px solid rgba(255,255,255,0.5)' }}>??</div>
          <div>
            <div style={{ fontSize:7.5,color:'#fff',fontWeight:800 }}>John Doe</div>
            <div style={{ fontSize:6,color:'rgba(255,255,255,0.8)' }}>parent@gmail.com</div>
          </div>
        </div>
        <span style={{ fontSize:14 }}>??</span>
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
          <div style={{ width:28,height:28,borderRadius:'50%',background:'linear-gradient(135deg,#0040a0,#0ea5e9)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13 }}>??</div>
          <div>
            <div style={{ fontSize:7.5,fontWeight:800,color:'#1a1a2e' }}>Divy Jani</div>
            <div style={{ fontSize:6,color:'#64748b' }}>Class 1-A � Roll No. 5</div>
          </div>
        </div>
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4 }}>
          <span style={{ fontSize:7,fontWeight:800,color:'#1a1a2e' }}>Latest notices</span>
          <span style={{ fontSize:6.5,color:'#0040a0',fontWeight:700 }}>View All</span>
        </div>
        {[{t:'Holiday',d:'Due to bad weather...',ic:'???'},{t:'Exam Schedule',d:'Finals from 10 Jul',ic:'??'}].map((n,i)=>(
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
        {['??','????????','??','?'].map((ic,i)=><span key={i} style={{ fontSize:13 }}>{ic}</span>)}
      </div>
    </>
  )
}

/* -- Student screens -- */
function StudentScreen1() {
  return (
    <>
      <div style={{ background:'linear-gradient(135deg,#0040a0,#0ea5e9)',padding:'10px 12px 8px' }}>
        <div style={{ fontSize:8,color:'#fff',fontWeight:800 }}>My Subjects</div>
        <div style={{ fontSize:6.5,color:'rgba(255,255,255,0.8)' }}>Class X-A � Riya Sharma</div>
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
        <div style={{ fontSize:6.5,color:'rgba(255,255,255,0.85)' }}>Term 2 � 2024-25</div>
      </div>
      <div style={{ padding:'8px' }}>
        <div style={{ background:'linear-gradient(135deg,#e8f0fc,#ccdaf5)',borderRadius:10,padding:'10px',textAlign:'center',marginBottom:8,border:'1.5px solid rgba(0,64,160,0.2)' }}>
          <div style={{ fontSize:22,fontWeight:900,color:'#0040a0',fontFamily:"'Lato', sans-serif" }}>87.4%</div>
          <div style={{ fontSize:7,color:'#64748b',marginTop:2 }}>Overall Score � Grade A</div>
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

/* -- Teacher Staff screens -- */
function StaffScreen1() {
  return (
    <>
      <div style={{ background:'linear-gradient(135deg,#0ea5e9,#8b5cf6)',padding:'10px 12px 8px' }}>
        <div style={{ fontSize:8,color:'#fff',fontWeight:800 }}>Staff Dashboard</div>
        <div style={{ fontSize:6.5,color:'rgba(255,255,255,0.8)' }}>Mr. Raj � Science Dept.</div>
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
        {[{t:'Sick Leave',d:'12�13 Jun',s:'Approved',sc:'#0040a0'},{t:'Casual Leave',d:'20 Jun',s:'Pending',sc:'#f59e0b'},{t:'Emergency',d:'25 Jun',s:'Rejected',sc:'#ef4444'}].map((l,i)=>(
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

/* -- Panel data -- */
const PANELS = [
  {
    id:'super-admin', label:'Super Admin Panel',
    heading:'Centrally manage school setup, fee structures, subscriptions and system configuration from one powerful dashboard.',
    image: superAdminImg,
    screens:[<SuperAdminScreen1/>,<SuperAdminScreen2/>],
    features:[
      {icon:BarChart2,    image:feat_multiSchool, title:'Admin Dashboard',              desc:'Get a real-time overview of schools, students, teachers, and revenue metrics — all from a single centralized dashboard.'},
      {icon:Settings,     image:feat_addons,      title:'Masters Management',           desc:'Configure Session, Class, Section, Stream, Subject, Document, Exam, and Fee Installment masters to set up the full academic structure.'},
      {icon:CreditCard,   image:feat_packages,    title:'Fee Management',               desc:'Define fee structures, create fee heads, set late fee rules, and manage fee installments at the system level.'},
      {icon:Bell,         image:feat_announce,    title:'Notice Board',                 desc:'Broadcast important notices and announcements to keep all school stakeholders informed instantly.'},
      {icon:Users,        image:feat_staff,       title:'Create Admin',                 desc:'Create and manage admin accounts for schools. Assign roles and control access permissions across the platform.'},
      {icon:Shield,       image:feat_website,     title:'Subscriptions & Plans',        desc:'Manage school subscription plans, track active subscriptions, and handle renewals directly from the Super Admin panel.'},
      {icon:GraduationCap,image:feat_academy,     title:'Help & Support / FAQ',         desc:'Built-in support system and FAQ management to assist school admins with platform queries and issues.'},
    ],
  },
  {
    id:'school-admin', label:'School Admin Panel',
    heading:'Run your entire school from one smart admin panel — admissions, fees, exams, transport, and detailed reports.',
    image: schoolAdminImg,
    screens:[<SchoolAdminScreen1/>,<SchoolAdminScreen2/>],
    features:[
      {icon:Users,        image:feat_students,    title:'Student Management',           desc:'Handle student registration, enrollment, class lists, student transfers, roll number management, and auto-generate student ID cards.'},
      {icon:ClipboardList,image:feat_attendance,  title:'Attendance Management',        desc:'Mark daily attendance class-wise, view records by date range, and generate comprehensive attendance reports.'},
      {icon:GraduationCap,image:feat_teachers,    title:'Teacher Management',           desc:'Register teachers, maintain profiles, assign classes and subjects, and manage section allocations.'},
      {icon:CreditCard,   image:feat_fees,        title:'Fee Management',               desc:'Set up fee structures, collect fees, manage fee heads, apply late fee and additional fee waivers, and generate detailed fee reports.'},
      {icon:Bus,          image:feat_transport,   title:'Transport Management',         desc:'Manage routes, stations, buses, and allocate transport to students. Track transport fees and collection with dedicated reports.'},
      {icon:BarChart2,    image:feat_exam,        title:'Examination Management',       desc:'Schedule exams, add or update marks, upload marks via Excel/CSV, generate marksheets, and print class-wise result sheets.'},
      {icon:BookOpen,     image:feat_assignments, title:'Homework Management',          desc:'Assign homework class-wise, track submission status, and maintain a complete homework and assignment list for the school.'},
      {icon:FileText,     image:feat_lessons,     title:'Reports & Analytics',          desc:'Access fee defaulter lists, student ledger, transport reports, exam performance, and result analysis — all exportable.'},
      {icon:Bell,         image:feat_announce,    title:'Notice Board & Certificates',  desc:'Post school-wide notices and generate student certificates directly from the admin panel.'},
    ],
  },
  {
    id:'teacher', label:'Teacher Panel',
    heading:'Everything teachers need — class management, attendance, homework, and results — in one focused web panel.',
    image: teacherImg,
    screens:[<TeacherScreen1/>,<TeacherScreen2/>],
    features:[
      {icon:BarChart2,    image:feat_staffDash,   title:'Teacher Dashboard',            desc:'A quick snapshot of assigned classes, pending homework, attendance tasks, and important notices — all on one screen.'},
      {icon:Users,        image:feat_students,    title:'My Classes — Student List',    desc:'View the complete list of students across all assigned classes with their details and academic status.'},
      {icon:ClipboardList,image:feat_attendance,  title:'Attendance Marking',           desc:'Class teachers can mark daily student attendance and view attendance records for their assigned sections.'},
      {icon:BarChart2,    image:feat_exam,        title:'Marksheet Entry',              desc:'Class teachers can add and update student marks for assigned exams directly from the teacher panel.'},
      {icon:BookOpen,     image:feat_assignments, title:'Homework Management',          desc:'Assign homework subject-wise with due dates, and maintain a complete list of assigned and submitted tasks.'},
      {icon:Bell,         image:feat_announce,    title:'Notice Board',                 desc:'View school-wide notices and communicate with students and parents through the notice board.'},
    ],
  },
  {
    id:'parents', label:'Parents Panel',
    heading:"Give parents a clear view of their child's academics, fees, and school activities — all in one place.",
    image: parentsAppImg,
    screens:[<ParentsScreen1/>,<ParentsScreen2/>],
    features:[
      {icon:Home,         image:feat_parentsHome, title:'Parent Dashboard',             desc:"Parents get a unified view of their child's school information — attendance, fees, notices, and key academic updates at a glance."},
      {icon:Bell,         image:feat_announce,    title:'Notice Board Access',          desc:'Parents can view school announcements, holiday notices, and important circulars directly from their panel.'},
      {icon:Shield,       image:feat_academy,     title:'FAQ & Help',                   desc:'Parents have access to a FAQ section and Help & Support to resolve their queries about the school portal easily.'},
    ],
  },
  {
    id:'student-panel', label:'Student Panel',
    heading:'Everything students need — attendance, homework, fees, results, and queries — in one smart dashboard.',
    image: studentImg,
    screens:[<StudentScreen1/>,<StudentScreen2/>],
    features:[
      {icon:BarChart2,    image:feat_staffDash,   title:'Student Dashboard',            desc:'A personalized dashboard showing upcoming homework, recent announcements, and quick links to all key sections.'},
      {icon:Users,        image:feat_students,    title:'My Profile',                   desc:'View personal profile details, class information, roll number, and enrolled subject list.'},
      {icon:ClipboardList,image:feat_attendance,  title:'Attendance',                   desc:'Students can check their subject-wise and monthly attendance records in real time.'},
      {icon:BookOpen,     image:feat_assignments, title:'Homework',                     desc:'View assigned homework, check due dates, and track submission status for all subjects.'},
      {icon:CreditCard,   image:feat_fees,        title:'Academic Fees & Payment History',desc:'View fee dues, make payments online, and access complete payment history and receipts.'},
      {icon:FileText,     image:feat_exam,        title:'Marksheet',                    desc:'Access subject-wise marks and generated marksheets for all examinations — both online and offline.'},
      {icon:Bell,         image:feat_announce,    title:'Query / Notice Board',         desc:'Raise queries and stay updated with school notices and communications directly from the panel.'},
    ],
  },
]

/* -- Feature Grid Icons (SVG - matching reference site style) -- */
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

/* -- Extra features shown on "View more" -- */
const FEATURE_GRID_EXTRA = [
  {
    title: 'Fee management',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
        <rect x="6" y="10" width="36" height="28" rx="3" stroke="#0040a0" strokeWidth="2" fill="none"/>
        <circle cx="24" cy="24" r="7" stroke="#0040a0" strokeWidth="2" fill="none"/>
        <path d="M24 18v12M21 20.5h4.5a2 2 0 010 4H22a2 2 0 000 4H27" stroke="#0040a0" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Transportation management',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
        <rect x="4" y="14" width="40" height="22" rx="3" stroke="#0040a0" strokeWidth="2" fill="none"/>
        <path d="M4 20h40" stroke="#0040a0" strokeWidth="1.5"/>
        <circle cx="13" cy="40" r="4" stroke="#0040a0" strokeWidth="2" fill="none"/>
        <circle cx="35" cy="40" r="4" stroke="#0040a0" strokeWidth="2" fill="none"/>
        <path d="M17 40h14M4 32h40" stroke="#0040a0" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 14V10a2 2 0 012-2h24a2 2 0 012 2v4" stroke="#0040a0" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
  {
    title: 'Announcement management',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
        <path d="M8 20v8h6l10 8V12L14 20H8z" stroke="#0040a0" strokeWidth="2" strokeLinejoin="round" fill="none"/>
        <path d="M34 16c2.5 2 4 5 4 8s-1.5 6-4 8" stroke="#0040a0" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M38 10c5 4 8 9 8 14s-3 10-8 14" stroke="#0040a0" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    title: 'Assignment management',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
        <rect x="10" y="6" width="28" height="36" rx="3" stroke="#0040a0" strokeWidth="2" fill="none"/>
        <path d="M18 16h12M18 22h12M18 28h8" stroke="#0040a0" strokeWidth="2" strokeLinecap="round"/>
        <path d="M28 32l3 3 5-5" stroke="#0040a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Lesson management',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
        <rect x="8" y="8" width="32" height="32" rx="3" stroke="#0040a0" strokeWidth="2" fill="none"/>
        <path d="M16 18h16M16 24h16M16 30h10" stroke="#0040a0" strokeWidth="2" strokeLinecap="round"/>
        <path d="M36 32l4 8-4-2-4 2 4-8z" stroke="#0040a0" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
  {
    title: 'Chat module',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
        <path d="M6 10a3 3 0 013-3h30a3 3 0 013 3v22a3 3 0 01-3 3H16l-7 6V10z" stroke="#0040a0" strokeWidth="2" strokeLinejoin="round" fill="none"/>
        <path d="M14 20h20M14 27h12" stroke="#0040a0" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
]


/* ── Per-panel active feature tracker ── */
function PanelBlock({ panel }) {
  const [activeFeature, setActiveFeature] = React.useState(0)
  const displayedImage = panel.features[activeFeature]?.image || panel.image

  return (
    <div
      id={`panel-${panel.id}`}
      className="feat-panel"
      style={{ padding: '80px 0', borderBottom: '1px solid #f1f5f9' }}
    >
      <div className="container">

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontSize:14,fontWeight:700,color:'#0040a0',marginBottom:12,fontFamily:"'Lato', sans-serif" }}>{panel.label}</p>
          <h3 style={{
            fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, color: '#1a1a2e',
            maxWidth: 860, margin: '0 auto 20px', lineHeight: 1.2, fontFamily:"'Lato', sans-serif",
          }}>{panel.heading}</h3>
          <div style={{ display:'flex',alignItems:'center',justifyContent:'center',maxWidth:600,margin:'0 auto' }}>
            <div style={{ flex:1,height:2,background:'#1a1a2e',opacity:0.1 }} />
            <div style={{ width:10,height:10,borderRadius:'50%',background:'#0040a0',margin:'0 8px',flexShrink:0,boxShadow:'0 0 8px rgba(0,64,160,0.4)' }} />
            <div style={{ flex:1,height:2,background:'#1a1a2e',opacity:0.1 }} />
          </div>
        </div>

        {/* Two columns */}
        <div style={{ display:'grid', gridTemplateColumns:'45% 55%', gap:64, alignItems:'start' }} className="feat-grid">

          {/* LEFT — image, changes when feature is clicked */}
          <div className="feat-img-wrap" style={{ position:'sticky', top:88, display:'flex', justifyContent:'center', alignItems:'flex-start' }}>
            <img
              key={displayedImage}
              src={displayedImage}
              alt={panel.features[activeFeature]?.title || panel.label}
              style={{
                width:'100%', maxWidth:560, height:'auto', display:'block',
                borderRadius:16,
                filter:'drop-shadow(0 20px 48px rgba(0,0,0,0.15))',
                animation:'imgFadeIn 0.3s ease',
              }}
            />
          </div>

          {/* RIGHT — clickable feature list */}
          <div className="feat-list" style={{
            maxHeight: 480, overflowY: 'auto', display:'flex', flexDirection:'column', gap:6,
            paddingRight:8, scrollbarWidth:'thin', scrollbarColor:'#ccdaf5 transparent',
          }}>
            {panel.features.map(({ icon: Icon, title, desc }, idx) => {
              const isActive = activeFeature === idx
              return (
                <div
                  key={title}
                  onClick={() => setActiveFeature(idx)}
                  style={{
                    display:'flex', gap:16, padding:'18px 20px', borderRadius:12,
                    background: isActive ? '#e8f0fc' : '#f8fafe',
                    border: isActive ? '1.5px solid #a0bce8' : '1px solid #e8f0fc',
                    transition:'all 0.2s', cursor:'pointer',
                    boxShadow: isActive ? '0 4px 16px rgba(0,64,160,0.1)' : 'none',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background='#eef3fd'; e.currentTarget.style.borderColor='#ccdaf5' } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background='#f8fafe'; e.currentTarget.style.borderColor='#e8f0fc' } }}
                >
                  <div style={{
                    width:46, height:46, borderRadius:12, flexShrink:0,
                    background: 'rgba(0,64,160,0.1)',
                    border: isActive ? '1px solid rgba(0,64,160,0.35)' : '1px solid rgba(0,64,160,0.2)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                    <Icon size={20} color='#0040a0' />
                  </div>
                  <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center' }}>
                    <h4 style={{
                      fontSize:18, fontWeight:700, margin:0,
                      color: isActive ? '#0040a0' : '#1a1a2e',
                      fontFamily:"'Lato', sans-serif", lineHeight:1.3,
                    }}>{title}</h4>
                    <p style={{
                      fontSize:15, lineHeight:1.65, margin:'6px 0 0',
                      color: '#64748b',
                    }}>{desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </div>
  )
}

/* ── Main Component ── */
export default function FeaturesSection() {
  const [showMore, setShowMore] = React.useState(false)

  return (
    <section id="features" style={{ background: '#fff' }}>

      {/* ── Section Header ── */}
      <div style={{ textAlign: 'center', padding: '80px 0 52px' }}>
        <span style={{ display:'inline-block',fontSize:12,fontWeight:700,color:'#0040a0',letterSpacing:2,textTransform:'uppercase',background:'rgba(0,64,160,0.08)',padding:'5px 16px',borderRadius:50,marginBottom:14 }}>Features</span>
        <h2 className="section-title" style={{ marginBottom: 16 }}>Explore our top features</h2>
        <div style={{ display:'flex',alignItems:'center',justifyContent:'center',maxWidth:520,margin:'0 auto 16px' }}>
          <div style={{ flex:1,height:2,background:'#0040a0',opacity:0.2 }} />
          <div style={{ width:10,height:10,borderRadius:'50%',background:'#0040a0',margin:'0 8px',flexShrink:0 }} />
          <div style={{ flex:1,height:2,background:'#0040a0',opacity:0.2 }} />
        </div>
        <p style={{ color:'#64748b',fontSize:16,lineHeight:1.7,maxWidth:520,margin:'0 auto' }}>14+ robust features for an enhanced educational experience.</p>
      </div>

      {/* ── Feature Grid ── */}
      <div style={{ padding: '0 0 48px' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20 }} className="feat-icon-grid">
            {FEATURE_GRID.map(({ title, icon }) => (
              <div key={title} className="feat-card" style={{
                display:'flex', alignItems:'center', gap:16, background:'#fff',
                border:'1.5px solid #e2e8f0',
                borderRadius:12, padding:'20px 24px',
                boxShadow:'0 2px 10px rgba(0,0,0,0.05)', transition:'all 0.3s ease', cursor:'default',
              }}
                onMouseEnter={e => {
                  const card = e.currentTarget
                  card.style.background = 'linear-gradient(135deg, #0040a0 0%, #0ea5e9 100%)'
                  card.style.border = '1.5px solid transparent'
                  card.style.transform = 'translateY(-4px)'
                  card.style.boxShadow = '0 16px 36px rgba(0,64,160,0.28)'
                  card.querySelector('.fc-icon').style.background = '#fff'
                  card.querySelector('.fc-icon').style.border = '1px solid rgba(255,255,255,0.3)'
                  card.querySelector('.fc-title').style.color = '#fff'
                }}
                onMouseLeave={e => {
                  const card = e.currentTarget
                  card.style.background = '#fff'
                  card.style.border = '1.5px solid #e2e8f0'
                  card.style.transform = 'none'
                  card.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)'
                  card.querySelector('.fc-icon').style.background = 'rgba(0,64,160,0.07)'
                  card.querySelector('.fc-icon').style.border = '1px solid rgba(0,64,160,0.15)'
                  card.querySelector('.fc-title').style.color = '#1a1a2e'
                }}
              >
                <div className="fc-icon" style={{ width:52,height:52,borderRadius:12,flexShrink:0,background:'rgba(0,64,160,0.07)',border:'1px solid rgba(0,64,160,0.15)',display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.3s ease' }}>
                  {icon}
                </div>
                <span className="fc-title" style={{ fontSize:16,fontWeight:600,color:'#1a1a2e',fontFamily:"'Lato', sans-serif",lineHeight:1.4,transition:'color 0.3s ease' }}>{title}</span>
              </div>
            ))}
            {showMore && FEATURE_GRID_EXTRA.map(({ title, icon }) => (
              <div key={title} className="feat-card" style={{
                display:'flex', alignItems:'center', gap:16, background:'#fff',
                border:'1.5px solid #e2e8f0',
                borderRadius:12, padding:'20px 24px',
                boxShadow:'0 2px 10px rgba(0,0,0,0.05)', transition:'all 0.3s ease', cursor:'default',
                animation:'fadeInUp 0.3s ease',
              }}
                onMouseEnter={e => {
                  const card = e.currentTarget
                  card.style.background = 'linear-gradient(135deg, #0040a0 0%, #0ea5e9 100%)'
                  card.style.border = '1.5px solid transparent'
                  card.style.transform = 'translateY(-4px)'
                  card.style.boxShadow = '0 16px 36px rgba(0,64,160,0.28)'
                  card.querySelector('.fc-icon').style.background = '#fff'
                  card.querySelector('.fc-icon').style.border = '1px solid rgba(255,255,255,0.3)'
                  card.querySelector('.fc-title').style.color = '#fff'
                }}
                onMouseLeave={e => {
                  const card = e.currentTarget
                  card.style.background = '#fff'
                  card.style.border = '1.5px solid #e2e8f0'
                  card.style.transform = 'none'
                  card.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)'
                  card.querySelector('.fc-icon').style.background = 'rgba(0,64,160,0.07)'
                  card.querySelector('.fc-icon').style.border = '1px solid rgba(0,64,160,0.15)'
                  card.querySelector('.fc-title').style.color = '#1a1a2e'
                }}
              >
                <div className="fc-icon" style={{ width:52,height:52,borderRadius:12,flexShrink:0,background:'rgba(0,64,160,0.07)',border:'1px solid rgba(0,64,160,0.15)',display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.3s ease' }}>
                  {icon}
                </div>
                <span className="fc-title" style={{ fontSize:16,fontWeight:600,color:'#1a1a2e',fontFamily:"'Lato', sans-serif",lineHeight:1.4,transition:'color 0.3s ease' }}>{title}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop:36 }}>
            <button
              onClick={() => setShowMore(prev => !prev)}
              style={{
                display:'inline-flex', alignItems:'center', gap:8, padding:'13px 32px',
                borderRadius:8, border:'none', cursor:'pointer',
                background:'linear-gradient(135deg, #0040a0, #0060d0)', color:'#fff',
                fontSize:15, fontWeight:600, fontFamily:"'Lato', sans-serif",
                boxShadow:'0 6px 20px rgba(0,64,160,0.35)', transition:'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 10px 28px rgba(0,64,160,0.45)' }}
              onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 6px 20px rgba(0,64,160,0.35)' }}
            >
              {showMore ? 'View less features ←' : 'View more features →'}
            </button>
          </div>
        </div>
      </div>

      {/* ── All Panels — vertical scroll, feature click changes image ── */}
      {PANELS.map(panel => (
        <PanelBlock key={panel.id} panel={panel} />
      ))}

      {/* ── Schools Marquee Strip ── */}
      <div style={{ background:'#fff', padding:'40px 0', overflow:'hidden' }}>

        {/* Marquee track */}
        <div style={{ position:'relative', overflow:'hidden' }}>
          {/* Fade edges */}
          <div style={{ position:'absolute', left:0, top:0, bottom:0, width:80, background:'linear-gradient(to right, #fff, transparent)', zIndex:2, pointerEvents:'none' }} />
          <div style={{ position:'absolute', right:0, top:0, bottom:0, width:80, background:'linear-gradient(to left, #fff, transparent)', zIndex:2, pointerEvents:'none' }} />

          <div className="marquee-track">
            {[...SCHOOL_LIST, ...SCHOOL_LIST, ...SCHOOL_LIST].map((school, i) => (
              <div key={i} className="marquee-item">
                <img src={school.logo} alt={school.name} style={{ height:48, width:'auto', maxWidth:120, objectFit:'contain', filter:'grayscale(30%)' }} />
                <span style={{ fontSize:13, fontWeight:600, color:'#374151', whiteSpace:'nowrap' }}>{school.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee-track {
          display: flex;
          align-items: center;
          gap: 0;
          width: max-content;
          animation: marqueeScroll 18s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }
        .marquee-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 36px;
          border-right: 1px solid #e2e8f0;
          flex-shrink: 0;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes imgFadeIn {
          from { opacity: 0.4; transform: scale(0.98); }
          to   { opacity: 1; transform: scale(1); }
        }
        @media(max-width: 900px){
          .feat-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .feat-icon-grid { grid-template-columns: 1fr 1fr !important; }
          .feat-img-wrap { position: static !important; top: auto !important; width: 100% !important; }
          .feat-img-wrap img { max-width: 400px !important; margin: 0 auto !important; }
          .feat-list { max-height: none !important; overflow-y: visible !important; padding-right: 0 !important; }
        }
        @media(max-width: 600px){
          .feat-icon-grid { grid-template-columns: 1fr !important; }
          .feat-panel { padding: 48px 0 !important; }
          .feat-img-wrap img { max-width: 300px !important; }
        }
        @media(max-width: 480px){
          .feat-icon-grid > div { padding: 12px 14px !important; }
          .feat-img-wrap img { max-width: 260px !important; }
        }
      `}</style>
    </section>
  )
}
