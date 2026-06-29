import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from '../components/landing/HeroSection'
import StatsSection from '../components/landing/StatsSection'
import TrustedStrip from '../components/landing/TrustedStrip'
import FeaturesSection from '../components/landing/FeaturesSection'
import HowItWorksSection from '../components/landing/HowItWorksSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import FAQSection from '../components/landing/FAQSection'
import CtaSection from '../components/landing/CtaSection'
import ParentsAppSection from '../components/landing/ParentsAppSection'

export default function LandingPage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />          {/* 1. Hero */}
      <TrustedStrip />         {/* 2. Trusted by schools strip */}
      <StatsSection />         {/* 3. Animated stats */}
      <FeaturesSection />      {/* 4. Features panels */}
      <HowItWorksSection />    {/* 5. Why it is best */}
      <TestimonialsSection />  {/* 6. Testimonials carousel */}
      <FAQSection />           {/* 7. FAQ */}
      <CtaSection />           {/* 8. Contact */}
      <ParentsAppSection />    {/* 9. App Download */}
      <Footer />
    </div>
  )
}
