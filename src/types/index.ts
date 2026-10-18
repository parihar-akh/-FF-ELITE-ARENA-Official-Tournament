export type TournamentMode = 'SOLO' | 'DUO' | 'SQUAD';

export type TournamentStatus = 
  | 'REGISTRATION_OPEN' 
  | 'REGISTRATION_CLOSED' 
  | 'LIVE' 
  | 'COMPLETED' 
  | 'CANCELLED';

export type PaymentStatus = 'PENDING' | 'VERIFIED' | 'REJECTED';
export type RegistrationStatus = 'SUBMITTED' | 'APPROVED' | 'REJECTED';

export interface TeammateInfo {
  name: string;
  uid: string;
}

export interface Tournament {
  id: string;
  matchNumber: number; // 1 to 7
  title: string;
  mode: TournamentMode;
  map: 'Bermuda' | 'Purgatory' | 'Kalahari' | 'Alpine' | 'NexTerra';
  date: string; // YYYY-MM-DD
  startTime: string; // e.g. "11:00 AM"
  entryFee: number; // ₹30 per player
  booyahReward: number; // ₹115 per match
  killReward: number; // ₹15 per verified kill
  totalPrizePool: number; // e.g. ₹865+
  maxSlots: number; // default 48
  filledSlots: number;
  status: TournamentStatus;
  roomId?: string; // Private, published before match
  roomPassword?: string; // Private, published before match
  credentialsPublishedAt?: string;
  isDemo: boolean;
}

export interface Registration {
  id: string;
  referenceId: string; // e.g. "FFA-M1-7892"
  tournamentId: string;
  matchNumber: number;
  playerName: string;
  ffUid: string;
  whatsappNumber: string;
  mode: TournamentMode;
  teamName?: string;
  teammates?: TeammateInfo[];
  totalFee: number;
  paymentMethod: 'UPI';
  paymentUtr: string; // UTR / Reference ID
  paymentProofName?: string;
  paymentStatus: PaymentStatus;
  registrationStatus: RegistrationStatus;
  slotNumber?: number;
  rejectionReason?: string;
  createdAt: string;
}

export interface LeaderboardPlayer {
  id: string;
  rank: number;
  playerName: string;
  ffUid: string;
  teamName?: string;
  matchesPlayed: number;
  verifiedKills: number;
  booyahWins: number;
  totalPoints: number;
  totalWon: number;
  prizeStatus: 'PAID' | 'PROCESSING' | 'DEMO';
  isDemo: boolean;
}

export interface MatchResultRecord {
  id: string;
  tournamentId: string;
  matchNumber: number;
  matchTitle: string;
  date: string;
  mode: TournamentMode;
  booyahWinner: {
    playerName: string;
    ffUid: string;
    kills: number;
    payout: number;
  };
  topFragger: {
    playerName: string;
    ffUid: string;
    kills: number;
    payout: number;
  };
  totalKillsVerified: number;
  totalPrizePaid: number;
  isDemo: boolean;
  notes?: string;
}

export interface PlatformSettings {
  brandName: string;
  tagline: string;
  ownerName?: string;
  adminEmail?: string;
  whatsappCommunityUrl: string;
  adminWhatsappNumber: string;
  upiId: string;
  upiMerchantName: string;
  dailyMatchesCount: number;
  defaultEntryFee: number;
  defaultBooyahReward: number;
  defaultKillReward: number;
  announcementText: string;
  showAnnouncement: boolean;
}
