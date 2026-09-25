import React, { useState } from 'react';
import { ArrowLeft, Search, ShieldCheck, FileText, CheckCircle2, RotateCcw } from 'lucide-react';
import { FullVehicleReport, ReportPlanId } from '../types';
import { ReportDashboard } from '../components/ReportDashboard';
import { UnlockedReportView } from '../components/UnlockedReportView';

interface ReportPageProps {
  report: FullVehicleReport;
  isUnlocked: boolean;
  unlockedPlan: ReportPlanId | null;
  onSelectPlan: (planId: ReportPlanId) => void;
  onBackToHome: () => void;
  onNewSearch: (query: string, type: 'vin' | 'plate', state?: string) => void;
  isLoading: boolean;
  onLockAgain?: () => void;
}

export const ReportPage: React.FC<ReportPageProps> = ({
  report,
  isUnlocked,
  unlockedPlan,
  onSelectPlan,
  onBackToHome,
  onNewSearch,
  isLoading,
  onLockAgain,
}) => {
  const [quickVin, setQuickVin] = useState('');

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickVin.trim()) return;
    onNewSearch(quickVin.trim().toUpperCase(), 'vin');
    setQuickVin('');
  };

  return (
    <div className="w-full min-h-screen bg-[#070b11] text-slate-100 animate-fadeIn">
      {/* Top Breadcrumb & Quick Action Bar */}
      <div className="bg-[#0b1019] border-b border-white/10 sticky top-0 z-30 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-yellow-400 transition-colors uppercase tracking-wider group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </button>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400">Report for:</span>
              <span className="font-mono font-bold text-yellow-400">
                {report.specs.vin}
              </span>
            </div>
          </div>

          {/* Quick lookup another VIN without leaving */}
          <form onSubmit={handleQuickSearchSubmit} className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={quickVin}
                onChange={(e) => setQuickVin(e.target.value.toUpperCase())}
                placeholder="Check another VIN..."
                maxLength={17}
                className="w-48 sm:w-60 px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 focus:bg-white/15 rounded-lg border border-white/10 text-white placeholder:text-slate-500 font-mono uppercase focus:outline-none focus:border-yellow-400 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !quickVin.trim()}
              className="px-3 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold uppercase transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-1 shrink-0"
            >
              {isLoading ? (
                <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search className="w-3.5 h-3.5" />
              )}
              <span>Lookup</span>
            </button>
          </form>
        </div>
      </div>

      {/* Main Report Dashboard (matches Screenshot 2) */}
      <ReportDashboard
        report={report}
        isUnlocked={isUnlocked}
        unlockedPlan={unlockedPlan}
        onSelectPlan={onSelectPlan}
        onViewFullReport={() => {
          const el = document.getElementById('unlocked-report');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Unlocked View (when paid) */}
      {isUnlocked && (
        <UnlockedReportView
          report={report}
          onLockAgain={onLockAgain}
        />
      )}
    </div>
  );
};
