import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, ShieldAlert, CheckCircle2, Send, HelpCircle, ArrowRight } from 'lucide-react';
import { PlatformSettings } from '../types';

interface ContactViewProps {
  settings: PlatformSettings;
}

export const ContactView: React.FC<ContactViewProps> = ({ settings }) => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [refId, setRefId] = useState('');
  const [subject, setSubject] = useState('Payment Verification Query');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !whatsapp || !message) return;

    // Simulate sending message or redirecting to WhatsApp
    setSubmitted(true);
  };

  const cleanPhone = settings.adminWhatsappNumber.replace(/\D/g, '');
  const directWhatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello FF Elite Arena Admin, I have a query regarding a tournament.`
  )}`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="border-b border-zinc-800 pb-6 text-center max-w-2xl mx-auto space-y-2">
        <span className="bg-red-950 text-red-400 font-tech font-bold px-3 py-1 rounded text-xs tracking-wider uppercase border border-red-800/60 inline-flex items-center gap-1.5">
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          PLAYER SUPPORT & COMMUNITY
        </span>
        <h1 className="text-3xl sm:text-5xl font-heading font-black text-white">
          GET IN TOUCH WITH ADMIN
        </h1>
        <p className="text-zinc-400 text-sm font-tech">
          Have an issue with your payment UTR, need kill dispute assistance, or want to join our official scrims? Our tournament referee team is available daily.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Direct WhatsApp & Community Channels */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Join WhatsApp Community */}
          <div className="bg-gradient-to-br from-[#0e2118] to-[#091410] border-2 border-emerald-600/50 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-tech text-emerald-400 uppercase font-bold tracking-wider">
                  INSTANT UPDATES & ROOM CALLS
                </span>
                <h3 className="text-xl font-heading font-black text-white">
                  WHATSAPP COMMUNITY
                </h3>
              </div>
            </div>

            <p className="text-xs font-tech text-emerald-100/80 leading-relaxed">
              Join over 2,000+ competitive Free Fire players. Get instant room announcements, slot countdowns, match winner updates, and scrim invitations.
            </p>

            <a
              href={settings.whatsappCommunityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-tech font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Join WhatsApp Community</span>
            </a>
          </div>

          {/* 1-on-1 Admin WhatsApp */}
          <div className="bg-[#101118] border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-amber-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-tech text-zinc-500 uppercase font-bold">ORGANIZER & OWNER</span>
                <h4 className="text-base font-heading font-black text-white">
                  {settings.ownerName || 'Akash Singh Parihar'}
                </h4>
              </div>
            </div>

            <p className="text-xs font-tech text-zinc-400">
              For rapid UTR payment verification, custom room pass inquiries, or instant screenshot review, contact the tournament owner directly:
            </p>

            <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 text-xs font-tech text-zinc-300 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 text-[10px] uppercase">Platform Owner:</span>
                <span className="text-white font-bold">{settings.ownerName || 'Akash Singh Parihar'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 text-[10px] uppercase">Direct Phone / WhatsApp:</span>
                <span className="text-sm font-bold text-amber-400">{settings.adminWhatsappNumber}</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-zinc-900">
                <span className="text-zinc-500 text-[10px] uppercase">Official Email:</span>
                <a 
                  href={`mailto:${settings.adminEmail || 'aakashparihar000@gmail.com'}`}
                  className="text-red-400 hover:text-red-300 font-bold underline"
                >
                  {settings.adminEmail || 'aakashparihar000@gmail.com'}
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <a
                href={directWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-tech text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-950/60"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-tech text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call</span>
              </a>

              <a
                href={`mailto:${settings.adminEmail || 'aakashparihar000@gmail.com'}`}
                className="py-2.5 px-3 bg-red-950/60 hover:bg-red-900/80 border border-red-800 text-red-200 font-tech text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-red-400" />
                <span>Email</span>
              </a>
            </div>
          </div>

        </div>

        {/* Right: Contact / Grievance Form */}
        <div className="lg:col-span-7">
          <div className="bg-[#101118] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-[11px] font-tech text-red-400 font-bold uppercase tracking-wider">
                SUPPORT TICKET
              </span>
              <h3 className="text-2xl font-heading font-black text-white">
                SUBMIT A TICKET / GRIEVANCE
              </h3>
              <p className="text-xs font-tech text-zinc-400 mt-1">
                Fill this form for payment queries or kill reward disputes. Our team responds within 15 minutes.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-950/30 border border-emerald-500/50 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-heading font-black text-xl text-white">
                  TICKET RECEIVED!
                </h4>
                <p className="text-xs font-tech text-zinc-300 max-w-sm mx-auto">
                  Thank you, <strong className="text-white">{name}</strong>. A tournament referee has been assigned to your query and will contact you via WhatsApp at <strong className="text-amber-400">{whatsapp}</strong> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded font-tech text-xs cursor-pointer hover:bg-zinc-700"
                >
                  Submit Another Ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-tech text-zinc-300 uppercase font-semibold mb-1">
                      Your Name / IGN *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ThunderStrike"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3.5 py-2.5 text-xs font-tech text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-tech text-zinc-300 uppercase font-semibold mb-1">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3.5 py-2.5 text-xs font-tech text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-tech text-zinc-300 uppercase font-semibold mb-1">
                      Registration Reference ID (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. FFA-M1-4891"
                      value={refId}
                      onChange={(e) => setRefId(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3.5 py-2.5 text-xs font-tech text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-tech text-zinc-300 uppercase font-semibold mb-1">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3.5 py-2.5 text-xs font-tech text-zinc-200 focus:outline-none"
                    >
                      <option value="Payment Verification Query">Payment Verification (UTR) Query</option>
                      <option value="Room Password Assistance">Room ID & Password Assistance</option>
                      <option value="Kill Proof / Booyah Dispute">Kill Proof / Booyah Dispute</option>
                      <option value="Refund / Cancellation Request">Refund / Cancellation Request</option>
                      <option value="Report Hacker / Emulator Player">Report Hacker / Emulator Player</option>
                      <option value="General Inquiry">General Tournament Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-tech text-zinc-300 uppercase font-semibold mb-1">
                    Describe Your Issue in Detail *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide your match number, UTR transaction number, and details..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-xs font-tech text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-red-600 via-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-heading font-black uppercase tracking-wider text-sm rounded-xl shadow-lg shadow-red-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-amber-200" />
                  <span>Submit Ticket to Referee Desk</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
