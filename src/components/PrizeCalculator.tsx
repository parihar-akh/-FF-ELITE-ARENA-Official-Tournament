import React, { useState } from 'react';
import { Trophy, Swords, Calculator, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { TournamentMode } from '../types';

interface PrizeCalculatorProps {
  onRegisterClick: () => void;
}

export const PrizeCalculator: React.FC<PrizeCalculatorProps> = ({ onRegisterClick }) => {
  const [kills, setKills] = useState<number>(4);
  const [hasBooyah, setHasBooyah] = useState<boolean>(true);
  const [mode, setMode] = useState<TournamentMode>('SOLO');

  const entryFeePerPlayer = 30;
  const teamMultiplier = mode === 'SQUAD' ? 4 : mode === 'DUO' ? 2 : 1;
  const totalEntryCost = entryFeePerPlayer * teamMultiplier;

  const booyahReward = hasBooyah ? 115 : 0;
  const killReward = kills * 15;
  const totalReward = booyahReward + killReward;
  const netProfit = totalReward - totalEntryCost;
  const roi = Math.round((netProfit / totalEntryCost) * 100);

  return (
    <div className="relative bg-gradient-to-b from-[#14151f] to-[#0c0d14] border border-red-900/40 rounded-2xl p-6 sm:p-8 overflow-hidden shadow-2xl">
      {/* Background glow accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Interactive Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2">
            <span className="bg-red-950 text-red-400 font-tech font-bold px-3 py-1 rounded text-xs tracking-wider uppercase border border-red-800/60 inline-flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" />
              Tournament Earnings Simulator
            </span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
              CALCULATE YOUR <span className="text-red-500">BOOYAH & KILL</span> PAYOUT
            </h3>
            <p className="text-zinc-400 text-sm mt-1">
              Transparent rewards guaranteed. ₹30 entry, ₹115 Booyah victory prize, and ₹15 for every verified kill.
            </p>
          </div>

          {/* Mode Selector */}
          <div>
            <label className="block text-xs font-tech text-zinc-400 uppercase tracking-wider mb-2">
              Select Match Mode:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['SOLO', 'DUO', 'SQUAD'] as TournamentMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`py-2 px-3 rounded font-tech text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    mode === m
                      ? 'bg-red-600 text-white shadow-lg shadow-red-900/50 border border-red-500'
                      : 'bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {m} ({m === 'SOLO' ? '1 Player' : m === 'DUO' ? '2 Players' : '4 Players'})
                </button>
              ))}
            </div>
          </div>

          {/* Kills Slider */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Swords className="w-4 h-4 text-red-400" />
                <span className="font-tech text-xs text-zinc-300 uppercase tracking-wider">Estimated Verified Kills:</span>
              </div>
              <span className="text-xl font-heading font-black text-red-400">
                {kills} Kills <span className="text-xs text-zinc-500 font-tech">(+₹{kills * 15})</span>
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={kills}
              onChange={(e) => setKills(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
            <div className="flex justify-between text-[10px] font-tech text-zinc-500 mt-1">
              <span>0 Kills</span>
              <span>5 Kills</span>
              <span>10 Kills</span>
              <span>15 Kills</span>
              <span>20 Kills</span>
            </div>
          </div>

          {/* Booyah Toggle */}
          <div 
            onClick={() => setHasBooyah(!hasBooyah)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
              hasBooyah 
                ? 'bg-amber-950/30 border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.15)]' 
                : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${hasBooyah ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-500'}`}>
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading font-bold text-white text-base">Did You Secure BOOYAH? #1</div>
                <div className="text-xs text-zinc-400 font-tech">Adds flat ₹115 cash reward to your wallet</div>
              </div>
            </div>

            <div className={`w-6 h-6 rounded-md flex items-center justify-center border font-bold text-xs ${
              hasBooyah ? 'bg-amber-400 border-amber-300 text-black' : 'border-zinc-700 bg-zinc-800'
            }`}>
              {hasBooyah ? '✓' : ''}
            </div>
          </div>
        </div>

        {/* Right: Earnings Ticket Card */}
        <div className="lg:col-span-5">
          <div className="bg-gradient-to-b from-[#181926] to-[#0e0f17] border-2 border-red-600/40 rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="font-tech text-xs uppercase tracking-wider text-zinc-400">Total Projected Reward</div>
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-800/80 px-2 py-0.5 rounded text-[10px] font-tech font-bold uppercase">
                Instant UPI Payout
              </span>
            </div>

            {/* Total Prize Big Display */}
            <div className="py-6 text-center">
              <div className="text-xs font-tech text-zinc-400 uppercase tracking-widest">You Take Home</div>
              <div className="text-5xl sm:text-6xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-white to-red-400 mt-1">
                ₹{totalReward}
              </div>
              
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-tech">
                <span className="text-zinc-400">Net Profit:</span>
                <span className={`font-bold ${netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {netProfit >= 0 ? `+₹${netProfit}` : `-₹${Math.abs(netProfit)}`} ({roi}%)
                </span>
              </div>
            </div>

            {/* Breakdown List */}
            <div className="space-y-2.5 text-xs font-tech border-t border-zinc-800/80 pt-4">
              <div className="flex justify-between text-zinc-400">
                <span>Entry Fee ({mode}):</span>
                <span className="text-zinc-200">₹{totalEntryCost}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Booyah 1st Place:</span>
                <span className="text-amber-400 font-semibold">{hasBooyah ? '+₹115' : '₹0'}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Verified Kills ({kills} × ₹15):</span>
                <span className="text-red-400 font-semibold">+₹{killReward}</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={onRegisterClick}
              className="mt-6 w-full py-3.5 px-4 bg-gradient-to-r from-red-600 via-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-heading font-black uppercase tracking-wider text-sm rounded-xl shadow-lg shadow-red-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Join Next Match For ₹30</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-zinc-500 font-tech text-center mt-3 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
              Verified by referee screenshot audit • Payout via UPI in 2-4 hours
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
