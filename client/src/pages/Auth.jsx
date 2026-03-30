import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', password: '' });
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) await login(form);
      else await signup(form);
    } catch (err) {
      // sonner handles this in AuthContext
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#050505] text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black tracking-tighter italic mb-2">PULSE.</h2>
          <p className="text-white/40 text-xs uppercase tracking-widest">
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-white/40 outline-none transition-all placeholder:text-white/20"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-white/40 outline-none transition-all placeholder:text-white/20"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all mt-4"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-white/40 hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            {isLogin ? "New here? Create an account" : "Already have an account? Log in"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}