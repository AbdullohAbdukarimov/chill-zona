import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { BookingModal } from './components/BookingModal';
import { TicketModal } from './components/TicketModal';
import { NewListingModal } from './components/NewListingModal';
import { ImageGalleryModal } from './components/ImageGalleryModal';

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
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-orange-500 selection:text-white antialiased">
        <Navbar />
        <PageRouter />
        <Footer />
      </div>
    </AppProvider>
  );
}
