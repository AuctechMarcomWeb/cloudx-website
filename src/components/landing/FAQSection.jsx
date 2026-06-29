import { useState, useEffect } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9001/api/'
const ALL_INITIAL_LIMIT = 6   // "All" tab pe pehle itne dikhenge
const ALL_STEP = 6            // "Show More" pe itne aur load honge

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
  const [visibleCount, setVisibleCount] = useState(ALL_INITIAL_LIMIT)

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

  const handleTabChange = (cat) => {
    setActiveTab(cat)
    setOpenId(null)
    setVisibleCount(ALL_INITIAL_LIMIT) // reset on tab switch
  }

  const filtered = activeTab === 'All' ? faqs : faqs.filter(f => f.category === activeTab)

  // Only apply show more/less on "All" tab
  const isAllTab = activeTab === 'All'
  const displayed = isAllTab ? filtered.slice(0, visibleCount) : filtered
  const hasMore = isAllTab && visibleCount < filtered.length
  const isExpanded = isAllTab && visibleCount >= filtered.length && filtered.length > ALL_INITIAL_LIMIT

  return (
    <section id="faq" style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f0fc 100%)', padding: '80px 0' }}>
      <div className="container">

        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span className="section-badge">FAQ</span>
          <h2 className="section-title">Frequently asked questions</h2>
          <p className="section-sub">
            Everything you need to know about School CloudX. Can't find the answer? Contact our support team.
          </p>
        </div>

        {/* Category tabs */}
        {categories.length > 1 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 36 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => handleTabChange(cat)} style={{
                padding: '8px 20px', borderRadius: 999, cursor: 'pointer',
                border: activeTab === cat ? 'none' : '1.5px solid #ccdaf5',
                background: activeTab === cat ? 'linear-gradient(135deg,#0040a0,#002f80)' : '#fff',
                color: activeTab === cat ? '#fff' : '#64748b',
                fontSize: 13.5, fontWeight: 500, transition: 'all 0.2s',
                boxShadow: activeTab === cat ? '0 4px 14px rgba(0,64,160,0.3)' : 'none',
              }}>{cat}</button>
            ))}
          </div>
        )}

        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
            <div className="spinner" style={{ margin: '0 auto 12px' }} />
            Loading FAQs...
          </div>
        )}

        {!loading && (
          <>
            <div style={{ margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {displayed.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>No FAQs found.</div>
              ) : displayed.map((faq) => {
                const isOpen = openId === faq._id
                return (
                  <div key={faq._id} style={{
                    background: '#fff', borderRadius: 14, overflow: 'hidden', transition: 'all 0.25s',
                    border: isOpen ? '1.5px solid rgba(0,64,160,0.4)' : '1.5px solid #e8f0fc',
                    boxShadow: isOpen ? '0 8px 24px rgba(0,64,160,0.1)' : '0 1px 4px rgba(0,0,0,0.04)',
                  }}>
                    <button onClick={() => setOpenId(isOpen ? null : faq._id)} style={{
                      width: '100%', display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between', gap: 16,
                      padding: '18px 22px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                        <HelpCircle size={17} style={{ color: isOpen ? '#0040a0' : '#d1d5db', flexShrink: 0, marginTop: 1 }} />
                        <span style={{ fontSize: 15, fontWeight: 600, color: isOpen ? '#1a1a2e' : '#374151', lineHeight: 1.5 }}>
                          {faq.question}
                        </span>
                      </div>
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                        background: isOpen ? 'rgba(0,64,160,0.1)' : '#f3f4f6',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <ChevronDown size={16} style={{
                          color: isOpen ? '#0040a0' : '#9ca3af',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.25s',
                        }} />
                      </div>
                    </button>
                    <div style={{ maxHeight: isOpen ? 400 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                      <p style={{ margin: 0, padding: '0 22px 20px 51px', fontSize: 14.5, lineHeight: 1.8, color: '#64748b' }}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Show More / Show Less — only on All tab */}
            {isAllTab && filtered.length > ALL_INITIAL_LIMIT && (
              <div style={{ textAlign: 'center', marginTop: 28 }}>
                {hasMore ? (
                  <button
                    onClick={() => setVisibleCount(c => c + ALL_STEP)}
                    style={{
                      padding: '10px 28px', borderRadius: 999, cursor: 'pointer',
                      border: '1.5px solid #ccdaf5', background: '#fff',
                      color: '#0040a0', fontSize: 14, fontWeight: 600,
                      transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,64,160,0.08)',
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#0040a0'; e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#0040a0' }}
                  >
                    <ChevronDown size={16} />
                    Show More ({filtered.length - visibleCount} remaining)
                  </button>
                ) : isExpanded ? (
                  <button
                    onClick={() => { setVisibleCount(ALL_INITIAL_LIMIT); setOpenId(null) }}
                    style={{
                      padding: '10px 28px', borderRadius: 999, cursor: 'pointer',
                      border: '1.5px solid #ccdaf5', background: '#fff',
                      color: '#64748b', fontSize: 14, fontWeight: 600,
                      transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#374151' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#64748b' }}
                  >
                    <ChevronDown size={16} style={{ transform: 'rotate(180deg)' }} />
                    Show Less
                  </button>
                ) : null}
              </div>
            )}
          </>
        )}

        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 14 }}>Still have questions?</p>
          <a href="#contact" onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn-primary" style={{ display: 'inline-flex' }}>
            Contact Support →
          </a>
        </div>
      </div>
    </section>
  )
}
