import React from 'react';
import { Check, ShieldCheck, Star, Sparkles } from 'lucide-react';
import { ReportPlanId } from '../types';
import pricingHeroImg from '../assets/images/pricing_hero_car_garage_1790203751610.jpg';

interface PricingPageProps {
  onSelectPlan: (planId: ReportPlanId) => void;
  onNavigate: (page: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onSelectPlan }) => {
  return (
    <div className="w-full min-h-screen bg-[#f3f5f8] text-slate-900 font-sans animate-fadeIn">
      {/* =========================================================================
          HERO SECTION (MATCHING USER SCREENSHOT 1)
          Dark automotive workshop background with open-hood silver sedan,
          bold italic typography: "FEDERAL RECORD AUDIT PACKAGES."
          ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#0d1017] text-white pt-20 pb-28 sm:pt-28 sm:pb-36 px-4 text-center">
        {/* Background Image with Dark Vignette Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-luminosity scale-105"
          style={{ backgroundImage: `url(${pricingHeroImg})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-[#0d1017]"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black italic tracking-tighter uppercase text-white leading-none drop-shadow-md">
            FEDERAL RECORD <br className="hidden sm:inline" />
            <span className="text-yellow-400">AUDIT</span> PACKAGES.
          </h1>
          <p className="text-slate-300 font-medium text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Elite vehicle history data sourced directly from federal and insurance databases. No compromises.
          </p>
        </div>
      </section>

      {/* =========================================================================
          PRICING CARDS SECTION (MATCHING USER SCREENSHOT 2)
          3 Cards: STANDARD PACKAGE, SILVER PACKAGE, GOLD PACKAGE
          ========================================================================= */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* =====================================================================
              CARD 1: STANDARD PACKAGE
              ===================================================================== */}
          <div className="bg-white rounded-[36px] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-200/80 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] hover:-translate-y-1">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black italic tracking-tight text-slate-900 uppercase">
                STANDARD PACKAGE
              </h2>
              <p className="text-slate-500 italic text-xs sm:text-sm mt-1.5 font-medium">
                "Essential history and basic verification."
              </p>

              {/* Price */}
              <div className="mt-7 flex items-baseline">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans">
                  $39.99
                </span>
                <span className="text-[11px] font-black text-slate-400 tracking-wider uppercase ml-2">
                  / 1 HISTORY CREDIT
                </span>
              </div>

              {/* Delivery Window */}
              <div className="mt-8 pt-4 border-t border-slate-100">
                <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  DELIVERY WINDOW
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block shadow-xs"></span>
                  <span className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight">
                    12 HOURS
                  </span>
                </div>
              </div>

              {/* Features List */}
              <ul className="mt-8 space-y-4">
                {[
                  'VEHICLE SPECIFICATIONS',
                  'TITLE RECORDS',
                  'JUNK / SALVAGE RECORDS',
                  'ACCIDENT RECORDS',
                  '1 PDF DOWNLOAD',
                ].map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-indigo-600 stroke-[3.5] shrink-0" />
                    <span className="text-xs sm:text-sm font-black tracking-wide text-slate-800 uppercase">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action CTA Button */}
            <div className="mt-10">
              <button
                type="button"
                onClick={() => onSelectPlan('standard')}
                className="w-full py-4 rounded-full bg-slate-900 hover:bg-black text-white font-black text-xs sm:text-sm uppercase tracking-widest transition-all duration-200 shadow-md cursor-pointer active:scale-95"
              >
                SELECT STANDARD
              </button>
            </div>
          </div>

          {/* =====================================================================
              CARD 2: SILVER PACKAGE (RECOMMENDED BY DEALERS)
              ===================================================================== */}
          <div className="bg-white rounded-[36px] p-8 sm:p-10 shadow-[0_25px_60px_rgba(250,204,21,0.22)] border-2 border-yellow-400 flex flex-col justify-between relative transition-all duration-300 hover:shadow-[0_30px_70px_rgba(250,204,21,0.32)] md:-translate-y-2">
            {/* Top Recommended Badge */}
            <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 bg-[#121316] text-yellow-400 px-6 py-2 rounded-full shadow-xl border border-yellow-400/30 flex items-center gap-1.5 whitespace-nowrap">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                RECOMMENDED BY DEALERS
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black italic tracking-tight text-slate-900 uppercase">
                SILVER PACKAGE
              </h2>
              <p className="text-slate-500 italic text-xs sm:text-sm mt-1.5 font-medium">
                "Detailed analysis with risk indicators."
              </p>

              {/* Price */}
              <div className="mt-7 flex items-baseline">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans">
                  $69.99
                </span>
                <span className="text-[11px] font-black text-slate-400 tracking-wider uppercase ml-2">
                  / 1 HISTORY CREDIT
                </span>
              </div>

              {/* Delivery Window */}
              <div className="mt-8 pt-4 border-t border-slate-100">
                <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  DELIVERY WINDOW
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block shadow-xs"></span>
                  <span className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight">
                    6 HOURS
                  </span>
                </div>
              </div>

              {/* Features List */}
              <ul className="mt-8 space-y-4">
                {[
                  'EVERYTHING IN STANDARD',
                  'THEFT RECORDS',
                  'LIEN / IMPOUND',
                  'SALVAGE AUCTION RECORDS',
                  '3 PDF DOWNLOADS',
                  '1 AUTOMATED REPORT EMAIL',
                ].map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-indigo-600 stroke-[3.5] shrink-0" />
                    <span className="text-xs sm:text-sm font-black tracking-wide text-slate-800 uppercase">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action CTA Button */}
            <div className="mt-10">
              <button
                type="button"
                onClick={() => onSelectPlan('silver')}
                className="w-full py-4 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs sm:text-sm uppercase tracking-widest transition-all duration-200 shadow-lg shadow-yellow-400/30 cursor-pointer active:scale-95"
              >
                ORDER THIS AUDIT
              </button>
            </div>
          </div>

          {/* =====================================================================
              CARD 3: GOLD PACKAGE (ENTERPRISE AUDIT GRADE)
              ===================================================================== */}
          <div className="bg-[#15171c] rounded-[36px] p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-white/5 flex flex-col justify-between relative transition-all duration-300 hover:border-yellow-400/40 hover:-translate-y-1">
            {/* Top Enterprise Badge */}
            <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-6 py-2 rounded-full shadow-xl flex items-center gap-1.5 whitespace-nowrap">
              <Sparkles className="w-3 h-3 fill-black text-black" />
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                ENTERPRISE AUDIT GRADE
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black italic tracking-tight text-yellow-400 uppercase">
                GOLD PACKAGE
              </h2>
              <p className="text-slate-400 italic text-xs sm:text-sm mt-1.5 font-medium">
                "Total transparency with premium benefits."
              </p>

              {/* Price */}
              <div className="mt-7 flex items-baseline">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight font-sans">
                  $99.99
                </span>
                <span className="text-[11px] font-black text-slate-500 tracking-wider uppercase ml-2">
                  / 1 HISTORY CREDIT
                </span>
              </div>

              {/* Delivery Window */}
              <div className="mt-8 pt-4 border-t border-white/10">
                <div className="text-[10px] font-black tracking-widest text-yellow-400 uppercase">
                  DELIVERY WINDOW
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block shadow-xs"></span>
                  <span className="text-sm sm:text-base font-black text-white uppercase tracking-tight">
                    1 HOUR
                  </span>
                </div>
              </div>

              {/* Features List */}
              <ul className="mt-8 space-y-4">
                {[
                  'EVERYTHING IN SILVER',
                  'SALE RECORDS',
                  'TITLE CHECKS',
                  'INSURANCE RECORDS',
                  'TITLE BRAND',
                  'OPEN RECALL',
                  'IMPOUND RECORDS',
                ].map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-indigo-400 stroke-[3.5] shrink-0" />
                    <span className="text-xs sm:text-sm font-black tracking-wide text-slate-200 uppercase">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action CTA Button */}
            <div className="mt-10">
              <button
                type="button"
                onClick={() => onSelectPlan('gold')}
                className="w-full py-4 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs sm:text-sm uppercase tracking-widest transition-all duration-200 shadow-lg shadow-yellow-400/30 cursor-pointer active:scale-95"
              >
                ORDER THIS AUDIT
              </button>
            </div>
          </div>
        </div>

        {/* Security & Guarantee Strip */}
        <div className="mt-16 p-6 sm:p-8 rounded-[28px] bg-white border border-slate-200/80 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-600">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400/15 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7 text-yellow-500" />
            </div>
            <div>
              <div className="font-black text-slate-900 text-sm uppercase tracking-tight">
                100% Federal Data Registry Guarantee
              </div>
              <div className="text-slate-500 mt-0.5">
                Every audit queries official 50-state registries, insurance total loss archives, and police records.
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono font-bold text-slate-500 shrink-0">
            <span className="px-3 py-1.5 rounded-full bg-slate-100">256-BIT SSL</span>
            <span className="px-3 py-1.5 rounded-full bg-slate-100">STRIPE ENCRYPTED</span>
            <span className="px-3 py-1.5 rounded-full bg-slate-100">PAYPAL CERTIFIED</span>
          </div>
        </div>
      </section>
    </div>
  );
};
