import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LandingPage from './pages/LandingPage'
import OnboardingPage from './pages/onboarding/OnboardingPage'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1e2538',
            color: '#fff',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: '10px',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
      <Routes>
        <Route path="/"                element={<LandingPage />} />
        <Route path="/register"        element={<OnboardingPage />} />
        <Route path="/register/:step"  element={<OnboardingPage />} />
      </Routes>
    </BrowserRouter>
  )
}
