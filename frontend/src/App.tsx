import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import SignupPage from './Pages/SignupPage'
import LoginPage from './Pages/LoginPage'
import { EmailVerificationPage } from './Pages/EmailVerificationPage'
import { useAuthStore } from './store/authStore'
import DashboardPage from './Pages/DashboardPage'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/email-verification" replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      {isCheckingAuth ? <Loader size={24} className="animate-spin mx-auto" /> : (
        <Routes>
          <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/signup" element={<RedirectAuthenticatedUser><SignupPage /></RedirectAuthenticatedUser>} />
          <Route path="/login" element={<RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser>} />
          <Route path="/email-verification" element={<EmailVerificationPage />} />
        </Routes>
      )}
      <Toaster />
    </div>
  )
}

export default App
