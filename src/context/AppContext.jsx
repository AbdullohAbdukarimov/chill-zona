import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  MOCK_ACTIVITIES, 
  INITIAL_USER_BOOKINGS, 
  INITIAL_PARTNER_LISTINGS, 
  INITIAL_PARTNER_ORDERS 
} from '../data/mockData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedActivityId, setSelectedActivityId] = useState('act-1');
  
  // Hash routing sync
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      if (hash.startsWith('activity/')) {
        const id = hash.replace('activity/', '');
        setSelectedActivityId(id);
        setCurrentPage('activity');
      } else if (['home', 'explore', 'dashboard', 'partner'].includes(hash)) {
        setCurrentPage(hash === 'dashboard' ? 'user-dashboard' : hash === 'partner' ? 'partner-dashboard' : hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page, activityId = null) => {
    setCurrentPage(page);
    if (activityId) {
      setSelectedActivityId(activityId);
      window.location.hash = `activity/${activityId}`;
    } else {
      const hashName = page === 'user-dashboard' ? 'dashboard' : page === 'partner-dashboard' ? 'partner' : page;
      window.location.hash = hashName;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // User state
  const [userProfile, setUserProfile] = useState({
    name: 'Azizbek',
    surname: 'Rahimov',
    phone: '+998 90 123 45 67',
    email: 'azizbek.rahimov@chillzone.uz',
    city: 'Toshkent'
  });

  // Favorites
  const [favorites, setFavorites] = useState(['act-1', 'act-3']);

  const toggleFavorite = (activityId) => {
    setFavorites((prev) => {
      const exists = prev.includes(activityId);
      const activity = MOCK_ACTIVITIES.find(a => a.id === activityId);
      const title = activity ? activity.title : 'Maskan';
      
      if (exists) {
        addToast(`"${title}" sevimlilardan olib tashlandi`, 'info');
        return prev.filter(id => id !== activityId);
      } else {
        addToast(`"${title}" sevimlilarga qo‘shildi!`, 'success');
        return [...prev, activityId];
      }
    });
  };

  // User bookings
  const [userBookings, setUserBookings] = useState(INITIAL_USER_BOOKINGS);

  const addBooking = (newBooking) => {
    setUserBookings(prev => [newBooking, ...prev]);
    addToast('Bron muvaffaqiyatli amalga oshirildi! Chiptangiz profilingizda saqlandi.', 'success');
  };

  const cancelBooking = (bookingId) => {
    setUserBookings(prev => 
      prev.map(b => b.id === bookingId ? { ...b, status: 'Cancelled', statusText: 'Bekor qilingan' } : b)
    );
    addToast(`Band qilish (#${bookingId}) bekor qilindi`, 'warning');
  };

  // Partner dashboard state
  const [partnerListings, setPartnerListings] = useState(INITIAL_PARTNER_LISTINGS);
  const [partnerOrders, setPartnerOrders] = useState(INITIAL_PARTNER_ORDERS);

  const addPartnerListing = (listing) => {
    setPartnerListings(prev => [listing, ...prev]);
    addToast('Yangi xizmat muvaffaqiyatli qo‘shildi!', 'success');
  };

  const toggleListingStatus = (id) => {
    setPartnerListings(prev => 
      prev.map(l => l.id === id ? { ...l, active: !l.active } : l)
    );
    addToast('Xizmat faollik holati o‘zgartirildi', 'info');
  };

  const approveOrder = (orderId) => {
    setPartnerOrders(prev => 
      prev.map(o => o.id === orderId ? { ...o, status: 'Approved' } : o)
    );
    addToast(`Buyurtma #${orderId} tasdiqlandi va mijozga SMS jo‘natildi!`, 'success');
  };

  const declineOrder = (orderId) => {
    setPartnerOrders(prev => 
      prev.map(o => o.id === orderId ? { ...o, status: 'Declined' } : o)
    );
    addToast(`Buyurtma #${orderId} rad etildi`, 'warning');
  };

  // Global search filters
  const [filters, setFilters] = useState({
    priceRange: [50000, 1000000],
    districts: [],
    categories: [],
    minRating: 0,
    searchQuery: '',
    selectedDate: ''
  });

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [50000, 1000000],
      districts: [],
      categories: [],
      minRating: 0,
      searchQuery: '',
      selectedDate: ''
    });
    addToast('Barcha filtrlar tozalandi', 'info');
  };

  // Modals state
  const [modalState, setModalState] = useState({
    bookingModal: false,
    newListingModal: false,
    galleryModal: false,
    ticketModal: false,
    selectedBooking: null,
    selectedGalleryImages: []
  });

  const openBookingModal = () => setModalState(prev => ({ ...prev, bookingModal: true }));
  const closeBookingModal = () => setModalState(prev => ({ ...prev, bookingModal: false }));

  const openNewListingModal = () => setModalState(prev => ({ ...prev, newListingModal: true }));
  const closeNewListingModal = () => setModalState(prev => ({ ...prev, newListingModal: false }));

  const openGalleryModal = (images) => setModalState(prev => ({ ...prev, galleryModal: true, selectedGalleryImages: images }));
  const closeGalleryModal = () => setModalState(prev => ({ ...prev, galleryModal: false }));

  const openTicketModal = (booking) => setModalState(prev => ({ ...prev, ticketModal: true, selectedBooking: booking }));
  const closeTicketModal = () => setModalState(prev => ({ ...prev, ticketModal: false, selectedBooking: null }));

  // Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider value={{
      currentPage,
      selectedActivityId,
      navigate,
      userProfile,
      setUserProfile,
      favorites,
      toggleFavorite,
      userBookings,
      addBooking,
      cancelBooking,
      partnerListings,
      partnerOrders,
      addPartnerListing,
      toggleListingStatus,
      approveOrder,
      declineOrder,
      filters,
      updateFilters,
      resetFilters,
      modalState,
      openBookingModal,
      closeBookingModal,
      openNewListingModal,
      closeNewListingModal,
      openGalleryModal,
      closeGalleryModal,
      openTicketModal,
      closeTicketModal,
      toasts,
      addToast,
      removeToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
