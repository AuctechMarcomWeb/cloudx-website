import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const COMPANY   = 'Auctech Marketing Communication Pvt. Ltd.'
const PRODUCT   = 'School CloudX'
const EMAIL     = 'cloudxsupport@gmail.com'
const PHONE     = '+91 9838075493'
const ADDRESS   = 'Shaligram Building New, 167/101, Jiamau Rd, 1090 Chauraha, Hazratganj, Lucknow, Uttar Pradesh 226001'
const WEBSITE   = 'https://schoolcloudx.com'
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
  contactBox: {
    background: '#0b2040', borderRadius: 12, padding: '28px 32px', marginTop: 32,
    display: 'flex', flexWrap: 'wrap', gap: 24,
  },
  contactItem:{ flex: '1 1 180px' },
  contactLabel:{ fontSize: 11.5, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 4 },
  contactVal:  { fontSize: 14, color: '#fff', fontWeight: 600 },
  toc:        { background: '#f0f6ff', borderRadius: 10, padding: '20px 24px', margin: '0 0 28px' },
  tocTitle:   { fontSize: 13, fontWeight: 700, color: '#0040a0', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' },
  tocLink:    { display: 'block', fontSize: 14, color: '#0040a0', textDecoration: 'none', marginBottom: 6, lineHeight: 1.6 },
}

function Section({ id, title, first, children }) {
  return (
    <section id={id}>
      <h2 style={first ? s.h2first : s.h2}>{title}</h2>
      {children}
    </section>
  )
}

export default function PrivacyPolicyPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={s.page}>
      <Navbar />

      {/* Hero */}
      <div style={s.hero}>
        <div style={s.wrap}>
          <div style={s.badge}>Legal &amp; Privacy</div>
          <h1 style={s.heroTitle}>Privacy Policy</h1>
          <p style={s.heroSub}>Effective Date: {EFFECTIVE} &nbsp;·&nbsp; Last updated: {EFFECTIVE}</p>
        </div>
      </div>

      <div style={s.wrap}>
        <div style={s.card}>

          {/* Table of Contents */}
          <div style={s.toc}>
            <div style={s.tocTitle}>Table of Contents</div>
            {[
              ['#who',      '1. Who We Are'],
              ['#data',     '2. Information We Collect'],
              ['#use',      '3. How We Use Your Information'],
              ['#share',    '4. Sharing of Information'],
              ['#storage',  '5. Data Storage & Security'],
              ['#retain',   '6. Data Retention'],
              ['#rights',   '7. Your Rights'],
              ['#children', '8. Children\'s Privacy'],
              ['#cookies',  '9. Cookies & Tracking'],
              ['#third',    '10. Third-Party Services'],
              ['#delete',   '11. Account & Data Deletion'],
              ['#changes',  '12. Changes to This Policy'],
              ['#contact',  '13. Contact Us'],
            ].map(([href, label]) => (
              <a key={href} href={href} style={s.tocLink}>{label}</a>
            ))}
          </div>

          {/* Intro */}
          <Section id="intro" title="" first>
            <p style={s.p}>
              {PRODUCT} ("we", "our", or "us") is a product of <strong>{COMPANY}</strong>, a school management SaaS platform serving educational institutions across India. This Privacy Policy explains how we collect, use, disclose, and protect information when you use our website (<a href={WEBSITE} style={{ color: '#0040a0' }}>{WEBSITE}</a>), mobile applications (Android / iOS), and related services (collectively, the "Service").
            </p>
            <p style={s.p}>
              By accessing or using our Service, you agree to this Privacy Policy. If you do not agree, please discontinue use of our Service.
            </p>
          </Section>

          <hr style={s.divider} />

          <Section id="who" title="1. Who We Are">
            <p style={s.p}>
              {COMPANY} operates {PRODUCT}, a cloud-based school administration platform. Our registered address is:
            </p>
            <p style={{ ...s.p, fontStyle: 'italic' }}>{ADDRESS}</p>
          </Section>

          <hr style={s.divider} />

          <Section id="data" title="2. Information We Collect">
            <p style={s.p}>We collect information in the following ways:</p>

            <strong style={{ fontSize: 15, color: '#0b2040' }}>a. Information you provide directly</strong>
            <ul style={s.ul}>
              <li style={s.li}><strong>School administrators:</strong> school name, logo, address, board affiliation, administrator name, email, phone number, and payment details.</li>
              <li style={s.li}><strong>Teachers &amp; staff:</strong> name, email address, phone number, subject and class assignments, attendance records.</li>
              <li style={s.li}><strong>Students:</strong> name, roll number, class, date of birth, parent/guardian contact, attendance, marks, fee payment history, and homework submissions.</li>
              <li style={s.li}><strong>Parents / Guardians:</strong> name, phone number, email address, and relationship to student.</li>
            </ul>

            <strong style={{ fontSize: 15, color: '#0b2040' }}>b. Information collected automatically</strong>
            <ul style={s.ul}>
              <li style={s.li}>Device information (model, OS version, unique device identifiers).</li>
              <li style={s.li}>Log data (IP address, browser type, pages visited, time and date of access, crash reports).</li>
              <li style={s.li}>Usage analytics (feature interactions, session duration).</li>
              <li style={s.li}>Push notification tokens (for in-app notifications on mobile).</li>
            </ul>

            <strong style={{ fontSize: 15, color: '#0b2040' }}>c. Payment information</strong>
            <p style={s.p}>
              Subscription payments are processed through third-party payment gateways. We do not store full card numbers or CVV on our servers.
            </p>
          </Section>

          <hr style={s.divider} />

          <Section id="use" title="3. How We Use Your Information">
            <ul style={s.ul}>
              <li style={s.li}>Provide, operate, and improve the Service.</li>
              <li style={s.li}>Manage school accounts, student records, fee collections, and attendance.</li>
              <li style={s.li}>Send transactional communications (fee receipts, OTP verification, password resets).</li>
              <li style={s.li}>Send product updates, newsletters, and promotional offers (you may opt out anytime).</li>
              <li style={s.li}>Comply with legal obligations and resolve disputes.</li>
              <li style={s.li}>Detect and prevent fraud, abuse, and security incidents.</li>
              <li style={s.li}>Generate anonymised analytics and reports to improve the platform.</li>
            </ul>
          </Section>

          <hr style={s.divider} />

          <Section id="share" title="4. Sharing of Information">
            <p style={s.p}>We do not sell personal information. We may share data with:</p>
            <ul style={s.ul}>
              <li style={s.li}><strong>Service providers:</strong> cloud hosting (AWS / Google Cloud), payment processors, SMS/email delivery services — only as necessary to provide the Service.</li>
              <li style={s.li}><strong>Your school:</strong> school administrators can access data for all users enrolled under their institution.</li>
              <li style={s.li}><strong>Legal authorities:</strong> when required by law, court order, or to protect our rights.</li>
              <li style={s.li}><strong>Business transfers:</strong> in case of merger, acquisition, or sale of assets, user data may be transferred with appropriate notice.</li>
            </ul>
          </Section>

          <hr style={s.divider} />

          <Section id="storage" title="5. Data Storage &amp; Security">
            <p style={s.p}>
              Your data is stored on secure cloud servers located in India. We implement industry-standard security measures including:
            </p>
            <ul style={s.ul}>
              <li style={s.li}>TLS/SSL encryption for data in transit.</li>
              <li style={s.li}>Encrypted storage for sensitive fields (passwords are hashed with bcrypt).</li>
              <li style={s.li}>Role-based access control so users only see data they are authorised to access.</li>
              <li style={s.li}>Regular security audits and vulnerability assessments.</li>
            </ul>
            <p style={s.p}>
              Despite these measures, no system is 100% secure. In the event of a data breach, we will notify affected users as required by applicable law.
            </p>
          </Section>

          <hr style={s.divider} />

          <Section id="retain" title="6. Data Retention">
            <p style={s.p}>
              We retain personal data for as long as your school account is active, or as needed to provide the Service. After account deletion:
            </p>
            <ul style={s.ul}>
              <li style={s.li}>Operational data is deleted or anonymised within <strong>30 days</strong>.</li>
              <li style={s.li}>Backup copies may persist for up to <strong>90 days</strong> before permanent deletion.</li>
              <li style={s.li}>Financial/billing records are retained for <strong>7 years</strong> as required by Indian accounting laws.</li>
            </ul>
          </Section>

          <hr style={s.divider} />

          <Section id="rights" title="7. Your Rights">
            <p style={s.p}>Depending on your role (school admin, teacher, student, parent), you have the right to:</p>
            <ul style={s.ul}>
              <li style={s.li}><strong>Access</strong> the personal data we hold about you.</li>
              <li style={s.li}><strong>Correct</strong> inaccurate or incomplete information.</li>
              <li style={s.li}><strong>Delete</strong> your account and associated personal data (see Section 11).</li>
              <li style={s.li}><strong>Object</strong> to or restrict certain types of processing.</li>
              <li style={s.li}><strong>Withdraw consent</strong> for marketing communications at any time.</li>
              <li style={s.li}><strong>Data portability</strong> — receive a copy of your data in a machine-readable format.</li>
            </ul>
            <p style={s.p}>To exercise these rights, contact us at <a href={`mailto:${EMAIL}`} style={{ color: '#0040a0' }}>{EMAIL}</a>.</p>
          </Section>

          <hr style={s.divider} />

          <Section id="children" title="8. Children's Privacy">
            <div style={s.highlight}>
              <p style={{ ...s.p, margin: 0 }}>
                Our platform manages student records for school-going children, including minors under 13 years of age. This data is provided and controlled by the school institution, not directly by the child. Parents and guardians may contact their school administrator or us directly to access or delete a child's data.
              </p>
            </div>
          </Section>

          <hr style={s.divider} />

          <Section id="cookies" title="9. Cookies &amp; Tracking">
            <p style={s.p}>
              Our website uses cookies and similar technologies to maintain sessions, remember preferences, and analyse usage. You can control cookies through your browser settings. Disabling cookies may affect some functionality of the Service.
            </p>
          </Section>

          <hr style={s.divider} />

          <Section id="third" title="10. Third-Party Services">
            <p style={s.p}>The Service integrates with third-party services including but not limited to:</p>
            <ul style={s.ul}>
              <li style={s.li}><strong>Payment gateways</strong> (Razorpay / PayU) — governed by their own privacy policies.</li>
              <li style={s.li}><strong>Firebase</strong> — for push notifications on mobile apps.</li>
              <li style={s.li}><strong>Google Analytics / similar</strong> — for website usage analytics.</li>
            </ul>
            <p style={s.p}>We are not responsible for the privacy practices of third-party services. We encourage you to review their policies.</p>
          </Section>

          <hr style={s.divider} />

          <Section id="delete" title="11. Account &amp; Data Deletion">
            <div style={{ ...s.highlight, background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <p style={{ ...s.p, margin: 0 }}>
                You can request deletion of your account and all associated personal data at any time. See our dedicated{' '}
                <Link to="/account-deletion" style={{ color: '#0040a0', fontWeight: 600 }}>Account Deletion page</Link>{' '}
                for step-by-step instructions.
              </p>
            </div>
            <p style={s.p}>
              Upon verified deletion request, we will permanently delete your data within <strong>30 days</strong>, except where retention is required by law. You will receive an email confirmation once deletion is complete.
            </p>
          </Section>

          <hr style={s.divider} />

          <Section id="changes" title="12. Changes to This Policy">
            <p style={s.p}>
              We may update this Privacy Policy periodically. When we do, we will revise the "Last updated" date at the top and, for material changes, notify you via email or an in-app notification. Continued use of the Service after changes constitutes acceptance of the updated policy.
            </p>
          </Section>

          <hr style={s.divider} />

          <Section id="contact" title="13. Contact Us">
            <p style={s.p}>For privacy-related questions, requests, or complaints, reach us at:</p>
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
