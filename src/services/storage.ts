import { 
  Tournament, 
  Registration, 
  LeaderboardPlayer, 
  MatchResultRecord, 
  PlatformSettings 
} from '../types';

const STORAGE_KEYS = {
  TOURNAMENTS: 'ff_elite_tournaments_v1',
  REGISTRATIONS: 'ff_elite_registrations_v1',
  LEADERBOARD: 'ff_elite_leaderboard_v1',
  RESULTS: 'ff_elite_results_v1',
  SETTINGS: 'ff_elite_settings_v1',
  ADMIN_AUTH: 'ff_elite_admin_session_v1',
};

// Initial default settings
export const DEFAULT_SETTINGS: PlatformSettings = {
  brandName: 'FF ELITE ARENA',
  tagline: 'Play Fair. Compete Hard. Win Big.',
  ownerName: 'Akash Singh Parihar',
  adminEmail: 'aakashparihar000@gmail.com',
  whatsappCommunityUrl: 'https://whatsapp.com/channel/0029Vb8vhrD84Om5MFpNEu2D',
  adminWhatsappNumber: '+91 81035 47416',
  upiId: '8103547416@upi',
  upiMerchantName: 'Akash Singh Parihar (FF Elite Arena)',
  dailyMatchesCount: 7,
  defaultEntryFee: 30,
  defaultBooyahReward: 115,
  defaultKillReward: 15,
  announcementText: '🔥 REGISTRATIONS OPEN: 7 DAILY MATCHES • ₹30 ENTRY • ₹115 BOOYAH • ₹15/KILL • ROOM ID GIVEN 15 MINS BEFORE MATCH',
  showAnnouncement: true,
};

// Today's date string YYYY-MM-DD
const getTodayDate = () => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

export const INITIAL_TOURNAMENTS: Tournament[] = [
  {
    id: 'tour-m1',
    matchNumber: 1,
    title: 'Daily Battle Royale - Match 01',
    mode: 'SOLO',
    map: 'Bermuda',
    date: getTodayDate(),
    startTime: '11:00 AM',
    entryFee: 30,
    booyahReward: 115,
    killReward: 15,
    totalPrizePool: 835,
    maxSlots: 48,
    filledSlots: 42,
    status: 'REGISTRATION_OPEN',
    roomId: '7829104',
    roomPassword: 'ffelite-pass-99',
    credentialsPublishedAt: '10:45 AM',
    isDemo: false,
  },
  {
    id: 'tour-m2',
    matchNumber: 2,
    title: 'Daily Battle Royale - Match 02',
    mode: 'SOLO',
    map: 'Purgatory',
    date: getTodayDate(),
    startTime: '01:00 PM',
    entryFee: 30,
    booyahReward: 115,
    killReward: 15,
    totalPrizePool: 835,
    maxSlots: 48,
    filledSlots: 36,
    status: 'REGISTRATION_OPEN',
    roomId: '7829215',
    roomPassword: 'elite-room-02',
    credentialsPublishedAt: '12:45 PM',
    isDemo: false,
  },
  {
    id: 'tour-m3',
    matchNumber: 3,
    title: 'Daily Battle Royale - Match 03',
    mode: 'DUO',
    map: 'Kalahari',
    date: getTodayDate(),
    startTime: '03:00 PM',
    entryFee: 30,
    booyahReward: 115,
    killReward: 15,
    totalPrizePool: 835,
    maxSlots: 48,
    filledSlots: 24,
    status: 'REGISTRATION_OPEN',
    isDemo: false,
  },
  {
    id: 'tour-m4',
    matchNumber: 4,
    title: 'Daily Battle Royale - Match 04',
    mode: 'SOLO',
    map: 'Bermuda',
    date: getTodayDate(),
    startTime: '05:00 PM',
    entryFee: 30,
    booyahReward: 115,
    killReward: 15,
    totalPrizePool: 835,
    maxSlots: 48,
    filledSlots: 18,
    status: 'REGISTRATION_OPEN',
    isDemo: false,
  },
  {
    id: 'tour-m5',
    matchNumber: 5,
    title: 'Daily Battle Royale - Match 05 (Prime)',
    mode: 'SQUAD',
    map: 'Alpine',
    date: getTodayDate(),
    startTime: '07:00 PM',
    entryFee: 30,
    booyahReward: 115,
    killReward: 15,
    totalPrizePool: 835,
    maxSlots: 48,
    filledSlots: 46,
    status: 'REGISTRATION_OPEN',
    isDemo: false,
  },
  {
    id: 'tour-m6',
    matchNumber: 6,
    title: 'Daily Battle Royale - Match 06 (Night)',
    mode: 'SOLO',
    map: 'Bermuda',
    date: getTodayDate(),
    startTime: '09:00 PM',
    entryFee: 30,
    booyahReward: 115,
    killReward: 15,
    totalPrizePool: 835,
    maxSlots: 48,
    filledSlots: 30,
    status: 'REGISTRATION_OPEN',
    isDemo: false,
  },
  {
    id: 'tour-m7',
    matchNumber: 7,
    title: 'Midnight Blitz - Match 07',
    mode: 'SOLO',
    map: 'NexTerra',
    date: getTodayDate(),
    startTime: '10:30 PM',
    entryFee: 30,
    booyahReward: 115,
    killReward: 15,
    totalPrizePool: 835,
    maxSlots: 48,
    filledSlots: 15,
    status: 'REGISTRATION_OPEN',
    isDemo: false,
  },
];

export const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: 'reg-01',
    referenceId: 'FFA-M1-4891',
    tournamentId: 'tour-m1',
    matchNumber: 1,
    playerName: 'ThunderStrike',
    ffUid: '1098472911',
    whatsappNumber: '9876501234',
    mode: 'SOLO',
    totalFee: 30,
    paymentMethod: 'UPI',
    paymentUtr: '428910481920',
    paymentStatus: 'VERIFIED',
    registrationStatus: 'APPROVED',
    slotNumber: 12,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'reg-02',
    referenceId: 'FFA-M1-9312',
    tournamentId: 'tour-m1',
    matchNumber: 1,
    playerName: 'ShadowSniper',
    ffUid: '2049182741',
    whatsappNumber: '9812345678',
    mode: 'SOLO',
    totalFee: 30,
    paymentMethod: 'UPI',
    paymentUtr: '428929184711',
    paymentStatus: 'PENDING',
    registrationStatus: 'SUBMITTED',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'reg-03',
    referenceId: 'FFA-M2-7104',
    tournamentId: 'tour-m2',
    matchNumber: 2,
    playerName: 'PhoenixRider',
    ffUid: '1849201948',
    whatsappNumber: '9898989898',
    mode: 'SOLO',
    totalFee: 30,
    paymentMethod: 'UPI',
    paymentUtr: '429019284729',
    paymentStatus: 'VERIFIED',
    registrationStatus: 'APPROVED',
    slotNumber: 4,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'reg-04',
    referenceId: 'FFA-M3-6621',
    tournamentId: 'tour-m3',
    matchNumber: 3,
    playerName: 'VortexAlpha',
    ffUid: '2948102948',
    whatsappNumber: '9765432109',
    mode: 'DUO',
    teamName: 'Vortex Duo',
    teammates: [
      { name: 'VortexBeta', uid: '2948102949' }
    ],
    totalFee: 60,
    paymentMethod: 'UPI',
    paymentUtr: '429104829104',
    paymentStatus: 'PENDING',
    registrationStatus: 'SUBMITTED',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  }
];

export const INITIAL_LEADERBOARD: LeaderboardPlayer[] = [
  {
    id: 'lb-01',
    rank: 1,
    playerName: 'ApexPredator',
    ffUid: '1098***911',
    teamName: 'Soul Elite',
    matchesPlayed: 14,
    verifiedKills: 38,
    booyahWins: 4,
    totalPoints: 114,
    totalWon: 1030,
    prizeStatus: 'DEMO',
    isDemo: true,
  },
  {
    id: 'lb-02',
    rank: 2,
    playerName: 'GhostHeadshot',
    ffUid: '1849***948',
    matchesPlayed: 12,
    verifiedKills: 32,
    booyahWins: 3,
    totalPoints: 92,
    totalWon: 825,
    prizeStatus: 'DEMO',
    isDemo: true,
  },
  {
    id: 'lb-03',
    rank: 3,
    playerName: 'KGF_Commander',
    ffUid: '2049***741',
    teamName: 'KGF Clan',
    matchesPlayed: 11,
    verifiedKills: 29,
    booyahWins: 2,
    totalPoints: 81,
    totalWon: 665,
    prizeStatus: 'DEMO',
    isDemo: true,
  },
  {
    id: 'lb-04',
    rank: 4,
    playerName: 'ViperX',
    ffUid: '3194***812',
    matchesPlayed: 9,
    verifiedKills: 24,
    booyahWins: 2,
    totalPoints: 70,
    totalWon: 590,
    prizeStatus: 'DEMO',
    isDemo: true,
  },
  {
    id: 'lb-05',
    rank: 5,
    playerName: 'CrimsonNinja',
    ffUid: '2840***192',
    matchesPlayed: 8,
    verifiedKills: 21,
    booyahWins: 1,
    totalPoints: 58,
    totalWon: 430,
    prizeStatus: 'DEMO',
    isDemo: true,
  },
  {
    id: 'lb-06',
    rank: 6,
    playerName: 'FrostByte',
    ffUid: '1948***281',
    matchesPlayed: 7,
    verifiedKills: 18,
    booyahWins: 1,
    totalPoints: 51,
    totalWon: 385,
    prizeStatus: 'DEMO',
    isDemo: true,
  },
];

export const INITIAL_RESULTS: MatchResultRecord[] = [
  {
    id: 'res-01',
    tournamentId: 'demo-yesterday-m7',
    matchNumber: 7,
    matchTitle: 'Midnight Blitz - Match 07',
    date: 'Yesterday',
    mode: 'SOLO',
    booyahWinner: {
      playerName: 'ApexPredator',
      ffUid: '1098***911',
      kills: 7,
      payout: 220, // 115 + (7 * 15)
    },
    topFragger: {
      playerName: 'ApexPredator',
      ffUid: '1098***911',
      kills: 7,
      payout: 105,
    },
    totalKillsVerified: 47,
    totalPrizePaid: 820,
    isDemo: true,
    notes: 'Demo record for layout demonstration. Actual results are published here by admin after room referee audit.',
  },
  {
    id: 'res-02',
    tournamentId: 'demo-yesterday-m6',
    matchNumber: 6,
    matchTitle: 'Daily Battle Royale - Match 06',
    date: 'Yesterday',
    mode: 'SOLO',
    booyahWinner: {
      playerName: 'GhostHeadshot',
      ffUid: '1849***948',
      kills: 6,
      payout: 205, // 115 + (6 * 15)
    },
    topFragger: {
      playerName: 'ShadowHunter',
      ffUid: '2841***920',
      kills: 8,
      payout: 120,
    },
    totalKillsVerified: 45,
    totalPrizePaid: 790,
    isDemo: true,
    notes: 'Demo record. Prize paid via UPI within 3 hours.',
  }
];

export const StorageService = {
  // Tournaments
  getTournaments(): Tournament[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TOURNAMENTS);
      if (!data) {
        this.saveTournaments(INITIAL_TOURNAMENTS);
        return INITIAL_TOURNAMENTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_TOURNAMENTS;
    }
  },

  saveTournaments(tournaments: Tournament[]): void {
    localStorage.setItem(STORAGE_KEYS.TOURNAMENTS, JSON.stringify(tournaments));
  },

  updateTournament(updated: Tournament): void {
    const list = this.getTournaments();
    const index = list.findIndex(t => t.id === updated.id);
    if (index >= 0) {
      list[index] = updated;
      this.saveTournaments(list);
    }
  },

  createTournament(newTour: Omit<Tournament, 'id'>): Tournament {
    const list = this.getTournaments();
    const tour: Tournament = {
      ...newTour,
      id: 'tour-' + Date.now(),
    };
    list.push(tour);
    this.saveTournaments(list);
    return tour;
  },

  // Registrations
  getRegistrations(): Registration[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
      if (!data) {
        this.saveRegistrations(INITIAL_REGISTRATIONS);
        return INITIAL_REGISTRATIONS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_REGISTRATIONS;
    }
  },

  saveRegistrations(registrations: Registration[]): void {
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
  },

  createRegistration(data: Omit<Registration, 'id' | 'referenceId' | 'createdAt' | 'paymentStatus' | 'registrationStatus'>): Registration {
    const registrations = this.getRegistrations();
    
    // Generate clean esports reference: FFA-M<matchNum>-<random 4 digits>
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `FFA-M${data.matchNumber}-${randomHex}`;

    const newReg: Registration = {
      ...data,
      id: 'reg-' + Date.now(),
      referenceId,
      paymentStatus: 'PENDING',
      registrationStatus: 'SUBMITTED',
      createdAt: new Date().toISOString(),
    };

    registrations.unshift(newReg);
    this.saveRegistrations(registrations);

    // Increment filledSlots on tournament
    const tournaments = this.getTournaments();
    const tourIndex = tournaments.findIndex(t => t.id === data.tournamentId);
    if (tourIndex >= 0) {
      const tour = tournaments[tourIndex];
      const slotsCount = data.mode === 'SQUAD' ? 4 : data.mode === 'DUO' ? 2 : 1;
      tour.filledSlots = Math.min(tour.maxSlots, tour.filledSlots + slotsCount);
      this.saveTournaments(tournaments);
    }

    return newReg;
  },

  updateRegistration(updated: Registration): void {
    const list = this.getRegistrations();
    const index = list.findIndex(r => r.id === updated.id);
    if (index >= 0) {
      list[index] = updated;
      this.saveRegistrations(list);
    }
  },

  findRegistrationByRefOrPhone(query: string): Registration | undefined {
    const clean = query.trim().toLowerCase();
    const list = this.getRegistrations();
    return list.find(r => 
      r.referenceId.toLowerCase() === clean || 
      r.whatsappNumber.includes(clean) ||
      r.ffUid === clean
    );
  },

  // Leaderboard
  getLeaderboard(): LeaderboardPlayer[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
      if (!data) {
        this.saveLeaderboard(INITIAL_LEADERBOARD);
        return INITIAL_LEADERBOARD;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_LEADERBOARD;
    }
  },

  saveLeaderboard(players: LeaderboardPlayer[]): void {
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(players));
  },

  // Match Results
  getResults(): MatchResultRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RESULTS);
      if (!data) {
        this.saveResults(INITIAL_RESULTS);
        return INITIAL_RESULTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_RESULTS;
    }
  },

  saveResults(results: MatchResultRecord[]): void {
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
  },

  addMatchResult(record: Omit<MatchResultRecord, 'id'>): MatchResultRecord {
    const list = this.getResults();
    const newRecord: MatchResultRecord = {
      ...record,
      id: 'res-' + Date.now(),
    };
    list.unshift(newRecord);
    this.saveResults(list);
    return newRecord;
  },

  // Settings
  getSettings(): PlatformSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) {
        this.saveSettings(DEFAULT_SETTINGS);
        return DEFAULT_SETTINGS;
      }
      const parsed = JSON.parse(data);
      // Seamlessly migrate legacy placeholder if found
      if (
        !parsed.whatsappCommunityUrl || 
        parsed.whatsappCommunityUrl.includes('sample-ffelite') || 
        parsed.adminWhatsappNumber?.includes('98765') ||
        !parsed.adminEmail ||
        parsed.adminEmail.includes('ffelitearena.com')
      ) {
        const migrated: PlatformSettings = {
          ...DEFAULT_SETTINGS,
          ...parsed,
          ownerName: DEFAULT_SETTINGS.ownerName,
          adminEmail: DEFAULT_SETTINGS.adminEmail,
          whatsappCommunityUrl: DEFAULT_SETTINGS.whatsappCommunityUrl,
          adminWhatsappNumber: DEFAULT_SETTINGS.adminWhatsappNumber,
          upiId: parsed.upiId === 'ffelitearena@upi' ? DEFAULT_SETTINGS.upiId : parsed.upiId,
          upiMerchantName: parsed.upiMerchantName === 'FF Elite Arena Esports' ? DEFAULT_SETTINGS.upiMerchantName : parsed.upiMerchantName,
        };
        this.saveSettings(migrated);
        return migrated;
      }
      return { ...DEFAULT_SETTINGS, ...parsed };
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: PlatformSettings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  // Admin Session
  isAdminLoggedIn(): boolean {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  },

  setAdminLoggedIn(value: boolean): void {
    if (value) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    }
  },

  // Reset to demo defaults
  resetAllToDefault(): void {
    localStorage.removeItem(STORAGE_KEYS.TOURNAMENTS);
    localStorage.removeItem(STORAGE_KEYS.REGISTRATIONS);
    localStorage.removeItem(STORAGE_KEYS.LEADERBOARD);
    localStorage.removeItem(STORAGE_KEYS.RESULTS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  }
};
