import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { BookingModal } from './components/BookingModal';
import { TicketModal } from './components/TicketModal';
import { NewListingModal } from './components/NewListingModal';
import { ImageGalleryModal } from './components/ImageGalleryModal';
import { AuthPage } from './components/AuthPage';

import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { ActivityDetailsPage } from './pages/ActivityDetailsPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { PartnerDashboardPage } from './pages/PartnerDashboardPage';

// Main content renderer based on active page route
const PageRouter = () => {
  const { currentPage, selectedActivityId } = useApp();

  return (
    <div className="flex-1">
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'explore' && <ExplorePage />}
      {currentPage === 'activity' && <ActivityDetailsPage />}
      {currentPage === 'user-dashboard' && <UserDashboardPage />}
      {currentPage === 'partner-dashboard' && <PartnerDashboardPage />}

      {/* Global Modals */}
      <BookingModal activityId={selectedActivityId} />
      <TicketModal />
      <NewListingModal />
      <ImageGalleryModal />
    </div>
  );
};

// Root App Controller with Gatekeeping Authentication
const AppContent = () => {
  const { isAuthenticated } = useApp();

  // 1. AUTHENTICATION FIRST (Gatekeeping):
  // When app loads, unauthenticated users see the full-screen Login/Register portal
  if (!isAuthenticated) {
    return (
      <>
        <AuthPage />
        <ToastContainer />
      </>
    );
  }

  // Once authenticated, access to full JoyBand marketplace
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-slate-100 font-sans selection:bg-orange-500 selection:text-white antialiased transition-colors duration-300">
      <Navbar />
      <PageRouter />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
