/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HomeSections } from './components/HomeSections';
import { ReportPage } from './pages/ReportPage';
import { JournalPage } from './pages/JournalPage';
import { HistoryPage } from './pages/HistoryPage';
import { PricingPage } from './pages/PricingPage';
import { FaqPage } from './pages/FaqPage';
import { SupportPage } from './pages/SupportPage';
import { LoginPage } from './pages/LoginPage';
import { CheckoutModal } from './components/CheckoutModal';
import { ChatWidget } from './components/ChatWidget';
import { VinSearchLoading } from './components/VinSearchLoading';
import { SiteLoadingScreen } from './components/SiteLoadingScreen';
import { Footer } from './components/Footer';
import { NotFoundPage } from './pages/NotFoundPage';
import { ReviewOrderPage } from './pages/ReviewOrderPage';
import { decodeVin } from './services/vinService';
import { SAMPLE_BMW_Z3 } from './data/sampleVehicles';
import { FullVehicleReport, ReportPlanId } from './types';
import { AlertCircle } from 'lucide-react';

export type PageView = 'home' | 'report' | 'not-found' | 'checkout' | 'journal' | 'history' | 'pricing' | 'faq' | 'support' | 'login';

export default function App() {
  const [isInitialSiteLoading, setIsInitialSiteLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [currentReport, setCurrentReport] = useState<FullVehicleReport>(SAMPLE_BMW_Z3);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchingLoading, setIsSearchingLoading] = useState(false);
  const [searchingVin, setSearchingVin] = useState('');
  const [searchingType, setSearchingType] = useState<'vin' | 'plate'>('vin');
  const [searchingState, setSearchingState] = useState<string | undefined>(undefined);
  const [searchResolution, setSearchResolution] = useState<{
    found: boolean;
    report?: FullVehicleReport;
    error?: string;
  } | null>(null);
  const [notFoundData, setNotFoundData] = useState<{
    query: string;
    type: 'vin' | 'plate';
    state?: string;
    errorMessage?: string;
  } | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockedPlan, setUnlockedPlan] = useState<ReportPlanId | null>(null);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  // Checkout modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<ReportPlanId>('silver');

  // Search History
  const [searchHistory, setSearchHistory] = useState<string[]>(['WBACH9343YLG18917']);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('vw_vin_history');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSearchHistory(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Listen to browser popstate / back button
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageView;
      if (hash && ['home', 'report', 'not-found', 'checkout', 'journal', 'history', 'pricing', 'faq', 'support', 'login'].includes(hash)) {
        setCurrentPage(hash);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string, type: 'vin' | 'plate', state?: string) => {
    const cleanQuery = query.trim().toUpperCase();
    if (!cleanQuery) return;

    setSearchingVin(cleanQuery);
    setSearchingType(type);
    setSearchingState(state);
    setIsSearchingLoading(true); // ALWAYS show loading animation first!
    setSearchResolution(null);
    setApiErrorMessage(null);

    // Asynchronously resolve in background during animation
    (async () => {
      try {
        if (type === 'vin') {
          if (cleanQuery.length === 17) {
            const report = await decodeVin(cleanQuery);
            setSearchResolution({ found: true, report });
          } else {
            setSearchResolution({
              found: false,
              error: 'Standard US VINs must be exactly 17 characters (excluding I, O, and Q).',
            });
          }
        } else {
          // Plate search
          const plateNormalized = cleanQuery.replace(/[^A-Z0-9]/g, '');
          const knownPlateList = ['BMW', 'BMWZ3', 'WBACH9343YLG18917', '7XYZ789', 'CAL123', 'WHEELCLARIFY', 'VINWHEELER', 'SAMPLE', 'TEST', 'DEMO'];
          if (knownPlateList.includes(plateNormalized)) {
            const report = await decodeVin('WBACH9343YLG18917');
            setSearchResolution({ found: true, report });
          } else {
            setSearchResolution({
              found: false,
              error: `No active vehicle registration found for license plate "${cleanQuery}" (${state || 'CA'}).`,
            });
          }
        }
      } catch (err: any) {
        console.warn('Search query lookup unresolved:', cleanQuery, err);
        setSearchResolution({
          found: false,
          error: err?.message || 'Invalid VIN or no record found in NHTSA database.',
        });
      }
    })();
  };

  const handleLoadingComplete = () => {
    setIsSearchingLoading(false);

    if (searchResolution?.found && searchResolution.report) {
      // RECORD FOUND -> Show Result Report!
      setCurrentReport(searchResolution.report);
      setIsUnlocked(false);
      setUnlockedPlan(null);
      setNotFoundData(null);

      // Save to history
      const vinToSave = searchResolution.report.specs.vin;
      setSearchHistory((prev) => {
        const next = [vinToSave, ...prev.filter((v) => v !== vinToSave)].slice(0, 10);
        try {
          localStorage.setItem('vw_vin_history', JSON.stringify(next));
        } catch {}
        return next;
      });

      navigateTo('report');
    } else {
      // NOT FOUND -> Show screenshot-type Not Found content!
      setNotFoundData({
        query: searchingVin,
        type: searchingType,
        state: searchingState,
        errorMessage: searchResolution?.error || 'Invalid VIN or no record found in NHTSA database.',
      });
      navigateTo('not-found');
    }

    setSearchResolution(null);
  };

  const handleSelectPlan = (planId: ReportPlanId) => {
    setSelectedPlanForCheckout(planId);
    navigateTo('checkout');
  };

  const handlePaymentSuccess = (planId: ReportPlanId) => {
    setIsUnlocked(true);
    setUnlockedPlan(planId);
    if (currentPage !== 'report') {
      navigateTo('report');
    }
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    try {
      localStorage.removeItem('vw_vin_history');
    } catch {}
  };

  const handleGetStarted = () => {
    if (currentPage !== 'home') {
      navigateTo('home');
    } else {
      const input = document.querySelector('input[placeholder*="VIN"]');
      if (input instanceof HTMLElement) {
        input.focus();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070b11] text-slate-100 flex flex-col font-sans selection:bg-yellow-400 selection:text-black">
      {/* Initial Homepage Loading Animation (matching Screenshot 1) */}
      {isInitialSiteLoading && (
        <SiteLoadingScreen onComplete={() => setIsInitialSiteLoading(false)} />
      )}

      {/* Top Navbar */}
      <Navbar
        onNavigate={(page) => navigateTo(page as PageView)}
        activePage={currentPage}
        onGetStarted={handleGetStarted}
        savedReportsCount={searchHistory.length}
      />

      {/* Main Page Routing Switch */}
      <main className="flex-1 w-full">
        {/* HOME PAGE: Complete home sections matching uploaded screenshots */}
        {currentPage === 'home' && (
          <>
            <HeroSection onSearch={handleSearch} isLoading={isLoading} />
            <HomeSections
              onGetStarted={handleGetStarted}
              onViewPricing={() => navigateTo('pricing')}
            />
          </>
        )}

        {/* DEDICATED REPORT PAGE: Opens when search is performed */}
        {currentPage === 'report' && (
          <ReportPage
            report={currentReport}
            isUnlocked={isUnlocked}
            unlockedPlan={unlockedPlan}
            onSelectPlan={handleSelectPlan}
            onBackToHome={() => navigateTo('home')}
            onNewSearch={handleSearch}
            isLoading={isLoading}
            onLockAgain={() => {
              setIsUnlocked(false);
              setUnlockedPlan(null);
            }}
          />
        )}

        {/* NOT FOUND PAGE: Displays when vehicle is not located */}
        {currentPage === 'not-found' && (
          <NotFoundPage
            searchedQuery={notFoundData?.query || searchingVin || 'UNKNOWN'}
            searchType={notFoundData?.type || searchingType}
            state={notFoundData?.state || searchingState}
            errorMessage={notFoundData?.errorMessage}
            onNewSearch={handleSearch}
            onViewSampleReport={() => {
              setCurrentReport(SAMPLE_BMW_Z3);
              setIsUnlocked(false);
              setUnlockedPlan(null);
              setNotFoundData(null);
              navigateTo('report');
            }}
            onBackToHome={() => navigateTo('home')}
            onNavigate={(page) => navigateTo(page as PageView)}
            isLoading={isLoading}
          />
        )}

        {/* DEDICATED JOURNAL PAGE */}
        {currentPage === 'journal' && (
          <JournalPage
            onSearchVin={(vin) => handleSearch(vin, 'vin')}
            onNavigate={(page) => navigateTo(page as PageView)}
          />
        )}

        {/* DEDICATED HISTORY PAGE */}
        {currentPage === 'history' && (
          <HistoryPage
            historyList={searchHistory}
            onSelectVin={(vin) => handleSearch(vin, 'vin')}
            onClearHistory={handleClearHistory}
            onNavigate={(page) => navigateTo(page as PageView)}
          />
        )}

        {/* DEDICATED PRICING PAGE */}
        {currentPage === 'pricing' && (
          <PricingPage
            onSelectPlan={handleSelectPlan}
            onNavigate={(page) => navigateTo(page as PageView)}
          />
        )}

        {/* REVIEW ORDER / GUEST CHECKOUT PAGE (matching user screenshot) */}
        {currentPage === 'checkout' && (
          <ReviewOrderPage
            selectedPlanId={selectedPlanForCheckout}
            report={currentReport}
            onPaymentSuccess={handlePaymentSuccess}
            onNavigate={(page) => navigateTo(page as PageView)}
            onBack={() => {
              if (currentReport && currentReport.specs?.vin) {
                navigateTo('report');
              } else {
                navigateTo('pricing');
              }
            }}
          />
        )}

        {/* DEDICATED FAQ PAGE */}
        {currentPage === 'faq' && (
          <FaqPage onNavigate={(page) => navigateTo(page as PageView)} />
        )}

        {/* DEDICATED SUPPORT PAGE */}
        {currentPage === 'support' && (
          <SupportPage onNavigate={(page) => navigateTo(page as PageView)} />
        )}

        {/* DEDICATED LOGIN / RETRIEVE REPORTS PAGE */}
        {currentPage === 'login' && (
          <LoginPage
            onLoginSuccess={() => {
              setIsUnlocked(true);
              setUnlockedPlan('silver');
              navigateTo('report');
            }}
            onNavigate={(page) => navigateTo(page as PageView)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={(page) => navigateTo(page as PageView)} />

      {/* Floating Chat Widget */}
      <ChatWidget />

      {/* Federal Database Query Loading Screen matching user screenshot */}
      {isSearchingLoading && (
        <VinSearchLoading
          vin={searchingVin}
          searchType={searchingType}
          state={searchingState}
          onComplete={handleLoadingComplete}
        />
      )}

      {/* Encrypted Stripe & PayPal Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        report={currentReport}
        selectedPlanId={selectedPlanForCheckout}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* NHTSA API Error Alert Dialog */}
      {apiErrorMessage && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#141720] border border-rose-500/40 rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight">
              Vehicle Lookup Error
            </h3>
            <p className="text-sm text-slate-300 font-medium leading-relaxed">
              {apiErrorMessage}
            </p>
            <button
              onClick={() => setApiErrorMessage(null)}
              className="w-full py-2.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
