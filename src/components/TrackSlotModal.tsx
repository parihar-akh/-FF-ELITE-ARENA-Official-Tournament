import React, { useState } from 'react';
import { 
  X, 
  Search, 
  KeyRound, 
  Copy, 
  Check, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  MessageCircle, 
  Lock, 
  Unlock,
  AlertTriangle
} from 'lucide-react';
import { StorageService } from '../services/storage';
import { Registration, Tournament, PlatformSettings } from '../types';

interface TrackSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: PlatformSettings;
}

export const TrackSlotModal: React.FC<TrackSlotModalProps> = ({ isOpen, onClose, settings }) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Registration | null>(null);
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [searched, setSearched] = useState(false);
  const [copiedRoom, setCopiedRoom] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearched(true);
    const reg = StorageService.findRegistrationByRefOrPhone(query);
    setResult(reg || null);

    if (reg) {
      const tour = StorageService.getTournaments().find(t => t.id === reg.tournamentId);
      setTournament(tour || null);
    } else {
      setTournament(null);
    }
  };

  const copyText = (text: string, type: 'room' | 'pass') => {
    navigator.clipboard.writeText(text);
    if (type === 'room') {
      setCopiedRoom(true);
      setTimeout(() => setCopiedRoom(false), 2000);
    } else {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-lg bg-[#0f1017] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-tech uppercase tracking-wider text-amber-400 font-bold block">
                PLAYER PORTAL
              </span>
              <h2 className="text-xl font-heading font-black text-white">
                CHECK REGISTRATION & ROOM PASS
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

        {/* Body */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="block text-xs font-tech text-zinc-300 uppercase tracking-wider font-semibold">
              Enter Registration Reference ID, WhatsApp, or Free Fire UID:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. FFA-M1-4891 or 9876501234"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 font-tech focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 text-white font-tech font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 cursor-pointer hover:opacity-90 active:scale-95 transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Lookup</span>
              </button>
            </div>
            <div className="text-[11px] text-zinc-500 font-tech">
              Tip: You can search with the reference ID received after submitting your form, or your registered WhatsApp number.
            </div>
          </form>

          {/* Quick Demo Hint */}
          {!searched && (
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3.5 text-xs font-tech text-zinc-400">
              <span className="text-amber-400 font-bold block mb-1">Demo Quick Test Reference:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setQuery('FFA-M1-4891');
                  }}
                  className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded border border-zinc-700 cursor-pointer text-[11px]"
                >
                  FFA-M1-4891 (Verified Player)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('FFA-M1-9312');
                  }}
                  className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded border border-zinc-700 cursor-pointer text-[11px]"
                >
                  FFA-M1-9312 (Pending Player)
                </button>
              </div>
            </div>
          )}

          {/* Search Result */}
          {searched && (
            <div>
              {result ? (
                <div className="space-y-4">
                  {/* Status Card */}
                  <div className={`p-4 rounded-xl border ${
                    result.paymentStatus === 'VERIFIED'
                      ? 'bg-emerald-950/20 border-emerald-500/50'
                      : result.paymentStatus === 'REJECTED'
                      ? 'bg-red-950/30 border-red-500/50'
                      : 'bg-amber-950/20 border-amber-500/50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-tech uppercase tracking-wider text-zinc-400">
                        Payment & Slot Status
                      </span>
                      {result.paymentStatus === 'VERIFIED' ? (
                        <span className="px-2.5 py-0.5 rounded text-xs font-tech font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          VERIFIED & CONFIRMED
                        </span>
                      ) : result.paymentStatus === 'REJECTED' ? (
                        <span className="px-2.5 py-0.5 rounded text-xs font-tech font-bold uppercase bg-red-500/20 text-red-400 border border-red-500/40 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" />
                          PAYMENT REJECTED
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded text-xs font-tech font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center gap-1 animate-pulse">
                          <Clock className="w-3.5 h-3.5" />
                          PENDING ADMIN VERIFICATION
                        </span>
                      )}
                    </div>

                    <div className="font-heading font-black text-xl text-white">
                      {result.playerName} <span className="text-zinc-400 text-sm font-tech">({result.mode})</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-tech text-zinc-300 mt-2">
                      <div>
                        <span className="text-zinc-500 block">Match:</span>
                        <span>Match #{result.matchNumber} ({tournament?.startTime || 'Today'})</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">Assigned Slot:</span>
                        <span className="text-amber-400 font-bold">
                          {result.slotNumber ? `Slot #${result.slotNumber}` : 'Allocated on Verification'}
                        </span>
                      </div>
                    </div>

                    {result.paymentStatus === 'REJECTED' && result.rejectionReason && (
                      <div className="mt-3 p-2.5 bg-red-950/60 border border-red-800 rounded text-xs font-tech text-red-300">
                        <strong>Reason:</strong> {result.rejectionReason}
                      </div>
                    )}
                  </div>

                  {/* Room Credentials Area */}
                  {result.paymentStatus === 'VERIFIED' ? (
                    <div className="bg-gradient-to-b from-[#1c1d29] to-[#12131d] border-2 border-emerald-500/50 rounded-xl p-5 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                        <div className="flex items-center gap-2 text-emerald-400 font-tech font-bold text-xs uppercase tracking-wider">
                          <Unlock className="w-4 h-4" />
                          <span>Custom Room Credentials</span>
                        </div>
                        <span className="text-[10px] text-zinc-400 font-tech">
                          Confidential • Do Not Share
                        </span>
                      </div>

                      {tournament?.roomId ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Room ID */}
                          <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                            <span className="text-[10px] text-zinc-500 font-tech uppercase block">Room ID:</span>
                            <div className="flex items-center justify-between mt-1">
                              <span className="font-tech font-black text-lg text-amber-400 tracking-wider">
                                {tournament.roomId}
                              </span>
                              <button
                                onClick={() => copyText(tournament.roomId || '', 'room')}
                                className="p-1.5 hover:bg-zinc-800 text-zinc-300 rounded cursor-pointer transition-colors"
                                title="Copy Room ID"
                              >
                                {copiedRoom ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>

                          {/* Room Password */}
                          <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                            <span className="text-[10px] text-zinc-500 font-tech uppercase block">Password:</span>
                            <div className="flex items-center justify-between mt-1">
                              <span className="font-tech font-black text-lg text-emerald-400 tracking-wider">
                                {tournament.roomPassword}
                              </span>
                              <button
                                onClick={() => copyText(tournament.roomPassword || '', 'pass')}
                                className="p-1.5 hover:bg-zinc-800 text-zinc-300 rounded cursor-pointer transition-colors"
                                title="Copy Password"
                              >
                                {copiedPass ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 bg-zinc-950/60 border border-zinc-800 rounded-lg text-center text-xs font-tech text-zinc-400 space-y-1">
                          <Lock className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                          <p className="text-white font-bold">Room Credentials Not Yet Published</p>
                          <p>The admin will reveal the Room ID and Password 15 minutes prior to match start ({tournament?.startTime}). Please refresh this tab then.</p>
                        </div>
                      )}

                      <div className="text-[11px] font-tech text-zinc-400 space-y-1 bg-zinc-950/50 p-3 rounded-lg">
                        <p className="font-bold text-amber-400">Match Joining Checklist:</p>
                        <p>1. Open Free Fire → Custom → Room → Enter Room ID.</p>
                        <p>2. Enter Password & join your assigned slot <strong className="text-white">#{result.slotNumber || 1}</strong>.</p>
                        <p>3. Do NOT invite friends into the room who haven't paid or you will be kicked.</p>
                      </div>
                    </div>
                  ) : result.paymentStatus === 'PENDING' ? (
                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 text-xs font-tech text-zinc-300 space-y-2">
                      <div className="font-bold text-amber-400 flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        Verification In Progress
                      </div>
                      <p>
                        Your UTR <span className="text-white font-semibold">{result.paymentUtr}</span> is currently queued in our banking verification desk. This takes between 5 to 20 minutes.
                      </p>
                      <p>
                        Need fast-track verification? Message our admin directly on WhatsApp with your screenshot proof.
                      </p>
                      <a
                        href={settings.whatsappCommunityUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 rounded font-bold text-xs mt-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat With Admin on WhatsApp</span>
                      </a>
                    </div>
                  ) : (
                    <div className="text-center pt-2">
                      <a
                        href={settings.whatsappCommunityUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-950/80 border border-red-600 text-red-300 rounded-lg font-tech text-xs font-bold uppercase"
                      >
                        <AlertTriangle className="w-4 h-4" />
                        <span>Appeal Payment to Admin</span>
                      </a>
                    </div>
                  )}

                </div>
              ) : (
                <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-xl text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
                    <Search className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading font-bold text-white text-base">No Registration Found</h4>
                  <p className="text-xs font-tech text-zinc-400 max-w-xs mx-auto">
                    We couldn't find any registration matching "{query}". Please verify your reference ID, WhatsApp number, or Free Fire UID.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
