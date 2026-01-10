import { Routes, Route } from 'react-router-dom'
import SignupPage from './components/SignupPage'
import LoginPage from './components/LoginPage'
import { EmailVerificationPage } from './components/EmailVerificationPage'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <Routes>
        <Route path="/" element={"home page"} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/email-verification" element={<EmailVerificationPage />} />
      </Routes>
    </div>
  )
}

export default App
