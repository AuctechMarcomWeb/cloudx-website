import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Check, Zap, Star, Users, Clock } from 'lucide-react'

const API = import.meta.env.VITE_API_BASE_URL

const FALLBACK_PLANS = [
  {
    _id:'prepaid-pro', name:'Pro', badge:'Prepaid', description:'Best for established schools',
    price:99, pricingModel:'FIXED', billingCycle:'Monthly', studentLimit:2999, staffLimit:99,
    trialDays:30, isPopular:true,
    features:['Student management','Academics management','Slider management','Teacher management','Session year management','Holiday management','Timetable management','Attendance management','Exam management','Lesson management','Assignment management','Announcement management','Staff management','Expense management','Staff leave management','Fees management','School gallery management','ID card certificate generation','Website management','Chat module','Transportation module','Staff attendance management'],
  },
  {
    _id:'postpaid-developer', name:'Developer', badge:'Postpaid', description:'For developers & testing',
    price:0, pricingModel:'PER_STUDENT', pricePerStudent:10, pricePerStaff:10,
    billingCycle:'Monthly', studentLimit:0, trialDays:30, isPopular:false,
    features:['Student management','Academics management','Slider management','Teacher management','Session year management','Holiday management','Timetable management','Attendance management','Exam management','Lesson management','Assignment management','Announcement management','Staff management','Expense management','Staff leave management','Fees management','School gallery management','ID card certificate generation','Website management','Chat module','Transportation module','Staff attendance management'],
  },
  {
    _id:'postpaid-basic', name:'Basic', badge:'Postpaid', description:'Perfect for small schools',
    price:0, pricingModel:'PER_STUDENT', pricePerStudent:0.02, pricePerStaff:0.02,
    billingCycle:'Monthly', studentLimit:0, trialDays:30, isPopular:false,
    features:['Student management','Academics management','Slider management','Teacher management','Session year management','Holiday management','Timetable management','Attendance management','Exam management','Lesson management','Assignment management','Announcement management','Staff management','Expense management','Staff leave management','Fees management','School gallery management','ID card certificate generation','Website management','Chat module','Transportation module','Staff attendance management'],
  },
  {
    _id:'postpaid-standard', name:'Standard', badge:'Postpaid', description:'For growing institutions',
    price:0, pricingModel:'PER_STUDENT', pricePerStudent:1.00, pricePerStaff:4.00,
    billingCycle:'Monthly', studentLimit:0, trialDays:30, isPopular:false,
    features:['Student management','Academics management','Slider management','Teacher management','Session year management','Holiday management','Timetable management','Attendance management','Exam management','Lesson management','Assignment management','Announcement management','Staff management','Expense management','Staff leave management','Fees management','School gallery management','ID card certificate generation','Website management','Chat module','Transportation module','Staff attendance management'],
  },
  {
    _id:'postpaid-pro', name:'Pro', badge:'Postpaid', description:'Best value postpaid',
    price:0, pricingModel:'PER_STUDENT', pricePerStudent:0.25, pricePerStaff:0.25,
    billingCycle:'Monthly', studentLimit:0, trialDays:30, isPopular:false,
    features:['Student management','Academics management','Slider management','Teacher management','Session year management','Holiday management','Timetable management','Attendance management','Exam management','Lesson management','Assignment management','Announcement management','Staff management','Expense management','Staff leave management','Fees management','School gallery management','ID card certificate generation','Website management','Chat module','Transportation module','Staff attendance management'],
  },
]

export default function PricingSection() {
  const navigate = useNavigate()
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API}onboarding/plans`)
      .then(r => setPlans(r.data.data.plans?.length ? r.data.data.plans : FALLBACK_PLANS))
      .catch(() => setPlans(FALLBACK_PLANS))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="pricing" style={{ background:'#fff', padding:'80px 0' }}>
      <div className="container">

        <div style={{ textAlign:'center', marginBottom:52 }}>
          <span style={{ display:'inline-block',fontSize:12,fontWeight:700,color:'#1bbc9b',letterSpacing:2,textTransform:'uppercase',background:'rgba(27,188,155,0.08)',padding:'5px 16px',borderRadius:50,marginBottom:14 }}>Pricing</span>
          <h2 style={{ fontSize:'clamp(26px,4vw,42px)',fontWeight:800,color:'#1a1a2e',marginBottom:14 }}>Flexible pricing packages</h2>
          <p style={{ color:'#64748b',maxWidth:520,margin:'0 auto',fontSize:16,lineHeight:1.7 }}>
            Choose the plan that fits your school best. Prepaid or per-student billing — transparent, no hidden charges.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign:'center', padding:'60px 0' }}>
            <div className="spinner" style={{ margin:'0 auto', width:36, height:36 }} />
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:24, maxWidth:1100, margin:'0 auto' }}>
            {plans.map((plan, idx) => {
              const pop = plan.isPopular
              return (
                <div key={plan._id} style={{
                  position:'relative',
                  background: pop ? 'linear-gradient(160deg,#1bbc9b 0%,#0e9f82 100%)' : '#fff',
                  border: pop ? 'none' : '2px solid #e8faf6',
                  borderRadius:22, padding:'32px 28px',
                  boxShadow: pop ? '0 20px 60px rgba(27,188,155,0.35)' : '0 4px 20px rgba(0,0,0,0.05)',
                  transition:'all 0.25s',
                  animation:`fadeInUp 0.5s ease ${idx*0.08}s both`,
                }}
                  onMouseEnter={e=>{ if(!pop){e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow='0 16px 40px rgba(27,188,155,0.15)';e.currentTarget.style.borderColor='rgba(27,188,155,0.4)'}}}
                  onMouseLeave={e=>{ if(!pop){e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,0.05)';e.currentTarget.style.borderColor='#e8faf6'}}}
                >
                  {pop && (
                    <div style={{ position:'absolute',top:-14,left:'50%',transform:'translateX(-50%)',background:'#f59e0b',color:'#fff',borderRadius:50,padding:'4px 16px',fontSize:11,fontWeight:700,whiteSpace:'nowrap',boxShadow:'0 4px 12px rgba(245,158,11,0.4)',display:'flex',alignItems:'center',gap:5 }}>
                      <Star size={10} fill="#fff" /> Most Popular
                    </div>
                  )}

                  <div style={{ marginBottom:20 }}>
                    <span style={{ fontSize:11,fontWeight:700,letterSpacing:1,textTransform:'uppercase',padding:'3px 10px',borderRadius:50,background:pop?'rgba(255,255,255,0.2)':'rgba(27,188,155,0.1)',color:pop?'#fff':'#1bbc9b',marginBottom:10,display:'inline-block' }}>
                      {plan.badge || (plan.pricingModel==='FIXED'?'Prepaid':'Postpaid')}
                    </span>
                    <h3 style={{ fontSize:24,fontWeight:800,marginTop:6,marginBottom:4,color:pop?'#fff':'#1a1a2e' }}>{plan.name}</h3>
                    <p style={{ fontSize:14,color:pop?'rgba(255,255,255,0.75)':'#94a3b8' }}>{plan.description}</p>
                  </div>

                  <div style={{ marginBottom:20,paddingBottom:20,borderBottom:`1px solid ${pop?'rgba(255,255,255,0.2)':'#e8faf6'}` }}>
                    {plan.pricingModel==='FIXED' ? (
                      <>
                        <div style={{ display:'flex',alignItems:'baseline',gap:4 }}>
                          <span style={{ fontSize:42,fontWeight:800,color:pop?'#fff':'#1a1a2e' }}>${plan.price?.toLocaleString?.()??plan.price}</span>
                          <span style={{ fontSize:14,color:pop?'rgba(255,255,255,0.65)':'#94a3b8' }}>/ Package amount</span>
                        </div>
                        <div style={{ display:'flex',flexWrap:'wrap',gap:12,marginTop:10 }}>
                          {plan.studentLimit>0&&<div style={{ display:'flex',alignItems:'center',gap:5,fontSize:13,color:pop?'rgba(255,255,255,0.8)':'#64748b' }}><Users size={13}/> {plan.studentLimit?.toLocaleString()} Student limit</div>}
                          {plan.staffLimit>0&&<div style={{ display:'flex',alignItems:'center',gap:5,fontSize:13,color:pop?'rgba(255,255,255,0.8)':'#64748b' }}><Users size={13}/> {plan.staffLimit} Staff limit</div>}
                          <div style={{ display:'flex',alignItems:'center',gap:5,fontSize:13,color:pop?'rgba(255,255,255,0.8)':'#64748b' }}><Clock size={13}/> 30 Days</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ display:'flex',alignItems:'baseline',gap:4 }}>
                          <span style={{ fontSize:34,fontWeight:800,color:pop?'#fff':'#1a1a2e' }}>${plan.pricePerStudent}</span>
                          <span style={{ fontSize:13,color:pop?'rgba(255,255,255,0.65)':'#94a3b8' }}>Per student charges</span>
                        </div>
                        {plan.pricePerStaff!=null&&<div style={{ display:'flex',alignItems:'baseline',gap:4,marginTop:4 }}>
                          <span style={{ fontSize:22,fontWeight:700,color:pop?'rgba(255,255,255,0.85)':'#374151' }}>${plan.pricePerStaff}</span>
                          <span style={{ fontSize:13,color:pop?'rgba(255,255,255,0.65)':'#94a3b8' }}>Per staff charges</span>
                        </div>}
                        <div style={{ display:'flex',alignItems:'center',gap:5,fontSize:13,color:pop?'rgba(255,255,255,0.8)':'#64748b',marginTop:8 }}><Clock size={13}/> 30 Days</div>
                      </>
                    )}
                    {plan.trialDays>0&&<div style={{ marginTop:10 }}>
                      <span style={{ display:'inline-flex',alignItems:'center',gap:5,background:pop?'rgba(255,255,255,0.15)':'rgba(27,188,155,0.1)',color:pop?'#fff':'#0e9f82',border:pop?'1px solid rgba(255,255,255,0.2)':'1px solid rgba(27,188,155,0.25)',borderRadius:50,padding:'3px 10px',fontSize:12,fontWeight:600 }}>
                        <Zap size={11}/> {plan.trialDays}-day trial
                      </span>
                    </div>}
                  </div>

                  <ul style={{ listStyle:'none', marginBottom:26 }}>
                    {(plan.features||[]).map(f=>(
                      <li key={f} style={{ display:'flex',alignItems:'flex-start',gap:10,marginBottom:9 }}>
                        <Check size={15} color={pop?'rgba(255,255,255,0.9)':'#1bbc9b'} style={{ marginTop:2,flexShrink:0 }} />
                        <span style={{ fontSize:13.5,color:pop?'rgba(255,255,255,0.85)':'#64748b' }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button onClick={()=>navigate('/register')} style={{ width:'100%',padding:'13px',background:pop?'#fff':'linear-gradient(135deg,#1bbc9b,#0e9f82)',color:pop?'#1bbc9b':'#fff',border:'none',borderRadius:12,fontSize:15,fontWeight:700,cursor:'pointer',transition:'all 0.2s',fontFamily:'inherit',boxShadow:pop?'0 4px 14px rgba(0,0,0,0.1)':'0 4px 14px rgba(27,188,155,0.35)' }}
                    onMouseEnter={e=>e.currentTarget.style.transform='translateY(-1px)'}
                    onMouseLeave={e=>e.currentTarget.style.transform=''}>
                    Get started
                  </button>
                </div>
              )
            })}
          </div>
        )}

        {/* Custom package */}
        <div style={{ maxWidth:700,margin:'48px auto 0',background:'linear-gradient(135deg,#e8faf6,#d1f5ee)',border:'1.5px solid rgba(27,188,155,0.25)',borderRadius:20,padding:'36px 40px',textAlign:'center' }}>
          <h3 style={{ fontSize:22,fontWeight:800,color:'#0e6b5a',marginBottom:10 }}>Custom package</h3>
          <p style={{ color:'#64748b',fontSize:15,lineHeight:1.7,marginBottom:24 }}>
            Tailor your experience with our custom package options. From personalized services to bespoke solutions, we offer flexibility to meet your unique needs.
          </p>
          <button onClick={()=>document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'})} style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'12px 28px',background:'linear-gradient(135deg,#1bbc9b,#0e9f82)',color:'#fff',border:'none',borderRadius:10,fontSize:15,fontWeight:600,cursor:'pointer',boxShadow:'0 6px 20px rgba(27,188,155,0.35)',fontFamily:'inherit',transition:'all 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.transform='translateY(-1px)'}
            onMouseLeave={e=>e.currentTarget.style.transform=''}>
            Get in touch
          </button>
        </div>
      </div>
    </section>
  )
}
