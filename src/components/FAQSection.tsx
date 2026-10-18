import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Trophy, Smartphone, RefreshCw, Clock } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How and when do I receive the Custom Room ID & Password?',
      a: 'Once your payment UTR is verified by our admin, your registration is marked APPROVED. Exactly 15 minutes before match start, the Custom Room ID and Password will appear in the "Room Pass" lookup tool on this website. You also receive an alert in our WhatsApp community.',
      icon: Clock,
    },
    {
      q: 'What is the entry fee and reward breakdown?',
      a: 'The entry fee is exactly ₹30 per player (Solo: ₹30, Duo: ₹60, Squad: ₹120). The match winner gets a ₹115 Booyah reward. In addition, you earn ₹15 for every verified kill you score during the match.',
      icon: Trophy,
    },
    {
      q: 'How do you verify my kills and Booyah win?',
      a: 'Every match has 2 live tournament referees observing the lobby. Immediately after elimination or victory, take a screenshot of your match summary screen showing your IGN, UID, and kill count, and submit it via our WhatsApp desk within 30 minutes.',
      icon: ShieldCheck,
    },
    {
      q: 'Can I participate using a PC emulator (Bluestacks, etc.)?',
      a: 'NO. FF ELITE ARENA is strictly for mobile and tablet touch players. Our custom rooms are configured to block PC emulators. Any player attempting to bypass this restriction using scripts will be permanently banned with zero refund.',
      icon: Smartphone,
    },
    {
      q: 'How fast are prize winnings sent to my account?',
      a: 'Prize winnings are audited and transferred directly to your registered UPI ID (GPay, PhonePe, Paytm, or BHIM) within 2 to 4 hours following match completion.',
      icon: Trophy,
    },
    {
      q: 'What happens if a match is cancelled or postponed by organizers?',
      a: 'If a match is cancelled due to game server maintenance or technical issues, all registered players receive an immediate 100% full refund to their original UPI ID, or a guaranteed free pass to the next available match slot.',
      icon: RefreshCw,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      <div className="text-center space-y-2">
        <span className="text-[11px] font-tech text-amber-400 font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5" />
          FREQUENTLY ASKED QUESTIONS
        </span>
        <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
          EVERYTHING YOU NEED TO KNOW
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm font-tech max-w-xl mx-auto">
          Clear answers about match procedures, payments, room credentials, and reward distribution.
        </p>
      </div>

      <div className="space-y-3 pt-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const Icon = faq.icon;
          return (
            <div
              key={index}
              className="bg-[#101118] border border-zinc-800 rounded-xl overflow-hidden transition-colors hover:border-zinc-700"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-red-950/50 border border-red-800/40 flex items-center justify-center text-red-400 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-heading font-bold text-base sm:text-lg text-white">
                    {faq.q}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-zinc-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-amber-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm font-tech text-zinc-300 leading-relaxed border-t border-zinc-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
