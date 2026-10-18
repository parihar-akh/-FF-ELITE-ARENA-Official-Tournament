/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Swords, 
  Clock, 
  MessageCircle, 
  ShieldCheck, 
  KeyRound, 
  ChevronRight, 
  Search, 
  Flame, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

import { StorageService } from './services/storage';
import { Tournament, Registration, LeaderboardPlayer, MatchResultRecord, PlatformSettings, TournamentMode } from './types';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AnnouncementBar } from './components/AnnouncementBar';
import { HeroSection } from './components/HeroSection';
import { TournamentCard } from './components/TournamentCard';
import { RegistrationModal } from './components/RegistrationModal';
import { TrackSlotModal } from './components/TrackSlotModal';
import { TournamentDetailModal } from './components/TournamentDetailModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { PrizeCalculator } from './components/PrizeCalculator';
import { RulesView } from './components/RulesView';
import { LeaderboardView } from './components/LeaderboardView';
import { ContactView } from './components/ContactView';
import { HowItWorks } from './components/HowItWorks';
import { FAQSection } from './components/FAQSection';

export default function App() {
  // Navigation
  const [currentView, setCurrentView] = useState<string>('home');

  // Application Data State
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardPlayer[]>([]);
  const [results, setResults] = useState<MatchResultRecord[]>([]);
  const [settings, setSettings] = useState<PlatformSettings>(StorageService.getSettings());
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(StorageService.isAdminLoggedIn());

  // Modals
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedTournamentForReg, setSelectedTournamentForReg] = useState<Tournament | null>(null);

  const [isTrackPassOpen, setIsTrackPassOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  const [detailModalTournament, setDetailModalTournament] = useState<Tournament | null>(null);

  // Tournament Filters
  const [tournamentModeFilter, setTournamentModeFilter] = useState<string>('ALL');

  // Load Data on Mount
  const refreshData = () => {
    setTournaments(StorageService.getTournaments());
    setRegistrations(StorageService.getRegistrations());
    setLeaderboard(StorageService.getLeaderboard());
    setResults(StorageService.getResults());
    setSettings(StorageService.getSettings());
    setIsAdminLoggedIn(StorageService.isAdminLoggedIn());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Action handlers
  const handleOpenRegister = (tournament?: Tournament) => {
    setSelectedTournamentForReg(tournament || tournaments[0] || null);
    setIsRegisterOpen(true);
  };

  const handleOpenDetailModal = (tournament: Tournament) => {
    setDetailModalTournament(tournament);
  };

  const handleRegistrationSuccess = (newReg: Registration) => {
    refreshData();
  };

  const handleAdminLogout = () => {
    StorageService.setAdminLoggedIn(false);
    setIsAdminLoggedIn(false);
    if (currentView === 'admin') {
      setCurrentView('home');
    }
  };

  // Filtered Tournaments
  const filteredTournaments = tournaments.filter(t => {
    if (tournamentModeFilter === 'ALL') return true;
    return t.mode === tournamentModeFilter;
  });

  return (
    <div className="min-h-screen bg-[#08080c] text-zinc-100 flex flex-col selection:bg-red-600 selection:text-white">
      
      {/* Top Announcement Bar */}
      <AnnouncementBar
        settings={settings}
        onOpenTrackModal={() => setIsTrackPassOpen(true)}
      />

      {/* Main Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        settings={settings}
        onOpenTrackModal={() => setIsTrackPassOpen(true)}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogoutAdmin={handleAdminLogout}
      />

      {/* Main View Router */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME */}
        {currentView === 'home' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              settings={settings}
              upcomingTournament={tournaments[0]}
              onRegisterClick={() => handleOpenRegister()}
              onViewTournamentsClick={() => {
                const elem = document.getElementById('tournaments-section');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                else setCurrentView('tournaments');
              }}
              onOpenTrackModal={() => setIsTrackPassOpen(true)}
            />

            {/* Upcoming Tournaments Section */}
            <section id="tournaments-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-red-950 text-red-400 font-tech font-bold px-2.5 py-0.5 rounded text-xs tracking-wider uppercase border border-red-800/60 inline-flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      7 DAILY SLOTS
                    </span>
                    <span className="text-zinc-400 font-tech text-xs">
                      Today's Competitive Custom Rooms
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-heading font-black text-white mt-1">
                    UPCOMING TOURNAMENTS
                  </h2>
                  <p className="text-zinc-400 text-xs sm:text-sm font-tech max-w-xl">
                    Entry Fee: ₹30/player • Booyah Reward: ₹115 • Kill Bounty: ₹15 per verified kill.
                  </p>
                </div>

                {/* Mode Filter Pills */}
                <div className="flex items-center gap-1.5 bg-zinc-900/90 p-1.5 rounded-xl border border-zinc-800 self-start md:self-auto">
                  {(['ALL', 'SOLO', 'DUO', 'SQUAD'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setTournamentModeFilter(mode)}
                      className={`px-3 py-1.5 rounded-lg font-tech text-xs uppercase font-bold tracking-wider transition-all cursor-pointer ${
                        tournamentModeFilter === mode
                          ? 'bg-red-600 text-white shadow-md shadow-red-950/60'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tournament Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTournaments.slice(0, 6).map((tournament) => (
                  <TournamentCard
                    key={tournament.id}
                    tournament={tournament}
                    onRegister={handleOpenRegister}
                    onViewDetails={handleOpenDetailModal}
                    onTrackPass={() => setIsTrackPassOpen(true)}
                  />
                ))}
              </div>

              {/* View All Tournaments Link */}
              <div className="text-center pt-4">
                <button
                  onClick={() => {
                    setCurrentView('tournaments');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white font-tech text-xs uppercase font-bold tracking-wider transition-all cursor-pointer"
                >
                  <span>View All 7 Daily Matches</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </section>

            {/* Interactive Reward Calculator */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <PrizeCalculator onRegisterClick={() => handleOpenRegister()} />
            </section>

            {/* How It Works */}
            <HowItWorks onRegisterClick={() => handleOpenRegister()} />

            {/* Leaderboard Teaser Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="bg-[#101118] border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <span className="text-[10px] font-tech text-amber-400 font-bold uppercase tracking-wider bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800">
                    HALL OF CHAMPIONS
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
                    CHECK LIVE KILL LEADERBOARDS & BOOYAH WINNERS
                  </h3>
                  <p className="text-xs sm:text-sm font-tech text-zinc-400 max-w-xl">
                    Every match result is audited by our referee desk. Verified kills are published with instant UPI reward proof.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setCurrentView('leaderboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-heading font-black uppercase tracking-wider text-xs rounded-xl border border-zinc-700 flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>View Leaderboard</span>
                </button>
              </div>
            </section>

            {/* FAQ Section */}
            <FAQSection />

            {/* WhatsApp Community Bottom Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="bg-gradient-to-r from-emerald-950 via-zinc-950 to-zinc-950 border-2 border-emerald-600/50 rounded-2xl p-6 sm:p-10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
                <div className="space-y-2">
                  <span className="text-xs font-tech text-emerald-400 font-bold uppercase tracking-widest flex items-center justify-center lg:justify-start gap-1.5">
                    <MessageCircle className="w-4 h-4" />
                    OFFICIAL COMMUNITY
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-heading font-black text-white">
                    JOIN THE FF ELITE ARENA WHATSAPP COMMUNITY
                  </h3>
                  <p className="text-xs sm:text-sm font-tech text-zinc-300 max-w-xl">
                    Get custom room ID notifications, instant slot updates, scrimmage announcements, and 1-on-1 support from organizers.
                  </p>
                </div>

                <a
                  href={settings.whatsappCommunityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-tech font-bold text-xs uppercase tracking-wider rounded-xl shadow-xl shadow-emerald-950/60 transition-all flex items-center gap-2.5 whitespace-nowrap cursor-pointer hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Join WhatsApp Community Now</span>
                </a>
              </div>
            </section>

          </div>
        )}

        {/* VIEW 2: TOURNAMENTS */}
        {currentView === 'tournaments' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
              <div>
                <span className="bg-red-950 text-red-400 font-tech font-bold px-3 py-1 rounded text-xs tracking-wider uppercase border border-red-800/60 inline-flex items-center gap-1.5">
                  <Swords className="w-3.5 h-3.5 text-red-400" />
                  DAILY COMPETITIVE SCHEDULE
                </span>
                <h1 className="text-3xl sm:text-5xl font-heading font-black text-white mt-2">
                  CUSTOM ROOM MATCHES
                </h1>
                <p className="text-zinc-400 text-sm font-tech max-w-xl mt-1">
                  7 daily matches across Solo, Duo, and Squad. ₹30 entry, ₹115 Booyah victory, and ₹15 per verified kill.
                </p>
              </div>

              {/* Mode filter */}
              <div className="flex items-center gap-1.5 bg-zinc-900/90 p-1.5 rounded-xl border border-zinc-800 self-start md:self-auto">
                {(['ALL', 'SOLO', 'DUO', 'SQUAD'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setTournamentModeFilter(mode)}
                    className={`px-3.5 py-1.5 rounded-lg font-tech text-xs uppercase font-bold tracking-wider transition-all cursor-pointer ${
                      tournamentModeFilter === mode
                        ? 'bg-red-600 text-white shadow-md shadow-red-950/60'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTournaments.map((tournament) => (
                <TournamentCard
                  key={tournament.id}
                  tournament={tournament}
                  onRegister={handleOpenRegister}
                  onViewDetails={handleOpenDetailModal}
                  onTrackPass={() => setIsTrackPassOpen(true)}
                />
              ))}
            </div>

            {/* Bottom info banner */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 flex items-center justify-between text-xs font-tech text-zinc-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Room ID and Password are disclosed to approved players 15 minutes before match start.</span>
              </div>
              <button
                onClick={() => setIsTrackPassOpen(true)}
                className="text-amber-400 hover:text-amber-300 underline cursor-pointer"
              >
                Track My Room Pass →
              </button>
            </div>
          </div>
        )}

        {/* VIEW 3: RULES & FAIR PLAY */}
        {currentView === 'rules' && (
          <RulesView
            settings={settings}
            onRegisterClick={() => handleOpenRegister()}
          />
        )}

        {/* VIEW 4: LEADERBOARD & RESULTS */}
        {(currentView === 'leaderboard' || currentView === 'results') && (
          <LeaderboardView
            leaderboard={leaderboard}
            results={results}
            onRegisterClick={() => handleOpenRegister()}
          />
        )}

        {/* VIEW 5: CONTACT & SUPPORT */}
        {currentView === 'contact' && (
          <ContactView settings={settings} />
        )}

        {/* VIEW 6: ADMIN DASHBOARD */}
        {currentView === 'admin' && (
          <div>
            {isAdminLoggedIn ? (
              <AdminDashboard
                tournaments={tournaments}
                registrations={registrations}
                leaderboard={leaderboard}
                results={results}
                settings={settings}
                onRefreshData={refreshData}
                onLogout={handleAdminLogout}
              />
            ) : (
              <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
                <div className="w-16 h-16 bg-red-950/80 border border-red-600 rounded-full flex items-center justify-center mx-auto text-red-500">
                  <KeyRound className="w-8 h-8" />
                </div>
                <h2 className="font-heading font-black text-2xl text-white">ADMIN AUTHENTICATION REQUIRED</h2>
                <p className="text-zinc-400 text-xs font-tech">Please authenticate to access tournament operations and UTR verification.</p>
                <button
                  onClick={() => setIsAdminLoginOpen(true)}
                  className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 text-white font-heading font-black text-xs uppercase tracking-wider rounded-lg cursor-pointer"
                >
                  Unlock Admin Portal
                </button>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenTrackModal={() => setIsTrackPassOpen(true)}
      />

      {/* MODALS */}

      {/* 1. Registration Modal */}
      <RegistrationModal
        tournament={selectedTournamentForReg}
        tournaments={tournaments}
        settings={settings}
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegistrationSuccess={handleRegistrationSuccess}
      />

      {/* 2. Room Pass & Registration Lookup Modal */}
      <TrackSlotModal
        isOpen={isTrackPassOpen}
        onClose={() => setIsTrackPassOpen(false)}
        settings={settings}
      />

      {/* 3. Tournament Detail Modal */}
      <TournamentDetailModal
        tournament={detailModalTournament}
        registrations={registrations}
        isOpen={!!detailModalTournament}
        onClose={() => setDetailModalTournament(null)}
        onRegister={handleOpenRegister}
        onTrackPass={() => {
          setDetailModalTournament(null);
          setIsTrackPassOpen(true);
        }}
      />

      {/* 4. Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdminLoggedIn(true);
          setCurrentView('admin');
        }}
      />

    </div>
  );
}
