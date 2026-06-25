import { useState, useEffect } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9001/api/'

const FALLBACK_FAQS = [
  { _id:'1', question:'Can i update my current subscription?', answer:'Yes, you can upgrade or downgrade your subscription at any time from the admin panel. Changes take effect from the next billing cycle.' },
  { _id:'2', question:'How many schools can I manage?', answer:'With the Super Admin panel, you can manage unlimited schools from a single centralized dashboard.' },
  { _id:'3', question:'Is there a free trial available?', answer:'Yes! We offer a 30-day free trial on all plans. No credit card required to get started.' },
  { _id:'4', question:'What payment methods do you accept?', answer:'We accept all major credit/debit cards, UPI, NetBanking, and other popular payment methods.' },
  { _id:'5', question:'Is my school data secure?', answer:'Absolutely. We use industry-standard SSL encryption and follow best security practices to ensure your data is always protected.' },
]

export default function FAQSection() {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [openId, setOpenId] = useState('1')
  const [activeTab, setActiveTab] = useState('All')
  const [categories, setCategories] = useState(['All'])

  useEffect(() => {
    fetch(`${API}faq?isPagination=false`)
      .then(r => r.json())
      .then(res => {
        const list = res?.data?.faqs || []
        const active = list.filter(f => f.isActive !== false)
        const data = active.length ? active : FALLBACK_FAQS
        setFaqs(data)
        const cats = ['All', ...new Set(data.map(f => f.category).filter(Boolean))]
        setCategories(cats)
        if (data.length) setOpenId(data[0]._id)
      })
      .catch(() => { setFaqs(FALLBACK_FAQS); setOpenId('1') })
      .finally(() => setLoading(false))
  }, [])

  const filtered = activeTab === 'All' ? faqs : faqs.filter(f => f.category === activeTab)

  return (
    <section id="faq" style={{ background:'linear-gradient(135deg,#f0fdf9 0%,#e8faf6 100%)', padding:'80px 0' }}>
      <div className="container">

        <div style={{ textAlign:'center', marginBottom:52 }}>
          <span style={{ display:'inline-block',fontSize:12,fontWeight:700,color:'#1bbc9b',letterSpacing:2,textTransform:'uppercase',background:'rgba(27,188,155,0.08)',padding:'5px 16px',borderRadius:50,marginBottom:14 }}>FAQ</span>
          <h2 style={{ fontSize:'clamp(26px,4vw,42px)',fontWeight:800,color:'#1a1a2e',marginBottom:14 }}>Frequently asked questions</h2>
          <p style={{ color:'#64748b',fontSize:16,maxWidth:520,margin:'0 auto',lineHeight:1.7 }}>
            Everything you need to know about School CloudX. Can't find the answer? Contact our support team.
          </p>
        </div>

        {categories.length > 1 && (
          <div style={{ display:'flex',flexWrap:'wrap',gap:8,justifyContent:'center',marginBottom:36 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => { setActiveTab(cat); setOpenId(null) }} style={{
                padding:'8px 20px', borderRadius:999,
                border: activeTab===cat ? 'none' : '1.5px solid #d1f5ee',
                background: activeTab===cat ? 'linear-gradient(135deg,#1bbc9b,#0e9f82)' : '#fff',
                color: activeTab===cat ? '#fff' : '#64748b',
                fontSize:13.5, fontWeight:500, cursor:'pointer', transition:'all 0.2s',
                boxShadow: activeTab===cat ? '0 4px 14px rgba(27,188,155,0.3)' : 'none',
                fontFamily:'inherit',
              }}>{cat}</button>
            ))}
          </div>
        )}

        {loading && (
          <div style={{ textAlign:'center', padding:'60px 0', color:'#94a3b8' }}>
            <div className="spinner" style={{ margin:'0 auto 12px', width:28, height:28 }} />
            Loading FAQs...
          </div>
        )}

        {!loading && (
          <div style={{ maxWidth:800, margin:'0 auto', display:'flex', flexDirection:'column', gap:12 }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign:'center', padding:'40px 0', color:'#94a3b8' }}>No FAQs found.</div>
            ) : filtered.map((faq, i) => {
              const isOpen = openId === faq._id
              return (
                <div key={faq._id} style={{
                  background:'#fff',
                  border: isOpen ? '1.5px solid rgba(27,188,155,0.4)' : '1.5px solid #e8faf6',
                  borderRadius:14, overflow:'hidden', transition:'all 0.25s',
                  animation:`fadeInUp 0.4s ease ${i*0.04}s both`,
                  boxShadow: isOpen ? '0 8px 24px rgba(27,188,155,0.1)' : '0 1px 4px rgba(0,0,0,0.04)',
                }}>
                  <button onClick={() => setOpenId(isOpen ? null : faq._id)} style={{
                    width:'100%', display:'flex', alignItems:'center',
                    justifyContent:'space-between', gap:16,
                    padding:'18px 22px', background:'none',
                    border:'none', cursor:'pointer', textAlign:'left',
                  }}>
                    <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                      <HelpCircle size={17} style={{ color:isOpen?'#1bbc9b':'#d1d5db', flexShrink:0, marginTop:1, transition:'color 0.2s' }} />
                      <span style={{ fontSize:15, fontWeight:600, color:isOpen?'#1a1a2e':'#374151', lineHeight:1.5, transition:'color 0.2s' }}>
                        {faq.question}
                      </span>
                    </div>
                    <div style={{ width:28, height:28, borderRadius:'50%', flexShrink:0, background:isOpen?'rgba(27,188,155,0.1)':'#f3f4f6', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.25s' }}>
                      <ChevronDown size={16} style={{ color:isOpen?'#1bbc9b':'#9ca3af', transform:isOpen?'rotate(180deg)':'rotate(0deg)', transition:'transform 0.25s' }} />
                    </div>
                  </button>
                  <div style={{ maxHeight:isOpen?400:0, overflow:'hidden', transition:'max-height 0.3s ease' }}>
                    <p style={{ margin:0, padding:'0 22px 20px 51px', fontSize:14.5, lineHeight:1.8, color:'#64748b' }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div style={{ textAlign:'center', marginTop:44 }}>
          <p style={{ color:'#94a3b8', fontSize:14, marginBottom:14 }}>Still have questions?</p>
          <a href="#contact" onClick={e=>{e.preventDefault();document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'})}} style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'11px 26px',borderRadius:10,background:'linear-gradient(135deg,#1bbc9b,#0e9f82)',color:'#fff',fontSize:14,fontWeight:600,textDecoration:'none',boxShadow:'0 4px 14px rgba(27,188,155,0.35)',transition:'all 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.transform='translateY(-1px)'}
            onMouseLeave={e=>e.currentTarget.style.transform=''}>
            Contact Support →
          </a>
        </div>
      </div>
    </section>
  )
}
