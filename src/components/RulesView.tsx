import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Swords, 
  Trophy, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Smartphone, 
  HelpCircle,
  FileText
} from 'lucide-react';
import { PlatformSettings } from '../types';

interface RulesViewProps {
  settings: PlatformSettings;
  onRegisterClick: () => void;
}

export const RulesView: React.FC<RulesViewProps> = ({ settings, onRegisterClick }) => {
  const [activeSection, setActiveSection] = useState<string>('all');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="border-b border-zinc-800 pb-6 text-center max-w-3xl mx-auto space-y-3">
        <span className="bg-red-950 text-red-400 font-tech font-bold px-3 py-1 rounded text-xs tracking-wider uppercase border border-red-800/60 inline-flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          OFFICIAL RULEBOOK & TOURNAMENT POLICY
        </span>
        <h1 className="text-3xl sm:text-5xl font-heading font-black text-white">
          FAIR PLAY. STRICT RULES. ZERO COMPROMISE.
        </h1>
        <p className="text-zinc-400 text-sm font-tech">
          Read thoroughly before registering or sending entry fees. Participation in FF ELITE ARENA custom rooms constitutes legal and contractual acceptance of every rule listed below.
        </p>
      </div>

      {/* Rules Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-[#101118] border border-red-900/40 rounded-xl p-5 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-red-950/60 border border-red-600/50 flex items-center justify-center text-red-400">
            <Smartphone className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-black text-lg text-white">MOBILE PLAYERS ONLY</h3>
          <p className="text-xs font-tech text-zinc-400 leading-relaxed">
            PC Emulators (Bluestacks, LDPlayer, Nox, Gameloop, etc.) and iPad/Tablet macros are strictly prohibited. The room is configured to block PC clients. Anyone detected using third-party modifiers will be permanently banned.
          </p>
        </div>

        <div className="bg-[#101118] border border-amber-900/40 rounded-xl p-5 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-950/60 border border-amber-600/50 flex items-center justify-center text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-black text-lg text-white">15-MINUTE JOINING WINDOW</h3>
          <p className="text-xs font-tech text-zinc-400 leading-relaxed">
            Custom Room ID and Password are disclosed to verified participants in the "Room Pass" portal 15 minutes before match start. The room will start strictly at the scheduled minute. Late joiners will not be refunded.
          </p>
        </div>

        <div className="bg-[#101118] border border-emerald-900/40 rounded-xl p-5 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-600/50 flex items-center justify-center text-emerald-400">
            <Trophy className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-black text-lg text-white">VERIFIED AUDITED REWARDS</h3>
          <p className="text-xs font-tech text-zinc-400 leading-relaxed">
            Booyah (₹115) and per-kill (₹15) payouts are audited using match spectator logs and player end-screen screenshots. Confirmed prizes are disbursed via UPI within 2 to 4 hours post-match.
          </p>
        </div>

      </div>

      {/* Comprehensive Sections */}
      <div className="space-y-6">

        {/* Section 1: Entry Fees & Rewards */}
        <div className="bg-[#101118] border border-zinc-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-heading font-bold text-xl pb-3 border-b border-zinc-800">
            <Swords className="w-5 h-5" />
            <span>1. Entry Fees, Reward Structure & Calculations</span>
          </div>

          <div className="text-xs font-tech text-zinc-300 space-y-3 leading-relaxed">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
              <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                <span className="text-zinc-500 block text-[10px] uppercase">Entry Fee</span>
                <span className="text-base font-bold text-white">₹30 per player</span>
                <span className="block text-[10px] text-zinc-400">Solo: ₹30 • Duo: ₹60 • Squad: ₹120</span>
              </div>
              <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                <span className="text-amber-500 block text-[10px] uppercase">Booyah Reward</span>
                <span className="text-base font-bold text-amber-400">₹115 per match</span>
                <span className="block text-[10px] text-zinc-400">Awarded to the last surviving player/team</span>
              </div>
              <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                <span className="text-red-500 block text-[10px] uppercase">Kill Bounty</span>
                <span className="text-base font-bold text-red-400">₹15 per verified kill</span>
                <span className="block text-[10px] text-zinc-400">Audited through match summary log</span>
              </div>
            </div>

            <p>
              • <strong>No Guaranteed Winnings:</strong> FF ELITE ARENA is an esports tournament based strictly on player skill, aiming mechanics, map rotations, and battle tactics. We make no promise or guarantee of financial returns.
            </p>
            <p>
              • <strong>Team Mode Prize Distribution:</strong> In Duo and Squad tournaments, the total prize (Booyah + cumulative team kills) will be sent to the registered Team Captain's verified UPI number.
            </p>
          </div>
        </div>

        {/* Section 2: Room Joining & Assigned Slots */}
        <div className="bg-[#101118] border border-zinc-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-white font-heading font-bold text-xl pb-3 border-b border-zinc-800">
            <Clock className="w-5 h-5 text-red-500" />
            <span>2. Custom Room Protocols & Slot Allocation</span>
          </div>

          <div className="text-xs font-tech text-zinc-300 space-y-2.5 leading-relaxed">
            <p>
              • <strong>Slot Number Adherence:</strong> Every verified player is allocated a specific Slot Number (e.g. Slot #14). When entering the custom room, players MUST sit in their designated slot. Sitting in unauthorized slots will result in being kicked by the referee.
            </p>
            <p>
              • <strong>No Unpaid Spectators/Invites:</strong> Sharing Room ID or Password with friends or unregistered players will cause immediate match disqualification of the sharing player, with zero refund.
            </p>
            <p>
              • <strong>Match Punctuality:</strong> The room countdown timer will start at the exact scheduled time. If your network disconnects or your Free Fire app crashes during the lobby, the match will proceed as scheduled.
            </p>
          </div>
        </div>

        {/* Section 3: Anti-Cheating & Fair Play */}
        <div className="bg-[#101118] border border-red-900/50 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-red-400 font-heading font-bold text-xl pb-3 border-b border-zinc-800">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            <span>3. Anti-Cheating, Emulators & Teaming Zero-Tolerance</span>
          </div>

          <div className="text-xs font-tech text-zinc-300 space-y-3 leading-relaxed">
            <div className="p-3 bg-red-950/40 border border-red-800 rounded-lg text-red-200">
              <strong>IMMEDIATE DISQUALIFICATION & LIFETIME BAN OFFENSES:</strong>
              <ul className="list-disc list-inside mt-1.5 space-y-1 text-xs">
                <li>Using any auto-aim, aimbot, antenna, headshot hack, or memory mod apk.</li>
                <li>Using PC emulators or key-mapping triggers that simulate mobile taps.</li>
                <li>Teaming up with opponents in Solo or Duo matches.</li>
                <li>Intentionally feeding kills to friends to inflate the ₹15 kill bounty.</li>
                <li>Exploiting map glitches (e.g. going inside rocks, under map terrain).</li>
              </ul>
            </div>
            <p>
              • Every match is spectated live by at least 2 tournament referees who record full high-definition gameplay footage. In case of suspicious shots, referees will demand screen-recording verification from the suspect player.
            </p>
          </div>
        </div>

        {/* Section 4: Kill & Booyah Verification Procedure */}
        <div className="bg-[#101118] border border-zinc-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-white font-heading font-bold text-xl pb-3 border-b border-zinc-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>4. Kill Verification & Result Submission</span>
          </div>

          <div className="text-xs font-tech text-zinc-300 space-y-2.5 leading-relaxed">
            <p>
              • <strong>Screenshot Mandate:</strong> Immediately upon being eliminated or winning Booyah, players MUST capture a clear screenshot of their match results screen showing player UID, IGN, kill count, and placement rank.
            </p>
            <p>
              • <strong>Submission Window:</strong> Screenshots must be sent to the official WhatsApp community desk within <strong className="text-white">30 minutes</strong> of match completion.
            </p>
            <p>
              • <strong>Kill Audit:</strong> In case of discrepancy between in-game spectate logs and player claims, the room referee's recorded replay log is authoritative and final.
            </p>
          </div>
        </div>

        {/* Section 5: Cancellations, Postponement & Refunds */}
        <div className="bg-[#101118] border border-zinc-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-white font-heading font-bold text-xl pb-3 border-b border-zinc-800">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>5. Cancellation, Postponement & 100% Refund Policy</span>
          </div>

          <div className="text-xs font-tech text-zinc-300 space-y-2.5 leading-relaxed">
            <p>
              • <strong>Organizer Cancellation:</strong> If a scheduled match cannot be hosted due to Free Fire server maintenance, game update downtime, or organizer room creation issues, all registered players will receive a <strong className="text-emerald-400">100% full refund</strong> to their original UPI ID within 6 hours, or free credit to the next available match.
            </p>
            <p>
              • <strong>Player Withdrawal:</strong> Once a match registration is verified by admin, entry fees are non-refundable unless cancellation is requested at least 1 hour prior to match start time.
            </p>
            <p>
              • <strong>Hacker Incident In-Room:</strong> If a blatant hacker is confirmed in a match by referees, the match will be voided and re-hosted immediately at no extra charge to legitimate players.
            </p>
          </div>
        </div>

        {/* Section 6: Prize Payout Timeline */}
        <div className="bg-[#101118] border border-zinc-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-white font-heading font-bold text-xl pb-3 border-b border-zinc-800">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>6. Prize Distribution & Disputes</span>
          </div>

          <div className="text-xs font-tech text-zinc-300 space-y-2.5 leading-relaxed">
            <p>
              • <strong>Payout Window:</strong> All verified prizes are disbursed directly via UPI within <strong>2 to 4 hours</strong> post-match.
            </p>
            <p>
              • <strong>Dispute Escalation:</strong> Any grievance regarding kill count or referee decision must be registered via our official WhatsApp desk within 60 minutes of the match. Decisions by head referees following video review are conclusive.
            </p>
          </div>
        </div>

      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-4">
        <button
          onClick={onRegisterClick}
          className="px-8 py-3.5 bg-gradient-to-r from-red-600 via-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-heading font-black uppercase tracking-wider text-base rounded-xl shadow-xl shadow-red-950/60 cursor-pointer hover:scale-105 active:scale-95 transition-all"
        >
          I Understand The Rules — Join Tournament
        </button>
      </div>

    </div>
  );
};
