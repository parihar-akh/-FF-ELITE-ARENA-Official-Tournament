import React, { useState } from 'react';
import { X, Lock, KeyRound, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import { StorageService } from '../services/storage';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  if (!isOpen) return null;

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Default demo credentials
  const DEMO_PASSWORD = 'admin';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      // In this prototype, we check the admin credentials
      if (password === DEMO_PASSWORD || password === 'FFElite@2026' || password === 'admin123') {
        StorageService.setAdminLoggedIn(true);
        setLoading(false);
        onLoginSuccess();
        onClose();
      } else {
        setLoading(false);
        setError('Incorrect admin password. (Hint: use demo password "admin")');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-[#0f1017] border border-red-900/50 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-950 via-zinc-950 to-zinc-900 px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-tech uppercase tracking-wider text-red-400 font-bold block">
                SECURITY GATEWAY
              </span>
              <h2 className="text-xl font-heading font-black text-white">
                ADMIN CONSOLE LOGIN
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleLogin} className="p-6 space-y-5">
          <p className="text-xs font-tech text-zinc-400 leading-relaxed">
            Restricted zone. Only authorized tournament referees and desk administrators can manage room credentials, approve UTR payments, and disburse prize records.
          </p>

          <div>
            <label className="block text-xs font-tech text-zinc-300 uppercase tracking-wider font-semibold mb-1.5">
              Enter Admin Password or Master Passkey:
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
              <input
                type="password"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 font-tech focus:outline-none focus:border-red-500"
              />
            </div>
            {error && (
              <span className="text-xs text-red-400 mt-1.5 block font-tech">{error}</span>
            )}
          </div>

          {/* Quick Demo Helper */}
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-3 text-xs font-tech text-zinc-400 flex items-center justify-between">
            <div>
              <span className="text-zinc-500 block text-[10px]">EVALUATION CREDENTIAL:</span>
              <span className="text-amber-400 font-bold">Password: admin</span>
            </div>
            <button
              type="button"
              onClick={() => setPassword('admin')}
              className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[11px] cursor-pointer"
            >
              Fill Demo Key
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-heading font-black uppercase tracking-wider text-sm rounded-xl shadow-lg shadow-red-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Unlock Admin Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
