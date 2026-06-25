import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from '../components/landing/HeroSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import ParentsAppSection from '../components/landing/ParentsAppSection'
import HowItWorksSection from '../components/landing/HowItWorksSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import FAQSection from '../components/landing/FAQSection'
import CtaSection from '../components/landing/CtaSection'

export default function LandingPage() {
  return (
    <div style={{ background:'#fff', minHeight:'100vh' }}>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ParentsAppSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <CtaSection />
      <Footer />
    </div>
  )
}
