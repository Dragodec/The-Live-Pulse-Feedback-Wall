import React, { useEffect } from 'react';
import { Toaster } from 'sonner';
import Lenis from 'lenis';
import { AuthProvider, useAuth } from './context/AuthContext';
import VibeForm from './components/VibeForm';
import Feed from './components/Feed';
import Auth from './pages/Auth';

function Layout() {
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    // Smooth scrolling for high-end desktop feel
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#050505]">
      <div className="w-8 h-8 border-2 border-white/10 border-t-white rounded-full animate-spin" />
    </div>
  );

  if (!user) return <Auth />;

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      {/* Dynamic Mobile-Ready Nav */}
      <nav className="sticky top-0 z-50 p-4 md:p-6 flex justify-between items-center backdrop-blur-xl bg-black/20 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-black text-xl tracking-tighter italic">PULSE.</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-white/40 text-xs font-mono uppercase tracking-widest">
            {user.username}
          </span>
          <button 
            onClick={logout} 
            className="text-[10px] font-bold uppercase tracking-widest border border-white/10 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all"
          >
            Logout
          </button>
        </div>
      </nav>

      <header className="pt-12 pb-8 text-center px-4">
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">
          VIBE WALL
        </h1>
        <p className="text-white/30 text-xs md:text-sm uppercase tracking-[0.4em] max-w-xs mx-auto">
          Connected to local mesh
        </p>
      </header>

      <main className="relative z-10">
        <VibeForm />
        <div className="h-px w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />
        <Feed />
      </main>

      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-0" />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="bottom-right" richColors theme="dark" />
      <Layout />
    </AuthProvider>
  );
}