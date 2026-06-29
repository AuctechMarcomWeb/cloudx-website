import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { PortalAuthProvider } from './context/PortalAuthContext'
import LandingPage from './pages/LandingPage'
import OnboardingPage from './pages/onboarding/OnboardingPage'
import MyPlanPage from './pages/MyPlanPage'
import PortalLoginPage from './pages/portal/PortalLoginPage'
import PortalDashboard from './pages/portal/PortalDashboard'

export default function App() {
  return (
    <PortalAuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#0b2040',
              color: '#fff',
              border: '1px solid rgba(250,191,34,0.25)',
              borderRadius: '10px',
              fontSize: '14px',
              fontFamily: "'Lato', sans-serif",
            },
            success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
            error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />
        <Routes>
          <Route path="/"                   element={<LandingPage />} />
          <Route path="/register"           element={<OnboardingPage />} />
          <Route path="/register/:step"     element={<OnboardingPage />} />
          <Route path="/my-plan"            element={<MyPlanPage />} />
          <Route path="/portal/login"       element={<PortalLoginPage />} />
          <Route path="/portal/dashboard"   element={<PortalDashboard />} />
        </Routes>
      </BrowserRouter>
    </PortalAuthProvider>
  )
}
