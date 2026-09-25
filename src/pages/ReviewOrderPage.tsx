import React, { useState } from 'react';
import {
  Check,
  ShieldCheck,
  Lock,
  CreditCard,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { ReportPlanId, FullVehicleReport } from '../types';

interface ReviewOrderPageProps {
  selectedPlanId: ReportPlanId;
  report?: FullVehicleReport | null;
  onPaymentSuccess: (planId: ReportPlanId) => void;
  onNavigate: (page: string) => void;
  onBack: () => void;
}

interface PlanDetails {
  id: ReportPlanId;
  name: string;
  price: number;
  deliveryTime: string;
  features: string[];
}

const PLAN_DETAILS: Record<ReportPlanId, PlanDetails> = {
  silver: {
    id: 'silver',
    name: 'SILVER PACKAGE',
    price: 69.99,
    deliveryTime: '6 HOURS DELIVERY',
    features: [
      '6 HOURS DELIVERY',
      'EVERYTHING IN STANDARD',
      'THEFT RECORDS',
      'LIEN / IMPOUND',
      'SALVAGE AUCTION RECORDS',
    ],
  },
  standard: {
    id: 'standard',
    name: 'STANDARD PACKAGE',
    price: 39.99,
    deliveryTime: '12 HOURS DELIVERY',
    features: [
      '12 HOURS DELIVERY',
      'VEHICLE SPECIFICATIONS',
      'TITLE & BRAND RECORDS',
      'ACCIDENT RECORDS',
      '1 PDF DOWNLOAD',
    ],
  },
  gold: {
    id: 'gold',
    name: 'GOLD PACKAGE',
    price: 99.99,
    deliveryTime: 'INSTANT DELIVERY',
    features: [
      'INSTANT 1-HOUR DELIVERY',
      'EVERYTHING IN SILVER',
      'ODOMETER TAMPER AUDIT',
      'MARKET VALUE & AUCTIONS',
      'PRIORITY FORENSIC SUPPORT',
    ],
  },
  dealer: {
    id: 'dealer',
    name: 'DEALER PACKAGE',
    price: 149.99,
    deliveryTime: 'INSTANT PRIORITY',
    features: [
      'INSTANT PRIORITY ACCESS',
      '5 VEHICLE HISTORY CREDITS',
      'WHOLESALE AUCTION PRICING',
      'FULL NMVTIS SPECIFICATIONS',
      'DEDICATED ACCOUNT REP',
    ],
  },
};

export const ReviewOrderPage: React.FC<ReviewOrderPageProps> = ({
  selectedPlanId,
  report,
  onPaymentSuccess,
  onNavigate,
  onBack,
}) => {
  const plan = PLAN_DETAILS[selectedPlanId] || PLAN_DETAILS.silver;

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState(false);

  // Form validation: requires name and valid email
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isFormValid = fullName.trim().length > 1 && isEmailValid;

  // VIN to display: either report's VIN, or fallback to the screenshot VIN
  const displayVin = report?.specs?.vin || '3VW2B7AJ1HM339746';

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isProcessing) return;

    setIsProcessing(true);

    // Simulate swift encrypted transaction
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccessMessage(true);
      setTimeout(() => {
        onPaymentSuccess(plan.id);
      }, 1000);
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fb] text-slate-900 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 font-sans animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        {/* Top Breadcrumb & Page Headline matching screenshot */}
        <div className="mb-8 sm:mb-10">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Plans</span>
          </button>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-tight">
            REVIEW ORDER
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium mt-2 leading-relaxed">
            Please review your selected report tier for VIN:{' '}
            <span className="font-mono font-bold text-slate-900 tracking-wider">
              {displayVin}
            </span>
          </p>
        </div>

        {/* Two-Column Layout matching screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* =========================================================================
              LEFT COLUMN: SELECTED PACKAGE CARD & SECURITY CARD
              ========================================================================= */}
          <div className="lg:col-span-5 space-y-5">
            {/* Order Summary Card */}
            <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.05)] border border-slate-100">
              {/* Top Shaded Box with Package Name & Price */}
              <div className="bg-[#f3f5f8] rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black text-slate-400 tracking-widest uppercase">
                    SELECTED PACKAGE
                  </div>
                  <div className="text-xl sm:text-2xl font-black italic tracking-tight text-slate-900 uppercase mt-0.5">
                    {plan.name}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    ${plan.price.toFixed(2)}
                  </div>
                  <div className="text-[10px] font-black text-slate-400 tracking-widest uppercase mt-0.5">
                    INC. 1 REPORT
                  </div>
                </div>
              </div>

              {/* Checklist with Yellow Checkmarks matching screenshot */}
              <ul className="mt-7 space-y-3.5">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-yellow-400 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-yellow-500 stroke-[3.5]" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-black tracking-wide text-slate-700 uppercase">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Total Due Row matching screenshot */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm sm:text-base font-black text-slate-900 tracking-wider uppercase">
                  TOTAL DUE
                </span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
                  ${plan.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* 256-Bit AES Encryption Card matching screenshot */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/15 border border-yellow-400/30 flex items-center justify-center text-yellow-500 shrink-0">
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-slate-900">
                  256-BIT AES ENCRYPTION
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Your data and payment connection are 100% secure.
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: GUEST CHECKOUT CARD
              ========================================================================= */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[32px] p-7 sm:p-10 shadow-[0_15px_45px_rgba(0,0,0,0.06)] border border-slate-100">
              {/* Yellow Lock Icon Badge matching screenshot */}
              <div className="w-12 h-12 rounded-2xl bg-yellow-400/15 border border-yellow-400/30 flex items-center justify-center text-yellow-500 mb-5 shadow-xs">
                <Lock className="w-6 h-6 stroke-[2.2]" />
              </div>

              {/* Headline matching screenshot */}
              <h2 className="text-2xl sm:text-3xl font-black italic tracking-tight uppercase text-slate-900 leading-none">
                GUEST CHECKOUT
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2 leading-relaxed">
                Enter your details to receive your report instantly via email.
              </p>

              {/* Form Fields matching screenshot */}
              <form onSubmit={handleCheckoutSubmit} className="mt-7 space-y-4">
                {/* Full Name */}
                <div>
                  <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1.5 block">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3.5 bg-[#f1f3f6] rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1.5 block">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3.5 bg-[#f1f3f6] rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1.5 block">
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3.5 bg-[#f1f3f6] rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                  />
                </div>

                {/* Payment Method Selector (when inputs filled) */}
                {isFormValid && (
                  <div className="pt-2 space-y-3 animate-fadeIn">
                    <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                      SELECT PAYMENT METHOD
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          paymentMethod === 'card'
                            ? 'border-yellow-400 bg-yellow-400/10 text-slate-900 shadow-sm'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-slate-700" />
                        <span>Credit / Debit Card</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('paypal')}
                        className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          paymentMethod === 'paypal'
                            ? 'border-yellow-400 bg-yellow-400/10 text-slate-900 shadow-sm'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="font-black text-blue-600 italic">P</span>
                        <span className="font-black text-blue-400 italic -ml-1">P</span>
                        <span>PayPal Express</span>
                      </button>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="p-3.5 bg-[#f8f9fb] rounded-xl border border-slate-200/80 space-y-2.5 mt-2">
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="Card Number (4242 •••• •••• 4242)"
                          maxLength={19}
                          className="w-full px-3 py-2 bg-white rounded-lg text-xs border border-slate-200 focus:outline-none focus:border-yellow-400 font-mono"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full px-3 py-2 bg-white rounded-lg text-xs border border-slate-200 focus:outline-none focus:border-yellow-400 font-mono"
                          />
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            placeholder="CVC"
                            maxLength={4}
                            className="w-full px-3 py-2 bg-white rounded-lg text-xs border border-slate-200 focus:outline-none focus:border-yellow-400 font-mono"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Dynamic Submit Button matching screenshot */}
                <div className="pt-2">
                  {!isFormValid ? (
                    <div className="w-full py-4 px-4 rounded-xl bg-[#eef1f4] text-slate-400 text-xs sm:text-sm font-semibold text-center select-none cursor-not-allowed">
                      Please fill in your name and email above to continue.
                    </div>
                  ) : (
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-4 px-6 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-200 shadow-lg shadow-yellow-400/25 flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-75"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>PROCESSING ENCRYPTED PAYMENT...</span>
                        </>
                      ) : paymentSuccessMessage ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-black" />
                          <span>PAYMENT APPROVED! UNLOCKING...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-black" />
                          <span>
                            {paymentMethod === 'paypal' ? 'PAY WITH PAYPAL' : 'COMPLETE ORDER'} - ${plan.price.toFixed(2)}
                          </span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Bottom Sign In Link matching screenshot */}
                <div className="pt-4 text-center text-xs font-semibold text-slate-500">
                  ALREADY HAVE AN ACCOUNT?{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('login')}
                    className="text-yellow-500 font-black hover:underline cursor-pointer uppercase tracking-wider"
                  >
                    SIGN IN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
