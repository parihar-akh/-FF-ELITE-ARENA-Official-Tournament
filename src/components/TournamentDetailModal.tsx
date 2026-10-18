import React from 'react';
import { 
  X, 
  Trophy, 
  Swords, 
  Clock, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Lock, 
  AlertTriangle,
  ChevronRight,
  EyeOff
} from 'lucide-react';
import { Tournament, Registration } from '../types';

interface TournamentDetailModalProps {
  tournament: Tournament | null;
  registrations: Registration[];
  isOpen: boolean;
  onClose: () => void;
  onRegister: (tournament: Tournament) => void;
  onTrackPass: () => void;
}

export const TournamentDetailModal: React.FC<TournamentDetailModalProps> = ({
  tournament,
  registrations,
  isOpen,
  onClose,
  onRegister,
  onTrackPass,
}) => {
  if (!isOpen || !tournament) return null;

  // Filter registrations for this match
  const matchRegs = registrations.filter(r => r.tournamentId === tournament.id && r.paymentStatus === 'VERIFIED');

  const maskName = (name: string) => {
    if (name.length <= 3) return name + '***';
    return name.slice(0, 3) + '***' + name.slice(-1);
  };

  const maskUid = (uid: string) => {
    if (uid.length <= 4) return uid + '****';
    return uid.slice(0, 4) + '****' + uid.slice(-2);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-[#0f1017] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-950 via-zinc-900 to-zinc-950 px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-tech uppercase tracking-wider text-red-400 font-bold bg-red-950 px-2 py-0.5 rounded border border-red-800">
                Match #{tournament.matchNumber} • {tournament.mode}
              </span>
              <span className="text-[10px] font-tech text-amber-400 uppercase font-bold">
                Map: {tournament.map}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white mt-1">
              {tournament.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* Key Timetable & Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800 text-center">
              <span className="text-[10px] font-tech text-zinc-500 uppercase block">Start Time</span>
              <span className="text-base font-heading font-bold text-white">{tournament.startTime}</span>
            </div>
            <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800 text-center">
              <span className="text-[10px] font-tech text-zinc-500 uppercase block">Entry Fee</span>
              <span className="text-base font-heading font-bold text-white">₹{tournament.entryFee}/player</span>
            </div>
            <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800 text-center">
              <span className="text-[10px] font-tech text-amber-400 uppercase block">Booyah Prize</span>
              <span className="text-base font-heading font-bold text-amber-400">₹{tournament.booyahReward}</span>
            </div>
            <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800 text-center">
              <span className="text-[10px] font-tech text-red-400 uppercase block">Per Kill Bounty</span>
              <span className="text-base font-heading font-bold text-red-400">₹{tournament.killReward}</span>
            </div>
          </div>

          {/* Room Protocol Notice */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-tech font-bold text-amber-400 uppercase tracking-wider">
                <Lock className="w-4 h-4" />
                <span>Room Access Policy</span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onTrackPass();
                }}
                className="text-xs font-tech text-emerald-400 hover:underline cursor-pointer"
              >
                Track My Room Pass →
              </button>
            </div>
            <p className="text-xs font-tech text-zinc-400 leading-relaxed">
              Custom Room ID and Password are disclosed to verified registrants exactly 15 minutes before match start ({tournament.startTime}). Players will be assigned a specific slot number and must strictly take that position.
            </p>
          </div>

          {/* Mode Rules */}
          <div className="space-y-3 font-tech text-xs text-zinc-300">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Match Specific Guidelines
            </h4>
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 space-y-2">
              <p>• <strong>Server:</strong> Indian Server (Free Fire MAX / Free Fire Mobile).</p>
              <p>• <strong>Gun Attributes:</strong> NO / OFF (Pure competitive esports fair play).</p>
              <p>• <strong>Character Skill:</strong> YES (Standard competitive active/passive skills).</p>
              <p>• <strong>Limited Ammo:</strong> YES (Standard battle royale resource management).</p>
              <p>• <strong>Air Drop / Vehicles:</strong> YES (Standard competitive settings).</p>
              <p>• <strong>Anti-Cheat:</strong> Emulators blocked by system. Mobile devices only.</p>
            </div>
          </div>

          {/* Verified Registered Players List (Masked for privacy) */}
          <div className="space-y-3 font-tech text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-zinc-400" />
                Confirmed Squad / Player Slots ({tournament.filledSlots} / {tournament.maxSlots})
              </h4>
              <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                <EyeOff className="w-3.5 h-3.5" />
                Player data masked for privacy
              </span>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 max-h-48 overflow-y-auto space-y-2">
              {matchRegs.length > 0 ? (
                matchRegs.map((reg) => (
                  <div key={reg.id} className="flex items-center justify-between text-xs py-1.5 px-2 bg-zinc-900/60 rounded border border-zinc-800/60">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center font-bold text-amber-400 text-[10px]">
                        #{reg.slotNumber || '•'}
                      </span>
                      <span className="font-semibold text-white">{maskName(reg.playerName)}</span>
                      {reg.teamName && (
                        <span className="text-zinc-500 text-[10px]">[{reg.teamName}]</span>
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">UID: {maskUid(reg.ffUid)}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-zinc-500 text-xs">
                  {tournament.filledSlots} slots confirmed. Public player IDs masked per privacy rules.
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onRegister(tournament);
              }}
              disabled={tournament.filledSlots >= tournament.maxSlots || tournament.status === 'COMPLETED'}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-heading font-black uppercase tracking-wider text-sm rounded-xl shadow-lg shadow-red-950/60 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Swords className="w-4 h-4 text-amber-200" />
              <span>Register for Match #{tournament.matchNumber} (₹{tournament.entryFee})</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
