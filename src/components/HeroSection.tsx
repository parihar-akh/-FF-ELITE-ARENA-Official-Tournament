import React, { useState, useEffect } from 'react';
import { 
  Swords, 
  Trophy, 
  Flame, 
  ShieldCheck, 
  MessageCircle, 
  Clock, 
  Users, 
  Search, 
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { PlatformSettings, Tournament } from '../types';

interface HeroSectionProps {
  settings: PlatformSettings;
  upcomingTournament?: Tournament;
  onRegisterClick: () => void;
  onViewTournamentsClick: () => void;
  onOpenTrackModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  settings,
  upcomingTournament,
  onRegisterClick,
  onViewTournamentsClick,
  onOpenTrackModal,
}) => {
  // Simple countdown simulator
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-radial-vignette pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-zinc-800/80">
      
      {/* Background Cyber Grid & Glow Lights */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Tag Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-600/50 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs font-tech font-bold uppercase tracking-wider text-red-200">
              INDIA'S PREMIER FREE FIRE ESPORTS
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-tech text-amber-400">
            <Trophy className="w-3.5 h-3.5" />
            <span>₹30 ENTRY • ₹115 BOOYAH • ₹15/KILL</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black tracking-tight text-white uppercase italic leading-[1.05]">
            INDIA'S NEXT BATTLE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-500 drop-shadow-[0_4px_25px_rgba(220,38,38,0.5)]">
              STARTS HERE
            </span>
          </h1>

          <p className="text-base sm:text-xl text-zinc-300 font-tech max-w-2xl mx-auto leading-relaxed">
            Join competitive custom room tournaments, showcase your skills, and compete for rewards. Daily verified matches, zero emulators, and instant room credentials.
          </p>

          <p className="text-xs sm:text-sm font-tech text-amber-400/90 tracking-widest uppercase font-semibold">
            "{settings.tagline}"
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8 max-w-xl mx-auto">
          {/* Register Now */}
          <button
            onClick={onRegisterClick}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-600 via-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-heading font-black text-base uppercase tracking-wider rounded-xl clip-angled shadow-[0_0_25px_rgba(220,38,38,0.5)] hover:shadow-[0_0_35px_rgba(220,38,38,0.8)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Swords className="w-5 h-5 text-amber-300" />
            <span>Register Now</span>
          </button>

          {/* View Tournaments */}
          <button
            onClick={onViewTournamentsClick}
            className="w-full sm:w-auto px-7 py-4 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white font-heading font-bold text-base uppercase tracking-wider rounded-xl border border-zinc-700/80 hover:border-zinc-500 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>View Tournaments</span>
            <ArrowRight className="w-4 h-4 text-zinc-400" />
          </button>

          {/* WhatsApp Community */}
          <a
            href={settings.whatsappCommunityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-4 bg-emerald-950/50 hover:bg-emerald-900/70 border border-emerald-600/60 hover:border-emerald-500 text-emerald-300 font-tech font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-950/40 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Join WhatsApp Community</span>
          </a>
        </div>

        {/* Live Match Countdown Bar */}
        <div className="mt-12 max-w-3xl mx-auto bg-[#10111a]/90 border border-red-900/50 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-500 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-tech text-amber-400 font-bold uppercase tracking-wider block">
                  NEXT SCHEDULED MATCH
                </span>
                <span className="font-heading font-bold text-white text-base">
                  {upcomingTournament ? `Match #${upcomingTournament.matchNumber} (${upcomingTournament.startTime})` : 'Match #1 (11:00 AM)'}
                </span>
              </div>
            </div>

            {/* Countdown Boxes */}
            <div className="flex items-center gap-2 font-tech">
              <div className="bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-lg text-center min-w-[50px]">
                <div className="text-xl font-heading font-black text-amber-400">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-[9px] text-zinc-500 uppercase">Hours</div>
              </div>
              <span className="text-zinc-600 font-bold">:</span>
              <div className="bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-lg text-center min-w-[50px]">
                <div className="text-xl font-heading font-black text-amber-400">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-[9px] text-zinc-500 uppercase">Mins</div>
              </div>
              <span className="text-zinc-600 font-bold">:</span>
              <div className="bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-lg text-center min-w-[50px]">
                <div className="text-xl font-heading font-black text-red-500">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-[9px] text-zinc-500 uppercase">Secs</div>
              </div>
            </div>

            {/* Track Button */}
            <button
              onClick={onOpenTrackModal}
              className="w-full sm:w-auto px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-tech font-bold uppercase tracking-wider text-zinc-200 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span>Track Room Pass</span>
            </button>
          </div>
        </div>

        {/* Feature Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 max-w-4xl mx-auto text-xs font-tech text-zinc-300">
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-3 flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Anti-Cheat & No Emulators</span>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-3 flex items-center gap-2.5">
            <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
            <span>₹115 Booyah Cash Prize</span>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-3 flex items-center gap-2.5">
            <Swords className="w-4 h-4 text-red-400 shrink-0" />
            <span>₹15 Per Verified Kill</span>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-3 flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>UPI Payouts in 2-4 Hours</span>
          </div>
        </div>

      </div>
    </div>
  );
};
