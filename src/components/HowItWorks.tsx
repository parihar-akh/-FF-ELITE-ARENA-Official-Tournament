import React from 'react';
import { Swords, Smartphone, KeyRound, Trophy, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

interface HowItWorksProps {
  onRegisterClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onRegisterClick }) => {
  const steps = [
    {
      num: '01',
      title: 'Pick Match & Squad Mode',
      desc: 'Browse our daily 7-match schedule across Bermuda, Purgatory, and Kalahari. Select Solo, Duo, or Squad format.',
      icon: Swords,
      color: 'from-red-600 to-red-800',
    },
    {
      num: '02',
      title: 'Submit Entry & Pay via UPI',
      desc: 'Pay ₹30 entry fee per player to our official UPI ID and submit your 12-digit UTR transaction ID for verification.',
      icon: Smartphone,
      color: 'from-amber-500 to-amber-700',
    },
    {
      num: '03',
      title: 'Get Verified & Unlock Room Pass',
      desc: 'Our admin audits your payment. Exactly 15 minutes before match start, access your Room ID and Password in the portal.',
      icon: KeyRound,
      color: 'from-emerald-500 to-emerald-700',
    },
    {
      num: '04',
      title: 'Compete & Claim UPI Winnings',
      desc: 'Join your allocated slot, score kills, and fight for Booyah! Winnings (₹115 Booyah + ₹15/kill) transferred in 2-4 hours.',
      icon: Trophy,
      color: 'from-yellow-400 to-amber-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-red-950 text-red-400 font-tech font-bold px-3 py-1 rounded text-xs tracking-wider uppercase border border-red-800/60 inline-flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          FOUR SIMPLE STEPS TO GLORY
        </span>
        <h2 className="text-3xl sm:text-5xl font-heading font-black text-white">
          HOW IT WORKS
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm font-tech">
          From registration to room entry and prize disbursement — transparent, automated, and referee-supervised.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div 
              key={idx}
              className="bg-[#101118] border border-zinc-800 hover:border-red-600/60 rounded-2xl p-6 relative flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]"
            >
              {/* Step Number Top Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
                <span className="font-heading font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
                  STEP {step.num}
                </span>
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Step Info */}
              <div className="py-4 space-y-2">
                <h3 className="font-heading font-black text-lg text-white group-hover:text-red-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs font-tech text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="pt-2">
                <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${step.color} w-full`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action banner */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
          <div>
            <h4 className="font-heading font-black text-base text-white">100% FAIR PLAY GUARANTEE</h4>
            <p className="text-xs font-tech text-zinc-400">Emulators blocked by room configuration • Referees record full match</p>
          </div>
        </div>

        <button
          onClick={onRegisterClick}
          className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-heading font-black text-xs uppercase tracking-wider rounded-lg shadow-lg cursor-pointer whitespace-nowrap"
        >
          Join Next Match
        </button>
      </div>

    </div>
  );
};
