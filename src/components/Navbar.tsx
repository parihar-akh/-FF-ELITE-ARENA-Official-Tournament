import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  MessageCircle, 
  ShieldAlert, 
  KeyRound, 
  Trophy, 
  Swords, 
  BookOpen, 
  HelpCircle,
  Search,
  ExternalLink
} from 'lucide-react';
import { Logo } from './Logo';
import { PlatformSettings } from '../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  settings: PlatformSettings;
  onOpenTrackModal: () => void;
  onOpenAdminLogin: () => void;
  isAdminLoggedIn: boolean;
  onLogoutAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  settings,
  onOpenTrackModal,
  onOpenAdminLogin,
  isAdminLoggedIn,
  onLogoutAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'tournaments', label: 'Tournaments' },
    { id: 'rules', label: 'Rules & Fair Play' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'results', label: 'Results & Winners' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c0d12]/95 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Logo size="md" showTagline={true} />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 font-heading font-semibold text-sm uppercase tracking-wider transition-all duration-200 rounded-md relative cursor-pointer ${
                    isActive
                      ? 'text-red-500 font-bold'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/40'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-red-600 to-amber-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-3">
            {/* Find Room Pass / Check Status button */}
            <button
              onClick={onOpenTrackModal}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-tech font-bold uppercase tracking-wider text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded transition-all hover:border-zinc-500 cursor-pointer"
              title="Lookup your Registration status, Room ID & Password"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span>Room Pass</span>
            </button>

            {/* WhatsApp Community Button */}
            <a
              href={settings.whatsappCommunityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-tech font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-600/50 rounded transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-500/20" />
              <span className="hidden xl:inline">WhatsApp Community</span>
              <span className="xl:hidden">Community</span>
            </a>

            {/* Admin Portal Button */}
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleNavClick('admin')}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-tech font-bold uppercase tracking-wider text-amber-400 bg-amber-950/40 border border-amber-600/50 rounded hover:bg-amber-900/50 transition-colors cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Panel</span>
                </button>
                <button
                  onClick={onLogoutAdmin}
                  className="text-xs text-zinc-400 hover:text-zinc-200 px-2 py-1 underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-tech text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 rounded transition-colors cursor-pointer"
                title="Admin Authentication"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            )}

            {/* Register Now Header CTA */}
            <button
              onClick={() => handleNavClick('tournaments')}
              className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 rounded clip-angled-sm shadow-lg shadow-red-900/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Swords className="w-4 h-4 text-amber-200" />
              <span>Register Now</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenTrackModal}
              className="p-2 text-xs font-tech font-bold text-amber-400 bg-zinc-900 border border-zinc-800 rounded flex items-center gap-1"
            >
              <Search className="w-4 h-4" />
              <span>Pass</span>
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-md focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-4 py-2.5 rounded font-heading text-base font-semibold tracking-wide uppercase flex items-center justify-between ${
                    isActive
                      ? 'bg-red-950/50 text-red-400 border-l-4 border-red-600 font-bold'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="text-xs text-red-500 font-tech">ACTIVE</span>}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrackModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 rounded font-tech text-xs uppercase font-bold tracking-wider"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span>Lookup My Room ID & Password</span>
            </button>

            <a
              href={settings.whatsappCommunityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-950/60 border border-emerald-600/60 text-emerald-300 rounded font-tech text-xs uppercase font-bold tracking-wider"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Join WhatsApp Community</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (isAdminLoggedIn) {
                  onNavigate('admin');
                } else {
                  onOpenAdminLogin();
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 rounded font-tech text-xs"
            >
              <KeyRound className="w-4 h-4" />
              <span>{isAdminLoggedIn ? 'Open Admin Dashboard' : 'Admin Login'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
