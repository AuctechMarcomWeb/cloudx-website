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
  page:       { background: '#f9fafb', minHeight: '100vh', fontFamily: 'Lato, sans-serif' },
  hero:       { background: 'linear-gradient(135deg, #0b2040 0%, #0040a0 100%)', padding: '72px 0 48px', textAlign: 'center' },
  heroTitle:  { fontSize: 36, fontWeight: 800, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.5px' },
  heroSub:    { fontSize: 15, color: 'rgba(255,255,255,0.6)', margin: 0 },
  badge:      {
    display: 'inline-block', background: 'rgba(77,159,255,0.18)', border: '1px solid rgba(77,159,255,0.35)',
    color: '#4d9fff', borderRadius: 20, padding: '5px 16px', fontSize: 12.5, fontWeight: 600,
    letterSpacing: '0.4px', marginBottom: 18,
  },
  wrap:       { maxWidth: 820, margin: '0 auto', padding: '0 24px' },
  card:       { background: '#fff', borderRadius: 16, boxShadow: '0 2px 20px rgba(0,0,0,0.07)', padding: '48px 52px', margin: '48px 0' },
  h2:         { fontSize: 20, fontWeight: 800, color: '#0b2040', margin: '36px 0 10px', letterSpacing: '-0.2px' },
  h2first:    { fontSize: 20, fontWeight: 800, color: '#0b2040', margin: '0 0 10px', letterSpacing: '-0.2px' },
  p:          { fontSize: 15, lineHeight: 1.85, color: '#374151', margin: '0 0 14px' },
  ul:         { margin: '8px 0 14px', paddingLeft: 22 },
  li:         { fontSize: 15, lineHeight: 1.85, color: '#374151', marginBottom: 6 },
  divider:    { border: 'none', borderTop: '1px solid #e5e7eb', margin: '28px 0' },
  highlight:  { background: 'rgba(77,159,255,0.08)', border: '1px solid rgba(77,159,255,0.2)', borderRadius: 10, padding: '14px 18px', margin: '14px 0' },
  toc:        { background: '#f0f6ff', borderRadius: 10, padding: '20px 24px', margin: '0 0 28px' },
  tocTitle:   { fontSize: 13, fontWeight: 700, color: '#0040a0', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' },
  tocLink:    { display: 'block', fontSize: 14, color: '#0040a0', textDecoration: 'none', marginBottom: 6, lineHeight: 1.6 },
  contactBox: { background: '#0b2040', borderRadius: 12, padding: '28px 32px', marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 24 },
  contactItem:{ flex: '1 1 180px' },
  contactLabel:{ fontSize: 11.5, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 4 },
  contactVal: { fontSize: 14, color: '#fff', fontWeight: 600 },
}

function Section({ id, title, first, children }) {
  return (
    <section id={id}>
      <h2 style={first ? s.h2first : s.h2}>{title}</h2>
      {children}
    </section>
  )
}

export default function TermsPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={s.page}>
      <Navbar />

      {/* Hero */}
      <div style={s.hero}>
        <div style={s.wrap}>
          <div style={s.badge}>Legal</div>
          <h1 style={s.heroTitle}>Terms &amp; Conditions</h1>
          <p style={s.heroSub}>Effective Date: {EFFECTIVE} &nbsp;·&nbsp; Last updated: {EFFECTIVE}</p>
        </div>
      </div>

      <div style={s.wrap}>
        <div style={s.card}>

          {/* TOC */}
          <div style={s.toc}>
            <div style={s.tocTitle}>Table of Contents</div>
            {[
              ['#acceptance',   '1. Acceptance of Terms'],
              ['#service',      '2. Description of Service'],
              ['#accounts',     '3. Account Registration'],
              ['#conduct',      '4. Acceptable Use'],
              ['#intellectual', '5. Intellectual Property'],
              ['#data',         '6. Data & Privacy'],
              ['#payment',      '7. Subscription & Payment'],
              ['#termination',  '8. Termination'],
              ['#disclaimer',   '9. Disclaimers'],
              ['#liability',    '10. Limitation of Liability'],
              ['#governing',    '11. Governing Law'],
              ['#changes',      '12. Changes to These Terms'],
              ['#contact',      '13. Contact Us'],
            ].map(([href, label]) => (
              <a key={href} href={href} style={s.tocLink}>{label}</a>
            ))}
          </div>

          <Section id="acceptance" title="1. Acceptance of Terms" first>
            <p style={s.p}>
              By accessing or using {PRODUCT} (the "Service"), provided by <strong>{COMPANY}</strong>, you agree to be bound by these Terms &amp; Conditions ("Terms"). If you are registering on behalf of a school or institution, you represent that you have the authority to bind that entity. If you do not agree to these Terms, do not use the Service.
            </p>
          </Section>

          <hr style={s.divider} />

          <Section id="service" title="2. Description of Service">
            <p style={s.p}>
              {PRODUCT} is a cloud-based school management platform that provides tools for student administration, attendance tracking, fee management, examinations, homework, timetables, announcements, communication, and related functions. The Service is offered on a subscription basis and includes web and mobile application access.
            </p>
          </Section>

          <hr style={s.divider} />

          <Section id="accounts" title="3. Account Registration">
            <ul style={s.ul}>
              <li style={s.li}>You must provide accurate, complete, and current information during registration.</li>
              <li style={s.li}>You are responsible for maintaining the confidentiality of your login credentials.</li>
              <li style={s.li}>You are responsible for all activities that occur under your account.</li>
              <li style={s.li}>You must notify us immediately at <a href={`mailto:${EMAIL}`} style={{ color: '#0040a0' }}>{EMAIL}</a> if you suspect any unauthorised use of your account.</li>
              <li style={s.li}>Accounts may not be shared between multiple institutions without prior written consent.</li>
            </ul>
          </Section>

          <hr style={s.divider} />

          <Section id="conduct" title="4. Acceptable Use">
            <p style={s.p}>You agree not to:</p>
            <ul style={s.ul}>
              <li style={s.li}>Use the Service for any unlawful purpose or in violation of any applicable law.</li>
              <li style={s.li}>Upload or transmit harmful, offensive, defamatory, or malicious content.</li>
              <li style={s.li}>Attempt to gain unauthorised access to any part of the Service or its related systems.</li>
              <li style={s.li}>Reverse-engineer, decompile, or disassemble any part of the Service.</li>
              <li style={s.li}>Use automated tools (bots, scrapers) to access or interact with the Service.</li>
              <li style={s.li}>Resell, sublicense, or commercially exploit the Service without authorisation.</li>
              <li style={s.li}>Interfere with or disrupt the integrity or performance of the Service.</li>
            </ul>
          </Section>

          <hr style={s.divider} />

          <Section id="intellectual" title="5. Intellectual Property">
            <p style={s.p}>
              All content, features, source code, branding, logos, and technology that form the Service are owned by {COMPANY} or its licensors and are protected by applicable intellectual property laws.
            </p>
            <p style={s.p}>
              We grant you a limited, non-exclusive, non-transferable, revocable licence to access and use the Service solely for your institution's internal educational management purposes.
            </p>
            <p style={s.p}>
              You retain ownership of data you upload to the Service (student records, school data, etc.). By uploading, you grant us a limited licence to process that data solely to provide the Service.
            </p>
          </Section>

          <hr style={s.divider} />

          <Section id="data" title="6. Data &amp; Privacy">
            <div style={s.highlight}>
              <p style={{ ...s.p, margin: 0 }}>
                Our collection and use of personal information is governed by our{' '}
                <a href="/privacy-policy" style={{ color: '#0040a0', fontWeight: 600 }}>Privacy Policy</a>,
                which is incorporated into these Terms by reference.
              </p>
            </div>
            <p style={s.p}>
              You, as the school administrator, are the data controller for student and staff personal data processed through the Service. We act as a data processor on your behalf. You are responsible for ensuring lawful grounds for processing under applicable data protection laws.
            </p>
          </Section>

          <hr style={s.divider} />

          <Section id="payment" title="7. Subscription &amp; Payment">
            <ul style={s.ul}>
              <li style={s.li}>The Service is offered on a subscription basis. Pricing details are available on our website.</li>
              <li style={s.li}>A <strong>30-day free trial</strong> is available. No payment is required during the trial period.</li>
              <li style={s.li}>Subscription fees are billed in advance. Payments are non-refundable except as specified in our Refund &amp; Cancellation Policy.</li>
              <li style={s.li}>We reserve the right to change pricing with 30 days' prior notice.</li>
              <li style={s.li}>Failure to pay may result in suspension or termination of your account.</li>
            </ul>
          </Section>

          <hr style={s.divider} />

          <Section id="termination" title="8. Termination">
            <p style={s.p}>
              You may cancel your subscription at any time from your account portal or by contacting us. We may suspend or terminate your account if you violate these Terms or fail to pay subscription fees.
            </p>
            <p style={s.p}>
              Upon termination, your access to the Service will cease. We will retain your data for 30 days post-termination, after which it will be permanently deleted (except records required to be retained by law).
            </p>
          </Section>

          <hr style={s.divider} />

          <Section id="disclaimer" title="9. Disclaimers">
            <p style={s.p}>
              The Service is provided "as is" and "as available" without warranties of any kind, express or implied. We do not warrant that the Service will be uninterrupted, error-free, or completely secure. We disclaim all warranties including merchantability, fitness for a particular purpose, and non-infringement, to the maximum extent permitted by applicable law.
            </p>
          </Section>

          <hr style={s.divider} />

          <Section id="liability" title="10. Limitation of Liability">
            <p style={s.p}>
              To the fullest extent permitted by law, {COMPANY} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of or inability to use the Service.
            </p>
            <p style={s.p}>
              Our total aggregate liability for any claims arising under these Terms shall not exceed the amount paid by you in the 12 months preceding the claim.
            </p>
          </Section>

          <hr style={s.divider} />

          <Section id="governing" title="11. Governing Law">
            <p style={s.p}>
              These Terms are governed by and construed in accordance with the laws of India. Any disputes arising from or relating to these Terms or the Service shall be subject to the exclusive jurisdiction of the courts in <strong>Lucknow, Uttar Pradesh, India</strong>.
            </p>
          </Section>

          <hr style={s.divider} />

          <Section id="changes" title="12. Changes to These Terms">
            <p style={s.p}>
              We reserve the right to modify these Terms at any time. When we make material changes, we will notify you by email or through an in-app notice at least 7 days before the changes take effect. Continued use of the Service after the effective date constitutes acceptance of the revised Terms.
            </p>
          </Section>

          <hr style={s.divider} />

          <Section id="contact" title="13. Contact Us">
            <p style={s.p}>For questions or concerns about these Terms, contact us at:</p>
            <div style={s.contactBox}>
              {[
                { label: 'Company',  val: COMPANY },
                { label: 'Product',  val: PRODUCT },
                { label: 'Email',    val: EMAIL },
                { label: 'Phone',    val: PHONE },
                { label: 'Address',  val: ADDRESS },
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
