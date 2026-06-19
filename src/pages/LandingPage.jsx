import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from '../components/landing/HeroSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import PricingSection from '../components/landing/PricingSection'
import HowItWorksSection from '../components/landing/HowItWorksSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import CtaSection from '../components/landing/CtaSection'

export default function LandingPage() {
  return (
    <div style={{ background: '#021a3a', minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </div>
  )
}
