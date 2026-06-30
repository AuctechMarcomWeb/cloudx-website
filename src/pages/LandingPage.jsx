import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from '../components/landing/HeroSection'
import StatsSection from '../components/landing/StatsSection'
import TrustedStrip from '../components/landing/TrustedStrip'
import FeaturesSection from '../components/landing/FeaturesSection'
import WhyUsSection from '../components/landing/WhyUsSection'
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
      <WhyUsSection />         {/* 5. Why Schools Choose Us */}
      <TestimonialsSection />  {/* 7. Testimonials carousel */}
      <FAQSection />           {/* 8. FAQ */}
      <CtaSection />           {/* 9. Contact */}
      <ParentsAppSection />    {/* 10. App Download */}
      <Footer />
    </div>
  )
}
