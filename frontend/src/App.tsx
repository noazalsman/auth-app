import { Routes, Route } from 'react-router-dom'
import SignupPage from './components/SignUpPage'
import LoginPage from './components/LoginPage'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <Routes>
        <Route path="/" element={"home page"} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App
