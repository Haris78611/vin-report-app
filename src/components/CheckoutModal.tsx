import React, { useState } from 'react';
import {
  X,
  CreditCard,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  AlertCircle,
  HelpCircle,
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FullVehicleReport, ReportPlanId } from '../types';
import { PLANS } from '../data/sampleVehicles';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: FullVehicleReport;
  selectedPlanId: ReportPlanId;
  onPaymentSuccess: (planId: ReportPlanId) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  report,
  selectedPlanId,
  onPaymentSuccess,
}) => {
  const plan = PLANS.find((p) => p.id === selectedPlanId) || PLANS[1];

  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardZip, setCardZip] = useState('');
  const [email, setEmail] = useState('buyer@example.com');
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [discountMsg, setDiscountMsg] = useState('');

  // Processing steps
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  if (!isOpen) return null;

  const finalPrice = Math.max(0, plan.price - appliedDiscount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'VIN20') {
      const discount = Math.round(plan.price * 0.2 * 100) / 100;
      setAppliedDiscount(discount);
      setDiscountMsg('Promo code VIN20 applied: 20% discount!');
    } else if (code === 'SAVE10') {
      setAppliedDiscount(10);
      setDiscountMsg('Promo code SAVE10 applied: $10 off!');
    } else {
      setDiscountMsg('Invalid code. Try VIN20 or SAVE10');
    }
  };

  const fillTestCard = () => {
    setCardNumber('4242 •••• •••• 4242');
    setCardName('ALEX MORGAN');
    setCardExp('12/28');
    setCardCvc('884');
    setCardZip('90210');
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setProcessingStep(1);

    // Step 1: Encrypting
    setTimeout(() => {
      setProcessingStep(2);
      // Step 2: Authorizing with gateway
      setTimeout(() => {
        setProcessingStep(3);
        // Step 3: Unsealing NMVTIS records
        setTimeout(() => {
          setIsProcessing(false);
          // Fire confetti!
          try {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch {
            // fallback
          }
          onPaymentSuccess(plan.id);
          onClose();
        }, 800);
      }, 900);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8">
        {/* Modal Top Bar */}
        <div className="bg-[#0c121d] text-white p-5 sm:p-6 flex items-center justify-between border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-[11px] font-mono tracking-wider text-slate-300 uppercase">
                256-BIT SSL ENCRYPTED GATEWAY
              </span>
            </div>
            <h2 className="text-xl font-black tracking-tight mt-1">
              Unlock Full Vehicle History
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Details Banner */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-slate-500 font-medium">Selected Vehicle:</span>
            <div className="font-bold text-slate-900 text-sm">
              {report.specs.year} {report.specs.make} {report.specs.model}
            </div>
            <div className="font-mono text-slate-500 text-[11px]">
              VIN: {report.specs.vin}
            </div>
          </div>
          <div className="text-left sm:text-right">
            <span className="bg-yellow-100 text-yellow-800 text-[10px] font-black px-2 py-0.5 rounded uppercase">
              {plan.name}
            </span>
            <div className="text-xl font-black text-slate-950 mt-1">
              ${finalPrice.toFixed(2)}
            </div>
            {appliedDiscount > 0 && (
              <span className="text-[11px] text-emerald-600 font-bold block">
                Saved ${appliedDiscount.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Main Checkout Form */}
        <div className="p-6">
          {/* Payment Method Tabs */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setPaymentMethod('stripe')}
              className={`p-3 rounded-xl border-2 flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                paymentMethod === 'stripe'
                  ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              <CreditCard className="w-4 h-4 text-indigo-600" />
              <span>Stripe (Card / Apple)</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('paypal')}
              className={`p-3 rounded-xl border-2 flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                paymentMethod === 'paypal'
                  ? 'border-blue-500 bg-blue-50/50 text-blue-900 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              <span className="font-black italic text-blue-600">PayPal</span>
              <span>Instant Pay</span>
            </button>
          </div>

          {/* Processing Overlay if in progress */}
          {isProcessing ? (
            <div className="py-12 px-4 text-center space-y-4">
              <div className="w-14 h-14 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <div className="text-base font-bold text-slate-900">
                {processingStep === 1 && 'Establishing Encrypted Gateway Connection...'}
                {processingStep === 2 && 'Authorizing Payment via ' + (paymentMethod === 'stripe' ? 'Stripe' : 'PayPal') + '...'}
                {processingStep === 3 && 'Unsealing NMVTIS Federal Registry Records...'}
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Please do not refresh. Your digital history certificate and 12 status indicators are being verified.
              </p>
            </div>
          ) : (
            <form onSubmit={handlePay} className="space-y-4">
              {/* Email Delivery Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Report Delivery Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  A permanent PDF copy and login access will also be dispatched here.
                </span>
              </div>

              {/* Stripe Flow */}
              {paymentMethod === 'stripe' ? (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Card Details
                    </span>
                    <button
                      type="button"
                      onClick={fillTestCard}
                      className="text-[11px] text-indigo-600 hover:text-indigo-800 font-bold underline"
                    >
                      Fill Test Card (Instant Demo)
                    </button>
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 4242 4242 4242"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <input
                      type="text"
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="CVC"
                      maxLength={4}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <input
                      type="text"
                      required
                      value={cardZip}
                      onChange={(e) => setCardZip(e.target.value)}
                      placeholder="ZIP Code"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Name on Card"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                </div>
              ) : (
                /* PayPal Flow */
                <div className="py-6 px-4 bg-blue-50/50 rounded-xl border border-blue-200/80 text-center space-y-3">
                  <div className="font-bold text-sm text-slate-900">
                    PayPal One-Touch Checkout
                  </div>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Complete your payment quickly and securely using your PayPal account or PayPal Credit with Buyer Protection.
                  </p>
                  <div className="pt-2">
                    <div className="inline-block bg-[#ffc439] hover:bg-[#f6bb32] text-black font-extrabold text-sm py-2.5 px-8 rounded-full shadow-sm">
                      <span className="italic text-blue-900">Pay</span>
                      <span className="italic text-blue-600">Pal</span> Check out
                    </div>
                  </div>
                </div>
              )}

              {/* Promo Code section */}
              <div className="pt-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo Code (try VIN20)"
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none uppercase font-mono"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {discountMsg && (
                  <p
                    className={`mt-1 text-[11px] font-semibold ${
                      appliedDiscount > 0 ? 'text-emerald-600' : 'text-rose-500'
                    }`}
                  >
                    {discountMsg}
                  </p>
                )}
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-yellow-400/25 flex items-center justify-center gap-2 cursor-pointer mt-4 active:scale-98"
              >
                <Lock className="w-4 h-4" />
                <span>
                  PAY ${finalPrice.toFixed(2)} & UNLOCK REPORT NOW
                </span>
              </button>

              {/* Security badges */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  PCI-DSS Level 1
                </span>
                <span>•</span>
                <span>256-Bit TLS</span>
                <span>•</span>
                <span>Money-Back Guarantee</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
