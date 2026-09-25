import React, { useState } from 'react';
import {
  Car,
  FileText,
  Users,
  Gauge,
  AlertTriangle,
  ShieldAlert,
  Ghost,
  Landmark,
  DollarSign,
  ShieldCheck,
  ShieldX,
  BarChart3,
  Copy,
  Check,
  Lock,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Shield,
  FileCheck2,
  Clock,
  ArrowRight,
  Download,
  Code
} from 'lucide-react';
import { FullVehicleReport, ReportPlanId } from '../types';
import { PLANS } from '../data/sampleVehicles';

interface ReportDashboardProps {
  report: FullVehicleReport;
  isUnlocked: boolean;
  unlockedPlan?: ReportPlanId | null;
  onSelectPlan: (planId: ReportPlanId) => void;
  onViewFullReport?: () => void;
}

export const ReportDashboard: React.FC<ReportDashboardProps> = ({
  report,
  isUnlocked,
  unlockedPlan,
  onSelectPlan,
  onViewFullReport,
}) => {
  const [copiedVin, setCopiedVin] = useState(false);
  const [showSummaryDrawer, setShowSummaryDrawer] = useState(true);
  const [showRawDrawer, setShowRawDrawer] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  const handleCopyVin = () => {
    navigator.clipboard.writeText(report.specs.vin);
    setCopiedVin(true);
    setTimeout(() => setCopiedVin(false), 2000);
  };

  const handleCopyJson = () => {
    if (!report.rawNhtsaData) return;
    navigator.clipboard.writeText(JSON.stringify(report.rawNhtsaData, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const getIndicatorIcon = (iconName: string) => {
    switch (iconName) {
      case 'car':
        return <Car className="w-4 h-4 text-white" />;
      case 'clipboard-list':
        return <FileText className="w-4 h-4 text-white" />;
      case 'users':
        return <Users className="w-4 h-4 text-white" />;
      case 'gauge':
        return <Gauge className="w-4 h-4 text-white" />;
      case 'alert-triangle':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'shield-alert':
        return <ShieldAlert className="w-4 h-4 text-white" />;
      case 'ghost':
        return <Ghost className="w-4 h-4 text-white" />;
      case 'landmark':
        return <Landmark className="w-4 h-4 text-white" />;
      case 'dollar-sign':
        return <DollarSign className="w-4 h-4 text-yellow-400" />;
      case 'shield-check':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'shield-x':
        return <ShieldX className="w-4 h-4 text-white" />;
      case 'bar-chart-3':
        return <BarChart3 className="w-4 h-4 text-yellow-400" />;
      default:
        return <FileText className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div className="w-full bg-[#f8f9fb] py-8 lg:py-12 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Card matching Screenshot 2 */}
        <div className="bg-[#ededf0] rounded-2xl p-5 sm:p-7 border border-slate-300/60 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: VIN IDENTIFIED badge + Title + Manufacturer */}
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-black text-yellow-400 font-extrabold text-[11px] px-2.5 py-1 rounded-md tracking-wider uppercase inline-flex items-center gap-1.5 shadow-sm">
                VIN IDENTIFIED
              </span>
              <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-slate-800 tracking-wider">
                <span>{report.specs.vin}</span>
                <button
                  onClick={handleCopyVin}
                  className="p-1 text-slate-500 hover:text-black rounded transition-colors"
                  title="Copy VIN"
                >
                  {copiedVin ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              {report.specs.year} {report.specs.make} {report.specs.model}
            </h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">
              {report.specs.manufacturer}
            </p>
          </div>

          {/* Right: Spec pills matching live NHTSA fields */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            <div className="bg-white/90 backdrop-blur rounded-xl px-3.5 py-2.5 border border-slate-200/80 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">MADE IN</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5 truncate" title={report.specs.plantCountry}>
                {report.specs.plantCountry}
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur rounded-xl px-3.5 py-2.5 border border-slate-200/80 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ENGINE</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5 truncate" title={report.specs.engineDisplacement}>
                {report.specs.engineDisplacement}
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur rounded-xl px-3.5 py-2.5 border border-slate-200/80 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CYLINDERS</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5 truncate" title={String(report.specs.engineCylinders)}>
                {report.specs.engineCylinders}
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur rounded-xl px-3.5 py-2.5 border border-slate-200/80 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TRANSMISSION</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5 truncate" title={report.specs.transmission}>
                {report.specs.transmission}
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur rounded-xl px-3.5 py-2.5 border border-slate-200/80 shadow-xs col-span-2 sm:col-span-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">BODY CLASS</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5 truncate" title={report.specs.bodyClass}>
                {report.specs.bodyClass}
              </div>
            </div>
          </div>
        </div>

        {/* Free Summary Bar before paywall */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowSummaryDrawer(!showSummaryDrawer)}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-yellow-400/20 text-yellow-600 flex items-center justify-center font-bold">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>Pre-Purchase Vehicle Audit Summary</span>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {report.recordsFoundCount} Federal Records Located
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  NHTSA OEM spec check complete. Title brands, accident records, and odometer entries require verification.
                </p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-700">
              {showSummaryDrawer ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>

          {showSummaryDrawer && (
            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Body Class</span>
                <span className="font-semibold text-slate-900">{report.specs.bodyClass}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Drivetrain</span>
                <span className="font-semibold text-slate-900">{report.specs.driveType}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Fuel Type</span>
                <span className="font-semibold text-slate-900">{report.specs.fuelType}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Safety Recalls</span>
                <span className="font-semibold text-slate-900">
                  {report.recalls.count > 0 ? `${report.recalls.count} Open Recall Check` : '0 Open Recalls'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* DEVELOPER INSPECTION DRAWER (RAW NHTSA VPIC JSON) */}
        <div className="bg-[#0e121a] rounded-xl border border-slate-700/60 p-4 text-white shadow-sm">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowRawDrawer(!showRawDrawer)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Code className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Developer Inspection Drawer (Raw NHTSA VPIC Results[0])</span>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                    {report.rawNhtsaData ? `${Object.keys(report.rawNhtsaData).length} Fields Decoded` : 'Live API Response'}
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Full raw JSON object extracted directly from response.Results[0]
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {report.rawNhtsaData && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyJson();
                  }}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedJson ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>
              )}
              <button className="text-slate-400 hover:text-white">
                {showRawDrawer ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {showRawDrawer && (
            <div className="mt-4 pt-4 border-t border-white/10 space-y-3 animate-fadeIn">
              {/* Quick Field Summary Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="bg-white/5 p-2 rounded border border-white/5">
                  <span className="text-slate-400 text-[10px] block">ErrorCode</span>
                  <span className="text-emerald-400 font-bold">{report.rawNhtsaData?.ErrorCode || '0'}</span>
                </div>
                <div className="bg-white/5 p-2 rounded border border-white/5">
                  <span className="text-slate-400 text-[10px] block">ModelYear / Make</span>
                  <span className="text-white truncate block">{report.rawNhtsaData?.ModelYear} {report.rawNhtsaData?.Make}</span>
                </div>
                <div className="bg-white/5 p-2 rounded border border-white/5">
                  <span className="text-slate-400 text-[10px] block">DisplacementL</span>
                  <span className="text-yellow-400">{report.rawNhtsaData?.DisplacementL || report.rawNhtsaData?.DisplacementCC || 'N/A'}</span>
                </div>
                <div className="bg-white/5 p-2 rounded border border-white/5">
                  <span className="text-slate-400 text-[10px] block">PlantCountry</span>
                  <span className="text-white truncate block">{report.rawNhtsaData?.PlantCountry || 'N/A'}</span>
                </div>
              </div>

              {/* Full Raw JSON Viewer */}
              <div className="relative">
                <pre className="bg-[#06080d] text-emerald-400 font-mono text-xs p-4 rounded-xl overflow-x-auto max-h-96 border border-white/10 leading-relaxed select-text">
                  {report.rawNhtsaData
                    ? JSON.stringify(report.rawNhtsaData, null, 2)
                    : '// No raw NHTSA VPIC data available.'}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Unlocked banner if user already paid */}
        {isUnlocked && (
          <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  Full Vehicle History Unlocked Successfully
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                    Paid via {unlockedPlan?.toUpperCase() || 'STANDARD'}
                  </span>
                </h2>
                <p className="text-xs text-slate-600">
                  All 12 NMVTIS status indicators, police accident logs, odometer history, and lien checks are now visible.
                </p>
              </div>
            </div>
            {onViewFullReport && (
              <button
                onClick={onViewFullReport}
                className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm shrink-0"
              >
                <span>View Full Details & Export PDF</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Main Two-Column Layout matching Screenshot 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: History Records & Real-Time Status Indicators (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-black text-yellow-500 uppercase tracking-widest">
                HISTORY RECORDS
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight">
                WE FOUND RECORDS ON THIS VEHICLE
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                {isUnlocked
                  ? 'All records have been unblinded and verified against state DMV registries.'
                  : 'Select a package on the right to unlock the full report.'}
              </p>
            </div>

            {/* Sub-header divider matching Screenshot 2: REAL-TIME STATUS INDICATORS */}
            <div className="flex items-center gap-2 pt-2">
              <span className="w-6 h-0.5 bg-yellow-400"></span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                REAL-TIME STATUS INDICATORS
              </span>
            </div>

            {/* 12 Status Cards Grid matching Screenshot 2 (3 columns x 4 rows) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {report.indicators.map((ind) => {
                const isCurrentlyLocked = !isUnlocked && ind.isLocked;

                return (
                  <div
                    key={ind.id}
                    className={`bg-white rounded-xl p-3 border transition-all duration-200 flex items-center gap-3 shadow-xs ${
                      isCurrentlyLocked
                        ? 'border-slate-200/90 hover:border-yellow-400/50'
                        : 'border-emerald-200/60 bg-emerald-50/20'
                    }`}
                  >
                    {/* Dark icon box matching Screenshot 2 */}
                    <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center shrink-0 shadow-sm">
                      {getIndicatorIcon(ind.icon)}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
                        {ind.displayTitle}
                      </div>

                      {/* Status row */}
                      {isCurrentlyLocked ? (
                        <div className="mt-1 flex items-center gap-1.5">
                          {/* Pixelated/blurred redacted bar */}
                          <div className="flex gap-0.5 select-none opacity-40">
                            <span className="w-1.5 h-3 bg-slate-400 rounded-xs"></span>
                            <span className="w-2.5 h-3 bg-slate-500 rounded-xs"></span>
                            <span className="w-1.5 h-3 bg-slate-400 rounded-xs"></span>
                            <span className="w-2 h-3 bg-slate-600 rounded-xs"></span>
                          </div>
                          {/* Yellow LOCKED pill badge matching Screenshot 2 */}
                          <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                            <Lock className="w-2.5 h-2.5" />
                            LOCKED
                          </span>
                        </div>
                      ) : (
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className="text-xs font-black text-slate-900">
                            {ind.id === 'us_record'
                              ? 'YES'
                              : ind.id === 'salvage'
                              ? 'CLEAN'
                              : ind.id === 'accidents'
                              ? '1 MINOR'
                              : ind.id === 'theft'
                              ? 'NO RECORD'
                              : ind.id === 'odometer'
                              ? 'VERIFIED'
                              : ind.id === 'financial'
                              ? 'CLEARED'
                              : 'VERIFIED'}
                          </span>
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* BODY card matching Screenshot 2 */}
            <div className="pt-2">
              <div className="inline-block bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-xs min-w-[160px]">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  BODY
                </div>
                <div className="text-sm font-black text-slate-900 mt-0.5">
                  {report.specs.bodyClass || 'Roadster'}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Order an Instant Vehicle History Report (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <div className="text-xs font-black text-slate-900 uppercase tracking-widest">
                CHOOSE A PACKAGE
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight">
                ORDER AN INSTANT VEHICLE HISTORY REPORT
              </h2>
            </div>

            {/* Standard Package Card matching Screenshot 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm relative overflow-hidden transition-transform duration-200 hover:shadow-md">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-slate-950 uppercase tracking-wider">
                    {PLANS[0].name}
                  </h3>
                  <p className="text-xs text-slate-500 italic mt-0.5">
                    {PLANS[0].tagline}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-black text-slate-950">
                    ${PLANS[0].price}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    / 1 HISTORY CREDIT
                  </div>
                </div>
              </div>

              {/* Feature Checklist with purple check icons matching Screenshot 2 */}
              <ul className="mt-6 space-y-2.5 text-xs font-bold text-slate-700">
                {PLANS[0].features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <span className="text-indigo-600 font-bold shrink-0">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Button matching Screenshot 2: SELECT STANDARD */}
              <button
                onClick={() => onSelectPlan('standard')}
                className="mt-6 w-full py-3.5 px-4 rounded-xl bg-[#e6e8ec] hover:bg-yellow-400 hover:text-black text-slate-900 font-extrabold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>SELECT STANDARD</span>
              </button>
            </div>

            {/* Silver Package Card (BEST VALUE) matching Screenshot 2 */}
            <div className="relative pt-4">
              {/* Star Best Value Badge on top */}
              <div className="absolute top-0 left-6 z-10 bg-yellow-400 text-black text-[10px] font-black px-3 py-1 rounded-t-lg uppercase tracking-wider flex items-center gap-1 shadow-sm">
                <span>★</span>
                <span>BEST VALUE</span>
              </div>

              <div className="bg-[#0b1019] text-white rounded-2xl p-6 border-2 border-yellow-400 shadow-xl relative overflow-hidden">
                {/* Subtle golden corner glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex items-start justify-between gap-4 relative z-10">
                  <div>
                    <h3 className="text-lg font-black text-yellow-400 uppercase tracking-wider">
                      {PLANS[1].name}
                    </h3>
                    <p className="text-xs text-slate-300 italic mt-0.5">
                      {PLANS[1].tagline}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-black text-white">
                      ${PLANS[1].price}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      / 1 HISTORY CREDIT
                    </div>
                  </div>
                </div>

                {/* Feature Checklist */}
                <ul className="mt-6 space-y-2.5 text-xs font-semibold text-slate-200 relative z-10">
                  {PLANS[1].features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <span className="text-yellow-400 font-bold shrink-0">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Button matching Screenshot 2: SELECT SILVER */}
                <button
                  onClick={() => onSelectPlan('silver')}
                  className="mt-6 w-full py-3.5 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-yellow-400/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>SELECT SILVER</span>
                </button>
              </div>
            </div>

            {/* Payment security footer note */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200/80 px-1">
              <span className="flex items-center gap-1.5 font-medium">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                256-Bit Encrypted Gateway
              </span>
              <div className="flex items-center gap-2 font-bold text-slate-700">
                <span className="px-1.5 py-0.5 rounded bg-slate-200 text-[10px]">STRIPE</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-200 text-[10px]">PAYPAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
