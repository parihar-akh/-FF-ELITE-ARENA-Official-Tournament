import React, { useState } from 'react';
import { 
  Trophy, 
  Swords, 
  Medal, 
  Search, 
  Flame, 
  ShieldCheck, 
  AlertCircle, 
  Calendar, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { LeaderboardPlayer, MatchResultRecord } from '../types';

interface LeaderboardViewProps {
  leaderboard: LeaderboardPlayer[];
  results: MatchResultRecord[];
  onRegisterClick: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  leaderboard,
  results,
  onRegisterClick,
}) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'match_results'>('leaderboard');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeaderboard = leaderboard.filter(p =>
    p.playerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.teamName && p.teamName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    p.ffUid.includes(searchQuery)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-red-950 text-red-400 font-tech font-bold px-3 py-1 rounded text-xs tracking-wider uppercase border border-red-800/60 inline-flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Official Standings & Archives
            </span>
            <span className="bg-amber-950/80 text-amber-300 font-tech font-bold px-2.5 py-1 rounded text-xs uppercase border border-amber-600/40">
              DEMO NOTICE ACTIVE
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white mt-2">
            HALL OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-500">CHAMPIONS</span>
          </h1>
          <p className="text-zinc-400 text-sm font-tech max-w-2xl mt-1">
            Tracking verified kills, Booyah victories, and confirmed UPI prize payouts across all FF ELITE ARENA custom room tournaments.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2 bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-lg font-tech text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
              activeTab === 'leaderboard'
                ? 'bg-red-600 text-white shadow-lg shadow-red-950/60'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Seasonal Leaderboard
          </button>
          <button
            onClick={() => setActiveTab('match_results')}
            className={`px-4 py-2 rounded-lg font-tech text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
              activeTab === 'match_results'
                ? 'bg-red-600 text-white shadow-lg shadow-red-950/60'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Match Results Archive
          </button>
        </div>
      </div>

      {/* Mandatory Transparent Data Notice */}
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs font-tech text-zinc-300 leading-relaxed">
          <strong className="text-amber-400 block font-bold">FAIR PLAY & INTEGRITY COMMITMENT:</strong>
          Rows tagged with <span className="px-1.5 py-0.5 bg-amber-950 text-amber-400 rounded text-[10px] font-bold">DEMO</span> represent pre-launch illustrative sample data. Only matches verified by our live room referee and published through the authorized admin desk receive the <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-400 rounded text-[10px] font-bold">OFFICIAL VERIFIED</span> seal. We never fabricate player scores or prize records.
        </div>
      </div>

      {activeTab === 'leaderboard' ? (
        <div className="space-y-6">
          
          {/* Top 3 Podium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {/* Rank 2 */}
            {leaderboard[1] && (
              <div className="bg-[#12131b] border border-zinc-800 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between order-2 md:order-1">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                  <span className="font-tech text-xs text-zinc-400">RANK #2 • SILVER</span>
                  <span className="text-[10px] font-tech px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded font-bold">
                    {leaderboard[1].isDemo ? 'DEMO' : 'VERIFIED'}
                  </span>
                </div>
                <div className="py-4 text-center">
                  <div className="w-14 h-14 bg-zinc-800 border-2 border-zinc-400 rounded-full flex items-center justify-center mx-auto text-zinc-300 font-heading font-black text-2xl shadow-lg">
                    2
                  </div>
                  <div className="font-heading font-black text-xl text-white mt-3">
                    {leaderboard[1].playerName}
                  </div>
                  <div className="text-xs font-tech text-zinc-500">UID: {leaderboard[1].ffUid}</div>
                  
                  <div className="mt-3 flex items-center justify-center gap-4 text-xs font-tech">
                    <span className="text-red-400 font-bold">{leaderboard[1].verifiedKills} Kills</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-amber-400 font-bold">{leaderboard[1].booyahWins} Booyahs</span>
                  </div>
                </div>
                <div className="p-3 bg-zinc-950 rounded-lg text-center font-tech text-xs text-zinc-300">
                  Earned: <strong className="text-emerald-400 font-bold">₹{leaderboard[1].totalWon}</strong>
                </div>
              </div>
            )}

            {/* Rank 1 - Crown */}
            {leaderboard[0] && (
              <div className="bg-gradient-to-b from-[#1c1822] to-[#121017] border-2 border-amber-500/70 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between order-1 md:order-2 shadow-[0_0_35px_rgba(245,158,11,0.2)] md:-translate-y-2">
                <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
                  <span className="font-tech text-xs text-amber-400 font-bold flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5" />
                    RANK #1 • GOLD CHAMPION
                  </span>
                  <span className="text-[10px] font-tech px-2 py-0.5 bg-amber-950 text-amber-400 rounded font-bold border border-amber-700/60">
                    {leaderboard[0].isDemo ? 'DEMO' : 'VERIFIED'}
                  </span>
                </div>
                <div className="py-4 text-center">
                  <div className="w-16 h-16 bg-gradient-to-tr from-amber-600 to-yellow-300 border-2 border-yellow-200 rounded-full flex items-center justify-center mx-auto text-black font-heading font-black text-3xl shadow-xl">
                    👑
                  </div>
                  <div className="font-heading font-black text-2xl text-white mt-3">
                    {leaderboard[0].playerName}
                  </div>
                  {leaderboard[0].teamName && (
                    <div className="text-xs font-tech text-amber-400 uppercase font-semibold">
                      [{leaderboard[0].teamName}]
                    </div>
                  )}
                  <div className="text-xs font-tech text-zinc-500">UID: {leaderboard[0].ffUid}</div>
                  
                  <div className="mt-3 flex items-center justify-center gap-4 text-xs font-tech">
                    <span className="text-red-400 font-bold">{leaderboard[0].verifiedKills} Kills</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-amber-400 font-bold">{leaderboard[0].booyahWins} Booyahs</span>
                  </div>
                </div>
                <div className="p-3 bg-zinc-950/80 rounded-lg text-center font-tech text-xs text-zinc-300 border border-amber-500/20">
                  Total Rewards Won: <strong className="text-emerald-400 text-sm font-bold">₹{leaderboard[0].totalWon}</strong>
                </div>
              </div>
            )}

            {/* Rank 3 */}
            {leaderboard[2] && (
              <div className="bg-[#12131b] border border-zinc-800 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between order-3">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                  <span className="font-tech text-xs text-zinc-400">RANK #3 • BRONZE</span>
                  <span className="text-[10px] font-tech px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded font-bold">
                    {leaderboard[2].isDemo ? 'DEMO' : 'VERIFIED'}
                  </span>
                </div>
                <div className="py-4 text-center">
                  <div className="w-14 h-14 bg-zinc-800 border-2 border-amber-800 rounded-full flex items-center justify-center mx-auto text-amber-600 font-heading font-black text-2xl shadow-lg">
                    3
                  </div>
                  <div className="font-heading font-black text-xl text-white mt-3">
                    {leaderboard[2].playerName}
                  </div>
                  <div className="text-xs font-tech text-zinc-500">UID: {leaderboard[2].ffUid}</div>
                  
                  <div className="mt-3 flex items-center justify-center gap-4 text-xs font-tech">
                    <span className="text-red-400 font-bold">{leaderboard[2].verifiedKills} Kills</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-amber-400 font-bold">{leaderboard[2].booyahWins} Booyahs</span>
                  </div>
                </div>
                <div className="p-3 bg-zinc-950 rounded-lg text-center font-tech text-xs text-zinc-300">
                  Earned: <strong className="text-emerald-400 font-bold">₹{leaderboard[2].totalWon}</strong>
                </div>
              </div>
            )}
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-2 max-w-md">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
              <input
                type="text"
                placeholder="Search player, clan, or UID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-tech text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Full Table */}
          <div className="bg-[#101118] border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-tech">
                <thead>
                  <tr className="bg-zinc-900/80 border-b border-zinc-800 text-zinc-400 uppercase tracking-wider">
                    <th className="py-3 px-4 font-bold">Rank</th>
                    <th className="py-3 px-4 font-bold">Player / Clan</th>
                    <th className="py-3 px-4 font-bold text-center">Matches</th>
                    <th className="py-3 px-4 font-bold text-center">Verified Kills</th>
                    <th className="py-3 px-4 font-bold text-center">Booyahs</th>
                    <th className="py-3 px-4 font-bold text-center">Points</th>
                    <th className="py-3 px-4 font-bold text-right">Prize Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
                  {filteredLeaderboard.map((player) => (
                    <tr 
                      key={player.id} 
                      className="hover:bg-zinc-900/40 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded font-heading font-black text-sm ${
                          player.rank === 1 ? 'bg-amber-500 text-black' :
                          player.rank === 2 ? 'bg-zinc-300 text-black' :
                          player.rank === 3 ? 'bg-amber-800 text-white' :
                          'bg-zinc-900 text-zinc-400'
                        }`}>
                          {player.rank}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-bold text-white text-sm">
                          {player.playerName}
                          {player.teamName && (
                            <span className="text-zinc-500 text-xs ml-1.5 font-normal">
                              [{player.teamName}]
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-zinc-500">UID: {player.ffUid}</div>
                      </td>

                      <td className="py-3 px-4 text-center font-semibold text-zinc-400">
                        {player.matchesPlayed}
                      </td>

                      <td className="py-3 px-4 text-center font-bold text-red-400">
                        {player.verifiedKills}
                      </td>

                      <td className="py-3 px-4 text-center font-bold text-amber-400">
                        {player.booyahWins}
                      </td>

                      <td className="py-3 px-4 text-center font-black text-white text-sm">
                        {player.totalPoints}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="font-bold text-emerald-400">₹{player.totalWon}</div>
                        <span className={`inline-block text-[9px] uppercase font-bold px-1.5 py-0.2 rounded mt-0.5 ${
                          player.isDemo ? 'bg-amber-950/80 text-amber-400 border border-amber-800/50' : 'bg-emerald-950 text-emerald-300'
                        }`}>
                          {player.isDemo ? 'DEMO DATA' : 'PAID VIA UPI'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Match Results Archive */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((res) => (
              <div 
                key={res.id}
                className="bg-[#101118] border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 shadow-lg space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div>
                    <span className="text-[10px] font-tech text-red-400 uppercase font-bold tracking-wider">
                      Match #{res.matchNumber} • {res.mode}
                    </span>
                    <h3 className="font-heading font-black text-lg text-white">
                      {res.matchTitle}
                    </h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-tech font-bold uppercase ${
                    res.isDemo ? 'bg-amber-950 text-amber-300 border border-amber-700/60' : 'bg-emerald-950 text-emerald-400'
                  }`}>
                    {res.isDemo ? 'DEMO RECORD' : 'VERIFIED OFFICIAL'}
                  </span>
                </div>

                {/* Highlights */}
                <div className="grid grid-cols-2 gap-3 text-xs font-tech">
                  <div className="p-3 bg-amber-950/20 border border-amber-600/30 rounded-lg">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
                      <Trophy className="w-3.5 h-3.5" />
                      Booyah Champion
                    </div>
                    <div className="font-bold text-white text-sm">{res.booyahWinner.playerName}</div>
                    <div className="text-[10px] text-zinc-400">UID: {res.booyahWinner.ffUid}</div>
                    <div className="mt-1 text-emerald-400 font-bold">Won: ₹{res.booyahWinner.payout}</div>
                  </div>

                  <div className="p-3 bg-red-950/20 border border-red-600/30 rounded-lg">
                    <div className="flex items-center gap-1.5 text-red-400 font-bold mb-1">
                      <Swords className="w-3.5 h-3.5" />
                      Top Fragger
                    </div>
                    <div className="font-bold text-white text-sm">{res.topFragger.playerName}</div>
                    <div className="text-[10px] text-zinc-400">{res.topFragger.kills} Kills</div>
                    <div className="mt-1 text-emerald-400 font-bold">Won: ₹{res.topFragger.payout}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-tech text-zinc-400 pt-2 border-t border-zinc-800/80">
                  <span>Total Kills Audited: <strong className="text-white">{res.totalKillsVerified}</strong></span>
                  <span>Total Pool Paid: <strong className="text-emerald-400 font-bold">₹{res.totalPrizePaid}</strong></span>
                </div>

                {res.notes && (
                  <div className="text-[11px] font-tech text-zinc-500 italic bg-zinc-950 p-2.5 rounded">
                    Referee Log: {res.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-red-950 via-zinc-900 to-amber-950 border border-red-800/40 rounded-2xl p-6 text-center space-y-3">
        <h3 className="font-heading font-black text-2xl text-white">
          WANT TO SEE YOUR NAME ON THE LEADERBOARD?
        </h3>
        <p className="text-zinc-400 text-xs font-tech max-w-lg mx-auto">
          Daily matches are held across Solo, Duo, and Squad modes with verified ₹15 per kill and ₹115 Booyah rewards.
        </p>
        <button
          onClick={onRegisterClick}
          className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 text-white font-heading font-bold uppercase tracking-wider text-sm rounded-lg shadow-lg cursor-pointer hover:opacity-90 active:scale-95 transition-all"
        >
          Register for Today's Matches
        </button>
      </div>

    </div>
  );
};
