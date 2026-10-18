import React from 'react';
import { Flame, ShieldCheck, Trophy, Swords } from 'lucide-react';
import { PlatformSettings } from '../types';

interface AnnouncementBarProps {
  settings: PlatformSettings;
  onOpenTrackModal: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ settings, onOpenTrackModal }) => {
  if (!settings.showAnnouncement) return null;

  return (
    <div className="bg-gradient-to-r from-red-950 via-zinc-950 to-red-950 border-b border-red-900/40 text-xs text-zinc-300 py-1.5 px-3 relative z-30 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Ticker Content */}
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-xs">
          <span className="bg-red-600/90 text-white font-tech font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase inline-flex items-center gap-1 shrink-0 animate-pulse">
            <Flame className="w-3 h-3 text-amber-300" />
            LIVE NOTICE
          </span>
          <span className="font-tech text-zinc-200 truncate">
            {settings.announcementText}
          </span>
        </div>

        {/* Action pills */}
        <div className="hidden md:flex items-center gap-3 shrink-0 text-[11px] font-tech">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Trophy className="w-3.5 h-3.5" />
            <span>Booyah: ₹{settings.defaultBooyahReward}</span>
          </div>
          <span className="text-zinc-600">•</span>
          <div className="flex items-center gap-1.5 text-red-400">
            <Swords className="w-3.5 h-3.5" />
            <span>Kill: ₹{settings.defaultKillReward}</span>
          </div>
          <span className="text-zinc-600">•</span>
          <button 
            onClick={onOpenTrackModal}
            className="text-zinc-200 hover:text-white underline underline-offset-2 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Check Room Pass Status</span>
          </button>
        </div>
      </div>
    </div>
  );
};
