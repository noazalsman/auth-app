import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Loader } from "lucide-react";
import Input from "./Input";
import { PasswordStrengthSection } from "./PasswordStrength/PasswordStrengthSection";
import { useAuthStore } from "../store/authStore";

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error } = useAuthStore();
  const isLoading =  true;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      navigate("/email-verification");
    } catch (error) {
      console.error("Error signing up", error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded-lg shadow-md space-y-5">
        <h1 className="text-2xl font-bold text-center text-emerald-800">Create Account</h1>

        <Input icon={User} type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input icon={Mail} type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input icon={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <PasswordStrengthSection password={password} />

        <button type="submit" disabled={isLoading} className="w-full py-2 px-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
            {isLoading ? <Loader size={24} className="animate-spin mx-auto" /> : "Sign Up"}
        </button>

        <div className="flex items-center justify-center border-t border-gray-200 pt-4">
            <p className="text-sm text-center">Already have an account? <Link className="text-emerald-600 hover:text-emerald-700" to="/login">Login</Link></p>
        </div>
    </form>
  )
}

export default SignupPage;