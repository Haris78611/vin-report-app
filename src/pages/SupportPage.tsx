import React, { useState } from 'react';
import { Phone, Mail, Clock, ShieldCheck, MapPin, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';

interface SupportPageProps {
  onNavigate: (page: string) => void;
}

export const SupportPage: React.FC<SupportPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [vinOrOrder, setVinOrOrder] = useState('');
  const [topic, setTopic] = useState('Report Lookup Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#070b11] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-black uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5" />
            24/7 VERIFICATION & SUPPORT DESK
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            How Can We Assist Your Vehicle Investigation?
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Reach our certified automotive forensic specialists, billing support, or federal registry gateway technicians.
          </p>
        </div>

        {/* Live Federal Node Status Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0e1522] border border-white/10 shadow-lg grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block uppercase text-[10px] font-bold">NMVTIS Federal Node</span>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Operational (100%)</span>
            </div>
          </div>
          <div>
            <span className="text-slate-500 block uppercase text-[10px] font-bold">50-State DMV Sync</span>
            <div className="text-white font-bold mt-0.5">Real-Time (18ms Latency)</div>
          </div>
          <div>
            <span className="text-slate-500 block uppercase text-[10px] font-bold">Payment Gateway</span>
            <div className="text-white font-bold mt-0.5">Stripe & PayPal Active</div>
          </div>
          <div>
            <span className="text-slate-500 block uppercase text-[10px] font-bold">Average Reply Time</span>
            <div className="text-yellow-400 font-bold mt-0.5">&lt; 3 Minutes</div>
          </div>
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-3xl bg-[#0e1522] border border-white/10 space-y-6">
              <h2 className="text-lg font-black text-white uppercase tracking-wider">
                Direct Contact Channels
              </h2>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center shrink-0 font-bold">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Official Email Desk</div>
                    <div className="text-slate-400 mt-0.5">support@wheelclarify.com</div>
                    <div className="text-[11px] text-emerald-400 mt-1">24/7 Monitored Inbox</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center shrink-0 font-bold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Toll-Free Verification Desk</div>
                    <div className="text-slate-400 mt-0.5">1-800-CLARIFY (1-800-252-7439)</div>
                    <div className="text-[11px] text-slate-400 mt-1">Mon–Sat: 8:00 AM – 8:00 PM EST</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center shrink-0 font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Compliance & Data Disputes</div>
                    <div className="text-slate-400 mt-0.5">disputes@wheelclarify.com</div>
                    <div className="text-[11px] text-slate-400 mt-1">FCRA & State DMV Clarification Desk</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantee reminder */}
            <div className="p-6 rounded-3xl bg-yellow-400/10 border border-yellow-400/30 text-xs space-y-2">
              <div className="font-bold text-yellow-400 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                100% Satisfaction Guarantee
              </div>
              <p className="text-slate-300 leading-relaxed">
                If your report did not contain the expected federal registry data or you experienced technical difficulties, submit a ticket here with your Order or VIN number for an instant credit or full refund.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Ticket Form */}
          <div className="lg:col-span-7 bg-[#0e1522] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase">Inquiry Submitted Successfully</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-yellow-400 font-bold">{name}</span>. A support ticket has been dispatched to our priority verification queue. A forensic agent will respond to <span className="text-yellow-400 font-bold">{email}</span> within 15 minutes.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="border-b border-white/10 pb-4">
                  <h2 className="text-lg font-black text-white uppercase tracking-wider">
                    Submit Priority Support Inquiry
                  </h2>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Our team responds within minutes during operational hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-3.5 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Email Address (for reply)
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Vehicle VIN or Order # (Optional)
                    </label>
                    <input
                      type="text"
                      value={vinOrOrder}
                      onChange={(e) => setVinOrOrder(e.target.value.toUpperCase())}
                      placeholder="e.g. WBACH9343YLG18917"
                      className="w-full px-3.5 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white placeholder:text-slate-500 font-mono focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#141c2b] rounded-xl border border-white/10 text-white focus:outline-none focus:border-yellow-400 cursor-pointer"
                    >
                      <option value="Report Lookup Inquiry">Report Lookup Inquiry</option>
                      <option value="Billing or Payment Help">Billing or Payment Help (Stripe/PayPal)</option>
                      <option value="Title Brand / DMV Question">Title Brand / DMV Question</option>
                      <option value="PDF Download Assistance">PDF Download Assistance</option>
                      <option value="Dealer Fleet Account">Dealer Fleet Account</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    How Can We Help?
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry, vehicle details, or question..."
                    className="w-full px-3.5 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-yellow-400 leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider transition-colors shadow-lg shadow-yellow-400/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Ticket to Priority Queue</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
