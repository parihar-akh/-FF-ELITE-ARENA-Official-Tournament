import React, { useState } from 'react';
import { 
  Trophy, 
  Swords, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Plus, 
  Edit3, 
  Trash2, 
  Download, 
  Settings, 
  KeyRound, 
  Lock, 
  Unlock, 
  Search, 
  AlertTriangle, 
  Check, 
  RotateCcw, 
  Eye, 
  HelpCircle,
  FileSpreadsheet,
  Share2,
  DollarSign,
  ShieldCheck,
  Server
} from 'lucide-react';
import { 
  Tournament, 
  Registration, 
  LeaderboardPlayer, 
  MatchResultRecord, 
  PlatformSettings,
  TournamentMode,
  TournamentStatus 
} from '../types';
import { StorageService } from '../services/storage';

interface AdminDashboardProps {
  tournaments: Tournament[];
  registrations: Registration[];
  leaderboard: LeaderboardPlayer[];
  results: MatchResultRecord[];
  settings: PlatformSettings;
  onRefreshData: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  tournaments,
  registrations,
  leaderboard,
  results,
  settings,
  onRefreshData,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tournaments' | 'registrations' | 'results' | 'settings' | 'backend_guide'>('overview');

  // Filters & Search
  const [regSearch, setRegSearch] = useState('');
  const [regStatusFilter, setRegStatusFilter] = useState<string>('ALL');
  const [regMatchFilter, setRegMatchFilter] = useState<string>('ALL');

  // Modal / Editor States
  const [editingTour, setEditingTour] = useState<Tournament | null>(null);
  const [isCreatingTour, setIsCreatingTour] = useState(false);
  const [rejectModalReg, setRejectModalReg] = useState<Registration | null>(null);
  const [rejectionReasonInput, setRejectionReasonInput] = useState('');

  // Room Credentials Modal
  const [credentialModalTour, setCredentialModalTour] = useState<Tournament | null>(null);
  const [tempRoomId, setTempRoomId] = useState('');
  const [tempRoomPass, setTempRoomPass] = useState('');

  // Results Publisher Form
  const [selectedResultMatchId, setSelectedResultMatchId] = useState(tournaments[0]?.id || '');
  const [booyahPlayerName, setBooyahPlayerName] = useState('');
  const [booyahPlayerUid, setBooyahPlayerUid] = useState('');
  const [booyahKills, setBooyahKills] = useState<number>(5);
  const [topFraggerName, setTopFraggerName] = useState('');
  const [topFraggerUid, setTopFraggerUid] = useState('');
  const [topFraggerKills, setTopFraggerKills] = useState<number>(8);
  const [totalKillsAudited, setTotalKillsAudited] = useState<number>(45);
  const [refereeNotes, setRefereeNotes] = useState('');

  // Settings form states
  const [settingsForm, setSettingsForm] = useState<PlatformSettings>({ ...settings });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Overview Stats
  const totalRegistrationsCount = registrations.length;
  const pendingRegistrationsCount = registrations.filter(r => r.paymentStatus === 'PENDING').length;
  const verifiedRegistrationsCount = registrations.filter(r => r.paymentStatus === 'VERIFIED').length;
  const totalCollectedFees = registrations
    .filter(r => r.paymentStatus === 'VERIFIED')
    .reduce((sum, r) => sum + r.totalFee, 0);

  // Tournament Form Data
  const [tourForm, setTourForm] = useState({
    matchNumber: 8,
    title: 'Custom Blitz Match',
    mode: 'SOLO' as TournamentMode,
    map: 'Bermuda' as Tournament['map'],
    date: new Date().toISOString().split('T')[0],
    startTime: '11:30 PM',
    entryFee: 30,
    booyahReward: 115,
    killReward: 15,
    maxSlots: 48,
    status: 'REGISTRATION_OPEN' as TournamentStatus,
  });

  // Action Handlers
  const handleVerifyRegistration = (reg: Registration) => {
    const updated: Registration = {
      ...reg,
      paymentStatus: 'VERIFIED',
      registrationStatus: 'APPROVED',
      slotNumber: reg.slotNumber || Math.floor(1 + Math.random() * 48),
    };
    StorageService.updateRegistration(updated);
    onRefreshData();
  };

  const handleOpenRejectModal = (reg: Registration) => {
    setRejectModalReg(reg);
    setRejectionReasonInput('UTR transaction could not be located in bank records. Please provide correct 12-digit reference.');
  };

  const handleConfirmReject = () => {
    if (!rejectModalReg) return;
    const updated: Registration = {
      ...rejectModalReg,
      paymentStatus: 'REJECTED',
      registrationStatus: 'REJECTED',
      rejectionReason: rejectionReasonInput.trim(),
    };
    StorageService.updateRegistration(updated);
    setRejectModalReg(null);
    onRefreshData();
  };

  const handleSaveRoomCredentials = () => {
    if (!credentialModalTour) return;
    const updated: Tournament = {
      ...credentialModalTour,
      roomId: tempRoomId.trim(),
      roomPassword: tempRoomPass.trim(),
      credentialsPublishedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    StorageService.updateTournament(updated);
    setCredentialModalTour(null);
    onRefreshData();
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.saveSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
    onRefreshData();
  };

  const handlePublishMatchResults = (e: React.FormEvent) => {
    e.preventDefault();
    const tour = tournaments.find(t => t.id === selectedResultMatchId);
    if (!tour || !booyahPlayerName.trim()) return;

    const booyahPayout = tour.booyahReward + (booyahKills * tour.killReward);
    const topFraggerPayout = topFraggerKills * tour.killReward;
    const totalPrize = booyahPayout + topFraggerPayout;

    // Add result record
    StorageService.addMatchResult({
      tournamentId: tour.id,
      matchNumber: tour.matchNumber,
      matchTitle: tour.title,
      date: tour.date,
      mode: tour.mode,
      booyahWinner: {
        playerName: booyahPlayerName.trim(),
        ffUid: booyahPlayerUid.trim() || 'Hidden',
        kills: booyahKills,
        payout: booyahPayout,
      },
      topFragger: {
        playerName: topFraggerName.trim() || booyahPlayerName.trim(),
        ffUid: topFraggerUid.trim() || booyahPlayerUid.trim(),
        kills: topFraggerKills,
        payout: topFraggerPayout,
      },
      totalKillsVerified: totalKillsAudited,
      totalPrizePaid: totalPrize,
      isDemo: false,
      notes: refereeNotes.trim() || 'Match verified by referee. Payout cleared to captain UPI.',
    });

    // Mark tournament as completed
    StorageService.updateTournament({
      ...tour,
      status: 'COMPLETED',
    });

    // Update or add to leaderboard
    const currentLb = StorageService.getLeaderboard();
    const existingIndex = currentLb.findIndex(p => p.playerName.toLowerCase() === booyahPlayerName.toLowerCase());
    
    if (existingIndex >= 0) {
      currentLb[existingIndex].booyahWins += 1;
      currentLb[existingIndex].verifiedKills += booyahKills;
      currentLb[existingIndex].totalWon += booyahPayout;
      currentLb[existingIndex].totalPoints += 20 + (booyahKills * 2);
      currentLb[existingIndex].isDemo = false;
    } else {
      currentLb.push({
        id: 'lb-' + Date.now(),
        rank: currentLb.length + 1,
        playerName: booyahPlayerName.trim(),
        ffUid: booyahPlayerUid.trim() || 'Verified',
        matchesPlayed: 1,
        verifiedKills: booyahKills,
        booyahWins: 1,
        totalPoints: 20 + (booyahKills * 2),
        totalWon: booyahPayout,
        prizeStatus: 'PAID',
        isDemo: false,
      });
    }

    // Sort leaderboard by points
    currentLb.sort((a, b) => b.totalPoints - a.totalPoints);
    currentLb.forEach((p, idx) => { p.rank = idx + 1; });
    StorageService.saveLeaderboard(currentLb);

    alert(`Match results published! Prize of ₹${totalPrize} recorded and leaderboard updated.`);
    onRefreshData();
    setActiveTab('overview');
  };

  const handleExportCSV = () => {
    const headers = ['Ref ID', 'Match #', 'Player Name', 'FF UID', 'WhatsApp', 'Mode', 'Team', 'Fee', 'UTR', 'Payment Status', 'Slot #'];
    const rows = registrations.map(r => [
      r.referenceId,
      r.matchNumber,
      `"${r.playerName}"`,
      r.ffUid,
      r.whatsappNumber,
      r.mode,
      `"${r.teamName || 'Solo'}"`,
      r.totalFee,
      r.paymentUtr,
      r.paymentStatus,
      r.slotNumber || 'Unassigned'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ff_elite_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRegistrations = registrations.filter(r => {
    const matchesSearch = 
      r.playerName.toLowerCase().includes(regSearch.toLowerCase()) ||
      r.ffUid.includes(regSearch) ||
      r.referenceId.toLowerCase().includes(regSearch.toLowerCase()) ||
      r.paymentUtr.includes(regSearch) ||
      r.whatsappNumber.includes(regSearch);

    const matchesStatus = regStatusFilter === 'ALL' || r.paymentStatus === regStatusFilter;
    const matchesMatch = regMatchFilter === 'ALL' || r.matchNumber.toString() === regMatchFilter;

    return matchesSearch && matchesStatus && matchesMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#101118] border border-red-900/40 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-500">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-tech text-red-400 font-bold uppercase tracking-wider">
                ADMINISTRATION DESK • TOURNAMENT CONTROL
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-tech font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800">
                AUTH OK
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">
              FF ELITE ARENA OPS CENTER
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-lg font-tech text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onLogout}
            className="px-3.5 py-2 bg-red-950/60 hover:bg-red-900/80 border border-red-800 text-red-300 rounded-lg font-tech text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 border-b border-zinc-800 scrollbar-none">
        {[
          { id: 'overview', label: 'Overview', icon: Trophy },
          { id: 'registrations', label: `Registrations (${pendingRegistrationsCount} Pending)`, icon: Users },
          { id: 'tournaments', label: 'Matches & Room Pass', icon: Swords },
          { id: 'results', label: 'Publish Results & Payouts', icon: DollarSign },
          { id: 'settings', label: 'Settings & WhatsApp', icon: Settings },
          { id: 'backend_guide', label: 'Production Backend Guide', icon: Server },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-tech text-xs uppercase font-bold tracking-wider shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-red-600 text-white shadow-lg shadow-red-950/80 border border-red-500'
                  : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-[#101118] border border-zinc-800 p-5 rounded-xl space-y-2">
              <div className="text-zinc-400 text-xs font-tech uppercase tracking-wider">Total Player Registrations</div>
              <div className="text-3xl font-heading font-black text-white">{totalRegistrationsCount}</div>
              <div className="text-xs text-zinc-500 font-tech">Across all 7 daily slots</div>
            </div>

            <div className="bg-[#101118] border border-amber-600/40 p-5 rounded-xl space-y-2">
              <div className="text-amber-400 text-xs font-tech uppercase tracking-wider flex items-center justify-between">
                <span>Pending Verification</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-heading font-black text-amber-400">{pendingRegistrationsCount}</div>
              <div className="text-xs text-amber-500/80 font-tech">Action required in Registrations tab</div>
            </div>

            <div className="bg-[#101118] border border-emerald-600/40 p-5 rounded-xl space-y-2">
              <div className="text-emerald-400 text-xs font-tech uppercase tracking-wider flex items-center justify-between">
                <span>Verified Players</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-heading font-black text-emerald-400">{verifiedRegistrationsCount}</div>
              <div className="text-xs text-emerald-500/80 font-tech">Eligible for Room ID & Password</div>
            </div>

            <div className="bg-[#101118] border border-zinc-800 p-5 rounded-xl space-y-2">
              <div className="text-zinc-400 text-xs font-tech uppercase tracking-wider">Total Fees Collected</div>
              <div className="text-3xl font-heading font-black text-white">₹{totalCollectedFees}</div>
              <div className="text-xs text-zinc-500 font-tech">Verified UPI receipts</div>
            </div>

          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Urgent: Pending UTR verifications */}
            <div className="bg-[#101118] border border-zinc-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <h3 className="font-heading font-black text-lg text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span>Recent Unverified Payments</span>
                </h3>
                <button
                  onClick={() => setActiveTab('registrations')}
                  className="text-xs font-tech text-red-400 hover:text-red-300 underline"
                >
                  View All
                </button>
              </div>

              {pendingRegistrationsCount === 0 ? (
                <div className="py-8 text-center text-zinc-500 text-xs font-tech">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  All payments are verified! No pending UTRs.
                </div>
              ) : (
                <div className="space-y-3">
                  {registrations
                    .filter(r => r.paymentStatus === 'PENDING')
                    .slice(0, 4)
                    .map((r) => (
                      <div key={r.id} className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white text-xs">{r.playerName} (Match #{r.matchNumber})</div>
                          <div className="text-[11px] font-tech text-amber-400">UTR: {r.paymentUtr}</div>
                          <div className="text-[10px] font-tech text-zinc-500">Ref: {r.referenceId} • Fee: ₹{r.totalFee}</div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleVerifyRegistration(r)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-tech font-bold cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleOpenRejectModal(r)}
                            className="px-2.5 py-1 bg-zinc-800 hover:bg-red-950 text-red-400 rounded text-[11px] font-tech cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Room Credentials Status */}
            <div className="bg-[#101118] border border-zinc-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <h3 className="font-heading font-black text-lg text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-amber-400" />
                  <span>Room ID & Pass Status</span>
                </h3>
                <button
                  onClick={() => setActiveTab('tournaments')}
                  className="text-xs font-tech text-amber-400 hover:text-amber-300 underline"
                >
                  Manage Rooms
                </button>
              </div>

              <div className="space-y-2.5">
                {tournaments.slice(0, 4).map((t) => (
                  <div key={t.id} className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 flex items-center justify-between text-xs font-tech">
                    <div>
                      <div className="font-bold text-white">Match #{t.matchNumber} ({t.startTime})</div>
                      <div className="text-zinc-400 text-[11px]">
                        {t.roomId ? (
                          <span className="text-emerald-400 font-bold">Room ID: {t.roomId} | Pass: {t.roomPassword}</span>
                        ) : (
                          <span className="text-zinc-500">Credentials not yet generated</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setCredentialModalTour(t);
                        setTempRoomId(t.roomId || '');
                        setTempRoomPass(t.roomPassword || '');
                      }}
                      className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[11px] font-bold cursor-pointer"
                    >
                      {t.roomId ? 'Edit Room' : 'Set Room'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REGISTRATIONS & PAYMENTS */}
      {activeTab === 'registrations' && (
        <div className="space-y-5">
          {/* Filters Bar */}
          <div className="bg-[#101118] border border-zinc-800 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
              <input
                type="text"
                placeholder="Search name, UID, UTR, phone..."
                value={regSearch}
                onChange={(e) => setRegSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs font-tech text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <select
                value={regStatusFilter}
                onChange={(e) => setRegStatusFilter(e.target.value)}
                className="bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs font-tech text-zinc-200 focus:outline-none"
              >
                <option value="ALL">All Payment Statuses</option>
                <option value="PENDING">Pending Only</option>
                <option value="VERIFIED">Verified / Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>

              <select
                value={regMatchFilter}
                onChange={(e) => setRegMatchFilter(e.target.value)}
                className="bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs font-tech text-zinc-200 focus:outline-none"
              >
                <option value="ALL">All Matches</option>
                {tournaments.map(t => (
                  <option key={t.id} value={t.matchNumber.toString()}>
                    Match #{t.matchNumber} ({t.startTime})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Registrations Table */}
          <div className="bg-[#101118] border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-tech">
                <thead>
                  <tr className="bg-zinc-900/90 border-b border-zinc-800 text-zinc-400 uppercase tracking-wider">
                    <th className="py-3 px-4 font-bold">Reference / Player</th>
                    <th className="py-3 px-4 font-bold">Free Fire UID</th>
                    <th className="py-3 px-4 font-bold">Match & Mode</th>
                    <th className="py-3 px-4 font-bold">WhatsApp</th>
                    <th className="py-3 px-4 font-bold">Payment UTR</th>
                    <th className="py-3 px-4 font-bold">Slot #</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                    <th className="py-3 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
                  {filteredRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-zinc-500 font-tech">
                        No registrations matching the filter.
                      </td>
                    </tr>
                  ) : (
                    filteredRegistrations.map((r) => (
                      <tr key={r.id} className="hover:bg-zinc-900/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-white text-sm">{r.playerName}</div>
                          <div className="text-[10px] text-amber-400 font-bold">{r.referenceId}</div>
                          {r.teamName && (
                            <div className="text-[10px] text-zinc-400">Team: {r.teamName}</div>
                          )}
                        </td>

                        <td className="py-3 px-4 font-mono text-zinc-300">
                          {r.ffUid}
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-semibold text-white">Match #{r.matchNumber}</span>
                          <span className="block text-[10px] text-zinc-500">{r.mode} (₹{r.totalFee})</span>
                        </td>

                        <td className="py-3 px-4 font-mono text-zinc-300">
                          {r.whatsappNumber}
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-mono text-amber-300 font-semibold bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                            {r.paymentUtr}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-bold text-amber-400">
                            {r.slotNumber ? `#${r.slotNumber}` : '-'}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          {r.paymentStatus === 'VERIFIED' ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                              VERIFIED
                            </span>
                          ) : r.paymentStatus === 'REJECTED' ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-950 text-red-400 border border-red-800/60" title={r.rejectionReason}>
                              REJECTED
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-950 text-amber-400 border border-amber-800/60 animate-pulse">
                              PENDING
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {r.paymentStatus !== 'VERIFIED' && (
                              <button
                                onClick={() => handleVerifyRegistration(r)}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-tech text-xs font-bold cursor-pointer"
                                title="Approve payment & allocate slot"
                              >
                                Approve
                              </button>
                            )}

                            {r.paymentStatus !== 'REJECTED' && (
                              <button
                                onClick={() => handleOpenRejectModal(r)}
                                className="px-2.5 py-1 bg-zinc-800 hover:bg-red-900 text-red-300 rounded font-tech text-xs cursor-pointer"
                                title="Reject payment with reason"
                              >
                                Reject
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TOURNAMENTS & ROOM PASS MANAGEMENT */}
      {activeTab === 'tournaments' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-black text-xl text-white">
              7 DAILY MATCH SLOTS & ROOM CREDENTIALS
            </h3>
            <span className="text-xs font-tech text-zinc-400">
              Only verified players can view published credentials in their Room Pass lookup.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tournaments.map((t) => (
              <div 
                key={t.id}
                className="bg-[#101118] border border-zinc-800 rounded-xl p-5 space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                    <span className="bg-red-950 text-red-400 font-tech font-bold px-2 py-0.5 rounded text-xs">
                      Match #{t.matchNumber} • {t.mode}
                    </span>
                    <span className="text-xs font-tech text-zinc-400 font-bold">{t.startTime}</span>
                  </div>

                  <h4 className="font-heading font-bold text-white text-base mt-2">{t.title}</h4>
                  <div className="text-xs font-tech text-zinc-400 mt-1">
                    Map: <strong className="text-zinc-200">{t.map}</strong> • Fee: ₹{t.entryFee} • Booyah: ₹{t.booyahReward}
                  </div>

                  {/* Room Credentials Box */}
                  <div className="mt-3 p-3 bg-zinc-950 rounded-lg border border-zinc-800 space-y-1.5 font-tech text-xs">
                    <div className="flex justify-between items-center text-zinc-400">
                      <span>Room ID:</span>
                      <span className="font-mono text-amber-400 font-bold">{t.roomId || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between items-center text-zinc-400">
                      <span>Password:</span>
                      <span className="font-mono text-emerald-400 font-bold">{t.roomPassword || 'Not set'}</span>
                    </div>
                    {t.credentialsPublishedAt && (
                      <div className="text-[10px] text-zinc-500 pt-1 border-t border-zinc-900">
                        Published at {t.credentialsPublishedAt}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCredentialModalTour(t);
                      setTempRoomId(t.roomId || '');
                      setTempRoomPass(t.roomPassword || '');
                    }}
                    className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded font-tech text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Set Room Pass</span>
                  </button>

                  <select
                    value={t.status}
                    onChange={(e) => {
                      StorageService.updateTournament({
                        ...t,
                        status: e.target.value as TournamentStatus,
                      });
                      onRefreshData();
                    }}
                    className="bg-zinc-900 border border-zinc-700 text-xs font-tech text-zinc-300 rounded px-2 py-2 focus:outline-none"
                  >
                    <option value="REGISTRATION_OPEN">Open</option>
                    <option value="LIVE">Live</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PUBLISH RESULTS & PAYOUTS */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          <div className="bg-[#101118] border border-zinc-800 rounded-xl p-6 space-y-6 max-w-3xl">
            <div>
              <span className="text-[11px] font-tech text-amber-400 font-bold uppercase tracking-wider">
                REFEREE AUDIT DESK
              </span>
              <h3 className="font-heading font-black text-2xl text-white">
                PUBLISH MATCH RESULTS & DISBURSE PRIZES
              </h3>
              <p className="text-zinc-400 text-xs font-tech mt-1">
                Calculate Booyah (₹115) + Kills (₹15/kill) and publish official verified records to the public hall of fame.
              </p>
            </div>

            <form onSubmit={handlePublishMatchResults} className="space-y-4">
              <div>
                <label className="block text-xs font-tech text-zinc-300 uppercase mb-1">
                  Select Completed Match:
                </label>
                <select
                  value={selectedResultMatchId}
                  onChange={(e) => setSelectedResultMatchId(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-xs font-tech text-white"
                >
                  {tournaments.map(t => (
                    <option key={t.id} value={t.id}>
                      Match #{t.matchNumber} ({t.title}) • {t.mode} • {t.startTime}
                    </option>
                  ))}
                </select>
              </div>

              {/* Booyah Winner */}
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3">
                <div className="font-tech font-bold text-xs text-amber-400 uppercase flex items-center gap-1.5">
                  <Trophy className="w-4 h-4" />
                  Booyah #1 Winner Details:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Winner In-Game Name *"
                    required
                    value={booyahPlayerName}
                    onChange={(e) => setBooyahPlayerName(e.target.value)}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs font-tech text-white"
                  />
                  <input
                    type="text"
                    placeholder="Winner Free Fire UID"
                    value={booyahPlayerUid}
                    onChange={(e) => setBooyahPlayerUid(e.target.value)}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs font-tech text-white"
                  />
                  <div>
                    <label className="block text-[10px] font-tech text-zinc-500 mb-0.5">Kills by Winner:</label>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={booyahKills}
                      onChange={(e) => setBooyahKills(parseInt(e.target.value, 10) || 0)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs font-tech text-white"
                    />
                  </div>
                </div>
                <div className="text-xs font-tech text-emerald-400">
                  Calculated Payout: ₹115 (Booyah) + ₹{booyahKills * 15} ({booyahKills} kills) = <strong>₹{115 + (booyahKills * 15)}</strong>
                </div>
              </div>

              {/* Top Fragger */}
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3">
                <div className="font-tech font-bold text-xs text-red-400 uppercase flex items-center gap-1.5">
                  <Swords className="w-4 h-4" />
                  Top Fragger Details:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Top Fragger Name"
                    value={topFraggerName}
                    onChange={(e) => setTopFraggerName(e.target.value)}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs font-tech text-white"
                  />
                  <input
                    type="text"
                    placeholder="Top Fragger UID"
                    value={topFraggerUid}
                    onChange={(e) => setTopFraggerUid(e.target.value)}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs font-tech text-white"
                  />
                  <div>
                    <label className="block text-[10px] font-tech text-zinc-500 mb-0.5">Fragger Kills:</label>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={topFraggerKills}
                      onChange={(e) => setTopFraggerKills(parseInt(e.target.value, 10) || 0)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs font-tech text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-tech text-zinc-300 uppercase mb-1">
                  Referee Audit Notes (Replay review, kill proof validation):
                </label>
                <textarea
                  rows={2}
                  value={refereeNotes}
                  onChange={(e) => setRefereeNotes(e.target.value)}
                  placeholder="e.g. All 47 kills verified through end-match screenshot checks. No emulators detected."
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-xs font-tech text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-amber-600 text-white font-heading font-black uppercase tracking-wider text-sm rounded-xl cursor-pointer hover:opacity-90 transition-all shadow-lg shadow-red-950/60"
              >
                Publish Official Match Record to Public Board
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 5: SETTINGS & WHATSAPP CONFIG */}
      {activeTab === 'settings' && (
        <div className="space-y-6 max-w-2xl">
          <form onSubmit={handleSaveSettings} className="bg-[#101118] border border-zinc-800 rounded-xl p-6 space-y-5">
            <div>
              <span className="text-[11px] font-tech text-zinc-400 uppercase font-bold">CONFIGURATION</span>
              <h3 className="font-heading font-black text-xl text-white">COMMUNITY, OWNER & UPI SETTINGS</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-tech text-zinc-300 uppercase font-semibold mb-1">
                  Owner / Organizer Name:
                </label>
                <input
                  type="text"
                  value={settingsForm.ownerName || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, ownerName: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs font-tech text-amber-300 font-bold"
                  placeholder="e.g. Akash Singh Parihar"
                />
              </div>

              <div>
                <label className="block text-xs font-tech text-zinc-300 uppercase font-semibold mb-1">
                  Admin WhatsApp Contact Number:
                </label>
                <input
                  type="text"
                  value={settingsForm.adminWhatsappNumber}
                  onChange={(e) => setSettingsForm({ ...settingsForm, adminWhatsappNumber: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs font-tech text-white"
                  placeholder="+91 81035 47416"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-tech text-zinc-300 uppercase font-semibold mb-1">
                  Official Support & Helpdesk Email:
                </label>
                <input
                  type="email"
                  value={settingsForm.adminEmail || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, adminEmail: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs font-tech text-red-300"
                  placeholder="e.g. aakashparihar000@gmail.com"
                />
              </div>

              <div>
                <label className="block text-xs font-tech text-zinc-300 uppercase font-semibold mb-1">
                  WhatsApp Channel / Community Group URL:
                </label>
                <input
                  type="url"
                  value={settingsForm.whatsappCommunityUrl}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsappCommunityUrl: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs font-tech text-emerald-400"
                  placeholder="https://whatsapp.com/channel/..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-tech text-zinc-300 uppercase font-semibold mb-1">
                  UPI ID for Player Entry Payments:
                </label>
                <input
                  type="text"
                  value={settingsForm.upiId}
                  onChange={(e) => setSettingsForm({ ...settingsForm, upiId: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs font-tech text-amber-300 font-mono"
                  placeholder="ffelitearena@upi"
                />
              </div>

              <div>
                <label className="block text-xs font-tech text-zinc-300 uppercase font-semibold mb-1">
                  UPI Merchant / Display Name:
                </label>
                <input
                  type="text"
                  value={settingsForm.upiMerchantName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, upiMerchantName: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs font-tech text-white"
                  placeholder="FF Elite Arena Esports"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-tech text-zinc-300 uppercase font-semibold mb-1">
                Top Announcement Ticker Message:
              </label>
              <textarea
                rows={2}
                value={settingsForm.announcementText}
                onChange={(e) => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-xs font-tech text-white"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 text-white font-heading font-black uppercase tracking-wider text-xs rounded-lg cursor-pointer"
              >
                Save Settings
              </button>

              {settingsSaved && (
                <span className="text-xs font-tech text-emerald-400 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  Settings saved successfully!
                </span>
              )}
            </div>
          </form>

          {/* Reset Demo Data */}
          <div className="bg-[#101118] border border-red-950 rounded-xl p-5 space-y-3">
            <h4 className="font-heading font-bold text-red-400 text-sm">RESET DEMO DATA</h4>
            <p className="text-xs font-tech text-zinc-400">
              Clear your local state and reset tournaments, sample registrations, and leaderboard to fresh demo records.
            </p>
            <button
              onClick={() => {
                if (confirm('Reset all local data to default demo state?')) {
                  StorageService.resetAllToDefault();
                  onRefreshData();
                  alert('Reset complete!');
                }
              }}
              className="px-4 py-2 bg-zinc-900 hover:bg-red-950 border border-zinc-800 text-zinc-300 rounded text-xs font-tech cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset State to Factory Default</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 6: BACKEND & PRODUCTION DEPLOYMENT GUIDE */}
      {activeTab === 'backend_guide' && (
        <div className="space-y-6">
          <div className="bg-[#101118] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-tech text-amber-400 font-bold uppercase tracking-wider">
                  DEVELOPER & DEPLOYMENT ARCHITECTURE
                </span>
                <h3 className="text-2xl font-heading font-black text-white">
                  BACKEND & DATABASE SETUP INSTRUCTIONS
                </h3>
              </div>
            </div>

            <p className="text-zinc-300 text-xs font-tech leading-relaxed">
              This application has been architected with a production-ready data model. For prototyping in Google AI Studio, it utilizes client-side storage (<code className="text-amber-400 bg-zinc-950 px-1 py-0.5 rounded">localStorage</code>) to enable immediate interactive testing of registrations, UTR verification, and room access. Below is the full database schema and instructions for hosting with PostgreSQL (Supabase) or Firebase.
            </p>

            {/* Step by step */}
            <div className="space-y-4">
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                <h4 className="font-heading font-bold text-white text-base flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">1</span>
                  Recommended Architecture (Supabase / PostgreSQL)
                </h4>
                <div className="text-xs font-tech text-zinc-400 space-y-1">
                  <p>1. Create a free project on Supabase (<a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline">supabase.com</a>).</p>
                  <p>2. Open the SQL Editor and execute the schema below.</p>
                  <p>3. Enable Row Level Security (RLS) policies so players can only view their own registered UTR and published room details.</p>
                </div>

                {/* SQL Snippet */}
                <pre className="bg-[#09090d] p-3 rounded-lg text-[11px] font-mono text-zinc-300 overflow-x-auto border border-zinc-800">
{`-- FF ELITE ARENA POSTGRESQL SCHEMA

CREATE TABLE tournaments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_number INT NOT NULL,
  title TEXT NOT NULL,
  mode TEXT NOT NULL CHECK (mode IN ('SOLO', 'DUO', 'SQUAD')),
  map TEXT NOT NULL,
  match_date DATE NOT NULL,
  start_time TEXT NOT NULL,
  entry_fee INT NOT NULL DEFAULT 30,
  booyah_reward INT NOT NULL DEFAULT 115,
  kill_reward INT NOT NULL DEFAULT 15,
  max_slots INT NOT NULL DEFAULT 48,
  filled_slots INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'REGISTRATION_OPEN',
  room_id TEXT,
  room_password TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_id TEXT UNIQUE NOT NULL,
  tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE,
  match_number INT NOT NULL,
  player_name TEXT NOT NULL,
  ff_uid TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  mode TEXT NOT NULL,
  team_name TEXT,
  teammates JSONB,
  total_fee INT NOT NULL DEFAULT 30,
  payment_method TEXT DEFAULT 'UPI',
  payment_utr TEXT NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'VERIFIED', 'REJECTED')),
  registration_status TEXT NOT NULL DEFAULT 'SUBMITTED',
  slot_number INT,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`}
                </pre>
              </div>

              {/* Step 2: Environment Variables */}
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                <h4 className="font-heading font-bold text-white text-base flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">2</span>
                  Environment Variables Configuration
                </h4>
                <div className="text-xs font-tech text-zinc-400">
                  Create a <code className="text-amber-400">.env</code> file based on <code className="text-amber-400">.env.example</code>:
                </div>
                <pre className="bg-[#09090d] p-3 rounded-lg text-[11px] font-mono text-zinc-300 overflow-x-auto border border-zinc-800">
{`# .env configuration
ADMIN_MASTER_PASSWORD="YourStrongAdminPassword2026"
VITE_WHATSAPP_COMMUNITY_URL="https://chat.whatsapp.com/YOUR_GROUP_ID"
VITE_ADMIN_WHATSAPP_NUMBER="+919876543210"
VITE_DEFAULT_UPI_ID="admin.ffarena@upi"
VITE_DEFAULT_UPI_NAME="FF Elite Arena Esports"`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Set Room Pass Modal */}
      {credentialModalTour && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-[#0f1017] border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="font-heading font-black text-xl text-white">
              SET ROOM PASS • MATCH #{credentialModalTour.matchNumber}
            </h3>
            <p className="text-xs font-tech text-zinc-400">
              Published credentials will be instantly visible to all VERIFIED players who check their Room Pass.
            </p>

            <div className="space-y-3 font-tech text-xs">
              <div>
                <label className="block text-zinc-300 mb-1">Custom Room ID:</label>
                <input
                  type="text"
                  placeholder="e.g. 7829104"
                  value={tempRoomId}
                  onChange={(e) => setTempRoomId(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1">Custom Room Password:</label>
                <input
                  type="text"
                  placeholder="e.g. elite99"
                  value={tempRoomPass}
                  onChange={(e) => setTempRoomPass(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-white font-mono"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCredentialModalTour(null)}
                className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded font-tech text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveRoomCredentials}
                className="flex-1 py-2 bg-gradient-to-r from-red-600 to-amber-600 text-white rounded font-tech text-xs font-bold uppercase tracking-wider"
              >
                Publish Credentials
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Payment Reason Modal */}
      {rejectModalReg && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-[#0f1017] border border-red-900/60 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="font-heading font-black text-xl text-red-400">
              REJECT PAYMENT FOR {rejectModalReg.playerName}
            </h3>
            <p className="text-xs font-tech text-zinc-400">
              Specify the exact reason for rejection. This will be shown to the player when they check their status.
            </p>

            <div className="font-tech text-xs space-y-2">
              <label className="block text-zinc-300">Rejection Reason:</label>
              <textarea
                rows={3}
                value={rejectionReasonInput}
                onChange={(e) => setRejectionReasonInput(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-white"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRejectModalReg(null)}
                className="flex-1 py-2 bg-zinc-800 text-zinc-300 rounded font-tech text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="flex-1 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-tech text-xs font-bold uppercase tracking-wider"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
