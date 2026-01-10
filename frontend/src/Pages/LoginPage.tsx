import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { Mail, Lock, Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.error("Error logging in", err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded-lg shadow-md space-y-5">
        <h1 className="text-2xl font-bold text-center text-emerald-800">Welcome Back</h1>

        <Input icon={Mail} type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input icon={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <div>
            <Link to="/forgot-password" className="text-sm text-center text-emerald-600 hover:text-emerald-700">Forgot password?</Link>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <button type="submit" disabled={isLoading} className="w-full py-2 px-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
            {isLoading ? <Loader size={24} className="animate-spin mx-auto" /> : "Login"}
        </button>
        
        <div className="flex items-center justify-center border-t border-gray-200 pt-4">
            <p className="text-sm text-center">Don't have an account? <Link className="text-emerald-600 hover:text-emerald-700" to="/signup">Sign up</Link></p>
        </div>
    </form>
  )
}

export default LoginPage;