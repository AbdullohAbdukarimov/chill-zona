import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  MOCK_ACTIVITIES, 
  INITIAL_USER_BOOKINGS, 
  INITIAL_PARTNER_LISTINGS, 
  INITIAL_PARTNER_ORDERS 
} from '../data/mockData';
import { translations } from '../data/translations';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // 1. AUTHENTICATION STATE (Strict Gatekeeping: starts false so Registration is always shown first)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Clear legacy localStorage auth so registration screen is strictly shown first
  useEffect(() => {
    localStorage.removeItem('joyband_auth');
  }, []);

  // 2. THEME STATE (Dark Mode Toggle)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('joyband_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('joyband_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // 3. LANGUAGE STATE (UZB / RUS)
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('joyband_lang') || 'uz';
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('joyband_lang', lang);
  };

  // Translation helper function
  const t = (key) => {
    return translations[language]?.[key] || translations.uz[key] || key;
  };

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

  // User profile (defaults to Abdulloh Abdukarimov and persists in localStorage)
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('joyband_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      name: 'Abdulloh',
      surname: 'Abdukarimov',
      phone: '+998 (90) 123-45-67',
      email: 'abdulloh.abdukarimov@joyband.uz',
      city: 'Toshkent'
    };
  });

  // Keep localStorage in sync with userProfile updates
  useEffect(() => {
    try {
      localStorage.setItem('joyband_user_profile', JSON.stringify(userProfile));
    } catch (e) {}
  }, [userProfile]);

  // Login simulation
  const login = (userData = {}) => {
    setIsAuthenticated(true);
    setUserProfile(prev => {
      const updated = {
        ...prev,
        name: userData.name || prev.name || 'Abdulloh',
        surname: userData.surname !== undefined ? userData.surname : prev.surname || 'Abdukarimov',
        phone: userData.phone || prev.phone,
        city: userData.city || prev.city,
        email: userData.name ? `${userData.name.toLowerCase().replace(/\s+/g, '.')}@joyband.uz` : prev.email
      };
      try {
        localStorage.setItem('joyband_user_profile', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    navigate('home');
    addToast(
      language === 'uz'
        ? `Xush kelibsiz! JoyBand platformasiga muvaffaqiyatli kirdingiz.`
        : `Добро пожаловать! Вы успешно вошли на платформу JoyBand.`,
      'success'
    );
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('joyband_auth');
    addToast(
      language === 'uz' ? 'Tizimdan muvaffaqiyatli chiqdingiz' : 'Вы успешно вышли из системы',
      'info'
    );
  };

  // Favorites
  const [favorites, setFavorites] = useState(['act-1', 'act-3']);

  const toggleFavorite = (activityId) => {
    setFavorites((prev) => {
      const exists = prev.includes(activityId);
      const activity = MOCK_ACTIVITIES.find(a => a.id === activityId);
      const title = activity ? activity.title : 'Maskan';
      
      if (exists) {
        addToast(
          language === 'uz'
            ? `"${title}" sevimlilardan olib tashlandi`
            : `"${title}" удалено из избранного`,
          'info'
        );
        return prev.filter(id => id !== activityId);
      } else {
        addToast(
          language === 'uz'
            ? `"${title}" sevimlilarga qo‘shildi!`
            : `"${title}" добавлено в избранное!`,
          'success'
        );
        return [...prev, activityId];
      }
    });
  };

  // User bookings
  const [userBookings, setUserBookings] = useState(INITIAL_USER_BOOKINGS);

  const addBooking = (newBooking) => {
    setUserBookings(prev => [newBooking, ...prev]);
    addToast(
      language === 'uz'
        ? 'Bron muvaffaqiyatli amalga oshirildi! Chiptangiz profilingizda saqlandi.'
        : 'Бронирование успешно завершено! Ваш билет сохранен в профиле.',
      'success'
    );
  };

  const cancelBooking = (bookingId) => {
    setUserBookings(prev => 
      prev.map(b => b.id === bookingId ? { ...b, status: 'Cancelled', statusText: language === 'uz' ? 'Bekor qilingan' : 'Отменено' } : b)
    );
    addToast(
      language === 'uz'
        ? `Band qilish (#${bookingId}) bekor qilindi`
        : `Бронь (#${bookingId}) отменена`,
      'warning'
    );
  };

  // Partner dashboard state
  const [partnerListings, setPartnerListings] = useState(INITIAL_PARTNER_LISTINGS);
  const [partnerOrders, setPartnerOrders] = useState(INITIAL_PARTNER_ORDERS);

  const addPartnerListing = (listing) => {
    setPartnerListings(prev => [listing, ...prev]);
    addToast(
      language === 'uz' ? 'Yangi xizmat muvaffaqiyatli qo‘shildi!' : 'Новая услуга успешно добавлена!',
      'success'
    );
  };

  const toggleListingStatus = (id) => {
    setPartnerListings(prev => 
      prev.map(l => l.id === id ? { ...l, active: !l.active } : l)
    );
    addToast(
      language === 'uz' ? 'Xizmat faollik holati o‘zgartirildi' : 'Статус активности услуги изменен',
      'info'
    );
  };

  const approveOrder = (orderId) => {
    setPartnerOrders(prev => 
      prev.map(o => o.id === orderId ? { ...o, status: 'Approved' } : o)
    );
    addToast(
      language === 'uz'
        ? `Buyurtma #${orderId} tasdiqlandi va mijozga SMS jo‘natildi!`
        : `Заказ #${orderId} подтвержден, клиенту отправлено SMS!`,
      'success'
    );
  };

  const declineOrder = (orderId) => {
    setPartnerOrders(prev => 
      prev.map(o => o.id === orderId ? { ...o, status: 'Declined' } : o)
    );
    addToast(
      language === 'uz' ? `Buyurtma #${orderId} rad etildi` : `Заказ #${orderId} отклонен`,
      'warning'
    );
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
    addToast(
      language === 'uz' ? 'Barcha filtrlar tozalandi' : 'Все фильтры сброшены',
      'info'
    );
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
      isAuthenticated,
      login,
      logout,
      theme,
      toggleTheme,
      language,
      changeLanguage,
      t,
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
