import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from '../components/landing/HeroSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import HowItWorksSection from '../components/landing/HowItWorksSection'
import FAQSection from '../components/landing/FAQSection'
import CtaSection from '../components/landing/CtaSection'
import ParentsAppSection from '../components/landing/ParentsAppSection'

export default function LandingPage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />        {/* 1. Hero */}
      <FeaturesSection />    {/* 2. Features (tabs: Super Admin, School Admin, Teacher, Parents, Student, Staff) */}
      <HowItWorksSection />  {/* 3. Schools + 4. Why it is best */}
      <FAQSection />         {/* 5. FAQ */}
      <CtaSection />         {/* 6. Contact */}
      <ParentsAppSection />  {/* 7. App Download */}
      <Footer />
    </div>
  )
}
