import React, { useState } from 'react';
import { User, Lock, Mail, ShieldCheck, ArrowRight, FileCheck, CheckCircle2, Sparkles } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (email: string) => void;
  onNavigate: (page: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [orderRef, setOrderRef] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(email);
    }, 700);
  };

  const handleDemoLogin = () => {
    setEmail('buyer@example.com');
    setOrderRef('VN-18917');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess('buyer@example.com');
    }, 600);
  };

  return (
    <div className="w-full min-h-screen bg-[#070b11] text-slate-100 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center animate-fadeIn">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-black mx-auto shadow-xl shadow-yellow-400/20">
            <User className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight pt-2">
            Access My Vehicle Reports
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Enter the email address used during Stripe or PayPal checkout to unseal your unlocked history reports.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#0e1522] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Purchase / Account Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="buyer@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-yellow-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Order Reference or VIN (Optional)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={orderRef}
                  onChange={(e) => setOrderRef(e.target.value.toUpperCase())}
                  placeholder="e.g. VN-18917 or 17-digit VIN"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white placeholder:text-slate-500 font-mono text-xs focus:outline-none focus:border-yellow-400 transition-colors uppercase"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-yellow-400/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              <span>ACCESS & RETRIEVE REPORTS</span>
            </button>
          </form>

          {/* Instant 1-Click Demo Fill */}
          <div className="pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>Instant Demo Account Sign-In</span>
            </button>
          </div>

          <div className="pt-2 text-center text-[11px] text-slate-500 space-y-1">
            <p>Your reports remain securely archived on our encrypted server for lifetime re-download.</p>
          </div>
        </div>

        {/* Security badges */}
        <div className="flex items-center justify-center gap-4 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            256-BIT SSL ENCRYPTED
          </span>
          <span>•</span>
          <span className="text-yellow-400">NMVTIS SECURE</span>
        </div>
      </div>
    </div>
  );
};
