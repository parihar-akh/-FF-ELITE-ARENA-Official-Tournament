import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showTagline = false,
  className = '' 
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl sm:text-5xl'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Custom Original Esports Shield Crest with Flames & Ruby Facet */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center filter drop-shadow-[0_0_12px_rgba(220,38,38,0.7)]`}>
        <svg viewBox="0 0 120 120" className="w-full h-full overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Outer Flame Gradient */}
            <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#7f1d1d" />
              <stop offset="40%" stopColor="#dc2626" />
              <stop offset="85%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>

            {/* Shield Body Gradient */}
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#27272a" />
              <stop offset="45%" stopColor="#09090b" />
              <stop offset="100%" stopColor="#18181b" />
            </linearGradient>

            {/* Ruby Gem Facet Gradient */}
            <linearGradient id="rubyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff4d4d" />
              <stop offset="40%" stopColor="#dc2626" />
              <stop offset="80%" stopColor="#991b1b" />
              <stop offset="100%" stopColor="#450a0a" />
            </linearGradient>

            {/* Gold Border Gradient */}
            <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            {/* Metallic Silver Banner Gradient */}
            <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>

          {/* Background Fiery Esports Wings / Flames */}
          <path
            d="M60 4 C40 18 20 28 15 50 C10 70 24 88 32 94 C26 86 28 68 36 58 C38 78 48 95 60 102 C72 95 82 78 84 58 C92 68 94 86 88 94 C96 88 110 70 105 50 C100 28 80 18 60 4Z"
            fill="url(#flameGrad)"
            opacity="0.95"
          />

          {/* Top Apex Flame Tongue */}
          <path
            d="M60 0 C54 10 50 20 54 28 C57 20 63 20 66 28 C70 20 66 10 60 0Z"
            fill="#fef08a"
          />

          {/* Outer Shield Hex-Angled Contour */}
          <polygon
            points="60,18 94,36 84,86 60,104 36,86 26,36"
            fill="url(#goldBorder)"
          />

          {/* Inner Dark Titanium Shield Plate */}
          <polygon
            points="60,22 90,38 81,83 60,99 39,83 30,38"
            fill="url(#shieldGrad)"
            stroke="#ef4444"
            strokeWidth="1.5"
          />

          {/* Faceted Ruby Diamond Core */}
          <polygon
            points="60,28 78,44 60,78 42,44"
            fill="url(#rubyGrad)"
          />

          {/* Diamond Facet Shading */}
          <polygon points="60,28 78,44 60,54" fill="#ff7878" opacity="0.6" />
          <polygon points="60,28 42,44 60,54" fill="#b91c1c" opacity="0.8" />
          <polygon points="42,44 60,78 60,54" fill="#7f1d1d" opacity="0.9" />
          <polygon points="78,44 60,78 60,54" fill="#ef4444" opacity="0.75" />

          {/* Cross Glimmer Star */}
          <circle cx="60" cy="50" r="3" fill="#ffffff" filter="drop-shadow(0 0 4px #ffffff)" />

          {/* Lower Silver Chevron Banner */}
          <polygon
            points="24,84 96,84 88,96 60,106 32,96"
            fill="url(#silverGrad)"
            stroke="#f59e0b"
            strokeWidth="1.5"
          />

          {/* FF Crown Marks */}
          <path
            d="M50 88 L50 92 M70 88 L70 92 M60 86 L60 92"
            stroke="#09090b"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center tracking-wider font-heading font-black">
          <span className={`${textSizes[size]} text-white uppercase italic drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]`}>
            FF <span className="text-red-500">ELITE</span>
          </span>
          <span className={`${textSizes[size]} ml-1.5 text-amber-400 uppercase italic font-bold tracking-widest`}>
            ARENA
          </span>
        </div>

        {showTagline && (
          <span className="text-[10px] sm:text-xs text-zinc-400 font-tech uppercase tracking-widest -mt-0.5 font-semibold">
            Play Fair • Compete Hard • Win Big
          </span>
        )}
      </div>
    </div>
  );
};
