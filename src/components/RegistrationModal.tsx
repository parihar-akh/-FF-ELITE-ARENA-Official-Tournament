import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  AlertCircle, 
  Copy, 
  Check, 
  QrCode, 
  ShieldAlert, 
  HelpCircle, 
  Users, 
  User, 
  Swords, 
  Clock, 
  MapPin, 
  ExternalLink 
} from 'lucide-react';
import { Tournament, TournamentMode, PlatformSettings, Registration } from '../types';
import { StorageService } from '../services/storage';

interface RegistrationModalProps {
  tournament: Tournament | null;
  tournaments: Tournament[];
  settings: PlatformSettings;
  isOpen: boolean;
  onClose: () => void;
  onRegistrationSuccess: (registration: Registration) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  tournament,
  tournaments,
  settings,
  isOpen,
  onClose,
  onRegistrationSuccess,
}) => {
  if (!isOpen) return null;

  // Selected tournament state
  const [selectedTourId, setSelectedTourId] = useState<string>(
    tournament?.id || tournaments[0]?.id || ''
  );
  const currentTour = tournaments.find(t => t.id === selectedTourId) || tournament || tournaments[0];

  // Form Fields
  const [playerName, setPlayerName] = useState('');
  const [ffUid, setFfUid] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [mode, setMode] = useState<TournamentMode>(currentTour?.mode || 'SOLO');
  const [teamName, setTeamName] = useState('');
  
  // Teammates for Duo/Squad
  const [teammate2Name, setTeammate2Name] = useState('');
  const [teammate2Uid, setTeammate2Uid] = useState('');
  const [teammate3Name, setTeammate3Name] = useState('');
  const [teammate3Uid, setTeammate3Uid] = useState('');
  const [teammate4Name, setTeammate4Name] = useState('');
  const [teammate4Uid, setTeammate4Uid] = useState('');

  // Payment
  const [paymentUtr, setPaymentUtr] = useState('');
  const [hasAgreedRules, setHasAgreedRules] = useState(false);
  
  // UI states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successRegistration, setSuccessRegistration] = useState<Registration | null>(null);

  // Fee calculation
  const multiplier = mode === 'SQUAD' ? 4 : mode === 'DUO' ? 2 : 1;
  const totalFee = (currentTour?.entryFee || 30) * multiplier;

  const copyUpiId = () => {
    navigator.clipboard.writeText(settings.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!playerName.trim() || playerName.trim().length < 3) {
      errs.playerName = 'In-game Name must be at least 3 characters.';
    }

    if (!ffUid.trim() || !/^\d{8,12}$/.test(ffUid.trim())) {
      errs.ffUid = 'Valid Free Fire UID is required (8 to 12 digits).';
    }

    const cleanPhone = whatsappNumber.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.whatsappNumber = 'Valid 10-digit WhatsApp number is required.';
    }

    if (mode !== 'SOLO' && !teamName.trim()) {
      errs.teamName = 'Team name is required for Duo or Squad mode.';
    }

    if (mode === 'DUO' || mode === 'SQUAD') {
      if (!teammate2Name.trim() || !teammate2Uid.trim()) {
        errs.teammate2 = 'Teammate 2 name and UID are required.';
      }
    }

    if (mode === 'SQUAD') {
      if (!teammate3Name.trim() || !teammate3Uid.trim()) {
        errs.teammate3 = 'Teammate 3 name and UID are required.';
      }
      if (!teammate4Name.trim() || !teammate4Uid.trim()) {
        errs.teammate4 = 'Teammate 4 name and UID are required.';
      }
    }

    if (!paymentUtr.trim() || paymentUtr.trim().length < 8) {
      errs.paymentUtr = 'Enter the 12-digit UPI Transaction ID / UTR from your payment receipt.';
    }

    if (!hasAgreedRules) {
      errs.rules = 'You must agree to the tournament fair-play and anti-cheat rules.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);

    setTimeout(() => {
      const teammates = [];
      if (mode === 'DUO' || mode === 'SQUAD') {
        teammates.push({ name: teammate2Name, uid: teammate2Uid });
      }
      if (mode === 'SQUAD') {
        teammates.push({ name: teammate3Name, uid: teammate3Uid });
        teammates.push({ name: teammate4Name, uid: teammate4Uid });
      }

      const newReg = StorageService.createRegistration({
        tournamentId: currentTour.id,
        matchNumber: currentTour.matchNumber,
        playerName: playerName.trim(),
        ffUid: ffUid.trim(),
        whatsappNumber: whatsappNumber.trim(),
        mode,
        teamName: mode !== 'SOLO' ? teamName.trim() : undefined,
        teammates: teammates.length > 0 ? teammates : undefined,
        totalFee,
        paymentMethod: 'UPI',
        paymentUtr: paymentUtr.trim(),
      });

      setSubmitting(false);
      setSuccessRegistration(newReg);
      onRegistrationSuccess(newReg);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-[#0f1017] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-red-950 via-zinc-900 to-zinc-950 px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-tech uppercase tracking-wider text-red-400 font-bold">
              FF ELITE ARENA • OFFICIAL REGISTRATION
            </span>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
              {successRegistration ? 'REGISTRATION SUBMITTED' : 'ENTER CUSTOM ROOM MATCH'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {successRegistration ? (
            /* Success confirmation ticket */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-emerald-950/80 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-heading font-black text-white">
                  REGISTRATION RECEIVED & PENDING VERIFICATION
                </h3>
                <p className="text-zinc-400 text-sm mt-1 max-w-md mx-auto">
                  Your reference ID has been generated. Our admin will verify your payment UTR: <span className="text-amber-400 font-tech font-bold">{successRegistration.paymentUtr}</span>.
                </p>
              </div>

              {/* Reference ID Card */}
              <div className="bg-zinc-900/90 border-2 border-dashed border-red-600/50 rounded-xl p-5 max-w-md mx-auto text-left">
                <div className="flex items-center justify-between text-xs font-tech text-zinc-400 pb-3 border-b border-zinc-800">
                  <span>REGISTRATION REFERENCE</span>
                  <span className="text-emerald-400 font-semibold">SAVE THIS CODE</span>
                </div>
                
                <div className="py-3 flex items-center justify-between">
                  <span className="font-heading font-black text-2xl text-amber-400 tracking-wider">
                    {successRegistration.referenceId}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(successRegistration.referenceId);
                    }}
                    className="px-2.5 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded font-tech flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-800 text-xs font-tech text-zinc-300">
                  <div>
                    <span className="text-zinc-500 block">Match:</span>
                    <span>Match #{successRegistration.matchNumber} ({successRegistration.mode})</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Player Name:</span>
                    <span>{successRegistration.playerName}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Free Fire UID:</span>
                    <span>{successRegistration.ffUid}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Entry Fee:</span>
                    <span>₹{successRegistration.totalFee}</span>
                  </div>
                </div>
              </div>

              {/* Status Note */}
              <div className="bg-amber-950/20 border border-amber-600/40 rounded-xl p-4 text-xs font-tech text-amber-200 text-left max-w-md mx-auto space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-amber-400">
                  <Clock className="w-4 h-4" />
                  What happens next?
                </div>
                <p>1. The referee will cross-check your UTR transaction in the admin dashboard.</p>
                <p>2. Once verified, your status turns <strong className="text-emerald-400">APPROVED</strong>.</p>
                <p>3. Your Custom Room ID & Password will be accessible in the <strong className="text-white">"Room Pass"</strong> lookup tab exactly 15 minutes before the match start time.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 text-white font-heading font-black rounded-lg cursor-pointer hover:opacity-90"
                >
                  Done
                </button>
                <a
                  href={settings.whatsappCommunityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-emerald-900/60 border border-emerald-600 text-emerald-300 font-tech font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2"
                >
                  <span>Notify Admin on WhatsApp</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step 1: Match & Mode Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-tech text-zinc-300 uppercase tracking-wider font-semibold">
                  1. Select Match Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tournaments.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setSelectedTourId(t.id);
                        setMode(t.mode);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        currentTour?.id === t.id
                          ? 'bg-red-950/40 border-red-500 shadow-md shadow-red-950/50'
                          : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-bold text-sm text-white">
                          Match #{t.matchNumber} • {t.startTime}
                        </span>
                        <span className="text-[10px] font-tech text-amber-400 uppercase font-semibold">
                          ₹{t.entryFee}/player
                        </span>
                      </div>
                      <div className="text-[11px] font-tech text-zinc-400 mt-1 flex items-center gap-2">
                        <span>Map: {t.map}</span>
                        <span>•</span>
                        <span>Mode: {t.mode}</span>
                        <span>•</span>
                        <span className="text-zinc-500">{t.filledSlots}/{t.maxSlots} Slots</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Mode Selector */}
                <div className="pt-2">
                  <div className="text-xs font-tech text-zinc-400 uppercase tracking-wider mb-1.5">
                    Match Mode:
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(['SOLO', 'DUO', 'SQUAD'] as TournamentMode[]).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMode(m)}
                        className={`py-2 px-3 rounded-lg font-tech text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          mode === m
                            ? 'bg-red-600 text-white border border-red-500 shadow-md'
                            : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                        }`}
                      >
                        {m} (₹{30 * (m === 'SQUAD' ? 4 : m === 'DUO' ? 2 : 1)})
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2: Player & Team Details */}
              <div className="space-y-4 pt-2 border-t border-zinc-800">
                <label className="block text-xs font-tech text-zinc-300 uppercase tracking-wider font-semibold">
                  2. Player & Team Credentials
                </label>

                {mode !== 'SOLO' && (
                  <div>
                    <label className="block text-xs font-tech text-zinc-400 mb-1">
                      Team / Clan Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Soul Raiders"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full bg-zinc-900/90 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 font-tech"
                    />
                    {errors.teamName && (
                      <span className="text-xs text-red-400 mt-1 block font-tech">{errors.teamName}</span>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-tech text-zinc-400 mb-1">
                      {mode === 'SOLO' ? 'Player In-Game Name *' : 'Team Captain In-Game Name *'}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ShadowStrike_99"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      className="w-full bg-zinc-900/90 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 font-tech"
                    />
                    {errors.playerName && (
                      <span className="text-xs text-red-400 mt-1 block font-tech">{errors.playerName}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-tech text-zinc-400 mb-1">
                      Free Fire UID (8-12 digits) *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1098472911"
                      value={ffUid}
                      onChange={(e) => setFfUid(e.target.value)}
                      className="w-full bg-zinc-900/90 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 font-tech"
                    />
                    {errors.ffUid && (
                      <span className="text-xs text-red-400 mt-1 block font-tech">{errors.ffUid}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-tech text-zinc-400 mb-1">
                    WhatsApp Number (10 digits for room updates & prize transfer) *
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full bg-zinc-900/90 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 font-tech"
                  />
                  {errors.whatsappNumber && (
                    <span className="text-xs text-red-400 mt-1 block font-tech">{errors.whatsappNumber}</span>
                  )}
                  <span className="text-[11px] text-zinc-500 font-tech block mt-1">
                    Privacy Guarantee: Player phone numbers are never displayed publicly.
                  </span>
                </div>

                {/* Additional teammates if DUO or SQUAD */}
                {(mode === 'DUO' || mode === 'SQUAD') && (
                  <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-3.5 space-y-3">
                    <div className="text-xs font-tech font-bold text-amber-400 uppercase tracking-wider">
                      Teammate 2 Details:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Player 2 In-Game Name"
                        value={teammate2Name}
                        onChange={(e) => setTeammate2Name(e.target.value)}
                        className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 font-tech"
                      />
                      <input
                        type="text"
                        placeholder="Player 2 Free Fire UID"
                        value={teammate2Uid}
                        onChange={(e) => setTeammate2Uid(e.target.value)}
                        className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 font-tech"
                      />
                    </div>
                    {errors.teammate2 && (
                      <span className="text-xs text-red-400 font-tech">{errors.teammate2}</span>
                    )}
                  </div>
                )}

                {mode === 'SQUAD' && (
                  <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-3.5 space-y-3">
                    <div className="text-xs font-tech font-bold text-amber-400 uppercase tracking-wider">
                      Teammates 3 & 4 Details:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Player 3 In-Game Name"
                        value={teammate3Name}
                        onChange={(e) => setTeammate3Name(e.target.value)}
                        className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 font-tech"
                      />
                      <input
                        type="text"
                        placeholder="Player 3 Free Fire UID"
                        value={teammate3Uid}
                        onChange={(e) => setTeammate3Uid(e.target.value)}
                        className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 font-tech"
                      />
                    </div>
                    {errors.teammate3 && (
                      <span className="text-xs text-red-400 font-tech block">{errors.teammate3}</span>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <input
                        type="text"
                        placeholder="Player 4 In-Game Name"
                        value={teammate4Name}
                        onChange={(e) => setTeammate4Name(e.target.value)}
                        className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 font-tech"
                      />
                      <input
                        type="text"
                        placeholder="Player 4 Free Fire UID"
                        value={teammate4Uid}
                        onChange={(e) => setTeammate4Uid(e.target.value)}
                        className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 font-tech"
                      />
                    </div>
                    {errors.teammate4 && (
                      <span className="text-xs text-red-400 font-tech block">{errors.teammate4}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Step 3: Payment Verification Section */}
              <div className="space-y-4 pt-2 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-tech text-zinc-300 uppercase tracking-wider font-semibold">
                    3. Entry Fee & UPI Payment
                  </label>
                  <span className="text-xs font-tech font-bold text-amber-400">
                    Total Amount Due: ₹{totalFee}
                  </span>
                </div>

                {/* Payment Instructions Box */}
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-zinc-950 p-3 rounded-lg border border-zinc-800/80">
                    <div>
                      <div className="text-[10px] text-zinc-400 font-tech uppercase">Pay To UPI ID:</div>
                      <div className="font-tech font-bold text-sm text-emerald-400">
                        {settings.upiId}
                      </div>
                      <div className="text-[10px] text-zinc-500 font-tech">Name: {settings.upiMerchantName}</div>
                    </div>
                    <button
                      type="button"
                      onClick={copyUpiId}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-tech text-zinc-200 rounded flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedUpi ? 'Copied!' : 'Copy UPI'}</span>
                    </button>
                  </div>

                  <div className="text-[11px] font-tech text-zinc-400 space-y-1">
                    <p>• Open GPay, PhonePe, Paytm or BHIM UPI app.</p>
                    <p>• Transfer exactly <strong className="text-white">₹{totalFee}</strong> to the UPI ID above.</p>
                    <p>• Note down the 12-digit <strong className="text-amber-400">UTR / UPI Transaction ID</strong> from your payment receipt.</p>
                  </div>

                  {/* UTR Input */}
                  <div>
                    <label className="block text-xs font-tech text-zinc-300 mb-1 font-semibold">
                      Enter 12-digit UPI Transaction ID / UTR Number *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 428910481920"
                      value={paymentUtr}
                      onChange={(e) => setPaymentUtr(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3.5 py-2.5 text-sm text-amber-300 placeholder-zinc-600 font-tech tracking-wider focus:outline-none focus:border-amber-500"
                    />
                    {errors.paymentUtr && (
                      <span className="text-xs text-red-400 mt-1 block font-tech">{errors.paymentUtr}</span>
                    )}
                  </div>

                  <div className="text-[10px] text-zinc-500 font-tech flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Important: Registration is not confirmed until payment is verified by our authorized admin. Never share your UPI PIN or banking passwords.</span>
                  </div>
                </div>
              </div>

              {/* Step 4: Rules Agreement */}
              <div className="pt-2 border-t border-zinc-800 space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasAgreedRules}
                    onChange={(e) => setHasAgreedRules(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-red-600 focus:ring-red-500 accent-red-600"
                  />
                  <span className="text-xs text-zinc-300 font-tech">
                    I agree to the <strong className="text-white">FF ELITE ARENA Fair Play Rules</strong>: Emulators, hacks, script modifications and teaming are strictly forbidden and will result in immediate ban without refund. I will record and submit post-match screenshot proof for kill rewards.
                  </span>
                </label>
                {errors.rules && (
                  <span className="text-xs text-red-400 block font-tech">{errors.rules}</span>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-red-600 via-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-heading font-black uppercase tracking-wider text-base rounded-xl shadow-lg shadow-red-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Swords className="w-5 h-5 text-amber-200" />
                  <span>{submitting ? 'Verifying & Submitting...' : `Submit Registration (₹${totalFee})`}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
