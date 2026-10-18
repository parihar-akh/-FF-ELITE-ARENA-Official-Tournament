import React from 'react';
import { MessageCircle, ShieldCheck, Mail, Phone, ExternalLink, Swords, Trophy, Heart } from 'lucide-react';
import { Logo } from './Logo';
import { PlatformSettings } from '../types';

interface FooterProps {
  settings: PlatformSettings;
  onNavigate: (view: string) => void;
  onOpenAdminLogin: () => void;
  onOpenTrackModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigate,
  onOpenAdminLogin,
  onOpenTrackModal,
}) => {
  return (
    <footer className="bg-[#07070a] border-t border-zinc-800 text-zinc-400 font-tech">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" showTagline={true} />
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              FF ELITE ARENA is India's premier competitive custom room tournament platform for Free Fire players. Dedicated to fair play, strict anti-cheat verification, and transparent kill and Booyah payouts.
            </p>
            <div className="text-xs text-zinc-500 font-bold">
              Tagline: <span className="text-zinc-300">"{settings.tagline}"</span>
            </div>

            {/* WhatsApp Community Quick Button */}
            <div className="pt-2">
              <a
                href={settings.whatsappCommunityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-950/60 border border-emerald-600/60 hover:border-emerald-500 text-emerald-300 text-xs font-bold uppercase tracking-wider transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Join Official WhatsApp Group</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-black text-sm uppercase text-white tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('home')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('tournaments')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  7 Daily Matches
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenTrackModal}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-amber-300"
                >
                  Check Room Pass
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('leaderboard')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  Hall of Champions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('results')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  Match Results & Payouts
                </button>
              </li>
            </ul>
          </div>

          {/* Rules & Fair Play */}
          <div className="space-y-3">
            <h4 className="font-heading font-black text-sm uppercase text-white tracking-wider">
              Tournament Policies
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('rules')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  Fair Play & Anti-Cheat
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('rules')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  Entry Fee & Kill Rewards
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('rules')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  100% Refund Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('rules')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  Screenshot Kill Proof
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenAdminLogin}
                  className="text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
                >
                  Admin Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-3">
            <h4 className="font-heading font-black text-sm uppercase text-white tracking-wider">
              Player Helpdesk
            </h4>
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="text-zinc-300 font-bold">
                Owner: <span className="text-amber-400">{settings.ownerName || 'Akash Singh Parihar'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <a 
                  href={`https://wa.me/918103547416`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  WhatsApp: {settings.adminWhatsappNumber}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-red-400" />
                <a 
                  href={`mailto:${settings.adminEmail || 'aakashparihar000@gmail.com'}`}
                  className="hover:text-red-400 transition-colors"
                >
                  {settings.adminEmail || 'aakashparihar000@gmail.com'}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Referee Desk: 10 AM - 12 AM</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] text-zinc-500 block uppercase font-bold">Accepted UPI:</span>
              <span className="text-zinc-300 text-xs font-mono">{settings.upiId}</span>
              <span className="text-[10px] text-zinc-500 block">Payee: {settings.upiMerchantName}</span>
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-zinc-800/80 text-[11px] text-zinc-500 space-y-2 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} FF ELITE ARENA • Owned & Operated by <span className="text-zinc-300 font-semibold">{settings.ownerName || 'Akash Singh Parihar'}</span>. All rights reserved.
          </div>
          <div className="text-[10px] text-zinc-600 max-w-md text-center sm:text-right">
            Disclaimer: FF ELITE ARENA is an independent community esports tournament organizer and is not affiliated with, endorsed by, or sponsored by Garena or Free Fire.
          </div>
        </div>
      </div>
    </footer>
  );
};
