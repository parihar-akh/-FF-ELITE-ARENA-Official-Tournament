import React from 'react';
import { 
  Trophy, 
  Swords, 
  Clock, 
  MapPin, 
  Users, 
  ChevronRight, 
  Flame, 
  ShieldCheck, 
  Lock, 
  CheckCircle2 
} from 'lucide-react';
import { Tournament } from '../types';

interface TournamentCardProps {
  tournament: Tournament;
  onRegister: (tournament: Tournament) => void;
  onViewDetails: (tournament: Tournament) => void;
  onTrackPass: () => void;
}

export const TournamentCard: React.FC<TournamentCardProps> = ({
  tournament,
  onRegister,
  onViewDetails,
  onTrackPass,
}) => {
  const isFull = tournament.filledSlots >= tournament.maxSlots;
  const slotsRemaining = Math.max(0, tournament.maxSlots - tournament.filledSlots);
  const fillPercentage = Math.min(100, Math.round((tournament.filledSlots / tournament.maxSlots) * 100));

  const getStatusBadge = () => {
    switch (tournament.status) {
      case 'REGISTRATION_OPEN':
        return isFull ? (
          <span className="px-2.5 py-1 rounded text-[11px] font-tech font-bold uppercase tracking-wider bg-amber-950/80 text-amber-300 border border-amber-600/60">
            Slots Full (Waiting List)
          </span>
        ) : (
          <span className="px-2.5 py-1 rounded text-[11px] font-tech font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-500/50 flex items-center gap-1.5 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Registration Open
          </span>
        );
      case 'LIVE':
        return (
          <span className="px-2.5 py-1 rounded text-[11px] font-tech font-bold uppercase tracking-wider bg-red-950 text-red-400 border border-red-600 flex items-center gap-1.5 animate-pulse">
            <Flame className="w-3.5 h-3.5 text-red-500" />
            MATCH IN PROGRESS
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="px-2.5 py-1 rounded text-[11px] font-tech font-bold uppercase tracking-wider bg-zinc-900 text-zinc-400 border border-zinc-800 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-zinc-500" />
            Completed
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="px-2.5 py-1 rounded text-[11px] font-tech font-bold uppercase tracking-wider bg-zinc-900 text-red-400 border border-zinc-800">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded text-[11px] font-tech font-bold uppercase tracking-wider bg-zinc-800 text-zinc-300">
            Upcoming
          </span>
        );
    }
  };

  return (
    <div className="group relative bg-[#101118] border border-zinc-800/90 hover:border-red-600/70 rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] flex flex-col justify-between">
      
      {/* Top Banner & Match Tag */}
      <div className="relative p-5 pb-4 border-b border-zinc-800/60 bg-gradient-to-b from-zinc-900/60 to-transparent">
        
        {/* Match Number Pill & Mode Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="bg-red-900/70 text-red-300 font-tech font-bold px-2.5 py-0.5 rounded text-xs tracking-wider uppercase border border-red-700/50">
              Match #{tournament.matchNumber}
            </span>
            <span className="bg-zinc-800/90 text-zinc-300 font-tech font-semibold px-2 py-0.5 rounded text-xs tracking-wider uppercase">
              {tournament.mode}
            </span>
          </div>
          <div>{getStatusBadge()}</div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-heading font-bold text-white group-hover:text-red-400 transition-colors tracking-wide leading-tight">
          {tournament.title}
        </h3>

        {/* Meta badges: Time, Map, Date */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-3 text-xs text-zinc-400 font-tech">
          <div className="flex items-center gap-1.5 text-zinc-300">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-white">{tournament.startTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-red-400" />
            <span>Map: <strong className="text-zinc-200">{tournament.map}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <span>Date: <strong className="text-zinc-200">{tournament.date}</strong></span>
          </div>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="p-5 py-4 bg-zinc-950/40 grid grid-cols-3 gap-2 border-b border-zinc-800/50 text-center">
        {/* Entry Fee */}
        <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-lg p-2.5">
          <div className="text-[10px] text-zinc-400 font-tech uppercase tracking-wider">Entry Fee</div>
          <div className="text-base sm:text-lg font-heading font-black text-white mt-0.5">
            ₹{tournament.entryFee}
          </div>
          <div className="text-[9px] text-zinc-500 font-tech">per player</div>
        </div>

        {/* Booyah Prize */}
        <div className="bg-amber-950/20 border border-amber-600/30 rounded-lg p-2.5">
          <div className="text-[10px] text-amber-400 font-tech uppercase tracking-wider flex items-center justify-center gap-1">
            <Trophy className="w-3 h-3 text-amber-400" />
            Booyah
          </div>
          <div className="text-base sm:text-lg font-heading font-black text-amber-400 mt-0.5">
            ₹{tournament.booyahReward}
          </div>
          <div className="text-[9px] text-amber-500/80 font-tech">cash prize</div>
        </div>

        {/* Per Kill Reward */}
        <div className="bg-red-950/20 border border-red-600/30 rounded-lg p-2.5">
          <div className="text-[10px] text-red-400 font-tech uppercase tracking-wider flex items-center justify-center gap-1">
            <Swords className="w-3 h-3 text-red-400" />
            Per Kill
          </div>
          <div className="text-base sm:text-lg font-heading font-black text-red-400 mt-0.5">
            ₹{tournament.killReward}
          </div>
          <div className="text-[9px] text-red-500/80 font-tech">per kill verified</div>
        </div>
      </div>

      {/* Slots Progress Bar */}
      <div className="px-5 py-3 bg-zinc-900/30">
        <div className="flex items-center justify-between text-xs font-tech mb-1.5">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <Users className="w-3.5 h-3.5 text-zinc-500" />
            Capacity: <strong className="text-zinc-200">{tournament.filledSlots} / {tournament.maxSlots}</strong>
          </span>
          <span className={`font-bold ${slotsRemaining <= 5 ? 'text-red-400' : 'text-emerald-400'}`}>
            {slotsRemaining > 0 ? `${slotsRemaining} slots remaining` : 'Full'}
          </span>
        </div>
        <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 rounded-full ${
              fillPercentage > 85 
                ? 'bg-gradient-to-r from-amber-500 to-red-600' 
                : 'bg-gradient-to-r from-red-600 to-red-500'
            }`}
            style={{ width: `${fillPercentage}%` }}
          />
        </div>
      </div>

      {/* Custom Room Info Notice */}
      <div className="px-5 py-2.5 bg-zinc-950/70 border-t border-zinc-800/40 flex items-center justify-between text-[11px] font-tech text-zinc-400">
        <div className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-amber-500" />
          <span>Room ID & Pass:</span>
          {tournament.roomId ? (
            <span className="text-emerald-400 font-semibold">Published (Verified Players)</span>
          ) : (
            <span className="text-zinc-500">15 mins before match</span>
          )}
        </div>
        <button
          onClick={onTrackPass}
          className="text-zinc-400 hover:text-amber-400 transition-colors underline cursor-pointer"
        >
          Check Pass
        </button>
      </div>

      {/* Actions */}
      <div className="p-5 pt-3 bg-zinc-900/50 border-t border-zinc-800/80 flex items-center gap-2.5">
        <button
          onClick={() => onViewDetails(tournament)}
          className="flex-1 py-2.5 px-3 rounded text-xs font-tech font-bold uppercase tracking-wider text-zinc-300 bg-zinc-800 hover:bg-zinc-700 hover:text-white border border-zinc-700/80 transition-all text-center cursor-pointer"
        >
          Details & Rules
        </button>

        <button
          onClick={() => onRegister(tournament)}
          disabled={tournament.status === 'COMPLETED' || tournament.status === 'CANCELLED' || isFull}
          className={`flex-1 py-2.5 px-3 rounded text-xs font-heading font-black uppercase tracking-wider text-white transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
            isFull || tournament.status === 'COMPLETED' || tournament.status === 'CANCELLED'
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/40'
              : 'bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 shadow-md shadow-red-950/50 hover:shadow-red-600/20 active:scale-95'
          }`}
        >
          <span>{isFull ? 'Slots Full' : 'Join Match'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
