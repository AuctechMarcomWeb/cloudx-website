import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const COMPANY   = 'Auctech Marketing Communication Pvt. Ltd.'
const PRODUCT   = 'School CloudX'
const EMAIL     = 'cloudxsupport@gmail.com'
const PHONE     = '+91 9838075493'
const ADDRESS   = 'Shaligram Building New, 167/101, Jiamau Rd, 1090 Chauraha, Hazratganj, Lucknow, Uttar Pradesh 226001'
const EFFECTIVE = 'June 1, 2025'

const s = {
  page:        { background: '#f9fafb', minHeight: '100vh', fontFamily: 'Lato, sans-serif' },
  hero:        { background: 'linear-gradient(135deg, #0b2040 0%, #0040a0 100%)', padding: '72px 0 48px', textAlign: 'center' },
  heroTitle:   { fontSize: 36, fontWeight: 800, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.5px' },
  heroSub:     { fontSize: 15, color: 'rgba(255,255,255,0.6)', margin: 0 },
  badge:       { display: 'inline-block', background: 'rgba(77,159,255,0.18)', border: '1px solid rgba(77,159,255,0.35)', color: '#4d9fff', borderRadius: 20, padding: '5px 16px', fontSize: 12.5, fontWeight: 600, letterSpacing: '0.4px', marginBottom: 18 },
  wrap:        { maxWidth: 820, margin: '0 auto', padding: '0 24px' },
  card:        { background: '#fff', borderRadius: 16, boxShadow: '0 2px 20px rgba(0,0,0,0.07)', padding: '48px 52px', margin: '48px 0' },
  h2:          { fontSize: 20, fontWeight: 800, color: '#0b2040', margin: '36px 0 10px', letterSpacing: '-0.2px' },
  h2first:     { fontSize: 20, fontWeight: 800, color: '#0b2040', margin: '0 0 10px', letterSpacing: '-0.2px' },
  p:           { fontSize: 15, lineHeight: 1.85, color: '#374151', margin: '0 0 14px' },
  ul:          { margin: '8px 0 14px', paddingLeft: 22 },
  li:          { fontSize: 15, lineHeight: 1.85, color: '#374151', marginBottom: 6 },
  divider:     { border: 'none', borderTop: '1px solid #e5e7eb', margin: '28px 0' },
  highlight:   { background: 'rgba(77,159,255,0.08)', border: '1px solid rgba(77,159,255,0.2)', borderRadius: 10, padding: '14px 18px', margin: '14px 0' },
  warnBox:     { background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: 10, padding: '14px 18px', margin: '14px 0' },
  toc:         { background: '#f0f6ff', borderRadius: 10, padding: '20px 24px', margin: '0 0 28px' },
  tocTitle:    { fontSize: 13, fontWeight: 700, color: '#0040a0', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' },
  tocLink:     { display: 'block', fontSize: 14, color: '#0040a0', textDecoration: 'none', marginBottom: 6, lineHeight: 1.6 },
  table:       { width: '100%', borderCollapse: 'collapse', margin: '14px 0', fontSize: 14 },
  th:          { background: '#0b2040', color: '#fff', padding: '10px 14px', textAlign: 'left', fontSize: 13 },
  td:          { padding: '10px 14px', borderBottom: '1px solid #e5e7eb', color: '#374151', verticalAlign: 'top' },
  tdAlt:       { padding: '10px 14px', borderBottom: '1px solid #e5e7eb', color: '#374151', background: '#f9fafb', verticalAlign: 'top' },
  contactBox:  { background: '#0b2040', borderRadius: 12, padding: '28px 32px', marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 24 },
  contactItem: { flex: '1 1 180px' },
  contactLabel:{ fontSize: 11.5, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 4 },
  contactVal:  { fontSize: 14, color: '#fff', fontWeight: 600 },
}

function Section({ id, title, first, children }) {
  return (
    <section id={id}>
      <h2 style={first ? s.h2first : s.h2}>{title}</h2>
      {children}
    </section>
  )
}

export default function RefundPolicyPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={s.page}>
      <Navbar />

      <div style={s.hero}>
        <div style={s.wrap}>
          <div style={s.badge}>Legal</div>
          <h1 style={s.heroTitle}>Refund &amp; Cancellation Policy</h1>
          <p style={s.heroSub}>Effective Date: {EFFECTIVE} &nbsp;·&nbsp; Last updated: {EFFECTIVE}</p>
        </div>
      </div>

      <div style={s.wrap}>
        <div style={s.card}>

          <div style={s.toc}>
            <div style={s.tocTitle}>Table of Contents</div>
            {[
              ['#overview',      '1. Overview'],
              ['#trial',         '2. Free Trial'],
              ['#eligibility',   '3. Refund Eligibility'],
              ['#nonrefundable', '4. Non-Refundable Cases'],
              ['#process',       '5. How to Request a Refund'],
              ['#timeline',      '6. Refund Timeline'],
              ['#cancellation',  '7. Cancellation Policy'],
              ['#contact',       '8. Contact Us'],
            ].map(([href, label]) => (
              <a key={href} href={href} style={s.tocLink}>{label}</a>
            ))}
          </div>

          <Section id="overview" title="1. Overview" first>
            <p style={s.p}>
              This Refund &amp; Cancellation Policy outlines the terms under which {COMPANY} ("{PRODUCT}") offers refunds for subscription fees. By subscribing to the Service, you agree to this policy. Please read it carefully before making any payment.
            </p>
          </Section>

          <hr style={s.divider} />

          <Section id="trial" title="2. Free Trial">
            <div style={s.highlight}>
              <p style={{ ...s.p, margin: 0 }}>
                {PRODUCT} offers a <strong>30-day free trial</strong> for new schools. No credit card or payment is required during the trial period. You can explore all features before committing to a paid plan.
              </p>
            </div>
            <p style={s.p}>
              The free trial is available once per institution. Creating multiple accounts to extend the trial period is not permitted and may result in account suspension.
            </p>
          </Section>

          <hr style={s.divider} />

          <Section id="eligibility" title="3. Refund Eligibility">
            <p style={s.p}>Refunds may be considered under the following circumstances:</p>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Scenario</th>
                  <th style={s.th}>Refund</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Duplicate payment made for the same subscription', 'Full refund of duplicate amount'],
                  ['Service unavailable for more than 72 consecutive hours due to our fault', 'Pro-rated refund for downtime period'],
                  ['Charged after valid cancellation was submitted', 'Full refund of incorrectly charged amount'],
                  ['Technical issue preventing access, unresolved within 7 days', 'Case-by-case review; partial or full refund'],
                ].map(([scenario, refund], i) => (
                  <tr key={i}>
                    <td style={i % 2 === 0 ? s.td : s.tdAlt}>{scenario}</td>
                    <td style={i % 2 === 0 ? s.td : s.tdAlt}>{refund}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <hr style={s.divider} />

          <Section id="nonrefundable" title="4. Non-Refundable Cases">
            <div style={s.warnBox}>
              <p style={{ ...s.p, margin: 0, fontWeight: 600 }}>The following are NOT eligible for refunds:</p>
            </div>
            <ul style={s.ul}>
              <li style={s.li}>Change of mind or decision not to use the Service after payment.</li>
              <li style={s.li}>Failure to cancel before the renewal date of an auto-renewing subscription.</li>
              <li style={s.li}>Partial use of a subscription period (e.g., mid-month cancellation).</li>
              <li style={s.li}>Accounts suspended or terminated due to violation of our Terms &amp; Conditions.</li>
              <li style={s.li}>Setup fees, onboarding fees, or any one-time charges.</li>
              <li style={s.li}>Requests made after 7 days from the billing date, except in eligible scenarios above.</li>
            </ul>
          </Section>

          <hr style={s.divider} />

          <Section id="process" title="5. How to Request a Refund">
            <p style={s.p}>To request a refund, contact us within 7 days of your billing date with the following details:</p>
            <ul style={s.ul}>
              <li style={s.li}>Registered school name and email address.</li>
              <li style={s.li}>Transaction ID or payment receipt number.</li>
              <li style={s.li}>Date of payment and amount.</li>
              <li style={s.li}>Reason for refund request.</li>
            </ul>
            <p style={s.p}>
              Send your request to: <a href={`mailto:${EMAIL}`} style={{ color: '#0040a0', fontWeight: 600 }}>{EMAIL}</a>
              &nbsp;or call us at&nbsp;
              <a href={`tel:${PHONE}`} style={{ color: '#0040a0', fontWeight: 600 }}>{PHONE}</a>
            </p>
            <p style={s.p}>
              We will acknowledge your request within 2 business days and communicate a decision within 7 business days.
            </p>
          </Section>

          <hr style={s.divider} />

          <Section id="timeline" title="6. Refund Timeline">
            <p style={s.p}>
              Once a refund is approved, the amount will be credited to the original payment method within:
            </p>
            <ul style={s.ul}>
              <li style={s.li}><strong>Credit/Debit Card:</strong> 5–10 business days (depending on your bank).</li>
              <li style={s.li}><strong>UPI / Net Banking:</strong> 3–5 business days.</li>
              <li style={s.li}><strong>Wallets:</strong> 1–3 business days.</li>
            </ul>
            <p style={s.p}>
              We are not responsible for delays caused by your bank or payment processor. If you do not receive the refund within the stated timeframe, please contact your bank before reaching out to us.
            </p>
          </Section>

          <hr style={s.divider} />

          <Section id="cancellation" title="7. Cancellation Policy">
            <p style={s.p}>
              You may cancel your subscription at any time:
            </p>
            <ul style={s.ul}>
              <li style={s.li}>Log in to your school portal and navigate to <strong>Settings → Subscription → Cancel Plan</strong>.</li>
              <li style={s.li}>Or email us at <a href={`mailto:${EMAIL}`} style={{ color: '#0040a0' }}>{EMAIL}</a> with your school details.</li>
            </ul>
            <p style={s.p}>
              Cancellation takes effect at the end of the current billing cycle. You retain access to the Service until that date. After cancellation, your data is retained for 30 days before permanent deletion, giving you time to export any records you need.
            </p>
            <div style={s.warnBox}>
              <p style={{ ...s.p, margin: 0 }}>
                <strong>Auto-renewal:</strong> Subscriptions auto-renew unless cancelled at least 24 hours before the renewal date. We send a renewal reminder 7 days in advance.
              </p>
            </div>
          </Section>

          <hr style={s.divider} />

          <Section id="contact" title="8. Contact Us">
            <p style={s.p}>For refund or cancellation queries, reach us at:</p>
            <div style={s.contactBox}>
              {[
                { label: 'Company', val: COMPANY },
                { label: 'Email',   val: EMAIL },
                { label: 'Phone',   val: PHONE },
                { label: 'Address', val: ADDRESS },
              ].map(({ label, val }) => (
                <div key={label} style={s.contactItem}>
                  <div style={s.contactLabel}>{label}</div>
                  <div style={s.contactVal}>{val}</div>
                </div>
              ))}
            </div>
          </Section>

        </div>
      </div>

      <Footer />
    </div>
  )
}
