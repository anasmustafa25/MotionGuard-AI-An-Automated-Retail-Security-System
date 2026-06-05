import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield,Eye, Mail, Lock, UserPlus, LogIn, ArrowRight } from "lucide-react";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp) {
      // SIGN UP LOGIC
      const userData = { email, password, name };
      localStorage.setItem("registeredUser", JSON.stringify(userData));
      
      // Automatic Transition: Switch back to login mode so they can sign in
      alert("Registration successful! Please sign in with your new credentials.");
      setIsSignUp(false); 
      setPassword(""); // Clear password for security
    } else {
      // LOGIN LOGIC
      const savedUser = JSON.parse(localStorage.getItem("registeredUser") || "{}");

      if (savedUser.email === email && savedUser.password === password) {
        localStorage.setItem("isAuthenticated", "true");
        // Forces a full reload to update the Navbar visibility immediately
        window.location.href = "/"; 
      } else {
        alert("Invalid email or password. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      {/* Background Decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-50 blur-[120px]" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-50 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-[450px]">
        <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden p-8 md:p-12">
          
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 mb-6">
              <Eye className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              MotionGuard <span className="text-blue-600">AI</span>
            </h1>
            <p className="text-slate-500 mt-2 text-sm leading-relaxed">
              {isSignUp 
                ? "Join MotionGuard AI to start monitoring your retail security." 
                : "Enter your credentials to access the security dashboard."}
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                <input 
                  type="text" required value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                  placeholder="Enter your name"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input 
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                  placeholder="admin@motionguard.ai"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input 
                  type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 group shadow-lg shadow-slate-200"
            >
              {isSignUp ? <><UserPlus size={20}/> Register Account</> : <><LogIn size={20}/> Sign In</>}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Toggle Footer */}
          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors"
            >
              {isSignUp 
                ? "Already have an account? Sign in here" 
                : "Don't have an account? Create one now"}
            </button>
          </div>
        </div>

        <p className="text-center text-slate-400 text-xs mt-8">
          &copy; 2026 MotionGuard AI Security Systems. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Auth;