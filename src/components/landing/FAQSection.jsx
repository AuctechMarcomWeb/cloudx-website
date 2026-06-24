import { useState, useEffect } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9001/api/'

export default function FAQSection() {
  const [faqs, setFaqs]         = useState([])
  const [loading, setLoading]   = useState(true)
  const [openId, setOpenId]     = useState(null)
  const [activeTab, setActiveTab] = useState('All')
  const [categories, setCategories] = useState(['All'])

  useEffect(() => {
    fetch(`${API}faq?isPagination=false`)
      .then(r => r.json())
      .then(res => {
        const list = res?.data?.faqs || []
        const activeFaqs = list.filter(f => f.isActive !== false)
        setFaqs(activeFaqs)
        const cats = ['All', ...new Set(activeFaqs.map(f => f.category).filter(Boolean))]
        setCategories(cats)
        if (activeFaqs.length) setOpenId(activeFaqs[0]._id)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = activeTab === 'All' ? faqs : faqs.filter(f => f.category === activeTab)

  return (
    <section id="faq" className="section">
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{
            fontSize: 13, fontWeight: 600, color: '#6366f1',
            letterSpacing: 2, textTransform: 'uppercase',
          }}>
            FAQ
          </span>
          <h2 style={{
            fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800,
            marginTop: 8, marginBottom: 16, color: '#fff',
          }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, maxWidth: 520, margin: '0 auto' }}>
            Everything you need to know about School CloudX.
            Can't find the answer? Contact our support team.
          </p>
        </div>

        {/* Category tabs */}
        {categories.length > 1 && (
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 8,
            justifyContent: 'center', marginBottom: 36,
          }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveTab(cat); setOpenId(null) }}
                style={{
                  padding: '7px 18px',
                  borderRadius: 999,
                  border: activeTab === cat
                    ? '1px solid #6366f1'
                    : '1px solid rgba(255,255,255,0.12)',
                  background: activeTab === cat
                    ? 'rgba(99,102,241,0.15)'
                    : 'rgba(255,255,255,0.04)',
                  color: activeTab === cat ? '#a5b4fc' : 'rgba(255,255,255,0.55)',
                  fontSize: 13, fontWeight: 500, cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.3)' }}>
            Loading FAQs...
          </div>
        )}

        {/* FAQ Accordion */}
        {!loading && (
          <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(255,255,255,0.3)' }}>
                No FAQs found in this category.
              </div>
            ) : (
              filtered.map((faq, i) => {
                const isOpen = openId === faq._id
                return (
                  <div
                    key={faq._id}
                    style={{
                      background: isOpen
                        ? 'rgba(99,102,241,0.08)'
                        : 'rgba(255,255,255,0.03)',
                      border: isOpen
                        ? '1px solid rgba(99,102,241,0.3)'
                        : '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 14,
                      overflow: 'hidden',
                      transition: 'all 0.25s',
                      animation: `fadeInUp 0.4s ease ${i * 0.04}s both`,
                    }}
                  >
                    {/* Question row */}
                    <button
                      onClick={() => setOpenId(isOpen ? null : faq._id)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between', gap: 16,
                        padding: '18px 22px', background: 'none',
                        border: 'none', cursor: 'pointer', textAlign: 'left',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                        <HelpCircle
                          size={16}
                          style={{
                            color: isOpen ? '#a5b4fc' : 'rgba(255,255,255,0.3)',
                            flexShrink: 0, marginTop: 2, transition: 'color 0.2s',
                          }}
                        />
                        <span style={{
                          fontSize: 15, fontWeight: 600,
                          color: isOpen ? '#fff' : 'rgba(255,255,255,0.82)',
                          lineHeight: 1.5, transition: 'color 0.2s',
                        }}>
                          {faq.question}
                        </span>
                      </div>
                      <ChevronDown
                        size={18}
                        style={{
                          color: 'rgba(255,255,255,0.4)', flexShrink: 0,
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.25s',
                        }}
                      />
                    </button>

                    {/* Answer */}
                    <div style={{
                      maxHeight: isOpen ? 400 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease',
                    }}>
                      <p style={{
                        margin: 0, padding: '0 22px 20px 50px',
                        fontSize: 14, lineHeight: 1.8,
                        color: 'rgba(255,255,255,0.6)',
                      }}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginBottom: 12 }}>
            Still have questions?
          </p>
          <a
            href="mailto:cloudxsupport@gmail.com"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 24px', borderRadius: 10,
              border: '1px solid rgba(99,102,241,0.4)',
              color: '#a5b4fc', fontSize: 14, fontWeight: 500,
              textDecoration: 'none', background: 'rgba(99,102,241,0.08)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.15)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.08)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)' }}
          >
            Contact Support →
          </a>
        </div>

      </div>
    </section>
  )
}
